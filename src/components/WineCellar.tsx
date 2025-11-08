import { useState, useEffect, useMemo } from 'react';
import type { Wine, Vintage, WineStatus } from '../types/wine';
import {
  loadCellar,
  removeFromCellar,
  updateCellarWine,
  exportCellar,
  importCellar
} from '../utils/storageSupabase';
import { getStorageLabel } from '../utils/wine';
import AISommelier from './AISommelier';

type CellarWineWithDetails = {
  wine: Wine;
  vintage: Vintage;
  quantity: number;
  location?: string;
  notes?: string;
  status?: WineStatus;
  rating?: number;
  is_favorite?: boolean;
  tasting_notes?: string;
  tasted_date?: string;
};

interface WineCellarProps {
  wines: Wine[];
  onViewWine: (wine: Wine) => void;
  onUpdate: () => void;
}

const getStorageClass = (rec: string) => rec.replace(/-/g, '-');

export default function WineCellar({ wines, onViewWine, onUpdate }: WineCellarProps) {
  const [cellarWines, setCellarWines] = useState<CellarWineWithDetails[]>([]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importData, setImportData] = useState('');
  const [importError, setImportError] = useState('');

  const loadCellarWines = async () => {
    const cellar = await loadCellar();
    const winesWithDetails: CellarWineWithDetails[] = cellar.wines
      .map(cellarWine => {
        const wineDetails = wines.find(w => w.id === cellarWine.wineId);
        if (!wineDetails) return null;

        const vintage = wineDetails.vintages.find(v => v.year === cellarWine.year);
        if (!vintage) return null;

        const result: CellarWineWithDetails = {
          wine: wineDetails,
          vintage,
          quantity: cellarWine.quantity,
          ...(cellarWine.location && { location: cellarWine.location }),
          ...(cellarWine.notes && { notes: cellarWine.notes }),
          // Collection features
          status: cellarWine.status || 'in_cellar',
          ...(cellarWine.rating && { rating: cellarWine.rating }),
          ...(cellarWine.is_favorite !== undefined && { is_favorite: cellarWine.is_favorite }),
          ...(cellarWine.tasting_notes && { tasting_notes: cellarWine.tasting_notes }),
          ...(cellarWine.tasted_date && { tasted_date: cellarWine.tasted_date }),
        };
        return result;
      })
      .filter((w): w is CellarWineWithDetails => w !== null);

    setCellarWines(winesWithDetails);
  };

  useEffect(() => {
    loadCellarWines();
  }, [wines]);

  const handleRemoveOne = async (wineId: string, year: number) => {
    try {
      console.log('Removing wine:', wineId, year);
      await removeFromCellar(wineId, year, 1);
      await loadCellarWines();
      onUpdate();
      console.log('Wine removed successfully');
    } catch (error) {
      console.error('Error removing wine:', error);
    }
  };

  const handleRemoveAll = async (wineId: string, year: number, wineName: string, quantity: number) => {
    if (confirm(`Fjerne alle ${quantity} flasker av ${wineName} (${year})?`)) {
      await removeFromCellar(wineId, year, quantity);
      await loadCellarWines();
      onUpdate();
    }
  };

  const handleUpdateNotes = async (wineId: string, year: number, notes: string) => {
    await updateCellarWine(wineId, year, { notes });
    await loadCellarWines();
  };

  const handleUpdateLocation = async (wineId: string, year: number, location: string) => {
    await updateCellarWine(wineId, year, { location });
    await loadCellarWines();
  };


  const handleExport = async () => {
    const data = await exportCellar();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `luberon-vinkjeller-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowExportModal(false);
  };

  const handleImport = async () => {
    setImportError('');
    const success = await importCellar(importData);
    if (success) {
      await loadCellarWines();
      onUpdate();
      setShowImportModal(false);
      setImportData('');
    } else {
      setImportError('Ugyldig data format. Vennligst sjekk filen din.');
    }
  };

  const totalBottles = cellarWines.reduce((sum, cw) => sum + cw.quantity, 0);
  const totalValue = cellarWines.reduce((sum, cw) => sum + (cw.vintage.price || 0) * cw.quantity, 0);

  return (
    <div>
      <div className="page-header">
        <h2>Min Samling</h2>
        <p>Organiser og spor din vinsamling</p>
      </div>


      <div className="cellar-actions">
        <button onClick={() => setShowExportModal(true)} className="btn btn-secondary">
          📤 Eksporter
        </button>
        <button onClick={() => setShowImportModal(true)} className="btn btn-secondary">
          📥 Importer
        </button>
        {totalBottles > 0 && (
          <div style={{marginLeft: 'auto', color: '#666', fontSize: '0.9rem'}}>
            <span style={{fontWeight: 600, color: '#d4af37'}}>{totalBottles}</span> flasker
            {totalValue > 0 && (
              <span style={{marginLeft: '1rem'}}>
                • €{totalValue.toFixed(2)}
              </span>
            )}
          </div>
        )}
      </div>

      {cellarWines.length > 0 && (
        <AISommelier cellarWines={cellarWines} allWines={wines} />
      )}

      {cellarWines.length === 0 ? (
        <div className="empty-state">
          <h3>Din vinsamling er tom</h3>
          <p>Legg til viner fra katalogen for å begynne å bygge din samling!</p>
        </div>
      ) : (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          {cellarWines.map(({ wine, vintage, quantity, location, notes }) => (
            <div key={`${wine.id}-${vintage.year}`} className="card cellar-card">
              <div className={`wine-color-bar ${wine.color}`} />

              <div className="cellar-grid">
                <div className="cellar-info">
                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem'}}>
                    <div>
                      <h3>{wine.name}</h3>
                      <p style={{color: '#666', fontSize: '1.1rem', marginBottom: '0.5rem'}}>{wine.producer}</p>
                      <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem'}}>
                        <span className="wine-year">{vintage.year}</span>
                        <span className={`tag-storage ${getStorageClass(vintage.storageRecommendation)}`}>
                          {getStorageLabel(vintage.storageRecommendation)}
                        </span>
                      </div>
                    </div>
                    <div style={{textAlign: 'right'}}>
                      <p className="cellar-quantity">{quantity}</p>
                      <p style={{fontSize: '0.9rem', color: '#999'}}>flasker</p>
                    </div>
                  </div>

                  <div className="tag-list mb-md">
                    {wine.grapes.map((grape, index) => (
                      <span key={index} className="tag tag-grape">
                        {grape}
                      </span>
                    ))}
                  </div>

                  <div className="mb-md">
                    <label style={{display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.9rem'}}>
                      📍 Plassering
                    </label>
                    <input
                      type="text"
                      value={location || ''}
                      onChange={(e) => handleUpdateLocation(wine.id, vintage.year, e.target.value)}
                      placeholder="F.eks. Hylle 2, Rad 3"
                      className="input"
                    />
                  </div>

                  <div>
                    <label style={{display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.9rem'}}>
                      📝 Notater
                    </label>
                    <textarea
                      value={notes || ''}
                      onChange={(e) => handleUpdateNotes(wine.id, vintage.year, e.target.value)}
                      placeholder="Dine notater om denne vinen..."
                      rows={2}
                      className="input-area"
                    />
                  </div>
                </div>

                <div className="cellar-actions-column">
                  <button onClick={() => onViewWine(wine)} className="btn btn-primary">
                    Se detaljer
                  </button>
                  <button onClick={() => handleRemoveOne(wine.id, vintage.year)} className="btn btn-secondary">
                    - Fjern 1 flaske
                  </button>
                  <button
                    onClick={() => handleRemoveAll(wine.id, vintage.year, wine.name, quantity)}
                    style={{
                      background: '#fee2e2',
                      color: '#991b1b',
                      border: '2px solid #fca5a5'
                    }}
                    className="btn"
                  >
                    🗑️ Fjern alle
                  </button>
                  {vintage.price && (
                    <div style={{
                      marginTop: '1rem',
                      padding: '1rem',
                      background: '#f5f5f5',
                      borderRadius: '8px',
                      textAlign: 'center'
                    }}>
                      <p style={{fontSize: '0.8rem', color: '#999', marginBottom: '0.25rem'}}>Verdi</p>
                      <p style={{fontSize: '1.3rem', fontWeight: 700, color: '#2d2d2d'}}>
                        €{(vintage.price * quantity).toFixed(2)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showExportModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Eksporter Vinkjeller</h3>
            <p style={{color: '#666', marginBottom: '2rem'}}>
              Dette vil laste ned din vinkjeller som en JSON-fil. Du kan importere den senere eller på en annen enhet.
            </p>
            <div className="modal-actions">
              <button onClick={handleExport} className="btn btn-primary">
                Last ned
              </button>
              <button onClick={() => setShowExportModal(false)} className="btn btn-secondary">
                Avbryt
              </button>
            </div>
          </div>
        </div>
      )}

      {showImportModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Importer Vinkjeller</h3>
            <p style={{color: '#666', marginBottom: '1rem'}}>
              Lim inn innholdet fra din eksporterte JSON-fil her:
            </p>
            <textarea
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              placeholder='{"wines": [...]}'
              rows={10}
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid #e0e0e0',
                borderRadius: '6px',
                fontFamily: 'monospace',
                fontSize: '0.9rem',
                marginBottom: '1rem'
              }}
            />
            {importError && (
              <p style={{color: '#991b1b', fontSize: '0.9rem', marginBottom: '1rem'}}>{importError}</p>
            )}
            <div className="modal-actions">
              <button onClick={handleImport} className="btn btn-primary">
                Importer
              </button>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportData('');
                  setImportError('');
                }}
                className="btn btn-secondary"
              >
                Avbryt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
