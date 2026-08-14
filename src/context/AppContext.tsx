import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Profile,
  FamilyMember,
  Appointment,
  Wallet,
  NotificationItem,
  Language,
  District
} from '../types';
import { authService } from '../services/authService';
import { appointmentService } from '../services/appointmentService';
import { walletService } from '../services/walletService';
import { notificationService } from '../services/notificationService';
import { getLocalStore } from '../lib/supabase';

interface AppContextType {
  profile: Profile | null;
  familyMembers: FamilyMember[];
  appointments: Appointment[];
  activeAppointment: Appointment | null;
  nextAppointment: Appointment | null;
  wallet: Wallet | null;
  notifications: NotificationItem[];
  unreadNotifCount: number;
  language: Language;
  savedHospitals: string[];
  isLoading: boolean;
  
  // Actions
  setLanguage: (lang: Language) => void;
  updateProfile: (updates: Partial<Profile>) => Promise<Profile>;
  addFamilyMember: (member: Omit<FamilyMember, 'id' | 'user_id'>) => Promise<FamilyMember>;
  refreshAppointments: () => Promise<void>;
  cancelAppointment: (id: string) => Promise<void>;
  rechargeWallet: (amount: number, paymentMethod?: 'UPI' | 'NetBanking', upiId?: string) => Promise<void>;
  markNotificationRead: (id: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
  toggleSaveHospital: (hospitalId: string) => void;
  isHospitalSaved: (hospitalId: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [language, setLanguageState] = useState<Language>('en');
  const [savedHospitals, setSavedHospitals] = useState<string[]>(['hosp-1', 'hosp-2']);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize data
  useEffect(() => {
    async function loadInitialData() {
      setIsLoading(true);
      try {
        const p = await authService.getProfile();
        setProfile(p);
        setLanguageState(p.preferred_language || 'en');

        const fam = await authService.getFamilyMembers();
        setFamilyMembers(fam);

        const apts = await appointmentService.getAppointments();
        setAppointments(apts);

        const w = await walletService.getWallet();
        setWallet(w);

        const notifs = await notificationService.getNotifications();
        setNotifications(notifs);

        const store = getLocalStore();
        setSavedHospitals(store.getSavedHospitals());
      } catch (err) {
        console.error('Failed loading initial app context data:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialData();
  }, []);

  // Realtime Live Queue Ticker Simulation: Every 25s, progress active token if waiting!
  useEffect(() => {
    const timer = setInterval(() => {
      setAppointments((prevApts) => {
        let changed = false;
        const updated = prevApts.map((apt) => {
          if (apt.status === 'Waiting' && apt.queue_position > 0) {
            changed = true;
            const newPos = Math.max(0, apt.queue_position - 1);
            const deptCode = apt.token_number.split('-')[0];
            const currentTokenNum = parseInt(apt.token_number.split('-')[1], 10);
            const newServingNum = Math.min(currentTokenNum, currentTokenNum - newPos);
            const newServing = `${deptCode}-${String(newServingNum).padStart(3, '0')}`;
            const newStatus = newPos === 0 ? ('Called' as const) : ('Waiting' as const);

            return {
              ...apt,
              queue_position: newPos,
              now_serving_token: newServing,
              estimated_wait_mins: Math.max(0, newPos * 4),
              status: newStatus
            };
          }
          return apt;
        });

        if (changed) {
          getLocalStore().saveAppointments(updated);
        }
        return updated;
      });
    }, 25000);

    return () => clearInterval(timer);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (profile) {
      authService.updateProfile({ preferred_language: lang });
    }
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    const updated = await authService.updateProfile(updates);
    setProfile(updated);
    return updated;
  };

  const addFamilyMember = async (member: Omit<FamilyMember, 'id' | 'user_id'>) => {
    const newMember = await authService.addFamilyMember(member);
    setFamilyMembers((prev) => [...prev, newMember]);
    return newMember;
  };

  const refreshAppointments = async () => {
    const apts = await appointmentService.getAppointments();
    setAppointments(apts);
  };

  const cancelAppointment = async (id: string) => {
    const updated = await appointmentService.cancelAppointment(id);
    setAppointments(updated);
  };

  const rechargeWallet = async (amount: number, paymentMethod?: 'UPI' | 'NetBanking', upiId?: string) => {
    const res = await walletService.rechargeWallet(amount, paymentMethod, upiId);
    setWallet(res.wallet);
  };

  const markNotificationRead = async (id: string) => {
    const updated = await notificationService.markAsRead(id);
    setNotifications(updated);
  };

  const markAllNotificationsRead = async () => {
    const updated = await notificationService.markAllAsRead();
    setNotifications(updated);
  };

  const toggleSaveHospital = (hospitalId: string) => {
    setSavedHospitals((prev) => {
      const next = prev.includes(hospitalId)
        ? prev.filter((id) => id !== hospitalId)
        : [...prev, hospitalId];
      getLocalStore().saveSavedHospitals(next);
      return next;
    });
  };

  const isHospitalSaved = (hospitalId: string) => savedHospitals.includes(hospitalId);

  // Compute Active & Next Appointments following strict priority order:
  // Priority 1: Today's active appointment
  // Priority 2: Tomorrow's appointment
  // Priority 3: Next upcoming appointment
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowStr = tomorrowDate.toISOString().split('T')[0];

  const activeAppointments = appointments.filter(
    (a) => a.status === 'Waiting' || a.status === 'Called' || a.status === 'In consultation'
  );

  const todayAppointment = activeAppointments.find((a) => a.appointment_date === todayStr) || null;
  const tomorrowAppointment = activeAppointments.find((a) => a.appointment_date === tomorrowStr) || null;
  const nextUpcomingAppointment = activeAppointments.find((a) => a.appointment_date > todayStr) || null;

  const activeAppointment = todayAppointment || tomorrowAppointment || nextUpcomingAppointment;
  const nextAppointment = todayAppointment ? (tomorrowAppointment || nextUpcomingAppointment) : null;

  const unreadNotifCount = notifications.filter((n) => !n.is_read).length;

  return (
    <AppContext.Provider
      value={{
        profile,
        familyMembers,
        appointments,
        activeAppointment,
        nextAppointment,
        wallet,
        notifications,
        unreadNotifCount,
        language,
        savedHospitals,
        isLoading,
        setLanguage,
        updateProfile,
        addFamilyMember,
        refreshAppointments,
        cancelAppointment,
        rechargeWallet,
        markNotificationRead,
        markAllNotificationsRead,
        toggleSaveHospital,
        isHospitalSaved
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
