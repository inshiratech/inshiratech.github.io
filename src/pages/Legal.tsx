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
              Inshira is built from the ground up to respect the absolute confidentiality and integrity of industrial operations. We operate strictly as a <strong className="font-semibold text-white">read-only database overlay</strong>. We do not connect active write-back loops, and our software is incapable of altering PLC states, machine controllers, or conveyor logic.
            </p>
          </section>

          <section className="space-y-2.5">
            <h3 className="font-display text-sm sm:text-base font-bold text-white uppercase tracking-wider">2. End-to-End Cryptography</h3>
            <p>
              All telemetry, log files, and database connections are encrypted in transit using industry-standard TLS v1.3 pipelines and at rest using AES-256 keys. Our servers reside within secure, isolated virtual private clouds with strict network access control lists (NACLs).
            </p>
          </section>

          <section className="space-y-2.5">
            <h3 className="font-display text-sm sm:text-base font-bold text-white uppercase tracking-wider">3. Data Protection</h3>
            <p>
              Inshira Technologies Ltd is a UK registered company and processes personal data in accordance with the UK GDPR and the Data Protection Act 2018. Our connection pipelines are designed to filter out operator-specific names, IDs and shift identifiers, so the data we analyse is operational rather than personal wherever technically possible.
            </p>
            <p>
              {/* Rewritten from "fully complies with GDPR" and a claim of ISO/IEC
                  27001 alignment. Inshira holds no ISO certification, and
                  "fully complies" is an absolute that cannot be substantiated.
                  Update this section if and when certification is obtained. */}
              We are not currently certified to ISO/IEC 27001. We follow its principles in how we develop, test and log our software, but we make no claim of certification or formal alignment, and we will say so plainly here if that changes.
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
              {/* The 99.9% SLA figure was removed. Publishing a specific
                  availability commitment on a public legal page creates a
                  contractual expectation. Availability terms belong in the
                  signed agreement, where they can be negotiated per customer. */}
              Availability commitments, where offered, are set out in each customer’s signed service agreement rather than on this page. Inshira provides decision support recommendations for operational evaluation only. The final execution of parameters, calibration shifts and PLC settings remains the exclusive responsibility of the licensee’s own qualified plant engineers.
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
