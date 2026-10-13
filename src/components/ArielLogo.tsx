import React from 'react';

interface ArielLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const ArielLogo: React.FC<ArielLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const heights = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-11',
  }[size] || 'h-9';

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Ariel Theme Logo in Quiet Luxury Espresso & Champagne */}
      <div className="flex items-center bg-[#211A19] rounded-[4px] border border-[#3E3330] p-1 shadow-sm">
        {/* Emblem block with Lion silhouette in champagne/bronze */}
        <div className="bg-[#2E2421] border border-[#4A3B37] w-6 h-6 sm:w-7 sm:h-7 rounded-[3px] flex items-center justify-center p-0.5 relative overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#B88A58] fill-current" xmlns="http://www.w3.org/2000/svg">
            {/* Stylised Singapore Lion Head profile */}
            <path d="M18,30 C20,18 36,12 52,14 C62,15 72,20 80,30 C86,37 88,46 88,54 C88,60 84,65 79,66 C75,67 71,64 71,60 C71,55 75,52 74,47 C72,40 64,36 58,35 C52,34 46,37 42,41 C38,45 36,52 38,57 C40,61 44,63 48,63 C52,63 56,60 59,57 C61,55 64,56 65,58 C66,61 63,65 60,68 C55,73 48,76 41,76 C32,76 25,72 20,65 C15,57 14,48 16,39 Z" />
            <path d="M52,38 C55,38 58,41 58,44 C58,47 55,50 52,50 C49,50 46,47 46,44 C46,41 49,38 52,38 Z" fill="#2E2421" />
            {/* Lion Mane Maneuvers */}
            <path d="M22,38 C28,45 28,58 35,66 C30,73 24,80 15,82 C18,72 17,61 16,51 Z" opacity="0.9" />
          </svg>
        </div>
        {/* ARIEL bold wordmark in travertine */}
        <span className="font-serif font-medium tracking-[0.08em] text-[#FAF7F2] text-base sm:text-lg pl-2 pr-1.5 leading-none">
          ARIEL
        </span>
      </div>

      {showSubtitle && (
        <div className="hidden sm:flex flex-col text-left border-l border-[#302826] pl-2.5">
          <span className="font-serif text-xs font-semibold tracking-wider text-[#FAF7F2] uppercase">
            Investments
          </span>
          <span className="text-[9px] font-mono tracking-widest text-[#B88A58] uppercase">
            Singapore Hub
          </span>
        </div>
      )}
    </div>
  );
};

