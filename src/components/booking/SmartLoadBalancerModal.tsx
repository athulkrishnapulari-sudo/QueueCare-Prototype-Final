import React from 'react';
import { SmartSuggestion } from '../../types';
import { Sparkles, Clock, ArrowRight, ShieldAlert, Check } from 'lucide-react';

interface SmartLoadBalancerModalProps {
  suggestion: SmartSuggestion;
  selectedHospitalName: string;
  onChooseSuggested: (hospitalId: string) => void;
  onContinueSelected: () => void;
}

export const SmartLoadBalancerModal: React.FC<SmartLoadBalancerModalProps> = ({
  suggestion,
  selectedHospitalName,
  onChooseSuggested,
  onContinueSelected
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full p-6 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header Tag */}
        <div className="flex items-center gap-2 text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl w-fit text-xs font-bold mb-4">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>Smart Queue Load Balancing Suggestion</span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 mb-2">
          High Waiting Load at {selectedHospitalName}
        </h3>

        <p className="text-xs text-slate-600 mb-5 leading-relaxed">
          {suggestion.reason}
        </p>

        {/* Comparison Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          
          {/* Selected Hospital */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[11px] font-bold text-slate-500 uppercase">Selected Hospital</div>
            <div className="font-semibold text-slate-800 text-xs mt-1 truncate">{selectedHospitalName}</div>
            <div className="mt-2 text-rose-700 font-extrabold text-sm flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>~{suggestion.estimatedWaitSelectedMins}m wait</span>
            </div>
            <span className="inline-block text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded-full mt-2">
              High Queue
            </span>
          </div>

          {/* Suggested Alternative */}
          <div className="p-3.5 rounded-xl bg-emerald-50/80 border-2 border-emerald-500/80">
            <div className="text-[11px] font-bold text-emerald-800 uppercase flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              <span>Suggested Facility</span>
            </div>
            <div className="font-semibold text-emerald-950 text-xs mt-1 truncate">
              {suggestion.suggestedHospitalName}
            </div>
            <div className="mt-2 text-emerald-700 font-extrabold text-sm flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>~{suggestion.estimatedWaitSuggestedMins}m wait</span>
            </div>
            <span className="inline-block text-[10px] bg-emerald-200/80 text-emerald-900 font-bold px-2 py-0.5 rounded-full mt-2">
              Low Queue Load
            </span>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          {suggestion.suggestedHospitalId && (
            <button
              onClick={() => onChooseSuggested(suggestion.suggestedHospitalId!)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors min-h-[44px] cursor-pointer"
            >
              <span>Choose Suggested Hospital</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onContinueSelected}
            className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors min-h-[44px] cursor-pointer"
          >
            Continue With Selected Hospital
          </button>
        </div>

      </div>
    </div>
  );
};
