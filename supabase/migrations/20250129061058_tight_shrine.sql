/*
  # Service Quote Requests Table

  1. New Table
    - service_quote_requests
      - id (uuid, primary key)
      - service_id (integer, references services)
      - company_name (text)
      - contact_name (text)
      - email (text)
      - phone (text)
      - budget_range (text)
      - timeline (text)
      - project_details (text)
      - status (text)
      - created_at (timestamp)

  2. Security
    - Enable RLS
    - Allow public inserts
    - Allow authenticated users to view their own quotes
*/

CREATE TABLE IF NOT EXISTS service_quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id integer NOT NULL,
  company_name text,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  budget_range text,
  timeline text,
  project_details text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE service_quote_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert data
CREATE POLICY "Anyone can insert service quotes"
  ON service_quote_requests
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow users to read their own quotes
CREATE POLICY "Users can view own quotes"
  ON service_quote_requests
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');