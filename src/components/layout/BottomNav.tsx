import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../translations';
import {
  Home,
  Clock,
  PlusCircle,
  Droplet,
  Menu,
  Activity,
  Pill,
  FileText,
  Building2,
  Wallet,
  User,
  Bell,
  X
} from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const { language, unreadNotifCount } = useApp();
  const t = getTranslation(language);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const primaryItems = [
    { id: 'home', label: t.nav.home, icon: Home },
    { id: 'my-op', label: t.nav.myOp, icon: Clock },
    { id: 'op-booking', label: t.nav.opBooking, icon: PlusCircle, isPrimaryBtn: true },
    { id: 'blood-bank', label: t.nav.bloodBank, icon: Droplet },
    { id: 'more', label: t.nav.more, icon: Menu }
  ];

  const secondaryItems = [
    { id: 'live-queue', label: t.nav.liveQueue, icon: Activity },
    { id: 'medicines', label: t.nav.medicines, icon: Pill },
    { id: 'reports', label: t.nav.reports, icon: FileText },
    { id: 'hospitals', label: t.nav.hospitals, icon: Building2 },
    { id: 'wallet', label: t.nav.wallet, icon: Wallet },
    { id: 'notifications', label: t.nav.notifications, icon: Bell, badge: unreadNotifCount },
    { id: 'profile', label: t.nav.profile, icon: User }
  ];

  const handleTabClick = (id: string) => {
    if (id === 'more') {
      setIsMoreOpen(!isMoreOpen);
    } else {
      setActiveTab(id);
      setIsMoreOpen(false);
    }
  };

  return (
    <>
      {/* "More" Secondary Drawer Menu */}
      {isMoreOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-2xl p-5 border-t border-slate-200 shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h4 className="font-bold text-slate-900 text-base">Additional Healthcare Services</h4>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabClick(item.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-sm font-semibold transition-colors cursor-pointer min-h-[48px] ${
                      isActive
                        ? 'bg-teal-50 border-teal-300 text-teal-800'
                        : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-teal-700" />
                    <span>{item.label}</span>
                    {item.badge && item.badge > 0 ? (
                      <span className="ml-auto bg-rose-600 text-white font-bold text-[10px] px-1.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Fixed Mobile Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200/90 shadow-lg px-2 py-1">
        <div className="flex items-center justify-around h-14">
          {primaryItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'more' && isMoreOpen);

            if (item.isPrimaryBtn) {
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  className="flex flex-col items-center justify-center -mt-5 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center shadow-md border-2 border-white">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-teal-800 mt-0.5">{item.label}</span>
                </button>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-3 min-h-[44px] cursor-pointer ${
                  isActive ? 'text-teal-800 font-bold' : 'text-slate-500 font-medium hover:text-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
