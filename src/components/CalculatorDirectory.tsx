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
    <section id="directory-section" className="bg-[#FAF7F2] text-[#211A19] py-24 sm:py-32 border-b border-[#E8E2D8]">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E8E2D8]">
          <div>
            <div className="text-xs font-sans uppercase tracking-[0.25em] text-[#8C857E] mb-2">
              04 / The Complete Collection
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#211A19]">
              The 45 Institutional Calculators
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#7D7571] max-w-md font-sans font-light leading-relaxed">
            Replicating and expanding the entire calculatemyreturns financial library across 10 specialized wealth modules. No signup required.
          </p>
        </div>

        {/* Filter Pills (Lenval Style) */}
        <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {categories.map((catName) => (
            <button
              key={catName}
              onClick={() => setSelectedCategory(catName)}
              className={`px-5 py-2.5 rounded-full text-xs font-sans uppercase tracking-[0.1em] whitespace-nowrap transition-all ${
                selectedCategory === catName
                  ? 'bg-[#211A19] text-[#FAF7F2] font-medium'
                  : 'bg-[#F5EFEB] border border-[#E8E2D8] text-[#7D7571] hover:text-[#211A19] hover:border-[#8C5E3C]'
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
              
              <div className="flex items-baseline justify-between border-b border-[#E8E2D8] pb-4">
                <div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#211A19]">
                    {category.name}
                  </h3>
                  <p className="text-xs text-[#8C857E] mt-1 font-sans font-light">
                    {category.description}
                  </p>
                </div>
                <span className="text-xs font-mono text-[#8C5E3C]">
                  {category.items.length} {category.items.length === 1 ? 'tool' : 'tools'}
                </span>
              </div>

              {/* Grid of Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => onOpenCalculator(item.id)}
                    className="group cursor-pointer bg-[#F5EFEB] hover:bg-[#FAF7F2] border border-[#E8E2D8] hover:border-[#8C5E3C] rounded-3xl p-7 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono text-[#8C857E] tracking-wider uppercase">
                          {item.category}
                        </span>
                        {item.isFlagship && (
                          <span className="text-[9px] font-sans uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-[#211A19] text-[#FAF7F2]">
                            Flagship
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif text-xl font-medium text-[#211A19] group-hover:text-[#8C5E3C] transition-colors">
                        {item.name}
                      </h4>

                      <p className="mt-2 text-xs text-[#5C5550] leading-relaxed line-clamp-2 font-sans font-light">
                        {item.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-[#E8E2D8] flex items-center justify-between text-xs font-sans uppercase tracking-[0.1em] text-[#8C857E] group-hover:text-[#211A19] transition-colors">
                      <span className="truncate max-w-[200px] text-[10px] font-mono lowercase">{item.formulaSummary}</span>
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
