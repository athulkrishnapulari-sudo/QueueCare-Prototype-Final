import { Appointment } from '../types';
import { getLocalStore, supabase, isSupabaseConfigured } from '../lib/supabase';
import { isOnlineBookingOpenForDate } from '../lib/time';
import { walletService } from './walletService';
import { seedSupabaseDatabase } from '../lib/seedSupabase';

export interface CreateBookingParams {
  patientName: string;
  patientRelationship: 'Myself' | string;
  patientUhid: string;
  patientAge: number;
  patientGender: string;
  visitType: 'New Visit' | 'Follow-up';
  previousAppointmentId?: string;
  hospitalId: string;
  hospitalName: string;
  departmentId: string;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // e.g. "10:30 AM"
  paymentMethod: 'UPI' | 'QCare Health Balance';
}

export const appointmentService = {
  async getAppointments(): Promise<Appointment[]> {
    if (isSupabaseConfigured() && supabase) {
      try {
        const { data, error } = await supabase
          .from('appointments')
          .select('*')
          .order('created_at', { ascending: false });
        if (data && data.length > 0 && !error) return data as Appointment[];

        await seedSupabaseDatabase();
        const retry = await supabase
          .from('appointments')
          .select('*')
          .order('created_at', { ascending: false });
        if (retry.data && retry.data.length > 0) return retry.data as Appointment[];
      } catch (e) {
        console.warn('Supabase fetch appointments failed, using local store:', e);
      }
    }

    const store = getLocalStore();
    return store.getAppointments();
  },

  async createAppointment(params: CreateBookingParams): Promise<Appointment> {
    // 1. Enforce 9 AM cutoff rule
    const cutoffCheck = isOnlineBookingOpenForDate(params.appointmentDate);
    if (!cutoffCheck.isOpen) {
      throw new Error(cutoffCheck.reason || 'Online OP booking is closed for this session.');
    }

    const existing = await this.getAppointments();

    // 2. Generate Concurrency-Safe Token Number (e.g., GM-042)
    const deptPrefix = params.departmentName.substring(0, 2).toUpperCase();
    const sameDeptToday = existing.filter(
      (a) => a.department_id === params.departmentId && a.appointment_date === params.appointmentDate
    );
    const tokenSeq = 30 + sameDeptToday.length + 1; // e.g., Token #31, #32...
    const tokenNumber = `${deptPrefix}-${String(tokenSeq).padStart(3, '0')}`;

    // 3. Generate Booking Reference
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const bookingRef = `QC-${new Date().getFullYear()}-${randomNum}`;

    const feeAmount = 2.0;

    // 4. Process Payment
    if (params.paymentMethod === 'QCare Health Balance') {
      await walletService.deductForBooking(feeAmount, bookingRef, tokenNumber);
    }

    const store = getLocalStore();
    const profile = store.getProfile();

    // 5. Build Appointment
    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      booking_reference: bookingRef,
      user_id: profile.id,
      patient_name: params.patientName,
      patient_relationship: params.patientRelationship,
      patient_uhid: params.patientUhid,
      patient_age: params.patientAge,
      patient_gender: params.patientGender,
      visit_type: params.visitType,
      previous_appointment_id: params.previousAppointmentId,
      hospital_id: params.hospitalId,
      hospital_name: params.hospitalName,
      department_id: params.departmentId,
      department_name: params.departmentName,
      doctor_id: params.doctorId,
      doctor_name: params.doctorName,
      appointment_date: params.appointmentDate,
      appointment_time: params.appointmentTime,
      token_number: tokenNumber,
      queue_position: Math.max(1, tokenSeq - 28),
      now_serving_token: `${deptPrefix}-${String(Math.max(1, tokenSeq - 11)).padStart(3, '0')}`,
      estimated_wait_mins: Math.max(15, (tokenSeq - 28) * 5),
      fee_paid: feeAmount,
      payment_method: params.paymentMethod,
      payment_status: 'Paid',
      status: 'Waiting',
      created_at: new Date().toISOString()
    };

    const localList = store.getAppointments();
    store.saveAppointments([newAppointment, ...localList]);

    // Save notification
    const currentNotifs = store.getNotifications();
    const newNotif = {
      id: `notif-${Date.now()}`,
      user_id: profile.id,
      title: 'OP Token Confirmed',
      message: `Token ${tokenNumber} confirmed for ${params.patientName} at ${params.hospitalName} (${params.departmentName}) on ${params.appointmentDate} at ${params.appointmentTime}.`,
      category: 'OP' as const,
      is_read: false,
      created_at: new Date().toISOString(),
      link_path: '/my-op'
    };
    store.saveNotifications([newNotif, ...currentNotifs]);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('appointments').insert(newAppointment);
        await supabase.from('notifications').insert(newNotif);
      } catch (e) {
        console.warn('Supabase insert appointment error:', e);
      }
    }

    return newAppointment;
  },

  async cancelAppointment(id: string): Promise<Appointment[]> {
    const store = getLocalStore();
    const current = store.getAppointments();
    const updated = current.map((a) => (a.id === id ? { ...a, status: 'Cancelled' as const } : a));
    store.saveAppointments(updated);

    if (isSupabaseConfigured() && supabase) {
      try {
        await supabase.from('appointments').update({ status: 'Cancelled' }).eq('id', id);
      } catch (e) {
        console.warn('Supabase cancel appointment error:', e);
      }
    }

    return updated;
  }
};
