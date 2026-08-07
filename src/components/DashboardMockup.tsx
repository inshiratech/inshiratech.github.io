import React, { useState, useEffect } from 'react';
import {
  Activity,
  AlertCircle,
  TrendingDown,
  Cpu,
  Zap,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Clock,
  Shield,
  Layers,
  Sparkles,
  Search,
  ArrowRight,
  X,
  Gauge,
  Database
} from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  impact: string;
  impactValue: number; // numeric value for ROI calculation
  desc: string;
  confidence: string;
  action: string;
}

interface Alert {
  id: string;
  msg: string;
  severity: 'red' | 'amber';
}

interface TimelineSegment {
  time: string;
  state: string;
  duration: string;
  status: 'normal' | 'planned' | 'unplanned' | 'critical';
}

interface LineData {
  name: string;
  industry: string;
  methodology: string;
  methodologyShort: string;
  primaryMetricTitle: string;
  primaryTargetLabel: string;
  baseOee: number;
  oeeTrend: string;
  baseDowntime: number;
  downtimeCostPerHr: number;
  baseWaste: number;
  baseWeeklyLosses: number;
  health: string;
  color: string;
  timeline: TimelineSegment[];
  recommendations: Recommendation[];
  alerts: Alert[];
  secondaryMetrics: {
    label: string;
    value: string;
    subtext: string;
    trend: string;
  }[];
}

export default function DashboardMockup() {
  const [activeLine, setActiveLine] = useState<'A' | 'B' | 'C'>('A');
  const [showRootCauseModal, setShowRootCauseModal] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  
  // Interactive applied recommendations state to simulate live decision intelligence loops
  const [appliedRecIds, setAppliedRecIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [simulatedMetricsTick, setSimulatedMetricsTick] = useState<number>(0);

  // Auto-clear toast notifications
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Small live telemetry oscillations to make the platform feel ALIVE
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedMetricsTick((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const linesData: Record<'A' | 'B' | 'C', LineData> = {
    A: {
      name: 'Packaging Converter Line A',
      industry: 'Packaging & Conversion',
      methodology: 'OEE Framework (Equipment Effectiveness)',
      methodologyShort: 'OEE Focus',
      primaryMetricTitle: 'OEE Score',
      primaryTargetLabel: 'VS 85.0% World-Class Target',
      baseOee: 71.2,
      oeeTrend: '-2.4% this week',
      baseDowntime: 4.8,
      downtimeCostPerHr: 3000,
      baseWaste: 3.4,
      baseWeeklyLosses: 22100,
      health: 'Warning',
      color: 'amber',
      secondaryMetrics: [
        { label: 'Availability Rate', value: '88.4%', trend: '94.2% Availability Target', subtext: 'Unplanned Stops: 4.8 hrs' },
        { label: 'Performance Speed', value: '82.1%', trend: '8-12% Throttling Detected', subtext: 'Extruder Speed Deficit' },
        { label: 'Quality Yield Rate', value: '98.2%', trend: '3.4% Start-up Scrap', subtext: 'Scrap Cost: £22.1k/wk' }
      ],
      timeline: [
        { time: '08:00', state: 'Running', duration: '120m', status: 'normal' },
        { time: '10:00', state: 'Grade Changeover', duration: '45m', status: 'planned' },
        { time: '10:45', state: 'Running', duration: '90m', status: 'normal' },
        { time: '12:15', state: 'Micro-stoppage (Jam)', duration: '18m', status: 'unplanned' },
        { time: '12:33', state: 'Running', duration: '150m', status: 'normal' },
        { time: '15:03', state: 'Cooling Failure', duration: '32m', status: 'critical' },
        { time: '15:35', state: 'Running', duration: '60m', status: 'normal' },
      ],
      recommendations: [
        {
          id: 'rec-1',
          title: 'Optimize Cool-Down Ramp Cycle',
          impact: 'Save £1,850/wk',
          impactValue: 1850,
          desc: 'PLC log correlation shows Extruder 3 cools down 4°C faster on Shift B. Calibrating alignment to Shift A ramp patterns reduces cooling wait states by 18 mins.',
          confidence: '94% Confidence',
          action: 'Sync PLC parameters'
        },
        {
          id: 'rec-2',
          title: 'Upstream Tension Calibration Offset',
          impact: 'Save £1,200/wk',
          impactValue: 1200,
          desc: 'Tension deviations on roller C correlate with start-up scrap on polymer grades. Implement a +0.2 bar bias offset to pre-empt material slack.',
          confidence: '89% Confidence',
          action: 'Apply sensor offset'
        }
      ],
      alerts: [
        { id: 'al-1', msg: 'Micro-stoppage anomaly detected on packaging sealer PLC: 14 short-stops (<90s) during Shift B.', severity: 'amber' },
        { id: 'al-2', msg: 'Cooling manifold thermal gradient exceeded threshold by 2.4°C on Extruder line A3.', severity: 'red' }
      ]
    },
    B: {
      name: 'Automotive Precision CNC Line B',
      industry: 'Automotive & Metal Machining',
      methodology: 'Value Stream Mapping (VSM & Takt Flow)',
      methodologyShort: 'VSM Focus',
      primaryMetricTitle: 'VSM Flow Efficiency',
      primaryTargetLabel: 'VS 90.0% Stream Balance Target',
      baseOee: 84.6,
      oeeTrend: '+1.8% this week',
      baseDowntime: 1.2,
      downtimeCostPerHr: 3000,
      baseWaste: 1.2,
      baseWeeklyLosses: 6800,
      health: 'Optimal',
      color: 'emerald',
      secondaryMetrics: [
        { label: 'Takt Time Balance', value: '94.2s', trend: 'Target Takt: 96.0s', subtext: 'Zero Bottleneck Stalls' },
        { label: 'Process Cycle Efficiency', value: '68.4%', trend: '+3.2% VSM Gain', subtext: 'Value-Add vs Lead Time' },
        { label: 'WIP Buffer Inventory', value: '14 Units', trend: '-18% Work-in-Progress', subtext: 'Lead Time: 4.2 hrs' }
      ],
      timeline: [
        { time: '08:00', state: 'Running', duration: '180m', status: 'normal' },
        { time: '11:00', state: 'Tool calibration', duration: '12m', status: 'planned' },
        { time: '11:12', state: 'Running', duration: '140m', status: 'normal' },
        { time: '13:32', state: 'Feed Jam', duration: '8m', status: 'unplanned' },
        { time: '13:40', state: 'Running', duration: '160m', status: 'normal' },
      ],
      recommendations: [
        {
          id: 'rec-3',
          title: 'Tool-Tip Wear Offset Prediction',
          impact: 'Save £2,400/wk',
          impactValue: 2400,
          desc: 'Spindle current drift correlates with micro-burring on carbon steel batches. Adjusting spindle speed downward by 40 RPM after 400 cycles extends tool life.',
          confidence: '97% Confidence',
          action: 'Enable adaptive RPM'
        }
      ],
      alerts: [
        { id: 'al-3', msg: 'Vibration frequency anomaly detected on Spindle Head B2. Predictive wear threshold reached.', severity: 'amber' }
      ]
    },
    C: {
      name: 'High-Speed Beverage Bottling Line C',
      industry: 'Food & Beverage',
      methodology: 'SEC Energy Intensity & Material Yield',
      methodologyShort: 'SEC Yield Focus',
      primaryMetricTitle: 'SEC Energy & Yield Index',
      primaryTargetLabel: 'VS 85.0 kWh/Ton Benchmark',
      baseOee: 64.8,
      oeeTrend: '-4.1% this week',
      baseDowntime: 8.4,
      downtimeCostPerHr: 3000,
      baseWaste: 4.1,
      baseWeeklyLosses: 34800,
      health: 'Critical',
      color: 'red',
      secondaryMetrics: [
        { label: 'Fill Valve Giveaway', value: '1.4% Overfill', trend: '3.4% Material Waste', subtext: 'Giveaway Loss: £3.15k/wk' },
        { label: 'Thermal Purge Energy', value: '92.4 kWh/T', trend: '+4.1% Energy Spike', subtext: 'CIP Wash Purge Lag' },
        { label: 'Changeover CIP Lag', value: '65 mins', trend: 'Target CIP: 45 mins', subtext: 'Clean-in-place Delay' }
      ],
      timeline: [
        { time: '08:00', state: 'Running', duration: '40m', status: 'normal' },
        { time: '08:40', state: 'Filling Valve Jam', duration: '95m', status: 'critical' },
        { time: '10:15', state: 'Running', duration: '120m', status: 'normal' },
        { time: '12:15', state: 'Grade Changeover', duration: '65m', status: 'planned' },
        { time: '13:20', state: 'Weight Calibration error', duration: '48m', status: 'unplanned' },
        { time: '14:08', state: 'Running', duration: '112m', status: 'normal' },
      ],
      recommendations: [
        {
          id: 'rec-4',
          title: 'Fill-Valve Giveaway Prevention',
          impact: 'Save £3,150/wk',
          impactValue: 3150,
          desc: 'Scale weight logs show systematic over-filling of 4.2ml on carbonated grades during line speeds above 240 bpm. Calibrating feedback gain resolves giveaway.',
          confidence: '95% Confidence',
          action: 'Tune scale feedback'
        },
        {
          id: 'rec-5',
          title: 'Sequence Changeover Optimization',
          impact: 'Save 18m per shift',
          impactValue: 2100,
          desc: 'Clean-in-place (CIP) logs indicate delay in heater pre-heating. Initiating pre-heating 10 mins prior to final wash completion recovers bottleneck.',
          confidence: '91% Confidence',
          action: 'Modify sequence order'
        }
      ],
      alerts: [
        { id: 'al-4', msg: 'Systemic overfill giveaway of 1.4% detected on carbonated bottling valve head #12.', severity: 'red' },
        { id: 'al-5', msg: 'Nozzle pressure drops below 1.8 bar during changeover purge cycles.', severity: 'amber' }
      ]
    }
  };

  const currentLine = linesData[activeLine];

  // Dynamic calculation based on user interactions
  const getCalculatedMetrics = (lineKey: 'A' | 'B' | 'C') => {
    const data = linesData[lineKey];
    const appliedLineRecs = data.recommendations.filter(r => appliedRecIds.includes(r.id));
    
    // Each applied recommendation improves OEE, reduces waste, and slashes weekly losses
    const oeeImprovement = appliedLineRecs.length * 4.2; // +4.2% per recommendation
    const wasteReduction = appliedLineRecs.length * 0.6; // -0.6% waste per recommendation
    const lossReduction = appliedLineRecs.reduce((acc, r) => acc + r.impactValue, 0);

    // Oscillation simulation factor (moves by +/- 0.1 to show real-time feed activity)
    const oscillation = Math.sin(simulatedMetricsTick + (lineKey === 'A' ? 0 : lineKey === 'B' ? 1.5 : 3)) * 0.15;

    const finalOee = parseFloat((data.baseOee + oeeImprovement + oscillation).toFixed(1));
    const finalWaste = parseFloat(Math.max(0.2, data.baseWaste - wasteReduction + (oscillation * 0.05)).toFixed(2));
    const finalWeeklyLosses = Math.max(800, data.baseWeeklyLosses - lossReduction);
    const finalDowntime = parseFloat(Math.max(0.2, data.baseDowntime - (appliedLineRecs.length * 1.2) + (oscillation * 0.1)).toFixed(1));
    const finalDowntimeCost = `£${Math.round(finalDowntime * data.downtimeCostPerHr).toLocaleString()}`;

    // Dynamic health state upgrades
    let currentHealth = data.health;
    if (appliedLineRecs.length === data.recommendations.length) {
      currentHealth = 'Stabilised';
    } else if (appliedLineRecs.length > 0 && currentHealth === 'Critical') {
      currentHealth = 'Warning';
    }

    return {
      oee: `${finalOee}%`,
      oeeRaw: finalOee,
      waste: `${finalWaste}%`,
      weeklyLosses: `£${finalWeeklyLosses.toLocaleString()}`,
      downtime: `${finalDowntime} hrs`,
      downtimeCost: finalDowntimeCost,
      health: currentHealth,
      improvementGained: oeeImprovement > 0
    };
  };

  const activeMetrics = getCalculatedMetrics(activeLine);

  const handleApplyRecommendation = (recId: string, actionName: string) => {
    if (appliedRecIds.includes(recId)) {
      setAppliedRecIds((prev) => prev.filter(id => id !== recId));
      setToastMessage(`Reverted parameter adjustment: ${actionName}`);
    } else {
      setAppliedRecIds((prev) => [...prev, recId]);
      setToastMessage(`Success: Recommendation calibrated and synced successfully! Plant metrics updated.`);
    }
  };

  const triggerRootCause = (alertMsg: string) => {
    setSelectedAlert(alertMsg);
    setShowRootCauseModal(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div 
      id="dashboard-mockup-wrapper" 
      onMouseMove={handleMouseMove}
      className="grid-living-env w-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative"
    >
      
      {/* Dynamic Floating Notification Toast inside mock */}
      {toastMessage && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-teal-950/95 border border-teal-500/50 text-teal-300 text-xs py-2.5 px-5 rounded-full shadow-2xl z-40 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span className="font-mono">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:text-white">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Header / Simulation Controls */}
      <div id="mockup-header" className="bg-slate-900/80 px-4 sm:px-6 py-4 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        {/* The overlay label wraps on narrow phones; anchor the live dot to
            the first line instead of the middle of the wrapped block. */}
        <div className="flex items-start sm:items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse shrink-0 mt-1 sm:mt-0" />
          <div>
            <span className="font-mono text-[12px] text-teal-400 font-bold uppercase tracking-widest block">Live Simulated Inshira Overlay</span>
            <h4 className="font-display text-sm sm:text-base font-bold text-white uppercase tracking-wider">Operational Decision Support Layer</h4>
          </div>
        </div>

        {/* Factory Line Selectors with Framework Tags */}
        <div id="factory-line-tabs" className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 self-start">
          {(['A', 'B', 'C'] as const).map((line) => {
            const calculated = getCalculatedMetrics(line);
            const lineMeta = linesData[line];
            return (
              <button
                key={line}
                id={`tab-line-${line}`}
                onClick={() => setActiveLine(line)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeLine === line
                    ? 'bg-teal-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                Line {line} ({lineMeta.methodologyShort})
                <span className={`w-1.5 h-1.5 rounded-full ${
                  calculated.health === 'Stabilised' || calculated.health === 'Optimal'
                    ? 'bg-emerald-400'
                    : calculated.health === 'Warning'
                    ? 'bg-amber-400'
                    : 'bg-rose-500'
                }`}></span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        
        {/* Left Side: KPIs and Alerts */}
        <div id="dashboard-kpis-and-alerts" className="lg:col-span-2 space-y-6">
          {/* Header row alignment fixes:
              - items-start, not items-center: the status pill was vertically
                centring against a title that wraps to two lines, so it floated
                mid-block instead of sitting level with the line name.
              - flex-wrap on the title row: the long methodology pill now drops
                to its own line cleanly instead of squeezing the title and
                forcing everything to wrap at once.
              - whitespace-nowrap + shrink-0 on the status pill: it was breaking
                "Status:" onto one line and the value onto another. */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="space-y-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h5 className="font-display text-base font-bold text-white uppercase tracking-wider">
                  {currentLine.name}
                </h5>
                <span className="px-2.5 py-0.5 rounded-md bg-teal-500/10 text-teal-400 border border-teal-500/20 font-mono text-[12px] font-bold uppercase tracking-wider">
                  {currentLine.methodology}
                </span>
              </div>
              <span className="text-[12px] font-mono text-slate-400 uppercase block">{currentLine.industry}</span>
            </div>

            <span className={`px-2.5 py-1 rounded-full text-[12px] font-mono font-bold uppercase border tracking-wider self-start whitespace-nowrap shrink-0 ${
              activeMetrics.health === 'Optimal' || activeMetrics.health === 'Stabilised'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : activeMetrics.health === 'Warning'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                : 'bg-red-500/10 text-red-400 border-red-500/20'
            }`}>
              Status: {activeMetrics.health}
            </span>
          </div>

          {/* KPI grid customized for each line's distinct optimization methodology */}
          <div id="kpi-cards-grid" className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Primary Methodology Core Score */}
            <div className={`p-4 rounded-xl border transition-all duration-300 ${
              activeMetrics.improvementGained 
                ? 'bg-emerald-500/5 border-emerald-500/30' 
                : 'bg-slate-900/40 border-slate-800'
            }`}>
              <span className="font-mono text-[12px] text-teal-400 uppercase tracking-wider font-bold block">{currentLine.primaryMetricTitle}</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className={`font-display text-2xl font-bold transition-colors ${
                  activeMetrics.improvementGained ? 'text-emerald-400' : 'text-white'
                }`}>{activeMetrics.oee}</span>
                <span className={`font-mono text-[12px] ${
                  currentLine.oeeTrend.startsWith('+') || activeMetrics.improvementGained ? 'text-emerald-400' : 'text-amber-400'
                }`}>
                  {activeMetrics.improvementGained ? '▲ Live Boost' : currentLine.oeeTrend.split(' ')[0]}
                </span>
              </div>
              <span className="font-mono text-[12px] text-slate-400 block mt-0.5">{currentLine.primaryTargetLabel}</span>
            </div>

            {/* Secondary Metric 1 */}
            <div className={`p-4 rounded-xl border transition-all duration-300 ${
              activeMetrics.improvementGained 
                ? 'bg-emerald-500/5 border-emerald-500/25' 
                : 'bg-slate-900/40 border-slate-800'
            }`}>
              <span className="font-mono text-[12px] text-slate-400 uppercase tracking-wider block">{currentLine.secondaryMetrics[0].label}</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="font-display text-2xl font-bold text-white">{currentLine.secondaryMetrics[0].value}</span>
                <TrendingUp className={`w-3.5 h-3.5 ${
                  activeMetrics.improvementGained ? 'text-emerald-400' : 'text-teal-400'
                }`} />
              </div>
              <span className="font-mono text-[12px] text-slate-500 block mt-0.5">{currentLine.secondaryMetrics[0].trend}</span>
            </div>

            {/* Secondary Metric 2 */}
            <div className={`p-4 rounded-xl border transition-all duration-300 ${
              activeMetrics.improvementGained 
                ? 'bg-emerald-500/5 border-emerald-500/25' 
                : 'bg-slate-900/40 border-slate-800'
            }`}>
              <span className="font-mono text-[12px] text-slate-400 uppercase tracking-wider block">{currentLine.secondaryMetrics[1].label}</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className={`font-display text-2xl font-bold ${
                  activeMetrics.improvementGained ? 'text-emerald-400' : 'text-white'
                }`}>{currentLine.secondaryMetrics[1].value}</span>
                <span className="font-mono text-[12px] text-teal-400">Live</span>
              </div>
              <span className="font-mono text-[12px] text-slate-500 block mt-0.5">{currentLine.secondaryMetrics[1].trend}</span>
            </div>

            {/* Secondary Metric 3 */}
            <div className={`p-4 rounded-xl border transition-all duration-300 ${
              activeMetrics.improvementGained 
                ? 'bg-emerald-500/5 border-emerald-500/25' 
                : 'bg-slate-900/40 border-slate-800'
            }`}>
              <span className="font-mono text-[12px] text-slate-400 uppercase tracking-wider block">{currentLine.secondaryMetrics[2].label}</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className={`font-display text-2xl font-bold transition-colors ${
                  activeMetrics.improvementGained ? 'text-emerald-400' : 'text-amber-300'
                }`}>{currentLine.secondaryMetrics[2].value}</span>
                <AlertCircle className={`w-3.5 h-3.5 ${
                  activeMetrics.improvementGained ? 'text-emerald-400' : 'text-amber-400'
                }`} />
              </div>
              <span className="font-mono text-[12px] text-slate-500 block mt-0.5">{currentLine.secondaryMetrics[2].trend}</span>
            </div>

          </div>

          {/* Live Timeline visualization */}
          <div id="timeline-panel" className="bg-slate-900/30 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-400" />
                <span className="font-display text-xs font-bold text-white uppercase tracking-wider">Today’s State Timeline</span>
              </div>
              <span className="font-mono text-[12px] text-slate-400">Shift Coverage: 08:00 - 16:00</span>
            </div>

            {/* Custom Horizontal Stack Bar */}
            <div id="timeline-segmented-bar" className="h-6 bg-slate-900 rounded-lg overflow-hidden flex border border-slate-800">
              {currentLine.timeline.map((segment, index) => {
                const colorMap = {
                  normal: 'bg-emerald-500',
                  planned: 'bg-blue-500',
                  unplanned: 'bg-amber-500',
                  critical: 'bg-red-500'
                };
                // Calculate pseudo width
                const widths = ['22%', '10%', '15%', '8%', '18%', '12%', '15%'];
                return (
                  <div
                    key={index}
                    className={`${colorMap[segment.status]} h-full opacity-85 hover:opacity-100 transition-opacity relative group cursor-pointer`}
                    style={{ width: widths[index] || '15%' }}
                    title={`${segment.state} (${segment.duration})`}
                  />
                );
              })}
            </div>

            {/* Timeline Legend */}
            <div id="timeline-legend" className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 pt-2.5 border-t border-slate-800/50">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-mono text-[12px] text-slate-400">Running (84%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="font-mono text-[12px] text-slate-400">Planned Stops</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="font-mono text-[12px] text-slate-400">Micro-Stops</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="font-mono text-[12px] text-slate-400">Unplanned Outages</span>
              </div>
            </div>
          </div>

          {/* Active Alerts with interactive Action Deconstruction trigger */}
          <div id="alerts-panel" className="space-y-3">
            <span className="font-display text-xs font-bold text-slate-400 uppercase tracking-wider block">Real-time Causal Alerts</span>
            <div className="space-y-2.5">
              {currentLine.alerts.map((alert) => (
                <div
                  key={alert.id}
                  id={`alert-row-${alert.id}`}
                  className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                    alert.severity === 'red'
                      ? 'bg-red-950/20 border-red-900/40 hover:bg-red-950/30'
                      : 'bg-amber-950/15 border-amber-900/30 hover:bg-amber-950/25'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className={`w-5 h-5 shrink-0 mt-0.5 ${
                      alert.severity === 'red' ? 'text-red-400 animate-pulse' : 'text-amber-400'
                    }`} />
                    <p className="font-sans text-xs text-slate-200 leading-relaxed">{alert.msg}</p>
                  </div>
                  <button
                    onClick={() => triggerRootCause(alert.msg)}
                    className="shrink-0 flex items-center gap-1 self-end sm:self-center px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-teal-400 hover:text-teal-300 font-mono text-[12px] font-bold tracking-wide border border-slate-800 transition-all cursor-pointer"
                  >
                    Deconstruct Root Cause
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Action Center - Weekly Recommendations */}
        <div id="action-center-panel" className="bg-slate-900/50 p-4 sm:p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
                <h5 className="font-display text-xs font-bold text-white uppercase tracking-wider">Inshira Recommendation Engine</h5>
              </div>
              <span className="font-mono text-[12px] bg-teal-500/10 text-teal-400 px-1.5 py-0.5 rounded border border-teal-500/20 font-bold uppercase">
                Active
              </span>
            </div>

            <p className="font-sans text-[12px] text-slate-400 leading-relaxed">
              We cross-reference physical PLC events, thermal telemetry, and shift patterns to recommend setpoints that stabilize continuous runs. Click below to apply calibration.
            </p>

            <div id="recommendations-list" className="space-y-4">
              {currentLine.recommendations.map((rec) => {
                const isApplied = appliedRecIds.includes(rec.id);
                return (
                  <div 
                    key={rec.id} 
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      isApplied 
                        ? 'bg-emerald-950/10 border-emerald-500/40 shadow-lg shadow-emerald-500/5' 
                        : 'bg-slate-950 border-slate-850'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-display text-xs font-bold text-white block">{rec.title}</span>
                      <span className={`font-mono text-[12px] font-bold tracking-wide shrink-0 ${
                        isApplied ? 'text-emerald-400' : 'text-teal-400'
                      }`}>
                        {isApplied ? '✓ Applied' : rec.impact}
                      </span>
                    </div>
                    <p className="font-sans text-[12px] text-slate-400 leading-relaxed mt-1.5">
                      {rec.desc}
                    </p>
                    <div className="flex items-center justify-between pt-2 mt-1.5 border-t border-white/5">
                      <span className="font-mono text-[12px] text-slate-500 font-medium">
                        {rec.confidence}
                      </span>
                      <button 
                        onClick={() => handleApplyRecommendation(rec.id, rec.action)}
                        className={`flex items-center gap-1 text-[12px] font-mono font-bold uppercase transition-all px-2.5 py-1.5 rounded ${
                          isApplied 
                            ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' 
                            : 'bg-teal-500/10 text-teal-400 hover:bg-teal-500/20 border border-teal-500/15'
                        }`}
                      >
                        {isApplied ? 'Revert Sync' : rec.action}
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 bg-teal-500/5 p-4 rounded-xl border border-teal-500/10 space-y-2.5">
            <span className="font-mono text-[12px] text-teal-400 font-bold tracking-wider uppercase block">Operational Maturity Score</span>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-teal-500 to-emerald-400 h-full transition-all duration-500"
                  style={{ width: `${activeMetrics.oeeRaw}%` }}
                />
              </div>
              <span className="font-mono text-xs font-bold text-white">
                {activeMetrics.oee}
              </span>
            </div>
            <p className="font-sans text-[12px] text-slate-500 leading-relaxed">
              {activeLine === 'A'
                ? 'Your factory displays a reactive maturity. Resolving sealing micro-stops elevates you to preventative.'
                : activeLine === 'B'
                ? 'Exceptional score. CNC tooling adjustments are moving this line towards prescriptive intelligence.'
                : 'Action required. Multiple uncoordinated stoppages are driving systematic yield leakage.'}
            </p>
          </div>
        </div>

      </div>

      {/* Causal Chain Deconstruction Modal (Interactive) */}
      {showRootCauseModal && (
        <div id="causal-modal-backdrop" className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div id="causal-modal-content" className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-2xl space-y-5 relative">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-[12px] text-teal-400 font-bold uppercase tracking-wider block">Inshira Intelligence Deep-Dive</span>
                <h4 className="font-display text-base font-bold text-white mt-0.5">Automated Causal Chain Deconstruction</h4>
              </div>
              <button
                onClick={() => setShowRootCauseModal(false)}
                className="p-1 rounded bg-slate-950 text-slate-400 hover:text-white transition-colors border border-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850 space-y-1">
              <span className="font-mono text-[12px] text-red-400 uppercase font-bold tracking-wider">Trigger Incident</span>
              <p className="font-sans text-xs text-slate-300 leading-relaxed">{selectedAlert}</p>
            </div>

            <div className="space-y-3.5 relative pl-4 border-l-2 border-slate-800">
              
              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-teal-400" />
                <span className="font-mono text-[12px] text-teal-400 uppercase font-bold tracking-wider block">Step 1: Signal Isolation</span>
                <p className="font-sans text-xs text-slate-300 mt-0.5 leading-relaxed">
                  The PLC logs micro-current spikes on the seal jaw motor during heat recovery cycles. Air pocket anomalies detected in polymer feed.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-teal-400" />
                <span className="font-mono text-[12px] text-teal-400 uppercase font-bold tracking-wider block">Step 2: Causal Mapping</span>
                <p className="font-sans text-xs text-slate-300 mt-0.5 leading-relaxed">
                  By matching raw material delivery times, we isolated these spikes to Batch #415 polypropylene resin. This batch exhibits a 1.2% higher moisture absorption rate.
                </p>
              </div>

              <div className="relative">
                <div className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-mono text-[12px] text-emerald-400 uppercase font-bold tracking-wider block">Step 3: Business Quantified Solution</span>
                <p className="font-sans text-xs text-slate-200 mt-0.5 leading-relaxed font-medium">
                  Recommendation: Apply a pre-heating delay profile of +8 seconds during Batch #415 changeovers. This fully stabilizes polymer moisture before extrusion.
                </p>
                <div className="mt-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg flex justify-between items-center text-[12px] font-mono">
                  <span className="text-emerald-400">Projected Downtime Avoided</span>
                  <span className="text-white font-bold">2.4 Hours/Wk (£7,200)</span>
                </div>
              </div>

            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowRootCauseModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-850 text-slate-300 font-sans text-xs font-medium border border-slate-800 transition-colors cursor-pointer"
              >
                Close Diagnostic
              </button>
              <button
                onClick={() => {
                  setShowRootCauseModal(false);
                  setAppliedRecIds((prev) => [...prev, 'rec-1']);
                  setToastMessage('Success: Recommendation calibrated and synced successfully! Plant metrics updated.');
                }}
                className="flex-1 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-sans text-xs font-bold tracking-wide transition-all shadow-lg shadow-teal-500/15 cursor-pointer"
              >
                Sync Parameter Preset
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
