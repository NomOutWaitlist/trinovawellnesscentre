import React, { useState } from 'react';
import { Cpu, Activity, ArrowRight, Check } from 'lucide-react';

interface DiagnosticTechShowcaseProps {
  onNavigateToBook: (category?: string) => void;
}

export const DiagnosticTechShowcase: React.FC<DiagnosticTechShowcaseProps> = ({ onNavigateToBook }) => {
  const [selectedTech, setSelectedTech] = useState<'braincore' | 'esteck'>('braincore');

  return (
    <div className="w-full bg-slate-950 text-white rounded-3xl p-8 sm:p-14 shadow-xl border border-slate-800">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#00A651] mb-2 block">
            Health Technology
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            We measure your health. No guessing.
          </h2>
          <p className="text-base text-slate-400 mt-2 max-w-xl font-normal">
            Drug-free brain training and fast 3-minute full-body scans. 100% painless.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 shrink-0">
          <button
            onClick={() => setSelectedTech('braincore')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-bold transition cursor-pointer flex items-center gap-2 ${
              selectedTech === 'braincore'
                ? 'bg-[#0033A0] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Cpu className="w-4 h-4 text-[#00A651]" />
            Brain Training
          </button>
          <button
            onClick={() => setSelectedTech('esteck')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-heading font-bold transition cursor-pointer flex items-center gap-2 ${
              selectedTech === 'esteck'
                ? 'bg-[#006837] text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4 text-[#00A651]" />
            3-Minute Body Scan
          </button>
        </div>
      </div>

      {/* Active Tech Display */}
      {selectedTech === 'braincore' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-200">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#00A651] uppercase tracking-wider">
                Drug-Free Brainwave Retraining
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                BrainCore Brain Training
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl font-normal">
                You sit back in a comfortable recliner and watch a movie while small sensors listen to your natural brainwaves. When your brain is calm and focused, the screen stays clear. Over time, your brain naturally learns how to calm anxiety, sleep deeply, and focus in school or work, completely without drugs.
              </p>
            </div>

            {/* 4 Minimal Metric Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Delta Waves', stat: 'Deep Sleep', desc: 'Rest & body healing' },
                { label: 'Theta Waves', stat: 'Focus State', desc: 'ADHD & daydreaming' },
                { label: 'Alpha Waves', stat: 'Calm & Alert', desc: 'Relaxed clear mind' },
                { label: 'Beta Waves', stat: 'Busy Mind', desc: 'Racing thoughts & stress' }
              ].map((b) => (
                <div key={b.label} className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-bold text-white text-xs">{b.label}</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5">{b.stat}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="font-heading font-bold text-sm text-white">Helps With:</div>
            <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00A651]" /> ADHD & Focus</div>
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00A651]" /> Anxiety & Panic</div>
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00A651]" /> Broken Sleep</div>
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00A651]" /> Concussions</div>
            </div>
            <button
              onClick={() => onNavigateToBook('BrainCore Neurofeedback')}
              className="btn-pill-leaf w-full justify-center text-xs py-3 mt-4"
            >
              <span>Schedule Brain Mapping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-in fade-in duration-200">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#00A651] uppercase tracking-wider">
                Full-Body Health & Stress Screening
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
                ES Teck 3-Minute Body Scan
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed max-w-xl font-normal">
                You place your hands and feet on smooth metal plates for 2 to 3 minutes. It checks your body’s stress levels, hydration inside your cells, and daily stamina without pain, needles, or blood tests.
              </p>
            </div>

            {/* 4 Minimal Metric Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Stress Level', stat: 'Fight or Flight', desc: 'Is your body stuck in stress?' },
                { label: 'Heart Recovery', stat: 'Daily Stamina', desc: 'How well your heart bounces back' },
                { label: 'Cell Water', stat: 'Hydration', desc: 'Water balance inside your body' },
                { label: 'Blood Flow', stat: 'Circulation', desc: 'Blood flow to hands and feet' }
              ].map((b) => (
                <div key={b.label} className="bg-slate-900 p-3.5 rounded-xl border border-slate-800">
                  <div className="font-bold text-white text-xs">{b.label}</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5">{b.stat}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="font-heading font-bold text-sm text-white">Helps With:</div>
            <div className="grid grid-cols-2 gap-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00A651]" /> Constant Fatigue</div>
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00A651]" /> High Daily Stress</div>
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00A651]" /> Stomach Bloating</div>
              <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#00A651]" /> Before & After Proof</div>
            </div>
            <button
              onClick={() => onNavigateToBook('Whole-Person Collaborative Checkup')}
              className="btn-pill-leaf w-full justify-center text-xs py-3 mt-4"
            >
              <span>Schedule 3-Minute Scan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
