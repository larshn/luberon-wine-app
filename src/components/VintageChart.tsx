import { useState } from 'react';
import { vintageRatings, getRatingColor, getRatingLabel } from '../data/vintages';

export default function VintageChart() {
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  // Filter to show last 25 years for better readability
  const recentVintages = vintageRatings.slice(-25);

  return (
    <div className="card vintage-chart-container">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.8rem', color: '#722f37', marginBottom: '0.5rem' }}>
          🍇 Luberon Årgangskvalitet
        </h2>
        <p style={{ color: '#666', fontSize: '1rem' }}>
          Vurdering av årgangskulitet siden 2000. Høyere søyle = bedre årgang.
        </p>
      </div>

      {/* Legend */}
      <div className="vintage-legend">
        <div className="vintage-legend-item">
          <div className="vintage-legend-color" style={{ background: getRatingColor(5) }}></div>
          <span>Eksepsjonelt (5★)</span>
        </div>
        <div className="vintage-legend-item">
          <div className="vintage-legend-color" style={{ background: getRatingColor(4) }}></div>
          <span>Utmerket (4★)</span>
        </div>
        <div className="vintage-legend-item">
          <div className="vintage-legend-color" style={{ background: getRatingColor(3) }}></div>
          <span>God (3★)</span>
        </div>
        <div className="vintage-legend-item">
          <div className="vintage-legend-color" style={{ background: getRatingColor(2) }}></div>
          <span>Gjennomsnittlig (2★)</span>
        </div>
      </div>

      {/* Chart */}
      <div className="vintage-chart">
        {recentVintages.map((vintage) => {
          const isHovered = hoveredYear === vintage.year;
          const barHeight = (vintage.rating / 5) * 100;

          return (
            <div
              key={vintage.year}
              className="vintage-bar-container"
              onMouseEnter={() => setHoveredYear(vintage.year)}
              onMouseLeave={() => setHoveredYear(null)}
            >
              <div className="vintage-bar-wrapper">
                <div
                  className="vintage-bar"
                  style={{
                    height: `${barHeight}%`,
                    backgroundColor: getRatingColor(vintage.rating),
                    opacity: isHovered ? 1 : 0.85,
                    transform: isHovered ? 'scaleY(1.05)' : 'scaleY(1)'
                  }}
                >
                  {isHovered && (
                    <div className="vintage-tooltip">
                      <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                        {vintage.year}
                      </div>
                      <div style={{ fontSize: '0.9rem', color: '#d4af37' }}>
                        {'★'.repeat(vintage.rating)}{'☆'.repeat(5 - vintage.rating)}
                      </div>
                      <div style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
                        {vintage.description}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="vintage-year" style={{ opacity: isHovered ? 1 : 0.7 }}>
                {vintage.year}
              </div>
            </div>
          );
        })}
      </div>

      {/* Notable Vintages */}
      <div style={{ marginTop: '2rem', padding: '1.5rem', background: '#fff5ed', borderRadius: '8px', border: '2px solid #ffe4d6' }}>
        <h3 style={{ color: '#722f37', fontSize: '1.2rem', marginBottom: '1rem' }}>
          ⭐ Eksepsjonelle årganger
        </h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {vintageRatings.filter(v => v.rating === 5).map(vintage => (
            <div
              key={vintage.year}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'white',
                borderRadius: '8px',
                border: '2px solid #d4af37',
                fontWeight: 700,
                color: '#722f37'
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
