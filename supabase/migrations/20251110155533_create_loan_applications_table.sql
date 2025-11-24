/*
  # Create loan applications table

  ## Overview
  This migration creates the core database structure for managing loan applications
  in the lending platform.

  ## New Tables
  
  ### `loan_applications`
  Stores all loan application requests from customers
  
  - `id` (uuid, primary key) - Unique identifier for each application
  - `first_name` (text) - Applicant's first name
  - `last_name` (text) - Applicant's last name
  - `email` (text) - Contact email
  - `phone` (text) - Contact phone number
  - `loan_amount` (numeric) - Requested loan amount
  - `loan_duration` (integer) - Loan duration in months
  - `monthly_income` (numeric) - Applicant's monthly income
  - `employment_status` (text) - Employment status (employed, self-employed, unemployed, retired)
  - `loan_purpose` (text) - Purpose of the loan
  - `status` (text) - Application status (pending, approved, rejected)
  - `created_at` (timestamptz) - When the application was submitted
  - `updated_at` (timestamptz) - Last update timestamp

  ### `contact_messages`
  Stores contact form submissions
  
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Contact name
  - `email` (text) - Contact email
  - `subject` (text) - Message subject
  - `message` (text) - Message content
  - `created_at` (timestamptz) - Submission timestamp

  ## Security
  
  - Enable RLS on both tables
  - Public can insert loan applications and contact messages
  - Public can read their own submissions
*/

CREATE TABLE IF NOT EXISTS loan_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  loan_amount numeric NOT NULL,
  loan_duration integer NOT NULL,
  monthly_income numeric NOT NULL,
  employment_status text NOT NULL,
  loan_purpose text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE loan_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit loan application"
  ON loan_applications
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can submit contact message"
  ON contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);