/*
  # Fix contacts table and policies

  This migration safely handles the contacts table setup by:
  1. Checking if table/policies exist before creating
  2. Dropping duplicate policies if they exist
  3. Recreating policies with proper checks
*/

-- Drop existing policy if it exists
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Anyone can insert contacts" ON contacts;
  DROP POLICY IF EXISTS "Users can view own contacts" ON contacts;
EXCEPTION
  WHEN undefined_table THEN
    NULL;
END $$;

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  budget_range text,
  timeframe text,
  message text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS (safe to run multiple times)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Recreate policies
CREATE POLICY "Anyone can insert contacts"
  ON contacts
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can view own contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');