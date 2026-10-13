import React, { useState } from 'react';
import { CurrencyCode, JurisdictionCode, PropertyInputs } from './types';
import { CURRENCIES, JURISDICTIONS } from './data/jurisdictions';
import { simulatePropertyInvestment } from './utils/finance';
import { generateDeterministicAiAudit } from './utils/aiAdvisory';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OverviewSection } from './components/OverviewSection';
import { MethodologySection } from './components/MethodologySection';
import { RentalPropertyCalculator } from './components/RentalPropertyCalculator';
import { WhatsInsideSection } from './components/WhatsInsideSection';
import { CalculatorDirectory } from './components/CalculatorDirectory';
import { InteractiveModalCalculator } from './components/InteractiveModalCalculator';
import { CountryComparisonModal } from './components/CountryComparisonModal';
import { AiAuditModal } from './components/AiAuditModal';
import { PrincipalContactModal } from './components/PrincipalContactModal';
import { ArrowUpRight } from 'lucide-react';
import { NoveroShowcase } from './components/NoveroShowcase';
import { NoveroLogo } from './components/NoveroLogo';
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
  const [isPrincipalModalOpen, setIsPrincipalModalOpen] = useState<boolean>(false);

  // When jurisdiction changes, also default display currency to matching sovereign currency
  const handleSelectJurisdiction = (code: JurisdictionCode) => {
    setCurrentJurisdiction(code);
    const jur = JURISDICTIONS[code];
    if (jur && CURRENCIES[jur.currency]) {
      setCurrentCurrency(jur.currency);
    }
  };

  const scrollToCalculator = () => {
    setActiveTab('simulator');
    const el = document.getElementById('calculator-section');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToDirectory = () => {
    setActiveTab('catalog');
    const el = document.getElementById('directory-section');
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Open a specific calculator
  const handleOpenCalculator = (calcId: string) => {
    if (calcId === 'rental-property' || calcId === 'stamp-duty-global') {
      scrollToCalculator();
    } else {
      setActiveModalCalcId(calcId);
    }
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
        onOpenPrincipalContact={() => setIsPrincipalModalOpen(true)}
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

        {/* Section 02: Lenval 5-Pillar Investment Methodology */}
        <MethodologySection
          currentJurisdiction={currentJurisdiction}
          onScrollToCalculator={scrollToCalculator}
          onOpenCompare={() => setIsCompareModalOpen(true)}
          onOpenDirectory={scrollToDirectory}
        />

        {/* Section 03: The Simulator (The Master Suite) */}
        <RentalPropertyCalculator
          currentJurisdiction={currentJurisdiction}
          currentCurrency={currentCurrency}
          onOpenAiAuditModal={() => setIsAiAuditModalOpen(true)}
        />

        {/* Section 04: What's Inside (Lenval Architectural Cards) */}
        <WhatsInsideSection
          onScrollToCalculator={scrollToCalculator}
          onOpenDirectory={scrollToDirectory}
          onOpenCompare={() => setIsCompareModalOpen(true)}
        />

        {/* Section 05: The 45 Institutional Calculators Directory */}
        <CalculatorDirectory
          currentJurisdiction={currentJurisdiction}
          currentCurrency={currentCurrency}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenCalculator={handleOpenCalculator}
        />

        {/* Section 06: Pre-Footer Studio Showcase (Powered & Built by Novero) */}
        <NoveroShowcase />

      </main>

      {/* Section 07: Speak Directly / Footer */}
      <Footer
        currentJurisdiction={currentJurisdiction}
        onSelectJurisdiction={handleSelectJurisdiction}
        onOpenPrincipalContact={() => setIsPrincipalModalOpen(true)}
      />

      {/* Floating Badge: Powered & Built by Novero */}
      <aside
        aria-label="Powered & Built by Novero"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40"
      >
        <div className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#191514]/95 backdrop-blur-xl border border-[#302826] hover:border-[#8C5E3C] shadow-2xl transition-all group hover:scale-[1.02]">
          <a
            href="https://shulo.xyz/novero"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#B88A58]" />
            <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-[#8C857E] group-hover:text-[#D9D3CE] transition-colors">
              Powered &amp; Built by
            </span>
            <NoveroLogo size="xs" />
          </a>
          <span className="text-[#302826]">|</span>
          <a
            href="https://shulo.xyz/novero#brief"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] sm:text-xs font-sans font-medium uppercase tracking-wider text-[#B88A58] hover:text-[#FAF7F2] transition-colors whitespace-nowrap flex items-center gap-1"
          >
            <span>Enquire</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </aside>

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

      {/* Modal: Managing Director Dr. Babu James Direct Enquiry */}
      <PrincipalContactModal
        isOpen={isPrincipalModalOpen}
        onClose={() => setIsPrincipalModalOpen(false)}
      />

    </div>
  );
};
