import React from 'react';

interface NoveroLogoProps {
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
}

export const NoveroLogo: React.FC<NoveroLogoProps> = ({
  className = '',
  size = 'md',
  showWordmark = true,
}) => {
  const markDimensions =
    size === 'xs'
      ? 'w-4 h-4'
      : size === 'sm'
      ? 'w-5 h-5'
      : size === 'lg'
      ? 'w-10 h-10'
      : 'w-7 h-7';
  const textClass =
    size === 'xs'
      ? 'text-[11px] tracking-[0.08em]'
      : size === 'sm'
      ? 'text-xs tracking-[0.08em]'
      : size === 'lg'
      ? 'text-2xl tracking-[0.06em]'
      : 'text-sm tracking-[0.07em]';

  return (
    <div className={`inline-flex items-center gap-2 group ${className}`}>
      {/* Authentic Novero Vector Mark */}
      <svg
        viewBox="0 0 120 110"
        className={`${markDimensions} flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="novero-metal" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#8A8E98" />
            <stop offset="42%" stopColor="#F5F6F8" />
            <stop offset="62%" stopColor="#9DA1A9" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#novero-metal)" strokeLinejoin="round">
          <path
            d="M4 106C16 80 26 68 37 74S55 94 70 78"
            strokeWidth="6"
            opacity="0.35"
          />
          <path
            d="M4 93C16 67 26 55 37 61S55 81 70 65"
            strokeWidth="6"
            opacity="0.6"
          />
          <path
            d="M4 80C16 54 26 42 37 48S55 68 70 52L93 20"
            strokeWidth="7"
          />
        </g>
        <path d="M108 2 101 32 94 24 84 17Z" fill="url(#novero-metal)" />
      </svg>

      {showWordmark && (
        <span
          className={`font-sans font-bold uppercase text-[#FAF7F2] tracking-wider transition-colors group-hover:text-white ${textClass}`}
          style={{ fontFamily: 'Montserrat, "IBM Plex Sans", sans-serif' }}
        >
          NOVERO
        </span>
      )}
    </div>
  );
};
