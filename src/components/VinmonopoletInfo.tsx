import { useState, useEffect } from 'react';
import type { Wine } from '../types/wine';

interface VinmonopoletProduct {
  code: string;
  name: string;
  price: string | null;
  pricePerLiter: string | null;
  url: string;
  images: any[];
  volume: number | null;
  alcohol: number | null;
  country: string | null;
  region: string | null;
  productAvailability: boolean;
  stock: any[];
}

interface VinmonopoletInfoProps {
  wine: Wine;
}

export default function VinmonopoletInfo({ wine }: VinmonopoletInfoProps) {
  const [products, setProducts] = useState<VinmonopoletProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Auto-fetch when component mounts if producer matches common names
    if (shouldAutoFetch(wine.producer)) {
      fetchVinmonopoletData();
    }
  }, [wine.id]);

  const shouldAutoFetch = (producer: string): boolean => {
    // Auto-fetch for well-known Luberon producers
    const knownProducers = ['château', 'domaine', 'mas', 'bastide'];
    return knownProducers.some(name => producer.toLowerCase().includes(name));
  };

  const fetchVinmonopoletData = async () => {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams({
        producer: wine.producer,
        wineName: wine.name.split(' ')[0] // First word of wine name
      });

      const response = await fetch(`/.netlify/functions/vinmonopolet-search?${params}`);

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Denne funksjonen fungerer kun når appen er deployet til Netlify. For lokal testing, bruk "netlify dev" i stedet for "npm run dev".');
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Kunne ikke hente data');
      }

      setProducts(data.products || []);
      setExpanded(true);
    } catch (err: any) {
      console.error('Error fetching Vinmonopolet data:', err);
      setError(err.message || 'En feil oppstod');
    } finally {
      setLoading(false);
    }
  };

  if (!expanded && products.length === 0) {
    return (
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={fetchVinmonopoletData}
          disabled={loading}
          style={{
            width: '100%',
            padding: '1rem',
            background: loading ? '#ccc' : 'linear-gradient(135deg, #d93f21 0%, #a6311e 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxShadow: '0 2px 8px rgba(217, 63, 33, 0.3)'
          }}
        >
          🏪 {loading ? 'Søker...' : 'Sjekk tilgjengelighet på Vinmonopolet'}
        </button>
      </div>
    );
  }

  if (!expanded) return null;

  return (
    <div style={{ marginBottom: '2rem' }}>
      <div
        style={{
          background: '#fff5f5',
          borderRadius: '12px',
          border: '2px solid #fed7d7',
          overflow: 'hidden'
        }}
      >
        <button
          onClick={() => setExpanded(!expanded)}
          style={{
            width: '100%',
            padding: '1rem',
            background: 'linear-gradient(135deg, #d93f21 0%, #a6311e 100%)',
            color: 'white',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <span>🏪 Vinmonopolet {products.length > 0 && `(${products.length})`}</span>
          <span>{expanded ? '▼' : '▶'}</span>
        </button>

        {expanded && (
          <div style={{ padding: '1.5rem' }}>
            {error && (
              <div
                style={{
                  padding: '1rem',
                  background: '#fee2e2',
                  border: '2px solid #fca5a5',
                  borderRadius: '8px',
                  color: '#991b1b',
                  marginBottom: '1rem'
                }}
              >
                ⚠️ {error}
              </div>
            )}

            {loading && (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⏳</div>
                Søker i Vinmonopolet...
              </div>
            )}

            {!loading && products.length === 0 && (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>😔</div>
                Ingen treff funnet på Vinmonopolet
              </div>
            )}

            {!loading && products.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {products.map((product) => (
                  <div
                    key={product.code}
                    style={{
                      padding: '1rem',
                      background: 'white',
                      borderRadius: '10px',
                      border: '2px solid #fed7d7',
                      display: 'flex',
                      gap: '1rem'
                    }}
                  >
                    {product.images.length > 0 && (
                      <img
                        src={product.images[0].url}
                        alt={product.name}
                        style={{
                          width: '80px',
                          height: '80px',
                          objectFit: 'contain',
                          borderRadius: '8px'
                        }}
                      />
                    )}

                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#722f37' }}>
                        {product.name}
                      </h4>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                        {product.price && (
                          <span style={{
                            padding: '0.25rem 0.75rem',
                            background: '#d93f21',
                            color: 'white',
                            borderRadius: '6px',
                            fontSize: '0.9rem',
                            fontWeight: 600
                          }}>
                            {product.price}
                          </span>
                        )}

                        {product.volume && (
                          <span className="tag" style={{ background: '#f3f4f6', border: '1px solid #d1d5db' }}>
                            {product.volume}L
                          </span>
                        )}

                        {product.alcohol && (
                          <span className="tag" style={{ background: '#f3f4f6', border: '1px solid #d1d5db' }}>
                            {product.alcohol}%
                          </span>
                        )}

                        {product.productAvailability ? (
                          <span style={{
                            padding: '0.25rem 0.75rem',
                            background: '#10b981',
                            color: 'white',
                            borderRadius: '6px',
                            fontSize: '0.85rem',
                            fontWeight: 600
                          }}>
                            ✓ Tilgjengelig
                          </span>
                        ) : (
                          <span style={{
                            padding: '0.25rem 0.75rem',
                            background: '#ef4444',
                            color: 'white',
                            borderRadius: '6px',
                            fontSize: '0.85rem',
                            fontWeight: 600
                          }}>
                            ✗ Ikke tilgjengelig
                          </span>
                        )}
                      </div>

                      <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-block',
                          padding: '0.5rem 1rem',
                          background: '#d93f21',
                          color: 'white',
                          borderRadius: '8px',
                          textDecoration: 'none',
                          fontSize: '0.9rem',
                          fontWeight: 600
                        }}
                      >
                        Se på Vinmonopolet.no →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
