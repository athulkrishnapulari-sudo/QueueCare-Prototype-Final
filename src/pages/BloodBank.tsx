import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { bloodService } from '../services/bloodService';
import { BloodBank as BloodBankType, BloodGroup, BloodAlert, District } from '../types';
import { BloodBankCard } from '../components/blood/BloodBankCard';
import { Droplet, Bell, MapPin, CheckCircle2, AlertCircle, Plus } from 'lucide-react';

export const BloodBank: React.FC = () => {
  const { profile, language } = useApp();
  const t = getTranslation(language);

  const [selectedGroup, setSelectedGroup] = useState<BloodGroup>('O+');
  const [bloodBanks, setBloodBanks] = useState<BloodBankType[]>([]);
  const [activeAlerts, setActiveAlerts] = useState<BloodAlert[]>([]);
  const [showCreateAlert, setShowCreateAlert] = useState(false);

  // Alert form fields
  const [alertGroup, setAlertGroup] = useState<BloodGroup>('O+');
  const [alertDistrict, setAlertDistrict] = useState<District>(profile?.district || 'Thiruvananthapuram');
  const [alertRadius, setAlertRadius] = useState<number>(10);
  const [patientName, setPatientName] = useState(profile?.full_name || '');
  const [alertPhone, setAlertPhone] = useState(profile?.phone || '');

  useEffect(() => {
    async function loadData() {
      const banks = await bloodService.getBloodBanks(selectedGroup, profile?.district);
      setBloodBanks(banks);

      const alerts = await bloodService.getBloodAlerts();
      setActiveAlerts(alerts);
    }
    loadData();
  }, [selectedGroup, profile?.district]);

  const handleCreateAlert = async (e: React.FormEvent) => {
    e.preventDefault();
    const newAlert = await bloodService.createBloodAlert(
      alertGroup,
      alertDistrict,
      alertRadius,
      patientName,
      alertPhone
    );
    setActiveAlerts((prev) => [newAlert, ...prev]);
    setShowCreateAlert(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">
            Kerala Public Blood Bank Inventory
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 mt-0.5">{t.blood.title}</h1>
        </div>

        <button
          onClick={() => setShowCreateAlert(!showCreateAlert)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer min-h-[44px]"
        >
          <Bell className="w-4 h-4" />
          <span>Create Blood Alert</span>
        </button>
      </div>

      {/* Create Alert Modal / Section */}
      {showCreateAlert && (
        <form onSubmit={handleCreateAlert} className="bg-rose-50 border border-rose-200 p-5 rounded-2xl space-y-4">
          <h3 className="font-bold text-rose-950 text-sm">{t.blood.createAlertTitle}</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-rose-900 uppercase">Blood Group</label>
              <select
                value={alertGroup}
                onChange={(e) => setAlertGroup(e.target.value as BloodGroup)}
                className="w-full p-2.5 bg-white border border-rose-300 rounded-xl text-xs font-bold"
              >
                {(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as BloodGroup[]).map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-rose-900 uppercase">District</label>
              <select
                value={alertDistrict}
                onChange={(e) => setAlertDistrict(e.target.value as District)}
                className="w-full p-2.5 bg-white border border-rose-300 rounded-xl text-xs font-bold"
              >
                {['Thiruvananthapuram', 'Ernakulam', 'Kozhikode', 'Thrissur'].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-rose-900 uppercase">Radius (km)</label>
              <input
                type="number"
                value={alertRadius}
                onChange={(e) => setAlertRadius(Number(e.target.value))}
                className="w-full p-2.5 bg-white border border-rose-300 rounded-xl text-xs font-bold"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowCreateAlert(false)}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-rose-700 text-white rounded-xl font-bold text-xs shadow-xs"
            >
              {t.blood.subscribeAlertBtn}
            </button>
          </div>
        </form>
      )}

      {/* Select Required Blood Group */}
      <section className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <label className="block text-xs font-bold text-slate-700 uppercase">
          {t.blood.selectGroup}
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as BloodGroup[]).map((bg) => (
            <button
              key={bg}
              onClick={() => setSelectedGroup(bg)}
              className={`py-3 px-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer min-h-[44px] ${
                selectedGroup === bg
                  ? 'bg-rose-700 text-white shadow-md'
                  : 'bg-slate-50 text-slate-800 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {bg}
            </button>
          ))}
        </div>
      </section>

      {/* Blood Banks List */}
      <section className="space-y-3">
        <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          Nearby Participating Blood Banks ({selectedGroup})
        </h2>

        <div className="space-y-3">
          {bloodBanks.map((bank) => (
            <BloodBankCard
              key={bank.id}
              bloodBank={bank}
              selectedGroup={selectedGroup}
            />
          ))}
        </div>
      </section>

    </div>
  );
};
