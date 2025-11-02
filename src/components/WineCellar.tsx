import { useState, useEffect } from 'react';
import { Wine } from '../types/wine';
import {
  loadCellar,
  removeFromCellar,
  updateCellarWine,
  exportCellar,
  importCellar
} from '../utils/storage';
import { getWineColorClass, getStorageLabel, getStorageColor } from '../utils/wine';

interface WineCellarProps {
  wines: Wine[];
  onViewWine: (wine: Wine) => void;
  onUpdate: () => void;
}

export default function WineCellar({ wines, onViewWine, onUpdate }: WineCellarProps) {
  const [cellarWines, setCellarWines] = useState<Array<{ wine: Wine; quantity: number; location?: string; notes?: string }>>([]);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importData, setImportData] = useState('');
  const [importError, setImportError] = useState('');

  const loadCellarWines = () => {
    const cellar = loadCellar();
    const winesWithDetails = cellar.wines
      .map(cellarWine => {
        const wineDetails = wines.find(w => w.id === cellarWine.wineId);
        return wineDetails
          ? {
              wine: wineDetails,
              quantity: cellarWine.quantity,
              location: cellarWine.location,
              notes: cellarWine.notes
            }
          : null;
      })
      .filter((w): w is { wine: Wine; quantity: number; location?: string; notes?: string } => w !== null);

    setCellarWines(winesWithDetails);
  };

  useEffect(() => {
    loadCellarWines();
  }, [wines]);

  const handleRemoveOne = (wineId: string) => {
    removeFromCellar(wineId, 1);
    loadCellarWines();
    onUpdate();
  };

  const handleRemoveAll = (wineId: string) => {
    const cellarWine = cellarWines.find(cw => cw.wine.id === wineId);
    if (cellarWine && confirm(`Fjerne alle ${cellarWine.quantity} flasker av ${cellarWine.wine.name}?`)) {
      removeFromCellar(wineId, cellarWine.quantity);
      loadCellarWines();
      onUpdate();
    }
  };

  const handleUpdateNotes = (wineId: string, notes: string) => {
    updateCellarWine(wineId, { notes });
    loadCellarWines();
  };

  const handleUpdateLocation = (wineId: string, location: string) => {
    updateCellarWine(wineId, { location });
    loadCellarWines();
  };

  const handleExport = () => {
    const data = exportCellar();
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

  const handleImport = () => {
    setImportError('');
    const success = importCellar(importData);
    if (success) {
      loadCellarWines();
      onUpdate();
      setShowImportModal(false);
      setImportData('');
    } else {
      setImportError('Ugyldig data format. Vennligst sjekk filen din.');
    }
  };

  const totalBottles = cellarWines.reduce((sum, cw) => sum + cw.quantity, 0);
  const totalValue = cellarWines.reduce((sum, cw) => sum + (cw.wine.price || 0) * cw.quantity, 0);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Min Vinkjeller</h2>
        <div className="flex gap-6 text-gray-600">
          <p>
            <span className="font-semibold text-amber-700">{totalBottles}</span> flasker
          </p>
          {totalValue > 0 && (
            <p>
              Estimert verdi: <span className="font-semibold text-amber-700">€{totalValue.toFixed(2)}</span>
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => setShowExportModal(true)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          📤 Eksporter kjeller
        </button>
        <button
          onClick={() => setShowImportModal(true)}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          📥 Importer kjeller
        </button>
      </div>

      {/* Wine List */}
      {cellarWines.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-gray-500 text-lg mb-4">Din vinkjeller er tom</p>
          <p className="text-gray-400">Legg til viner fra katalogen for å begynne å bygge din samling!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cellarWines.map(({ wine, quantity, location, notes }) => (
            <div key={wine.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className={`h-2 ${getWineColorClass(wine.color)}`} />
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Wine Info */}
                  <div className="lg:col-span-2">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">{wine.name}</h3>
                        <p className="text-gray-600">{wine.producer}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-lg font-semibold text-amber-700">{wine.year}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStorageColor(wine.storageRecommendation)}`}>
                            {getStorageLabel(wine.storageRecommendation)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold text-amber-700">{quantity}</p>
                        <p className="text-sm text-gray-500">flasker</p>
                      </div>
                    </div>

                    {/* Grapes */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {wine.grapes.map((grape, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                        >
                          {grape}
                        </span>
                      ))}
                    </div>

                    {/* Location */}
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        📍 Plassering
                      </label>
                      <input
                        type="text"
                        value={location || ''}
                        onChange={(e) => handleUpdateLocation(wine.id, e.target.value)}
                        placeholder="F.eks. Hylle 2, Rad 3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                      />
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        📝 Notater
                      </label>
                      <textarea
                        value={notes || ''}
                        onChange={(e) => handleUpdateNotes(wine.id, e.target.value)}
                        placeholder="Dine notater om denne vinen..."
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => onViewWine(wine)}
                      className="w-full px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
                    >
                      Se detaljer
                    </button>
                    <button
                      onClick={() => handleRemoveOne(wine.id)}
                      className="w-full px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-800 rounded-lg transition-colors"
                    >
                      - Fjern 1 flaske
                    </button>
                    <button
                      onClick={() => handleRemoveAll(wine.id)}
                      className="w-full px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 rounded-lg transition-colors"
                    >
                      🗑️ Fjern alle
                    </button>
                    {wine.price && (
                      <div className="mt-2 p-3 bg-gray-50 rounded-lg text-center">
                        <p className="text-xs text-gray-600">Verdi</p>
                        <p className="text-lg font-bold text-gray-800">
                          €{(wine.price * quantity).toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Eksporter Vinkjeller</h3>
            <p className="text-gray-600 mb-6">
              Dette vil laste ned din vinkjeller som en JSON-fil. Du kan importere den senere eller på en annen enhet.
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Last ned
              </button>
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
              >
                Avbryt
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Importer Vinkjeller</h3>
            <p className="text-gray-600 mb-4">
              Lim inn innholdet fra din eksporterte JSON-fil her:
            </p>
            <textarea
              value={importData}
              onChange={(e) => setImportData(e.target.value)}
              placeholder='{"wines": [...]}'
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent font-mono text-sm mb-4"
            />
            {importError && (
              <p className="text-red-600 text-sm mb-4">{importError}</p>
            )}
            <div className="flex gap-3">
              <button
                onClick={handleImport}
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Importer
              </button>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportData('');
                  setImportError('');
                }}
                className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors"
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
