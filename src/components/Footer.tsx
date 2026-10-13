import React from 'react';
import { JurisdictionCode } from '../types';
import { JURISDICTIONS } from '../data/jurisdictions';
import { Printer, ArrowUp, Lock, Phone, MessageSquare, MapPin, Globe, ShieldCheck, ExternalLink, ArrowUpRight } from 'lucide-react';
import { NoveroLogo } from './NoveroLogo';
import { CountryFlag } from './CountryFlag';
import { ArielLogo } from './ArielLogo';

interface FooterProps {
  currentJurisdiction: JurisdictionCode;
  onSelectJurisdiction: (code: JurisdictionCode) => void;
  onOpenPrincipalContact?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentJurisdiction,
  onSelectJurisdiction,
  onOpenPrincipalContact,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#14100F] text-[#FAF7F2] pt-20 sm:pt-24 pb-14 sm:pb-16 border-t border-[#302826] font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-10">
        
        {/* Lenval-style "Speak Directly / Get in Touch" Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#302826]">
          
          {/* Left Column: Direct Consultation with Dr. Babu James */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs uppercase tracking-[0.25em] text-[#8C857E]">
              05 / Direct Principal Consultation
            </div>

            <div className="flex items-center gap-3">
              <ArielLogo size="sm" showSubtitle={false} />
              <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#FAF7F2]">
                Speak Directly
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#B9B5AF] max-w-xl font-light leading-relaxed">
              For private placement advisory, institutional portfolio underwriting, or cross-border wealth matrices — connect directly with our Managing Director.
            </p>

            {/* Dr. Babu James Contact Card */}
            <div className="p-6 rounded-3xl bg-[#1E1716] border border-[#302826] space-y-5 max-w-xl">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#2E2421] pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#B88A58]">
                    Owner &amp; Managing Director
                  </span>
                  <div className="font-serif text-2xl font-normal text-[#FAF7F2] mt-0.5">
                    Mr. Babu James
                  </div>
                  <div className="text-xs text-[#8C857E] font-light">
                    Dr. B. James, PhD · Ariel Group of Companies, Singapore
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://wa.me/6598551924?text=Hello%20Mr.%20Babu%20James,%20I%20am%20enquiring%20about%20Ariel%20Investments%20portfolio."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-full bg-[#B88A58] hover:bg-[#C5A880] text-[#14100F] font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="tel:+6598551924"
                    className="px-3.5 py-1.5 rounded-full bg-[#FAF7F2] text-[#191514] font-semibold text-xs hover:bg-white transition-all flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Mobile</span>
                  </a>
                </div>
              </div>

              {/* Contact Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-[#8C857E]">Direct Mobile</span>
                  <a href="tel:+6598551924" className="block text-[#FAF7F2] font-semibold hover:underline">
                    +65 9855 1924
                  </a>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-[#8C857E]">Office Line</span>
                  <a href="tel:+6569084338" className="block text-[#FAF7F2] hover:underline">
                    +65 6908 4338
                  </a>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-[#8C857E]">Fax</span>
                  <span className="block text-[#A39E98]">+65 6233 9416</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-[#8C857E]">Corporate Portal</span>
                  <a
                    href="https://www.ariel.sg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-[#B88A58] hover:underline"
                  >
                    www.ariel.sg ↗
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="pt-3 border-t border-[#2E2421] text-xs font-mono text-[#8C857E] flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#B88A58] mt-0.5 flex-shrink-0" />
                <span>1 Yishun Industrial Street 1, A-Posh Biz Hub, #05-26, Singapore 768160</span>
              </div>

              {/* Trust Badges */}
              <div className="pt-3 border-t border-[#2E2421] flex flex-wrap gap-2 text-[10px] font-mono text-[#A39E98]">
                <span className="px-2 py-0.5 rounded bg-[#191514] border border-[#2E2421]">ISO 9001</span>
                <span className="px-2 py-0.5 rounded bg-[#191514] border border-[#2E2421]">ISO 45001</span>
                <span className="px-2 py-0.5 rounded bg-[#191514] border border-[#2E2421]">ISO 14001</span>
                <span className="px-2 py-0.5 rounded bg-[#191514] text-[#FAF7F2] border border-[#302826]">bizSAFE Star</span>
                <span className="px-2 py-0.5 rounded bg-[#191514] border border-[#2E2421]">SME500 Award</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3 text-xs font-mono text-[#8C857E]">
              <Lock className="w-4 h-4 text-[#B88A58]" />
              <span>100% Client-Side Computation · Zero Data Tracked · Strict Confidentiality</span>
            </div>
          </div>

          {/* Quick Jurisdictions with Authentic SVG Flags */}
          <div className="lg:col-span-5 space-y-6 lg:pl-10">
            <div className="text-xs uppercase tracking-[0.2em] text-[#8C857E]">
              Active Sovereign Jurisdictions
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {Object.values(JURISDICTIONS).map((j) => (
                <button
                  key={j.code}
                  onClick={() => onSelectJurisdiction(j.code)}
                  className={`text-left px-3 py-2 rounded-xl border text-[11px] transition-colors flex items-center gap-2.5 ${
                    j.code === currentJurisdiction
                      ? 'border-[#8C5E3C] bg-[#211A19] text-[#FAF7F2] font-medium'
                      : 'border-[#261E1C] text-[#8C857E] hover:text-[#FAF7F2] hover:bg-[#1E1716]'
                  }`}
                >
                  <CountryFlag code={j.code} size="xs" />
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

        {/* Bottom Legal Notice */}
        <div className="mt-10 flex flex-col sm:flex-row items-baseline justify-between gap-4 text-xs font-mono text-[#8C857E]">
          <p className="max-w-2xl leading-relaxed font-light text-[11px]">
            Ariel Investments provides institutional multi-asset underwriting for private wealth and capital allocation. Managed by Ariel Group of Companies, Singapore. Excluded from GDPR/PDPA compliance tracking by design.
          </p>

          <div className="whitespace-nowrap">
            © {new Date().getFullYear()} Ariel Group of Companies · Powered &amp; Built by{' '}
            <a href="https://shulo.xyz/novero" target="_blank" rel="noopener noreferrer" className="text-[#FAF7F2] hover:underline font-bold">
              NOVERO
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
