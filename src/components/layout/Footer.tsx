import React from 'react';
import { ShieldCheck, PhoneCall, Info } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 text-xs py-8 px-4 sm:px-6 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="flex items-center gap-2 font-extrabold text-sm text-white mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>QCare Kerala Digital Health Portal</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Health & Family Welfare Department, Government of Kerala. Providing transparent, wait-free OP token allocation and digital health access across all 14 districts.
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 font-extrabold text-sm text-white mb-2">
            <PhoneCall className="w-4 h-4 text-emerald-400" />
            <span>24x7 Government Helplines</span>
          </div>
          <ul className="space-y-1 text-slate-400">
            <li>DISHA Health Line: <strong className="text-white">1056</strong> (Toll-Free)</li>
            <li>Kerala Ambulance Service: <strong className="text-white">108</strong></li>
            <li>Chief Minister's Distress Relief: <strong className="text-white">1070</strong></li>
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-2 font-extrabold text-sm text-white mb-2">
            <Info className="w-4 h-4 text-emerald-400" />
            <span>Important Guidelines</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Online OP token booking closes at <strong className="text-amber-300">9:00 AM IST</strong> for today's OPD session. Offline registration counters remain operational at all government hospitals.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800 mt-6 pt-4 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div>© 2026 Government of Kerala. All rights reserved.</div>
        <div>Designed for public healthcare accessibility across Kerala.</div>
      </div>
    </footer>
  );
};
