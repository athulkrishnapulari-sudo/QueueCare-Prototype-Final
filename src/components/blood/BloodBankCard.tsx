import React from 'react';
import { BloodBank, BloodGroup } from '../../types';
import { Droplet, MapPin, Phone, Clock, AlertCircle } from 'lucide-react';

interface BloodBankCardProps {
  bloodBank: BloodBank;
  selectedGroup: BloodGroup;
}

export const BloodBankCard: React.FC<BloodBankCardProps> = ({ bloodBank, selectedGroup }) => {
  const availableUnits = bloodBank.inventory[selectedGroup] || 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 transition-all">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h4 className="font-bold text-slate-900 text-sm">{bloodBank.hospital_name}</h4>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{bloodBank.address}</span>
          </div>
        </div>

        {/* Selected Blood Group Banner */}
        <div className="bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl text-center shrink-0">
          <div className="text-[10px] font-bold text-rose-800 uppercase">{selectedGroup} Stock</div>
          <div className="text-xl font-extrabold text-rose-700">{availableUnits} Units</div>
        </div>
      </div>

      {/* Grid of All Blood Group Stocks */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100 my-3 text-center">
        {(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as BloodGroup[]).map((bg) => {
          const units = bloodBank.inventory[bg] || 0;
          const isSelected = bg === selectedGroup;

          return (
            <div
              key={bg}
              className={`p-1.5 rounded-lg text-xs font-semibold ${
                isSelected
                  ? 'bg-rose-700 text-white shadow-2xs'
                  : units > 0
                  ? 'bg-white text-slate-800 border border-slate-200'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              <div className="text-[10px] opacity-80">{bg}</div>
              <div className="font-extrabold">{units}</div>
            </div>
          );
        })}
      </div>

      {/* Footer Info & Call Button */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>Updated {bloodBank.last_updated ? '12m ago' : 'Recently'}</span>
        </div>

        <a
          href={`tel:${bloodBank.phone}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-700 hover:bg-rose-800 text-white rounded-lg font-semibold transition-colors min-h-[44px]"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Blood Bank ({bloodBank.phone})</span>
        </a>
      </div>
    </div>
  );
};
