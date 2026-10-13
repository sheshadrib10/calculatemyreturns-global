import React from 'react';
import { NoveroLogo } from './NoveroLogo';
import { ExternalLink, ArrowUpRight, Sparkles, Layers, Rocket, ShieldCheck } from 'lucide-react';

export const NoveroShowcase: React.FC = () => {
  return (
    <section className="relative bg-[#110D0C] text-[#FAF7F2] py-20 sm:py-28 border-t border-b border-[#302826] overflow-hidden">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#8C5E3C]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Editorial Attribution Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#302826]">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-sans uppercase tracking-[0.25em] text-[#8C857E] mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Agency of Record · Digital Craftsmanship</span>
            </div>

            <div className="flex items-center gap-4">
              <NoveroLogo size="lg" />
              <div className="border-l border-[#302826] pl-4">
                <span className="text-xs uppercase font-mono tracking-widest text-[#A39E98] block">
                  Product Architecture &amp; Growth
                </span>
                <span className="text-xs text-[#FAF7F2] font-serif italic">
                  Marketing · Experience · Client Acquisition
                </span>
              </div>
            </div>

            <h2 className="mt-6 font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FAF7F2]">
              Powered &amp; Built by Novero.
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href="https://shulo.xyz/novero#brief"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-[#FAF7F2] text-[#191514] hover:bg-white text-xs font-sans uppercase tracking-[0.15em] font-semibold transition-all shadow-lg flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>Enquire with Novero</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="https://shulo.xyz/novero"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full border border-[#302826] bg-[#191514] hover:border-[#8C5E3C] text-xs font-sans uppercase tracking-[0.15em] text-[#FAF7F2] transition-all flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>Explore Studio &amp; Work</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8C857E] group-hover:text-[#FAF7F2] transition-colors" />
            </a>
          </div>
        </div>

        {/* 3 Value Proposition Pillars for Potential Clients */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#191514] border border-[#302826] rounded-3xl p-7 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#211A19] border border-[#302826] flex items-center justify-center text-[#B88A58] mb-5">
                <Rocket className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#FAF7F2]">
                Customer Acquisition &amp; High-Converting Products
              </h3>
              <p className="mt-3 text-xs text-[#A39E98] leading-relaxed font-sans font-light">
                We combine creative engineering, performance marketing, and seamless checkout journeys to turn passive web visitors into high-value qualified leads and active clients.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#2A2220] text-[11px] font-mono text-[#8C5E3C]">
              Commerce · Media · Sales Pipelines
            </div>
          </div>

          <div className="bg-[#191514] border border-[#302826] rounded-3xl p-7 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#211A19] border border-[#302826] flex items-center justify-center text-emerald-400 mb-5">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#FAF7F2]">
                AI &amp; Bespoke Computational Architecture
              </h3>
              <p className="mt-3 text-xs text-[#A39E98] leading-relaxed font-sans font-light">
                Like the Ariel Returns Calculator, our platforms integrate custom mathematical algorithms and intelligent AI copilots that provide flawless accuracy, zero data lag, and institutional trust.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#2A2220] text-[11px] font-mono text-emerald-400">
              Shulo AI · Edge Compute · Cloudflare
            </div>
          </div>

          <div className="bg-[#191514] border border-[#302826] rounded-3xl p-7 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#211A19] border border-[#302826] flex items-center justify-center text-[#D9D3CE] mb-5">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#FAF7F2]">
                End-to-End Brand &amp; Digital Experience
              </h3>
              <p className="mt-3 text-xs text-[#A39E98] leading-relaxed font-sans font-light">
                From high-end luxury real estate and financial advisory to retail scale, Novero operates as your embedded growth team — taking you from conceptual vision to revenue execution.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#2A2220] text-[11px] font-mono text-[#D9D3CE]">
              Creative Direction · Full-Stack Web
            </div>
          </div>
        </div>

        {/* Bottom Direct Invitation */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#191514] border border-[#302826] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="font-serif text-lg sm:text-xl font-normal text-[#FAF7F2]">
              Looking to build a category-leading digital experience or scale client acquisition?
            </h4>
            <p className="mt-1 text-xs text-[#8C857E] font-sans font-light">
              Talk directly with Novero&apos;s leadership to discuss your vision, technology stack, and commercial goals.
            </p>
          </div>

          <a
            href="https://shulo.xyz/novero#brief"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[#8C5E3C] hover:bg-[#A36E46] text-[#FAF7F2] text-xs font-sans uppercase tracking-[0.15em] font-medium transition-all whitespace-nowrap flex items-center gap-2 flex-shrink-0"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
