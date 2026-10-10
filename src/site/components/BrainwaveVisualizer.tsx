import React, { useState, useEffect, useRef } from 'react';
import { Waves, Check, ArrowRight } from 'lucide-react';

interface FrequencyBand {
  id: string;
  name: string;
  simpleName: string;
  speedText: string;
  color: string;
  strokeColor: string;
  state: string;
  simpleExplanation: string;
  speed: number;
  frequency: number;
  amplitude: number;
}

export const BrainwaveVisualizer: React.FC<{ onBook: () => void }> = ({ onBook }) => {
  const [activeBandId, setActiveBandId] = useState<string>('alpha');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const bands: FrequencyBand[] = [
    {
      id: 'delta',
      name: 'Delta Waves',
      simpleName: 'Deep Sleep & Healing',
      speedText: 'Slowest waves',
      color: 'text-indigo-400',
      strokeColor: '#818cf8',
      state: 'Nighttime Sleep & Immune Repair',
      simpleExplanation: 'These waves heal your body while you sleep deeply. If they are too high during the day, you feel sluggish, groggy, and have brain fog.',
      speed: 0.02,
      frequency: 0.01,
      amplitude: 28
    },
    {
      id: 'theta',
      name: 'Theta Waves',
      simpleName: 'Daydreaming & Creativity',
      speedText: 'Gentle waves',
      color: 'text-amber-400',
      strokeColor: '#fbbf24',
      state: 'Drifting Off & Creative Flow',
      simpleExplanation: 'Active when you daydream or relax. If theta runs too high while you are trying to work or study, it causes ADHD, brain fog, and distraction.',
      speed: 0.04,
      frequency: 0.025,
      amplitude: 24
    },
    {
      id: 'alpha',
      name: 'Alpha Waves',
      simpleName: 'Calm & Alert',
      speedText: 'Balanced waves',
      color: 'text-emerald-400',
      strokeColor: '#34d399',
      state: 'Relaxed, Composed & Clear-Headed',
      simpleExplanation: 'Your brain’s sweet spot. Healthy alpha waves let you stay completely calm, stress-free, and sharp during busy days.',
      speed: 0.07,
      frequency: 0.045,
      amplitude: 20
    },
    {
      id: 'beta',
      name: 'Beta Waves',
      simpleName: 'Busy Mind & Problem Solving',
      speedText: 'Fast waves',
      color: 'text-rose-400',
      strokeColor: '#f43f5e',
      state: 'Focusing on Tasks & Solving Problems',
      simpleExplanation: 'Needed for getting work done. But when beta runs too fast, you experience racing thoughts, worry, panic, and can’t turn off your brain at night.',
      speed: 0.12,
      frequency: 0.08,
      amplitude: 16
    }
  ];

  const currentBand = bands.find(b => b.id === activeBandId)!;

  // Real-time Waveform Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const midY = height / 2;

      // Draw subtle grid line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(width, midY);
      ctx.stroke();

      // Draw wave
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = currentBand.strokeColor;
      ctx.shadowColor = currentBand.strokeColor;
      ctx.shadowBlur = 12;

      for (let x = 0; x < width; x++) {
        const y = midY + Math.sin(x * currentBand.frequency + step) * currentBand.amplitude;
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      step += currentBand.speed;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentBand]);

  return (
    <div className="w-full bg-slate-950 text-white rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-xl overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0033A0]/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#00A651] mb-2 block flex items-center gap-1.5">
            <Waves className="w-3.5 h-3.5" />
            Interactive Brainwave Guide
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            See how your brain creates focus & calm.
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-lg font-normal">
            Tap any of the 4 brainwaves below to see how each one affects your mood, sleep, and focus.
          </p>
        </div>

        {/* Band Selector Tabs */}
        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-slate-800 shrink-0">
          {bands.map((band) => (
            <button
              key={band.id}
              onClick={() => setActiveBandId(band.id)}
              className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                activeBandId === band.id
                  ? 'bg-[#0033A0] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {band.name.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Live Waveform Display */}
      <div className="bg-slate-900/90 rounded-2xl p-4 sm:p-6 border border-slate-800 mb-6">
        <div className="flex items-center justify-between mb-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00A651] animate-ping" />
            <span className="font-heading font-extrabold text-white text-sm">{currentBand.name}</span>
            <span className={`font-semibold ${currentBand.color}`}>({currentBand.simpleName})</span>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">{currentBand.speedText}</span>
        </div>

        <canvas
          ref={canvasRef}
          width={800}
          height={100}
          className="w-full h-24 rounded-xl bg-slate-950/80 border border-slate-800/80"
        />

        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="text-slate-200">
            <strong className="text-white">When you feel it:</strong> {currentBand.state}
          </div>
          <div className="text-slate-400 max-w-md text-[11px] leading-relaxed">
            {currentBand.simpleExplanation}
          </div>
        </div>
      </div>

      {/* Call to action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-800/60">
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <Check className="w-4 h-4 text-[#00A651]" />
          <span>Non-invasive brain training at Unit 204, 178 John St, Brampton.</span>
        </div>
        <button
          onClick={onBook}
          className="btn-pill-leaf text-xs py-2.5 px-6 self-start sm:self-auto"
        >
          <span>Schedule Brain Mapping</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
