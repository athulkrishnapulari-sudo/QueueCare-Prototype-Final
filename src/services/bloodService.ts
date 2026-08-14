import { BloodBank, BloodGroup, BloodAlert, District } from '../types';
import { INITIAL_BLOOD_BANKS } from '../lib/seedData';
import { getLocalStore, supabase, isSupabaseConfigured } from '../lib/supabase';
import { seedSupabaseDatabase } from '../lib/seedSupabase';

export const bloodService = {
  async getBloodBanks(group?: BloodGroup, district?: District): Promise<BloodBank[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        let query = supabase.from('blood_banks').select('*');
        if (district) query = query.eq('district', district);
        const { data, error } = await query;
        if (data && data.length > 0 && !error) return data as BloodBank[];

        await seedSupabaseDatabase();
        let retryQuery = supabase.from('blood_banks').select('*');
        if (district) retryQuery = retryQuery.eq('district', district);
        const retry = await retryQuery;
        if (retry.data && retry.data.length > 0) return retry.data as BloodBank[];
      } catch (e) {
        console.warn('Supabase blood banks fetch error:', e);
      }
    }

    let list = [...INITIAL_BLOOD_BANKS];
    if (district) {
      list = list.filter((b) => b.district === district);
    }
    return list;
  },

  async getBloodAlerts(): Promise<BloodAlert[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('blood_alerts')
          .select('*')
          .order('created_at', { ascending: false });
        if (data && !error) return data as BloodAlert[];
      } catch (e) {
        console.warn('Supabase fetch blood alerts error:', e);
      }
    }

    try {
      const saved = localStorage.getItem('qcare_blood_alerts_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  },

  async createBloodAlert(
    group: BloodGroup,
    district: District,
    radiusKm: number,
    patientName: string,
    phone: string
  ): Promise<BloodAlert> {
    const store = getLocalStore();
    const profile = store.getProfile();
    const newAlert: BloodAlert = {
      id: `alert-${Date.now()}`,
      user_id: profile.id,
      blood_group: group,
      district: district,
      radius_km: radiusKm,
      patient_name: patientName,
      phone: phone,
      is_active: true,
      created_at: new Date().toISOString()
    };

    const current = await this.getBloodAlerts();
    const updated = [newAlert, ...current];
    localStorage.setItem('qcare_blood_alerts_v1', JSON.stringify(updated));

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('blood_alerts').insert(newAlert);
      } catch (e) {
        console.warn('Supabase insert blood alert error:', e);
      }
    }

    return newAlert;
  }
};
