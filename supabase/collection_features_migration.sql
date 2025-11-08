-- Migration: Add collection features to cellar_wines table
-- This adds status tracking, ratings, favorites, and tasting notes

-- Add new columns to cellar_wines table
ALTER TABLE cellar_wines
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'in_cellar' CHECK (status IN ('in_cellar', 'tasted', 'wishlist')),
  ADD COLUMN IF NOT EXISTS rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  ADD COLUMN IF NOT EXISTS is_favorite BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS tasting_notes TEXT,
  ADD COLUMN IF NOT EXISTS tasted_date DATE;

-- Create index for faster filtering by status
CREATE INDEX IF NOT EXISTS idx_cellar_wines_status ON cellar_wines(user_id, status);

-- Create index for favorites
CREATE INDEX IF NOT EXISTS idx_cellar_wines_favorites ON cellar_wines(user_id, is_favorite) WHERE is_favorite = TRUE;

-- Drop the existing view if it exists, then create new one with updated statistics
DROP VIEW IF EXISTS user_cellar_summary;

CREATE VIEW user_cellar_summary AS
SELECT
  user_id,
  COUNT(DISTINCT wine_id) as unique_wines,
  SUM(quantity) as total_bottles,
  COUNT(CASE WHEN status = 'in_cellar' THEN 1 END) as in_cellar_count,
  COUNT(CASE WHEN status = 'tasted' THEN 1 END) as tasted_count,
  COUNT(CASE WHEN status = 'wishlist' THEN 1 END) as wishlist_count,
  COUNT(CASE WHEN is_favorite = TRUE THEN 1 END) as favorites_count,
  AVG(CASE WHEN rating IS NOT NULL THEN rating END) as avg_rating,
  MIN(created_at) as first_added,
  MAX(updated_at) as last_updated
FROM cellar_wines
GROUP BY user_id;

-- Comments for new columns
COMMENT ON COLUMN cellar_wines.status IS 'Status of wine: in_cellar (physical bottle), tasted (tried it), wishlist (want to try)';
COMMENT ON COLUMN cellar_wines.rating IS 'User rating from 1-5 stars';
COMMENT ON COLUMN cellar_wines.is_favorite IS 'Whether this wine is marked as a favorite';
COMMENT ON COLUMN cellar_wines.tasting_notes IS 'Personal tasting notes from the user';
COMMENT ON COLUMN cellar_wines.tasted_date IS 'Date when the wine was tasted';
