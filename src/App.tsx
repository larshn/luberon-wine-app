import { useState, useEffect } from 'react';
import type { Wine } from './types/wine';
import { wines as seedWines } from './data/wines';
import { loadCellar } from './utils/storage';
import WineCatalog from './components/WineCatalog';
import WineCellar from './components/WineCellar';
import WineDetail from './components/WineDetail';
import FoodPairing from './components/FoodPairing';
import ChipsPairing from './components/ChipsPairing';
import WineMap from './components/WineMap';

type View = 'catalog' | 'cellar' | 'food-pairing' | 'chips-pairing' | 'map';

function App() {
  const [currentView, setCurrentView] = useState<View>('catalog');
  const [selectedWine, setSelectedWine] = useState<Wine | null>(null);
  const [selectedProducer, setSelectedProducer] = useState<string | null>(null);
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

  const handleViewProducer = (producerName: string) => {
    setSelectedProducer(producerName);
    setSelectedWine(null);
    setCurrentView('catalog');
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
            <h1>🍷 Luberon på Glass</h1>
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
            📖 <span className="nav-button-text">Vinkatalog</span>
          </button>
          <button
            onClick={() => {
              setCurrentView('food-pairing');
              setSelectedWine(null);
              setSelectedProducer(null);
            }}
            className={`nav-button ${currentView === 'food-pairing' && !selectedWine ? 'active' : ''}`}
          >
            🍽️ <span className="nav-button-text">Mat til Vin</span>
          </button>
          <button
            onClick={() => {
              setCurrentView('chips-pairing');
              setSelectedWine(null);
              setSelectedProducer(null);
            }}
            className={`nav-button ${currentView === 'chips-pairing' && !selectedWine ? 'active' : ''}`}
          >
            🥔 <span className="nav-button-text">Vin & Potetgull</span>
          </button>
          <button
            onClick={() => {
              setCurrentView('map');
              setSelectedWine(null);
              setSelectedProducer(null);
            }}
            className={`nav-button ${currentView === 'map' && !selectedWine ? 'active' : ''}`}
          >
            🗺️ <span className="nav-button-text">Vinkart</span>
          </button>
          <button
            onClick={() => {
              setCurrentView('cellar');
              setSelectedWine(null);
              setSelectedProducer(null);
            }}
            className={`nav-button ${currentView === 'cellar' && !selectedWine ? 'active' : ''}`}
          >
            🏺 <span className="nav-button-text">Min Vinkjeller</span>
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
            <WineCatalog wines={seedWines} onViewWine={handleViewWine} initialProducer={selectedProducer} />
          ) : currentView === 'food-pairing' ? (
            <FoodPairing wines={seedWines} onViewWine={handleViewWine} />
          ) : currentView === 'chips-pairing' ? (
            <ChipsPairing wines={seedWines} onViewWine={handleViewWine} />
          ) : currentView === 'map' ? (
            <WineMap wines={seedWines} onViewWine={handleViewWine} onViewProducer={handleViewProducer} />
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
