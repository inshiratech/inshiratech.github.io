import DashboardMockup from '../components/DashboardMockup';
import InteractiveDigitalTwin from '../components/InteractiveDigitalTwin';
import FuturePipeline from '../components/FuturePipeline';
import {
  Cpu,
  Layers,
  Zap,
  Activity,
  ArrowRight,
  Shield,
  Clock,
  CheckCircle2,
  Lock,
  Search
} from 'lucide-react';

interface PlatformProps {
  onCtaClick: () => void;
}

export default function PlatformPage({ onCtaClick }: PlatformProps) {
  const capabilities = [
    {
      icon: Clock,
      title: 'Downtime Diagnostics',
      desc: 'Connect to PLC counters to group micro-stoppages (<90 seconds) that operators typically omit. Quantify financial leakage automatically.'
    },
    {
      icon: Search,
      title: 'Automated Root Cause Analysis',
      desc: 'Correlate quality scrap rates and grade transitions with machine parameters (speed, temperature) to isolate causal chains.'
    },
    {
      icon: Layers,
      title: 'Operational Overlay',
      desc: 'Zero equipment upgrades. Inshira sits on top of your existing logs, databases, and spreadsheets as a secure read-only analytics layer.'
    },
    {
      icon: Shield,
      title: 'Decision Support Simulator',
      desc: 'An enterprise-grade digital twin that lets you model changeovers or speed recoveries before allocating CAPEX budget.'
    }
  ];

  return (
    <div id="platform-page-root" className="space-y-20 pt-10 pb-16">
      
      {/* Page Header */}
      <section id="platform-header" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left space-y-4">
        <span className="font-mono text-xs font-bold text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20 uppercase tracking-widest">
          The Platform Suite
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl">
          Decision Intelligence Overlay for SME Manufacturing
        </h1>
        <p className="font-sans text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
          Most factories have plenty of data. They suffer from a lack of clarity. Inshira unifies your fragmented silos to deliver clear, prioritized optimization commands.
        </p>
      </section>

      {/* Embedded Live Dashboard Mockup */}
      <section id="platform-dashboard-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center mb-8">
          <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Interactive Platform Live Preview</span>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
            Observe the Inshira Interface in Real Time
          </h2>
          <p className="font-sans text-xs text-slate-400 max-w-2xl mx-auto">
            Interact with the line selectors or trigger a <strong className="font-semibold text-white">Root Cause Deconstruction</strong> below to see how our causal algorithm exposes hidden capacity losses.
          </p>
        </div>
        <DashboardMockup />
      </section>

      {/* Detailed Technical Capabilities Grid */}
      <section id="platform-features-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center sm:text-left space-y-2">
          <span className="font-mono text-[10px] text-teal-400 uppercase tracking-wider font-bold block">Engineering Architecture</span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white">How We Solve Operational Blind Spots</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon;
            return (
              <div key={index} className="bg-slate-900/30 p-5 rounded-xl border border-slate-850 hover:border-slate-800 transition-colors space-y-4">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-display text-sm font-bold text-white uppercase tracking-wide">{cap.title}</h4>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">{cap.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Decision Twin modeling section */}
      <section id="platform-twin-modeling" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="font-mono text-[10px] text-teal-400 uppercase tracking-wider font-bold block">Interactive Digital Twin</span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-white">Model Before You Deploy</h3>
          <p className="font-sans text-xs text-slate-400">
            Estimate paybacks, efficiency gains, and carbon reduction before investing engineering time. Drag the controls below to calculate your yields.
          </p>
        </div>
        <InteractiveDigitalTwin />
      </section>

      {/* Enterprise Security Overlay architecture block */}
      <section id="platform-security-architecture" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-teal-400" />
              <span className="font-mono text-xs font-bold text-teal-400 uppercase tracking-wider">Enterprise Security</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
              Read-Only Connection. No Physical Overhaul.
            </h3>
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              Inshira uses advanced database overlays to access historical logs and PLC streams through secure, read-only network proxies. We never push code back to active PLC systems, ensuring zero risk of control override or system interruption. 
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-sans text-xs text-slate-300 pt-2">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                No physical sensors needed
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                AES-256 end-to-end data encryption
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                Iso-Container account segregation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                Zero interference with machine logic
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5 bg-slate-950 p-5 rounded-xl border border-slate-850 space-y-3 font-mono text-[11px] text-slate-400">
            <div className="flex justify-between border-b border-slate-900 pb-2 text-teal-400 font-bold">
              <span>Secure Gateway Status</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                ACTIVE
              </span>
            </div>
            <p>TLS_v1.3 tunnel connection initialized...</p>
            <p className="text-slate-500">Connecting endpoint inshira-core.co.uk &lt;-&gt; plant-plc-router</p>
            <p>Evaluating PLC telemetry stream... OK</p>
            <p>Data scrubbing pattern: Remove operator names and personal metadata... Verified</p>
            <p className="text-slate-500">Security audits synced with ISO-27001 guidelines.</p>
          </div>
        </div>
      </section>

      {/* Future Products Roadmap Pipeline */}
      <section id="platform-future-pipeline" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FuturePipeline />
      </section>

      {/* CTA Box */}
      <section id="platform-cta-footer" className="max-w-3xl mx-auto px-4 text-center space-y-6 pt-10">
        <h4 className="font-display text-lg sm:text-xl font-bold text-white">
          Ready to Connect Your Plant?
        </h4>
        <p className="font-sans text-xs text-slate-400 leading-relaxed">
          Arrange an expert diagnostic evaluation. We’ll analyze an offline export of your machine logs or Excel records to prove recoverable losses before connecting any live pipelines.
        </p>
        <button
          onClick={onCtaClick}
          className="px-6 py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-xl font-sans text-xs font-bold tracking-wide transition-all shadow-lg shadow-teal-500/10"
        >
          Book Complementary Diagnostic Call
        </button>
      </section>

    </div>
  );
}
