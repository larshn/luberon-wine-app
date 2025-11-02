import { useState, useMemo } from 'react';
import type { Wine } from '../types/wine';

interface FoodPairingProps {
  wines: Wine[];
  onViewWine: (wine: Wine) => void;
}

type FoodCategory =
  | 'all'
  | 'meat'
  | 'fish'
  | 'poultry'
  | 'cheese'
  | 'vegetables'
  | 'pasta'
  | 'seafood'
  | 'grilled';

const foodCategories: { value: FoodCategory; label: string; emoji: string }[] = [
  { value: 'all', label: 'Alle kategorier', emoji: '🍽️' },
  { value: 'meat', label: 'Kjøtt', emoji: '🥩' },
  { value: 'fish', label: 'Fisk', emoji: '🐟' },
  { value: 'poultry', label: 'Fjærkre', emoji: '🍗' },
  { value: 'cheese', label: 'Ost', emoji: '🧀' },
  { value: 'vegetables', label: 'Grønnsaker', emoji: '🥗' },
  { value: 'pasta', label: 'Pasta/Ris', emoji: '🍝' },
  { value: 'seafood', label: 'Sjømat', emoji: '🦐' },
  { value: 'grilled', label: 'Grillmat', emoji: '🔥' }
];

const getCategoryKeywords = (category: FoodCategory): string[] => {
  switch (category) {
    case 'meat':
      return ['kjøtt', 'lam', 'okse', 'biff', 'entrecôte', 'ribs', 'vilt', 'hjort', 'villsvin', 'and', 'due'];
    case 'fish':
      return ['fisk', 'torsk', 'laks', 'steinbit', 'kveite', 'havabbor'];
    case 'poultry':
      return ['kylling', 'and', 'due', 'fjærkre'];
    case 'cheese':
      return ['ost', 'chèvre', 'geiteost', 'brie', 'camembert', 'comté', 'manchego', 'pecorino', 'parmigiano'];
    case 'vegetables':
      return ['grønnsaker', 'salat', 'ratatouille', 'grillede grønnsaker', 'asparges', 'quiche'];
    case 'pasta':
      return ['pasta', 'risotto', 'tomatsaus', 'bolognese', 'pizza'];
    case 'seafood':
      return ['sjømat', 'skalldyr', 'reker', 'hummer', 'kamskjell', 'østers', 'blekksprut', 'calamari', 'blåskjell'];
    case 'grilled':
      return ['grill', 'bbq', 'grillet'];
    default:
      return [];
  }
};

export default function FoodPairing({ wines, onViewWine }: FoodPairingProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory>('all');

  // Helper to get latest vintage
  const getLatestVintage = (wine: Wine) => {
    return wine.vintages.length > 0
      ? wine.vintages.reduce((latest, current) =>
          current.year > latest.year ? current : latest
        )
      : wine.vintages[0];
  };

  const matchingDishes = useMemo(() => {
    // Create a map of dishes to wines
    const dishMap = new Map<string, Array<{ wine: Wine; description?: string }>>();

    wines.forEach(wine => {
      wine.foodPairings.forEach(pairing => {
        // Check if pairing matches search term
        const matchesSearch = searchTerm === '' ||
          pairing.dish.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (pairing.description && pairing.description.toLowerCase().includes(searchTerm.toLowerCase()));

        // Check if pairing matches category
        const matchesCategory = selectedCategory === 'all' ||
          getCategoryKeywords(selectedCategory).some(keyword =>
            `${pairing.dish} ${pairing.description || ''}`.toLowerCase().includes(keyword)
          );

        if (matchesSearch && matchesCategory) {
          const existing = dishMap.get(pairing.dish) || [];
          existing.push({
            wine,
            description: pairing.description
          });
          dishMap.set(pairing.dish, existing);
        }
      });
    });

    // Convert to array and sort by number of wines (most popular first)
    return Array.from(dishMap.entries())
      .map(([dish, wineList]) => ({
        dish,
        wines: wineList
      }))
      .sort((a, b) => b.wines.length - a.wines.length);
  }, [wines, searchTerm, selectedCategory]);

  // Get unique dishes for suggestions
  const popularDishes = useMemo(() => {
    const dishMap = new Map<string, number>();

    wines.forEach(wine => {
      wine.foodPairings.forEach(pairing => {
        const count = dishMap.get(pairing.dish) || 0;
        dishMap.set(pairing.dish, count + 1);
      });
    });

    return Array.from(dishMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12)
      .map(([dish]) => dish);
  }, [wines]);

  return (
    <div>
      <div className="page-header">
        <h2>🍽️ Mat til Vin</h2>
        <p>Finn den perfekte vinen til din rett</p>
      </div>

      {/* Search and filters */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>
            Søk etter matrett
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="F.eks. 'grillet lam', 'pasta', 'fisk'..."
            className="input"
          />
        </div>

        <div>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.75rem' }}>
            Kategori
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {foodCategories.map(category => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`btn-sort ${selectedCategory === category.value ? 'active' : ''}`}
                style={{
                  padding: '0.5rem 1rem',
                  fontSize: '0.9rem'
                }}
              >
                {category.emoji} {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Popular dishes suggestions */}
      {searchTerm === '' && selectedCategory === 'all' && (
        <div className="card" style={{ marginBottom: '2rem', background: '#fff5ed' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: '#722f37' }}>
            💡 Populære retter
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {popularDishes.map(dish => (
              <button
                key={dish}
                onClick={() => setSearchTerm(dish)}
                className="tag"
                style={{
                  cursor: 'pointer',
                  padding: '0.5rem 1rem',
                  background: 'white',
                  border: '2px solid #ffe4d6',
                  fontSize: '0.9rem'
                }}
              >
                {dish}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      <div className="results-count">
        Fant {matchingDishes.length} {matchingDishes.length === 1 ? 'rett' : 'retter'}
      </div>

      {matchingDishes.length === 0 ? (
        <div className="empty-state">
          <h3>Ingen treff</h3>
          <p className="mb-md">Prøv et annet søk eller velg en annen kategori</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
            }}
            className="btn btn-primary"
          >
            Nullstill søk
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {matchingDishes.map(({ dish, wines: dishWines }, dishIndex) => (
            <div key={dishIndex} style={{ marginBottom: '1rem' }}>
              {/* Dish header */}
              <div style={{
                marginBottom: '1.5rem',
                padding: '1.5rem',
                background: '#fff5ed',
                borderRadius: '12px',
                border: '3px solid #d4af37',
                boxShadow: '0 2px 8px rgba(212, 175, 55, 0.2)'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#722f37',
                  marginBottom: '0.5rem'
                }}>
                  🍽️ {dish}
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '0.5rem' }}>
                  {dishWines.length} {dishWines.length === 1 ? 'vin passer' : 'viner passer'} til denne retten
                </p>
              </div>

              {/* Wines for this dish */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingLeft: '1rem' }}>
                {dishWines.map(({ wine, description }, wineIndex) => {
                  const latestVintage = getLatestVintage(wine);
                  const vintageYears = wine.vintages.map(v => v.year).sort((a, b) => b - a);

                  return (
                    <div
                      key={`${wine.id}-${wineIndex}`}
                      className="card food-pairing-card"
                    >
                      <div className={`wine-color-bar ${wine.color}`} />

                      {/* Wine pairing description */}
                      {description && (
                        <div style={{
                          marginBottom: '1rem',
                          padding: '0.75rem 1rem',
                          background: '#f5f5f5',
                          borderRadius: '8px',
                          borderLeft: '4px solid #d4af37'
                        }}>
                          <div style={{ fontSize: '0.9rem', color: '#666', fontStyle: 'italic' }}>
                            💡 {description}
                          </div>
                        </div>
                      )}

                      {/* Button - shown after description on mobile */}
                      <div className="food-pairing-button-mobile">
                        <button
                          onClick={() => onViewWine(wine)}
                          className="btn btn-primary"
                          style={{ width: '100%' }}
                        >
                          Se detaljer
                        </button>
                      </div>

                      <div className="food-pairing-content">
                        <div className="food-pairing-wine-info">
                          {/* Wine info */}
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

                        {/* Button - shown on desktop */}
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
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
