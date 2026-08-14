import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../translations';
import { hospitalService } from '../services/hospitalService';
import { appointmentService } from '../services/appointmentService';
import { calculateSmartHospitalSuggestion, recommendDoctor } from '../lib/queue';
import { isOnlineBookingOpenForDate, getTodayDateString, getTomorrowDateString } from '../lib/time';
import {
  Hospital,
  Department,
  Doctor,
  DoctorSlot,
  Appointment,
  SmartSuggestion,
  District
} from '../types';
import { DoctorRecommendationCard } from '../components/booking/DoctorRecommendationCard';
import { SmartLoadBalancerModal } from '../components/booking/SmartLoadBalancerModal';
import { DigitalOPTicket } from '../components/common/DigitalOPTicket';
import { StatusBadge } from '../components/common/StatusBadge';
import {
  Calendar,
  Clock,
  User,
  Users,
  Building2,
  Stethoscope,
  Sparkles,
  CreditCard,
  Wallet as WalletIcon,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Info
} from 'lucide-react';

interface OPBookingProps {
  setActiveTab: (tab: string) => void;
}

export const OPBooking: React.FC<OPBookingProps> = ({ setActiveTab }) => {
  const {
    profile,
    familyMembers,
    appointments,
    wallet,
    language,
    refreshAppointments,
    rechargeWallet
  } = useApp();

  const t = getTranslation(language);

  // Stepper state
  const [step, setStep] = useState<number>(1);

  // Form selections
  const [patientType, setPatientType] = useState<'Myself' | string>('Myself');
  const [selectedFamilyId, setSelectedFamilyId] = useState<string>('');
  const [visitType, setVisitType] = useState<'New Visit' | 'Follow-up'>('New Visit');
  const [selectedPastAptId, setSelectedPastAptId] = useState<string>('');

  const [districtFilter, setDistrictFilter] = useState<District>(profile?.district || 'Thiruvananthapuram');
  const [hospitalsList, setHospitalsList] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);

  const [departmentsList, setDepartmentsList] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);

  const [doctorsList, setDoctorsList] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [recommendedDoc, setRecommendedDoc] = useState<Doctor | null>(null);

  const [slotsList, setSlotsList] = useState<DoctorSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>('');

  const [appointmentDate, setAppointmentDate] = useState<string>(getTodayDateString());
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'QCare Health Balance'>('QCare Health Balance');

  // AI & Cutoff state
  const [smartSuggestion, setSmartSuggestion] = useState<SmartSuggestion | null>(null);
  const [isCutoffClosed, setIsCutoffClosed] = useState<boolean>(false);
  const [cutoffReason, setCutoffReason] = useState<string>('');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string>('');
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  // Check 9 AM Cutoff whenever appointmentDate changes
  useEffect(() => {
    const check = isOnlineBookingOpenForDate(appointmentDate);
    if (!check.isOpen) {
      setIsCutoffClosed(true);
      setCutoffReason(check.reason || 'Online OP booking is closed for today.');
    } else {
      setIsCutoffClosed(false);
      setCutoffReason('');
    }
  }, [appointmentDate]);

  // Load Hospitals on mount or district change
  useEffect(() => {
    async function loadHospitals() {
      const data = await hospitalService.getHospitals(districtFilter);
      setHospitalsList(data);
    }
    loadHospitals();
  }, [districtFilter]);

  // Load Departments when Hospital selected
  const handleSelectHospital = async (hosp: Hospital) => {
    setSelectedHospital(hosp);
    const depts = await hospitalService.getDepartments(hosp.id);
    setDepartmentsList(depts);
    setStep(4);
  };

  // Load Doctors when Department selected + Trigger Smart Load Balancer check
  const handleSelectDepartment = async (dept: Department) => {
    setSelectedDepartment(dept);
    if (selectedHospital) {
      const suggestion = calculateSmartHospitalSuggestion(
        selectedHospital,
        dept.avg_wait_mins,
        hospitalsList
      );
      if (suggestion) {
        setSmartSuggestion(suggestion);
      }
    }

    const docs = await hospitalService.getDoctors(dept.id);
    setDoctorsList(docs);
    setRecommendedDoc(recommendDoctor(docs));
    setStep(6);
  };

  // Load Slots when Doctor selected
  const handleSelectDoctor = async (doc: Doctor) => {
    setSelectedDoctor(doc);
    const slots = await hospitalService.getDoctorSlots(doc.id);
    setSlotsList(slots);
    if (slots.length > 0) {
      const firstAvail = slots.find((s) => s.is_available);
      if (firstAvail) setSelectedSlot(firstAvail.time_slot);
    }
    setStep(7);
  };

  // Handle Booking Submission
  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    setBookingError('');

    let pName = profile?.full_name || 'Patient';
    let pUhid = profile?.uhid || 'KL-2026-984210';
    let pAge = 38;
    let pGender = profile?.gender || 'Male';
    let pRel = 'Myself';

    if (patientType !== 'Myself') {
      const fam = familyMembers.find((f) => f.id === selectedFamilyId);
      if (fam) {
        pName = fam.full_name;
        pUhid = fam.uhid || 'KL-2026-881203';
        pRel = fam.relationship;
        pGender = fam.gender;
      }
    }

    try {
      const result = await appointmentService.createAppointment({
        patientName: pName,
        patientRelationship: pRel,
        patientUhid: pUhid,
        patientAge: pAge,
        patientGender: pGender,
        visitType,
        previousAppointmentId: selectedPastAptId || undefined,
        hospitalId: selectedHospital!.id,
        hospitalName: selectedHospital!.name,
        departmentId: selectedDepartment!.id,
        departmentName: selectedDepartment!.name,
        doctorId: selectedDoctor!.id,
        doctorName: selectedDoctor!.full_name,
        appointmentDate,
        appointmentTime: selectedSlot || '10:30 AM',
        paymentMethod
      });

      await refreshAppointments();
      setConfirmedAppointment(result);
    } catch (err: any) {
      setBookingError(err.message || 'Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (confirmedAppointment) {
    return (
      <DigitalOPTicket
        appointment={confirmedAppointment}
        onClose={() => {
          setConfirmedAppointment(null);
          setActiveTab('my-op');
        }}
        onViewLiveQueue={() => {
          setConfirmedAppointment(null);
          setActiveTab('live-queue');
        }}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
              {t.booking.subtitle}
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 mt-0.5">{t.booking.title}</h1>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-500 font-semibold block">OP Token Fee</span>
            <span className="text-lg font-extrabold text-emerald-700">₹2.00</span>
          </div>
        </div>

        {/* Stepper Progress Indicator */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 mt-5 text-[11px] font-bold text-center">
          {[
            { s: 1, name: t.booking.step1 },
            { s: 2, name: t.booking.step2 },
            { s: 3, name: t.booking.step3 },
            { s: 4, name: t.booking.step4 },
            { s: 5, name: t.booking.step5 },
            { s: 6, name: t.booking.step6 },
            { s: 7, name: t.booking.step7 },
            { s: 8, name: t.booking.step8 }
          ].map((st) => (
            <div
              key={st.s}
              className={`p-1.5 rounded-lg transition-colors ${
                step === st.s
                  ? 'bg-teal-700 text-white'
                  : step > st.s
                  ? 'bg-emerald-100 text-emerald-900'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              <div className="text-[10px] opacity-80">Step {st.s}</div>
              <div className="truncate">{st.name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 9 AM CUTOFF WARNING BANNER (Enforces 9:00 AM IST cutoff rule) */}
      {isCutoffClosed && (
        <div className="bg-amber-50 border-2 border-amber-300 p-4 rounded-2xl text-xs space-y-2">
          <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>{t.booking.cutoffNoticeTitle}</span>
          </div>
          <p className="text-amber-800 leading-relaxed">
            {t.booking.cutoffNoticeMsg}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
            <button
              onClick={() => setAppointmentDate(getTomorrowDateString())}
              className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer min-h-[44px]"
            >
              Book for Tomorrow ({getTomorrowDateString()})
            </button>
            <span className="text-slate-500 font-semibold">or view queue information below.</span>
          </div>
        </div>
      )}

      {/* Smart Hospital Suggestion Modal */}
      {smartSuggestion && (
        <SmartLoadBalancerModal
          suggestion={smartSuggestion}
          selectedHospitalName={selectedHospital?.name || 'Selected Facility'}
          onChooseSuggested={(hospId) => {
            const suggHosp = hospitalsList.find((h) => h.id === hospId);
            if (suggHosp) setSelectedHospital(suggHosp);
            setSmartSuggestion(null);
          }}
          onContinueSelected={() => setSmartSuggestion(null)}
        />
      )}

      {/* STEP 1: PATIENT SELECTION */}
      {step === 1 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <User className="w-5 h-5 text-teal-700" />
            <span>Step 1: Choose Patient</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPatientType('Myself')}
              className={`p-4 rounded-xl border-2 text-left font-bold text-xs transition-all cursor-pointer min-h-[64px] ${
                patientType === 'Myself'
                  ? 'bg-teal-50 border-teal-700 text-teal-900'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{t.booking.patientMyself}</span>
                {patientType === 'Myself' && <CheckCircle2 className="w-4 h-4 text-teal-700" />}
              </div>
              <div className="text-[11px] font-medium text-slate-500 mt-1">
                {profile?.full_name} ({profile?.uhid})
              </div>
            </button>

            {familyMembers.map((fam) => (
              <button
                key={fam.id}
                type="button"
                onClick={() => {
                  setPatientType(fam.id);
                  setSelectedFamilyId(fam.id);
                }}
                className={`p-4 rounded-xl border-2 text-left font-bold text-xs transition-all cursor-pointer min-h-[64px] ${
                  patientType === fam.id
                    ? 'bg-teal-50 border-teal-700 text-teal-900'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{fam.full_name} ({fam.relationship})</span>
                  {patientType === fam.id && <CheckCircle2 className="w-4 h-4 text-teal-700" />}
                </div>
                <div className="text-[11px] font-medium text-slate-500 mt-1">
                  UHID: {fam.uhid}
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-xs transition-colors cursor-pointer min-h-[44px] flex items-center gap-2"
            >
              <span>Continue to Visit Type</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: VISIT TYPE */}
      {step === 2 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Clock className="w-5 h-5 text-teal-700" />
            <span>Step 2: Choose Visit Type</span>
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setVisitType('New Visit')}
              className={`p-4 rounded-xl border-2 font-bold text-xs transition-all cursor-pointer min-h-[56px] ${
                visitType === 'New Visit'
                  ? 'bg-teal-50 border-teal-700 text-teal-900'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {t.booking.visitNew}
            </button>

            <button
              onClick={() => setVisitType('Follow-up')}
              className={`p-4 rounded-xl border-2 font-bold text-xs transition-all cursor-pointer min-h-[56px] ${
                visitType === 'Follow-up'
                  ? 'bg-teal-50 border-teal-700 text-teal-900'
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}
            >
              {t.booking.visitFollowup}
            </button>
          </div>

          {visitType === 'Follow-up' && appointments.length > 0 && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase">
                {t.booking.selectPastAppointment}
              </label>
              <select
                value={selectedPastAptId}
                onChange={(e) => setSelectedPastAptId(e.target.value)}
                className="w-full p-2.5 border border-slate-300 rounded-xl text-xs font-semibold"
              >
                <option value="">-- Choose Past Appointment --</option>
                {appointments.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.hospital_name} - {a.department_name} ({a.appointment_date})
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-200 cursor-pointer min-h-[44px]"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-xs transition-colors cursor-pointer min-h-[44px] flex items-center gap-2"
            >
              <span>Continue to Hospital</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: HOSPITAL SELECTION */}
      {step === 3 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Building2 className="w-5 h-5 text-teal-700" />
              <span>Step 3: Choose Hospital</span>
            </h3>

            {/* District Filter */}
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value as District)}
              className="p-2 border border-slate-300 rounded-xl text-xs font-bold text-slate-800"
            >
              {([
  "Thiruvananthapuram",
  "Kollam",
  "Pathanamthitta",
  "Alappuzha",
  "Kottayam",
  "Idukki",
  "Ernakulam",
  "Thrissur",
  "Palakkad",
  "Malappuram",
  "Kozhikode",
  "Wayanad",
  "Kannur",
  "Kasaragod",
] as District[]).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            {hospitalsList.map((hosp) => (
              <div
                key={hosp.id}
                onClick={() => handleSelectHospital(hosp)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  selectedHospital?.id === hosp.id
                    ? 'bg-teal-50 border-teal-700'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{hosp.name}</h4>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">{hosp.type} · {hosp.address}</div>
                  <div className="text-xs text-teal-800 font-semibold mt-1">Phone: {hosp.phone}</div>
                </div>

                <div className="text-right shrink-0">
                  <StatusBadge status={hosp.current_load} />
                  <div className="text-[11px] text-slate-500 mt-1 font-semibold">{hosp.distance_km} km away</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-200 cursor-pointer min-h-[44px]"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 & 5: DEPARTMENT & QUEUE INFO */}
      {step === 4 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-teal-700" />
            <span>Step 4: Select Department ({selectedHospital?.name})</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {departmentsList.map((dept) => (
              <div
                key={dept.id}
                onClick={() => handleSelectDepartment(dept)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedDepartment?.id === dept.id
                    ? 'bg-teal-50 border-teal-700'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-sm">{dept.name}</h4>
                  <StatusBadge status={dept.load_status} size="sm" />
                </div>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{dept.description}</p>
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span>Waiting: <strong className="text-slate-900">{dept.people_waiting} patients</strong></span>
                  <span>Est. Wait: <strong className="text-amber-700">~{dept.avg_wait_mins}m</strong></span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(3)}
              className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-200 cursor-pointer min-h-[44px]"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* STEP 6: DOCTOR SELECTION WITH SMART DOCTOR RECOMMENDATION */}
      {step === 6 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <User className="w-5 h-5 text-teal-700" />
            <span>Step 6: Choose Doctor ({selectedDepartment?.name})</span>
          </h3>

          <div className="space-y-3">
            {doctorsList.map((doc) => (
              <DoctorRecommendationCard
                key={doc.id}
                doctor={doc}
                isRecommended={recommendedDoc?.id === doc.id}
                isSelected={selectedDoctor?.id === doc.id}
                onSelect={() => handleSelectDoctor(doc)}
              />
            ))}
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(4)}
              className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-200 cursor-pointer min-h-[44px]"
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* STEP 7: TIME SLOT & DATE */}
      {step === 7 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <Clock className="w-5 h-5 text-teal-700" />
            <span>Step 7: Appointment Date & Time Slot</span>
          </h3>

          {/* Date Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Select Appointment Date
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setAppointmentDate(getTodayDateString())}
                className={`p-3 rounded-xl border font-bold text-xs transition-all cursor-pointer min-h-[44px] ${
                  appointmentDate === getTodayDateString()
                    ? 'bg-teal-700 text-white'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                Today ({getTodayDateString()})
              </button>
              <button
                type="button"
                onClick={() => setAppointmentDate(getTomorrowDateString())}
                className={`p-3 rounded-xl border font-bold text-xs transition-all cursor-pointer min-h-[44px] ${
                  appointmentDate === getTomorrowDateString()
                    ? 'bg-teal-700 text-white'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                Tomorrow ({getTomorrowDateString()})
              </button>
            </div>
          </div>

          {/* Time Slots Grid */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Available Time Slots
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {slotsList.map((slot) => (
                <button
                  key={slot.id}
                  disabled={!slot.is_available}
                  onClick={() => setSelectedSlot(slot.time_slot)}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer min-h-[44px] ${
                    selectedSlot === slot.time_slot
                      ? 'bg-teal-700 text-white shadow-xs'
                      : slot.is_available
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                  }`}
                >
                  <div>{slot.time_slot}</div>
                  <div className="text-[9px] opacity-75">
                    {slot.is_available ? 'Available' : 'Booked'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(6)}
              className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-200 cursor-pointer min-h-[44px]"
            >
              Back
            </button>
            <button
              disabled={isCutoffClosed || !selectedSlot}
              onClick={() => setStep(8)}
              className="px-6 py-2.5 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-xs transition-colors cursor-pointer min-h-[44px] flex items-center gap-2 disabled:opacity-50"
            >
              <span>Continue to Summary</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 8: BOOKING SUMMARY & PAYMENT (₹2.00) */}
      {step === 8 && (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-5">
          <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-teal-700" />
            <span>Step 8: Booking Summary & Payment</span>
          </h3>

          {bookingError && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-xl font-semibold">
              {bookingError}
            </div>
          )}

          {/* Booking Summary Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between border-b border-slate-200 pb-2 font-bold text-slate-900">
              <span>Patient:</span>
              <span>{patientType === 'Myself' ? profile?.full_name : 'Family Member'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Hospital:</span>
              <span className="font-semibold text-slate-800">{selectedHospital?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Department:</span>
              <span className="font-semibold text-slate-800">{selectedDepartment?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Doctor:</span>
              <span className="font-semibold text-slate-800">{selectedDoctor?.full_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Date & Slot:</span>
              <span className="font-bold text-teal-800">{appointmentDate} at {selectedSlot}</span>
            </div>
            <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-extrabold text-slate-900">
              <span>OP Token Fee:</span>
              <span className="text-emerald-700">₹2.00</span>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              {t.booking.paymentMethod}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Option 1: QCare Prepaid Wallet */}
              <button
                type="button"
                onClick={() => setPaymentMethod('QCare Health Balance')}
                className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer min-h-[64px] ${
                  paymentMethod === 'QCare Health Balance'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-950'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-xs">
                  <span>QCare Health Balance</span>
                  <WalletIcon className="w-4 h-4 text-emerald-700" />
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Available Balance: <strong className="text-emerald-700">₹{wallet?.balance.toFixed(2) || '0.00'}</strong>
                </div>
              </button>

              {/* Option 2: UPI */}
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer min-h-[64px] ${
                  paymentMethod === 'UPI'
                    ? 'bg-teal-50 border-teal-600 text-teal-950'
                    : 'bg-white border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-xs">
                  <span>UPI Payment (GPay / PhonePe)</span>
                  <CreditCard className="w-4 h-4 text-teal-700" />
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Pay via external UPI apps
                </div>
              </button>

            </div>
          </div>

          {/* Confirm & Pay Button */}
          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(7)}
              className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-200 cursor-pointer min-h-[44px]"
            >
              Back
            </button>
            <button
              disabled={isSubmitting || isCutoffClosed}
              onClick={handleConfirmBooking}
              className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-sm shadow-md transition-colors cursor-pointer min-h-[44px] flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>{t.booking.processingPayment}</span>
              ) : (
                <>
                  <span>{t.booking.payAndBookBtn}</span>
                  <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
