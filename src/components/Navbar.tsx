import React, { useState } from 'react';
import { CurrencyCode, JurisdictionCode } from '../types';
import { CURRENCIES, JURISDICTIONS } from '../data/jurisdictions';
import { Globe, Coins, ShieldCheck, X, Sparkles, Layers, TrendingUp, ArrowUpRight, Phone, MessageSquare } from 'lucide-react';
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

            {/* Brand Logo in Lenval Editorial Serif + Novero Attribution */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setActiveTab('simulator');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left focus:outline-none flex items-center gap-2.5 group"
              >
                <ArielLogo size="sm" showSubtitle={false} />
                <span className="font-serif text-lg sm:text-xl tracking-[0.05em] text-[#FAF7F2] group-hover:text-[#D9D3CE] transition-colors whitespace-nowrap hidden md:inline">
                  Investments
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase font-sans text-[#8C857E] border-l border-[#302826] pl-2.5 hidden 2xl:inline whitespace-nowrap">
                  Returns Suite
                </span>
              </button>

              <a
                href="https://shulo.xyz/novero"
                target="_blank"
                rel="noopener noreferrer"
                title="Powered & Built by Novero"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#211A19]/90 border border-[#302826] hover:border-[#8C5E3C] text-[10px] font-mono tracking-wider text-[#A39E98] hover:text-[#FAF7F2] transition-colors group"
              >
                <span className="text-[9px] uppercase tracking-widest text-[#8C857E] group-hover:text-[#FAF7F2] hidden sm:inline">
                  Powered &amp; Built by
                </span>
                <NoveroLogo size="xs" />
                <ArrowUpRight className="w-3 h-3 text-[#B88A58] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Center Navigation Links (Lenval Editorial Menu) */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-sans tracking-[0.15em] uppercase text-[#A39E98]">
            <button
              onClick={() => {
                setActiveTab('simulator');
                const el = document.getElementById('overview-section');
                if (el) {
                  const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className="hover:text-[#FAF7F2] transition-colors"
            >
              Overview
            </button>
            <button
              onClick={() => {
                setActiveTab('simulator');
                const el = document.getElementById('calculator-section');
                if (el) {
                  const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className={`transition-colors ${activeTab === 'simulator' ? 'text-[#FAF7F2] font-semibold' : 'hover:text-[#FAF7F2]'}`}
            >
              The Simulator
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
                <CountryFlag code={activeJur.code} size="sm" />
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

            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCurrencyDropdown(!showCurrencyDropdown);
                  setShowCountryDropdown(false);
                }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#302826] bg-[#211A19]/80 hover:border-[#8C5E3C] text-xs font-mono text-[#FAF7F2] transition-all"
              >
                <CountryFlag code={activeCurr.code} size="xs" />
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
                          <CountryFlag code={c.code} size="xs" />
                          <span>{c.code}</span>
                        </span>
                        <span className="text-[#8C857E]">{c.symbol}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Direct Enquiry with Managing Director & Owner Mr. Babu James */}
            <button
              onClick={onOpenPrincipalContact}
              className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#3E3330] bg-[#211A19] hover:border-[#8C5E3C] hover:bg-[#2A211E] text-[#FAF7F2] text-xs font-sans tracking-wide transition-all shadow-sm"
              title="Direct Enquiry with Mr. Babu James (Owner & Managing Director)"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B88A58]" />
              <span>Contact Mr. Babu James</span>
            </button>

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
