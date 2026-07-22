-- Step 8: Add portfolio logo & cover type columns
-- Run in Supabase → SQL Editor (if portfolio table already exists)

ALTER TABLE portfolio
  ADD COLUMN IF NOT EXISTS logo_url TEXT,
  ADD COLUMN IF NOT EXISTS cover_type TEXT NOT NULL DEFAULT 'screenshot'
    CHECK (cover_type IN ('logo', 'screenshot'));

-- Existing rows: keep screenshot as default display type
UPDATE portfolio SET cover_type = 'screenshot' WHERE cover_type IS NULL;
