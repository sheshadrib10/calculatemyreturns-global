import React, { useState, useMemo, useEffect } from 'react';
import { CurrencyCode, JurisdictionCode } from '../types';
import { CALCULATORS_CATALOG } from '../data/calculatorsList';
import { CURRENCIES, JURISDICTIONS } from '../data/jurisdictions';
import { executeQuickCalculator } from '../utils/finance';
import { fetchLiveMarketRates, LiveMarketRates } from '../services/liveRatesService';
import { X, Copy, Check, RefreshCw } from 'lucide-react';
import { CountryFlag } from './CountryFlag';

interface InteractiveModalCalculatorProps {
  calcId: string;
  onClose: () => void;
  currentCurrency: CurrencyCode;
  currentJurisdiction: JurisdictionCode;
}

interface ParamDef {
  label: string;
  defaultVal: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  isCurrency?: boolean;
}

const getCalculatorConfig = (calcId: string, symbol: string): { p1: ParamDef; p2: ParamDef; p3?: ParamDef } => {
  if (calcId === 'sip') {
    return {
      p1: { label: 'Monthly SIP Investment', defaultVal: 1500, min: 100, max: 50000, step: 100, unit: symbol, isCurrency: true },
      p2: { label: 'Expected Annual Return (%)', defaultVal: 12, min: 1, max: 30, step: 0.5, unit: '%' },
      p3: { label: 'Investment Horizon (Years)', defaultVal: 15, min: 1, max: 40, step: 1, unit: 'yrs' },
    };
  }
  if (calcId === 'stepup-sip') {
    return {
      p1: { label: 'Starting Monthly SIP', defaultVal: 2000, min: 100, max: 50000, step: 100, unit: symbol, isCurrency: true },
      p2: { label: 'Expected Annual Return (%)', defaultVal: 12, min: 1, max: 30, step: 0.5, unit: '%' },
      p3: { label: 'Annual Contribution Step-Up (%)', defaultVal: 10, min: 1, max: 30, step: 1, unit: '%' },
    };
  }
  if (calcId === 'lumpsum' || calcId === 'compound-interest') {
    return {
      p1: { label: 'Principal Investment Capital', defaultVal: 100000, min: 1000, max: 5000000, step: 5000, unit: symbol, isCurrency: true },
      p2: { label: 'Compounding Rate (%)', defaultVal: 10, min: 1, max: 30, step: 0.5, unit: '%' },
      p3: { label: 'Compounding Tenure (Years)', defaultVal: 10, min: 1, max: 40, step: 1, unit: 'yrs' },
    };
  }
  if (calcId === 'home-loan-emi' || calcId === 'car-loan') {
    return {
      p1: { label: 'Loan Principal Amount', defaultVal: 600000, min: 10000, max: 5000000, step: 10000, unit: symbol, isCurrency: true },
      p2: { label: 'Annual Interest Rate (%)', defaultVal: 5.5, min: 1, max: 20, step: 0.1, unit: '%' },
      p3: { label: 'Loan Tenure (Years)', defaultVal: 25, min: 1, max: 35, step: 1, unit: 'yrs' },
    };
  }
  if (calcId === 'rent-vs-buy') {
    return {
      p1: { label: 'Target Property Price', defaultVal: 1200000, min: 100000, max: 10000000, step: 50000, unit: symbol, isCurrency: true },
      p2: { label: 'Alternative Monthly Rent', defaultVal: 4000, min: 500, max: 30000, step: 200, unit: symbol, isCurrency: true },
      p3: { label: 'Comparison Horizon (Years)', defaultVal: 15, min: 3, max: 35, step: 1, unit: 'yrs' },
    };
  }
  if (calcId === 'home-affordability') {
    return {
      p1: { label: 'Gross Monthly Household Income', defaultVal: 15000, min: 2000, max: 100000, step: 500, unit: symbol, isCurrency: true },
      p2: { label: 'Existing Monthly Debt Liabilities', defaultVal: 2500, min: 0, max: 30000, step: 100, unit: symbol, isCurrency: true },
      p3: { label: 'Mortgage Rate (%)', defaultVal: 5.5, min: 1, max: 15, step: 0.1, unit: '%' },
    };
  }
  if (calcId === 'loan-refinance') {
    return {
      p1: { label: 'Remaining Mortgage Principal', defaultVal: 600000, min: 50000, max: 5000000, step: 25000, unit: symbol, isCurrency: true },
      p2: { label: 'Current Interest Rate (%)', defaultVal: 6.5, min: 2, max: 18, step: 0.1, unit: '%' },
      p3: { label: 'Refinanced New Rate (%)', defaultVal: 4.5, min: 1, max: 15, step: 0.1, unit: '%' },
    };
  }
  if (calcId === 'real-estate-tax-shield') {
    return {
      p1: { label: 'Property Acquisition Basis', defaultVal: 1000000, min: 100000, max: 10000000, step: 50000, unit: symbol, isCurrency: true },
      p2: { label: 'Marginal Income Tax Bracket (%)', defaultVal: 35, min: 10, max: 55, step: 1, unit: '%' },
    };
  }
  if (calcId === 'inflation') {
    return {
      p1: { label: 'Current Annual Living Cost', defaultVal: 100000, min: 5000, max: 1000000, step: 5000, unit: symbol, isCurrency: true },
      p2: { label: 'Expected Annual Inflation (%)', defaultVal: 4.5, min: 1, max: 15, step: 0.25, unit: '%' },
      p3: { label: 'Time Horizon (Years)', defaultVal: 15, min: 1, max: 40, step: 1, unit: 'yrs' },
    };
  }
  if (calcId === 'retirement') {
    return {
      p1: { label: 'Monthly Lifestyle Expenses', defaultVal: 8000, min: 1000, max: 50000, step: 500, unit: symbol, isCurrency: true },
      p2: { label: 'Safe Withdrawal Rate - SWR (%)', defaultVal: 3.5, min: 2, max: 7, step: 0.1, unit: '%' },
    };
  }
  if (calcId === 'swp') {
    return {
      p1: { label: 'Total Investment Portfolio Corpus', defaultVal: 1500000, min: 50000, max: 20000000, step: 50000, unit: symbol, isCurrency: true },
      p2: { label: 'Monthly Withdrawal Amount', defaultVal: 8000, min: 500, max: 100000, step: 500, unit: symbol, isCurrency: true },
      p3: { label: 'Portfolio Annual Return (%)', defaultVal: 8, min: 2, max: 18, step: 0.5, unit: '%' },
    };
  }
  if (calcId === 'emergency-fund') {
    return {
      p1: { label: 'Monthly Living Expenditures', defaultVal: 6000, min: 500, max: 50000, step: 250, unit: symbol, isCurrency: true },
      p2: { label: 'Runway Cushion Target (Months)', defaultVal: 6, min: 1, max: 24, step: 1, unit: 'months' },
    };
  }
  if (calcId === 'dti') {
    return {
      p1: { label: 'Total Monthly Debt Liabilities', defaultVal: 3000, min: 100, max: 30000, step: 250, unit: symbol, isCurrency: true },
      p2: { label: 'Gross Monthly Compensation', defaultVal: 9000, min: 1000, max: 100000, step: 500, unit: symbol, isCurrency: true },
    };
  }
  if (calcId === 'cagr') {
    return {
      p1: { label: 'Initial Starting Capital', defaultVal: 50000, min: 1000, max: 2000000, step: 5000, unit: symbol, isCurrency: true },
      p2: { label: 'Final Terminal Portfolio Value', defaultVal: 180000, min: 2000, max: 10000000, step: 10000, unit: symbol, isCurrency: true },
      p3: { label: 'Holding Tenure (Years)', defaultVal: 5, min: 1, max: 35, step: 1, unit: 'yrs' },
    };
  }
  if (calcId === 'rule-of-72') {
    return {
      p1: { label: 'Initial Capital', defaultVal: 50000, min: 1000, max: 1000000, step: 5000, unit: symbol, isCurrency: true },
      p2: { label: 'Expected Annual Rate of Return (%)', defaultVal: 9, min: 1, max: 30, step: 0.5, unit: '%' },
    };
  }
  if (calcId === 'salary-take-home') {
    return {
      p1: { label: 'Gross Annual CTC / Compensation', defaultVal: 120000, min: 10000, max: 2000000, step: 5000, unit: symbol, isCurrency: true },
      p2: { label: 'Estimated Tax & Surcharge (%)', defaultVal: 22, min: 0, max: 50, step: 1, unit: '%' },
    };
  }
  if (calcId === 'gratuity') {
    return {
      p1: { label: 'Last Drawn Basic Salary + DA', defaultVal: 150000, min: 10000, max: 2000000, step: 5000, unit: symbol, isCurrency: true },
      p2: { label: 'Total Completed Service (Years)', defaultVal: 12, min: 5, max: 40, step: 1, unit: 'yrs' },
    };
  }
  if (calcId === 'gold-investment') {
    return {
      p1: { label: 'Gold Investment Capital', defaultVal: 250000, min: 5000, max: 5000000, step: 10000, unit: symbol, isCurrency: true },
      p2: { label: 'Expected Bullion Return (%)', defaultVal: 9.5, min: 1, max: 25, step: 0.5, unit: '%' },
      p3: { label: 'Holding Tenure (Years)', defaultVal: 10, min: 1, max: 35, step: 1, unit: 'yrs' },
    };
  }
  if (calcId === 'fd-rd') {
    return {
      p1: { label: 'Fixed Term Deposit Principal', defaultVal: 500000, min: 5000, max: 10000000, step: 10000, unit: symbol, isCurrency: true },
      p2: { label: 'Bank Term Deposit Rate (%)', defaultVal: 7.2, min: 2, max: 15, step: 0.1, unit: '%' },
      p3: { label: 'Deposit Tenure (Years)', defaultVal: 5, min: 1, max: 20, step: 1, unit: 'yrs' },
    };
  }

  // Fallback default
  return {
    p1: { label: 'Principal / Investment Capital', defaultVal: 25000, min: 1000, max: 1000000, step: 1000, unit: symbol, isCurrency: true },
    p2: { label: 'Annual Return / Interest Rate (%)', defaultVal: 8, min: 1, max: 30, step: 0.5, unit: '%' },
    p3: { label: 'Holding Tenure (Years)', defaultVal: 5, min: 1, max: 30, step: 1, unit: 'yrs' },
  };
};

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

  const config = useMemo(() => getCalculatorConfig(calcId, curr.symbol), [calcId, curr.symbol]);

  // Blankable string-backed inputs
  const [p1Str, setP1Str] = useState<string>(() => String(config.p1.defaultVal));
  const [p2Str, setP2Str] = useState<string>(() => String(config.p2.defaultVal));
  const [p3Str, setP3Str] = useState<string>(() => (config.p3 ? String(config.p3.defaultVal) : '10'));
  const [copied, setCopied] = useState(false);

  // Live rate state pulled from internet
  const [liveRates, setLiveRates] = useState<LiveMarketRates | null>(null);
  const [isSyncingLive, setIsSyncingLive] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    setIsSyncingLive(true);
    fetchLiveMarketRates(currentJurisdiction)
      .then((rates) => {
        if (!isMounted) return;
        setLiveRates(rates);
        setIsSyncingLive(false);

        // Prepopulate rate parameters if this calculator uses interest/returns
        if (calcId === 'home-loan-emi' || calcId === 'car-loan' || calcId === 'loan-refinance') {
          setP2Str(String(rates.benchmarkMortgageRate));
        } else if (calcId === 'sip' || calcId === 'stepup-sip' || calcId === 'compound-interest') {
          setP2Str(String(rates.equityBenchmarkCagr));
        } else if (calcId === 'inflation') {
          setP2Str(String(rates.headlineInflation));
        } else if (calcId === 'fd-rd' || calcId === 'swp') {
          if (calcId === 'swp') setP3Str(String(rates.sovereign10YYield));
          else setP2Str(String(rates.sovereign10YYield));
        }
      })
      .catch(() => {
        if (isMounted) setIsSyncingLive(false);
      });

    return () => {
      isMounted = false;
    };
  }, [calcId, currentJurisdiction]);

  // Parse safe numbers with fallback
  const parseSafe = (val: string, fallback: number): number => {
    if (!val || val.trim() === '') return fallback;
    const cleaned = val.replace(/,/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? fallback : num;
  };

  const param1 = parseSafe(p1Str, config.p1.defaultVal);
  const param2 = parseSafe(p2Str, config.p2.defaultVal);
  const param3 = config.p3 ? parseSafe(p3Str, config.p3.defaultVal) : 10;

  // Run calculation
  const result = useMemo(() => {
    let params: Record<string, number> = {};
    if (calcId === 'sip') {
      params = { monthly: param1, rate: param2, years: param3 };
    } else if (calcId === 'stepup-sip') {
      params = { monthly: param1, rate: param2, stepUp: param3 };
    } else if (calcId === 'compound-interest' || calcId === 'lumpsum') {
      params = { principal: param1, rate: param2, years: param3 };
    } else if (calcId === 'home-loan-emi' || calcId === 'car-loan') {
      params = { loanAmount: param1, rate: param2, tenure: param3 };
    } else if (calcId === 'rent-vs-buy') {
      params = { propertyPrice: param1, monthlyRent: param2, years: param3 };
    } else if (calcId === 'home-affordability') {
      params = { income: param1, debt: param2, rate: param3 };
    } else if (calcId === 'loan-refinance') {
      params = { loanAmount: param1, currentRate: param2, newRate: param3 };
    } else if (calcId === 'real-estate-tax-shield') {
      params = { propertyValue: param1, taxBracket: param2 };
    } else if (calcId === 'inflation') {
      params = { amount: param1, rate: param2, years: param3 };
    } else if (calcId === 'emergency-fund') {
      params = { monthlyExpenses: param1, runwayMonths: param2 };
    } else if (calcId === 'dti') {
      params = { debt: param1, income: param2 };
    } else if (calcId === 'rule-of-72') {
      params = { rate: param2 };
    } else if (calcId === 'retirement') {
      params = { monthlyExpenses: param1, swr: param2 };
    } else if (calcId === 'swp') {
      params = { principal: param1, monthly: param2, rate: param3 };
    } else if (calcId === 'cagr') {
      params = { initial: param1, final: param2, years: param3 };
    } else if (calcId === 'fd-rd') {
      params = { principal: param1, rate: param2, years: param3 };
    } else if (calcId === 'gold-investment') {
      params = { amount: param1, rate: param2, years: param3 };
    } else if (calcId === 'salary-take-home') {
      params = { salary: param1, taxRate: param2 };
    } else if (calcId === 'gratuity') {
      params = { salary: param1, years: param2 };
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl liquid-glass-elevated rounded-3xl p-5 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col justify-between text-[#FAF7F2]">
        
        {/* Topbar: Title and Close */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div className="pr-4">
            <div className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8C857E] mb-1 flex items-center gap-2">
              <span>{item.category} ·</span>
              <CountryFlag code={currentJurisdiction} size="xs" />
              <span>{jur.name}</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#FAF7F2] tracking-tight">
              {item.name}
            </h3>
            <p className="text-xs text-[#A39E98] mt-1 font-sans font-light leading-relaxed">{item.desc}</p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full liquid-glass-pill hover:border-[#8C5E3C] flex items-center justify-center text-[#B9B5AF] hover:text-white transition-colors flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Inputs & Result Display */}
        <div className="py-5 space-y-6 overflow-y-auto">
          
          {/* Result Banner */}
          <div className="liquid-glass rounded-2xl p-5 text-center">
            <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#8C857E]">
              {result.headlineLabel}
            </span>
            <div className="mt-2 font-serif text-3xl sm:text-4xl font-normal text-[#FAF7F2]">
              {result.headlineValue}
            </div>
            <p className="mt-2.5 text-xs text-[#A39E98] max-w-md mx-auto leading-relaxed font-sans font-light">
              {result.summaryText}
            </p>
          </div>

          {/* Details Table */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {result.details.map((d, i) => (
              <div key={i} className="p-3 rounded-xl liquid-glass-card">
                <div className="text-[10px] font-mono text-[#8C857E] truncate">{d.label}</div>
                <div className="text-xs sm:text-sm font-mono font-medium text-[#FAF7F2] mt-0.5 truncate">{d.value}</div>
              </div>
            ))}
          </div>

          {/* Live Internet Sync Banner */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#191514] border border-[#302826] text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B88A58]" />
              <span className="text-[#FAF7F2] font-medium">Live Benchmark Rates Synced</span>
              <span className="text-[#8C857E] hidden sm:inline">· {liveRates?.source || jur.name}</span>
            </div>
            <span className="text-[10px] text-[#A39E98]">
              {isSyncingLive ? 'Syncing...' : 'Client Adjustable'}
            </span>
          </div>

          {/* Interactive Parameters Controls */}
          <div className="space-y-4 pt-1">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#B88A58]">
              Adjust Financial Variables
            </div>

            {/* Parameter 1 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-[#B9B5AF]">
                <span>{config.p1.label}</span>
                <span className="font-mono text-[#FAF7F2]">
                  {config.p1.isCurrency ? curr.symbol : ''}{param1.toLocaleString()}{!config.p1.isCurrency ? ` ${config.p1.unit}` : ''}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <input
                  type="range"
                  min={config.p1.min}
                  max={config.p1.max}
                  step={config.p1.step}
                  value={param1}
                  onChange={(e) => setP1Str(e.target.value)}
                  className="flex-grow accent-[#8C5E3C] cursor-pointer"
                />
                <div className="relative w-28 flex-shrink-0">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={p1Str}
                    placeholder={`e.g. ${config.p1.defaultVal}`}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === '' || /^[\d,]*\.?\d*$/.test(v)) setP1Str(v);
                    }}
                    className="w-full liquid-glass-input rounded-xl px-2.5 py-1.5 text-right pr-6 text-xs text-[#FAF7F2] font-mono focus:outline-none"
                  />
                  {p1Str && (
                    <button
                      type="button"
                      onClick={() => setP1Str('')}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs text-[#8C857E] hover:text-[#FAF7F2] p-0.5"
                      title="Clear"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Parameter 2 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-[#B9B5AF]">
                <span>{config.p2.label}</span>
                <span className="font-mono text-[#FAF7F2]">
                  {config.p2.isCurrency ? curr.symbol : ''}{param2.toLocaleString()}{!config.p2.isCurrency ? ` ${config.p2.unit}` : ''}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <input
                  type="range"
                  min={config.p2.min}
                  max={config.p2.max}
                  step={config.p2.step}
                  value={param2}
                  onChange={(e) => setP2Str(e.target.value)}
                  className="flex-grow accent-[#8C5E3C] cursor-pointer"
                />
                <div className="relative w-28 flex-shrink-0">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={p2Str}
                    placeholder={`e.g. ${config.p2.defaultVal}`}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === '' || /^[\d,]*\.?\d*$/.test(v)) setP2Str(v);
                    }}
                    className="w-full bg-[#211A19] border border-[#302826] rounded-xl px-2.5 py-1.5 text-right pr-6 text-xs text-[#FAF7F2] font-mono focus:outline-none focus:border-[#8C5E3C]"
                  />
                  {p2Str && (
                    <button
                      type="button"
                      onClick={() => setP2Str('')}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs text-[#8C857E] hover:text-[#FAF7F2] p-0.5"
                      title="Clear"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Parameter 3 (if applicable) */}
            {config.p3 && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-[#B9B5AF]">
                  <span>{config.p3.label}</span>
                  <span className="font-mono text-[#FAF7F2]">
                    {config.p3.isCurrency ? curr.symbol : ''}{param3.toLocaleString()}{!config.p3.isCurrency ? ` ${config.p3.unit}` : ''}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <input
                    type="range"
                    min={config.p3.min}
                    max={config.p3.max}
                    step={config.p3.step}
                    value={param3}
                    onChange={(e) => setP3Str(e.target.value)}
                    className="flex-grow accent-[#8C5E3C] cursor-pointer"
                  />
                  <div className="relative w-28 flex-shrink-0">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={p3Str}
                      placeholder={`e.g. ${config.p3.defaultVal}`}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === '' || /^[\d,]*\.?\d*$/.test(v)) setP3Str(v);
                      }}
                      className="w-full bg-[#211A19] border border-[#302826] rounded-xl px-2.5 py-1.5 text-right pr-6 text-xs text-[#FAF7F2] font-mono focus:outline-none focus:border-[#8C5E3C]"
                    />
                    {p3Str && (
                      <button
                        type="button"
                        onClick={() => setP3Str('')}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs text-[#8C857E] hover:text-[#FAF7F2] p-0.5"
                        title="Clear"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#302826] flex items-center justify-between">
          <div className="text-[10px] font-mono text-[#8C857E] truncate max-w-[240px]">
            {item.formulaSummary}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#302826] bg-[#211A19] text-xs text-[#FAF7F2] hover:border-[#8C5E3C] transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#B88A58]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-[#FAF7F2] text-[#191514] font-medium text-xs hover:bg-[#FAF7F2]/90 transition-all"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
