export type WineColor = 'red' | 'white' | 'rosé';

export type StorageRecommendation =
  | 'drink-now'
  | 'drink-soon' // within 1 year
  | 'short-term' // 1-3 years
  | 'medium-term' // 3-7 years
  | 'long-term'; // 7+ years

export interface FoodPairing {
  dish: string;
  description?: string;
}

export interface Wine {
  id: string;
  name: string;
  producer: string;
  year: number;
  color: WineColor;
  appellation: string;
  grapes: string[];
  alcoholContent: number;
  description: string;
  tastingNotes: string[];
  storageRecommendation: StorageRecommendation;
  optimalDrinkingWindow: {
    start: number; // years from vintage
    end: number;
  };
  foodPairings: FoodPairing[];
  price?: number; // in EUR
  imageUrl?: string;
}

export interface CellarWine {
  wineId: string;
  quantity: number;
  purchaseDate?: string;
  location?: string;
  notes?: string;
}

export interface WineCellar {
  wines: CellarWine[];
}
