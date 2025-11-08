import { useState, useEffect } from 'react';
import type { Wine } from './types/wine';
import { wines as seedWines } from './data/wines';
import { loadCellar } from './utils/storageSupabase';
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

function App() {
  const [currentView, setCurrentView] = useState<View>('catalog');
  const [selectedWine, setSelectedWine] = useState<Wine | null>(null);
  const [selectedProducer, setSelectedProducer] = useState<string | null>(null);
  const [, setCellarCount] = useState(0);

  useEffect(() => {
    const updateCellarCount = async () => {
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
    </div>
  );
}

export default App;
