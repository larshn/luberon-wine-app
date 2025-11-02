import { useState, useMemo } from 'react';
import type { Wine, WineColor } from '../types/wine';
import { getStorageLabel, getStorageColor, getWineColorClass } from '../utils/wine';

interface WineCatalogProps {
  wines: Wine[];
  onViewWine: (wine: Wine) => void;
}

export default function WineCatalog({ wines, onViewWine }: WineCatalogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterColor, setFilterColor] = useState<WineColor | 'all'>('all');
  const [filterProducer, setFilterProducer] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'year' | 'price'>('name');

  const producers = useMemo(() => {
    const unique = new Set(wines.map(w => w.producer));
    return Array.from(unique).sort();
  }, [wines]);

  const filteredAndSortedWines = useMemo(() => {
    let filtered = wines.filter(wine => {
      const matchesSearch =
        wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wine.producer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wine.grapes.some(g => g.toLowerCase().includes(searchTerm.toLowerCase())) ||
        wine.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesColor = filterColor === 'all' || wine.color === filterColor;
      const matchesProducer = filterProducer === 'all' || wine.producer === filterProducer;

      return matchesSearch && matchesColor && matchesProducer;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'year') return b.year - a.year;
      if (sortBy === 'price') return (a.price || 0) - (b.price || 0);
      return 0;
    });

    return filtered;
  }, [wines, searchTerm, filterColor, filterProducer, sortBy]);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Vinkatalog</h2>
        <p className="text-gray-600">
          Utforsk {wines.length} forskjellige viner fra Luberon-regionen
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🔍 Søk
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Søk etter vin, produsent, druer..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            />
          </div>

          {/* Color Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🍷 Farge
            </label>
            <select
              value={filterColor}
              onChange={(e) => setFilterColor(e.target.value as WineColor | 'all')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">Alle farger</option>
              <option value="red">Rød</option>
              <option value="white">Hvit</option>
              <option value="rosé">Rosé</option>
            </select>
          </div>

          {/* Producer Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🏰 Produsent
            </label>
            <select
              value={filterProducer}
              onChange={(e) => setFilterProducer(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              <option value="all">Alle produsenter</option>
              {producers.map(producer => (
                <option key={producer} value={producer}>{producer}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort */}
        <div className="mt-4 flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Sorter etter:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('name')}
              className={`px-3 py-1 rounded-lg text-sm ${
                sortBy === 'name'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Navn
            </button>
            <button
              onClick={() => setSortBy('year')}
              className={`px-3 py-1 rounded-lg text-sm ${
                sortBy === 'year'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Årgang
            </button>
            <button
              onClick={() => setSortBy('price')}
              className={`px-3 py-1 rounded-lg text-sm ${
                sortBy === 'price'
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pris
            </button>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-4 text-gray-600">
        Viser {filteredAndSortedWines.length} av {wines.length} viner
      </div>

      {/* Wine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedWines.map(wine => (
          <div
            key={wine.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden cursor-pointer"
            onClick={() => onViewWine(wine)}
          >
            {/* Wine Color Indicator */}
            <div className={`h-2 ${getWineColorClass(wine.color)}`} />

            <div className="p-6">
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{wine.name}</h3>
                <p className="text-sm text-gray-600">{wine.producer}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-semibold text-amber-700">{wine.year}</span>
                  {wine.price && (
                    <span className="text-sm text-gray-500">• €{wine.price}</span>
                  )}
                </div>
              </div>

              {/* Grapes */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {wine.grapes.map((grape, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                    >
                      {grape}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {wine.description}
              </p>

              {/* Storage Recommendation */}
              <div className="mb-4">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStorageColor(wine.storageRecommendation)}`}>
                  {getStorageLabel(wine.storageRecommendation)}
                </span>
              </div>

              {/* View Details Button */}
              <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                Se detaljer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredAndSortedWines.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Ingen viner matchet ditt søk</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterColor('all');
              setFilterProducer('all');
            }}
            className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
          >
            Nullstill filtre
          </button>
        </div>
      )}
    </div>
  );
}
