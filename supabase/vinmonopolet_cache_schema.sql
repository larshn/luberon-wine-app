-- Create table for caching Vinmonopolet search results
CREATE TABLE IF NOT EXISTS vinmonopolet_cache (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cache_key TEXT UNIQUE NOT NULL,
  producer TEXT,
  wine_name TEXT,
  products JSONB NOT NULL,
  cached_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on cache_key for faster lookups
CREATE INDEX IF NOT EXISTS idx_vinmonopolet_cache_key ON vinmonopolet_cache(cache_key);

-- Create index on cached_at for cleanup queries
CREATE INDEX IF NOT EXISTS idx_vinmonopolet_cached_at ON vinmonopolet_cache(cached_at);

-- Enable Row Level Security
ALTER TABLE vinmonopolet_cache ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read cached data (no auth required)
CREATE POLICY "Public read access for vinmonopolet_cache"
  ON vinmonopolet_cache
  FOR SELECT
  USING (true);

-- Policy: Only service role can insert/update cache
CREATE POLICY "Service role can manage vinmonopolet_cache"
  ON vinmonopolet_cache
  FOR ALL
  USING (auth.role() = 'service_role');

-- Optional: Function to clean up old cache entries (older than 7 days)
CREATE OR REPLACE FUNCTION cleanup_old_vinmonopolet_cache()
RETURNS void AS $$
BEGIN
  DELETE FROM vinmonopolet_cache
  WHERE cached_at < NOW() - INTERVAL '7 days';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Optional: Schedule cleanup (requires pg_cron extension)
-- SELECT cron.schedule('cleanup-vinmonopolet-cache', '0 2 * * *', 'SELECT cleanup_old_vinmonopolet_cache()');
