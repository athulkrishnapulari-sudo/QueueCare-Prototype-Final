import { Hospital, Department, Doctor, DoctorSlot, District } from '../types';
import { INITIAL_DEPARTMENTS, INITIAL_DOCTORS, INITIAL_SLOTS } from '../lib/seedData';

const hospitalsApiBaseUrl =
  (import.meta.env.VITE_HOSPITALS_API_URL as string | undefined) ||
  (import.meta.env.VITE_API_BASE_URL as string | undefined);

const normalizeLoad = (value?: string): Hospital['current_load'] => {
  if (value === 'High') return 'High';
  if (value === 'Medium' || value === 'Moderate') return 'Moderate';
  return 'Low';
};

const normalizeHospitalRecord = (item: any): Hospital => ({
  id: item.id,
  name: item.name,
  code: item.id || 'HOSP',
  type: item.type || 'Government Hospital',
  district: item.district as District,
  address: item.address || '',
  phone: item.phone || '',
  latitude: 0,
  longitude: 0,
  current_load: normalizeLoad(item.current_load),
  load_score:
    item.current_load === 'High' ? 85 :
    item.current_load === 'Medium' || item.current_load === 'Moderate' ? 55 :
    30,
  distance_km: undefined,
  image_url: undefined,
  departments_count: undefined
});

const HOSPITAL_DIRECTORY_DATA = [
  { id: 'h1', name: 'General Hospital, Thiruvananthapuram', district: 'Thiruvananthapuram', address: 'General Hospital Junction, Thiruvananthapuram - 695035', phone: '0471-2301181', type: 'Government General Hospital', current_load: 'High' },
  { id: 'h2', name: 'Government Medical College, Thiruvananthapuram', district: 'Thiruvananthapuram', address: 'Medical College PO, Thiruvananthapuram', phone: '0471-2528300', type: 'Government Medical College', current_load: 'High' },
  { id: 'h3', name: 'Government District Model Hospital, Peroorkada', district: 'Thiruvananthapuram', address: 'Peroorkada, Thiruvananthapuram', phone: '0471-2434762', type: 'Government District Hospital', current_load: 'Medium' },
  { id: 'h4', name: 'Rajbhavan Dispensary, Kowdiar', district: 'Thiruvananthapuram', address: 'K G Camp PO, Vellayambalam, Thiruvananthapuram - 695587', phone: '0471-2453354', type: 'Government Dispensary', current_load: 'Low' },
  { id: 'h5', name: 'MLA Hostel Health Clinic', district: 'Thiruvananthapuram', address: 'MLA Hostel, Thiruvananthapuram - 695033', phone: '0471-2222251', type: 'Government Health Clinic', current_load: 'Low' },
  { id: 'h6', name: 'Jail Dispensary, Kattakada', district: 'Thiruvananthapuram', address: 'Kattakada, Thiruvananthapuram - 695572', phone: '0472-2850044', type: 'Government Dispensary', current_load: 'Low' },
  { id: 'h7', name: 'Palayam Police Hospital', district: 'Thiruvananthapuram', address: 'Palayam, Thiruvananthapuram - 695001', phone: '0471-2320746', type: 'Government Dispensary', current_load: 'Low' },
  { id: 'h8', name: 'GD Police Hospital, Peroorkada', district: 'Thiruvananthapuram', address: 'Peroorkada, Thiruvananthapuram - 695005', phone: '0471-2433949', type: 'Government Dispensary', current_load: 'Low' },
  { id: 'h9', name: 'AA Rahim Memorial District Hospital, Kollam', district: 'Kollam', address: 'Hospital Road, Kollam - 691001', phone: '0474-2742004', type: 'Government District Hospital', current_load: 'High' },
  { id: 'h10', name: 'Government Medical College, Kollam', district: 'Kollam', address: 'Parippally, Kollam', phone: '8547951381', type: 'Government Medical College', current_load: 'High' },
  { id: 'h11', name: 'Taluk Headquarters Hospital, Kottarakkara', district: 'Kollam', address: 'Kottarakkara, Kollam - 691506', phone: '0474-2452610', type: 'Government Taluk Hospital', current_load: 'Medium' },
  { id: 'h12', name: 'Taluk Headquarters Hospital, Karunagappally', district: 'Kollam', address: 'Karunagappally, Kollam - 690518', phone: '0476-2626662', type: 'Government Taluk Hospital', current_load: 'Medium' },
  { id: 'h13', name: 'GD Police Hospital, Kollam', district: 'Kollam', address: 'Commissioner Office, Kollam - 691001', phone: '', type: 'Government Dispensary', current_load: 'Low' },
  { id: 'h14', name: 'General Hospital, Pathanamthitta', district: 'Pathanamthitta', address: 'Pathanamthitta PO, Pathanamthitta - 689645', phone: '0468-2222344', type: 'Government General Hospital', current_load: 'High' },
  { id: 'h15', name: 'General Hospital, Adoor', district: 'Pathanamthitta', address: 'Adoor PO, Pathanamthitta', phone: '', type: 'Government General Hospital', current_load: 'Medium' },
  { id: 'h16', name: 'Government Dispensary, Pamba', district: 'Pathanamthitta', address: 'Pamba Triveni PO, Ranni - 689662', phone: '04735-203318', type: 'Government Dispensary', current_load: 'Medium' },
  { id: 'h17', name: 'General Hospital, Alappuzha', district: 'Alappuzha', address: 'Near Kottaram Building, Iron Bridge PO, Alappuzha - 688012', phone: '0477-2253324', type: 'Government General Hospital', current_load: 'High' },
  { id: 'h18', name: 'District Hospital, Mavelikara', district: 'Alappuzha', address: 'Thazhakara PO, Mavelikara - 690102', phone: '0479-2303394', type: 'Government District Hospital', current_load: 'High' },
  { id: 'h19', name: 'District Hospital, Chengannur', district: 'Alappuzha', address: 'Chengannur - 689121', phone: '0477-2248668', type: 'Government District Hospital', current_load: 'Medium' },
  { id: 'h20', name: 'Women & Children Hospital, Alappuzha', district: 'Alappuzha', address: 'Bazar PO, Alappuzha - 688012', phone: '0477-2251151', type: 'Government Women & Children Hospital', current_load: 'Medium' },
  { id: 'h21', name: 'General Hospital, Kottayam', district: 'Kottayam', address: 'General Hospital, Kottayam - 686001', phone: '0481-2563611', type: 'Government General Hospital', current_load: 'High' },
  { id: 'h22', name: 'K.R. Narayanan Memorial Speciality Hospital, Uzhavoor', district: 'Kottayam', address: 'Uzhavoor PO, Kottayam - 686634', phone: '04822-241045', type: 'Government Speciality Hospital', current_load: 'Medium' },
  { id: 'h23', name: 'General Hospital, Idukki', district: 'Idukki', address: 'Idukki District', phone: '', type: 'Government General Hospital', current_load: 'Medium' },
  { id: 'h24', name: 'Taluk Headquarters Hospital, Adimaly', district: 'Idukki', address: 'Adimaly, Idukki', phone: '', type: 'Government Taluk Hospital', current_load: 'Medium' },
  { id: 'h25', name: 'Mobile Medical Dispensary, Munnar', district: 'Idukki', address: 'Munnar, HQ Adimaly, Idukki', phone: '9074204027', type: 'Government Mobile Dispensary', current_load: 'Low' },
  { id: 'h26', name: 'General Hospital, Ernakulam', district: 'Ernakulam', address: 'Hospital Road, Ernakulam - 682011', phone: '0484-2386000', type: 'Government General Hospital', current_load: 'High' },
  { id: 'h27', name: 'General Hospital, Muvattupuzha', district: 'Ernakulam', address: 'Muvattupuzha PO, Ernakulam - 686661', phone: '0485-2832360', type: 'Government General Hospital', current_load: 'Medium' },
  { id: 'h28', name: 'District Hospital, Aluva', district: 'Ernakulam', address: 'Aluva PO, Aluva - 683101', phone: '0484-2624040', type: 'Government District Hospital', current_load: 'High' },
  { id: 'h29', name: 'Taluk Headquarters Hospital, Fort Kochi', district: 'Ernakulam', address: 'Fort Kochi, Ernakulam - 682001', phone: '0484-2216444', type: 'Government Taluk Hospital', current_load: 'Medium' },
  { id: 'h30', name: 'Government Dispensary, High Court', district: 'Ernakulam', address: 'Ground Floor, High Court Building, Ernakulam - 682031', phone: '0484-2562063', type: 'Government Dispensary', current_load: 'Low' },
  { id: 'h31', name: 'General Hospital, Thrissur', district: 'Thrissur', address: 'Swaraj Round, Thrissur - 680001', phone: '0487-2427778', type: 'Government General Hospital', current_load: 'High' },
  { id: 'h32', name: 'General Hospital, Irinjalakuda', district: 'Thrissur', address: 'Irinjalakuda - 680121', phone: '0480-2833710', type: 'Government General Hospital', current_load: 'Medium' },
  { id: 'h33', name: 'District Hospital, Wadakkanchery', district: 'Thrissur', address: 'Oottupara, Engakkad PO, Wadakkanchery - 680590', phone: '04884-235214', type: 'Government District Hospital', current_load: 'Medium' },
  { id: 'h34', name: 'Taluk Headquarters Hospital, Chavakkad', district: 'Thrissur', address: 'Chavakkad - 680506', phone: '0487-2501110', type: 'Government Taluk Hospital', current_load: 'Medium' },
  { id: 'h35', name: 'Government Dispensary, Chimminidam', district: 'Thrissur', address: 'Chimminidam, Thrissur - 680304', phone: '9496402281', type: 'Government Dispensary', current_load: 'Low' },
  { id: 'h36', name: 'Government Dispensary, Peechi', district: 'Thrissur', address: 'Peechi PO, Thrissur - 680653', phone: '0487-2699760', type: 'Government Dispensary', current_load: 'Low' },
  { id: 'h37', name: 'District Hospital, Palakkad', district: 'Palakkad', address: 'Court Road, Palakkad - 678001', phone: '0491-2533327', type: 'Government District Hospital', current_load: 'High' },
  { id: 'h38', name: 'Taluk Headquarters Hospital, Alathur', district: 'Palakkad', address: 'Court Road, Alathur, Palakkad - 678541', phone: '0492-2224322', type: 'Government Taluk Hospital', current_load: 'Medium' },
  { id: 'h39', name: 'Taluk Headquarters Hospital, Chittur', district: 'Palakkad', address: 'Chittur, Palakkad - 678101', phone: '04923-222385', type: 'Government Taluk Hospital', current_load: 'Medium' },
  { id: 'h40', name: 'Taluk Headquarters Hospital, Ottappalam', district: 'Palakkad', address: 'Ottappalam, Palakkad - 679104', phone: '0466-2344053', type: 'Government Taluk Hospital', current_load: 'Medium' },
  { id: 'h41', name: 'Attappady Tribal Taluk Speciality Hospital', district: 'Palakkad', address: 'Kottathara, Palakkad - 678581', phone: '', type: 'Government Tribal Speciality Hospital', current_load: 'Medium' },
  { id: 'h42', name: 'KAP Dispensary, Puduperiyaram', district: 'Palakkad', address: 'KAP2, Muttikkulangara, Palakkad - 678594', phone: '0491-2555212', type: 'Government Dispensary', current_load: 'Low' },
  { id: 'h43', name: 'Government Dispensary, Nelliyampathy', district: 'Palakkad', address: 'Pulayampara, Nelliyampathy, Palakkad - 678508', phone: '', type: 'Government Dispensary', current_load: 'Low' },
  { id: 'h44', name: 'Government Forest Dispensary, Walayar', district: 'Palakkad', address: 'State Forest Training Institute, Dam Road, Walayar, Palakkad - 678624', phone: '0487-2633799', type: 'Government Dispensary', current_load: 'Low' },
  { id: 'h45', name: 'District Hospital, Tirur', district: 'Malappuram', address: 'Tirur, Malappuram', phone: '', type: 'Government District Hospital', current_load: 'High' },
  { id: 'h46', name: 'Government Medical College, Manjeri', district: 'Malappuram', address: 'Manjeri, Malappuram - 676121', phone: '', type: 'Government Medical College', current_load: 'High' },
  { id: 'h47', name: 'GD Police Dispensary, Areacode', district: 'Malappuram', address: 'Areacode, Malappuram', phone: '', type: 'Government Dispensary', current_load: 'Low' },
  { id: 'h48', name: 'Government Forest Dispensary, Veliyancode', district: 'Malappuram', address: 'Veliyancode, Malappuram', phone: '0494-2678400', type: 'Government Dispensary', current_load: 'Low' },
  { id: 'h49', name: 'GD Police Dispensary, Klari', district: 'Malappuram', address: 'Klari, Malappuram', phone: '', type: 'Government Dispensary', current_load: 'Low' },
  { id: 'h50', name: 'GD Police Dispensary, Pandikkad', district: 'Malappuram', address: 'Pandikkad, Malappuram', phone: '', type: 'Government Dispensary', current_load: 'Low' },
  { id: 'h51', name: 'GD Police Hospital, Malappuram', district: 'Malappuram', address: 'Malappuram', phone: '', type: 'Government Dispensary', current_load: 'Low' },
  { id: 'h52', name: 'GFD Chappapadi', district: 'Malappuram', address: 'Parappanangadi PO, Malappuram - 676303', phone: '9495310393', type: 'Government Dispensary', current_load: 'Low' },
  { id: 'h53', name: 'Government Medical College, Kozhikode', district: 'Kozhikode', address: 'Medical College Campus, Kozhikode - 673008', phone: '', type: 'Government Medical College', current_load: 'High' },
  { id: 'h54', name: 'General Hospital, Kozhikode', district: 'Kozhikode', address: 'Kozhikode', phone: '', type: 'Government General Hospital', current_load: 'High' },
  { id: 'h55', name: 'Government General Hospital, Kalpetta', district: 'Wayanad', address: 'Kalpetta, Wayanad - 673121', phone: '04936-202037', type: 'Government General Hospital', current_load: 'Medium' },
  { id: 'h56', name: 'District Hospital, Mananthavady', district: 'Wayanad', address: 'Mananthavady, Wayanad - 670645', phone: '', type: 'Government District Hospital', current_load: 'High' },
  { id: 'h57', name: 'Tribal Speciality Hospital, Nalloornad', district: 'Wayanad', address: 'Nalloornad, Mananthavady, Wayanad - 670645', phone: '8281212702', type: 'Government Tribal Speciality Hospital', current_load: 'Medium' },
  { id: 'h58', name: 'General Hospital, Kannur', district: 'Kannur', address: 'Kannur - 670002', phone: '', type: 'Government General Hospital', current_load: 'High' },
  { id: 'h59', name: 'General Hospital, Thalassery', district: 'Kannur', address: 'Thalassery - 670101', phone: '0490-2327450', type: 'Government General Hospital', current_load: 'High' },
  { id: 'h60', name: 'GD Central Jail Dispensary, Kannur', district: 'Kannur', address: 'Central Jail, Kannur - 670002', phone: '0497-2746141', type: 'Government Dispensary', current_load: 'Low' },
  { id: 'h61', name: 'KAP Dispensary, Mangattuparamba', district: 'Kannur', address: 'Mangattuparamba, Kannur - 670562', phone: '9447912594', type: 'Government Dispensary', current_load: 'Low' },
  { id: 'h62', name: 'General Hospital, Kasaragod', district: 'Kasaragod', address: 'Kasaragod PO, Kasaragod - 671121', phone: '04994-230080', type: 'Government General Hospital', current_load: 'High' },
  { id: 'h63', name: 'District Hospital, Kanhangad', district: 'Kasaragod', address: 'Bella PO, Chammattomvayal, Kanhangad - 671531', phone: '04672-2217018', type: 'Government District Hospital', current_load: 'High' },
  { id: 'h64', name: 'Taluk Headquarters Hospital, Mangalpady', district: 'Kasaragod', address: 'Naya Bazar, Uppala PO, Kasaragod - 671322', phone: '04998-242098', type: 'Government Taluk Hospital', current_load: 'Medium' },
  { id: 'h65', name: 'Taluk Headquarters Hospital, Poodamkallu', district: 'Kasaragod', address: 'Rajapuram PO, Anandashram, Kasaragod - 671532', phone: '0467-2224737', type: 'Government Taluk Hospital', current_load: 'Medium' },
  { id: 'h66', name: 'Government Dispensary, Valiyappoil', district: 'Kasaragod', address: 'Valiyappoil, Kasaragod - 671313', phone: '', type: 'Government Dispensary', current_load: 'Low' },
  { id: 'h67', name: 'Government Dispensary, Thrikkarippur', district: 'Kasaragod', address: 'Thrikkarippur, Kasaragod - 671310', phone: '', type: 'Government Dispensary', current_load: 'Low' }
];

const extractHospitalList = (payload: any): Hospital[] => {
  if (Array.isArray(payload)) return payload.map(normalizeHospitalRecord);
  if (Array.isArray(payload?.data)) return payload.data.map(normalizeHospitalRecord);
  if (Array.isArray(payload?.hospitals)) return payload.hospitals.map(normalizeHospitalRecord);
  if (Array.isArray(payload?.results)) return payload.results.map(normalizeHospitalRecord);
  if (Array.isArray(payload?.items)) return payload.items.map(normalizeHospitalRecord);
  return [];
};

export const hospitalService = {
  async getHospitals(district?: District, search?: string): Promise<Hospital[]> {
    if (hospitalsApiBaseUrl) {
      try {
        const params = new URLSearchParams();
        if (district) params.set('district', district);
        if (search) params.set('search', search);

        const url = `${hospitalsApiBaseUrl.replace(/\/$/, '')}/hospitals${params.toString() ? `?${params.toString()}` : ''}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Hospital API request failed: ${response.status}`);
        }

        const payload = await response.json();
        return extractHospitalList(payload);
      } catch (e) {
        console.error('Hospital API fetch failed, using local hospital directory:', e);
      }
    }

    let list = HOSPITAL_DIRECTORY_DATA.map(normalizeHospitalRecord);
    if (district) {
      list = list.filter((h) => h.district === district);
    }
    if (search) {
      const query = search.trim().toLowerCase();
      list = list.filter((h) => h.name.toLowerCase().includes(query) || h.district.toLowerCase().includes(query));
    }
    return list;
  },

  async getHospitalById(id: string): Promise<Hospital | undefined> {
    const list = await this.getHospitals();
    return list.find((h) => h.id === id);
  },

  async getDepartments(hospitalId: string): Promise<Department[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('departments')
          .select('*')
          .eq('hospital_id', hospitalId);
        if (data && data.length > 0 && !error) return data as Department[];

        await seedSupabaseDatabase();
        const retry = await supabase
          .from('departments')
          .select('*')
          .eq('hospital_id', hospitalId);
        if (retry.data && retry.data.length > 0) return retry.data as Department[];
      } catch (e) {
        console.warn('Supabase depts fetch failed:', e);
      }
    }

    return INITIAL_DEPARTMENTS.filter((d) => d.hospital_id === hospitalId);
  },

  async getDoctors(departmentId: string): Promise<Doctor[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('doctors')
          .select('*')
          .eq('department_id', departmentId);
        if (data && data.length > 0 && !error) return data as Doctor[];

        await seedSupabaseDatabase();
        const retry = await supabase
          .from('doctors')
          .select('*')
          .eq('department_id', departmentId);
        if (retry.data && retry.data.length > 0) return retry.data as Doctor[];
      } catch (e) {
        console.warn('Supabase doctors fetch failed:', e);
      }
    }

    return INITIAL_DOCTORS.filter((doc) => doc.department_id === departmentId);
  },

  async getDoctorSlots(doctorId: string): Promise<DoctorSlot[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('doctor_slots')
          .select('*')
          .eq('doctor_id', doctorId);
        if (data && data.length > 0 && !error) return data as DoctorSlot[];

        await seedSupabaseDatabase();
        const retry = await supabase
          .from('doctor_slots')
          .select('*')
          .eq('doctor_id', doctorId);
        if (retry.data && retry.data.length > 0) return retry.data as DoctorSlot[];
      } catch (e) {
        console.warn('Supabase slots fetch failed:', e);
      }
    }

    return INITIAL_SLOTS.filter((s) => s.doctor_id === doctorId);
  }
};
