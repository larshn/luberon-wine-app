import { useState, useEffect } from 'react';
import { Wine } from '../types/wine';
import {
  getStorageLabel,
  getStorageColor,
  getWineColorClass,
  getCurrentAge,
  getDrinkingWindowStatus
} from '../utils/wine';
import { addToCellar, loadCellar } from '../utils/storage';

interface WineDetailProps {
  wine: Wine;
  onBack: () => void;
  onCellarUpdate: () => void;
}

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
        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium border border-green-200">
          ✓ Klar til å drikkes
        </span>
      );
    } else if (drinkingStatus === 'too-young') {
      return (
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium border border-blue-200">
          ⏱ For ung - lagre {wine.optimalDrinkingWindow.start - currentAge} år til
        </span>
      );
    } else {
      return (
        <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium border border-orange-200">
          ⚠ Over topp
        </span>
      );
    }
  };

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-amber-700 hover:text-amber-800 font-medium"
      >
        ← Tilbake til katalog
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Wine Color Indicator */}
        <div className={`h-3 ${getWineColorClass(wine.color)}`} />

        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-800 mb-2">{wine.name}</h1>
                <p className="text-xl text-gray-600">{wine.producer}</p>
              </div>
              {wine.price && (
                <div className="text-right">
                  <p className="text-3xl font-bold text-amber-700">€{wine.price}</p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <span className="text-2xl font-semibold text-amber-700">{wine.year}</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {wine.appellation}
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                {wine.alcoholContent}% alkohol
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm capitalize">
                {wine.color}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-3">Beskrivelse</h2>
            <p className="text-gray-700 leading-relaxed">{wine.description}</p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column */}
            <div>
              {/* Grapes */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">🍇 Druetyper</h2>
                <div className="flex flex-wrap gap-2">
                  {wine.grapes.map((grape, index) => (
                    <span
                      key={index}
                      className="px-3 py-2 bg-purple-100 text-purple-800 rounded-lg font-medium"
                    >
                      {grape}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tasting Notes */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">👃 Smaksnotater</h2>
                <div className="grid grid-cols-2 gap-2">
                  {wine.tastingNotes.map((note, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 bg-amber-50 text-amber-800 rounded-lg text-sm border border-amber-200"
                    >
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div>
              {/* Storage Information */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3">📦 Lagringsinfo</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Anbefaling:</p>
                    <span className={`inline-block px-3 py-2 rounded-lg text-sm font-medium border ${getStorageColor(wine.storageRecommendation)}`}>
                      {getStorageLabel(wine.storageRecommendation)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Optimalt drikkvindu:</p>
                    <p className="text-lg font-semibold text-gray-800">
                      {wine.year + wine.optimalDrinkingWindow.start} - {wine.year + wine.optimalDrinkingWindow.end}
                    </p>
                    <p className="text-sm text-gray-500">
                      ({wine.optimalDrinkingWindow.start}-{wine.optimalDrinkingWindow.end} år fra årgang)
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Nåværende alder:</p>
                    <p className="text-lg font-semibold text-gray-800">{currentAge} år</p>
                  </div>
                  <div>
                    {getStatusBadge()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Food Pairings */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-3">🍽️ Matparinger</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {wine.foodPairings.map((pairing, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border border-orange-200"
                >
                  <h3 className="font-semibold text-gray-800 mb-1">{pairing.dish}</h3>
                  {pairing.description && (
                    <p className="text-sm text-gray-600">{pairing.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Add to Cellar */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-1">Min Vinkjeller</h2>
                {quantityInCellar > 0 ? (
                  <p className="text-gray-600">
                    Du har <span className="font-semibold text-amber-700">{quantityInCellar}</span> flaske
                    {quantityInCellar > 1 ? 'r' : ''} i kjelleren
                  </p>
                ) : (
                  <p className="text-gray-600">Ikke i din kjeller ennå</p>
                )}
              </div>
              <div className="flex items-center gap-4">
                {showAddedMessage && (
                  <span className="text-green-600 font-medium">Lagt til!</span>
                )}
                <button
                  onClick={handleAddToCellar}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
                >
                  + Legg til i kjeller
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
