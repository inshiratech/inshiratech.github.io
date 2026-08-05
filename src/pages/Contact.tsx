import { useState, FormEvent } from 'react';
import { Mail, MapPin, CheckCircle2, Calendar, Clock, ArrowRight, Shield, Award } from 'lucide-react';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [headcount, setHeadcount] = useState('51-200');
  const [bottleneck, setBottleneck] = useState('downtime');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const timeSlots = [
    'Monday, 10:00 AM (BST)',
    'Monday, 2:30 PM (BST)',
    'Tuesday, 11:00 AM (BST)',
    'Tuesday, 4:00 PM (BST)',
    'Wednesday, 9:30 AM (BST)',
    'Thursday, 1:00 PM (BST)'
  ];

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /* Live Formspree endpoint carried over from the previous site. The AI Studio
     draft only flipped local state on submit, so enquiries were never actually
     sent anywhere. Do not change this ID — it routes to the existing inbox. */
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xzzwerva';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !company || !selectedSlot) {
      setSubmitError('Please fill out all required fields and select a consultation slot.');
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          headcount,
          interest: bottleneck,
          preferredSlot: selectedSlot,
          _subject: `Diagnostic request — ${company}`,
        }),
      });

      if (!response.ok) throw new Error(`Formspree responded ${response.status}`);
      setFormSubmitted(true);
    } catch {
      setSubmitError(
        'Something went wrong sending your request. Please email info@inshira.co.uk directly and we will pick it up.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="contact-page-root" className="space-y-16 pt-10 pb-16">
      
      {/* Header */}
      <section id="contact-header" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left space-y-4">
        <span className="font-mono text-xs font-bold text-teal-400 bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20 uppercase tracking-widest">
          Book a Discovery Call
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl">
          Schedule Your Complementary Operational Diagnostic
        </h1>
        <p className="font-sans text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
          Secure a 30-minute diagnostic session with our industrial practice lead. We will review your line configuration, identify potential leakage ratios, and model savings.
        </p>
      </section>

      {/* Main Layout */}
      <section id="contact-form-layout" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Contact Information Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800 space-y-6">
              <span className="font-mono text-[9px] text-teal-400 font-bold uppercase tracking-wider block">Corporate Office</span>
              <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">Inshira Intelligence Ltd</h3>
              
              <div className="space-y-4 font-sans text-xs text-slate-400">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                  <div>
                    {/* Corrected to the registered address used on the previous
                        site and in the Organization schema. */}
                    <span className="text-white font-semibold block">London (Registered Address)</span>
                    <span className="block mt-0.5 leading-relaxed">71-75 Shelton Street, London, WC2H 9JQ, UK</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-teal-400 shrink-0" />
                  <div>
                    <span className="text-white font-semibold block">Email</span>
                    {/* Corrected from solutions@ — that mailbox does not exist,
                        so these enquiries would have bounced. */}
                    <a href="mailto:info@inshira.co.uk" className="text-teal-400 hover:underline block mt-0.5">
                      info@inshira.co.uk
                    </a>
                  </div>
                </div>

                {/* Telephone block removed — the number in the AI Studio draft
                    (+44 113 555 0190) was a placeholder. Re-add here with a real
                    number if you want a phone contact shown. */}
              </div>
            </div>

            {/* Guarantees Box */}
            <div className="bg-slate-950 p-6 rounded-2xl border border-slate-850 space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-teal-400" />
                <span className="font-display text-xs font-bold text-white uppercase tracking-wider">Our Pilot Guarantee</span>
              </div>
              <p className="font-sans text-xs text-slate-500 leading-relaxed">
                If our decision support engine does not identify at least **3x the platform pilot cost** in hidden operational losses within 60 days of connection, we will refund 100% of the platform license fee. No administrative friction.
              </p>
            </div>
          </div>

          {/* Right Side: Interactive Booking Form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/30 border border-slate-800 rounded-2xl p-6 sm:p-8">
            {formSubmitted ? (
              <div id="booking-confirmation-box" className="text-center py-12 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>
                
                <div className="space-y-2">
                  <span className="font-mono text-xs font-bold text-emerald-400 uppercase tracking-widest">Consultation Reserved</span>
                  <h4 className="font-display text-lg sm:text-2xl font-bold text-white tracking-tight">Your Diagnostic Call is Confirmed</h4>
                  <p className="font-sans text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                    Thank you, {name}. A calendar invitation has been dispatched to **{email}** for:
                  </p>
                  <p className="font-mono text-xs text-teal-400 bg-slate-950 px-4 py-2 rounded-lg border border-slate-850 inline-block mt-3">
                    {selectedSlot}
                  </p>
                </div>

                <p className="font-sans text-[11px] text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Our industrial practice lead, Sarah Jenkins, will dial in at the scheduled time. Please have your rough historical downtime or PLC log exports ready.
                </p>

                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setName('');
                    setEmail('');
                    setCompany('');
                    setSelectedSlot(null);
                  }}
                  className="px-5 py-2.5 bg-slate-950 hover:bg-slate-850 border border-slate-800 text-slate-300 font-sans text-xs rounded-xl transition-colors"
                >
                  Schedule Another Slot
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-1">
                  <span className="font-mono text-[9px] text-teal-400 uppercase tracking-wider font-bold block">Inshira Scheduler</span>
                  <h3 className="font-display text-base font-bold text-white uppercase tracking-wider">Operational Audit Request</h3>
                  <p className="font-sans text-xs text-slate-400 leading-relaxed">
                    Provide your details and select an available consultation slot below to schedule your call.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-sans text-[11px] text-slate-300 font-semibold block">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. David Vance"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-sans text-xs text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-sans text-[11px] text-slate-300 font-semibold block">Corporate Email *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. d.vance@apexautomotive.co.uk"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-sans text-xs text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-sans text-[11px] text-slate-300 font-semibold block">Manufacturing SME Company *</label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Apex Automotive Components"
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-sans text-xs text-white focus:outline-none focus:border-teal-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-sans text-[11px] text-slate-300 font-semibold block">SME Employee Count</label>
                    <select
                      value={headcount}
                      onChange={(e) => setHeadcount(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-sans text-xs text-white focus:outline-none focus:border-teal-500"
                    >
                      <option value="20-50">20 - 50 employees</option>
                      <option value="51-200">51 - 200 employees</option>
                      <option value="201-500">201 - 500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-sans text-[11px] text-slate-300 font-semibold block">Primary Machinery Bottleneck / Focus</label>
                  <select
                    value={bottleneck}
                    onChange={(e) => setBottleneck(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 font-sans text-xs text-white focus:outline-none focus:border-teal-500"
                  >
                    <option value="downtime">Unplanned Downtime & Micro-Stoppages</option>
                    <option value="scrap">Material Scrap & Warm-up Waste</option>
                    <option value="speed">Machine Speed & Capacity Losses</option>
                    <option value="unsure">Uncoordinated silos / Multiple Factors</option>
                  </select>
                </div>

                {/* Slot Selector */}
                <div className="space-y-2">
                  <label className="font-sans text-[11px] text-slate-300 font-semibold block">
                    Select Available Consultation Slot *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        id={`btn-time-slot-${slot.replace(/[^a-zA-Z0-9]/g, '')}`}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2.5 rounded-lg border text-left font-sans text-xs transition-colors flex items-center justify-between ${
                          selectedSlot === slot
                            ? 'bg-teal-500/10 border-teal-500 text-teal-400 font-semibold'
                            : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white hover:border-slate-800'
                        }`}
                      >
                        {slot}
                        {selectedSlot === slot && <CheckCircle2 className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>

                {submitError && (
                  <p
                    role="alert"
                    className="font-sans text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2"
                  >
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-60 disabled:cursor-not-allowed text-slate-950 font-sans text-xs font-bold tracking-wide transition-all shadow-lg shadow-teal-500/10 flex items-center justify-center gap-2"
                >
                  {submitting ? 'Sending…' : 'Reserve My Consult Slot'}
                  {!submitting && <ArrowRight className="w-4 h-4 stroke-[2.5]" />}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
