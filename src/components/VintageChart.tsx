import { useState, useEffect } from 'react';
import { vintageRatings } from '../data/vintages';

const getVisibleRatingColor = (rating: number): string => {
  switch (rating) {
    case 5: return '#d4af37'; // Gold
    case 4: return '#722f37'; // Burgundy
    case 3: return '#8b4049'; // Medium wine red
    case 2: return '#a67c89'; // Light wine red
    case 1: return '#c9b5bb'; // Very light
    default: return '#e0e0e0';
  }
};

const getRatingLabel = (rating: number): string => {
  switch (rating) {
    case 5: return 'Eksepsjonelt';
    case 4: return 'Utmerket';
    case 3: return 'God';
    case 2: return 'Gjennomsn.';
    case 1: return 'Utfordrende';
    default: return 'Ukjent';
  }
};

export default function VintageChart() {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detect mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const hoveredVintage = hoveredYear ? vintageRatings.find(v => v.year === hoveredYear) : null;

  return (
    <div className="card" style={{ padding: '1.5rem', overflow: 'hidden', position: 'relative' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#722f37', marginBottom: '0.5rem' }}>
          🍇 Årgangskvalitet
        </h2>
        <p style={{ color: '#666', fontSize: '0.9rem' }}>
          Scroll horisontalt for å se alle årganger siden 2000
        </p>
      </div>

      {/* Horizontal scrolling chart */}
      <div style={{
        overflowX: 'auto',
        overflowY: 'visible',
        marginBottom: '1rem',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'thin',
        scrollbarColor: '#d4af37 #f5f5f5',
        position: 'relative'
      }}>
        <div style={{
          display: 'flex',
          gap: '8px',
          minWidth: 'fit-content',
          padding: '10px 0',
          height: '200px',
          alignItems: 'flex-end'
        }}>
          {vintageRatings.map((vintage) => {
            const isHovered = hoveredYear === vintage.year;
            const barHeight = (vintage.rating / 5) * 100; // Percentage

            return (
              <div
                key={vintage.year}
                onMouseEnter={() => setHoveredYear(vintage.year)}
                onMouseLeave={() => setHoveredYear(null)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: '45px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease'
                }}
              >
                {/* Bar */}
                <div style={{
                  width: '100%',
                  height: '150px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  position: 'relative'
                }}>
                  {/* Tooltip on hover - desktop only */}
                  {!isMobile && isHovered && (
                    <div style={{
                      position: 'absolute',
                      bottom: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginBottom: '8px',
                      background: '#1a1a1a',
                      color: 'white',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      whiteSpace: 'nowrap',
                      fontSize: '0.85rem',
                      zIndex: 1000,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                      pointerEvents: 'none'
                    }}>
                      <div style={{ fontWeight: 700, marginBottom: '2px' }}>
                        {vintage.year}
                      </div>
                      <div style={{ color: '#d4af37', fontSize: '0.8rem' }}>
                        {'★'.repeat(vintage.rating)}{'☆'.repeat(5 - vintage.rating)}
                      </div>
                      <div style={{ fontSize: '0.75rem', marginTop: '4px', opacity: 0.9 }}>
                        {vintage.description}
                      </div>
                      {/* Arrow */}
                      <div style={{
                        position: 'absolute',
                        bottom: '-4px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '4px solid transparent',
                        borderRight: '4px solid transparent',
                        borderTop: '4px solid #1a1a1a'
                      }} />
                    </div>
                  )}

                  <div style={{
                    width: '100%',
                    height: `${barHeight}%`,
                    backgroundColor: getVisibleRatingColor(vintage.rating),
                    borderRadius: '4px 4px 0 0',
                    transition: 'all 0.2s ease',
                    transform: isHovered ? 'scaleY(1.05)' : 'scaleY(1)',
                    transformOrigin: 'bottom',
                    boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
                  }} />
                </div>

                {/* Year label */}
                <div style={{
                  marginTop: '8px',
                  fontSize: '0.85rem',
                  fontWeight: isHovered ? 700 : 500,
                  color: isHovered ? '#722f37' : '#666',
                  transition: 'all 0.2s ease'
                }}>
                  {vintage.year}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '12px',
        justifyContent: 'center',
        padding: '1rem',
        background: '#fafafa',
        borderRadius: '8px'
      }}>
        {[5, 4, 3, 2].map(rating => (
          <div key={rating} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: getVisibleRatingColor(rating),
              borderRadius: '4px'
            }} />
            <span style={{ fontSize: '0.85rem', color: '#666' }}>
              {getRatingLabel(rating)} ({rating}★)
            </span>
          </div>
        ))}
      </div>

      {/* Mobile tooltip - pushes content down */}
      {isMobile && hoveredVintage && (
        <div style={{
          marginTop: '1.5rem',
          padding: '16px',
          background: '#1a1a1a',
          color: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
        }}>
          <div style={{ fontWeight: 700, marginBottom: '6px', fontSize: '1.3rem' }}>
            {hoveredVintage.year}
          </div>
          <div style={{ color: '#d4af37', fontSize: '1.1rem', marginBottom: '6px' }}>
            {'★'.repeat(hoveredVintage.rating)}{'☆'.repeat(5 - hoveredVintage.rating)}
          </div>
          <div style={{ fontSize: '0.95rem', opacity: 0.95, lineHeight: '1.4' }}>
            {hoveredVintage.description}
          </div>
        </div>
      )}

      {/* Notable vintages */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        background: '#fff5ed',
        borderRadius: '8px',
        border: '2px solid #ffe4d6'
      }}>
        <div style={{
          fontSize: '0.9rem',
          color: '#722f37',
          fontWeight: 600,
          marginBottom: '8px'
        }}>
          ⭐ Beste årganger:
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {vintageRatings.filter(v => v.rating === 5).map(vintage => (
            <span
              key={vintage.year}
              style={{
                padding: '4px 12px',
                background: '#d4af37',
                color: 'white',
                borderRadius: '6px',
                fontSize: '0.9rem',
                fontWeight: 700
              }}
            >
              {vintage.year}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
