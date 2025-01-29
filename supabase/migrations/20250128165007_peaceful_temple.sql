/*
  # Service Requests Schema

  1. New Tables
    - `service_requests`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `service_id` (integer)
      - `company_name` (text)
      - `contact_name` (text)
      - `email` (text)
      - `phone` (text)
      - `budget_range` (text)
      - `timeline` (text)
      - `project_details` (text)
      - `created_at` (timestamptz)
      - `status` (text)

  2. Security
    - Enable RLS on service_requests table
    - Add policies for authenticated users
*/

CREATE TABLE IF NOT EXISTS service_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users,
  service_id integer,
  company_name text,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  budget_range text,
  timeline text,
  project_details text,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'pending'
);

ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own service requests"
  ON service_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own service requests"
  ON service_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);