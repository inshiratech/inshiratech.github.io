import { useState } from 'react';
import {
  TrendingUp,
  Coins,
  ArrowRight,
  Gauge,
  Info,
  Layers,
  Percent,
  Calculator
} from 'lucide-react';

export default function RoiCalculator() {
  const [headcount, setHeadcount] = useState(120);
  const [hourlyCost, setHourlyCost] = useState(5000);
  const [downtimeHours, setDowntimeHours] = useState(12);
  const [annualScrap, setAnnualScrap] = useState(90000);

  // Math calculations
  const monthlyDowntimeLoss = hourlyCost * downtimeHours;
  const annualDowntimeLoss = monthlyDowntimeLoss * 12;
  const totalAnnualLoss = annualDowntimeLoss + annualScrap;

  // Inshira recovery rates: average 32% downtime reduction, 24% waste reduction
  const recoveredDowntime = annualDowntimeLoss * 0.32;
  const recoveredScrap = annualScrap * 0.24;
  const totalAnnualRecovered = recoveredDowntime + recoveredScrap;

  const costOfInshira = 14500; // Realistic mid-market pilot & platform overlay cost
  const roiMultiplier = totalAnnualRecovered / costOfInshira;
  const paybackDays = Math.max(12, (costOfInshira / (totalAnnualRecovered / 365))).toFixed(0);

  return (
    <div id="roi-calculator-container" className="w-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
      <div className="bg-slate-900 px-4 sm:px-6 py-4 border-b border-slate-800 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-teal-400" />
        <div>
          <span className="font-mono text-[12px] text-teal-400 font-bold uppercase tracking-widest block">Audit Engine</span>
          <h4 className="font-display text-sm sm:text-base font-bold text-white uppercase tracking-wider">Industrial ROI Calculator</h4>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Hand: Slider inputs */}
        <div id="roi-inputs" className="lg:col-span-6 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-800 space-y-6">
          <div className="space-y-1">
            <span className="font-mono text-[12px] text-teal-400 uppercase tracking-widest font-bold">Plant Baseline</span>
            <h5 className="font-display text-sm font-bold text-white">Your Plant’s Estimated Variables</h5>
            <p className="font-sans text-[13px] text-slate-400 leading-relaxed">
              We translate standard machinery bottlenecks into quantifiable business outcomes. Provide your rough figures below.
            </p>
          </div>

          <div className="space-y-5 pt-2">
            
            {/* Input 1: Headcount */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-xs font-semibold text-slate-200">Headcount (SME range)</span>
                <span className="font-mono text-xs font-bold text-slate-300">{headcount} Employees</span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                value={headcount}
                onChange={(e) => setHeadcount(Number(e.target.value))}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-teal-500 focus:outline-none"
              />
            </div>

            {/* Input 2: Hourly Downtime Cost */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-xs font-semibold text-slate-200">Avg. Hourly Downtime Loss</span>
                <span className="font-mono text-xs font-bold text-teal-400">£{hourlyCost.toLocaleString('en-GB')}/Hr</span>
              </div>
              <input
                type="range"
                min="500"
                max="15000"
                step="500"
                value={hourlyCost}
                onChange={(e) => setHourlyCost(Number(e.target.value))}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-teal-500 focus:outline-none"
              />
              <p className="font-sans text-[12px] text-slate-500">
                Includes lost throughput capacity, shift wages, and scheduled logistics delay penalties.
              </p>
            </div>

            {/* Input 3: Unplanned hours */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-xs font-semibold text-slate-200">Unplanned Stops Per Month</span>
                <span className="font-mono text-xs font-bold text-teal-400">{downtimeHours} Hours</span>
              </div>
              <input
                type="range"
                min="1"
                max="50"
                value={downtimeHours}
                onChange={(e) => setDowntimeHours(Number(e.target.value))}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-teal-500 focus:outline-none"
              />
              <p className="font-sans text-[12px] text-slate-500">
                Unplanned failures, minor micro-jams, and changeover delays.
              </p>
            </div>

            {/* Input 4: Scrap Expense */}
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <span className="font-sans text-xs font-semibold text-slate-200">Annual Material Scrap / Waste</span>
                <span className="font-mono text-xs font-bold text-teal-400">£{annualScrap.toLocaleString('en-GB')}/Yr</span>
              </div>
              <input
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={annualScrap}
                onChange={(e) => setAnnualScrap(Number(e.target.value))}
                className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-teal-500 focus:outline-none"
              />
            </div>

          </div>
        </div>

        {/* Right Hand: Projections */}
        <div id="roi-projections" className="lg:col-span-6 p-4 sm:p-6 bg-slate-950/40 flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            <span className="font-mono text-[12px] text-teal-400 font-bold uppercase tracking-wider block">Estimated Annual Leakage vs Recuperation</span>
            
            <div className="space-y-3">
              {/* Current Losses */}
              <div className="p-3.5 bg-red-950/10 border border-red-900/30 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-mono text-[12px] text-slate-400 uppercase font-medium">Your Annual Losses (Downtime + Scrap)</span>
                  <span className="font-display text-lg font-bold text-slate-200 block mt-0.5">
                    £{totalAnnualLoss.toLocaleString('en-GB')}
                  </span>
                </div>
                <span className="font-mono text-[12px] text-red-400 font-bold bg-red-500/10 px-2 py-0.5 rounded border border-red-500/10">
                  Leaked Capital
                </span>
              </div>

              {/* Inshira Recoverable */}
              <div className="p-4 bg-gradient-to-tr from-slate-900 to-teal-950/40 border border-teal-500/30 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-mono text-[12px] text-teal-400 uppercase font-bold tracking-wider">Estimated Recuperated Profit (Inshira)</span>
                  <span className="font-display text-2xl font-extrabold text-white block mt-0.5">
                    £{totalAnnualRecovered.toLocaleString('en-GB')}
                  </span>
                </div>
                <span className="font-mono text-[12px] text-slate-950 font-extrabold bg-teal-400 px-2.5 py-1 rounded-lg">
                  Recovered / Yr
                </span>
              </div>
            </div>

            {/* Financial Multiplier Bento */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-850">
                <span className="font-mono text-[12px] text-slate-500 uppercase tracking-wider block">Investment Multiplier</span>
                <span className="font-display text-base font-bold text-white block mt-0.5">
                  {roiMultiplier.toFixed(1)}x ROI
                </span>
                <span className="font-sans text-[12px] text-slate-400">Against base overlay cost</span>
              </div>

              <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-850">
                <span className="font-mono text-[12px] text-slate-500 uppercase tracking-wider block">Payback Speed</span>
                <span className="font-display text-base font-bold text-emerald-400 block mt-0.5">
                  {paybackDays} Days
                </span>
                <span className="font-sans text-[12px] text-slate-400">To cover software pilot cost</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-850 flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 shrink-0">
              <TrendingUp className="w-4 h-4" />
            </div>
            <p className="font-sans text-[13px] text-slate-400 leading-relaxed">
              We guarantee pilot outcome thresholds. If Inshira does not identify at least <strong className="font-semibold text-white">3x the pilot license value</strong> in hidden losses within 60 days, we refund 100% of the platform cost.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
