import React from 'react';
import { X, Phone, MessageSquare, MapPin, Globe, ShieldCheck, Award, ExternalLink } from 'lucide-react';
import { ArielLogo } from './ArielLogo';

interface PrincipalContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrincipalContactModal: React.FC<PrincipalContactModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl liquid-glass-elevated rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col justify-between text-[#FAF7F2]">
        
        {/* Top Header */}
        <div className="flex items-start justify-between pb-5 border-b border-white/10">
          <div>
            <div className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#8C857E] mb-2">
              Principal Executive Office · Singapore
            </div>
            <ArielLogo size="md" />
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full liquid-glass-pill hover:border-[#8C5E3C] flex items-center justify-center text-[#B9B5AF] hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Principal Profile Card */}
        <div className="py-6 space-y-6 overflow-y-auto">
          
          <div className="p-5 sm:p-6 rounded-2xl liquid-glass border border-white/10 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B88A58]">
              Owner &amp; Managing Director
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#FAF7F2] tracking-tight">
              Mr. Babu James
            </h3>
            <p className="text-xs text-[#C4BCB5] font-sans font-light">
              Dr. B. James, PhD · Managing Director, Ariel Group of Companies
            </p>
            <p className="text-xs text-[#8C857E] pt-2 font-light leading-relaxed">
              For private wealth advisory, institutional capital allocation, sovereign asset underwriting, or cross-border portfolio structuring, connect directly with Mr. Babu James.
            </p>
          </div>

          {/* Direct Contact Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* WhatsApp */}
            <a
              href="https://wa.me/6598551924?text=Hello%20Mr.%20Babu%20James,%20I%20would%20like%20to%20enquire%20about%20Ariel%20Investments%20portfolio."
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-2xl bg-[#211A19] border border-[#3E3330] hover:border-[#B88A58] text-left transition-all group flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#2E2421] text-[#B88A58] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="truncate">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#B88A58]">
                  Direct WhatsApp
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#FAF7F2] truncate mt-0.5">
                  +65 9855 1924
                </div>
              </div>
            </a>

            {/* Direct Mobile Call */}
            <a
              href="tel:+6598551924"
              className="p-4 rounded-2xl liquid-glass border border-white/10 hover:border-[#8C5E3C] text-left transition-all group flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-[#2E2421] text-[#FAF7F2] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div className="truncate">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#8C857E]">
                  Mobile Call
                </div>
                <div className="text-xs sm:text-sm font-semibold text-[#FAF7F2] truncate mt-0.5">
                  +65 9855 1924
                </div>
              </div>
            </a>
          </div>

          {/* Corporate Office Information */}
          <div className="space-y-3 p-5 rounded-2xl liquid-glass text-xs font-sans">
            <div className="flex items-start gap-3 py-1">
              <Phone className="w-4 h-4 text-[#8C857E] mt-0.5 flex-shrink-0" />
              <div className="flex-1 flex justify-between">
                <span className="text-[#8C857E]">Office Phone:</span>
                <a href="tel:+6569084338" className="font-mono text-[#FAF7F2] hover:underline">
                  +65 6908 4338
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 py-1 border-t border-white/5">
              <Phone className="w-4 h-4 text-[#8C857E] mt-0.5 flex-shrink-0" />
              <div className="flex-1 flex justify-between">
                <span className="text-[#8C857E]">Fax:</span>
                <span className="font-mono text-[#FAF7F2]">+65 6233 9416</span>
              </div>
            </div>

            <div className="flex items-start gap-3 py-1 border-t border-white/5">
              <Globe className="w-4 h-4 text-[#8C857E] mt-0.5 flex-shrink-0" />
              <div className="flex-1 flex justify-between">
                <span className="text-[#8C857E]">Corporate Portal:</span>
                <a
                  href="https://www.ariel.sg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[#B88A58] hover:underline flex items-center gap-1"
                >
                  <span>www.ariel.sg</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 py-1 border-t border-white/5">
              <MapPin className="w-4 h-4 text-[#8C857E] mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-[#8C857E] block mb-0.5">Corporate Headquarters:</span>
                <span className="text-[#FAF7F2] font-mono leading-relaxed block text-[11px]">
                  1 Yishun Industrial Street 1, #05-26 A-Posh Biz Hub, Singapore 768160
                </span>
              </div>
            </div>
          </div>

          {/* Institutional Quality Accreditations */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[#8C857E] mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B88A58]" />
              <span>Singapore &amp; International Accreditations</span>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-[#211A19] border border-[#302826] text-[#FAF7F2]">
                ISO 9001 Certified
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#211A19] border border-[#302826] text-[#FAF7F2]">
                ISO 45001 / OHSAS 18001
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#211A19] border border-[#302826] text-[#FAF7F2]">
                ISO 14001 Environmental
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#211A19] border border-[#3E3330] text-[#FAF7F2]">
                bizSAFE Star Recognised
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#211A19] border border-[#302826] text-[#B88A58]">
                SME500 Singapore Award
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#211A19] border border-[#302826] text-[#C4BCB5]">
                British Bodyguard Association
              </span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-[10px] font-mono text-[#8C857E]">
            Ariel Group of Companies · Direct Enquiries
          </span>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/6598551924?text=Hello%20Mr.%20Babu%20James,%20I%20would%20like%20to%20enquire%20about%20Ariel%20Investments%20portfolio."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#B88A58] hover:bg-[#C5A880] text-[#14100F] font-semibold text-xs font-sans transition-all flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Mr. Babu James</span>
            </a>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl liquid-glass text-xs text-[#FAF7F2] hover:bg-white/10 transition-all"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

