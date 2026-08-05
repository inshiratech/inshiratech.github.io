import { useState } from 'react';
import {
  Cpu,
  GlassWater,
  Layers,
  Wrench,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface IndustriesProps {
  onCtaClick: () => void;
}

export default function IndustriesPage({ onCtaClick }: IndustriesProps) {
  const [activeIndustry, setActiveIndustry] = useState<'automotive' | 'beverage' | 'packaging' | 'machinery'>('automotive');

  const industries = {
    automotive: {
      icon: Cpu,
      title: 'Precision Machining & Automotive',
      tagline: 'Preserve Tool Integrity, Eradicate Micro-Stoppages',
      challenge: 'Automotive and precision parts manufacturers run high-speed, high-tolerance CNC and stamping operations. Tool-tip wear, coolant temperature drift, and material hardness fluctuations cause micro-shatters and small stops that Operator logbooks routinely omit.',
      solution: 'Inshira integrates direct spindle vibration signals and coolant telemetry from existing PLCs. Our causal engine correlates micro-burrs and tool-wear with specific metal batch codes and operator speed overrides.',
      results: [
        '28% reduction in unplanned micro-stops',
        '14% reduction in raw steel scrap',
        '£142k direct annual capacity recovery'
      ]
    },
    beverage: {
      icon: GlassWater,
      title: 'Food & Beverage Processing',
      tagline: 'Resolve Giveaway Losses, Stabilize High-Speed Filling',
      challenge: 'High-speed bottling and packaging lines experience rapid grade changes and strict hygiene shutdowns. Weight giveaway (overfill) and nozzle pressure drops during rapid filling cycles lead to high material waste and overall equipment effectiveness (OEE) bottlenecks.',
      solution: 'Inshira bridges PLC bottling stroke count with upstream batch scales and pasteurization temperatures. It pinpoints the precise machinery speeds and ambient temperatures that trigger excessive product giveaway.',
      results: [
        '19% reduction in product fill giveaway',
        '12% decrease in changeover wash delays',
        '£115k average annual yield recovery'
      ]
    },
    packaging: {
      icon: Layers,
      title: 'Converters & Packaging Lines',
      tagline: 'Standardize Setup Sequences, Cut Polyurethane Scrap',
      challenge: 'High-variety packaging converters perform up to 5 grade and thickness changeovers daily. Extruder warm-up curves, tension calibration anomalies, and misalignment during start-up cause massive material scrap and irregular changeover times.',
      solution: 'Inshira maps extrusion temperature profiles during setups, delivering step-by-step pre-heating calibrations directly to line operators to minimize material rejection.',
      results: [
        '34% reduction in start-up reel scrap',
        '22% increase in line setup availability',
        '£98k saved in annual raw materials & energy'
      ]
    },
    machinery: {
      icon: Wrench,
      title: 'Machinery & Component Assembly',
      tagline: 'Synchronize Assembly Sequences, Settle Takt Discrepancies',
      challenge: 'Discrete assembly plants suffer from manual shift speed imbalances, tool misalignments, and supplier component feed delay bottlenecks. Takt-time variances across work cells go unchecked due to fragmented shift spreadsheets.',
      solution: 'Inshira consolidates torque-driver logs, conveyor cycle signals, and operator schedules, mapping handoff bottlenecks to optimize component delivery routines.',
      results: [
        '11% increase in line assembly throughput',
        '30m recovered per operator shift',
        'Settle manual process takt-time variance'
      ]
    }
  };

  const currentInd = industries[activeIndustry];

  return (
    <div id="industries-page-root" className="space-y-16 pt-10 pb-16">
      
      {/* Header */}
      <section id="industries-header" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left space-y-4">
        <span className="font-mono text-xs font-bold text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20 uppercase tracking-widest">
          Sectors We Serve
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl">
          Engineered for Physics, Not Just Financials
        </h1>
        <p className="font-sans text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
          Generic business intelligence dashboards fail on the factory floor because they do not understand the physics of your machines. Inshira maps customized physical process models for your sector.
        </p>
      </section>

      {/* Selector Tabs and Showcase Panel */}
      <section id="industries-showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Horizontal / Vertical Selector List */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-mono text-[12px] text-slate-500 uppercase tracking-widest block font-bold mb-1">Industrial Verticals</span>
            
            {(['automotive', 'beverage', 'packaging', 'machinery'] as const).map((ind) => {
              const IndIcon = industries[ind].icon;
              return (
                <button
                  key={ind}
                  id={`btn-ind-${ind}`}
                  onClick={() => setActiveIndustry(ind)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-4.5 ${
                    activeIndustry === ind
                      ? 'bg-gradient-to-tr from-slate-900 to-teal-950/20 border-teal-500/30 text-white shadow-lg'
                      : 'bg-slate-950/40 border-slate-900 text-slate-400 hover:text-white hover:bg-slate-900/40'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    activeIndustry === ind ? 'bg-teal-500 text-slate-950' : 'bg-slate-900 text-slate-500'
                  }`}>
                    <IndIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-display text-xs sm:text-sm font-bold tracking-wide block">
                      {industries[ind].title.split(' & ')[0]}
                    </span>
                    <span className="font-mono text-[12px] text-slate-500 block">
                      {ind === 'automotive' ? 'Automotive & CNC' : ind === 'beverage' ? 'Food & Drink' : ind === 'packaging' ? 'Paper & Plastics' : 'Discrete Assembly'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Showcase Details Panel */}
          <div className="lg:col-span-8 bg-slate-900/30 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-teal-400 animate-pulse" />
              <span className="font-mono text-[12px] text-teal-400 uppercase tracking-wider font-bold">
                Specialized Sector Deep-Dive
              </span>
            </div>

            <h3 className="font-display text-lg sm:text-2xl font-bold text-white tracking-tight">
              {currentInd.title}
            </h3>

            <p className="font-mono text-xs text-teal-400 leading-normal border-b border-slate-900 pb-4">
              {currentInd.tagline}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <span className="font-mono text-[12px] text-slate-500 uppercase font-bold tracking-wider">The Sector Bottleneck</span>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  {currentInd.challenge}
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-mono text-[12px] text-slate-500 uppercase font-bold tracking-wider">The Inshira Overlay Solution</span>
                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  {currentInd.solution}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-850 space-y-3">
              <span className="font-mono text-[12px] text-teal-400 uppercase tracking-wider block font-bold">Audited Pilot Ratios</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentInd.results.map((res, index) => (
                  <div key={index} className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-center gap-3">
                    <CheckCircle2 className="w-4.5 h-4.5 text-teal-400 shrink-0" />
                    <span className="font-display text-xs font-bold text-white leading-snug">{res}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-850 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <span className="font-sans text-[12px] text-slate-500">
                Inshira operates with a guaranteed pilot threshold model for all listed sectors.
              </span>
              <button
                onClick={onCtaClick}
                className="px-5 py-2.5 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-lg font-sans text-xs font-bold tracking-wide transition-all shadow-lg"
              >
                Inquire For This Sector
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Common CTA */}
      <section id="industries-cta" className="max-w-3xl mx-auto px-4 text-center space-y-6">
        <h3 className="font-display text-lg sm:text-xl font-bold text-white">
          No ERP Migration. No Hard Capital Upgrades.
        </h3>
        <p className="font-sans text-xs text-slate-400 leading-relaxed">
          Request a secure offline analysis. Give us a historical logbook or CSV dump and we’ll map your sector’s specific physical bottlenecks to prove ROI before connecting live systems.
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
