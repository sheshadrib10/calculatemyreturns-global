import React, { useState, useMemo } from 'react';
import { BuyerStatus, CurrencyCode, JurisdictionCode, PropertyInputs } from '../types';
import { CURRENCIES, JURISDICTIONS } from '../data/jurisdictions';
import { formatCurrency, formatPercent, simulatePropertyInvestment } from '../utils/finance';
import { generateDeterministicAiAudit, queryAuraAi } from '../utils/aiAdvisory';
import {
  Building2,
  DollarSign,
  TrendingUp,
  Percent,
  Calendar,
  ShieldAlert,
  Sparkles,
  Printer,
  ChevronDown,
  ChevronUp,
  Send,
  Loader2,
  HelpCircle,
  ArrowUpRight,
  ShieldCheck,
  Scale,
  Clock,
  Layers,
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

  // Initial State tailored to selected jurisdiction
  const [propertyCost, setPropertyCost] = useState<number>(jur.currency === curr.code ? curr.defaultPrice : 1500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(25);
  const [loanRate, setLoanRate] = useState<number>(currentJurisdiction === 'SG' ? 3.4 : currentJurisdiction === 'MY' ? 4.3 : currentJurisdiction === 'IN' ? 8.5 : currentJurisdiction === 'AE' ? 4.9 : 6.5);
  const [loanTenure, setLoanTenure] = useState<number>(25);
  const [holdingPeriod, setHoldingPeriod] = useState<number>(10);
  const [appreciationRate, setAppreciationRate] = useState<number>(currentJurisdiction === 'IN' ? 8.0 : currentJurisdiction === 'AE' ? 6.5 : 4.5);
  const [monthlyRent, setMonthlyRent] = useState<number>(jur.currency === curr.code ? curr.defaultRent : 4500);
  const [rentHike, setRentHike] = useState<number>(3.5);
  const [monthlyMaintenance, setMonthlyMaintenance] = useState<number>(Math.round((monthlyRent * 0.12)));
  const [maintenanceHike, setMaintenanceHike] = useState<number>(3.0);
  const [vacancyWeeksPerYear, setVacancyWeeksPerYear] = useState<number>(2);
  const [buyerStatus, setBuyerStatus] = useState<BuyerStatus>('citizen');
  const [propertyCount, setPropertyCount] = useState<number>(1);

  // Table expand state
  const [showFullTable, setShowFullTable] = useState<boolean>(false);

  // Inline AI Query state
  const [aiQuestion, setAiQuestion] = useState<string>('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

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

  // Handle user AI query
  const handleAskAi = async (promptOverride?: string) => {
    const query = promptOverride || aiQuestion;
    if (!query.trim()) return;
    setIsAiLoading(true);
    setAiResponse('');
    try {
      const answer = await queryAuraAi(query, {
        inputs,
        results,
        jurisdictionCode: currentJurisdiction,
      });
      setAiResponse(answer);
    } catch {
      setAiResponse('Unable to process AI inquiry. Please refer to verified ledger calculations.');
    } finally {
      setIsAiLoading(false);
      if (!promptOverride) setAiQuestion('');
    }
  };

  // SVG Chart points calculation
  const chartData = useMemo(() => {
    const list = results.yearlyProjections;
    if (!list || list.length === 0) return null;
    const maxVal = Math.max(...list.map((d) => d.propertyValue), inputs.propertyCost) * 1.05;
    const minVal = 0;
    const count = list.length;
    const width = 800;
    const height = 260;
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#2E2421]/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37] mb-1.5 uppercase tracking-wider">
            <span>Flagship Simulator</span>
            <span>·</span>
            <span>{jur.flag} {jur.name} Jurisdiction</span>
            <span>·</span>
            <span>{jur.tagline}</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl font-medium text-white tracking-tight">
            Rental Property Investment &amp; IRR Simulator
          </h2>
          <p className="mt-1 text-sm text-[#A39E98] max-w-2xl font-sans">
            Institutional cash-flow forecasting accounting for localized stamp duty ({jur.stampDutyName}), debt amortization, rental escalation, and exit capital gains rules.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#2E2421] bg-[#1C1615] hover:border-[#D4AF37]/50 text-xs text-[#EAE6E1] font-medium transition-all"
            title="Print private memorandum or save as PDF"
          >
            <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Print / PDF</span>
          </button>
          
          <button
            onClick={onOpenAiAuditModal}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B98A3D] hover:from-[#E5C07B] hover:to-[#C5A059] text-[#140F0E] font-semibold text-xs shadow-md transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#140F0E]" />
            <span>Executive AI Audit</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Form Inputs (Left) vs Real-Time Results & Institutional Ledger (Right) */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Input Form */}
        <div className="lg:col-span-5 bg-[#171211] border border-[#2E2421] rounded-2xl p-6 shadow-xl space-y-6">
          
          {/* Section: Buyer Status & Jurisdiction Rules */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5" />
                <span>Buyer Legal Status</span>
              </span>
              <span className="text-[11px] font-mono text-[#8C857E]">Dictates Stamp Duty &amp; ABSD</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {jur.buyerStatusOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setBuyerStatus(opt.id)}
                  className={`p-2.5 rounded-xl text-left border text-xs transition-all ${
                    buyerStatus === opt.id
                      ? 'border-[#D4AF37] bg-[#2B1B13] text-white shadow-sm'
                      : 'border-[#2E2421] bg-[#140F0E] text-[#B9B5AF] hover:border-[#3D2E2A]'
                  }`}
                >
                  <div className="font-semibold">{opt.label}</div>
                  <div className="text-[10px] text-[#8C857E] line-clamp-1 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>

            {currentJurisdiction === 'SG' && buyerStatus !== 'foreigner' && (
              <div className="mt-3 flex items-center justify-between p-2.5 rounded-xl border border-[#2E2421] bg-[#140F0E]">
                <span className="text-xs text-[#B9B5AF]">Property Count (for ABSD tiering):</span>
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      onClick={() => setPropertyCount(num)}
                      className={`px-3 py-1 rounded-md text-xs font-mono font-medium transition-all ${
                        propertyCount === num
                          ? 'bg-[#D4AF37] text-[#140F0E]'
                          : 'bg-[#251D1B] text-[#B9B5AF] hover:text-white'
                      }`}
                    >
                      {num === 3 ? '3rd+' : `${num}${num === 1 ? 'st' : 'nd'}`}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section: Acquisition & Leverage */}
          <div className="pt-4 border-t border-[#2E2421]/80 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" />
              <span>Property Acquisition &amp; Financing</span>
            </span>

            {/* Property Cost */}
            <div>
              <div className="flex justify-between text-xs text-[#B9B5AF] mb-1">
                <label>Purchase Price</label>
                <span className="font-mono text-white">{formatCurrency(propertyCost, currentCurrency)}</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-[#8C857E]">
                  {curr.symbol}
                </span>
                <input
                  type="number"
                  value={propertyCost}
                  step={curr.priceStep}
                  min={10000}
                  onChange={(e) => setPropertyCost(Math.max(1000, Number(e.target.value)))}
                  className="w-full bg-[#140F0E] border border-[#2E2421] rounded-xl pl-9 pr-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Down Payment Slider */}
            <div>
              <div className="flex justify-between text-xs text-[#B9B5AF] mb-1">
                <label>Down Payment (%)</label>
                <span className="font-mono text-[#D4AF37] font-semibold">
                  {downPaymentPercent}% ({formatCurrency(results.downPaymentAmount, currentCurrency, true)})
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#8C857E]">
                <span>5% (Min)</span>
                <span>25% (Prime)</span>
                <span>100% (Cash Deal)</span>
              </div>
            </div>

            {/* Mortgage Rate & Tenure */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#B9B5AF] mb-1">Mortgage Rate (%)</label>
                <div className="relative">
                  <input
                    type="number"
                    step={0.1}
                    min={0}
                    max={20}
                    value={loanRate}
                    onChange={(e) => setLoanRate(Number(e.target.value))}
                    className="w-full bg-[#140F0E] border border-[#2E2421] rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-[#8C857E]">%</span>
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#B9B5AF] mb-1">Loan Tenure</label>
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    max={40}
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="w-full bg-[#140F0E] border border-[#2E2421] rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-[#8C857E]">yrs</span>
                </div>
              </div>
            </div>

            {/* Holding Period & Expected Annual Appreciation */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#B9B5AF] mb-1">Holding Period</label>
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    max={40}
                    value={holdingPeriod}
                    onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                    className="w-full bg-[#140F0E] border border-[#2E2421] rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-[#8C857E]">yrs</span>
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#B9B5AF] mb-1">Appreciation Rate</label>
                <div className="relative">
                  <input
                    type="number"
                    step={0.5}
                    min={-5}
                    max={25}
                    value={appreciationRate}
                    onChange={(e) => setAppreciationRate(Number(e.target.value))}
                    className="w-full bg-[#140F0E] border border-[#2E2421] rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-[#8C857E]">%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Rental Income & Operating Expenses */}
          <div className="pt-4 border-t border-[#2E2421]/80 space-y-4">
            <span className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Rental Income &amp; Operating Expenses</span>
            </span>

            {/* Monthly Rental Income */}
            <div>
              <div className="flex justify-between text-xs text-[#B9B5AF] mb-1">
                <label>Current Monthly Rent</label>
                <span className="font-mono text-emerald-400">{formatCurrency(monthlyRent, currentCurrency)}/mo</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-xs text-[#8C857E]">
                  {curr.symbol}
                </span>
                <input
                  type="number"
                  value={monthlyRent}
                  step={curr.rentStep}
                  min={0}
                  onChange={(e) => setMonthlyRent(Math.max(0, Number(e.target.value)))}
                  className="w-full bg-[#140F0E] border border-[#2E2421] rounded-xl pl-9 pr-4 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            {/* Rent Escalation & Maintenance */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-[#B9B5AF] mb-1">Annual Rent Escalation</label>
                <div className="relative">
                  <input
                    type="number"
                    step={0.5}
                    value={rentHike}
                    onChange={(e) => setRentHike(Number(e.target.value))}
                    className="w-full bg-[#140F0E] border border-[#2E2421] rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-[#8C857E]">%</span>
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#B9B5AF] mb-1">Monthly Maintenance</label>
                <div className="relative">
                  <input
                    type="number"
                    value={monthlyMaintenance}
                    onChange={(e) => setMonthlyMaintenance(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-[#140F0E] border border-[#2E2421] rounded-xl px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>
            </div>

            {/* Vacancy Allowance */}
            <div>
              <div className="flex justify-between text-xs text-[#B9B5AF] mb-1">
                <label>Vacancy Allowance (Weeks/Year)</label>
                <span className="font-mono text-white">{vacancyWeeksPerYear} weeks</span>
              </div>
              <input
                type="range"
                min={0}
                max={12}
                step={1}
                value={vacancyWeeksPerYear}
                onChange={(e) => setVacancyWeeksPerYear(Number(e.target.value))}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#8C857E]">
                <span>0 wks (100% occupied)</span>
                <span>2 wks (Standard)</span>
                <span>8 wks (High turnover)</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Real-Time Results & Institutional Ledger */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Hero Yield & IRR Metric Card (Lenval Luxury Aesthetic) */}
          <div className="bg-gradient-to-br from-[#1C1615] via-[#171211] to-[#120E0D] border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.15),transparent_70%)] pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#2E2421]/80 pb-5">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#D4AF37]">
                  Annualized Holding IRR on Invested Equity
                </span>
                <div className="mt-1 flex items-baseline gap-3">
                  <span className="font-mono text-4xl sm:text-6xl font-bold tracking-tight text-gold-gradient">
                    {formatPercent(results.irr)}
                  </span>
                  <span className="text-xs font-mono text-[#8C857E]">
                    over {holdingPeriod} years
                  </span>
                </div>
              </div>

              {/* Deal Quality Score Pill */}
              <div className="mt-2 sm:mt-0 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30 bg-[#251B15] text-[#D4AF37] text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Deal Score: {auditReport.score}/100</span>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-[11px] font-mono text-[#8C857E]">Monthly Net Cash Flow</div>
                <div className={`mt-1 font-mono text-base font-semibold ${
                  results.initialMonthlyCashFlow >= 0 ? 'text-emerald-400' : 'text-amber-500'
                }`}>
                  {formatCurrency(results.initialMonthlyCashFlow, currentCurrency)}
                </div>
                <div className="text-[10px] text-[#736B65]">Rent − EMI − Maint</div>
              </div>

              <div>
                <div className="text-[11px] font-mono text-[#8C857E]">Gross Rental Yield</div>
                <div className="mt-1 font-mono text-base font-semibold text-white">
                  {results.grossRentalYield.toFixed(2)}%
                </div>
                <div className="text-[10px] text-[#736B65]">Cap Rate: {results.capRate.toFixed(2)}%</div>
              </div>

              <div>
                <div className="text-[11px] font-mono text-[#8C857E]">Total Cash Invested</div>
                <div className="mt-1 font-mono text-base font-semibold text-white">
                  {formatCurrency(results.totalCashInvested, currentCurrency, true)}
                </div>
                <div className="text-[10px] text-[#736B65]">Down + Stamp Duty</div>
              </div>

              <div>
                <div className="text-[11px] font-mono text-[#8C857E]">Equity Multiple</div>
                <div className="mt-1 font-mono text-base font-semibold text-[#D4AF37]">
                  {results.equityMultiple.toFixed(2)}x
                </div>
                <div className="text-[10px] text-[#736B65]">Exit Net: {formatCurrency(results.netEquityAtExit, currentCurrency, true)}</div>
              </div>
            </div>
          </div>

          {/* Acquisition Friction & Localized Tax Breakdown Card */}
          <div className="bg-[#171211] border border-[#2E2421] rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-[#2E2421]/80">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-mono uppercase tracking-wider text-white">
                  {jur.flag} {jur.name} Statutory Acquisition &amp; Tax Ledger
                </span>
              </div>
              <span className="text-xs font-mono text-[#D4AF37]">
                Total Fees: {formatCurrency(results.acquisitionCosts, currentCurrency)}
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {results.acquisitionBreakdown.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs py-1.5 border-b border-[#251D1B] last:border-0">
                  <span className="text-[#B9B5AF]">{item.label}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-[#8C857E]">({item.rateStr})</span>
                    <span className="font-mono text-white">{formatCurrency(item.amount, currentCurrency)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Jurisdiction Key Advantages Callout */}
            <div className="mt-4 p-3 rounded-xl bg-[#1C1615] border border-[#2E2421] text-xs text-[#B9B5AF] space-y-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Statutory Advantages for {jur.name}:</span>
              </div>
              <ul className="list-disc list-inside text-[11px] space-y-0.5 text-[#A39E98]">
                {jur.keyBenefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* SVG Dynamic Appreciation vs Debt Amortization Chart */}
          {chartData && (
            <div className="bg-[#171211] border border-[#2E2421] rounded-2xl p-5 shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-[#2E2421]/80">
                <span className="text-xs font-mono uppercase tracking-wider text-white flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Amortization &amp; Equity Trajectory ({holdingPeriod} Years)</span>
                </span>
                
                {/* Legend */}
                <div className="flex items-center gap-4 text-[11px] font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    Property Value
                  </span>
                  <span className="flex items-center gap-1.5 text-[#D4AF37]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]" />
                    Equity
                  </span>
                  <span className="flex items-center gap-1.5 text-amber-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                    Loan Balance
                  </span>
                </div>
              </div>

              <div className="mt-4 relative">
                <svg
                  viewBox={`0 0 ${chartData.width} ${chartData.height}`}
                  className="w-full h-52 overflow-visible"
                >
                  {/* Grid Lines */}
                  {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                    const y = chartData.height - 20 - pct * (chartData.height - 40);
                    return (
                      <g key={i}>
                        <line
                          x1={20}
                          y1={y}
                          x2={chartData.width - 20}
                          y2={y}
                          stroke="#2A2220"
                          strokeDasharray="4 4"
                        />
                      </g>
                    );
                  })}

                  {/* Polylines */}
                  <polyline
                    fill="none"
                    stroke="#059669"
                    strokeWidth="3"
                    points={chartData.propPoints}
                  />
                  <polyline
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="2.5"
                    points={chartData.equityPoints}
                  />
                  <polyline
                    fill="none"
                    stroke="#D97706"
                    strokeWidth="2"
                    strokeDasharray="5 3"
                    points={chartData.loanPoints}
                  />
                </svg>

                <div className="flex justify-between text-[10px] font-mono text-[#8C857E] mt-2">
                  <span>Year 0 (Entry)</span>
                  <span>Year {Math.round(holdingPeriod / 2)}</span>
                  <span>Year {holdingPeriod} (Exit: {formatCurrency(results.exitPropertyValue, currentCurrency, true)})</span>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Year-by-Year Cash Flow Ledger Table */}
          <div className="bg-[#171211] border border-[#2E2421] rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between pb-3 border-b border-[#2E2421]/80">
              <span className="text-xs font-mono uppercase tracking-wider text-white flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Year-by-Year Financial Ledger</span>
              </span>

              <button
                onClick={() => setShowFullTable(!showFullTable)}
                className="flex items-center gap-1 text-xs text-[#D4AF37] hover:underline font-mono"
              >
                <span>{showFullTable ? 'Collapse Rows' : `View All ${holdingPeriod} Years`}</span>
                {showFullTable ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-xs font-mono text-left">
                <thead>
                  <tr className="text-[#8C857E] border-b border-[#2E2421]">
                    <th className="py-2 pr-3">Year</th>
                    <th className="py-2 px-3 text-right">Property Value</th>
                    <th className="py-2 px-3 text-right">Loan Balance</th>
                    <th className="py-2 px-3 text-right">Net Equity</th>
                    <th className="py-2 px-3 text-right">Annual Rent</th>
                    <th className="py-2 pl-3 text-right">Annual Cash Flow</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#251D1B]">
                  {(showFullTable
                    ? results.yearlyProjections
                    : results.yearlyProjections.slice(0, 5)
                  ).map((row) => (
                    <tr key={row.year} className="hover:bg-[#1E1716] transition-colors">
                      <td className="py-2.5 pr-3 text-[#B9B5AF]">Yr {row.year}</td>
                      <td className="py-2.5 px-3 text-right text-white">
                        {formatCurrency(row.propertyValue, currentCurrency, true)}
                      </td>
                      <td className="py-2.5 px-3 text-right text-[#A39E98]">
                        {formatCurrency(row.loanBalance, currentCurrency, true)}
                      </td>
                      <td className="py-2.5 px-3 text-right text-[#D4AF37]">
                        {formatCurrency(row.equity, currentCurrency, true)}
                      </td>
                      <td className="py-2.5 px-3 text-right text-emerald-400">
                        {formatCurrency(row.effectiveRent, currentCurrency, true)}
                      </td>
                      <td className={`py-2.5 pl-3 text-right font-semibold ${
                        row.netCashFlow >= 0 ? 'text-emerald-400' : 'text-amber-500'
                      }`}>
                        {formatCurrency(row.netCashFlow, currentCurrency, true)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {!showFullTable && holdingPeriod > 5 && (
              <div className="mt-2 text-center">
                <button
                  onClick={() => setShowFullTable(true)}
                  className="text-[11px] font-mono text-[#D4AF37] hover:underline"
                >
                  + Expand {holdingPeriod - 5} remaining years...
                </button>
              </div>
            )}
          </div>

          {/* Interactive Aura AI Analyst Box */}
          <div className="bg-[#171211] border border-[#D4AF37]/30 rounded-2xl p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#2E2421]/80">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-xs font-mono uppercase tracking-wider text-white">
                  Ask Ariel AI · Localized Real Estate Advisory
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">Zero Hallucinations Guarantee</span>
            </div>

            {/* Prompt Quick Suggestion Chips */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleAskAi(`How does ${jur.name}'s tax structure and stamp duty affect my IRR?`)}
                className="px-2.5 py-1 rounded-md bg-[#251D1B] hover:bg-[#2E2421] border border-[#2E2421] text-[11px] text-[#EAE6E1] transition-colors"
              >
                Analyze {jur.name} Stamp Duty Friction
              </button>
              <button
                onClick={() => handleAskAi('What happens to monthly cash flow if interest rates rise by 200 bps?')}
                className="px-2.5 py-1 rounded-md bg-[#251D1B] hover:bg-[#2E2421] border border-[#2E2421] text-[11px] text-[#EAE6E1] transition-colors"
              >
                Stress Test +2% Rate Spike
              </button>
              {currentJurisdiction === 'AE' && (
                <button
                  onClick={() => handleAskAi('Does this property meet the Dubai 10-year Golden Visa requirements?')}
                  className="px-2.5 py-1 rounded-md bg-[#251D1B] hover:bg-[#2E2421] border border-[#2E2421] text-[11px] text-[#EAE6E1] transition-colors"
                >
                  Golden Visa Eligibility
                </button>
              )}
              {currentJurisdiction === 'SG' && (
                <button
                  onClick={() => handleAskAi('How can I optimize ABSD in Singapore?')}
                  className="px-2.5 py-1 rounded-md bg-[#251D1B] hover:bg-[#2E2421] border border-[#2E2421] text-[11px] text-[#EAE6E1] transition-colors"
                >
                  Optimize Singapore ABSD
                </button>
              )}
            </div>

            {/* Query Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={aiQuestion}
                onChange={(e) => setAiQuestion(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
                placeholder={`Ask any question about this ${jur.name} deal...`}
                className="flex-1 bg-[#140F0E] border border-[#2E2421] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#736B65] focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                onClick={() => handleAskAi()}
                disabled={isAiLoading || !aiQuestion.trim()}
                className="px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C07B] text-[#140F0E] font-semibold text-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
              >
                {isAiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                <span>Ask AI</span>
              </button>
            </div>

            {/* AI Response Display */}
            {aiResponse && (
              <div className="p-4 rounded-xl bg-[#1C1615] border border-[#3D2E2A] text-xs text-[#EAE6E1] leading-relaxed whitespace-pre-line animate-in fade-in duration-300">
                {aiResponse}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
