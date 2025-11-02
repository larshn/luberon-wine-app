import { useState } from 'react';
import { vintageRatings, getRatingLabel } from '../data/vintages';

// Definere sterkere, mer synlige farger
const getVisibleRatingColor = (rating: number): string => {
  switch (rating) {
    case 5: return '#d4af37'; // Sterk gull
    case 4: return '#722f37'; // Burgundy
    case 3: return '#8b4049'; // Middels vinrød
    case 2: return '#a67c89'; // Lys vinrød
    case 1: return '#c9b5bb'; // Veldig lys
    default: return '#e0e0e0';
  }
};

export default function VintageChart() {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  // Filter to show last 25 years for better readability
  const recentVintages = vintageRatings.slice(-25);

  const handleMouseEnter = (year: number, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.right,
      y: rect.top + rect.height / 2
    });
    setHoveredYear(year);
  };

  return (
    <div className="card vintage-chart-container">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#722f37', marginBottom: '0.5rem' }}>
          🍇 Luberon Årgangskvalitet
        </h2>
        <p style={{ color: '#666', fontSize: '1rem' }}>
          Vurdering av årgangskvalitet siden 2000. Høyere søyle = bedre årgang.
        </p>
      </div>

      {/* Legend */}
      <div className="vintage-legend">
        <div className="vintage-legend-item">
          <div className="vintage-legend-color" style={{ background: getVisibleRatingColor(5) }}></div>
          <span>Eksepsjonelt (5★)</span>
        </div>
        <div className="vintage-legend-item">
          <div className="vintage-legend-color" style={{ background: getVisibleRatingColor(4) }}></div>
          <span>Utmerket (4★)</span>
        </div>
        <div className="vintage-legend-item">
          <div className="vintage-legend-color" style={{ background: getVisibleRatingColor(3) }}></div>
          <span>God (3★)</span>
        </div>
        <div className="vintage-legend-item">
          <div className="vintage-legend-color" style={{ background: getVisibleRatingColor(2) }}></div>
          <span>Gjennomsnittlig (2★)</span>
        </div>
      </div>

      {/* Chart */}
      <div className="vintage-chart">
        {recentVintages.map((vintage) => {
          const isHovered = hoveredYear === vintage.year;
          // Bruk pixelhøyde for mer presis kontroll - maks 230px for å gi luft på toppen
          const barHeightPx = Math.max((vintage.rating / 5) * 230, 30); // Maks 230px, minimum 30px

          return (
            <div
              key={vintage.year}
              className="vintage-bar-container"
              onMouseEnter={(e) => handleMouseEnter(vintage.year, e)}
              onMouseLeave={() => setHoveredYear(null)}
            >
              <div className="vintage-bar-wrapper">
                <div
                  className="vintage-bar"
                  style={{
                    height: `${barHeightPx}px`,
                    backgroundColor: getVisibleRatingColor(vintage.rating),
                    opacity: isHovered ? 1 : 0.95,
                    transform: isHovered ? 'scaleY(1.05)' : 'scaleY(1)'
                  }}
                >
                </div>
              </div>
              <div className="vintage-year" style={{ opacity: isHovered ? 1 : 0.8, fontWeight: isHovered ? 700 : 500 }}>
                {vintage.year}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tooltip rendered outside, positioned with fixed */}
      {hoveredYear !== null && (
        <div
          className="vintage-tooltip"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y}px`
          }}
        >
          {(() => {
            const vintage = recentVintages.find(v => v.year === hoveredYear);
            if (!vintage) return null;
            return (
              <>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                  {vintage.year}
                </div>
                <div style={{ fontSize: '0.9rem', color: '#d4af37' }}>
                  {'★'.repeat(vintage.rating)}{'☆'.repeat(5 - vintage.rating)}
                </div>
                <div style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                  {vintage.description}
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Notable Vintages */}
      <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#fff5ed', borderRadius: '8px', border: '2px solid #ffe4d6' }}>
        <h3 style={{ color: '#722f37', fontSize: '1.2rem', marginBottom: '1rem' }}>
          ⭐ Eksepsjonelle årganger (5★)
        </h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {vintageRatings.filter(v => v.rating === 5).map(vintage => (
            <div
              key={vintage.year}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'white',
                borderRadius: '8px',
                border: '3px solid #d4af37',
                fontWeight: 700,
                fontSize: '1.2rem',
                color: '#722f37',
                boxShadow: '0 2px 8px rgba(212, 175, 55, 0.3)'
              }}
            >
              {vintage.year}
            </div>
          ))}
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
          Disse årgangene representerer de aller beste forholdene for vindyrking i Luberon,
          med perfekt balanse mellom varme, nedbør og modning.
        </p>
      </div>
    </div>
  );
}
