export type View = 'catalog' | 'pairing' | 'collection' | 'vineyards' | 'learn';

interface BottomNavProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

export default function BottomNav({ activeView, onViewChange }: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      <button
        className={`nav-item ${activeView === 'catalog' ? 'active' : ''}`}
        onClick={() => onViewChange('catalog')}
      >
        <span className="nav-icon">🍷</span>
        Katalog
      </button>
      <button
        className={`nav-item ${activeView === 'pairing' ? 'active' : ''}`}
        onClick={() => onViewChange('pairing')}
      >
        <span className="nav-icon">🍽️</span>
        Vin & Mat
      </button>
      <button
        className={`nav-item ${activeView === 'collection' ? 'active' : ''}`}
        onClick={() => onViewChange('collection')}
      >
        <span className="nav-icon">❤️</span>
        Samling
      </button>
      <button
        className={`nav-item ${activeView === 'vineyards' ? 'active' : ''}`}
        onClick={() => onViewChange('vineyards')}
      >
        <span className="nav-icon">🏰</span>
        Vingårder
      </button>
      <button
        className={`nav-item ${activeView === 'learn' ? 'active' : ''}`}
        onClick={() => onViewChange('learn')}
      >
        <span className="nav-icon">📚</span>
        Lær
      </button>
    </nav>
  );
}
