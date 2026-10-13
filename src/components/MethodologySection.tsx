import React from 'react';
import { ArrowRight, Compass, LineChart, Scale, Wallet, TrendingUp } from 'lucide-react';
import { JurisdictionCode } from '../types';
import { JURISDICTIONS } from '../data/jurisdictions';

interface MethodologySectionProps {
  currentJurisdiction: JurisdictionCode;
  onScrollToCalculator: () => void;
  onOpenCompare: () => void;
  onOpenDirectory: () => void;
}

export const MethodologySection: React.FC<MethodologySectionProps> = ({
  currentJurisdiction,
  onScrollToCalculator,
  onOpenCompare,
  onOpenDirectory,
}) => {
  const jur = JURISDICTIONS[currentJurisdiction] || JURISDICTIONS.SG;

  const pillars = [
    {
      num: '01',
      title: 'Asset Origination',
      icon: Compass,
      desc: 'Identifying prime real estate corridors, disciplined equity funds, and structured private debt with enduring capital appreciation potential.',
      tag: 'Origination',
      action: 'Explore Markets',
      onClick: onOpenCompare,
    },
    {
      num: '02',
      title: 'Underwriting & IRR',
      icon: LineChart,
      desc: 'Conducting rigorous multi-asset simulations: Newton-Raphson property IRR, Step-up SIP equity compounding, and cashflow stress tests.',
      tag: 'Analytics',
      action: 'Launch Simulator',
      onClick: onScrollToCalculator,
    },
    {
      num: '03',
      title: 'Sovereign Tax Structuring',
      icon: Scale,
      desc: `Navigating sovereign stamp duty schedules (${jur.name}: ${jur.stampDutyName}), 0% capital gains havens, and localized depreciation shields.`,
      tag: 'Sovereign Law',
      action: 'Verify Tax Rules',
      onClick: onScrollToCalculator,
    },
    {
      num: '04',
      title: 'Cashflow & Leverage',
      icon: Wallet,
      desc: 'Balancing mortgage amortization, safe withdrawal rates (SWR), dividend yields, and liquidity buffers for maximum family security.',
      tag: 'Engineering',
      action: 'Test Amortization',
      onClick: onScrollToCalculator,
    },
    {
      num: '05',
      title: 'Generational Transfer',
      icon: TrendingUp,
      desc: 'Formulating strategic disposal timing, terminal portfolio capitalization, and after-tax equity distributions to preserve generational wealth.',
      tag: 'Realization',
      action: 'View All 45 Tools',
      onClick: onOpenDirectory,
    },
  ];

  return (
    <section className="relative bg-[#191514] text-[#FAF7F2] py-20 sm:py-28 border-b border-[#302826] overflow-hidden">
      {/* Ambient Liquid Caustic Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#8C5E3C]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Section Header (Lenval Editorial Styling) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#302826]">
          <div>
            <div className="text-[11px] sm:text-xs font-sans uppercase tracking-[0.25em] text-[#8C857E] mb-2">
              02 / The Institutional Framework · Multi-Asset Precision
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF7F2]">
              The Five Pillars of Capital Underwriting
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#A39E98] max-w-md font-sans font-light leading-relaxed">
            Every deployment across equities, real property, and fixed income is scrutinized through five distinct disciplines to eliminate speculation.
          </p>
        </div>

        {/* 5-Column Grid (Liquid Glass Architectural Cards) */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.num}
                onClick={p.onClick}
                className="group cursor-pointer liquid-glass-card rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs text-[#8C857E] group-hover:text-[#FAF7F2] transition-colors">
                      {p.num}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#191514] text-[#8C857E] border border-[#302826]">
                      {p.tag}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-2xl bg-[#191514] border border-[#302826] flex items-center justify-center text-[#B88A58] mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#FAF7F2] group-hover:text-[#D9D3CE] transition-colors">
                    {p.title}
                  </h3>

                  <p className="mt-3 text-xs text-[#8C857E] leading-relaxed font-sans font-light">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#302826] flex items-center justify-between text-[11px] font-sans uppercase tracking-[0.15em] text-[#A39E98] group-hover:text-[#FAF7F2] transition-colors">
                  <span>{p.action}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Lenval Quote Bar */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#211A19]/50 border border-[#302826] text-center max-w-3xl mx-auto">
          <p className="font-serif italic text-base sm:text-xl text-[#FAF7F2]/90 font-light leading-relaxed">
            &ldquo;Integrity is the foundation of every underwriting decision. From identifying opportunities to executing exits, we are guided by transparency and mathematical accountability.&rdquo;
          </p>
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8C857E] mt-3 block">
            — Ariel Investments Charter
          </span>
        </div>

      </div>
    </section>
  );
};
