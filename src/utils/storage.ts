import type { WineCellar, CellarWine } from '../types/wine';

const STORAGE_KEY = 'luberon-wine-cellar';

export const loadCellar = (): WineCellar => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading cellar from storage:', error);
  }
  return { wines: [] };
};

export const saveCellar = (cellar: WineCellar): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cellar));
  } catch (error) {
    console.error('Error saving cellar to storage:', error);
  }
};

export const addToCellar = (wineId: string, quantity: number = 1): void => {
  const cellar = loadCellar();
  const existing = cellar.wines.find(w => w.wineId === wineId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cellar.wines.push({
      wineId,
      quantity,
      purchaseDate: new Date().toISOString().split('T')[0]
    });
  }

  saveCellar(cellar);
};

export const removeFromCellar = (wineId: string, quantity: number = 1): void => {
  const cellar = loadCellar();
  const existing = cellar.wines.find(w => w.wineId === wineId);

  if (existing) {
    existing.quantity -= quantity;
    if (existing.quantity <= 0) {
      cellar.wines = cellar.wines.filter(w => w.wineId !== wineId);
    }
  }

  saveCellar(cellar);
};

export const updateCellarWine = (wineId: string, updates: Partial<CellarWine>): void => {
  const cellar = loadCellar();
  const wine = cellar.wines.find(w => w.wineId === wineId);

  if (wine) {
    Object.assign(wine, updates);
    saveCellar(cellar);
  }
};

export const exportCellar = (): string => {
  const cellar = loadCellar();
  return JSON.stringify(cellar, null, 2);
};

export const importCellar = (jsonData: string): boolean => {
  try {
    const cellar = JSON.parse(jsonData) as WineCellar;
    if (cellar.wines && Array.isArray(cellar.wines)) {
      saveCellar(cellar);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error importing cellar:', error);
    return false;
  }
};
