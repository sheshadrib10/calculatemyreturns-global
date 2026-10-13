import React from 'react';
import { CurrencyCode, JurisdictionCode } from '../types';
import { JURISDICTIONS } from '../data/jurisdictions';
import { Search, Sparkles, Lock, ArrowDown, ArrowUpRight, ChevronDown } from 'lucide-react';
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
    <section className="relative min-h-[88vh] sm:min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#191514] text-[#FAF7F2]">
      
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
      <div className="pt-10 sm:pt-20" />

      {/* Hero Center Text */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Headline */}
        <h1 className="font-serif text-3xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#FAF7F2] leading-tight">
          Ariel Investments
        </h1>
        <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#B88A58]">
          Multi-Asset Wealth &amp; Returns Suite
        </p>

        {/* Clean, Concise Subtitle */}
        <p className="mt-3 sm:mt-4 text-xs sm:text-sm font-sans text-[#D9D3CE] max-w-xl mx-auto leading-relaxed font-light px-2">
          Institutional financial modeling and statutory tax frameworks across global wealth hubs.
        </p>

        {/* Target Country for Investment Dropdown right above Launch IRR Simulator */}
        <div className="mt-6 sm:mt-8 max-w-xs sm:max-w-md mx-auto px-2">
          <label
            htmlFor="hero-country-select"
            className="block text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-[#B88A58] mb-2 font-medium text-center"
          >
            Target Country for Investment
          </label>

          <div className="relative group">
            {/* Styled Luxury Custom Select Button */}
            <div className="flex items-center justify-between w-full px-4 sm:px-5 py-3 rounded-2xl bg-[#211A19]/90 backdrop-blur-xl border border-[#FAF7F2]/25 group-hover:border-[#B88A58] transition-all shadow-xl">
              <div className="flex items-center gap-3 truncate text-left">
                <CountryFlag code={activeJur.code} size="sm" />
                <div className="truncate">
                  <div className="text-xs sm:text-sm font-medium text-[#FAF7F2] truncate flex items-center gap-2">
                    <span>{activeJur.name}</span>
                    <span className="text-[10px] font-mono text-[#B88A58] px-1.5 py-0.5 rounded bg-[#FAF7F2]/10">
                      {activeJur.currency}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#A39E98] font-mono truncate mt-0.5">
                    {activeJur.code === 'SG'
                      ? '0% Capital Gains · Progressive BSD'
                      : activeJur.code === 'CH'
                      ? 'Lex Koller Quotas · CHF Haven'
                      : activeJur.code === 'AU'
                      ? '50% CGT Discount · Transfer Duty'
                      : activeJur.code === 'NZ'
                      ? '0% Stamp Duty · Bright-Line 0% CGT'
                      : activeJur.code === 'AE'
                      ? '0% Income Tax · 4% DLD Transfer'
                      : activeJur.code === 'LK'
                      ? 'Inland Revenue Act · Colombo Port City'
                      : activeJur.code === 'MY'
                      ? 'Tiered Stamp Duty · 0% RPGT >5y'
                      : activeJur.code === 'IN'
                      ? 'Budget 2024 LTCG · Section 54'
                      : activeJur.code === 'GB'
                      ? 'SDLT Surcharges · Tapered Relief'
                      : activeJur.code === 'US'
                      ? '1031 Exchange · 27.5-Yr Shelter'
                      : 'Sovereign Statutory Framework'}
                  </div>
                </div>
              </div>

              <ChevronDown className="w-4 h-4 text-[#B88A58] flex-shrink-0 group-hover:translate-y-0.5 transition-transform ml-2" />
            </div>

            {/* Native Select Overlay for 100% Touch Reliability on Mobile */}
            <select
              id="hero-country-select"
              value={currentJurisdiction}
              onChange={(e) => onSelectJurisdiction(e.target.value as JurisdictionCode)}
              aria-label="Target Country for Investment"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer text-base"
            >
              {Object.values(JURISDICTIONS).map((j) => (
                <option key={j.code} value={j.code} className="bg-[#211A19] text-[#FAF7F2]">
                  {j.name} ({j.currency})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action: Single Decisive Button + Discreet Directory Link */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <button
            onClick={() => {
              const el = document.getElementById('calculator-section');
              if (el) {
                const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
            className="px-8 py-3.5 rounded-full bg-[#FAF7F2] text-[#191514] hover:bg-[#FAF7F2]/90 text-xs font-sans uppercase tracking-[0.15em] font-semibold transition-all shadow-2xl active:scale-95"
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
            className="text-xs font-sans uppercase tracking-[0.15em] text-[#D9D3CE] hover:text-[#FAF7F2] transition-colors flex items-center gap-1.5 py-2 group"
          >
            <span>Explore 45 Financial Tools</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#B88A58] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-10 sm:mt-12">
          <button
            onClick={scrollToOverview}
            className="inline-flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.2em] text-[#FAF7F2]/60 hover:text-[#FAF7F2] transition-colors"
          >
            <span>Scroll to Explore</span>
            <ArrowDown className="w-3 h-3 animate-bounce" />
          </button>
        </div>

      </div>

      {/* Bottom Calm Hairline Specification Bar */}
      <div className="relative z-10 border-t border-[#FAF7F2]/10 bg-[#191514]/70 backdrop-blur-md py-4 px-4 sm:px-8 text-center text-xs font-mono text-[#A39E98] flex flex-wrap items-center justify-center gap-4 sm:gap-8">
        <div className="flex items-center gap-2">
          <CountryFlag code={activeJur.code} size="xs" />
          <span className="text-[#FAF7F2] font-medium">{activeJur.name} Hub</span>
          <span className="text-[#8C857E]">({activeJur.currency})</span>
        </div>

        <span className="text-[#302826] hidden md:inline">|</span>

        <div>
          <span className="text-[#8C857E]">Statutory Tax: </span>
          <span className="text-[#FAF7F2]">
            {currentJurisdiction === 'SG' || currentJurisdiction === 'AE'
              ? '0% Exit Capital Gains'
              : currentJurisdiction === 'NZ'
              ? '0% Stamp Duty · 0% CGT'
              : currentJurisdiction === 'CH'
              ? 'Lex Koller Quotas · CHF Haven'
              : currentJurisdiction === 'LK'
              ? 'Inland Revenue Act · 10% CGT'
              : currentJurisdiction === 'AU'
              ? '50% Resident CGT Discount'
              : currentJurisdiction === 'MY'
              ? '0% RPGT after 5 Years'
              : currentJurisdiction === 'IN'
              ? '12.5% Budget 2024 LTCG'
              : '1031 Exchange · 27.5-Yr Shelter'}
          </span>
        </div>

        <span className="text-[#302826] hidden md:inline">|</span>

        <div className="flex items-center gap-1.5 text-[#8C857E]">
          <Lock className="w-3 h-3 text-[#B88A58]" />
          <span>Zero Tracking · 100% Client-Side Privacy</span>
        </div>
      </div>

    </section>
  );
};
