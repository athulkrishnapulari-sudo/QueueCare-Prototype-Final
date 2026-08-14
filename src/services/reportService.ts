import { MedicalReport } from '../types';
import { INITIAL_REPORTS } from '../lib/seedData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { seedSupabaseDatabase } from '../lib/seedSupabase';

export const reportService = {
  async getReports(): Promise<MedicalReport[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('reports')
          .select('*')
          .order('date', { ascending: false });
        if (data && data.length > 0 && !error) return data as MedicalReport[];

        await seedSupabaseDatabase();
        const retry = await supabase
          .from('reports')
          .select('*')
          .order('date', { ascending: false });
        if (retry.data && retry.data.length > 0) return retry.data as MedicalReport[];
      } catch (e) {
        console.warn('Supabase fetch reports failed:', e);
      }
    }

    return INITIAL_REPORTS;
  }
};
