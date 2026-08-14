import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { User, Phone, MapPin, Calendar, Heart, Users, Globe, Bookmark, LogOut, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ProfileProps {
  onLogout: () => void;
  setActiveTab: (tab: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({ onLogout, setActiveTab }) => {
  const {
    profile,
    familyMembers,
    wallet,
    language,
    savedHospitals,
    setLanguage
  } = useApp();

  const t = getTranslation(language);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header Profile Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-800 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
            {profile?.full_name?.charAt(0) || 'U'}
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900">{profile?.full_name}</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              UHID: <strong className="text-slate-800">{profile?.uhid}</strong> · District: {profile?.district}
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-xl text-xs font-bold transition-colors cursor-pointer min-h-[44px]"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Personal Information Grid */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
          <User className="w-4 h-4 text-teal-700" />
          <span>Personal & Demographic Information</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl text-xs">
          <div>
            <div className="text-slate-500 font-medium">Mobile Phone</div>
            <div className="font-bold text-slate-900 mt-0.5">{profile?.phone}</div>
          </div>
          <div>
            <div className="text-slate-500 font-medium">Date of Birth</div>
            <div className="font-bold text-slate-900 mt-0.5">{profile?.date_of_birth}</div>
          </div>
          <div>
            <div className="text-slate-500 font-medium">Gender</div>
            <div className="font-bold text-slate-900 mt-0.5">{profile?.gender}</div>
          </div>
          <div>
            <div className="text-slate-500 font-medium">Blood Group</div>
            <div className="font-extrabold text-rose-700 mt-0.5">{profile?.blood_group}</div>
          </div>
        </div>

        <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
          <span className="font-bold text-slate-800">Residential Address:</span> {profile?.address}
        </div>
      </section>

      {/* Family Members Section */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-teal-700" />
            <span>Family Members ({familyMembers.length})</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {familyMembers.map((fam) => (
            <div key={fam.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div className="flex justify-between font-bold text-slate-900">
                <span>{fam.full_name}</span>
                <span className="text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full text-[10px] uppercase">
                  {fam.relationship}
                </span>
              </div>
              <div className="text-slate-500 mt-1">UHID: {fam.uhid} · Blood: {fam.blood_group}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Language & Preferences */}
      <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
        <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider flex items-center gap-2">
          <Globe className="w-4 h-4 text-teal-700" />
          <span>Language Preference</span>
        </h2>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setLanguage('en')}
            className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 cursor-pointer min-h-[44px] ${
              language === 'en'
                ? 'bg-teal-50 border-teal-600 text-teal-900'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <span>English</span>
          </button>
          <button
            onClick={() => setLanguage('ml')}
            className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 cursor-pointer min-h-[44px] ${
              language === 'ml'
                ? 'bg-teal-50 border-teal-600 text-teal-900'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <span>മലയാളം (Malayalam)</span>
          </button>
        </div>
      </section>

    </div>
  );
};
