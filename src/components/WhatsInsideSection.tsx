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
      img: 'https://cdn.prod.website-files.com/69e15aa1d45aa73e62a536a8/6a778c79962c0290fc4badd1_the-den-6.webp',
      actionLabel: 'Launch Simulator',
      onClick: onScrollToCalculator,
    },
    {
      number: '02',
      title: 'Statutory Tax Shields & Cross-Border Jurisdictions',
      category: 'Sovereign Tax Law',
      desc: 'Precision localized logic across Singapore (0% CGT), Malaysia (0% RPGT after 5 yrs), Dubai (0% tax & Golden Visa), US (27.5-yr depreciation & 1031 Exchange), and India (Budget 2024 unified LTCG).',
      img: 'https://cdn.prod.website-files.com/69e15aa1d45aa73e62a536a8/6a778c91f4e3c41569a4f01f_the-den-15.webp',
      actionLabel: 'Compare Jurisdictions',
      onClick: onOpenCompare,
    },
    {
      number: '03',
      title: 'The 45-Calculator Wealth & Solvency Suite',
      category: 'Comprehensive Wealth',
      desc: 'From systematic equity compounding (SIP, Step-up SIP, CAGR, XIRR) to retirement runway solvency (4% rule, corpus solver), debt-to-income (DTI), and take-home compensation engineering.',
      img: 'https://cdn.prod.website-files.com/69e15aa1d45aa73e62a536a8/6a778e4c2e5bff50f4334371_the-den-21.webp',
      actionLabel: 'Browse All 45 Tools',
      onClick: onOpenDirectory,
    },
  ];

  return (
    <section className="bg-[#FAF7F2] text-[#211A19] py-24 sm:py-32 border-b border-[#E8E2D8]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        
        {/* Section Heading (Lenval Style) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E8E2D8]">
          <div>
            <div className="text-xs font-sans uppercase tracking-[0.25em] text-[#8C857E] mb-2">
              03 / Architecture of the Suite
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#211A19]">
              What&apos;s Inside
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#7D7571] max-w-md font-sans font-light leading-relaxed">
            Every module unites the gravitas of traditional private wealth management with modern computational precision.
          </p>
        </div>

        {/* 3 Module Cards with Lenval Architectural Imagery */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-8">
          {modules.map((m) => (
            <div
              key={m.number}
              onClick={m.onClick}
              className="group cursor-pointer bg-[#F5EFEB] border border-[#E8E2D8] hover:border-[#8C5E3C] rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container with Subtle Hover Zoom */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#211A19]">
                  <img
                    src={m.img}
                    alt={m.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                  />
                  <div className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-[#191514]/75 backdrop-blur-md text-[#FAF7F2]">
                    {m.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="text-xs font-mono text-[#8C857E] mb-2">{m.number}</div>
                  <h3 className="font-serif text-2xl font-normal text-[#211A19] group-hover:text-[#8C5E3C] transition-colors">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-xs text-[#5C5550] leading-relaxed font-sans font-light">
                    {m.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Action Line */}
              <div className="p-8 pt-0">
                <div className="pt-4 border-t border-[#E8E2D8] flex items-center justify-between text-xs font-sans uppercase tracking-[0.15em] text-[#211A19] group-hover:text-[#8C5E3C] transition-colors">
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
