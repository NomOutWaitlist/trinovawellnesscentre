import React, { useState } from 'react';
import { saveTriageBooking } from '../utils/storage';
import { sendBookingEmails } from '@/lib/booking-email.functions';
import { CLINIC_INFO, PRACTITIONERS } from '../data/clinicData';
import { TriageBookingSubmission } from '../types/clinic';
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Clock, 
  AlertCircle,
  Activity,
  HeartHandshake,
  Cpu,
  Salad,
  ShieldCheck,
  Phone,
  MapPin,
  Calendar,
  Check,
  Video,
  Globe
} from 'lucide-react';

interface BookPageProps {
  initialCategory?: string;
  initialPractitioner?: string;
  initialConcern?: string;
  onNavigateHome: () => void;
  onNavigateToPortal: () => void;
}

export const BookPage: React.FC<BookPageProps> = ({ 
  initialCategory, 
  initialPractitioner, initialConcern,
  onNavigateHome,
  onNavigateToPortal
}) => {
  const [currentStep, setCurrentStep] = useState<number>(initialConcern ? 2 : 1);

  // Step 1: Care Category
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategory || 'Whole-Body & Mind Checkup'
  );

  // Specific concerns
  const [selectedConcerns, setSelectedConcerns] = useState<string[]>(initialConcern ? [initialConcern] : []);

  const scrollToWizard = React.useCallback(() => {
    document.getElementById("booking-wizard")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const goToStep = React.useCallback((step: number) => {
    setCurrentStep(step);
    scrollToWizard();
  }, [scrollToWizard]);

  React.useEffect(() => {
    if (!initialConcern) return;
    const t = setTimeout(scrollToWizard, 400);
    return () => clearTimeout(t);
  }, [initialConcern, scrollToWizard]);
  const [concernDetails, setConcernDetails] = useState<string>('');

  // Step 2: Scheduling & Delivery Preferences
  const [preferredDays, setPreferredDays] = useState<string[]>(['Monday', 'Wednesday']);
  const [preferredTimeWindows, setPreferredTimeWindows] = useState<string[]>(['Morning (8:30 AM to 12:00 PM)']);
  const [deliveryPreference, setDeliveryPreference] = useState<'in-person' | 'virtual' | 'flexible'>('in-person');

  // Step 3: Contact Details
  const [patientName, setPatientName] = useState<string>('');
  const [patientPhone, setPatientPhone] = useState<string>('');
  const [patientEmail, setPatientEmail] = useState<string>('');
  const [priorCareNotes, setPriorCareNotes] = useState<string>(
    initialPractitioner ? `Preferred Doctor: ${initialPractitioner}` : ''
  );
  const [referredBy, setReferredBy] = useState<string>('');

  // Completion State
  const [submissionResult, setSubmissionResult] = useState<TriageBookingSubmission | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const careCategories = [
    {
      id: 'Whole-Body & Mind Checkup',
      title: 'Whole-Body & Mind Checkup',
      subtitle: 'Best if you have multiple aches, stress, and fatigue, or aren’t sure where to start.',
      tag: 'Comprehensive Care',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />
    },
    {
      id: 'Spine, Pain & Muscle Care',
      title: 'Spine, Pain & Muscle Care',
      subtitle: 'Hands-on chiropractic, gentle joint alignment, deep tissue massage & custom orthotics.',
      tag: 'Physical Rehab',
      icon: <Activity className="w-5 h-5 text-blue-600" />
    },
    {
      id: 'Therapy & Mental Health',
      title: 'Therapy & Mental Health',
      subtitle: 'Talk therapy, trauma recovery (EMDR), and counseling for anxiety, depression, or couples.',
      tag: 'Counseling',
      icon: <HeartHandshake className="w-5 h-5 text-[#006837]" />
    },
    {
      id: 'Drug-Free Brain Training',
      title: 'Drug-Free Brain Training',
      subtitle: 'BrainCore sessions that train your brain for ADHD, focus, sleep, and concussion recovery.',
      tag: 'Neurofeedback',
      icon: <Cpu className="w-5 h-5 text-[#0033A0]" />
    },
    {
      id: '12-Week Gut Reset',
      title: '12-Week Gut Reset',
      subtitle: 'Stop stomach bloating, identify food sensitivities, and reboot digestion ($3,300).',
      tag: 'Nutrition',
      icon: <Salad className="w-5 h-5 text-[#00A651]" />
    }
  ];

  const quickSymptoms = [
    'Lower back or neck pain',
    'Anxiety, stress or burnout',
    'Brain fog or trouble focusing',
    'Stomach bloating & digestion',
    'Trouble sleeping or insomnia',
    'Sports or workout injury',
    'Car accident (MVA) recovery',
    'Headaches or post-concussion'
  ];

  const availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const availableTimes = [
    'Morning (8:30 AM to 12:00 PM)',
    'Afternoon (12:00 PM to 4:00 PM)',
    'Evening (4:00 PM to 7:30 PM)'
  ];

  const toggleSymptom = (item: string) => {
    setSelectedConcerns(prev => 
      prev.includes(item) ? prev.filter(c => c !== item) : [...prev, item]
    );
  };

  const toggleDay = (day: string) => {
    setPreferredDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const toggleTime = (time: string) => {
    setPreferredTimeWindows(prev =>
      prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!patientName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!patientPhone.trim() || patientPhone.trim().length < 7) {
      setErrorMsg('Please enter a valid phone number so our team can reach you.');
      return;
    }
    if (!patientEmail.trim() || !patientEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const newBooking = saveTriageBooking({
      category: selectedCategory,
      concerns: selectedConcerns,
      concernDetails: concernDetails,
      preferredDays: preferredDays.length ? preferredDays : ['Flexible'],
      preferredTimeWindows: preferredTimeWindows.length ? preferredTimeWindows : ['Flexible'],
      deliveryPreference: deliveryPreference,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      patientEmail: patientEmail.trim(),
      priorCareNotes: [
        priorCareNotes.trim(),
        referredBy.trim() ? `Referred by: ${referredBy.trim()}` : ''
      ].filter(Boolean).join(' | '),
      urgency: 'Priority'
    });

    sendBookingEmails({ data: {
      referenceNumber: newBooking.referenceNumber,
      category: newBooking.category,
      concerns: newBooking.concerns,
      concernDetails: newBooking.concernDetails,
      preferredDays: newBooking.preferredDays,
      preferredTimeWindows: newBooking.preferredTimeWindows,
      deliveryPreference: newBooking.deliveryPreference,
      patientName: newBooking.patientName,
      patientPhone: newBooking.patientPhone,
      patientEmail: newBooking.patientEmail,
      priorCareNotes: newBooking.priorCareNotes,
    } }).then(r => { if (!r.ok) console.error('Booking email failed', r.error); })
      .catch(err => console.error('Booking email failed', err));

    setSubmissionResult(newBooking);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // SUCCESS CONFIRMATION VIEW
  if (submissionResult) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 bg-[#E8F8F0] rounded-full flex items-center justify-center mx-auto text-[#00A651]">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#006837] bg-emerald-100/60 px-3 py-1 rounded-full inline-block">
              Appointment Request Confirmed
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0033A0]">
              You’re all set, {submissionResult.patientName.split(' ')[0]}!
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto font-normal leading-relaxed">
              Dr. Jennifer Anthony and our Brampton clinic reception will review your request and call you within <strong>24 business hours</strong> to finalize your appointment time.
            </p>
          </div>

          {/* Clean Appointment Pass */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left max-w-md mx-auto space-y-3">
            <div className="flex justify-between items-center text-xs pb-3 border-b border-slate-200">
              <span className="text-slate-500 font-semibold">Reference #</span>
              <span className="font-mono font-bold text-[#0033A0]">{submissionResult.referenceNumber}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-semibold">Care Area</span>
              <span className="font-bold text-slate-900">{submissionResult.category}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-semibold">Delivery Format</span>
              <span className="font-bold text-[#006837]">
                {submissionResult.deliveryPreference === 'virtual' 
                  ? 'Virtual Telehealth (Online link sent to email)' 
                  : submissionResult.deliveryPreference === 'in-person'
                  ? 'In-Person (Unit 204, 178 John St, Brampton)'
                  : 'Flexible (In-Person or Virtual Telehealth)'}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-semibold">Preferred Days</span>
              <span className="font-semibold text-slate-800">{submissionResult.preferredDays.join(', ')}</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500 font-semibold">Clinic Location</span>
              <span className="font-semibold text-slate-800">Unit 204, 178 John St, Brampton</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={onNavigateHome}
              className="btn-pill-leaf text-sm px-8 py-3.5 cursor-pointer shadow-md"
            >
              Back to Home
            </button>
            <div className="text-xs text-slate-500">
              Need immediate help? Call our front desk directly at{' '}
              <a href="tel:+19054957748" className="text-[#0033A0] font-bold hover:underline">
                (905) 495-7748
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Header (Apple Clean) */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#006837] mb-2 block">
          Simple 60-Second Booking
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#0033A0] tracking-tight">
          Book your appointment.
        </h1>
        <p className="text-base text-slate-600 mt-3 font-normal leading-relaxed">
          Tell us what you need. Dr. Jennifer Anthony and our team connect you with the right specialist so you don’t waste time on guesswork.
        </p>

        {/* Quick Phone Callout */}
        <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 px-4 py-2 rounded-full">
          <span>Prefer to book by phone?</span>
          <a href="tel:+19054957748" className="text-[#0033A0] font-bold hover:underline flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-[#00A651]" /> (905) 495-7748
          </a>
        </div>
      </div>

      {/* 3 Clean Step Indicators */}
      <div id="booking-wizard" className="scroll-mt-28 flex items-center justify-center gap-3 sm:gap-6 mb-10">
        {[
          { num: 1, label: '1. What You Need' },
          { num: 2, label: '2. Your Schedule' },
          { num: 3, label: '3. Your Details' },
        ].map(step => (
          <button
            key={step.num}
            onClick={() => goToStep(step.num)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
              currentStep === step.num
                ? 'bg-[#0033A0] text-white shadow-sm'
                : currentStep > step.num
                ? 'bg-[#E8F8F0] text-[#006837]'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            {step.label}
          </button>
        ))}
      </div>

      {/* Main Form Container */}
      <div id="booking-form" className="scroll-mt-32 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: CARE AREA & SYMPTOMS */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-[#0033A0] mb-2">
                What would you like help with?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Choose the main focus of your visit.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {careCategories.map(cat => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <div
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-5 rounded-2xl border-2 transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#0033A0] bg-blue-50/50 shadow-sm'
                        : 'border-slate-200/80 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-xl bg-white shadow-2xs flex items-center justify-center border border-slate-100">
                          {cat.icon}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#006837] bg-emerald-100/60 px-2.5 py-0.5 rounded-full">
                          {cat.tag}
                        </span>
                      </div>
                      <h3 className="font-heading font-extrabold text-base text-[#0033A0] mb-1">
                        {cat.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {cat.subtitle}
                      </p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">
                        {isSelected ? 'Selected' : 'Select'}
                      </span>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        isSelected ? 'bg-[#0033A0] border-[#0033A0] text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Symptom Chips */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Any specific symptoms? (Optional)
              </label>
              <div className="flex flex-wrap gap-2">
                {[...quickSymptoms, ...selectedConcerns.filter(c => !quickSymptoms.includes(c))].map(symp => {
                  const isChecked = selectedConcerns.includes(symp);
                  return (
                    <button
                      type="button"
                      key={symp}
                      onClick={() => toggleSymptom(symp)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                        isChecked
                          ? 'bg-[#006837] text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {isChecked && '✓ '}
                      {symp}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Note box */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Tell us anything else in your own words (Optional)
              </label>
              <textarea
                value={concernDetails}
                onChange={e => setConcernDetails(e.target.value)}
                placeholder="How long has this bothered you? Have you tried other treatments?"
                rows={2}
                className="w-full text-xs p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0033A0]/30"
              />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="btn-pill-leaf text-sm px-8 py-3.5 cursor-pointer shadow-md flex items-center gap-2"
              >
                <span>Continue to Step 2</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SCHEDULE PREFERENCES */}
        {currentStep === 2 && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-[#0033A0] mb-2">
                When is good for you?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Choose the days and times that fit your week in Brampton.
              </p>
            </div>

            {/* Preferred Days */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Preferred Days
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {availableDays.map(day => {
                  const isDaySelected = preferredDays.includes(day);
                  return (
                    <button
                      type="button"
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`p-3 rounded-xl border text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                        isDaySelected
                          ? 'border-[#0033A0] bg-blue-50/70 text-[#0033A0] font-bold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span>{day}</span>
                      {isDaySelected && <Check className="w-3.5 h-3.5 text-[#0033A0]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Preferred Times */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                Preferred Time of Day
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {availableTimes.map(time => {
                  const isTimeSelected = preferredTimeWindows.includes(time);
                  return (
                    <button
                      type="button"
                      key={time}
                      onClick={() => toggleTime(time)}
                      className={`p-3 rounded-xl border text-xs font-semibold transition cursor-pointer flex items-center justify-between ${
                        isTimeSelected
                          ? 'border-[#006837] bg-emerald-50/70 text-[#006837] font-bold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span>{time}</span>
                      {isTimeSelected && <Check className="w-3.5 h-3.5 text-[#006837]" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Appointment Delivery Format (In-Person vs Virtual) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Appointment Delivery Format
                </label>
                <span className="text-[11px] font-semibold text-[#006837]">
                  In-Person or Virtual Telehealth
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setDeliveryPreference('in-person')}
                  className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                    deliveryPreference === 'in-person'
                      ? 'border-[#0033A0] bg-blue-50/70 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#0033A0] flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>In-Person Clinic</span>
                    </span>
                    {deliveryPreference === 'in-person' && <Check className="w-3.5 h-3.5 text-[#0033A0]" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Unit 204, 178 John St, Brampton (Free parking & elevator access)
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryPreference('virtual')}
                  className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                    deliveryPreference === 'virtual'
                      ? 'border-[#006837] bg-emerald-50/70 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-[#006837] flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5" />
                      <span>Virtual / Telehealth</span>
                    </span>
                    {deliveryPreference === 'virtual' && <Check className="w-3.5 h-3.5 text-[#006837]" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Secure private video link. Connect from anywhere on phone, tablet, or PC.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliveryPreference('flexible')}
                  className={`p-3.5 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                    deliveryPreference === 'flexible'
                      ? 'border-slate-800 bg-slate-100 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5" />
                      <span>Flexible / Either</span>
                    </span>
                    {deliveryPreference === 'flexible' && <Check className="w-3.5 h-3.5 text-slate-800" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    Open to either format based on earliest specialist availability.
                  </p>
                </button>
              </div>

              <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100 text-xs text-emerald-900 leading-snug">
                <strong>Format note:</strong> Nutrition consultations and psychological therapy services can be attended in person or virtually from anywhere in Ontario/Canada. Physical care and BrainCore hardware sessions are held in person at our Brampton wellness centre.
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="btn-pill-leaf text-sm px-8 py-3.5 cursor-pointer shadow-md flex items-center gap-2"
              >
                <span>Continue to Details</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONTACT & CONFIRMATION */}
        {currentStep === 3 && (
          <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-[#0033A0] mb-2">
                Your Contact Information
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Where should reception send your confirmation?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={e => setPatientName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full text-sm p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0033A0]/30"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={patientPhone}
                  onChange={e => setPatientPhone(e.target.value)}
                  placeholder="e.g. (905) 555-0199"
                  className="w-full text-sm p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0033A0]/30"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 block">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={patientEmail}
                  onChange={e => setPatientEmail(e.target.value)}
                  placeholder="e.g. sarah@example.com"
                  className="w-full text-sm p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0033A0]/30"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 block">
                  Doctor Preference / Prior Care (Optional)
                </label>
                <input
                  type="text"
                  value={priorCareNotes}
                  onChange={e => setPriorCareNotes(e.target.value)}
                  placeholder="e.g. Specifically looking to see Dr. Higgins-Moncrieffe or Stacy Yong"
                  className="w-full text-sm p-3.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0033A0]/30"
                />
              </div>
            </div>

            {/* Zero-Guesswork Guarantee Box */}
            <div className="p-4 rounded-2xl bg-[#E8F8F0] border border-[#00A651]/20 text-xs text-slate-700 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#00A651] shrink-0 mt-0.5" />
              <div>
                <strong>Zero Guesswork:</strong> Dr. Jennifer Anthony and our Brampton team review your information before scheduling so you see the exact right specialist on your very first visit.
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                className="btn-pill-leaf text-sm px-9 py-3.5 cursor-pointer shadow-lg flex items-center gap-2"
              >
                <span>Confirm Appointment Request</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Brampton Clinic Quick Reference */}
      <div className="mt-12 text-center text-xs text-slate-500 space-y-1">
        <div>Trinova Wellness Centre · Unit 204, 178 John Street, Brampton, ON L6W 2Z1</div>
        <div>Elevator access to 2nd floor · Free visitor parking · Mon to Fri 8:30 AM to 7:30 PM, Sat 9 AM to 4 PM</div>
      </div>
    </div>
  );
};
