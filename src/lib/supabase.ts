import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. The app will use local storage only.');
}

// Create Supabase client
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Check if Supabase is enabled
export const isSupabaseEnabled = (): boolean => {
  return supabase !== null;
};

// Database types
export interface DbCellarWine {
  id?: string;
  user_id?: string;
  wine_id: string;
  year: number;
  quantity: number;
  purchase_date?: string;
  location?: string;
  notes?: string;
  // Collection features
  status?: 'in_cellar' | 'tasted' | 'wishlist';
  rating?: number;
  is_favorite?: boolean;
  tasting_notes?: string;
  tasted_date?: string;
  created_at?: string;
  updated_at?: string;
}
