import { useState, useEffect } from 'react';
import type { Wine } from '../types/wine';

interface VivinoWine {
  id: number;
  name: string;
  producer: string | null;
  vintage: string | null;
  rating: number | null;
  ratingsCount: number;
  image: string | null;
  url: string;
  region: string | null;
  country: string | null;
}

interface VivinoRatingProps {
  wine: Wine;
  vintage?: number;
  compact?: boolean;
}

export default function VivinoRating({ wine, vintage, compact = false }: VivinoRatingProps) {
  const [vivinoWine, setVivinoWine] = useState<VivinoWine | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVivinoData();
  }, [wine.id, vintage]);

  const fetchVivinoData = async () => {
    setLoading(true);
    setError('');

    try {
      const params = new URLSearchParams({
        wineName: wine.name,
        producer: wine.producer
      });

      if (vintage) {
        params.append('vintage', vintage.toString());
      }

      const response = await fetch(`/.netlify/functions/vivino-search?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Kunne ikke hente data');
      }

      setVivinoWine(data.wine);
    } catch (err: any) {
      console.error('Error fetching Vivino data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    if (compact) return null;
    return (
      <div style={{ padding: '0.5rem', color: '#999', fontSize: '0.85rem' }}>
        Laster Vivino-rating...
      </div>
    );
  }

  if (error || !vivinoWine || !vivinoWine.rating) {
    return null; // Don't show anything if no data
  }

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <span style={{ color: '#ba1628', fontSize: compact ? '0.9rem' : '1rem' }}>
        {'★'.repeat(fullStars)}
        {hasHalfStar && '⯨'}
        <span style={{ opacity: 0.3 }}>{'★'.repeat(emptyStars)}</span>
      </span>
    );
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  if (compact) {
    return (
      <a
        href={vivinoWine.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.25rem',
          textDecoration: 'none',
          color: 'inherit',
          fontSize: '0.85rem',
          padding: '0.25rem 0.5rem',
          background: '#fff',
          borderRadius: '4px',
          border: '1px solid #e0e0e0'
        }}
        title={`Se på Vivino: ${vivinoWine.rating}/5 fra ${vivinoWine.ratingsCount.toLocaleString()} ratings`}
      >
        {renderStars(vivinoWine.rating)}
        <span style={{ fontWeight: 600 }}>{vivinoWine.rating.toFixed(1)}</span>
        <span style={{ color: '#999' }}>({formatNumber(vivinoWine.ratingsCount)})</span>
      </a>
    );
  }

  return (
    <div
      style={{
        padding: '1rem',
        background: 'linear-gradient(135deg, #fff 0%, #fff5f5 100%)',
        borderRadius: '12px',
        border: '2px solid #ffe4d6',
        marginBottom: '1rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <div>
          <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>
            Vivino Community Rating
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {renderStars(vivinoWine.rating)}
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ba1628' }}>
              {vivinoWine.rating.toFixed(1)}
            </span>
            <span style={{ fontSize: '0.9rem', color: '#999' }}>
              / 5
            </span>
          </div>
          <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
            {vivinoWine.ratingsCount.toLocaleString()} ratings
          </div>
        </div>

        {vivinoWine.image && (
          <img
            src={vivinoWine.image}
            alt={vivinoWine.name}
            style={{
              width: '60px',
              height: '80px',
              objectFit: 'contain',
              borderRadius: '4px'
            }}
          />
        )}
      </div>

      <a
        href={vivinoWine.url}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-block',
          padding: '0.5rem 1rem',
          background: '#ba1628',
          color: 'white',
          borderRadius: '8px',
          textDecoration: 'none',
          fontSize: '0.9rem',
          fontWeight: 600
        }}
      >
        Se mer på Vivino →
      </a>
    </div>
  );
}
