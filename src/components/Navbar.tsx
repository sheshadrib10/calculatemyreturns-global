import React, { useState } from 'react';
import { CurrencyCode, JurisdictionCode } from '../types';
import { CURRENCIES, JURISDICTIONS } from '../data/jurisdictions';
import { Globe, Coins, ShieldCheck, X, Sparkles, Layers, TrendingUp, ArrowUpRight, Phone, MessageSquare, Menu, ChevronDown } from 'lucide-react';
import { NoveroLogo } from './NoveroLogo';
import { CountryFlag } from './CountryFlag';
import { ArielLogo } from './ArielLogo';

interface NavbarProps {
  currentJurisdiction: JurisdictionCode;
  onSelectJurisdiction: (code: JurisdictionCode) => void;
  currentCurrency: CurrencyCode;
  onSelectCurrency: (code: CurrencyCode) => void;
  activeTab: 'simulator' | 'catalog';
  setActiveTab: (tab: 'simulator' | 'catalog') => void;
  onOpenAiAudit: () => void;
  onOpenCompare: () => void;
  onOpenPrincipalContact: () => void;
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
  onOpenPrincipalContact,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const activeJur = JURISDICTIONS[currentJurisdiction] || JURISDICTIONS.SG;
  const activeCurr = CURRENCIES[currentCurrency] || CURRENCIES.USD;

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#191514]/90 border-b border-[#302826] transition-all">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-3">
          
          {/* Left: Classic Luxury Hamburger Menu Trigger & Brand Logo */}
          <div className="flex items-center gap-2 sm:gap-6 flex-shrink-0">
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex items-center gap-2 p-1.5 -ml-1 sm:p-2 sm:-ml-2 rounded-xl text-[#FAF7F2] hover:bg-white/5 transition-colors focus:outline-none group"
              aria-label="Open navigation menu"
            >
              <Menu className="w-5 h-5 text-[#FAF7F2] group-hover:scale-105 transition-transform" />
              <span className="font-medium text-xs hidden sm:inline uppercase tracking-[0.15em]">Menu</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('simulator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left focus:outline-none flex items-center gap-2 group flex-shrink-0"
            >
              <ArielLogo size="sm" showSubtitle={false} />
              <span className="font-serif text-base sm:text-xl tracking-[0.05em] text-[#FAF7F2] group-hover:text-[#D9D3CE] transition-colors whitespace-nowrap hidden sm:inline">
                Investments
              </span>
            </button>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-sans tracking-[0.15em] uppercase text-[#A39E98]">
            <button
              onClick={() => {
                setActiveTab('simulator');
                const el = document.getElementById('calculator-section');
                if (el) {
                  const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className={`hover:text-[#FAF7F2] transition-colors ${activeTab === 'simulator' ? 'text-[#FAF7F2] font-semibold' : ''}`}
            >
              Simulator
            </button>
            <button
              onClick={onOpenCompare}
              className="hover:text-[#FAF7F2] transition-colors"
            >
              Sovereign Matrix
            </button>
            <button
              onClick={() => {
                setActiveTab('catalog');
                const el = document.getElementById('directory-section');
                if (el) {
                  const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className={`hover:text-[#FAF7F2] transition-colors ${activeTab === 'catalog' ? 'text-[#FAF7F2] font-semibold' : ''}`}
            >
              45 Calculators
            </button>
          </nav>

          {/* Right Action Cluster: Country Selector & Direct Contact */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            
            {/* Country Jurisdiction Selector */}
            <div className="relative">
              <button
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 rounded-full border border-[#302826] bg-[#211A19] hover:border-[#8C5E3C] text-xs font-sans text-[#FAF7F2] transition-all flex-shrink-0"
                aria-label="Select Sovereign Jurisdiction"
              >
                <CountryFlag code={activeJur.code} size="xs" />
                <span className="font-medium text-xs hidden sm:inline">{activeJur.name}</span>
                <span className="font-medium text-[11px] hidden min-[440px]:inline sm:hidden">{activeJur.code}</span>
                <span className="text-[10px] text-[#8C857E] font-mono hidden md:inline">({activeJur.currency})</span>
                <ChevronDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#B88A58]" />
              </button>

              {showCountryDropdown && (
                <div className="absolute top-full mt-2 w-64 right-0 bg-[#211A19] border border-[#302826] rounded-2xl shadow-2xl p-2 z-50 backdrop-blur-2xl">
                  <div className="text-[10px] uppercase font-mono text-[#8C857E] px-3 py-1.5 tracking-wider border-b border-[#302826] mb-1">
                    Select Sovereign Market
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
                          <CountryFlag code={j.code} size="sm" />
                          <span>{j.name}</span>
                        </span>
                        <span className="text-[10px] font-mono text-[#8C857E]">{j.currency}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Enquiry with Mr. Babu James (Always Visible on Mobile & Desktop) */}
            <button
              onClick={onOpenPrincipalContact}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#3E3330] bg-[#211A19] hover:border-[#8C5E3C] text-[#FAF7F2] text-xs font-sans tracking-wide transition-all shadow-sm flex-shrink-0 active:scale-95"
              title="Direct Enquiry with Mr. Babu James (Owner & Managing Director)"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B88A58] animate-pulse flex-shrink-0" />
              <span className="hidden min-[360px]:inline whitespace-nowrap">
                Contact Mr. Babu James
              </span>
              <span className="min-[360px]:hidden whitespace-nowrap">
                Contact
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Lenval Fullscreen Overlay Drawer Menu */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-[#191514] text-[#FAF7F2] flex flex-col justify-between p-8 sm:p-14 animate-in fade-in duration-300">
          
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between border-b border-[#302826] pb-8">
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.05em]">ARIEL INVESTMENTS</span>
            <button
              onClick={() => setDrawerOpen(false)}
              className="flex items-center gap-2.5 text-xs font-sans uppercase tracking-[0.2em] text-[#FAF7F2] hover:text-[#C4BCB5] transition-colors"
            >
              <span>Close</span>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Huge Editorial Links */}
          <div className="py-8 sm:py-12 space-y-6 sm:space-y-8 max-w-2xl overflow-y-auto">
            <div className="border-b border-[#302826] pb-4 sm:pb-6">
              <button
                onClick={() => {
                  setActiveTab('simulator');
                  setDrawerOpen(false);
                  setTimeout(() => {
                    const el = document.getElementById('overview-section');
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }, 100);
                }}
                className="font-serif text-2xl sm:text-5xl text-left hover:text-[#8C5E3C] transition-colors"
              >
                01. Overview &amp; Philosophy
              </button>
            </div>

            <div className="border-b border-[#302826] pb-4 sm:pb-6">
              <button
                onClick={() => {
                  setActiveTab('simulator');
                  setDrawerOpen(false);
                  setTimeout(() => {
                    const el = document.getElementById('calculator-section');
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }, 100);
                }}
                className="font-serif text-2xl sm:text-5xl text-left hover:text-[#8C5E3C] transition-colors"
              >
                02. The Investment Simulator
              </button>
            </div>

            <div className="border-b border-[#302826] pb-4 sm:pb-6">
              <button
                onClick={() => {
                  setActiveTab('catalog');
                  setDrawerOpen(false);
                  setTimeout(() => {
                    const el = document.getElementById('directory-section');
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }, 100);
                }}
                className="font-serif text-2xl sm:text-5xl text-left hover:text-[#8C5E3C] transition-colors flex items-center justify-between w-full"
              >
                <span>03. The 45 Institutional Calculators</span>
                <span className="text-xs font-mono text-[#8C5E3C] uppercase tracking-wider hidden sm:inline">Explore All</span>
              </button>
            </div>

            <div className="border-b border-[#302826] pb-4 sm:pb-6">
              <button
                onClick={() => {
                  onOpenCompare();
                  setDrawerOpen(false);
                }}
                className="font-serif text-2xl sm:text-5xl text-left hover:text-[#8C5E3C] transition-colors"
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
                className="font-serif text-2xl sm:text-5xl text-left text-[#8C5E3C] hover:text-[#FAF7F2] transition-colors"
              >
                05. Private Underwriting Memorandum
              </button>
            </div>
          </div>

          {/* Mr. Babu James Managing Director Block inside Drawer */}
          <div className="bg-[#1E1716] border border-[#302826] rounded-2xl p-4 sm:p-5 my-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ArielLogo size="sm" showSubtitle={false} />
              <div>
                <div className="text-[10px] uppercase font-mono tracking-widest text-[#B88A58]">
                  Owner &amp; Managing Director · Ariel Group of Companies
                </div>
                <div className="text-sm text-[#FAF7F2] font-serif font-medium">
                  Mr. Babu James (Dr. B. James, PhD)
                </div>
                <div className="text-[10px] text-[#8C857E] font-mono mt-0.5">
                  Mobile: +65 9855 1924 · Office: +65 6908 4338 · Singapore
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href="https://wa.me/6598551924?text=Hello%20Mr.%20Babu%20James,%20I%20would%20like%20to%20enquire%20about%20Ariel%20Investments."
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none text-center px-4 py-2 rounded-full bg-[#B88A58] text-[#14100F] text-xs font-sans font-medium hover:bg-[#C5A880] transition-all flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Mr. Babu James</span>
              </a>
              <a
                href="tel:+6598551924"
                className="px-3.5 py-2 rounded-full border border-[#302826] text-xs font-sans text-[#FAF7F2] hover:border-[#8C5E3C] transition-all flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
            </div>
          </div>

          {/* Novero Agency Block inside Drawer */}
          <div className="bg-[#211A19] border border-[#302826] rounded-2xl p-4 sm:p-5 my-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <NoveroLogo size="md" />
              <div>
                <div className="text-[10px] uppercase font-mono tracking-widest text-[#8C857E]">
                  Digital Product Architecture
                </div>
                <div className="text-xs text-[#FAF7F2] font-medium">
                  Powered &amp; Built by NOVERO
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href="https://shulo.xyz/novero#brief"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none text-center px-4 py-2 rounded-full bg-[#FAF7F2] text-[#191514] text-xs font-sans uppercase tracking-[0.1em] font-semibold hover:bg-white transition-all flex items-center justify-center gap-1.5"
              >
                <span>Enquire with Novero</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://shulo.xyz/novero"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-full border border-[#302826] text-xs font-sans text-[#FAF7F2] hover:border-[#8C5E3C] transition-all"
              >
                Studio ↗
              </a>
            </div>
          </div>

          {/* Bottom Drawer Footer */}
          <div className="border-t border-[#302826] pt-6 flex flex-col sm:flex-row items-baseline justify-between text-xs font-mono text-[#8C857E] gap-4">
            <div>
              © {new Date().getFullYear()} Ariel Properties · Engineered by <a href="https://shulo.xyz/novero" target="_blank" rel="noopener noreferrer" className="text-[#FAF7F2] underline font-bold">NOVERO</a>
            </div>
            <div className="flex items-center gap-6">
              <span>Zero-Storage Privacy</span>
              <span>No Cookies / No Tracking</span>
              <span className="text-[#B88A58]">● 100% Client-Side</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
