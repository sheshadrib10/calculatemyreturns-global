import { CurrencyCode, CurrencyConfig, JurisdictionCode, JurisdictionTaxRules } from '../types';

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  SGD: {
    code: 'SGD',
    symbol: 'S$',
    name: 'Singapore Dollar',
    locale: 'en-SG',
    countryName: 'Singapore',
    flag: '🇸🇬',
    defaultPrice: 2200000,
    priceStep: 50000,
    defaultRent: 5800,
    rentStep: 100,
  },
  MYR: {
    code: 'MYR',
    symbol: 'RM',
    name: 'Malaysian Ringgit',
    locale: 'en-MY',
    countryName: 'Malaysia',
    flag: '🇲🇾',
    defaultPrice: 1200000,
    priceStep: 25000,
    defaultRent: 3800,
    rentStep: 100,
  },
  INR: {
    code: 'INR',
    symbol: '₹',
    name: 'Indian Rupee',
    locale: 'en-IN',
    countryName: 'India',
    flag: '🇮🇳',
    defaultPrice: 12000000, // 1.2 Crore
    priceStep: 250000,
    defaultRent: 35000,
    rentStep: 1000,
  },
  AED: {
    code: 'AED',
    symbol: 'AED ',
    name: 'UAE Dirham',
    locale: 'en-AE',
    countryName: 'United Arab Emirates',
    flag: '🇦🇪',
    defaultPrice: 2500000,
    priceStep: 50000,
    defaultRent: 15000,
    rentStep: 500,
  },
  USD: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
    locale: 'en-US',
    countryName: 'United States',
    flag: '🇺🇸',
    defaultPrice: 850000,
    priceStep: 25000,
    defaultRent: 3600,
    rentStep: 100,
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    name: 'British Pound',
    locale: 'en-GB',
    countryName: 'United Kingdom',
    flag: '🇬🇧',
    defaultPrice: 650000,
    priceStep: 20000,
    defaultRent: 2400,
    rentStep: 50,
  },
  AUD: {
    code: 'AUD',
    symbol: 'A$',
    name: 'Australian Dollar',
    locale: 'en-AU',
    countryName: 'Australia',
    flag: '🇦🇺',
    defaultPrice: 950000,
    priceStep: 25000,
    defaultRent: 3200,
    rentStep: 50,
  },
  CAD: {
    code: 'CAD',
    symbol: 'C$',
    name: 'Canadian Dollar',
    locale: 'en-CA',
    countryName: 'Canada',
    flag: '🇨🇦',
    defaultPrice: 900000,
    priceStep: 25000,
    defaultRent: 3100,
    rentStep: 50,
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    name: 'Euro',
    locale: 'de-DE',
    countryName: 'European Union',
    flag: '🇪🇺',
    defaultPrice: 750000,
    priceStep: 25000,
    defaultRent: 2600,
    rentStep: 50,
  },
  CHF: {
    code: 'CHF',
    symbol: 'CHF ',
    name: 'Swiss Franc',
    locale: 'de-CH',
    countryName: 'Switzerland',
    flag: '🇨🇭',
    defaultPrice: 1500000,
    priceStep: 50000,
    defaultRent: 4200,
    rentStep: 100,
  },
  HKD: {
    code: 'HKD',
    symbol: 'HK$',
    name: 'Hong Kong Dollar',
    locale: 'en-HK',
    countryName: 'Hong Kong',
    flag: '🇭🇰',
    defaultPrice: 11000000,
    priceStep: 250000,
    defaultRent: 28000,
    rentStep: 500,
  },
  JPY: {
    code: 'JPY',
    symbol: '¥',
    name: 'Japanese Yen',
    locale: 'ja-JP',
    countryName: 'Japan',
    flag: '🇯🇵',
    defaultPrice: 85000000,
    priceStep: 1000000,
    defaultRent: 280000,
    rentStep: 5000,
  },
  NZD: {
    code: 'NZD',
    symbol: 'NZ$',
    name: 'New Zealand Dollar',
    locale: 'en-NZ',
    countryName: 'New Zealand',
    flag: '🇳🇿',
    defaultPrice: 850000,
    priceStep: 25000,
    defaultRent: 2800,
    rentStep: 50,
  },
  LKR: {
    code: 'LKR',
    symbol: 'Rs ',
    name: 'Sri Lankan Rupee',
    locale: 'en-LK',
    countryName: 'Sri Lanka',
    flag: '🇱🇰',
    defaultPrice: 45000000,
    priceStep: 1000000,
    defaultRent: 180000,
    rentStep: 5000,
  },
};

export const JURISDICTIONS: Record<JurisdictionCode, JurisdictionTaxRules> = {
  SG: {
    code: 'SG',
    name: 'Singapore',
    currency: 'SGD',
    flag: '🇸🇬',
    tagline: 'Tier-1 Asian Safe-Haven & Zero Capital Gains Hub',
    stampDutyName: "Buyer's Stamp Duty (BSD) + ABSD",
    buyerStatusOptions: [
      { id: 'citizen', label: 'Singapore Citizen', desc: '0% ABSD on 1st residential property, 20% on 2nd, 30% on 3rd+' },
      { id: 'pr', label: 'Singapore PR', desc: '5% ABSD on 1st residential property, 30% on 2nd, 35% on 3rd+' },
      { id: 'foreigner', label: 'Foreign Buyer', desc: 'Flat 60% ABSD (except US/Iceland/Norway/Swiss FTA nationals)' },
      { id: 'company', label: 'Entity / Corporate Trust', desc: '65% ABSD across residential transactions' },
    ],
    capitalGainsTaxRateDesc: '0% Capital Gains Tax (Zero CGT for individual investors in Singapore)',
    rentalIncomeTaxDesc: 'Taxed at progressive individual brackets with 15% flat statutory deemed expense deduction or actual mortgage interest and repairs.',
    keyBenefits: [
      'Zero Capital Gains Tax upon property disposal',
      'Zero Estate Duty / Inheritance Tax',
      'CPF Ordinary Account can service down payment and monthly mortgage',
      'Triple-A sovereign credit rating and high rental occupancy stability',
    ],
    calculateAcquisitionTaxes: (price, status, propertyCount = 1) => {
      // Tiered BSD:
      // 1st $180,000 @ 1%
      // Next $180,000 @ 2%
      // Next $640,000 ($360k to $1M) @ 3%
      // Next $500,000 ($1M to $1.5M) @ 4%
      // Next $1,500,000 ($1.5M to $3M) @ 5%
      // Remainder above $3M @ 6%
      let bsd = 0;
      let remaining = price;

      const t1 = Math.min(remaining, 180000);
      bsd += t1 * 0.01;
      remaining -= t1;

      if (remaining > 0) {
        const t2 = Math.min(remaining, 180000);
        bsd += t2 * 0.02;
        remaining -= t2;
      }
      if (remaining > 0) {
        const t3 = Math.min(remaining, 640000);
        bsd += t3 * 0.03;
        remaining -= t3;
      }
      if (remaining > 0) {
        const t4 = Math.min(remaining, 500000);
        bsd += t4 * 0.04;
        remaining -= t4;
      }
      if (remaining > 0) {
        const t5 = Math.min(remaining, 1500000);
        bsd += t5 * 0.05;
        remaining -= t5;
      }
      if (remaining > 0) {
        bsd += remaining * 0.06;
      }

      // ABSD calculation
      let absdRate = 0;
      if (status === 'citizen') {
        absdRate = propertyCount === 1 ? 0.0 : propertyCount === 2 ? 0.20 : 0.30;
      } else if (status === 'pr') {
        absdRate = propertyCount === 1 ? 0.05 : propertyCount === 2 ? 0.30 : 0.35;
      } else if (status === 'foreigner') {
        absdRate = 0.60;
      } else {
        absdRate = 0.65;
      }
      const absd = price * absdRate;
      const legal = Math.min(Math.max(price * 0.0015, 2500), 5500);

      return {
        standardStampDuty: Math.round(bsd),
        additionalDuty: Math.round(absd),
        legalAndAdmin: Math.round(legal),
        totalAcquisitionCosts: Math.round(bsd + absd + legal),
        breakdown: [
          { label: "Buyer's Stamp Duty (BSD Tiered 1%-6%)", amount: Math.round(bsd), rateStr: `${((bsd / price) * 100).toFixed(2)}% eff.` },
          { label: `Additional Buyer's Stamp Duty (ABSD - ${status})`, amount: Math.round(absd), rateStr: `${(absdRate * 100).toFixed(0)}%` },
          { label: 'Conveyancing Legal Fees & Registration', amount: Math.round(legal), rateStr: 'Fixed/Scale' },
        ],
      };
    },
    calculateExitTaxes: (_capitalGain, holdingYears) => {
      // Seller's Stamp Duty (SSD): sold within 3 years
      // yr 1: 12%, yr 2: 8%, yr 3: 4%, yr 4+: 0%
      let ssdDesc = '0% Capital Gains Tax';
      if (holdingYears < 1) ssdDesc = '12% Seller Stamp Duty (sold <1 yr)';
      else if (holdingYears < 2) ssdDesc = '8% Seller Stamp Duty (sold <2 yrs)';
      else if (holdingYears < 3) ssdDesc = '4% Seller Stamp Duty (sold <3 yrs)';
      return {
        cgtAmount: 0,
        effectiveRate: 0,
        notes: `Zero Capital Gains Tax in Singapore. ${ssdDesc}`,
      };
    },
  },

  MY: {
    code: 'MY',
    name: 'Malaysia',
    currency: 'MYR',
    flag: '🇲🇾',
    tagline: 'High-Yield Southeast Asian Gateway & MM2H Friendly',
    stampDutyName: 'Memorandum of Transfer (MOT) + Loan Stamp Duty',
    buyerStatusOptions: [
      { id: 'citizen', label: 'Malaysian Citizen', desc: 'Full eligibility, 0% RPGT after year 5, no foreign minimum threshold' },
      { id: 'pr', label: 'Permanent Resident', desc: 'Treated on parity with citizens for stamp duty and RPGT tiers' },
      { id: 'foreigner', label: 'Foreign Investor / MM2H', desc: 'Subject to state price floors (RM 1M-2M), 10% RPGT from Year 6' },
      { id: 'company', label: 'Corporate Entity', desc: 'Commercial & corporate holding, 10% RPGT from Year 6' },
    ],
    capitalGainsTaxRateDesc: 'Real Property Gains Tax (RPGT): 0% after 5 years for citizens; 10% for foreigners.',
    rentalIncomeTaxDesc: 'Progressive rates up to 30% after deducting assessment tax, quit rent, fire insurance, and mortgage interest.',
    keyBenefits: [
      '0% Real Property Gains Tax (RPGT) after 5 full holding years for citizens',
      'Freehold ownership available across premier masterplans (KLCC, Mont Kiara, Penang)',
      'Competitive gross yields between 4.8% and 6.5%',
      'Low cost of living and attractive MM2H visa pathways',
    ],
    calculateAcquisitionTaxes: (price, status) => {
      // MOT Stamp Duty Scale:
      // First RM 100k @ 1%
      // RM 100,001 to RM 500,000 @ 2%
      // RM 500,001 to RM 1,000,000 @ 3%
      // Amount exceeding RM 1,000,000 @ 4%
      let mot = 0;
      let rem = price;

      const t1 = Math.min(rem, 100000);
      mot += t1 * 0.01;
      rem -= t1;

      if (rem > 0) {
        const t2 = Math.min(rem, 400000);
        mot += t2 * 0.02;
        rem -= t2;
      }
      if (rem > 0) {
        const t3 = Math.min(rem, 500000);
        mot += t3 * 0.03;
        rem -= t3;
      }
      if (rem > 0) {
        mot += rem * 0.04;
      }

      // Legal fees scale (Solicitors' Remuneration Order) ~ 0.75%
      const legal = Math.min(Math.max(price * 0.0075, 4500), 20000);
      // Loan stamp duty ~ 0.5% of loan (assume 80% LTV = 0.4% of price)
      const loanStamp = price * 0.8 * 0.005;
      // State consent fee for foreigners if applicable
      const foreignConsent = status === 'foreigner' ? Math.max(price * 0.01, 10000) : 0;

      return {
        standardStampDuty: Math.round(mot),
        additionalDuty: Math.round(foreignConsent),
        legalAndAdmin: Math.round(legal + loanStamp),
        totalAcquisitionCosts: Math.round(mot + foreignConsent + legal + loanStamp),
        breakdown: [
          { label: 'MOT Stamp Duty on Title Transfer (Tiered 1%-4%)', amount: Math.round(mot), rateStr: `${((mot / price) * 100).toFixed(2)}% eff.` },
          { label: 'Legal Fees (Solicitors Remuneration Order)', amount: Math.round(legal), rateStr: '~0.75%' },
          { label: 'Loan Agreement Stamp Duty', amount: Math.round(loanStamp), rateStr: '0.5% of loan' },
          ...(status === 'foreigner' ? [{ label: 'State Consent & Foreign Levy', amount: Math.round(foreignConsent), rateStr: '~1.0%' }] : []),
        ],
      };
    },
    calculateExitTaxes: (capitalGain, holdingYears, status) => {
      // RPGT Rates:
      // Citizens: <3y: 30%, 4th y: 20%, 5th y: 15%, 6th y+: 0%
      // Foreigners: <5y: 30%, 6th y+: 10%
      let rate = 0;
      if (status === 'citizen' || status === 'pr') {
        if (holdingYears <= 3) rate = 0.30;
        else if (holdingYears === 4) rate = 0.20;
        else if (holdingYears === 5) rate = 0.15;
        else rate = 0.0;
      } else {
        rate = holdingYears <= 5 ? 0.30 : 0.10;
      }
      const cgt = Math.max(0, capitalGain * rate);
      return {
        cgtAmount: Math.round(cgt),
        effectiveRate: rate,
        notes: `RPGT rate ${rate * 100}% based on ${holdingYears}-year hold for ${status}.`,
      };
    },
  },

  IN: {
    code: 'IN',
    name: 'India',
    currency: 'INR',
    flag: '🇮🇳',
    tagline: 'High Capital Growth Megamarket & Real Estate Expansion',
    stampDutyName: 'State Stamp Duty + Registration Charges',
    buyerStatusOptions: [
      { id: 'citizen', label: 'Resident Indian', desc: 'Standard stamp duty, Sec 24(b) interest deduction, 12.5% LTCG' },
      { id: 'pr', label: 'NRI / OCI', desc: 'Full parity under FEMA; repatriable investment across residential assets' },
      { id: 'foreigner', label: 'Foreign National', desc: 'FEMA approval restrictions; OCI/PIO permit seamless ownership' },
      { id: 'company', label: 'Indian Corporate / LLP', desc: 'Corporate tax slabs apply' },
    ],
    capitalGainsTaxRateDesc: 'LTCG: 12.5% flat without indexation (>24 months hold, Budget 2024). STCG: slab rates.',
    rentalIncomeTaxDesc: '30% statutory standard deduction under Section 24(a) + Municipal Taxes deducted + Loan Interest under Section 24(b).',
    keyBenefits: [
      'Standard 30% statutory deduction on gross rental income automatically granted',
      'Unified 12.5% Long-Term Capital Gains (LTCG) tax rate after 24 months',
      'Section 54 / 54EC exemptions for capital gain rollover into residential property or NHAI/REC bonds',
      'Strong demographic urbanization and 8-12% annual capital appreciation in prime micromarkets',
    ],
    calculateAcquisitionTaxes: (price) => {
      // Typical state average: 6% Stamp Duty + 1% Registration + 0.5% Legal/Brokerage
      const stampDuty = price * 0.06;
      const registration = Math.min(price * 0.01, 35000); // Many states cap registration or 1%
      const legal = Math.min(price * 0.005, 50000);
      return {
        standardStampDuty: Math.round(stampDuty),
        additionalDuty: 0,
        legalAndAdmin: Math.round(registration + legal),
        totalAcquisitionCosts: Math.round(stampDuty + registration + legal),
        breakdown: [
          { label: 'State Stamp Duty', amount: Math.round(stampDuty), rateStr: '6.0%' },
          { label: 'Sub-Registrar Registration Fee', amount: Math.round(registration), rateStr: '1.0% (capped)' },
          { label: 'Conveyancing & Legal Verification', amount: Math.round(legal), rateStr: '~0.5%' },
        ],
      };
    },
    calculateExitTaxes: (capitalGain, holdingYears) => {
      // Budget 2024: holding > 2 yrs = LTCG 12.5% without indexation; else slab rate (~30%)
      const isLTCG = holdingYears >= 2;
      const rate = isLTCG ? 0.125 : 0.30;
      const cgt = Math.max(0, capitalGain * rate);
      return {
        cgtAmount: Math.round(cgt),
        effectiveRate: rate,
        notes: isLTCG ? '12.5% LTCG (Budget 2024 unified rate for >24 month hold)' : '30% STCG (held under 2 years, slab taxed)',
      };
    },
  },

  AE: {
    code: 'AE',
    name: 'UAE / Dubai',
    currency: 'AED',
    flag: '🇦🇪',
    tagline: 'Zero-Tax Luxury Capital & 10-Year Golden Visa Gateway',
    stampDutyName: 'Dubai Land Department (DLD) Transfer Fee',
    buyerStatusOptions: [
      { id: 'foreigner', label: 'International Investor', desc: '100% Freehold ownership in prime designated areas; Golden Visa eligible' },
      { id: 'citizen', label: 'UAE / GCC National', desc: 'Full freehold rights across all territories' },
      { id: 'pr', label: 'UAE Resident', desc: 'Standard DLD rates and local mortgage eligibility up to 80% LTV' },
      { id: 'company', label: 'Offshore / Freezone Entity', desc: 'DIFC / ADGM / JAFZA holding company structures' },
    ],
    capitalGainsTaxRateDesc: '0% Capital Gains Tax (Zero personal capital gains tax in Dubai/UAE)',
    rentalIncomeTaxDesc: '0% Personal Income Tax on rental earnings. 100% tax-free net yield retention.',
    keyBenefits: [
      '0% Personal Income Tax & 0% Capital Gains Tax',
      '0% Annual Municipal Property Tax on owner',
      '10-Year UAE Golden Visa for property values of AED 2,000,000+',
      'Superlative gross rental yields averaging 6.5% - 9.0%',
      'Global liquidity and pegged currency stability (USD 3.6725)',
    ],
    calculateAcquisitionTaxes: (price) => {
      // Dubai Land Department: 4% of purchase price + Admin fee (AED 4,300 for > AED 500k) + Trust fee (AED 4,200)
      const dld = price * 0.04;
      const adminAndTrust = 8500;
      const mortgageReg = price * 0.6 * 0.0025; // 0.25% of loan
      return {
        standardStampDuty: Math.round(dld),
        additionalDuty: 0,
        legalAndAdmin: Math.round(adminAndTrust + mortgageReg),
        totalAcquisitionCosts: Math.round(dld + adminAndTrust + mortgageReg),
        breakdown: [
          { label: 'Dubai Land Department (DLD) Fee', amount: Math.round(dld), rateStr: '4.0%' },
          { label: 'Registration Trustee & Admin Fees', amount: Math.round(adminAndTrust), rateStr: 'Fixed AED 8,500' },
          { label: 'Mortgage Registration (if financed)', amount: Math.round(mortgageReg), rateStr: '0.25% of loan' },
        ],
      };
    },
    calculateExitTaxes: () => {
      return {
        cgtAmount: 0,
        effectiveRate: 0,
        notes: '0% Capital Gains Tax in the UAE. Zero federal exit levy on real estate gains.',
      };
    },
  },

  US: {
    code: 'US',
    name: 'United States',
    currency: 'USD',
    flag: '🇺🇸',
    tagline: 'Deepest Global Capital Pool & 27.5-Year Depreciation Shield',
    stampDutyName: 'Buyer Closing Costs & Title Insurance',
    buyerStatusOptions: [
      { id: 'citizen', label: 'US Citizen / Tax Resident', desc: 'Full mortgage deduction, 1031 Exchange, standard 15-20% LTCG' },
      { id: 'pr', label: 'Green Card Holder', desc: 'Identical treatment to US citizens for real estate deductions' },
      { id: 'foreigner', label: 'Foreign Buyer (Non-Resident)', desc: 'Subject to FIRPTA 15% gross withholding at exit; 1031 eligible' },
      { id: 'company', label: 'LLC / Corporate Structure', desc: 'Pass-through liability protection and business deductions' },
    ],
    capitalGainsTaxRateDesc: 'Federal LTCG (15%-20%) + 3.8% NIIT + State Tax. 100% deferrable via IRC §1031 Exchange.',
    rentalIncomeTaxDesc: 'Taxable after full deduction of mortgage interest, property taxes, repairs, and 27.5-year straight-line depreciation.',
    keyBenefits: [
      '27.5-year straight-line building depreciation completely shelters rental cash flow from taxable income',
      'IRC §1031 Exchange allows rolling 100% of capital gains into new property with zero current tax',
      'Uncapped deduction of mortgage interest, property taxes, and operational expenses against rental profits',
      'World-leading mortgage liquidity and multi-family / single-family asset depth',
    ],
    calculateAcquisitionTaxes: (price) => {
      // Typical buyer closing costs: ~2.5% to 3.5% (title insurance, escrow, recording, loan origination)
      const closing = price * 0.03;
      return {
        standardStampDuty: Math.round(closing),
        additionalDuty: 0,
        legalAndAdmin: Math.round(price * 0.005),
        totalAcquisitionCosts: Math.round(closing + price * 0.005),
        breakdown: [
          { label: 'Escrow, Title Insurance & Settlement', amount: Math.round(closing), rateStr: '~3.0%' },
          { label: 'Recording Fees & Legal Representation', amount: Math.round(price * 0.005), rateStr: '~0.5%' },
        ],
      };
    },
    calculateExitTaxes: (capitalGain, holdingYears) => {
      // Assume 20% Fed LTCG + 3.8% NIIT = 23.8% (unless 1031 exchanged)
      const isLTCG = holdingYears >= 1;
      const rate = isLTCG ? 0.238 : 0.35;
      const cgt = Math.max(0, capitalGain * rate);
      return {
        cgtAmount: Math.round(cgt),
        effectiveRate: rate,
        notes: `Estimated ${(rate * 100).toFixed(1)}% blended capital gains tax (Can be 100% deferred using IRC §1031 Exchange).`,
      };
    },
  },

  GB: {
    code: 'GB',
    name: 'United Kingdom',
    currency: 'GBP',
    flag: '🇬🇧',
    tagline: 'Global Prime Financial Centre & Sterling Institutional Stability',
    stampDutyName: 'Stamp Duty Land Tax (SDLT)',
    buyerStatusOptions: [
      { id: 'citizen', label: 'UK Resident (Primary Home)', desc: 'Standard residential SDLT tiers, 0% on first £250,000' },
      { id: 'pr', label: 'UK Resident (Additional / BTL)', desc: '+3% SDLT surcharge across all bands for second homes & buy-to-let' },
      { id: 'foreigner', label: 'Non-UK Resident Buyer', desc: '+3% additional property surcharge + 2% non-resident surcharge (+5% total)' },
      { id: 'company', label: 'SPV / Limited Company', desc: '+3% SDLT surcharge; Section 24 restriction circumvented via corporate tax' },
    ],
    capitalGainsTaxRateDesc: '18% (basic) or 24% (higher rate) for residential property disposal.',
    rentalIncomeTaxDesc: 'Section 24 applies: mortgage interest is not deductible; landlords receive a 20% basic rate tax credit.',
    keyBenefits: [
      'Prime Central London (PCL) long-term wealth preservation and global liquidity',
      'Corporate SPV structure enables full mortgage finance cost deduction against 25% corporation tax',
      'Strong legal protections, leasehold reform, and transparent Land Registry',
    ],
    calculateAcquisitionTaxes: (price, status) => {
      // Standard residential SDLT bands:
      // Up to £250k: 0%
      // £250k to £925k: 5%
      // £925k to £1.5M: 10%
      // Above £1.5M: 12%
      let sdlt = 0;
      let rem = price;

      const t1 = Math.min(rem, 250000);
      rem -= t1;

      if (rem > 0) {
        const t2 = Math.min(rem, 675000);
        sdlt += t2 * 0.05;
        rem -= t2;
      }
      if (rem > 0) {
        const t3 = Math.min(rem, 575000);
        sdlt += t3 * 0.10;
        rem -= t3;
      }
      if (rem > 0) {
        sdlt += rem * 0.12;
      }

      // Surcharges:
      // BTL / Additional: 3%
      // Non-resident: 2%
      let surchargeRate = 0;
      if (status === 'pr' || status === 'company') surchargeRate = 0.03;
      else if (status === 'foreigner') surchargeRate = 0.05;

      const surcharge = price * surchargeRate;
      const legal = Math.min(Math.max(price * 0.004, 2000), 7500);

      return {
        standardStampDuty: Math.round(sdlt),
        additionalDuty: Math.round(surcharge),
        legalAndAdmin: Math.round(legal),
        totalAcquisitionCosts: Math.round(sdlt + surcharge + legal),
        breakdown: [
          { label: 'Standard SDLT', amount: Math.round(sdlt), rateStr: `${((sdlt / price) * 100).toFixed(2)}% eff.` },
          ...(surchargeRate > 0 ? [{ label: `SDLT Surcharge (${status === 'foreigner' ? '+3% BTL + 2% Non-Resident' : '+3% Additional Property'})`, amount: Math.round(surcharge), rateStr: `${(surchargeRate * 100).toFixed(0)}%` }] : []),
          { label: 'Solicitor Legal Conveyancing & Land Registry', amount: Math.round(legal), rateStr: '~0.4%' },
        ],
      };
    },
    calculateExitTaxes: (capitalGain) => {
      const cgt = Math.max(0, capitalGain * 0.24);
      return {
        cgtAmount: Math.round(cgt),
        effectiveRate: 0.24,
        notes: '24% Capital Gains Tax rate for residential property disposal (Higher rate).',
      };
    },
  },

  AU: {
    code: 'AU',
    name: 'Australia',
    currency: 'AUD',
    flag: '🇦🇺',
    tagline: 'Negative Gearing Tax Shelter & 50% CGT Exemption',
    stampDutyName: 'State Transfer Duty + Foreign Buyer Surcharge',
    buyerStatusOptions: [
      { id: 'citizen', label: 'Australian Citizen', desc: 'Standard stamp duty, full negative gearing tax deduction, 50% CGT discount' },
      { id: 'pr', label: 'Permanent Resident', desc: 'Same benefits as citizens; exempt from FIRB and foreign buyer stamp duty' },
      { id: 'foreigner', label: 'Foreign Buyer (FIRB)', desc: 'FIRB application fee required + 7% to 8% foreign buyer stamp duty surcharge' },
      { id: 'company', label: 'Discretionary Trust / Company', desc: 'Asset protection structure' },
    ],
    capitalGainsTaxRateDesc: '50% CGT Discount for individual residents holding property for > 12 months.',
    rentalIncomeTaxDesc: 'Negative Gearing: any net rental loss directly reduces taxable salary income, generating significant tax refunds.',
    keyBenefits: [
      'Negative Gearing allows net property losses to reduce personal salary tax bracket',
      '50% Capital Gains Tax discount if held for more than 12 months',
      'High rental demand driven by strong skilled migration into Sydney, Melbourne and Brisbane',
    ],
    calculateAcquisitionTaxes: (price, status) => {
      // State average stamp duty ~ 4.5%
      const baseDuty = price * 0.045;
      const foreignSurcharge = status === 'foreigner' ? price * 0.08 : 0;
      const legal = Math.min(Math.max(price * 0.003, 1800), 5000);
      return {
        standardStampDuty: Math.round(baseDuty),
        additionalDuty: Math.round(foreignSurcharge),
        legalAndAdmin: Math.round(legal),
        totalAcquisitionCosts: Math.round(baseDuty + foreignSurcharge + legal),
        breakdown: [
          { label: 'State Transfer Duty (NSW/VIC/QLD avg)', amount: Math.round(baseDuty), rateStr: '~4.5%' },
          ...(status === 'foreigner' ? [{ label: 'Foreign Purchaser Duty Surcharge', amount: Math.round(foreignSurcharge), rateStr: '8.0%' }] : []),
          { label: 'Conveyancer & Title Settlement', amount: Math.round(legal), rateStr: '~0.3%' },
        ],
      };
    },
    calculateExitTaxes: (capitalGain, holdingYears, status) => {
      const qualifiesForDiscount = holdingYears >= 1 && (status === 'citizen' || status === 'pr');
      const effectiveRate = qualifiesForDiscount ? 0.45 * 0.5 : 0.45; // 45% top marginal rate with 50% discount = 22.5%
      const cgt = Math.max(0, capitalGain * effectiveRate);
      return {
        cgtAmount: Math.round(cgt),
        effectiveRate,
        notes: qualifiesForDiscount ? '22.5% effective rate (50% CGT discount applied for holding > 1 year)' : '45% standard rate without discount',
      };
    },
  },

  CA: {
    code: 'CA',
    name: 'Canada',
    currency: 'CAD',
    flag: '🇨🇦',
    tagline: 'Stable Resource-Backed Wealth & G7 Commercial Resilience',
    stampDutyName: 'Land Transfer Tax (Provincial + Municipal)',
    buyerStatusOptions: [
      { id: 'citizen', label: 'Canadian Citizen', desc: 'Standard provincial/municipal transfer tax; primary residence 100% tax-free' },
      { id: 'pr', label: 'Permanent Resident', desc: 'Treated identically to citizens; exempt from foreign buyer restrictions' },
      { id: 'foreigner', label: 'Foreign Buyer', desc: 'Subject to Federal Prohibition on Non-Canadians (except specific exemptions)' },
      { id: 'company', label: 'Corporation / Holding Co', desc: 'Corporate income tax on passive investment' },
    ],
    capitalGainsTaxRateDesc: '50% (or 66.7% above $250k) capital gains inclusion rate added to taxable income.',
    rentalIncomeTaxDesc: 'Taxed at marginal brackets after deducting mortgage interest, property tax, and optional CCA depreciation.',
    keyBenefits: [
      '100% Principal Residence Exemption from capital gains for primary home',
      'Mortgage interest and all municipal property taxes fully deductible for investment properties',
      'Strong demographic expansion and high rental demand in major hubs (Toronto, Vancouver, Montreal)',
    ],
    calculateAcquisitionTaxes: (price) => {
      // Provincial & municipal LTT combined ~ 2.5% - 4.0%
      const ltt = price * 0.03;
      const legal = Math.min(Math.max(price * 0.003, 1800), 4500);
      return {
        standardStampDuty: Math.round(ltt),
        additionalDuty: 0,
        legalAndAdmin: Math.round(legal),
        totalAcquisitionCosts: Math.round(ltt + legal),
        breakdown: [
          { label: 'Land Transfer Tax (LTT)', amount: Math.round(ltt), rateStr: '~3.0%' },
          { label: 'Closing Legal Representation & Title Search', amount: Math.round(legal), rateStr: '~0.3%' },
        ],
      };
    },
    calculateExitTaxes: (capitalGain) => {
      const inclusionRate = 0.50;
      const topMarginal = 0.50;
      const effectiveRate = inclusionRate * topMarginal; // 25%
      const cgt = Math.max(0, capitalGain * effectiveRate);
      return {
        cgtAmount: Math.round(cgt),
        effectiveRate,
        notes: '25% estimated effective CGT (50% inclusion rate at marginal tax rate).',
      };
    },
  },

  CH: {
    code: 'CH',
    name: 'Switzerland',
    currency: 'CHF',
    flag: '🇨🇭',
    tagline: 'Sovereign Swiss Franc Safe-Haven & Tapered Exit Regime',
    stampDutyName: 'Cantonal Transfer Tax (Handänderungssteuer) & Notary',
    buyerStatusOptions: [
      { id: 'citizen', label: 'Swiss Citizen', desc: 'Unrestricted freehold acquisition across all 26 cantons' },
      { id: 'pr', label: 'C-Permit Holder', desc: 'Treated identically to Swiss citizens for real estate acquisition' },
      { id: 'foreigner', label: 'Foreign Buyer (Lex Koller)', desc: 'Restricted by Lex Koller quotas to designated holiday zones (Valais, Graubünden) or commercial real estate' },
      { id: 'company', label: 'Swiss Holding Entity / AG', desc: 'Corporate ownership with cantonal commercial asset qualification' },
    ],
    capitalGainsTaxRateDesc: 'Grundstückgewinnsteuer: Steeply tapered holding tax (up to 50% if held < 1 yr down to 10% after 20+ yrs to eliminate speculation).',
    rentalIncomeTaxDesc: 'Combined Federal Direct Tax (IFD) + Cantonal/Communal Tax (ICC) with 20% statutory deemed maintenance expense deduction.',
    keyBenefits: [
      'Swiss Franc (CHF) unmatched global currency stability and safe-haven reserve status',
      'No federal inheritance tax for direct descendants in most cantons',
      'Institutional lease agreements with index-linked inflation protection',
      'Triple-A rated legal and political jurisdiction with centuries of banking discretion',
    ],
    calculateAcquisitionTaxes: (price, status) => {
      // Cantonal transfer tax varies 1.0% - 3.3% (Zurich 0%, Bern 1.8%, Geneva 3.0%), average ~1.5%
      const cantonTransferTax = price * 0.015;
      const landRegistryAndNotary = price * 0.005; // Grundbuch + Notariat ~0.5%
      const lexKollerPermit = status === 'foreigner' ? 3500 : 0;
      return {
        standardStampDuty: Math.round(cantonTransferTax),
        additionalDuty: Math.round(lexKollerPermit),
        legalAndAdmin: Math.round(landRegistryAndNotary),
        totalAcquisitionCosts: Math.round(cantonTransferTax + landRegistryAndNotary + lexKollerPermit),
        breakdown: [
          { label: 'Cantonal Transfer Tax (Handänderungssteuer ~1.5% avg)', amount: Math.round(cantonTransferTax), rateStr: '1.5%' },
          { label: 'Land Registry (Grundbuch) & Public Notary', amount: Math.round(landRegistryAndNotary), rateStr: '0.5%' },
          ...(status === 'foreigner' ? [{ label: 'Lex Koller Cantonal Authorization Filing', amount: 3500, rateStr: 'Fixed' }] : []),
        ],
      };
    },
    calculateExitTaxes: (capitalGain, holdingYears) => {
      let effectiveRate = 0.50;
      if (holdingYears >= 20) effectiveRate = 0.10;
      else if (holdingYears >= 15) effectiveRate = 0.14;
      else if (holdingYears >= 10) effectiveRate = 0.18;
      else if (holdingYears >= 5) effectiveRate = 0.25;
      else if (holdingYears >= 2) effectiveRate = 0.35;
      else if (holdingYears >= 1) effectiveRate = 0.40;

      const cgt = Math.max(0, capitalGain * effectiveRate);
      return {
        cgtAmount: Math.round(cgt),
        effectiveRate,
        notes: `${Math.round(effectiveRate * 100)}% tapered Grundstückgewinnsteuer (Swiss Cantonal rate decreases from 50% to 10% over holding duration).`,
      };
    },
  },

  LK: {
    code: 'LK',
    name: 'Sri Lanka',
    currency: 'LKR',
    flag: '🇱🇰',
    tagline: 'Colombo Port City SEZ & Emerging High-Yield Island Frontier',
    stampDutyName: 'Provincial Stamp Duty + Land Registry & Notary',
    buyerStatusOptions: [
      { id: 'citizen', label: 'Sri Lankan Citizen', desc: 'Standard provincial stamp duty; full freehold ownership nationwide' },
      { id: 'pr', label: 'Resident Visa / Dual National', desc: 'Full residential property acquisition rights' },
      { id: 'foreigner', label: 'Foreign Buyer / Port City SEZ', desc: 'Condominiums above 4th floor permitted freehold nationwide; Port City SEZ allows 100% foreign freehold + zero tax incentives' },
      { id: 'company', label: 'Board of Investment (BOI) Co', desc: 'Corporate SPV with BOI strategic status & tax holiday incentives' },
    ],
    capitalGainsTaxRateDesc: '10% Flat CGT under Inland Revenue Act No. 24 of 2017 (0% in Colombo Port City SEZ).',
    rentalIncomeTaxDesc: 'Progressive resident rate (6%-36%) or non-resident flat rate, with 25% statutory relief for repairs & upkeep.',
    keyBenefits: [
      'Colombo Port City SEZ offers zero capital gains tax and zero foreign exchange repatriation controls',
      'Low entry cost relative to regional hubs with 7%-9% prime hospitality rental yields',
      'Freehold ownership legally guaranteed for foreigners on condominium developments above 4th floor',
      'Strategic Indian Ocean maritime corridor experiencing renewed bilateral infrastructure investment',
    ],
    calculateAcquisitionTaxes: (price) => {
      // Provincial stamp duty: 3% on first LKR 100,000 + 4% on balance
      const firstTier = Math.min(price, 100000);
      const balance = Math.max(0, price - 100000);
      const stampDuty = (firstTier * 0.03) + (balance * 0.04);
      const landRegistry = price * 0.01;
      const legalNotary = price * 0.01;
      return {
        standardStampDuty: Math.round(stampDuty),
        additionalDuty: 0,
        legalAndAdmin: Math.round(landRegistry + legalNotary),
        totalAcquisitionCosts: Math.round(stampDuty + landRegistry + legalNotary),
        breakdown: [
          { label: 'Provincial Council Stamp Duty (3% on 1st 100k, 4% on balance)', amount: Math.round(stampDuty), rateStr: '~4.0%' },
          { label: 'Land Registry Deed Registration Fee', amount: Math.round(landRegistry), rateStr: '1.0%' },
          { label: 'Notary Public Title & Legal Conveyancing', amount: Math.round(legalNotary), rateStr: '1.0%' },
        ],
      };
    },
    calculateExitTaxes: (capitalGain) => {
      const effectiveRate = 0.10;
      const cgt = Math.max(0, capitalGain * effectiveRate);
      return {
        cgtAmount: Math.round(cgt),
        effectiveRate,
        notes: '10% flat Capital Gains Tax under Inland Revenue Act No. 24 of 2017 (0% if structured via Port City SEZ).',
      };
    },
  },

  NZ: {
    code: 'NZ',
    name: 'New Zealand',
    currency: 'NZD',
    flag: '🇳🇿',
    tagline: 'Zero Stamp Duty & Restored 2-Year Bright-Line 0% CGT',
    stampDutyName: 'Zero Transfer Stamp Duty (0% NZ Statutory Rate)',
    buyerStatusOptions: [
      { id: 'citizen', label: 'New Zealand Citizen', desc: 'Zero stamp duty, unrestricted purchase rights, 100% mortgage interest deductibility restored' },
      { id: 'pr', label: 'NZ Permanent Resident / Aus Citizen', desc: 'Exempt from Overseas Investment Act (OIA) consent under bilateral trans-Tasman reciprocity' },
      { id: 'foreigner', label: 'Foreign Buyer (OIA Consent)', desc: 'Governed by Overseas Investment Act (OIA); off-the-plan multi-unit apartment exemption available' },
      { id: 'company', label: 'Look-Through Company (LTC) / Trust', desc: 'Flow-through tax transparency vehicle for property investors' },
    ],
    capitalGainsTaxRateDesc: '0% Capital Gains Tax past 24 months under restored 2-year Bright-Line test (2024 legislation).',
    rentalIncomeTaxDesc: 'Rental profits taxed at individual marginal rate. Mortgage interest deductibility 80% (2024/25) and 100% fully restored from April 2025 onwards.',
    keyBenefits: [
      'Zero Stamp Duty: New Zealand levies 0% transfer duty, 0% mortgage stamp duty, and 0% registration tax',
      'Restored 2-Year Bright-Line Test: 0% capital gains tax upon sale after just 24 months of ownership',
      '100% Mortgage Interest Deductibility fully restored under updated tax code',
      'Strong legal transparency, zero foreign buyer stamp duty surcharges',
    ],
    calculateAcquisitionTaxes: (price, status) => {
      const legalConveyancing = Math.min(Math.max(price * 0.002, 1800), 4000);
      const oiaFee = status === 'foreigner' ? 2500 : 0;
      return {
        standardStampDuty: 0,
        additionalDuty: oiaFee,
        legalAndAdmin: Math.round(legalConveyancing),
        totalAcquisitionCosts: Math.round(legalConveyancing + oiaFee),
        breakdown: [
          { label: 'New Zealand Stamp Duty (Statutory Zero Rate)', amount: 0, rateStr: '0.0%' },
          { label: 'Solicitor Conveyancing & LINZ Title Registration', amount: Math.round(legalConveyancing), rateStr: '~0.2%' },
          ...(status === 'foreigner' ? [{ label: 'Overseas Investment Office (OIO) Filing Fee', amount: 2500, rateStr: 'Fixed' }] : []),
        ],
      };
    },
    calculateExitTaxes: (capitalGain, holdingYears) => {
      const qualifiesForZeroRate = holdingYears >= 2;
      const effectiveRate = qualifiesForZeroRate ? 0 : 0.39;
      const cgt = Math.max(0, capitalGain * effectiveRate);
      return {
        cgtAmount: Math.round(cgt),
        effectiveRate,
        notes: qualifiesForZeroRate
          ? '0% Capital Gains Tax (Exempt under restored 2-year Bright-Line Test).'
          : '39% top marginal rate applies if sold within the 2-year Bright-Line holding window.',
      };
    },
  },
};
