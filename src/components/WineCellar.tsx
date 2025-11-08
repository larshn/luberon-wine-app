import { useState, useEffect } from 'react';
import type { Wine, Vintage } from '../types/wine';
import {
  loadCellar,
  removeFromCellar,
  exportCellar,
  importCellar
} from '../utils/storageSupabase';
import AISommelier from './AISommelier';

type CellarWineWithDetails = {
  wine: Wine;
  vintage: Vintage;
  quantity: number;
  location?: string;
  notes?: string;
};

interface WineCellarProps {
  wines: Wine[];
  onViewWine: (wine: Wine) => void;
  onUpdate: () => void;
}

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
        <div className="wine-grid">
          {cellarWines.map(({ wine, vintage, quantity, location, notes }) => {
            const colorLabel = wine.color === 'red' ? 'Rødvin' : wine.color === 'white' ? 'Hvitvin' : 'Rosévin';

            return (
              <div key={`${wine.id}-${vintage.year}`} className="wine-card cellar-wine-card">
                <div className="wine-image-wrapper" onClick={() => onViewWine(wine)} style={{cursor: 'pointer'}}>
                  <span className="wine-badge" style={{background: '#722f37', color: 'white'}}>
                    {quantity} stk
                  </span>

                  {wine.imageUrl ? (
                    <img
                      src={wine.imageUrl}
                      alt={`${wine.name} - ${wine.producer}`}
                      className="wine-image"
                      loading="lazy"
                    />
                  ) : (
                    <div className="wine-bottle-icon"></div>
                  )}
                </div>

                <div className="wine-info">
                  <span className="wine-type">{colorLabel}</span>
                  <h3 className="wine-name" onClick={() => onViewWine(wine)} style={{cursor: 'pointer'}}>
                    {wine.name}
                  </h3>
                  <div className="wine-details">
                    <span className="wine-year">{vintage.year}</span>
                    <span>•</span>
                    <span>{wine.producer}</span>
                  </div>

                  {/* Compact cellar info */}
                  {location && (
                    <div style={{
                      marginTop: '0.5rem',
                      padding: '0.5rem',
                      background: '#f5f5f5',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      color: '#666'
                    }}>
                      📍 {location}
                    </div>
                  )}

                  {notes && (
                    <div style={{
                      marginTop: '0.5rem',
                      padding: '0.5rem',
                      background: '#fff5ed',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      color: '#666',
                      fontStyle: 'italic',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }} title={notes}>
                      📝 {notes}
                    </div>
                  )}

                  {/* Quick actions */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginTop: '0.75rem'
                  }}>
                    <div style={{
                      display: 'flex',
                      gap: '0.5rem'
                    }}>
                      <button
                        onClick={() => handleRemoveOne(wine.id, vintage.year)}
                        className="btn btn-secondary"
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          fontSize: '0.85rem'
                        }}
                      >
                        − 1
                      </button>
                      <button
                        onClick={async () => {
                          const { addToCellar } = await import('../utils/storageSupabase');
                          await addToCellar(wine.id, vintage.year);
                          await loadCellarWines();
                          onUpdate();
                        }}
                        className="btn btn-secondary"
                        style={{
                          flex: 1,
                          padding: '0.5rem',
                          fontSize: '0.85rem'
                        }}
                      >
                        + 1
                      </button>
                    </div>
                    <button
                      onClick={() => onViewWine(wine)}
                      className="btn btn-primary"
                      style={{
                        width: '100%',
                        padding: '0.5rem',
                        fontSize: '0.85rem'
                      }}
                    >
                      Detaljer
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
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
