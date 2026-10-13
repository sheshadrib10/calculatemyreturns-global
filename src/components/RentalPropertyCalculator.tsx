import React, { useState, useMemo, useEffect } from 'react';
import { BuyerStatus, CurrencyCode, JurisdictionCode, PropertyInputs } from '../types';
import { CURRENCIES, JURISDICTIONS } from '../data/jurisdictions';
import { formatCurrency, formatPercent, simulatePropertyInvestment } from '../utils/finance';
import { generateDeterministicAiAudit } from '../utils/aiAdvisory';
import { fetchLiveMarketRates, LiveMarketRates } from '../services/liveRatesService';
import { CountryFlag } from './CountryFlag';
import {
  Building2,
  TrendingUp,
  Percent,
  Calendar,
  Sparkles,
  Printer,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Scale,
  Clock,
  ArrowRight,
  PieChart,
  Coins,
  Wallet,
  BarChart3,
  LineChart,
  Layers,
  RefreshCw,
} from 'lucide-react';

interface RentalPropertyCalculatorProps {
  currentJurisdiction: JurisdictionCode;
  currentCurrency: CurrencyCode;
  onOpenAiAuditModal: () => void;
}

export const RentalPropertyCalculator: React.FC<RentalPropertyCalculatorProps> = ({
  currentJurisdiction,
  currentCurrency,
  onOpenAiAuditModal,
}) => {
  const jur = JURISDICTIONS[currentJurisdiction] || JURISDICTIONS.SG;
  const curr = CURRENCIES[currentCurrency] || CURRENCIES.USD;

  // String-backed input state allows users to backspace to completely empty/blank fields and type cleanly
  const [propertyCostStr, setPropertyCostStr] = useState<string>(() =>
    String(jur.currency === curr.code ? curr.defaultPrice : 1500000)
  );
  const [downPaymentPercentStr, setDownPaymentPercentStr] = useState<string>('25');
  const [loanRateStr, setLoanRateStr] = useState<string>(() =>
    String(currentJurisdiction === 'SG' ? 3.4 : currentJurisdiction === 'MY' ? 4.3 : currentJurisdiction === 'IN' ? 8.5 : currentJurisdiction === 'AE' ? 4.9 : 6.5)
  );
  const [loanTenureStr, setLoanTenureStr] = useState<string>('25');
  const [holdingPeriodStr, setHoldingPeriodStr] = useState<string>('10');
  const [appreciationRateStr, setAppreciationRateStr] = useState<string>(() =>
    String(currentJurisdiction === 'IN' ? 8.0 : currentJurisdiction === 'AE' ? 6.5 : 4.5)
  );
  const [monthlyRentStr, setMonthlyRentStr] = useState<string>(() =>
    String(jur.currency === curr.code ? curr.defaultRent : 4500)
  );
  const [rentHikeStr, setRentHikeStr] = useState<string>('3.5');
  const [monthlyMaintenanceStr, setMonthlyMaintenanceStr] = useState<string>(() =>
    String(Math.round((jur.currency === curr.code ? curr.defaultRent : 4500) * 0.12))
  );
  const [maintenanceHikeStr, setMaintenanceHikeStr] = useState<string>('3.0');
  const [vacancyWeeksPerYear, setVacancyWeeksPerYear] = useState<number>(2);
  const [buyerStatus, setBuyerStatus] = useState<BuyerStatus>('citizen');
  const [propertyCount, setPropertyCount] = useState<number>(1);

  // Asset Class Mode Switcher (Real Estate, Equities/SIP, Multi-Asset Blend, SWP/Preservation)
  type AssetClassMode = 'real-estate' | 'equity-sip' | 'multi-asset' | 'capital-preservation';
  const [assetMode, setAssetMode] = useState<AssetClassMode>('real-estate');

  // Equity SIP State
  const [monthlySipStr, setMonthlySipStr] = useState<string>(() =>
    String(jur.currency === curr.code ? Math.round(curr.defaultRent * 0.6) : 2500)
  );
  const [equityCagrStr, setEquityCagrStr] = useState<string>('12.0');
  const [sipYearsStr, setSipYearsStr] = useState<string>('15');
  const [stepUpPercentStr, setStepUpPercentStr] = useState<string>('10.0');

  // Multi-Asset Portfolio Allocation State
  const [portfolioCapitalStr, setPortfolioCapitalStr] = useState<string>(() =>
    String(jur.currency === curr.code ? Math.round(curr.defaultPrice * 0.35) : 500000)
  );
  const [portfolioYearsStr, setPortfolioYearsStr] = useState<string>('15');
  const [equityWeight, setEquityWeight] = useState<number>(50);
  const [realEstateWeight, setRealEstateWeight] = useState<number>(30);
  const [debtWeight, setDebtWeight] = useState<number>(10);
  const [goldWeight, setGoldWeight] = useState<number>(10);

  // Capital Preservation & SWP State
  const [corpusStr, setCorpusStr] = useState<string>(() =>
    String(jur.currency === curr.code ? curr.defaultPrice : 2000000)
  );
  const [safeWithdrawalRateStr, setSafeWithdrawalRateStr] = useState<string>('4.0');
  const [fixedYieldStr, setFixedYieldStr] = useState<string>('5.5');
  const [inflationRateStr, setInflationRateStr] = useState<string>('3.0');

  // Live Market Rates State pulled from internet
  const [liveRates, setLiveRates] = useState<LiveMarketRates | null>(null);
  const [isSyncingRates, setIsSyncingRates] = useState<boolean>(false);
  const [rateSyncTime, setRateSyncTime] = useState<string>('');
  const [isCustomOverridden, setIsCustomOverridden] = useState<boolean>(false);

  // Sync illustrative defaults and pull live returns/rates from internet
  useEffect(() => {
    let isMounted = true;
    const defaultP = jur.currency === curr.code ? curr.defaultPrice : 1500000;
    const defaultR = jur.currency === curr.code ? curr.defaultRent : 4500;
    setPropertyCostStr(String(defaultP));
    setMonthlyRentStr(String(defaultR));
    setMonthlyMaintenanceStr(String(Math.round(defaultR * 0.12)));

    setIsSyncingRates(true);
    fetchLiveMarketRates(currentJurisdiction)
      .then((rates) => {
        if (!isMounted) return;
        setLiveRates(rates);
        setRateSyncTime(rates.timestamp);
        setIsSyncingRates(false);

        // Auto-populate with live statutory and market returns from internet
        setLoanRateStr(String(rates.benchmarkMortgageRate));
        setAppreciationRateStr(String(currentJurisdiction === 'IN' ? 8.0 : currentJurisdiction === 'AE' ? 6.5 : 4.5));
        setEquityCagrStr(String(rates.equityBenchmarkCagr));
        setFixedYieldStr(String(rates.sovereign10YYield));
        setInflationRateStr(String(rates.headlineInflation));
        setIsCustomOverridden(false);
      })
      .catch(() => {
        if (isMounted) setIsSyncingRates(false);
      });

    return () => {
      isMounted = false;
    };
  }, [currentJurisdiction, currentCurrency]);

  const handleSyncLiveRates = async () => {
    setIsSyncingRates(true);
    try {
      const rates = await fetchLiveMarketRates(currentJurisdiction);
      setLiveRates(rates);
      setRateSyncTime(rates.timestamp);
      setLoanRateStr(String(rates.benchmarkMortgageRate));
      setEquityCagrStr(String(rates.equityBenchmarkCagr));
      setFixedYieldStr(String(rates.sovereign10YYield));
      setInflationRateStr(String(rates.headlineInflation));
      setIsCustomOverridden(false);
    } finally {
      setIsSyncingRates(false);
    }
  };

  // Safe parsing helper that falls back gracefully when user temporarily clears an input
  const parseSafe = (val: string, fallback: number = 0): number => {
    if (!val || val.trim() === '') return fallback;
    const cleaned = val.replace(/,/g, '');
    const num = parseFloat(cleaned);
    return isNaN(num) ? fallback : num;
  };

  const propertyCost = parseSafe(propertyCostStr, 0);
  const downPaymentPercent = Math.min(100, Math.max(0, parseSafe(downPaymentPercentStr, 25)));
  const loanRate = parseSafe(loanRateStr, 0);
  const loanTenure = Math.max(1, parseSafe(loanTenureStr, 25));
  const holdingPeriod = Math.max(1, parseSafe(holdingPeriodStr, 10));
  const appreciationRate = parseSafe(appreciationRateStr, 0);
  const monthlyRent = parseSafe(monthlyRentStr, 0);
  const rentHike = parseSafe(rentHikeStr, 0);
  const monthlyMaintenance = parseSafe(monthlyMaintenanceStr, 0);
  const maintenanceHike = parseSafe(maintenanceHikeStr, 0);

  // Table expand state
  const [showFullTable, setShowFullTable] = useState<boolean>(false);

  // Assemble inputs
  const inputs: PropertyInputs = useMemo(() => ({
    propertyCost,
    downPaymentPercent,
    loanRate,
    loanTenure,
    holdingPeriod,
    appreciationRate,
    monthlyRent,
    rentHike,
    monthlyMaintenance,
    maintenanceHike,
    vacancyWeeksPerYear,
    buyerStatus,
    propertyCount,
  }), [
    propertyCost,
    downPaymentPercent,
    loanRate,
    loanTenure,
    holdingPeriod,
    appreciationRate,
    monthlyRent,
    rentHike,
    monthlyMaintenance,
    maintenanceHike,
    vacancyWeeksPerYear,
    buyerStatus,
    propertyCount,
  ]);

  // Run simulation
  const results = useMemo(() => {
    return simulatePropertyInvestment(inputs, currentJurisdiction);
  }, [inputs, currentJurisdiction]);

  // Generate deterministic audit report
  const auditReport = useMemo(() => {
    return generateDeterministicAiAudit(inputs, results, currentJurisdiction);
  }, [inputs, results, currentJurisdiction]);

  // SVG Chart points calculation
  const chartData = useMemo(() => {
    const list = results.yearlyProjections;
    if (!list || list.length === 0) return null;
    const maxVal = Math.max(...list.map((d) => d.propertyValue), inputs.propertyCost) * 1.05;
    const minVal = 0;
    const count = list.length;
    const width = 800;
    const height = 240;
    const padX = 20;
    const padY = 20;

    const getX = (index: number) => padX + (index / count) * (width - 2 * padX);
    const getY = (val: number) => height - padY - ((val - minVal) / (maxVal - minVal)) * (height - 2 * padY);

    const propLine = [`${getX(0)},${getY(inputs.propertyCost)}`];
    const loanLine = [`${getX(0)},${getY(results.loanAmount)}`];
    const equityLine = [`${getX(0)},${getY(inputs.propertyCost - results.loanAmount)}`];

    list.forEach((d, i) => {
      propLine.push(`${getX(i + 1)},${getY(d.propertyValue)}`);
      loanLine.push(`${getX(i + 1)},${getY(d.loanBalance)}`);
      equityLine.push(`${getX(i + 1)},${getY(d.equity)}`);
    });

    return {
      width,
      height,
      propPoints: propLine.join(' '),
      loanPoints: loanLine.join(' '),
      equityPoints: equityLine.join(' '),
      maxVal,
    };
  }, [results, inputs.propertyCost]);

  // Equity Step-Up SIP Calculations
  const equitySipResults = useMemo(() => {
    let monthly = parseSafe(monthlySipStr, 2500);
    const annualCagr = parseSafe(equityCagrStr, 12);
    const monthlyRate = annualCagr / 100 / 12;
    const years = Math.max(1, parseSafe(sipYearsStr, 15));
    const annualStepUp = parseSafe(stepUpPercentStr, 10) / 100;

    let totalInvested = 0;
    let corpus = 0;
    const yearlyPoints: { year: number; corpus: number; invested: number }[] = [];

    for (let y = 1; y <= years; y++) {
      for (let m = 1; m <= 12; m++) {
        corpus = (corpus + monthly) * (1 + monthlyRate);
        totalInvested += monthly;
      }
      yearlyPoints.push({
        year: y,
        corpus: Math.round(corpus),
        invested: Math.round(totalInvested),
      });
      monthly *= (1 + annualStepUp);
    }

    const gain = Math.max(0, corpus - totalInvested);
    const multiple = totalInvested > 0 ? corpus / totalInvested : 1;

    return {
      totalInvested,
      corpus: Math.round(corpus),
      gain: Math.round(gain),
      multiple,
      finalMonthlyContribution: Math.round(monthly / (1 + annualStepUp)),
      yearlyPoints,
    };
  }, [monthlySipStr, equityCagrStr, sipYearsStr, stepUpPercentStr]);

  // Multi-Asset Portfolio Allocation Calculations
  const portfolioResults = useMemo(() => {
    const capital = parseSafe(portfolioCapitalStr, 500000);
    const years = Math.max(1, parseSafe(portfolioYearsStr, 15));

    // Blended CAGR based on allocation weights:
    // Equities: 12%, Real Estate: 8%, Fixed Income: 5.5%, Gold/Commodities: 7%
    const blendedCagr =
      (equityWeight * 12 + realEstateWeight * 8 + debtWeight * 5.5 + goldWeight * 7) / 100;
    const futureVal = capital * Math.pow(1 + blendedCagr / 100, years);
    const gain = Math.max(0, futureVal - capital);
    const multiple = capital > 0 ? futureVal / capital : 1;

    const yearlyPoints: { year: number; value: number }[] = [];
    for (let y = 0; y <= years; y++) {
      yearlyPoints.push({
        year: y,
        value: Math.round(capital * Math.pow(1 + blendedCagr / 100, y)),
      });
    }

    return {
      capital,
      years,
      blendedCagr,
      futureVal: Math.round(futureVal),
      gain: Math.round(gain),
      multiple,
      yearlyPoints,
      equityVal: Math.round((capital * (equityWeight / 100)) * Math.pow(1.12, years)),
      realEstateVal: Math.round((capital * (realEstateWeight / 100)) * Math.pow(1.08, years)),
      debtVal: Math.round((capital * (debtWeight / 100)) * Math.pow(1.055, years)),
      goldVal: Math.round((capital * (goldWeight / 100)) * Math.pow(1.07, years)),
    };
  }, [portfolioCapitalStr, portfolioYearsStr, equityWeight, realEstateWeight, debtWeight, goldWeight]);

  // Capital Preservation & SWP Calculations
  const preservationResults = useMemo(() => {
    const corpus = parseSafe(corpusStr, 2000000);
    const swr = parseSafe(safeWithdrawalRateStr, 4.0);
    const yieldRate = parseSafe(fixedYieldStr, 5.5);
    const inflation = parseSafe(inflationRateStr, 3.0);

    const annualWithdrawal = corpus * (swr / 100);
    const monthlyWithdrawal = annualWithdrawal / 12;
    const realYield = yieldRate - inflation;
    const netCashflowSpread = (corpus * (yieldRate / 100)) - annualWithdrawal;
    const isPerpetual = yieldRate >= swr;
    const runwayYears = isPerpetual ? 'Perpetual Runway' : `${Math.round(corpus / Math.abs(netCashflowSpread))} Years`;

    return {
      corpus,
      annualWithdrawal: Math.round(annualWithdrawal),
      monthlyWithdrawal: Math.round(monthlyWithdrawal),
      realYield,
      netCashflowSpread: Math.round(netCashflowSpread),
      isPerpetual,
      runwayYears,
    };
  }, [corpusStr, safeWithdrawalRateStr, fixedYieldStr, inflationRateStr]);

  return (
    <section id="calculator-section" className="relative bg-[#191514] text-[#FAF7F2] py-20 sm:py-28 border-b border-[#302826] overflow-hidden">
      {/* Ambient Liquid Caustic Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#8C5E3C]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#FAF7F2]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10">
        
        {/* Section Header (Lenval Editorial Styling) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#302826]">
          <div>
            <div className="text-xs font-sans uppercase tracking-[0.25em] text-[#8C857E] mb-2 flex items-center gap-2">
              <span>03 / The Master Suite ·</span>
              <CountryFlag code={currentJurisdiction} size="sm" />
              <span>{jur.name} Multi-Asset Hub</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF7F2]">
              The Multi-Asset Wealth Simulator
            </h2>
            <p className="mt-3 text-sm text-[#A39E98] max-w-2xl font-sans font-light">
              Underwrite acquisitions across Prime Real Estate, Disciplined Equity SIPs, Multi-Asset Portfolios, and Capital Preservation Runways with verified localized tax codes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-full border border-[#302826] liquid-glass-pill hover:border-[#8C5E3C] text-xs font-sans uppercase tracking-[0.1em] text-[#FAF7F2] transition-all flex items-center gap-2"
            >
              <Printer className="w-3.5 h-3.5 text-[#B88A58]" />
              <span>Print Memorandum</span>
            </button>

            <button
              onClick={onOpenAiAuditModal}
              className="px-5 py-2 rounded-full bg-[#FAF7F2] text-[#191514] hover:bg-[#FAF7F2]/90 text-xs font-sans uppercase tracking-[0.1em] font-medium transition-all flex items-center gap-2 shadow-lg"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Executive Memorandum</span>
            </button>
          </div>
        </div>

        {/* Understated Sovereign Benchmark Note */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#8C857E] pb-4 border-b border-[#302826]/70">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B88A58]" />
            <span className="text-[#FAF7F2]">
              {jur.name} Sovereign Benchmark Rates Active
            </span>
            <span className="text-[#8C857E] hidden md:inline">
              · Mortgage {liveRates?.benchmarkMortgageRate.toFixed(2)}% · 10Y Sovereign {liveRates?.sovereign10YYield.toFixed(2)}% · CPI {liveRates?.headlineInflation.toFixed(2)}%
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-[#8C857E] hidden sm:inline">
              Adjust any slider freely
            </span>
            <button
              onClick={handleSyncLiveRates}
              disabled={isSyncingRates}
              className="text-[11px] text-[#FAF7F2] hover:text-[#B88A58] underline underline-offset-4 flex items-center gap-1.5 transition-colors disabled:opacity-50"
              title="Pull latest live returns and rates from internet"
            >
              <RefreshCw className={`w-3 h-3 text-[#B88A58] ${isSyncingRates ? 'animate-spin' : ''}`} />
              <span>{isSyncingRates ? 'Syncing...' : 'Sync Market Rates'}</span>
            </button>
          </div>
        </div>

        {/* Liquid Glass Asset Class Mode Switcher */}
        <div className="mt-8 flex items-center gap-2.5 p-1.5 rounded-full liquid-glass-elevated max-w-fit overflow-x-auto">
          {[
            { id: 'real-estate', label: 'Prime Real Estate & Yield', icon: Building2 },
            { id: 'equity-sip', label: 'Equities & Step-Up SIP', icon: TrendingUp },
            { id: 'multi-asset', label: 'Multi-Asset Portfolio', icon: PieChart },
            { id: 'capital-preservation', label: 'Preservation & SWP', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = assetMode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setAssetMode(tab.id as AssetClassMode)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-sans uppercase tracking-[0.1em] transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#FAF7F2] text-[#191514] font-semibold shadow-lg'
                    : 'text-[#A39E98] hover:text-[#FAF7F2] hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Grid 01: Real Estate Investment & Statutory IRR */}
        {assetMode === 'real-estate' && (
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT COLUMN: Input Form Ledger */}
            <div className="lg:col-span-5 liquid-glass-elevated rounded-3xl p-8 sm:p-9 space-y-8 relative overflow-hidden">
            
            {/* Buyer Residency Status */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#8C857E]">
                  Buyer Legal Status
                </span>
                <span className="text-[11px] font-mono text-[#8C857E]">Dictates Stamp Duty &amp; ABSD</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {jur.buyerStatusOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setBuyerStatus(opt.id)}
                    className={`p-3 rounded-2xl text-left border text-xs transition-all ${
                      buyerStatus === opt.id
                        ? 'border-[#8C5E3C] bg-[#2E2421] text-[#FAF7F2]'
                        : 'border-[#302826] bg-[#191514] text-[#A39E98] hover:border-[#403430]'
                    }`}
                  >
                    <div className="font-medium text-[#FAF7F2]">{opt.label}</div>
                    <div className="text-[10px] text-[#8C857E] line-clamp-1 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>

              {currentJurisdiction === 'SG' && buyerStatus !== 'foreigner' && (
                <div className="mt-3 flex items-center justify-between p-3 rounded-2xl border border-[#302826] bg-[#191514]">
                  <span className="text-xs text-[#A39E98]">Property Count (for ABSD):</span>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((num) => (
                      <button
                        key={num}
                        onClick={() => setPropertyCount(num)}
                        className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                          propertyCount === num
                            ? 'bg-[#FAF7F2] text-[#191514] font-semibold'
                            : 'bg-[#211A19] text-[#A39E98] hover:text-white'
                        }`}
                      >
                        {num === 3 ? '3rd+' : `${num}${num === 1 ? 'st' : 'nd'}`}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Property Price & Financing */}
            <div className="pt-6 border-t border-[#302826] space-y-5">
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#8C857E] block">
                Acquisition &amp; Leverage
              </span>

              {/* Purchase Price */}
              <div>
                <div className="flex justify-between text-xs text-[#A39E98] mb-1.5">
                  <label>Purchase Price</label>
                  <span className="font-mono text-[#FAF7F2]">{formatCurrency(propertyCost, currentCurrency)}</span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs text-[#8C857E]">
                    {curr.symbol}
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={propertyCostStr}
                    placeholder={`e.g. ${curr.defaultPrice.toLocaleString()}`}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === '' || /^[\d,]*\.?\d*$/.test(v)) {
                        setPropertyCostStr(v);
                      }
                    }}
                    className="w-full bg-[#191514] border border-[#302826] rounded-2xl pl-10 pr-10 py-3 text-base sm:text-sm text-[#FAF7F2] font-mono focus:outline-none focus:border-[#8C5E3C] transition-colors"
                  />
                  {propertyCostStr && (
                    <button
                      type="button"
                      onClick={() => setPropertyCostStr('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-[#8C857E] hover:text-[#FAF7F2] p-1 focus:outline-none"
                      title="Clear price to type new value"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              {/* Down Payment Slider & Number */}
              <div>
                <div className="flex justify-between text-xs text-[#A39E98] mb-1.5">
                  <label>Down Payment (%)</label>
                  <span className="font-mono text-[#FAF7F2]">
                    {downPaymentPercent}% ({formatCurrency(results.downPaymentAmount, currentCurrency, true)})
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={5}
                    max={100}
                    step={1}
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercentStr(e.target.value)}
                    className="flex-grow accent-[#8C5E3C] cursor-pointer"
                  />
                  <div className="relative w-20 flex-shrink-0">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={downPaymentPercentStr}
                      placeholder="25"
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === '' || /^\d*$/.test(v)) {
                          setDownPaymentPercentStr(v);
                        }
                      }}
                      className="w-full bg-[#191514] border border-[#302826] rounded-xl px-2.5 py-1.5 text-center text-xs text-[#FAF7F2] font-mono focus:outline-none focus:border-[#8C5E3C]"
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-[#8C857E]">%</span>
                  </div>
                </div>
              </div>

              {/* Mortgage Rate & Tenure */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs text-[#A39E98]">Mortgage Rate (%)</label>
                    <span className="text-[10px] font-mono text-[#B88A58]">
                      {isCustomOverridden ? 'Adjusted' : `Live: ${liveRates?.benchmarkMortgageRate.toFixed(2) || '3.10'}%`}
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={loanRateStr}
                      placeholder="e.g. 3.4"
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === '' || /^[\d,]*\.?\d*$/.test(v)) {
                          setLoanRateStr(v);
                          setIsCustomOverridden(true);
                        }
                      }}
                      className="w-full bg-[#191514] border border-[#302826] rounded-2xl px-3 py-2.5 text-base sm:text-xs text-[#FAF7F2] font-mono focus:outline-none focus:border-[#8C5E3C]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C857E]">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#A39E98] mb-1">Loan Tenure</label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={loanTenureStr}
                      placeholder="e.g. 25"
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === '' || /^\d*$/.test(v)) {
                          setLoanTenureStr(v);
                        }
                      }}
                      className="w-full bg-[#191514] border border-[#302826] rounded-2xl px-3 py-2.5 text-base sm:text-xs text-[#FAF7F2] font-mono focus:outline-none focus:border-[#8C5E3C]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C857E]">yrs</span>
                  </div>
                </div>
              </div>

              {/* Holding Period & Expected Appreciation */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#A39E98] mb-1">Holding Period</label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={holdingPeriodStr}
                      placeholder="e.g. 10"
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === '' || /^\d*$/.test(v)) {
                          setHoldingPeriodStr(v);
                        }
                      }}
                      className="w-full bg-[#191514] border border-[#302826] rounded-2xl px-3 py-2.5 text-base sm:text-xs text-[#FAF7F2] font-mono focus:outline-none focus:border-[#8C5E3C]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C857E]">yrs</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#A39E98] mb-1">Appreciation Rate</label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={appreciationRateStr}
                      placeholder="e.g. 4.5"
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === '' || /^-?[\d,]*\.?\d*$/.test(v)) {
                          setAppreciationRateStr(v);
                        }
                      }}
                      className="w-full bg-[#191514] border border-[#302826] rounded-2xl px-3 py-2.5 text-base sm:text-xs text-[#FAF7F2] font-mono focus:outline-none focus:border-[#8C5E3C]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C857E]">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Rental Income & Operating Costs */}
            <div className="pt-6 border-t border-[#302826] space-y-5">
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#8C857E] block">
                Rental Income &amp; Operating Expenses
              </span>

              {/* Monthly Rental Income */}
              <div>
                <div className="flex justify-between text-xs text-[#A39E98] mb-1.5">
                  <label>Current Monthly Rent</label>
                  <span className="font-mono text-[#FAF7F2]">{formatCurrency(monthlyRent, currentCurrency)}/mo</span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs text-[#8C857E]">
                    {curr.symbol}
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={monthlyRentStr}
                    placeholder={`e.g. ${curr.defaultRent.toLocaleString()}`}
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === '' || /^[\d,]*\.?\d*$/.test(v)) {
                        setMonthlyRentStr(v);
                      }
                    }}
                    className="w-full bg-[#191514] border border-[#302826] rounded-2xl pl-10 pr-10 py-3 text-base sm:text-sm text-[#FAF7F2] font-mono focus:outline-none focus:border-[#8C5E3C] transition-colors"
                  />
                  {monthlyRentStr && (
                    <button
                      type="button"
                      onClick={() => setMonthlyRentStr('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-[#8C857E] hover:text-[#FAF7F2] p-1 focus:outline-none"
                      title="Clear rent to type new value"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              {/* Rent Escalation & Maintenance */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#A39E98] mb-1">Rent Escalation (%)</label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={rentHikeStr}
                      placeholder="e.g. 3.5"
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === '' || /^[\d,]*\.?\d*$/.test(v)) {
                          setRentHikeStr(v);
                        }
                      }}
                      className="w-full bg-[#191514] border border-[#302826] rounded-2xl px-3 py-2.5 text-base sm:text-xs text-[#FAF7F2] font-mono focus:outline-none focus:border-[#8C5E3C]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C857E]">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#A39E98] mb-1">Monthly Maintenance</label>
                  <div className="relative">
                    <input
                      type="text"
                      inputMode="numeric"
                      value={monthlyMaintenanceStr}
                      placeholder="e.g. 500"
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === '' || /^[\d,]*\.?\d*$/.test(v)) {
                          setMonthlyMaintenanceStr(v);
                        }
                      }}
                      className="w-full bg-[#191514] border border-[#302826] rounded-2xl pl-3 pr-8 py-2.5 text-base sm:text-xs text-[#FAF7F2] font-mono focus:outline-none focus:border-[#8C5E3C]"
                    />
                    {monthlyMaintenanceStr && (
                      <button
                        type="button"
                        onClick={() => setMonthlyMaintenanceStr('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8C857E] hover:text-[#FAF7F2] p-0.5 focus:outline-none"
                        title="Clear"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Vacancy Allowance */}
              <div>
                <div className="flex justify-between text-xs text-[#A39E98] mb-1.5">
                  <label>Vacancy Allowance</label>
                  <span className="font-mono text-[#FAF7F2]">{vacancyWeeksPerYear} weeks/year</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={12}
                  step={1}
                  value={vacancyWeeksPerYear}
                  onChange={(e) => setVacancyWeeksPerYear(Number(e.target.value))}
                  className="w-full accent-[#8C5E3C] cursor-pointer"
                />
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Real-Time Results & Ledger */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Hero IRR Yield Card (Lenval Signature Velvet Box) */}
            <div className="bg-[#211A19] border border-[#302826] rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[#302826] pb-6">
                <div>
                  <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#8C857E]">
                    Annualized Internal Rate of Return (IRR)
                  </span>
                  <div className="mt-2 flex items-baseline gap-4">
                    <span className="font-serif text-5xl sm:text-7xl font-normal text-[#FAF7F2] tracking-tight">
                      {formatPercent(results.irr)}
                    </span>
                    <span className="text-xs font-mono text-[#8C857E]">
                      across {holdingPeriod} years
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#FAF7F2]/20 bg-[#191514] text-[#FAF7F2] text-xs font-mono">
                  <span>Deal Score: {auditReport.score}/100</span>
                </div>
              </div>

              {/* 4 Stats Grid */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <div className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#8C857E]">Monthly Net</div>
                  <div className={`mt-1 font-mono text-base font-semibold ${
                    results.initialMonthlyCashFlow >= 0 ? 'text-[#FAF7F2]' : 'text-[#B88A58]'
                  }`}>
                    {formatCurrency(results.initialMonthlyCashFlow, currentCurrency)}
                  </div>
                  <div className="text-[10px] text-[#736B65]">After EMI &amp; Maint</div>
                </div>

                <div>
                  <div className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#8C857E]">Gross Yield</div>
                  <div className="mt-1 font-mono text-base font-semibold text-[#FAF7F2]">
                    {results.grossRentalYield.toFixed(2)}%
                  </div>
                  <div className="text-[10px] text-[#736B65]">Cap Rate: {results.capRate.toFixed(2)}%</div>
                </div>

                <div>
                  <div className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#8C857E]">Total Equity</div>
                  <div className="mt-1 font-mono text-base font-semibold text-[#FAF7F2]">
                    {formatCurrency(results.totalCashInvested, currentCurrency, true)}
                  </div>
                  <div className="text-[10px] text-[#736B65]">Down + Stamp Duties</div>
                </div>

                <div>
                  <div className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#8C857E]">Multiple</div>
                  <div className="mt-1 font-mono text-base font-semibold text-[#B88A58]">
                    {results.equityMultiple.toFixed(2)}x
                  </div>
                  <div className="text-[10px] text-[#736B65]">Exit: {formatCurrency(results.netEquityAtExit, currentCurrency, true)}</div>
                </div>
              </div>
            </div>

            {/* Acquisition Friction & Localized Tax Breakdown */}
            <div className="bg-[#211A19] border border-[#302826] rounded-3xl p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#302826]">
                <div className="flex items-center gap-2.5">
                  <CountryFlag code={currentJurisdiction} size="sm" />
                  <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#FAF7F2]">
                    {jur.name} Statutory Acquisition &amp; Tax Ledger
                  </span>
                </div>
                <span className="text-xs font-mono text-[#FAF7F2]">
                  Total Fees: {formatCurrency(results.acquisitionCosts, currentCurrency)}
                </span>
              </div>

              <div className="space-y-2.5">
                {results.acquisitionBreakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-xs py-2 border-b border-[#2A2220] last:border-0 font-sans">
                    <span className="text-[#A39E98]">{item.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] text-[#8C857E]">({item.rateStr})</span>
                      <span className="font-mono text-[#FAF7F2] font-medium">{formatCurrency(item.amount, currentCurrency)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Statutory Benefits Callout */}
              <div className="pt-3 border-t border-[#302826] text-xs text-[#A39E98] space-y-1 font-sans">
                <span className="font-medium text-[#FAF7F2] flex items-center gap-2">
                  <CountryFlag code={currentJurisdiction} size="xs" />
                  <span>Statutory Advantages ({jur.name}):</span>
                </span>
                <ul className="list-disc list-inside text-[11px] space-y-1 text-[#8C857E]">
                  {jur.keyBenefits.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* SVG Amortization Chart */}
            {chartData && (
              <div className="bg-[#211A19] border border-[#302826] rounded-3xl p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#302826]">
                  <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#FAF7F2]">
                    Amortization &amp; Equity Trajectory ({holdingPeriod} Years)
                  </span>

                  <div className="flex items-center gap-4 text-[11px] font-mono">
                    <span className="flex items-center gap-1.5 text-[#FAF7F2]">
                      <span className="w-2 h-2 rounded-full bg-[#FAF7F2]" />
                      Value
                    </span>
                    <span className="flex items-center gap-1.5 text-[#B88A58]">
                      <span className="w-2 h-2 rounded-full bg-[#B88A58]" />
                      Equity
                    </span>
                    <span className="flex items-center gap-1.5 text-[#8C857E]">
                      <span className="w-2 h-2 rounded-full bg-[#8C857E]" />
                      Loan
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <svg
                    viewBox={`0 0 ${chartData.width} ${chartData.height}`}
                    className="w-full h-48 overflow-visible"
                  >
                    {[0, 0.33, 0.66, 1].map((pct, i) => {
                      const y = chartData.height - 20 - pct * (chartData.height - 40);
                      return (
                        <line
                          key={i}
                          x1={20}
                          y1={y}
                          x2={chartData.width - 20}
                          y2={y}
                          stroke="#302826"
                          strokeDasharray="4 4"
                        />
                      );
                    })}

                    <polyline
                      fill="none"
                      stroke="#FAF7F2"
                      strokeWidth="2.5"
                      points={chartData.propPoints}
                    />
                    <polyline
                      fill="none"
                      stroke="#B88A58"
                      strokeWidth="2.5"
                      points={chartData.equityPoints}
                    />
                    <polyline
                      fill="none"
                      stroke="#7D7571"
                      strokeWidth="1.5"
                      strokeDasharray="5 3"
                      points={chartData.loanPoints}
                    />
                  </svg>

                  <div className="flex justify-between text-[10px] font-mono text-[#8C857E] mt-2">
                    <span>Entry</span>
                    <span>Midpoint ({Math.round(holdingPeriod / 2)} yrs)</span>
                    <span>Exit ({formatCurrency(results.exitPropertyValue, currentCurrency, true)})</span>
                  </div>
                </div>
              </div>
            )}

            {/* Year-by-Year Waterfall Table */}
            <div className="bg-[#211A19] border border-[#302826] rounded-3xl p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#302826]">
                <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#FAF7F2]">
                  Year-by-Year Financial Ledger
                </span>

                <button
                  onClick={() => setShowFullTable(!showFullTable)}
                  className="flex items-center gap-1 text-xs text-[#FAF7F2] hover:text-[#B88A58] font-mono transition-colors"
                >
                  <span>{showFullTable ? 'Collapse' : `View All ${holdingPeriod} Years`}</span>
                  {showFullTable ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono text-left">
                  <thead>
                    <tr className="text-[#8C857E] border-b border-[#302826]">
                      <th className="py-2 pr-3">Year</th>
                      <th className="py-2 px-3 text-right">Property Value</th>
                      <th className="py-2 px-3 text-right">Loan Balance</th>
                      <th className="py-2 px-3 text-right">Net Equity</th>
                      <th className="py-2 px-3 text-right">Annual Rent</th>
                      <th className="py-2 pl-3 text-right">Annual Cash Flow</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2A2220]">
                    {(showFullTable
                      ? results.yearlyProjections
                      : results.yearlyProjections.slice(0, 5)
                    ).map((row) => (
                      <tr key={row.year} className="hover:bg-[#251D1B] transition-colors">
                        <td className="py-2.5 pr-3 text-[#A39E98]">Yr {row.year}</td>
                        <td className="py-2.5 px-3 text-right text-[#FAF7F2]">
                          {formatCurrency(row.propertyValue, currentCurrency, true)}
                        </td>
                        <td className="py-2.5 px-3 text-right text-[#8C857E]">
                          {formatCurrency(row.loanBalance, currentCurrency, true)}
                        </td>
                        <td className="py-2.5 px-3 text-right text-[#B88A58]">
                          {formatCurrency(row.equity, currentCurrency, true)}
                        </td>
                        <td className="py-2.5 px-3 text-right text-[#FAF7F2]">
                          {formatCurrency(row.effectiveRent, currentCurrency, true)}
                        </td>
                        <td className={`py-2.5 pl-3 text-right font-semibold ${
                          row.netCashFlow >= 0 ? 'text-[#FAF7F2]' : 'text-[#B88A58]'
                        }`}>
                          {formatCurrency(row.netCashFlow, currentCurrency, true)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
        )}

        {/* Main Grid 02: Equities & Disciplined Step-Up SIP */}
        {assetMode === 'equity-sip' && (
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT: Inputs */}
            <div className="lg:col-span-5 liquid-glass-elevated rounded-3xl p-8 sm:p-9 space-y-7 relative overflow-hidden">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#8C857E]">
                  Systematic Equity Compounding
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#FAF7F2] mt-1">
                  Disciplined Step-Up Accumulation
                </h3>
              </div>

              {/* Monthly Contribution */}
              <div>
                <div className="flex justify-between text-xs text-[#A39E98] mb-1.5">
                  <label>Monthly Contribution</label>
                  <span className="font-mono text-[#FAF7F2]">{formatCurrency(parseSafe(monthlySipStr, 2500), currentCurrency)}</span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs text-[#8C857E]">
                    {curr.symbol}
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={monthlySipStr}
                    placeholder="e.g. 2,500"
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === '' || /^[\d,]*\.?\d*$/.test(v)) setMonthlySipStr(v);
                    }}
                    className="w-full liquid-glass-input rounded-2xl pl-10 pr-10 py-3 text-base sm:text-sm text-[#FAF7F2] font-mono focus:outline-none"
                  />
                  {monthlySipStr && (
                    <button
                      type="button"
                      onClick={() => setMonthlySipStr('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-[#8C857E] hover:text-[#FAF7F2] p-1 focus:outline-none"
                      title="Clear"
                    >
                      ×
                    </button>
                  )}
                </div>
                {/* Presets */}
                <div className="flex gap-2 mt-2">
                  {[1000, 2500, 5000, 10000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setMonthlySipStr(String(amt))}
                      className="liquid-glass-pill px-2.5 py-1 rounded-lg text-[10px] font-mono text-[#A39E98] hover:text-white"
                    >
                      +{formatCurrency(amt, currentCurrency, true)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Expected Equity CAGR */}
              <div>
                <div className="flex justify-between text-xs text-[#A39E98] mb-1.5">
                  <label>Expected Equity CAGR (%)</label>
                  <span className="font-mono text-[#FAF7F2] font-semibold">{equityCagrStr}%</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={25}
                  step={0.5}
                  value={parseSafe(equityCagrStr, 12)}
                  onChange={(e) => setEquityCagrStr(e.target.value)}
                  className="w-full accent-[#8C5E3C] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8C857E] font-mono mt-1">
                  <span>Conservative (8%)</span>
                  <span>Index Historic (12%)</span>
                  <span>Alpha Growth (16%+)</span>
                </div>
              </div>

              {/* Annual Step-Up % */}
              <div>
                <div className="flex justify-between text-xs text-[#A39E98] mb-1.5">
                  <label>Annual Contribution Step-Up (%)</label>
                  <span className="font-mono text-[#FAF7F2] font-semibold">{stepUpPercentStr}% / yr</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={25}
                  step={1}
                  value={parseSafe(stepUpPercentStr, 10)}
                  onChange={(e) => setStepUpPercentStr(e.target.value)}
                  className="w-full accent-[#8C5E3C] cursor-pointer"
                />
                <span className="text-[10px] text-[#8C857E] font-sans block mt-1">
                  Increases monthly deployment annually matching income raises.
                </span>
              </div>

              {/* Investment Horizon */}
              <div>
                <div className="flex justify-between text-xs text-[#A39E98] mb-1.5">
                  <label>Investment Horizon</label>
                  <span className="font-mono text-[#B88A58] font-semibold">{sipYearsStr} Years</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={35}
                  step={1}
                  value={parseSafe(sipYearsStr, 15)}
                  onChange={(e) => setSipYearsStr(e.target.value)}
                  className="w-full accent-[#8C5E3C] cursor-pointer"
                />
              </div>

              {/* Local Tax Context */}
              <div className="p-4 rounded-2xl liquid-glass border border-white/5 text-xs text-[#A39E98] space-y-1">
                <span className="text-[#FAF7F2] font-medium flex items-center gap-2">
                  <CountryFlag code={currentJurisdiction} size="xs" />
                  <span>{jur.name} Sovereign Equity Tax Law:</span>
                </span>
                <p className="text-[11px] text-[#8C857E]">
                  {currentJurisdiction === 'SG' || currentJurisdiction === 'AE'
                    ? '0% Exit Capital Gains Tax & 0% Dividend Withholding on qualified equity holdings.'
                    : currentJurisdiction === 'IN'
                    ? '12.5% Long-Term Capital Gains (LTCG) with ₹1.25L annual exemption threshold under Budget 2024.'
                    : currentJurisdiction === 'US'
                    ? '0%, 15%, or 20% Federal Long-Term Capital Gains rate depending on taxable income brackets.'
                    : 'Statutory capital gains rates apply with localized indexation or retirement tax shelters.'}
                </p>
              </div>
            </div>

            {/* RIGHT: Results & Liquid Glass Cards */}
            <div className="lg:col-span-7 space-y-8">
              {/* Hero Liquid Glass Corpus Display */}
              <div className="liquid-glass-elevated rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#8C857E]">
                      Projected Portfolio Corpus Value
                    </span>
                    <div className="mt-2 flex items-baseline gap-4">
                      <span className="font-serif text-5xl sm:text-7xl font-normal text-[#FAF7F2] tracking-tight">
                        {formatCurrency(equitySipResults.corpus, currentCurrency, true)}
                      </span>
                      <span className="text-xs font-mono text-[#C5A880] font-semibold">
                        {equitySipResults.multiple.toFixed(2)}x Growth
                      </span>
                    </div>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full liquid-glass-pill text-[#FAF7F2] text-xs font-mono">
                    Horizon: {sipYearsStr} Years
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div>
                    <div className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#8C857E]">Total Invested</div>
                    <div className="mt-1 font-mono text-base font-semibold text-[#FAF7F2]">
                      {formatCurrency(equitySipResults.totalInvested, currentCurrency, true)}
                    </div>
                    <div className="text-[10px] text-[#736B65]">Principal Saved</div>
                  </div>

                  <div>
                    <div className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#8C857E]">Compounded Gain</div>
                    <div className="mt-1 font-mono text-base font-semibold text-[#FAF7F2]">
                      +{formatCurrency(equitySipResults.gain, currentCurrency, true)}
                    </div>
                    <div className="text-[10px] text-[#736B65]">Market Return</div>
                  </div>

                  <div>
                    <div className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#8C857E]">Final Monthly SIP</div>
                    <div className="mt-1 font-mono text-base font-semibold text-[#B88A58]">
                      {formatCurrency(equitySipResults.finalMonthlyContribution, currentCurrency)}
                    </div>
                    <div className="text-[10px] text-[#736B65]">After {stepUpPercentStr}% Step-Ups</div>
                  </div>

                  <div>
                    <div className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#8C857E]">Wealth Ratio</div>
                    <div className="mt-1 font-mono text-base font-semibold text-[#FAF7F2]">
                      {((equitySipResults.gain / (equitySipResults.totalInvested || 1)) * 100).toFixed(0)}%
                    </div>
                    <div className="text-[10px] text-[#736B65]">Gain to Principal</div>
                  </div>
                </div>
              </div>

              {/* Milestone Waterfall Ledger */}
              <div className="liquid-glass rounded-3xl p-8 space-y-4">
                <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#FAF7F2] block pb-3 border-b border-white/10">
                  Systematic Compounding Milestones
                </span>
                <div className="space-y-3">
                  {equitySipResults.yearlyPoints
                    .filter((p) => p.year === 3 || p.year === 5 || p.year === 10 || p.year === Math.round(Number(sipYearsStr)))
                    .map((pt) => (
                      <div key={pt.year} className="flex justify-between items-center text-xs py-2 border-b border-white/5 font-mono">
                        <span className="text-[#A39E98]">End of Year {pt.year}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-[#8C857E]">Invested: {formatCurrency(pt.invested, currentCurrency, true)}</span>
                          <span className="text-[#FAF7F2] font-semibold">Corpus: {formatCurrency(pt.corpus, currentCurrency, true)}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Grid 03: Multi-Asset Portfolio Allocation */}
        {assetMode === 'multi-asset' && (
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT: Inputs */}
            <div className="lg:col-span-5 liquid-glass-elevated rounded-3xl p-8 sm:p-9 space-y-7 relative overflow-hidden">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#8C857E]">
                  Multi-Asset Architecture
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#FAF7F2] mt-1">
                  Institutional Asset Allocation
                </h3>
              </div>

              {/* Initial Capital */}
              <div>
                <div className="flex justify-between text-xs text-[#A39E98] mb-1.5">
                  <label>Total Investable Capital</label>
                  <span className="font-mono text-[#FAF7F2]">{formatCurrency(portfolioResults.capital, currentCurrency)}</span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs text-[#8C857E]">
                    {curr.symbol}
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={portfolioCapitalStr}
                    placeholder="e.g. 500,000"
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === '' || /^[\d,]*\.?\d*$/.test(v)) setPortfolioCapitalStr(v);
                    }}
                    className="w-full liquid-glass-input rounded-2xl pl-10 pr-10 py-3 text-base sm:text-sm text-[#FAF7F2] font-mono focus:outline-none"
                  />
                  {portfolioCapitalStr && (
                    <button
                      type="button"
                      onClick={() => setPortfolioCapitalStr('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-[#8C857E] hover:text-[#FAF7F2] p-1"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              {/* Horizon */}
              <div>
                <div className="flex justify-between text-xs text-[#A39E98] mb-1.5">
                  <label>Compounding Horizon</label>
                  <span className="font-mono text-[#B88A58] font-semibold">{portfolioYearsStr} Years</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={30}
                  step={1}
                  value={parseSafe(portfolioYearsStr, 15)}
                  onChange={(e) => setPortfolioYearsStr(e.target.value)}
                  className="w-full accent-[#8C5E3C] cursor-pointer"
                />
              </div>

              {/* 4 Asset Sliders */}
              <div className="space-y-4 pt-2 border-t border-white/10">
                <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#8C857E] block">
                  Asset Weights (% of Portfolio)
                </span>

                <div>
                  <div className="flex justify-between text-xs text-[#A39E98] mb-1">
                    <span>📈 Global Equities &amp; ETFs</span>
                    <span className="font-mono text-[#FAF7F2] font-semibold">{equityWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={equityWeight}
                    onChange={(e) => setEquityWeight(Number(e.target.value))}
                    className="w-full accent-[#B88A58] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-[#A39E98] mb-1">
                    <span>🏛️ Prime Real Estate &amp; REITs</span>
                    <span className="font-mono text-[#B88A58] font-semibold">{realEstateWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={realEstateWeight}
                    onChange={(e) => setRealEstateWeight(Number(e.target.value))}
                    className="w-full accent-[#8C5E3C] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-[#A39E98] mb-1">
                    <span>🛡️ Sovereign Debt &amp; Fixed Income</span>
                    <span className="font-mono text-[#C4BCB5] font-semibold">{debtWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={debtWeight}
                    onChange={(e) => setDebtWeight(Number(e.target.value))}
                    className="w-full accent-[#8C5E3C] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-[#A39E98] mb-1">
                    <span>🪙 Physical Gold &amp; Commodities</span>
                    <span className="font-mono text-amber-300 font-semibold">{goldWeight}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={5}
                    value={goldWeight}
                    onChange={(e) => setGoldWeight(Number(e.target.value))}
                    className="w-full accent-amber-300 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT: Multi-Asset Results */}
            <div className="lg:col-span-7 space-y-8">
              {/* Hero Liquid Glass Terminal Value */}
              <div className="liquid-glass-elevated rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#8C857E]">
                      Projected Portfolio Terminal Value
                    </span>
                    <div className="mt-2 flex items-baseline gap-4">
                      <span className="font-serif text-5xl sm:text-7xl font-normal text-[#FAF7F2] tracking-tight">
                        {formatCurrency(portfolioResults.futureVal, currentCurrency, true)}
                      </span>
                      <span className="text-xs font-mono text-[#C5A880] font-semibold">
                        {portfolioResults.multiple.toFixed(2)}x Multiple
                      </span>
                    </div>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full liquid-glass-pill text-[#FAF7F2] text-xs font-mono">
                    Blended CAGR: {portfolioResults.blendedCagr.toFixed(2)}%
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div>
                    <div className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#8C857E]">Deployed Capital</div>
                    <div className="mt-1 font-mono text-base font-semibold text-[#FAF7F2]">
                      {formatCurrency(portfolioResults.capital, currentCurrency, true)}
                    </div>
                    <div className="text-[10px] text-[#736B65]">Base Allocation</div>
                  </div>

                  <div>
                    <div className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#8C857E]">Total Gain</div>
                    <div className="mt-1 font-mono text-base font-semibold text-[#FAF7F2]">
                      +{formatCurrency(portfolioResults.gain, currentCurrency, true)}
                    </div>
                    <div className="text-[10px] text-[#736B65]">Portfolio Appreciation</div>
                  </div>

                  <div>
                    <div className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#8C857E]">Blended Yield</div>
                    <div className="mt-1 font-mono text-base font-semibold text-[#B88A58]">
                      {portfolioResults.blendedCagr.toFixed(2)}%
                    </div>
                    <div className="text-[10px] text-[#736B65]">Weighted Annual Rate</div>
                  </div>

                  <div>
                    <div className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#8C857E]">Horizon</div>
                    <div className="mt-1 font-mono text-base font-semibold text-[#FAF7F2]">
                      {portfolioYearsStr} Years
                    </div>
                    <div className="text-[10px] text-[#736B65]">Compounding Duration</div>
                  </div>
                </div>
              </div>

              {/* Asset Class Terminal Breakdown */}
              <div className="liquid-glass rounded-3xl p-8 space-y-4">
                <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#FAF7F2] block pb-3 border-b border-white/10">
                  Terminal Asset Class Breakdown
                </span>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-[#A39E98] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#B88A58]" />
                      <span>Global Equities ({equityWeight}%)</span>
                    </span>
                    <span className="text-[#FAF7F2] font-semibold">{formatCurrency(portfolioResults.equityVal, currentCurrency, true)}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-[#A39E98] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#B88A58]" />
                      <span>Prime Real Estate ({realEstateWeight}%)</span>
                    </span>
                    <span className="text-[#B88A58] font-semibold">{formatCurrency(portfolioResults.realEstateVal, currentCurrency, true)}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-[#A39E98] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#8C5E3C]" />
                      <span>Sovereign Fixed Income ({debtWeight}%)</span>
                    </span>
                    <span className="text-[#C4BCB5] font-semibold">{formatCurrency(portfolioResults.debtVal, currentCurrency, true)}</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-[#A39E98] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-amber-300" />
                      <span>Gold &amp; Commodities ({goldWeight}%)</span>
                    </span>
                    <span className="text-amber-300 font-semibold">{formatCurrency(portfolioResults.goldVal, currentCurrency, true)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Grid 04: Capital Preservation & SWP Cashflow */}
        {assetMode === 'capital-preservation' && (
          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT: Inputs */}
            <div className="lg:col-span-5 liquid-glass-elevated rounded-3xl p-8 sm:p-9 space-y-7 relative overflow-hidden">
              <div className="border-b border-white/10 pb-4">
                <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#8C857E]">
                  Preservation &amp; Cashflow
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#FAF7F2] mt-1">
                  Systematic Withdrawal Plan (SWP)
                </h3>
              </div>

              {/* Nest Egg Corpus */}
              <div>
                <div className="flex justify-between text-xs text-[#A39E98] mb-1.5">
                  <label>Total Accumulated Nest Egg</label>
                  <span className="font-mono text-[#FAF7F2]">{formatCurrency(preservationResults.corpus, currentCurrency)}</span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs text-[#8C857E]">
                    {curr.symbol}
                  </span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={corpusStr}
                    placeholder="e.g. 2,000,000"
                    onChange={(e) => {
                      const v = e.target.value;
                      if (v === '' || /^[\d,]*\.?\d*$/.test(v)) setCorpusStr(v);
                    }}
                    className="w-full liquid-glass-input rounded-2xl pl-10 pr-10 py-3 text-base sm:text-sm text-[#FAF7F2] font-mono focus:outline-none"
                  />
                  {corpusStr && (
                    <button
                      type="button"
                      onClick={() => setCorpusStr('')}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-[#8C857E] hover:text-[#FAF7F2] p-1"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              {/* Safe Withdrawal Rate */}
              <div>
                <div className="flex justify-between text-xs text-[#A39E98] mb-1.5">
                  <label>Safe Withdrawal Rate (SWR %)</label>
                  <span className="font-mono text-[#B88A58] font-semibold">{safeWithdrawalRateStr}% / yr</span>
                </div>
                <input
                  type="range"
                  min={2.0}
                  max={8.0}
                  step={0.25}
                  value={parseSafe(safeWithdrawalRateStr, 4.0)}
                  onChange={(e) => setSafeWithdrawalRateStr(e.target.value)}
                  className="w-full accent-[#8C5E3C] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#8C857E] font-mono mt-1">
                  <span>Trinity Rule (3.5%-4.0%)</span>
                  <span>Moderate (5.0%)</span>
                  <span>Aggressive (6.5%+)</span>
                </div>
              </div>

              {/* Fixed Income Yield */}
              <div>
                <div className="flex justify-between text-xs text-[#A39E98] mb-1.5">
                  <label>Fixed Income Coupon / Yield (%)</label>
                  <span className="font-mono text-[#FAF7F2] font-semibold">{fixedYieldStr}%</span>
                </div>
                <input
                  type="range"
                  min={2.0}
                  max={10.0}
                  step={0.25}
                  value={parseSafe(fixedYieldStr, 5.5)}
                  onChange={(e) => setFixedYieldStr(e.target.value)}
                  className="w-full accent-[#8C5E3C] cursor-pointer"
                />
              </div>

              {/* Inflation */}
              <div>
                <div className="flex justify-between text-xs text-[#A39E98] mb-1.5">
                  <label>Inflation Drag (%)</label>
                  <span className="font-mono text-rose-300 font-semibold">{inflationRateStr}%</span>
                </div>
                <input
                  type="range"
                  min={1.0}
                  max={8.0}
                  step={0.25}
                  value={parseSafe(inflationRateStr, 3.0)}
                  onChange={(e) => setInflationRateStr(e.target.value)}
                  className="w-full accent-[#8C5E3C] cursor-pointer"
                />
              </div>
            </div>

            {/* RIGHT: SWP Results */}
            <div className="lg:col-span-7 space-y-8">
              {/* Hero Monthly Passive Cashflow Card */}
              <div className="liquid-glass-elevated rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#8C857E]">
                      Monthly Inflation-Hedged Cashflow
                    </span>
                    <div className="mt-2 flex items-baseline gap-4">
                      <span className="font-serif text-5xl sm:text-7xl font-normal text-[#FAF7F2] tracking-tight">
                        {formatCurrency(preservationResults.monthlyWithdrawal, currentCurrency)}
                      </span>
                      <span className="text-xs font-mono text-[#FAF7F2]">
                        per month
                      </span>
                    </div>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-full liquid-glass-pill text-[#FAF7F2] text-xs font-mono">
                    {preservationResults.isPerpetual ? '● Perpetual Runway' : preservationResults.runwayYears}
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
                  <div>
                    <div className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#8C857E]">Annual Distribution</div>
                    <div className="mt-1 font-mono text-base font-semibold text-[#FAF7F2]">
                      {formatCurrency(preservationResults.annualWithdrawal, currentCurrency, true)}
                    </div>
                    <div className="text-[10px] text-[#736B65]">Yearly Cashflow</div>
                  </div>

                  <div>
                    <div className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#8C857E]">Real Net Yield</div>
                    <div className="mt-1 font-mono text-base font-semibold text-[#FAF7F2]">
                      +{preservationResults.realYield.toFixed(2)}%
                    </div>
                    <div className="text-[10px] text-[#736B65]">Yield minus Inflation</div>
                  </div>

                  <div>
                    <div className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#8C857E]">Runway Status</div>
                    <div className="mt-1 font-mono text-base font-semibold text-[#B88A58]">
                      {preservationResults.isPerpetual ? 'Infinite' : preservationResults.runwayYears}
                    </div>
                    <div className="text-[10px] text-[#736B65]">Capital Longevity</div>
                  </div>

                  <div>
                    <div className="text-[11px] font-sans uppercase tracking-[0.15em] text-[#8C857E]">Capital Shield</div>
                    <div className="mt-1 font-mono text-base font-semibold text-[#FAF7F2]">
                      100% Client-Side
                    </div>
                    <div className="text-[10px] text-[#736B65]">Zero Storage</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
