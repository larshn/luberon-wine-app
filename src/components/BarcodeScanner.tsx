import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface BarcodeScannerProps {
  onScanSuccess: (barcode: string) => void;
  onClose: () => void;
  onDemoScan?: () => void;
}

export default function BarcodeScanner({ onScanSuccess, onClose, onDemoScan }: BarcodeScannerProps) {
  const [error, setError] = useState<string | null>(null);
  const [isStarting, setIsStarting] = useState(true);
  const [scannerReady, setScannerReady] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isRunningRef = useRef(false);

  const stopScanner = async () => {
    if (scannerRef.current && isRunningRef.current) {
      try {
        await scannerRef.current.stop();
        isRunningRef.current = false;
      } catch (e) {
        // Ignore stop errors
        console.log('Scanner stop error (ignored):', e);
      }
    }
  };

  useEffect(() => {
    let mounted = true;

    const startScanner = async () => {
      try {
        const scanner = new Html5Qrcode('barcode-reader');
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 150 },
            aspectRatio: 1.5,
          },
          async (decodedText) => {
            if (mounted && isRunningRef.current) {
              isRunningRef.current = false;
              try {
                await scanner.stop();
              } catch (e) {
                // Ignore
              }
              onScanSuccess(decodedText);
            }
          },
          () => {
            // Ignore QR code not found errors
          }
        );

        if (mounted) {
          isRunningRef.current = true;
          setIsStarting(false);
          setScannerReady(true);
        }
      } catch (err) {
        console.error('Error starting scanner:', err);
        if (mounted) {
          setError('Kunne ikke starte kameraet. Bruk demo-knappen eller skriv inn strekkode manuelt.');
          setIsStarting(false);
        }
      }
    };

    startScanner();

    return () => {
      mounted = false;
      stopScanner();
    };
  }, [onScanSuccess]);

  const handleManualEntry = async () => {
    const barcode = prompt('Skriv inn strekkode manuelt:');
    if (barcode && barcode.trim()) {
      await stopScanner();
      onScanSuccess(barcode.trim());
    }
  };

  const handleDemoClick = async () => {
    await stopScanner();
    if (onDemoScan) {
      onDemoScan();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#000',
      zIndex: 1000,
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        backgroundColor: 'rgba(0,0,0,0.8)',
        flexShrink: 0,
      }}>
        <button
          onClick={async () => {
            await stopScanner();
            onClose();
          }}
          style={{
            color: 'white',
            fontSize: '18px',
            padding: '8px 16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ← Tilbake
        </button>
        <h2 style={{ color: 'white', fontWeight: 500, margin: 0 }}>Skann strekkode</h2>
        <div style={{ width: '80px' }} />
      </div>

      {/* Scanner area */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflow: 'auto',
      }}>
        {isStarting && (
          <div style={{ color: 'white', textAlign: 'center', marginBottom: '16px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              border: '2px solid white',
              borderTopColor: 'transparent',
              borderRadius: '50%',
              margin: '0 auto 8px',
              animation: 'spin 1s linear infinite',
            }} />
            Starter kamera...
          </div>
        )}

        {error && (
          <div style={{
            color: '#fca5a5',
            textAlign: 'center',
            padding: '16px',
            backgroundColor: 'rgba(127, 29, 29, 0.3)',
            borderRadius: '8px',
            marginBottom: '16px',
            maxWidth: '300px',
          }}>
            {error}
          </div>
        )}

        <div
          id="barcode-reader"
          style={{
            width: '100%',
            maxWidth: '400px',
            borderRadius: '8px',
            overflow: 'hidden',
            minHeight: scannerReady ? '300px' : '0px',
          }}
        />

        {!isStarting && (
          <p style={{
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
            marginTop: '16px',
            fontSize: '14px',
            padding: '0 16px',
          }}>
            {scannerReady
              ? 'Hold kameraet over strekkoden på vinflasken.'
              : 'Bruk knappene nedenfor for å fortsette.'}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div style={{
        padding: '16px',
        backgroundColor: 'rgba(0,0,0,0.8)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        flexShrink: 0,
      }}>
        {onDemoScan && (
          <button
            onClick={handleDemoClick}
            style={{
              width: '100%',
              padding: '14px 16px',
              backgroundColor: 'var(--primary, #7C2D3D)',
              color: 'white',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            Test Demo - Amarone 2012
          </button>
        )}
        <button
          onClick={handleManualEntry}
          style={{
            width: '100%',
            padding: '12px 16px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Skriv inn strekkode manuelt
        </button>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
