import { Hospital, Department, Doctor, DoctorSlot, District } from '../types';
import { INITIAL_HOSPITALS, INITIAL_DEPARTMENTS, INITIAL_DOCTORS, INITIAL_SLOTS } from '../lib/seedData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { seedSupabaseDatabase } from '../lib/seedSupabase';

export const hospitalService = {
  async getHospitals(district?: District, search?: string): Promise<Hospital[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        let query = supabase.from('hospitals').select('*');
        if (district) query = query.eq('district', district);
        if (search) query = query.ilike('name', `%${search}%`);
        const { data, error } = await query;
        if (data && data.length > 0 && !error) {
          return data as Hospital[];
        }

        // Auto seed if empty
        await seedSupabaseDatabase();
        let retryQuery = supabase.from('hospitals').select('*');
        if (district) retryQuery = retryQuery.eq('district', district);
        if (search) retryQuery = retryQuery.ilike('name', `%${search}%`);
        const retry = await retryQuery;
        if (retry.data && retry.data.length > 0) {
          return retry.data as Hospital[];
        }
      } catch (e) {
        console.warn('Supabase fetch hospitals failed, using local seed:', e);
      }
    }

    let list = [...INITIAL_HOSPITALS];
    if (district) {
      list = list.filter((h) => h.district === district);
    }
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((h) => h.name.toLowerCase().includes(q) || h.district.toLowerCase().includes(q));
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
