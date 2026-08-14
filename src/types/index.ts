export type District =
  | 'Thiruvananthapuram'
  | 'Kollam'
  | 'Pathanamthitta'
  | 'Alappuzha'
  | 'Kottayam'
  | 'Idukki'
  | 'Ernakulam'
  | 'Thrissur'
  | 'Palakkad'
  | 'Malappuram'
  | 'Kozhikode'
  | 'Wayanad'
  | 'Kannur'
  | 'Kasaragod';

export const KERALA_DISTRICTS: District[] = [
  'Thiruvananthapuram',
  'Kollam',
  'Pathanamthitta',
  'Alappuzha',
  'Kottayam',
  'Idukki',
  'Ernakulam',
  'Thrissur',
  'Palakkad',
  'Malappuram',
  'Kozhikode',
  'Wayanad',
  'Kannur',
  'Kasaragod'
];

export type BloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type Language = 'en' | 'ml';

export interface Profile {
  id: string;
  uhid: string;
  phone: string;
  full_name: string;
  date_of_birth: string;
  gender: 'Male' | 'Female' | 'Other';
  blood_group: BloodGroup;
  address: string;
  district: District;
  preferred_language: Language;
  created_at: string;
  is_profile_complete: boolean;
}

export interface FamilyMember {
  id: string;
  user_id: string;
  relationship: 'Spouse' | 'Child' | 'Parent' | 'Sibling' | 'Other';
  full_name: string;
  phone: string;
  date_of_birth: string;
  gender: 'Male' | 'Female' | 'Other';
  blood_group: BloodGroup;
  uhid?: string;
}

export type LoadStatus = 'Low' | 'Moderate' | 'High';

export interface Hospital {
  id: string;
  name: string;
  code: string;
  type: string;
  district: District;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  current_load: LoadStatus;
  load_score: number; // 0 - 100
  distance_km?: number;
  image_url?: string;
  departments_count?: number;
}

export interface Department {
  id: string;
  hospital_id: string;
  name: string;
  code: string;
  description: string;
  room_number: string;
  floor: string;
  current_token: string;
  people_waiting: number;
  avg_wait_mins: number;
  load_status: LoadStatus;
  online_booking_enabled: boolean;
}

export interface Doctor {
  id: string;
  department_id: string;
  hospital_id: string;
  full_name: string;
  qualification: string;
  specialization: string;
  is_available_today: boolean;
  booked_appointments_count: number;
  max_capacity: number;
  estimated_load: LoadStatus;
  next_available_slot: string;
  rating?: number;
}

export interface DoctorSlot {
  id: string;
  doctor_id: string;
  time_slot: string; // e.g. "09:30 AM"
  is_available: boolean;
  max_tokens: number;
  booked_tokens: number;
}

export type AppointmentStatus =
  | 'Confirmed'
  | 'Waiting'
  | 'Called'
  | 'In consultation'
  | 'Completed'
  | 'Cancelled'
  | 'No show';

export interface Appointment {
  id: string;
  booking_reference: string; // e.g. QC-2026-000421
  user_id: string;
  patient_name: string;
  patient_relationship: 'Myself' | string;
  patient_uhid: string;
  patient_age: number;
  patient_gender: string;
  visit_type: 'New Visit' | 'Follow-up';
  previous_appointment_id?: string;
  hospital_id: string;
  hospital_name: string;
  department_id: string;
  department_name: string;
  doctor_id: string;
  doctor_name: string;
  appointment_date: string; // YYYY-MM-DD
  appointment_time: string; // e.g. "10:30 AM"
  token_number: string; // e.g. GM-042
  queue_position: number;
  now_serving_token: string; // e.g. GM-031
  estimated_wait_mins: number;
  fee_paid: number; // 2.00
  payment_method: 'UPI' | 'QCare Health Balance';
  payment_status: 'Paid' | 'Pending' | 'Failed';
  status: AppointmentStatus;
  created_at: string;
  qr_code_data?: string;
}

export interface PrescriptionItem {
  id: string;
  prescription_id: string;
  medicine_name: string;
  generic_name: string;
  strength: string; // e.g. "500 mg"
  dosage: string; // e.g. "1-0-1"
  frequency: string; // e.g. "Twice daily after food"
  duration_days: number;
  instructions: string;
  quantity: number;
  hospital_stock_available: boolean;
  hospital_stock_count: number;
}

export interface Prescription {
  id: string;
  appointment_id: string;
  doctor_name: string;
  hospital_name: string;
  department_name: string;
  date: string;
  diagnosis: string;
  items: PrescriptionItem[];
}

export interface NearbyPharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance_km: number;
  medicine_name: string;
  generic_name: string;
  is_available: boolean;
  stock_count: number;
  last_updated: string; // ISO string
}

export interface BloodBank {
  id: string;
  hospital_name: string;
  district: District;
  address: string;
  phone: string;
  distance_km: number;
  inventory: Record<BloodGroup, number>;
  last_updated: string;
}

export interface BloodAlert {
  id: string;
  user_id: string;
  blood_group: BloodGroup;
  district: District;
  radius_km: number;
  patient_name: string;
  phone: string;
  is_active: boolean;
  created_at: string;
}

export interface WalletTransaction {
  id: string;
  user_id: string;
  date: string;
  description: string;
  type: 'Debit' | 'Credit';
  amount: number;
  balance_after: number;
  reference_id?: string;
}

export interface Wallet {
  user_id: string;
  balance: number;
  last_updated: string;
}

export interface MedicalReport {
  id: string;
  user_id: string;
  title: string;
  type: 'Lab Report' | 'Prescription' | 'OP Consultation' | 'X-Ray / Scan' | 'Discharge Summary';
  date: string;
  hospital_name: string;
  doctor_name: string;
  file_size: string;
  file_url: string;
  summary?: string;
  findings?: string[];
  content?: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  title: string;
  message: string;
  category: 'OP' | 'Queue' | 'Medicine' | 'Blood' | 'Reports' | 'System';
  is_read: boolean;
  created_at: string;
  link_path?: string;
}

export interface SmartSuggestion {
  suggestedHospitalId?: string;
  suggestedHospitalName?: string;
  estimatedWaitSelectedMins: number;
  estimatedWaitSuggestedMins: number;
  reason: string;
}
