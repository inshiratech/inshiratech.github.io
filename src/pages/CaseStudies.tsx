import { CASE_STUDIES } from '../data';
import { Award, CheckCircle2, Quote, Clock, Sparkles } from 'lucide-react';

interface CaseStudiesProps {
  onCtaClick: () => void;
}

export default function CaseStudiesPage({ onCtaClick }: CaseStudiesProps) {
  return (
    <div id="case-studies-page-root" className="space-y-16 pt-10 pb-16">
      
      {/* Header */}
      <section id="case-studies-header" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left space-y-4">
        <span className="font-mono text-xs font-bold text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20 uppercase tracking-widest">
          Diagnostic Playbooks
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl">
          The Losses We Find, Sector by Sector
        </h1>
        <p className="font-sans text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
          Every sector hides its losses differently. Below are the specific failure patterns our causal engine is built to isolate in precision machining, packaging conversion and food and beverage processing — and the data we use to trace each one back to its origin.
        </p>
      </section>

      {/* Case studies list */}
      <section id="case-studies-list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {CASE_STUDIES.map((study, idx) => (
          <div
            key={study.id}
            id={`case-study-block-${study.id}`}
            className="bg-slate-900/30 border border-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[12px] text-teal-400 font-bold bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20 uppercase">
                  {study.industry}
                </span>
                <span className="font-mono text-[12px] text-slate-400">
                  {study.size}
                </span>
              </div>

              <h3 className="font-display text-lg sm:text-2xl font-bold text-white tracking-tight leading-snug">
                {study.title}
              </h3>

              <div className="space-y-3.5 pt-2">
                <div>
                  <h4 className="font-mono text-[12px] text-slate-500 uppercase font-bold tracking-wider mb-1">The Challenge</h4>
                  <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {study.challenge}
                  </p>
                </div>
                <div>
                  <h4 className="font-mono text-[12px] text-slate-500 uppercase font-bold tracking-wider mb-1">The Inshira Implementation</h4>
                  <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {study.solution}
                  </p>
                </div>
              </div>

              {/* Testimonial block renders only when a real, approved customer
                  quote exists. The AI Studio draft carried invented quotes from
                  invented people; those have been removed entirely. */}
              {study.quote && (
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850/80 relative space-y-2">
                  <Quote className="absolute right-4 top-4 w-10 h-10 text-slate-900 shrink-0 pointer-events-none" />
                  <p className="font-sans text-xs text-slate-200 italic leading-relaxed relative z-10">
                    “{study.quote.text}”
                  </p>
                  <div className="flex items-center gap-2.5 pt-1">
                    <span className="font-display text-xs font-bold text-white">{study.quote.author}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                    <span className="font-mono text-[12px] text-slate-500 uppercase">{study.quote.role}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Audited Results Box Column (5 cols) */}
            <div className="lg:col-span-5 bg-slate-950 rounded-xl border border-slate-850 p-6 flex flex-col justify-between h-full space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-1.5 border-b border-slate-900 pb-3">
                  <Sparkles className="w-4 h-4 text-teal-400" />
                  <span className="font-display text-xs font-bold text-white uppercase tracking-wider">What We Isolate</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="font-mono text-[12px] text-slate-500 uppercase tracking-wider block">Primary Loss Type</span>
                    <span className="font-display text-base sm:text-lg font-bold text-teal-400 block mt-0.5">
                      {study.results.downtimeReduction}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-[12px] text-slate-500 uppercase tracking-wider block">Secondary Loss Type</span>
                    <span className="font-display text-base sm:text-lg font-bold text-teal-400 block mt-0.5">
                      {study.results.wasteReduction}
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-[12px] text-slate-500 uppercase tracking-wider block">Data We Use</span>
                    <span className="font-display text-base sm:text-lg font-bold text-white block mt-0.5">
                      {study.results.annualSavings}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-900 flex justify-between items-center gap-3 text-[12px] font-mono">
                <span className="text-slate-500 uppercase shrink-0">Signal:</span>
                <span className="text-slate-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-right">
                  {study.results.paybackPeriod}
                </span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Case studies CTA */}
      <section id="case-studies-cta" className="max-w-3xl mx-auto px-4 text-center space-y-6">
        <h3 className="font-display text-lg sm:text-xl font-bold text-white">
          Run These Diagnostics On Your Own Lines
        </h3>
        <p className="font-sans text-[13px] text-slate-400 leading-relaxed">
          Book a diagnostic session and we will map your actual line parameters, so the numbers you see come from your data rather than a borrowed benchmark. These diagnostics come from engineers who have delivered improvements on real production lines across aerospace, automotive and process manufacturing. We keep client names confidential — the engineering is on the record.
        </p>
        <button
          onClick={onCtaClick}
          className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-xl font-sans text-xs font-bold tracking-wide transition-all shadow-lg"
        >
          Book Complementary Diagnostic Call
        </button>
      </section>

    </div>
  );
}
