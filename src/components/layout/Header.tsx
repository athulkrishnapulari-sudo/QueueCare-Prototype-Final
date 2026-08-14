import React from 'react';
import { useApp } from '../../context/AppContext';
import { LanguageToggle } from '../common/LanguageToggle';
import { DatabaseStatusBadge } from '../common/DatabaseStatusBadge';
import { Bell, Wallet as WalletIcon, ShieldAlert, HeartPulse } from 'lucide-react';
import logo from "./logo.png";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ setActiveTab }) => {
  const { profile, wallet, unreadNotifCount } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">

          {/* Logo & Government Tag */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl  flex items-center justify-center text-white shadow-xs">
              <img
                src={logo}
                alt="Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-slate-900 tracking-tight">QCare Kerala</span>
                <span className="hidden sm:inline-block text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full uppercase">
                  Govt. Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block">
                Health & Family Welfare Dept, Govt. of Kerala
              </p>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Database Status Badge */}
            

            {/* Wallet Quick Balance Button */}
            <button
              onClick={() => setActiveTab('wallet')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-semibold transition-colors cursor-pointer min-h-[44px]"
            >
              <WalletIcon className="w-4 h-4 text-emerald-700" />
              <span>₹{wallet?.balance.toFixed(2) || '0.00'}</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => setActiveTab('notifications')}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-slate-700" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-600 text-white font-bold text-[10px] rounded-full flex items-center justify-center">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {/* Language Switcher */}
            <LanguageToggle />

            {/* Emergency DISHA 1056 Helpline Badge */}
            <a
              href="tel:1056"
              className="hidden lg:inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-1.5 rounded-lg hover:bg-rose-100 transition-colors"
              title="Kerala Health Helpline"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>DISHA 1056</span>
            </a>

            {/* Profile Avatar button */}
            <button
              onClick={() => setActiveTab('profile')}
              className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200 min-h-[44px] cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-teal-800 text-white font-bold text-xs flex items-center justify-center">
                {profile?.full_name?.charAt(0) || 'U'}
              </div>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
