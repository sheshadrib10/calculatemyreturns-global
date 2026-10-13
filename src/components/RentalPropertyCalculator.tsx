import React, { useState, useMemo } from 'react';
import { BuyerStatus, CurrencyCode, JurisdictionCode, PropertyInputs } from '../types';
import { CURRENCIES, JURISDICTIONS } from '../data/jurisdictions';
import { formatCurrency, formatPercent, simulatePropertyInvestment } from '../utils/finance';
import { generateDeterministicAiAudit, queryAuraAi } from '../utils/aiAdvisory';
import {
  Building2,
  TrendingUp,
  Percent,
  Calendar,
  Sparkles,
  Printer,
  ChevronDown,
  ChevronUp,
  Send,
  Loader2,
  ShieldCheck,
  Scale,
  Clock,
  ArrowRight,
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
  const [loanRate, setLoanRate] = useState<number>(
    currentJurisdiction === 'SG' ? 3.4 : currentJurisdiction === 'MY' ? 4.3 : currentJurisdiction === 'IN' ? 8.5 : currentJurisdiction === 'AE' ? 4.9 : 6.5
  );
  const [loanTenure, setLoanTenure] = useState<number>(25);
  const [holdingPeriod, setHoldingPeriod] = useState<number>(10);
  const [appreciationRate, setAppreciationRate] = useState<number>(
    currentJurisdiction === 'IN' ? 8.0 : currentJurisdiction === 'AE' ? 6.5 : 4.5
  );
  const [monthlyRent, setMonthlyRent] = useState<number>(jur.currency === curr.code ? curr.defaultRent : 4500);
  const [rentHike, setRentHike] = useState<number>(3.5);
  const [monthlyMaintenance, setMonthlyMaintenance] = useState<number>(Math.round(monthlyRent * 0.12));
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

  return (
    <section id="calculator-section" className="bg-[#191514] text-[#FAF7F2] py-20 sm:py-28 border-b border-[#302826]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        
        {/* Section Header (Lenval Editorial Styling) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#302826]">
          <div>
            <div className="text-xs font-sans uppercase tracking-[0.25em] text-[#8C857E] mb-2">
              02 / The Master Suite · {jur.name}
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF7F2]">
              Real Estate Return &amp; IRR Simulator
            </h2>
            <p className="mt-3 text-sm text-[#A39E98] max-w-2xl font-sans font-light">
              Underwrite acquisitions accounting for localized stamp duty ({jur.stampDutyName}), debt amortization, rental escalation, and exit capital gains rules.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-full border border-[#302826] bg-[#211A19] hover:border-[#8C5E3C] text-xs font-sans uppercase tracking-[0.1em] text-[#FAF7F2] transition-all flex items-center gap-2"
            >
              <Printer className="w-3.5 h-3.5 text-[#B88A58]" />
              <span>Print Memorandum</span>
            </button>

            <button
              onClick={onOpenAiAuditModal}
              className="px-5 py-2 rounded-full bg-[#FAF7F2] text-[#191514] hover:bg-[#FAF7F2]/90 text-xs font-sans uppercase tracking-[0.1em] font-medium transition-all flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Executive AI Audit</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Form Ledger (Left) vs Real-Time Results & Ledger (Right) */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT COLUMN: Input Form Ledger */}
          <div className="lg:col-span-5 bg-[#211A19] border border-[#302826] rounded-3xl p-8 sm:p-9 space-y-8">
            
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
                    type="number"
                    value={propertyCost}
                    step={curr.priceStep}
                    min={10000}
                    onChange={(e) => setPropertyCost(Math.max(1000, Number(e.target.value)))}
                    className="w-full bg-[#191514] border border-[#302826] rounded-2xl pl-10 pr-4 py-3 text-sm text-[#FAF7F2] font-mono focus:outline-none focus:border-[#8C5E3C]"
                  />
                </div>
              </div>

              {/* Down Payment Slider */}
              <div>
                <div className="flex justify-between text-xs text-[#A39E98] mb-1.5">
                  <label>Down Payment (%)</label>
                  <span className="font-mono text-[#FAF7F2]">
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
                  className="w-full accent-[#8C5E3C] cursor-pointer"
                />
              </div>

              {/* Mortgage Rate & Tenure */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#A39E98] mb-1">Mortgage Rate (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      step={0.1}
                      min={0}
                      max={20}
                      value={loanRate}
                      onChange={(e) => setLoanRate(Number(e.target.value))}
                      className="w-full bg-[#191514] border border-[#302826] rounded-2xl px-3 py-2.5 text-xs text-[#FAF7F2] font-mono focus:outline-none focus:border-[#8C5E3C]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C857E]">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#A39E98] mb-1">Loan Tenure</label>
                  <div className="relative">
                    <input
                      type="number"
                      min={1}
                      max={40}
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(Number(e.target.value))}
                      className="w-full bg-[#191514] border border-[#302826] rounded-2xl px-3 py-2.5 text-xs text-[#FAF7F2] font-mono focus:outline-none focus:border-[#8C5E3C]"
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
                      type="number"
                      min={1}
                      max={40}
                      value={holdingPeriod}
                      onChange={(e) => setHoldingPeriod(Number(e.target.value))}
                      className="w-full bg-[#191514] border border-[#302826] rounded-2xl px-3 py-2.5 text-xs text-[#FAF7F2] font-mono focus:outline-none focus:border-[#8C5E3C]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C857E]">yrs</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#A39E98] mb-1">Appreciation Rate</label>
                  <div className="relative">
                    <input
                      type="number"
                      step={0.5}
                      min={-5}
                      max={25}
                      value={appreciationRate}
                      onChange={(e) => setAppreciationRate(Number(e.target.value))}
                      className="w-full bg-[#191514] border border-[#302826] rounded-2xl px-3 py-2.5 text-xs text-[#FAF7F2] font-mono focus:outline-none focus:border-[#8C5E3C]"
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
                  <span className="font-mono text-emerald-400">{formatCurrency(monthlyRent, currentCurrency)}/mo</span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-xs text-[#8C857E]">
                    {curr.symbol}
                  </span>
                  <input
                    type="number"
                    value={monthlyRent}
                    step={curr.rentStep}
                    min={0}
                    onChange={(e) => setMonthlyRent(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-[#191514] border border-[#302826] rounded-2xl pl-10 pr-4 py-3 text-sm text-[#FAF7F2] font-mono focus:outline-none focus:border-[#8C5E3C]"
                  />
                </div>
              </div>

              {/* Rent Escalation & Maintenance */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#A39E98] mb-1">Rent Escalation (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      step={0.5}
                      value={rentHike}
                      onChange={(e) => setRentHike(Number(e.target.value))}
                      className="w-full bg-[#191514] border border-[#302826] rounded-2xl px-3 py-2.5 text-xs text-[#FAF7F2] font-mono focus:outline-none focus:border-[#8C5E3C]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C857E]">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-[#A39E98] mb-1">Monthly Maintenance</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={monthlyMaintenance}
                      onChange={(e) => setMonthlyMaintenance(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-[#191514] border border-[#302826] rounded-2xl px-3 py-2.5 text-xs text-[#FAF7F2] font-mono focus:outline-none focus:border-[#8C5E3C]"
                    />
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
                    results.initialMonthlyCashFlow >= 0 ? 'text-emerald-400' : 'text-[#B88A58]'
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
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-[#8C5E3C]" />
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
                <span className="font-medium text-[#FAF7F2]">Statutory Advantages ({jur.name}):</span>
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
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
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
                      stroke="#059669"
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
                        <td className="py-2.5 px-3 text-right text-emerald-400">
                          {formatCurrency(row.effectiveRent, currentCurrency, true)}
                        </td>
                        <td className={`py-2.5 pl-3 text-right font-semibold ${
                          row.netCashFlow >= 0 ? 'text-emerald-400' : 'text-[#B88A58]'
                        }`}>
                          {formatCurrency(row.netCashFlow, currentCurrency, true)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Ariel AI Advisory Box */}
            <div className="bg-[#211A19] border border-[#302826] rounded-3xl p-8 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-[#302826]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#B88A58]" />
                  <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#FAF7F2]">
                    Ariel AI · Localized Real Estate Advisory
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400">Deterministic Mathematical Guardrails</span>
              </div>

              {/* Suggestion Chips */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleAskAi(`How does ${jur.name}'s tax structure and stamp duty affect my IRR?`)}
                  className="px-3 py-1.5 rounded-full bg-[#191514] hover:bg-[#2B2220] border border-[#302826] text-[11px] text-[#FAF7F2] transition-colors"
                >
                  Analyze {jur.name} Stamp Duty Friction
                </button>
                <button
                  onClick={() => handleAskAi('What happens to monthly cash flow if interest rates rise by 200 bps?')}
                  className="px-3 py-1.5 rounded-full bg-[#191514] hover:bg-[#2B2220] border border-[#302826] text-[11px] text-[#FAF7F2] transition-colors"
                >
                  Stress Test +2% Rate Spike
                </button>
                {currentJurisdiction === 'AE' && (
                  <button
                    onClick={() => handleAskAi('Does this property meet the Dubai 10-year Golden Visa requirements?')}
                    className="px-3 py-1.5 rounded-full bg-[#191514] hover:bg-[#2B2220] border border-[#302826] text-[11px] text-[#FAF7F2] transition-colors"
                  >
                    Golden Visa Eligibility
                  </button>
                )}
                {currentJurisdiction === 'SG' && (
                  <button
                    onClick={() => handleAskAi('How can I optimize ABSD in Singapore?')}
                    className="px-3 py-1.5 rounded-full bg-[#191514] hover:bg-[#2B2220] border border-[#302826] text-[11px] text-[#FAF7F2] transition-colors"
                  >
                    Optimize Singapore ABSD
                  </button>
                )}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskAi()}
                  placeholder={`Ask Ariel AI about this ${jur.name} deal...`}
                  className="flex-1 bg-[#191514] border border-[#302826] rounded-2xl px-4 py-3 text-xs text-[#FAF7F2] placeholder-[#8C857E] focus:outline-none focus:border-[#8C5E3C]"
                />
                <button
                  onClick={() => handleAskAi()}
                  disabled={isAiLoading || !aiQuestion.trim()}
                  className="px-5 py-3 rounded-2xl bg-[#FAF7F2] hover:bg-[#FAF7F2]/90 text-[#191514] font-medium text-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  {isAiLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>Ask AI</span>
                </button>
              </div>

              {/* Response */}
              {aiResponse && (
                <div className="p-5 rounded-2xl bg-[#191514] border border-[#302826] text-xs text-[#FAF7F2] leading-relaxed whitespace-pre-line animate-in fade-in duration-300">
                  {aiResponse}
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
