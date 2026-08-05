import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Eye,
  Cpu,
  Workflow,
  Sparkles,
  TrendingUp,
  Activity,
  Award,
  Leaf,
  ChevronRight,
  Database,
  ArrowRight,
  CheckCircle2,
  Zap,
  Gauge,
  LineChart,
  Target,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';

interface JourneyStage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  philosophicalCore: string;
  inshiraSolve: string;
  icon: React.ComponentType<any>;
  metricLabel: string;
  metricValue: string;
  visualHighlight: string;
  journeyConnection: string;
  colorClass: string;
  badgeText: string;
  simulationStats: {
    visibility: number;
    intelligence: number;
    optLevel: number;
    scrapRate: number;
    energyWaste: number;
    oeeGains: number;
  };
}

export default function OperationalJourney() {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const [isSimulatingCycle, setIsSimulatingCycle] = useState<boolean>(false);
  const [simulationCyclesCount, setSimulationCyclesCount] = useState<number>(12);
  const [simulationAlerts, setSimulationAlerts] = useState<string[]>([]);

  const journeyStages: JourneyStage[] = [
    {
      id: 'visibility',
      title: 'Operational Visibility',
      subtitle: 'The Invisible Baseline',
      description: 'Most manufacturers already have the data they need to make confident operational decisions—they simply cannot see what it is telling them. Silent files and unlogged micro-stalls remain buried.',
      philosophicalCore: 'Traditional systems record hours, but bury minutes. We bridge the gap between messy PLC registries, shift files, and commercial planning databases to provide complete transparency.',
      inshiraSolve: 'Inshira ingests raw, disparate event logs without hardware overhead, consolidating them into a unified, high-fidelity chronological timeline of physical operations.',
      icon: Eye,
      metricLabel: 'Data Ingestion Rate',
      metricValue: '100% Raw PLC & Log Coverage',
      visualHighlight: 'Consolidating unlinked CSV sheets, operator shifts, and machine registers into a single source of floor truth.',
      journeyConnection: 'Establishes the transparent operational baseline. You cannot optimize what you cannot observe.',
      colorClass: 'from-blue-500/10 via-blue-500/5 to-transparent',
      badgeText: 'Stage 1: Visibility',
      simulationStats: {
        visibility: 100,
        intelligence: 15,
        optLevel: 10,
        scrapRate: 4.8,
        energyWaste: 22,
        oeeGains: 0
      }
    },
    {
      id: 'intelligence',
      title: 'Operational Intelligence',
      subtitle: 'Unlocking the Causal "Why"',
      description: 'Moving past static, retroactive month-end charts. Inshira immediately identifies, categorizes, and explains the root causes of unexplained capacity losses.',
      philosophicalCore: 'Standard software reports that a line stopped. We explain why it stopped by correlating tension deviations, temperature slopes, and resin batch characteristics.',
      inshiraSolve: 'Our pattern engines cross-reference physical signals and PLC telemetry to automatically flags unlogged bottlenecks—saving engineers weeks of manual spreadsheet audits.',
      icon: Cpu,
      metricLabel: 'Causal Classification',
      metricValue: '96.4% Automated Root Cause Accuracy',
      visualHighlight: 'Deconstructing air pocket anomalies, valve thermal gradients, and setter allocation issues in real time.',
      journeyConnection: 'Transforms raw visibility into explainable intelligence, giving floor teams trusted diagnostic actions.',
      colorClass: 'from-purple-500/10 via-purple-500/5 to-transparent',
      badgeText: 'Stage 2: Intelligence',
      simulationStats: {
        visibility: 100,
        intelligence: 96,
        optLevel: 30,
        scrapRate: 3.9,
        energyWaste: 18,
        oeeGains: 2.8
      }
    },
    {
      id: 'optimisation',
      title: 'Stage-by-Stage Process Optimisation',
      subtitle: 'Synchronized Material Flow',
      description: 'Your factory is a single continuous organism. Tweaking one machine in isolation often pushes the bottleneck elsewhere. True efficiency requires sequential, stage-by-stage calibration.',
      philosophicalCore: 'Process optimization must respect physical material behavior. We analyze how material flows from feeding to extrusion, cutting, and packaging to optimize speed compound effects.',
      inshiraSolve: 'Inshira tracks parameters sequentially across every node, aligning cooling ramp profiles, pre-heat times, and tension thresholds to keep the bottleneck running smoothly.',
      icon: Workflow,
      metricLabel: 'Line Balancing Index',
      metricValue: 'Symmetrical Stage Throughput Sync',
      visualHighlight: 'Sequential setpoint adjustments that compound improvements across the entire manufacturing value stream.',
      journeyConnection: 'Aligns individual stations, resolving sub-optimization to unlock true, multi-stage compound yield.',
      colorClass: 'from-teal-500/10 via-teal-500/5 to-transparent',
      badgeText: 'Stage 3: Optimisation',
      simulationStats: {
        visibility: 100,
        intelligence: 96,
        optLevel: 85,
        scrapRate: 2.4,
        energyWaste: 12,
        oeeGains: 6.2
      }
    },
    {
      id: 'improvement',
      title: 'Continuous Improvement',
      subtitle: 'Eliminating Operational Drift',
      description: 'Excellence is not a one-time engineering project or a static setpoint binder on a shelf; it is an active daily operational loop that learns, adapts, and scale over time.',
      philosophicalCore: 'Thermal cycles, tooling wear, and ambient humidity fluctuate daily. A static calibration will inevitably regress. The platform continuously monitors and adapts setpoints.',
      inshiraSolve: 'We active-listen to raw floor signals and deliver contextual, highly explainable parameter calibrations directly to shift leads before OEE drift and scrap cycles trigger.',
      icon: TrendingUp,
      metricLabel: 'Proactive Alert Speed',
      metricValue: 'Pre-emptive drift detection in <4 mins',
      visualHighlight: 'Continuous calibration loops that convert operator tribal knowledge into scalable, digitized recommendations.',
      journeyConnection: 'Prevents the common "excellence regression", securing and locking in OEE improvements permanently.',
      colorClass: 'from-amber-500/10 via-amber-500/5 to-transparent',
      badgeText: 'Stage 4: Improvement',
      simulationStats: {
        visibility: 100,
        intelligence: 98,
        optLevel: 92,
        scrapRate: 1.1,
        energyWaste: 7,
        oeeGains: 9.4
      }
    },
    {
      id: 'excellence',
      title: 'Operational Excellence',
      subtitle: 'Floor to Boardroom Alignment',
      description: 'Connecting physical shop-floor realities directly with commercial financial models. Unplanned outages disappear, stabilizing your capacity constraints.',
      philosophicalCore: 'When you eliminate unrecorded micro-stalls, you gain extreme lead time repeatability. Plant directors can confidently bid on and quote high-mix, high-margin commercial batches.',
      inshiraSolve: 'By bringing absolute predictability to operations, we connect day-to-day floor calibration directly to C-suite financial planning and margin protection.',
      icon: Award,
      metricLabel: 'Maturity Target',
      metricValue: 'Sustained 84.6% OEE Level reached',
      visualHighlight: 'High OEE repeatability, predictable manufacturing schedules, and stabilized high-mix production margins.',
      journeyConnection: 'Translates floor stability into strong competitive leverage, driving massive strategic growth and enterprise value.',
      colorClass: 'from-indigo-500/10 via-indigo-500/5 to-transparent',
      badgeText: 'Stage 5: Excellence',
      simulationStats: {
        visibility: 100,
        intelligence: 100,
        optLevel: 96,
        scrapRate: 0.6,
        energyWaste: 4,
        oeeGains: 12.8
      }
    },
    {
      id: 'sustainability',
      title: 'Sustainable Manufacturing',
      subtitle: 'Resource-Efficient Production',
      description: 'Physical operational waste and environmental waste are the exact same thermodynamic phenomenon. True sustainability is the natural byproduct of process precision.',
      philosophicalCore: 'Reducing startup scrap, preventing thermal extruder lag, and streamlining resin purge cycles directly slashes material landfill waste and energy spikes simultaneously.',
      inshiraSolve: 'Inshira quantifies and minimizes thermal energy peaks, resin sequence purge waste, and startup scrap, hitting aggressive corporate ESG targets without capital expansion.',
      icon: Leaf,
      metricLabel: 'Carbon & Material Waste Reduction',
      metricValue: '-15.4% Scrap Reduction & -8.2% Energy CO₂',
      visualHighlight: 'Optimizing continuous process cycles to produce more yield using significantly fewer energy and material resources.',
      journeyConnection: 'Completes the circle. The ultimate proof of operational precision is a clean, low-carbon, waste-free manufacturing footprint.',
      colorClass: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
      badgeText: 'Stage 6: Sustainability',
      simulationStats: {
        visibility: 100,
        intelligence: 100,
        optLevel: 100,
        scrapRate: 0.2,
        energyWaste: 1,
        oeeGains: 14.6
      }
    }
  ];

  const currentStage = journeyStages[activeStageIdx];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const runSimulationCycle = () => {
    setIsSimulatingCycle(true);
    setSimulationCyclesCount((prev) => prev + 1);
    
    // Simulate events based on current stage
    setTimeout(() => {
      setIsSimulatingCycle(false);
      let alertMsg = "";
      if (activeStageIdx === 0) {
        alertMsg = "Silo Level Deviation: Raw PLC event recorded, but root-cause is unclassified.";
      } else if (activeStageIdx === 1) {
        alertMsg = "Thermal Alert: Identified Extruder ramp lag on Shift B. Recommendation queued.";
      } else if (activeStageIdx === 2) {
        alertMsg = "Optimisation Sync: Synchronized roller C tension to pre-empt material slack.";
      } else if (activeStageIdx === 3) {
        alertMsg = "Continuous Auto-Calibrate: Corrected sealing micro-stoppage profile dynamically.";
      } else {
        alertMsg = "Cycle Complete: Symmetrical flow maintained. High stability, zero scrap.";
      }
      setSimulationAlerts((prev) => [alertMsg, ...prev.slice(0, 3)]);
    }, 1200);
  };

  return (
    <div 
      id="operational-journey-wrapper"
      className="space-y-12"
    >
      
      {/* Narrative Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest block">
          The Philosophy Behind Inshira
        </span>
        <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
          THE OPERATIONAL EVOLUTION JOURNEY
        </h3>
        <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
          Every factory we partner with follows the same systematic progression. We transform unlinked, noisy floor records into a predictable, waste-free continuous operation.
        </p>
      </div>

      {/* Interactive Horizontal Progression Timeline */}
      <div 
        id="journey-stepper-container" 
        className="relative bg-slate-900/30 border border-white/5 rounded-2xl p-4 overflow-x-auto scrollbar-thin scrollbar-thumb-teal-900"
      >
        <div className="min-w-[840px] flex items-center justify-between relative py-2 px-4">
          
          {/* Connecting Base Guideline Line */}
          <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-[2px] bg-slate-800 z-0">
            {/* Animated Progress indicator fill */}
            <div 
              className="h-full bg-gradient-to-r from-teal-500 via-indigo-500 to-emerald-400 transition-all duration-500"
              style={{ width: `${(activeStageIdx / 5) * 100}%` }}
            />
          </div>

          {journeyStages.map((stage, idx) => {
            const StageIcon = stage.icon;
            const isActive = activeStageIdx === idx;
            const isCompleted = idx < activeStageIdx;

            return (
              <button
                key={stage.id}
                onClick={() => setActiveStageIdx(idx)}
                className="relative z-10 flex flex-col items-center gap-2.5 outline-none group cursor-pointer"
                style={{ width: '130px' }}
              >
                
                {/* Node circle */}
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'bg-slate-950 border-teal-400 text-teal-300 scale-110 shadow-lg shadow-teal-500/10'
                    : isCompleted
                    ? 'bg-teal-950/40 border-teal-500 text-teal-400'
                    : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700 hover:text-slate-300'
                }`}>
                  <StageIcon className="w-5 h-5 stroke-[1.8]" />
                </div>

                {/* Micro numerical label */}
                <span className={`font-mono text-[12px] uppercase font-bold tracking-wider ${
                  isActive ? 'text-teal-400' : 'text-slate-500'
                }`}>
                  Stage 0{idx + 1}
                </span>

                {/* High-level title text */}
                <span className={`font-display text-[13px] font-bold text-center tracking-wide uppercase leading-tight ${
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                }`}>
                  {stage.title.split(' ')[0]} {stage.title.split(' ')[1] || ''}
                </span>

              </button>
            );
          })}

        </div>
      </div>

      {/* Main Narrative Workspace Card */}
      <div 
        onMouseMove={handleMouseMove}
        className="glow-card rounded-3xl p-6 sm:p-10 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch"
      >
        {/* Top styling boundary lines */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
        
        {/* Detailed Narrative (Col-Span 7) */}
        <div className="lg:col-span-7 space-y-6 relative z-10 flex flex-col justify-between">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[12px] bg-teal-500/10 text-teal-400 px-2.5 py-1 rounded-full border border-teal-500/20 uppercase font-bold tracking-widest">
                {currentStage.badgeText}
              </span>
              <span className="font-mono text-[12px] text-slate-500">
                Philosophy Sync
              </span>
            </div>

            <h4 className="font-display text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight leading-tight">
              {currentStage.title}
              <span className="block text-sm font-semibold text-slate-400 uppercase tracking-widest font-mono mt-1.5 normal-case font-bold">
                {currentStage.subtitle}
              </span>
            </h4>

            <p className="font-sans text-sm text-slate-200 font-semibold leading-relaxed">
              {currentStage.description}
            </p>

            <div className="p-4 bg-slate-900/40 border border-white/5 rounded-xl space-y-2">
              <span className="font-mono text-[12px] text-teal-400 uppercase tracking-widest block font-bold">
                The Practical Challenge:
              </span>
              <p className="font-sans text-xs text-slate-300 leading-relaxed">
                {currentStage.philosophicalCore}
              </p>
            </div>

            <div className="p-4 bg-teal-500/5 border border-teal-500/10 rounded-xl space-y-2">
              <span className="font-mono text-[12px] text-teal-400 uppercase tracking-widest block font-bold">
                How Inshira Resolves It:
              </span>
              <p className="font-sans text-xs text-slate-300 leading-relaxed">
                {currentStage.inshiraSolve}
              </p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-5 mt-4 space-y-2.5">
            <span className="font-mono text-[12px] text-slate-500 uppercase block tracking-wider font-bold">
              Journey Linkage Philosophy
            </span>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <p className="font-sans text-xs text-slate-400">
                {currentStage.journeyConnection}
              </p>
            </div>
          </div>

        </div>

        {/* Dynamic Simulation Workspace (Col-Span 5) */}
        <div className="lg:col-span-5 bg-slate-900/30 p-5 sm:p-6 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-teal-500/5 rounded-full blur-[90px] pointer-events-none"></div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between pb-3 border-b border-white/5">
              <span className="font-mono text-[12px] text-teal-400 uppercase font-bold tracking-wider">
                Interactive Causal Simulator
              </span>
              <span className="font-mono text-[12px] text-slate-500">
                Stage {activeStageIdx + 1}
              </span>
            </div>

            <p className="font-sans text-[12px] text-slate-400 leading-relaxed">
              Simulate operational runs to inspect how OEE, material scrap levels, and carbon waste adapt as you evolve along our maturity framework.
            </p>

            {/* Simulated stats grid */}
            <div className="grid grid-cols-2 gap-3.5">
              
              <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                <span className="font-mono text-[12px] text-slate-500 uppercase block">Telemetry Visibility</span>
                <span className="font-display text-base font-bold text-white block mt-0.5">
                  {currentStage.simulationStats.visibility}%
                </span>
                <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden mt-1.5">
                  <div className="bg-teal-500 h-full" style={{ width: `${currentStage.simulationStats.visibility}%` }} />
                </div>
              </div>

              <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                <span className="font-mono text-[12px] text-slate-500 uppercase block">Causal Diagnosis</span>
                <span className="font-display text-base font-bold text-white block mt-0.5">
                  {currentStage.simulationStats.intelligence}%
                </span>
                <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden mt-1.5">
                  <div className="bg-teal-400 h-full" style={{ width: `${currentStage.simulationStats.intelligence}%` }} />
                </div>
              </div>

              <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                <span className="font-mono text-[12px] text-slate-500 uppercase block">Scrap Rate</span>
                <span className="font-display text-base font-bold text-red-400 block mt-0.5">
                  {currentStage.simulationStats.scrapRate}%
                </span>
                <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden mt-1.5">
                  <div className="bg-red-500 h-full animate-pulse" style={{ width: `${currentStage.simulationStats.scrapRate * 15}%` }} />
                </div>
              </div>

              <div className="p-3 bg-black/40 rounded-xl border border-white/5">
                <span className="font-mono text-[12px] text-slate-500 uppercase block">Weekly OEE Boost</span>
                <span className="font-display text-base font-bold text-emerald-400 block mt-0.5">
                  +{currentStage.simulationStats.oeeGains}%
                </span>
                <div className="w-full bg-slate-950 h-1 rounded-full overflow-hidden mt-1.5">
                  <div className="bg-emerald-400 h-full" style={{ width: `${(currentStage.simulationStats.oeeGains / 15) * 100}%` }} />
                </div>
              </div>

            </div>

            {/* Active Logs Ticker */}
            <div className="p-3 bg-slate-950 rounded-xl border border-white/5 space-y-1.5">
              <span className="font-mono text-[12px] text-slate-500 uppercase font-bold block">Simulation telemetry logs:</span>
              <div className="space-y-1 h-14 overflow-y-auto font-mono text-[12px] text-slate-400 select-none">
                {simulationAlerts.length === 0 ? (
                  <div className="text-slate-600">No active cycles. Click "Trigger Simulated Cycle" below.</div>
                ) : (
                  simulationAlerts.map((alert, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="text-teal-500">&gt;&gt;</span>
                      <span className="truncate">{alert}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          <div className="mt-5 space-y-3 relative z-10">
            <button
              onClick={runSimulationCycle}
              disabled={isSimulatingCycle}
              className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wide border transition-all cursor-pointer ${
                isSimulatingCycle
                  ? 'bg-slate-900 border-white/5 text-slate-500'
                  : 'bg-teal-500 hover:bg-teal-400 text-slate-950 border-teal-500/20 shadow-lg shadow-teal-500/10'
              }`}
            >
              {isSimulatingCycle ? 'Running Simulation...' : 'Trigger Simulated Cycle'}
            </button>
            <div className="text-[12px] font-mono text-slate-500 text-center uppercase tracking-wider">
              Total Cycles Logged: {simulationCyclesCount} | status: OK nominal
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
