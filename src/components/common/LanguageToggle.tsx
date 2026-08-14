import React from 'react';
import { useApp } from '../../context/AppContext';
import { Globe } from 'lucide-react';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useApp();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'ml' : 'en')}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer min-h-[44px]"
      title="Switch Language / ഭാഷ മാറ്റുക"
    >
      <Globe className="w-4 h-4 text-teal-700" />
      <span>{language === 'en' ? 'മലയാളം' : 'English'}</span>
    </button>
  );
};
