-- Table to track users authorized to use AI features
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS authorized_ai_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  authorized_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  authorized_by TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE authorized_ai_users ENABLE ROW LEVEL SECURITY;

-- Users can view their own authorization status
CREATE POLICY "Users can view their own authorization"
  ON authorized_ai_users FOR SELECT
  USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_authorized_ai_users_user_id
  ON authorized_ai_users(user_id);

-- Insert your own user as authorized (replace with your actual user ID after first login)
-- To get your user ID, run: SELECT id, email FROM auth.users;
-- Then uncomment and run:
-- INSERT INTO authorized_ai_users (user_id, authorized_by, notes)
-- VALUES ('YOUR-USER-ID-HERE', 'Initial setup', 'App creator');
