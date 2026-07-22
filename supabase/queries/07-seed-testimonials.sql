-- Step 7 (OPTIONAL): Seed sample testimonials
-- Run once after tables are created
-- Skips insert if testimonials already has data

INSERT INTO testimonials (name, role, company, quote, rating)
SELECT * FROM (VALUES
  (
    'Industrial Client',
    'Marketing Director',
    'AADTRA',
    'Hussaini IT Services transformed our LinkedIn presence. Their strategic content approach helped us build authority in the industrial sector.',
    5
  ),
  (
    'Business Owner',
    'Founder',
    'Gulfpole',
    'The team delivered consistent, professional social media management that strengthened our brand credibility across GCC markets.',
    5
  ),
  (
    'Property Developer',
    'Director',
    'Badshah Property',
    'Our new website looks premium and generates quality leads daily. The local SEO optimization has made a real difference.',
    5
  )
) AS seed(name, role, company, quote, rating)
WHERE NOT EXISTS (SELECT 1 FROM testimonials LIMIT 1);
