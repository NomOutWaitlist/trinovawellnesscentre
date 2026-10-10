import React, { useState } from 'react';
import { THE_BALANCE_PROGRAM } from '../data/clinicData';
import { 
  Check, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp,
  Salad
} from 'lucide-react';

interface BalanceProgramPageProps {
  onNavigateToBook: (category?: string) => void;
}

export const BalanceProgramPage: React.FC<BalanceProgramPageProps> = ({ onNavigateToBook }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Why does the program last 12 weeks?',
      a: 'True digestive healing takes time: 30 days to calm inflammation, 30 days to rebuild healthy gut flora, and 30 days to test and reintroduce your favorite foods safely.'
    },
    {
      q: 'What is included in the $3,300 fee?',
      a: 'Everything. Your 75-minute consultation with Dr. Jennifer Anthony, before-and-after full body scans, 6 private coaching sessions with Michelle Ching, and complete personal meal roadmaps.'
    },
    {
      q: 'Can this be covered by insurance?',
      a: 'Yes. Appointments under Registered Psychotherapy (RP) and Nutritional Consulting are eligible for standard workplace health insurance reimbursement.'
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Apple-Style Hero */}
      <section className="bg-gradient-to-b from-[#0033A0] via-[#002b85] to-[#002270] text-white pt-16 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00A651] mb-3 block">
            Signature Clinic Protocol
          </span>
          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
            The Balance Program. <br />
            <span className="text-[#00A651]">12-Week Gut Reset.</span>
          </h1>
          <p className="text-base sm:text-lg text-blue-100 max-w-xl mx-auto font-normal mb-8 leading-relaxed">
            Stop painful daily bloating, discover which foods irritate your stomach, and rebuild lasting digestive health with private coaching and body scans.
          </p>

          {/* Clean Price Pill */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white/10 backdrop-blur-md px-8 py-4 rounded-3xl border border-white/20 mb-8">
            <span className="font-heading text-4xl font-extrabold text-white">
              $3,300
            </span>
            <span className="text-xs text-blue-200 text-center sm:text-left">
              Tax inclusive · Complete 12-week intensive clinical care
            </span>
          </div>

          <div>
            <button
              onClick={() => onNavigateToBook('12-Week Gut Reset')}
              className="btn-pill-leaf text-base px-9 py-4 shadow-xl cursor-pointer"
            >
              <span>Enroll in The Balance Program</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 3 Phases (Clean Minimal Apple Cards) */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#006837] mb-2 block">
            The Roadmap
          </span>
          <h2 className="font-heading text-3xl font-extrabold text-[#0033A0]">
            Three phases. Lasting relief.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {THE_BALANCE_PROGRAM.phases.map((phase) => (
            <div
              key={phase.phaseNumber}
              className="bg-white rounded-3xl border border-slate-200/80 p-7 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0033A0] bg-[#EBF1FF] px-2.5 py-0.5 rounded-full">
                    Phase 0{phase.phaseNumber}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {phase.weeks}
                  </span>
                </div>

                <h3 className="font-heading font-extrabold text-xl text-[#0033A0]">
                  {phase.title.split('&')[0]}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {phase.goal}
                </p>

                <div className="pt-2 space-y-1.5">
                  {phase.keyActions.slice(0, 2).map((act, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] text-slate-700">
                      <Check className="w-3.5 h-3.5 text-[#00A651] shrink-0 mt-0.5" />
                      <span>{act.split('(')[0]}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 text-[11px] font-bold text-[#006837]">
                {phase.clinicalFocus.split(',')[0]}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Program Inclusions Checklist */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-50 rounded-3xl border border-slate-200/80 p-8 sm:p-12 space-y-6">
          <div className="text-center max-w-lg mx-auto">
            <h3 className="font-heading text-2xl font-extrabold text-[#0033A0]">
              Everything Included in the Program
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              $3,300 total fee covers your entire 12-week clinical team care.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-slate-700">
            <div className="flex items-center gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200">
              <Check className="w-4 h-4 text-[#00A651] shrink-0" />
              <span>75-minute comprehensive intake with Dr. Jennifer Anthony</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200">
              <Check className="w-4 h-4 text-[#00A651] shrink-0" />
              <span>Before & after painless 3-minute full body scans</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200">
              <Check className="w-4 h-4 text-[#00A651] shrink-0" />
              <span>6 bi-weekly private coaching sessions with Michelle Ching</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200">
              <Check className="w-4 h-4 text-[#00A651] shrink-0" />
              <span>Personalized food substitution & dining out guides</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200">
              <Check className="w-4 h-4 text-[#00A651] shrink-0" />
              <span>Step-by-step reintroduction plan so trigger foods are identified</span>
            </div>
            <div className="flex items-center gap-2.5 bg-white p-3.5 rounded-xl border border-slate-200">
              <Check className="w-4 h-4 text-[#00A651] shrink-0" />
              <span>Long-term maintenance toolkit to keep bloating away</span>
            </div>
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => onNavigateToBook('12-Week Gut Reset')}
              className="btn-pill-leaf text-sm px-8 py-3.5 shadow-md cursor-pointer"
            >
              Schedule Initial Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="font-heading text-2xl font-extrabold text-[#0033A0] text-center mb-6">
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full text-left p-5 font-heading font-bold text-sm text-[#0033A0] flex items-center justify-between cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
