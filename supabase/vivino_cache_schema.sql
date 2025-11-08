-- Create table for caching Vivino search results
CREATE TABLE IF NOT EXISTS vivino_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cache_key TEXT UNIQUE NOT NULL,
  wine_name TEXT,
  producer TEXT,
  vintage TEXT,
  wine_data JSONB NOT NULL,
  cached_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on cache_key for faster lookups
CREATE INDEX IF NOT EXISTS idx_vivino_cache_key ON vivino_cache(cache_key);

-- Create index on cached_at for cleanup queries
CREATE INDEX IF NOT EXISTS idx_vivino_cached_at ON vivino_cache(cached_at);

-- Enable Row Level Security
ALTER TABLE vivino_cache ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read cached data (no auth required)
CREATE POLICY "Public read access for vivino_cache"
  ON vivino_cache
  FOR SELECT
  USING (true);

-- Policy: Only service role can insert/update cache
CREATE POLICY "Service role can manage vivino_cache"
  ON vivino_cache
  FOR ALL
  USING (auth.role() = 'service_role');
