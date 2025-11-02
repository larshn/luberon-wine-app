import type { PurchaseLocation } from '../types/wine';

// Centralized purchase location data for all producers
export const purchaseLocations: Record<string, PurchaseLocation> = {
  'chateau-val-joanis': {
    type: 'chateau',
    name: 'Château Val Joanis',
    address: 'Route de Cavaillon',
    city: 'Pertuis',
    postalCode: '84120',
    phone: '+33 4 90 79 88 40',
    email: 'magasin@val-joanis.com',
    website: 'https://www.val-joanis.com',
    coordinates: {
      lat: 43.711316,
      lng: 5.468788
    },
    openingHours: {
      monday: '10:00-13:00, 15:00-19:00',
      tuesday: '10:00-13:00, 15:00-19:00',
      wednesday: '10:00-13:00, 15:00-19:00',
      thursday: '10:00-13:00, 15:00-19:00',
      friday: '10:00-13:00, 15:00-19:00',
      saturday: '10:00-13:00, 15:00-19:00',
      sunday: 'Stengt',
      notes: 'Høysesong (april-september): Man-Lør 10:00-13:00, 15:00-19:00. Lavsesong (januar-mars): Man-Fre'
    },
    priceRange: '€12-35',
    notes: 'Vakker hage, Jardins Remarquables. Vinsmaking tilgjengelig.',
    bookingRequired: false,
    tastingAvailable: true
  },

  'domaine-citadelle': {
    type: 'chateau',
    name: 'Domaine de La Citadelle',
    address: '601 Route de Cavaillon',
    city: 'Ménerbes',
    postalCode: '84560',
    phone: '+33 4 90 72 41 58',
    email: 'contact@domaine-citadelle.com',
    website: 'https://www.domaine-citadelle.com',
    coordinates: {
      lat: 43.844076,
      lng: 5.197370
    },
    openingHours: {
      monday: '09:00-12:00, 14:00-18:00',
      tuesday: '09:00-12:00, 14:00-18:00',
      wednesday: '09:00-12:00, 14:00-18:00',
      thursday: '09:00-12:00, 14:00-18:00',
      friday: '09:00-12:00, 14:00-18:00',
      saturday: '09:00-12:00, 14:00-18:00',
      sunday: 'Stengt',
      notes: 'Hjem til korkskrumuseet (Musée du Tire-Bouchon). Botanisk hage.'
    },
    priceRange: '€15-30',
    notes: 'Økologisk vingård på 50 hektar. Berømt korkskrumuseum og botanisk hage.',
    bookingRequired: false,
    tastingAvailable: true
  },

  'chateau-turcan': {
    type: 'chateau',
    name: 'Château Turcan',
    address: '1740 Route départementale 56',
    city: 'Ansouis',
    postalCode: '84240',
    phone: '+33 4 90 09 83 33',
    email: 'contact@chateau-turcan.com',
    website: 'https://www.chateau-turcan.com',
    coordinates: {
      lat: 43.735081,
      lng: 5.484928
    },
    openingHours: {
      monday: '09:00-12:00, 14:00-18:00',
      tuesday: '09:00-12:00, 14:00-18:00',
      wednesday: '09:00-12:00, 14:00-18:00',
      thursday: '09:00-12:00, 14:00-18:00',
      friday: '09:00-12:00, 14:00-18:00',
      saturday: 'På avtale',
      sunday: 'Stengt'
    },
    priceRange: '€10-25',
    notes: 'Familiedrevet vingård i hjertet av Luberon Regional Park.',
    bookingRequired: false,
    tastingAvailable: true
  },

  'chateau-la-verrerie': {
    type: 'chateau',
    name: 'Château La Verrerie',
    address: '1810 Route du Luberon',
    city: 'Puget-sur-Durance',
    postalCode: '84360',
    phone: '+33 4 90 08 97 97',
    email: 'boutique@chateau-la-verrerie.fr',
    website: 'https://www.chateau-la-verrerie.com',
    coordinates: {
      lat: 43.762096,
      lng: 5.26334
    },
    openingHours: {
      monday: '09:00-12:00, 14:00-18:00',
      tuesday: '09:00-12:00, 14:00-18:00',
      wednesday: '09:00-12:00, 14:00-18:00',
      thursday: '09:00-12:00, 14:00-18:00',
      friday: '09:00-12:00, 14:00-18:00',
      saturday: '09:00-12:00',
      sunday: 'Stengt',
      notes: 'Åpent hele året'
    },
    priceRange: '€12-28',
    notes: 'Økologisk siden 2013. 155 hektar totalt, 54 hektar vinmarker og 7,5 hektar olivenlunder.',
    bookingRequired: false,
    tastingAvailable: true
  },

  'domaine-mayol': {
    type: 'chateau',
    name: 'Domaine de Mayol',
    address: '1648 Route de Bonnieux - D3',
    city: 'Apt',
    postalCode: '84400',
    phone: '+33 4 90 74 12 80',
    email: 'contact@domainedemayol.com',
    website: 'https://domainedemayol.com',
    coordinates: {
      lat: 43.871114,
      lng: 5.36253
    },
    openingHours: {
      monday: '08:00-12:00, 14:00-18:00',
      tuesday: '08:00-12:00, 14:00-18:00',
      wednesday: '08:00-12:00, 14:00-18:00',
      thursday: '08:00-12:00, 14:00-18:00',
      friday: '08:00-12:00, 14:00-18:00',
      saturday: 'På avtale',
      sunday: 'Stengt'
    },
    priceRange: '€10-20',
    notes: 'Økologisk produksjon. Familiedrevet vingård.',
    bookingRequired: true,
    tastingAvailable: true
  },

  'vignobles-marrenon': {
    type: 'wine-shop',
    name: 'Vignobles Marrenon - Cellier',
    address: 'Rue Amédée Ginies',
    city: 'La Tour-d\'Aigues',
    postalCode: '84240',
    phone: '+33 4 90 07 51 65',
    email: 'espacedevente@marrenon.com',
    website: 'https://www.marrenon.com',
    coordinates: {
      lat: 43.72242,
      lng: 5.54557
    },
    openingHours: {
      monday: '09:00-12:00, 14:00-18:00',
      tuesday: '09:00-12:00, 14:00-18:00',
      wednesday: '09:00-12:00, 14:00-18:00',
      thursday: '09:00-12:00, 14:00-18:00',
      friday: '09:00-12:00, 14:00-18:00',
      saturday: '09:00-12:00',
      sunday: 'Stengt'
    },
    priceRange: '€8-18',
    notes: 'Kooperativ med over 1200 hektar vinmarker. Stor variasjon av viner fra Luberon og Ventoux.',
    bookingRequired: false,
    tastingAvailable: true
  },

  'famille-perrin': {
    type: 'wine-shop',
    name: 'Famille Perrin - La Vieille Ferme',
    address: '3333 Route de Jonquières',
    city: 'Orange',
    postalCode: '84100',
    phone: '+33 4 90 11 12 00',
    email: 'lacave@familleperrin.com',
    website: 'https://familleperrin.com',
    coordinates: {
      lat: 44.117758,
      lng: 4.855087
    },
    openingHours: {
      monday: '09:00-12:00, 14:00-18:00',
      tuesday: '09:00-12:00, 14:00-18:00',
      wednesday: '09:00-12:00, 14:00-18:00',
      thursday: '09:00-12:00, 14:00-18:00',
      friday: '09:00-12:00, 14:00-18:00',
      saturday: 'På avtale',
      sunday: 'Stengt',
      notes: 'Også tasterom i Châteauneuf-du-Pape'
    },
    priceRange: '€10-150',
    notes: 'Berømt vinprodusent med både Luberon og Châteauneuf-du-Pape viner. La Vieille Ferme er deres Luberon-linje.',
    bookingRequired: false,
    tastingAvailable: true
  },

  'chateau-isolette': {
    type: 'chateau',
    name: 'Château de l\'Isolette',
    address: '1648 Route de Bonnieux',
    city: 'Apt',
    postalCode: '84400',
    phone: '+33 4 90 74 16 70',
    email: 'chateau.isolette@wanadoo.fr',
    website: 'https://chateauisolette.fr',
    coordinates: {
      lat: 43.864269,
      lng: 5.355844
    },
    openingHours: {
      monday: '08:30-12:00, 13:30-17:00',
      tuesday: '08:30-12:00, 13:30-17:00',
      wednesday: '08:30-12:00, 13:30-17:00',
      thursday: '08:30-12:00, 13:30-17:00',
      friday: '08:30-12:00, 13:30-17:00',
      saturday: 'Stengt',
      sunday: 'Stengt'
    },
    priceRange: '€12-25',
    notes: '45 hektar vingård i Luberon Regional Nature Park. Mellom Bonnieux og Apt på D3.',
    bookingRequired: false,
    tastingAvailable: true
  }
};

// Helper function to get purchase location by key
export function getPurchaseLocation(key: string): PurchaseLocation | undefined {
  return purchaseLocations[key];
}

// Get all unique purchase locations as an array
export function getAllPurchaseLocations(): PurchaseLocation[] {
  return Object.values(purchaseLocations);
}
