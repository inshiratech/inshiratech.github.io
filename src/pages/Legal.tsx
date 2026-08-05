import { Shield, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface LegalProps {
  type: 'privacy' | 'terms';
}

export default function LegalPage({ type }: LegalProps) {
  return (
    <div id="legal-page-root" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="space-y-4 border-b border-slate-900 pb-6 text-center sm:text-left">
        <div className="flex items-center gap-2 justify-center sm:justify-start text-teal-400">
          <Shield className="w-5 h-5" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider">Corporate Security & Compliance</span>
        </div>
        
        <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          {type === 'privacy' ? 'Data Security & Privacy Protocol' : 'Terms of Service & Licensing'}
        </h1>
        
        <p className="font-sans text-xs text-slate-500">
          Last updated: June 2026 | Inshira Security Operations Unit
        </p>
      </div>

      {type === 'privacy' ? (
        /* Privacy content */
        <div id="privacy-content" className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed space-y-6">
          <section className="space-y-2.5">
            <h3 className="font-display text-sm sm:text-base font-bold text-white uppercase tracking-wider">1. Industrial Security-by-Design</h3>
            <p>
              Inshira is built from the ground up to respect the absolute confidentiality and integrity of industrial operations. We operate strictly as a **read-only database overlay**. We do not connect active write-back loops, and our software is incapable of altering PLC states, machine controllers, or conveyor logic.
            </p>
          </section>

          <section className="space-y-2.5">
            <h3 className="font-display text-sm sm:text-base font-bold text-white uppercase tracking-wider">2. End-to-End Cryptography</h3>
            <p>
              All telemetry, log files, and database connections are encrypted in transit using industry-standard TLS v1.3 pipelines and at rest using AES-256 keys. Our servers reside within secure, isolated virtual private clouds with strict network access control lists (NACLs).
            </p>
          </section>

          <section className="space-y-2.5">
            <h3 className="font-display text-sm sm:text-base font-bold text-white uppercase tracking-wider">3. GDPR & ISO 27001 Alignment</h3>
            <p>
              Inshira fully complies with the General Data Protection Regulation (GDPR). Our connection pipelines actively filter out and scrub any operator-specific names, IDs, or shift logs to maintain strict anonymity. We actively align our internal software development, testing, and logging procedures with the ISO/IEC 27001 information security standard.
            </p>
            <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 flex items-center gap-3 mt-3">
              <CheckCircle2 className="w-5 h-5 text-teal-400 shrink-0" />
              <span className="font-sans text-xs text-slate-400">
                To request an isolated on-premises container deployment model, please contact our security team directly at <strong>security@inshira.co.uk</strong>.
              </span>
            </div>
          </section>
        </div>
      ) : (
        /* Terms content */
        <div id="terms-content" className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed space-y-6">
          <section className="space-y-2.5">
            <h3 className="font-display text-sm sm:text-base font-bold text-white uppercase tracking-wider">1. Licensing Framework</h3>
            <p>
              Inshira grants B2B SME manufacturing entities a non-exclusive, non-transferable, revocable license to access our cloud-based Operational Intelligence platform. Software is billed on an annual recurring subscription model per active machinery line.
            </p>
          </section>

          <section className="space-y-2.5">
            <h3 className="font-display text-sm sm:text-base font-bold text-white uppercase tracking-wider">2. System Reliability & Liabilities</h3>
            <p>
              While Inshira operates with a targeted SLA availability of 99.9%, we provide decision support recommendations strictly for operational evaluation. The final operational execution of parameters, calibration shifts, and PLC settings remains the exclusive responsibility of the licensee’s certified plant engineers.
            </p>
          </section>

          <section className="space-y-2.5">
            <h3 className="font-display text-sm sm:text-base font-bold text-white uppercase tracking-wider">3. Auditable Refund Guarantee</h3>
            <p>
              Our pilot guarantee program runs for exactly 60 calendar days from the initial data gateway connection. If the licensee demonstrates that Inshira’s recommendation logs did not identify potential capacity, waste, or setup savings of at least three times the pilot licensing value, the licensee is entitled to a 100% refund of the software license fees.
            </p>
          </section>
        </div>
      )}

    </div>
  );
}
