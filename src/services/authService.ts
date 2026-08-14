import { Profile, FamilyMember } from '../types';
import { getLocalStore, supabase, isSupabaseConfigured } from '../lib/supabase';
import { seedSupabaseDatabase } from '../lib/seedSupabase';

export const authService = {
  async loginWithPhoneOrUHID(input: string): Promise<{ profile: Profile; token: string }> {
    // Clean input
    const cleanInput = input.trim();

    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .or(`phone.eq.${cleanInput},uhid.eq.${cleanInput}`)
          .maybeSingle();

        if (data && !error) {
          return { profile: data as Profile, token: 'sb-auth-token-valid' };
        }
      } catch (e) {
        console.warn('Supabase profile fetch error, falling back to local store:', e);
      }
    }

    // Local fallback
    const store = getLocalStore();
    const currentProfile = store.getProfile();
    const updated: Profile = {
      ...currentProfile,
      phone: cleanInput.startsWith('+') || cleanInput.length === 10 ? cleanInput : currentProfile.phone,
      uhid: cleanInput.startsWith('KL-') ? cleanInput : currentProfile.uhid
    };
    store.saveProfile(updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('profiles').upsert(updated);
      } catch (e) {
        console.warn('Supabase upsert login profile error:', e);
      }
    }

    return { profile: updated, token: 'local-session-token' };
  },

  async getProfile(): Promise<Profile> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const store = getLocalStore();
        const localId = store.getProfile().id;
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', localId)
          .maybeSingle();
        if (data && !error) return data as Profile;

        await seedSupabaseDatabase();
        const retry = await supabase
          .from('profiles')
          .select('*')
          .limit(1)
          .maybeSingle();
        if (retry.data) return retry.data as Profile;
      } catch (e) {
        console.warn('Supabase fetch profile error:', e);
      }
    }

    const store = getLocalStore();
    return store.getProfile();
  },

  async updateProfile(updates: Partial<Profile>): Promise<Profile> {
    const store = getLocalStore();
    const current = store.getProfile();
    const updated: Profile = {
      ...current,
      ...updates,
      is_profile_complete: true
    };
    store.saveProfile(updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('profiles').upsert(updated);
      } catch (e) {
        console.warn('Supabase profile update error:', e);
      }
    }

    return updated;
  },

  async getFamilyMembers(): Promise<FamilyMember[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const store = getLocalStore();
        const userId = store.getProfile().id;
        const { data, error } = await supabase
          .from('family_members')
          .select('*')
          .eq('user_id', userId);
        if (data && data.length > 0 && !error) return data as FamilyMember[];

        await seedSupabaseDatabase();
        const retry = await supabase
          .from('family_members')
          .select('*')
          .eq('user_id', userId);
        if (retry.data && retry.data.length > 0) return retry.data as FamilyMember[];
      } catch (e) {
        console.warn('Supabase fetch family members error:', e);
      }
    }

    const store = getLocalStore();
    return store.getFamily();
  },

  async addFamilyMember(member: Omit<FamilyMember, 'id' | 'user_id'>): Promise<FamilyMember> {
    const store = getLocalStore();
    const current = store.getFamily();
    const newMember: FamilyMember = {
      ...member,
      id: `fam-${Date.now()}`,
      user_id: store.getProfile().id,
      uhid: member.uhid || `KL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`
    };
    const updated = [...current, newMember];
    store.saveFamily(updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('family_members').insert(newMember);
      } catch (e) {
        console.warn('Supabase add family member error:', e);
      }
    }

    return newMember;
  }
};
