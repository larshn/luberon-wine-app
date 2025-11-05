import type { WineCellar, CellarWine } from '../types/wine';
import { supabase, isSupabaseEnabled, type DbCellarWine } from '../lib/supabase';

const STORAGE_KEY = 'luberon-wine-cellar';

// ==========================================
// Local Storage Functions (Fallback)
// ==========================================

const loadCellarFromLocalStorage = (): WineCellar => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading cellar from local storage:', error);
  }
  return { wines: [] };
};

const saveCellarToLocalStorage = (cellar: WineCellar): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cellar));
  } catch (error) {
    console.error('Error saving cellar to local storage:', error);
  }
};

// ==========================================
// Supabase Functions
// ==========================================

const loadCellarFromSupabase = async (): Promise<WineCellar> => {
  if (!supabase) {
    return { wines: [] };
  }

  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.log('No user logged in, using local storage');
      return loadCellarFromLocalStorage();
    }

    // Fetch user's cellar wines
    const { data, error } = await supabase
      .from('cellar_wines')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error loading from Supabase:', error);
      return loadCellarFromLocalStorage();
    }

    // Convert database format to app format
    const wines: CellarWine[] = (data || []).map((dbWine: DbCellarWine) => ({
      wineId: dbWine.wine_id,
      year: dbWine.year,
      quantity: dbWine.quantity,
      purchaseDate: dbWine.purchase_date,
      location: dbWine.location,
      notes: dbWine.notes,
    }));

    return { wines };
  } catch (error) {
    console.error('Error in loadCellarFromSupabase:', error);
    return loadCellarFromLocalStorage();
  }
};

const saveCellarToSupabase = async (cellar: WineCellar): Promise<boolean> => {
  if (!supabase) {
    saveCellarToLocalStorage(cellar);
    return false;
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      console.log('No user logged in, using local storage');
      saveCellarToLocalStorage(cellar);
      return false;
    }

    // Use upsert to handle updates gracefully
    if (cellar.wines.length > 0) {
      const dbWines: Omit<DbCellarWine, 'id' | 'created_at' | 'updated_at'>[] = cellar.wines.map(wine => ({
        user_id: user.id,
        wine_id: wine.wineId,
        year: wine.year,
        quantity: wine.quantity,
        purchase_date: wine.purchaseDate,
        location: wine.location,
        notes: wine.notes,
      }));

      // Upsert: insert or update on conflict
      const { error } = await supabase
        .from('cellar_wines')
        .upsert(dbWines, {
          onConflict: 'user_id,wine_id,year'
        });

      if (error) {
        console.error('Error saving to Supabase:', error);
        saveCellarToLocalStorage(cellar);
        return false;
      }
    }

    // Also save to local storage as backup
    saveCellarToLocalStorage(cellar);
    return true;
  } catch (error) {
    console.error('Error in saveCellarToSupabase:', error);
    saveCellarToLocalStorage(cellar);
    return false;
  }
};

// ==========================================
// Public API (works with both Supabase and Local Storage)
// ==========================================

export const loadCellar = async (): Promise<WineCellar> => {
  if (isSupabaseEnabled()) {
    return await loadCellarFromSupabase();
  }
  return loadCellarFromLocalStorage();
};

export const saveCellar = async (cellar: WineCellar): Promise<void> => {
  if (isSupabaseEnabled()) {
    await saveCellarToSupabase(cellar);
  } else {
    saveCellarToLocalStorage(cellar);
  }
};

export const addToCellar = async (wineId: string, year: number, quantity: number = 1): Promise<void> => {
  const cellar = await loadCellar();
  const existing = cellar.wines.find(w => w.wineId === wineId && w.year === year);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cellar.wines.push({
      wineId,
      year,
      quantity,
      purchaseDate: new Date().toISOString().split('T')[0]
    });
  }

  await saveCellar(cellar);
};

export const removeFromCellar = async (wineId: string, year: number, quantity: number = 1): Promise<void> => {
  const cellar = await loadCellar();
  const existing = cellar.wines.find(w => w.wineId === wineId && w.year === year);

  if (existing) {
    existing.quantity -= quantity;
    if (existing.quantity <= 0) {
      cellar.wines = cellar.wines.filter(w => !(w.wineId === wineId && w.year === year));

      // Delete from Supabase when quantity reaches 0
      if (supabase) {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          await supabase
            .from('cellar_wines')
            .delete()
            .eq('user_id', user.id)
            .eq('wine_id', wineId)
            .eq('year', year);
        }
      }
    }
  }

  await saveCellar(cellar);
};

export const updateCellarWine = async (wineId: string, year: number, updates: Partial<CellarWine>): Promise<void> => {
  const cellar = await loadCellar();
  const wine = cellar.wines.find(w => w.wineId === wineId && w.year === year);

  if (wine) {
    Object.assign(wine, updates);
    await saveCellar(cellar);
  }
};

export const exportCellar = async (): Promise<string> => {
  const cellar = await loadCellar();
  return JSON.stringify(cellar, null, 2);
};

export const importCellar = async (jsonData: string): Promise<boolean> => {
  try {
    const cellar = JSON.parse(jsonData) as WineCellar;
    if (cellar.wines && Array.isArray(cellar.wines)) {
      await saveCellar(cellar);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error importing cellar:', error);
    return false;
  }
};

// Sync local storage to Supabase (for migration)
export const syncLocalToSupabase = async (): Promise<boolean> => {
  if (!isSupabaseEnabled()) {
    return false;
  }

  try {
    const localCellar = loadCellarFromLocalStorage();
    if (localCellar.wines.length > 0) {
      const success = await saveCellarToSupabase(localCellar);
      if (success) {
        console.log('Successfully synced local cellar to Supabase');
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Error syncing to Supabase:', error);
    return false;
  }
};
