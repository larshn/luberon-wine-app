import { useState, useEffect } from 'react';
import type { Wine, Vintage } from '../types/wine';
import {
  getStorageLabel,
  getCurrentAge,
  getDrinkingWindowStatus
} from '../utils/wine';
import { addToCellar, loadCellar } from '../utils/storageSupabase';

interface WineDetailProps {
  wine: Wine;
  onBack: () => void;
  onCellarUpdate: () => void;
}

const getStorageClass = (rec: string) => rec.replace(/-/g, '-');

export default function WineDetail({ wine, onBack, onCellarUpdate }: WineDetailProps) {
  // Select the latest vintage by default
  const [selectedVintage, setSelectedVintage] = useState<Vintage>(
    wine.vintages[0] || wine.vintages.reduce((latest, current) =>
      current.year > latest.year ? current : latest
    )
  );
  const [quantityInCellar, setQuantityInCellar] = useState(0);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [expandedLocations, setExpandedLocations] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    const updateQuantity = async () => {
      const cellar = await loadCellar();
      const cellarWine = cellar.wines.find(w => w.wineId === wine.id && w.year === selectedVintage.year);
      setQuantityInCellar(cellarWine?.quantity || 0);
    };
    updateQuantity();
  }, [wine.id, selectedVintage.year]);

  const handleAddToCellar = async () => {
    await addToCellar(wine.id, selectedVintage.year);
    const cellar = await loadCellar();
    const cellarWine = cellar.wines.find(w => w.wineId === wine.id && w.year === selectedVintage.year);
    setQuantityInCellar(cellarWine?.quantity || 0);
    onCellarUpdate();

    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  const currentAge = getCurrentAge(selectedVintage.year);
  const drinkingStatus = getDrinkingWindowStatus({
    year: selectedVintage.year,
    optimalDrinkingWindow: selectedVintage.optimalDrinkingWindow
  } as any);

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
          ⏱ For ung - lagre {selectedVintage.optimalDrinkingWindow.start - currentAge} år til
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

  // Sort vintages by year (newest first)
  const sortedVintages = [...wine.vintages].sort((a, b) => b.year - a.year);

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
          {selectedVintage.price && (
            <div className="detail-price">
              <p className="detail-price-value">€{selectedVintage.price}</p>
            </div>
          )}
        </div>

        {/* Vintage Selector */}
        {wine.vintages.length > 1 && (
          <div style={{
            marginBottom: '2rem',
            padding: '1.5rem',
            background: '#fff5ed',
            borderRadius: '8px',
            border: '2px solid #ffe4d6'
          }}>
            <h3 style={{ fontSize: '1.1rem', color: '#722f37', marginBottom: '1rem' }}>
              📅 Tilgjengelige årganger ({wine.vintages.length})
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {sortedVintages.map(vintage => (
                <button
                  key={vintage.year}
                  onClick={() => setSelectedVintage(vintage)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: selectedVintage.year === vintage.year ? '#722f37' : 'white',
                    color: selectedVintage.year === vintage.year ? 'white' : '#722f37',
                    border: `2px solid ${selectedVintage.year === vintage.year ? '#722f37' : '#d4af37'}`,
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: selectedVintage.year === vintage.year ? '0 4px 12px rgba(114, 47, 55, 0.3)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedVintage.year !== vintage.year) {
                      e.currentTarget.style.background = '#f5f5f5';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedVintage.year !== vintage.year) {
                      e.currentTarget.style.background = 'white';
                    }
                  }}
                >
                  {vintage.year}
                </button>
              ))}
            </div>
            <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#666' }}>
              Klikk på en årgang for å se detaljer
            </p>
          </div>
        )}

        <div className="tag-list mb-lg">
          <span className="wine-year" style={{fontSize: '1.5rem'}}>{selectedVintage.year}</span>
          <span className="tag" style={{background: '#f5f5f5', border: '1px solid #ddd'}}>
            {wine.appellation}
          </span>
          <span className="tag" style={{background: '#f5f5f5', border: '1px solid #ddd'}}>
            {selectedVintage.alcoholContent}% alkohol
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
              <h2>👃 Smaksnotater ({selectedVintage.year})</h2>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem'}}>
                {selectedVintage.tastingNotes.map((note, index) => (
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
              <h2>📦 Lagringsinfo ({selectedVintage.year})</h2>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                <div>
                  <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem'}}>Anbefaling:</p>
                  <span className={`tag-storage ${getStorageClass(selectedVintage.storageRecommendation)}`}>
                    {getStorageLabel(selectedVintage.storageRecommendation)}
                  </span>
                </div>
                <div>
                  <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem'}}>Optimalt drikkvindu:</p>
                  <p style={{fontSize: '1.2rem', fontWeight: 700, color: '#722f37'}}>
                    {selectedVintage.year + selectedVintage.optimalDrinkingWindow.start} - {selectedVintage.year + selectedVintage.optimalDrinkingWindow.end}
                  </p>
                  <p style={{fontSize: '0.85rem', color: '#999'}}>
                    ({selectedVintage.optimalDrinkingWindow.start}-{selectedVintage.optimalDrinkingWindow.end} år fra årgang)
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

        {/* Purchase Locations */}
        {wine.purchaseLocations && wine.purchaseLocations.length > 0 && (
          <div className="detail-section">
            <h2>🛒 Hvor kan du kjøpe denne vinen?</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {wine.purchaseLocations.map((location, index) => (
                <div
                  key={index}
                  style={{
                    padding: '1.5rem',
                    background: '#fff5ed',
                    borderRadius: '12px',
                    border: '2px solid #ffe4d6'
                  }}
                >
                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.3rem', color: '#722f37', marginBottom: '0.5rem' }}>
                      {location.type === 'chateau' && '🏰 '}
                      {location.type === 'wine-shop' && '🏪 '}
                      {location.type === 'online' && '🌐 '}
                      {location.type === 'restaurant' && '🍽️ '}
                      {location.name}
                    </h3>
                    {location.priceRange && (
                      <span style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        background: '#d4af37',
                        color: 'white',
                        borderRadius: '6px',
                        fontSize: '0.9rem',
                        fontWeight: 600
                      }}>
                        {location.priceRange}
                      </span>
                    )}
                  </div>

                  {/* Description/Notes - Show first */}
                  {location.notes && (
                    <p style={{
                      marginBottom: '1rem',
                      padding: '1rem',
                      background: 'white',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      color: '#666',
                      borderLeft: '4px solid #d4af37'
                    }}>
                      {location.notes}
                    </p>
                  )}

                  {/* Address - Always visible */}
                  {location.address && (
                    <div style={{ marginBottom: '1rem' }}>
                      <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>📍 Adresse</p>
                      <p style={{ fontSize: '0.95rem', fontWeight: 500, wordBreak: 'break-word' }}>
                        {location.coordinates ? (
                          <a
                            href={`https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#722f37', textDecoration: 'underline' }}
                          >
                            {location.address}<br />
                            {location.postalCode && location.city && `${location.postalCode} ${location.city}`}
                          </a>
                        ) : (
                          <>
                            {location.address}<br />
                            {location.postalCode && location.city && `${location.postalCode} ${location.city}`}
                          </>
                        )}
                      </p>
                    </div>
                  )}

                  {/* Expandable Contact Info Section */}
                  {(location.phone || location.email || location.website || location.openingHours) && (
                    <div style={{ marginBottom: '1rem' }}>
                      <button
                        onClick={() => setExpandedLocations(prev => ({ ...prev, [index]: !prev[index] }))}
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          background: 'white',
                          border: '2px solid #ffe4d6',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '0.95rem',
                          fontWeight: 600,
                          color: '#722f37',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <span>📋 Kontaktinformasjon & Åpningstider</span>
                        <span>{expandedLocations[index] ? '▼' : '▶'}</span>
                      </button>

                      {expandedLocations[index] && (
                        <div style={{
                          marginTop: '0.75rem',
                          padding: '1rem',
                          background: 'white',
                          borderRadius: '8px',
                          border: '2px solid #ffe4d6'
                        }}>
                          {/* Contact Info Grid - Responsive */}
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '1rem',
                            marginBottom: location.openingHours ? '1rem' : '0'
                          }}>
                            {location.phone && (
                              <div>
                                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>📞 Telefon</p>
                                <p style={{ fontSize: '0.95rem', fontWeight: 500, wordBreak: 'break-word' }}>
                                  <a href={`tel:${location.phone}`} style={{ color: '#722f37', textDecoration: 'none' }}>
                                    {location.phone}
                                  </a>
                                </p>
                              </div>
                            )}
                            {location.email && (
                              <div>
                                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>✉️ E-post</p>
                                <p style={{ fontSize: '0.95rem', fontWeight: 500, wordBreak: 'break-word' }}>
                                  <a href={`mailto:${location.email}`} style={{ color: '#722f37', textDecoration: 'none' }}>
                                    {location.email}
                                  </a>
                                </p>
                              </div>
                            )}
                            {location.website && (
                              <div>
                                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.25rem' }}>🌐 Nettside</p>
                                <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>
                                  <a
                                    href={location.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: '#722f37', textDecoration: 'underline', wordBreak: 'break-word' }}
                                  >
                                    Besøk nettside
                                  </a>
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Opening Hours */}
                          {location.openingHours && (
                            <div style={{ paddingTop: '1rem', borderTop: '1px solid #ffe4d6' }}>
                              <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.75rem', fontWeight: 600 }}>
                                🕒 Åpningstider
                              </p>
                              <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'auto 1fr',
                                gap: '0.5rem',
                                fontSize: '0.9rem'
                              }}>
                                {location.openingHours.monday && (
                                  <>
                                    <span style={{ fontWeight: 500 }}>Mandag:</span>
                                    <span>{location.openingHours.monday}</span>
                                  </>
                                )}
                                {location.openingHours.tuesday && (
                                  <>
                                    <span style={{ fontWeight: 500 }}>Tirsdag:</span>
                                    <span>{location.openingHours.tuesday}</span>
                                  </>
                                )}
                                {location.openingHours.wednesday && (
                                  <>
                                    <span style={{ fontWeight: 500 }}>Onsdag:</span>
                                    <span>{location.openingHours.wednesday}</span>
                                  </>
                                )}
                                {location.openingHours.thursday && (
                                  <>
                                    <span style={{ fontWeight: 500 }}>Torsdag:</span>
                                    <span>{location.openingHours.thursday}</span>
                                  </>
                                )}
                                {location.openingHours.friday && (
                                  <>
                                    <span style={{ fontWeight: 500 }}>Fredag:</span>
                                    <span>{location.openingHours.friday}</span>
                                  </>
                                )}
                                {location.openingHours.saturday && (
                                  <>
                                    <span style={{ fontWeight: 500 }}>Lørdag:</span>
                                    <span>{location.openingHours.saturday}</span>
                                  </>
                                )}
                                {location.openingHours.sunday && (
                                  <>
                                    <span style={{ fontWeight: 500 }}>Søndag:</span>
                                    <span>{location.openingHours.sunday}</span>
                                  </>
                                )}
                              </div>
                              {location.openingHours.notes && (
                                <p style={{
                                  marginTop: '0.75rem',
                                  fontSize: '0.85rem',
                                  color: '#666',
                                  fontStyle: 'italic'
                                }}>
                                  💡 {location.openingHours.notes}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {(location.tastingAvailable || location.bookingRequired || location.notes) && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      {location.tastingAvailable && (
                        <span style={{
                          padding: '0.5rem 1rem',
                          background: '#10b981',
                          color: 'white',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          fontWeight: 600
                        }}>
                          🍷 Vinsmaking tilgjengelig
                        </span>
                      )}
                      {location.bookingRequired && (
                        <span style={{
                          padding: '0.5rem 1rem',
                          background: '#f59e0b',
                          color: 'white',
                          borderRadius: '6px',
                          fontSize: '0.85rem',
                          fontWeight: 600
                        }}>
                          📅 Booking påkrevd
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{borderTop: '2px solid #e0e0e0', paddingTop: '2rem', marginTop: '2rem'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem'}}>
            <div>
              <h2 style={{fontSize: '1.3rem', color: '#722f37', marginBottom: '0.5rem'}}>
                Min Vinkjeller ({selectedVintage.year})
              </h2>
              {quantityInCellar > 0 ? (
                <p style={{color: '#666'}}>
                  Du har <span style={{fontWeight: 600, color: '#d4af37'}}>{quantityInCellar}</span> flaske
                  {quantityInCellar > 1 ? 'r' : ''} av {selectedVintage.year} i kjelleren
                </p>
              ) : (
                <p style={{color: '#666'}}>Ingen flasker av {selectedVintage.year} i kjelleren ennå</p>
              )}
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              {showAddedMessage && (
                <span style={{color: '#065f46', fontWeight: 600}}>Lagt til!</span>
              )}
              <button onClick={handleAddToCellar} className="btn btn-primary">
                + Legg til {selectedVintage.year} i kjeller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
