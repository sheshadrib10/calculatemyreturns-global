import React, { useState, useMemo } from 'react';
import { CurrencyCode, JurisdictionCode } from '../types';
import { CALCULATORS_CATALOG } from '../data/calculatorsList';
import { CURRENCIES, JURISDICTIONS } from '../data/jurisdictions';
import { executeQuickCalculator, formatCurrency } from '../utils/finance';
import { X, Sparkles, Printer, Copy, Check } from 'lucide-react';

interface InteractiveModalCalculatorProps {
  calcId: string;
  onClose: () => void;
  currentCurrency: CurrencyCode;
  currentJurisdiction: JurisdictionCode;
}

export const InteractiveModalCalculator: React.FC<InteractiveModalCalculatorProps> = ({
  calcId,
  onClose,
  currentCurrency,
  currentJurisdiction,
}) => {
  const jur = JURISDICTIONS[currentJurisdiction] || JURISDICTIONS.SG;
  const curr = CURRENCIES[currentCurrency] || CURRENCIES.USD;

  // Find calculator metadata
  const item = useMemo(() => {
    for (const cat of CALCULATORS_CATALOG) {
      const found = cat.items.find((i) => i.id === calcId);
      if (found) return found;
    }
    return CALCULATORS_CATALOG[0].items[0];
  }, [calcId]);

  // Dynamic input states based on calculator type
  const [param1, setParam1] = useState<number>(() => {
    if (calcId === 'sip') return 1500;
    if (calcId === 'compound-interest') return 100000;
    if (calcId === 'home-loan-emi') return 800000;
    if (calcId === 'emergency-fund') return 6000;
    if (calcId === 'dti') return 3000;
    if (calcId === 'retirement') return 8000;
    if (calcId === 'cagr') return 50000;
    return 10000;
  });

  const [param2, setParam2] = useState<number>(() => {
    if (calcId === 'sip') return 12; // 12% p.a.
    if (calcId === 'compound-interest') return 8; // 8% p.a.
    if (calcId === 'home-loan-emi') return 5.5; // 5.5% interest
    if (calcId === 'emergency-fund') return 6; // 6 months runway
    if (calcId === 'dti') return 9000; // 9000 gross income
    if (calcId === 'rule-of-72') return 9; // 9% rate
    if (calcId === 'retirement') return 3.5; // 3.5% SWR
    if (calcId === 'cagr') return 180000; // final value
    return 8;
  });

  const [param3, setParam3] = useState<number>(() => {
    if (calcId === 'sip') return 15; // 15 years
    if (calcId === 'compound-interest') return 10; // 10 years
    if (calcId === 'home-loan-emi') return 25; // 25 years tenure
    if (calcId === 'cagr') return 5; // 5 years hold
    return 10;
  });

  const [copied, setCopied] = useState(false);

  // Run calculation
  const result = useMemo(() => {
    let params: Record<string, number> = {};
    if (calcId === 'sip') {
      params = { monthly: param1, rate: param2, years: param3 };
    } else if (calcId === 'compound-interest') {
      params = { principal: param1, rate: param2, years: param3 };
    } else if (calcId === 'home-loan-emi') {
      params = { loanAmount: param1, rate: param2, tenure: param3 };
    } else if (calcId === 'emergency-fund') {
      params = { monthlyExpenses: param1, runwayMonths: param2 };
    } else if (calcId === 'dti') {
      params = { debt: param1, income: param2 };
    } else if (calcId === 'rule-of-72') {
      params = { rate: param2 };
    } else if (calcId === 'retirement') {
      params = { monthlyExpenses: param1, swr: param2 };
    } else if (calcId === 'cagr') {
      params = { initial: param1, final: param2, years: param3 };
    } else {
      params = { val1: param1, val2: param2, val3: param3 };
    }
    return executeQuickCalculator(calcId, params);
  }, [calcId, param1, param2, param3]);

  const handleCopy = () => {
    const text = `${item.name}\n${result.headlineLabel}: ${result.headlineValue}\n${result.summaryText}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-2xl bg-[#191514] border border-[#302826] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col justify-between text-[#FAF7F2]">
        
        {/* Topbar: Title and Close */}
        <div className="flex items-start justify-between pb-4 border-b border-[#302826]">
          <div>
            <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8C857E] mb-1">
              {item.category} · {jur.name}
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#FAF7F2] tracking-tight">
              {item.name}
            </h3>
            <p className="text-xs text-[#A39E98] mt-1 font-sans font-light">{item.desc}</p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#211A19] border border-[#302826] hover:border-[#8C5E3C] flex items-center justify-center text-[#B9B5AF] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Inputs & Result Display */}
        <div className="py-6 space-y-6 overflow-y-auto">
          
          {/* Result Banner */}
          <div className="bg-[#211A19] border border-[#302826] rounded-2xl p-6 text-center">
            <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#8C857E]">
              {result.headlineLabel}
            </span>
            <div className="mt-2 font-serif text-3xl sm:text-5xl font-normal text-[#FAF7F2]">
              {result.headlineValue}
            </div>
            <p className="mt-3 text-xs text-[#A39E98] max-w-lg mx-auto leading-relaxed font-sans font-light">
              {result.summaryText}
            </p>
          </div>

          {/* Details Table */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {result.details.map((d, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-[#211A19] border border-[#302826]">
                <div className="text-[10px] font-mono text-[#8C857E]">{d.label}</div>
                <div className="text-sm font-mono font-medium text-[#FAF7F2] mt-0.5">{d.value}</div>
              </div>
            ))}
          </div>

          {/* Interactive Parameters Controls */}
          <div className="space-y-4 pt-2">
            <div className="text-xs font-mono uppercase tracking-wider text-[#D4AF37]">
              Adjust Financial Variables
            </div>

            {/* Parameter 1 */}
            <div>
              <div className="flex justify-between text-xs text-[#B9B5AF] mb-1">
                <span>
                  {calcId === 'sip'
                    ? 'Monthly SIP Deposit'
                    : calcId === 'home-loan-emi'
                    ? 'Mortgage Loan Principal'
                    : calcId === 'emergency-fund'
                    ? 'Monthly Living Expenses'
                    : calcId === 'dti'
                    ? 'Total Monthly Debt Obligations'
                    : calcId === 'retirement'
                    ? 'Monthly Retirement Living Cost'
                    : 'Initial Investment Principal'}
                </span>
                <span className="font-mono text-white">
                  {curr.symbol}{param1.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min={calcId === 'home-loan-emi' ? 50000 : 500}
                max={calcId === 'home-loan-emi' ? 3000000 : 50000}
                step={calcId === 'home-loan-emi' ? 10000 : 250}
                value={param1}
                onChange={(e) => setParam1(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
            </div>

            {/* Parameter 2 */}
            <div>
              <div className="flex justify-between text-xs text-[#B9B5AF] mb-1">
                <span>
                  {calcId === 'emergency-fund'
                    ? 'Runway Target (Months)'
                    : calcId === 'dti'
                    ? 'Gross Monthly Compensation'
                    : calcId === 'retirement'
                    ? 'Safe Withdrawal Rate (%)'
                    : calcId === 'cagr'
                    ? 'Final Realized Balance'
                    : 'Annual Return / Interest Rate (%)'}
                </span>
                <span className="font-mono text-[#D4AF37]">
                  {calcId === 'emergency-fund'
                    ? `${param2} months`
                    : calcId === 'dti'
                    ? `${curr.symbol}${param2.toLocaleString()}`
                    : `${param2}%`}
                </span>
              </div>
              <input
                type="range"
                min={calcId === 'emergency-fund' ? 3 : calcId === 'dti' ? 2000 : 1}
                max={calcId === 'emergency-fund' ? 24 : calcId === 'dti' ? 30000 : 25}
                step={calcId === 'dti' ? 500 : 0.5}
                value={param2}
                onChange={(e) => setParam2(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
            </div>

            {/* Parameter 3 (Tenure/Years) if applicable */}
            {calcId !== 'emergency-fund' && calcId !== 'dti' && calcId !== 'rule-of-72' && calcId !== 'retirement' && (
              <div>
                <div className="flex justify-between text-xs text-[#B9B5AF] mb-1">
                  <span>Investment Tenure / Holding Period</span>
                  <span className="font-mono text-white">{param3} Years</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={40}
                  step={1}
                  value={param3}
                  onChange={(e) => setParam3(Number(e.target.value))}
                  className="w-full accent-[#D4AF37] cursor-pointer"
                />
              </div>
            )}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#2E2421] flex items-center justify-between">
          <div className="text-[11px] font-mono text-[#8C857E]">
            {item.formulaSummary}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#2E2421] bg-[#1C1615] text-xs text-[#EAE6E1] hover:border-[#D4AF37] transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#D4AF37] text-[#140F0E] font-semibold text-xs hover:bg-[#E5C07B] transition-all"
            >
              Done
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
