-- Step 4: Enable Row Level Security (RLS)
-- Run in Supabase → SQL Editor → New query

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
