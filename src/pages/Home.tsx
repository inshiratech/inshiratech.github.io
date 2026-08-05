import React, { useState } from 'react';
import DashboardMockup from '../components/DashboardMockup';
import InteractiveDigitalTwin from '../components/InteractiveDigitalTwin';
import RoiCalculator from '../components/RoiCalculator';
import HeroFactoryFlow from '../components/HeroFactoryFlow';
import OperationalJourney from '../components/OperationalJourney';
import FuturePipeline from '../components/FuturePipeline';
import { PageId } from '../types';
import {
  Activity,
  ArrowRight,
  TrendingDown,
  Shield,
  Clock,
  CheckCircle2,
  Sparkles,
  Zap,
  Layers,
  FileText,
  Server,
  Network,
  Award,
  AlertCircle,
  TrendingUp,
  Cpu,
  BarChart3,
  HelpCircle,
  Eye,
  Settings,
  ChevronRight,
  Database,
  Users,
  LineChart,
  Briefcase,
  Wrench,
  Gauge
} from 'lucide-react';

interface HomeProps {
  setCurrentPage: (page: PageId) => void;
}

export default function HomePage({ setCurrentPage }: HomeProps) {
  // Navigation handler
  const handleNav = (pageId: PageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cursor-follow lighting effect helper
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  // 1. STATE FOR BOTTLENECK MAP
  const [selectedNode, setSelectedNode] = useState<string>('extrusion');

  const flowNodes = {
    feeding: {
      title: 'Material Feeding Sequence',
      lossType: 'Micro-stoppage (under 2 minutes)',
      frequency: '24 times per shift',
      cause: 'Silo pressure sensor calibration mismatch on high-viscosity resins.',
      recovery: '£18,500 annual recovery estimate',
      status: 'yellow'
    },
    extrusion: {
      title: 'Thermal Extrusion Tunnel',
      lossType: 'Design Speed Fallacy (Throttled OEE)',
      frequency: 'Continuous 8% below nominal',
      cause: 'Operator throttles speed by 8% to avoid thermal startup scrap.',
      recovery: '£42,000 annual recovery estimate',
      status: 'red'
    },
    cutting: {
      title: 'Precision Die Cutting CNC',
      lossType: 'Extended Changeover Setup Bleed',
      frequency: 'Average 42 mins (target is 25 mins)',
      cause: 'Tooling cart placement delays and lack of synchronized setter schedules.',
      recovery: '£29,000 annual recovery estimate',
      status: 'yellow'
    },
    packaging: {
      title: 'Automatic Shrink Wrap Line',
      lossType: 'Unrecorded Stalls (Sensor Blindspots)',
      frequency: '45 cumulative mins per day',
      cause: 'Poly-reel feed slippage goes unlogged by PLC because it lasts <15 seconds.',
      recovery: '£16,000 annual recovery estimate',
      status: 'red'
    }
  };

  // 2. STATE FOR INDUSTRY FRAMEWORKS
  const [activeFramework, setActiveFramework] = useState<'siri' | 'operi' | 'shif'>('shif');

  // 3. STATE FOR OPERATIONAL MATURITY
  const [selectedMaturityLevel, setSelectedMaturityLevel] = useState<number>(3);

  const maturityLevels = [
    {
      level: 1,
      title: 'Reactive Status',
      sub: 'Spreadsheet Ingestion',
      description: 'Ad-hoc, manual entry of shift sheets. Operational data is captured retroactively with high coordinator overhead and zero root-cause linkage.',
      recovery: '£15,000 - £25,000 / yr',
      gaps: 'Sensor blindspots, undocumented micro-stalls, delayed shift-report compiling.',
      benchmark: 'Common in legacy bespoke cells (45% of UK SMEs operate here).'
    },
    {
      level: 2,
      title: 'Logged Status',
      sub: 'Basic BI Dashboards',
      description: 'Historical averages displayed on screens. Tells you OEE was low yesterday but offers no actionable explanation of why it occurred or how to stabilize it today.',
      recovery: '£30,000 - £55,000 / yr',
      gaps: 'Retrospective metrics, lack of operator feedback sync, no what-if scenario forecasting.',
      benchmark: 'Typical first-generation digital factories (32% of EU plants).'
    },
    {
      level: 3,
      title: 'Proactive Layer',
      sub: 'Decision Support Active',
      description: 'Unlogged losses isolated in real-time. System correlates schedule parameters to identify hidden bottleneck causes and recommends minor setpoint shifts.',
      recovery: '£60,000 - £110,000 / yr',
      gaps: 'Disconnected machine-to-operator feedback loops on custom high-mix product runs.',
      benchmark: 'Current Inshira customer entry-point (15% of advanced plants).'
    },
    {
      level: 4,
      title: 'Integrated Loop',
      sub: 'Dynamic Intelligence',
      description: 'Bespoke product runs auto-modeled before execution. Setter schedules and line thermal parameters are dynamically aligned with line capacities.',
      recovery: '£120,000 - £220,000 / yr',
      gaps: 'Fully automated feedback limits on ancient legacy machinery relays.',
      benchmark: 'World-class operational excellence (6% of UK manufacturing firms).'
    },
    {
      level: 5,
      title: 'Autonomous Excellence',
      sub: 'Hybrid Coordination',
      description: 'Self-correcting alignment between floor operational parameters and corporate C-suite objectives. Human tribal knowledge is preserved and synthesized with live AI logic.',
      recovery: '£250,000+ / yr',
      gaps: 'None - complete continuous excellence cycle.',
      benchmark: 'Industry 4.0 Pioneers (under 2% of global aerospace and advanced plastic firms).'
    }
  ];

  // 4. STATE FOR EXECUTIVE BENCHMARKING
  const [selectedExecMetric, setSelectedExecMetric] = useState<string>('maturity');

  const executiveMetrics = {
    maturity: {
      title: 'Overall Operational Maturity',
      value: 'Level 3+ (Proactive)',
      trend: 'Up from Level 2.1 in 3 months',
      benchmark: 'Top 15% of High-Mix Sector',
      impact: 'Unblocked £94,000 in unlogged micro-stoppage capacity across extrusion lines.',
      priority: 'Transition Line 3 cutting CNCs to predictive tooling replacement schedules.'
    },
    intelligence: {
      title: 'Operational Intelligence Score',
      value: '88 / 100',
      trend: '+12 points since baseline',
      benchmark: 'Outperforming regional HMLV average (68/100)',
      impact: 'Slashed operator reporting latency from 24 hours down to 4.2 minutes.',
      priority: 'Integrate Shift B tribal setup notes into the centralized machine calibration catalog.'
    },
    excellence: {
      title: 'Operational Excellence (OEE)',
      value: '76.4%',
      trend: 'Steady increase from 68.2%',
      benchmark: 'World-Class Target: 85.0% for custom ETO',
      impact: 'Recovered 22.4 shift hours per month, equivalent to £72,000 in saved scrap and idle power.',
      priority: 'Stabilize extrusion pre-heating loop during custom resin changeover sequences.'
    },
    roi: {
      title: 'Expected Financial ROI',
      value: '440% Year 1',
      trend: 'Calculated across 4 active CNC cells',
      benchmark: 'Traditional MES software ROI (120% over 3 years)',
      impact: 'Payback period completed in 3.4 months. High capital efficiency with zero sensor spend.',
      priority: 'Scale the decision twin modeling to the secondary assembly packaging hall.'
    }
  };

  // 5. STATE FOR IMPROVEMENT ROADMAP
  const [activeRoadmapStep, setActiveRoadmapStep] = useState<number>(0);

  const roadmapSteps = [
    {
      title: 'Current State Analysis',
      subtitle: 'Isolate Gaps & Spreadsheet Errors',
      description: 'Map existing PLC data silos and spreadsheet logging workflows. Identify where operators are spending hours manual-stitching reports, and locate hidden sensor blindspots.',
      roi: 'Immediate overhead savings',
      impact: 'Saves 12 engineering hours/week',
      effort: 'Low',
      confidence: '98%',
      risk: 'Negligible',
      timeline: 'Days 1 - 7',
      note: 'Establishes a transparent data baseline before altering any floor workflows.'
    },
    {
      title: 'Operational Assessment',
      subtitle: 'Correlate Machine Events & Shifts',
      description: 'Ingest raw logs into Inshira without installing hardware. Cross-correlate shift schedules, part numbers, and PLC halts to pinpoint why specific teams or bespoke materials cause cycle lag.',
      roi: '3x-5x on priority cells',
      impact: 'Exposes £35k in hidden losses',
      effort: 'Low',
      confidence: '94%',
      risk: 'None',
      timeline: 'Weeks 2 - 3',
      note: 'Highlights the actual bottlenecks, separating minor interruptions from major systemic issues.'
    },
    {
      title: 'Framework Benchmarking',
      subtitle: 'SIRI & OPERI Alignment',
      description: 'Compare plant maturity parameters with industry leaders. Score your digital transformation readiness and continuous improvement metrics against the Smart Industry Readiness Index.',
      roi: 'Long-term strategic clarity',
      impact: 'Identifies top 3 process wastes',
      effort: 'Medium',
      confidence: '90%',
      risk: 'Low',
      timeline: 'Week 4',
      note: 'Positions your factory under an executive-level operational maturity index.'
    },
    {
      title: 'Priority Actions Mapping',
      subtitle: 'Flag High-Exposure bottlenecks',
      description: 'Isolate the single station responsible for throttling OEE (e.g., thermal extruder pre-heats or CNC setter allocation). Calculate the exact annual cost of these micro-stoppages.',
      roi: '£42,000 recovered annually',
      impact: 'Stabilizes line throughput',
      effort: 'Medium',
      confidence: '95%',
      risk: 'Negligible',
      timeline: 'Week 5',
      note: 'Focuses engineering teams on high-return, low-effort floor improvements first.'
    },
    {
      title: 'Scenario Modelling',
      subtitle: 'Run Interactive "What-If" Simulations',
      description: 'Model different scheduling options using Inshira\'s Interactive Digital Twin. Predict how moving a tool setter or altering a resin sequence affects delivery times and carbon emissions.',
      roi: 'Prevents costly machine trials',
      impact: 'Saves £12,000 in testing waste',
      effort: 'Low',
      confidence: '92%',
      risk: 'Zero',
      timeline: 'Ongoing',
      note: 'Simulate financial and environmental ROI before spending capital on the shop floor.'
    },
    {
      title: 'Implementation Integration',
      subtitle: 'Activate Operator Feedback Loops',
      description: 'Roll out the operational intelligence layer. Deliver lightweight, context-rich recommendations directly to team leads and operators without changing their daily software platforms.',
      roi: '380% average Year 1 ROI',
      impact: 'Slashes downtime by 24%',
      effort: 'Medium',
      confidence: '96%',
      risk: 'Low',
      timeline: 'Weeks 6 - 8',
      note: 'Engages operators directly by addressing chronic, irritating floor bottlenecks.'
    },
    {
      title: 'Continuous Monitoring',
      subtitle: 'Daily Signal Stability Audit',
      description: 'Ensure operational gains are maintained over time. System triggers proactive alerts when thermal parameters drift or tool calibration shifts, catching deviations before they cause waste.',
      roi: 'Permanent bottom-line protection',
      impact: 'Maintains 95%+ process stability',
      effort: 'Low',
      confidence: '97%',
      risk: 'Negligible',
      timeline: 'Continuous',
      note: 'Prevents the common "excellence drift" where factories regress to reactive states.'
    },
    {
      title: 'Operational Excellence',
      subtitle: 'Automated Executive Alignment',
      description: 'Consistently hit high-mix target margins. Centralize shop-floor reality with financial planning, enabling the C-suite to make agile, data-backed commercial commitments.',
      roi: 'Sustainable 8-12% OEE gains',
      impact: 'Protects gross margins on ETO',
      effort: 'Low',
      confidence: '99%',
      risk: 'None',
      timeline: 'Continuous',
      note: 'Unifies the shop floor and executive boardroom into a single operational truth.'
    }
  ];

  return (
    <div id="homepage-root" className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION: Positioning as Category Leader in Operational & Decision Intelligence */}
      <section id="hero-section" className="relative pt-16 sm:pt-24 lg:pt-32 overflow-hidden">
        
        {/* Engineering Ambient Lighting */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#0055ff]/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-teal-500/5 rounded-full blur-[110px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3.5 py-2 rounded-full mx-auto select-none">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-ping"></span>
            <span className="text-[12px] uppercase tracking-widest font-mono font-semibold text-white/80">
              Operational Intelligence for Bespoke Manufacturing
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold leading-[1.05] tracking-tight text-white max-w-5xl mx-auto">
            Find & Fix Hidden Losses with <span className="text-teal-500">Decision Intelligence.</span>
          </h1>

          <p className="font-sans text-sm sm:text-lg text-white/50 max-w-3xl mx-auto leading-relaxed">
            What is Operational Intelligence? Unlike standard BI dashboards that report yesterday's numbers, Inshira creates a dynamic decision-support overlay. We integrate fragmented shop-floor records to isolate unlogged losses—without changing your ERP, adding hardware, or altering legacy systems.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => handleNav('contact')}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-8 py-4 bg-teal-500 hover:bg-[#33daff] text-slate-950 rounded-xl font-sans text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg hover:scale-[1.02]"
            >
              Book Discovery Call
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              onClick={() => handleNav('platform')}
              className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-sans text-xs sm:text-sm font-semibold tracking-wide transition-colors"
            >
              Explore the Platform
            </button>
          </div>

          {/* Immersive Digital Factory Flow */}
          <div className="pt-6">
            <HeroFactoryFlow />
          </div>

          {/* Targeted Industry Footprint */}
          <div className="pt-10 max-w-4xl mx-auto">
            <span className="font-mono text-[12px] text-slate-500 uppercase tracking-widest block mb-4 font-bold">
              Calibrated for High-Mix Low-Volume, ETO, CTO, MTO, and Complex Production Lines
            </span>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 font-display text-[12px] font-semibold text-slate-400 uppercase tracking-widest">
              <span>Bespoke Manufacturing</span>
              <span className="text-white/10">•</span>
              <span>Advanced Plastics & Extrusion</span>
              <span className="text-white/10">•</span>
              <span>Engineer-to-Order (ETO)</span>
              <span className="text-white/10">•</span>
              <span>Configure-to-Order (CTO)</span>
              <span className="text-white/10">•</span>
              <span>High-Mix, Low-Volume (HMLV)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Alignment: Operational Visibility to Sustainable Manufacturing Journey */}
      <section id="operational-evolution-journey" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <OperationalJourney />
      </section>

      {/* 2. THE AHA MOMENT: Most Manufacturing Software Was Built for Standard Factories. Yours Isn't. */}
      <section id="aha-moment-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          onMouseMove={handleMouseMove}
          className="glow-card rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden"
        >
          {/* Subtle design gradient strip */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6 relative z-10">
              <span className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest block">
                The Core Realisation
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-white leading-[1.1] tracking-tight">
                Most Manufacturing Software Was Built for Standard Factories. <span className="text-teal-500">Yours Isn't.</span>
              </h2>
              
              <div className="space-y-4 font-sans text-sm sm:text-base text-slate-400 leading-relaxed">
                <p>
                  Traditional manufacturing software performs exceptionally well when your products, processes, and production schedules rarely change. It was designed for high-volume, repetitive, highly predictable environments.
                </p>
                <p className="font-semibold text-white/80">
                  Why do bespoke and high-mix manufacturers struggle with traditional software?
                </p>
                <p>
                  Because every order is unique, setup parameters fluctuate, and production sequences change daily. When you run Engineer-to-Order (ETO), Configure-to-Order (CTO), or High-Mix Low-Volume (HMLV) lines, rigid software models fall apart. Valuable operational insights end up buried inside disparate spreadsheets, disconnected ERP systems, and legacy machines that don't speak to each other.
                </p>
                <p>
                  That's where Inshira is different. Rather than forcing your facility into predefined, rigid software models, Inshira creates an <strong className="text-white">operational intelligence layer</strong> that adapts dynamically to how your factory actually operates.
                </p>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => handleNav('about')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-teal-400 hover:text-white transition-colors"
                >
                  Learn about our operational philosophy <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Visual Callout block with human-in-the-loop emphasis */}
            <div 
              onMouseMove={handleMouseMove}
              className="lg:col-span-5 glow-card rounded-2xl p-6 space-y-4 relative"
            >
              <div className="absolute top-4 right-4 text-[12px] font-mono text-slate-600 uppercase font-bold tracking-widest">
                System Logic
              </div>
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full inline-block"></span>
              <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                Built Around Real Workflows
              </h4>
              <p className="font-sans text-xs text-slate-400 leading-relaxed">
                Inshira complements your team instead of replacing them. It integrates directly with standard operator shifts and engineering routines, matching real-world behavior to identify unlogged bottleneck causes within days.
              </p>
              <div className="border-t border-white/5 pt-4 flex items-center justify-between relative z-10">
                <div>
                  <span className="font-mono text-[12px] text-slate-500 uppercase block">Implementation Style</span>
                  <span className="font-display text-xs font-bold text-white block mt-0.5">Software Overlay</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[12px] text-slate-500 uppercase block">No New Sensors</span>
                  <span className="font-sans text-xs font-bold text-emerald-400 block mt-0.5">Zero Hardware CapEx</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INDUSTRY FRAMEWORKS SECTION (SIRI, OPERI, SHIF) */}
      <section id="industry-frameworks" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest block">
            Methodological Credibility
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Grounded in Modern Manufacturing Frameworks
          </h2>
          <p className="font-sans text-sm text-slate-400">
            Inshira is not generic software. It aligns with recognized international standards and advanced hybrid intelligence models to deliver provable bottom-line stability.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center border-b border-white/5 max-w-xl mx-auto p-1 bg-slate-950 rounded-full border">
          <button
            onClick={() => setActiveFramework('shif')}
            className={`w-1/3 py-2.5 rounded-full font-display text-xs font-bold uppercase tracking-wider transition-all ${
              activeFramework === 'shif'
                ? 'bg-teal-500 text-slate-950 shadow-lg'
                : 'text-slate-400 hover:text-white bg-transparent'
            }`}
          >
            SHIF (Proprietary)
          </button>
          <button
            onClick={() => setActiveFramework('siri')}
            className={`w-1/3 py-2.5 rounded-full font-display text-xs font-bold uppercase tracking-wider transition-all ${
              activeFramework === 'siri'
                ? 'bg-teal-500 text-slate-950 shadow-lg'
                : 'text-slate-400 hover:text-white bg-transparent'
            }`}
          >
            SIRI Index
          </button>
          <button
            onClick={() => setActiveFramework('operi')}
            className={`w-1/3 py-2.5 rounded-full font-display text-xs font-bold uppercase tracking-wider transition-all ${
              activeFramework === 'operi'
                ? 'bg-teal-500 text-slate-950 shadow-lg'
                : 'text-slate-400 hover:text-white bg-transparent'
            }`}
          >
            OPERI Principles
          </button>
        </div>

        {/* Content Panel */}
        <div className="bg-slate-900/20 border border-white/5 rounded-3xl p-6 sm:p-10 relative overflow-hidden min-h-[400px]">
          
          {activeFramework === 'shif' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-5">
                <span className="font-mono text-[12px] text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded border border-teal-500/20 uppercase tracking-widest font-semibold inline-block">
                  Sustainable Hybrid Intelligence Framework
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Preserving Operator Tribal Knowledge
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
                  The Sustainable Hybrid Intelligence Framework (SHIF) represents Inshira's core design philosophy. We believe that raw sensor data is only half the story. 
                </p>
                <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
                  SHIF actively captures and digitizes operator insights (tribal knowledge) during custom setups, merging it with machine PLC parameters and sustainability goals (minimizing startup scrap and idle energy loops) to output explainable recommendations that managers can trust.
                </p>
              </div>

              {/* Dynamic converging visual representation */}
              <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-white/5 relative space-y-6 overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-teal-500/5 rounded-full blur-3xl"></div>
                <span className="font-mono text-[12px] text-slate-500 uppercase font-bold tracking-widest block">
                  Interactive Converging Model
                </span>

                <div className="grid grid-cols-2 gap-3 relative z-10">
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                    <span className="font-mono text-[12px] text-teal-400 font-bold uppercase tracking-wider block">Pillar 01</span>
                    <h5 className="font-display text-xs font-bold text-white uppercase tracking-wider">Human Expertise</h5>
                    <p className="text-[12px] text-slate-500 leading-tight">Operator setup routines, shift comments & notes.</p>
                  </div>
                  
                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                    <span className="font-mono text-[12px] text-teal-400 font-bold uppercase tracking-wider block">Pillar 02</span>
                    <h5 className="font-display text-xs font-bold text-white uppercase tracking-wider">Operational Data</h5>
                    <p className="text-[12px] text-slate-500 leading-tight">PLC halts, cycle speeds, and ERP batch numbers.</p>
                  </div>

                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                    <span className="font-mono text-[12px] text-teal-400 font-bold uppercase tracking-wider block">Pillar 03</span>
                    <h5 className="font-display text-xs font-bold text-white uppercase tracking-wider">Artificial Intelligence</h5>
                    <p className="text-[12px] text-slate-500 leading-tight">Causal algorithms, bottleneck isolation & modeling.</p>
                  </div>

                  <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                    <span className="font-mono text-[12px] text-teal-400 font-bold uppercase tracking-wider block">Pillar 04</span>
                    <h5 className="font-display text-xs font-bold text-white uppercase tracking-wider">Sustainability Goals</h5>
                    <p className="text-[12px] text-slate-500 leading-tight">Thermal stabilization to slash startup resin scrap.</p>
                  </div>
                </div>

                {/* Converging Flow diagram */}
                <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <Network className="w-5 h-5 text-teal-400" />
                    <span className="font-mono text-[12px] text-slate-300 font-semibold uppercase tracking-wider">SHIF Core Engine</span>
                  </div>
                  
                  {/* Flow Arrow layout */}
                  <div className="flex items-center gap-1.5 text-[12px] font-mono text-slate-400 font-bold bg-teal-500/15 text-teal-400 px-3 py-1.5 rounded-full border border-teal-500/20">
                    <span>Better Decisions</span>
                    <ArrowRight className="w-3 h-3" />
                    <span className="text-white">Continuous Excellence</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeFramework === 'siri' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-5">
                <span className="font-mono text-[12px] text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded border border-teal-500/20 uppercase tracking-widest font-semibold inline-block">
                  Smart Industry Readiness Index
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Accelerating Advanced Digital Readiness
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
                  SIRI is the global standard for modern industrial transformation. Rather than recommending expensive, full-scale system rebuilds, Inshira maps directly to the SIRI methodology by focusing on vertical data integration and decision support.
                </p>
                <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
                  We allow manufacturers to leapfrog readiness levels by linking siloed shop-floor logs to existing enterprise architectures. This enables automated, validated record-sharing that boosts overall digital scoring.
                </p>
              </div>

              {/* SIRI visual cards */}
              <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-white/5 space-y-4">
                <span className="font-mono text-[12px] text-slate-500 uppercase font-bold tracking-widest block">
                  SIRI Assessment Alignment
                </span>
                
                <div className="space-y-3">
                  <div className="p-3 bg-white/[0.01] border-l-2 border-teal-500 rounded-r-xl">
                    <h5 className="font-display text-xs font-bold text-white uppercase tracking-wider">Process Integration</h5>
                    <p className="text-[12px] text-slate-400 mt-1 leading-normal">
                      Connects machine events directly to batch work order parameters to maintain accurate product margins.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-white/[0.01] border-l-2 border-teal-500 rounded-r-xl">
                    <h5 className="font-display text-xs font-bold text-white uppercase tracking-wider">Operational Transparency</h5>
                    <p className="text-[12px] text-slate-400 mt-1 leading-normal">
                      Highlights unlogged micro-stoppages, turning chaotic shifts into highly predictable, transparent operations.
                    </p>
                  </div>

                  <div className="p-3 bg-white/[0.01] border-l-2 border-teal-500 rounded-r-xl">
                    <h5 className="font-display text-xs font-bold text-white uppercase tracking-wider">Decentralised Decision Making</h5>
                    <p className="text-[12px] text-slate-400 mt-1 leading-normal">
                      Delivers localized recommendations straight to shift supervisors, authorizing swift bottleneck clearance.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeFramework === 'operi' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-5">
                <span className="font-mono text-[12px] text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded border border-teal-500/20 uppercase tracking-widest font-semibold inline-block">
                  Operational Performance & Excellence
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Quantifiable Operational Outcomes
                </h3>
                <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Inshira supports advanced continuous improvement (CI) structures under OPERI principles. Traditional CI relies on static Six-Sigma paper audits, which represent a single point in time and inevitably drift once consultants leave the site.
                </p>
                <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Inshira acts as a continuous digital excellence loop, automatically monitoring bottleneck drift and verifying that cycle-time gains are sustained. We map precise, ongoing actions directly onto your executive goals.
                </p>
              </div>

              {/* OPERI cards */}
              <div className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-2xl border border-white/5 space-y-4">
                <span className="font-mono text-[12px] text-slate-500 uppercase font-bold tracking-widest block">
                  Continuous Excellence Cycle
                </span>
                
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                    <TrendingUp className="w-5 h-5 text-teal-400 mx-auto mb-2" />
                    <h5 className="font-display text-[12px] font-bold text-white uppercase">Isolate Loss</h5>
                    <p className="text-[12px] text-slate-500 mt-1">Daily unlogged OEE leak audits.</p>
                  </div>

                  <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                    <Cpu className="w-5 h-5 text-teal-400 mx-auto mb-2" />
                    <h5 className="font-display text-[12px] font-bold text-white uppercase">Calibrate Set</h5>
                    <p className="text-[12px] text-slate-500 mt-1">Model shifts with What-If simulations.</p>
                  </div>

                  <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xl">
                    <Shield className="w-5 h-5 text-teal-400 mx-auto mb-2" />
                    <h5 className="font-display text-[12px] font-bold text-white uppercase">Sustain Gain</h5>
                    <p className="text-[12px] text-slate-500 mt-1">Continuous signal monitoring.</p>
                  </div>
                </div>

                <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl text-center text-xs font-semibold text-emerald-400">
                  Target: +8% to +14% Sustainable Shift OEE Recovered within 60 Days.
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 4. EXECUTIVE OPERATIONAL MATURITY & BENCHMARKING SECTION */}
      <section id="operational-maturity" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest block">
              Executive Benchmarking
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Where Does Your Plant Currently Stand?
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
              Manufacturers don't just need static charts. They need to understand how they compare to industry best practices, and where to invest continuous improvement resources to protect high-mix margins.
            </p>
            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
              Click through the maturity phases on the right to discover estimated annual cash recovery potentials, primary process gaps, and how Inshira provides the roadmap to Level 5 Excellence.
            </p>

            <div className="p-4 bg-slate-950 border border-white/5 rounded-2xl flex items-center gap-3">
              <Award className="w-5 h-5 text-teal-400 shrink-0" />
              <div>
                <span className="font-mono text-[12px] text-slate-500 uppercase block font-bold">UK/EU High-Mix Average</span>
                <span className="font-sans text-xs font-semibold text-white">Most advanced plants stall at Level 2.6 (Logged) due to spreadsheet fatigue.</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Steps indicator */}
            <div className="grid grid-cols-5 divide-x divide-white/5 border-b border-white/10 bg-slate-950">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setSelectedMaturityLevel(lvl)}
                  className={`py-4 px-2 text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    selectedMaturityLevel === lvl
                      ? 'bg-teal-500/10 text-white'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <span className="font-mono text-[12px] uppercase block tracking-wider">Level</span>
                  <span className={`font-display text-lg font-black ${selectedMaturityLevel === lvl ? 'text-teal-400' : 'text-slate-500'}`}>
                    0{lvl}
                  </span>
                </button>
              ))}
            </div>

            {/* Maturity level details */}
            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
                <div>
                  <span className="font-mono text-[12px] text-teal-400 uppercase tracking-widest font-bold">
                    Active Level Assessment
                  </span>
                  <h4 className="font-display text-lg font-bold text-white mt-0.5">
                    {maturityLevels[selectedMaturityLevel - 1].title} — <span className="text-slate-400 font-normal">{maturityLevels[selectedMaturityLevel - 1].sub}</span>
                  </h4>
                </div>
                <div className="text-left sm:text-right">
                  <span className="font-mono text-[12px] text-slate-500 uppercase block font-semibold">Est. Recoverable Loss</span>
                  <span className="font-display text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 inline-block mt-0.5">
                    {maturityLevels[selectedMaturityLevel - 1].recovery}
                  </span>
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
                {maturityLevels[selectedMaturityLevel - 1].description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
                <div className="p-3.5 bg-white/[0.01] border border-white/5 rounded-xl space-y-1.5">
                  <span className="font-mono text-[12px] text-rose-400 font-bold uppercase tracking-wider block">Critical Gaps Isolated:</span>
                  <p className="text-slate-400 text-[12px] leading-relaxed">{maturityLevels[selectedMaturityLevel - 1].gaps}</p>
                </div>

                <div className="p-3.5 bg-white/[0.01] border border-white/5 rounded-xl space-y-1.5">
                  <span className="font-mono text-[12px] text-teal-400 font-bold uppercase tracking-wider block">Sector Benchmark Rating:</span>
                  <p className="text-slate-400 text-[12px] leading-relaxed">{maturityLevels[selectedMaturityLevel - 1].benchmark}</p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => handleNav('contact')}
                  className="flex items-center gap-1 text-xs font-bold text-teal-400 hover:text-white transition-colors"
                >
                  Request a complimentary maturity evaluation <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 5. STRENGTHENED DIFFERENTIATION: Why Bespoke Manufacturers Struggle */}
      <section id="bespoke-struggle" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <span className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest block font-bold">
            The Architectural Gaps in ERP & MES
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight leading-none">
            Why Bespoke Manufacturers Struggle with Traditional Software
          </h2>
          <p className="font-sans text-sm text-slate-400">
            Standard manufacturing platforms assume highly repetitive runs and static parameters. High-mix plants operate completely differently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="p-6 bg-slate-900/30 border border-white/5 rounded-2xl space-y-3 relative overflow-hidden">
            <span className="font-mono text-[12px] text-slate-500 font-bold uppercase tracking-widest block">The Fallacy 01</span>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">High-Volume Assumptions</h4>
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              Standard software assumes parts will run continuously for days. If you switch setups 4 times per shift on high-mix lines, your OEE metrics sink because the systems fail to separate changeover sequences from machine failures.
            </p>
          </div>

          <div className="p-6 bg-slate-900/30 border border-white/5 rounded-2xl space-y-3 relative overflow-hidden">
            <span className="font-mono text-[12px] text-slate-500 font-bold uppercase tracking-widest block">The Fallacy 02</span>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">Rigid Product Routing</h4>
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              Traditional ERP routers expect rigid, linear operational sequences. In real high-mix cells, operators reroute parts dynamically to Line 3 or hold steps during thermal bottlenecks to bypass mechanical stall cycles.
            </p>
          </div>

          <div className="p-6 bg-slate-900/30 border border-white/5 rounded-2xl space-y-3 relative overflow-hidden">
            <span className="font-mono text-[12px] text-slate-500 font-bold uppercase tracking-widest block">The Fallacy 03</span>
            <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">The Sensor Requirement</h4>
            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              Generic IIoT and AI solutions demand massive sensor installations and machine code rewrites. If you run legacy CNC mills, extrusion tunnels, or manual assembly benches, this hardware cost completely kills your ROI.
            </p>
          </div>

        </div>
      </section>

      {/* 6. NEW INDUSTRIAL VISUAL: Interactive Shop-Floor Bottleneck Map & Flow Stream */}
      <section id="bottleneck-map-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Text/Causal Value Story (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest block">
              How Can Manufacturers Reduce Operational Waste?
            </span>
            <h3 className="font-display text-xl sm:text-3xl font-bold text-white leading-tight">
              Tracing Losses From Operations to Excellence
            </h3>
            
            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
              How can manufacturers reduce operational waste? Standard software reports downtime hours post-factum. Inshira traces the complete causal chain—connecting raw physical PLC and schedule events directly to unlogged micro-stoppages.
            </p>

            {/* Vertical Flow Steps representation */}
            <div className="space-y-3 font-sans text-xs">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-[12px] font-mono text-teal-400 shrink-0">1</div>
                <div className="text-slate-300 font-semibold uppercase font-display text-[12px] tracking-wider">
                  Raw Operational Logs Ingested
                </div>
              </div>
              <div className="w-0.5 h-3 bg-white/10 ml-3"></div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-[12px] font-mono text-teal-400 shrink-0">2</div>
                <div className="text-slate-300 font-semibold uppercase font-display text-[12px] tracking-wider">
                  Hidden Micro-Losses Isolated
                </div>
              </div>
              <div className="w-0.5 h-3 bg-white/10 ml-3"></div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-[12px] font-mono text-teal-400 shrink-0">3</div>
                <div className="text-slate-300 font-semibold uppercase font-display text-[12px] tracking-wider">
                  Root Cause Synthesis & Scenario Modeling
                </div>
              </div>
              <div className="w-0.5 h-3 bg-white/10 ml-3"></div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-[12px] font-mono text-teal-400 shrink-0">4</div>
                <div className="text-slate-300 font-semibold uppercase font-display text-[12px] tracking-wider">
                  Decision Support & Continuous Excellence
                </div>
              </div>
            </div>

            <p className="font-sans text-[13px] text-slate-500 italic">
              Click the different factory stations in the interactive visualizer below to explore how unlogged OEE losses are localized and fixed without physical sensor installs.
            </p>
          </div>

          {/* Interactive Flow Visual representation (7 cols) */}
          <div className="lg:col-span-7 bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[12px] font-mono text-slate-500 font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              Live Flow Map
            </div>

            <span className="font-mono text-[12px] text-teal-400 uppercase font-bold tracking-widest block">
              Visual Bottleneck Diagnostics
            </span>

            {/* Layout representation of a production line */}
            <div className="grid grid-cols-4 gap-2 text-center pt-2 relative">
              {/* Connector line behind */}
              <div className="absolute top-6 left-1/8 right-1/8 h-0.5 bg-white/10 -z-0"></div>

              {/* Node 1 Button */}
              <button
                onClick={() => setSelectedNode('feeding')}
                className={`p-3 rounded-xl border relative z-10 transition-all flex flex-col items-center gap-1.5 ${
                  selectedNode === 'feeding'
                    ? 'bg-teal-500/10 border-teal-500 text-white shadow-xl shadow-teal-500/5'
                    : 'bg-white/[0.02] border-white/5 text-slate-500 hover:border-white/10'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-white">
                  01
                </div>
                <span className="text-[12px] font-mono uppercase font-bold tracking-wide">Feeding</span>
              </button>

              {/* Node 2 Button */}
              <button
                onClick={() => setSelectedNode('extrusion')}
                className={`p-3 rounded-xl border relative z-10 transition-all flex flex-col items-center gap-1.5 ${
                  selectedNode === 'extrusion'
                    ? 'bg-teal-500/10 border-teal-500 text-white shadow-xl shadow-teal-500/5'
                    : 'bg-white/[0.02] border-white/5 text-slate-500 hover:border-white/10'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center font-mono text-xs font-bold text-rose-400 animate-pulse">
                  02
                </div>
                <span className="text-[12px] font-mono uppercase font-bold tracking-wide">Extrusion</span>
                <span className="absolute -top-1.5 bg-rose-500 text-white text-[12px] font-bold px-1 py-0.5 rounded uppercase leading-none">Limit</span>
              </button>

              {/* Node 3 Button */}
              <button
                onClick={() => setSelectedNode('cutting')}
                className={`p-3 rounded-xl border relative z-10 transition-all flex flex-col items-center gap-1.5 ${
                  selectedNode === 'cutting'
                    ? 'bg-teal-500/10 border-teal-500 text-white shadow-xl shadow-teal-500/5'
                    : 'bg-white/[0.02] border-white/5 text-slate-500 hover:border-white/10'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-white">
                  03
                </div>
                <span className="text-[12px] font-mono uppercase font-bold tracking-wide">Cutting CNC</span>
              </button>

              {/* Node 4 Button */}
              <button
                onClick={() => setSelectedNode('packaging')}
                className={`p-3 rounded-xl border relative z-10 transition-all flex flex-col items-center gap-1.5 ${
                  selectedNode === 'packaging'
                    ? 'bg-teal-500/10 border-teal-500 text-white shadow-xl shadow-teal-500/5'
                    : 'bg-white/[0.02] border-white/5 text-slate-500 hover:border-white/10'
                }`}
              >
                <div className="w-7 h-7 rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center font-mono text-xs font-bold text-rose-400">
                  04
                </div>
                <span className="text-[12px] font-mono uppercase font-bold tracking-wide">Packaging</span>
              </button>

            </div>

            {/* Selected Node Details Display */}
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h5 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                  {flowNodes[selectedNode as keyof typeof flowNodes].title}
                </h5>
                <span className="font-mono text-[12px] text-teal-400 font-bold bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20 uppercase tracking-widest self-start sm:self-auto">
                  {flowNodes[selectedNode as keyof typeof flowNodes].lossType}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-500 font-mono text-[12px] block uppercase font-bold">Unlogged Frequency:</span>
                  <span className="text-slate-200 mt-0.5 block font-semibold">
                    {flowNodes[selectedNode as keyof typeof flowNodes].frequency}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 font-mono text-[12px] block uppercase font-bold">Identified Root Cause:</span>
                  <span className="text-slate-200 mt-0.5 block">
                    {flowNodes[selectedNode as keyof typeof flowNodes].cause}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                <span className="text-slate-400 font-medium">Estimated Financial Exposure:</span>
                <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20 self-start sm:self-auto">
                  {flowNodes[selectedNode as keyof typeof flowNodes].recovery}
                </span>
              </div>
            </div>

            {/* Simulated Live Plant Feed */}
            <div className="p-3 bg-black/60 rounded-xl border border-white/5 flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="font-mono text-[12px] text-slate-500">
                ACTIVE PIPELINE: Extruder thermal cycle log unified with Shift B setter roster.
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* 7. INTERACTIVE PRODUCT EXPERIENCE PREVIEW */}
      <section id="interactive-preview" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest block font-bold">
            How is Operational Intelligence different from Business Intelligence?
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            See the Live Operational Interface
          </h2>
          <p className="font-sans text-sm text-slate-400">
            How is Operational Intelligence different from Business Intelligence? While traditional BI tracks retrospective static charts, Inshira operates as a real-time decision-support layer. It maps machine signals directly to active shift boundaries, identifying chronic micro-stoppages.
          </p>
        </div>
        <DashboardMockup />
      </section>

      {/* 8. NEW PREMIUM EXECUTIVE BENCHMARKING DASHBOARD */}
      <section id="executive-dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest block font-bold">
            C-Suite Visualisation Layer
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight leading-none">
            Executive Benchmarking & OEE Oversight
          </h2>
          <p className="font-sans text-sm text-slate-400">
            This high-fidelity dashboard represents the C-suite reporting screen, connecting raw operational performance to financial margins. Click through the primary metrics on the left to review strategic actions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-3 bg-slate-950 p-4 rounded-2xl border border-white/5">
            <div className="space-y-2.5">
              <span className="font-mono text-[12px] text-slate-500 uppercase tracking-widest block font-bold">
                Select Reporting Vector
              </span>
              
              {Object.keys(executiveMetrics).map((key) => {
                const metric = executiveMetrics[key as keyof typeof executiveMetrics];
                const isSelected = selectedExecMetric === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedExecMetric(key)}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-white/5 border-white/25 text-white'
                        : 'bg-transparent border-transparent text-slate-400 hover:bg-white/[0.02] hover:text-slate-200'
                    }`}
                  >
                    <span className="font-mono text-[12px] text-slate-500 uppercase font-semibold">Indicator</span>
                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-white">
                      {metric.title}
                    </h4>
                    <div className="flex justify-between items-center mt-1">
                      <span className="font-mono text-xs font-bold text-teal-400">{metric.value}</span>
                      <span className="text-[12px] text-slate-500">{metric.trend}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-3 bg-white/[0.01] rounded-xl border border-white/5 text-[12px] text-slate-400 leading-relaxed italic mt-4">
              "We've linked floor performance indicators to our standard board reports, allowing us to substantiate OEE capital expenditure."
            </div>
          </div>

          {/* Premium Visual panel (8 cols) */}
          <div className="lg:col-span-8 bg-slate-900/10 border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-teal-500/5 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="space-y-6 relative z-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-4">
                <div>
                  <span className="font-mono text-[12px] text-teal-400 uppercase tracking-widest font-bold">
                    C-Suite KPI Breakdown
                  </span>
                  <h3 className="font-display text-lg font-bold text-white uppercase mt-0.5">
                    {executiveMetrics[selectedExecMetric as keyof typeof executiveMetrics].title}
                  </h3>
                </div>
                <div className="text-left sm:text-right">
                  <span className="font-mono text-[12px] text-slate-500 uppercase block font-semibold">Active Sector Benchmark</span>
                  <span className="font-mono text-xs font-bold text-emerald-400">
                    {executiveMetrics[selectedExecMetric as keyof typeof executiveMetrics].benchmark}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div className="space-y-1.5">
                  <span className="font-mono text-[12px] text-slate-500 uppercase font-bold tracking-wider block">Bottom-Line Recovery Impact:</span>
                  <p className="font-sans text-xs text-slate-300 leading-relaxed">
                    {executiveMetrics[selectedExecMetric as keyof typeof executiveMetrics].impact}
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="font-mono text-[12px] text-slate-500 uppercase font-bold tracking-wider block">Recommended Priority Next Step:</span>
                  <p className="font-sans text-xs text-slate-300 leading-relaxed">
                    {executiveMetrics[selectedExecMetric as keyof typeof executiveMetrics].priority}
                  </p>
                </div>
              </div>

              {/* Realistic Mock Visual elements */}
              <div className="p-4 bg-slate-950 rounded-xl border border-white/5 space-y-4 mt-2">
                <div className="flex justify-between items-center text-[12px] font-mono">
                  <span className="text-slate-500">Live Calibration Alignment Index</span>
                  <span className="text-teal-400">94.2% Confidence Signal</span>
                </div>
                
                <div className="h-4 bg-white/5 rounded overflow-hidden flex">
                  <div className="h-full bg-teal-600 w-[60%] border-r border-slate-950 flex items-center justify-center text-[12px] font-mono font-bold text-white">Active Stable (60%)</div>
                  <div className="h-full bg-emerald-500 w-[28%] border-r border-slate-950 flex items-center justify-center text-[12px] font-mono font-bold text-slate-950">Improved (28%)</div>
                  <div className="h-full bg-rose-500 w-[12%] flex items-center justify-center text-[12px] font-mono font-bold text-white">Loss (12%)</div>
                </div>

                <div className="flex justify-between items-center text-[12px] text-slate-500 font-mono">
                  <span>Shift A: 96%</span>
                  <span>Shift B: 88%</span>
                  <span>Shift C: 92%</span>
                </div>
              </div>

            </div>

            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 relative z-10 text-xs">
              <span className="text-slate-500 font-mono text-[12px]">REPORT CALIBRATION: Standard ETO Sector parameters applied</span>
              <button
                onClick={() => handleNav('solutions')}
                className="font-bold text-teal-400 hover:text-white transition-colors flex items-center gap-1"
              >
                Explore Solution Frameworks <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 9. AI-GENERATED IMPROVEMENT ROADMAP */}
      <section id="improvement-roadmap" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest block font-bold">
            A Step-By-Step Journey To Operational Excellence
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight leading-none">
            Interactive Continuous Improvement Roadmap
          </h2>
          <p className="font-sans text-sm text-slate-400">
            From fragmented post-shift logging to self-correcting alignment. Click each milestone on the timeline to preview estimated ROI, process effort, risks, and implementation times.
          </p>
        </div>

        {/* Roadmap Timeline Horizontal Selector */}
        <div className="bg-slate-950 border border-white/5 rounded-2xl p-4 overflow-x-auto shadow-2xl">
          <div className="flex justify-between items-center min-w-[900px] divide-x divide-white/5">
            {roadmapSteps.map((step, idx) => {
              const isActive = activeRoadmapStep === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveRoadmapStep(idx)}
                  className={`flex-1 px-3 py-2 text-center transition-all flex flex-col items-center gap-1.5 ${
                    isActive ? 'text-teal-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <span className="font-mono text-[12px] uppercase font-bold tracking-wider">Step 0{idx + 1}</span>
                  <span className="font-display text-xs font-bold truncate max-w-[100px] text-white">
                    {step.title}
                  </span>
                  <div className={`w-2.5 h-2.5 rounded-full transition-all ${
                    isActive ? 'bg-teal-500 scale-125' : 'bg-white/10'
                  }`}></div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step details display */}
        <div className="bg-slate-900/30 border border-white/10 rounded-3xl p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-teal-500/5 rounded-full blur-2xl pointer-events-none"></div>

          <div className="lg:col-span-7 space-y-4">
            <span className="font-mono text-xs text-teal-400 uppercase tracking-widest font-bold block">
              Step 0{activeRoadmapStep + 1} of 08 — {roadmapSteps[activeRoadmapStep].title}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
              {roadmapSteps[activeRoadmapStep].subtitle}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed">
              {roadmapSteps[activeRoadmapStep].description}
            </p>
            <div className="p-3.5 bg-slate-950 rounded-xl border border-white/5 text-xs text-slate-400 italic">
              "{roadmapSteps[activeRoadmapStep].note}"
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-950 p-5 rounded-2xl border border-white/5 space-y-4">
            <span className="font-mono text-[12px] text-slate-500 uppercase tracking-widest block font-bold">
              Milestone Parameters & METRICS
            </span>

            <div className="grid grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-2.5 bg-white/[0.01] rounded-lg border border-white/5">
                <span className="font-mono text-[12px] text-slate-500 uppercase block font-semibold">Estimated ROI</span>
                <span className="font-display font-bold text-white block mt-0.5">{roadmapSteps[activeRoadmapStep].roi}</span>
              </div>
              <div className="p-2.5 bg-white/[0.01] rounded-lg border border-white/5">
                <span className="font-mono text-[12px] text-slate-500 uppercase block font-semibold">Effort Level</span>
                <span className="font-sans font-bold text-teal-400 block mt-0.5">{roadmapSteps[activeRoadmapStep].effort}</span>
              </div>
              <div className="p-2.5 bg-white/[0.01] rounded-lg border border-white/5">
                <span className="font-mono text-[12px] text-slate-500 uppercase block font-semibold">Confidence</span>
                <span className="font-mono font-bold text-emerald-400 block mt-0.5">{roadmapSteps[activeRoadmapStep].confidence}</span>
              </div>
              <div className="p-2.5 bg-white/[0.01] rounded-lg border border-white/5">
                <span className="font-mono text-[12px] text-slate-500 uppercase block font-semibold">Timeline</span>
                <span className="font-sans font-bold text-white block mt-0.5">{roadmapSteps[activeRoadmapStep].timeline}</span>
              </div>
            </div>

            <div className="border-t border-white/5 pt-3 flex items-center justify-between text-xs">
              <div>
                <span className="font-mono text-[12px] text-slate-500 uppercase block">Process Risk Level</span>
                <span className="font-sans font-bold text-slate-300 block mt-0.5">{roadmapSteps[activeRoadmapStep].risk}</span>
              </div>
              <div>
                <span className="font-mono text-[12px] text-slate-500 uppercase block">Priority Action Status</span>
                <span className="font-sans font-bold text-emerald-400 block mt-0.5">Pre-Calibrated</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 10. WHAT-IF DIGITAL TWIN MODELING (Owns Category "What If?" Scenario Modelling) */}
      <section id="digital-twin-showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest block font-bold">
            How can manufacturers model operational improvements before implementing them?
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Model Bottlenecks with "What-If" Projections
          </h2>
          <p className="font-sans text-sm text-slate-400">
            How can manufacturers model operational improvements before implementing them? Select a critical production query on the left to immediately trace estimated cost savings, ROI rate, capacity increases, and project process risk levels using our lightweight digital twins.
          </p>
        </div>
        <InteractiveDigitalTwin />
      </section>

      {/* 11. STRENGTHEN THE COMPETITIVE POSITION: Matrix Comparison (ERP, MES, BI, Consultants, Spreadsheets, Inshira) */}
      <section id="competitive-matrix" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest block font-bold">
            System Complementarity Matrix
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Strengthening Your Existing Stack
          </h2>
          <p className="font-sans text-sm text-slate-400">
            We do not replace your ERP, MES, or manual logs. Inshira creates a dynamic operational intelligence layer that integrates with your active architecture to extract hidden values.
          </p>
        </div>

        {/* Matrix Grid */}
        <div className="bg-slate-950 border border-white/5 rounded-2xl overflow-x-auto shadow-2xl">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/5 font-mono text-[12px] text-slate-400 uppercase tracking-wider bg-white/[0.01]">
                <th className="p-4 sm:p-5 font-semibold">Solution Vector</th>
                <th className="p-4 sm:p-5 font-semibold">Standard Role</th>
                <th className="p-4 sm:p-5 font-semibold">Where It Falls Short on High-Mix OEE</th>
                <th className="p-4 sm:p-5 font-semibold text-teal-400">How Inshira Complements (The Overlay Layer)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-sans text-xs sm:text-sm text-slate-300">
              <tr>
                <td className="p-4 sm:p-5 font-bold text-white font-display">ERP Reporting</td>
                <td className="p-4 sm:p-5">Financial, inventory tracking & standard material cost sheets.</td>
                <td className="p-4 sm:p-5 text-slate-400">Lacks granularity. Updates hourly or daily, completely ignoring real-time shop-floor micro-losses and changeover variances.</td>
                <td className="p-4 sm:p-5 text-teal-400 font-medium">Extracts baseline routing times to cross-correlate actual shift durations against standard cost matrices.</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-white font-display">MES Reporting</td>
                <td className="p-4 sm:p-5">Production execution tracking, and direct machine PLC links.</td>
                <td className="p-4 sm:p-5 text-slate-400">Extremely rigid. Massive integration costs make it too hard to model dynamic scenario shifts or adjust custom workflows.</td>
                <td className="p-4 sm:p-5 text-teal-400 font-medium font-semibold">Acts as a non-disruptive analytical overlay, reading standard logs without needing line PLC code rewrites.</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-white font-display">Traditional BI Dashboards</td>
                <td className="p-4 sm:p-5">Retrospective historical reporting and spreadsheet chart compilation.</td>
                <td className="p-4 sm:p-5 text-slate-400">Shows you OEE was low yesterday, but fails to isolate why or guide shift supervisors on how to adjust parameters today.</td>
                <td className="p-4 sm:p-5 text-teal-400 font-medium">Delivers real-time proactive decision support with built-in scenario twins rather than raw static plots.</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-white font-display">Generic Manufacturing AI</td>
                <td className="p-4 sm:p-5">Predictive component failures using high-end sensor suites.</td>
                <td className="p-4 sm:p-5 text-slate-400">Demands £50,000+ in fresh physical sensor hardware, rendering high-mix low-volume lines cost-prohibitive.</td>
                <td className="p-4 sm:p-5 text-teal-400 font-medium">Calibrates causal software models using legacy machine log history. No hardware required.</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-white font-display">Spreadsheet Analysis</td>
                <td className="p-4 sm:p-5">Operator log compilation, scrap recording & handovers.</td>
                <td className="p-4 sm:p-5 text-slate-400">Prone to human error. Consumes valuable engineering and administrator hours manually compiling sheets post-shift.</td>
                <td className="p-4 sm:p-5 text-teal-400 font-medium">Automatically ingests raw csv/xlsx files, parsing and cleaning data into structured bottleneck lists.</td>
              </tr>
              <tr>
                <td className="p-4 sm:p-5 font-bold text-white font-display">Consultancy-Only Approaches</td>
                <td className="p-4 sm:p-5">Temporary Six-Sigma audits, process mapping & manual reviews.</td>
                <td className="p-4 sm:p-5 text-slate-400">Temporary impact. Audits capture a snapshot in time; behavior regresses to old patterns once auditors exit.</td>
                <td className="p-4 sm:p-5 text-teal-400 font-medium">Establishes a permanent, digital continuous improvement cycle that monitors signal behavior daily.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 11.5 FUTURE PRODUCTS & PIPELINE SHOWCASE */}
      <section id="future-pipeline-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FuturePipeline />
      </section>

      {/* 12. SECURE ROI AUDIT CALCULATOR */}
      <section id="roi-calculator-showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest block font-bold">
            Data-Backed Recovery Potential
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Calculate Your Recoverable Losses
          </h2>
          <p className="font-sans text-sm text-slate-400">
            How can manufacturers reduce operational waste? Input your plant parameters below to isolate estimated annual cost savings and OEE recovery.
          </p>
        </div>
        <RoiCalculator />
      </section>

      {/* 13. CREDIBILITY — verifiable signals only.
          This section previously carried two invented testimonials attributed
          to named people at named companies. Both were removed. Everything
          below is checkable: the papers have DOIs, the credentials are real,
          and the programmes are ones Inshira has actually been through. */}
      <section id="credibility-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900/40 rounded-3xl border border-white/5 p-8 sm:p-12 space-y-8 relative overflow-hidden">

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-400" />
              <span className="font-mono text-xs font-bold text-teal-400 uppercase tracking-wider">
                Where our methods come from
              </span>
            </div>
            <p className="font-sans text-[13px] sm:text-sm text-slate-400 leading-relaxed max-w-3xl">
              Inshira is an early-stage company, so we would rather show you our working than quote testimonials. The diagnostics are built on published, peer-reviewed engineering research. Every paper below is linked to its DOI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://doi.org/10.1016/j.jclepro.2025.146731"
              target="_blank"
              rel="noopener"
              className="group bg-slate-950/60 rounded-xl border border-slate-850 p-5 space-y-2 hover:border-teal-500/40 transition-colors"
            >
              <span className="font-mono text-[12px] text-teal-400 uppercase tracking-wider block">Circular manufacturing</span>
              <span className="font-display text-[13px] font-bold text-white block leading-snug group-hover:text-teal-400 transition-colors">
                SHIF Framework for heat sink development
              </span>
              <span className="font-sans text-[12px] text-slate-500 block">Journal of Cleaner Production, 2025</span>
            </a>

            <a
              href="https://doi.org/10.1016/j.ijheatmasstransfer.2024.126581"
              target="_blank"
              rel="noopener"
              className="group bg-slate-950/60 rounded-xl border border-slate-850 p-5 space-y-2 hover:border-teal-500/40 transition-colors"
            >
              <span className="font-mono text-[12px] text-teal-400 uppercase tracking-wider block">Machine learning</span>
              <span className="font-display text-[13px] font-bold text-white block leading-snug group-hover:text-teal-400 transition-colors">
                Agile manufacturing and ML for heat transfer
              </span>
              <span className="font-sans text-[12px] text-slate-500 block">Int. Journal of Heat and Mass Transfer, 2024</span>
            </a>

            <a
              href="https://doi.org/10.1007/s43069-021-00102-y"
              target="_blank"
              rel="noopener"
              className="group bg-slate-950/60 rounded-xl border border-slate-850 p-5 space-y-2 hover:border-teal-500/40 transition-colors"
            >
              <span className="font-mono text-[12px] text-teal-400 uppercase tracking-wider block">Process optimisation</span>
              <span className="font-display text-[13px] font-bold text-white block leading-snug group-hover:text-teal-400 transition-colors">
                Sensor production via TQM, TPM and ML
              </span>
              <span className="font-sans text-[12px] text-slate-500 block">Operations Research Forum, 2021</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-slate-850">
            <div className="pt-6 space-y-2">
              <span className="font-mono text-[12px] text-slate-500 uppercase tracking-widest block">Who builds it</span>
              <p className="font-sans text-[13px] text-slate-300 leading-relaxed">
                Founded by <strong className="font-semibold text-white">Dr. Mohammad Harris</strong> (PhD, MRes, BEng Hons, FHEA, MIET), advised by Professor Hongwei Wu (FIMechE, FRAeS, FEI) of the University of Hertfordshire, Puja Hazlehurst (FIMechE, CEng) and Dr. Saed Hussain.
              </p>
            </div>
            <div className="pt-6 space-y-2">
              <span className="font-mono text-[12px] text-slate-500 uppercase tracking-widest block">Backing and programmes</span>
              <p className="font-sans text-[13px] text-slate-300 leading-relaxed">
                Supported through University of Hertfordshire research, NatWest and Barclays Eagle Labs accelerators, MSDUK, Sustainable Ventures and Carbon13. Inshira Technologies Ltd is registered in England &amp; Wales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 14. FINAL ACTIONABLE CALL TO ACTION */}
      <section id="final-cta-section" className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <span className="font-mono text-xs font-bold text-teal-400 bg-teal-500/10 px-3.5 py-1.5 rounded-full border border-teal-500/20 uppercase tracking-widest inline-block font-bold">
          Operational Diagnosis
        </span>
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight leading-none">
          Recover Overlooked Plant Capacity
        </h2>
        <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
          Unshackle the productive potential of your existing shop-floor resources. Request a complimentary offline log evaluation with our engineering team to map your factory's hidden bottlenecks.
        </p>
        <button
          onClick={() => handleNav('contact')}
          className="px-8 py-4 bg-teal-500 hover:bg-[#33daff] text-slate-950 font-sans text-xs sm:text-sm font-bold tracking-wide transition-all shadow-lg rounded-xl hover:scale-[1.02]"
        >
          Schedule Engineering Diagnostic Call
        </button>
      </section>

    </div>
  );
}
