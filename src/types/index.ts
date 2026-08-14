import type {
  Hospital,
  Department,
  Doctor,
  DoctorSlot,
  BloodBank,
  NearbyPharmacy,
  Appointment,
  Prescription,
  PrescriptionItem,
  Wallet,
  WalletTransaction,
  MedicalReport,
  NotificationItem,
  BloodAlert,
  Profile,
  FamilyMember,
  SmartSuggestion,
  District,
  LoadStatus,
} from "../types";

/* =========================================================
   HELPERS
   ========================================================= */

const districts: District[] = [
  "Thiruvananthapuram",
  "Kollam",
  "Pathanamthitta",
  "Alappuzha",
  "Kottayam",
  "Idukki",
  "Ernakulam",
  "Thrissur",
  "Palakkad",
  "Malappuram",
  "Kozhikode",
  "Wayanad",
  "Kannur",
  "Kasaragod",
];

const loadStatuses: LoadStatus[] = [
  "Low",
  "Moderate",
  "High",
];

function phone(value: string): string {
  return value;
}

function loadFromScore(score: number): LoadStatus {
  if (score < 35) return "Low";
  if (score < 70) return "Moderate";
  return "High";
}

/* =========================================================
   HOSPITALS
   ========================================================= */

export const hospitals: Hospital[] = [
  /* ---------------- THIRUVANANTHAPURAM ---------------- */

  {
    id: "hosp-tvm-001",
    name: "Government Medical College Thiruvananthapuram",
    code: "MCTVM",
    type: "Government Medical College",
    district: "Thiruvananthapuram",
    address: "Medical College P.O., Thiruvananthapuram, Kerala",
    phone: "0471-2528386",
    latitude: 8.5241,
    longitude: 76.9366,
    current_load: "High",
    load_score: 82,
    departments_count: 25,
  },

  {
    id: "hosp-tvm-002",
    name: "General Hospital Thiruvananthapuram",
    code: "GHTVM",
    type: "General Hospital",
    district: "Thiruvananthapuram",
    address: "General Hospital Road, Thiruvananthapuram, Kerala",
    phone: "0471-2322272",
    latitude: 8.4999,
    longitude: 76.9433,
    current_load: "High",
    load_score: 76,
    departments_count: 18,
  },

  {
    id: "hosp-tvm-003",
    name: "District Hospital Nedumangad",
    code: "DHNED",
    type: "District Hospital",
    district: "Thiruvananthapuram",
    address: "Nedumangad, Thiruvananthapuram, Kerala",
    phone: "0472-2802280",
    latitude: 8.6027,
    longitude: 77.0017,
    current_load: "Moderate",
    load_score: 61,
    departments_count: 12,
  },

  {
    id: "hosp-tvm-004",
    name: "General Hospital Neyyattinkara",
    code: "GHNTK",
    type: "General Hospital",
    district: "Thiruvananthapuram",
    address: "Neyyattinkara, Thiruvananthapuram, Kerala",
    phone: "0471-2222222",
    latitude: 8.3988,
    longitude: 77.0839,
    current_load: "Moderate",
    load_score: 58,
    departments_count: 13,
  },

  {
    id: "hosp-tvm-005",
    name: "Taluk Hospital Varkala",
    code: "THVRK",
    type: "Taluk Hospital",
    district: "Thiruvananthapuram",
    address: "Varkala, Thiruvananthapuram, Kerala",
    phone: "0470-2602211",
    latitude: 8.7379,
    longitude: 76.7163,
    current_load: "Moderate",
    load_score: 48,
    departments_count: 9,
  },

  {
    id: "hosp-tvm-006",
    name: "Community Health Centre Kattakada",
    code: "CHCKTD",
    type: "Community Health Centre",
    district: "Thiruvananthapuram",
    address: "Kattakada, Thiruvananthapuram, Kerala",
    phone: "0472-2292222",
    latitude: 8.4914,
    longitude: 77.0831,
    current_load: "Low",
    load_score: 28,
    departments_count: 5,
  },

  /* ---------------- KOLLAM ---------------- */

  {
    id: "hosp-klm-001",
    name: "District Hospital Kollam",
    code: "DHKLM",
    type: "District Hospital",
    district: "Kollam",
    address: "Hospital Road, Kollam, Kerala",
    phone: "0474-2742004",
    latitude: 8.8875,
    longitude: 76.5954,
    current_load: "High",
    load_score: 79,
    departments_count: 17,
  },

  {
    id: "hosp-klm-002",
    name: "Government Medical College Kollam",
    code: "GMCKLM",
    type: "Government Medical College",
    district: "Kollam",
    address: "Parippally, Kollam, Kerala",
    phone: "0474-2575050",
    latitude: 8.8058,
    longitude: 76.7890,
    current_load: "High",
    load_score: 81,
    departments_count: 22,
  },

  {
    id: "hosp-klm-003",
    name: "Taluk Headquarters Hospital Kottarakkara",
    code: "THQHKTR",
    type: "Taluk Hospital",
    district: "Kollam",
    address: "Kottarakkara, Kollam, Kerala",
    phone: "0474-2452610",
    latitude: 9.0067,
    longitude: 76.7752,
    current_load: "Moderate",
    load_score: 57,
    departments_count: 10,
  },

  {
    id: "hosp-klm-004",
    name: "Taluk Headquarters Hospital Karunagappally",
    code: "THQHKGP",
    type: "Taluk Hospital",
    district: "Kollam",
    address: "Karunagappally, Kollam, Kerala",
    phone: "0476-2626662",
    latitude: 9.0577,
    longitude: 76.5355,
    current_load: "Moderate",
    load_score: 52,
    departments_count: 9,
  },

  {
    id: "hosp-klm-005",
    name: "Community Health Centre Anchal",
    code: "CHCANL",
    type: "Community Health Centre",
    district: "Kollam",
    address: "Anchal, Kollam, Kerala",
    phone: "0475-2272222",
    latitude: 8.9975,
    longitude: 76.8495,
    current_load: "Low",
    load_score: 31,
    departments_count: 5,
  },

  /* ---------------- PATHANAMTHITTA ---------------- */

  {
    id: "hosp-pta-001",
    name: "General Hospital Adoor",
    code: "GHADR",
    type: "General Hospital",
    district: "Pathanamthitta",
    address: "Adoor, Pathanamthitta, Kerala",
    phone: "04734-223236",
    latitude: 9.1579,
    longitude: 76.7319,
    current_load: "Moderate",
    load_score: 59,
    departments_count: 12,
  },

  {
    id: "hosp-pta-002",
    name: "District Hospital Pathanamthitta",
    code: "DHPTA",
    type: "District Hospital",
    district: "Pathanamthitta",
    address: "Pathanamthitta, Kerala",
    phone: "0468-2222222",
    latitude: 9.2648,
    longitude: 76.7870,
    current_load: "Moderate",
    load_score: 64,
    departments_count: 14,
  },

  {
    id: "hosp-pta-003",
    name: "Taluk Headquarters Hospital Ranni",
    code: "THQHRNI",
    type: "Taluk Hospital",
    district: "Pathanamthitta",
    address: "Ranni, Pathanamthitta, Kerala",
    phone: "04735-222222",
    latitude: 9.3833,
    longitude: 76.8167,
    current_load: "Low",
    load_score: 34,
    departments_count: 8,
  },

  {
    id: "hosp-pta-004",
    name: "Community Health Centre Vechoochira",
    code: "CHCVC",
    type: "Community Health Centre",
    district: "Pathanamthitta",
    address: "Vechoochira, Pathanamthitta, Kerala",
    phone: "04735-265476",
    latitude: 9.4090,
    longitude: 76.8900,
    current_load: "Low",
    load_score: 24,
    departments_count: 5,
  },

  /* ---------------- ALAPPUZHA ---------------- */

  {
    id: "hosp-ala-001",
    name: "General Hospital Alappuzha",
    code: "GHALP",
    type: "General Hospital",
    district: "Alappuzha",
    address: "Iron Bridge, Alappuzha, Kerala",
    phone: "0477-2253324",
    latitude: 9.4902,
    longitude: 76.3264,
    current_load: "High",
    load_score: 74,
    departments_count: 17,
  },

  {
    id: "hosp-ala-002",
    name: "District Hospital Mavelikara",
    code: "DHMVK",
    type: "District Hospital",
    district: "Alappuzha",
    address: "Thazhakara P.O., Mavelikara, Kerala",
    phone: "0479-2303394",
    latitude: 9.2605,
    longitude: 76.5536,
    current_load: "Moderate",
    load_score: 62,
    departments_count: 13,
  },

  {
    id: "hosp-ala-003",
    name: "District Hospital Chengannur",
    code: "DHCGR",
    type: "District Hospital",
    district: "Alappuzha",
    address: "Chengannur, Alappuzha, Kerala",
    phone: "0479-2452222",
    latitude: 9.3153,
    longitude: 76.6151,
    current_load: "Moderate",
    load_score: 55,
    departments_count: 11,
  },

  {
    id: "hosp-ala-004",
    name: "Community Health Centre Aroor",
    code: "CHCARO",
    type: "Community Health Centre",
    district: "Alappuzha",
    address: "Aroor, Alappuzha, Kerala",
    phone: "0478-2872931",
    latitude: 9.8696,
    longitude: 76.3044,
    current_load: "Low",
    load_score: 27,
    departments_count: 5,
  },

  /* ---------------- KOTTAYAM ---------------- */

  {
    id: "hosp-ktm-001",
    name: "General Hospital Kottayam",
    code: "GHKTM",
    type: "General Hospital",
    district: "Kottayam",
    address: "General Hospital Junction, Kottayam, Kerala",
    phone: "0481-2563611",
    latitude: 9.5916,
    longitude: 76.5222,
    current_load: "High",
    load_score: 71,
    departments_count: 16,
  },

  {
    id: "hosp-ktm-002",
    name: "Government Medical College Kottayam",
    code: "GMCKTM",
    type: "Government Medical College",
    district: "Kottayam",
    address: "Gandhinagar, Kottayam, Kerala",
    phone: "0481-2597311",
    latitude: 9.5910,
    longitude: 76.5310,
    current_load: "High",
    load_score: 84,
    departments_count: 24,
  },

  {
    id: "hosp-ktm-003",
    name: "Taluk Headquarters Hospital Vaikom",
    code: "THQHVKM",
    type: "Taluk Hospital",
    district: "Kottayam",
    address: "Vaikom, Kottayam, Kerala",
    phone: "04829-222222",
    latitude: 9.7482,
    longitude: 76.3962,
    current_load: "Moderate",
    load_score: 46,
    departments_count: 9,
  },

  {
    id: "hosp-ktm-004",
    name: "K R Narayanan Memorial Speciality Hospital Uzhavoor",
    code: "KRNSH",
    type: "District Hospital",
    district: "Kottayam",
    address: "Uzhavoor, Kottayam, Kerala",
    phone: "04822-241045",
    latitude: 9.8026,
    longitude: 76.6220,
    current_load: "Low",
    load_score: 35,
    departments_count: 7,
  },

  /* ---------------- IDUKKI ---------------- */

  {
    id: "hosp-idk-001",
    name: "District Hospital Idukki",
    code: "DHIDK",
    type: "District Hospital",
    district: "Idukki",
    address: "Painavu, Idukki, Kerala",
    phone: "04862-232222",
    latitude: 9.8500,
    longitude: 76.9500,
    current_load: "Moderate",
    load_score: 52,
    departments_count: 12,
  },

  {
    id: "hosp-idk-002",
    name: "Taluk Hospital Thodupuzha",
    code: "THTDP",
    type: "Taluk Hospital",
    district: "Idukki",
    address: "Thodupuzha, Idukki, Kerala",
    phone: "04862-222222",
    latitude: 9.8959,
    longitude: 76.7180,
    current_load: "Moderate",
    load_score: 49,
    departments_count: 9,
  },

  {
    id: "hosp-idk-003",
    name: "Taluk Hospital Adimali",
    code: "THADM",
    type: "Taluk Hospital",
    district: "Idukki",
    address: "Adimali, Idukki, Kerala",
    phone: "04864-222222",
    latitude: 10.0110,
    longitude: 76.9570,
    current_load: "Low",
    load_score: 33,
    departments_count: 7,
  },

  /* ---------------- ERNAKULAM ---------------- */

  {
    id: "hosp-ekm-001",
    name: "General Hospital Ernakulam",
    code: "GHEKM",
    type: "General Hospital",
    district: "Ernakulam",
    address: "Hospital Road, Ernakulam, Kerala",
    phone: "0484-2386000",
    latitude: 9.9816,
    longitude: 76.2785,
    current_load: "High",
    load_score: 87,
    departments_count: 20,
  },

  {
    id: "hosp-ekm-002",
    name: "Government Medical College Ernakulam",
    code: "GMC EKM",
    type: "Government Medical College",
    district: "Ernakulam",
    address: "Kalamassery, Ernakulam, Kerala",
    phone: "0484-2754000",
    latitude: 10.0505,
    longitude: 76.3295,
    current_load: "High",
    load_score: 89,
    departments_count: 25,
  },

  {
    id: "hosp-ekm-003",
    name: "General Hospital Muvattupuzha",
    code: "GHMVP",
    type: "General Hospital",
    district: "Ernakulam",
    address: "Muvattupuzha, Ernakulam, Kerala",
    phone: "0485-2832360",
    latitude: 9.9830,
    longitude: 76.5770,
    current_load: "Moderate",
    load_score: 64,
    departments_count: 14,
  },

  {
    id: "hosp-ekm-004",
    name: "District Hospital Aluva",
    code: "DHALV",
    type: "District Hospital",
    district: "Ernakulam",
    address: "Aluva, Ernakulam, Kerala",
    phone: "0484-2624040",
    latitude: 10.1076,
    longitude: 76.3516,
    current_load: "Moderate",
    load_score: 66,
    departments_count: 14,
  },

  {
    id: "hosp-ekm-005",
    name: "Taluk Headquarters Hospital Fort Kochi",
    code: "THQHFK",
    type: "Taluk Hospital",
    district: "Ernakulam",
    address: "Fort Kochi, Ernakulam, Kerala",
    phone: "0484-2216444",
    latitude: 9.9639,
    longitude: 76.2420,
    current_load: "Moderate",
    load_score: 54,
    departments_count: 10,
  },

  {
    id: "hosp-ekm-006",
    name: "Taluk Headquarters Hospital Thrippunithura",
    code: "THQHTP",
    type: "Taluk Hospital",
    district: "Ernakulam",
    address: "Thrippunithura, Ernakulam, Kerala",
    phone: "0484-2777415",
    latitude: 9.9482,
    longitude: 76.3406,
    current_load: "Moderate",
    load_score: 48,
    departments_count: 9,
  },

  {
    id: "hosp-ekm-007",
    name: "Taluk Headquarters Hospital Perumbavoor",
    code: "THQHPB",
    type: "Taluk Hospital",
    district: "Ernakulam",
    address: "Perumbavoor, Ernakulam, Kerala",
    phone: "0484-2523138",
    latitude: 10.1100,
    longitude: 76.4730,
    current_load: "Moderate",
    load_score: 45,
    departments_count: 8,
  },

  {
    id: "hosp-ekm-008",
    name: "Taluk Hospital Angamaly",
    code: "THANG",
    type: "Taluk Hospital",
    district: "Ernakulam",
    address: "Angamaly, Ernakulam, Kerala",
    phone: "0484-2455950",
    latitude: 10.1960,
    longitude: 76.3860,
    current_load: "Low",
    load_score: 36,
    departments_count: 7,
  },

  {
    id: "hosp-ekm-009",
    name: "Community Health Centre Pallarimangalam",
    code: "CHCPAL",
    type: "Community Health Centre",
    district: "Ernakulam",
    address: "Koovalloor, Ernakulam, Kerala",
    phone: "0485-2564747",
    latitude: 10.0300,
    longitude: 76.6500,
    current_load: "Low",
    load_score: 25,
    departments_count: 5,
  },

  /* ---------------- THRISSUR ---------------- */

  {
    id: "hosp-tsr-001",
    name: "Government Medical College Thrissur",
    code: "GMCTSR",
    type: "Government Medical College",
    district: "Thrissur",
    address: "Mulankunnathukavu, Thrissur, Kerala",
    phone: "0487-2200310",
    latitude: 10.5900,
    longitude: 76.2100,
    current_load: "High",
    load_score: 85,
    departments_count: 24,
  },

  {
    id: "hosp-tsr-002",
    name: "General Hospital Thrissur",
    code: "GHTSR",
    type: "General Hospital",
    district: "Thrissur",
    address: "Thrissur, Kerala",
    phone: "0487-2427777",
    latitude: 10.5276,
    longitude: 76.2144,
    current_load: "High",
    load_score: 73,
    departments_count: 17,
  },

  {
    id: "hosp-tsr-003",
    name: "District Hospital Thrissur",
    code: "DHTSR",
    type: "District Hospital",
    district: "Thrissur",
    address: "Thrissur, Kerala",
    phone: "0487-2422222",
    latitude: 10.5250,
    longitude: 76.2100,
    current_load: "Moderate",
    load_score: 65,
    departments_count: 14,
  },

  {
    id: "hosp-tsr-004",
    name: "Taluk Headquarters Hospital Chavakkad",
    code: "THQHCVK",
    type: "Taluk Hospital",
    district: "Thrissur",
    address: "Chavakkad, Thrissur, Kerala",
    phone: "0487-2502222",
    latitude: 10.5330,
    longitude: 76.0480,
    current_load: "Moderate",
    load_score: 47,
    departments_count: 8,
  },

  /* ---------------- PALAKKAD ---------------- */

  {
    id: "hosp-pkd-001",
    name: "District Hospital Palakkad",
    code: "DHPKD",
    type: "District Hospital",
    district: "Palakkad",
    address: "Court Road, Palakkad, Kerala",
    phone: "0491-2533327",
    latitude: 10.7867,
    longitude: 76.6548,
    current_load: "High",
    load_score: 72,
    departments_count: 16,
  },

  {
    id: "hosp-pkd-002",
    name: "Taluk Headquarters Hospital Alathur",
    code: "THQHALT",
    type: "Taluk Hospital",
    district: "Palakkad",
    address: "Alathur, Palakkad, Kerala",
    phone: "0492-2224322",
    latitude: 10.6540,
    longitude: 76.5440,
    current_load: "Moderate",
    load_score: 49,
    departments_count: 9,
  },

  {
    id: "hosp-pkd-003",
    name: "Taluk Headquarters Hospital Chittur",
    code: "THQHCTR",
    type: "Taluk Hospital",
    district: "Palakkad",
    address: "Chittur, Palakkad, Kerala",
    phone: "04923-222385",
    latitude: 10.6990,
    longitude: 76.7470,
    current_load: "Moderate",
    load_score: 44,
    departments_count: 8,
  },

  {
    id: "hosp-pkd-004",
    name: "Taluk Headquarters Hospital Ottappalam",
    code: "THQHOTP",
    type: "Taluk Hospital",
    district: "Palakkad",
    address: "Ottappalam, Palakkad, Kerala",
    phone: "0466-2344053",
    latitude: 10.7690,
    longitude: 76.3770,
    current_load: "Moderate",
    load_score: 51,
    departments_count: 9,
  },

  {
    id: "hosp-pkd-005",
    name: "Community Health Centre Agali",
    code: "CHCAGL",
    type: "Community Health Centre",
    district: "Palakkad",
    address: "Agali, Palakkad, Kerala",
    phone: "04924-296921",
    latitude: 11.0900,
    longitude: 76.4500,
    current_load: "Low",
    load_score: 22,
    departments_count: 5,
  },

  /* ---------------- MALAPPURAM ---------------- */

  {
    id: "hosp-mlp-001",
    name: "Government Medical College Manjeri",
    code: "GMCMLP",
    type: "Government Medical College",
    district: "Malappuram",
    address: "Manjeri, Malappuram, Kerala",
    phone: "0483-2764321",
    latitude: 11.1200,
    longitude: 76.1190,
    current_load: "High",
    load_score: 83,
    departments_count: 22,
  },

  {
    id: "hosp-mlp-002",
    name: "District Hospital Tirur",
    code: "DHTIR",
    type: "District Hospital",
    district: "Malappuram",
    address: "Tirur, Malappuram, Kerala",
    phone: "0494-2422222",
    latitude: 10.9137,
    longitude: 75.9210,
    current_load: "High",
    load_score: 70,
    departments_count: 15,
  },

  {
    id: "hosp-mlp-003",
    name: "Taluk Headquarters Hospital Perinthalmanna",
    code: "THQHPM",
    type: "Taluk Hospital",
    district: "Malappuram",
    address: "Perinthalmanna, Malappuram, Kerala",
    phone: "04933-227222",
    latitude: 10.9760,
    longitude: 76.2250,
    current_load: "Moderate",
    load_score: 55,
    departments_count: 10,
  },

  {
    id: "hosp-mlp-004",
    name: "Taluk Hospital Nilambur",
    code: "THNLB",
    type: "Taluk Hospital",
    district: "Malappuram",
    address: "Nilambur, Malappuram, Kerala",
    phone: "04931-220222",
    latitude: 11.2740,
    longitude: 76.2220,
    current_load: "Moderate",
    load_score: 43,
    departments_count: 8,
  },

  /* ---------------- KOZHIKODE ---------------- */

  {
    id: "hosp-kzd-001",
    name: "Government Medical College Kozhikode",
    code: "GMCKZD",
    type: "Government Medical College",
    district: "Kozhikode",
    address: "Medical College Campus, Kozhikode, Kerala",
    phone: "0495-2350216",
    latitude: 11.2588,
    longitude: 75.7804,
    current_load: "High",
    load_score: 91,
    departments_count: 27,
  },

  {
    id: "hosp-kzd-002",
    name: "General Hospital Kozhikode",
    code: "GHKZD",
    type: "General Hospital",
    district: "Kozhikode",
    address: "Kozhikode, Kerala",
    phone: "0495-2374266",
    latitude: 11.2588,
    longitude: 75.7804,
    current_load: "High",
    load_score: 75,
    departments_count: 18,
  },

  {
    id: "hosp-kzd-003",
    name: "Taluk Hospital Balussery",
    code: "THBLS",
    type: "Taluk Hospital",
    district: "Kozhikode",
    address: "Vattoli Bazar, Balussery, Kozhikode",
    phone: "0496-2963150",
    latitude: 11.4480,
    longitude: 75.8310,
    current_load: "Moderate",
    load_score: 46,
    departments_count: 8,
  },

  {
    id: "hosp-kzd-004",
    name: "Taluk Hospital Perambra",
    code: "THPMB",
    type: "Taluk Hospital",
    district: "Kozhikode",
    address: "Perambra, Kozhikode, Kerala",
    phone: "0496-2610575",
    latitude: 11.5650,
    longitude: 75.7550,
    current_load: "Moderate",
    load_score: 41,
    departments_count: 8,
  },

  {
    id: "hosp-kzd-005",
    name: "Taluk Hospital Nadapuram",
    code: "THNDP",
    type: "Taluk Hospital",
    district: "Kozhikode",
    address: "Nadapuram, Kozhikode, Kerala",
    phone: "0496-2552480",
    latitude: 11.6840,
    longitude: 75.6570,
    current_load: "Moderate",
    load_score: 44,
    departments_count: 8,
  },

  {
    id: "hosp-kzd-006",
    name: "Community Health Centre Koduvally",
    code: "CHCKDV",
    type: "Community Health Centre",
    district: "Kozhikode",
    address: "Koduvally, Kozhikode, Kerala",
    phone: "0495-2214590",
    latitude: 11.3550,
    longitude: 75.9160,
    current_load: "Low",
    load_score: 28,
    departments_count: 5,
  },

  /* ---------------- WAYANAD ---------------- */

  {
    id: "hosp-wyd-001",
    name: "District Hospital Mananthavady",
    code: "DHMND",
    type: "District Hospital",
    district: "Wayanad",
    address: "Mananthavady, Wayanad, Kerala",
    phone: "04935-240222",
    latitude: 11.8000,
    longitude: 76.0000,
    current_load: "Moderate",
    load_score: 58,
    departments_count: 12,
  },

  {
    id: "hosp-wyd-002",
    name: "Taluk Hospital Sulthan Bathery",
    code: "THSBY",
    type: "Taluk Hospital",
    district: "Wayanad",
    address: "Sulthan Bathery, Wayanad, Kerala",
    phone: "04936-220222",
    latitude: 11.6640,
    longitude: 76.2570,
    current_load: "Moderate",
    load_score: 48,
    departments_count: 8,
  },

  {
    id: "hosp-wyd-003",
    name: "Taluk Hospital Vythiri",
    code: "THVYT",
    type: "Taluk Hospital",
    district: "Wayanad",
    address: "Vythiri, Wayanad, Kerala",
    phone: "04936-255222",
    latitude: 11.5510,
    longitude: 76.0420,
    current_load: "Low",
    load_score: 31,
    departments_count: 7,
  },

  /* ---------------- KANNUR ---------------- */

  {
    id: "hosp-knr-001",
    name: "Government Medical College Kannur",
    code: "GMCKNR",
    type: "Government Medical College",
    district: "Kannur",
    address: "Pariyaram, Kannur, Kerala",
    phone: "0497-2808000",
    latitude: 12.1160,
    longitude: 75.3120,
    current_load: "High",
    load_score: 82,
    departments_count: 22,
  },

  {
    id: "hosp-knr-002",
    name: "District Hospital Kannur",
    code: "DHKNR",
    type: "District Hospital",
    district: "Kannur",
    address: "Kannur, Kerala",
    phone: "0497-2702222",
    latitude: 11.8745,
    longitude: 75.3704,
    current_load: "High",
    load_score: 69,
    departments_count: 15,
  },

  {
    id: "hosp-knr-003",
    name: "Taluk Hospital Thalassery",
    code: "THTLY",
    type: "Taluk Hospital",
    district: "Kannur",
    address: "Thalassery, Kannur, Kerala",
    phone: "0490-2322222",
    latitude: 11.7480,
    longitude: 75.4890,
    current_load: "Moderate",
    load_score: 53,
    departments_count: 9,
  },

  {
    id: "hosp-knr-004",
    name: "Taluk Hospital Payyannur",
    code: "THPYN",
    type: "Taluk Hospital",
    district: "Kannur",
    address: "Payyannur, Kannur, Kerala",
    phone: "04985-222222",
    latitude: 12.1000,
    longitude: 75.2000,
    current_load: "Moderate",
    load_score: 42,
    departments_count: 8,
  },

  /* ---------------- KASARAGOD ---------------- */

  {
    id: "hosp-ksd-001",
    name: "General Hospital Kasaragod",
    code: "GHKSD",
    type: "General Hospital",
    district: "Kasaragod",
    address: "Kasaragod, Kerala",
    phone: "04994-230222",
    latitude: 12.4996,
    longitude: 74.9869,
    current_load: "Moderate",
    load_score: 61,
    departments_count: 14,
  },

  {
    id: "hosp-ksd-002",
    name: "District Hospital Kanhangad",
    code: "DHKHD",
    type: "District Hospital",
    district: "Kasaragod",
    address: "Kanhangad, Kasaragod, Kerala",
    phone: "0467-2202222",
    latitude: 12.3080,
    longitude: 75.1000,
    current_load: "Moderate",
    load_score: 55,
    departments_count: 12,
  },

  {
    id: "hosp-ksd-003",
    name: "Taluk Hospital Nileshwar",
    code: "THNLR",
    type: "Taluk Hospital",
    district: "Kasaragod",
    address: "Nileshwar, Kasaragod, Kerala",
    phone: "0467-2282222",
    latitude: 12.2570,
    longitude: 75.1290,
    current_load: "Low",
    load_score: 35,
    departments_count: 7,
  },
];

/* =========================================================
   DEPARTMENTS
   ========================================================= */

const departmentTemplates = [
  {
    name: "General Medicine",
    code: "GENMED",
    description: "Diagnosis and treatment of adult medical conditions",
  },
  {
    name: "General Surgery",
    code: "SURGERY",
    description: "Surgical consultation and treatment",
  },
  {
    name: "Pediatrics",
    code: "PED",
    description: "Medical care for infants, children and adolescents",
  },
  {
    name: "Orthopedics",
    code: "ORTHO",
    description: "Bone, joint and musculoskeletal care",
  },
  {
    name: "ENT",
    code: "ENT",
    description: "Ear, nose and throat services",
  },
  {
    name: "Dermatology",
    code: "DERMA",
    description: "Skin and related conditions",
  },
  {
    name: "Ophthalmology",
    code: "OPHTHAL",
    description: "Eye care and treatment",
  },
  {
    name: "Obstetrics & Gynecology",
    code: "OBGYN",
    description: "Women's health and maternity care",
  },
  {
    name: "Cardiology",
    code: "CARDIO",
    description: "Heart and cardiovascular care",
  },
  {
    name: "Psychiatry",
    code: "PSY",
    description: "Mental health services",
  },
];

export const departments: Department[] = [];

hospitals.forEach((hospital) => {
  const count = Math.min(
    hospital.departments_count || 5,
    departmentTemplates.length
  );

  for (let i = 0; i < count; i++) {
    const template = departmentTemplates[i];

    const departmentId =
      `${hospital.id}-dept-${template.code.toLowerCase()}`;

    const baseToken =
      (hospital.load_score || 40) + i * 3;

    departments.push({
      id: departmentId,
      hospital_id: hospital.id,
      name: template.name,
      code: template.code,
      description: template.description,
      room_number: `OP-${String(i + 1).padStart(2, "0")}`,
      floor: i < 4 ? "Ground Floor" : `${Math.floor(i / 4) + 1} Floor`,
      current_token: `${template.code.substring(0, 2)}-${String(
        baseToken
      ).padStart(3, "0")}`,
      people_waiting: Math.max(
        3,
        Math.round((hospital.load_score || 30) / 4) - i
      ),
      avg_wait_mins: Math.max(
        10,
        Math.round((hospital.load_score || 30) * 0.55) - i * 2
      ),
      load_status: loadFromScore(
        Math.max(10, (hospital.load_score || 30) - i * 4)
      ),
      online_booking_enabled: hospital.type !== "Community Health Centre",
    });
  }
});

/* =========================================================
   DOCTORS
   ========================================================= */

const doctorNames = [
  "Dr. Anil Kumar",
  "Dr. Priya Nair",
  "Dr. Rahul Menon",
  "Dr. Meera Thomas",
  "Dr. Arun Raj",
  "Dr. Neha Joseph",
  "Dr. Vishnu Prasad",
  "Dr. Anjali Suresh",
  "Dr. Sreejith Kumar",
  "Dr. Lakshmi Menon",
  "Dr. Nithin Varghese",
  "Dr. Amritha Raj",
];

const qualifications = [
  "MBBS, MD",
  "MBBS, MS",
  "MBBS, DNB",
  "MBBS, MD, DNB",
];

export const doctors: Doctor[] = [];

departments.forEach((department, departmentIndex) => {
  const hospital = hospitals.find(
    (h) => h.id === department.hospital_id
  );

  if (!hospital) return;

  const doctorCount =
    hospital.type === "Government Medical College"
      ? 3
      : hospital.type === "General Hospital"
      ? 2
      : 1;

  for (let i = 0; i < doctorCount; i++) {
    const doctorIndex =
      (departmentIndex + i) % doctorNames.length;

    const doctorId =
      `${department.id}-doctor-${i + 1}`;

    doctors.push({
      id: doctorId,
      department_id: department.id,
      hospital_id: hospital.id,
      full_name: doctorNames[doctorIndex],
      qualification:
        qualifications[
          (departmentIndex + i) % qualifications.length
        ],
      specialization: department.name,
      is_available_today:
        hospital.load_score < 90 || i === 0,
      booked_appointments_count:
        Math.max(
          4,
          Math.round(
            hospital.load_score * 0.25
          )
        ),
      max_capacity:
        hospital.type === "Government Medical College"
          ? 40
          : 30,
      estimated_load: hospital.current_load,
      next_available_slot:
        i === 0
          ? "09:30 AM"
          : i === 1
          ? "11:00 AM"
          : "02:30 PM",
      rating:
        Number(
          (
            4 +
            ((doctorIndex * 7) % 10) / 10
          ).toFixed(1)
        ),
    });
  }
});

/* =========================================================
   DOCTOR SLOTS
   ========================================================= */

export const doctorSlots: DoctorSlot[] = [];

const slots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
];

doctors.forEach((doctor, doctorIndex) => {
  slots.forEach((time, slotIndex) => {
    const booked =
      (doctorIndex + slotIndex) % 4;

    const maxTokens = 5;

    doctorSlots.push({
      id: `${doctor.id}-slot-${slotIndex + 1}`,
      doctor_id: doctor.id,
      time_slot: time,
      is_available: booked < maxTokens,
      max_tokens: maxTokens,
      booked_tokens: booked,
    });
  });
});

/* =========================================================
   BLOOD BANKS
   ========================================================= */

export const bloodBanks: BloodBank[] = hospitals
  .filter(
    (hospital) =>
      hospital.type === "Government Medical College" ||
      hospital.type === "General Hospital" ||
      hospital.type === "District Hospital"
  )
  .map((hospital, index) => {
    const inventory = {
      "A+": 12 + index,
      "A-": 3 + (index % 4),
      "B+": 14 + index,
      "B-": 4 + (index % 3),
      "AB+": 7 + (index % 5),
      "AB-": 2 + (index % 3),
      "O+": 18 + index,
      "O-": 5 + (index % 4),
    };

    return {
      id: `blood-${hospital.id}`,
      hospital_name: hospital.name,
      district: hospital.district,
      address: hospital.address,
      phone: hospital.phone,
      distance_km: Number(
        (1.5 + (index % 8) * 0.7).toFixed(1)
      ),
      inventory,
      last_updated: new Date().toISOString(),
    };
  });

/* =========================================================
   PHARMACIES
   ========================================================= */

const medicines = [
  {
    medicine_name: "Paracetamol 500 mg",
    generic_name: "Paracetamol",
  },
  {
    medicine_name: "Amoxicillin 500 mg",
    generic_name: "Amoxicillin",
  },
  {
    medicine_name: "Cetirizine 10 mg",
    generic_name: "Cetirizine",
  },
  {
    medicine_name: "Pantoprazole 40 mg",
    generic_name: "Pantoprazole",
  },
  {
    medicine_name: "Azithromycin 500 mg",
    generic_name: "Azithromycin",
  },
];

export const pharmacies: NearbyPharmacy[] = [];

hospitals.forEach((hospital, hospitalIndex) => {
  medicines.forEach((medicine, medicineIndex) => {
    pharmacies.push({
      id: `pharmacy-${hospital.id}-${medicineIndex}`,
      name: `${hospital.name} Pharmacy`,
      address: hospital.address,
      phone: hospital.phone,
      distance_km: Number(
        (0.2 + medicineIndex * 0.15).toFixed(1)
      ),
      medicine_name: medicine.medicine_name,
      generic_name: medicine.generic_name,
      is_available:
        (hospitalIndex + medicineIndex) % 5 !== 0,
      stock_count:
        10 +
        ((hospitalIndex * 13 + medicineIndex * 7) % 90),
      last_updated: new Date().toISOString(),
    });
  });
});

/* =========================================================
   APPOINTMENTS
   ========================================================= */

export const appointments: Appointment[] = [
  {
    id: "apt-001",
    booking_reference: "QC-2026-000421",
    user_id: "user-demo-001",
    patient_name: "Athul Krishna",
    patient_relationship: "Myself",
    patient_uhid: "QC-UHID-100001",
    patient_age: 20,
    patient_gender: "Male",
    visit_type: "New Visit",
    hospital_id: "hosp-tvm-001",
    hospital_name:
      "Government Medical College Thiruvananthapuram",
    department_id:
      "hosp-tvm-001-dept-general medicine",
    department_name: "General Medicine",
    doctor_id:
      "hosp-tvm-001-dept-genmed-doctor-1",
    doctor_name: "Dr. Anil Kumar",
    appointment_date: "2026-08-14",
    appointment_time: "10:30 AM",
    token_number: "GM-042",
    queue_position: 11,
    now_serving_token: "GM-031",
    estimated_wait_mins: 35,
    fee_paid: 2,
    payment_method: "QCare Health Balance",
    payment_status: "Paid",
    status: "Confirmed",
    created_at: new Date().toISOString(),
    qr_code_data: "QC-2026-000421",
  },
];

/* =========================================================
   PRESCRIPTIONS
   ========================================================= */

export const prescriptionItems: PrescriptionItem[] = [
  {
    id: "pres-item-001",
    prescription_id: "pres-001",
    medicine_name: "Paracetamol 500 mg",
    generic_name: "Paracetamol",
    strength: "500 mg",
    dosage: "1-0-1",
    frequency: "Twice daily after food",
    duration_days: 5,
    instructions: "Take after meals",
    quantity: 10,
    hospital_stock_available: true,
    hospital_stock_count: 240,
  },

  {
    id: "pres-item-002",
    prescription_id: "pres-001",
    medicine_name: "Cetirizine 10 mg",
    generic_name: "Cetirizine",
    strength: "10 mg",
    dosage: "0-0-1",
    frequency: "Once daily at night",
    duration_days: 5,
    instructions: "May cause drowsiness",
    quantity: 5,
    hospital_stock_available: true,
    hospital_stock_count: 85,
  },
];

export const prescriptions: Prescription[] = [
  {
    id: "pres-001",
    appointment_id: "apt-001",
    doctor_name: "Dr. Anil Kumar",
    hospital_name:
      "Government Medical College Thiruvananthapuram",
    department_name: "General Medicine",
    date: "2026-08-14",
    diagnosis: "Viral fever",
    items: prescriptionItems,
  },
];

/* =========================================================
   WALLETS
   ========================================================= */

export const wallets: Wallet[] = [
  {
    user_id: "user-demo-001",
    balance: 497,
    last_updated: new Date().toISOString(),
  },
];

export const walletTransactions: WalletTransaction[] = [
  {
    id: "wallet-tx-001",
    user_id: "user-demo-001",
    date: "2026-08-14",
    description: "OP Appointment Booking",
    type: "Debit",
    amount: 2,
    balance_after: 498,
    reference_id: "QC-2026-000421",
  },

  {
    id: "wallet-tx-002",
    user_id: "user-demo-001",
    date: "2026-08-13",
    description: "Wallet Recharge",
    type: "Credit",
    amount: 500,
    balance_after: 500,
    reference_id: "RECHARGE-001",
  },
];

/* =========================================================
   MEDICAL REPORTS
   ========================================================= */

export const medicalReports: MedicalReport[] = [
  {
    id: "report-001",
    user_id: "user-demo-001",
    title: "OP Consultation Report",
    type: "OP Consultation",
    date: "2026-08-14",
    hospital_name:
      "Government Medical College Thiruvananthapuram",
    doctor_name: "Dr. Anil Kumar",
    file_size: "245 KB",
    file_url: "/reports/op-consultation-001.pdf",
  },

  {
    id: "report-002",
    user_id: "user-demo-001",
    title: "Blood Test Report",
    type: "Lab Report",
    date: "2026-08-10",
    hospital_name:
      "Government Medical College Thiruvananthapuram",
    doctor_name: "Dr. Priya Nair",
    file_size: "182 KB",
    file_url: "/reports/lab-report-001.pdf",
  },
];

/* =========================================================
   NOTIFICATIONS
   ========================================================= */

export const notifications: NotificationItem[] = [
  {
    id: "notification-001",
    user_id: "user-demo-001",
    title: "Appointment Confirmed",
    message:
      "Your OP appointment QC-2026-000421 has been confirmed.",
    category: "OP",
    is_read: false,
    created_at: new Date().toISOString(),
    link_path: "/appointments",
  },

  {
    id: "notification-002",
    user_id: "user-demo-001",
    title: "Queue Update",
    message:
      "Your token GM-042 is currently 11 positions away.",
    category: "Queue",
    is_read: false,
    created_at: new Date().toISOString(),
    link_path: "/live-queue",
  },

  {
    id: "notification-003",
    user_id: "user-demo-001",
    title: "Medicine Available",
    message:
      "Your prescribed Paracetamol is available at the hospital pharmacy.",
    category: "Medicine",
    is_read: true,
    created_at: new Date().toISOString(),
    link_path: "/medicine",
  },
];

/* =========================================================
   BLOOD ALERTS
   ========================================================= */

export const bloodAlerts: BloodAlert[] = [
  {
    id: "blood-alert-001",
    user_id: "user-demo-001",
    blood_group: "O+",
    district: "Thiruvananthapuram",
    radius_km: 10,
    patient_name: "Sample Patient",
    phone: "9000000000",
    is_active: true,
    created_at: new Date().toISOString(),
  },
];

/* =========================================================
   DEMO PROFILE
   ========================================================= */

export const demoProfile: Profile = {
  id: "user-demo-001",
  uhid: "QC-UHID-100001",
  phone: "9000000000",
  full_name: "Athul Krishna",
  date_of_birth: "2006-01-01",
  gender: "Male",
  blood_group: "O+",
  address: "Thiruvananthapuram, Kerala",
  district: "Thiruvananthapuram",
  preferred_language: "en",
  created_at: new Date().toISOString(),
  is_profile_complete: true,
};

/* =========================================================
   FAMILY MEMBERS
   ========================================================= */

export const familyMembers: FamilyMember[] = [
  {
    id: "family-001",
    user_id: "user-demo-001",
    relationship: "Parent",
    full_name: "Demo Parent",
    phone: "9000000001",
    date_of_birth: "1975-05-10",
    gender: "Male",
    blood_group: "B+",
    uhid: "QC-UHID-100002",
  },

  {
    id: "family-002",
    user_id: "user-demo-001",
    relationship: "Sibling",
    full_name: "Demo Sibling",
    phone: "9000000002",
    date_of_birth: "2009-09-15",
    gender: "Female",
    blood_group: "O+",
    uhid: "QC-UHID-100003",
  },
];

/* =========================================================
   SMART SUGGESTION
   ========================================================= */

export const smartSuggestion: SmartSuggestion = {
  suggestedHospitalId: "hosp-tvm-006",
  suggestedHospitalName:
    "Community Health Centre Kattakada",
  estimatedWaitSelectedMins: 35,
  estimatedWaitSuggestedMins: 12,
  reason:
    "This nearby facility currently has a lower queue load and shorter estimated waiting time.",
};

/* =========================================================
   FILTER HELPERS
   ========================================================= */

export function getHospitalsByDistrict(
  district: District
): Hospital[] {
  return hospitals.filter(
    (hospital) => hospital.district === district
  );
}

export function getDepartmentsByHospital(
  hospitalId: string
): Department[] {
  return departments.filter(
    (department) =>
      department.hospital_id === hospitalId
  );
}

export function getDoctorsByHospital(
  hospitalId: string
): Doctor[] {
  return doctors.filter(
    (doctor) =>
      doctor.hospital_id === hospitalId
  );
}

export function getDoctorsByDepartment(
  departmentId: string
): Doctor[] {
  return doctors.filter(
    (doctor) =>
      doctor.department_id === departmentId
  );
}

export function getSlotsByDoctor(
  doctorId: string
): DoctorSlot[] {
  return doctorSlots.filter(
    (slot) =>
      slot.doctor_id === doctorId
  );
}

export function getHospitalById(
  hospitalId: string
): Hospital | undefined {
  return hospitals.find(
    (hospital) =>
      hospital.id === hospitalId
  );
}

export function getDepartmentById(
  departmentId: string
): Department | undefined {
  return departments.find(
    (department) =>
      department.id === departmentId
  );
}

export function getDoctorById(
  doctorId: string
): Doctor | undefined {
  return doctors.find(
    (doctor) =>
      doctor.id === doctorId
  );
}

/* =========================================================
   NEARBY HOSPITAL CALCULATION
   ========================================================= */

function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371;

  const dLat =
    ((lat2 - lat1) * Math.PI) / 180;

  const dLon =
    ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c =
    2 * Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
}

export function getNearbyHospitals(
  latitude: number,
  longitude: number,
  maxDistanceKm = 25
): Hospital[] {
  return hospitals
    .map((hospital) => ({
      ...hospital,
      distance_km: Number(
        calculateDistance(
          latitude,
          longitude,
          hospital.latitude,
          hospital.longitude
        ).toFixed(2)
      ),
    }))
    .filter(
      (hospital) =>
        hospital.distance_km! <= maxDistanceKm
    )
    .sort(
      (a, b) =>
        a.distance_km! -
        b.distance_km!
    );
}

/* =========================================================
   SEARCH
   ========================================================= */

export function searchHospitals(
  query: string
): Hospital[] {
  const q = query
    .trim()
    .toLowerCase();

  if (!q) return hospitals;

  return hospitals.filter(
    (hospital) =>
      hospital.name
        .toLowerCase()
        .includes(q) ||
      hospital.district
        .toLowerCase()
        .includes(q) ||
      hospital.type
        .toLowerCase()
        .includes(q) ||
      hospital.address
        .toLowerCase()
        .includes(q)
  );
}

/* =========================================================
   SUMMARY
   ========================================================= */

export const queuecareDataSummary = {
  districts: districts.length,
  hospitals: hospitals.length,
  departments: departments.length,
  doctors: doctors.length,
  doctorSlots: doctorSlots.length,
  bloodBanks: bloodBanks.length,
  pharmacies: pharmacies.length,
  appointments: appointments.length,
  prescriptions: prescriptions.length,
  medicalReports: medicalReports.length,
  notifications: notifications.length,
};