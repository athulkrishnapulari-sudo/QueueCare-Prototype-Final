import React from 'react';
import { Appointment } from '../../types';
import { downloadDigitalOPTicket } from '../../lib/pdf';
import { useApp } from '../../context/AppContext';
import { getTranslation } from '../../translations';
import { Printer, X, CheckCircle2, QrCode } from 'lucide-react';

interface DigitalOPTicketProps {
  appointment: Appointment;
  onClose: () => void;
  onViewLiveQueue?: () => void;
}

export const DigitalOPTicket: React.FC<DigitalOPTicketProps> = ({
  appointment,
  onClose,
  onViewLiveQueue
}) => {
  const { language } = useApp();
  const t = getTranslation(language);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <div className="text-center border-b border-slate-100 pb-4 mb-4">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full uppercase tracking-wider mb-2">
            Health & Family Welfare Dept · Govt of Kerala
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">{t.appName} Digital OP Ticket</h3>
          <p className="text-xs text-slate-500 mt-0.5">Booking Ref: <strong className="text-slate-800">{appointment.booking_reference}</strong></p>
        </div>

        {/* Big Token Display */}
        <div className="bg-emerald-50/80 border-2 border-dashed border-emerald-500/80 rounded-xl p-5 text-center my-4">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
            {t.home.tokenLabel}
          </span>
          <div className="text-4xl font-extrabold text-emerald-700 tracking-tight my-1">
            {appointment.token_number}
          </div>
          <div className="inline-flex items-center gap-1 text-xs text-emerald-800 font-semibold mt-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Registration Fee ₹{appointment.fee_paid.toFixed(2)} Paid ({appointment.payment_method})</span>
          </div>
        </div>

        {/* Key Appointment Details */}
        <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200/80 mb-5">
          <div>
            <div className="text-slate-500 font-medium">Patient Name</div>
            <div className="font-semibold text-slate-900 mt-0.5">{appointment.patient_name}</div>
            <div className="text-slate-500 text-[11px]">{appointment.patient_relationship} · {appointment.patient_gender}</div>
          </div>
          <div>
            <div className="text-slate-500 font-medium">UHID Number</div>
            <div className="font-semibold text-slate-900 mt-0.5">{appointment.patient_uhid}</div>
          </div>
          <div>
            <div className="text-slate-500 font-medium">Hospital Name</div>
            <div className="font-semibold text-slate-900 mt-0.5">{appointment.hospital_name}</div>
          </div>
          <div>
            <div className="text-slate-500 font-medium">Department</div>
            <div className="font-semibold text-slate-900 mt-0.5">{appointment.department_name}</div>
          </div>
          <div>
            <div className="text-slate-500 font-medium">Doctor Assigned</div>
            <div className="font-semibold text-slate-900 mt-0.5">{appointment.doctor_name}</div>
          </div>
          <div>
            <div className="text-slate-500 font-medium">Date & Time</div>
            <div className="font-semibold text-slate-900 mt-0.5">{appointment.appointment_date} at {appointment.appointment_time}</div>
          </div>
        </div>

        {/* QR Code representation */}
        <div className="flex items-center justify-between bg-white border border-slate-200 p-3.5 rounded-xl mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-slate-100 rounded-lg">
              <QrCode className="w-8 h-8 text-slate-700" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-800">Scan at Hospital Counter</div>
              <div className="text-[11px] text-slate-500">Show this QR or token code to entry verification</div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <button
            onClick={() => downloadDigitalOPTicket(appointment)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold transition-colors min-h-[44px] cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>{t.booking.downloadTicket}</span>
          </button>
          {onViewLiveQueue && (
            <button
              onClick={onViewLiveQueue}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-sm font-semibold transition-colors min-h-[44px] cursor-pointer"
            >
              <span>{t.home.viewQueueBtn}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
