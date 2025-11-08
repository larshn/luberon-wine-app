import type { View } from './BottomNav';

interface NavigationTabsProps {
  activeView: View;
  onViewChange: (view: View) => void;
}

export default function NavigationTabs({ activeView, onViewChange }: NavigationTabsProps) {
  return (
    <nav className="nav-tabs">
      <button
        className={`nav-tab ${activeView === 'catalog' ? 'active' : ''}`}
        onClick={() => onViewChange('catalog')}
      >
        Vinkatalog
      </button>
      <button
        className={`nav-tab ${activeView === 'pairing' ? 'active' : ''}`}
        onClick={() => onViewChange('pairing')}
      >
        Vin & Mat
      </button>
      <button
        className={`nav-tab ${activeView === 'collection' ? 'active' : ''}`}
        onClick={() => onViewChange('collection')}
      >
        Min Samling
      </button>
      <button
        className={`nav-tab ${activeView === 'vineyards' ? 'active' : ''}`}
        onClick={() => onViewChange('vineyards')}
      >
        Vingårder
      </button>
      <button
        className={`nav-tab ${activeView === 'learn' ? 'active' : ''}`}
        onClick={() => onViewChange('learn')}
      >
        Lær mer
      </button>
    </nav>
  );
}
