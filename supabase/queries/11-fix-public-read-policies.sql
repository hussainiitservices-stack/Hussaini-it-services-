-- Ensure public website can read published testimonials & portfolio
-- Run in Supabase → SQL Editor if website still shows empty after deploy

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published testimonials" ON testimonials;
CREATE POLICY "Public read published testimonials"
  ON testimonials FOR SELECT
  USING (is_published = true);

DROP POLICY IF EXISTS "Public read published portfolio" ON portfolio;
CREATE POLICY "Public read published portfolio"
  ON portfolio FOR SELECT
  USING (is_published = true);
