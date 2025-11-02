import type { Wine } from '../types/wine';

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
    grapes: ['Syrah', 'Grenache'],
    description: 'Deres toppvin fra utvalgte parceller. Modnet 12 måneder på eikefat. Kraftig og konsentrert.',
    foodPairings: [
      { dish: 'Stekt andebryst', description: 'Med kirsebærsaus' },
      { dish: 'Oksekjøtt bourguignon', description: 'Langkokt i rødvin' },
      { dish: 'Modne oster', description: 'Comté eller gammel Gouda' }
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
    grapes: ['Grenache Blanc', 'Roussanne', 'Bourboulenc'],
    description: 'Klassisk hvitvin fra Luberon med friskhet og eleganse. Perfekt som aperitiff.',
    foodPairings: [
      { dish: 'Tapenader', description: 'Provencalske olivenpaster' },
      { dish: 'Grillet kylling', description: 'Med sitron og timian' },
      { dish: 'Salat Niçoise', description: 'Med tuna og ansjos' }
    ],
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
    grapes: ['Grenache', 'Syrah'],
    description: 'Klassisk Luberon-rødvin fra historisk domene med vakker hage. God verdi for pengene.',
    foodPairings: [
      { dish: 'Grillmat', description: 'BBQ og pølser' },
      { dish: 'Tapas', description: 'Spanske småretter' },
      { dish: 'Pasta', description: 'Med tomatsaus' }
    ],
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
    grapes: ['Syrah', 'Grenache', 'Mourvèdre'],
    description: 'Premium cuvée oppkalt etter familiens forfader. Kompleks og elegant med moderne minimalistisk vinifikasjon.',
    foodPairings: [
      { dish: 'Andebryst', description: 'Med kirsebærsaus' },
      { dish: 'Lammestek', description: 'Med urter de Provence' },
      { dish: 'Kraftige oster', description: 'Comté eller Manchego' }
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
    grapes: ['Grenache Blanc', 'Roussanne', 'Vermentino'],
    description: 'Premium hvitvin fra økologisk vingård. Kombinerer historiske teknikker med moderne minimal intervensjon.',
    foodPairings: [
      { dish: 'Sjømat', description: 'Kamskjell eller hummer' },
      { dish: 'Kylling', description: 'Med kremsaus' },
      { dish: 'Hvite oster', description: 'Brie eller chèvre' }
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
    grapes: ['Grenache', 'Syrah'],
    description: 'Premium cuvée fra Château de Mille med kompleks aromatikk og lang lagringsevne. Grenache-dominert vin med elegant struktur og provencalske urter.',
    foodPairings: [
      { dish: 'Gautes Provencalske pølser', description: 'Vinens timian, rosmarin og lavendel matcher perfekt med de provencalske urtene i pølsene og de ovnsbakte grønnsakene' },
      { dish: 'Lammestek med urter', description: 'Den medium fylde og røde bærnotene harmonerer perfekt med lam og friske urter' },
      { dish: 'Grillet entrecôte med lavendel', description: 'Vinens lavendel- og timianaromer komplementerer pepperkrydret biff' },
      { dish: 'Ratatouille', description: 'De provençalske urtene i vinen matcher perfekt med denne klassiske grønnsaksgryten' },
      { dish: 'Fenalår', description: 'Tørrstekte norske lammespesialiteten passer utmerkt til vinens urtenote' }
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
    grapes: ['Syrah', 'Grenache'],
    description: 'Syrah-dominert toppvin fra Château de Mille med intens frukt og komplekse krydderaromer. En kraftig og konsentrert vin med fremragende lagringsevne.',
    foodPairings: [
      { dish: 'Elgstek med bringebærsaus', description: 'Syrah-druens pepper og mørke bær matcher perfekt med elgens kraftige smak' },
      { dish: 'Finnbiff', description: 'Reinsdyrkjøttets game smak balanseres av vinens fiolett-aromatikk og pepperkrydder' },
      { dish: 'Lammebog med svartpepperkornskorpe', description: 'Vinens markerte sorte pepper og mørke bær komplementerer kraftig lam' },
      { dish: 'Blåskimmelost', description: 'Den fylde Syrah-dominerte vinen står opp mot kraftige oster' }
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
    grapes: ['Grenache', 'Syrah'],
    description: 'Elegant rosé fra Château de Mille med friske fruktaromer. Perfekt sommervin med fin balanse mellom fruktighet og friskhet.',
    foodPairings: [
      { dish: 'Laks-tartar', description: 'Den friske rosé med jordbær og sitrus matcher perfekt med rå laks' },
      { dish: 'Salat med geitost og jordbær', description: 'Vinens fruktighet og grapefrukt-toner komplementerer både ost og bær' },
      { dish: 'Poke bowl med laks', description: 'Lett og frisk rosé passer utmerkt til denne moderne retten' },
      { dish: 'Grillet kylling med sitron', description: 'Vinens blomsteraromer og friskhet løfter kyllingretten' }
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
  }
];
