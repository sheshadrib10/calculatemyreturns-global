import { CurrencyCode, JurisdictionCode, PropertyInputs, PropertySimulationResult, YearProjection } from '../types';
import { CURRENCIES, JURISDICTIONS } from '../data/jurisdictions';

export function formatCurrency(amount: number, currencyCode: CurrencyCode = 'USD', compact: boolean = false): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '—';

  const isNeg = amount < 0;
  const absVal = Math.round(Math.abs(amount));
  const cfg = CURRENCIES[currencyCode] || CURRENCIES.USD;

  // Indian Rupee specific formatting (Lakhs & Crores)
  if (currencyCode === 'INR') {
    if (compact) {
      if (absVal >= 10000000) {
        return `${isNeg ? '-' : ''}₹${(absVal / 10000000).toFixed(2)} Cr`;
      }
      if (absVal >= 100000) {
        return `${isNeg ? '-' : ''}₹${(absVal / 100000).toFixed(2)} L`;
      }
    }
    const formatted = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(absVal);
    return `${isNeg ? '-' : ''}₹${formatted}`;
  }

  // Compact notation for other currencies (M / k)
  if (compact) {
    if (absVal >= 1000000) {
      return `${isNeg ? '-' : ''}${cfg.symbol}${(absVal / 1000000).toFixed(2)}M`;
    }
    if (absVal >= 1000) {
      return `${isNeg ? '-' : ''}${cfg.symbol}${(absVal / 1000).toFixed(0)}k`;
    }
  }

  const formatted = new Intl.NumberFormat(cfg.locale, { maximumFractionDigits: 0 }).format(absVal);
  return `${isNeg ? '-' : ''}${cfg.symbol}${formatted}`;
}

export function formatPercent(rate: number | null, decimals: number = 2): string {
  if (rate === null || isNaN(rate)) return '—';
  const sign = rate > 0 ? '+' : '';
  return `${sign}${rate.toFixed(decimals)}%`;
}

export function emiFormula(principal: number, annualRatePct: number, tenureYears: number): number {
  if (principal <= 0) return 0;
  if (annualRatePct <= 0) return principal / (tenureYears * 12);
  const monthlyRate = annualRatePct / 100 / 12;
  const months = tenureYears * 12;
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
}

/**
 * Robust Internal Rate of Return (IRR) solved via bounded bisection and Newton-Raphson.
 */
export function calculateIrr(cashflows: number[]): number | null {
  if (!cashflows || cashflows.length < 2) return null;
  const hasPositive = cashflows.some((cf) => cf > 0);
  const hasNegative = cashflows.some((cf) => cf < 0);
  if (!hasPositive || !hasNegative) return null;

  function npv(rate: number): number {
    return cashflows.reduce((sum, cf, i) => sum + cf / Math.pow(1 + rate, i), 0);
  }

  let lo = -0.99999;
  let hi = 1.0;
  let fLo = npv(lo);
  let fHi = npv(hi);
  let expandCount = 0;

  while (fLo * fHi > 0 && expandCount < 40) {
    hi *= 2;
    fHi = npv(hi);
    expandCount++;
  }

  if (fLo * fHi > 0) return null;

  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2;
    const fMid = npv(mid);
    if (Math.abs(fMid) < 1e-7 || Math.abs(hi - lo) < 1e-12) {
      return mid;
    }
    if (fLo * fMid < 0) {
      hi = mid;
      fHi = fMid;
    } else {
      lo = mid;
      fLo = fMid;
    }
  }

  return (lo + hi) / 2;
}

/**
 * Comprehensive Property Investment & Institutional Cash Flow Simulator
 */
export function simulatePropertyInvestment(
  inputs: PropertyInputs,
  jurisdictionCode: JurisdictionCode
): PropertySimulationResult {
  const jurisdiction = JURISDICTIONS[jurisdictionCode] || JURISDICTIONS.SG;

  const propertyCost = Math.max(1000, inputs.propertyCost);
  const downPaymentAmount = (propertyCost * inputs.downPaymentPercent) / 100;
  const loanAmount = Math.max(0, propertyCost - downPaymentAmount);

  // Compute localized stamp duty, legal, and acquisition fees
  const acquisition = jurisdiction.calculateAcquisitionTaxes(
    propertyCost,
    inputs.buyerStatus,
    inputs.propertyCount
  );
  const acquisitionCosts = acquisition.totalAcquisitionCosts;
  const totalCashInvested = downPaymentAmount + acquisitionCosts;

  // Mortgage calculations
  const monthlyRate = inputs.loanRate / 100 / 12;
  const loanMonths = inputs.loanTenure * 12;
  const monthlyEmi = loanAmount > 0 ? emiFormula(loanAmount, inputs.loanRate, inputs.loanTenure) : 0;

  // Month-by-month loan amortization simulation
  let balance = loanAmount;
  const balanceAtMonth: number[] = [balance];
  const interestPaidInYear: number[] = [];
  const principalPaidInYear: number[] = [];

  let currentYearInterest = 0;
  let currentYearPrincipal = 0;

  for (let m = 1; m <= inputs.holdingPeriod * 12; m++) {
    if (m <= loanMonths && balance > 0) {
      const interestThisMonth = balance * monthlyRate;
      let principalThisMonth = monthlyEmi - interestThisMonth;
      if (principalThisMonth > balance) principalThisMonth = balance;
      balance -= principalThisMonth;
      currentYearInterest += interestThisMonth;
      currentYearPrincipal += principalThisMonth;
    }

    balanceAtMonth.push(Math.max(0, balance));

    if (m % 12 === 0) {
      interestPaidInYear.push(currentYearInterest);
      principalPaidInYear.push(currentYearPrincipal);
      currentYearInterest = 0;
      currentYearPrincipal = 0;
    }
  }

  // Yearly projections
  const yearlyProjections: YearProjection[] = [];
  const irrCashflows: number[] = [-totalCashInvested];

  let currentRent = inputs.monthlyRent;
  let currentMaintenance = inputs.monthlyMaintenance;
  let cumulativeCashFlow = 0;

  const vacancyFraction = Math.min(0.5, Math.max(0, inputs.vacancyWeeksPerYear / 52));

  for (let y = 1; y <= inputs.holdingPeriod; y++) {
    const propertyValue = propertyCost * Math.pow(1 + inputs.appreciationRate / 100, y);
    const loanBalance = balanceAtMonth[y * 12] || 0;
    const equity = propertyValue - loanBalance;

    const grossRent = currentRent * 12;
    const effectiveRent = grossRent * (1 - vacancyFraction);
    const maintenancePaid = currentMaintenance * 12;
    const emiPaid = (y * 12 <= loanMonths ? monthlyEmi * 12 : 0);

    const yearNetCashFlow = effectiveRent - emiPaid - maintenancePaid;
    cumulativeCashFlow += yearNetCashFlow;

    yearlyProjections.push({
      year: y,
      propertyValue: Math.round(propertyValue),
      loanBalance: Math.round(loanBalance),
      equity: Math.round(equity),
      grossRent: Math.round(grossRent),
      effectiveRent: Math.round(effectiveRent),
      emiPaid: Math.round(emiPaid),
      principalPaid: Math.round(principalPaidInYear[y - 1] || 0),
      interestPaid: Math.round(interestPaidInYear[y - 1] || 0),
      maintenancePaid: Math.round(maintenancePaid),
      netCashFlow: Math.round(yearNetCashFlow),
      cumulativeCashFlow: Math.round(cumulativeCashFlow),
    });

    if (y < inputs.holdingPeriod) {
      irrCashflows.push(yearNetCashFlow);
    } else {
      // Exit Year: determine Capital Gain and Exit Taxes
      const capitalGain = propertyValue - propertyCost;
      const exitTaxCalc = jurisdiction.calculateExitTaxes(capitalGain, inputs.holdingPeriod, inputs.buyerStatus);
      const exitTaxes = exitTaxCalc.cgtAmount;
      const netEquityAtExit = equity - exitTaxes;
      irrCashflows.push(yearNetCashFlow + netEquityAtExit);
    }

    currentRent *= (1 + inputs.rentHike / 100);
    currentMaintenance *= (1 + inputs.maintenanceHike / 100);
  }

  const exitProjection = yearlyProjections[yearlyProjections.length - 1];
  const exitPropertyValue = exitProjection ? exitProjection.propertyValue : propertyCost;
  const exitLoanBalance = exitProjection ? exitProjection.loanBalance : 0;
  const grossEquityAtExit = exitPropertyValue - exitLoanBalance;

  const totalCapitalGain = exitPropertyValue - propertyCost;
  const exitTaxes = jurisdiction.calculateExitTaxes(totalCapitalGain, inputs.holdingPeriod, inputs.buyerStatus).cgtAmount;
  const netEquityAtExit = grossEquityAtExit - exitTaxes;

  const totalNetProfit = (cumulativeCashFlow + netEquityAtExit) - totalCashInvested;
  const equityMultiple = totalCashInvested > 0 ? (cumulativeCashFlow + netEquityAtExit) / totalCashInvested : 1;
  const irrRaw = calculateIrr(irrCashflows);
  const irr = irrRaw !== null ? irrRaw * 100 : null;

  // Annual yields & metrics
  const initialAnnualGrossRent = inputs.monthlyRent * 12;
  const initialEffectiveRent = initialAnnualGrossRent * (1 - vacancyFraction);
  const initialAnnualExpenses = inputs.monthlyMaintenance * 12;
  const initialNetOperatingIncome = initialEffectiveRent - initialAnnualExpenses;

  const grossRentalYield = (initialAnnualGrossRent / propertyCost) * 100;
  const netRentalYield = (initialNetOperatingIncome / propertyCost) * 100;
  const capRate = (initialNetOperatingIncome / propertyCost) * 100;
  const initialMonthlyCashFlow = (initialEffectiveRent / 12) - monthlyEmi - inputs.monthlyMaintenance;
  const cashOnCashReturn = totalCashInvested > 0 ? (yearlyProjections[0]?.netCashFlow / totalCashInvested) * 100 : 0;

  return {
    loanAmount: Math.round(loanAmount),
    downPaymentAmount: Math.round(downPaymentAmount),
    acquisitionCosts: Math.round(acquisitionCosts),
    totalCashInvested: Math.round(totalCashInvested),
    monthlyEmi: Math.round(monthlyEmi),
    grossRentalYield,
    netRentalYield,
    capRate,
    initialMonthlyCashFlow: Math.round(initialMonthlyCashFlow),
    exitPropertyValue: Math.round(exitPropertyValue),
    exitLoanBalance: Math.round(exitLoanBalance),
    grossEquityAtExit: Math.round(grossEquityAtExit),
    exitTaxes: Math.round(exitTaxes),
    netEquityAtExit: Math.round(netEquityAtExit),
    totalNetProfit: Math.round(totalNetProfit),
    equityMultiple,
    irr,
    cashOnCashReturn,
    acquisitionBreakdown: acquisition.breakdown,
    yearlyProjections,
  };
}

/**
 * Generic Calculators Execution Engine
 */
export function executeQuickCalculator(calcId: string, params: Record<string, number>): {
  headlineValue: string;
  headlineLabel: string;
  summaryText: string;
  details: { label: string; value: string }[];
} {
  switch (calcId) {
    case 'sip': {
      const p = params.monthly || 1000;
      const r = (params.rate || 12) / 100 / 12;
      const n = (params.years || 10) * 12;
      const fv = p * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
      const invested = p * n;
      const gains = fv - invested;
      return {
        headlineValue: Math.round(fv).toLocaleString(),
        headlineLabel: 'Projected Corpus',
        summaryText: `Investing ${p.toLocaleString()} monthly for ${params.years || 10} years at ${params.rate || 12}% per annum produces an estimated future wealth corpus of ${Math.round(fv).toLocaleString()}.`,
        details: [
          { label: 'Total Capital Invested', value: Math.round(invested).toLocaleString() },
          { label: 'Estimated Compounded Wealth Gain', value: Math.round(gains).toLocaleString() },
          { label: 'Wealth Multiple', value: `${(fv / invested).toFixed(2)}x` },
        ],
      };
    }

    case 'compound-interest': {
      const p = params.principal || 100000;
      const r = (params.rate || 8) / 100;
      const t = params.years || 10;
      const fv = p * Math.pow(1 + r, t);
      return {
        headlineValue: Math.round(fv).toLocaleString(),
        headlineLabel: 'Maturity Value',
        summaryText: `A lump-sum principal of ${p.toLocaleString()} compounding at ${params.rate || 8}% per annum expands to ${Math.round(fv).toLocaleString()} over ${t} years.`,
        details: [
          { label: 'Initial Principal', value: p.toLocaleString() },
          { label: 'Total Interest Earned', value: Math.round(fv - p).toLocaleString() },
          { label: 'Total Growth Percentage', value: `${(((fv - p) / p) * 100).toFixed(1)}%` },
        ],
      };
    }

    case 'home-loan-emi': {
      const principal = params.loanAmount || 800000;
      const rate = params.rate || 6.5;
      const years = params.tenure || 25;
      const emi = emiFormula(principal, rate, years);
      const totalPayment = emi * years * 12;
      const totalInterest = totalPayment - principal;
      return {
        headlineValue: Math.round(emi).toLocaleString(),
        headlineLabel: 'Monthly EMI Payment',
        summaryText: `A mortgage loan of ${principal.toLocaleString()} at ${rate}% over ${years} years entails a monthly payment of ${Math.round(emi).toLocaleString()}.`,
        details: [
          { label: 'Principal Loan Amount', value: principal.toLocaleString() },
          { label: 'Total Interest Payable', value: Math.round(totalInterest).toLocaleString() },
          { label: 'Total Repayment Cost', value: Math.round(totalPayment).toLocaleString() },
        ],
      };
    }

    case 'rule-of-72': {
      const rate = params.rate || 9;
      const years = 72 / rate;
      return {
        headlineValue: `${years.toFixed(1)} Years`,
        headlineLabel: 'Time Required to Double Capital',
        summaryText: `At an annualized return rate of ${rate}%, your money will double in purchasing power every ${years.toFixed(1)} years.`,
        details: [
          { label: 'Target Rate of Return', value: `${rate}%` },
          { label: 'Years to 2x Wealth', value: `${years.toFixed(1)} years` },
          { label: 'Years to 4x Wealth', value: `${(years * 2).toFixed(1)} years` },
        ],
      };
    }

    case 'emergency-fund': {
      const monthly = params.monthlyExpenses || 5000;
      const months = params.runwayMonths || 6;
      const target = monthly * months;
      return {
        headlineValue: Math.round(target).toLocaleString(),
        headlineLabel: 'Recommended Liquid Reserve',
        summaryText: `Maintaining a pristine ${months}-month cushion requires an untouchable liquid capital reserve of ${Math.round(target).toLocaleString()}.`,
        details: [
          { label: 'Monthly Burn Rate', value: monthly.toLocaleString() },
          { label: 'Months of Runway', value: `${months} months` },
          { label: 'Recommended Allocation', value: 'High-Yield Liquid Deposits / Sovereign T-Bills' },
        ],
      };
    }

    case 'dti': {
      const monthlyDebt = params.debt || 2500;
      const grossIncome = params.income || 8000;
      const dti = (monthlyDebt / grossIncome) * 100;
      const status = dti <= 36 ? 'Conservative / Tier-1 Credit' : dti <= 45 ? 'Acceptable Institutional Risk' : 'High Leverage Vulnerability';
      return {
        headlineValue: `${dti.toFixed(1)}%`,
        headlineLabel: 'Debt-to-Income Ratio',
        summaryText: `Your fixed debt liabilities consume ${dti.toFixed(1)}% of gross monthly compensation. Underwriting category: ${status}.`,
        details: [
          { label: 'Total Monthly Debt Obligations', value: monthlyDebt.toLocaleString() },
          { label: 'Gross Monthly Income', value: grossIncome.toLocaleString() },
          { label: 'Underwriting Solvency Tier', value: status },
        ],
      };
    }

    case 'cagr': {
      const initial = params.initial || 100000;
      const finalVal = params.final || 250000;
      const years = params.years || 5;
      const cagr = (Math.pow(finalVal / initial, 1 / years) - 1) * 100;
      return {
        headlineValue: `${cagr.toFixed(2)}%`,
        headlineLabel: 'Compound Annual Growth Rate',
        summaryText: `Growing capital from ${initial.toLocaleString()} to ${finalVal.toLocaleString()} across ${years} years represents an annualized CAGR of ${cagr.toFixed(2)}%.`,
        details: [
          { label: 'Starting Capital', value: initial.toLocaleString() },
          { label: 'Final Value', value: finalVal.toLocaleString() },
          { label: 'Holding Tenure', value: `${years} years` },
        ],
      };
    }

    case 'retirement': {
      const monthlySpend = params.monthlyExpenses || 8000;
      const annualSpend = monthlySpend * 12;
      const swr = (params.swr || 3.5) / 100; // 3.5% safe withdrawal rate
      const corpus = annualSpend / swr;
      return {
        headlineValue: Math.round(corpus).toLocaleString(),
        headlineLabel: 'Target Independence Corpus',
        summaryText: `To support an annual lifestyle budget of ${annualSpend.toLocaleString()} perpetually at a ${(swr * 100).toFixed(1)}% safe withdrawal rate, you require an accumulated liquid corpus of ${Math.round(corpus).toLocaleString()}.`,
        details: [
          { label: 'Annual Lifestyle Expenditure', value: annualSpend.toLocaleString() },
          { label: 'Safe Withdrawal Rate (SWR)', value: `${(swr * 100).toFixed(1)}%` },
          { label: 'Perpetual Runway Longevity', value: 'Perpetual / Multi-Generational' },
        ],
      };
    }

    default: {
      const p = params.val1 || 10000;
      const r = (params.val2 || 8) / 100;
      const t = params.val3 || 5;
      const res = p * (1 + r * t);
      return {
        headlineValue: Math.round(res).toLocaleString(),
        headlineLabel: 'Simulated Output',
        summaryText: 'Computed institutional baseline return for the specified financial metrics.',
        details: [
          { label: 'Base Principal', value: p.toLocaleString() },
          { label: 'Calculated Yield / Return', value: Math.round(res - p).toLocaleString() },
        ],
      };
    }
  }
}
