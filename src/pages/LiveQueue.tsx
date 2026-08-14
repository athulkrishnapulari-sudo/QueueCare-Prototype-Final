import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { LiveQueueCard } from '../components/queue/LiveQueueCard';
import { DigitalOPTicket } from '../components/common/DigitalOPTicket';
import { Activity, Volume2, VolumeX, ShieldAlert, Clock, Calendar } from 'lucide-react';

interface LiveQueueProps {
  setActiveTab: (tab: string) => void;
}

export const LiveQueue: React.FC<LiveQueueProps> = ({ setActiveTab }) => {
  const { activeAppointment, language } = useApp();
  const t = getTranslation(language);

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedTicketApt, setSelectedTicketApt] = useState<any | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
            Supabase Realtime OP Queue Monitor
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 mt-0.5">{t.queue.title}</h1>
        </div>

        {/* Audio Notification Switcher */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold cursor-pointer min-h-[44px] ${
            soundEnabled
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
              : 'bg-slate-100 text-slate-500 border-slate-200'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-700" /> : <VolumeX className="w-4 h-4" />}
          <span>{soundEnabled ? 'Audio Alert On' : 'Audio Alert Off'}</span>
        </button>
      </div>

      {activeAppointment ? (
        <div className="space-y-4">
          <LiveQueueCard
            appointment={activeAppointment}
            onOpenTicket={() => setSelectedTicketApt(activeAppointment)}
          />

          {/* Guidelines Box */}
          <div className="bg-teal-50 border border-teal-200 p-4 rounded-2xl text-xs space-y-1.5 text-teal-900">
            <div className="font-bold text-sm">Hospital OP Room Guidelines:</div>
            <ul className="list-disc list-inside space-y-1 opacity-90">
              <li>Please remain seated in the OP waiting hall when your token is within 5 numbers.</li>
              <li>When your token is called on screen, proceed immediately to Room {activeAppointment.department_name}.</li>
              <li>Have your Digital OP Ticket or UHID number ready for entry verification.</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
          <Activity className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Active Live OP Session</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-5">
            You do not currently have an active outpatient token waiting in queue today.
          </p>
          <button
            onClick={() => setActiveTab('op-booking')}
            className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer min-h-[44px]"
          >
            {t.home.bookOpButton}
          </button>
        </div>
      )}

      {selectedTicketApt && (
        <DigitalOPTicket
          appointment={selectedTicketApt}
          onClose={() => setSelectedTicketApt(null)}
        />
      )}

    </div>
  );
};
