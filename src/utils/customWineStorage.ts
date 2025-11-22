import type { CustomWine } from '../types/scannedWine';
import type { WineColor } from '../types/wine';
import { addToCellar, updateCellarWine } from './storageSupabase';

const CUSTOM_WINES_KEY = 'luberon-custom-wines';

interface CustomWineInput {
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
}

// Generate a unique ID for custom wines
const generateId = (): string => {
  return `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Load all custom wines from localStorage
export const loadCustomWines = (): CustomWine[] => {
  try {
    const stored = localStorage.getItem(CUSTOM_WINES_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading custom wines:', error);
  }
  return [];
};

// Save custom wines to localStorage
const saveCustomWines = (wines: CustomWine[]): void => {
  try {
    localStorage.setItem(CUSTOM_WINES_KEY, JSON.stringify(wines));
  } catch (error) {
    console.error('Error saving custom wines:', error);
  }
};

// Check if a wine with this barcode already exists
export const findWineByBarcode = (barcode: string): CustomWine | undefined => {
  const wines = loadCustomWines();
  return wines.find(w => w.barcode === barcode);
};

// Save a new custom wine (or return existing if barcode matches)
export const saveCustomWine = async (input: CustomWineInput): Promise<CustomWine> => {
  // Check if wine with this barcode already exists
  const existing = findWineByBarcode(input.barcode);
  if (existing) {
    return existing;
  }

  // Create new custom wine
  const newWine: CustomWine = {
    id: generateId(),
    barcode: input.barcode,
    name: input.name,
    producer: input.producer,
    region: input.region,
    country: input.country,
    color: input.color,
    grapes: input.grapes,
    description: input.description,
    alcoholContent: input.alcoholContent,
    foodPairings: input.foodPairings,
    createdAt: new Date().toISOString(),
  };

  // Save to localStorage
  const wines = loadCustomWines();
  wines.push(newWine);
  saveCustomWines(wines);

  return newWine;
};

// Add a custom wine to the cellar
export const addCustomWineToCellar = async (
  wineId: string,
  vintage: number,
  quantity: number,
  notes?: string
): Promise<void> => {
  await addToCellar(wineId, vintage, quantity);

  if (notes) {
    await updateCellarWine(wineId, vintage, { notes });
  }
};

// Get a custom wine by ID
export const getCustomWineById = (id: string): CustomWine | undefined => {
  const wines = loadCustomWines();
  return wines.find(w => w.id === id);
};

// Delete a custom wine
export const deleteCustomWine = (id: string): void => {
  const wines = loadCustomWines();
  const filtered = wines.filter(w => w.id !== id);
  saveCustomWines(filtered);
};

// Convert custom wine to the Wine type format for display
export const customWineToWineFormat = (customWine: CustomWine) => {
  return {
    id: customWine.id,
    name: customWine.name,
    producer: customWine.producer,
    color: customWine.color,
    appellation: customWine.region,
    grapes: customWine.grapes,
    description: customWine.description,
    foodPairings: customWine.foodPairings.map(dish => ({ dish })),
    vintages: [{
      year: new Date().getFullYear(),
      alcoholContent: customWine.alcoholContent || 13,
      tastingNotes: [],
      storageRecommendation: 'drink-soon' as const,
      optimalDrinkingWindow: { start: 0, end: 3 },
    }],
    isCustom: true,
    country: customWine.country,
    barcode: customWine.barcode,
  };
};
