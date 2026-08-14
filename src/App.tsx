import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';
import { LoadingSkeleton } from './components/common/LoadingSkeleton';

import { Login } from './pages/Login';
import { Onboarding } from './pages/Onboarding';
import { Home } from './pages/Home';
import { OPBooking } from './pages/OPBooking';
import { MyOP } from './pages/MyOP';
import { LiveQueue } from './pages/LiveQueue';
import { Medicines } from './pages/Medicines';
import { BloodBank } from './pages/BloodBank';
import { Reports } from './pages/Reports';
import { Hospitals } from './pages/Hospitals';
import { Wallet } from './pages/Wallet';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';

function MainApp() {
  const { profile, isLoading } = useApp();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('home');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-200 text-center">
          <div className="w-10 h-10 border-4 border-teal-700 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h3 className="font-extrabold text-slate-900 text-base">QCare Kerala</h3>
          <p className="text-xs text-slate-500 mt-1">Connecting to Government Health Services...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  if (profile && !profile.is_profile_complete) {
    return <Onboarding onComplete={() => setActiveTab('home')} />;
  }

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <Home setActiveTab={setActiveTab} />;
      case 'op-booking':
        return <OPBooking setActiveTab={setActiveTab} />;
      case 'my-op':
        return <MyOP setActiveTab={setActiveTab} />;
      case 'live-queue':
        return <LiveQueue setActiveTab={setActiveTab} />;
      case 'medicines':
        return <Medicines />;
      case 'blood-bank':
        return <BloodBank />;
      case 'reports':
        return <Reports />;
      case 'hospitals':
        return <Hospitals setActiveTab={setActiveTab} />;
      case 'wallet':
        return <Wallet />;
      case 'notifications':
        return <Notifications setActiveTab={setActiveTab} />;
      case 'profile':
        return <Profile onLogout={() => setIsAuthenticated(false)} setActiveTab={setActiveTab} />;
      default:
        return <Home setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 antialiased selection:bg-teal-100 selection:text-teal-900">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderActivePage()}
        </main>
      </div>

      <Footer />
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
