import React, { useState } from 'react';
import { isSupabaseConfigured } from '../../lib/supabase';
import { seedSupabaseDatabase, SeedStatus } from '../../lib/seedSupabase';
import { Database, CheckCircle2, AlertCircle, RefreshCw, Code, Copy, Check } from 'lucide-react';

export const DatabaseStatusBadge: React.FC = () => {
  const isConfigured = isSupabaseConfigured();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<SeedStatus | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const sqlSchema = `-- Copy and paste into Supabase SQL Editor
CREATE TABLE IF NOT EXISTS public.hospitals (id TEXT PRIMARY KEY, name TEXT NOT NULL, code TEXT NOT NULL, type TEXT NOT NULL, district TEXT NOT NULL, address TEXT NOT NULL, phone TEXT NOT NULL, latitude DOUBLE PRECISION, longitude DOUBLE PRECISION, current_load TEXT, load_score INT, distance_km DOUBLE PRECISION, departments_count INT, image_url TEXT);
CREATE TABLE IF NOT EXISTS public.departments (id TEXT PRIMARY KEY, hospital_id TEXT REFERENCES public.hospitals(id) ON DELETE CASCADE, name TEXT NOT NULL, code TEXT NOT NULL, description TEXT, room_number TEXT, floor TEXT, current_token TEXT, people_waiting INT, avg_wait_mins INT, load_status TEXT, online_booking_enabled BOOLEAN DEFAULT true);
CREATE TABLE IF NOT EXISTS public.doctors (id TEXT PRIMARY KEY, department_id TEXT REFERENCES public.departments(id) ON DELETE CASCADE, hospital_id TEXT REFERENCES public.hospitals(id) ON DELETE CASCADE, full_name TEXT NOT NULL, qualification TEXT, specialization TEXT, is_available_today BOOLEAN DEFAULT true, booked_appointments_count INT, max_capacity INT, estimated_load TEXT, next_available_slot TEXT, rating DOUBLE PRECISION);
CREATE TABLE IF NOT EXISTS public.doctor_slots (id TEXT PRIMARY KEY, doctor_id TEXT REFERENCES public.doctors(id) ON DELETE CASCADE, time_slot TEXT NOT NULL, is_available BOOLEAN DEFAULT true, max_tokens INT, booked_tokens INT);
CREATE TABLE IF NOT EXISTS public.profiles (id TEXT PRIMARY KEY, uhid TEXT UNIQUE, phone TEXT, full_name TEXT NOT NULL, date_of_birth TEXT, gender TEXT, blood_group TEXT, address TEXT, district TEXT, preferred_language TEXT DEFAULT 'en', created_at TIMESTAMPTZ DEFAULT NOW(), is_profile_complete BOOLEAN DEFAULT true);
CREATE TABLE IF NOT EXISTS public.family_members (id TEXT PRIMARY KEY, user_id TEXT REFERENCES public.profiles(id) ON DELETE CASCADE, relationship TEXT NOT NULL, full_name TEXT NOT NULL, phone TEXT, date_of_birth TEXT, gender TEXT, blood_group TEXT, uhid TEXT);
CREATE TABLE IF NOT EXISTS public.appointments (id TEXT PRIMARY KEY, booking_reference TEXT NOT NULL, user_id TEXT NOT NULL, patient_name TEXT NOT NULL, patient_relationship TEXT, patient_uhid TEXT, patient_age INT, patient_gender TEXT, visit_type TEXT, previous_appointment_id TEXT, hospital_id TEXT, hospital_name TEXT, department_id TEXT, department_name TEXT, doctor_id TEXT, doctor_name TEXT, appointment_date TEXT, appointment_time TEXT, token_number TEXT, queue_position INT, now_serving_token TEXT, estimated_wait_mins INT, fee_paid DOUBLE PRECISION, payment_method TEXT, payment_status TEXT, status TEXT, created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS public.blood_banks (id TEXT PRIMARY KEY, hospital_name TEXT NOT NULL, district TEXT NOT NULL, address TEXT, phone TEXT, distance_km DOUBLE PRECISION, inventory JSONB DEFAULT '{}'::jsonb, last_updated TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS public.blood_alerts (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, blood_group TEXT NOT NULL, district TEXT NOT NULL, radius_km INT, patient_name TEXT NOT NULL, phone TEXT NOT NULL, is_active BOOLEAN DEFAULT true, created_at TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS public.prescriptions (id TEXT PRIMARY KEY, appointment_id TEXT, doctor_name TEXT, hospital_name TEXT, department_name TEXT, date TEXT, diagnosis TEXT, items JSONB DEFAULT '[]'::jsonb);
CREATE TABLE IF NOT EXISTS public.nearby_pharmacies (id TEXT PRIMARY KEY, name TEXT NOT NULL, address TEXT, phone TEXT, distance_km DOUBLE PRECISION, medicine_name TEXT, generic_name TEXT, is_available BOOLEAN DEFAULT true, stock_count INT, last_updated TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS public.reports (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, title TEXT NOT NULL, type TEXT NOT NULL, date TEXT, hospital_name TEXT, doctor_name TEXT, file_size TEXT, file_url TEXT);
CREATE TABLE IF NOT EXISTS public.wallets (user_id TEXT PRIMARY KEY, balance DOUBLE PRECISION DEFAULT 100.0, last_updated TIMESTAMPTZ DEFAULT NOW());
CREATE TABLE IF NOT EXISTS public.wallet_transactions (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, date TEXT NOT NULL, description TEXT NOT NULL, type TEXT NOT NULL, amount DOUBLE PRECISION NOT NULL, balance_after DOUBLE PRECISION NOT NULL, reference_id TEXT);
CREATE TABLE IF NOT EXISTS public.notifications (id TEXT PRIMARY KEY, user_id TEXT NOT NULL, title TEXT NOT NULL, message TEXT NOT NULL, category TEXT, is_read BOOLEAN DEFAULT false, created_at TIMESTAMPTZ DEFAULT NOW(), link_path TEXT);

DO $$ DECLARE tbl TEXT; tbls TEXT[] := ARRAY['hospitals', 'departments', 'doctors', 'doctor_slots', 'profiles', 'family_members', 'appointments', 'blood_banks', 'blood_alerts', 'prescriptions', 'nearby_pharmacies', 'reports', 'wallets', 'wallet_transactions', 'notifications'];
BEGIN FOREACH tbl IN ARRAY tbls LOOP EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', tbl); EXECUTE format('DROP POLICY IF EXISTS "Public full access policy" ON public.%I;', tbl); EXECUTE format('CREATE POLICY "Public full access policy" ON public.%I FOR ALL USING (true) WITH CHECK (true);', tbl); END LOOP; END $$;`;

  const handleSeed = async (force = false) => {
    setLoading(true);
    try {
      const res = await seedSupabaseDatabase(force);
      setStatus(res);
    } catch (e: any) {
      setStatus({
        success: false,
        message: e?.message || 'Error running database seed',
        tablesSeeded: [],
        errors: [e?.message || 'Unknown error']
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(sqlSchema);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="inline-flex items-center gap-2">
        <button
          onClick={() => setShowModal(true)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all cursor-pointer ${
            isConfigured
              ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
              : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
          }`}
          title="Click to view Supabase Backend Status & Data Seeding"
        >
          <Database className="w-3.5 h-3.5" />
          <span>{isConfigured ? 'Supabase Connected' : 'Local Demo Backend'}</span>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className={`p-2.5 rounded-xl ${isConfigured ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                  <Database className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Backend Database Management</h3>
                  <p className="text-xs text-slate-500">
                    {isConfigured ? 'Live Supabase Connection Active' : 'Running on Local Persistent Store Fallback'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {isConfigured ? (
              <div className="space-y-4">
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-start gap-3 text-xs text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm">Supabase Credentials Detected</p>
                    <p className="mt-0.5 text-emerald-800">
                      Your app is linked to live Supabase backend tables. Use the button below to automatically populate/seed all initial hospitals, departments, doctors, slots, blood banks, prescriptions, and reports into your Supabase database.
                    </p>
                  </div>
                </div>

                {status && (
                  <div
                    className={`p-4 rounded-xl text-xs border ${
                      status.success
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                        : 'bg-rose-50 text-rose-900 border-rose-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold mb-1 text-sm">
                      {status.success ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                      )}
                      <span>{status.message}</span>
                    </div>
                    {status.tablesSeeded.length > 0 && (
                      <div className="mt-2 text-xs space-y-1">
                        <p className="font-semibold text-slate-800">Tables Populated:</p>
                        <div className="flex flex-wrap gap-1">
                          {status.tablesSeeded.map((t, idx) => (
                            <span key={idx} className="bg-white/80 border border-emerald-200 text-emerald-900 px-2 py-0.5 rounded text-[11px] font-mono">
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {status.errors.length > 0 && (
                      <div className="mt-2 text-xs text-rose-700 bg-rose-100/80 p-2 rounded border border-rose-200">
                        <p className="font-semibold">Notice / Errors:</p>
                        <ul className="list-disc pl-4 space-y-0.5 mt-1">
                          {status.errors.map((err, idx) => (
                            <li key={idx}>{err}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() => handleSeed(false)}
                    disabled={loading}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-800 hover:bg-teal-900 text-white font-medium text-xs rounded-xl transition-all shadow-xs disabled:opacity-50 cursor-pointer min-h-[44px]"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    <span>{loading ? 'Populating Database...' : 'Populate / Seed Supabase Tables'}</span>
                  </button>

                  <button
                    onClick={() => handleSeed(true)}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-xl transition-all cursor-pointer min-h-[44px]"
                    title="Force re-sync initial data into Supabase"
                  >
                    <span>Force Re-seed</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-sm text-amber-800">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span>Local Persistent Demo Mode Active</span>
                  </div>
                  <p className="text-amber-800 leading-relaxed">
                    The application is currently running with local browser storage persistence. All bookings, wallet top-ups, and profile changes persist locally in your browser.
                  </p>
                </div>

                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-slate-700">
                  <p className="font-semibold text-slate-900">How to connect your Supabase backend:</p>
                  <ol className="list-decimal pl-4 space-y-1 text-slate-600">
                    <li>Create a project on <strong className="text-slate-800">Supabase.com</strong></li>
                    <li>Copy your <strong className="text-slate-800">Project URL</strong> and <strong className="text-slate-800">anon key</strong></li>
                    <li>Set <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-[11px]">VITE_SUPABASE_URL</code> and <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-[11px]">VITE_SUPABASE_ANON_KEY</code> in environment variables / secrets.</li>
                  </ol>
                </div>
              </div>
            )}

            {/* SQL Schema Copy Block */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Code className="w-4 h-4 text-slate-500" />
                  <span>Database Table Setup SQL</span>
                </span>
                <button
                  onClick={handleCopySql}
                  className="inline-flex items-center gap-1 text-xs text-teal-800 hover:text-teal-900 font-medium hover:underline cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied SQL!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Setup SQL</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Run this SQL in your Supabase SQL Editor to create all 15 required tables with public access policy if they don't exist yet.
              </p>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
