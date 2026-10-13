import React from 'react';
import { CurrencyCode, JurisdictionCode } from '../types';
import { JURISDICTIONS } from '../data/jurisdictions';
import { X, TrendingUp, CheckCircle, ShieldAlert, Sparkles, Scale } from 'lucide-react';

interface CountryComparisonModalProps {
  onClose: () => void;
  onSelectJurisdiction: (code: JurisdictionCode) => void;
}

export const CountryComparisonModal: React.FC<CountryComparisonModalProps> = ({
  onClose,
  onSelectJurisdiction,
}) => {
  const comparisonData = [
    {
      code: 'AE' as JurisdictionCode,
      name: 'Dubai (UAE)',
      flag: '🇦🇪',
      currency: 'AED',
      typicalYield: '6.5% - 8.5%',
      upfrontTax: '4.0% DLD Fee',
      exitCgt: '0% (Tax-Free)',
      projectedIrr: '+13.8%',
      visaBenefit: '10-Year Golden Visa (AED 2M+)',
      tagline: 'Zero-Tax Luxury & High Cash Yield',
      highlight: 'Highest Net Rental Yield',
    },
    {
      code: 'SG' as JurisdictionCode,
      name: 'Singapore',
      flag: '🇸🇬',
      currency: 'SGD',
      typicalYield: '3.0% - 3.8%',
      upfrontTax: 'Tiered BSD (1%-6%) + ABSD',
      exitCgt: '0% (Tax-Free)',
      projectedIrr: '+9.4%',
      visaBenefit: 'Triple-A Sovereign Reserve',
      tagline: 'Global Safe-Haven & 0% CGT Exit',
      highlight: 'Zero Exit Capital Gains Tax',
    },
    {
      code: 'MY' as JurisdictionCode,
      name: 'Malaysia',
      flag: '🇲🇾',
      currency: 'MYR',
      typicalYield: '4.8% - 6.2%',
      upfrontTax: '1% - 4% MOT Stamp Duty',
      exitCgt: '0% after 5 yrs (Citizens) / 10%',
      projectedIrr: '+10.2%',
      visaBenefit: 'MM2H Long-Stay Visa Pathway',
      tagline: 'Affordable Entry & Favorable RPGT',
      highlight: '0% RPGT after 5 Years',
    },
    {
      code: 'IN' as JurisdictionCode,
      name: 'India',
      flag: '🇮🇳',
      currency: 'INR',
      typicalYield: '3.2% - 4.2%',
      upfrontTax: '5% - 7% Stamp Duty + 1% Reg.',
      exitCgt: '12.5% Unified LTCG (>24m)',
      projectedIrr: '+12.5%',
      visaBenefit: 'FEMA NRI/OCI Repatriable',
      tagline: 'Rapid Capital Appreciation Engine',
      highlight: 'High Demographic Expansion',
    },
    {
      code: 'US' as JurisdictionCode,
      name: 'United States',
      flag: '🇺🇸',
      currency: 'USD',
      typicalYield: '5.0% - 7.0%',
      upfrontTax: '2% - 3% Closing Costs',
      exitCgt: '15%-20% (100% Deferrable §1031)',
      projectedIrr: '+11.0%',
      visaBenefit: 'Deep Global Capital Liquidity',
      tagline: '27.5-Yr Building Depreciation Shelter',
      highlight: '1031 Tax-Free Exchange',
    },
    {
      code: 'GB' as JurisdictionCode,
      name: 'United Kingdom',
      flag: '🇬🇧',
      currency: 'GBP',
      typicalYield: '4.2% - 5.8%',
      upfrontTax: 'SDLT Tiered + 3% BTL (+2% Non-Res)',
      exitCgt: '18% / 24% Residential CGT',
      projectedIrr: '+8.9%',
      visaBenefit: 'PCL Global Prestige Reserve',
      tagline: 'Corporate SPV Finance Structure',
      highlight: 'Prime Global Commercial Hub',
    },
    {
      code: 'AU' as JurisdictionCode,
      name: 'Australia',
      flag: '🇦🇺',
      currency: 'AUD',
      typicalYield: '4.0% - 5.5%',
      upfrontTax: '4.5% Transfer Duty (+8% Foreign)',
      exitCgt: '50% Discount after 12 months',
      projectedIrr: '+10.5%',
      visaBenefit: 'High Skilled Migration Inflow',
      tagline: 'Negative Gearing Salary Shelter',
      highlight: 'Negative Gearing Tax Write-off',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-5xl bg-[#171211] border border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col justify-between">
        
        {/* Ambient Gold Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.12),transparent_70%)] pointer-events-none" />

        {/* Topbar */}
        <div className="flex items-start justify-between pb-4 border-b border-[#2E2421]">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] mb-1">
              Global Wealth Arbitrage · Sovereign Tax Comparison
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white tracking-tight">
              Cross-Border Real Estate &amp; Yield Matrix
            </h3>
            <p className="text-xs text-[#A39E98] mt-1 max-w-2xl">
              Compare acquisition friction, rental yield retention, statutory tax shelters, and net holding IRR across premier international investment destinations.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#1C1615] border border-[#2E2421] hover:border-[#D4AF37] flex items-center justify-center text-[#B9B5AF] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Matrix Table */}
        <div className="py-5 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {comparisonData.map((c) => (
              <div
                key={c.code}
                className="bg-[#1C1615] border border-[#2E2421] hover:border-[#D4AF37]/60 rounded-2xl p-5 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{c.flag}</span>
                      <div>
                        <h4 className="font-serif text-base font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
                          {c.name}
                        </h4>
                        <span className="text-[10px] font-mono text-[#8C857E]">{c.currency} Sovereign</span>
                      </div>
                    </div>

                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-[#2B1B13] border border-[#D4AF37]/30 text-[#D4AF37]">
                      {c.highlight}
                    </span>
                  </div>

                  <p className="text-xs text-[#B9B5AF] mb-4 font-sans line-clamp-1">{c.tagline}</p>

                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between py-1 border-b border-[#251D1B]">
                      <span className="text-[#8C857E]">Prime Yield:</span>
                      <span className="text-emerald-400 font-semibold">{c.typicalYield}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-[#251D1B]">
                      <span className="text-[#8C857E]">Acquisition Tax:</span>
                      <span className="text-[#EAE6E1]">{c.upfrontTax}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-[#251D1B]">
                      <span className="text-[#8C857E]">Exit CGT Law:</span>
                      <span className="text-[#D4AF37]">{c.exitCgt}</span>
                    </div>

                    <div className="flex justify-between py-1 border-b border-[#251D1B]">
                      <span className="text-[#8C857E]">Projected IRR:</span>
                      <span className="text-white font-bold">{c.projectedIrr}</span>
                    </div>

                    <div className="flex justify-between py-1">
                      <span className="text-[#8C857E]">Residency / Visa:</span>
                      <span className="text-emerald-400 truncate max-w-[130px]">{c.visaBenefit}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectJurisdiction(c.code);
                    onClose();
                  }}
                  className="mt-5 w-full py-2 rounded-xl bg-[#251D1B] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#140F0E] font-medium text-xs border border-[#2E2421] hover:border-[#D4AF37] transition-all flex items-center justify-center gap-1.5"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Simulate in {c.name}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#2E2421] flex items-center justify-between text-xs text-[#8C857E] font-mono">
          <span>*Yields and tax figures reflect 2026/2027 statutory legislation and market surveys.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#D4AF37] text-[#140F0E] font-semibold text-xs hover:bg-[#E5C07B] transition-all"
          >
            Close Matrix
          </button>
        </div>

      </div>

    </div>
  );
};
