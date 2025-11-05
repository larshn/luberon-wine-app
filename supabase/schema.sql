-- Luberon Wine App Database Schema
-- This file contains all the SQL needed to set up your Supabase database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create cellar_wines table
-- This stores each user's wine collection
CREATE TABLE IF NOT EXISTS cellar_wines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  wine_id TEXT NOT NULL, -- References Wine.id from the frontend catalog
  year INTEGER NOT NULL, -- Vintage year
  quantity INTEGER NOT NULL DEFAULT 1,
  purchase_date DATE,
  location TEXT, -- Physical location in cellar (e.g., "Rack A, Shelf 3")
  notes TEXT, -- User's personal notes about this wine
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure unique combination of user, wine, and year
  UNIQUE(user_id, wine_id, year)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_cellar_wines_user_id ON cellar_wines(user_id);
CREATE INDEX IF NOT EXISTS idx_cellar_wines_wine_id ON cellar_wines(wine_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_cellar_wines_updated_at
  BEFORE UPDATE ON cellar_wines
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE cellar_wines ENABLE ROW LEVEL SECURITY;

-- Create policies for cellar_wines
-- Users can only see their own wines
CREATE POLICY "Users can view their own cellar wines"
  ON cellar_wines
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own wines
CREATE POLICY "Users can insert their own cellar wines"
  ON cellar_wines
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own wines
CREATE POLICY "Users can update their own cellar wines"
  ON cellar_wines
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own wines
CREATE POLICY "Users can delete their own cellar wines"
  ON cellar_wines
  FOR DELETE
  USING (auth.uid() = user_id);

-- Optional: Create a view for easier querying
CREATE OR REPLACE VIEW user_cellar_summary AS
SELECT
  user_id,
  COUNT(DISTINCT wine_id) as unique_wines,
  SUM(quantity) as total_bottles,
  MIN(created_at) as first_added,
  MAX(updated_at) as last_updated
FROM cellar_wines
GROUP BY user_id;

-- Grant permissions on the view
GRANT SELECT ON user_cellar_summary TO authenticated;

-- Comments for documentation
COMMENT ON TABLE cellar_wines IS 'Stores user wine collections with vintage years and quantities';
COMMENT ON COLUMN cellar_wines.wine_id IS 'References the wine ID from the frontend catalog';
COMMENT ON COLUMN cellar_wines.year IS 'Vintage year of the wine';
COMMENT ON COLUMN cellar_wines.quantity IS 'Number of bottles in cellar';
COMMENT ON COLUMN cellar_wines.location IS 'Physical location in the wine cellar';
