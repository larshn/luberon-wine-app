import { useState } from 'react';
import type { Wine } from '../types/wine';

interface WineCardProps {
  wine: Wine;
  onClick: () => void;
  badge?: string;
  isBookmarked?: boolean;
  onBookmarkToggle?: (wineId: string) => void;
}

// Map wine to food pairing emojis
const getFoodPairingIcons = (wine: Wine): string[] => {
  const icons: string[] = [];

  // Based on wine color and type
  if (wine.color === 'red') {
    icons.push('🥩'); // Meat
    if (wine.grapes.some(g => g.toLowerCase().includes('syrah') || g.toLowerCase().includes('grenache'))) {
      icons.push('🧀'); // Cheese
    }
    icons.push('🍝'); // Pasta
  } else if (wine.color === 'white') {
    icons.push('🐟'); // Fish
    icons.push('🦐'); // Seafood
    icons.push('🥗'); // Salad
  } else if (wine.color === 'rosé') {
    icons.push('🥗'); // Salad
    icons.push('🍤'); // Shrimp
    icons.push('🍕'); // Pizza
  }

  return icons.slice(0, 3); // Max 3 icons
};

export default function WineCard({ wine, onClick, badge, isBookmarked = false, onBookmarkToggle }: WineCardProps) {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  // Get latest vintage
  const latestVintage = wine.vintages.length > 0
    ? wine.vintages.reduce((latest, current) =>
        current.year > latest.year ? current : latest
      )
    : wine.vintages[0];

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarked(!bookmarked);
    onBookmarkToggle?.(wine.id);
  };

  const colorLabel = wine.color === 'red' ? 'Rødvin' : wine.color === 'white' ? 'Hvitvin' : 'Rosévin';
  const foodIcons = getFoodPairingIcons(wine);

  return (
    <div className="wine-card" onClick={onClick}>
      <div className="wine-image-wrapper">
        {badge && <span className="wine-badge">{badge}</span>}

        <button
          className={`bookmark-btn ${bookmarked ? 'saved' : ''}`}
          onClick={handleBookmarkClick}
        >
          {bookmarked ? '❤️' : '🤍'}
        </button>

        <div className="wine-bottle-icon"></div>
      </div>

      <div className="wine-info">
        <span className="wine-type">{colorLabel}</span>
        <h3 className="wine-name">{wine.name}</h3>
        <div className="wine-details">
          <span className="wine-year">{latestVintage.year}</span>
          <span>•</span>
          <span>{wine.producer}</span>
        </div>

        {foodIcons.length > 0 && (
          <div className="wine-pairing-tags">
            {foodIcons.map((icon, index) => (
              <span key={index}>{icon}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
