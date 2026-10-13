import React from 'react';
import { ArrowRight, Plus } from 'lucide-react';

interface WhatsInsideSectionProps {
  onScrollToCalculator: () => void;
  onOpenDirectory: () => void;
  onOpenCompare: () => void;
}

export const WhatsInsideSection: React.FC<WhatsInsideSectionProps> = ({
  onScrollToCalculator,
  onOpenDirectory,
  onOpenCompare,
}) => {
  const modules = [
    {
      number: '01',
      title: 'The Flagship Property IRR Engine',
      category: 'Real Estate & Leverage',
      desc: 'Combines dynamic rental yield, mortgage debt amortization, holding cost escalation, and country-specific acquisition stamp duties (ABSD, MOT, DLD) into an exact annualized IRR on invested capital.',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      actionLabel: 'Launch Simulator',
      onClick: onScrollToCalculator,
    },
    {
      number: '02',
      title: 'Statutory Tax Shields & Cross-Border Jurisdictions',
      category: 'Sovereign Tax Law & Global Life',
      desc: 'Precision localized logic across Singapore (0% CGT), Switzerland (Lex Koller & CHF reserve), New Zealand (0% stamp duty), Dubai (0% tax), Australia (50% CGT discount), Sri Lanka (Port City SEZ), and the US (1031 Exchange).',
      img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80',
      actionLabel: 'Compare Jurisdictions',
      onClick: onOpenCompare,
    },
    {
      number: '03',
      title: 'The 45-Calculator Wealth & Solvency Suite',
      category: 'Haute Horlogerie & Wealth Suite',
      desc: 'From systematic equity compounding (SIP, Step-up SIP, CAGR, XIRR) to retirement runway solvency (4% rule, corpus solver), debt-to-income (DTI), and take-home compensation engineering.',
      img: 'https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?auto=format&fit=crop&w=1200&q=80',
      actionLabel: 'Browse All 45 Tools',
      onClick: onOpenDirectory,
    },
  ];

  return (
    <section className="relative bg-[#191514] text-[#FAF7F2] py-24 sm:py-32 border-b border-[#302826] overflow-hidden">
      {/* Ambient Caustic Glow */}
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-[#8C5E3C]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10">
        
        {/* Section Heading (Lenval Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#302826]">
          <div>
            <div className="text-xs font-sans uppercase tracking-[0.25em] text-[#8C857E] mb-2">
              03 / Architecture of the Suite
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF7F2]">
              What&apos;s Inside
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#A39E98] max-w-md font-sans font-light leading-relaxed">
            Every module unites the gravitas of multi-asset private wealth management with institutional computational precision and sovereign statutory rigor.
          </p>
        </div>

        {/* 3 Module Cards with Liquid Glass & Architectural Imagery */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {modules.map((m) => (
            <div
              key={m.number}
              onClick={m.onClick}
              className="group cursor-pointer liquid-glass-card rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
            >
              <div>
                {/* Image Container with Subtle Hover Zoom */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#211A19]">
                  <img
                    src={m.img}
                    alt={m.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
                  />
                  <div className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-[#191514]/85 backdrop-blur-md text-[#FAF7F2] border border-white/10">
                    {m.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="text-xs font-mono text-[#B88A58] mb-2">{m.number}</div>
                  <h3 className="font-serif text-2xl font-normal text-[#FAF7F2] group-hover:text-[#D9D3CE] transition-colors">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-xs text-[#A39E98] leading-relaxed font-sans font-light">
                    {m.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Action Line */}
              <div className="p-8 pt-0">
                <div className="pt-4 border-t border-[#302826] flex items-center justify-between text-xs font-sans uppercase tracking-[0.15em] text-[#D9D3CE] group-hover:text-[#FAF7F2] transition-colors">
                  <span>{m.actionLabel}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

