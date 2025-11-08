import type { Wine } from '../types/wine';
import { purchaseLocations } from './purchaseLocationsData';

export const wines: Wine[] = [
  {
    id: 'canorgue-rouge',
    name: 'La Canorgue Rouge',
    producer: 'Château La Canorgue',
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Syrah', 'Grenache', 'Mourvèdre'],
    description: 'Økologisk vin fra biodynamisk vingård, kjent fra filmen "A Good Year". En elegant og balansert rødvin med provencalsk karakter.',
    foodPairings: [
      { dish: 'Gautes Provencalske pølser', description: 'Lavendel og provencalske urter i vinen passer perfekt til de urtekrydrede pølsene' },
      { dish: 'Daube Provençale', description: 'Provencalsk oksegryte med oliven' },
      { dish: 'Grillet lam med timian', description: 'Perfekt til retter med urter de Provence' },
      { dish: 'Ratatouille', description: 'Klassisk grønnsaksgrytte fra Provence' }
    ],
    purchaseLocations: [
      {
        type: 'chateau',
        name: 'Château La Canorgue',
        address: '850 Rte du Pont Julien D149',
        city: 'Bonnieux',
        postalCode: '84480',
        phone: '+33 4 90 75 81 01',
        email: 'chateaucanorgue@vinsdusiecle.com',
        website: 'https://chateaulacanorgue.com',
        coordinates: {
          lat: 43.832685,
          lng: 5.315645
        },
        openingHours: {
          monday: '09:00-12:00, 14:00-18:00',
          tuesday: '09:00-12:00, 14:00-18:00',
          wednesday: '09:00-12:00, 14:00-18:00',
          thursday: '09:00-12:00, 14:00-18:00',
          friday: '09:00-12:00, 14:00-18:00',
          saturday: '09:00-12:00, 14:00-18:00',
          sunday: 'Stengt',
          notes: 'Sommeråpningstider (juli-august): Man-Fre 09:00-19:00, Lør 09:00-12:00 og 14:00-19:00'
        },
        priceRange: '€15-25',
        notes: 'Vinkjeller åpen for kjøp. Ingen omvisning av slottet. Kontakt oss for gruppebesøk.',
        bookingRequired: false,
        tastingAvailable: true
      }
    ],
    vintages: [
      {
        year: 2021,
        alcoholContent: 13.5,
        tastingNotes: ['Røde bær', 'Krydder', 'Lavendel', 'Silkemyke tanniner'],
        storageRecommendation: 'short-term',
        optimalDrinkingWindow: { start: 0, end: 5 },
        price: 18
      },
      {
        year: 2020,
        alcoholContent: 14,
        tastingNotes: ['Modne kirsebær', 'Pepper', 'Provence-urter', 'Velvet struktur'],
        storageRecommendation: 'short-term',
        optimalDrinkingWindow: { start: 1, end: 6 },
        price: 18
      },
      {
        year: 2019,
        alcoholContent: 13.5,
        tastingNotes: ['Solmodne bær', 'Lavendel', 'Silkemyk', 'Elegant'],
        storageRecommendation: 'drink-soon',
        optimalDrinkingWindow: { start: 0, end: 4 },
        price: 17
      }
    ]
  },
  {
    id: 'canorgue-blanc',
    name: 'La Canorgue Blanc',
    producer: 'Château La Canorgue',
    color: 'white',
    appellation: 'Luberon AOP',
    grapes: ['Roussanne', 'Vermentino', 'Clairette'],
    description: 'Frisk og aromatisk hvitvin med stor kompleksitet. Biodynamisk dyrket på kalksteinsjord.',
    foodPairings: [
      { dish: 'Bouillabaisse', description: 'Provencalsk fiskesuppe' },
      { dish: 'Geitost med honning', description: 'Lokal ost fra Luberon' },
      { dish: 'Grillet havabbor', description: 'Med fennikel og sitron' }
    ],
    vintages: [
      {
        year: 2023,
        alcoholContent: 13,
        tastingNotes: ['Hvite blomster', 'Sitrus', 'Fersken', 'Mineralsk finish'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 2 },
        price: 16
      },
      {
        year: 2022,
        alcoholContent: 13,
        tastingNotes: ['Hvite blomster', 'Sitrus', 'Fersken', 'Mineralsk finish'],
        storageRecommendation: 'drink-soon',
        optimalDrinkingWindow: { start: 0, end: 3 },
        price: 16
      }
    ]
  },
  {
    id: 'canorgue-rose',
    name: 'Tradition Rosé',
    producer: 'Château La Canorgue',
    color: 'rosé',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Syrah'],
    description: 'Klassisk Provence-rosé fra den kjente biodynamiske vingården. Frisk og sommerlig.',
    foodPairings: [
      { dish: 'Socca', description: 'Provencalsk kikertpannekake' },
      { dish: 'Pan bagnat', description: 'Niçoise sandwich' },
      { dish: 'Reker', description: 'Med sitron og aioli' }
    ],
    vintages: [
      {
        year: 2023,
        alcoholContent: 12.5,
        tastingNotes: ['Jordbær', 'Melon', 'Hvite blomster', 'Mineralsk'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 1 },
        price: 15
      }
    ]
  },
  {
    id: 'val-joanis-griottes',
    name: 'Les Griottes',
    producer: 'Château Val Joanis',
    color: 'red',
    appellation: 'Luberon AOP',
    imageUrl: 'https://provence-wein.com/wp-content/uploads/2017/01/LES-GRIOTTES-2014-390x390.jpg',
    grapes: ['Syrah', 'Grenache'],
    description: 'Deres toppvin fra utvalgte parceller. Modnet 12 måneder på eikefat. Kraftig og konsentrert.',
    foodPairings: [
      { dish: 'Stekt andebryst', description: 'Med kirsebærsaus' },
      { dish: 'Oksekjøtt bourguignon', description: 'Langkokt i rødvin' },
      { dish: 'Modne oster', description: 'Comté eller gammel Gouda' }
    ],
    purchaseLocations: [
      {
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
      }
    ],
    vintages: [
      {
        year: 2020,
        alcoholContent: 14,
        tastingNotes: ['Mørke kirsebær', 'Pepper', 'Vanilje', 'Lakrits'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 2, end: 10 },
        price: 28
      },
      {
        year: 2019,
        alcoholContent: 14.5,
        tastingNotes: ['Modne kirsebær', 'Sort pepper', 'Sjokolade', 'Eik'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 3, end: 12 },
        price: 28
      }
    ]
  },
  {
    id: 'val-joanis-tradition-blanc',
    name: 'Tradition Blanc',
    producer: 'Château Val Joanis',
    color: 'white',
    appellation: 'Luberon AOP',
    imageUrl: 'https://provence-wein.com/wp-content/uploads/2020/01/Chateau-val-joanis-blanc-tradition-2024-390x390.jpg',
    grapes: ['Grenache Blanc', 'Roussanne', 'Bourboulenc'],
    description: 'Klassisk hvitvin fra Luberon med friskhet og eleganse. Perfekt som aperitiff.',
    foodPairings: [
      { dish: 'Tapenader', description: 'Provencalske olivenpaster' },
      { dish: 'Grillet kylling', description: 'Med sitron og timian' },
      { dish: 'Salat Niçoise', description: 'Med tuna og ansjos' }
    ],
    purchaseLocations: [purchaseLocations['chateau-val-joanis']],
    vintages: [
      {
        year: 2023,
        alcoholContent: 12.5,
        tastingNotes: ['Grønne epler', 'Pære', 'Mandel', 'Frisk syre'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 2 },
        price: 14
      },
      {
        year: 2022,
        alcoholContent: 12.5,
        tastingNotes: ['Grønne epler', 'Pære', 'Mandel', 'Frisk syre'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 2 },
        price: 14
      }
    ]
  },
  {
    id: 'val-joanis-bastides-rose',
    name: 'Les Bastides Rosé',
    producer: 'Château Val Joanis',
    color: 'rosé',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Cinsault', 'Syrah'],
    description: 'Lys og delikat rosé i Provence-stil. Produsert ved direkte pressing for maksimal friskhet.',
    foodPairings: [
      { dish: 'Grillet fisk', description: 'Enkel og frisk tilberedning' },
      { dish: 'Sommerlig salat', description: 'Med geiteost og tomater' },
      { dish: 'Grønnsaksquiche', description: 'Med provencalske urter' }
    ],
    purchaseLocations: [purchaseLocations['chateau-val-joanis']],
    vintages: [
      {
        year: 2023,
        alcoholContent: 12.5,
        tastingNotes: ['Jordbær', 'Sitrus', 'Hvite blomster', 'Mineralsk'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 2 },
        price: 13
      }
    ]
  },
  {
    id: 'val-joanis-tradition-rouge',
    name: 'Tradition Rouge',
    producer: 'Château Val Joanis',
    color: 'red',
    appellation: 'Luberon AOP',
    imageUrl: 'https://provence-wein.com/wp-content/uploads/2017/02/VAL-JOANIS-TRADITION-LUBERON-2015-390x390.jpg',
    grapes: ['Grenache', 'Syrah'],
    description: 'Klassisk Luberon-rødvin fra historisk domene med vakker hage. God verdi for pengene.',
    foodPairings: [
      { dish: 'Grillmat', description: 'BBQ og pølser' },
      { dish: 'Tapas', description: 'Spanske småretter' },
      { dish: 'Pasta', description: 'Med tomatsaus' }
    ],
    purchaseLocations: [purchaseLocations['chateau-val-joanis']],
    vintages: [
      {
        year: 2021,
        alcoholContent: 13.5,
        tastingNotes: ['Røde bær', 'Provence-urter', 'Pepper', 'Myk'],
        storageRecommendation: 'drink-soon',
        optimalDrinkingWindow: { start: 0, end: 4 },
        price: 14
      }
    ]
  },
  {
    id: 'val-joanis-tradition-rose',
    name: 'Tradition Rosé',
    producer: 'Château Val Joanis',
    color: 'rosé',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Syrah', 'Cinsault'],
    description: 'Klassisk Provence-rosé fra eldgammelt domene. Frisk og lett med blek farge.',
    foodPairings: [
      { dish: 'Grillede reker', description: 'Med sitron' },
      { dish: 'Niçoise salat', description: 'Med tuna' },
      { dish: 'Antipasti', description: 'Lett italiensk' }
    ],
    purchaseLocations: [purchaseLocations['chateau-val-joanis']],
    vintages: [
      {
        year: 2023,
        alcoholContent: 12.5,
        tastingNotes: ['Jordbær', 'Sitrus', 'Hvite blomster', 'Sprø'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 2 },
        price: 13
      }
    ]
  },
  {
    id: 'val-joanis-josephine-rose',
    name: 'Joséphine Rosé',
    producer: 'Château Val Joanis',
    color: 'rosé',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Cinsault'],
    description: 'Premium rosé-cuvée oppkalt etter gårdens kvinnelige arving. Elegant og raffinert stil.',
    foodPairings: [
      { dish: 'Sushi', description: 'Eller sashimi' },
      { dish: 'Kveite', description: 'Grillet med urter' },
      { dish: 'Sommerlige salater', description: 'Med sitrusdressing' }
    ],
    purchaseLocations: [purchaseLocations['chateau-val-joanis']],
    vintages: [
      {
        year: 2023,
        alcoholContent: 12.5,
        tastingNotes: ['Hvit fersken', 'Sitrus', 'Rosenblader', 'Mineralsk'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 2 },
        price: 17
      }
    ]
  },
  {
    id: 'val-joanis-agasses',
    name: 'Réserve Les Agasses',
    producer: 'Château Val Joanis',
    color: 'white',
    appellation: 'IGP Vaucluse',
    grapes: ['Viognier'],
    description: '100% Viognier fra Val Joanis. Aromatisk og fyldig hvitvin med tropiske fruktnoter.',
    foodPairings: [
      { dish: 'Thai-retter', description: 'Med kokosmelk' },
      { dish: 'Kylling', description: 'Med fruktysaus' },
      { dish: 'Krydrete retter', description: 'Indiske curryer' }
    ],
    purchaseLocations: [purchaseLocations['chateau-val-joanis']],
    vintages: [
      {
        year: 2022,
        alcoholContent: 13,
        tastingNotes: ['Aprikos', 'Fersken', 'Honningblomst', 'Fyldig'],
        storageRecommendation: 'drink-soon',
        optimalDrinkingWindow: { start: 0, end: 3 },
        price: 16
      }
    ]
  },
  {
    id: 'fontenille-prestige',
    name: 'Cuvée Prestige',
    producer: 'Domaine de Fontenille',
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Syrah', 'Grenache', 'Mourvèdre', 'Carignan'],
    description: 'Toppvin fra historisk domene med 800 år gammel vinhistorie. Kraftig og konsentrert.',
    foodPairings: [
      { dish: 'Lammestek', description: 'Med urter de Provence' },
      { dish: 'Vilt', description: 'Hjort eller villsvin' },
      { dish: 'Cassoulet', description: 'Tradisjonell bønnegrytte' }
    ],
    purchaseLocations: [
      {
        type: 'chateau',
        name: 'Domaine de Fontenille',
        address: '1681 Route de Roquefraîche',
        city: 'Lauris',
        postalCode: '84360',
        phone: '+33 4 13 98 00 00',
        email: 'info@domainedefontenille.com',
        website: 'https://www.domainedefontenille.com',
        coordinates: {
          lat: 43.762696,
          lng: 5.301878
        },
        openingHours: {
          monday: '09:00-18:00',
          tuesday: '09:00-18:00',
          wednesday: '09:00-18:00',
          thursday: '09:00-18:00',
          friday: '09:00-18:00',
          saturday: '09:00-18:00',
          sunday: '09:00-18:00',
          notes: 'Vinsmaking daglig. Også 5-stjerners boutique-hotell og gourmetrestaurant.'
        },
        priceRange: '€18-45',
        notes: 'Historisk domene med 800 år gammel vinhistorie. Vinsmaking, hotell og restaurant. Booking anbefales for guidede turer.',
        bookingRequired: true,
        tastingAvailable: true
      }
    ],
    vintages: [
      {
        year: 2019,
        alcoholContent: 14.5,
        tastingNotes: ['Solmodne bær', 'Krydder', 'Tobakk', 'Eik'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 3, end: 12 },
        price: 35
      },
      {
        year: 2018,
        alcoholContent: 14.5,
        tastingNotes: ['Modne bær', 'Lær', 'Trøffel', 'Kompleks'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 4, end: 15 },
        price: 35
      }
    ]
  },
  {
    id: 'fontenille-blanc',
    name: 'Blanc de Fontenille',
    producer: 'Domaine de Fontenille',
    color: 'white',
    appellation: 'Luberon AOP',
    grapes: ['Roussanne', 'Grenache Blanc', 'Clairette'],
    description: 'Rik og fyldig hvitvin med god lagringspotensial. Modnet delvis på eikefat.',
    foodPairings: [
      { dish: 'Kylling i kremsaus', description: 'Med sopp' },
      { dish: 'Hummer', description: 'Med smørsaus' },
      { dish: 'Modne hvite oster', description: 'Brie eller Camembert' }
    ],
    purchaseLocations: [
      {
        type: 'chateau',
        name: 'Domaine de Fontenille',
        address: '1681 Route de Roquefraîche',
        city: 'Lauris',
        postalCode: '84360',
        phone: '+33 4 13 98 00 00',
        email: 'info@domainedefontenille.com',
        website: 'https://www.domainedefontenille.com',
        coordinates: {
          lat: 43.762696,
          lng: 5.301878
        },
        openingHours: {
          monday: '09:00-18:00',
          tuesday: '09:00-18:00',
          wednesday: '09:00-18:00',
          thursday: '09:00-18:00',
          friday: '09:00-18:00',
          saturday: '09:00-18:00',
          sunday: '09:00-18:00',
          notes: 'Vinsmaking daglig. Også 5-stjerners boutique-hotell og gourmetrestaurant.'
        },
        priceRange: '€18-45',
        notes: 'Historisk domene med 800 år gammel vinhistorie. Vinsmaking, hotell og restaurant. Booking anbefales for guidede turer.',
        bookingRequired: true,
        tastingAvailable: true
      }
    ],
    vintages: [
      {
        year: 2022,
        alcoholContent: 13,
        tastingNotes: ['Aprikos', 'Honning', 'Hasselnøtt', 'Smør'],
        storageRecommendation: 'short-term',
        optimalDrinkingWindow: { start: 0, end: 5 },
        price: 22
      }
    ]
  },
  {
    id: 'fontenille-rouge',
    name: 'Fontenille Rouge',
    producer: 'Domaine de Fontenille',
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Syrah'],
    description: 'Klassisk rødvin fra historisk domene med 800 års vinhistorie. Økologisk sertifisert. 70% Grenache, 30% Syrah.',
    foodPairings: [
      { dish: 'Gautes Provencalske pølser', description: 'Provence-urter i vinen harmonerer perfekt med de urtekrydrede pølsene og ovnsbakte grønnsakene' },
      { dish: 'Grillet lam', description: 'Med rosmarin' },
      { dish: 'Provencalsk grytte', description: 'Med oliven' },
      { dish: 'Charcuteri', description: 'Lufttørket skinke' }
    ],
    purchaseLocations: [
      {
        type: 'chateau',
        name: 'Domaine de Fontenille',
        address: '1681 Route de Roquefraîche',
        city: 'Lauris',
        postalCode: '84360',
        phone: '+33 4 13 98 00 00',
        email: 'info@domainedefontenille.com',
        website: 'https://www.domainedefontenille.com',
        coordinates: {
          lat: 43.762696,
          lng: 5.301878
        },
        openingHours: {
          monday: '09:00-18:00',
          tuesday: '09:00-18:00',
          wednesday: '09:00-18:00',
          thursday: '09:00-18:00',
          friday: '09:00-18:00',
          saturday: '09:00-18:00',
          sunday: '09:00-18:00',
          notes: 'Vinsmaking daglig. Også 5-stjerners boutique-hotell og gourmetrestaurant.'
        },
        priceRange: '€18-45',
        notes: 'Historisk domene med 800 år gammel vinhistorie. Vinsmaking, hotell og restaurant. Booking anbefales for guidede turer.',
        bookingRequired: true,
        tastingAvailable: true
      }
    ],
    vintages: [
      {
        year: 2021,
        alcoholContent: 13.5,
        tastingNotes: ['Røde bær', 'Krydder', 'Provence-urter', 'Balansert'],
        storageRecommendation: 'short-term',
        optimalDrinkingWindow: { start: 0, end: 5 },
        price: 18
      }
    ]
  },
  {
    id: 'fontenille-alphonse-rouge',
    name: 'Alphonse Rouge',
    producer: 'Domaine de Fontenille',
    color: 'red',
    appellation: 'Luberon AOP',
    imageUrl: 'https://provence-wein.com/wp-content/uploads/2017/07/Domaine-de-Fontenille-Cuv%C3%A9e-Alphonse-Rot-2022-BIO-390x390.jpg',
    grapes: ['Syrah', 'Grenache', 'Mourvèdre'],
    description: 'Premium cuvée oppkalt etter familiens forfader. Kompleks og elegant med moderne minimalistisk vinifikasjon.',
    foodPairings: [
      { dish: 'Andebryst', description: 'Med kirsebærsaus' },
      { dish: 'Lammestek', description: 'Med urter de Provence' },
      { dish: 'Kraftige oster', description: 'Comté eller Manchego' }
    ],
    purchaseLocations: [
      {
        type: 'chateau',
        name: 'Domaine de Fontenille',
        address: '1681 Route de Roquefraîche',
        city: 'Lauris',
        postalCode: '84360',
        phone: '+33 4 13 98 00 00',
        email: 'info@domainedefontenille.com',
        website: 'https://www.domainedefontenille.com',
        coordinates: {
          lat: 43.762696,
          lng: 5.301878
        },
        openingHours: {
          monday: '09:00-18:00',
          tuesday: '09:00-18:00',
          wednesday: '09:00-18:00',
          thursday: '09:00-18:00',
          friday: '09:00-18:00',
          saturday: '09:00-18:00',
          sunday: '09:00-18:00',
          notes: 'Vinsmaking daglig. Også 5-stjerners boutique-hotell og gourmetrestaurant.'
        },
        priceRange: '€18-45',
        notes: 'Historisk domene med 800 år gammel vinhistorie. Vinsmaking, hotell og restaurant. Booking anbefales for guidede turer.',
        bookingRequired: true,
        tastingAvailable: true
      }
    ],
    vintages: [
      {
        year: 2020,
        alcoholContent: 14,
        tastingNotes: ['Mørke frukter', 'Vanilje', 'Pepper', 'Silkemyke tanniner'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 2, end: 10 },
        price: 32
      }
    ]
  },
  {
    id: 'fontenille-alphonse-blanc',
    name: 'Alphonse Blanc',
    producer: 'Domaine de Fontenille',
    color: 'white',
    appellation: 'Luberon AOP',
    imageUrl: 'https://provence-wein.com/wp-content/uploads/2017/06/Domaine-de-Fontenille-Cuv%C3%A9e-Alphonse-Wei%C3%9F-2023-390x390.jpg',
    grapes: ['Grenache Blanc', 'Roussanne', 'Vermentino'],
    description: 'Premium hvitvin fra økologisk vingård. Kombinerer historiske teknikker med moderne minimal intervensjon.',
    foodPairings: [
      { dish: 'Sjømat', description: 'Kamskjell eller hummer' },
      { dish: 'Kylling', description: 'Med kremsaus' },
      { dish: 'Hvite oster', description: 'Brie eller chèvre' }
    ],
    purchaseLocations: [
      {
        type: 'chateau',
        name: 'Domaine de Fontenille',
        address: '1681 Route de Roquefraîche',
        city: 'Lauris',
        postalCode: '84360',
        phone: '+33 4 13 98 00 00',
        email: 'info@domainedefontenille.com',
        website: 'https://www.domainedefontenille.com',
        coordinates: {
          lat: 43.762696,
          lng: 5.301878
        },
        openingHours: {
          monday: '09:00-18:00',
          tuesday: '09:00-18:00',
          wednesday: '09:00-18:00',
          thursday: '09:00-18:00',
          friday: '09:00-18:00',
          saturday: '09:00-18:00',
          sunday: '09:00-18:00',
          notes: 'Vinsmaking daglig. Også 5-stjerners boutique-hotell og gourmetrestaurant.'
        },
        priceRange: '€18-45',
        notes: 'Historisk domene med 800 år gammel vinhistorie. Vinsmaking, hotell og restaurant. Booking anbefales for guidede turer.',
        bookingRequired: true,
        tastingAvailable: true
      }
    ],
    vintages: [
      {
        year: 2022,
        alcoholContent: 13,
        tastingNotes: ['Hvite blomster', 'Aprikos', 'Mandel', 'Mineralsk finish'],
        storageRecommendation: 'short-term',
        optimalDrinkingWindow: { start: 0, end: 5 },
        price: 24
      }
    ]
  },
  {
    id: 'fontenille-rose',
    name: 'Fontenille Rosé',
    producer: 'Domaine de Fontenille',
    color: 'rosé',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Syrah', 'Cinsault'],
    description: 'Elegant rosé fra 39 hektar økologisk vingård. Frisk og aromatisk med vakker lakserosa farge.',
    foodPairings: [
      { dish: 'Grillede reker', description: 'Med aioli' },
      { dish: 'Salat Niçoise', description: 'Med tuna' },
      { dish: 'Provencalsk antipasti', description: 'Tapenader og oliven' }
    ],
    purchaseLocations: [
      {
        type: 'chateau',
        name: 'Domaine de Fontenille',
        address: '1681 Route de Roquefraîche',
        city: 'Lauris',
        postalCode: '84360',
        phone: '+33 4 13 98 00 00',
        email: 'info@domainedefontenille.com',
        website: 'https://www.domainedefontenille.com',
        coordinates: {
          lat: 43.762696,
          lng: 5.301878
        },
        openingHours: {
          monday: '09:00-18:00',
          tuesday: '09:00-18:00',
          wednesday: '09:00-18:00',
          thursday: '09:00-18:00',
          friday: '09:00-18:00',
          saturday: '09:00-18:00',
          sunday: '09:00-18:00',
          notes: 'Vinsmaking daglig. Også 5-stjerners boutique-hotell og gourmetrestaurant.'
        },
        priceRange: '€18-45',
        notes: 'Historisk domene med 800 år gammel vinhistorie. Vinsmaking, hotell og restaurant. Booking anbefales for guidede turer.',
        bookingRequired: true,
        tastingAvailable: true
      }
    ],
    vintages: [
      {
        year: 2023,
        alcoholContent: 12.5,
        tastingNotes: ['Jordbær', 'Sitrus', 'Hvite blomster', 'Frisk'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 2 },
        price: 17
      }
    ]
  },
  {
    id: 'mille-celestine',
    name: 'Célestine Rouge',
    producer: 'Château de Mille',
    color: 'red',
    appellation: 'Luberon AOP',
    imageUrl: '/images/wines/celestine-rouge.jpg',
    grapes: ['Grenache', 'Syrah'],
    description: 'Premium cuvée fra Château de Mille med kompleks aromatikk og lang lagringsevne. Grenache-dominert vin med elegant struktur og provencalske urter.',
    foodPairings: [
      { dish: 'Gautes Provencalske pølser', description: 'Vinens timian, rosmarin og lavendel matcher perfekt med de provencalske urtene i pølsene og de ovnsbakte grønnsakene' },
      { dish: 'Lammestek med urter', description: 'Den medium fylde og røde bærnotene harmonerer perfekt med lam og friske urter' },
      { dish: 'Grillet entrecôte med lavendel', description: 'Vinens lavendel- og timianaromer komplementerer pepperkrydret biff' },
      { dish: 'Ratatouille', description: 'De provençalske urtene i vinen matcher perfekt med denne klassiske grønnsaksgryten' },
      { dish: 'Fenalår', description: 'Tørrstekte norske lammespesialiteten passer utmerkt til vinens urtenote' }
    ],
    purchaseLocations: [
      {
        type: 'chateau',
        name: 'Château de Mille',
        address: '2650 Route de Bonnieux',
        city: 'Apt',
        postalCode: '84400',
        phone: '+33 4 90 74 11 94',
        email: 'contact@chateaudemille.fr',
        website: 'https://www.chateaudemille.fr',
        coordinates: {
          lat: 43.866744,
          lng: 5.352626
        },
        openingHours: {
          monday: '10:00-12:00, 14:00-18:00',
          tuesday: '10:00-12:00, 14:00-18:00',
          wednesday: '10:00-12:00, 14:00-18:00',
          thursday: '10:00-12:00, 14:00-18:00',
          friday: '10:00-12:00, 14:00-18:00',
          saturday: '10:00-12:00, 14:00-18:00',
          sunday: 'Stengt',
          notes: 'Sommeråpningstider (juli-august): Utvidet til 19:00'
        },
        priceRange: '€25-35',
        notes: 'Gratis vinsmaking. Omvisning på forespørsel. Vingården ligger ved foten av Luberon-fjellet med spektakulær utsikt.',
        bookingRequired: false,
        tastingAvailable: true
      }
    ],
    vintages: [
      {
        year: 2021,
        alcoholContent: 14.5,
        tastingNotes: ['Røde bær', 'Kirsebær', 'Urter', 'Lavendel', 'Timian', 'Rosmarin'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 2, end: 8 },
        price: 31
      },
      {
        year: 2020,
        alcoholContent: 14.5,
        tastingNotes: ['Modne kirsebær', 'Lavendel', 'Provencalske urter', 'Elegant struktur'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 2, end: 8 },
        price: 31
      },
      {
        year: 2019,
        alcoholContent: 14.5,
        tastingNotes: ['Røde bær', 'Urter', 'Rosmarin', 'Timian'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 2, end: 8 },
        price: 30
      }
    ]
  },
  {
    id: 'mille-saint-lucide',
    name: 'Saint Lucide Rouge',
    producer: 'Château de Mille',
    color: 'red',
    appellation: 'Luberon AOP',
    imageUrl: '/images/wines/saint-lucide-rouge.jpg',
    grapes: ['Syrah', 'Grenache'],
    description: 'Syrah-dominert toppvin fra Château de Mille med intens frukt og komplekse krydderaromer. En kraftig og konsentrert vin med fremragende lagringsevne.',
    foodPairings: [
      { dish: 'Elgstek med bringebærsaus', description: 'Syrah-druens pepper og mørke bær matcher perfekt med elgens kraftige smak' },
      { dish: 'Finnbiff', description: 'Reinsdyrkjøttets game smak balanseres av vinens fiolett-aromatikk og pepperkrydder' },
      { dish: 'Lammebog med svartpepperkornskorpe', description: 'Vinens markerte sorte pepper og mørke bær komplementerer kraftig lam' },
      { dish: 'Blåskimmelost', description: 'Den fylde Syrah-dominerte vinen står opp mot kraftige oster' }
    ],
    purchaseLocations: [
      {
        type: 'chateau',
        name: 'Château de Mille',
        address: '2650 Route de Bonnieux',
        city: 'Apt',
        postalCode: '84400',
        phone: '+33 4 90 74 11 94',
        email: 'contact@chateaudemille.fr',
        website: 'https://www.chateaudemille.fr',
        coordinates: {
          lat: 43.866744,
          lng: 5.352626
        },
        openingHours: {
          monday: '10:00-12:00, 14:00-18:00',
          tuesday: '10:00-12:00, 14:00-18:00',
          wednesday: '10:00-12:00, 14:00-18:00',
          thursday: '10:00-12:00, 14:00-18:00',
          friday: '10:00-12:00, 14:00-18:00',
          saturday: '10:00-12:00, 14:00-18:00',
          sunday: 'Stengt',
          notes: 'Sommeråpningstider (juli-august): Utvidet til 19:00'
        },
        priceRange: '€25-35',
        notes: 'Gratis vinsmaking. Omvisning på forespørsel. Vingården ligger ved foten av Luberon-fjellet med spektakulær utsikt.',
        bookingRequired: false,
        tastingAvailable: true
      }
    ],
    vintages: [
      {
        year: 2021,
        alcoholContent: 14.5,
        tastingNotes: ['Mørke bær', 'Fioler', 'Sort pepper', 'Solbær', 'Bjørnebær'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 2, end: 8 },
        price: 25
      },
      {
        year: 2020,
        alcoholContent: 14.5,
        tastingNotes: ['Solbær', 'Sort pepper', 'Fioler', 'Mørk frukt'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 2, end: 8 },
        price: 25
      },
      {
        year: 2019,
        alcoholContent: 14.5,
        tastingNotes: ['Bjørnebær', 'Fioler', 'Krydder', 'Pepper'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 2, end: 8 },
        price: 24
      }
    ]
  },
  {
    id: 'verrerie-grand-deffand',
    name: 'Grand Deffand Syrah',
    producer: 'Château La Verrerie',
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Syrah'],
    description: 'Verdensklasse Syrah fra Château La Verrerie. En ekstraordinær vin med dyp kompleksitet, trøffelaromer og fenomenal lagringsevne. Produsert fra gamle vinstokker.',
    foodPairings: [
      { dish: 'Reinsdyrstek med trøffelsaus', description: 'Vinens trøffelaroma forsterkes av sausen, mens mørke kirsebær matcher det game kjøttet' },
      { dish: 'And med kirsebærsaus', description: 'Andens rike, nesten game smak finner sin perfekte partner i denne Syrah' },
      { dish: 'Oksehale i rødvin', description: 'Den langkokte, rike kjøttretten matcher vinens kompleksitet og fylde' },
      { dish: 'Elggryte med kremsaus og sopp', description: 'Villmarkssoppens jordaroma harmonerer med vinens kryddertoner' }
    ],
    purchaseLocations: [purchaseLocations['chateau-la-verrerie']],
    vintages: [
      {
        year: 2020,
        alcoholContent: 15,
        tastingNotes: ['Mørke kirsebær', 'Pepper', 'Røkelse', 'Krutt', 'Trøffel'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 3, end: 10 },
        price: 28
      },
      {
        year: 2019,
        alcoholContent: 14.5,
        tastingNotes: ['Sort kirsebær', 'Trøffel', 'Pepper', 'Krutt', 'Røkelse'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 3, end: 10 },
        price: 28
      },
      {
        year: 2018,
        alcoholContent: 14.5,
        tastingNotes: ['Mørk frukt', 'Trøffel', 'Krydder', 'Kompleks'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 2, end: 8 },
        price: 26
      }
    ]
  },
  {
    id: 'canorgue-coin-perdu',
    name: 'Coin Perdu',
    producer: 'Château La Canorgue',
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Syrah', 'Grenache'],
    description: 'Premium cuvée fra den kjente Château La Canorgue (A Good Year). Elegant og kraftig vin med praline-noter og silkemyke tanniner. En spesiell vin fra vingårdens beste parseller.',
    foodPairings: [
      { dish: 'Lammesadel med pralinsmør', description: 'Vinens praline-noter og silkemyke tanniner matcher perfekt med lammens fylde' },
      { dish: 'Boeuf Bourguignon', description: 'Den klassiske franske gryteretten fremheves av vinens mørke frukt og krydder' },
      { dish: 'Pinnekjøtt', description: 'Norges tradisjonelle julemåltid passer perfekt til vinens fylde og krydder' },
      { dish: 'Vilt med skogsoppstuing', description: 'Vinens fylde og silkemyke tanniner komplementerer både viltets kraft og soppenes jordaroma' }
    ],
    vintages: [
      {
        year: 2018,
        alcoholContent: 14.5,
        tastingNotes: ['Mørk frukt', 'Krydder', 'Praline', 'Silkemyke tanniner'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 3, end: 8 },
        price: 23
      }
    ]
  },
  {
    id: 'mayol-rouge',
    name: 'Domaine de Mayol Rouge',
    producer: 'Domaine de Mayol',
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Syrah'],
    description: 'Husvin fra Domaine de Mayol. En interessant og velbalansert rødvin med røde bær og krydder. Perfekt allsidig vin til hverdagsmat og enkel servering.',
    foodPairings: [
      { dish: 'Grillet lammekotletter med timian', description: 'Medium fylde og røde bær gjør denne vinen perfekt til enkle, kryddede lammretter' },
      { dish: 'Herbes de Provence-marinert kylling', description: 'Vinens krydderaromer matcher urtemarineringen' },
      { dish: 'Pølser fra grillen med sennep', description: 'En allsidig vin som fungerer utmerkt til hverdagsmat' },
      { dish: 'Tapas med chorizo og manchego', description: 'Vinens krydder harmonerer med den spanske pølsen' }
    ],
    purchaseLocations: [purchaseLocations['domaine-mayol']],
    vintages: [
      {
        year: 2021,
        alcoholContent: 14.5,
        tastingNotes: ['Røde bær', 'Krydder', 'Interessant'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 1, end: 6 },
        price: 16
      }
    ]
  },
  {
    id: 'clapier-pinot',
    name: 'Pinot Noir Blend',
    producer: 'Château de Clapier',
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Pinot Noir'],
    description: 'Unik Pinot Noir-vin fra Luberon - sjelden i denne regionen! Elegant og frisk med røde bær og silkemyk tekstur. En spennende vin som skiller seg ut fra de typiske Rhône-blandingene.',
    foodPairings: [
      { dish: 'Gravlaks med sennepssaus', description: 'Den elegante, lette vinen med røde bær matcher perfekt med gravet laks' },
      { dish: 'Rødbetesalat med geiteost', description: 'Vinens jordaroma og friskhet komplementerer karamelliserte rødbeter' },
      { dish: 'Kylling i ovn med sopp', description: 'De silkemyke tanninene og elegansen passer perfekt til hvitt kjøtt og skogssopp' },
      { dish: 'Grillet laks med dill', description: 'Pinot Noir er en av få rødviner som fungerer til laks' }
    ],
    vintages: [
      {
        year: 2021,
        alcoholContent: 14,
        tastingNotes: ['Røde bær', 'Elegant', 'Frisk'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 2, end: 7 },
        price: 14
      }
    ]
  },
  {
    id: 'verrerie-collines-rouge',
    name: 'Hautes Collines Rouge',
    producer: 'Château La Verrerie',
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Syrah'],
    description: 'Premium rødvin fra Château La Verrerie med røde og mørke bær, krydder og mineralitet. Elegant og velbalansert vin fra høytliggende vinmarker.',
    foodPairings: [
      { dish: 'Svinefilet med bringebærsaus', description: 'Vinens balanse mellom røde og mørke bær matcher perfekt med svinekjøttets mildhet' },
      { dish: 'Provençalsk lammegryte', description: 'Mineraliteten i vinen løfter de tradisjonelle urtene i gryten' },
      { dish: 'Grillede grønnsaker med fetaost', description: 'Vinens krydder og mineralitet matcher grillede grønnsaker' },
      { dish: 'Viltpølser med potetmos', description: 'Medium fylde og krydderaromer gjør vinen allsidig' }
    ],
    purchaseLocations: [purchaseLocations['chateau-la-verrerie']],
    vintages: [
      {
        year: 2020,
        alcoholContent: 14.5,
        tastingNotes: ['Røde og mørke bær', 'Krydder', 'Mineralitet'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 2, end: 8 },
        price: 19
      }
    ]
  },
  {
    id: 'mayol-viognier',
    name: 'Viognier',
    producer: 'Domaine de Mayol',
    color: 'white',
    appellation: 'Luberon AOP',
    grapes: ['Viognier'],
    description: '100% Viognier - en sjelden og eksklusiv hvitvin fra Luberon. Kraftig og aromatisk med eksotiske blomster, fersken og full body. En imponerende vin med stor karakter.',
    foodPairings: [
      { dish: 'Kongekrabbe med sitrussmør', description: 'Viogniers fylde og blomsteraromer matcher krabbens delikate søthet' },
      { dish: 'Kylling i karrisaus', description: 'De eksotiske blomsternoterne harmonerer perfekt med mild karri' },
      { dish: 'Kamskjell med brun smør', description: 'Vinens oljeaktige tekstur og fersken-aromer matcher perfekt med søte kamskjell' },
      { dish: 'Thai-inspirert rekecurry', description: 'Viogniers naturlige søthet og blomsteraromer balanserer krydder i asiatisk mat' }
    ],
    purchaseLocations: [purchaseLocations['domaine-mayol']],
    vintages: [
      {
        year: 2021,
        alcoholContent: 14.5,
        tastingNotes: ['Frukt', 'Blomster', 'Kraft'],
        storageRecommendation: 'short-term',
        optimalDrinkingWindow: { start: 1, end: 4 },
        price: 14
      }
    ]
  },
  {
    id: 'marrenon-doria',
    name: 'Doria Blanc',
    producer: 'Vignobles Marrenon',
    color: 'white',
    appellation: 'Luberon AOP',
    grapes: ['Vermentino', 'Grenache Blanc', 'Roussanne'],
    description: 'Prisbelønnet hvitvin fra Marrenon (90/100 Decanter). Kompleks med gul frukt, karamell, hasselnøtt og sitrus. En vin med stor dybde og eleganse.',
    foodPairings: [
      { dish: 'Bacalao', description: 'Vinens hasselnøtt og karamellnote matcher perfekt med klippfisk i tomatsaus' },
      { dish: 'Klippfisk med rotgrønnsaker', description: 'Mineraliteten og sitrustoner kutter gjennom torsken' },
      { dish: 'Paella med sjømat', description: 'Vinens salte mineralitet fremhever reker og safran' },
      { dish: 'Kylling med hasselnøtter og fløte', description: 'Vinens nøtteaktige karakter harmonerer perfekt med både nøtter og kremsaus' }
    ],
    purchaseLocations: [purchaseLocations['vignobles-marrenon']],
    vintages: [
      {
        year: 2021,
        alcoholContent: 13.5,
        tastingNotes: ['Gul frukt', 'Karamel', 'Mel', 'Hasselnøt', 'Sitron', 'Krydder'],
        storageRecommendation: 'short-term',
        optimalDrinkingWindow: { start: 1, end: 5 },
        price: 10
      },
      {
        year: 2020,
        alcoholContent: 13.5,
        tastingNotes: ['Hasselnøt', 'Sitrus', 'Karamell', 'Mineralitet'],
        storageRecommendation: 'short-term',
        optimalDrinkingWindow: { start: 1, end: 5 },
        price: 10
      },
      {
        year: 2019,
        alcoholContent: 13.5,
        tastingNotes: ['Gul frukt', 'Sitron', 'Krydder', 'Kompleks'],
        storageRecommendation: 'short-term',
        optimalDrinkingWindow: { start: 1, end: 5 },
        price: 9
      }
    ]
  },
  {
    id: 'verrerie-collines-blanc',
    name: 'Hautes Collines Blanc',
    producer: 'Château La Verrerie',
    color: 'white',
    appellation: 'Luberon AOP',
    grapes: ['Grenache Blanc', 'Roussanne'],
    description: 'Premium hvitvin fra høytliggende vinmarker ved Château La Verrerie. Gul frukt, blomster og frisk mineralitet gir en elegant og velbalansert vin.',
    foodPairings: [
      { dish: 'Torsk i ovn med sitron og urter', description: 'Vinens friske mineralitet og gule frukter matcher hvit fisk perfekt' },
      { dish: 'Geiteostsalat med honning', description: 'Blomsternotene og mineraliteten balanserer geiteostens syre' },
      { dish: 'Urtestekt kylling med sitronskall', description: 'Grenache blanc-druens sitruskarakter matcher sitron perfekt' },
      { dish: 'Asparges med hollandaise', description: 'Vinens mineralitet og syre balanserer den rike hollandaisesausen' }
    ],
    purchaseLocations: [purchaseLocations['chateau-la-verrerie']],
    vintages: [
      {
        year: 2022,
        alcoholContent: 13.5,
        tastingNotes: ['Gul frukt', 'Blomster', 'Frisk mineralitet'],
        storageRecommendation: 'short-term',
        optimalDrinkingWindow: { start: 1, end: 5 },
        price: 18
      }
    ]
  },
  {
    id: 'mayol-rose',
    name: 'Domaine de Mayol Rosé',
    producer: 'Domaine de Mayol',
    color: 'rosé',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Cinsault'],
    description: 'Must-try rosé fra Domaine de Mayol. Jordbær, elegant og lett - perfekt sommervin. En klassisk provençalsk rosé med fin balanse og friskhet.',
    foodPairings: [
      { dish: 'Røkelaks på knekkebrød', description: 'Den elegante, lette rosé med jordbær matcher perfekt røkt laks' },
      { dish: 'Sommerlig salat med reker og avokado', description: 'Vinens friskhet og jordbærnote komplementerer skalldyr og cremete avokado' },
      { dish: 'Frittata med grønnsaker', description: 'Lett, elegant rosé er perfekt til eggbaserte retter' },
      { dish: 'Tapas med jamon og tomat', description: 'Provençal-stil rosé er laget for middelhavstapas' }
    ],
    purchaseLocations: [purchaseLocations['domaine-mayol']],
    vintages: [
      {
        year: 2021,
        alcoholContent: 13.5,
        tastingNotes: ['Jordbær', 'Elegant', 'Must-try'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 2 },
        price: 13
      }
    ]
  },
  {
    id: 'mille-clefs-rose',
    name: 'Les Clefs de Mille Rosé',
    producer: 'Château de Mille',
    color: 'rosé',
    appellation: 'Luberon AOP',
    imageUrl: '/images/wines/clefs-de-mille-rose.jpg',
    grapes: ['Grenache', 'Syrah'],
    description: 'Elegant rosé fra Château de Mille med friske fruktaromer. Perfekt sommervin med fin balanse mellom fruktighet og friskhet.',
    foodPairings: [
      { dish: 'Laks-tartar', description: 'Den friske rosé med jordbær og sitrus matcher perfekt med rå laks' },
      { dish: 'Salat med geitost og jordbær', description: 'Vinens fruktighet og grapefrukt-toner komplementerer både ost og bær' },
      { dish: 'Poke bowl med laks', description: 'Lett og frisk rosé passer utmerkt til denne moderne retten' },
      { dish: 'Grillet kylling med sitron', description: 'Vinens blomsteraromer og friskhet løfter kyllingretten' }
    ],
    purchaseLocations: [
      {
        type: 'chateau',
        name: 'Château de Mille',
        address: '2650 Route de Bonnieux',
        city: 'Apt',
        postalCode: '84400',
        phone: '+33 4 90 74 11 94',
        email: 'contact@chateaudemille.fr',
        website: 'https://www.chateaudemille.fr',
        coordinates: {
          lat: 43.866744,
          lng: 5.352626
        },
        openingHours: {
          monday: '10:00-12:00, 14:00-18:00',
          tuesday: '10:00-12:00, 14:00-18:00',
          wednesday: '10:00-12:00, 14:00-18:00',
          thursday: '10:00-12:00, 14:00-18:00',
          friday: '10:00-12:00, 14:00-18:00',
          saturday: '10:00-12:00, 14:00-18:00',
          sunday: 'Stengt',
          notes: 'Sommeråpningstider (juli-august): Utvidet til 19:00'
        },
        priceRange: '€25-35',
        notes: 'Gratis vinsmaking. Omvisning på forespørsel. Vingården ligger ved foten av Luberon-fjellet med spektakulær utsikt.',
        bookingRequired: false,
        tastingAvailable: true
      }
    ],
    vintages: [
      {
        year: 2021,
        alcoholContent: 13.5,
        tastingNotes: ['Jordbær', 'Grapefrukt', 'Røde blomster', 'Fersken'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 3 },
        price: 14
      }
    ]
  },
  {
    id: 'mille-blanc',
    name: 'Château de Mille Blanc',
    producer: 'Château de Mille',
    imageUrl: '/images/wines/mille-blanc.jpg',
    color: 'white',
    appellation: 'Luberon AOP',
    grapes: ['Grenache Blanc', 'Roussanne', 'Rolle'],
    description: 'Frisk og mineralsk hvitvin fra Château de Mille. Blomsteraromatisk med god fylde og fin balanse mellom frukt og syre.',
    foodPairings: [
      { dish: 'Reker med aioli', description: 'Vinens mineralitet og friskhet matcher perfekt med reker' },
      { dish: 'Steinbit i ovn med urter', description: 'Blomsternotene og fruktigheten løfter den hvite fisken' },
      { dish: 'Krabbesalat', description: 'Den friske mineraliteten komplementerer krabbens delikate søthet' },
      { dish: 'Geiteost-salat med honning', description: 'Vinens frukt balanserer geiteostens syre og honningens søthet' }
    ],
    purchaseLocations: [
      {
        type: 'chateau',
        name: 'Château de Mille',
        address: '2650 Route de Bonnieux',
        city: 'Apt',
        postalCode: '84400',
        phone: '+33 4 90 74 11 94',
        email: 'contact@chateaudemille.fr',
        website: 'https://www.chateaudemille.fr',
        coordinates: {
          lat: 43.866744,
          lng: 5.352626
        },
        openingHours: {
          monday: '10:00-12:00, 14:00-18:00',
          tuesday: '10:00-12:00, 14:00-18:00',
          wednesday: '10:00-12:00, 14:00-18:00',
          thursday: '10:00-12:00, 14:00-18:00',
          friday: '10:00-12:00, 14:00-18:00',
          saturday: '10:00-12:00, 14:00-18:00',
          sunday: 'Stengt',
          notes: 'Sommeråpningstider (juli-august): Utvidet til 19:00'
        },
        priceRange: '€25-35',
        notes: 'Gratis vinsmaking. Omvisning på forespørsel. Vingården ligger ved foten av Luberon-fjellet med spektakulær utsikt.',
        bookingRequired: false,
        tastingAvailable: true
      }
    ],
    vintages: [
      {
        year: 2021,
        alcoholContent: 13.5,
        tastingNotes: ['Frukt', 'Blomster', 'Mineralitet', 'Frisk'],
        storageRecommendation: 'short-term',
        optimalDrinkingWindow: { start: 1, end: 4 },
        price: 14
      }
    ]
  },
  {
    id: 'mille-clefs-blanc',
    name: 'Les Clefs de Mille Blanc',
    producer: 'Château de Mille',
    color: 'white',
    appellation: 'Luberon AOP',
    imageUrl: '/images/wines/clefs-de-mille-blanc.jpg',
    grapes: ['Grenache Blanc', 'Roussanne', 'Vermentino'],
    description: 'Basis hvitvin fra Château de Mille med frisk og lett profil. Perfekt hverdagsvin med god mineralitet og blomsteraromer.',
    foodPairings: [
      { dish: 'Reker og aioli', description: 'Frisk mineralitet matcher perfekt med reker' },
      { dish: 'Hvit fisk', description: 'Lett og frisk til grillet eller stekt fisk' },
      { dish: 'Salat med geitost', description: 'Vinens fruktighet balanserer geiteostens syre' },
      { dish: 'Lette pastaretter', description: 'Perfekt til pasta primavera eller pesto' }
    ],
    purchaseLocations: [
      {
        type: 'chateau',
        name: 'Château de Mille',
        address: '2650 Route de Bonnieux',
        city: 'Apt',
        postalCode: '84400',
        phone: '+33 4 90 74 11 94',
        email: 'contact@chateaudemille.fr',
        website: 'https://www.chateaudemille.fr',
        coordinates: {
          lat: 43.866744,
          lng: 5.352626
        },
        openingHours: {
          monday: '10:00-12:00, 14:00-18:00',
          tuesday: '10:00-12:00, 14:00-18:00',
          wednesday: '10:00-12:00, 14:00-18:00',
          thursday: '10:00-12:00, 14:00-18:00',
          friday: '10:00-12:00, 14:00-18:00',
          saturday: '10:00-12:00, 14:00-18:00',
          sunday: 'Stengt',
          notes: 'Sommeråpningstider (juli-august): Utvidet til 19:00'
        },
        priceRange: '€12-35',
        notes: 'Gratis vinsmaking. Omvisning på forespørsel. Vingården ligger ved foten av Luberon-fjellet med spektakulær utsikt.',
        bookingRequired: false,
        tastingAvailable: true
      }
    ],
    vintages: [
      {
        year: 2024,
        alcoholContent: 13,
        tastingNotes: ['Sitrus', 'Hvite blomster', 'Mineralsk', 'Frisk'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 2 },
        price: 12
      }
    ]
  },
  {
    id: 'mille-celestine-blanc',
    name: 'Célestine Blanc',
    producer: 'Château de Mille',
    color: 'white',
    appellation: 'Luberon AOP',
    imageUrl: '/images/wines/celestine-blanc.jpg',
    grapes: ['Grenache Blanc', 'Roussanne', 'Vermentino'],
    description: 'Premium hvitvin fra Château de Mille med kompleks aromatikk og god lagringspotensial. Elegant og fyldig med fin mineralitet.',
    foodPairings: [
      { dish: 'Kamskjell', description: 'Vinens kompleksitet matcher rike kamskjellretter' },
      { dish: 'Hummer med smør', description: 'Fyldig hvitvin til luksuriøs sjømat' },
      { dish: 'Kylling i kremsaus', description: 'Vinens fylde står opp mot rik saus' },
      { dish: 'Modne hvite oster', description: 'Brie eller Camembert med god modning' }
    ],
    purchaseLocations: [
      {
        type: 'chateau',
        name: 'Château de Mille',
        address: '2650 Route de Bonnieux',
        city: 'Apt',
        postalCode: '84400',
        phone: '+33 4 90 74 11 94',
        email: 'contact@chateaudemille.fr',
        website: 'https://www.chateaudemille.fr',
        coordinates: {
          lat: 43.866744,
          lng: 5.352626
        },
        openingHours: {
          monday: '10:00-12:00, 14:00-18:00',
          tuesday: '10:00-12:00, 14:00-18:00',
          wednesday: '10:00-12:00, 14:00-18:00',
          thursday: '10:00-12:00, 14:00-18:00',
          friday: '10:00-12:00, 14:00-18:00',
          saturday: '10:00-12:00, 14:00-18:00',
          sunday: 'Stengt',
          notes: 'Sommeråpningstider (juli-august): Utvidet til 19:00'
        },
        priceRange: '€12-35',
        notes: 'Gratis vinsmaking. Omvisning på forespørsel. Vingården ligger ved foten av Luberon-fjellet med spektakulær utsikt.',
        bookingRequired: false,
        tastingAvailable: true
      }
    ],
    vintages: [
      {
        year: 2024,
        alcoholContent: 13.5,
        tastingNotes: ['Hvite blomster', 'Honning', 'Mineralsk', 'Kompleks'],
        storageRecommendation: 'short-term',
        optimalDrinkingWindow: { start: 1, end: 5 },
        price: 28
      }
    ]
  },
  {
    id: 'mille-saint-lucide-blanc',
    name: 'Saint-Lucide Blanc',
    producer: 'Château de Mille',
    color: 'white',
    appellation: 'Luberon AOP',
    imageUrl: '/images/wines/saint-lucide-blanc.jpg',
    grapes: ['Roussanne', 'Grenache Blanc', 'Vermentino'],
    description: 'Toppvin blant hvitvinene fra Château de Mille. Roussanne-dominert med stor kompleksitet, rik tekstur og fremragende lagringsevne.',
    foodPairings: [
      { dish: 'Hummer thermidor', description: 'Vinens fylde og kompleksitet matcher denne luksuriøse retten' },
      { dish: 'Steinbit i smørsaus', description: 'Rik hvit fisk med rik saus krever en fyldig vin' },
      { dish: 'Risotto med sopp', description: 'Kompleks vin til kompleks rett' },
      { dish: 'Modne oster', description: 'Comté eller gammel hvit cheddar' }
    ],
    purchaseLocations: [
      {
        type: 'chateau',
        name: 'Château de Mille',
        address: '2650 Route de Bonnieux',
        city: 'Apt',
        postalCode: '84400',
        phone: '+33 4 90 74 11 94',
        email: 'contact@chateaudemille.fr',
        website: 'https://www.chateaudemille.fr',
        coordinates: {
          lat: 43.866744,
          lng: 5.352626
        },
        openingHours: {
          monday: '10:00-12:00, 14:00-18:00',
          tuesday: '10:00-12:00, 14:00-18:00',
          wednesday: '10:00-12:00, 14:00-18:00',
          thursday: '10:00-12:00, 14:00-18:00',
          friday: '10:00-12:00, 14:00-18:00',
          saturday: '10:00-12:00, 14:00-18:00',
          sunday: 'Stengt',
          notes: 'Sommeråpningstider (juli-august): Utvidet til 19:00'
        },
        priceRange: '€12-35',
        notes: 'Gratis vinsmaking. Omvisning på forespørsel. Vingården ligger ved foten av Luberon-fjellet med spektakulær utsikt.',
        bookingRequired: false,
        tastingAvailable: true
      }
    ],
    vintages: [
      {
        year: 2024,
        alcoholContent: 14,
        tastingNotes: ['Aprikos', 'Honning', 'Vanilje', 'Mineralsk', 'Rik tekstur'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 2, end: 8 },
        price: 32
      }
    ]
  },
  {
    id: 'mille-rose',
    name: 'Château de Mille Rosé',
    producer: 'Château de Mille',
    color: 'rosé',
    appellation: 'Luberon AOP',
    imageUrl: '/images/wines/mille-rose.jpg',
    grapes: ['Grenache', 'Syrah', 'Cinsault'],
    description: 'Elegant og frisk rosé fra Château de Mille. Klassisk provencalsk stil med delikate røde bær og blomsteraromer. Perfekt sommervin.',
    foodPairings: [
      { dish: 'Salade Niçoise', description: 'Klassisk provencalsk salat med tunfisk' },
      { dish: 'Grillet laks', description: 'Frisk rosé til fet fisk' },
      { dish: 'Reker med aioli', description: 'Perfekt aperitiff-kombinasjon' },
      { dish: 'Tomatbaserte pastaretter', description: 'Arrabbiata eller marinara' }
    ],
    purchaseLocations: [
      {
        type: 'chateau',
        name: 'Château de Mille',
        address: '2650 Route de Bonnieux',
        city: 'Apt',
        postalCode: '84400',
        phone: '+33 4 90 74 11 94',
        email: 'contact@chateaudemille.fr',
        website: 'https://www.chateaudemille.fr',
        coordinates: {
          lat: 43.866744,
          lng: 5.352626
        },
        openingHours: {
          monday: '10:00-12:00, 14:00-18:00',
          tuesday: '10:00-12:00, 14:00-18:00',
          wednesday: '10:00-12:00, 14:00-18:00',
          thursday: '10:00-12:00, 14:00-18:00',
          friday: '10:00-12:00, 14:00-18:00',
          saturday: '10:00-12:00, 14:00-18:00',
          sunday: 'Stengt',
          notes: 'Sommeråpningstider (juli-august): Utvidet til 19:00'
        },
        priceRange: '€12-35',
        notes: 'Gratis vinsmaking. Omvisning på forespørsel. Vingården ligger ved foten av Luberon-fjellet med spektakulær utsikt.',
        bookingRequired: false,
        tastingAvailable: true
      }
    ],
    vintages: [
      {
        year: 2024,
        alcoholContent: 13,
        tastingNotes: ['Jordbær', 'Fersken', 'Blomster', 'Frisk'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 2 },
        price: 13
      }
    ]
  },
  {
    id: 'claux-panorama',
    name: 'Panorama Blanc',
    producer: 'Bastide du Claux',
    color: 'white',
    appellation: 'Luberon AOP',
    grapes: ['Vermentino', 'Grenache Blanc', 'Clairette', 'Ugni Blanc', 'Roussanne', 'Marsanne', 'Viognier'],
    description: 'Ekstraordinær kompleks hvitvin fra Sylvain Morey i Ménerbes. Syv forskjellige druetyper gir en unik og fascinerende vin med stor dybde og mineralitet.',
    foodPairings: [
      { dish: 'Kamskjell gratinert', description: 'Vinens kompleksitet og fylde matcher den rike kamskjellretten' },
      { dish: 'Steinbit med beurre blanc', description: 'Multidimensjonal vin til en klassisk fransk fiskrett' },
      { dish: 'Ost- og sjømatfat', description: 'Vinens kompleksitet gjør den perfekt til varierte smaker' },
      { dish: 'Risotto med sopp', description: 'Blomster og mineralitet løfter soppens jordaroma' }
    ],
    vintages: [
      {
        year: 2021,
        alcoholContent: 13.5,
        tastingNotes: ['Komplekst', 'Mineralt', 'Frukt', 'Blomster'],
        storageRecommendation: 'short-term',
        optimalDrinkingWindow: { start: 1, end: 5 },
        price: 16
      }
    ]
  },
  {
    id: 'claux-poudriere',
    name: 'Poudrière Rosé',
    producer: 'Bastide du Claux',
    color: 'rosé',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Cinsault', 'Syrah', 'Carignan'],
    description: 'Elegant rosé fra Bastide du Claux i Ménerbes. Flerdimensjonal blanding av fire druer gir kompleksitet og struktur utover det vanlige for en rosé.',
    foodPairings: [
      { dish: 'Bouillabaisse', description: 'Provencalsk fiskesuppe møter elegant rosé med krydder og struktur' },
      { dish: 'Grillet tonfisk', description: 'Røde frukter og krydder matcher den fyldige fisken' },
      { dish: 'Lammefilet med rosmarin', description: 'Strukturen i rosé-en tåler også lyst kjøtt' },
      { dish: 'Tapas-brett', description: 'Allsidig vin til varierte smaker' }
    ],
    vintages: [
      {
        year: 2021,
        alcoholContent: 13.5,
        tastingNotes: ['Røde frukt', 'Krydder', 'Elegant'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 3 },
        price: 13
      }
    ]
  },
  {
    id: 'citadelle-chataignier',
    name: 'Châtaignier Rouge',
    producer: 'Domaine de la Citadelle',
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Syrah'],
    description: 'Tilgjengelig og fruktdrevet rødvin fra Domaine de la Citadelle i Ménerbes. En lett og elegant vin perfekt til hverdagsmat og enkel servering.',
    foodPairings: [
      { dish: 'Pizza med spekemat', description: 'Lett rødvin med røde bær passer perfekt til pizza' },
      { dish: 'Pasta med tomatsaus', description: 'Fruktigheten matcher tomater og urter utmerkt' },
      { dish: 'Kyllingsalat', description: 'Lett vin til lette retter' },
      { dish: 'Spekemat og ost', description: 'Enkel vin til enkel mat' }
    ],
    purchaseLocations: [purchaseLocations['domaine-citadelle']],
    vintages: [
      {
        year: 2021,
        alcoholContent: 14,
        tastingNotes: ['Røde bær', 'Krydder', 'Jordet'],
        storageRecommendation: 'short-term',
        optimalDrinkingWindow: { start: 1, end: 5 },
        price: 8
      }
    ]
  },
  {
    id: 'citadelle-artemes',
    name: 'Artèmes Rouge',
    producer: 'Domaine de la Citadelle',
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Syrah', 'Carignan'],
    description: 'Premium-cuvée fra Domaine de la Citadelle i Ménerbes. Strukturert og konsentrert med mørke bær og god lagringsevne. Carignan gir ekstra kompleksitet.',
    foodPairings: [
      { dish: 'Lammegryte med rotgrønnsaker', description: 'Strukturert vin til langkokt kjøtt' },
      { dish: 'Entrecôte med rødvinssaus', description: 'Mørke bær og krydder matcher grillet biff' },
      { dish: 'Hjortestek', description: 'Vinens struktur tåler kraftig vilt' },
      { dish: 'Comté-ost', description: 'Strukturert vin til moden ost' }
    ],
    purchaseLocations: [purchaseLocations['domaine-citadelle']],
    vintages: [
      {
        year: 2021,
        alcoholContent: 14.5,
        tastingNotes: ['Mørke bær', 'Krydder', 'Strukturert'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 1, end: 7 },
        price: 13
      }
    ]
  },
  {
    id: 'citadelle-artemes-blanc',
    name: 'Artèmes Blanc',
    producer: 'Domaine de la Citadelle',
    color: 'white',
    appellation: 'Luberon AOP',
    grapes: ['Grenache Blanc', 'Roussanne', 'Vermentino'],
    description: 'Kompleks og mineralsk hvitvin fra Les Artèmes-serien. En ren og elegant vin med stor dybde og finesse. Økologisk dyrket på kalksteinsjord.',
    foodPairings: [
      { dish: 'Grillet havabbor', description: 'Mineralsk hvitvin til hvit fisk' },
      { dish: 'Asparges med parmesan', description: 'Kompleksitet i vinen matcher aspargesen' },
      { dish: 'Geitost med honning', description: 'Mineralitet balanserer geiteost' },
      { dish: 'Kamskjell', description: 'Elegant vin til delikate skalldyr' }
    ],
    purchaseLocations: [purchaseLocations['domaine-citadelle']],
    vintages: [
      {
        year: 2022,
        alcoholContent: 13.5,
        tastingNotes: ['Hvite blomster', 'Mineralsk', 'Sitrus', 'Kompleks'],
        storageRecommendation: 'short-term',
        optimalDrinkingWindow: { start: 1, end: 5 },
        price: 13
      }
    ]
  },
  {
    id: 'citadelle-artemes-rose',
    name: 'Artèmes Rosé',
    producer: 'Domaine de la Citadelle',
    color: 'rosé',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Syrah', 'Cinsault'],
    description: 'Elegant rosé fra premium-serien Les Artèmes. Strukturert og kompleks med røde bær og krydder. En rosé med karakter og lagringsevne.',
    foodPairings: [
      { dish: 'Grillet laks', description: 'Strukturert rosé til fet fisk' },
      { dish: 'Bouillabaisse', description: 'Provencalsk rosé til provencalsk fiskesuppe' },
      { dish: 'Sommerretter', description: 'Elegant rosé til sommerbord' },
      { dish: 'Tapas', description: 'Allsidig vin til varierte smaker' }
    ],
    purchaseLocations: [purchaseLocations['domaine-citadelle']],
    vintages: [
      {
        year: 2023,
        alcoholContent: 13.5,
        tastingNotes: ['Røde bær', 'Krydder', 'Strukturert', 'Elegant'],
        storageRecommendation: 'short-term',
        optimalDrinkingWindow: { start: 0, end: 3 },
        price: 13
      }
    ]
  },
  {
    id: 'cavale-blanc',
    name: 'La Cavale Blanc',
    producer: 'La Cavale',
    color: 'white',
    appellation: 'Luberon AOP',
    grapes: ['Grenache Blanc', 'Vermentino', 'Roussanne'],
    description: 'Økologisk hvitvin fra La Cavale. Elegant og mineralsk med sitrus og blomster. En ren og distinkt vin som viser terroir-en godt.',
    foodPairings: [
      { dish: 'Østers', description: 'Mineralsk hvitvin til mineralske skjell' },
      { dish: 'Sei i ovn med sitron', description: 'Sitrus i vinen matcher sitrus i retten' },
      { dish: 'Chèvre-ost med honning', description: 'Blomster og mineralitet balanserer geiteost' },
      { dish: 'Asparges risotto', description: 'Elegant vin til delikat grønnsakrett' }
    ],
    vintages: [
      {
        year: 2021,
        alcoholContent: 13.5,
        tastingNotes: ['Sitrus', 'Blomster', 'Mineralitet', 'Elegant'],
        storageRecommendation: 'short-term',
        optimalDrinkingWindow: { start: 1, end: 4 },
        price: 15
      }
    ]
  },
  {
    id: 'cavale-rouge',
    name: 'La Cavale Rouge',
    producer: 'La Cavale',
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Syrah'],
    description: 'Økologisk rødvin fra La Cavale med røde bær og elegant struktur. Ren og uttrykksrull vin som gjenspeiler biodynamisk dyrking.',
    foodPairings: [
      { dish: 'Gautes Provencalske pølser', description: 'Økologisk vin med krydder og røde bær matcher de ovnsbakte pølsene med provencalske urter' },
      { dish: 'Lammestek med timian', description: 'Økologisk vin til naturlig oppdratt lam' },
      { dish: 'Grillede grønnsaker med fetaost', description: 'Røde bær og krydder matcher grillsmak' },
      { dish: 'Kyllinggryte med oliven', description: 'Elegant vin til provencalsk inspirert rett' },
      { dish: 'Manchego-ost', description: 'Medium struktur til fast ost' }
    ],
    vintages: [
      {
        year: 2021,
        alcoholContent: 14.5,
        tastingNotes: ['Røde bær', 'Krydder', 'Elegant'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 1, end: 6 },
        price: 16
      }
    ]
  },
  {
    id: 'infirmieres-rouge',
    name: 'Mas des Infirmières Rouge',
    producer: 'Mas des Infirmières',
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Syrah'],
    description: 'Rødvin fra Ridley Scotts vingård i Luberon! Elegant og balansert med røde bær og krydder. En vin med filmstjerne-status og kvalitet til å matche.',
    foodPairings: [
      { dish: 'Lammesadel', description: 'Premium vin til premium kjøtt fra filmregissørens vingård' },
      { dish: 'Grillet entrecôte', description: 'Røde bær og krydder matcher grillet biff perfekt' },
      { dish: 'Provencalsk lammegryte', description: 'Ekte provencalsk vin til ekte provencalsk mat' },
      { dish: 'Eple-camembert', description: 'Elegant vin til myk ost' }
    ],
    vintages: [
      {
        year: 2020,
        alcoholContent: 14.5,
        tastingNotes: ['Røde bær', 'Krydder', 'Elegant'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 1, end: 6 },
        price: 16
      }
    ]
  },
  {
    id: 'infirmieres-rose',
    name: 'Mas des Infirmières Rosé',
    producer: 'Mas des Infirmières',
    color: 'rosé',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Cinsault'],
    description: 'Økologisk rosé fra Ridley Scotts vingård. Jordbær, grapefrukt og elegant finish. En rosé med Hollywood-glamour og provencalsk eleganse.',
    foodPairings: [
      { dish: 'Gravlaks', description: 'Elegant rosé fra filmregissørens vingård til nordisk laks' },
      { dish: 'Salat med reker og avokado', description: 'Jordbær og grapefrukt matcher skalldyr perfekt' },
      { dish: 'Quiche Lorraine', description: 'Lett rosé til fransk pai' },
      { dish: 'Sommerretter', description: 'Perfekt terrasse-vin fra Provence' }
    ],
    vintages: [
      {
        year: 2021,
        alcoholContent: 13.5,
        tastingNotes: ['Jordbær', 'Grapefrukt', 'Elegant'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 3 },
        price: 14
      }
    ]
  },
  {
    id: 'rhodares-rouge',
    name: 'Bastide de Rhodares Rouge',
    producer: 'Cave Louérion Terres d\'Alliance',
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Syrah'],
    description: 'Populær rødvin fra steinete terroir mellom Lourmarin og Cadenet. En konsentrert og fyldig vin hvor steinbunnen gir mineralitet og dybde.',
    foodPairings: [
      { dish: 'Daube provençale', description: 'Klassisk provencalsk oksegryte til klassisk Luberon-vin' },
      { dish: 'Lammekjøtt med rosmarin', description: 'Steinbunnens mineralitet matcher urter perfekt' },
      { dish: 'Grillede lammekoteletter', description: 'Fyldig vin til fyldig kjøtt fra grillen' },
      { dish: 'Pecorino-ost', description: 'Strukturert vin til hard sau' }
    ],
    purchaseLocations: [purchaseLocations['cave-louerion']],
    vintages: [
      {
        year: 2021,
        alcoholContent: 14,
        tastingNotes: ['Mørke bær', 'Mineralitet', 'Krydder', 'Konsentrert'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 1, end: 6 },
        price: 12
      }
    ]
  },
  {
    id: 'rhodares-rose',
    name: 'Bastide de Rhodares Rosé',
    producer: 'Cave Louérion Terres d\'Alliance',
    color: 'rosé',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Cinsault', 'Syrah'],
    description: 'Klassisk og deilig fruktig rosé fra Lourmarin-området. Fermeté raffinée - fast og raffinert struktur med frisk og balansert karakter.',
    foodPairings: [
      { dish: 'Salade Niçoise', description: 'Klassisk provencalsk rosé til klassisk provencalsk salat' },
      { dish: 'Grillede reker', description: 'Frisk og balansert rosé til skalldyr' },
      { dish: 'Tomatsalat med mozarella', description: 'Fruktig rosé til friske tomater' },
      { dish: 'Pai med grønnsaker', description: 'Allsidig sommervin' }
    ],
    purchaseLocations: [purchaseLocations['cave-louerion']],
    vintages: [
      {
        year: 2023,
        alcoholContent: 13,
        tastingNotes: ['Frukt', 'Frisk', 'Balansert', 'Raffinert'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 2 },
        price: 11
      }
    ]
  },
  {
    id: 'perrin-luberon-blanc',
    name: 'Luberon Blanc',
    producer: 'Famille Perrin',
    color: 'white',
    appellation: 'Luberon AOP',
    grapes: ['Bourboulenc', 'Grenache Blanc', 'Ugni Blanc', 'Roussanne'],
    description: 'Økologisk og biodynamisk hvitvin fra den berømte Châteauneuf-du-Pape-familien Perrin. Frisk sitrus og mineralsk finish gjør denne til en elegant og allsidig vin.',
    foodPairings: [
      { dish: 'Torsk med sitron og persille', description: 'Vibrerande sitrusnoter matcher perfekt med hvit fisk og sitron' },
      { dish: 'Geiteostsalat', description: 'Mineralsk finish balanserer geiteostens syre' },
      { dish: 'Kveite med urter', description: 'Frisk og elegant vin til edel hvit fisk' },
      { dish: 'Grønne asparges', description: 'Biodynamisk vin til ferske grønnsaker' }
    ],
    purchaseLocations: [purchaseLocations['famille-perrin']],
    vintages: [
      {
        year: 2023,
        alcoholContent: 13,
        tastingNotes: ['Sitrus', 'Mineralsk', 'Frisk', 'Elegant'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 3 },
        price: 15
      },
      {
        year: 2022,
        alcoholContent: 13,
        tastingNotes: ['Sitrus', 'Mineralitet', 'Frisk'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 3 },
        price: 14
      }
    ]
  },
  {
    id: 'perrin-luberon-rose',
    name: 'Luberon Rosé',
    producer: 'Famille Perrin',
    color: 'rosé',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Cinsault', 'Syrah'],
    description: 'Delikat rosé fra den prestisjetunge Perrin-familien. Blek rosa farge med friske jordbær og hvit nektarin. Økologisk og biodynamisk sertifisert.',
    foodPairings: [
      { dish: 'Hvit asparges med hollandaise', description: 'Delikat rosé til delikat grønnsak' },
      { dish: 'Kremet lakssuppe', description: 'Jordbær og nektarin matcher laksen perfekt' },
      { dish: 'Kyllingsalat med jordbær', description: 'Friske bær i vinen møter friske bær i salaten' },
      { dish: 'Sommerretter', description: 'Premium rosé fra prestisjefull produsent' }
    ],
    purchaseLocations: [purchaseLocations['famille-perrin']],
    vintages: [
      {
        year: 2023,
        alcoholContent: 12.5,
        tastingNotes: ['Jordbær', 'Hvit nektarin', 'Delikat', 'Blek rosa'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 2 },
        price: 16
      },
      {
        year: 2022,
        alcoholContent: 12.5,
        tastingNotes: ['Jordbær', 'Nektarin', 'Elegant'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 2 },
        price: 15
      }
    ]
  },
  {
    id: 'sannes-1603-blanc',
    name: '1603 Blanc',
    producer: 'Château de Sannes',
    color: 'white',
    appellation: 'Luberon AOP',
    grapes: ['Ugni Blanc', 'Vermentino', 'Grenache Blanc'],
    description: 'Premium hvitvin fra Château de Sannes sitt 1603-sortiment. Sprø, stålaktig og smakfull med god konsentrasjon. Økologisk sertifisert.',
    foodPairings: [
      { dish: 'Østers', description: 'Stålaktig mineralitet til havets mineraler' },
      { dish: 'Sei med beurre blanc', description: 'Sprø og smakfull vin til klassisk fransk fiskesaus' },
      { dish: 'Grillet sjøkreps', description: 'Premium hvitvin til premium skalldyr' },
      { dish: 'Chèvre-ost med olivenolje', description: 'Mineralsk vin til syrlig ost' }
    ],
    purchaseLocations: [purchaseLocations['chateau-sannes']],
    vintages: [
      {
        year: 2022,
        alcoholContent: 13.5,
        tastingNotes: ['Sprø', 'Stålaktig', 'Mineralsk', 'Konsentrert'],
        storageRecommendation: 'short-term',
        optimalDrinkingWindow: { start: 1, end: 4 },
        price: 18
      },
      {
        year: 2021,
        alcoholContent: 13.5,
        tastingNotes: ['Mineralsk', 'Stål', 'Konsentrert'],
        storageRecommendation: 'short-term',
        optimalDrinkingWindow: { start: 1, end: 5 },
        price: 17
      }
    ]
  },
  {
    id: 'sannes-1603-rouge',
    name: '1603 Rouge',
    producer: 'Château de Sannes',
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Syrah'],
    description: 'Mørk, rik og elegant rødvin fra Château de Sannes. Kirsebær, røkt kaffe og lakris gir kompleksitet. Økologisk dyrket.',
    foodPairings: [
      { dish: 'Røkt reinsdyrstek', description: 'Røkt kaffe i vinen matcher røkt kjøtt perfekt' },
      { dish: 'Lammestek med lakris-glassert rotgrønnsaker', description: 'Lakrisnotene i vinen forsterkes av glasuren' },
      { dish: 'Entrecôte med kaffe-rub', description: 'Mørk, rik vin til kraftig biff med kaffe' },
      { dish: 'Comté-ost', description: 'Elegant og rik vin til moden ost' }
    ],
    purchaseLocations: [purchaseLocations['chateau-sannes']],
    vintages: [
      {
        year: 2021,
        alcoholContent: 14,
        tastingNotes: ['Kirsebær', 'Røkt kaffe', 'Lakris', 'Mørk', 'Elegant'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 1, end: 7 },
        price: 19
      },
      {
        year: 2020,
        alcoholContent: 14,
        tastingNotes: ['Mørke kirsebær', 'Kaffe', 'Lakris'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 2, end: 8 },
        price: 19
      }
    ]
  },
  {
    id: 'fontvert-souleu',
    name: 'Souleu e Terraire Rouge',
    producer: 'Château Fontvert',
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Syrah', 'Grenache', 'Mourvèdre'],
    description: 'Premium cuvée fra Château Fontvert i Lourmarin. Organisk og biodynamisk sertifisert (Demeter). Konsentrert og fyldig med sprø bjørnebær og frisk syre.',
    foodPairings: [
      { dish: 'Viltgryte med bær', description: 'Bjørnebær og bringebær i vinen matcher vilt perfekt' },
      { dish: 'Lammestek med salvie', description: 'Salvie og urtenote i vinen matcher urter i retten' },
      { dish: 'Entrecôte med anissmør', description: 'Anis-noter i vinen forsterkes av smøret' },
      { dish: 'Modne oster', description: 'Fyldig biodynamisk vin til kraftige oster' }
    ],
    vintages: [
      {
        year: 2017,
        alcoholContent: 14.5,
        tastingNotes: ['Bjørnebær', 'Boysenberry', 'Salvie', 'Anis', 'Bramble'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 2, end: 8 },
        price: 24
      }
    ]
  },
  {
    id: 'fontvert-apolline',
    name: 'Apolline Rosé',
    producer: 'Château Fontvert',
    color: 'rosé',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Syrah'],
    description: 'Elegant rosé fra biodynamisk vingård i Lourmarin. Røde bær med salt og lavendel gir en unik og kompleks smaksopplevelse.',
    foodPairings: [
      { dish: 'Gautes Provencalske pølser', description: 'Lavendelnoter og røde bær i rosé-en passer overraskende godt til de ovnsbakte pølsene og grønnsakene' },
      { dish: 'Saltet laks', description: 'Saltnoter i vinen matcher saltet laks perfekt' },
      { dish: 'Rips-salat med geiteost', description: 'Rips-smak i vinen harmonerer med bær i salaten' },
      { dish: 'Provencalsk grønnsaksquiche', description: 'Lavendelnoter matcher urter i quichen' },
      { dish: 'Tapas med spekemat', description: 'Salt og frukt balanserer spekematen' }
    ],
    vintages: [
      {
        year: 2023,
        alcoholContent: 13,
        tastingNotes: ['Røde bær', 'Salt', 'Lavendel', 'Rips'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 2 },
        price: 16
      }
    ]
  },
  {
    id: 'constantin-cuvee-o',
    name: 'Cuvée Ô Rouge',
    producer: 'Château Constantin',
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Syrah', 'Mourvèdre'],
    description: 'Intens og dyp rødvin fra Château Constantin i Lourmarin. Organisk sertifisert fra 2020. Kompleks med rostede noter, mokka og silkemyke tanniner.',
    foodPairings: [
      { dish: 'Kaffe-marinert biff', description: 'Mokka-noter i vinen matcher kaffe-marinade perfekt' },
      { dish: 'Lammestek med lakris-glaserte rotgrønnsaker', description: 'Lakris i vinen forsterker glasuren' },
      { dish: 'Viltpølser med solbærsaus', description: 'Sort pepper og solbær i vinen matcher sausen' },
      { dish: 'Mørk sjokolademousse', description: 'Intens vin til intens dessert' }
    ],
    vintages: [
      {
        year: 2020,
        alcoholContent: 14.5,
        tastingNotes: ['Solbær', 'Bjørnebær', 'Mokka', 'Sort pepper', 'Lakris'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 2, end: 8 },
        price: 22
      }
    ]
  },
  {
    id: 'constantin-c2-blanc',
    name: 'C2 Origine Blanc',
    producer: 'Château Constantin',
    color: 'white',
    appellation: 'Luberon AOP',
    grapes: ['Grenache Blanc', 'Roussanne', 'Vermentino'],
    description: 'Blek gyllen hvitvin fra organisk vingård i Lourmarin. Sitrus og mineralitet med et hint av buksbom gir en frisk og elegant vin.',
    foodPairings: [
      { dish: 'Grillet grapefrukt med honning', description: 'Grapefrukt i vinen matcher grillet grapefrukt' },
      { dish: 'Sei med lime', description: 'Sitrusnoter matcher perfekt med lime på fisken' },
      { dish: 'Asparges med sitron-vinaigrette', description: 'Buksbom-noter komplementerer asparges' },
      { dish: 'Geiteost med urter', description: 'Frisk mineralitet balanserer ost' }
    ],
    vintages: [
      {
        year: 2023,
        alcoholContent: 13,
        tastingNotes: ['Gul grapefrukt', 'Lime', 'Buksbom', 'Mineralitet'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 3 },
        price: 15
      }
    ]
  },
  {
    id: 'constantin-c2-rose',
    name: 'C2 Origine Rosé',
    producer: 'Château Constantin',
    color: 'rosé',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Cinsault'],
    description: 'Blek rosa rosé fra Château Constantin. Knuste jordbær, markjordbær og rosa grapefrukt med et hint av pasjonsfrukt. Organisk og kompleks.',
    foodPairings: [
      { dish: 'Jordbærsalat med balsamico', description: 'Knuste jordbær i vinen matcher ferske jordbær' },
      { dish: 'Ørret med pasjonsfrukt-salsa', description: 'Eksotiske frukter i vinen matcher salsaen' },
      { dish: 'Thai-salat med reker', description: 'Pasjonsfrukt og rosa grapefrukt matcher asiatiske smaker' },
      { dish: 'Lychee-dessert', description: 'Kompleks rosé til eksotisk dessert' }
    ],
    vintages: [
      {
        year: 2023,
        alcoholContent: 12.5,
        tastingNotes: ['Jordbær', 'Markjordbær', 'Rosa grapefrukt', 'Pasjonsfrukt', 'Lychee'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 2 },
        price: 14
      }
    ]
  },
  {
    id: 'isolette-prestige',
    name: 'Cuvée Prestige Vieilles Vignes',
    producer: 'Château de l\'Isolette',
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Syrah', 'Grenache', 'Mourvèdre'],
    description: 'Premium vin fra gamle vinstokker ved Château de l\'Isolette i Apt. Robert Parker anbefalte dette som en av de to beste produsentene i området. Organisk dyrket siden 1238.',
    foodPairings: [
      { dish: 'Viltgryte med lakrissaus', description: 'Lakrisnote i vinen matcher sausen perfekt' },
      { dish: 'Provencalsk lammestek med garrigue-urter', description: 'Garrigue-aromer i vinen møter urter fra Provence' },
      { dish: 'Grillet kjøtt med eukalyptus-marinade', description: 'Eukalyptusnoter i vinen forsterkes av marinaden' },
      { dish: 'Svarte oliven med ost', description: 'Sort oliven-noter matcher perfekt' }
    ],
    purchaseLocations: [purchaseLocations['chateau-isolette']],
    vintages: [
      {
        year: 2010,
        alcoholContent: 14.5,
        tastingNotes: ['Mørke bær', 'Eukalyptus', 'Sort oliven', 'Lakris', 'Tobakk', 'Garrigue'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 3, end: 10 },
        price: 20
      },
      {
        year: 2009,
        alcoholContent: 14.5,
        tastingNotes: ['Røde bær', 'Mørke bær', 'Garrigue', 'Lakris', 'Eik'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 3, end: 10 },
        price: 20
      }
    ]
  },
  {
    id: 'turcan-louis',
    name: 'Cuvée Louis Turcan Rouge',
    producer: 'Château Turcan',
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Syrah', 'Mourvèdre'],
    description: 'Premium cuvée fra Château Turcan i Ansouis. 150 år gammel vingård med organisk sertifisering. Utvalgsparseller høstet og modnet med spesiell omsorg, ofte på fat.',
    foodPairings: [
      { dish: 'Lammesadel med røde bær', description: 'Røde frukter i vinen matcher bærsausen' },
      { dish: 'Krydderstekt entrecôte', description: 'Kryddernotene i vinen matcher pepperen på biffen' },
      { dish: 'Modne oster som Comté', description: 'Fyldig og rik vin til moden ost' },
      { dish: 'Viltpølser', description: 'Kraftig vin til kraftig kjøtt' }
    ],
    purchaseLocations: [purchaseLocations['chateau-turcan']],
    vintages: [
      {
        year: 2020,
        alcoholContent: 14.5,
        tastingNotes: ['Røde frukter', 'Krydder', 'Elegant', 'Fyldig', 'Rik'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 2, end: 10 },
        price: 22
      }
    ]
  },

  // Cave de Sylla - Apt
  {
    id: 'sylla-pensines-blanc',
    name: 'Les Pensines Blanc',
    producer: 'Cave de Sylla',
    color: 'white',
    appellation: 'Luberon AOP',
    grapes: ['Clairette', 'Roussanne', 'Grenache Blanc'],
    description: 'Lett og balansert hvitvin med vakre fruktuttrykk. Fra vinkooperativ med 113 produsenter i Apt.',
    foodPairings: [
      { dish: 'Aperitif', description: 'Perfekt som aperitif' },
      { dish: 'Sjømatgrateng', description: 'Passer godt til sjømatretter' },
      { dish: 'Sitronfromage', description: 'God til desserter med sitrus' }
    ],
    purchaseLocations: [purchaseLocations['cave-sylla']],
    vintages: [
      {
        year: 2024,
        alcoholContent: 13,
        tastingNotes: ['Hvite blomster', 'Fersken', 'Sitrus', 'Frisk', 'Mineralsk'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 2 },
        price: 5.45
      }
    ]
  },
  {
    id: 'sylla-pensines-rose',
    name: 'Les Pensines Rosé',
    producer: 'Cave de Sylla',
    color: 'rosé',
    appellation: 'Luberon AOP',
    grapes: ['Cinsault', 'Grenache', 'Roussanne', 'Syrah'],
    description: 'Lett og frisk rosévin, perfekt for sommergrilling. Delikat med små røde frukter og sitrus.',
    foodPairings: [
      { dish: 'Aperitif', description: 'Utmerket som aperitif' },
      { dish: 'Grillmat', description: 'Perfekt til sommer-BBQ' },
      { dish: 'Fruktsalat', description: 'God til lette desserter' }
    ],
    purchaseLocations: [purchaseLocations['cave-sylla']],
    vintages: [
      {
        year: 2024,
        alcoholContent: 13,
        tastingNotes: ['Jordbær', 'Sitron', 'Blomster', 'Frisk', 'Rund'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 2 },
        price: 5.45
      }
    ]
  },
  {
    id: 'sylla-pensines-rouge',
    name: 'Les Pensines Rouge',
    producer: 'Cave de Sylla',
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Grenache'],
    description: 'Lett og balansert rødvin for hverdagsglede. Silkemyk og fruktig.',
    foodPairings: [
      { dish: 'Grillet kjøtt', description: 'Passer til enklere grillretter' },
      { dish: 'Pizza', description: 'God til italiensk mat' },
      { dish: 'Pastaretter', description: 'Allsidig til hverdagsmat' }
    ],
    purchaseLocations: [purchaseLocations['cave-sylla']],
    vintages: [
      {
        year: 2023,
        alcoholContent: 13,
        tastingNotes: ['Jordbær', 'Kirsebær', 'Krydder', 'Silkemyk', 'Lett'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 3 },
        price: 5.45
      }
    ]
  },
  {
    id: 'sylla-grand-marrenon',
    name: 'Grand Marrenon',
    producer: 'Cave de Sylla',
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Syrah', 'Grenache'],
    description: 'Premium rødvin fra Les Parcellaires-serien. Streng utvalg av gamle vinstokker og terroir med lav avling. Rik og silkemyk med integrerte tanniner.',
    foodPairings: [
      { dish: 'Oksekotelett', description: 'Perfekt til rødt kjøtt' },
      { dish: 'Vilt', description: 'Utmerket til viltgryter' },
      { dish: 'Moden ost', description: 'God til kraftige oster' }
    ],
    purchaseLocations: [purchaseLocations['cave-sylla']],
    vintages: [
      {
        year: 2023,
        alcoholContent: 14.5,
        tastingNotes: ['Modne frukter', 'Konfiturerte bær', 'Tobakk', 'Lær', 'Svarte oliven', 'Silkemyk'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 1, end: 10 },
        price: 11.90
      }
    ]
  },
  {
    id: 'sylla-gardarem',
    name: 'GARDAREM',
    producer: 'Cave de Sylla',
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Syrah', 'Grenache'],
    description: 'Eksklusiv og konsentrert rødvin fra høytliggende vingårder (400-470m) i Nord-Luberon. Modnet i nye franske eikefat fra Tronçais. Begrenset produksjon med stort lagringspotensi al.',
    foodPairings: [
      { dish: 'Vilt', description: 'Perfekt til storviltsretter' },
      { dish: 'Confierte gryte', description: 'Rik til langtidsstekte retter' },
      { dish: 'Kraftige kjøttretter', description: 'Kompleks vin til komplekse retter' }
    ],
    purchaseLocations: [purchaseLocations['cave-sylla']],
    vintages: [
      {
        year: 2021,
        alcoholContent: 15,
        tastingNotes: ['Konsentrasjon', 'Mineralitet', 'Fylde', 'Fløyelsmyk', 'Kompleks', 'Eikefat'],
        storageRecommendation: 'long-term',
        optimalDrinkingWindow: { start: 3, end: 15 },
        price: 42.20
      }
    ]
  },
  {
    id: 'maslauris-rouge',
    name: 'Les Terres de MasLauris Rouge',
    producer: 'Domaine de MasLauris',
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Mourvèdre', 'Cinsault', 'Carignan'],
    description: 'Økologisk rødvin fra 12 hektar vingård mellom Luberon-massivet og Durance. Drevet av Margeaux Lampley (amerikansk) og Didier Théophile (fransk). Vinifikasjonen ledes av Aurélien Le Tellier.',
    foodPairings: [
      { dish: 'Lammestek', description: 'Krydder og struktur matcher lam perfekt' },
      { dish: 'Provencalsk oksegryte', description: 'Kraftig vin til kraftig gryte' },
      { dish: 'Grillet entrecôte', description: 'Røde bær og krydder til grillet biff' },
      { dish: 'Ost fra Provence', description: 'Lokal vin til lokal ost' }
    ],
    vintages: [
      {
        year: 2022,
        alcoholContent: 14,
        tastingNotes: ['Røde bær', 'Krydder', 'Jordig', 'Struktur'],
        storageRecommendation: 'medium-term',
        optimalDrinkingWindow: { start: 1, end: 6 },
        price: 15
      }
    ]
  },
  {
    id: 'maslauris-blanc',
    name: 'Les Terres de MasLauris Blanc',
    producer: 'Domaine de MasLauris',
    color: 'white',
    appellation: 'Luberon AOP',
    grapes: ['Vermentino', 'Grenache Blanc'],
    description: 'Økologisk hvitvin fra vingård i Lauris. Frisk og aromatisk med god mineralitet fra kalksteinsjord. En moderne provencalsk hvitvin med eleganse.',
    foodPairings: [
      { dish: 'Grillet fisk', description: 'Frisk hvitvin til grillet sjømat' },
      { dish: 'Skalldyr', description: 'Mineralsk vin til mineralske skalldyr' },
      { dish: 'Chèvre-salat', description: 'Geitost fra Provence med lokal vin' },
      { dish: 'Asparges', description: 'Vårgrønnsaker med elegant hvitvin' }
    ],
    vintages: [
      {
        year: 2023,
        alcoholContent: 13,
        tastingNotes: ['Sitrus', 'Hvite blomster', 'Mineralsk', 'Frisk'],
        storageRecommendation: 'short-term',
        optimalDrinkingWindow: { start: 0, end: 3 },
        price: 14
      }
    ]
  },
  {
    id: 'maslauris-rose',
    name: 'Les Terres de MasLauris Rosé',
    producer: 'Domaine de MasLauris',
    color: 'rosé',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Cinsault', 'Syrah'],
    description: 'Økologisk rosé fra Domaine de MasLauris i Lauris. Elegant og frisk provencalsk rosé med jordbær og sitrus. Perfekt til sommer og terrasse.',
    foodPairings: [
      { dish: 'Grillet laks', description: 'Elegant rosé til fet fisk' },
      { dish: 'Salade Niçoise', description: 'Provencalsk rosé til provencalsk salat' },
      { dish: 'Tapas', description: 'Allsidig vin til små retter' },
      { dish: 'Sommerretter', description: 'Perfekt terrasse-vin' }
    ],
    vintages: [
      {
        year: 2023,
        alcoholContent: 13,
        tastingNotes: ['Jordbær', 'Sitrus', 'Frisk', 'Elegant'],
        storageRecommendation: 'drink-now',
        optimalDrinkingWindow: { start: 0, end: 2 },
        price: 14
      }
    ]
  }
];
