import React from 'react';
import { AiAuditReport, CurrencyCode, JurisdictionCode, PropertyInputs, PropertySimulationResult } from '../types';
import { JURISDICTIONS } from '../data/jurisdictions';
import { formatCurrency, formatPercent } from '../utils/finance';
import { X, Sparkles, Printer, ShieldCheck, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

interface AiAuditModalProps {
  onClose: () => void;
  auditReport: AiAuditReport;
  inputs: PropertyInputs;
  results: PropertySimulationResult;
  currentJurisdiction: JurisdictionCode;
  currentCurrency: CurrencyCode;
}

export const AiAuditModal: React.FC<AiAuditModalProps> = ({
  onClose,
  auditReport,
  inputs,
  results,
  currentJurisdiction,
  currentCurrency,
}) => {
  const jur = JURISDICTIONS[currentJurisdiction] || JURISDICTIONS.SG;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      <div className="relative w-full max-w-4xl bg-[#171211] border border-[#D4AF37]/50 rounded-3xl p-6 sm:p-9 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col justify-between">
        
        {/* Ambient Gold Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.15),transparent_70%)] pointer-events-none" />

        {/* Top Header */}
        <div className="flex items-start justify-between pb-5 border-b border-[#2E2421]">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ariel AI Investment Intelligence · Private Placement Memorandum</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white tracking-tight">
              {auditReport.headline}
            </h3>
            <p className="text-xs text-[#A39E98] mt-1 font-sans">
              Algorithmic institutional review for {jur.name} real estate acquisition. Verified 100% mathematical integrity.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-lg border border-[#2E2421] bg-[#1C1615] text-xs text-[#EAE6E1] hover:border-[#D4AF37] flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Print Memorandum</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#1C1615] border border-[#2E2421] hover:border-[#D4AF37] flex items-center justify-center text-[#B9B5AF] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="py-6 space-y-6 overflow-y-auto">
          
          {/* Executive Summary Card */}
          <div className="bg-[#1C1615] border border-[#2E2421] rounded-2xl p-5">
            <div className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] mb-2">
              Executive Deal Synthesis
            </div>
            <p className="text-sm text-[#EAE6E1] leading-relaxed font-sans">
              {auditReport.executiveSummary}
            </p>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#251D1B]">
              <div>
                <span className="text-[10px] font-mono text-[#8C857E]">Deal Score</span>
                <div className="text-lg font-mono font-bold text-gold-gradient">{auditReport.score}/100</div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#8C857E]">Annualized IRR</span>
                <div className="text-lg font-mono font-bold text-emerald-400">{formatPercent(results.irr)}</div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#8C857E]">Equity Multiple</span>
                <div className="text-lg font-mono font-bold text-white">{results.equityMultiple.toFixed(2)}x</div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#8C857E]">Rating Class</span>
                <div className="text-xs font-mono font-semibold text-[#D4AF37] truncate mt-1">{auditReport.rating}</div>
              </div>
            </div>
          </div>

          {/* Tax Strategy & Legal Framework */}
          <div className="bg-[#1C1615] border border-[#2E2421] rounded-2xl p-5 space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Jurisdiction Tax Shield &amp; Optimization Strategy ({jur.name})</span>
            </div>
            <p className="text-xs text-[#B9B5AF] leading-relaxed font-sans">
              {auditReport.taxStrategy}
            </p>
          </div>

          {/* Stress Test Matrix */}
          <div className="bg-[#1C1615] border border-[#2E2421] rounded-2xl p-5 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              <span>Sensitivity Analysis &amp; Stress Testing</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#140F0E] border border-[#2E2421]">
                <div className="text-[11px] font-semibold text-white mb-1">Interest Rate Spike (+2%)</div>
                <div className="text-[11px] text-[#A39E98] leading-relaxed">{auditReport.stressTest.interestShock}</div>
              </div>

              <div className="p-3 rounded-xl bg-[#140F0E] border border-[#2E2421]">
                <div className="text-[11px] font-semibold text-white mb-1">Vacancy Shock (2 Months)</div>
                <div className="text-[11px] text-[#A39E98] leading-relaxed">{auditReport.stressTest.vacancyShock}</div>
              </div>

              <div className="p-3 rounded-xl bg-[#140F0E] border border-[#2E2421]">
                <div className="text-[11px] font-semibold text-white mb-1">Appreciation Deceleration</div>
                <div className="text-[11px] text-[#A39E98] leading-relaxed">{auditReport.stressTest.exitDownside}</div>
              </div>
            </div>
          </div>

          {/* Advantages vs Risk Warnings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Key Advantages */}
            <div className="p-4 rounded-2xl bg-[#1C1615] border border-[#2E2421] space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Primary Deal Strengths</span>
              </div>
              <ul className="text-xs text-[#B9B5AF] space-y-1.5">
                {auditReport.keyAdvantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risk Warnings */}
            <div className="p-4 rounded-2xl bg-[#1C1615] border border-[#2E2421] space-y-2">
              <div className="text-xs font-mono uppercase tracking-wider text-amber-500 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Underwriting Watch Items</span>
              </div>
              <ul className="text-xs text-[#B9B5AF] space-y-1.5">
                {auditReport.riskWarnings.map((risk, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-500">⚠</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Institutional Recommendations */}
          <div className="p-4 rounded-2xl bg-[#1C1615] border border-[#2E2421] space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-[#D4AF37] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Strategic Wealth Advisory Recommendations</span>
            </div>
            <ul className="text-xs text-[#B9B5AF] space-y-1.5">
              {auditReport.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#D4AF37]">→</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-[#2E2421] flex items-center justify-between text-xs font-mono text-[#8C857E]">
          <span>100% Confidential · No Client Data Logged</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#E5C07B] text-[#140F0E] font-semibold text-xs transition-all shadow-md"
          >
            Acknowledge &amp; Return
          </button>
        </div>

      </div>

    </div>
  );
};
