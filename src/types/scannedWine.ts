import type { WineColor } from './wine';

export interface ScannedWineData {
  name: string;
  producer: string;
  region: string;
  country: string;
  color: WineColor;
  grapes: string[];
  vintage: number | null;
  description: string;
  alcoholContent: number | null;
  foodPairings: string[];
}

export interface WineLookupResult {
  found: boolean;
  wine?: ScannedWineData;
  message?: string;
}

export interface CustomWine {
  id: string;
  barcode: string;
  name: string;
  producer: string;
  region: string;
  country: string;
  color: WineColor;
  grapes: string[];
  description: string;
  alcoholContent: number | null;
  foodPairings: string[];
  createdAt: string;
}
