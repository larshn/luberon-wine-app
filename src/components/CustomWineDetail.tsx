import type { CustomWine } from '../types/scannedWine';

interface CustomWineDetailProps {
  wine: CustomWine;
  vintage: number;
  quantity: number;
  notes?: string;
  onClose: () => void;
  onRemove: () => void;
  onAdd: () => void;
}

export default function CustomWineDetail({
  wine,
  vintage,
  quantity,
  notes,
  onClose,
  onRemove,
  onAdd,
}: CustomWineDetailProps) {
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
      case 'red': return 'Rødvin';
      case 'white': return 'Hvitvin';
      case 'rosé': return 'Rosévin';
      default: return color;
    }
  };

  const colorStyle = getColorStyle(wine.color);

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
          zIndex: 10,
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
          <h2 style={{ color: 'white', fontWeight: 500, margin: 0 }}>Vindetaljer</h2>
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
              <span style={{
                display: 'inline-block',
                padding: '4px 12px',
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: '999px',
                fontSize: '12px',
                marginBottom: '8px',
              }}>
                Skannet vin
              </span>
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
              {/* Tags */}
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
                <span style={{
                  padding: '4px 12px',
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  borderRadius: '999px',
                  fontSize: '14px',
                }}>
                  {vintage}
                </span>
              </div>

              {/* Quantity in cellar */}
              <div style={{
                backgroundColor: '#f0fdf4',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#166534' }}>I kjelleren</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#166534' }}>{quantity} flasker</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={onRemove}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '2px solid #dc2626',
                      backgroundColor: 'white',
                      color: '#dc2626',
                      fontSize: '20px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    −
                  </button>
                  <button
                    onClick={onAdd}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: '2px solid #16a34a',
                      backgroundColor: 'white',
                      color: '#16a34a',
                      fontSize: '20px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {wine.grapes.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontWeight: 600, color: '#374151', marginBottom: '4px', fontSize: '14px' }}>Druer</h3>
                  <p style={{ color: '#666', margin: 0 }}>{wine.grapes.join(', ')}</p>
                </div>
              )}

              {wine.description && (
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontWeight: 600, color: '#374151', marginBottom: '4px', fontSize: '14px' }}>Beskrivelse</h3>
                  <p style={{ color: '#666', margin: 0, lineHeight: 1.6 }}>{wine.description}</p>
                </div>
              )}

              {wine.foodPairings.length > 0 && (
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontWeight: 600, color: '#374151', marginBottom: '8px', fontSize: '14px' }}>Passer til</h3>
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

              {notes && (
                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontWeight: 600, color: '#374151', marginBottom: '4px', fontSize: '14px' }}>Dine notater</h3>
                  <p style={{
                    color: '#666',
                    margin: 0,
                    padding: '12px',
                    backgroundColor: '#fff7ed',
                    borderRadius: '8px',
                    fontStyle: 'italic',
                  }}>
                    {notes}
                  </p>
                </div>
              )}

              {wine.barcode && (
                <div style={{
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '16px',
                  marginTop: '16px',
                }}>
                  <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>
                    Strekkode: {wine.barcode}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
