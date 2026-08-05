import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  Database, 
  TrendingUp, 
  ArrowRight,
  Activity,
  Layers,
  Settings,
  AlertTriangle
} from 'lucide-react';

interface FlowStage {
  id: string;
  num: string;
  title: string;
  sub: string;
  description: string;
  details: string;
  metric: string;
  metricLabel: string;
  color: string;
  glowColor: string;
  icon: React.ComponentType<any>;
}

export default function HeroFactoryFlow() {
  const [activeStage, setActiveStage] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);
  const [telemetryPulse, setTelemetryPulse] = useState<number>(72.4);
  const [lossesDetected, setLossesDetected] = useState<number>(14);
  const [simulatedLog, setSimulatedLog] = useState<string>('SYS_IDLE: Awaiting line event...');

  // Periodic simulated data ticks to make the dashboard feel ALIVE
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoPlay) {
        setActiveStage((prev) => (prev + 1) % 6);
      }
    }, 4500);
    return () => clearInterval(interval);
  }, [autoPlay]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Small random changes to mimic real-time sensor & performance signals
      setTelemetryPulse((prev) => {
        const delta = (Math.random() - 0.5) * 0.4;
        return parseFloat(Math.min(94, Math.max(65, prev + delta)).toFixed(1));
      });
      
      const logs = [
        'LINE_A: Sensor pulse received - speed nominal.',
        'LINE_B: Shift changeover sequence initiated.',
        'LINE_C: 12-second micro-stop detected (Sensor 14B).',
        'SYS_CALIBRATION: Syncing actual routing times with ERP.',
        'ANALYZER: Speed throttling identified on Extruder 3.',
        'RECOMMENDER: Setup schedule conflict resolved.'
      ];
      setSimulatedLog(logs[Math.floor(Math.random() * logs.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stages: FlowStage[] = [
    {
      id: 'factory',
      num: '01',
      title: 'Factory Floor',
      sub: 'Legacy Systems',
      description: 'Disparate machinery, manual spreadsheets, and unlinked CSVs operate in siloed clusters.',
      details: 'Old CNC mills and extrusion lines output basic logs, but operators are drowning in post-shift spreadsheets.',
      metric: '45% Manual',
      metricLabel: 'Coordination Effort',
      color: 'slate-400',
      glowColor: 'rgba(148, 163, 184, 0.15)',
      icon: Database
    },
    {
      id: 'data',
      num: '02',
      title: 'Data Ingestion',
      sub: 'Fragmented Inputs',
      description: 'Raw event registers and work orders are automatically parsed without changing hardware.',
      details: 'Inshira ingests active shift notes, ERP batches, and PLC files directly, cleaning and merging files instantly.',
      metric: '100% Secure',
      metricLabel: 'Automated CSV Parsing',
      color: 'teal-500',
      glowColor: 'rgba(0, 209, 255, 0.15)',
      icon: Layers
    },
    {
      id: 'intelligence',
      num: '03',
      title: 'Operational Intelligence',
      sub: 'Unlogged Loss Discovery',
      description: 'The causal engine matches schedules against actual rates, exposing hidden micro-stoppages.',
      details: 'Isolates blindspots like "8% design speed throttling" and undocumented sensor micro-stalls under 2 minutes.',
      metric: '£84k Isolated',
      metricLabel: 'Average Plant Scrap & Leak',
      color: 'amber-500',
      glowColor: 'rgba(245, 158, 11, 0.15)',
      icon: Cpu
    },
    {
      id: 'recommendations',
      num: '04',
      title: 'Actionable Insights',
      sub: 'Decision Support Support',
      description: 'System translates complex data patterns into localized, trusted operator calibration instructions.',
      details: 'Recommends minor adjustments (e.g., thermal-cycle shifts for specific resin grades) to prevent startup scrap.',
      metric: '94% Accurate',
      metricLabel: 'Recommendation Trust Index',
      color: 'indigo-500',
      glowColor: 'rgba(99, 102, 241, 0.15)',
      icon: Sparkles
    },
    {
      id: 'decisions',
      num: '05',
      title: 'Better Decisions',
      sub: 'Operator-in-the-Loop Sync',
      description: 'Shift supervisors verify recommendations with one click, preserving floor tribal knowledge.',
      details: 'Ensures process improvements are driven by a collaboration between operator expertise and machine telemetry.',
      metric: '4.2 Mins',
      metricLabel: 'Response & Resolve Time',
      color: 'emerald-500',
      glowColor: 'rgba(16, 185, 129, 0.15)',
      icon: CheckCircle2
    },
    {
      id: 'excellence',
      num: '06',
      title: 'Operational Excellence',
      sub: 'Continuous OEE Gains',
      description: 'Plant achieves permanent continuous improvement stability, protecting high-mix margins.',
      details: 'Eliminates typical excellence regression, allowing management to confidently secure new commercial orders.',
      metric: '+12.4%',
      metricLabel: 'Average OEE Increase',
      color: 'teal-400',
      glowColor: 'rgba(0, 209, 255, 0.25)',
      icon: TrendingUp
    }
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleStageClick = (index: number) => {
    setActiveStage(index);
    setAutoPlay(false);
  };

  const currentStageInfo = stages[activeStage];

  return (
    <div id="factory-flow-component" className="w-full max-w-7xl mx-auto py-12 px-4 relative z-20">
      
      {/* Living Interactive Flow Diagram Container */}
      <div 
        onMouseMove={handleMouseMove}
        className="grid-living-env bg-[#080808]/90 border border-white/5 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden"
      >
        <div className="absolute top-4 right-6 flex items-center gap-4 text-[12px] font-mono text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span className="uppercase tracking-wider">Simulated Ingest: {telemetryPulse}% Efficiency</span>
          </div>
          <button 
            onClick={() => setAutoPlay(!autoPlay)}
            className={`px-3 py-1 rounded-full border border-white/10 hover:border-white/20 hover:text-white transition-all ${
              autoPlay ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' : 'bg-transparent text-slate-400'
            }`}
          >
            {autoPlay ? 'Auto-Running' : 'Paused'}
          </button>
        </div>

        <div className="space-y-6">
          <div className="text-center sm:text-left">
            <span className="font-mono text-[12px] text-teal-400 font-bold uppercase tracking-widest block mb-1">
              Interactive Product Demonstration
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight">
              Immersive Flow: From Factory Floor to Operational Excellence
            </h3>
            <p className="font-sans text-xs text-slate-400 max-w-2xl mt-1 leading-relaxed">
              Click through each sequential step to trace how unlogged physical data is digested, processed, and translated into capital-efficient bottom-line yields.
            </p>
          </div>

          {/* Interactive Flow Grid Selector */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 pt-4 relative">
            
            {/* Horizontal flow line background */}
            <svg className="absolute top-1/2 left-0 w-full h-1 -translate-y-1/2 hidden md:block pointer-events-none z-0">
              <line 
                x1="5%" 
                y1="50%" 
                x2="95%" 
                y2="50%" 
                stroke="rgba(255, 255, 255, 0.05)" 
                strokeWidth="2"
              />
              <line 
                x1="5%" 
                y1="50%" 
                x2={`${(activeStage / 5) * 90 + 5}%`} 
                y2="50%" 
                stroke="#00d1ff" 
                strokeWidth="2"
                className="animate-flow-dash"
                style={{ strokeDasharray: '6 6' }}
              />
            </svg>

            {stages.map((stage, idx) => {
              const isSelected = activeStage === idx;
              const IconComp = stage.icon;
              return (
                <button
                  key={stage.id}
                  onClick={() => handleStageClick(idx)}
                  className={`relative z-10 flex flex-col items-center p-4 rounded-2xl border transition-all text-center select-none ${
                    isSelected 
                      ? 'bg-white/5 border-teal-500/40 text-white shadow-xl shadow-teal-500/5' 
                      : 'bg-[#0d0d0d]/40 border-white/5 text-slate-500 hover:border-white/15 hover:bg-[#0d0d0d]/80 hover:text-slate-300'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                    isSelected 
                      ? 'bg-teal-500/10 border-teal-500 text-teal-400 scale-110' 
                      : 'bg-white/5 border-white/5 text-slate-400'
                  }`}>
                    <IconComp className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  
                  <span className="font-mono text-[12px] text-slate-500 font-bold uppercase mt-3 tracking-widest block">
                    STAGE {stage.num}
                  </span>
                  
                  <h4 className="font-display text-xs font-bold text-white mt-1 leading-tight uppercase tracking-wider">
                    {stage.title}
                  </h4>
                  <span className="font-sans text-[12px] text-slate-500 mt-0.5 leading-none">
                    {stage.sub}
                  </span>

                  {/* Connecting indicator in mobile vertical view */}
                  <div className="md:hidden mt-2">
                    {idx < 5 && <span className="text-[12px] text-teal-500">↓</span>}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Expanded Selected Stage Analysis Block */}
          <div className="glow-card border border-white/10 rounded-2xl p-6 relative overflow-hidden mt-6 flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/5 rounded-full blur-[90px] pointer-events-none"></div>
            
            <div className="space-y-4 max-w-2xl relative z-10">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded border border-teal-500/20 font-bold">
                  ACTIVE ANALYSIS: STAGE {currentStageInfo.num}
                </span>
                <span className="font-sans text-xs text-slate-500 uppercase tracking-widest">
                  {currentStageInfo.sub}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider">
                {currentStageInfo.title}
              </h3>

              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed font-semibold">
                {currentStageInfo.description}
              </p>

              <p className="font-sans text-xs text-slate-400 leading-relaxed">
                {currentStageInfo.details}
              </p>

              {/* Simulated Live Command Output */}
              <div className="p-3 bg-black/60 rounded-xl border border-white/5 font-mono text-[12px] text-slate-400 flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-teal-400 animate-pulse shrink-0" />
                <span className="truncate">LOG: {simulatedLog}</span>
              </div>
            </div>

            {/* Strategic KPI Metric Card on right */}
            <div className="w-full lg:w-80 shrink-0 p-6 bg-[#0c0c0c] border border-white/5 rounded-2xl relative z-10 space-y-4 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[12px] text-slate-500 uppercase tracking-widest block font-bold">
                  Operational Core Metric
                </span>
                <h4 className="font-display text-4xl font-extrabold text-teal-400 mt-2 tracking-tight">
                  {currentStageInfo.metric}
                </h4>
                <p className="font-sans text-xs text-slate-400 mt-1 leading-normal font-semibold">
                  {currentStageInfo.metricLabel}
                </p>
              </div>

              <div className="border-t border-white/5 pt-4 space-y-2 text-[12px]">
                <div className="flex justify-between items-center text-slate-500">
                  <span>Reliability Check</span>
                  <span className="text-emerald-400 font-semibold">Active OK</span>
                </div>
                <div className="flex justify-between items-center text-slate-500">
                  <span>Inshira Layer Confidence</span>
                  <span className="text-white">96.8%</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
