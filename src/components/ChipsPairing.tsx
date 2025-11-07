import { useState, useMemo, useEffect, useRef } from 'react';
import type { Wine } from '../types/wine';
import type { ChipsFlavor } from '../types/chips';
import { chipsFlavors } from '../data/chips';

interface ChipsPairingProps {
  wines: Wine[];
  onViewWine: (wine: Wine) => void;
}

// Helper function to calculate how well a wine matches a chips flavor
const calculateMatchScore = (wine: Wine, chips: ChipsFlavor): number => {
  let score = 0;

  // Color match (30 points)
  if (chips.preferredWineColors?.includes(wine.color)) {
    score += 30;
  }

  // Get latest vintage for tasting notes
  const latestVintage = wine.vintages.length > 0
    ? wine.vintages.reduce((latest, current) =>
        current.year > latest.year ? current : latest
      )
    : wine.vintages[0];

  // Combine wine description and tasting notes for text matching
  const wineText = [
    wine.description,
    ...(latestVintage?.tastingNotes || [])
  ].join(' ').toLowerCase();

  // Characteristic match (up to 50 points)
  if (chips.wineCharacteristics) {
    const matchedChars = chips.wineCharacteristics.filter(char =>
      wineText.includes(char.toLowerCase())
    );
    score += matchedChars.length * 10;
  }

  // Grape variety bonus (20 points)
  // Some grapes naturally pair better with certain flavor profiles
  if (chips.profile.acidic >= 4) {
    // High acidity chips pair well with high-acid grapes
    if (wine.grapes.some(g => ['Sauvignon Blanc', 'Vermentino', 'Roussanne'].includes(g))) {
      score += 10;
    }
  }

  if (chips.profile.herbal >= 4) {
    // Herbal chips pair well with aromatic/herbal wines
    if (wine.grapes.some(g => ['Syrah', 'Grenache', 'Vermentino', 'Roussanne'].includes(g))) {
      score += 10;
    }
  }

  if (chips.profile.smoky >= 4 || chips.profile.spicy >= 4) {
    // Smoky/spicy chips pair well with bold reds
    if (wine.color === 'red' && wine.grapes.some(g => ['Syrah', 'Grenache', 'Mourvèdre'].includes(g))) {
      score += 10;
    }
  }

  if (chips.profile.creamy >= 4) {
    // Creamy chips pair well with rich whites
    if (wine.color === 'white' && wine.grapes.some(g => ['Viognier', 'Roussanne', 'Marsanne'].includes(g))) {
      score += 10;
    }
  }

  return score;
};

export default function ChipsPairing({ wines, onViewWine }: ChipsPairingProps) {
  const [selectedChips, setSelectedChips] = useState<ChipsFlavor | null>(null);
  const [filterColor, setFilterColor] = useState<'all' | 'red' | 'white' | 'rosé'>('all');
  const resultsRef = useRef<HTMLDivElement>(null);

  // Calculate matching wines for selected chips
  const matchingWines = useMemo(() => {
    if (!selectedChips) return [];

    const scored = wines
      .map(wine => ({
        wine,
        score: calculateMatchScore(wine, selectedChips)
      }))
      .filter(item => item.score > 0) // Only show wines with some match
      .filter(item => filterColor === 'all' || item.wine.color === filterColor)
      .sort((a, b) => b.score - a.score);

    return scored;
  }, [wines, selectedChips, filterColor]);

  // Auto-scroll to results when wines are found
  useEffect(() => {
    if (matchingWines.length > 0 && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [matchingWines.length, selectedChips]);

  // Helper to get latest vintage
  const getLatestVintage = (wine: Wine) => {
    return wine.vintages.length > 0
      ? wine.vintages.reduce((latest, current) =>
          current.year > latest.year ? current : latest
        )
      : wine.vintages[0];
  };

  // Get score label
  const getScoreLabel = (score: number): string => {
    if (score >= 60) return 'Utmerket match! ⭐⭐⭐';
    if (score >= 40) return 'God match ⭐⭐';
    if (score >= 20) return 'Passer bra ⭐';
    return 'Kan funke';
  };

  return (
    <div>
      <div className="page-header">
        <h2>🥔 Vin & Potetgull</h2>
        <p>Finn den perfekte vinen til ditt favorittpotetgull</p>
      </div>

      {/* Info box */}
      <div className="card" style={{ marginBottom: '2rem', background: '#fff5ed', border: '2px solid #ffe4d6' }}>
        <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: '1.6', marginBottom: '0.5rem' }}>
          💡 <strong>Visste du at...</strong> potetgull og vin kan være en fantastisk kombinasjon?
          Våre Luberon-viner har kompleksitet og eleganse som matcher perfekt med de raffinerte
          franske potetgullsmakene.
        </p>
        <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>
          Velg din favorittsmak nedenfor, så foreslår vi viner som komplementerer eller kontrasterer
          smaksprofilen på en harmonisk måte.
        </p>
      </div>

      {/* Chips selector */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#722f37' }}>
          Velg potetgullsmak
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {chipsFlavors.map(chips => (
            <button
              key={chips.id}
              onClick={() => setSelectedChips(chips)}
              className={`card ${selectedChips?.id === chips.id ? 'selected-chips' : ''}`}
              style={{
                textAlign: 'left',
                cursor: 'pointer',
                padding: '1rem',
                border: selectedChips?.id === chips.id ? '3px solid #d4af37' : '2px solid #ffe4d6',
                background: selectedChips?.id === chips.id ? '#fff5ed' : 'white',
                transition: 'all 0.2s ease',
                boxShadow: selectedChips?.id === chips.id ? '0 4px 12px rgba(212, 175, 55, 0.3)' : '0 2px 4px rgba(0,0,0,0.05)'
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#722f37', marginBottom: '0.5rem' }}>
                {chips.name}
              </div>
              <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
                {chips.description}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#999', fontStyle: 'italic' }}>
                {chips.ingredients}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Results section */}
      {selectedChips && (
        <>
          {/* Selected chips info */}
          <div className="card" style={{ marginBottom: '2rem', background: '#fff5ed', border: '3px solid #d4af37' }}>
            <h3 style={{ fontSize: '1.4rem', color: '#722f37', marginBottom: '1rem' }}>
              🥔 {selectedChips.name}
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '1rem' }}>
              {selectedChips.description}
            </p>

            {/* Flavor profile visualization */}
            <div style={{ marginTop: '1rem' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: '#722f37' }}>
                Smaksprofil:
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem' }}>
                {Object.entries(selectedChips.profile)
                  .filter(([_, value]) => value >= 3)
                  .map(([key, value]) => (
                    <div key={key} style={{ fontSize: '0.85rem', color: '#666' }}>
                      <span style={{ textTransform: 'capitalize' }}>
                        {key === 'salty' && '🧂 Salt'}
                        {key === 'acidic' && '🍋 Syrlig'}
                        {key === 'creamy' && '🧈 Kremet'}
                        {key === 'spicy' && '🌶️ Krydret'}
                        {key === 'smoky' && '💨 Røkt'}
                        {key === 'herbal' && '🌿 Urter'}
                        {key === 'sweet' && '🍯 Søt'}
                      </span>
                      <span style={{ marginLeft: '0.25rem' }}>
                        {'★'.repeat(value)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Recommended wine characteristics */}
            {selectedChips.wineCharacteristics && selectedChips.wineCharacteristics.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem', color: '#722f37' }}>
                  Anbefalte vinkarakteristikker:
                </div>
                <div className="tag-list">
                  {selectedChips.wineCharacteristics.map((char, idx) => (
                    <span key={idx} className="tag" style={{ background: '#ffe4d6', color: '#722f37', textTransform: 'capitalize' }}>
                      {char}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Color filter */}
          <div className="card" style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem' }}>
              Filtrer på farge
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {(['all', 'red', 'white', 'rosé'] as const).map(color => (
                <button
                  key={color}
                  onClick={() => setFilterColor(color)}
                  className={`btn-sort ${filterColor === color ? 'active' : ''}`}
                  style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
                >
                  {color === 'all' && '🍷 Alle'}
                  {color === 'red' && '🍷 Rødvin'}
                  {color === 'white' && '🥂 Hvitvin'}
                  {color === 'rosé' && '🌸 Rosévin'}
                </button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <div ref={resultsRef} className="results-count">
            Fant {matchingWines.length} {matchingWines.length === 1 ? 'vin' : 'viner'}
          </div>

          {/* Wine results */}
          {matchingWines.length === 0 ? (
            <div className="empty-state">
              <h3>Ingen treff</h3>
              <p className="mb-md">Prøv å endre fargefilter</p>
              <button
                onClick={() => setFilterColor('all')}
                className="btn btn-primary"
              >
                Vis alle farger
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {matchingWines.map(({ wine, score }) => {
                const latestVintage = getLatestVintage(wine);
                const vintageYears = wine.vintages.map(v => v.year).sort((a, b) => b - a);

                return (
                  <div key={wine.id} className="card">
                    <div className={`wine-color-bar ${wine.color}`} />

                    {/* Match score badge */}
                    <div style={{
                      display: 'inline-block',
                      padding: '0.5rem 1rem',
                      background: score >= 60 ? '#d4af37' : score >= 40 ? '#722f37' : '#8b4049',
                      color: 'white',
                      borderRadius: '20px',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      marginBottom: '1rem'
                    }}>
                      {getScoreLabel(score)}
                    </div>

                    <div className="food-pairing-content">
                      <div className="food-pairing-wine-info">
                        <h3 style={{ marginBottom: '0.5rem' }}>{wine.name}</h3>
                        <p style={{ color: '#666', fontSize: '1rem', marginBottom: '0.5rem' }}>
                          {wine.producer}
                        </p>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                          <span className="wine-year">
                            {vintageYears.length > 1
                              ? `${vintageYears.length} årganger`
                              : vintageYears[0]
                            }
                          </span>
                          {latestVintage.price && (
                            <span className="wine-price">€{latestVintage.price}</span>
                          )}
                        </div>

                        <div className="tag-list">
                          {wine.grapes.map((grape, idx) => (
                            <span key={idx} className="tag tag-grape">
                              {grape}
                            </span>
                          ))}
                        </div>

                        <p style={{
                          marginTop: '1rem',
                          fontSize: '0.9rem',
                          color: '#666',
                          fontStyle: 'italic'
                        }}>
                          {wine.description}
                        </p>
                      </div>

                      <div className="food-pairing-button-desktop">
                        <button
                          onClick={() => onViewWine(wine)}
                          className="btn btn-primary"
                          style={{ minWidth: '150px' }}
                        >
                          Se detaljer
                        </button>
                      </div>
                    </div>

                    {/* Mobile button */}
                    <div className="food-pairing-button-mobile">
                      <button
                        onClick={() => onViewWine(wine)}
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: '1rem' }}
                      >
                        Se detaljer
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* No selection state */}
      {!selectedChips && (
        <div className="empty-state">
          <h3>Velg en potetgullsmak</h3>
          <p>Klikk på en av smakene ovenfor for å se anbefalte viner</p>
        </div>
      )}
    </div>
  );
}
