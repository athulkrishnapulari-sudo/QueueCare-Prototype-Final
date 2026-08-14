import { supabase, isSupabaseConfigured, getLocalStore } from './supabase';
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

export interface SeedStatus {
  success: boolean;
  message: string;
  tablesSeeded: string[];
  errors: string[];
}

export async function seedSupabaseDatabase(force = false): Promise<SeedStatus> {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      success: false,
      message: 'Supabase credentials are not configured in environment (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY).',
      tablesSeeded: [],
      errors: ['Supabase not configured']
    };
  }

  const seeded: string[] = [];
  const errors: string[] = [];

  try {
    // 1. Hospitals
    const { count: hospCount, error: hospErr } = await supabase
      .from('hospitals')
      .select('*', { count: 'exact', head: true });

    if (hospErr) {
      errors.push(`Hospitals table check failed: ${hospErr.message}`);
    } else if (force || hospCount === 0) {
      const { error: insErr } = await supabase.from('hospitals').upsert(INITIAL_HOSPITALS);
      if (insErr) errors.push(`Hospitals seed error: ${insErr.message}`);
      else seeded.push('hospitals (5 records)');
    }

    // 2. Departments
    const { count: deptCount, error: deptErr } = await supabase
      .from('departments')
      .select('*', { count: 'exact', head: true });

    if (deptErr) {
      errors.push(`Departments table check failed: ${deptErr.message}`);
    } else if (force || deptCount === 0) {
      const { error: insErr } = await supabase.from('departments').upsert(INITIAL_DEPARTMENTS);
      if (insErr) errors.push(`Departments seed error: ${insErr.message}`);
      else seeded.push('departments (9 records)');
    }

    // 3. Doctors
    const { count: docCount, error: docErr } = await supabase
      .from('doctors')
      .select('*', { count: 'exact', head: true });

    if (docErr) {
      errors.push(`Doctors table check failed: ${docErr.message}`);
    } else if (force || docCount === 0) {
      const { error: insErr } = await supabase.from('doctors').upsert(INITIAL_DOCTORS);
      if (insErr) errors.push(`Doctors seed error: ${insErr.message}`);
      else seeded.push('doctors (5 records)');
    }

    // 4. Doctor Slots
    const { count: slotCount, error: slotErr } = await supabase
      .from('doctor_slots')
      .select('*', { count: 'exact', head: true });

    if (slotErr) {
      errors.push(`Doctor slots table check failed: ${slotErr.message}`);
    } else if (force || slotCount === 0) {
      const { error: insErr } = await supabase.from('doctor_slots').upsert(INITIAL_SLOTS);
      if (insErr) errors.push(`Doctor slots seed error: ${insErr.message}`);
      else seeded.push('doctor_slots (18 slots)');
    }

    // 5. Blood Banks
    const { count: bbCount, error: bbErr } = await supabase
      .from('blood_banks')
      .select('*', { count: 'exact', head: true });

    if (bbErr) {
      errors.push(`Blood banks table check failed: ${bbErr.message}`);
    } else if (force || bbCount === 0) {
      const { error: insErr } = await supabase.from('blood_banks').upsert(INITIAL_BLOOD_BANKS);
      if (insErr) errors.push(`Blood banks seed error: ${insErr.message}`);
      else seeded.push('blood_banks (3 records)');
    }

    // 6. Prescriptions
    const { count: rxCount, error: rxErr } = await supabase
      .from('prescriptions')
      .select('*', { count: 'exact', head: true });

    if (rxErr) {
      errors.push(`Prescriptions table check failed: ${rxErr.message}`);
    } else if (force || rxCount === 0) {
      const { error: insErr } = await supabase.from('prescriptions').upsert(INITIAL_PRESCRIPTION);
      if (insErr) errors.push(`Prescriptions seed error: ${insErr.message}`);
      else seeded.push('prescriptions (1 record)');
    }

    // 7. Nearby Pharmacies
    const { count: pharmCount, error: pharmErr } = await supabase
      .from('nearby_pharmacies')
      .select('*', { count: 'exact', head: true });

    if (pharmErr) {
      errors.push(`Pharmacies table check failed: ${pharmErr.message}`);
    } else if (force || pharmCount === 0) {
      const { error: insErr } = await supabase.from('nearby_pharmacies').upsert(NEARBY_PHARMACIES);
      if (insErr) errors.push(`Nearby pharmacies seed error: ${insErr.message}`);
      else seeded.push('nearby_pharmacies (3 records)');
    }

    // 8. Reports
    const { count: repCount, error: repErr } = await supabase
      .from('reports')
      .select('*', { count: 'exact', head: true });

    if (repErr) {
      errors.push(`Reports table check failed: ${repErr.message}`);
    } else if (force || repCount === 0) {
      const { error: insErr } = await supabase.from('reports').upsert(INITIAL_REPORTS);
      if (insErr) errors.push(`Reports seed error: ${insErr.message}`);
      else seeded.push('reports (3 records)');
    }

    // 9. Profile & Local Store Defaults
    const store = getLocalStore();
    const profile = store.getProfile();
    const family = store.getFamily();
    const apts = store.getAppointments();
    const wallet = store.getWallet();
    const txs = store.getWalletTxs();
    const notifs = store.getNotifications();

    // Profiles
    const { count: profCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
    if (force || profCount === 0) {
      const { error: pErr } = await supabase.from('profiles').upsert(profile);
      if (pErr) errors.push(`Profiles seed error: ${pErr.message}`);
      else seeded.push('profiles (1 record)');
    }

    // Family Members
    const { count: famCount } = await supabase.from('family_members').select('*', { count: 'exact', head: true });
    if ((force || famCount === 0) && family.length > 0) {
      const { error: fErr } = await supabase.from('family_members').upsert(family);
      if (fErr) errors.push(`Family members seed error: ${fErr.message}`);
      else seeded.push(`family_members (${family.length} records)`);
    }

    // Appointments
    const { count: aptCount } = await supabase.from('appointments').select('*', { count: 'exact', head: true });
    if ((force || aptCount === 0) && apts.length > 0) {
      const { error: aErr } = await supabase.from('appointments').upsert(apts);
      if (aErr) errors.push(`Appointments seed error: ${aErr.message}`);
      else seeded.push(`appointments (${apts.length} records)`);
    }

    // Wallets
    const { count: wCount } = await supabase.from('wallets').select('*', { count: 'exact', head: true });
    if (force || wCount === 0) {
      const { error: wErr } = await supabase.from('wallets').upsert(wallet);
      if (wErr) errors.push(`Wallets seed error: ${wErr.message}`);
      else seeded.push('wallets (1 record)');
    }

    // Wallet Transactions
    const { count: txCount } = await supabase.from('wallet_transactions').select('*', { count: 'exact', head: true });
    if ((force || txCount === 0) && txs.length > 0) {
      const { error: tErr } = await supabase.from('wallet_transactions').upsert(txs);
      if (tErr) errors.push(`Wallet transactions seed error: ${tErr.message}`);
      else seeded.push(`wallet_transactions (${txs.length} records)`);
    }

    // Notifications
    const { count: notifCount } = await supabase.from('notifications').select('*', { count: 'exact', head: true });
    if ((force || notifCount === 0) && notifs.length > 0) {
      const { error: nErr } = await supabase.from('notifications').upsert(notifs);
      if (nErr) errors.push(`Notifications seed error: ${nErr.message}`);
      else seeded.push(`notifications (${notifs.length} records)`);
    }

    if (seeded.length > 0) {
      return {
        success: true,
        message: `Successfully populated Supabase database! Seeded tables: ${seeded.join(', ')}`,
        tablesSeeded: seeded,
        errors
      };
    } else {
      return {
        success: errors.length === 0,
        message: errors.length > 0
          ? `Supabase seeding encountered issues: ${errors.join('; ')}`
          : 'Database tables already contain data. No new seeding required.',
        tablesSeeded: [],
        errors
      };
    }
  } catch (err: any) {
    return {
      success: false,
      message: `Failed to seed database: ${err?.message || String(err)}`,
      tablesSeeded: seeded,
      errors: [...errors, err?.message || String(err)]
    };
  }
}
