import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  INITIAL_HOSPITALS,
  INITIAL_DEPARTMENTS,
  INITIAL_DOCTORS,
  INITIAL_SLOTS,
  INITIAL_PRESCRIPTION,
  NEARBY_PHARMACIES,
  INITIAL_BLOOD_BANKS,
  INITIAL_REPORTS
} from './seedData';
import {
  Profile,
  FamilyMember,
  Hospital,
  Department,
  Doctor,
  DoctorSlot,
  Appointment,
  Prescription,
  NearbyPharmacy,
  BloodBank,
  BloodAlert,
  MedicalReport,
  NotificationItem,
  Wallet,
  WalletTransaction
} from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = (): boolean => {
  return (
    typeof supabaseUrl === 'string' &&
    supabaseUrl.length > 0 &&
    !supabaseUrl.includes('your-project') &&
    typeof supabaseAnonKey === 'string' &&
    supabaseAnonKey.length > 0 &&
    !supabaseAnonKey.includes('your-anon-key')
  );
};

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ==========================================
// LOCAL PERSISTENT STORE FALLBACK (STORAGE)
// ==========================================
const STORAGE_KEYS = {
  PROFILE: 'qcare_profile_v1',
  FAMILY: 'qcare_family_v1',
  APPOINTMENTS: 'qcare_appointments_v1',
  WALLET: 'qcare_wallet_v1',
  WALLET_TXS: 'qcare_wallet_txs_v1',
  NOTIFICATIONS: 'qcare_notifications_v1',
  BLOOD_ALERTS: 'qcare_blood_alerts_v1',
  SAVED_HOSPITALS: 'qcare_saved_hospitals_v1'
};

const DEFAULT_PROFILE: Profile = {
  id: 'usr-default-001',
  uhid: 'KL-2026-984210',
  phone: '+91 98470 12345',
  full_name: 'Rajesh Nair',
  date_of_birth: '1985-06-15',
  gender: 'Male',
  blood_group: 'O+',
  address: 'TC 14/820, Kowdiar, Thiruvananthapuram',
  district: 'Thiruvananthapuram',
  preferred_language: 'en',
  created_at: new Date().toISOString(),
  is_profile_complete: true
};

const DEFAULT_FAMILY: FamilyMember[] = [
  {
    id: 'fam-1',
    user_id: 'usr-default-001',
    relationship: 'Parent',
    full_name: 'K. P. Nair',
    phone: '+91 94470 11223',
    date_of_birth: '1952-03-10',
    gender: 'Male',
    blood_group: 'O+',
    uhid: 'KL-1952-441029'
  },
  {
    id: 'fam-2',
    user_id: 'usr-default-001',
    relationship: 'Child',
    full_name: 'Aarav Nair',
    phone: '+91 98470 12345',
    date_of_birth: '2018-11-22',
    gender: 'Male',
    blood_group: 'A+',
    uhid: 'KL-2018-881203'
  }
];

const DEFAULT_INITIAL_APPOINTMENT: Appointment = {
  id: 'apt-001',
  booking_reference: 'QC-2026-000421',
  user_id: 'usr-default-001',
  patient_name: 'Rajesh Nair',
  patient_relationship: 'Myself',
  patient_uhid: 'KL-2026-984210',
  patient_age: 41,
  patient_gender: 'Male',
  visit_type: 'New Visit',
  hospital_id: 'hosp-1',
  hospital_name: 'Government Medical College, Thiruvananthapuram',
  department_id: 'dept-101',
  department_name: 'General Medicine',
  doctor_id: 'doc-101',
  doctor_name: 'Dr. Suresh Kumar, MD',
  appointment_date: new Date().toISOString().split('T')[0], // Today
  appointment_time: '10:30 AM',
  token_number: 'GM-042',
  queue_position: 11,
  now_serving_token: 'GM-031',
  estimated_wait_mins: 55,
  fee_paid: 2.0,
  payment_method: 'QCare Health Balance',
  payment_status: 'Paid',
  status: 'Waiting',
  created_at: new Date().toISOString()
};

const DEFAULT_WALLET: Wallet = {
  user_id: 'usr-default-001',
  balance: 98.0,
  last_updated: new Date().toISOString()
};

const DEFAULT_WALLET_TXS: WalletTransaction[] = [
  {
    id: 'tx-1',
    user_id: 'usr-default-001',
    date: new Date().toISOString().split('T')[0],
    description: 'OP Booking - QC-2026-000421 (GM-042)',
    type: 'Debit',
    amount: 2.0,
    balance_after: 98.0,
    reference_id: 'QC-2026-000421'
  },
  {
    id: 'tx-2',
    user_id: 'usr-default-001',
    date: new Date().toISOString().split('T')[0],
    description: 'Initial Wallet Welcome Top-up',
    type: 'Credit',
    amount: 100.0,
    balance_after: 100.0
  }
];

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    user_id: 'usr-default-001',
    title: 'Live OP Queue Alert',
    message: 'General Medicine OP at Medical College TVM is now serving Token GM-031. Your token GM-042 is expected in ~55 mins.',
    category: 'Queue',
    is_read: false,
    created_at: new Date().toISOString(),
    link_path: '/live-queue'
  },
  {
    id: 'notif-2',
    user_id: 'usr-default-001',
    title: 'Blood Availability Update',
    message: 'O+ Blood is currently available (18 units) at Government Medical College Blood Bank, Thiruvananthapuram.',
    category: 'Blood',
    is_read: true,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    link_path: '/blood-bank'
  }
];

export const getLocalStore = () => {
  const getItem = <T>(key: string, defaultVal: T): T => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultVal;
    } catch {
      return defaultVal;
    }
  };

  const setItem = <T>(key: string, val: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  };

  return {
    getProfile: (): Profile => getItem(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE),
    saveProfile: (p: Profile) => setItem(STORAGE_KEYS.PROFILE, p),

    getFamily: (): FamilyMember[] => getItem(STORAGE_KEYS.FAMILY, DEFAULT_FAMILY),
    saveFamily: (f: FamilyMember[]) => setItem(STORAGE_KEYS.FAMILY, f),

    getAppointments: (): Appointment[] =>
      getItem(STORAGE_KEYS.APPOINTMENTS, [DEFAULT_INITIAL_APPOINTMENT]),
    saveAppointments: (apts: Appointment[]) => setItem(STORAGE_KEYS.APPOINTMENTS, apts),

    getWallet: (): Wallet => getItem(STORAGE_KEYS.WALLET, DEFAULT_WALLET),
    saveWallet: (w: Wallet) => setItem(STORAGE_KEYS.WALLET, w),

    getWalletTxs: (): WalletTransaction[] => getItem(STORAGE_KEYS.WALLET_TXS, DEFAULT_WALLET_TXS),
    saveWalletTxs: (txs: WalletTransaction[]) => setItem(STORAGE_KEYS.WALLET_TXS, txs),

    getNotifications: (): NotificationItem[] =>
      getItem(STORAGE_KEYS.NOTIFICATIONS, DEFAULT_NOTIFICATIONS),
    saveNotifications: (n: NotificationItem[]) => setItem(STORAGE_KEYS.NOTIFICATIONS, n),

    getSavedHospitals: (): string[] => getItem(STORAGE_KEYS.SAVED_HOSPITALS, ['hosp-1', 'hosp-2']),
    saveSavedHospitals: (h: string[]) => setItem(STORAGE_KEYS.SAVED_HOSPITALS, h)
  };
};
