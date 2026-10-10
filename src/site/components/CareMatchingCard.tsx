import React from 'react';
import { Check, Clock, UserCheck, Calendar } from 'lucide-react';

export const CareMatchingCard: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs mb-10 text-center sm:text-left">
      {/* Apple-Style Minimalist Headline */}
      <div className="max-w-2xl mb-8">
        <span className="text-[11px] font-bold tracking-widest uppercase text-[#006837] mb-2 block">
          How Care Begins
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0033A0] tracking-tight leading-tight">
          Personalized Matching. <br />
          <span className="text-slate-400 font-normal">The right specialist on day one.</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-500 mt-2 font-normal leading-relaxed">
          Instead of guessing which doctor or service to book, Dr. Jennifer Anthony reviews your symptoms so you see the exact right specialist on your first visit.
        </p>
      </div>

      {/* 3 Apple-Style Minimalist Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-2xl font-extrabold text-[#0033A0] block font-heading">01</span>
            <div className="font-heading font-bold text-base text-slate-900">
              Share what hurts.
            </div>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Check off your symptoms and preferred days in Brampton. Takes 60 seconds.
            </p>
          </div>
        </div>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-2xl font-extrabold text-[#006837] block font-heading">02</span>
            <div className="font-heading font-bold text-base text-slate-900">
              Dr. Anthony reviews it.
            </div>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Our Clinical Director reviews your health history to identify the optimal care pathway.
            </p>
          </div>
        </div>

        <div className="bg-[#E8F8F0]/60 rounded-2xl p-6 border border-[#00A651]/20 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="text-2xl font-extrabold text-[#00A651] block font-heading">03</span>
            <div className="font-heading font-bold text-base text-slate-900">
              Appointment confirmed.
            </div>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Reception calls or emails you to lock in your exact visit time.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Assurance */}
      <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
        <div className="flex items-center gap-2 text-slate-700">
          <Check className="w-4 h-4 text-[#00A651] shrink-0" />
          <span><strong>Zero guesswork:</strong> Eliminates wasted trial-and-error appointments and starts your recovery immediately.</span>
        </div>
        <span className="text-[11px] font-semibold text-slate-400 shrink-0">
          No medical doctor referral required
        </span>
      </div>
    </div>
  );
};
