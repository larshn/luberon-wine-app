import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Wine } from '../types/wine';
import type { PurchaseLocation } from '../types/wine';

interface WineMapProps {
  wines: Wine[];
  onViewWine?: (wine: Wine) => void;
  onViewProducer?: (producerName: string) => void;
}

interface LocationWithWines {
  location: PurchaseLocation;
  wines: Wine[];
}

// Custom wine bottle icon
const wineIcon = new Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#722f37" width="32" height="32">
      <path d="M8 2h8v2h-1v4.5c0 1.93 1.57 3.5 3.5 3.5v10c0 1.1-.9 2-2 2h-9c-1.1 0-2-.9-2-2V12c1.93 0 3.5-1.57 3.5-3.5V4H8V2z"/>
      <circle cx="12" cy="18" r="2" fill="white"/>
    </svg>
  `),
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32]
});

export default function WineMap({ wines, onViewWine, onViewProducer }: WineMapProps) {
  // Extract unique locations with their associated wines
  const locationsMap = new Map<string, LocationWithWines>();

  wines.forEach(wine => {
    wine.purchaseLocations?.forEach(location => {
      if (location.coordinates) {
        const key = `${location.coordinates.lat},${location.coordinates.lng}`;
        if (locationsMap.has(key)) {
          const existing = locationsMap.get(key)!;
          if (!existing.wines.find(w => w.id === wine.id)) {
            existing.wines.push(wine);
          }
        } else {
          locationsMap.set(key, {
            location,
            wines: [wine]
          });
        }
      }
    });
  });

  const locations = Array.from(locationsMap.values());

  // Center of Luberon region (approximate)
  const centerPosition: [number, number] = [43.83, 5.30];

  return (
    <div>
      <div className="page-header">
        <h2>🗺️ Luberon Vinkart</h2>
        <p>Utforsk vingårdene i Luberon-regionen</p>
      </div>

      {/* Info box */}
      <div className="card" style={{ marginBottom: '2rem', background: '#fff5ed', border: '2px solid #ffe4d6' }}>
        <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: '1.6', marginBottom: '0.5rem' }}>
          🍇 <strong>Luberon-regionen</strong> ligger i hjertet av Provence, mellom Ventoux og Alpillene.
          Vinene dyrkes på solrike skråninger med kalksteinjord, perfekt for både røde og hvite druer.
        </p>
        <p style={{ fontSize: '0.9rem', color: '#666', lineHeight: '1.6' }}>
          Klikk på markørene for å se hvilke viner som kommer fra hver vingård.
        </p>
      </div>

      {/* Map */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <MapContainer
          center={centerPosition}
          zoom={11}
          style={{ height: '600px', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {locations.map((locationWithWines, index) => {
            const { location, wines: locationWines } = locationWithWines;

            return (
              <Marker
                key={index}
                position={[location.coordinates!.lat, location.coordinates!.lng]}
                icon={wineIcon}
              >
                <Popup maxWidth={300}>
                  <div style={{ padding: '0.5rem' }}>
                    <h3 style={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: '#722f37',
                      marginBottom: '0.5rem'
                    }}>
                      {location.name}
                    </h3>

                    {location.address && (
                      <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
                        📍 {location.address}
                        {location.city && `, ${location.city}`}
                      </p>
                    )}

                    {location.phone && (
                      <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
                        📞 {location.phone}
                      </p>
                    )}

                    {location.website && (
                      <p style={{ fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                        <a
                          href={location.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: '#722f37', textDecoration: 'underline' }}
                        >
                          🌐 Besøk nettsiden
                        </a>
                      </p>
                    )}

                    {locationWines.length > 0 && (
                      <div style={{
                        marginTop: '1rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid #ffe4d6'
                      }}>
                        <p
                          style={{
                            fontSize: '0.9rem',
                            color: onViewProducer ? '#722f37' : '#666',
                            cursor: onViewProducer ? 'pointer' : 'default',
                            textDecoration: onViewProducer ? 'underline' : 'none',
                            fontWeight: onViewProducer ? 600 : 400
                          }}
                          onClick={() => onViewProducer && onViewProducer(location.name)}
                        >
                          🍷 {locationWines.length} {locationWines.length === 1 ? 'vin' : 'viner'} fra denne vingården
                        </p>
                      </div>
                    )}

                    {location.openingHours && (
                      <div style={{
                        marginTop: '1rem',
                        paddingTop: '1rem',
                        borderTop: '1px solid #ffe4d6'
                      }}>
                        <div style={{
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          color: '#722f37',
                          marginBottom: '0.5rem'
                        }}>
                          ⏰ Åpningstider:
                        </div>
                        <div style={{ fontSize: '0.8rem', color: '#666', lineHeight: '1.4' }}>
                          {location.openingHours.monday && `Man: ${location.openingHours.monday}`}<br />
                          {location.openingHours.notes && (
                            <div style={{ marginTop: '0.25rem', fontStyle: 'italic' }}>
                              💡 {location.openingHours.notes}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Location list */}
      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.4rem', color: '#722f37', marginBottom: '1rem' }}>
          📍 Vingårder på kartet
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {locations.map((locationWithWines, index) => {
            const { location, wines: locationWines } = locationWithWines;

            return (
              <div key={index} className="card">
                <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#722f37', marginBottom: '0.5rem' }}>
                  {location.name}
                </h4>

                {location.address && (
                  <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                    📍 {location.address}, {location.city}
                  </p>
                )}

                <div style={{ marginTop: '1rem' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                    Antall viner: {locationWines.length}
                  </div>
                  <div className="tag-list">
                    {locationWines.map(wine => (
                      <span
                        key={wine.id}
                        className="tag"
                        style={{
                          background: wine.color === 'red' ? '#722f37' : wine.color === 'white' ? '#d4af37' : '#ff9999',
                          color: 'white',
                          cursor: onViewWine ? 'pointer' : 'default'
                        }}
                        onClick={() => onViewWine && onViewWine(wine)}
                      >
                        {wine.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
