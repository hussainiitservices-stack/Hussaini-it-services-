-- Step 6 (OPTIONAL): Seed sample portfolio projects
-- Run once after tables are created
-- Skips insert if portfolio already has data

INSERT INTO portfolio (title, category, description, highlights, tags, sort_order)
SELECT * FROM (VALUES
  (
    'Al Hadaf Metal Coating',
    'Web Development',
    'Corporate website for an industrial metal coating company with service descriptions, testimonials, and blog.',
    ARRAY['99.9% uptime', '100% SEO optimization'],
    ARRAY['React', 'Node.js', 'Google Sheets API'],
    1
  ),
  (
    'Burhani Guards Performance Tracker',
    'Web Application',
    'Custom web application for managing security personnel performance, attendance, and reporting.',
    ARRAY['3s load time', '100% user satisfaction'],
    ARRAY['React', 'Node.js', 'MongoDB'],
    2
  ),
  (
    'Himmat Oilfield Shopify Store',
    'Ecommerce',
    'Ecommerce platform for oilfield equipment with product catalog, cart, and secure checkout.',
    ARRAY['5-star rating', '30% engagement increase'],
    ARRAY['Shopify Plus', 'Liquid', 'JavaScript'],
    3
  ),
  (
    'Advance Cinematics Portfolio',
    'Portfolio Website',
    'Cinematic portfolio for a Senior Video Editor with Vimeo and YouTube integration.',
    ARRAY['Cinematic UI', 'Premium media showcase'],
    ARRAY['React', 'Tailwind CSS', 'Vimeo'],
    4
  ),
  (
    'Badshah Property',
    'Real Estate',
    'Modern real estate website for property listings, lead generation, and local SEO.',
    ARRAY['Improved lead generation', 'Local SEO visibility'],
    ARRAY['React', 'Tailwind CSS', 'Shadcn UI'],
    5
  ),
  (
    'AADTRA Social Media',
    'Digital Marketing',
    'LinkedIn-focused social media management for industrial brand presence.',
    ARRAY['B2B authority building', 'Industry engagement'],
    ARRAY['LinkedIn', 'Content Strategy', 'Canva'],
    6
  ),
  (
    'Mahakal Bike Rental',
    'Web Development',
    'Bike rental booking platform for tourists visiting Mahakal Temple in Ujjain.',
    ARRAY['Seamless bookings', 'Local SEO optimized'],
    ARRAY['React', 'Tailwind CSS', 'Shadcn UI'],
    7
  )
) AS seed(title, category, description, highlights, tags, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM portfolio LIMIT 1);
