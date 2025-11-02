import { useState, useMemo } from 'react';
import type { Wine, WineColor } from '../types/wine';
import { getStorageLabel } from '../utils/wine';

interface WineCatalogProps {
  wines: Wine[];
  onViewWine: (wine: Wine) => void;
}

const getStorageClass = (rec: string) => {
  return rec.replace(/-/g, '-');
};

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
      <div className="page-header">
        <h2>Vinkatalog</h2>
        <p>Utforsk {wines.length} forskjellige viner fra Luberon-regionen</p>
      </div>

      <div className="search-filters">
        <div className="filter-grid">
          <div className="filter-group">
            <label>🔍 Søk</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Søk etter vin, produsent, druer..."
              className="input"
            />
          </div>

          <div className="filter-group">
            <label>🍷 Farge</label>
            <select
              value={filterColor}
              onChange={(e) => setFilterColor(e.target.value as WineColor | 'all')}
              className="select"
            >
              <option value="all">Alle farger</option>
              <option value="red">Rød</option>
              <option value="white">Hvit</option>
              <option value="rosé">Rosé</option>
            </select>
          </div>

          <div className="filter-group">
            <label>🏰 Produsent</label>
            <select
              value={filterProducer}
              onChange={(e) => setFilterProducer(e.target.value)}
              className="select"
            >
              <option value="all">Alle produsenter</option>
              {producers.map(producer => (
                <option key={producer} value={producer}>{producer}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="sort-controls">
          <span>Sorter etter:</span>
          <button
            onClick={() => setSortBy('name')}
            className={`btn-sort ${sortBy === 'name' ? 'active' : ''}`}
          >
            Navn
          </button>
          <button
            onClick={() => setSortBy('year')}
            className={`btn-sort ${sortBy === 'year' ? 'active' : ''}`}
          >
            Årgang
          </button>
          <button
            onClick={() => setSortBy('price')}
            className={`btn-sort ${sortBy === 'price' ? 'active' : ''}`}
          >
            Pris
          </button>
        </div>
      </div>

      <div className="results-count">
        Viser {filteredAndSortedWines.length} av {wines.length} viner
      </div>

      {filteredAndSortedWines.length === 0 ? (
        <div className="empty-state">
          <h3>Ingen viner matchet ditt søk</h3>
          <p className="mb-md">Prøv å justere søkekriteriene dine</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterColor('all');
              setFilterProducer('all');
            }}
            className="btn btn-primary"
          >
            Nullstill filtre
          </button>
        </div>
      ) : (
        <div className="wine-grid">
          {filteredAndSortedWines.map(wine => (
            <div
              key={wine.id}
              className="card wine-card card-clickable"
              onClick={() => onViewWine(wine)}
            >
              <div className={`wine-color-bar ${wine.color}`} />

              <div className="wine-card-header">
                <h3>{wine.name}</h3>
                <p className="wine-producer">{wine.producer}</p>
                <div className="wine-meta">
                  <span className="wine-year">{wine.year}</span>
                  {wine.price && (
                    <span className="wine-price">€{wine.price}</span>
                  )}
                </div>
              </div>

              <div className="tag-list">
                {wine.grapes.map((grape, index) => (
                  <span key={index} className="tag tag-grape">
                    {grape}
                  </span>
                ))}
              </div>

              <p className="wine-description">{wine.description}</p>

              <div className="mb-md">
                <span className={`tag-storage ${getStorageClass(wine.storageRecommendation)}`}>
                  {getStorageLabel(wine.storageRecommendation)}
                </span>
              </div>

              <button className="btn btn-primary btn-full">
                Se detaljer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
