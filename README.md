# AURA · Calculate My Returns Global

Institutional-grade, multi-currency financial return simulators, cross-border real estate IRR modeling, and statutory tax engines.

A modern, luxury replica and global evolution of [calculatemyreturns.netlify.app](https://calculatemyreturns.netlify.app), inspired by the architectural minimalism and editorial gravitas of [Lenval Properties](https://lenvalproperties.com) and premier private wealth institutions.

---

## Key Features

1. **Global Jurisdiction & Tax Engine**:
   - **Singapore (SGD)**: Tiered BSD (1%-6%), ABSD (0% to 60%), SSD, 0% Capital Gains Tax, CPF integration.
   - **Malaysia (MYR)**: Tiered MOT (1%-4%), 0% RPGT after 5 years, foreign buyer thresholds, MM2H pathways.
   - **India (INR)**: State Stamp Duty & Registration, Unified Budget 2024 LTCG (12.5%), Section 24(b) & 80C deductions.
   - **UAE / Dubai (AED)**: 4% DLD fee, 0% personal income tax, 0% capital gains tax, 10-Year Golden Visa qualification.
   - **United States (USD)**: Closing costs, 27.5-year straight-line depreciation tax shelter, IRC §1031 Exchange deferral.
   - **United Kingdom (GBP)**: Tiered SDLT + 3% BTL + 2% non-resident surcharges, Section 24 mortgage restrictions.
   - **Australia (AUD)**: State transfer duty, 50% CGT discount, Negative Gearing salary offset.
   - **Canada, Europe, Switzerland, Hong Kong, Japan**: Multi-currency support.

2. **Complete Financial Directory (45 Calculators across 10 Categories)**:
   - **Real Estate & Property Returns**: Rental Property IRR, Rent vs Buy, Stamp Duty & ABSD, Mortgage EMI, Affordability, Refinance, Tax Shields.
   - **SIP, Equities & Compounding**: SIP, Step-Up SIP, Compound Interest, Lump Sum, CAGR, XIRR, Expense Ratio Drag, Rule of 72.
   - **Retirement & FIRE**: Retirement Corpus Solver, Financial Goal Planner, Future Value FX, Term Insurance Cover, Pension / NPS.
   - **Personal Wealth & Liquidity**: Net Worth Statement, Emergency Fund Runway, Debt-to-Income (DTI).
   - **Financing & Credit**: Car Loan EMI, Credit Card Minimum Payment Trap.
   - **Tax Optimization**: Global Income Tax Comparison, Capital Gains, Housing Allowance Relief.
   - **FX & Bullion**: Real FX Purchasing Power, Crypto Capital Gains, Sovereign Gold Bonds.
   - **Fixed Deposits**: FD/RD, Systematic Withdrawal Plan (SWP), Inflation Erosion, Provident Funds.
   - **Salary & Severance**: Gratuity Payout, Statutory EPF/EPS, Gross CTC to In-Hand.
   - **Trading**: GST/VAT Splitter, Brokerage Slippage.

3. **Aura AI Wealth Copilot**:
   - Algorithmic Deal Quality Score (0-100) and sensitivity stress testing (+200 bps interest rate spike, vacancy shock).
   - Cloudflare Workers AI edge function integration (`@cf/meta/llama-3.1-8b-instruct`).
   - 100% numerical verification — calculations run deterministically in TypeScript so numbers are always mathematically exact.

4. **100% Privacy Guarantee**:
   - Zero database saving, zero signup, zero tracking scripts.
   - Exempt from GDPR / PDPA compliance burdens.

---

## Deployment & Tech Stack

- **Framework**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide Icons
- **Edge Deployment**: Cloudflare Pages (`calculatemyreturns-global.pages.dev`) + Cloudflare Pages Functions
- **Repository**: GitHub (`sheshadrib10/calculatemyreturns-global`)
