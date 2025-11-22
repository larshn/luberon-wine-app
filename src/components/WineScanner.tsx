import { useState } from 'react';
import BarcodeScanner from './BarcodeScanner';
import WineScanResult from './WineScanResult';
import type { ScannedWineData, WineLookupResult } from '../types/scannedWine';
import { findWineByBarcode, customWineToWineFormat } from '../utils/customWineStorage';

// Demo wine data for testing (Castelforte Amarone della Valpolicella 2012)
const DEMO_WINE: ScannedWineData = {
  name: 'Amarone della Valpolicella',
  producer: 'Castelforte (Cantine Riondo)',
  region: 'Veneto',
  country: 'Italia',
  color: 'red',
  grapes: ['Corvina', 'Rondinella', 'Molinara'],
  vintage: 2012,
  description: 'En kraftig og kompleks Amarone med dyp granateple farge. 18 måneders lagring på store eikefat gir en rik smak av modne kirsebær, svisker, valnøtter og krydder, med et langt og elegant ettersmak.',
  alcoholContent: 15,
  foodPairings: ['Vilt', 'Modne oster', 'Biffgryter', 'Sjokoladedessert'],
};
const DEMO_BARCODE = '8001968003197';

interface WineScannerProps {
  onClose: () => void;
  onWineSaved: () => void;
}

type ScanState = 'scanning' | 'loading' | 'found' | 'not-found' | 'error' | 'already-exists';

export default function WineScanner({ onClose, onWineSaved }: WineScannerProps) {
  const [state, setState] = useState<ScanState>('scanning');
  const [scannedBarcode, setScannedBarcode] = useState<string>('');
  const [foundWine, setFoundWine] = useState<ScannedWineData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [existingWine, setExistingWine] = useState<ReturnType<typeof customWineToWineFormat> | null>(null);

  // Demo mode - simulate scanning the test wine
  const handleDemoScan = () => {
    setScannedBarcode(DEMO_BARCODE);
    setState('loading');

    // Check if already exists
    const existing = findWineByBarcode(DEMO_BARCODE);
    if (existing) {
      setExistingWine(customWineToWineFormat(existing));
      setState('already-exists');
      return;
    }

    // Simulate network delay then show result
    setTimeout(() => {
      setFoundWine(DEMO_WINE);
      setState('found');
    }, 1500);
  };

  const handleScanSuccess = async (barcode: string) => {
    setScannedBarcode(barcode);
    setState('loading');

    // First check if we already have this wine
    const existing = findWineByBarcode(barcode);
    if (existing) {
      setExistingWine(customWineToWineFormat(existing));
      setState('already-exists');
      return;
    }

    // Look up the wine via our API
    try {
      const response = await fetch('/.netlify/functions/wine-lookup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ barcode }),
      });

      if (!response.ok) {
        console.error('API error:', response.status, response.statusText);
        setErrorMessage(`Serverfeil (${response.status}). Prøv igjen senere.`);
        setState('error');
        return;
      }

      let result: WineLookupResult;
      try {
        result = await response.json();
      } catch (parseError) {
        console.error('Failed to parse response:', parseError);
        setErrorMessage('Ugyldig svar fra server.');
        setState('error');
        return;
      }

      if (result.found && result.wine) {
        setFoundWine(result.wine);
        setState('found');
      } else {
        setErrorMessage(result.message || 'Kunne ikke finne informasjon om denne vinen.');
        setState('not-found');
      }
    } catch (error) {
      console.error('Error looking up wine:', error);
      setErrorMessage('Nettverksfeil. Sjekk internettforbindelsen din.');
      setState('error');
    }
  };

  const handleScanAgain = () => {
    setState('scanning');
    setScannedBarcode('');
    setFoundWine(null);
    setErrorMessage('');
    setExistingWine(null);
  };

  const handleWineSaved = () => {
    onWineSaved();
    onClose();
  };

  // Scanning state
  if (state === 'scanning') {
    return (
      <BarcodeScanner
        onScanSuccess={handleScanSuccess}
        onClose={onClose}
        onDemoScan={handleDemoScan}
      />
    );
  }

  // Loading state
  if (state === 'loading') {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#000',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          border: '4px solid white',
          borderTopColor: 'transparent',
          borderRadius: '50%',
          marginBottom: '16px',
          animation: 'spin 1s linear infinite',
        }} />
        <h2 style={{ color: 'white', fontSize: '20px', fontWeight: 500, marginBottom: '8px' }}>Soker etter vin...</h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center' }}>
          Strekkode: {scannedBarcode}
        </p>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Found wine state
  if (state === 'found' && foundWine) {
    return (
      <WineScanResult
        wine={foundWine}
        barcode={scannedBarcode}
        onClose={handleScanAgain}
        onSaved={handleWineSaved}
      />
    );
  }

  // Wine already exists in collection
  if (state === 'already-exists' && existingWine) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.8)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          maxWidth: '400px',
          width: '100%',
          overflow: 'hidden',
        }}>
          <div style={{
            backgroundColor: '#fef3c7',
            padding: '24px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '50px', marginBottom: '8px' }}>📋</div>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>Vinen finnes allerede</h2>
          </div>
          <div style={{ padding: '24px' }}>
            <p style={{ color: '#666', marginBottom: '16px' }}>
              <strong>{existingWine.name}</strong> fra {existingWine.producer} er allerede i samlingen din.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button
                onClick={handleScanAgain}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'var(--primary, #7f1d1d)',
                  color: 'white',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Skann en annen vin
              </button>
              <button
                onClick={onClose}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#f3f4f6',
                  color: '#374151',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 500,
                  cursor: 'pointer',
                }}
              >
                Lukk
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Not found or error state
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        maxWidth: '400px',
        width: '100%',
        overflow: 'hidden',
      }}>
        <div style={{
          backgroundColor: state === 'error' ? '#fee2e2' : '#fef3c7',
          padding: '24px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '50px', marginBottom: '8px' }}>{state === 'error' ? '⚠️' : '🔍'}</div>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a', margin: 0 }}>
            {state === 'error' ? 'Feil oppstod' : 'Fant ikke vinen'}
          </h2>
        </div>
        <div style={{ padding: '24px' }}>
          <p style={{ color: '#666', marginBottom: '8px' }}>
            <strong>Strekkode:</strong> {scannedBarcode}
          </p>
          <p style={{ color: '#666', marginBottom: '24px' }}>{errorMessage}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button
              onClick={handleScanAgain}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: 'var(--primary, #7f1d1d)',
                color: 'white',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Prov igjen
            </button>
            <button
              onClick={onClose}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Avbryt
            </button>
          </div>

          <p style={{
            fontSize: '14px',
            color: '#9ca3af',
            marginTop: '16px',
            textAlign: 'center',
          }}>
            Tips: Ikke alle vinstrekkoder finnes i databasen.
            Prov a soke etter vinen manuelt i katalogen.
          </p>
        </div>
      </div>
    </div>
  );
}
