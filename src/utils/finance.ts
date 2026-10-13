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

    case 'stepup-sip': {
      let monthly = params.monthly || 2000;
      const rate = (params.rate || 12) / 100 / 12;
      const years = params.years || 15;
      const annualStepUp = (params.stepUp || 10) / 100;
      let totalInvested = 0;
      let corpus = 0;
      for (let y = 1; y <= years; y++) {
        for (let m = 1; m <= 12; m++) {
          corpus = (corpus + monthly) * (1 + rate);
          totalInvested += monthly;
        }
        monthly *= (1 + annualStepUp);
      }
      return {
        headlineValue: Math.round(corpus).toLocaleString(),
        headlineLabel: 'Step-Up Corpus Target',
        summaryText: `Increasing contributions by ${params.stepUp || 10}% annually turns disciplined cashflow into an accelerated corpus of ${Math.round(corpus).toLocaleString()}.`,
        details: [
          { label: 'Cumulative Invested Capital', value: Math.round(totalInvested).toLocaleString() },
          { label: 'Estimated Compounded Wealth Gain', value: Math.round(corpus - totalInvested).toLocaleString() },
          { label: 'Final Monthly Contribution', value: Math.round(monthly / (1 + annualStepUp)).toLocaleString() },
        ],
      };
    }

    case 'lumpsum': {
      const p = params.principal || 100000;
      const r = (params.rate || 10) / 100;
      const t = params.years || 10;
      const fv = p * Math.pow(1 + r, t);
      return {
        headlineValue: Math.round(fv).toLocaleString(),
        headlineLabel: 'Maturity Value',
        summaryText: `Deploying ${p.toLocaleString()} at ${params.rate || 10}% per annum compounds to ${Math.round(fv).toLocaleString()} over ${t} years.`,
        details: [
          { label: 'Deployed Principal', value: p.toLocaleString() },
          { label: 'Capital Gain Created', value: Math.round(fv - p).toLocaleString() },
          { label: 'Total Growth Multiple', value: `${(fv / p).toFixed(2)}x` },
        ],
      };
    }

    case 'rent-vs-buy': {
      const propertyPrice = params.propertyPrice || 1200000;
      const rent = params.monthlyRent || 4000;
      const years = params.years || 15;
      const buyEquity = propertyPrice * Math.pow(1.04, years) - propertyPrice * 0.2; // approx 4% appreciation - remaining debt
      const rentInvestedWealth = (propertyPrice * 0.25) * Math.pow(1.09, years); // invested downpayment at 9%
      return {
        headlineValue: buyEquity > rentInvestedWealth ? 'Buying Favored' : 'Renting + Investing Favored',
        headlineLabel: 'Financial Advantage Decision',
        summaryText: `Over a ${years}-year horizon, net projected wealth from acquiring real property is ${Math.round(buyEquity).toLocaleString()} vs ${Math.round(rentInvestedWealth).toLocaleString()} from renting and compounding the down payment in equities.`,
        details: [
          { label: 'Projected Net Property Equity', value: Math.round(buyEquity).toLocaleString() },
          { label: 'Alternative Investment Portfolio', value: Math.round(rentInvestedWealth).toLocaleString() },
          { label: 'Net Generational Spread', value: Math.abs(Math.round(buyEquity - rentInvestedWealth)).toLocaleString() },
        ],
      };
    }

    case 'home-affordability': {
      const grossIncome = params.income || 15000;
      const monthlyDebt = params.debt || 2500;
      const rate = (params.rate || 5.5) / 100 / 12;
      const maxMonthlyPayment = (grossIncome * 0.40) - monthlyDebt;
      const n = (params.tenure || 25) * 12;
      const maxLoan = maxMonthlyPayment > 0 ? maxMonthlyPayment * ((1 - Math.pow(1 + rate, -n)) / rate) : 0;
      const maxProperty = maxLoan / 0.8; // 80% LTV
      return {
        headlineValue: Math.round(maxProperty).toLocaleString(),
        headlineLabel: 'Maximum Property Purchase Budget',
        summaryText: `Based on verified monthly earnings of ${grossIncome.toLocaleString()} and a 40% debt ceiling, you can underwrite property up to ${Math.round(maxProperty).toLocaleString()}.`,
        details: [
          { label: 'Maximum Mortgage Capacity', value: Math.round(maxLoan).toLocaleString() },
          { label: 'Allowable Monthly Debt Service', value: Math.round(maxMonthlyPayment).toLocaleString() },
          { label: 'Assumed Down Payment (20%)', value: Math.round(maxProperty * 0.2).toLocaleString() },
        ],
      };
    }

    case 'loan-refinance': {
      const balance = params.loanAmount || 600000;
      const currentRate = params.currentRate || 6.5;
      const newRate = params.newRate || 4.5;
      const years = params.tenure || 20;
      const currentEmi = emiFormula(balance, currentRate, years);
      const newEmi = emiFormula(balance, newRate, years);
      const monthlySavings = currentEmi - newEmi;
      const totalSavings = monthlySavings * years * 12;
      return {
        headlineValue: Math.round(totalSavings).toLocaleString(),
        headlineLabel: 'Lifetime Interest Savings',
        summaryText: `Refinancing from ${currentRate}% to ${newRate}% reduces monthly mortgage outflow by ${Math.round(monthlySavings).toLocaleString()}, saving ${Math.round(totalSavings).toLocaleString()} over ${years} years.`,
        details: [
          { label: 'Current Monthly Payment', value: Math.round(currentEmi).toLocaleString() },
          { label: 'New Refinanced Payment', value: Math.round(newEmi).toLocaleString() },
          { label: 'Monthly Cash Flow Surplus', value: Math.round(monthlySavings).toLocaleString() },
        ],
      };
    }

    case 'real-estate-tax-shield': {
      const propertyValue = params.propertyValue || 1000000;
      const buildingShare = 0.80; // 80% building, 20% land
      const annualDepreciation = (propertyValue * buildingShare) / 27.5; // US residential schedule
      const taxBracket = (params.taxBracket || 35) / 100;
      const annualTaxSavings = annualDepreciation * taxBracket;
      return {
        headlineValue: Math.round(annualTaxSavings).toLocaleString(),
        headlineLabel: 'Annual Depreciation Tax Shield',
        summaryText: `Depreciating the improvement basis over 27.5 years shields ${Math.round(annualDepreciation).toLocaleString()} of rental income, delivering an estimated ${Math.round(annualTaxSavings).toLocaleString()} in annual tax savings.`,
        details: [
          { label: 'Depreciable Building Basis', value: Math.round(propertyValue * buildingShare).toLocaleString() },
          { label: 'Annual Non-Cash Depreciation Write-Off', value: Math.round(annualDepreciation).toLocaleString() },
          { label: 'Effective Marginal Tax Relief', value: `${(taxBracket * 100).toFixed(0)}%` },
        ],
      };
    }

    case 'inflation': {
      const currentCost = params.amount || 100000;
      const inflation = (params.rate || 4.5) / 100;
      const years = params.years || 15;
      const futureCost = currentCost * Math.pow(1 + inflation, years);
      const purchasingPowerDrop = ((futureCost - currentCost) / futureCost) * 100;
      return {
        headlineValue: Math.round(futureCost).toLocaleString(),
        headlineLabel: 'Future Adjusted Living Cost',
        summaryText: `At an average annual inflation rate of ${params.rate || 4.5}%, purchasing power of ${currentCost.toLocaleString()} degrades, requiring ${Math.round(futureCost).toLocaleString()} in ${years} years.`,
        details: [
          { label: 'Current Purchasing Basket', value: currentCost.toLocaleString() },
          { label: 'Cumulative Price Inflation', value: `+${(((futureCost / currentCost) - 1) * 100).toFixed(1)}%` },
          { label: 'Purchasing Power Erosion', value: `-${purchasingPowerDrop.toFixed(1)}%` },
        ],
      };
    }

    case 'swp': {
      const corpus = params.principal || 1500000;
      const monthlyWithdrawal = params.monthly || 8000;
      const returnRate = (params.rate || 8) / 100 / 12;
      let balance = corpus;
      let months = 0;
      while (balance > 0 && months < 600) {
        balance = (balance * (1 + returnRate)) - monthlyWithdrawal;
        months++;
      }
      const yearsRunway = (months / 12).toFixed(1);
      return {
        headlineValue: months >= 600 ? 'Perpetual Runway' : `${yearsRunway} Years`,
        headlineLabel: 'Portfolio Longevity Horizon',
        summaryText: `Withdrawing ${monthlyWithdrawal.toLocaleString()} monthly from a ${corpus.toLocaleString()} portfolio compounding at ${params.rate || 8}% per annum provides ${months >= 600 ? 'perpetual solvency' : `${yearsRunway} years of dependable runway`}.`,
        details: [
          { label: 'Initial Investment Capital', value: corpus.toLocaleString() },
          { label: 'Annual Cash Distribution', value: (monthlyWithdrawal * 12).toLocaleString() },
          { label: 'Annualized Withdrawal Ratio', value: `${(((monthlyWithdrawal * 12) / corpus) * 100).toFixed(2)}%` },
        ],
      };
    }

    case 'fd-rd': {
      const principal = params.principal || 500000;
      const rate = (params.rate || 7.2) / 100;
      const years = params.years || 5;
      const maturity = principal * Math.pow(1 + rate / 4, years * 4); // Quarterly compounding
      return {
        headlineValue: Math.round(maturity).toLocaleString(),
        headlineLabel: 'Guaranteed Maturity Value',
        summaryText: `Locking in ${principal.toLocaleString()} at ${params.rate || 7.2}% with quarterly compounding yields ${Math.round(maturity).toLocaleString()} on maturity.`,
        details: [
          { label: 'Deposit Principal', value: principal.toLocaleString() },
          { label: 'Total Interest Earned', value: Math.round(maturity - principal).toLocaleString() },
          { label: 'Compounding Frequency', value: 'Quarterly Statutory Compound' },
        ],
      };
    }

    case 'gold-investment': {
      const amount = params.amount || 250000;
      const rate = (params.rate || 9.5) / 100;
      const years = params.years || 10;
      const finalVal = amount * Math.pow(1 + rate, years);
      return {
        headlineValue: Math.round(finalVal).toLocaleString(),
        headlineLabel: 'Estimated Bullion Valuation',
        summaryText: `Holding physical bullion or sovereign gold instruments of ${amount.toLocaleString()} at a historical ${params.rate || 9.5}% return yields ${Math.round(finalVal).toLocaleString()} in ${years} years.`,
        details: [
          { label: 'Acquisition Capital', value: amount.toLocaleString() },
          { label: 'Inflation Hedge Surplus', value: Math.round(finalVal - amount).toLocaleString() },
          { label: 'Historical Holding Period', value: `${years} years` },
        ],
      };
    }

    case 'salary-take-home': {
      const grossSalary = params.salary || 120000;
      const taxRate = (params.taxRate || 22) / 100;
      const statutoryPension = grossSalary * 0.05; // 5% pension / CPF / provident fund
      const taxes = grossSalary * taxRate;
      const netTakeHome = grossSalary - taxes - statutoryPension;
      return {
        headlineValue: Math.round(netTakeHome / 12).toLocaleString(),
        headlineLabel: 'Net Monthly In-Hand Compensation',
        summaryText: `On an annual gross compensation of ${grossSalary.toLocaleString()}, after ${(taxRate * 100).toFixed(0)}% income tax and statutory contributions, monthly net distribution is ${Math.round(netTakeHome / 12).toLocaleString()}.`,
        details: [
          { label: 'Annual Gross Compensation', value: grossSalary.toLocaleString() },
          { label: 'Annual Statutory Tax Liability', value: Math.round(taxes).toLocaleString() },
          { label: 'Annual Net Disposable Income', value: Math.round(netTakeHome).toLocaleString() },
        ],
      };
    }

    case 'gratuity': {
      const lastSalary = params.salary || 150000;
      const serviceYears = params.years || 12;
      const gratuity = Math.round((15 * lastSalary * serviceYears) / 26);
      return {
        headlineValue: gratuity.toLocaleString(),
        headlineLabel: 'Statutory Gratuity Entitlement',
        summaryText: `Under standard statutory employment guidelines, a tenure of ${serviceYears} completed years with a monthly basic salary of ${lastSalary.toLocaleString()} entitles you to ${gratuity.toLocaleString()}.`,
        details: [
          { label: 'Basic Monthly Salary', value: lastSalary.toLocaleString() },
          { label: 'Completed Service Tenure', value: `${serviceYears} years` },
          { label: 'Statutory Multiplier', value: '15/26 Days per Year of Service' },
        ],
      };
    }

    case 'provident-fund': {
      const basic = params.salary || 8000;
      const rate = 0.0815; // standard EPF/CPF ~ 8.15% - 2.5%
      const years = params.years || 20;
      const monthlyContribution = basic * 0.24; // 12% employee + 12% employer
      let corpus = 0;
      for (let m = 1; m <= years * 12; m++) {
        corpus = (corpus + monthlyContribution) * (1 + rate / 12);
      }
      return {
        headlineValue: Math.round(corpus).toLocaleString(),
        headlineLabel: 'Retirement Provident Corpus',
        summaryText: `Combined statutory provident fund contributions of ${Math.round(monthlyContribution).toLocaleString()} monthly over ${years} years build a retirement reserve of ${Math.round(corpus).toLocaleString()}.`,
        details: [
          { label: 'Monthly Combined Contribution', value: Math.round(monthlyContribution).toLocaleString() },
          { label: 'Total Principal Deployed', value: Math.round(monthlyContribution * years * 12).toLocaleString() },
          { label: 'Compound Interest Benefit', value: Math.round(corpus - monthlyContribution * years * 12).toLocaleString() },
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
