import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { District, BloodGroup, Language } from '../types';
import { User, Phone, MapPin, Calendar as CalendarIcon, Heart, Users, CheckCircle2, ArrowRight } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const { profile, updateProfile, addFamilyMember } = useApp();

  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');
  const [uhid, setUhid] = useState(profile?.uhid || `KL-2026-${Math.floor(100000 + Math.random() * 900000)}`);
  const [dob, setDob] = useState(profile?.date_of_birth || '1988-04-12');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>(profile?.gender || 'Male');
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>(profile?.blood_group || 'O+');
  const [address, setAddress] = useState(profile?.address || 'TC 14/820, Kowdiar, Thiruvananthapuram');
  const [district, setDistrict] = useState<District>(profile?.district || 'Thiruvananthapuram');
  const [preferredLang, setPreferredLang] = useState<Language>(profile?.preferred_language || 'en');

  // Family member fields
  const [showAddFamily, setShowAddFamily] = useState(false);
  const [famRelation, setFamRelation] = useState<'Spouse' | 'Child' | 'Parent' | 'Sibling' | 'Other'>('Parent');
  const [famName, setFamName] = useState('');
  const [famPhone, setFamPhone] = useState('');
  const [famDob, setFamDob] = useState('1958-01-15');
  const [famGender, setFamGender] = useState<'Male' | 'Female' | 'Other'>('Female');
  const [famBlood, setFamBlood] = useState<BloodGroup>('O+');

  const [isSaving, setIsSaving] = useState(false);

  const districts: District[] = [
    'Thiruvananthapuram', 'Kollam', 'Pathanamthitta', 'Alappuzha',
    'Kottayam', 'Idukki', 'Ernakulam', 'Thrissur', 'Palakkad',
    'Malappuram', 'Kozhikode', 'Wayanad', 'Kannur', 'Kasaragod'
  ];

  const handleAddFamily = async () => {
    if (!famName.trim()) return;
    await addFamilyMember({
      relationship: famRelation,
      full_name: famName,
      phone: famPhone || phone,
      date_of_birth: famDob,
      gender: famGender,
      blood_group: famBlood
    });
    setFamName('');
    setShowAddFamily(false);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfile({
        full_name: fullName,
        phone,
        uhid,
        date_of_birth: dob,
        gender,
        blood_group: bloodGroup,
        address,
        district,
        preferred_language: preferredLang,
        is_profile_complete: true
      });
      onComplete();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl border border-slate-200 p-6 sm:p-8">
          
          <div className="border-b border-slate-100 pb-4 mb-6">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              Step 1 of 1 · Initial Onboarding
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Complete Your Healthcare Profile
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              This information is linked to your government OP tickets, prescriptions, and health records.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-none min-h-[44px]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Unique Health ID (UHID)
                </label>
                <input
                  type="text"
                  value={uhid}
                  onChange={(e) => setUhid(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 bg-slate-50 focus:ring-2 focus:ring-teal-600 focus:outline-none min-h-[44px]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-none min-h-[44px]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-none min-h-[44px]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-none min-h-[44px]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  Blood Group
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-none min-h-[44px]"
                >
                  {(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as BloodGroup[]).map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                  District (Kerala)
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value as District)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-none min-h-[44px]"
                >
                  {districts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Residential Address
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={2}
                className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-teal-600 focus:outline-none"
                required
              />
            </div>

            {/* Language Preference */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Preferred Interface Language
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPreferredLang('en')}
                  className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 cursor-pointer min-h-[44px] ${
                    preferredLang === 'en'
                      ? 'bg-teal-50 border-teal-600 text-teal-900'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <span>English</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreferredLang('ml')}
                  className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 cursor-pointer min-h-[44px] ${
                    preferredLang === 'ml'
                      ? 'bg-teal-50 border-teal-600 text-teal-900'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <span>മലയാളം (Malayalam)</span>
                </button>
              </div>
            </div>

            {/* Optional Family Members Section */}
            <div className="pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Users className="w-4 h-4 text-teal-700" />
                  <span>Family Members</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddFamily(!showAddFamily)}
                  className="text-xs font-bold text-teal-700 hover:text-teal-800 cursor-pointer min-h-[44px] flex items-center"
                >
                  + Add Family Member
                </button>
              </div>

              {showAddFamily && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 mb-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600">Relationship</label>
                      <select
                        value={famRelation}
                        onChange={(e) => setFamRelation(e.target.value as any)}
                        className="w-full p-2 border border-slate-300 rounded-lg text-xs font-semibold"
                      >
                        <option value="Parent">Parent</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Child">Child</option>
                        <option value="Sibling">Sibling</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600">Full Name</label>
                      <input
                        type="text"
                        value={famName}
                        onChange={(e) => setFamName(e.target.value)}
                        placeholder="e.g. K. P. Nair"
                        className="w-full p-2 border border-slate-300 rounded-lg text-xs font-semibold"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddFamily(false)}
                      className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleAddFamily}
                      className="px-3 py-1.5 bg-teal-700 text-white rounded-lg text-xs font-bold"
                    >
                      Save Family Member
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-sm shadow-md transition-colors min-h-[44px] cursor-pointer"
              >
                {isSaving ? (
                  <span>Saving Profile...</span>
                ) : (
                  <>
                    <span>Complete Onboarding & Launch Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  );
};
