import { useState, useEffect } from 'react';
import type { Wine } from './types/wine';
import { wines as seedWines } from './data/wines';
import { loadCellar } from './utils/storage';
import WineCatalog from './components/WineCatalog';
import WineCellar from './components/WineCellar';
import WineDetail from './components/WineDetail';

type View = 'catalog' | 'cellar';

function App() {
  const [currentView, setCurrentView] = useState<View>('catalog');
  const [selectedWine, setSelectedWine] = useState<Wine | null>(null);
  const [cellarCount, setCellarCount] = useState(0);

  useEffect(() => {
    const cellar = loadCellar();
    const total = cellar.wines.reduce((sum, w) => sum + w.quantity, 0);
    setCellarCount(total);
  }, [currentView]);

  const handleViewWine = (wine: Wine) => {
    setSelectedWine(wine);
  };

  const handleBackToCatalog = () => {
    setSelectedWine(null);
  };

  const handleCellarUpdate = () => {
    const cellar = loadCellar();
    const total = cellar.wines.reduce((sum, w) => sum + w.quantity, 0);
    setCellarCount(total);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="container header-content">
          <div>
            <h1>🍷 Luberon Vinkatalog</h1>
            <p>Découvrez les vins du Luberon</p>
          </div>
        </div>
      </header>

      <nav className="nav">
        <div className="container nav-content">
          <button
            onClick={() => {
              setCurrentView('catalog');
              setSelectedWine(null);
            }}
            className={`nav-button ${currentView === 'catalog' && !selectedWine ? 'active' : ''}`}
          >
            📖 Vinkatalog
          </button>
          <button
            onClick={() => {
              setCurrentView('cellar');
              setSelectedWine(null);
            }}
            className={`nav-button ${currentView === 'cellar' && !selectedWine ? 'active' : ''}`}
          >
            🏺 Min Vinkjeller
            {cellarCount > 0 && (
              <span className="nav-badge">{cellarCount}</span>
            )}
          </button>
        </div>
      </nav>

      <main className="main-content">
        <div className="container">
          {selectedWine ? (
            <WineDetail
              wine={selectedWine}
              onBack={handleBackToCatalog}
              onCellarUpdate={handleCellarUpdate}
            />
          ) : currentView === 'catalog' ? (
            <WineCatalog wines={seedWines} onViewWine={handleViewWine} />
          ) : (
            <WineCellar
              wines={seedWines}
              onViewWine={handleViewWine}
              onUpdate={handleCellarUpdate}
            />
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <p>Viner fra Luberon, Provence - Frankrikes skjulte perle</p>
          <p>Laget med kjærlighet til Luberon-viner 🍇</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
