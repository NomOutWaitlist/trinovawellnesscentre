import React from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface CareJourneyTimelineProps {
  onNavigateToBook: () => void;
}

export const CareJourneyTimeline: React.FC<CareJourneyTimelineProps> = ({ onNavigateToBook }) => {
  const steps = [
    {
      num: '01',
      title: 'Consultation & Discovery',
      highlight: 'First Visit',
      desc: 'Meet Dr. Jennifer Anthony for an in-depth conversation and a painless 3-minute full-body scan.'
    },
    {
      num: '02',
      title: 'Coordinated Care',
      highlight: 'Under One Roof',
      desc: 'Chiropractic, talk therapy, brain training, or nutrition scheduled together with zero conflicts.'
    },
    {
      num: '03',
      title: 'Tracking Your Progress',
      highlight: 'Measured Results',
      desc: 'Follow-up scans and regular check-ins let you see your improvement in real time.'
    },
    {
      num: '04',
      title: 'Lasting Wellness',
      highlight: 'Long-Term Health',
      desc: 'A personalized home toolkit and seasonal tune-ups so you stay feeling your best.'
    }
  ];

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-14 shadow-sm">
      <div className="max-w-2xl mb-10">
        <span className="text-xs font-bold uppercase tracking-widest text-[#006837] mb-2 block">
          Your Care Journey
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0033A0] tracking-tight">
          How we care for you.
        </h2>
        <p className="text-base text-slate-500 mt-2 font-normal">
          Healing shouldn’t happen in isolation. Our specialists collaborate so you never have to repeat your story twice.
        </p>
      </div>

      {/* 4 Minimal Apple-style Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {steps.map((step) => (
          <div
            key={step.num}
            className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between hover:border-slate-300 transition"
          >
            <div>
              <span className="text-3xl font-extrabold text-slate-300 block mb-3 font-heading">
                {step.num}
              </span>
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#006837] mb-1">
                {step.highlight}
              </div>
              <h3 className="font-heading font-extrabold text-lg text-[#0033A0] mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-slate-100">
        <span className="text-xs text-slate-500 font-medium">
          No doctor referral needed to start. Free visitor parking in Brampton.
        </span>
        <button
          onClick={onNavigateToBook}
          className="btn-pill-leaf text-xs py-2.5 px-6 self-start sm:self-auto cursor-pointer"
        >
          <span>Book Your Appointment</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
