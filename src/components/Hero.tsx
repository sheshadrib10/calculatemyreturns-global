import React from 'react';
import { CurrencyCode, JurisdictionCode } from '../types';
import { JURISDICTIONS } from '../data/jurisdictions';
import {
  Search,
  Sparkles,
  ShieldCheck,
  Scale,
  TrendingUp,
  Landmark,
  Building2,
  Lock,
} from 'lucide-react';

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

  return (
    <section className="relative overflow-hidden pt-12 pb-14 border-b border-[#2E2421]/60">
      
      {/* Subtle Luxury Radial Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[380px] bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.08)_0%,rgba(38,16,13,0.15)_40%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Lenval-style Prime Location Tagline */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#1C1615]/80 backdrop-blur-md mb-6 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
          <span className="text-[11px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase">
            SINGAPORE · KUALA LUMPUR · MUMBAI · DUBAI · LONDON · NEW YORK
          </span>
        </div>

        {/* Hero Editorial Heading */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#F9F7F5] max-w-4xl mx-auto leading-[1.12]">
          Every critical number, <br className="hidden sm:block" />
          <span className="italic font-normal text-gold-gradient">before you commit capital.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm sm:text-base text-[#B9B5AF] max-w-2xl mx-auto leading-relaxed font-sans">
          Institutional-grade investment, real estate IRR, statutory tax shield, and private wealth calculators — precision-engineered with actual country laws, stamp duty matrices, and localized tax regimes.
        </p>

        {/* Lenval-style Architectural Specs & Legal Rules Bar */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-3xl mx-auto">
          <div className="p-3 rounded-xl border border-[#2E2421] bg-[#171211]/80 backdrop-blur-sm text-left">
            <div className="text-[10px] font-mono text-[#8C857E] uppercase">Active Jurisdiction</div>
            <div className="text-sm font-semibold text-white flex items-center gap-1.5 mt-0.5">
              <span>{activeJur.flag}</span>
              <span className="truncate">{activeJur.name}</span>
            </div>
            <div className="text-[10px] text-[#D4AF37] mt-1 font-mono">{activeJur.currency} Baseline</div>
          </div>

          <div className="p-3 rounded-xl border border-[#2E2421] bg-[#171211]/80 backdrop-blur-sm text-left">
            <div className="text-[10px] font-mono text-[#8C857E] uppercase">Capital Gains Law</div>
            <div className="text-xs font-medium text-white truncate mt-0.5">
              {currentJurisdiction === 'SG' || currentJurisdiction === 'AE'
                ? '0% Exit CGT'
                : currentJurisdiction === 'MY'
                ? '0% RPGT after 5 yrs'
                : currentJurisdiction === 'IN'
                ? '12.5% Unified LTCG'
                : 'Tiered Marginal'}
            </div>
            <div className="text-[10px] text-emerald-400 mt-1 font-mono">Verified Statutory</div>
          </div>

          <div className="p-3 rounded-xl border border-[#2E2421] bg-[#171211]/80 backdrop-blur-sm text-left">
            <div className="text-[10px] font-mono text-[#8C857E] uppercase">Acquisition Duty</div>
            <div className="text-xs font-medium text-white truncate mt-0.5">
              {activeJur.stampDutyName}
            </div>
            <div className="text-[10px] text-[#D4AF37] mt-1 font-mono">Tiered & Surcharges</div>
          </div>

          <div className="p-3 rounded-xl border border-[#2E2421] bg-[#171211]/80 backdrop-blur-sm text-left">
            <div className="text-[10px] font-mono text-[#8C857E] uppercase">Data Confidentiality</div>
            <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
              <Lock className="w-3 h-3" />
              <span>Zero-Storage</span>
            </div>
            <div className="text-[10px] text-[#8C857E] mt-1 font-mono">No GDPR / PDPA Risk</div>
          </div>
        </div>

        {/* Global Quick Search for All 45 Calculators */}
        <div className="mt-8 max-w-xl mx-auto relative">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8C857E] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 45 calculators (e.g. Rental IRR, Stamp Duty, SIP, Rent vs Buy, DTI, Tax)..."
              className="w-full bg-[#1A1413] border border-[#2E2421] rounded-full pl-11 pr-5 py-3 text-sm text-[#EAE6E1] placeholder-[#736B65] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]/50 transition-all font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#8C857E] hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick jump tags */}
          <div className="mt-3 flex items-center justify-center gap-2 flex-wrap text-xs">
            <span className="text-[11px] font-mono text-[#736B65]">Featured:</span>
            <button
              onClick={() => onSelectCalculator('rental-property')}
              className="px-2.5 py-1 rounded-md bg-[#251D1B] border border-[#2E2421] text-[#EAE6E1] hover:border-[#D4AF37] text-[11px] transition-colors"
            >
              Rental Property IRR
            </button>
            <button
              onClick={() => onSelectCalculator('stamp-duty-global')}
              className="px-2.5 py-1 rounded-md bg-[#251D1B] border border-[#2E2421] text-[#EAE6E1] hover:border-[#D4AF37] text-[11px] transition-colors"
            >
              Stamp Duty & ABSD
            </button>
            <button
              onClick={() => onSelectCalculator('rent-vs-buy')}
              className="px-2.5 py-1 rounded-md bg-[#251D1B] border border-[#2E2421] text-[#EAE6E1] hover:border-[#D4AF37] text-[11px] transition-colors"
            >
              Rent vs Buy
            </button>
            <button
              onClick={() => onSelectCalculator('sip')}
              className="px-2.5 py-1 rounded-md bg-[#251D1B] border border-[#2E2421] text-[#EAE6E1] hover:border-[#D4AF37] text-[11px] transition-colors"
            >
              SIP Wealth
            </button>
            <button
              onClick={onOpenCompare}
              className="px-2.5 py-1 rounded-md bg-[#2B1B13] border border-[#D4AF37]/40 text-[#D4AF37] hover:border-[#D4AF37] text-[11px] transition-colors flex items-center gap-1"
            >
              <TrendingUp className="w-3 h-3" />
              <span>Cross-Border Yields</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
