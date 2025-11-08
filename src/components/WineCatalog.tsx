import { useState, useMemo, useEffect } from 'react';
import type { Wine, WineColor } from '../types/wine';
import WineCard from './WineCard';

interface WineCatalogProps {
  wines: Wine[];
  onViewWine: (wine: Wine) => void;
  initialProducer?: string | null;
}

export default function WineCatalog({ wines, onViewWine, initialProducer }: WineCatalogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterColor, setFilterColor] = useState<WineColor | 'all'>('all');
  const [filterProducer, setFilterProducer] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'year' | 'price'>('name');

  const producers = useMemo(() => {
    const unique = new Set(wines.map(w => w.producer));
    return Array.from(unique).sort();
  }, [wines]);

  // Set filter when initialProducer is provided
  useEffect(() => {
    if (initialProducer) {
      setFilterProducer(initialProducer);
    }
  }, [initialProducer]);

  // Helper to get latest vintage from a wine
  const getLatestVintage = (wine: Wine) => {
    return wine.vintages.length > 0
      ? wine.vintages.reduce((latest, current) =>
          current.year > latest.year ? current : latest
        )
      : wine.vintages[0];
  };

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
      if (sortBy === 'year') {
        const aLatest = getLatestVintage(a);
        const bLatest = getLatestVintage(b);
        return bLatest.year - aLatest.year;
      }
      if (sortBy === 'price') {
        const aLatest = getLatestVintage(a);
        const bLatest = getLatestVintage(b);
        return (aLatest.price || 0) - (bLatest.price || 0);
      }
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
            <WineCard
              key={wine.id}
              wine={wine}
              onClick={() => onViewWine(wine)}
              badge={wine.appellation?.includes('AOC') ? 'AOC' : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
