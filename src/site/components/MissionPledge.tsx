import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

const WORDS = ['Vitality.', 'Balance.', 'Harmony.'];

const DOTS = [
  { label: 'Mind', color: '#0033A0' },
  { label: 'Body', color: '#00A651' },
  { label: 'Spirit', color: '#006837' },
];

/**
 * Short, high-impact mission statement.
 * Replaces the long-form "vitality, balance and harmony ... mind, body and spirit" copy.
 */
export const MissionPledge: React.FC = () => {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 120);
    return () => clearTimeout(t);
  }, []);

  const show = started || !!reduce;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white border border-slate-200/80 border-l-4 border-l-[#00A651] px-6 py-8 sm:px-10 sm:py-10 text-center">
        <h2
          className="font-heading font-extrabold text-trinova-blue leading-tight tracking-tight text-3xl sm:text-5xl flex flex-wrap items-baseline justify-center gap-x-4 sm:gap-x-7"
          aria-label="Vitality. Balance. Harmony."
        >
          {WORDS.map((word, i) => (
            <motion.span
              key={word}
              className="whitespace-nowrap"
              initial={reduce ? false : { opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={
                show
                  ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                  : { opacity: 0, y: 18, filter: 'blur(6px)' }
              }
              transition={{ duration: 0.5, delay: i * 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={i === 1 ? 'text-[#006837]' : undefined}>{word}</span>
            </motion.span>
          ))}
        </h2>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 flex items-center justify-center gap-3 sm:gap-4 flex-wrap"
        >
          {DOTS.map((dot) => (
            <span
              key={dot.label}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-600"
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: dot.color }}
              />
              {dot.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
