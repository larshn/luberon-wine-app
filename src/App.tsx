import { useState, useEffect } from 'react';
import type { Wine } from './types/wine';
import { wines as seedWines } from './data/wines';
import Header from './components/Header';
import NavigationTabs from './components/NavigationTabs';
import BottomNav from './components/BottomNav';
import type { View } from './components/BottomNav';
import WineCatalog from './components/WineCatalog';
import WineCellar from './components/WineCellar';
import WineDetail from './components/WineDetail';
import FoodPairing from './components/FoodPairing';
import WineMap from './components/WineMap';
import VintageChart from './components/VintageChart';
import WineScanner from './components/WineScanner';

function App() {
  const [currentView, setCurrentView] = useState<View>('catalog');
  const [selectedWine, setSelectedWine] = useState<Wine | null>(null);
  const [selectedProducer, setSelectedProducer] = useState<string | null>(null);
  const [, setCellarCount] = useState(0);
  const [showScanner, setShowScanner] = useState(false);

  useEffect(() => {
    const updateCellarCount = async () => {
      const { loadCellar } = await import('./utils/storageSupabase');
      const cellar = await loadCellar();
      const total = cellar.wines.reduce((sum, w) => sum + w.quantity, 0);
      setCellarCount(total);
    };
    updateCellarCount();
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

  const handleCellarUpdate = async () => {
    const { loadCellar } = await import('./utils/storageSupabase');
    const cellar = await loadCellar();
    const total = cellar.wines.reduce((sum, w) => sum + w.quantity, 0);
    setCellarCount(total);
  };

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    setSelectedWine(null);
    setSelectedProducer(null);
  };

  // Placeholder Learn View
  const LearnView = () => (
    <div className="content">
      <div className="section-header">
        <div>
          <h2 className="section-title">Lær om vin</h2>
          <p className="section-subtitle">Bli en vinekspert</p>
        </div>
      </div>

      <VintageChart />

      <div className="learning-card">
        <div className="learning-card-icon">🍇</div>
        <h3 className="learning-card-title">Druevarianter i Luberon</h3>
        <p className="learning-card-desc">
          Lær om de viktigste druene som dyrkes i regionen: Syrah, Grenache, Vermentino og mer.
        </p>
        <button className="learn-more">Les mer</button>
      </div>

      <div className="learning-card">
        <div className="learning-card-icon">🌡️</div>
        <h3 className="learning-card-title">Temperatur & Servering</h3>
        <p className="learning-card-desc">
          Få vinen til å smake best - lær om riktig temperatur, dekanting og glass.
        </p>
        <button className="learn-more">Les mer</button>
      </div>

      <div className="learning-card">
        <div className="learning-card-icon">📖</div>
        <h3 className="learning-card-title">Vin & Mat Guiden</h3>
        <p className="learning-card-desc">
          Grunnleggende prinsipper for å pare vin med mat - fra basisregler til avanserte kombinasjoner.
        </p>
        <button className="learn-more">Les mer</button>
      </div>

      <div className="learning-card">
        <div className="learning-card-icon">🏺</div>
        <h3 className="learning-card-title">Vinlagring</h3>
        <p className="learning-card-desc">
          Tips om hvordan du lagrer vin riktig hjemme og hvilke viner som egner seg for lagring.
        </p>
        <button className="learn-more">Les mer</button>
      </div>

      <div className="learning-card">
        <div className="learning-card-icon">🌍</div>
        <h3 className="learning-card-title">AOC Luberon</h3>
        <p className="learning-card-desc">
          Historien og betydningen av AOC-systemet og hva det betyr for Luberon-viner.
        </p>
        <button className="learn-more">Les mer</button>
      </div>

      <div className="learning-card">
        <div className="learning-card-icon">👃</div>
        <h3 className="learning-card-title">Smakssetting & Aromaer</h3>
        <p className="learning-card-desc">
          Lær å identifisere ulike aromaer og smaker i vin - en guide til vinprøving.
        </p>
        <button className="learn-more">Les mer</button>
      </div>
    </div>
  );

  return (
    <div className="app-container">
      <Header />

      <NavigationTabs activeView={currentView} onViewChange={handleViewChange} />

      {selectedWine ? (
        <WineDetail
          wine={selectedWine}
          onBack={handleBackToCatalog}
          onCellarUpdate={handleCellarUpdate}
        />
      ) : currentView === 'catalog' ? (
        <div className="content">
          <WineCatalog wines={seedWines} onViewWine={handleViewWine} initialProducer={selectedProducer} />
        </div>
      ) : currentView === 'pairing' ? (
        <div className="content">
          <FoodPairing wines={seedWines} onViewWine={handleViewWine} />
        </div>
      ) : currentView === 'collection' ? (
        <div className="content">
          <WineCellar
            wines={seedWines}
            onViewWine={handleViewWine}
            onUpdate={handleCellarUpdate}
          />
        </div>
      ) : currentView === 'vineyards' ? (
        <div className="content">
          <WineMap wines={seedWines} onViewWine={handleViewWine} onViewProducer={handleViewProducer} />
        </div>
      ) : (
        <LearnView />
      )}

      <BottomNav activeView={currentView} onViewChange={handleViewChange} />

      {/* Floating scan button */}
      <button
        onClick={() => setShowScanner(true)}
        style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '56px',
          height: '56px',
          backgroundColor: 'var(--primary)',
          color: 'white',
          borderRadius: '50%',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99,
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        }}
        aria-label="Skann strekkode"
        title="Skann strekkode"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      </button>

      {/* Wine scanner modal */}
      {showScanner && (
        <WineScanner
          onClose={() => setShowScanner(false)}
          onWineSaved={handleCellarUpdate}
        />
      )}
    </div>
  );
}

export default App;
