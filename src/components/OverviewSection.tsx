import React from 'react';
import { CurrencyCode, JurisdictionCode } from '../types';
import { JURISDICTIONS } from '../data/jurisdictions';
import { ShieldCheck, Scale, ArrowRight, TrendingUp } from 'lucide-react';
import { CountryFlag } from './CountryFlag';

interface OverviewSectionProps {
  currentJurisdiction: JurisdictionCode;
  currentCurrency: CurrencyCode;
  onOpenCompare: () => void;
  onScrollToCalculator: () => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  currentJurisdiction,
  currentCurrency,
  onOpenCompare,
  onScrollToCalculator,
}) => {
  const jur = JURISDICTIONS[currentJurisdiction] || JURISDICTIONS.SG;

  return (
    <section id="overview-section" className="bg-[#FAF7F2] text-[#211A19] py-24 sm:py-32 border-b border-[#E8E2D8]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        
        {/* Lenval Signature 2-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (7 cols): Editorial Philosophy & Statement */}
          <div className="lg:col-span-7 space-y-8">
            <div className="text-xs font-sans uppercase tracking-[0.25em] text-[#8C857E]">
              01 / Philosophy &amp; Underwriting
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.12] text-[#211A19] tracking-tight">
              A portfolio where capital works with complete mathematical certainty.
            </h2>

            <p className="text-base sm:text-lg text-[#5C5550] leading-relaxed font-sans font-light max-w-2xl">
              At Ariel Investments, capital allocation encompasses global equities, prime real estate, sovereign debt, and structured private assets. We believe portfolio underwritings must transcend generic rules of thumb — rigorously evaluating compounding curves, localized stamp duties, depreciation shields, currency inflation, and capital gains exemptions across sovereign jurisdictions.
            </p>

            <p className="text-sm text-[#7D7571] leading-relaxed font-sans max-w-2xl">
              By combining verified statutory logic with institutional multi-asset cash-flow engines, Ariel Investments gives family offices, high-net-worth investors, and principals mathematical certainty before deploying capital.
            </p>

            <div className="pt-4 flex items-center gap-6">
              <button
                onClick={onScrollToCalculator}
                className="px-6 py-3 rounded-full bg-[#211A19] text-[#FAF7F2] hover:bg-[#382E2B] text-xs font-sans uppercase tracking-[0.15em] font-medium transition-all flex items-center gap-2"
              >
                <span>Launch Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenCompare}
                className="text-xs font-sans uppercase tracking-[0.15em] text-[#211A19] hover:text-[#8C5E3C] transition-colors border-b border-[#211A19]/30 pb-0.5"
              >
                View Cross-Border Yields
              </button>
            </div>
          </div>

          {/* Right Column (5 cols): Lenval Specification Ledger */}
          <div className="lg:col-span-5 bg-[#F3EFE9] border border-[#E8E2D8] rounded-3xl p-8 sm:p-10 space-y-6">
            <div className="text-xs font-sans uppercase tracking-[0.2em] text-[#8C857E] pb-3 border-b border-[#E8E2D8]">
              Active Institutional Ledger
            </div>

            <div className="space-y-4 text-xs font-sans">
              <div className="flex justify-between py-2 border-b border-[#E8E2D8]/80">
                <span className="text-[#8C857E]">Target Sovereign Market</span>
                <span className="font-serif text-base font-semibold text-[#211A19] flex items-center gap-2">
                  <CountryFlag code={currentJurisdiction} size="sm" />
                  <span>{jur.name} ({jur.currency})</span>
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-[#E8E2D8]/80">
                <span className="text-[#8C857E]">Statutory Acquisition Fee</span>
                <span className="font-mono text-[#211A19] text-right font-medium">{jur.stampDutyName}</span>
              </div>

              <div className="flex justify-between py-2 border-b border-[#E8E2D8]/80">
                <span className="text-[#8C857E]">Exit Capital Gains Law</span>
                <span className="font-mono text-[#211A19] text-right font-medium">
                  {currentJurisdiction === 'SG' || currentJurisdiction === 'AE'
                    ? '0% Tax-Free Disposal'
                    : currentJurisdiction === 'MY'
                    ? '0% RPGT from Year 6'
                    : currentJurisdiction === 'IN'
                    ? '12.5% Budget 2024 LTCG'
                    : '15%-20% (1031 Deferrable)'}
                </span>
              </div>

              <div className="flex justify-between py-2 border-b border-[#E8E2D8]/80">
                <span className="text-[#8C857E]">Algorithmic Verification</span>
                <span className="text-emerald-800 font-mono font-medium">100% Deterministic Math</span>
              </div>

              <div className="flex justify-between py-2 border-b border-[#E8E2D8]/80">
                <span className="text-[#8C857E]">Confidentiality</span>
                <span className="text-[#211A19] font-medium">Zero-Storage · No Signup</span>
              </div>

              <div className="flex justify-between py-2">
                <span className="text-[#8C857E]">Architecture &amp; Engine</span>
                <a
                  href="https://shulo.xyz/novero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-[#8C5E3C] hover:underline flex items-center gap-1"
                >
                  <span>Powered &amp; Built by NOVERO</span>
                  <span>↗</span>
                </a>
              </div>
            </div>

            {/* Quote / Sub-Callout */}
            <div className="pt-4 border-t border-[#E8E2D8] text-xs italic text-[#7D7571] font-serif leading-relaxed">
              &ldquo;The luxury of financial precision is knowing your downside before celebrating the upside.&rdquo;
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

