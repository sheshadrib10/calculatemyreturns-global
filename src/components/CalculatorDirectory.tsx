import React, { useState } from 'react';
import { CalculatorCategory, CalculatorItem, CurrencyCode, JurisdictionCode } from '../types';
import { CALCULATORS_CATALOG } from '../data/calculatorsList';
import {
  Search,
  ArrowRight,
  TrendingUp,
  Building2,
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
  ShieldCheck,
  Scale,
  Clock,
  Landmark,
  Coins,
  Percent,
} from 'lucide-react';

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

  // Filter items
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

  const totalCalculatorsCount = CALCULATORS_CATALOG.reduce((acc, cat) => acc + cat.items.length, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Directory Title & Overview */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#D4AF37]/30 bg-[#1C1615] text-[11px] font-mono text-[#D4AF37] mb-3">
          <span>Complete Suite</span>
          <span>·</span>
          <span>{totalCalculatorsCount} Specialized Financial Calculators</span>
          <span>·</span>
          <span>No Signup</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white tracking-tight">
          Comprehensive Wealth &amp; Investment Directory
        </h2>
        <p className="mt-2 text-sm text-[#A39E98]">
          Institutional-grade calculators spanning real estate, systematic wealth compounding, retirement solvency, cross-border FX, and statutory tax shields.
        </p>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map((catName) => (
          <button
            key={catName}
            onClick={() => setSelectedCategory(catName)}
            className={`px-4 py-2 rounded-full text-xs whitespace-nowrap transition-all font-sans ${
              selectedCategory === catName
                ? 'bg-[#D4AF37] text-[#140F0E] font-semibold shadow-md'
                : 'bg-[#171211] border border-[#2E2421] text-[#A39E98] hover:text-white hover:border-[#3D2E2A]'
            }`}
          >
            {catName}
          </button>
        ))}
      </div>

      {/* Categorized Calculators Grid */}
      <div className="space-y-12">
        {filteredCatalog.map((category) => (
          <div key={category.name} className="space-y-4">
            
            {/* Category Header */}
            <div className="flex items-baseline justify-between border-b border-[#2E2421]/80 pb-3">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-white">
                  {category.name}
                </h3>
                <p className="text-xs text-[#8C857E] mt-0.5 font-sans">
                  {category.description}
                </p>
              </div>
              <span className="text-xs font-mono text-[#D4AF37]">
                {category.items.length} {category.items.length === 1 ? 'tool' : 'tools'}
              </span>
            </div>

            {/* Grid of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onOpenCalculator(item.id)}
                  className="group cursor-pointer bg-[#171211] hover:bg-[#1E1716] border border-[#2E2421] hover:border-[#D4AF37]/60 rounded-2xl p-5 transition-all duration-200 flex flex-col justify-between shadow-sm hover:shadow-[0_0_20px_rgba(212,175,55,0.08)] relative"
                >
                  {item.isFlagship && (
                    <span className="absolute top-4 right-4 text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#2B1B13] border border-[#D4AF37]/50 text-[#D4AF37]">
                      Flagship
                    </span>
                  )}

                  <div>
                    <div className="flex items-center gap-2 mb-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#251D1B] border border-[#2E2421] flex items-center justify-center text-[#D4AF37] group-hover:border-[#D4AF37]/50 transition-colors">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <h4 className="font-serif text-base font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
                        {item.name}
                      </h4>
                    </div>

                    <p className="text-xs text-[#A39E98] leading-relaxed line-clamp-2 font-sans mb-3">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#251D1B] flex items-center justify-between text-[11px] font-mono text-[#8C857E]">
                    <span className="truncate max-w-[200px]">{item.formulaSummary}</span>
                    <span className="text-[#D4AF37] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Launch</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
