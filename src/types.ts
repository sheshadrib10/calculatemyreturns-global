export type CurrencyCode =
  | 'SGD'
  | 'MYR'
  | 'INR'
  | 'AED'
  | 'USD'
  | 'GBP'
  | 'AUD'
  | 'CAD'
  | 'EUR'
  | 'CHF'
  | 'HKD'
  | 'JPY'
  | 'NZD'
  | 'LKR';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  locale: string;
  countryName: string;
  flag: string;
  defaultPrice: number;
  priceStep: number;
  defaultRent: number;
  rentStep: number;
}

export type JurisdictionCode = 'SG' | 'MY' | 'IN' | 'AE' | 'US' | 'GB' | 'AU' | 'CA' | 'CH' | 'LK' | 'NZ';

export type BuyerStatus = 'citizen' | 'pr' | 'foreigner' | 'company';

export interface JurisdictionTaxRules {
  code: JurisdictionCode;
  name: string;
  currency: CurrencyCode;
  flag: string;
  tagline: string;
  stampDutyName: string;
  buyerStatusOptions: { id: BuyerStatus; label: string; desc: string }[];
  capitalGainsTaxRateDesc: string;
  rentalIncomeTaxDesc: string;
  keyBenefits: string[];
  calculateAcquisitionTaxes: (price: number, status: BuyerStatus, propertyCount?: number) => {
    standardStampDuty: number;
    additionalDuty: number;
    legalAndAdmin: number;
    totalAcquisitionCosts: number;
    breakdown: { label: string; amount: number; rateStr: string }[];
  };
  calculateExitTaxes: (capitalGain: number, holdingYears: number, status: BuyerStatus) => {
    cgtAmount: number;
    effectiveRate: number;
    notes: string;
  };
}

export interface PropertyInputs {
  propertyCost: number;
  downPaymentPercent: number;
  loanRate: number;
  loanTenure: number;
  holdingPeriod: number;
  appreciationRate: number;
  monthlyRent: number;
  rentHike: number;
  monthlyMaintenance: number;
  maintenanceHike: number;
  vacancyWeeksPerYear: number;
  buyerStatus: BuyerStatus;
  propertyCount: number;
}

export interface YearProjection {
  year: number;
  propertyValue: number;
  loanBalance: number;
  equity: number;
  grossRent: number;
  effectiveRent: number;
  emiPaid: number;
  principalPaid: number;
  interestPaid: number;
  maintenancePaid: number;
  netCashFlow: number;
  cumulativeCashFlow: number;
}

export interface PropertySimulationResult {
  loanAmount: number;
  downPaymentAmount: number;
  acquisitionCosts: number;
  totalCashInvested: number;
  monthlyEmi: number;
  grossRentalYield: number;
  netRentalYield: number;
  capRate: number;
  initialMonthlyCashFlow: number;
  exitPropertyValue: number;
  exitLoanBalance: number;
  grossEquityAtExit: number;
  exitTaxes: number;
  netEquityAtExit: number;
  totalNetProfit: number;
  equityMultiple: number;
  irr: number | null;
  cashOnCashReturn: number;
  acquisitionBreakdown: { label: string; amount: number; rateStr: string }[];
  yearlyProjections: YearProjection[];
}

export interface AiAuditReport {
  score: number; // 0-100
  rating: 'Exceptional Prime' | 'Strong Yield' | 'Balanced Growth' | 'Speculative / High Leverage' | 'Sub-optimal Return';
  headline: string;
  executiveSummary: string;
  taxStrategy: string;
  stressTest: {
    interestShock: string;
    vacancyShock: string;
    exitDownside: string;
  };
  keyAdvantages: string[];
  riskWarnings: string[];
  recommendations: string[];
}

export interface CalculatorItem {
  id: string;
  name: string;
  desc: string;
  category: string;
  isFlagship?: boolean;
  jurisdictionTags?: JurisdictionCode[];
  iconName: string;
  formulaSummary: string;
  quickInputs?: { label: string; defaultVal: number; suffix?: string; prefix?: string }[];
}

export interface CalculatorCategory {
  name: string;
  description: string;
  items: CalculatorItem[];
}
