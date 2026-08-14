import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Bell, CheckCheck, Clock, Droplet, Pill, FileText, Calendar, ShieldCheck } from 'lucide-react';

interface NotificationsProps {
  setActiveTab: (tab: string) => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ setActiveTab }) => {
  const { notifications, language, markNotificationRead, markAllNotificationsRead } = useApp();
  const t = getTranslation(language);

  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const filtered =
    categoryFilter === 'All'
      ? notifications
      : notifications.filter((n) => n.category === categoryFilter);

  const getIcon = (cat: string) => {
    switch (cat) {
      case 'OP': return <Calendar className="w-4 h-4 text-teal-700" />;
      case 'Queue': return <Clock className="w-4 h-4 text-emerald-700" />;
      case 'Medicine': return <Pill className="w-4 h-4 text-blue-700" />;
      case 'Blood': return <Droplet className="w-4 h-4 text-rose-700" />;
      case 'Reports': return <FileText className="w-4 h-4 text-indigo-700" />;
      default: return <Bell className="w-4 h-4 text-slate-700" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
            Public Healthcare Feed & Alerts
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 mt-0.5">{t.nav.notifications}</h1>
        </div>

        <button
          onClick={() => markAllNotificationsRead()}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer min-h-[44px]"
        >
          <CheckCheck className="w-4 h-4 text-slate-600" />
          <span>Mark All Read</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {['All', 'OP', 'Queue', 'Medicine', 'Blood', 'Reports', 'System'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3.5 py-2 rounded-xl transition-colors cursor-pointer shrink-0 min-h-[40px] ${
              categoryFilter === cat
                ? 'bg-teal-700 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filtered.map((n) => (
          <div
            key={n.id}
            onClick={() => {
              markNotificationRead(n.id);
              if (n.link_path) setActiveTab(n.link_path.replace('/', ''));
            }}
            className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
              n.is_read
                ? 'bg-white border-slate-200 text-slate-700'
                : 'bg-teal-50/50 border-teal-300 text-slate-900 shadow-2xs font-semibold'
            }`}
          >
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shrink-0">
              {getIcon(n.category)}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-900">{n.title}</h4>
                <span className="text-[10px] text-slate-400 font-medium">
                  {n.created_at ? 'Recently' : ''}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{n.message}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
