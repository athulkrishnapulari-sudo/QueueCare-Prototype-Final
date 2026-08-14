import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { LiveQueueCard } from '../components/queue/LiveQueueCard';
import { DigitalOPTicket } from '../components/common/DigitalOPTicket';
import { formatDateDisplay } from '../lib/time';
import {
  CalendarPlus,
  Clock,
  Pill,
  Droplet,
  FileText,
  Building2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  Plus
} from 'lucide-react';

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export const Home: React.FC<HomeProps> = ({ setActiveTab }) => {
  const {
    profile,
    activeAppointment,
    nextAppointment,
    language,
    notifications
  } = useApp();

  const t = getTranslation(language);
  const [selectedTicketApt, setSelectedTicketApt] = useState<any | null>(null);

  // Greeting based on Kerala local time
  const hour = new Date().getHours();
  const greetingText =
    hour < 12
      ? t.home.greetingMorning
      : hour < 17
      ? t.home.greetingAfternoon
      : t.home.greetingEvening;

  const quickActions = [
    { id: 'op-booking', label: t.nav.opBooking, icon: CalendarPlus, color: 'bg-teal-700 text-white' },
    { id: 'live-queue', label: t.nav.liveQueue, icon: Clock, color: 'bg-emerald-50 text-emerald-900 border border-emerald-200' },
    { id: 'medicines', label: t.nav.medicines, icon: Pill, color: 'bg-blue-50 text-blue-900 border border-blue-200' },
    { id: 'blood-bank', label: t.nav.bloodBank, icon: Droplet, color: 'bg-rose-50 text-rose-900 border border-rose-200' },
    { id: 'reports', label: t.nav.reports, icon: FileText, color: 'bg-indigo-50 text-indigo-900 border border-indigo-200' },
    { id: 'hospitals', label: t.nav.hospitals, icon: Building2, color: 'bg-slate-100 text-slate-800 border border-slate-200' }
  ];

  return (
    <div className="space-y-6 pb-8">
      
      {/* 1. Greeting & User Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="text-xs font-bold text-teal-800 uppercase tracking-wider">
            {t.appName} Health Portal
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-0.5">
            {greetingText}, {profile?.full_name || 'Patient'}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            UHID: <strong className="text-slate-800">{profile?.uhid}</strong> · {profile?.district} District
          </p>
        </div>

        <button
          onClick={() => setActiveTab('op-booking')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl transition-colors shadow-xs cursor-pointer min-h-[44px]"
        >
          <Plus className="w-4 h-4" />
          <span>{t.home.bookOpButton}</span>
        </button>
      </div>

      {/* 2. CURRENT / UPCOMING OP STATUS CARD (Highest Priority) */}
      <section>
        {activeAppointment ? (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-700" />
                <span>
                  {activeAppointment.appointment_date === new Date().toISOString().split('T')[0]
                    ? t.home.currentOpTitle
                    : t.home.nextOpTitle}
                </span>
              </h2>
              <span className="text-xs text-slate-500 font-semibold">
                {formatDateDisplay(activeAppointment.appointment_date, language === 'ml')}
              </span>
            </div>

            <LiveQueueCard
              appointment={activeAppointment}
              onOpenTicket={() => setSelectedTicketApt(activeAppointment)}
              onViewQueueDetails={() => setActiveTab('live-queue')}
            />
          </div>
        ) : (
          /* Empty Active OP State */
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-6 sm:p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-700 mx-auto flex items-center justify-center mb-3">
              <CalendarPlus className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">{t.home.noActiveBooking}</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-5">
              {t.home.noActiveDesc}
            </p>
            <button
              onClick={() => setActiveTab('op-booking')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer min-h-[44px]"
            >
              <span>{t.home.bookOpButton}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* 3. QUICK ACTIONS GRID */}
      <section>
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
          {t.home.quickActions}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((act) => {
            const Icon = act.icon;
            return (
              <button
                key={act.id}
                onClick={() => setActiveTab(act.id)}
                className={`p-4 rounded-xl flex flex-col items-center justify-center text-center font-bold text-xs transition-transform hover:-translate-y-0.5 cursor-pointer min-h-[88px] ${act.color}`}
              >
                <Icon className="w-6 h-6 mb-2" />
                <span>{act.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 4. SMART HEALTH INSIGHTS SUMMARY */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>{t.home.smartInsights}</span>
          </div>
          <span className="text-[11px] text-slate-400">Live AI Queue & Health Feed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          
          {/* Insight 1: Hospital Load Advice */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-teal-100 text-teal-800 shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Hospital Load Advice</div>
              <p className="text-slate-600 mt-0.5 leading-relaxed">
                Govt Medical College TVM currently has high OP waiting (~88% load). For faster consultations, consider Govt General Hospital (~28% load).
              </p>
            </div>
          </div>

          {/* Insight 2: Prescription Medicine Stock */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-800 shrink-0">
              <Pill className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-slate-900">Prescription Availability</div>
              <p className="text-slate-600 mt-0.5 leading-relaxed">
                3 of 4 prescribed medicines are available at hospital pharmacy. Amoxicillin 500mg verified at Karunya Medicals (0.8 km).
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Digital Ticket Modal if opened */}
      {selectedTicketApt && (
        <DigitalOPTicket
          appointment={selectedTicketApt}
          onClose={() => setSelectedTicketApt(null)}
          onViewLiveQueue={() => {
            setSelectedTicketApt(null);
            setActiveTab('live-queue');
          }}
        />
      )}

    </div>
  );
};
