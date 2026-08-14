import { Hospital, Department, Doctor, DoctorSlot, NearbyPharmacy, BloodBank, MedicalReport, Prescription } from '../types';

export const INITIAL_HOSPITALS: Hospital[] = [
  {
    id: 'hosp-1',
    name: 'Government Medical College, Thiruvananthapuram',
    code: 'MCT',
    type: 'Government Medical College',
    district: 'Thiruvananthapuram',
    address: 'Medical College PO, Chalakkuzhi, Thiruvananthapuram, Kerala 695011',
    phone: '0471-2528300',
    latitude: 8.5241,
    longitude: 76.9201,
    current_load: 'High',
    load_score: 88,
    distance_km: 2.4,
    departments_count: 18,
    image_url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'hosp-2',
    name: 'Government General Hospital, Thiruvananthapuram',
    code: 'GHT',
    type: 'General Hospital',
    district: 'Thiruvananthapuram',
    address: 'Vanchiyoor, Thiruvananthapuram, Kerala 695035',
    phone: '0471-2303233',
    latitude: 8.4982,
    longitude: 76.9423,
    current_load: 'Low',
    load_score: 28,
    distance_km: 4.1,
    departments_count: 12,
    image_url: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'hosp-3',
    name: 'Peroorkada Government Hospital, Thiruvananthapuram',
    code: 'PGH',
    type: 'District Hospital',
    district: 'Thiruvananthapuram',
    address: 'Peroorkada, Thiruvananthapuram, Kerala 695005',
    phone: '0471-2433050',
    latitude: 8.5411,
    longitude: 76.9712,
    current_load: 'Moderate',
    load_score: 45,
    distance_km: 6.8,
    departments_count: 9,
    image_url: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'hosp-4',
    name: 'General Hospital, Ernakulam',
    code: 'GHE',
    type: 'General Hospital',
    district: 'Ernakulam',
    address: 'Hospital Road, Marine Drive, Kochi, Kerala 682011',
    phone: '0484-2361251',
    latitude: 9.9723,
    longitude: 76.2812,
    current_load: 'Moderate',
    load_score: 52,
    distance_km: 1.8,
    departments_count: 15,
    image_url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'hosp-5',
    name: 'Government Medical College, Kozhikode',
    code: 'MCK',
    type: 'Government Medical College',
    district: 'Kozhikode',
    address: 'Medical College Campus, Kozhikode, Kerala 673008',
    phone: '0495-2350212',
    latitude: 11.2721,
    longitude: 75.8324,
    current_load: 'High',
    load_score: 82,
    distance_km: 3.5,
    departments_count: 20,
    image_url: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80&w=800'
  }
];

export const INITIAL_DEPARTMENTS: Department[] = [
  // Hosp 1: GMC TVM
  {
    id: 'dept-101',
    hospital_id: 'hosp-1',
    name: 'General Medicine',
    code: 'GM',
    description: 'Outpatient consultation for general illness, fever, diabetes & hypertension',
    room_number: 'Room 102 (OP Block Ground Floor)',
    floor: 'Ground Floor',
    current_token: 'GM-031',
    people_waiting: 11,
    avg_wait_mins: 55,
    load_status: 'High',
    online_booking_enabled: true
  },
  {
    id: 'dept-102',
    hospital_id: 'hosp-1',
    name: 'Cardiology',
    code: 'CARD',
    description: 'Cardiovascular screening, ECG review and specialized cardiac OP',
    room_number: 'Room 205 (Super Specialty Block)',
    floor: '2nd Floor',
    current_token: 'CARD-018',
    people_waiting: 8,
    avg_wait_mins: 40,
    load_status: 'Moderate',
    online_booking_enabled: true
  },
  {
    id: 'dept-103',
    hospital_id: 'hosp-1',
    name: 'Orthopedics',
    code: 'ORTH',
    description: 'Bone, joint & trauma rehabilitation OP',
    room_number: 'Room 108',
    floor: 'Ground Floor',
    current_token: 'ORTH-022',
    people_waiting: 14,
    avg_wait_mins: 65,
    load_status: 'High',
    online_booking_enabled: true
  },
  {
    id: 'dept-104',
    hospital_id: 'hosp-1',
    name: 'Pediatrics',
    code: 'PED',
    description: 'Child health, immunization & pediatric illness OP',
    room_number: 'Child Care Wing Room 1',
    floor: '1st Floor',
    current_token: 'PED-015',
    people_waiting: 5,
    avg_wait_mins: 25,
    load_status: 'Low',
    online_booking_enabled: true
  },
  {
    id: 'dept-105',
    hospital_id: 'hosp-1',
    name: 'Dermatology',
    code: 'DERM',
    description: 'Skin care, allergies and dermatological care OP',
    room_number: 'Room 304',
    floor: '3rd Floor',
    current_token: 'DERM-012',
    people_waiting: 6,
    avg_wait_mins: 30,
    load_status: 'Low',
    online_booking_enabled: true
  },

  // Hosp 2: General Hospital TVM
  {
    id: 'dept-201',
    hospital_id: 'hosp-2',
    name: 'General Medicine',
    code: 'GM',
    description: 'General medical consultation with quick queue flow',
    room_number: 'OP Room 4',
    floor: 'Main OP Block',
    current_token: 'GM-014',
    people_waiting: 3,
    avg_wait_mins: 20,
    load_status: 'Low',
    online_booking_enabled: true
  },
  {
    id: 'dept-202',
    hospital_id: 'hosp-2',
    name: 'Cardiology',
    code: 'CARD',
    description: 'Cardiac screening and routine follow-ups',
    room_number: 'OP Room 9',
    floor: 'First Floor',
    current_token: 'CARD-008',
    people_waiting: 2,
    avg_wait_mins: 15,
    load_status: 'Low',
    online_booking_enabled: true
  },
  {
    id: 'dept-203',
    hospital_id: 'hosp-2',
    name: 'ENT',
    code: 'ENT',
    description: 'Ear, Nose & Throat consultation',
    room_number: 'Room 12',
    floor: 'Ground Floor',
    current_token: 'ENT-019',
    people_waiting: 4,
    avg_wait_mins: 25,
    load_status: 'Moderate',
    online_booking_enabled: true
  },

  // Hosp 3: Peroorkada GH
  {
    id: 'dept-301',
    hospital_id: 'hosp-3',
    name: 'General Medicine',
    code: 'GM',
    description: 'District level outpatient care',
    room_number: 'OP Room 2',
    floor: 'Ground Floor',
    current_token: 'GM-020',
    people_waiting: 7,
    avg_wait_mins: 35,
    load_status: 'Moderate',
    online_booking_enabled: true
  }
];

export const INITIAL_DOCTORS: Doctor[] = [
  // GMC TVM General Medicine
  {
    id: 'doc-101',
    department_id: 'dept-101',
    hospital_id: 'hosp-1',
    full_name: 'Dr. Suresh Kumar, MD',
    qualification: 'MD (Internal Medicine), Government Service (14 yrs exp)',
    specialization: 'Senior Physician & Diabetologist',
    is_available_today: true,
    booked_appointments_count: 28,
    max_capacity: 40,
    estimated_load: 'High',
    next_available_slot: '11:15 AM',
    rating: 4.8
  },
  {
    id: 'doc-102',
    department_id: 'dept-101',
    hospital_id: 'hosp-1',
    full_name: 'Dr. Anjali Nair, MD',
    qualification: 'MD (General Medicine)',
    specialization: 'Physician & Infectious Diseases',
    is_available_today: true,
    booked_appointments_count: 16,
    max_capacity: 40,
    estimated_load: 'Low',
    next_available_slot: '10:30 AM',
    rating: 4.9
  },

  // GMC TVM Cardiology
  {
    id: 'doc-103',
    department_id: 'dept-102',
    hospital_id: 'hosp-1',
    full_name: 'Dr. K. V. Rajesh, DM',
    qualification: 'DM (Cardiology), FACC',
    specialization: 'Consultant Cardiologist',
    is_available_today: true,
    booked_appointments_count: 20,
    max_capacity: 35,
    estimated_load: 'Moderate',
    next_available_slot: '10:45 AM',
    rating: 4.9
  },

  // General Hospital TVM General Medicine
  {
    id: 'doc-201',
    department_id: 'dept-201',
    hospital_id: 'hosp-2',
    full_name: 'Dr. Manoj Pillai, MD',
    qualification: 'MD (Medicine)',
    specialization: 'General Physician',
    is_available_today: true,
    booked_appointments_count: 12,
    max_capacity: 40,
    estimated_load: 'Low',
    next_available_slot: '10:15 AM',
    rating: 4.7
  },
  {
    id: 'doc-202',
    department_id: 'dept-201',
    hospital_id: 'hosp-2',
    full_name: 'Dr. Radhika Menon, MBBS',
    qualification: 'MBBS, DNB (Family Medicine)',
    specialization: 'Primary Care Physician',
    is_available_today: true,
    booked_appointments_count: 8,
    max_capacity: 35,
    estimated_load: 'Low',
    next_available_slot: '10:00 AM',
    rating: 4.8
  }
];

export const INITIAL_SLOTS: DoctorSlot[] = [
  { id: 'slot-1', doctor_id: 'doc-101', time_slot: '09:30 AM', is_available: false, max_tokens: 5, booked_tokens: 5 },
  { id: 'slot-2', doctor_id: 'doc-101', time_slot: '09:45 AM', is_available: false, max_tokens: 5, booked_tokens: 5 },
  { id: 'slot-3', doctor_id: 'doc-101', time_slot: '10:00 AM', is_available: false, max_tokens: 5, booked_tokens: 5 },
  { id: 'slot-4', doctor_id: 'doc-101', time_slot: '10:15 AM', is_available: false, max_tokens: 5, booked_tokens: 5 },
  { id: 'slot-5', doctor_id: 'doc-101', time_slot: '10:30 AM', is_available: false, max_tokens: 5, booked_tokens: 5 },
  { id: 'slot-6', doctor_id: 'doc-101', time_slot: '10:45 AM', is_available: false, max_tokens: 5, booked_tokens: 5 },
  { id: 'slot-7', doctor_id: 'doc-101', time_slot: '11:00 AM', is_available: false, max_tokens: 5, booked_tokens: 5 },
  { id: 'slot-8', doctor_id: 'doc-101', time_slot: '11:15 AM', is_available: true, max_tokens: 5, booked_tokens: 3 },
  { id: 'slot-9', doctor_id: 'doc-101', time_slot: '11:30 AM', is_available: true, max_tokens: 5, booked_tokens: 2 },
  { id: 'slot-10', doctor_id: 'doc-101', time_slot: '11:45 AM', is_available: true, max_tokens: 5, booked_tokens: 0 },

  // Doc 102 (Dr. Anjali Nair - open early slots)
  { id: 'slot-21', doctor_id: 'doc-102', time_slot: '10:00 AM', is_available: true, max_tokens: 5, booked_tokens: 2 },
  { id: 'slot-22', doctor_id: 'doc-102', time_slot: '10:15 AM', is_available: true, max_tokens: 5, booked_tokens: 1 },
  { id: 'slot-23', doctor_id: 'doc-102', time_slot: '10:30 AM', is_available: true, max_tokens: 5, booked_tokens: 0 },
  { id: 'slot-24', doctor_id: 'doc-102', time_slot: '10:45 AM', is_available: true, max_tokens: 5, booked_tokens: 0 },

  // Doc 201 (GH TVM)
  { id: 'slot-31', doctor_id: 'doc-201', time_slot: '09:30 AM', is_available: true, max_tokens: 5, booked_tokens: 1 },
  { id: 'slot-32', doctor_id: 'doc-201', time_slot: '09:45 AM', is_available: true, max_tokens: 5, booked_tokens: 2 },
  { id: 'slot-33', doctor_id: 'doc-201', time_slot: '10:00 AM', is_available: true, max_tokens: 5, booked_tokens: 0 },
  { id: 'slot-34', doctor_id: 'doc-201', time_slot: '10:15 AM', is_available: true, max_tokens: 5, booked_tokens: 0 }
];

export const INITIAL_PRESCRIPTION: Prescription = {
  id: 'rx-2026-001',
  appointment_id: 'apt-001',
  doctor_name: 'Dr. Suresh Kumar, MD',
  hospital_name: 'Government Medical College, Thiruvananthapuram',
  department_name: 'General Medicine',
  date: '2026-08-10',
  diagnosis: 'Acute Upper Respiratory Tract Infection & Mild Hypertension',
  items: [
    {
      id: 'item-1',
      prescription_id: 'rx-2026-001',
      medicine_name: 'Paracetamol 650mg (Dolo)',
      generic_name: 'Paracetamol',
      strength: '650 mg',
      dosage: '1-0-1',
      frequency: 'Twice daily after food',
      duration_days: 5,
      instructions: 'Take with warm water after meals',
      quantity: 10,
      hospital_stock_available: true,
      hospital_stock_count: 450
    },
    {
      id: 'item-2',
      prescription_id: 'rx-2026-001',
      medicine_name: 'Amoxicillin 500mg',
      generic_name: 'Amoxicillin',
      strength: '500 mg',
      dosage: '1-0-1',
      frequency: 'Twice daily after food',
      duration_days: 5,
      instructions: 'Complete full 5-day antibiotic course',
      quantity: 10,
      hospital_stock_available: false, // Out of stock at hospital pharmacy!
      hospital_stock_count: 0
    },
    {
      id: 'item-3',
      prescription_id: 'rx-2026-001',
      medicine_name: 'Amlodipine 5mg',
      generic_name: 'Amlodipine',
      strength: '5 mg',
      dosage: '0-0-1',
      frequency: 'Once daily at night',
      duration_days: 30,
      instructions: 'Monitor blood pressure weekly',
      quantity: 30,
      hospital_stock_available: true,
      hospital_stock_count: 1200
    },
    {
      id: 'item-4',
      prescription_id: 'rx-2026-001',
      medicine_name: 'Pantoprazole 40mg',
      generic_name: 'Pantoprazole',
      strength: '40 mg',
      dosage: '1-0-0',
      frequency: 'Once daily before breakfast',
      duration_days: 10,
      instructions: 'Take 30 minutes before morning food',
      quantity: 10,
      hospital_stock_available: true,
      hospital_stock_count: 890
    }
  ]
};

export const NEARBY_PHARMACIES: NearbyPharmacy[] = [
  {
    id: 'pharm-1',
    name: 'Karunya Community Pharmacy (GH Junction)',
    address: 'Near General Hospital Main Gate, Vanchiyoor, Thiruvananthapuram',
    phone: '0471-2472910',
    distance_km: 0.8,
    medicine_name: 'Amoxicillin 500mg',
    generic_name: 'Amoxicillin',
    is_available: true,
    stock_count: 85,
    last_updated: new Date(Date.now() - 8 * 60 * 1000).toISOString() // 8 mins ago
  },
  {
    id: 'pharm-2',
    name: 'Maveli Medical Store (Chalakkuzhi)',
    address: 'Medical College Junction, Thiruvananthapuram',
    phone: '0471-2551022',
    distance_km: 1.2,
    medicine_name: 'Amoxicillin 500mg',
    generic_name: 'Amoxicillin',
    is_available: true,
    stock_count: 140,
    last_updated: new Date(Date.now() - 15 * 60 * 1000).toISOString() // 15 mins ago
  },
  {
    id: 'pharm-3',
    name: 'Neethi Medicals (Plamoodu)',
    address: 'Pattom-PTP Road, Thiruvananthapuram',
    phone: '0471-2309188',
    distance_km: 2.5,
    medicine_name: 'Amoxicillin 500mg',
    generic_name: 'Amoxicillin',
    is_available: true,
    stock_count: 60,
    last_updated: new Date(Date.now() - 42 * 60 * 1000).toISOString()
  }
];

export const INITIAL_BLOOD_BANKS: BloodBank[] = [
  {
    id: 'bb-1',
    hospital_name: 'Government Medical College Blood Bank, Thiruvananthapuram',
    district: 'Thiruvananthapuram',
    address: 'Blood Bank Block, Medical College Campus, Thiruvananthapuram',
    phone: '0471-2528220',
    distance_km: 2.4,
    inventory: {
      'O+': 18,
      'O-': 3,
      'A+': 14,
      'A-': 2,
      'B+': 11,
      'B-': 1,
      'AB+': 7,
      'AB-': 0
    },
    last_updated: new Date(Date.now() - 12 * 60 * 1000).toISOString()
  },
  {
    id: 'bb-2',
    hospital_name: 'General Hospital Regional Blood Centre, Thiruvananthapuram',
    district: 'Thiruvananthapuram',
    address: 'General Hospital Premises, Vanchiyoor, Thiruvananthapuram',
    phone: '0471-2307122',
    distance_km: 4.1,
    inventory: {
      'O+': 12,
      'O-': 1,
      'A+': 8,
      'A-': 0,
      'B+': 15,
      'B-': 4,
      'AB+': 5,
      'AB-': 1
    },
    last_updated: new Date(Date.now() - 25 * 60 * 1000).toISOString()
  },
  {
    id: 'bb-3',
    hospital_name: 'District Hospital Blood Bank, Peroorkada',
    district: 'Thiruvananthapuram',
    address: 'Peroorkada Hospital Junction, Thiruvananthapuram',
    phone: '0471-2438810',
    distance_km: 6.8,
    inventory: {
      'O+': 6,
      'O-': 0,
      'A+': 5,
      'A-': 1,
      'B+': 9,
      'B-': 0,
      'AB+': 2,
      'AB-': 0
    },
    last_updated: new Date(Date.now() - 50 * 60 * 1000).toISOString()
  }
];

export const INITIAL_REPORTS: MedicalReport[] = [
  {
    id: 'rep-1',
    user_id: 'usr-default',
    title: 'Complete Blood Count (CBC) & Lipid Profile',
    type: 'Lab Report',
    date: '2026-08-10',
    hospital_name: 'Government Medical College, Thiruvananthapuram',
    doctor_name: 'Dr. Suresh Kumar, MD',
    file_size: '1.2 MB',
    file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 'rep-2',
    user_id: 'usr-default',
    title: 'OP Consultation Summary & E-Prescription',
    type: 'Prescription',
    date: '2026-08-10',
    hospital_name: 'Government Medical College, Thiruvananthapuram',
    doctor_name: 'Dr. Suresh Kumar, MD',
    file_size: '420 KB',
    file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  },
  {
    id: 'rep-3',
    user_id: 'usr-default',
    title: 'Chest X-Ray Digital View (PA View)',
    type: 'X-Ray / Scan',
    date: '2026-07-28',
    hospital_name: 'Government General Hospital, Thiruvananthapuram',
    doctor_name: 'Dr. Manoj Pillai, MD',
    file_size: '3.8 MB',
    file_url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
  }
];
