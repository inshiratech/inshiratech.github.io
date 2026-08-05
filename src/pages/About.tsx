import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  Award,
  BookOpen,
  CheckCircle2,
  Cpu,
  Database,
  Layers,
  Sparkles,
  TrendingUp,
  Zap,
  ArrowRight,
  Shield,
  HelpCircle,
  Eye,
  Compass,
  GitMerge,
  Server,
  Users,
  Layers3,
  Minimize2,
  Maximize2,
  AlertTriangle,
  Flame,
  LineChart,
  Lightbulb,
  HeartHandshake,
  Check,
  Expand,
  ArrowUpRight,
  Workflow
} from 'lucide-react';

interface ValueCard {
  title: string;
  description: string;
  detail: string;
  icon: React.ComponentType<any>;
  metric: string;
  color: string;
}

interface TeamMember {
  name: string;
  role: string;
  tagline: string;
  experience: string;
  passion: string;
  story: string;
  icon: React.ComponentType<any>;
  gradColor: string;
  /* Photo path under /assets — files already exist in the repo and were used
     on the previous site. */
  photo?: string;
  group: 'Core Leadership' | 'Operations & Growth' | 'Advisory Board';
}

export default function AboutPage() {
  const [activeStoryChapter, setActiveStoryChapter] = useState<number>(0);
  const [selectedNameNode, setSelectedNameNode] = useState<string>('understanding');
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState<number | null>(null);
  const [telemetryTicks, setTelemetryTicks] = useState<number>(0);

  // Periodic visual feedback ticks
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryTicks((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const storyChapters = [
    {
      title: 'The Inspiration',
      subtitle: 'Born from Real Mechanical Friction',
      text: 'The inspiration for Inshira did not come from wanting to build another venture-backed AI startup. It came from repeatedly seeing manufacturers struggle to make confident, profitable operational decisions despite generating massive streams of sensor telemetry and spreadsheet logs.',
      subtext: 'We spent years in cold, high-mix plants watching supervisors manually compile post-shift reports, only to find the critical losses had already occurred hours prior. The data existed, but it was invisible to the people who needed it most.'
    },
    {
      title: 'The Invisible Data Paradox',
      subtitle: 'They Already Have the Information',
      text: 'Most manufacturers do not need to purchase expensive new IoT sensors or initiate multi-year ERP migrations to achieve operational excellence. They already have the information they need inside unlinked CSVs, PLC registers, and local work order databases.',
      subtext: 'The problem is synthesis. Raw, siloed files cannot speak to each other. When a material grade changes, a temperature fluctuation downstream is rarely cross-referenced with upstream tension slacks. They simply cannot see what their files are telling them.'
    },
    {
      title: 'The Traditional Software Gap',
      subtitle: 'What Happened vs Why It Happened',
      text: 'Traditional business intelligence and MES software reports what happened in the past through static, historical OEE charts. However, they rarely explain WHY it happened, what should happen next, or what financial impact a calibration decision will have before it is executed.',
      subtext: 'This gap separates static dashboards from real-time decision intelligence. It is the core friction that prevents shift supervisors from calibrating machines dynamically to pre-empt scrap cycles.'
    },
    {
      title: 'Why Inshira Exists',
      subtitle: 'Practical, Explainable Floor Intelligence',
      text: 'This exact gap inspired the creation of Inshira. We built a category-defining software overlay that digests raw event logs and automatically translates them into localized, trusted calibration recommendations.',
      subtext: 'We exist to make operational intelligence practical, explainable, and highly valuable for manufacturers of every size—protecting their margins and driving continuous OEE gains without hardware overhead.'
    }
  ];

  const nameNodes = {
    understanding: {
      title: 'Expanding Understanding',
      definition: 'Translating abstract PLC micro-currents and fragmented ERP batches into a unified, high-fidelity timeline.',
      visualText: 'Siloed Logs → Actionable Causal Graph',
      impact: 'Eliminates unlogged micro-stoppages by matching actual runs directly against design constraints.'
    },
    possibilities: {
      title: 'Expanding Possibilities',
      definition: 'Opening access to continuous improvement strategies that were previously restricted to massive multinational conglomerates.',
      visualText: 'Zero-Hardware Overlay Technology',
      impact: 'Enables high-mix mid-market manufacturers to confidently bid on and secure high-margin commercial batches.'
    },
    potential: {
      title: 'Expanding Operational Potential',
      definition: 'Helping plants extract 8-12% higher OEE capacity from existing machinery assets without physical replacement.',
      visualText: 'Asset Extension & Thermal Tuning',
      impact: 'Translates thermal stability recommendations into instant waste and scrap prevention.'
    },
    human: {
      title: 'Expanding Human Capability',
      definition: 'Supporting operators with explainable artificial intelligence that honors and preserves floor tribal knowledge.',
      visualText: 'Operator-in-the-Loop Collaboration',
      impact: 'Provides trusted, localized step-by-step instructions that align engineer expertise with digital insights.'
    }
  };

  const coreValues: ValueCard[] = [
    {
      title: 'Engineering First',
      description: 'We solve physical operational problems before technology problems.',
      detail: 'Our codebase respects thermodynamics, mechanical boundaries, and raw physics. We are not interested in cosmetic analytics; we construct robust mathematical models of your actual plant floor behavior.',
      icon: Cpu,
      metric: 'Physics-Based',
      color: 'teal'
    },
    {
      title: 'Practical Intelligence',
      description: 'Insights only matter when they lead to immediate, measurable floor action.',
      detail: 'If a recommendation cannot be actioned by a shift supervisor within 10 minutes to recover OEE, it does not belong in our platform. We eliminate dashboard noise in favor of specific setpoint instructions.',
      icon: Sparkles,
      metric: '10-Min Actionable',
      color: 'amber'
    },
    {
      title: 'Human-Centred AI',
      description: 'AI should support engineers and operators rather than replace them.',
      detail: 'True continuous improvement is driven by a collaboration between veteran human expertise and predictive models. We build "operator-in-the-loop" sync controls that calibrate to tribal knowledge.',
      icon: Users,
      metric: 'Co-Pilot Sync',
      color: 'indigo'
    },
    {
      title: 'Operational Excellence',
      description: 'Continuous improvement should become an effortless, daily habit.',
      detail: 'By auto-generating causal diagnostics and financial exposure metrics, we transform OEE review from a retroactive post-mortem into a real-time, high-priority calibration routine.',
      icon: TrendingUp,
      metric: '+12.4% OEE Mean',
      color: 'emerald'
    },
    {
      title: 'Trust Through Transparency',
      description: 'Every recommendation must be understandable, explainable, and verifiable.',
      detail: 'No black-boxes. When Inshira recommends modifying a cool-down ramp cycle, we deconstruct the exact causal chain—explaining the signal isolation and material parameters that triggered it.',
      icon: Shield,
      metric: '100% Explainable',
      color: 'cyan'
    },
    {
      title: 'Long-Term Partnership',
      description: 'We measure our success solely by the long-term OEE stability of our plants.',
      detail: 'We do not sell software and walk away. We partner closely with plant management teams, engineering leads, and continuous improvement directors to ensure permanent margin protection.',
      icon: HeartHandshake,
      metric: 'Permanent Support',
      color: 'rose'
    },
    {
      title: 'Innovation with Purpose',
      description: 'Technology exists exclusively to resolve genuine industrial bottlenecks.',
      detail: 'We refuse to over-engineer. Every data pipeline, parser, and neural causal model we construct is built to directly reduce physical scrap, thermal lag, changeover stalls, or energy surge peaks.',
      icon: Lightbulb,
      metric: 'Zero-Waste Code',
      color: 'teal'
    }
  ];

  /* ==========================================================================
     REAL TEAM — ported from the previous inshira.co.uk People section.
     The AI Studio draft shipped four invented people (Tariq Al-Shira, Sarah
     Jenkins, Marcus Vance, Elena Rostova). Those have been removed and replaced
     with the actual team and advisory board, including their real photos which
     already exist in /assets.
     ========================================================================== */
  const teamMembers: TeamMember[] = [
    {
      name: 'Dr. Mohammad Harris',
      role: 'Founder & Managing Director',
      tagline: 'Sustainable manufacturing, AI, and engineering leadership.',
      experience: 'PhD, MRes, BEng (Hons), FHEA, MIET. Published across circular manufacturing, agile manufacturing, and machine learning for thermal and production systems.',
      passion: 'Making stage-level loss diagnostics accessible to manufacturers without enterprise budgets.',
      story: 'Inshira grew out of peer-reviewed research into circular manufacturing and machine learning for production systems, applied to the SMEs that rarely get access to it.',
      icon: Cpu,
      gradColor: 'from-teal-500/10 to-blue-500/5',
      photo: '/assets/FLARE 2026 051.JPG',
      group: 'Core Leadership'
    },
    {
      name: 'Fatema Tuj Jahura',
      role: 'Executive Assistant & Operations Support',
      tagline: 'Supports operations, coordination, and execution.',
      experience: 'MSc, BSc. Coordinates day-to-day operations and delivery across the business.',
      passion: 'Keeping delivery organised so engineering work reaches manufacturers on time.',
      story: 'Holds the operational thread across projects, partners, and programmes.',
      icon: Workflow,
      gradColor: 'from-amber-500/10 to-orange-500/5',
      photo: '/assets/fatema.jpeg',
      group: 'Operations & Growth'
    },
    {
      name: 'Van Nguyen',
      role: 'Market Development Lead (Vietnam)',
      tagline: 'Leads market development and manufacturer engagement.',
      experience: 'MSc, BSc. Builds manufacturer relationships and market presence across Vietnam and the wider region.',
      passion: 'Bringing loss diagnostics to fast-growing manufacturing bases in South East Asia.',
      story: 'Connects Inshira’s diagnostics work to manufacturers operating in high-growth export markets.',
      icon: Database,
      gradColor: 'from-emerald-500/10 to-teal-500/5',
      photo: '/assets/van.jpeg',
      group: 'Operations & Growth'
    },
    {
      name: 'Professor Hongwei Wu',
      role: 'University of Hertfordshire',
      tagline: 'Advises on sustainable manufacturing and energy systems.',
      experience: 'FIMechE, FRAeS, FEI. Research leadership in thermal engineering, energy systems, and sustainable manufacturing.',
      passion: 'Grounding industrial software in validated engineering science.',
      story: 'Co-author on the SHIF Framework work underpinning Inshira’s approach to circular manufacturing.',
      icon: Shield,
      gradColor: 'from-indigo-500/10 to-cyan-500/5',
      photo: '/assets/hwu.jpg',
      group: 'Advisory Board'
    },
    {
      name: 'Puja Hazlehurst',
      role: 'Ex-Caeli Nova & Rolls-Royce',
      tagline: 'Advises on product engineering and scale.',
      experience: 'FIMechE, CEng, MEng. Product engineering leadership across aerospace and advanced manufacturing.',
      passion: 'Turning engineering prototypes into products that scale.',
      story: 'Advises on productisation and the engineering discipline needed to scale reliably.',
      icon: Workflow,
      gradColor: 'from-rose-500/10 to-orange-500/5',
      photo: '/assets/Puja.jpg',
      group: 'Advisory Board'
    },
    {
      name: 'Dr. Saed Hussain',
      role: 'Sage AI, Ex-Thales & BAE',
      tagline: 'Advises on AI and optimisation.',
      experience: 'PhD, BEng (Hons). Applied AI and optimisation across defence, aerospace, and enterprise software.',
      passion: 'Optimisation methods that hold up against messy real-world industrial data.',
      story: 'Advises on the causal and optimisation methods behind Inshira’s diagnostics.',
      icon: Cpu,
      gradColor: 'from-violet-500/10 to-blue-500/5',
      photo: '/assets/saed.jpeg',
      group: 'Advisory Board'
    }
  ];

  /* ==========================================================================
     PEER-REVIEWED RESEARCH — ported from the previous site's Research section.
     These DOI links carry real SEO value and external authority; they were
     absent from the AI Studio draft.
     ========================================================================== */
  const publications = [
    {
      title: 'SHIF Framework — Circular Manufacturing in Heat Sink Development',
      citation: 'Harris & Wu, Journal of Cleaner Production, 2025',
      doi: 'https://doi.org/10.1016/j.jclepro.2025.146731'
    },
    {
      title: 'Agile manufacturing and machine learning for heat transfer',
      citation: 'Harris, Babar & Wu, International Journal of Heat and Mass Transfer, 2024',
      doi: 'https://doi.org/10.1016/j.ijheatmasstransfer.2024.126581'
    },
    {
      title: 'Design for manufacturing, numerical simulation, and machine learning',
      citation: 'Harris, Wu et al., Thermal Science and Engineering Progress, 2024',
      doi: 'https://doi.org/10.1016/j.tsep.2024.102606'
    },
    {
      title: 'Engine Mass Airflow Sensor Production via TQM, TPM, and Machine Learning',
      citation: 'Harris, Operations Research Forum, 2021',
      doi: 'https://doi.org/10.1007/s43069-021-00102-y'
    },
    {
      title: 'Integration of Industry 4.0 and IoT in the Automotive Sectors',
      citation: 'Harris, Ndiaye & Farrell, SAE Technical Paper, 2020',
      doi: 'https://doi.org/10.4271/2020-01-5079'
    }
  ];

  return (
    <div id="about-premium-story-page" className="space-y-24 pt-8 pb-20 relative overflow-hidden">
      
      {/* Living Animated Background Grid Environment */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[450px] h-[450px] bg-teal-500/5 rounded-full blur-[140px] animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] right-[5%] w-[550px] h-[550px] bg-indigo-500/5 rounded-full blur-[160px]"></div>
      </div>

      {/* Cinematic Hero Header */}
      <section id="about-hero" className="max-w-7xl mx-auto px-4 text-center space-y-6 relative z-10 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 font-mono text-[12px] uppercase tracking-widest block mx-auto font-bold"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Identity & Purpose</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto uppercase leading-tight"
        >
          AN ENGINEERING COMPANY <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-indigo-400 to-teal-300">
            DEDICATED TO EXCELLENCE
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-sans text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          We build software overlays that expand physical manufacturing capabilities. We measure our existence not in startup cycles, but in the long-term productivity and margin resilience of the factories powering our world.
        </motion.p>
      </section>

      {/* Chapter 1: Interactive Storytelling (Scrolling / Transforming Chapter Selection) */}
      <section id="about-storytelling-chapters" className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center sm:text-left mb-10 space-y-2">
          <span className="font-mono text-[12px] text-teal-400 uppercase tracking-widest block font-bold">
            Chapter I
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider">
            Our Story: Born from Floor Friction
          </h2>
          <p className="font-sans text-xs text-slate-400 max-w-2xl">
            Click through our operational timeline to trace how solving physical challenges led to the creation of Inshira.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Timeline Nav Column */}
          <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
            {storyChapters.map((chap, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStoryChapter(idx)}
                className={`p-4 rounded-xl border text-left transition-all ${
                  activeStoryChapter === idx
                    ? 'bg-gradient-to-r from-teal-950/20 to-indigo-950/20 border-teal-500/40 text-white shadow-xl shadow-teal-500/5'
                    : 'bg-[#0b0b0b]/40 border-white/5 text-slate-500 hover:border-white/10 hover:text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                    activeStoryChapter === idx ? 'bg-teal-500 text-slate-950' : 'bg-white/5 text-slate-400'
                  }`}>
                    0{idx + 1}
                  </span>
                  <span className="font-display text-xs font-bold uppercase tracking-wider">
                    {chap.title}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Detailed Narrative Stage */}
          <div className="lg:col-span-8 flex flex-col justify-between p-6 sm:p-10 bg-[#080808]/90 border border-white/5 rounded-2xl relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-teal-500/5 rounded-full blur-[90px] pointer-events-none"></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStoryChapter}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 relative z-10"
              >
                <span className="font-mono text-[12px] text-teal-400 uppercase tracking-widest block font-bold">
                  {storyChapters[activeStoryChapter].subtitle}
                </span>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
                  {storyChapters[activeStoryChapter].title}
                </h3>

                <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed font-semibold">
                  {storyChapters[activeStoryChapter].text}
                </p>

                <p className="font-sans text-xs text-slate-400 leading-relaxed">
                  {storyChapters[activeStoryChapter].subtext}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Interactive Progress Line */}
            <div className="border-t border-white/5 pt-6 mt-8 flex items-center justify-between text-[12px] font-mono text-slate-500 relative z-10">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
                <span>Active Reading Step: Chapter 0{activeStoryChapter + 1} of 04</span>
              </div>
              <button 
                onClick={() => setActiveStoryChapter((prev) => (prev + 1) % 4)}
                className="flex items-center gap-1.5 text-teal-400 hover:text-teal-300 font-bold uppercase"
              >
                Next Chapter
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Chapter 2: The Meaning Behind Our Name (MEMORABLE MOMENT) */}
      <section id="about-name-expansion" className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="bg-slate-950 border border-slate-900 rounded-3xl p-6 sm:p-12 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-500/20 to-transparent"></div>
          
          {/* Expansion Description Block */}
          <div className="lg:col-span-5 space-y-6 relative z-10">
            <div className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              <span className="font-mono text-[12px] text-teal-400 font-bold uppercase tracking-widest">
                The Origin Story
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white uppercase tracking-tight leading-tight">
              THE MEANING BEHIND OUR NAME
            </h2>

            <p className="font-sans text-sm text-slate-300 leading-relaxed">
              <strong>"Inshira"</strong> is inspired by the Arabic word for expansion. It represents expanding possibilities, expanding understanding, expanding operational potential, and expanding human capability through technology.
            </p>

            <p className="font-sans text-xs text-slate-400 leading-relaxed">
              At Inshira, expansion is defined by our core operational journey: progressing factories from raw <strong>Operational Visibility</strong> and deep <strong>Operational Intelligence</strong>, through sequential <strong>Stage-by-Stage Process Optimisation</strong> and <strong>Continuous Improvement</strong>, to achieve ultimate <strong>Operational Excellence</strong> and fully <strong>Sustainable Manufacturing</strong>.
            </p>

            {/* Selector Node Description Panel */}
            <div className="p-4 bg-[#0d0d0d] border border-white/5 rounded-xl space-y-2">
              <span className="font-mono text-[12px] text-teal-400 font-bold uppercase block tracking-wider">
                {nameNodes[selectedNameNode as keyof typeof nameNodes].title}
              </span>
              <p className="font-sans text-xs text-slate-300 leading-relaxed">
                {nameNodes[selectedNameNode as keyof typeof nameNodes].definition}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[12px] font-mono text-slate-500">
                <span>System Manifest: {nameNodes[selectedNameNode as keyof typeof nameNodes].visualText}</span>
              </div>
            </div>
          </div>

          {/* Interactive Core Graphic (Memory Moment) */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 bg-slate-900/40 rounded-2xl border border-white/5 relative overflow-hidden min-h-[380px]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
              
              {/* Dynamic SVG Connection Lines linking central node to orbital buttons */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {/* Connector Top-Left */}
                <line 
                  x1="50%" y1="50%" x2="20%" y2="20%" 
                  stroke={selectedNameNode === 'understanding' ? '#00d1ff' : 'rgba(255,255,255,0.06)'} 
                  strokeWidth="2" 
                  className={selectedNameNode === 'understanding' ? 'animate-flow-dash' : ''}
                  style={{ strokeDasharray: '6 6' }}
                />
                {/* Connector Top-Right */}
                <line 
                  x1="50%" y1="50%" x2="80%" y2="20%" 
                  stroke={selectedNameNode === 'possibilities' ? '#00d1ff' : 'rgba(255,255,255,0.06)'} 
                  strokeWidth="2" 
                  className={selectedNameNode === 'possibilities' ? 'animate-flow-dash' : ''}
                  style={{ strokeDasharray: '6 6' }}
                />
                {/* Connector Bottom-Left */}
                <line 
                  x1="50%" y1="50%" x2="20%" y2="80%" 
                  stroke={selectedNameNode === 'potential' ? '#00d1ff' : 'rgba(255,255,255,0.06)'} 
                  strokeWidth="2" 
                  className={selectedNameNode === 'potential' ? 'animate-flow-dash' : ''}
                  style={{ strokeDasharray: '6 6' }}
                />
                {/* Connector Bottom-Right */}
                <line 
                  x1="50%" y1="50%" x2="80%" y2="80%" 
                  stroke={selectedNameNode === 'human' ? '#00d1ff' : 'rgba(255,255,255,0.06)'} 
                  strokeWidth="2" 
                  className={selectedNameNode === 'human' ? 'animate-flow-dash' : ''}
                  style={{ strokeDasharray: '6 6' }}
                />
                
                {/* Pulsing Outer Orbit Ring */}
                <circle cx="50%" cy="50%" r="42%" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1.5" />
              </svg>

              {/* Central Glowing Core Button (INSHIRA) */}
              <div className="absolute z-10 w-24 h-24 rounded-full bg-[#070707] border-2 border-teal-500/50 flex flex-col items-center justify-center text-center shadow-2xl shadow-teal-500/10">
                <span className="font-mono text-[12px] text-teal-400 font-bold tracking-widest block leading-none">CORE</span>
                <span className="font-display text-xs font-black text-white block mt-1 uppercase tracking-widest">INSHIRA</span>
                <span className="font-mono text-[12px] text-slate-500 block leading-none mt-1 animate-pulse">EXPANSION</span>
              </div>

              {/* Orbital Button 1: TOP-LEFT (Understanding / Data) */}
              <button
                onClick={() => setSelectedNameNode('understanding')}
                className={`absolute top-4 left-4 z-20 w-16 h-16 rounded-full flex flex-col items-center justify-center border transition-all select-none ${
                  selectedNameNode === 'understanding'
                    ? 'bg-teal-500/20 border-teal-400 text-teal-300 scale-110 shadow-lg shadow-teal-500/10'
                    : 'bg-[#080808]/90 border-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                <Database className="w-5 h-5 stroke-[1.5]" />
                <span className="font-mono text-[12px] mt-1 font-semibold uppercase tracking-wider">DATA</span>
              </button>

              {/* Orbital Button 2: TOP-RIGHT (Possibilities / Engineering) */}
              <button
                onClick={() => setSelectedNameNode('possibilities')}
                className={`absolute top-4 right-4 z-20 w-16 h-16 rounded-full flex flex-col items-center justify-center border transition-all select-none ${
                  selectedNameNode === 'possibilities'
                    ? 'bg-teal-500/20 border-teal-400 text-teal-300 scale-110 shadow-lg shadow-teal-500/10'
                    : 'bg-[#080808]/90 border-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                <Cpu className="w-5 h-5 stroke-[1.5]" />
                <span className="font-mono text-[12px] mt-1 font-semibold uppercase tracking-wider">ENGINEERING</span>
              </button>

              {/* Orbital Button 3: BOTTOM-LEFT (Potential / CI) */}
              <button
                onClick={() => setSelectedNameNode('potential')}
                className={`absolute bottom-4 left-4 z-20 w-16 h-16 rounded-full flex flex-col items-center justify-center border transition-all select-none ${
                  selectedNameNode === 'potential'
                    ? 'bg-teal-500/20 border-teal-400 text-teal-300 scale-110 shadow-lg shadow-teal-500/10'
                    : 'bg-[#080808]/90 border-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                <TrendingUp className="w-5 h-5 stroke-[1.5]" />
                <span className="font-mono text-[12px] mt-1 font-semibold uppercase tracking-wider">POTENTIAL</span>
              </button>

              {/* Orbital Button 4: BOTTOM-RIGHT (Human / People) */}
              <button
                onClick={() => setSelectedNameNode('human')}
                className={`absolute bottom-4 right-4 z-20 w-16 h-16 rounded-full flex flex-col items-center justify-center border transition-all select-none ${
                  selectedNameNode === 'human'
                    ? 'bg-teal-500/20 border-teal-400 text-teal-300 scale-110 shadow-lg shadow-teal-500/10'
                    : 'bg-[#080808]/90 border-white/5 text-slate-400 hover:border-white/20'
                }`}
              >
                <Users className="w-5 h-5 stroke-[1.5]" />
                <span className="font-mono text-[12px] mt-1 font-semibold uppercase tracking-wider">PEOPLE</span>
              </button>

            </div>

            {/* Simulated Live Connection Stats */}
            <div className="mt-4 p-3.5 bg-black/60 rounded-xl border border-white/5 font-mono text-[12px] text-slate-400 flex items-center justify-between gap-4 w-full max-w-sm">
              <span className="text-teal-400 font-semibold uppercase">Selected Node: {selectedNameNode}</span>
              <span className="text-white">CO-ORDINATION FEED: nominal</span>
            </div>
          </div>

        </div>
      </section>

      {/* Chapter 3: Mission and Vision Visually Styled */}
      <section id="about-mission-vision" className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Mission Card */}
          <div 
            onMouseMove={handleMouseMove}
            className="glow-card rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/5 rounded-full blur-[90px] pointer-events-none"></div>

            <div className="space-y-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                <Compass className="w-6 h-6 stroke-[1.5]" />
              </div>
              
              <span className="font-mono text-xs font-bold text-teal-400 uppercase tracking-widest block">
                Our Mission
              </span>
              
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase leading-tight">
                PRACTICAL, EXPLAINABLE <br />INDUSTRIAL INTELLIGENCE
              </h3>

              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed font-semibold">
                To help manufacturers make better operational decisions through practical, explainable operational intelligence that improves productivity, reduces waste, and supports sustainable industrial growth.
              </p>
            </div>

            <div className="border-t border-white/5 pt-6 mt-8 flex items-center justify-between text-[12px] font-mono text-slate-500 relative z-10">
              <span>Primary Execution Goal</span>
              <span className="text-teal-400">Direct Margins Protection</span>
            </div>
          </div>

          {/* Vision Card */}
          <div 
            onMouseMove={handleMouseMove}
            className="glow-card rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-[90px] pointer-events-none"></div>

            <div className="space-y-6 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Eye className="w-6 h-6 stroke-[1.5]" />
              </div>
              
              <span className="font-mono text-xs font-bold text-indigo-400 uppercase tracking-widest block">
                Our Vision
              </span>
              
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase leading-tight">
                THE GLOBAL OPERATIONAL <br />INTELLIGENCE LAYER
              </h3>

              <p className="font-sans text-sm sm:text-base text-slate-300 leading-relaxed font-semibold">
                To become the operational intelligence layer powering the world's manufacturers. A future where every operational decision is informed by engineering expertise, trusted data, and responsible artificial intelligence.
              </p>
            </div>

            <div className="border-t border-white/5 pt-6 mt-8 flex items-center justify-between text-[12px] font-mono text-slate-500 relative z-10">
              <span>Strategic Milestone 2030</span>
              <span className="text-indigo-400">Autonomous Decision Sync</span>
            </div>
          </div>

        </div>
      </section>

      {/* Chapter 4: Core Values Grid with Mouse-Follow Lighting */}
      <section id="about-values" className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center sm:text-left mb-10 space-y-2">
          <span className="font-mono text-[12px] text-teal-400 uppercase tracking-widest block font-bold">
            Chapter II
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider">
            Our Core Operational Values
          </h2>
          <p className="font-sans text-xs text-slate-400 max-w-2xl">
            Move your cursor across each value to reveal the lighting spotlight effect. Our core operational philosophies define how we execute code and handle floor telemetry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreValues.map((value, idx) => {
            const IconComponent = value.icon;
            return (
              <div
                key={idx}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setHoveredValue(idx)}
                onMouseLeave={() => setHoveredValue(null)}
                className="glow-card rounded-2xl p-6 flex flex-col justify-between min-h-[250px] cursor-default relative overflow-hidden"
              >
                <div className="space-y-4 relative z-10">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/15 flex items-center justify-center text-teal-400">
                      <IconComponent className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <span className="font-mono text-[12px] bg-white/5 text-slate-400 px-2 py-0.5 rounded border border-white/5">
                      {value.metric}
                    </span>
                  </div>

                  <div>
                    <h4 className="font-display text-sm font-bold text-white uppercase tracking-wide">
                      {value.title}
                    </h4>
                    <p className="font-sans text-xs text-slate-300 mt-1 leading-relaxed font-semibold">
                      {value.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 mt-4 relative z-10">
                  <p className="font-sans text-[13px] text-slate-400 leading-relaxed">
                    {value.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Chapter 5: Meet the Team (Reused & Enhanced from inshira.co.uk) */}
      <section id="about-team-roster" className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center sm:text-left mb-10 space-y-2">
          <span className="font-mono text-[12px] text-teal-400 uppercase tracking-widest block font-bold">
            Chapter III
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider">
            Minds Behind the Machines
          </h2>
          <p className="font-sans text-xs text-slate-400 max-w-2xl">
            We are veteran control system engineers, continuous improvement consultants, and industrial cloud architects. Click on any profile to view their direct technical passion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, idx) => {
            const MemberIcon = member.icon;
            const isSelected = selectedTeamMember === idx;
            return (
              <div
                key={idx}
                onMouseMove={handleMouseMove}
                onClick={() => setSelectedTeamMember(isSelected ? null : idx)}
                className={`glow-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden cursor-pointer transition-all ${
                  isSelected ? 'border-teal-500/50 bg-slate-900/50 scale-[1.02]' : 'hover:scale-[1.01]'
                }`}
              >
                <div className="space-y-4">
                  
                  {/* Real photo where we have one, icon frame as fallback */}
                  <div className="relative w-14 h-14 rounded-2xl bg-slate-950 border border-white/10 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-15 bg-gradient-to-br from-teal-500 to-indigo-500"></div>
                    <div className="absolute inset-0 opacity-[0.06]"
                      style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={`${member.name}, ${member.role} at Inshira Technologies`}
                        width={56}
                        height={56}
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <MemberIcon className="w-6 h-6 text-teal-400 relative z-10 stroke-[1.5]" />
                    )}
                  </div>

                  <div>
                    <span className="font-mono text-[12px] text-slate-500 uppercase tracking-widest font-bold block mb-1">
                      {member.group}
                    </span>
                    <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider block">
                      {member.name}
                    </h3>
                    <span className="font-mono text-[12px] text-teal-400 uppercase tracking-widest font-bold">
                      {member.role}
                    </span>
                    <p className="font-sans text-[12px] text-slate-300 italic mt-2 leading-snug">
                      "{member.tagline}"
                    </p>
                  </div>

                  <p className="font-sans text-xs text-slate-400 leading-relaxed">
                    {member.experience}
                  </p>

                </div>

                <div className="border-t border-white/5 pt-4 mt-4 space-y-2">
                  <div className="flex items-center justify-between text-[12px] font-mono text-slate-500">
                    <span>{isSelected ? 'Click to collapse' : 'Click to inspect passion'}</span>
                    <ArrowUpRight className={`w-3 h-3 transition-transform ${isSelected ? 'rotate-90 text-teal-400' : ''}`} />
                  </div>

                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-2.5 pt-2 border-t border-white/5"
                      >
                        <div className="p-3 bg-black/60 rounded-xl border border-teal-500/20">
                          <span className="font-mono text-[12px] text-teal-400 font-bold block uppercase tracking-wider mb-1">
                            Battle Passion & Problem
                          </span>
                          <p className="font-sans text-[12px] text-slate-200 font-semibold leading-relaxed">
                            {member.passion}
                          </p>
                        </div>
                        
                        <div className="p-2">
                          <span className="font-mono text-[12px] text-slate-500 font-bold block uppercase tracking-wider mb-0.5">
                            Our Origins
                          </span>
                          <p className="font-sans text-[13px] text-slate-400 leading-normal">
                            {member.story}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* ====================================================================
          RESEARCH — ported from the previous site. These outbound DOI links
          are a genuine authority signal and were missing from the draft.
          ==================================================================== */}
      <section id="about-research" className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center sm:text-left mb-10 space-y-2">
          <span className="font-mono text-[12px] text-teal-400 uppercase tracking-widest block font-bold">
            Evidence Base
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white uppercase tracking-wider">
            Built on Research
          </h2>
          <p className="font-sans text-xs text-slate-400 max-w-2xl">
            Peer-reviewed manufacturing and engineering work underpinning the platform.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {publications.map((paper, idx) => (
            <a
              key={idx}
              href={paper.doi}
              rel="noopener"
              target="_blank"
              className="group glow-card rounded-xl px-5 py-4 flex items-start gap-3 transition-all hover:border-teal-500/40 hover:translate-x-1"
            >
              <ArrowUpRight className="w-4 h-4 text-teal-400 shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <div>
                <span className="font-sans text-[13px] font-semibold text-white group-hover:text-teal-400 transition-colors block leading-snug">
                  {paper.title}
                </span>
                <span className="font-mono text-[12px] text-slate-500 italic block mt-1">
                  {paper.citation}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Chapter 6: Final End with Purpose Close Statement */}
      <section id="about-epic-close" className="max-w-7xl mx-auto px-4 relative z-10 pt-6">
        <div 
          onMouseMove={handleMouseMove}
          className="glow-card rounded-3xl p-8 sm:p-14 lg:p-16 relative overflow-hidden text-center max-w-5xl mx-auto"
        >
          {/* Subtle design gradient border lines */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-teal-500/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"></div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-teal-500/5 rounded-full blur-[110px] pointer-events-none"></div>

          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 font-mono text-[12px] uppercase tracking-widest font-bold block mx-auto">
              <Award className="w-3.5 h-3.5 animate-pulse" />
              <span>Decades of Industrial Alignment</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase max-w-3xl mx-auto leading-tight">
              MANUFACTURING HAS ALWAYS DRIVEN <br />HUMAN PROGRESS
            </h2>

            <p className="font-sans text-sm sm:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed font-semibold">
              Every improvement in productivity, resource efficiency, thermal stability, and operational decision-making creates cumulative benefits that extend far beyond a single factory floor.
            </p>

            <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Inshira exists to help manufacturers unlock those exact opportunities. We combine decades of raw physical engineering experience with secure, responsible, and explainable artificial intelligence—ensuring your floor team remains empowered to achieve more than they thought possible.
            </p>

            {/* Simulated Live Environment Status Panel inside closing card */}
            <div className="p-4 bg-slate-950/60 rounded-2xl border border-white/5 font-mono text-[12px] text-slate-500 max-w-md mx-auto flex justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-slate-300">Continuous OEE Delivery Layer</span>
              </div>
              <span className="text-teal-400 font-bold uppercase tracking-wider">Active compliant OK</span>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-sans text-sm font-extrabold tracking-wide uppercase transition-all shadow-lg shadow-teal-500/15 cursor-pointer"
              >
                Book Plant Audit
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#/platform"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#0b0b0b] hover:bg-[#111] text-slate-300 hover:text-white font-sans text-sm font-semibold border border-white/5 hover:border-white/10 transition-all cursor-pointer"
              >
                Explore Platform Suite
              </a>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
