import type { ChipsFlavor } from '../types/chips';

export const chipsFlavors: ChipsFlavor[] = [
  {
    id: 'naturel',
    name: 'Naturel / Havsalt',
    description: 'Klassisk potetgull med rent havsalt, enkel og sprø',
    ingredients: 'Havsalt, enkel ren potetsmak',
    profile: {
      salty: 5,
      acidic: 1,
      creamy: 1,
      spicy: 1,
      smoky: 1,
      herbal: 1,
      sweet: 1
    },
    preferredWineColors: ['white', 'rosé'],
    wineCharacteristics: ['frisk', 'mineralsk', 'lett']
  },
  {
    id: 'sel-vinaigre',
    name: 'Sel & Vinaigre',
    description: 'Populært salt & eddik-potetgull, syrlig og frisk',
    ingredients: 'Salt, eddik',
    profile: {
      salty: 5,
      acidic: 5,
      creamy: 1,
      spicy: 1,
      smoky: 1,
      herbal: 1,
      sweet: 1
    },
    preferredWineColors: ['white', 'rosé'],
    wineCharacteristics: ['høy syre', 'frisk', 'mineralsk', 'spretten']
  },
  {
    id: 'herbes-provence',
    name: 'Herbes de Provence',
    description: 'Krydret med typiske provensalske urter som timian og rosmarin',
    ingredients: 'Timian, rosmarin, oregano',
    profile: {
      salty: 3,
      acidic: 1,
      creamy: 1,
      spicy: 2,
      smoky: 1,
      herbal: 5,
      sweet: 1
    },
    preferredWineColors: ['rosé', 'red', 'white'],
    wineCharacteristics: ['urter', 'provençalsk', 'frisk', 'aromatisk']
  },
  {
    id: 'fromage',
    name: 'Fromage (Ost)',
    description: 'Variasjoner med comté, chèvre, emmental eller ost fra Jura-regionen',
    ingredients: 'Revet ost, kremet smak',
    profile: {
      salty: 3,
      acidic: 1,
      creamy: 5,
      spicy: 1,
      smoky: 1,
      herbal: 1,
      sweet: 1
    },
    preferredWineColors: ['white', 'rosé'],
    wineCharacteristics: ['kremet', 'fyldig', 'moderat syre']
  },
  {
    id: 'poulet-roti',
    name: 'Poulet rôti',
    description: 'Smak som minner om stekt kylling, ofte med urtekrydder',
    ingredients: 'Urter, kyllingaroma',
    profile: {
      salty: 3,
      acidic: 1,
      creamy: 2,
      spicy: 2,
      smoky: 2,
      herbal: 4,
      sweet: 1
    },
    preferredWineColors: ['white', 'rosé'],
    wineCharacteristics: ['moderat fylde', 'urter', 'frisk']
  },
  {
    id: 'barbecue',
    name: 'Barbecue',
    description: 'Røkt, søtlig og krydret paprika-aktig smak',
    ingredients: 'Paprika, røyk, sukker- og krydderblanding',
    profile: {
      salty: 3,
      acidic: 1,
      creamy: 1,
      spicy: 3,
      smoky: 4,
      herbal: 1,
      sweet: 4
    },
    preferredWineColors: ['red', 'rosé'],
    wineCharacteristics: ['fruktig', 'moderat tannin', 'søtlig']
  },
  {
    id: 'paprika',
    name: 'Paprika',
    description: 'Mild krydret paprika-basert chips',
    ingredients: 'Paprika, salt',
    profile: {
      salty: 3,
      acidic: 1,
      creamy: 1,
      spicy: 3,
      smoky: 1,
      herbal: 1,
      sweet: 2
    },
    preferredWineColors: ['rosé', 'red'],
    wineCharacteristics: ['fruktig', 'frisk', 'lett krydret']
  },
  {
    id: 'chevre-espelette',
    name: 'Chèvre & Espelette',
    description: 'Geitost kombinert med baskisk Espelette-chili gir kremet og pikant smak',
    ingredients: 'Geitost, chili',
    profile: {
      salty: 3,
      acidic: 2,
      creamy: 5,
      spicy: 5,
      smoky: 1,
      herbal: 2,
      sweet: 1
    },
    preferredWineColors: ['white', 'rosé'],
    wineCharacteristics: ['kremet', 'frisk syre', 'aromatisk']
  },
  {
    id: 'oignon',
    name: 'Oignon / Sjalottløk',
    description: 'Løksmak, ofte mild og søtlig, noen ganger med crème fraîche',
    ingredients: 'Løk, sjalottløk, kremet element',
    profile: {
      salty: 2,
      acidic: 1,
      creamy: 3,
      spicy: 1,
      smoky: 1,
      herbal: 1,
      sweet: 4
    },
    preferredWineColors: ['white', 'rosé'],
    wineCharacteristics: ['moderat syre', 'fyldig', 'fruktig']
  },
  {
    id: 'moutarde',
    name: 'Moutarde (Sennep)',
    description: 'Syrlig og krydret smak inspirert av Dijon-sennep',
    ingredients: 'Sennep, eddik, krydder',
    profile: {
      salty: 3,
      acidic: 5,
      creamy: 1,
      spicy: 4,
      smoky: 1,
      herbal: 2,
      sweet: 1
    },
    preferredWineColors: ['white'],
    wineCharacteristics: ['høy syre', 'mineralsk', 'frisk', 'spretten']
  },
  {
    id: 'truffe',
    name: 'Truffe (Trøffel)',
    description: 'Luksuriøs smak av hvit eller svart trøffel, ofte kombinert med salt eller parmesan',
    ingredients: 'Trøffelolje/pulver, parmesan',
    profile: {
      salty: 2,
      acidic: 1,
      creamy: 4,
      spicy: 1,
      smoky: 1,
      herbal: 3,
      sweet: 1
    },
    preferredWineColors: ['white', 'red'],
    wineCharacteristics: ['kompleks', 'fyldig', 'elegant', 'jordig']
  },
  {
    id: 'jambon-cru',
    name: 'Jambon cru',
    description: 'Smak av spekeskinke, salt og kjøttfull',
    ingredients: 'Spekeskinke, salt',
    profile: {
      salty: 5,
      acidic: 1,
      creamy: 1,
      spicy: 1,
      smoky: 3,
      herbal: 1,
      sweet: 1
    },
    preferredWineColors: ['rosé', 'red'],
    wineCharacteristics: ['fruktig', 'frisk', 'lett tannin']
  },
  {
    id: 'sheep-cherry',
    name: 'Sheep cheese & cherry',
    description: 'Kombinasjon av fåreost og mørke kirsebær fra sørvest og Baskerland',
    ingredients: 'Fåreost, kirsebær',
    profile: {
      salty: 2,
      acidic: 2,
      creamy: 4,
      spicy: 1,
      smoky: 1,
      herbal: 1,
      sweet: 4
    },
    preferredWineColors: ['red', 'rosé'],
    wineCharacteristics: ['fruktig', 'kirsebær', 'fyldig', 'elegant']
  },
  {
    id: 'grillades',
    name: 'Grillades au feu de bois',
    description: 'Aroma av tregrillet mat, røykaktig og intens',
    ingredients: 'Røkt/tørrkrydret',
    profile: {
      salty: 3,
      acidic: 1,
      creamy: 1,
      spicy: 3,
      smoky: 5,
      herbal: 2,
      sweet: 1
    },
    preferredWineColors: ['red', 'rosé'],
    wineCharacteristics: ['røkt', 'krydret', 'fyldig', 'tannin']
  },
  {
    id: 'oignon-balsamico',
    name: 'Oignon confit/Balsamico',
    description: 'Karamellisert løk og syrlig balsamicoeddik kombinert',
    ingredients: 'Karamellisert løk, balsamico',
    profile: {
      salty: 2,
      acidic: 5,
      creamy: 1,
      spicy: 1,
      smoky: 1,
      herbal: 1,
      sweet: 5
    },
    preferredWineColors: ['red', 'rosé'],
    wineCharacteristics: ['fruktig', 'syre', 'elegant', 'kompleks']
  },
  {
    id: 'sel-fume',
    name: 'Sel fumé',
    description: 'Røkt havsalt brukt som krydder, gir en dypere saltprofil',
    ingredients: 'Røkt havsalt',
    profile: {
      salty: 5,
      acidic: 1,
      creamy: 1,
      spicy: 1,
      smoky: 5,
      herbal: 1,
      sweet: 1
    },
    preferredWineColors: ['white', 'rosé'],
    wineCharacteristics: ['mineralsk', 'røkt', 'frisk', 'kompleks']
  },
  {
    id: 'poivre-noir',
    name: 'Poivre noir (Sort pepper)',
    description: 'Pikant og skarp smak laget med friskkvernet pepper',
    ingredients: 'Sort pepper',
    profile: {
      salty: 3,
      acidic: 1,
      creamy: 1,
      spicy: 5,
      smoky: 1,
      herbal: 2,
      sweet: 1
    },
    preferredWineColors: ['red', 'rosé'],
    wineCharacteristics: ['krydret', 'pepper', 'fyldig', 'tannin']
  },
  {
    id: 'tapenade',
    name: 'Tapenade',
    description: 'Knasende chips med smak av olivenpaste, typisk for Provence',
    ingredients: 'Oliven, hvitløk, kapers',
    profile: {
      salty: 4,
      acidic: 2,
      creamy: 1,
      spicy: 1,
      smoky: 1,
      herbal: 4,
      sweet: 1
    },
    preferredWineColors: ['rosé', 'white'],
    wineCharacteristics: ['provençalsk', 'mineralsk', 'urter', 'frisk']
  },
  {
    id: 'vinaigre-balsamique',
    name: 'Vinaigre balsamique',
    description: 'Mer kompleks og søtlig eddiksmak ofte brukt som alternativ til vanlig eddik',
    ingredients: 'Balsamicoeddik',
    profile: {
      salty: 2,
      acidic: 5,
      creamy: 1,
      spicy: 1,
      smoky: 1,
      herbal: 1,
      sweet: 4
    },
    preferredWineColors: ['red', 'rosé', 'white'],
    wineCharacteristics: ['syre', 'fruktig', 'elegant', 'balansert']
  }
];
