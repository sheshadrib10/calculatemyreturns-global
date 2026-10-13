import React from 'react';
import { JurisdictionCode } from '../types';
import { JURISDICTIONS } from '../data/jurisdictions';
import { Printer, ArrowUp, Lock } from 'lucide-react';
import { NoveroLogo } from './NoveroLogo';

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
    <footer className="bg-[#14100F] text-[#FAF7F2] pt-20 sm:pt-24 pb-14 sm:pb-16 border-t border-[#302826] font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-10">
        
        {/* Lenval-style "Speak Directly / Get in Touch" Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20 border-b border-[#302826]">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs uppercase tracking-[0.25em] text-[#8C857E]">
              05 / Private Consultation
            </div>

            <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-[#FAF7F2]">
              Speak Directly
            </h2>

            <p className="text-base sm:text-lg text-[#B9B5AF] max-w-xl font-light leading-relaxed">
              For private placement advisory, institutional portfolio underwriting, or custom cross-border tax matrices — we welcome direct conversation. All computations and models are processed in complete confidentiality.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-emerald-400">
              <Lock className="w-4 h-4" />
              <span>100% Client-Side Computation · Zero Data Tracked · No Signup</span>
            </div>
          </div>

          {/* Quick Jurisdictions & PDF Export */}
          <div className="lg:col-span-5 space-y-6 lg:pl-10">
            <div className="text-xs uppercase tracking-[0.2em] text-[#8C857E]">
              Active Legal Jurisdictions
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.values(JURISDICTIONS).map((j) => (
                <button
                  key={j.code}
                  onClick={() => onSelectJurisdiction(j.code)}
                  className={`text-left px-3 py-2 rounded-xl border text-[11px] transition-colors flex items-center gap-2 ${
                    j.code === currentJurisdiction
                      ? 'border-[#8C5E3C] bg-[#211A19] text-[#FAF7F2]'
                      : 'border-[#261E1C] text-[#8C857E] hover:text-[#FAF7F2] hover:bg-[#1E1716]'
                  }`}
                >
                  <span>{j.flag}</span>
                  <span className="truncate">{j.name}</span>
                </button>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-full border border-[#302826] bg-[#191514] hover:border-[#8C5E3C] text-xs uppercase tracking-[0.1em] text-[#FAF7F2] transition-all flex items-center gap-2"
              >
                <Printer className="w-3.5 h-3.5 text-[#B88A58]" />
                <span>Save Memorandum (PDF)</span>
              </button>

              <button
                onClick={scrollToTop}
                className="w-10 h-10 rounded-full border border-[#302826] bg-[#191514] hover:border-[#8C5E3C] flex items-center justify-center text-[#FAF7F2] transition-all"
                title="Back to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Prominent Novero Attribution & Client Acquisition Card */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-[#191514] border border-[#302826] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <NoveroLogo size="md" />
            <div>
              <div className="text-xs text-[#FAF7F2] font-medium">
                Powered &amp; Built by{' '}
                <a
                  href="https://shulo.xyz/novero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#B88A58] transition-colors font-bold tracking-wider"
                >
                  NOVERO
                </a>
              </div>
              <div className="text-[11px] text-[#8C857E] font-light mt-0.5 font-sans">
                Marketing, Customer Experience &amp; Growth Firm · Creative Technology &amp; AI
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://shulo.xyz/novero#brief"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full bg-[#FAF7F2] text-[#191514] hover:bg-white text-xs font-sans uppercase tracking-[0.1em] font-medium transition-all flex items-center gap-1.5 shadow-md"
            >
              <span>Enquire with Novero</span>
              <ArrowUp className="w-3.5 h-3.5 rotate-45" />
            </a>

            <a
              href="https://shulo.xyz/novero"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-full border border-[#302826] bg-[#211A19] hover:border-[#8C5E3C] text-xs font-sans uppercase tracking-[0.1em] text-[#FAF7F2] transition-all flex items-center gap-1.5"
            >
              <span>Agency Portfolio</span>
            </a>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="mt-10 flex flex-col sm:flex-row items-baseline justify-between gap-4 text-xs font-mono text-[#8C857E]">
          <p className="max-w-2xl leading-relaxed font-light text-[11px]">
            Ariel Returns Calculator provides illustrative simulations for private capital and investment evaluation. No financial data is transmitted or retained. Excluded from GDPR/PDPA compliance obligations by design.
          </p>

          <div className="whitespace-nowrap">
            © {new Date().getFullYear()} Ariel Properties · Powered &amp; Built by{' '}
            <a href="https://shulo.xyz/novero" target="_blank" rel="noopener noreferrer" className="text-[#FAF7F2] hover:underline font-bold">
              NOVERO
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
