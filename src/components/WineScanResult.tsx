import { useState } from 'react';
import type { ScannedWineData } from '../types/scannedWine';
import { saveCustomWine, addCustomWineToCellar } from '../utils/customWineStorage';

interface WineScanResultProps {
  wine: ScannedWineData;
  barcode: string;
  onClose: () => void;
  onSaved: () => void;
}

export default function WineScanResult({ wine, barcode, onClose, onSaved }: WineScanResultProps) {
  const [vintage, setVintage] = useState<number>(wine.vintage || new Date().getFullYear());
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const getColorStyle = (color: string) => {
    switch (color) {
      case 'red': return { bg: '#7f1d1d', text: 'white' };
      case 'white': return { bg: '#fef3c7', text: '#1a1a1a' };
      case 'rosé': return { bg: '#fce7f3', text: '#1a1a1a' };
      default: return { bg: '#9ca3af', text: 'white' };
    }
  };

  const getColorName = (color: string) => {
    switch (color) {
      case 'red': return 'Rodvin';
      case 'white': return 'Hvitvin';
      case 'rosé': return 'Rosevin';
      default: return color;
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const customWine = await saveCustomWine({
        barcode,
        name: wine.name,
        producer: wine.producer,
        region: wine.region,
        country: wine.country,
        color: wine.color,
        grapes: wine.grapes,
        description: wine.description,
        alcoholContent: wine.alcoholContent,
        foodPairings: wine.foodPairings,
      });

      await addCustomWineToCellar(customWine.id, vintage, quantity, notes);

      setSaved(true);
      setTimeout(() => {
        onSaved();
      }, 1500);
    } catch (error) {
      console.error('Error saving wine:', error);
      alert('Kunne ikke lagre vinen. Prov igjen.');
    } finally {
      setIsSaving(false);
    }
  };

  const colorStyle = getColorStyle(wine.color);

  if (saved) {
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
          padding: '32px',
          maxWidth: '400px',
          width: '100%',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '60px', marginBottom: '16px' }}>✓</div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '8px' }}>Lagret!</h2>
          <p style={{ color: '#666' }}>
            {wine.name} er lagt til i samlingen din.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.8)',
      zIndex: 1000,
      overflowY: 'auto',
    }}>
      <div style={{ minHeight: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px',
          backgroundColor: 'rgba(0,0,0,0.9)',
          position: 'sticky',
          top: 0,
        }}>
          <button
            onClick={onClose}
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
          <h2 style={{ color: 'white', fontWeight: 500, margin: 0 }}>Funnet vin</h2>
          <div style={{ width: '80px' }} />
        </div>

        {/* Wine info card */}
        <div style={{ flex: 1, padding: '16px' }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            overflow: 'hidden',
            maxWidth: '500px',
            margin: '0 auto',
          }}>
            {/* Wine header */}
            <div style={{
              backgroundColor: colorStyle.bg,
              color: colorStyle.text,
              padding: '24px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '50px', marginBottom: '8px' }}>🍷</div>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 4px' }}>
                {wine.name}
              </h1>
              <p style={{ fontSize: '18px', opacity: 0.8, margin: 0 }}>
                {wine.producer}
              </p>
            </div>

            {/* Wine details */}
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                <span style={{
                  padding: '4px 12px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '999px',
                  fontSize: '14px',
                }}>
                  {getColorName(wine.color)}
                </span>
                <span style={{
                  padding: '4px 12px',
                  backgroundColor: '#f3f4f6',
                  borderRadius: '999px',
                  fontSize: '14px',
                }}>
                  {wine.region}, {wine.country}
                </span>
                {wine.alcoholContent && (
                  <span style={{
                    padding: '4px 12px',
                    backgroundColor: '#f3f4f6',
                    borderRadius: '999px',
                    fontSize: '14px',
                  }}>
                    {wine.alcoholContent}% alk.
                  </span>
                )}
              </div>

              {wine.grapes.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontWeight: 500, color: '#374151', marginBottom: '4px' }}>Druer</h3>
                  <p style={{ color: '#666', margin: 0 }}>{wine.grapes.join(', ')}</p>
                </div>
              )}

              {wine.description && (
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontWeight: 500, color: '#374151', marginBottom: '4px' }}>Beskrivelse</h3>
                  <p style={{ color: '#666', margin: 0 }}>{wine.description}</p>
                </div>
              )}

              {wine.foodPairings.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontWeight: 500, color: '#374151', marginBottom: '8px' }}>Passer til</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {wine.foodPairings.map((pairing, i) => (
                      <span key={i} style={{
                        padding: '4px 8px',
                        backgroundColor: '#fef3c7',
                        color: '#92400e',
                        borderRadius: '4px',
                        fontSize: '14px',
                      }}>
                        {pairing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{
                borderTop: '1px solid #e5e7eb',
                paddingTop: '16px',
                marginTop: '16px',
              }}>
                <h3 style={{ fontWeight: 500, color: '#1a1a1a', marginBottom: '12px' }}>Legg til i samling</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '4px' }}>Argang</label>
                    <input
                      type="number"
                      value={vintage}
                      onChange={(e) => setVintage(parseInt(e.target.value) || new Date().getFullYear())}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '16px',
                      }}
                      min="1900"
                      max={new Date().getFullYear()}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '4px' }}>Antall</label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        fontSize: '16px',
                      }}
                      min="1"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '14px', color: '#666', marginBottom: '4px' }}>Notater (valgfritt)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '16px',
                      resize: 'none',
                    }}
                    rows={2}
                    placeholder="F.eks. hvor du kjopte den..."
                  />
                </div>

                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: isSaving ? '#9ca3af' : 'var(--primary, #7f1d1d)',
                    color: 'white',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: 500,
                    fontSize: '16px',
                    cursor: isSaving ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isSaving ? 'Lagrer...' : 'Legg til i samling'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
