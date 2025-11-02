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

  const matchingWines = useMemo(() => {
    // Filter wines that match search term or category
    const filtered = wines.filter(wine => {
      // Check if any food pairing matches the search term
      const matchesSearch = searchTerm === '' ||
        wine.foodPairings.some(pairing =>
          pairing.dish.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (pairing.description && pairing.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );

      // Check if wine matches selected category
      const matchesCategory = selectedCategory === 'all' ||
        wine.foodPairings.some(pairing => {
          const keywords = getCategoryKeywords(selectedCategory);
          const combinedText = `${pairing.dish} ${pairing.description || ''}`.toLowerCase();
          return keywords.some(keyword => combinedText.includes(keyword));
        });

      return matchesSearch && matchesCategory;
    });

    // Create wine-pairing pairs for display
    const winePairings = filtered.flatMap(wine =>
      wine.foodPairings
        .filter(pairing => {
          const matchesSearch = searchTerm === '' ||
            pairing.dish.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (pairing.description && pairing.description.toLowerCase().includes(searchTerm.toLowerCase()));

          const matchesCategory = selectedCategory === 'all' ||
            getCategoryKeywords(selectedCategory).some(keyword =>
              `${pairing.dish} ${pairing.description || ''}`.toLowerCase().includes(keyword)
            );

          return matchesSearch && matchesCategory;
        })
        .map(pairing => ({
          wine,
          pairing
        }))
    );

    return winePairings;
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
        Fant {matchingWines.length} {matchingWines.length === 1 ? 'match' : 'matcher'}
      </div>

      {matchingWines.length === 0 ? (
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {matchingWines.map(({ wine, pairing }, index) => {
            const latestVintage = getLatestVintage(wine);
            const vintageYears = wine.vintages.map(v => v.year).sort((a, b) => b - a);

            return (
              <div
                key={`${wine.id}-${index}`}
                className="card food-pairing-card"
              >
                <div className={`wine-color-bar ${wine.color}`} />

                {/* Dish info */}
                <div style={{
                  marginBottom: '1rem',
                  padding: '1rem',
                  background: '#f5f5f5',
                  borderRadius: '8px',
                  borderLeft: '4px solid #d4af37'
                }}>
                  <div style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: '#722f37',
                    marginBottom: '0.25rem'
                  }}>
                    🍽️ {pairing.dish}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#666' }}>
                    {pairing.description}
                  </div>
                </div>

                {/* Button - shown after dish on mobile */}
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
      )}
    </div>
  );
}
