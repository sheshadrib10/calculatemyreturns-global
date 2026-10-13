import React, { useState } from 'react';
import { CurrencyCode, JurisdictionCode } from '../types';
import { CURRENCIES, JURISDICTIONS } from '../data/jurisdictions';
import { Globe, Coins, ShieldCheck, X, Sparkles, Layers, TrendingUp } from 'lucide-react';

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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const activeJur = JURISDICTIONS[currentJurisdiction] || JURISDICTIONS.SG;
  const activeCurr = CURRENCIES[currentCurrency] || CURRENCIES.USD;

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#191514]/85 border-b border-[#302826] transition-all">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between gap-6">
          
          {/* Left: Lenval-style Two-Dot Menu Trigger */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-sans text-[#FAF7F2] hover:text-[#C4BCB5] transition-colors focus:outline-none group"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#FAF7F2] group-hover:scale-110 transition-transform">
                  <circle cx="7" cy="12" r="2.2" fill="currentColor" />
                  <circle cx="17" cy="12" r="2.2" fill="currentColor" />
                </svg>
              </div>
              <span className="font-medium hidden sm:inline">Menu</span>
            </button>

            {/* Brand Logo in Lenval Editorial Serif */}
            <button
              onClick={() => {
                setActiveTab('simulator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left focus:outline-none flex items-baseline gap-3 group"
            >
              <span className="font-serif text-2xl tracking-[0.05em] text-[#FAF7F2] group-hover:text-[#D9D3CE] transition-colors">
                ARIEL
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#8C857E] border-l border-[#302826] pl-3 hidden md:inline">
                Returns Calculator
              </span>
            </button>
          </div>

          {/* Center Navigation Links (Lenval Editorial Menu) */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-sans tracking-[0.15em] uppercase text-[#A39E98]">
            <button
              onClick={() => {
                setActiveTab('simulator');
                const el = document.getElementById('overview-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#FAF7F2] transition-colors"
            >
              Overview
            </button>
            <button
              onClick={() => {
                setActiveTab('simulator');
                const el = document.getElementById('calculator-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`transition-colors ${activeTab === 'simulator' ? 'text-[#FAF7F2] font-semibold' : 'hover:text-[#FAF7F2]'}`}
            >
              The Simulator
            </button>
            <button
              onClick={() => setActiveTab('catalog')}
              className={`transition-colors ${activeTab === 'catalog' ? 'text-[#FAF7F2] font-semibold' : 'hover:text-[#FAF7F2]'}`}
            >
              All 45 Tools
            </button>
            <button
              onClick={onOpenCompare}
              className="hover:text-[#FAF7F2] transition-colors flex items-center gap-1.5"
            >
              <span>Cross-Border</span>
            </button>
          </nav>

          {/* Right Action Cluster: Country Selector, Currency & Lenval Pill Button */}
          <div className="flex items-center gap-3">
            
            {/* Country Jurisdiction Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCountryDropdown(!showCountryDropdown);
                  setShowCurrencyDropdown(false);
                }}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#302826] bg-[#211A19]/80 hover:border-[#8C5E3C] text-xs font-sans text-[#FAF7F2] transition-all"
              >
                <span>{activeJur.flag}</span>
                <span className="font-medium hidden sm:inline">{activeJur.name}</span>
                <span className="text-[10px] font-mono text-[#8C857E]">Tax Rules</span>
              </button>

              {showCountryDropdown && (
                <div className="absolute top-full mt-2 w-64 right-0 bg-[#211A19] border border-[#302826] rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-2xl">
                  <div className="text-[10px] uppercase font-mono text-[#8C857E] px-3 py-1.5 tracking-wider border-b border-[#302826] mb-1">
                    Select Jurisdiction &amp; Tax Laws
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-1">
                    {Object.values(JURISDICTIONS).map((j) => (
                      <button
                        key={j.code}
                        onClick={() => {
                          onSelectJurisdiction(j.code);
                          setShowCountryDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors ${
                          j.code === currentJurisdiction
                            ? 'bg-[#302826] text-[#FAF7F2] font-medium'
                            : 'text-[#D9D3CE] hover:bg-[#2B2220]'
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
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#302826] bg-[#211A19]/80 hover:border-[#8C5E3C] text-xs font-mono text-[#FAF7F2] transition-all"
              >
                <span>{activeCurr.code}</span>
                <span className="text-[11px] text-[#8C857E]">({activeCurr.symbol})</span>
              </button>

              {showCurrencyDropdown && (
                <div className="absolute top-full mt-2 w-52 right-0 bg-[#211A19] border border-[#302826] rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-2xl">
                  <div className="text-[10px] uppercase font-mono text-[#8C857E] px-3 py-1.5 tracking-wider border-b border-[#302826] mb-1">
                    Currencies
                  </div>
                  <div className="max-h-72 overflow-y-auto space-y-1">
                    {Object.values(CURRENCIES).map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          onSelectCurrency(c.code);
                          setShowCurrencyDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-mono transition-colors ${
                          c.code === currentCurrency
                            ? 'bg-[#302826] text-[#FAF7F2] font-semibold'
                            : 'text-[#D9D3CE] hover:bg-[#2B2220]'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <span>{c.flag}</span>
                          <span>{c.code}</span>
                        </span>
                        <span className="text-[#8C857E]">{c.symbol}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Lenval-style "Private Audit / Let's Talk" Magnetic Pill Button */}
            <button
              onClick={onOpenAiAudit}
              className="flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full border border-[#FAF7F2]/40 bg-[#FAF7F2] text-[#191514] hover:bg-[#FAF7F2]/90 text-xs font-sans tracking-[0.1em] uppercase font-medium shadow-sm transition-all group"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#191514] group-hover:scale-125 transition-transform" />
              <span>Private Audit</span>
            </button>
          </div>

        </div>
      </header>

      {/* Lenval Fullscreen Overlay Drawer Menu */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-[#191514] text-[#FAF7F2] flex flex-col justify-between p-8 sm:p-14 animate-in fade-in duration-300">
          
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between border-b border-[#302826] pb-8">
            <span className="font-serif text-3xl tracking-[0.05em]">ARIEL</span>
            <button
              onClick={() => setDrawerOpen(false)}
              className="flex items-center gap-2.5 text-xs font-sans uppercase tracking-[0.2em] text-[#FAF7F2] hover:text-[#C4BCB5] transition-colors"
            >
              <span>Close</span>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Huge Editorial Links */}
          <div className="py-12 space-y-8 max-w-2xl">
            <div className="border-b border-[#302826] pb-6">
              <button
                onClick={() => {
                  setActiveTab('simulator');
                  setDrawerOpen(false);
                  const el = document.getElementById('overview-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-serif text-4xl sm:text-6xl text-left hover:text-[#8C5E3C] transition-colors"
              >
                01. Overview &amp; Philosophy
              </button>
            </div>

            <div className="border-b border-[#302826] pb-6">
              <button
                onClick={() => {
                  setActiveTab('simulator');
                  setDrawerOpen(false);
                  const el = document.getElementById('calculator-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-serif text-4xl sm:text-6xl text-left hover:text-[#8C5E3C] transition-colors"
              >
                02. The Investment Simulator
              </button>
            </div>

            <div className="border-b border-[#302826] pb-6">
              <button
                onClick={() => {
                  setActiveTab('catalog');
                  setDrawerOpen(false);
                }}
                className="font-serif text-4xl sm:text-6xl text-left hover:text-[#8C5E3C] transition-colors"
              >
                03. The 45 Institutional Calculators
              </button>
            </div>

            <div className="border-b border-[#302826] pb-6">
              <button
                onClick={() => {
                  onOpenCompare();
                  setDrawerOpen(false);
                }}
                className="font-serif text-4xl sm:text-6xl text-left hover:text-[#8C5E3C] transition-colors"
              >
                04. Cross-Border Sovereign Matrix
              </button>
            </div>

            <div className="pb-6">
              <button
                onClick={() => {
                  onOpenAiAudit();
                  setDrawerOpen(false);
                }}
                className="font-serif text-4xl sm:text-6xl text-left text-[#8C5E3C] hover:text-[#FAF7F2] transition-colors"
              >
                05. Launch Ariel AI Audit
              </button>
            </div>
          </div>

          {/* Bottom Drawer Footer */}
          <div className="border-t border-[#302826] pt-8 flex flex-col sm:flex-row items-baseline justify-between text-xs font-mono text-[#8C857E] gap-4">
            <div>
              © {new Date().getFullYear()} Ariel Properties · Private Wealth Intelligence.
            </div>
            <div className="flex items-center gap-6">
              <span>Zero-Storage Privacy</span>
              <span>No Cookies / No Tracking</span>
              <span className="text-emerald-400">● 100% Client-Side</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
