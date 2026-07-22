-- Step 10: Add testimonial design fields (website, location, client logo)
-- Run in Supabase → SQL Editor

ALTER TABLE testimonials
  ADD COLUMN IF NOT EXISTS website_url TEXT,
  ADD COLUMN IF NOT EXISTS location TEXT,
  ADD COLUMN IF NOT EXISTS logo_url TEXT;
