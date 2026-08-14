import React from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../translations';
import {
  Home,
  Calendar,
  Clock,
  Activity,
  Pill,
  Droplet,
  FileText,
  Building2,
  Wallet,
  User,
  Bell
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { language, unreadNotifCount } = useApp();
  const t = getTranslation(language);

  const navItems = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'op-booking', label: t.nav.opBooking, icon: Calendar },
    { id: 'my-op', label: t.nav.myOp, icon: Clock },
    { id: 'live-queue', label: t.nav.liveQueue, icon: Activity },
    { id: 'medicines', label: t.nav.medicines, icon: Pill },
    { id: 'blood-bank', label: t.nav.bloodBank, icon: Droplet },
    { id: 'reports', label: t.nav.reports, icon: FileText },
    { id: 'hospitals', label: t.nav.hospitals, icon: Building2 },
    { id: 'wallet', label: t.nav.wallet, icon: Wallet },
    { id: 'notifications', label: t.nav.notifications, icon: Bell, badge: unreadNotifCount },
    { id: 'profile', label: t.nav.profile, icon: User }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 p-4 hidden md:flex flex-col justify-between shrink-0 min-h-[calc(100vh-4rem)]">
      <div className="space-y-1">
        <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
          Digital Services
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer min-h-[44px] ${
                isActive
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-700 hover:bg-slate-100/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && item.badge > 0 ? (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white text-teal-800' : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Emergency Helpline Box */}
      <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-xs mt-6">
        <div className="font-bold text-slate-800">Kerala Health Helplines</div>
        <div className="text-slate-600 mt-1 space-y-0.5">
          <div>DISHA: <strong className="text-rose-700">1056</strong></div>
          <div>Emergency: <strong className="text-slate-900">104</strong></div>
        </div>
      </div>
    </aside>
  );
};
