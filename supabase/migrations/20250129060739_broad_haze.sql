/*
  # Create consultations table

  1. New Table
    - consultations
      - id (uuid, primary key)
      - email (text)
      - company_name (text)
      - person_name (text)
      - contact_info (text)
      - products_services (text)
      - focus_products (text)
      - short_term_goals (text)
      - long_term_goals (text)
      - status (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS
    - Allow public inserts
    - Allow authenticated users to view their own data
*/

-- Create consultations table if it doesn't exist
CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  company_name text NOT NULL,
  person_name text NOT NULL,
  contact_info text NOT NULL,
  products_services text NOT NULL,
  focus_products text NOT NULL,
  short_term_goals text NOT NULL,
  long_term_goals text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert data
CREATE POLICY "Anyone can insert consultations"
  ON consultations
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow users to read their own data
CREATE POLICY "Users can view own consultations"
  ON consultations
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');