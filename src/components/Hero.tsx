import React from 'react';
import { CurrencyCode, JurisdictionCode } from '../types';
import { JURISDICTIONS } from '../data/jurisdictions';
import { Search, Sparkles, Lock, ArrowDown, ArrowUpRight } from 'lucide-react';
import { NoveroLogo } from './NoveroLogo';
import { CountryFlag } from './CountryFlag';

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
      
      {/* Cinematic Full-Bleed Background (Ultra-Luxury Private Aviation on Tarmac with Boarding Stairs) */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1684838200815-36eef38f353c?auto=format&fit=crop&w=2160&q=80"
          alt="Ariel Private Aviation and Sovereign Wealth"
          className="w-full h-full object-cover object-center filter brightness-[0.46] contrast-[1.1] scale-105 animate-in fade-in duration-1000"
        />
        {/* Top and Bottom Lenval Gradient Fades */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#191514] via-[#191514]/45 to-[#191514]/85" />
      </div>

      {/* Top Padding */}
      <div className="pt-16 sm:pt-24" />

      {/* Hero Center Text (Exact Lenval Typography & Alignment) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Sovereign Hubs with Authentic Vector Flags (No text acronyms) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs font-sans uppercase tracking-[0.2em] text-[#E5DFD9] font-medium">
          <span className="inline-flex items-center gap-1.5"><CountryFlag code="SG" size="xs" /> Singapore</span>
          <span className="text-[#8C857E]">·</span>
          <span className="inline-flex items-center gap-1.5"><CountryFlag code="CH" size="xs" /> Zurich</span>
          <span className="text-[#8C857E]">·</span>
          <span className="inline-flex items-center gap-1.5"><CountryFlag code="AE" size="xs" /> Dubai</span>
          <span className="text-[#8C857E]">·</span>
          <span className="inline-flex items-center gap-1.5"><CountryFlag code="AU" size="xs" /> Sydney</span>
          <span className="text-[#8C857E]">·</span>
          <span className="inline-flex items-center gap-1.5"><CountryFlag code="NZ" size="xs" /> Auckland</span>
          <span className="text-[#8C857E]">·</span>
          <span className="inline-flex items-center gap-1.5"><CountryFlag code="GB" size="xs" /> London</span>
          <span className="text-[#8C857E]">·</span>
          <span className="inline-flex items-center gap-1.5"><CountryFlag code="US" size="xs" /> New York</span>
          <span className="text-[#8C857E]">·</span>
          <span className="inline-flex items-center gap-1.5"><CountryFlag code="MY" size="xs" /> Malaysia</span>
          <span className="text-[#8C857E]">·</span>
          <span className="inline-flex items-center gap-1.5"><CountryFlag code="LK" size="xs" /> Colombo</span>
          <span className="text-[#8C857E]">·</span>
          <span className="inline-flex items-center gap-1.5"><CountryFlag code="IN" size="xs" /> Mumbai</span>
        </div>

        {/* Prominent Powered & Built by Novero Attribution */}
        <div className="mt-3 sm:mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#191514]/85 backdrop-blur-md border border-[#FAF7F2]/20 hover:border-[#8C5E3C] transition-all shadow-lg group">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B88A58]" />
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#D9D3CE]">
            Powered &amp; Built by
          </span>
          <a
            href="https://shulo.xyz/novero"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            <NoveroLogo size="xs" showWordmark={true} />
            <ArrowUpRight className="w-3.5 h-3.5 text-[#B88A58] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Huge Lenval Editorial Headline */}
        <h1 className="mt-4 sm:mt-5 font-serif text-4xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-[#FAF7F2] leading-[1.08] sm:leading-[1.05]">
          Ariel Investments
        </h1>
        <p className="mt-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#B88A58]">
          Returns Calculator &amp; Private Wealth Suite
        </p>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 font-serif italic text-lg sm:text-2xl lg:text-3xl text-[#E5DFD9] font-light max-w-3xl mx-auto leading-relaxed">
          A Space Where Multi-Asset Capital Compounds Across Generations.
        </p>

        <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-sans text-[#B9B5AF] max-w-2xl mx-auto leading-relaxed font-light px-2">
          Institutional financial modeling for multi-asset wealth allocation — systematic equities, prime real estate, sovereign debt, and cross-border tax shields — engineered with verified statutory mathematics and zero data tracking.
        </p>

        {/* Action Buttons: Simulator & All 45 Calculators */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => {
              const el = document.getElementById('calculator-section');
              if (el) {
                const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            className="px-6 py-3 rounded-full bg-[#FAF7F2] text-[#191514] hover:bg-[#FAF7F2]/90 text-xs font-sans uppercase tracking-[0.15em] font-medium transition-all shadow-md active:scale-95"
          >
            Launch IRR Simulator
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('directory-section');
              if (el) {
                const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            className="px-6 py-3 rounded-full border border-[#FAF7F2]/30 bg-[#211A19]/80 backdrop-blur-md hover:border-[#8C5E3C] text-xs font-sans uppercase tracking-[0.15em] text-[#FAF7F2] transition-all active:scale-95 flex items-center gap-2"
          >
            <span>All 45 Calculators</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C5E3C]" />
          </button>
        </div>

        {/* Minimalist Search Bar */}
        <div className="mt-6 max-w-md mx-auto relative px-2">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8C857E] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 45 institutional calculators..."
              className="w-full bg-[#191514]/85 backdrop-blur-md border border-[#FAF7F2]/20 rounded-full pl-11 pr-5 py-3 text-base sm:text-xs text-[#FAF7F2] placeholder-[#8C857E] focus:outline-none focus:border-[#FAF7F2] transition-all font-sans"
            />
          </div>
        </div>

        {/* Scroll Indicator (Lenval "scroll to explore") */}
        <div className="mt-7">
          <button
            onClick={scrollToOverview}
            className="inline-flex items-center gap-2 text-[11px] font-sans uppercase tracking-[0.2em] text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors"
          >
            <span>scroll to explore</span>
            <ArrowDown className="w-3 h-3 animate-bounce" />
          </button>
        </div>

      </div>

      {/* Bottom Lenval 4-Metric Specification Bar with Vertical Rules */}
      <div className="relative z-10 border-t border-[#FAF7F2]/15 bg-[#191514]/85 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-10 py-5 sm:py-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
          
          <div className="border-r border-[#FAF7F2]/10 pr-3 sm:pr-4">
            <div className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.2em] text-[#8C857E]">
              Active Market
            </div>
            <div className="font-serif text-base sm:text-lg text-[#FAF7F2] mt-1 flex items-center gap-2 truncate">
              <CountryFlag code={activeJur.code} size="sm" />
              <span className="truncate">{activeJur.name}</span>
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono text-[#B9B5AF] mt-0.5">{activeJur.currency} Sovereign Rules</div>
          </div>

          <div className="lg:border-r border-[#FAF7F2]/10 lg:pr-4">
            <div className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.2em] text-[#8C857E]">
              Suite Scope
            </div>
            <div className="font-serif text-base sm:text-lg text-[#FAF7F2] mt-1">
              45 Financial Tools
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono text-[#B9B5AF] mt-0.5">Real Estate, SIP, Tax, Debt</div>
          </div>

          <div className="border-r border-[#FAF7F2]/10 pr-3 sm:pr-4 border-t lg:border-t-0 pt-3 lg:pt-0">
            <div className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.2em] text-[#8C857E]">
              Statutory Tax
            </div>
            <div className="font-serif text-base sm:text-lg text-[#FAF7F2] mt-1 truncate">
              {currentJurisdiction === 'SG' || currentJurisdiction === 'AE'
                ? '0% Exit Capital Gains'
                : currentJurisdiction === 'NZ'
                ? '0% Stamp Duty · 0% CGT'
                : currentJurisdiction === 'CH'
                ? 'Lex Koller · CHF Haven'
                : currentJurisdiction === 'LK'
                ? '10% CGT · Port City SEZ'
                : currentJurisdiction === 'AU'
                ? '50% CGT Discount (>12m)'
                : currentJurisdiction === 'MY'
                ? '0% RPGT after 5 Years'
                : currentJurisdiction === 'IN'
                ? '12.5% Budget 2024 LTCG'
                : '27.5-Yr US Tax Shelter'}
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono text-[#B88A58] mt-0.5">Verified Legal Model</div>
          </div>

          <div className="border-t lg:border-t-0 pt-3 lg:pt-0">
            <div className="text-[9px] sm:text-[10px] font-sans uppercase tracking-[0.2em] text-[#8C857E]">
              Data Privacy
            </div>
            <div className="font-serif text-base sm:text-lg text-[#FAF7F2] mt-1 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#B88A58]" />
              <span>Zero-Storage</span>
            </div>
            <div className="text-[10px] sm:text-[11px] font-mono text-[#8C857E] mt-0.5">No Tracking · Client-Side</div>
          </div>

        </div>
      </div>

    </section>
  );
};
