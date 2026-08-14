import React from 'react';
import { Appointment } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../translations';
import { Clock, Users, Hospital, Stethoscope, Ticket, Volume2, ArrowUpRight } from 'lucide-react';

interface LiveQueueCardProps {
  appointment: Appointment;
  onOpenTicket?: () => void;
  onViewQueueDetails?: () => void;
}

export const LiveQueueCard: React.FC<LiveQueueCardProps> = ({
  appointment,
  onOpenTicket,
  onViewQueueDetails
}) => {
  const { language } = useApp();
  const t = getTranslation(language);

  // Progress percentage
  const totalTokensEstimated = 45;
  const currentNum = parseInt(appointment.now_serving_token.split('-')[1] || '1', 10);
  const userNum = parseInt(appointment.token_number.split('-')[1] || '1', 10);
  const progressPct = Math.min(100, Math.max(5, Math.round((currentNum / Math.max(1, userNum)) * 100)));

  return (
    <div className="bg-white rounded-2xl border-2 border-teal-700/20 shadow-md p-5 relative overflow-hidden">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
            {t.queue.title}
          </span>
        </div>
        <StatusBadge status={appointment.status} />
      </div>

      {/* Main Tokens Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        
        {/* Now Serving */}
        <div className="bg-slate-900 text-white p-3.5 rounded-xl text-center">
          <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wide block">
            {t.queue.nowServingToken}
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 mt-1">
            {appointment.now_serving_token}
          </div>
        </div>

        {/* Your Token */}
        <div className="bg-teal-50 border-2 border-teal-600 p-3.5 rounded-xl text-center">
          <span className="text-[11px] text-teal-800 font-bold uppercase tracking-wide block">
            {t.queue.yourToken}
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-teal-900 mt-1">
            {appointment.token_number}
          </div>
        </div>

      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl text-xs mb-4">
        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <Users className="w-4 h-4 text-teal-700 shrink-0" />
          <span>Ahead of You: <strong className="text-slate-900">{appointment.queue_position}</strong></span>
        </div>
        <div className="flex items-center gap-2 text-slate-700 font-medium">
          <Clock className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Est. Wait: <strong className="text-slate-900">{appointment.estimated_wait_mins}m</strong></span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-[11px] font-semibold text-slate-500 mb-1">
          <span>Queue Progression</span>
          <span>{progressPct}%</span>
        </div>
        <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-teal-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Hospital & Doctor Details */}
      <div className="space-y-1 text-xs text-slate-600 mb-4 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2 font-medium text-slate-800">
          <Hospital className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="truncate">{appointment.hospital_name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Stethoscope className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span>{appointment.department_name} · {appointment.doctor_name}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {onOpenTicket && (
          <button
            onClick={onOpenTicket}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors min-h-[44px] cursor-pointer"
          >
            <Ticket className="w-4 h-4 text-slate-600" />
            <span>Digital Ticket</span>
          </button>
        )}
        {onViewQueueDetails && (
          <button
            onClick={onViewQueueDetails}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-semibold transition-colors min-h-[44px] cursor-pointer"
          >
            <span>Live Screen</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        )}
      </div>

    </div>
  );
};
