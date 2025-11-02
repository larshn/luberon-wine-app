export interface VintageRating {
  year: number;
  rating: number; // 1-5 scale
  description: string;
}

export const vintageRatings: VintageRating[] = [
  { year: 1990, rating: 5, description: 'Eksepsjonelt' },
  { year: 1991, rating: 2, description: 'Varierende' },
  { year: 1992, rating: 2, description: 'Gjennomsnittlig' },
  { year: 1993, rating: 2, description: 'Utfordrende' },
  { year: 1994, rating: 3, description: 'God' },
  { year: 1995, rating: 4, description: 'Meget god' },
  { year: 1996, rating: 3, description: 'God' },
  { year: 1997, rating: 3, description: 'God' },
  { year: 1998, rating: 4, description: 'Meget god' },
  { year: 1999, rating: 3, description: 'God' },
  { year: 2000, rating: 4, description: 'Utmerket' },
  { year: 2001, rating: 4, description: 'Meget god' },
  { year: 2002, rating: 2, description: 'Gjennomsnittlig' },
  { year: 2003, rating: 3, description: 'Varmt, varierende' },
  { year: 2004, rating: 3, description: 'God' },
  { year: 2005, rating: 5, description: 'Eksepsjonelt' },
  { year: 2006, rating: 4, description: 'Meget god' },
  { year: 2007, rating: 4, description: 'Meget god' },
  { year: 2008, rating: 3, description: 'God' },
  { year: 2009, rating: 4, description: 'Utmerket' },
  { year: 2010, rating: 5, description: 'Eksepsjonelt' },
  { year: 2011, rating: 3, description: 'God' },
  { year: 2012, rating: 3, description: 'God' },
  { year: 2013, rating: 2, description: 'Utfordrende' },
  { year: 2014, rating: 3, description: 'God' },
  { year: 2015, rating: 4, description: 'Utmerket' },
  { year: 2016, rating: 4, description: 'Meget god' },
  { year: 2017, rating: 4, description: 'Meget god' },
  { year: 2018, rating: 4, description: 'Utmerket' },
  { year: 2019, rating: 4, description: 'Meget god' },
  { year: 2020, rating: 4, description: 'Meget god' },
  { year: 2021, rating: 3, description: 'God' },
  { year: 2022, rating: 4, description: 'Meget god' },
  { year: 2023, rating: 3, description: 'God' },
  { year: 2024, rating: 3, description: 'Lovende' },
];

export const getRatingLabel = (rating: number): string => {
  switch (rating) {
    case 5: return 'Eksepsjonelt';
    case 4: return 'Utmerket';
    case 3: return 'God';
    case 2: return 'Gjennomsnittlig';
    case 1: return 'Svak';
    default: return 'Ukjent';
  }
};

export const getRatingColor = (rating: number): string => {
  switch (rating) {
    case 5: return '#d4af37'; // Gold
    case 4: return '#8b4049'; // Wine red
    case 3: return '#c17b7b'; // Light wine
    case 2: return '#999999'; // Gray
    case 1: return '#cccccc'; // Light gray
    default: return '#eeeeee';
  }
};
