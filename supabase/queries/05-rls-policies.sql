-- Step 5: Public read policies (for website visitors)
-- Run in Supabase → SQL Editor → New query
-- Safe to re-run: drops existing policies first

DROP POLICY IF EXISTS "Public read published testimonials" ON testimonials;
CREATE POLICY "Public read published testimonials"
  ON testimonials FOR SELECT
  USING (is_published = true);

DROP POLICY IF EXISTS "Public read published portfolio" ON portfolio;
CREATE POLICY "Public read published portfolio"
  ON portfolio FOR SELECT
  USING (is_published = true);
