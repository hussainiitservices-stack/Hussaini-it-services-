-- Hussaini IT Services - Supabase Schema
--
-- For easier setup, use the separate files in supabase/queries/
-- Run them in order in Supabase → SQL Editor:
--
--   1. 01-create-testimonials.sql
--   2. 02-create-portfolio.sql
--   3. 03-create-contact-submissions.sql
--   4. 04-enable-rls.sql
--   5. 05-rls-policies.sql
--   6. 06-seed-portfolio.sql        (optional)
--   8. 08-add-portfolio-images.sql   (run if portfolio table already exists)
--   9. 09-create-storage-bucket.sql  (required for image uploads)
--
-- Or run everything below in one go:

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  quote TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  website_url TEXT,
  location TEXT,
  logo_url TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Portfolio
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

-- Contact submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published testimonials" ON testimonials;
CREATE POLICY "Public read published testimonials"
  ON testimonials FOR SELECT
  USING (is_published = true);

DROP POLICY IF EXISTS "Public read published portfolio" ON portfolio;
CREATE POLICY "Public read published portfolio"
  ON portfolio FOR SELECT
  USING (is_published = true);
