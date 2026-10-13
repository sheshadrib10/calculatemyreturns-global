import React from 'react';
import { CurrencyCode, JurisdictionCode } from '../types';
import { JURISDICTIONS } from '../data/jurisdictions';
import { Search, Sparkles, Lock, ArrowDown } from 'lucide-react';

interface HeroProps {
  currentJurisdiction: JurisdictionCode;
  onSelectJurisdiction: (code: JurisdictionCode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectCalculator: (calcId: string) => void;
  onOpenCompare: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentJurisdiction,
  onSelectJurisdiction,
  searchQuery,
  setSearchQuery,
  onSelectCalculator,
  onOpenCompare,
}) => {
  const activeJur = JURISDICTIONS[currentJurisdiction] || JURISDICTIONS.SG;

  const scrollToOverview = () => {
    document.getElementById('overview-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#191514] text-[#FAF7F2]">
      
      {/* Cinematic Full-Bleed Architectural Background (Lenval The Den Signature Imagery) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn.prod.website-files.com/69e15aa1d45aa73e62a536a8/6a778aab1f6681ee558e6866_the-den-13.webp"
          alt="Ariel Luxury Penthouse Interior"
          className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.08] scale-105 animate-in fade-in duration-1000"
        />
        {/* Top and Bottom Lenval Gradient Fades */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#191514] via-transparent to-[#191514]/70" />
      </div>

      {/* Top Padding */}
      <div className="pt-16 sm:pt-24" />

      {/* Hero Center Text (Exact Lenval Typography & Alignment) */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        
        {/* Tracked Kicker */}
        <p className="text-xs sm:text-sm font-sans uppercase tracking-[0.3em] text-[#D9D3CE] font-light">
          Singapore · Malaysia · Dubai · London · New York · Mumbai
        </p>

        {/* Huge Lenval Editorial Headline */}
        <h1 className="mt-5 font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-[#FAF7F2] leading-[1.05]">
          Ariel Returns Calculator
        </h1>

        {/* Subtitle */}
        <p className="mt-6 font-serif italic text-xl sm:text-3xl text-[#E5DFD9] font-light max-w-3xl mx-auto leading-relaxed">
          A Space Where Capital Compounds Across Generations.
        </p>

        <p className="mt-4 text-xs sm:text-sm font-sans text-[#B9B5AF] max-w-2xl mx-auto leading-relaxed font-light">
          Institutional financial modeling for prime real estate acquisitions, cross-border tax shields, and private wealth — engineered with actual statutory laws, tiered stamp duty schedules, and zero data tracking.
        </p>

        {/* Minimalist Search Bar */}
        <div className="mt-8 max-w-md mx-auto relative">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8C857E] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 45 institutional calculators..."
              className="w-full bg-[#191514]/80 backdrop-blur-md border border-[#FAF7F2]/20 rounded-full pl-11 pr-5 py-3 text-xs text-[#FAF7F2] placeholder-[#8C857E] focus:outline-none focus:border-[#FAF7F2] transition-all font-sans"
            />
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-8">
          <button
            onClick={scrollToOverview}
            className="inline-flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.2em] text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors"
          >
            <span>Explore Overview</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </button>
        </div>

      </div>

      {/* Bottom Lenval 4-Metric Specification Bar with Vertical Rules */}
      <div className="relative z-10 border-t border-[#FAF7F2]/15 bg-[#191514]/75 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 py-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          
          <div className="border-r border-[#FAF7F2]/10 pr-4 last:border-0">
            <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8C857E]">
              Active Market
            </div>
            <div className="font-serif text-lg text-[#FAF7F2] mt-1 flex items-center gap-2">
              <span>{activeJur.flag}</span>
              <span className="truncate">{activeJur.name}</span>
            </div>
            <div className="text-[11px] font-mono text-[#B9B5AF] mt-0.5">{activeJur.currency} Baseline</div>
          </div>

          <div className="border-r border-[#FAF7F2]/10 pr-4 last:border-0">
            <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8C857E]">
              Suite Scope
            </div>
            <div className="font-serif text-lg text-[#FAF7F2] mt-1">
              45 Financial Calculators
            </div>
            <div className="text-[11px] font-mono text-[#B9B5AF] mt-0.5">Real Estate, SIP, Tax, Debt</div>
          </div>

          <div className="border-r border-[#FAF7F2]/10 pr-4 last:border-0">
            <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8C857E]">
              Statutory Tax
            </div>
            <div className="font-serif text-lg text-[#FAF7F2] mt-1 truncate">
              {currentJurisdiction === 'SG' || currentJurisdiction === 'AE'
                ? '0% Exit Capital Gains'
                : currentJurisdiction === 'MY'
                ? '0% RPGT after 5 Years'
                : currentJurisdiction === 'IN'
                ? '12.5% Budget 2024 LTCG'
                : '27.5-Yr US Tax Shelter'}
            </div>
            <div className="text-[11px] font-mono text-emerald-400 mt-0.5">Verified Legal Model</div>
          </div>

          <div>
            <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8C857E]">
              Data Privacy
            </div>
            <div className="font-serif text-lg text-emerald-400 mt-1 flex items-center gap-1.5">
              <Lock className="w-4 h-4" />
              <span>Zero-Storage</span>
            </div>
            <div className="text-[11px] font-mono text-[#8C857E] mt-0.5">No Signup · Client-Side</div>
          </div>

        </div>
      </div>

    </section>
  );
};
