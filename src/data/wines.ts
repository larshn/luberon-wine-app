import { Wine } from '../types/wine';

export const wines: Wine[] = [
  {
    id: '1',
    name: 'La Canorgue Rouge',
    producer: 'Château La Canorgue',
    year: 2021,
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Syrah', 'Grenache', 'Mourvèdre'],
    alcoholContent: 13.5,
    description: 'Økologisk vin fra biodynamisk vingård, kjent fra filmen "A Good Year". En elegant og balansert rødvin med provencalsk karakter.',
    tastingNotes: ['Røde bær', 'Krydder', 'Lavendel', 'Silkemyke tanniner'],
    storageRecommendation: 'short-term',
    optimalDrinkingWindow: { start: 0, end: 5 },
    foodPairings: [
      { dish: 'Daube Provençale', description: 'Provencalsk oksegryte med oliven' },
      { dish: 'Grillet lam med timian', description: 'Perfekt til retter med urter de Provence' },
      { dish: 'Ratatouille', description: 'Klassisk grønnsaksgrytte fra Provence' }
    ],
    price: 18
  },
  {
    id: '2',
    name: 'La Canorgue Blanc',
    producer: 'Château La Canorgue',
    year: 2022,
    color: 'white',
    appellation: 'Luberon AOP',
    grapes: ['Roussanne', 'Vermentino', 'Clairette'],
    alcoholContent: 13,
    description: 'Frisk og aromatisk hvitvin med stor kompleksitet. Biodynamisk dyrket på kalksteinsjord.',
    tastingNotes: ['Hvite blomster', 'Sitrus', 'Fersken', 'Mineralsk finish'],
    storageRecommendation: 'drink-soon',
    optimalDrinkingWindow: { start: 0, end: 3 },
    foodPairings: [
      { dish: 'Bouillabaisse', description: 'Provencalsk fiskesuppe' },
      { dish: 'Geitost med honning', description: 'Lokal ost fra Luberon' },
      { dish: 'Grillet havabbor', description: 'Med fennikel og sitron' }
    ],
    price: 16
  },
  {
    id: '3',
    name: 'Les Griottes',
    producer: 'Château Val Joanis',
    year: 2020,
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Syrah', 'Grenache'],
    alcoholContent: 14,
    description: 'Deres toppvin fra utvalgte parceller. Modnet 12 måneder på eikefat. Kraftig og konsentrert.',
    tastingNotes: ['Mørke kirsebær', 'Pepper', 'Vanilje', 'Lakrits'],
    storageRecommendation: 'medium-term',
    optimalDrinkingWindow: { start: 2, end: 10 },
    foodPairings: [
      { dish: 'Stekt andebryst', description: 'Med kirsebærsaus' },
      { dish: 'Oksekjøtt bourguignon', description: 'Langkokt i rødvin' },
      { dish: 'Modne oster', description: 'Comté eller gammel Gouda' }
    ],
    price: 28
  },
  {
    id: '4',
    name: 'Tradition Blanc',
    producer: 'Château Val Joanis',
    year: 2022,
    color: 'white',
    appellation: 'Luberon AOP',
    grapes: ['Grenache Blanc', 'Roussanne', 'Bourboulenc'],
    alcoholContent: 12.5,
    description: 'Klassisk hvitvin fra Luberon med friskhet og eleganse. Perfekt som aperitiff.',
    tastingNotes: ['Grønne epler', 'Pære', 'Mandel', 'Frisk syre'],
    storageRecommendation: 'drink-now',
    optimalDrinkingWindow: { start: 0, end: 2 },
    foodPairings: [
      { dish: 'Tapenader', description: 'Provencalske olivenpaster' },
      { dish: 'Grillet kylling', description: 'Med sitron og timian' },
      { dish: 'Salat Niçoise', description: 'Med tuna og ansjos' }
    ],
    price: 14
  },
  {
    id: '5',
    name: 'Les Bastides Rosé',
    producer: 'Château Val Joanis',
    year: 2023,
    color: 'rosé',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Cinsault', 'Syrah'],
    alcoholContent: 12.5,
    description: 'Lys og delikat rosé i Provence-stil. Produsert ved direkte pressing for maksimal friskhet.',
    tastingNotes: ['Jordbær', 'Sitrus', 'Hvite blomster', 'Mineralsk'],
    storageRecommendation: 'drink-now',
    optimalDrinkingWindow: { start: 0, end: 2 },
    foodPairings: [
      { dish: 'Grillet fisk', description: 'Enkel og frisk tilberedning' },
      { dish: 'Sommerlig salat', description: 'Med geiteost og tomater' },
      { dish: 'Grønnsaksquiche', description: 'Med provencalske urter' }
    ],
    price: 13
  },
  {
    id: '6',
    name: 'Cuvée Prestige',
    producer: 'Domaine de Fontenille',
    year: 2019,
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Syrah', 'Grenache', 'Mourvèdre', 'Carignan'],
    alcoholContent: 14.5,
    description: 'Toppvin fra historisk domene med 800 år gammel vinhistorie. Kraftig og konsentrert.',
    tastingNotes: ['Solmodne bær', 'Krydder', 'Tobakk', 'Eik'],
    storageRecommendation: 'medium-term',
    optimalDrinkingWindow: { start: 3, end: 12 },
    foodPairings: [
      { dish: 'Lammestek', description: 'Med urter de Provence' },
      { dish: 'Vilt', description: 'Hjort eller villsvin' },
      { dish: 'Cassoulet', description: 'Tradisjonell bønnegrytte' }
    ],
    price: 35
  },
  {
    id: '7',
    name: 'Blanc de Fontenille',
    producer: 'Domaine de Fontenille',
    year: 2022,
    color: 'white',
    appellation: 'Luberon AOP',
    grapes: ['Roussanne', 'Grenache Blanc', 'Clairette'],
    alcoholContent: 13,
    description: 'Rik og fyldig hvitvin med god lagringspotensial. Modnet delvis på eikefat.',
    tastingNotes: ['Aprikos', 'Honning', 'Hasselnøtt', 'Smør'],
    storageRecommendation: 'short-term',
    optimalDrinkingWindow: { start: 0, end: 5 },
    foodPairings: [
      { dish: 'Kylling i kremsaus', description: 'Med sopp' },
      { dish: 'Hummer', description: 'Med smørsaus' },
      { dish: 'Modne hvite oster', description: 'Brie eller Camembert' }
    ],
    price: 22
  },
  {
    id: '8',
    name: 'Le Pas du Moine',
    producer: 'Château de Mille',
    year: 2021,
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Syrah', 'Grenache'],
    alcoholContent: 13.5,
    description: 'Fra Luberon\'s eldste vingård. Elegant og finessefull med stor dybde.',
    tastingNotes: ['Mørke frukter', 'Violette', 'Sort pepper', 'Myk'],
    storageRecommendation: 'short-term',
    optimalDrinkingWindow: { start: 1, end: 7 },
    foodPairings: [
      { dish: 'Pigeon rôti', description: 'Stekt due med bacon' },
      { dish: 'Entrecôte', description: 'Grillet biff med urtesmør' },
      { dish: 'Pâté', description: 'Grovt pâté med cornichons' }
    ],
    price: 19
  },
  {
    id: '9',
    name: 'Les Dauphinés Rosé',
    producer: 'Château La Verrerie',
    year: 2023,
    color: 'rosé',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Syrah'],
    alcoholContent: 13,
    description: 'Fruktig og frisk rosé med vakker lakserosa farge. Økologisk dyrket.',
    tastingNotes: ['Bringebær', 'Rosenblader', 'Grapefrukt', 'Sprø'],
    storageRecommendation: 'drink-now',
    optimalDrinkingWindow: { start: 0, end: 1 },
    foodPairings: [
      { dish: 'Provencalsk fiskesuppe', description: 'Lett og aromatisk' },
      { dish: 'Grillede grønnsaker', description: 'Med pestodressing' },
      { dish: 'Tomatbaserte retter', description: 'Pasta eller pizza' }
    ],
    price: 12
  },
  {
    id: '10',
    name: 'Vieilles Vignes',
    producer: 'Marrenon',
    year: 2020,
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Syrah', 'Grenache'],
    alcoholContent: 14,
    description: 'Fra gamle vinstokker over 50 år. Kooperativets prestisjevin med stor karakter.',
    tastingNotes: ['Modne plommer', 'Urter', 'Lakris', 'Velvet struktur'],
    storageRecommendation: 'short-term',
    optimalDrinkingWindow: { start: 1, end: 8 },
    foodPairings: [
      { dish: 'Lam Provençale', description: 'Med hvitløk og rosmarin' },
      { dish: 'Grillmat', description: 'BBQ med urter' },
      { dish: 'Chorizo', description: 'Grillet med paprika' }
    ],
    price: 16
  },
  {
    id: '11',
    name: 'Expression Blanc',
    producer: 'Domaine de Mayol',
    year: 2022,
    color: 'white',
    appellation: 'Luberon AOP',
    grapes: ['Roussanne', 'Marsanne', 'Vermentino'],
    alcoholContent: 13,
    description: 'Moderne og uttrykksful hvitvin fra familiedomene. Biodynamisk produsert.',
    tastingNotes: ['Sitronverbena', 'Nektarin', 'Mandler', 'Frisk'],
    storageRecommendation: 'drink-soon',
    optimalDrinkingWindow: { start: 0, end: 3 },
    foodPairings: [
      { dish: 'Fritert calamari', description: 'Med aioli' },
      { dish: 'Risotto', description: 'Med asparges' },
      { dish: 'Sjømat', description: 'Grillet blekksprut' }
    ],
    price: 15
  },
  {
    id: '12',
    name: 'Cuvée Spéciale Rouge',
    producer: 'Château Constantin-Chevalier',
    year: 2019,
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Syrah', 'Grenache', 'Mourvèdre'],
    alcoholContent: 14,
    description: 'Kompleks og kraftig rødvin med god lagringspotensial. Modnet 18 måneder på franske eikefat.',
    tastingNotes: ['Mørk frukt', 'Sjokolade', 'Vanilje', 'Lær'],
    storageRecommendation: 'medium-term',
    optimalDrinkingWindow: { start: 2, end: 10 },
    foodPairings: [
      { dish: 'Rødt kjøtt', description: 'Biff eller lam' },
      { dish: 'Viltgrytte', description: 'Med røtter og sopp' },
      { dish: 'Modne oster', description: 'Reblochon eller Époisses' }
    ],
    price: 24
  },
  {
    id: '13',
    name: 'Secrets de Pigoudet Rosé',
    producer: 'Château Pigoudet',
    year: 2023,
    color: 'rosé',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Cinsault'],
    alcoholContent: 12.5,
    description: 'Premium rosé med elegant stil. Direkte pressing og temperaturkontrollert gjæring.',
    tastingNotes: ['Eple', 'Hvit fersken', 'Roser', 'Delikat'],
    storageRecommendation: 'drink-now',
    optimalDrinkingWindow: { start: 0, end: 2 },
    foodPairings: [
      { dish: 'Sushi', description: 'Eller sashimi' },
      { dish: 'Sommersalater', description: 'Med friske urter' },
      { dish: 'Geiteost', description: 'Frisk chèvre med urter' }
    ],
    price: 17
  },
  {
    id: '14',
    name: 'Grande Réserve',
    producer: 'Bastide du Claux',
    year: 2018,
    color: 'red',
    appellation: 'Luberon AOP',
    grapes: ['Syrah', 'Grenache', 'Carignan'],
    alcoholContent: 14.5,
    description: 'Moden og kompleks vin som har utviklet flott tertiær aromaer. Toppårgangen 2018.',
    tastingNotes: ['Spekeskinke', 'Lær', 'Tørket frukt', 'Trøffel'],
    storageRecommendation: 'medium-term',
    optimalDrinkingWindow: { start: 5, end: 15 },
    foodPairings: [
      { dish: 'Boeuf en croûte', description: 'Oksemørbrad i deig' },
      { dish: 'Trøffel-retter', description: 'Risotto eller pasta' },
      { dish: 'Gammel ost', description: 'Pecorino eller Manchego' }
    ],
    price: 32
  },
  {
    id: '15',
    name: 'Tradition Rosé',
    producer: 'Château La Canorgue',
    year: 2023,
    color: 'rosé',
    appellation: 'Luberon AOP',
    grapes: ['Grenache', 'Syrah'],
    alcoholContent: 12.5,
    description: 'Klassisk Provence-rosé fra den kjente biodynamiske vingården. Frisk og sommerlig.',
    tastingNotes: ['Jordbær', 'Melon', 'Hvite blomster', 'Mineralsk'],
    storageRecommendation: 'drink-now',
    optimalDrinkingWindow: { start: 0, end: 1 },
    foodPairings: [
      { dish: 'Socca', description: 'Provencalsk kikertpannekake' },
      { dish: 'Pan bagnat', description: 'Niçoise sandwich' },
      { dish: 'Reker', description: 'Med sitron og aioli' }
    ],
    price: 15
  }
];
