import React, { useState } from 'react';
import { Brain, Heart, Activity, Salad, CheckCircle2, ArrowRight } from 'lucide-react';

interface SystemNode {
  id: string;
  name: string;
  icon: any;
  color: string;
  bgColor: string;
  borderColor: string;
  highlightText: string;
  clinicalImpact: string;
  connectionReason: string;
}

export const InteractiveHealthMatrix: React.FC<{ onBook: () => void }> = ({ onBook }) => {
  const [activeSystemId, setActiveSystemId] = useState<string>('brain');

  const systems: SystemNode[] = [
    {
      id: 'brain',
      name: 'Your Brain',
      icon: Brain,
      color: 'text-[#0033A0]',
      bgColor: 'bg-blue-50',
      borderColor: 'border-[#0033A0]',
      highlightText: 'BrainCore Brain Training',
      clinicalImpact: 'When your brain is stuck in racing thoughts or chronic stress, it sends non-stop alert signals to your muscles and stomach.',
      connectionReason: 'Calming your brainwaves helps your muscles relax and allows your stomach to digest food without bloating.'
    },
    {
      id: 'mind',
      name: 'Your Emotions',
      icon: Heart,
      color: 'text-[#006837]',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-[#006837]',
      highlightText: 'Counseling & Trauma Recovery',
      clinicalImpact: 'Stress and difficult memories stay stored in your body, keeping your neck, shoulders, and jaw clenched tight.',
      connectionReason: 'Talk therapy and EMDR release deep-seated stress so your body can finally feel safe and relaxed.'
    },
    {
      id: 'spine',
      name: 'Your Spine & Muscles',
      icon: Activity,
      color: 'text-blue-700',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-blue-700',
      highlightText: 'Chiropractic, Osteopathy & Massage',
      clinicalImpact: 'Stiff joints, misaligned posture, and muscle knots pinch nerves, causing headaches and draining your physical energy.',
      connectionReason: 'Aligning your spine restores healthy blood flow and takes painful pressure off your nerves.'
    },
    {
      id: 'gut',
      name: 'Your Stomach & Digestion',
      icon: Salad,
      color: 'text-[#00A651]',
      bgColor: 'bg-[#E8F8F0]',
      borderColor: 'border-[#00A651]',
      highlightText: 'The 12-Week Gut Reset',
      clinicalImpact: 'Over 80% of your body’s feel-good chemicals (like serotonin) are made in your gut. An irritated stomach causes brain fog and low mood.',
      connectionReason: 'Healing your stomach lining clears brain fog, boosts your daily energy, and stops uncomfortable bloating.'
    }
  ];

  const activeSystem = systems.find(s => s.id === activeSystemId)!;

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-12 shadow-sm overflow-hidden relative">
      {/* Subtle organic light accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/60 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-50/60 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Header */}
      <div className="max-w-2xl mb-8">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#006837] mb-2 block">
          How Your Body Works Together
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-[#0033A0] tracking-tight">
          Everything in your body is connected.
        </h2>
        <p className="text-sm sm:text-base text-slate-500 mt-2 font-normal">
          Tap any of the 4 areas below to see how healing one part helps the rest of your body heal too.
        </p>
      </div>

      {/* Visual System Selector Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {systems.map((sys) => {
          const isSelected = activeSystemId === sys.id;
          const IconComponent = sys.icon;
          return (
            <button
              key={sys.id}
              onClick={() => setActiveSystemId(sys.id)}
              className={`p-4 sm:p-5 rounded-2xl border-2 transition-all text-left cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? `${sys.bgColor} ${sys.borderColor} shadow-sm scale-[1.02]`
                  : 'bg-slate-50 border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-xl bg-white shadow-2xs ${sys.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                {isSelected && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00A651] animate-pulse" />
                )}
              </div>
              <div>
                <div className={`font-heading font-extrabold text-sm sm:text-base leading-snug ${
                  isSelected ? 'text-slate-900' : 'text-slate-700'
                }`}>
                  {sys.name}
                </div>
                <div className="text-[11px] font-semibold text-slate-500 mt-0.5">
                  {sys.highlightText}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Simple Connection Box */}
      <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/90 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#006837] bg-[#E8F8F0] px-2.5 py-0.5 rounded-full">
              How It Connects
            </span>
            <span className="text-xs font-semibold text-slate-400">
              {activeSystem.name}
            </span>
          </div>

          <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#0033A0]">
            {activeSystem.highlightText}
          </h3>

          <p className="text-sm text-slate-700 leading-relaxed font-normal">
            {activeSystem.clinicalImpact}
          </p>

          <div className="pt-2 flex items-start gap-2 text-xs font-semibold text-[#006837] bg-white p-3.5 rounded-xl border border-emerald-100">
            <CheckCircle2 className="w-4 h-4 text-[#00A651] shrink-0 mt-0.5" />
            <span>{activeSystem.connectionReason}</span>
          </div>
        </div>

        <div className="shrink-0 w-full lg:w-auto">
          <button
            onClick={onBook}
            className="btn-pill-leaf w-full lg:w-auto text-xs sm:text-sm px-7 py-3.5 shadow-sm"
          >
            <span>Schedule Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
