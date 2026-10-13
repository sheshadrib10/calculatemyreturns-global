import React, { useState } from 'react';
import { CalculatorCategory, CalculatorItem, CurrencyCode, JurisdictionCode } from '../types';
import { CALCULATORS_CATALOG } from '../data/calculatorsList';
import { ArrowRight, Search } from 'lucide-react';

interface CalculatorDirectoryProps {
  currentJurisdiction: JurisdictionCode;
  currentCurrency: CurrencyCode;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenCalculator: (calcId: string) => void;
}

export const CalculatorDirectory: React.FC<CalculatorDirectoryProps> = ({
  currentJurisdiction,
  currentCurrency,
  searchQuery,
  setSearchQuery,
  onOpenCalculator,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...CALCULATORS_CATALOG.map((c) => c.name)];

  const filteredCatalog: CalculatorCategory[] = CALCULATORS_CATALOG.map((cat) => {
    const matchingItems = cat.items.filter((item) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === 'All' || cat.name === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    return {
      ...cat,
      items: matchingItems,
    };
  }).filter((cat) => cat.items.length > 0);

  const totalCount = CALCULATORS_CATALOG.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <section id="directory-section" className="relative bg-[#14100F] text-[#FAF7F2] py-24 sm:py-32 border-b border-[#302826] overflow-hidden">
      {/* Ambient Liquid Refraction Caustics */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#8C5E3C]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-[#FAF7F2]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#302826]">
          <div>
            <div className="text-xs font-sans uppercase tracking-[0.25em] text-[#8C857E] mb-2">
              04 / Multi-Asset Catalog · Sovereign Suite
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF7F2]">
              The 45 Institutional Calculators
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#A39E98] max-w-md font-sans font-light leading-relaxed">
            Spanning multi-asset wealth compounding, systematic equities, prime real estate, sovereign debt, and cross-border tax shields.
          </p>
        </div>

        {/* Liquid Glass Filter Pills */}
        <div className="mt-10 flex items-center gap-2.5 overflow-x-auto pb-4 scrollbar-none">
          {categories.map((catName) => (
            <button
              key={catName}
              onClick={() => setSelectedCategory(catName)}
              className={`px-5 py-2.5 rounded-full text-xs font-sans uppercase tracking-[0.1em] whitespace-nowrap transition-all ${
                selectedCategory === catName
                  ? 'bg-[#FAF7F2] text-[#191514] font-semibold shadow-lg'
                  : 'liquid-glass-pill text-[#A39E98] hover:text-[#FAF7F2]'
              }`}
            >
              {catName}
            </button>
          ))}
        </div>

        {/* Catalog Categories */}
        <div className="mt-14 space-y-16">
          {filteredCatalog.map((category) => (
            <div key={category.name} className="space-y-6">
              
              <div className="flex items-baseline justify-between border-b border-[#302826] pb-4">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#FAF7F2]">
                    {category.name}
                  </h3>
                  <p className="text-xs text-[#8C857E] mt-1 font-sans font-light">
                    {category.description}
                  </p>
                </div>
                <span className="text-xs font-mono text-[#B88A58]">
                  {category.items.length} {category.items.length === 1 ? 'tool' : 'tools'}
                </span>
              </div>

              {/* Grid of Liquid Glass Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onOpenCalculator(item.id)}
                    className="group cursor-pointer liquid-glass-card rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono text-[#8C857E] tracking-wider uppercase">
                          {item.category}
                        </span>
                        {item.isFlagship && (
                          <span className="text-[9px] font-sans uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#191514] font-semibold">
                            Flagship
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif text-xl font-normal text-[#FAF7F2] group-hover:text-[#D9D3CE] transition-colors">
                        {item.name}
                      </h4>

                      <p className="mt-2 text-xs text-[#A39E98] leading-relaxed line-clamp-2 font-sans font-light">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#302826] flex items-center justify-between text-xs font-sans uppercase tracking-[0.1em] text-[#8C857E] group-hover:text-[#FAF7F2] transition-colors">
                      <span className="truncate max-w-[200px] text-[10px] font-mono lowercase text-[#B88A58]">{item.formulaSummary}</span>
                      <div className="flex items-center gap-1.5 font-medium">
                        <span>Launch</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
