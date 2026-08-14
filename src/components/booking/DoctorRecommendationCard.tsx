import React from 'react';
import { Doctor } from '../../types';
import { Sparkles, Clock, CheckCircle2, UserCheck } from 'lucide-react';

interface DoctorRecommendationCardProps {
  doctor: Doctor;
  isRecommended: boolean;
  isSelected: boolean;
  onSelect: () => void;
}

export const DoctorRecommendationCard: React.FC<DoctorRecommendationCardProps> = ({
  doctor,
  isRecommended,
  isSelected,
  onSelect
}) => {
  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative ${
        isSelected
          ? 'bg-teal-50/80 border-teal-700 shadow-sm'
          : isRecommended
          ? 'bg-emerald-50/40 border-emerald-400/80 hover:bg-emerald-50/80'
          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
      }`}
    >
      {isRecommended && (
        <span className="absolute -top-2.5 right-3 bg-emerald-700 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-2xs">
          <Sparkles className="w-3 h-3 text-emerald-200" />
          Recommended Doctor
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm shrink-0">
            {doctor.full_name.charAt(4) || 'D'}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <span>{doctor.full_name}</span>
              {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-700" />}
            </h4>
            <p className="text-xs text-slate-600 font-medium">{doctor.specialization}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">{doctor.qualification}</p>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-200/60 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-1.5 text-slate-600">
          <UserCheck className="w-3.5 h-3.5 text-slate-500" />
          <span>Booked: <strong>{doctor.booked_appointments_count} / {doctor.max_capacity}</strong></span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-600">
          <Clock className="w-3.5 h-3.5 text-slate-500" />
          <span>Next Slot: <strong className="text-emerald-700">{doctor.next_available_slot}</strong></span>
        </div>
      </div>

      {isRecommended && (
        <div className="mt-2 text-[11px] text-emerald-800 font-medium bg-emerald-100/60 p-2 rounded-lg">
          Reason: Lower current appointment load and earlier open slot.
        </div>
      )}
    </div>
  );
};
