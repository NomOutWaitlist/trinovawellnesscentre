import React from 'react';

interface TrinovaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'dark';
  className?: string;
  showSubtitle?: boolean;
}

export const TrinovaLogo: React.FC<TrinovaLogoProps> = ({
  size = 'md',
  variant = 'default',
  className = '',
  showSubtitle = true
}) => {
  // Dimensions
  const dimensions = {
    sm: { height: 36, leafSize: 28, textClass: 'text-2xl', subTextClass: 'text-[9px] tracking-[0.22em]' },
    md: { height: 46, leafSize: 36, textClass: 'text-3xl', subTextClass: 'text-[10px] tracking-[0.26em]' },
    lg: { height: 58, leafSize: 44, textClass: 'text-4xl', subTextClass: 'text-xs tracking-[0.28em]' },
    xl: { height: 72, leafSize: 56, textClass: 'text-5xl', subTextClass: 'text-sm tracking-[0.3em]' }
  }[size];

  const isWhite = variant === 'white';
  const textColor = isWhite ? 'text-white' : 'text-[#0033A0]';
  const subColor = isWhite ? 'text-emerald-300' : 'text-[#006837]';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Official Botanical Leaf Element */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          width={dimensions.leafSize}
          height={dimensions.leafSize * 1.15}
          viewBox="0 0 54 62"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id={`leafGrad-${size}-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00C853" />
              <stop offset="60%" stopColor="#00A651" />
              <stop offset="100%" stopColor="#006837" />
            </linearGradient>
          </defs>
          {/* Main Leaf Body */}
          <path
            d="M27 3 C11 8 1 24 1 42 C1 58 14 61 31 60 C46 59 53 47 52 28 C51 14 39 5 27 3 Z"
            fill={`url(#leafGrad-${size}-${variant})`}
          />
          {/* Stem & Delicate Veins */}
          <path
            d="M27 4 C27 24 22 44 8 55"
            stroke="#FFFFFF"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.8"
          />
          <path
            d="M22 22 C28 27 35 31 44 32"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.65"
          />
          <path
            d="M19 34 C24 39 31 43 38 44"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />
          {/* Small Growth Sprout Accent */}
          <path
            d="M31 4 C36 1 43 2 47 7 C50 12 49 18 44 21 C38 23 33 16 31 4 Z"
            fill="#70D800"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Brand Wordmark & Tagline */}
      <div className="flex flex-col justify-center leading-none">
        {/* Trinova script wordmark */}
        <span
          className={`font-script font-bold italic tracking-tight ${textColor} ${dimensions.textClass}`}
          style={{
            fontFamily: "'Playfair Display', 'Brush Script MT', 'Great Vibes', 'Caveat', 'Snell Roundhand', Georgia, serif",
            lineHeight: 1.05
          }}
        >
          Trinova
        </span>

        {/* WELLNESS CENTRE subtitle */}
        {showSubtitle && (
          <span
            className={`font-heading font-extrabold uppercase mt-0.5 ${subColor} ${dimensions.subTextClass}`}
          >
            WELLNESS CENTRE
          </span>
        )}
      </div>
    </div>
  );
};
