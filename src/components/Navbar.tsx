import React, { useState } from 'react';
import { CurrencyCode, JurisdictionCode } from '../types';
import { CURRENCIES, JURISDICTIONS } from '../data/jurisdictions';
import {
  Globe,
  Coins,
  ShieldCheck,
  Menu,
  X,
  Sparkles,
  Layers,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface NavbarProps {
  currentJurisdiction: JurisdictionCode;
  onSelectJurisdiction: (code: JurisdictionCode) => void;
  currentCurrency: CurrencyCode;
  onSelectCurrency: (code: CurrencyCode) => void;
  activeTab: 'simulator' | 'catalog';
  setActiveTab: (tab: 'simulator' | 'catalog') => void;
  onOpenAiAudit: () => void;
  onOpenCompare: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentJurisdiction,
  onSelectJurisdiction,
  currentCurrency,
  onSelectCurrency,
  activeTab,
  setActiveTab,
  onOpenAiAudit,
  onOpenCompare,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const activeJur = JURISDICTIONS[currentJurisdiction] || JURISDICTIONS.SG;
  const activeCurr = CURRENCIES[currentCurrency] || CURRENCIES.USD;

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#140F0E]/90 border-b border-[#2E2421]/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Editorial Title */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setActiveTab('simulator')}
              className="text-left group flex items-center gap-3.5 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full border border-[#D4AF37]/40 bg-gradient-to-br from-[#26100D] to-[#140F0E] flex items-center justify-center text-[#D4AF37] font-serif font-bold text-lg shadow-[0_0_15px_rgba(212,175,55,0.15)] group-hover:border-[#D4AF37] transition-all">
                A
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-xl sm:text-2xl font-semibold tracking-tight text-white group-hover:text-[#D4AF37] transition-colors">
                    AURA
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-[#D4AF37] border-l border-[#2E2421] pl-2 hidden sm:inline">
                    Global Returns
                  </span>
                </div>
                <p className="text-[11px] text-[#A39E98] tracking-wide font-sans hidden md:block">
                  CalculateMyReturns · Private Wealth & Real Estate Intelligence
                </p>
              </div>
            </button>
          </div>

          {/* Navigation Controls: Country, Currency, Navigation Tabs & AI */}
          <div className="hidden lg:flex items-center gap-3">
            
            {/* Country Jurisdiction Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCountryDropdown(!showCountryDropdown);
                  setShowCurrencyDropdown(false);
                }}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2E2421] bg-[#1C1615] hover:border-[#D4AF37]/50 text-xs text-[#EAE6E1] transition-all"
                title="Select localized legal & tax jurisdiction"
              >
                <span className="text-sm">{activeJur.flag}</span>
                <span className="font-medium">{activeJur.name}</span>
                <span className="text-[10px] text-[#D4AF37] font-mono">Tax Rules</span>
              </button>

              {showCountryDropdown && (
                <div className="absolute top-full mt-2 w-64 right-0 bg-[#1A1413] border border-[#2E2421] rounded-xl shadow-2xl p-2 z-50 backdrop-blur-2xl">
                  <div className="text-[10px] uppercase font-mono text-[#8C857E] px-2 py-1 tracking-wider border-b border-[#2E2421] mb-1">
                    Select Jurisdiction & Tax Laws
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-1">
                    {Object.values(JURISDICTIONS).map((j) => (
                      <button
                        key={j.code}
                        onClick={() => {
                          onSelectJurisdiction(j.code);
                          setShowCountryDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors ${
                          j.code === currentJurisdiction
                            ? 'bg-[#2E2421] text-[#D4AF37] font-medium'
                            : 'text-[#EAE6E1] hover:bg-[#251D1B]'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className="text-base">{j.flag}</span>
                          <span>{j.name}</span>
                        </span>
                        <span className="text-[10px] font-mono text-[#8C857E]">{j.currency}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCurrencyDropdown(!showCurrencyDropdown);
                  setShowCountryDropdown(false);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2E2421] bg-[#1C1615] hover:border-[#D4AF37]/50 text-xs text-[#EAE6E1] transition-all"
                title="Select display currency"
              >
                <Coins className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-mono font-medium">{activeCurr.code}</span>
                <span className="text-[10px] text-[#A39E98]">({activeCurr.symbol})</span>
              </button>

              {showCurrencyDropdown && (
                <div className="absolute top-full mt-2 w-52 right-0 bg-[#1A1413] border border-[#2E2421] rounded-xl shadow-2xl p-2 z-50 backdrop-blur-2xl">
                  <div className="text-[10px] uppercase font-mono text-[#8C857E] px-2 py-1 tracking-wider border-b border-[#2E2421] mb-1">
                    Global Currencies
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-1">
                    {Object.values(CURRENCIES).map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          onSelectCurrency(c.code);
                          setShowCurrencyDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors ${
                          c.code === currentCurrency
                            ? 'bg-[#2E2421] text-[#D4AF37] font-medium'
                            : 'text-[#EAE6E1] hover:bg-[#251D1B]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{c.flag}</span>
                          <span className="font-mono">{c.code}</span>
                        </span>
                        <span className="text-[#8C857E]">{c.symbol}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Cross-Border Comparison Trigger */}
            <button
              onClick={onOpenCompare}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#2E2421] bg-[#1C1615] hover:border-[#D4AF37]/60 text-xs text-[#EAE6E1] transition-all"
            >
              <TrendingUp className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Cross-Border Yields</span>
            </button>

            {/* Tab switch: Simulator vs Full 45-Calculator Directory */}
            <div className="flex items-center bg-[#1C1615] p-1 rounded-full border border-[#2E2421]">
              <button
                onClick={() => setActiveTab('simulator')}
                className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all ${
                  activeTab === 'simulator'
                    ? 'bg-[#D4AF37] text-[#140F0E] shadow-sm'
                    : 'text-[#A39E98] hover:text-white'
                }`}
              >
                Real Estate IRR
              </button>
              <button
                onClick={() => setActiveTab('catalog')}
                className={`px-3.5 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === 'catalog'
                    ? 'bg-[#D4AF37] text-[#140F0E] shadow-sm'
                    : 'text-[#A39E98] hover:text-white'
                }`}
              >
                <Layers className="w-3 h-3" />
                <span>All 45 Calculators</span>
              </button>
            </div>

            {/* AI Investment Copilot Button */}
            <button
              onClick={onOpenAiAudit}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#2B1B13] via-[#3D2619] to-[#2B1B13] border border-[#D4AF37]/50 hover:border-[#D4AF37] text-xs font-semibold text-[#FDFBF7] shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <span>Aura AI Audit</span>
            </button>
          </div>

          {/* Privacy & Mobile Menu Controls */}
          <div className="flex items-center gap-2">
            
            {/* Zero Data Guarantee Pill */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-900/60 bg-emerald-950/20 text-emerald-400 text-[11px] font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Client-Side · No Tracking</span>
            </div>

            {/* Mobile Menu Toggle Button (Lenval Style Magnetic Circle) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-10 h-10 rounded-full border border-[#2E2421] bg-[#1C1615] flex items-center justify-center text-[#EAE6E1] hover:border-[#D4AF37] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {menuOpen ? <X className="w-5 h-5 text-[#D4AF37]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Fullscreen Navigation Drawer (Lenval Properties Style) */}
        {menuOpen && (
          <div className="lg:hidden bg-[#140F0E] border-b border-[#2E2421] px-5 py-6 space-y-5 animate-in slide-in-from-top duration-300">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-mono uppercase text-[#8C857E] mb-1">
                  Jurisdiction & Laws
                </label>
                <select
                  value={currentJurisdiction}
                  onChange={(e) => onSelectJurisdiction(e.target.value as JurisdictionCode)}
                  className="w-full bg-[#1C1615] border border-[#2E2421] rounded-lg px-3 py-2 text-xs text-[#EAE6E1] font-sans focus:outline-none focus:border-[#D4AF37]"
                >
                  {Object.values(JURISDICTIONS).map((j) => (
                    <option key={j.code} value={j.code}>
                      {j.flag} {j.name} ({j.currency})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-[#8C857E] mb-1">
                  Display Currency
                </label>
                <select
                  value={currentCurrency}
                  onChange={(e) => onSelectCurrency(e.target.value as CurrencyCode)}
                  className="w-full bg-[#1C1615] border border-[#2E2421] rounded-lg px-3 py-2 text-xs text-[#EAE6E1] font-mono focus:outline-none focus:border-[#D4AF37]"
                >
                  {Object.values(CURRENCIES).map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code} ({c.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  setActiveTab('simulator');
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'simulator'
                    ? 'bg-[#2E2421] text-[#D4AF37]'
                    : 'text-[#EAE6E1] hover:bg-[#1C1615]'
                }`}
              >
                Real Estate Investment & IRR Simulator
              </button>

              <button
                onClick={() => {
                  setActiveTab('catalog');
                  setMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'catalog'
                    ? 'bg-[#2E2421] text-[#D4AF37]'
                    : 'text-[#EAE6E1] hover:bg-[#1C1615]'
                }`}
              >
                Browse All 45 Financial Calculators
              </button>

              <button
                onClick={() => {
                  onOpenCompare();
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-[#EAE6E1] hover:bg-[#1C1615] flex items-center justify-between"
              >
                <span>Cross-Border Yield Comparison</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </button>

              <button
                onClick={() => {
                  onOpenAiAudit();
                  setMenuOpen(false);
                }}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B98A3D] text-[#140F0E] font-semibold text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4" />
                <span>Launch Aura AI Deal Audit</span>
              </button>
            </div>

            <div className="pt-2 border-t border-[#2E2421] flex items-center justify-between text-[11px] font-mono text-[#8C857E]">
              <span>No signup · No cookie tracking</span>
              <span className="text-emerald-400">● 100% Client-Side</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
