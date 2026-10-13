import React from 'react';
import { CurrencyCode, JurisdictionCode } from '../types';
import { JURISDICTIONS } from '../data/jurisdictions';
import { ShieldCheck, Printer, ArrowUp } from 'lucide-react';

interface FooterProps {
  currentJurisdiction: JurisdictionCode;
  onSelectJurisdiction: (code: JurisdictionCode) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentJurisdiction,
  onSelectJurisdiction,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#2E2421] bg-[#120E0D] text-[#8C857E] pt-14 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-[#251D1B]">
          
          {/* Brand & Manifesto */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-[#D4AF37]/40 bg-[#26100D] flex items-center justify-center text-[#D4AF37] font-serif font-bold text-base">
                A
              </div>
              <span className="font-serif text-xl font-semibold text-white tracking-tight">
                AURA · Calculate My Returns Global
              </span>
            </div>

            <p className="text-xs text-[#A39E98] leading-relaxed max-w-md font-sans">
              Precision private wealth and real estate return engines. Built to reflect genuine cross-border property tax laws, tiered stamp duty schedules, and wealth compounding dynamics across premier international markets.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Client-Side Privacy · No Tracking · No Sign-Up</span>
            </div>
          </div>

          {/* Quick Jurisdictions */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              Localized Tax Engines
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.values(JURISDICTIONS).map((j) => (
                <button
                  key={j.code}
                  onClick={() => onSelectJurisdiction(j.code)}
                  className={`text-left px-2.5 py-1.5 rounded-lg border text-[11px] transition-colors flex items-center gap-2 ${
                    j.code === currentJurisdiction
                      ? 'border-[#D4AF37] bg-[#2E2421] text-[#D4AF37]'
                      : 'border-transparent text-[#A39E98] hover:text-white hover:bg-[#1C1615]'
                  }`}
                >
                  <span>{j.flag}</span>
                  <span className="truncate">{j.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Institutional Compliance & Actions */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
              Export &amp; Access
            </div>
            <div className="space-y-2">
              <button
                onClick={() => window.print()}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#1C1615] border border-[#2E2421] text-xs text-[#EAE6E1] hover:border-[#D4AF37] transition-all"
              >
                <span>Print / Save as PDF</span>
                <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>

              <button
                onClick={scrollToTop}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-[#1C1615] border border-[#2E2421] text-xs text-[#EAE6E1] hover:border-[#D4AF37] transition-all"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>
            </div>
          </div>

        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-[#736B65]">
          <p className="max-w-3xl leading-relaxed text-center sm:text-left">
            These calculators and AI audits are provided for educational and illustrative purposes only. They do not constitute formal legal, taxation, or investment advice. No financial data is transmitted or retained.
          </p>
          <div className="whitespace-nowrap">
            © {new Date().getFullYear()} AURA Global Returns · All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
};
