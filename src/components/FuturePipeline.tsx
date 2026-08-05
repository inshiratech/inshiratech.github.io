import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Recycle,
  Network,
  Cpu,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  Zap,
  CheckCircle2,
  Lock,
  Globe,
  TrendingUp,
  BarChart3,
  Factory,
  ChevronRight,
  ShieldCheck,
  Flame,
  Truck
} from 'lucide-react';

interface FutureProduct {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  releaseEta: string;
  status: string;
  statusColor: string;
  icon: React.ComponentType<any>;
  shortDesc: string;
  fullDesc: string;
  keyCapabilities: string[];
  impactMetric: string;
  impactLabel: string;
  gradient: string;
  borderGlow: string;
}

export default function FuturePipeline() {
  const [selectedProduct, setSelectedProduct] = useState<string>('waste-to-energy');
  const [interestedProduct, setInterestedProduct] = useState<string | null>(null);
  const [emailSubmitted, setEmailSubmitted] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');

  const futureProducts: FutureProduct[] = [
    {
      id: 'waste-to-energy',
      title: 'Waste-to-Energy & Circular Economy Intelligence',
      subtitle: 'Transforming Material Byproducts & Exhaust into Renewable Power',
      category: 'Circular Sustainability',
      releaseEta: 'Q1 2027 Pipeline',
      status: 'Alpha Testing Phase',
      statusColor: 'emerald',
      icon: Recycle,
      shortDesc: 'Analyzes manufacturing scrap streams, thermal heat dissipation, and organic byproducts to compute real-time waste-to-energy conversion ROI.',
      fullDesc: 'Manufacturing waste is an uncaptured energy source. Inshira Waste-to-Energy Intelligence hooks into material disposal logs, furnace exhaust sensors, and thermal recovery loops to quantify the exact kWh and monetary value recoverable from plant byproducts. By applying thermodynamic models to scrap composition, plant managers can justify on-site anaerobic digestion, cogeneration, or biomass heat recovery systems.',
      keyCapabilities: [
        'Real-time Scrap & Byproduct Energy Modeling',
        'Thermal Exhaust & Waste Heat Recovery Tracking',
        'Circular Material Balance & Landfill Diversion Metrics',
        'On-site Cogeneration / Biogas Feasibility Analytics',
        'Scope 1 & Scope 2 Automated ESG Reporting'
      ],
      impactMetric: '32% Avg Recovery',
      impactLabel: 'Thermal & Scrap Energy Recaptured',
      gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
      borderGlow: 'hover:border-emerald-500/40'
    },
    {
      id: 'supply-chain',
      title: 'Supply Chain & Value Stream Intelligence',
      subtitle: 'Connecting Upstream Material Variability with Factory Floor Calibration',
      category: 'Network Optimization',
      releaseEta: 'Q2 2027 Pipeline',
      status: 'Data Architecture Integration',
      statusColor: 'indigo',
      icon: Network,
      shortDesc: 'Correlates raw material batch variations and supplier lead times directly with line setpoint adjustments to eliminate upstream quality bottlenecks.',
      fullDesc: 'No factory operates in isolation. Variations in raw material moisture, polymer resin density, or metal hardness from suppliers frequently cause unexpected machine stalls downstream. Inshira Supply Chain Intelligence bridges supplier dispatch data with plant floor telemetry, automatically suggesting machine calibration changes the moment a new material batch arrives on site.',
      keyCapabilities: [
        'Multi-tier Supplier Material Grade Profiling',
        'Upstream Moisture & Density Variance Correlation',
        'Dynamic Lead-Time & Buffer Stock Optimization',
        'Cross-Facility Value Stream Mapping',
        'Freight & Logistics Carbon Footprint Tracking'
      ],
      impactMetric: '-42% Defect Rate',
      impactLabel: 'Reduction in Material-Driven Downtime',
      gradient: 'from-indigo-500/10 via-blue-500/5 to-transparent',
      borderGlow: 'hover:border-indigo-500/40'
    },
    {
      id: 'fleet-intelligence',
      title: 'Fleet Intelligence & Mobile Asset Telematics',
      subtitle: 'Real-Time AGV, Forklift & Yard Distribution Optimization',
      category: 'Mobile Telematics',
      releaseEta: 'Q3 2027 Pipeline',
      status: 'Telematics Hardware API Lab',
      statusColor: 'amber',
      icon: Truck,
      shortDesc: 'Unifies indoor warehouse AGVs, forklift telemetry, and outbound logistics fleets into a single real-time spatial heat-map and efficiency model.',
      fullDesc: 'Extending industrial decision intelligence from static factory machinery to mobile plant assets and logistics fleets. Inshira Fleet Intelligence aggregates CAN-bus telemetry, battery degradation, driver idle time, and indoor ultra-wideband (UWB) location data for forklifts, automated guided vehicles (AGVs), and outbound delivery trucks. It dynamically routes indoor traffic to prevent aisle congestion and predicts fleet maintenance before costly breakdowns.',
      keyCapabilities: [
        'Indoor UWB Real-Time AGV & Forklift Heat-Mapping',
        'CAN-Bus Telemetry & Battery Health Analytics',
        'Driver Idle-Time & Eco-Driving Diagnostics',
        'Yard Management & Dock Door Routing Optimization',
        'Automated Route Congestion Minimization'
      ],
      impactMetric: '-28% Idle Energy',
      impactLabel: 'Reduction in Plant Logistics Transit Latency',
      gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
      borderGlow: 'hover:border-amber-500/40'
    },
    {
      id: 'autonomous-closed-loop',
      title: 'Autonomous Closed-Loop Process Calibration',
      subtitle: 'Self-Tuning Machinery Controls with Operator Safeguards',
      category: 'Autonomous Operations',
      releaseEta: 'Future Horizon',
      status: 'Lab Simulation Phase',
      statusColor: 'teal',
      icon: Cpu,
      shortDesc: 'Next-gen edge overlays that send real-time setpoint adjustments directly to PLC controllers within human-approved safety interlocks.',
      fullDesc: 'Moving from decision support to automated closed-loop execution. This future capability enables Inshira to send bounded, verified setpoint adjustments directly back to SCADA and PLC edge units—eliminating manual operator adjustment lag while maintaining strict human-in-the-loop safety overrides.',
      keyCapabilities: [
        'Human-Verified Edge Parameter Execution',
        'Sub-second Machine Drift Compensation',
        'Deterministic Safety Interlock Protocols',
        'Self-Healing Line Calibration Models'
      ],
      impactMetric: '< 150ms Tuning',
      impactLabel: 'Instant Drift Reaction Speed',
      gradient: 'from-teal-500/10 via-cyan-500/5 to-transparent',
      borderGlow: 'hover:border-teal-500/40'
    }
  ];

  const current = futureProducts.find((p) => p.id === selectedProduct) || futureProducts[0];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleInterestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userEmail.trim()) {
      setEmailSubmitted(true);
      setTimeout(() => {
        setInterestedProduct(null);
        setEmailSubmitted(false);
        setUserEmail('');
      }, 3000);
    }
  };

  return (
    <section id="future-product-pipeline" className="space-y-12 py-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 font-mono text-[12px] uppercase tracking-widest font-bold">
          <Sparkles className="w-3.5 h-3.5 text-teal-400 animate-pulse" />
          <span>Product Roadmap & Innovation Pipeline</span>
        </div>

        <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight leading-tight">
          THE NEXT FRONTIER OF OPERATIONAL INTELLIGENCE
        </h2>

        <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed">
          Inshira is continuously expanding its decision intelligence overlay beyond shop-floor telematics. Explore the next-generation suite of products currently in active development.
        </p>
      </div>

      {/* Product Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {futureProducts.map((prod) => {
          const IconComp = prod.icon;
          const isSelected = selectedProduct === prod.id;

          return (
            <div
              key={prod.id}
              onMouseMove={handleMouseMove}
              onClick={() => setSelectedProduct(prod.id)}
              className={`glow-card rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-300 relative ${
                isSelected
                  ? 'border-teal-400/60 bg-slate-900/60 shadow-xl shadow-teal-500/10 scale-[1.02]'
                  : 'hover:border-white/20'
              }`}
            >
              <div className="space-y-4">
                {/* Header Badge */}
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                    isSelected
                      ? 'bg-teal-500/20 border-teal-400/40 text-teal-300'
                      : 'bg-white/5 border-white/10 text-slate-400'
                  }`}>
                    <IconComp className="w-5 h-5 stroke-[1.8]" />
                  </div>

                  <span className="font-mono text-[12px] bg-white/5 text-slate-400 px-2.5 py-1 rounded-full border border-white/10 uppercase tracking-wider font-bold">
                    {prod.releaseEta}
                  </span>
                </div>

                <div>
                  <span className="font-mono text-[12px] text-teal-400 uppercase tracking-widest font-bold block mb-1">
                    {prod.category}
                  </span>
                  <h3 className="font-display text-sm font-bold text-white uppercase tracking-tight leading-snug">
                    {prod.title}
                  </h3>
                </div>

                <p className="font-sans text-xs text-slate-300 leading-relaxed">
                  {prod.shortDesc}
                </p>
              </div>

              <div className="border-t border-white/5 pt-4 mt-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    prod.statusColor === 'emerald' ? 'bg-emerald-400 animate-pulse' :
                    prod.statusColor === 'indigo' ? 'bg-indigo-400' :
                    prod.statusColor === 'amber' ? 'bg-amber-400' : 'bg-teal-400'
                  }`} />
                  <span className="font-mono text-[12px] text-slate-400">
                    {prod.status}
                  </span>
                </div>

                <span className={`font-mono text-[12px] font-bold uppercase flex items-center gap-1 ${
                  isSelected ? 'text-teal-400' : 'text-slate-500'
                }`}>
                  {isSelected ? 'Inspecting' : 'Explore Spec'}
                  <ChevronRight className={`w-3 h-3 transition-transform ${isSelected ? 'translate-x-1' : ''}`} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Inspection Panel for Selected Future Product */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          onMouseMove={handleMouseMove}
          className="glow-card rounded-3xl p-6 sm:p-10 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
        >
          {/* Subtle Top Gradient Line */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-teal-400/40 to-transparent"></div>

          {/* Left Column: Product Narrative & Capabilities */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[12px] bg-teal-500/10 text-teal-400 px-3 py-1 rounded-full border border-teal-500/20 uppercase font-bold tracking-widest">
                  {current.category}
                </span>
                <span className="font-mono text-[12px] text-slate-400 font-bold uppercase">
                  Target Roadmap: {current.releaseEta}
                </span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
                {current.title}
              </h3>

              <p className="font-sans text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                {current.subtitle}
              </p>

              <p className="font-sans text-xs text-slate-400 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-white/5">
                {current.fullDesc}
              </p>
            </div>

            {/* Key Capabilities Bullet Points */}
            <div className="space-y-3 pt-2">
              <span className="font-mono text-[12px] text-teal-400 font-bold uppercase tracking-wider block">
                Planned Architectural Capabilities:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {current.keyCapabilities.map((cap, i) => (
                  <div key={i} className="flex items-start gap-2 bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                    <span className="font-sans text-xs text-slate-300 font-medium">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Projected Impact & Beta Interest Action */}
          <div className="lg:col-span-5 bg-slate-950/80 p-6 rounded-2xl border border-white/10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="font-mono text-[12px] text-teal-400 font-bold uppercase tracking-wider block border-b border-white/10 pb-2">
                Projected Operational Impact
              </span>

              <div className="p-4 bg-teal-500/10 rounded-xl border border-teal-500/20 text-center space-y-1">
                <span className="font-display text-3xl font-extrabold text-white block tracking-tight">
                  {current.impactMetric}
                </span>
                <span className="font-mono text-[12px] text-teal-300 font-semibold uppercase tracking-wider block">
                  {current.impactLabel}
                </span>
              </div>

              <div className="space-y-2 text-[12px] font-sans text-slate-400 leading-relaxed">
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span>Development Stage:</span>
                  <span className="font-mono text-white font-bold">{current.status}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span>Architecture Model:</span>
                  <span className="font-mono text-teal-400">Zero-Hardware API Overlay</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-1">
                  <span>Beta Partner Slots:</span>
                  <span className="font-mono text-amber-400 font-bold">5 SME Plants Worldwide</span>
                </div>
              </div>
            </div>

            {/* Express Beta Interest Button / Form */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <span className="font-mono text-[12px] text-slate-400 uppercase tracking-wider font-bold block">
                Interested in Early Access / Beta Testing?
              </span>

              {emailSubmitted ? (
                <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 font-mono text-xs text-center font-bold">
                  ✓ Request Recorded for {current.title}. Our engineering team will contact you.
                </div>
              ) : interestedProduct === current.id ? (
                <form onSubmit={handleInterestSubmit} className="space-y-2">
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Enter your work email..."
                    className="w-full px-3 py-2 bg-slate-900 border border-white/20 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 font-sans"
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 rounded-xl font-mono text-xs font-bold uppercase transition-all cursor-pointer"
                    >
                      Confirm Interest
                    </button>
                    <button
                      type="button"
                      onClick={() => setInterestedProduct(null)}
                      className="px-3 py-2 bg-white/5 hover:bg-white/10 text-slate-400 rounded-xl font-mono text-xs cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setInterestedProduct(current.id)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-500 via-teal-400 to-indigo-500 hover:from-teal-400 hover:to-indigo-400 text-slate-950 font-sans text-xs font-extrabold uppercase tracking-wide transition-all shadow-lg shadow-teal-500/10 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request Alpha / Beta Access</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

    </section>
  );
}
