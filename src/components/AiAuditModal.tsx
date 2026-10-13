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
      
      <div className="relative w-full max-w-4xl bg-[#191514] border border-[#302826] rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col justify-between text-[#FAF7F2]">
        
        {/* Top Header */}
        <div className="flex items-start justify-between pb-6 border-b border-[#302826]">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-sans uppercase tracking-[0.2em] text-[#8C857E] mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B88A58]" />
              <span>Ariel AI Investment Intelligence · Private Placement Memorandum</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-4xl font-normal text-[#FAF7F2] tracking-tight">
              {auditReport.headline}
            </h3>
            <p className="text-xs text-[#A39E98] mt-1 font-sans font-light">
              Algorithmic institutional review for {jur.name} real estate acquisition. Verified 100% mathematical integrity.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-full border border-[#302826] bg-[#211A19] text-xs font-sans uppercase tracking-[0.1em] text-[#FAF7F2] hover:border-[#8C5E3C] flex items-center gap-2 transition-all"
            >
              <Printer className="w-3.5 h-3.5 text-[#B88A58]" />
              <span>Print Memorandum</span>
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#211A19] border border-[#302826] hover:border-[#8C5E3C] flex items-center justify-center text-[#B9B5AF] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="py-6 space-y-6 overflow-y-auto">
          
          {/* Executive Summary Card */}
          <div className="bg-[#211A19] border border-[#302826] rounded-3xl p-6 sm:p-7">
            <div className="text-xs font-sans uppercase tracking-[0.2em] text-[#8C857E] mb-2">
              Executive Deal Synthesis
            </div>
            <p className="text-sm text-[#FAF7F2] leading-relaxed font-sans font-light">
              {auditReport.executiveSummary}
            </p>

            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#2A2220]">
              <div>
                <span className="text-[10px] font-mono text-[#8C857E]">Deal Score</span>
                <div className="text-xl font-serif text-[#FAF7F2] mt-0.5">{auditReport.score}/100</div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#8C857E]">Annualized IRR</span>
                <div className="text-xl font-serif text-emerald-400 mt-0.5">{formatPercent(results.irr)}</div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#8C857E]">Equity Multiple</span>
                <div className="text-xl font-serif text-[#B88A58] mt-0.5">{results.equityMultiple.toFixed(2)}x</div>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#8C857E]">Rating Class</span>
                <div className="text-xs font-sans font-medium text-[#FAF7F2] truncate mt-1">{auditReport.rating}</div>
              </div>
            </div>
          </div>

          {/* Tax Strategy & Legal Framework */}
          <div className="bg-[#211A19] border border-[#302826] rounded-3xl p-6 sm:p-7 space-y-2">
            <div className="text-xs font-sans uppercase tracking-[0.2em] text-[#8C857E] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Jurisdiction Tax Shield &amp; Optimization Strategy ({jur.name})</span>
            </div>
            <p className="text-xs text-[#FAF7F2] leading-relaxed font-sans font-light">
              {auditReport.taxStrategy}
            </p>
          </div>

          {/* Stress Test Matrix */}
          <div className="bg-[#211A19] border border-[#302826] rounded-3xl p-6 sm:p-7 space-y-4">
            <div className="text-xs font-sans uppercase tracking-[0.2em] text-[#8C857E] flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-[#B88A58]" />
              <span>Sensitivity Analysis &amp; Stress Testing</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#191514] border border-[#302826]">
                <div className="text-xs font-medium text-[#FAF7F2] mb-1">Interest Rate Spike (+2%)</div>
                <div className="text-[11px] text-[#A39E98] leading-relaxed font-light">{auditReport.stressTest.interestShock}</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#191514] border border-[#302826]">
                <div className="text-xs font-medium text-[#FAF7F2] mb-1">Vacancy Shock (2 Months)</div>
                <div className="text-[11px] text-[#A39E98] leading-relaxed font-light">{auditReport.stressTest.vacancyShock}</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#191514] border border-[#302826]">
                <div className="text-xs font-medium text-[#FAF7F2] mb-1">Appreciation Deceleration</div>
                <div className="text-[11px] text-[#A39E98] leading-relaxed font-light">{auditReport.stressTest.exitDownside}</div>
              </div>
            </div>
          </div>

          {/* Advantages vs Risk Warnings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Key Advantages */}
            <div className="p-6 rounded-3xl bg-[#211A19] border border-[#302826] space-y-3">
              <div className="text-xs font-sans uppercase tracking-[0.2em] text-emerald-400 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Primary Deal Strengths</span>
              </div>
              <ul className="text-xs text-[#FAF7F2] space-y-2 font-light">
                {auditReport.keyAdvantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400">✓</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Risk Warnings */}
            <div className="p-6 rounded-3xl bg-[#211A19] border border-[#302826] space-y-3">
              <div className="text-xs font-sans uppercase tracking-[0.2em] text-[#B88A58] flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Underwriting Watch Items</span>
              </div>
              <ul className="text-xs text-[#FAF7F2] space-y-2 font-light">
                {auditReport.riskWarnings.map((risk, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#B88A58]">⚠</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Institutional Recommendations */}
          <div className="p-6 rounded-3xl bg-[#211A19] border border-[#302826] space-y-3">
            <div className="text-xs font-sans uppercase tracking-[0.2em] text-[#8C857E] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B88A58]" />
              <span>Strategic Wealth Advisory Recommendations</span>
            </div>
            <ul className="text-xs text-[#FAF7F2] space-y-2 font-light">
              {auditReport.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[#B88A58]">→</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="pt-5 border-t border-[#302826] flex items-center justify-between text-xs font-mono text-[#8C857E]">
          <span>100% Confidential · No Client Data Logged</span>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#FAF7F2] text-[#191514] font-medium text-xs font-sans uppercase tracking-[0.1em] hover:bg-[#FAF7F2]/90 transition-all"
          >
            Acknowledge &amp; Return
          </button>
        </div>

      </div>

    </div>
  );
};
