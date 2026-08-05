import { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
  Leaf,
  Layers,
  Gauge,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  TrendingDown,
  Clock,
  Briefcase,
  Wrench,
  Users
} from 'lucide-react';

export default function InteractiveDigitalTwin() {
  // Scenario Preset options representing actual engineering questions
  const scenarios = [
    {
      id: 'setup_time',
      title: 'What if we reduce setup time by 20%?',
      description: 'Streamline the changeover sequence for high-mix batch lines.',
      changeover: 20,
      scrap: 5,
      speed: 3,
      energy: 4,
      costSavings: 72000,
      capacityIncrease: 12.5,
      downtimeReduction: 18.0,
      materialSaved: 4.2,
      energySaved: 3.5,
      roi: '510%',
      confidence: 94,
      riskLevel: 'Low',
      riskColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
      icon: Clock,
      note: 'Based on standard Single-Minute Exchange of Die (SMED) model calibration.'
    },
    {
      id: 'move_production',
      title: 'What if we reroute production of custom Part B?',
      description: 'Reroute custom parts from Line 1 to Line 3 during thermal bottlenecks.',
      changeover: 5,
      scrap: 12,
      speed: 10,
      energy: 6,
      costSavings: 94500,
      capacityIncrease: 8.2,
      downtimeReduction: 24.5,
      materialSaved: 11.0,
      energySaved: 8.0,
      roi: '685%',
      confidence: 89,
      riskLevel: 'Negligible',
      riskColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      icon: TrendingUp,
      note: 'Avoids multi-hour cooling periods. Maximizes line coordination.'
    },
    {
      id: 'reduce_scrap',
      title: 'What if we reduce start-up scrap by 15%?',
      description: 'Stabilize extruder thermal pressure before startup runs.',
      changeover: 2,
      scrap: 18,
      speed: 5,
      energy: 10,
      costSavings: 112000,
      capacityIncrease: 4.5,
      downtimeReduction: 8.0,
      materialSaved: 22.5,
      energySaved: 12.0,
      roi: '815%',
      confidence: 96,
      riskLevel: 'Low',
      riskColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
      icon: Layers,
      note: 'Reduces virgin polymer waste on high-temperature extrusion cycles.'
    },
    {
      id: 'buy_machine',
      title: 'What if we add a secondary high-speed CNC mill?',
      description: 'Introduce a secondary milling station to offload finishing bottleneck.',
      changeover: -15, // setup overhead
      scrap: 2,
      speed: 25,
      energy: -20, // uses more power
      costSavings: 285000,
      capacityIncrease: 38.0,
      downtimeReduction: 32.0,
      materialSaved: 3.0,
      energySaved: -15.0, // increased consumption
      roi: '124%', // lower initial ROI due to machine cost
      confidence: 92,
      riskLevel: 'Medium',
      riskColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      icon: Wrench,
      note: 'Modeled with a £140,000 capital expenditure amortization over 36 months.'
    },
    {
      id: 'hire_operator',
      title: 'What if we add a dedicated setter on Shift B?',
      description: 'Allocate a dedicated tooling setter to eliminate operator multi-tasking.',
      changeover: 35,
      scrap: 8,
      speed: 2,
      energy: 2,
      costSavings: 145000,
      capacityIncrease: 16.5,
      downtimeReduction: 21.0,
      materialSaved: 6.5,
      energySaved: 2.0,
      roi: '220%', // takes labor cost into account
      confidence: 95,
      riskLevel: 'Low',
      riskColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
      icon: Users,
      note: 'Relieves setup bottleneck on high-mix CNC cells.'
    }
  ];

  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('setup_time');

  // Interactive slider overrides (User can customise the chosen scenario)
  const [changeover, setChangeover] = useState<number>(20);
  const [scrap, setScrap] = useState<number>(5);
  const [speed, setSpeed] = useState<number>(3);
  const [energy, setEnergy] = useState<number>(4);

  // Sync state when scenario is selected
  const handleScenarioChange = (id: string) => {
    setSelectedScenarioId(id);
    const sc = scenarios.find(s => s.id === id);
    if (sc) {
      setChangeover(sc.changeover);
      setScrap(sc.scrap);
      setSpeed(sc.speed);
      setEnergy(sc.energy);
    }
  };

  const currentSc = scenarios.find(s => s.id === selectedScenarioId) || scenarios[0];

  // Dynamic calculations combining chosen scenario baselines and fine-tuning sliders
  // We use the slider deviations from the preset baseline to perturb the output variables beautifully
  const changeoverDelta = changeover - currentSc.changeover;
  const scrapDelta = scrap - currentSc.scrap;
  const speedDelta = speed - currentSc.speed;
  const energyDelta = energy - currentSc.energy;

  // Recalculate based on custom sliders
  const annualSavings = Math.max(0, currentSc.costSavings + (changeoverDelta * 1800) + (scrapDelta * 2400) + (speedDelta * 3100) + (energyDelta * 1200));
  const capacityGain = parseFloat(Math.max(0, currentSc.capacityIncrease + (changeoverDelta * 0.3) + (speedDelta * 0.5)).toFixed(1));
  const downtimeRed = parseFloat(Math.max(0, currentSc.downtimeReduction + (changeoverDelta * 0.4) + (speedDelta * 0.2)).toFixed(1));
  const materialSaved = parseFloat(Math.max(0, currentSc.materialSaved + (scrapDelta * 0.5)).toFixed(1));
  const energySaved = parseFloat((currentSc.energySaved + (energyDelta * 0.6)).toFixed(1));
  
  // Amortized ROI
  const baseInvestment = selectedScenarioId === 'buy_machine' ? 140000 : 18000;
  const calculatedRoi = annualSavings > 0 ? `${((annualSavings / baseInvestment) * 100).toFixed(0)}%` : '0%';
  const confidenceScore = Math.min(99, Math.max(70, currentSc.confidence - (Math.abs(changeoverDelta) + Math.abs(scrapDelta)) * 0.4)).toFixed(0);

  const getDynamicRiskLevel = () => {
    const totalVariance = Math.abs(changeoverDelta) + Math.abs(scrapDelta) + Math.abs(speedDelta);
    if (totalVariance > 15) {
      return { label: 'Medium', color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' };
    }
    return { label: currentSc.riskLevel, color: currentSc.riskColor };
  };

  const risk = getDynamicRiskLevel();

  const handleReset = () => {
    handleScenarioChange(selectedScenarioId);
  };

  // Radial Gauge Math
  const maxSavings = 400000;
  const fillPercentage = Math.min(100, Math.max(5, (annualSavings / maxSavings) * 100));
  const radius = 55;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (fillPercentage / 100) * circumference;

  return (
    <div id="decision-intelligence-simulation" className="w-full bg-slate-900/40 border border-white/5 rounded-2xl overflow-hidden shadow-2xl relative">
      
      {/* Background subtle light */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header Banner */}
      <div className="bg-slate-950 px-6 py-5 border-b border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-teal-400 shrink-0">
            <Gauge className="w-5 h-5 text-teal-500" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-teal-400 font-bold uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/10">
                Decision Intelligence Module
              </span>
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            </div>
            <h4 className="font-display text-base font-bold text-white uppercase tracking-wider mt-0.5">
              Interactive Scenario Modeling & "What-If" Simulator
            </h4>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full font-mono text-[10px] font-bold text-slate-300 hover:text-white transition-all uppercase tracking-wider self-stretch md:self-auto justify-center"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset to Baseline
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
        
        {/* Left Side: Selectable "What-If" Engineering Queries (5 cols) */}
        <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-white/5 space-y-5">
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-teal-400 uppercase tracking-widest font-bold block">
              Step 1: Choose a "What-If" Scenario
            </span>
            <p className="font-sans text-xs text-white/50 leading-relaxed">
              Select an operational change to trace how Inshira estimates bottom-line recovery, downtime impact, and capacity release.
            </p>
          </div>

          {/* Interactive Scenario Buttons */}
          <div className="space-y-2.5">
            {scenarios.map((sc) => {
              const IconComp = sc.icon;
              const isSelected = selectedScenarioId === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => handleScenarioChange(sc.id)}
                  className={`w-full p-3 rounded-xl border text-left transition-all flex items-start gap-3 relative ${
                    isSelected
                      ? 'bg-white/5 border-white/20 text-white shadow-xl'
                      : 'bg-transparent border-transparent text-slate-400 hover:bg-white/[0.02] hover:text-slate-200'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                    isSelected ? 'bg-teal-500/20 border-teal-500/40 text-teal-400' : 'bg-white/5 border-white/5 text-slate-500'
                  }`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="font-display text-xs font-bold block tracking-wide text-white">
                      {sc.title}
                    </span>
                    <span className="font-sans text-[10px] text-slate-400 block leading-tight">
                      {sc.description}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Precision Sliders to Perturb outputs */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[9px] text-slate-500 uppercase font-bold tracking-widest">
                Step 2: Perturb & Fine-Tune
              </span>
              <span className="text-[10px] font-sans text-teal-400/80 italic">Simulate custom deviation</span>
            </div>

            <div className="space-y-3">
              {/* Slider 1 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-sans text-slate-300">Target Changeover Time Reduction</span>
                  <span className="font-mono font-semibold text-teal-400">{changeover}%</span>
                </div>
                <input
                  type="range"
                  min="-20"
                  max="60"
                  value={changeover}
                  onChange={(e) => setChangeover(Number(e.target.value))}
                  className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-teal-500 focus:outline-none"
                />
              </div>

              {/* Slider 2 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-sans text-slate-300">Target Material Scrap Reduction</span>
                  <span className="font-mono font-semibold text-teal-400">{scrap}%</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="50"
                  value={scrap}
                  onChange={(e) => setScrap(Number(e.target.value))}
                  className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-teal-500 focus:outline-none"
                />
              </div>

              {/* Slider 3 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="font-sans text-slate-300">Rated Machine Speed Recovered</span>
                  <span className="font-mono font-semibold text-teal-400">{speed}%</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="40"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-teal-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Visual Estimations of Impact on KPIs (7 cols) */}
        <div className="lg:col-span-7 p-6 bg-slate-950/40 space-y-5 flex flex-col justify-between">
          
          <div className="space-y-4">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-400 animate-pulse" />
              <span className="font-mono text-[9px] text-slate-500 uppercase font-bold tracking-widest block">
                Estimated Operational Impact & Financial Feasibility
              </span>
            </div>

            {/* Main Financial KPI Box with radial representation */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 p-5 rounded-xl bg-slate-950 border border-white/5 relative overflow-hidden">
              
              {/* Radial gauge */}
              <div className="md:col-span-5 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/5 pb-4 md:pb-0">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="56"
                      cy="56"
                      r="46"
                      className="stroke-white/5 fill-transparent"
                      strokeWidth="6"
                    />
                    <circle
                      cx="56"
                      cy="56"
                      r="46"
                      className="stroke-teal-500 fill-transparent transition-all duration-500 ease-out"
                      strokeWidth="6"
                      strokeDasharray="289"
                      strokeDashoffset={(289 - (fillPercentage / 100) * 289).toString()}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest font-bold">SAVINGS</span>
                    <span className="font-display text-sm font-extrabold text-white mt-0.5">
                      {calculatedRoi}
                    </span>
                    <span className="font-sans text-[8px] text-teal-400 font-semibold uppercase mt-0.5">ROI Rate</span>
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <span className="font-mono text-[9px] text-slate-500 uppercase block font-semibold">
                    Cap Ex Ref: £{baseInvestment.toLocaleString('en-GB')}
                  </span>
                </div>
              </div>

              {/* Textual financial breakdown */}
              <div className="md:col-span-7 flex flex-col justify-between space-y-3 md:pl-2">
                <div>
                  <span className="font-mono text-[9px] text-teal-400 font-bold uppercase tracking-wider block">
                    TOTAL ESTIMATED ANNUAL CASH RECOVERY
                  </span>
                  <div className="text-3xl font-display font-black text-white tracking-tight mt-1">
                    £{annualSavings.toLocaleString('en-GB')}
                  </div>
                  <p className="font-sans text-[11px] text-slate-400 leading-relaxed mt-1">
                    Recovered by identifying unrecorded micro-stops and sequence bottlenecks.
                  </p>
                </div>

                <div className="text-[10px] text-slate-500 italic font-sans bg-white/[0.01] p-2 rounded border border-white/5">
                  "{currentSc.note}"
                </div>
              </div>

            </div>

            {/* Visual KPI bar charts / indicators */}
            <div className="space-y-4 pt-2">
              <span className="font-mono text-[9px] text-slate-500 uppercase font-bold tracking-widest block">
                Visual Impact Breakdowns
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* KPI 1: Capacity Increase */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium font-sans">Capacity Increase</span>
                    <span className="font-mono font-bold text-white text-right">+{capacityGain}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (capacityGain / 45) * 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-[9px] text-slate-500 block leading-none">Unlocks additional shift hours</span>
                </div>

                {/* KPI 2: Downtime Reduction */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium font-sans">Downtime Reduction</span>
                    <span className="font-mono font-bold text-teal-400 text-right">-{downtimeRed}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (downtimeRed / 35) * 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-[9px] text-slate-500 block leading-none">Prevents mechanical stall cycles</span>
                </div>

                {/* KPI 3: Material Savings */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium font-sans">Material Waste Saved</span>
                    <span className="font-mono font-bold text-white text-right">+{materialSaved}% Yield</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, (materialSaved / 30) * 100)}%` }}
                    ></div>
                  </div>
                  <span className="text-[9px] text-slate-500 block leading-none">Minimizes startup scrap and raw waste</span>
                </div>

                {/* KPI 4: Energy Savings */}
                <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 font-medium font-sans">Energy & Thermal Savings</span>
                    <span className="font-mono font-bold text-emerald-400 text-right">
                      {energySaved > 0 ? `+${energySaved}%` : `${energySaved}%`}
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${energySaved >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}
                      style={{ width: `${Math.min(100, Math.abs(energySaved) * 4)}%` }}
                    ></div>
                  </div>
                  <span className="text-[9px] text-slate-500 block leading-none">Calculated thermal cycle optimization</span>
                </div>

              </div>
            </div>
          </div>

          {/* Bottom confidence metadata */}
          <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-slate-500 shrink-0" />
              <div>
                <span className="font-mono text-[9px] text-slate-500 uppercase block">Model Confidence</span>
                <span className="font-display text-xs font-bold text-white block">
                  {confidenceScore}% Signal Confidence
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] text-slate-500 uppercase">Process Risk Level:</span>
              <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase border ${risk.color}`}>
                {risk.label}
              </span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
