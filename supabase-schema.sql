-- =======================================================
-- QCare Kerala - Supabase Database Schema & Setup Script
-- Copy and paste this script into your Supabase SQL Editor
-- (Dashboard -> SQL Editor -> New Query -> Run)
-- =======================================================

-- 1. HOSPITALS TABLE
CREATE TABLE IF NOT EXISTS public.hospitals (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  type TEXT NOT NULL,
  district TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  current_load TEXT DEFAULT 'Low',
  load_score INT DEFAULT 30,
  distance_km DOUBLE PRECISION DEFAULT 2.0,
  departments_count INT DEFAULT 10,
  image_url TEXT
);

-- 2. DEPARTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.departments (
  id TEXT PRIMARY KEY,
  hospital_id TEXT REFERENCES public.hospitals(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  description TEXT,
  room_number TEXT,
  floor TEXT,
  current_token TEXT,
  people_waiting INT DEFAULT 0,
  avg_wait_mins INT DEFAULT 15,
  load_status TEXT DEFAULT 'Low',
  online_booking_enabled BOOLEAN DEFAULT true
);

-- 3. DOCTORS TABLE
CREATE TABLE IF NOT EXISTS public.doctors (
  id TEXT PRIMARY KEY,
  department_id TEXT REFERENCES public.departments(id) ON DELETE CASCADE,
  hospital_id TEXT REFERENCES public.hospitals(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  qualification TEXT,
  specialization TEXT,
  is_available_today BOOLEAN DEFAULT true,
  booked_appointments_count INT DEFAULT 0,
  max_capacity INT DEFAULT 40,
  estimated_load TEXT DEFAULT 'Low',
  next_available_slot TEXT,
  rating DOUBLE PRECISION DEFAULT 4.8
);

-- 4. DOCTOR SLOTS TABLE
CREATE TABLE IF NOT EXISTS public.doctor_slots (
  id TEXT PRIMARY KEY,
  doctor_id TEXT REFERENCES public.doctors(id) ON DELETE CASCADE,
  time_slot TEXT NOT NULL,
  is_available BOOLEAN DEFAULT true,
  max_tokens INT DEFAULT 5,
  booked_tokens INT DEFAULT 0
);

-- 5. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id TEXT PRIMARY KEY,
  uhid TEXT UNIQUE,
  phone TEXT,
  full_name TEXT NOT NULL,
  date_of_birth TEXT,
  gender TEXT,
  blood_group TEXT,
  address TEXT,
  district TEXT,
  preferred_language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_profile_complete BOOLEAN DEFAULT true
);

-- 6. FAMILY MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.family_members (
  id TEXT PRIMARY KEY,
  user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE,
  relationship TEXT NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  date_of_birth TEXT,
  gender TEXT,
  blood_group TEXT,
  uhid TEXT
);

-- 7. APPOINTMENTS TABLE
CREATE TABLE IF NOT EXISTS public.appointments (
  id TEXT PRIMARY KEY,
  booking_reference TEXT NOT NULL,
  user_id TEXT NOT NULL,
  patient_name TEXT NOT NULL,
  patient_relationship TEXT DEFAULT 'Myself',
  patient_uhid TEXT,
  patient_age INT,
  patient_gender TEXT,
  visit_type TEXT DEFAULT 'New Visit',
  previous_appointment_id TEXT,
  hospital_id TEXT,
  hospital_name TEXT,
  department_id TEXT,
  department_name TEXT,
  doctor_id TEXT,
  doctor_name TEXT,
  appointment_date TEXT,
  appointment_time TEXT,
  token_number TEXT,
  queue_position INT DEFAULT 1,
  now_serving_token TEXT,
  estimated_wait_mins INT DEFAULT 15,
  fee_paid DOUBLE PRECISION DEFAULT 2.0,
  payment_method TEXT DEFAULT 'QCare Health Balance',
  payment_status TEXT DEFAULT 'Paid',
  status TEXT DEFAULT 'Waiting',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. BLOOD BANKS TABLE
CREATE TABLE IF NOT EXISTS public.blood_banks (
  id TEXT PRIMARY KEY,
  hospital_name TEXT NOT NULL,
  district TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  distance_km DOUBLE PRECISION DEFAULT 3.0,
  inventory JSONB NOT NULL DEFAULT '{}'::jsonb,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- 9. BLOOD ALERTS TABLE
CREATE TABLE IF NOT EXISTS public.blood_alerts (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  blood_group TEXT NOT NULL,
  district TEXT NOT NULL,
  radius_km INT DEFAULT 20,
  patient_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. PRESCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS public.prescriptions (
  id TEXT PRIMARY KEY,
  appointment_id TEXT,
  doctor_name TEXT,
  hospital_name TEXT,
  department_name TEXT,
  date TEXT,
  diagnosis TEXT,
  items JSONB NOT NULL DEFAULT '[]'::jsonb
);

-- 11. NEARBY PHARMACIES TABLE
CREATE TABLE IF NOT EXISTS public.nearby_pharmacies (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  distance_km DOUBLE PRECISION DEFAULT 1.0,
  medicine_name TEXT,
  generic_name TEXT,
  is_available BOOLEAN DEFAULT true,
  stock_count INT DEFAULT 50,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- 12. REPORTS TABLE
CREATE TABLE IF NOT EXISTS public.reports (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  date TEXT,
  hospital_name TEXT,
  doctor_name TEXT,
  file_size TEXT,
  file_url TEXT
);

-- 13. WALLETS TABLE
CREATE TABLE IF NOT EXISTS public.wallets (
  user_id TEXT PRIMARY KEY,
  balance DOUBLE PRECISION DEFAULT 100.0,
  last_updated TIMESTAMPTZ DEFAULT NOW()
);

-- 14. WALLET TRANSACTIONS TABLE
CREATE TABLE IF NOT EXISTS public.wallet_transactions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  date TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL,
  amount DOUBLE PRECISION NOT NULL,
  balance_after DOUBLE PRECISION NOT NULL,
  reference_id TEXT
);

-- 15. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  category TEXT DEFAULT 'OP',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  link_path TEXT
);

-- =======================================================
-- ENABLE ROW LEVEL SECURITY (RLS) & PUBLIC READ/WRITE POLICIES
-- =======================================================

DO $$ 
DECLARE 
  tbl TEXT;
  tbls TEXT[] := ARRAY[
    'hospitals', 'departments', 'doctors', 'doctor_slots',
    'profiles', 'family_members', 'appointments', 'blood_banks',
    'blood_alerts', 'prescriptions', 'nearby_pharmacies', 'reports',
    'wallets', 'wallet_transactions', 'notifications'
  ];
BEGIN
  FOREACH tbl IN ARRAY tbls LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', tbl);
    EXECUTE format('DROP POLICY IF EXISTS "Public full access policy" ON public.%I;', tbl);
    EXECUTE format('CREATE POLICY "Public full access policy" ON public.%I FOR ALL USING (true) WITH CHECK (true);', tbl);
  END LOOP;
END $$;
