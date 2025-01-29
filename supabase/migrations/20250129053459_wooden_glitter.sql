/*
  # Create consultations table

  1. New Tables
    - `consultations`
      - `id` (uuid, primary key)
      - `email` (text, required)
      - `company_name` (text, required)
      - `contact_name` (text, required)
      - `contact_info` (text, required)
      - `products_services` (text, required)
      - `focus_products` (text, required)
      - `short_term_goals` (text, required)
      - `long_term_goals` (text, required)
      - `status` (text, default: 'pending')
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `consultations` table
    - Add policies for authenticated users to read their own data
    - Add policy for anyone to insert data
*/

CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  company_name text NOT NULL,
  contact_name text NOT NULL,
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