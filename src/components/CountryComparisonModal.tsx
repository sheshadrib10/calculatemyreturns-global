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
      
      <div className="relative w-full max-w-5xl bg-[#191514] border border-[#302826] rounded-3xl p-6 sm:p-9 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col justify-between text-[#FAF7F2]">
        
        {/* Topbar */}
        <div className="flex items-start justify-between pb-5 border-b border-[#302826]">
          <div>
            <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8C857E] mb-1">
              Global Wealth Arbitrage · Sovereign Tax Comparison
            </div>
            <h3 className="font-serif text-2xl sm:text-4xl font-normal text-[#FAF7F2] tracking-tight">
              Cross-Border Real Estate &amp; Yield Matrix
            </h3>
            <p className="text-xs text-[#A39E98] mt-1 max-w-2xl font-sans font-light">
              Compare acquisition friction, rental yield retention, statutory tax shelters, and net holding IRR across premier international investment destinations.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#211A19] border border-[#302826] hover:border-[#8C5E3C] flex items-center justify-center text-[#B9B5AF] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Matrix Table */}
        <div className="py-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {comparisonData.map((c) => (
              <div
                key={c.code}
                className="bg-[#211A19] border border-[#302826] hover:border-[#8C5E3C] rounded-3xl p-6 flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{c.flag}</span>
                      <div>
                        <h4 className="font-serif text-lg font-normal text-[#FAF7F2] group-hover:text-[#B88A58] transition-colors">
                          {c.name}
                        </h4>
                        <span className="text-[10px] font-mono text-[#8C857E]">{c.currency} Sovereign</span>
                      </div>
                    </div>

                    <span className="text-[9px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-[#191514] border border-[#302826] text-[#B88A58]">
                      {c.highlight}
                    </span>
                  </div>

                  <p className="text-xs text-[#A39E98] mb-4 font-sans font-light line-clamp-1">{c.tagline}</p>

                  <div className="space-y-2.5 text-xs font-mono">
                    <div className="flex justify-between py-1.5 border-b border-[#2A2220]">
                      <span className="text-[#8C857E]">Prime Yield:</span>
                      <span className="text-emerald-400 font-semibold">{c.typicalYield}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-[#2A2220]">
                      <span className="text-[#8C857E]">Acquisition Tax:</span>
                      <span className="text-[#FAF7F2]">{c.upfrontTax}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-[#2A2220]">
                      <span className="text-[#8C857E]">Exit CGT Law:</span>
                      <span className="text-[#B88A58]">{c.exitCgt}</span>
                    </div>

                    <div className="flex justify-between py-1.5 border-b border-[#2A2220]">
                      <span className="text-[#8C857E]">Projected IRR:</span>
                      <span className="text-white font-bold">{c.projectedIrr}</span>
                    </div>

                    <div className="flex justify-between py-1.5">
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
                  className="mt-6 w-full py-2.5 rounded-full bg-[#191514] hover:bg-[#FAF7F2] text-[#FAF7F2] hover:text-[#191514] font-medium text-xs font-sans uppercase tracking-[0.1em] border border-[#302826] hover:border-[#FAF7F2] transition-all flex items-center justify-center gap-2"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>Simulate in {c.name}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#302826] flex items-center justify-between text-xs text-[#8C857E] font-mono">
          <span>*Yields reflect 2026/2027 statutory legal schedules.</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#FAF7F2] text-[#191514] font-medium text-xs font-sans uppercase tracking-[0.1em] hover:bg-[#FAF7F2]/90 transition-all"
          >
            Close Matrix
          </button>
        </div>

      </div>

    </div>
  );
};
