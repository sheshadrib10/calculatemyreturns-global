import React, { useState } from 'react';
import { CurrencyCode, JurisdictionCode, PropertyInputs } from './types';
import { CURRENCIES, JURISDICTIONS } from './data/jurisdictions';
import { simulatePropertyInvestment } from './utils/finance';
import { generateDeterministicAiAudit } from './utils/aiAdvisory';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OverviewSection } from './components/OverviewSection';
import { RentalPropertyCalculator } from './components/RentalPropertyCalculator';
import { WhatsInsideSection } from './components/WhatsInsideSection';
import { CalculatorDirectory } from './components/CalculatorDirectory';
import { InteractiveModalCalculator } from './components/InteractiveModalCalculator';
import { CountryComparisonModal } from './components/CountryComparisonModal';
import { AiAuditModal } from './components/AiAuditModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  // Jurisdiction & Currency State
  const [currentJurisdiction, setCurrentJurisdiction] = useState<JurisdictionCode>('SG');
  const [currentCurrency, setCurrentCurrency] = useState<CurrencyCode>('SGD');

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<'simulator' | 'catalog'>('simulator');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [activeModalCalcId, setActiveModalCalcId] = useState<string | null>(null);
  const [isAiAuditModalOpen, setIsAiAuditModalOpen] = useState<boolean>(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  // When jurisdiction changes, also default display currency to matching sovereign currency
  const handleSelectJurisdiction = (code: JurisdictionCode) => {
    setCurrentJurisdiction(code);
    const jur = JURISDICTIONS[code];
    if (jur && CURRENCIES[jur.currency]) {
      setCurrentCurrency(jur.currency);
    }
  };

  // Open a specific calculator
  const handleOpenCalculator = (calcId: string) => {
    if (calcId === 'rental-property' || calcId === 'stamp-duty-global') {
      setActiveTab('simulator');
      document.getElementById('calculator-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveModalCalcId(calcId);
    }
  };

  const scrollToCalculator = () => {
    setActiveTab('simulator');
    document.getElementById('calculator-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Baseline property simulation inputs for AI audit modal
  const jur = JURISDICTIONS[currentJurisdiction] || JURISDICTIONS.SG;
  const curr = CURRENCIES[currentCurrency] || CURRENCIES.USD;
  const sampleInputs: PropertyInputs = {
    propertyCost: jur.currency === curr.code ? curr.defaultPrice : 1500000,
    downPaymentPercent: 25,
    loanRate: currentJurisdiction === 'SG' ? 3.4 : currentJurisdiction === 'MY' ? 4.3 : currentJurisdiction === 'IN' ? 8.5 : 5.5,
    loanTenure: 25,
    holdingPeriod: 10,
    appreciationRate: currentJurisdiction === 'IN' ? 8.0 : currentJurisdiction === 'AE' ? 6.5 : 4.5,
    monthlyRent: jur.currency === curr.code ? curr.defaultRent : 4500,
    rentHike: 3.5,
    monthlyMaintenance: Math.round((jur.currency === curr.code ? curr.defaultRent : 4500) * 0.12),
    maintenanceHike: 3.0,
    vacancyWeeksPerYear: 2,
    buyerStatus: 'citizen',
    propertyCount: 1,
  };

  const sampleResults = simulatePropertyInvestment(sampleInputs, currentJurisdiction);
  const sampleAuditReport = generateDeterministicAiAudit(sampleInputs, sampleResults, currentJurisdiction);

  return (
    <div className="min-h-screen bg-[#191514] text-[#FAF7F2] flex flex-col justify-between font-sans selection:bg-[#8C5E3C]/40 selection:text-white">
      
      {/* Top Lenval Navbar */}
      <Navbar
        currentJurisdiction={currentJurisdiction}
        onSelectJurisdiction={handleSelectJurisdiction}
        currentCurrency={currentCurrency}
        onSelectCurrency={setCurrentCurrency}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAiAudit={() => setIsAiAuditModalOpen(true)}
        onOpenCompare={() => setIsCompareModalOpen(true)}
      />

      {/* Main Page Flow (Lenval Rhythmic Transitions) */}
      <main className="flex-grow">
        
        {/* Section 00: Cinematic Architectural Hero */}
        <Hero
          currentJurisdiction={currentJurisdiction}
          onSelectJurisdiction={handleSelectJurisdiction}
          searchQuery={searchQuery}
          setSearchQuery={(q) => {
            setSearchQuery(q);
            if (q.trim()) {
              setActiveTab('catalog');
              document.getElementById('directory-section')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          onSelectCalculator={handleOpenCalculator}
          onOpenCompare={() => setIsCompareModalOpen(true)}
        />

        {/* Section 01: Overview & Philosophy (Lenval 2-Column Travertine Section) */}
        <OverviewSection
          currentJurisdiction={currentJurisdiction}
          currentCurrency={currentCurrency}
          onOpenCompare={() => setIsCompareModalOpen(true)}
          onScrollToCalculator={scrollToCalculator}
        />

        {/* Section 02: The Simulator (The Master Suite) */}
        <RentalPropertyCalculator
          currentJurisdiction={currentJurisdiction}
          currentCurrency={currentCurrency}
          onOpenAiAuditModal={() => setIsAiAuditModalOpen(true)}
        />

        {/* Section 03: What's Inside (Lenval Architectural Cards) */}
        <WhatsInsideSection
          onScrollToCalculator={scrollToCalculator}
          onOpenDirectory={() => {
            setActiveTab('catalog');
            document.getElementById('directory-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenCompare={() => setIsCompareModalOpen(true)}
        />

        {/* Section 04: The 45 Institutional Calculators Directory */}
        <CalculatorDirectory
          currentJurisdiction={currentJurisdiction}
          currentCurrency={currentCurrency}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenCalculator={handleOpenCalculator}
        />

      </main>

      {/* Section 05: Speak Directly / Footer */}
      <Footer
        currentJurisdiction={currentJurisdiction}
        onSelectJurisdiction={handleSelectJurisdiction}
      />

      {/* Modal: Interactive Calculator Runner */}
      {activeModalCalcId && (
        <InteractiveModalCalculator
          calcId={activeModalCalcId}
          onClose={() => setActiveModalCalcId(null)}
          currentCurrency={currentCurrency}
          currentJurisdiction={currentJurisdiction}
        />
      )}

      {/* Modal: Cross-Border Country Yield Matrix */}
      {isCompareModalOpen && (
        <CountryComparisonModal
          onClose={() => setIsCompareModalOpen(false)}
          onSelectJurisdiction={handleSelectJurisdiction}
        />
      )}

      {/* Modal: Comprehensive AI Investment Audit Memorandum */}
      {isAiAuditModalOpen && (
        <AiAuditModal
          onClose={() => setIsAiAuditModalOpen(false)}
          auditReport={sampleAuditReport}
          inputs={sampleInputs}
          results={sampleResults}
          currentJurisdiction={currentJurisdiction}
          currentCurrency={currentCurrency}
        />
      )}

    </div>
  );
};
