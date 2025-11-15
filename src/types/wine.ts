export type WineColor = 'red' | 'white' | 'rosé';

export type StorageRecommendation =
  | 'drink-now'
  | 'drink-soon' // within 1 year
  | 'short-term' // 1-3 years
  | 'medium-term' // 3-7 years
  | 'long-term'; // 7+ years

export type PurchaseLocationType = 'chateau' | 'wine-shop' | 'online' | 'restaurant';

export interface OpeningHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  notes?: string; // e.g., "Closed in January", "Summer hours: extended to 19:00"
}

export interface PurchaseLocation {
  type: PurchaseLocationType;
  name: string;
  address?: string;
  city?: string;
  postalCode?: string;
  website?: string;
  phone?: string;
  email?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  openingHours?: OpeningHours;
  priceRange?: string;
  notes?: string;
  bookingRequired?: boolean;
  tastingAvailable?: boolean;
}

export interface FoodPairing {
  dish: string;
  description?: string;
}

export interface CriticReview {
  source: string; // e.g., 'Wine Enthusiast', 'Wine Spectator'
  score: number; // e.g., 88 (out of 100)
  review?: string; // Professional tasting notes
  reviewedDate?: string;
  reviewer?: string; // Name of critic
}

export interface Vintage {
  year: number;
  alcoholContent: number;
  tastingNotes: string[];
  storageRecommendation: StorageRecommendation;
  optimalDrinkingWindow: {
    start: number; // years from vintage
    end: number;
  };
  price?: number; // in EUR
  notes?: string; // Specific notes for this vintage
  criticReviews?: CriticReview[]; // Professional critic reviews
}

export interface Wine {
  id: string;
  name: string;
  producer: string;
  color: WineColor;
  appellation: string;
  grapes: string[];
  description: string; // General description of the wine
  foodPairings: FoodPairing[];
  vintages: Vintage[]; // Available vintages
  imageUrl?: string;
  purchaseLocations?: PurchaseLocation[]; // Where to buy this wine
}

export type WineStatus = 'in_cellar' | 'tasted' | 'wishlist';

export interface CellarWine {
  wineId: string;
  year: number; // Specific vintage year
  quantity: number;
  purchaseDate?: string;
  location?: string;
  notes?: string;
  // Collection features
  status?: WineStatus;
  rating?: number; // 1-5 stars
  is_favorite?: boolean;
  tasting_notes?: string;
  tasted_date?: string;
}

export interface WineCellar {
  wines: CellarWine[];
}
