-- Step 9: Create Supabase Storage bucket for portfolio uploads
-- Run in Supabase → SQL Editor

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'portfolio-assets',
  'portfolio-assets',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Public read portfolio assets" ON storage.objects;
CREATE POLICY "Public read portfolio assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'portfolio-assets');
