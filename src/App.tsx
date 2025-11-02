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
    // Update cellar count when view changes
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-amber-800 to-orange-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                🍷 Luberon Vinkatalog
              </h1>
              <p className="text-amber-100 mt-1">Découvrez les vins du Luberon</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4">
          <div className="flex gap-1">
            <button
              onClick={() => {
                setCurrentView('catalog');
                setSelectedWine(null);
              }}
              className={`px-6 py-3 font-medium transition-colors ${
                currentView === 'catalog' && !selectedWine
                  ? 'bg-amber-100 text-amber-900 border-b-2 border-amber-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              📖 Vinkatalog
            </button>
            <button
              onClick={() => {
                setCurrentView('cellar');
                setSelectedWine(null);
              }}
              className={`px-6 py-3 font-medium transition-colors relative ${
                currentView === 'cellar' && !selectedWine
                  ? 'bg-amber-100 text-amber-900 border-b-2 border-amber-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              🏺 Min Vinkjeller
              {cellarCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cellarCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
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
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-amber-800 to-orange-900 text-white mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-amber-100">
              Viner fra Luberon, Provence - Frankrikes skjulte perle
            </p>
            <p className="text-sm text-amber-200 mt-2">
              Laget med kjærlighet til Luberon-viner 🍇
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
