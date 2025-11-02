import { useState, useEffect } from 'react';
import type { Wine } from '../types/wine';
import {
  getStorageLabel,
  getCurrentAge,
  getDrinkingWindowStatus
} from '../utils/wine';
import { addToCellar, loadCellar } from '../utils/storage';

interface WineDetailProps {
  wine: Wine;
  onBack: () => void;
  onCellarUpdate: () => void;
}

const getStorageClass = (rec: string) => rec.replace(/-/g, '-');

export default function WineDetail({ wine, onBack, onCellarUpdate }: WineDetailProps) {
  const [quantityInCellar, setQuantityInCellar] = useState(0);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  useEffect(() => {
    const cellar = loadCellar();
    const cellarWine = cellar.wines.find(w => w.wineId === wine.id);
    setQuantityInCellar(cellarWine?.quantity || 0);
  }, [wine.id]);

  const handleAddToCellar = () => {
    addToCellar(wine.id);
    const cellar = loadCellar();
    const cellarWine = cellar.wines.find(w => w.wineId === wine.id);
    setQuantityInCellar(cellarWine?.quantity || 0);
    onCellarUpdate();

    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  const currentAge = getCurrentAge(wine.year);
  const drinkingStatus = getDrinkingWindowStatus(wine);

  const getStatusBadge = () => {
    if (drinkingStatus === 'ready') {
      return (
        <span className="status-badge ready">
          ✓ Klar til å drikkes
        </span>
      );
    } else if (drinkingStatus === 'too-young') {
      return (
        <span className="status-badge too-young">
          ⏱ For ung - lagre {wine.optimalDrinkingWindow.start - currentAge} år til
        </span>
      );
    } else {
      return (
        <span className="status-badge past-peak">
          ⚠ Over topp
        </span>
      );
    }
  };

  return (
    <div>
      <button onClick={onBack} className="back-button">
        ← Tilbake til katalog
      </button>

      <div className="card wine-detail-card">
        <div className={`wine-color-bar ${wine.color}`} />

        <div className="detail-header">
          <div className="detail-title">
            <h1>{wine.name}</h1>
            <p className="detail-producer">{wine.producer}</p>
          </div>
          {wine.price && (
            <div className="detail-price">
              <p className="detail-price-value">€{wine.price}</p>
            </div>
          )}
        </div>

        <div className="tag-list mb-lg">
          <span className="wine-year" style={{fontSize: '1.5rem'}}>{wine.year}</span>
          <span className="tag" style={{background: '#f5f5f5', border: '1px solid #ddd'}}>
            {wine.appellation}
          </span>
          <span className="tag" style={{background: '#f5f5f5', border: '1px solid #ddd'}}>
            {wine.alcoholContent}% alkohol
          </span>
          <span className="tag" style={{background: '#f5f5f5', border: '1px solid #ddd', textTransform: 'capitalize'}}>
            {wine.color}
          </span>
        </div>

        <div className="detail-section mb-lg">
          <h2>Beskrivelse</h2>
          <p>{wine.description}</p>
        </div>

        <div className="detail-grid">
          <div>
            <div className="detail-section">
              <h2>🍇 Druetyper</h2>
              <div className="tag-list">
                {wine.grapes.map((grape, index) => (
                  <span key={index} className="tag tag-grape">
                    {grape}
                  </span>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h2>👃 Smaksnotater</h2>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem'}}>
                {wine.tastingNotes.map((note, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#fff5ed',
                      color: '#8b4049',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      border: '1px solid #ffe4d6'
                    }}
                  >
                    {note}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="detail-section">
              <h2>📦 Lagringsinfo</h2>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div>
                  <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem'}}>Anbefaling:</p>
                  <span className={`tag-storage ${getStorageClass(wine.storageRecommendation)}`}>
                    {getStorageLabel(wine.storageRecommendation)}
                  </span>
                </div>
                <div>
                  <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem'}}>Optimalt drikkvindu:</p>
                  <p style={{fontSize: '1.2rem', fontWeight: 700, color: '#722f37'}}>
                    {wine.year + wine.optimalDrinkingWindow.start} - {wine.year + wine.optimalDrinkingWindow.end}
                  </p>
                  <p style={{fontSize: '0.85rem', color: '#999'}}>
                    ({wine.optimalDrinkingWindow.start}-{wine.optimalDrinkingWindow.end} år fra årgang)
                  </p>
                </div>
                <div>
                  <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem'}}>Nåværende alder:</p>
                  <p style={{fontSize: '1.2rem', fontWeight: 700, color: '#722f37'}}>{currentAge} år</p>
                </div>
                <div>
                  {getStatusBadge()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-section">
          <h2>🍽️ Matparinger</h2>
          <div className="food-grid">
            {wine.foodPairings.map((pairing, index) => (
              <div key={index} className="food-card">
                <h3>{pairing.dish}</h3>
                {pairing.description && <p>{pairing.description}</p>}
              </div>
            ))}
          </div>
        </div>

        <div style={{borderTop: '2px solid #e0e0e0', paddingTop: '2rem', marginTop: '2rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'}}>
            <div>
              <h2 style={{fontSize: '1.3rem', color: '#722f37', marginBottom: '0.5rem'}}>Min Vinkjeller</h2>
              {quantityInCellar > 0 ? (
                <p style={{color: '#666'}}>
                  Du har <span style={{fontWeight: 600, color: '#d4af37'}}>{quantityInCellar}</span> flaske
                  {quantityInCellar > 1 ? 'r' : ''} i kjelleren
                </p>
              ) : (
                <p style={{color: '#666'}}>Ikke i din kjeller ennå</p>
              )}
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              {showAddedMessage && (
                <span style={{color: '#065f46', fontWeight: 600}}>Lagt til!</span>
              )}
              <button onClick={handleAddToCellar} className="btn btn-primary">
                + Legg til i kjeller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
