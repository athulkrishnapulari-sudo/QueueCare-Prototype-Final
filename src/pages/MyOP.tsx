import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { Appointment } from '../types';
import { DigitalOPTicket } from '../components/common/DigitalOPTicket';
import { StatusBadge } from '../components/common/StatusBadge';
import { Clock, Calendar, Hospital, Stethoscope, Ticket, ArrowRight, Ban, RefreshCw, FileText } from 'lucide-react';

interface MyOPProps {
  setActiveTab: (tab: string) => void;
}

export const MyOP: React.FC<MyOPProps> = ({ setActiveTab }) => {
  const { appointments, cancelAppointment, language } = useApp();
  const t = getTranslation(language);

  const [activeSubTab, setActiveSubTab] = useState<'current' | 'upcoming' | 'past'>('current');
  const [selectedTicketApt, setSelectedTicketApt] = useState<Appointment | null>(null);

  const todayStr = new Date().toISOString().split('T')[0];

  const currentApts = appointments.filter(
    (a) => a.appointment_date === todayStr && a.status !== 'Completed' && a.status !== 'Cancelled'
  );

  const upcomingApts = appointments.filter(
    (a) => a.appointment_date > todayStr && a.status !== 'Completed' && a.status !== 'Cancelled'
  );

  const pastApts = appointments.filter(
    (a) => a.appointment_date < todayStr || a.status === 'Completed' || a.status === 'Cancelled'
  );

  const activeList =
    activeSubTab === 'current'
      ? currentApts
      : activeSubTab === 'upcoming'
      ? upcomingApts
      : pastApts;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
            Patient Appointments History
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 mt-0.5">{t.nav.myOp}</h1>
        </div>

        <button
          onClick={() => setActiveTab('op-booking')}
          className="px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer min-h-[44px]"
        >
          + {t.home.bookOpButton}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-xl p-1 shadow-2xs">
        {[
          { id: 'current', label: `Today's OP (${currentApts.length})` },
          { id: 'upcoming', label: `Upcoming OP (${upcomingApts.length})` },
          { id: 'past', label: `Past OP History (${pastApts.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer min-h-[44px] ${
              activeSubTab === tab.id
                ? 'bg-teal-700 text-white shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Appointment Cards List */}
      <div className="space-y-3">
        {activeList.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500">
            <Clock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-800">No appointments found in this section.</p>
            <p className="text-xs text-slate-500 mt-1">
              Book outpatient tickets for government hospitals across Kerala.
            </p>
          </div>
        ) : (
          activeList.map((apt) => (
            <div
              key={apt.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:border-slate-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                <div>
                  <span className="text-[11px] font-bold text-slate-500">Ref: {apt.booking_reference}</span>
                  <h3 className="font-bold text-slate-900 text-base">{apt.hospital_name}</h3>
                </div>
                <StatusBadge status={apt.status} />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl text-xs mb-4">
                <div>
                  <div className="text-slate-500 font-medium">Department</div>
                  <div className="font-bold text-slate-900 mt-0.5">{apt.department_name}</div>
                </div>
                <div>
                  <div className="text-slate-500 font-medium">Doctor</div>
                  <div className="font-bold text-slate-900 mt-0.5">{apt.doctor_name}</div>
                </div>
                <div>
                  <div className="text-slate-500 font-medium">Date & Time</div>
                  <div className="font-bold text-teal-800 mt-0.5">{apt.appointment_date} · {apt.appointment_time}</div>
                </div>
                <div>
                  <div className="text-slate-500 font-medium">Token Number</div>
                  <div className="font-extrabold text-emerald-700 text-sm mt-0.5">{apt.token_number}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  onClick={() => setSelectedTicketApt(apt)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold cursor-pointer min-h-[44px]"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Digital OP Ticket</span>
                </button>

                {(apt.status === 'Waiting' || apt.status === 'Called') && (
                  <button
                    onClick={() => setActiveTab('live-queue')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-semibold cursor-pointer min-h-[44px]"
                  >
                    <span>{t.home.viewQueueBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                {activeSubTab === 'past' && (
                  <>
                    <button
                      onClick={() => setActiveTab('medicines')}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-50 text-blue-900 border border-blue-200 rounded-xl text-xs font-semibold cursor-pointer min-h-[44px]"
                    >
                      <FileText className="w-4 h-4" />
                      <span>View Prescription</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('op-booking')}
                      className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-900 border border-emerald-200 rounded-xl text-xs font-semibold cursor-pointer min-h-[44px]"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Book Follow-up</span>
                    </button>
                  </>
                )}

                {apt.status === 'Waiting' && (
                  <button
                    onClick={() => cancelAppointment(apt.id)}
                    className="inline-flex items-center gap-1 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-800 rounded-xl text-xs font-semibold cursor-pointer min-h-[44px] ml-auto"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    <span>Cancel Booking</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {selectedTicketApt && (
        <DigitalOPTicket
          appointment={selectedTicketApt}
          onClose={() => setSelectedTicketApt(null)}
          onViewLiveQueue={() => {
            setSelectedTicketApt(null);
            setActiveTab('live-queue');
          }}
        />
      )}

    </div>
  );
};
