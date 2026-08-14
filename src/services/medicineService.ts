import { Prescription, NearbyPharmacy } from '../types';
import { INITIAL_PRESCRIPTION, NEARBY_PHARMACIES } from '../lib/seedData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { seedSupabaseDatabase } from '../lib/seedSupabase';

export const medicineService = {
  async getLatestPrescription(): Promise<Prescription> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('prescriptions')
          .select('*')
          .order('date', { ascending: false })
          .limit(1)
          .maybeSingle();
        if (data && !error) return data as Prescription;

        await seedSupabaseDatabase();
        const retry = await supabase
          .from('prescriptions')
          .select('*')
          .order('date', { ascending: false })
          .limit(1)
          .maybeSingle();
        if (retry.data) return retry.data as Prescription;
      } catch (e) {
        console.warn('Supabase fetch prescription failed:', e);
      }
    }

    return INITIAL_PRESCRIPTION;
  },

  async getNearbyPharmaciesForMedicine(medicineName: string): Promise<NearbyPharmacy[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('nearby_pharmacies')
          .select('*')
          .ilike('medicine_name', `%${medicineName}%`);
        if (data && data.length > 0 && !error) return data as NearbyPharmacy[];

        await seedSupabaseDatabase();
        const retry = await supabase
          .from('nearby_pharmacies')
          .select('*')
          .ilike('medicine_name', `%${medicineName}%`);
        if (retry.data && retry.data.length > 0) return retry.data as NearbyPharmacy[];
      } catch (e) {
        console.warn('Supabase fetch pharmacies failed:', e);
      }
    }

    const q = medicineName.toLowerCase();
    return NEARBY_PHARMACIES.filter(
      (p) => p.medicine_name.toLowerCase().includes(q) || p.generic_name.toLowerCase().includes(q)
    );
  },

  async searchMedicines(query: string): Promise<NearbyPharmacy[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        let q = supabase.from('nearby_pharmacies').select('*');
        if (query.trim()) {
          q = q.or(`medicine_name.ilike.%${query}%,generic_name.ilike.%${query}%`);
        }
        const { data, error } = await q;
        if (data && data.length > 0 && !error) return data as NearbyPharmacy[];
      } catch (e) {
        console.warn('Supabase search medicines error:', e);
      }
    }

    if (!query.trim()) return NEARBY_PHARMACIES;
    const q = query.toLowerCase();
    return NEARBY_PHARMACIES.filter(
      (p) => p.medicine_name.toLowerCase().includes(q) || p.generic_name.toLowerCase().includes(q)
    );
  }
};
