-- Step 2: Create portfolio table
-- Run in Supabase → SQL Editor → New query

CREATE TABLE IF NOT EXISTS portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  highlights TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  logo_url TEXT,
  image_url TEXT,
  cover_type TEXT NOT NULL DEFAULT 'screenshot' CHECK (cover_type IN ('logo', 'screenshot')),
  project_url TEXT,
  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
