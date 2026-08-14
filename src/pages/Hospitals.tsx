import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { hospitalService } from '../services/hospitalService';
import { Hospital, District, KERALA_DISTRICTS } from '../types';
import { StatusBadge } from '../components/common/StatusBadge';
import { Building2, Search, MapPin, Phone, Bookmark, Calendar, ArrowRight } from 'lucide-react';

interface HospitalsProps {
  setActiveTab: (tab: string) => void;
}

export const Hospitals: React.FC<HospitalsProps> = ({ setActiveTab }) => {
  const { profile, language, isHospitalSaved, toggleSaveHospital } = useApp();
  const t = getTranslation(language);

  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [district, setDistrict] = useState<District | 'All'>('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await hospitalService.getHospitals(
        district === 'All' ? undefined : district,
        search
      );
      setHospitals(data);
      setLoading(false);
    }
    loadData();
  }, [district, search]);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
          Government & General Hospitals Directory
        </span>
        <h1 className="text-xl font-extrabold text-slate-900 mt-0.5">{t.nav.hospitals}</h1>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search hospital by name or district..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-none min-h-[44px]"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
        </div>

        <select
          value={district}
          onChange={(e) => setDistrict(e.target.value as District | 'All')}
          className="p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 min-h-[44px]"
        >
          <option value="All">All Districts (Kerala)</option>
          {KERALA_DISTRICTS.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Hospital Cards List */}
      <div className="space-y-3">
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 text-sm text-slate-600">
            Loading hospitals from live API...
          </div>
        ) : hospitals.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-5 text-sm text-slate-600">
            No hospitals available from the live API. Add <span className="font-semibold">VITE_HOSPITALS_API_URL</span> or <span className="font-semibold">VITE_API_BASE_URL</span> in your environment.
          </div>
        ) : (
          hospitals.map((hosp) => {
            const isSaved = isHospitalSaved(hosp.id);

            return (
              <div
                key={hosp.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full uppercase">
                      {hosp.type}
                    </span>
                    <StatusBadge status={hosp.current_load} size="sm" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{hosp.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{hosp.address}</span>
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    Phone: {hosp.phone} · Distance: {hosp.distance_km} km
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                  <button
                    onClick={() => toggleSaveHospital(hosp.id)}
                    className={`p-2.5 rounded-xl border transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center ${
                      isSaved
                        ? 'bg-amber-50 border-amber-300 text-amber-700'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                    }`}
                    title={isSaved ? 'Saved Hospital' : 'Save Hospital'}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-600' : ''}`} />
                  </button>

                  <button
                    onClick={() => setActiveTab('op-booking')}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer min-h-[44px]"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book OP Ticket</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
