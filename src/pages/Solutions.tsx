import { useState } from 'react';
import {
  TrendingUp,
  Clock,
  Briefcase,
  Layers,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  User,
  Activity,
  Award
} from 'lucide-react';

interface SolutionsProps {
  onCtaClick: () => void;
}

export default function SolutionsPage({ onCtaClick }: SolutionsProps) {
  const [activeRole, setActiveRole] = useState<'director' | 'manager' | 'engineer'>('director');

  const roleSolutions = {
    director: {
      roleTitle: 'Operations & Managing Directors',
      subtitle: 'Maximize Capacity, Retain Profit Margins',
      challenge: 'Directors lack direct floor visibility and must rely on static, historic month-end reports. They face extreme pressure to preserve margins in an era of rising energy and raw material costs without physical capital expansion.',
      pain: '“I cannot confidently make investment choices when I do not know where we are losing capacity. Traditional BI dashboards just show me retrospectively that OEE fell, but not how to fix it.”',
      outcomes: [
        { title: 'Recover Overlooked Floor Capacity', text: 'Avoid £100k+ in capital equipment expansion by recovering unutilized capacity hidden by operator speed-overrides.' },
        { title: 'Quantify Financial Loss in Real Time', text: 'Every micro-stoppage or setup bottleneck is instantly translated into direct material, labor, and energy loss (£).' },
        { title: 'Validate ROI of Lean Actions', text: 'Model the payback period of setup reductions or plant configuration shifts before spending engineering time.' }
      ]
    },
    manager: {
      roleTitle: 'Plant & Production Managers',
      subtitle: 'Stabilize Shift Output, Prevent Unplanned Downtime',
      challenge: 'Plant managers are constantly reactive. They spend hours in manual morning meetings trying to piece together why a line stalled, sorting through incomplete operator notes and fragmented Excel spreadsheets.',
      pain: '“I spend my entire shift firefighting short micro-stoppages. I have plenty of telemetry and PLC data, but no time to sit and find the hidden correlations.”',
      outcomes: [
        { title: 'Eliminate Unrecorded Micro-Stops', text: 'Automatically capture and group packaging or feeding halts shorter than 90 seconds, resolving up to 30% of unplanned losses.' },
        { title: 'Synchronize Shift Best-Practices', text: 'Detect operational parameters (cool-down ramps, pre-heating levels) unique to your highest-performing shift teams.' },
        { title: 'Action Center Focus', text: 'Operators receive straightforward, high-impact guidance instead of staring at complex OEE charts or dashboards.' }
      ]
    },
    engineer: {
      roleTitle: 'Continuous Improvement Leads & Lean Engineers',
      subtitle: 'Replace Speculation with Scientific Causal Analytics',
      challenge: 'CI engineers are tasked with driving overall equipment effectiveness (OEE). However, isolating the root causes of start-up scrap or transition bottlenecks takes weeks of manual time sifting through spreadsheets.',
      pain: '“I know we have yield losses during grade changes, but proving whether it is due to nozzle pressure, polymer grade variation, or temperature ramps is almost impossible.”',
      outcomes: [
        { title: 'Instant Upstream Correlation', text: 'Inshira’s causal engine instantly cross-references temperature anomalies, speed profiles, and batch materials.' },
        { title: 'Repeatable Changeover Science', text: 'Turn changeover procedures from operator preference into an exact, standardized, data-backed timeline.' },
        { title: 'Uncover Causal Chains', text: 'Differentiate between secondary machinery fault symptoms and the true upstream thermal or mechanical trigger.' }
      ]
    }
  };

  const currentRole = roleSolutions[activeRole];

  return (
    <div id="solutions-page-root" className="space-y-16 pt-10 pb-16">
      
      {/* Header */}
      <section id="solutions-header" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left space-y-4">
        <span className="font-mono text-xs font-bold text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20 uppercase tracking-widest">
          Continuous Improvement Solutions
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl">
          Role-Specific Industrial Intelligence
        </h1>
        <p className="font-sans text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
          Operational Intelligence isn’t a one-size-fits-all dashboard. We structure insights specifically for B2B manufacturing roles to deliver immediate value.
        </p>
      </section>

      {/* Interactive Role Selector tabs and panel */}
      <section id="solutions-role-selector" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Navigation: 4 cols */}
          <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
            <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Select Your Core Focus</span>
            
            {(['director', 'manager', 'engineer'] as const).map((role) => (
              <button
                key={role}
                id={`btn-role-${role}`}
                onClick={() => setActiveRole(role)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between gap-4 ${
                  activeRole === role
                    ? 'bg-gradient-to-tr from-slate-900 to-teal-950/20 border-teal-500/30 text-white shadow-lg'
                    : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:text-white hover:bg-slate-900/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    activeRole === role ? 'bg-teal-500 text-slate-950' : 'bg-slate-900 text-slate-500'
                  }`}>
                    <User className="w-4.5 h-4.5" />
                  </div>
                  <span className="font-display text-xs sm:text-sm font-bold tracking-wide">
                    {roleSolutions[role].roleTitle.split(' & ')[0]}
                  </span>
                </div>
                <ArrowRight className={`w-4 h-4 transition-transform ${
                  activeRole === role ? 'translate-x-0.5 text-teal-400' : 'text-slate-600'
                }`} />
              </button>
            ))}
          </div>

          {/* Right Panel Content: 8 cols */}
          <div className="lg:col-span-8 bg-slate-900/30 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4.5 h-4.5 text-teal-400 animate-pulse" />
                <span className="font-mono text-[9px] text-teal-400 uppercase tracking-wider font-bold">
                  {currentRole.roleTitle} Focus Suite
                </span>
              </div>

              <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
                {currentRole.subtitle}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                <div>
                  <span className="font-mono text-[9px] text-slate-500 uppercase tracking-wider block font-bold mb-1">Typical Plant Pain</span>
                  <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-850 italic text-slate-300 font-sans text-xs leading-relaxed">
                    {currentRole.pain}
                  </div>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-slate-500 uppercase tracking-wider block font-bold mb-1">Operational Challenge</span>
                  <p className="font-sans text-xs text-slate-400 leading-relaxed">
                    {currentRole.challenge}
                  </p>
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <span className="font-mono text-[9px] text-teal-400 uppercase tracking-wider block font-bold">Inshira Operational Outcomes</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {currentRole.outcomes.map((out, index) => (
                    <div key={index} className="bg-slate-950 p-4 rounded-xl border border-slate-850 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-teal-400">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span className="font-display text-[11px] font-bold text-white tracking-wide uppercase">{out.title}</span>
                      </div>
                      <p className="font-sans text-[10.5px] text-slate-400 leading-relaxed">
                        {out.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-850 flex items-center justify-between gap-4">
              <span className="font-sans text-[11px] text-slate-500">
                Contact our engineering consultants to schedule a tailored walkthrough of this focus suite.
              </span>
              <button
                onClick={onCtaClick}
                className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-lg font-sans text-[11px] font-bold tracking-wide transition-all shadow-lg"
              >
                Inquire For This Role
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Case Studies / Proof points */}
      <section id="solutions-proof" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-slate-900/20 py-10 rounded-2xl border border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="space-y-2">
            <Award className="w-8 h-8 text-teal-400 mx-auto sm:mx-0" />
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wide">2.8 Months Average Payback</h4>
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              Based on audited pilot data from 20+ manufacturing sites in precision engineering, packaging, and beverage industries.
            </p>
          </div>
          <div className="space-y-2">
            <Clock className="w-8 h-8 text-teal-400 mx-auto sm:mx-0" />
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wide">Under 2 Weeks Integration</h4>
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              We extract offline logs and connect read-only secure APIs with zero downtime, zero sensor costs, and no ERP friction.
            </p>
          </div>
          <div className="space-y-2">
            <TrendingUp className="w-8 h-8 text-teal-400 mx-auto sm:mx-0" />
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wide">OEE Recovery Guarantee</h4>
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              If our decision engine does not identify at least 3x your pilot cost in hidden operational losses within 60 days, we refund 100%.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions CTA */}
      <section id="solutions-cta" className="max-w-3xl mx-auto px-4 text-center space-y-6">
        <h3 className="font-display text-lg sm:text-xl font-bold text-white">
          Identify Your Losses Within 48 Hours
        </h3>
        <p className="font-sans text-xs text-slate-400 leading-relaxed">
          Unlock deep visibility on your lines. Get in touch to schedule a complimentary 30-minute diagnostic session where we map your factory’s variables and review potential savings.
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
