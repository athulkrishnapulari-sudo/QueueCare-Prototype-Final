import React, { useState } from 'react';
import { authService } from '../services/authService';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { HeartPulse, Phone, ShieldCheck, ArrowRight, KeyRound } from 'lucide-react';

interface LoginProps {
  onLoginSuccess: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const { language, updateProfile } = useApp();
  const t = getTranslation(language);

  const [inputVal, setInputVal] = useState('+91 98470 12345');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) {
      setErrorMsg('Please enter a valid Phone number or UHID');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await authService.loginWithPhoneOrUHID(inputVal);
      await updateProfile(res.profile);
      onLoginSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || 'Login failed. Please check credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 p-4">
      
      {/* Header Badge */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-6">
        <div className="w-14 h-14 rounded-2xl bg-teal-700 mx-auto flex items-center justify-center text-white shadow-md mb-3">
          <HeartPulse className="w-8 h-8 text-emerald-300" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.appName}
        </h2>
        <p className="mt-1 text-xs sm:text-sm font-semibold text-teal-800">
          {t.deptHeader}
        </p>
      </div>

      {/* Login Form Card */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-slate-200/80">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-900">Access Health Services</h3>
            <p className="text-xs text-slate-500 mt-1">
              Enter your registered Mobile Number or Unique Health ID (UHID) to log in.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-xl font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Mobile Number or UHID
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="e.g. +91 98470 12345 or KL-2026-984210"
                  className="block w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-teal-600 min-h-[44px]"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-600 transition-colors cursor-pointer min-h-[44px] disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Verifying credentials...</span>
              ) : (
                <>
                  <span>Sign In / Continue</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Verification Note */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center gap-2.5 text-xs text-slate-500">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Official digital access portal secured by Supabase Auth & Government Health Registries.</span>
          </div>
        </div>

        {/* Demo Fast Login Switcher */}
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-500 mb-2 font-medium">Quick Demo Credentials:</p>
          <div className="flex justify-center gap-2 text-xs">
            <button
              onClick={() => setInputVal('+91 98470 12345')}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 font-semibold cursor-pointer"
            >
              Rajesh Nair (+91 98470 12345)
            </button>
            <button
              onClick={() => setInputVal('KL-2026-984210')}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 font-semibold cursor-pointer"
            >
              UHID: KL-2026-984210
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
