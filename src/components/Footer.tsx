import { PageId } from '../types';
import { Activity, Shield } from 'lucide-react';

interface FooterProps {
  setCurrentPage: (page: PageId) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const handleNav = (pageId: PageId) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sitemap = {
    platform: [
      { label: 'Overview', page: 'platform' as PageId },
      { label: 'Downtime diagnostics', page: 'platform' as PageId },
      { label: 'Causal engine', page: 'platform' as PageId },
      { label: 'Decision Twin modeling', page: 'platform' as PageId }
    ],
    solutions: [
      { label: 'For Plant Managers', page: 'solutions' as PageId },
      { label: 'For CI Engineers', page: 'solutions' as PageId },
      { label: 'For Operations Directors', page: 'solutions' as PageId }
    ],
    resources: [
      { label: 'Guides Library', page: 'resources' as PageId },
      { label: 'FAQs Accordion', page: 'resources' as PageId },
      { label: 'Case Studies', page: 'case-studies' as PageId }
    ],
  };

  /* Legal pages stay as real static files (privacy.html / terms.html) rather
     than in-app routes. Both URLs are already indexed and listed in
     sitemap.xml — routing them through the hash router would 404 them. */
  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy.html' },
    { label: 'Terms of Service', href: '/terms.html' }
  ];

  /* Carried over from the previous site. Files already live in /assets. */
  const supporters = [
    { name: 'University of Hertfordshire', img: '/assets/uh-logo.png', href: 'https://www.herts.ac.uk/' },
    { name: 'NatWest Accelerator', img: '/assets/natwest.png', href: 'https://www.natwest.com/' },
    { name: 'Barclays Eagle Labs', img: '/assets/barclays.png', href: 'https://www.barclays.co.uk/' },
    { name: 'MSDUK — Minority Supplier Development UK', img: '/assets/MSDUK.jpg', href: 'https://www.msduk.org.uk/' },
    { name: 'Sustainable Ventures', img: '/assets/SV.png', href: 'https://www.sustainableventures.co.uk/' },
    { name: 'Carbon13', img: '/assets/C13.jpg', href: 'https://carbonthirteen.com/' }
  ];

  const socials = [
    { label: 'GitHub', href: 'https://github.com/inshiratech' },
    { label: 'Twitter', href: 'https://x.com/inshiraltd' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/inshira-tech/' }
  ];

  return (
    <footer id="global-footer" className="bg-slate-950 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          
          {/* Logo & Info column */}
          <div className="lg:col-span-2 space-y-4">
            <div
              onClick={() => handleNav('home')}
              className="flex items-center gap-2 cursor-pointer group select-none"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center">
                <Activity className="w-4 h-4 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="font-display text-lg font-bold text-white tracking-wide">
                INSHIRA
              </span>
            </div>
            
            <p className="font-sans text-[13px] text-slate-400 leading-relaxed">
              We provide the leading Operational Intelligence and Decision Support layer for manufacturing SMEs (20-500 employees). Aggregate existing PLCs and ERP logs to uncover hidden capacity losses without physical downtime or capital expense.
            </p>

            {/* Factual badges only. "ISO 27001 Aligned" and "GDPR Secure" were
                removed — Inshira holds no ISO certification, and "GDPR Secure"
                is not a recognised status. These describe what is actually
                true: how the connection works and where the company is. */}
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900 border border-slate-800 font-mono text-[12px] text-teal-400 font-bold">
                <Shield className="w-3 h-3" />
                Read-only connection
              </span>
              <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900 border border-slate-800 font-mono text-[12px] text-slate-400">
                UK registered company
              </span>
              <span className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900 border border-slate-800 font-mono text-[12px] text-slate-400">
                No new hardware required
              </span>
            </div>
          </div>

          {/* Sitemap links */}
          <div>
            <span className="font-mono text-[12px] text-slate-500 uppercase tracking-widest block mb-4 font-bold">Platform Suite</span>
            <ul className="space-y-2.5">
              {sitemap.platform.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNav(link.page)}
                    className="font-sans text-[13px] text-slate-400 hover:text-white transition-colors block text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-mono text-[12px] text-slate-500 uppercase tracking-widest block mb-4 font-bold">CI Solutions</span>
            <ul className="space-y-2.5">
              {sitemap.solutions.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNav(link.page)}
                    className="font-sans text-[13px] text-slate-400 hover:text-white transition-colors block text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-mono text-[12px] text-slate-500 uppercase tracking-widest block mb-4 font-bold">Authority Hub</span>
            <ul className="space-y-2.5">
              {sitemap.resources.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => handleNav(link.page)}
                    className="font-sans text-[13px] text-slate-400 hover:text-white transition-colors block text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-mono text-[12px] text-slate-500 uppercase tracking-widest block mb-4 font-bold">Corporate Legal</span>
            <ul className="space-y-2.5">
              {legalLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="font-sans text-[13px] text-slate-400 hover:text-white transition-colors block text-left"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Supporter / programme logos — carried over from the previous site */}
        <div className="mt-14 pt-10 border-t border-slate-900">
          <p className="font-mono text-[12px] text-slate-500 uppercase tracking-widest font-bold text-center mb-6">
            Supported through research, community, accelerator, and enterprise growth programmes
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
            {supporters.map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                rel="noopener"
                target="_blank"
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <img
                  src={s.img}
                  alt={s.name}
                  width={130}
                  height={36}
                  loading="lazy"
                  className="h-9 w-auto max-w-[130px] object-contain"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Footer Bottom Row */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Company name and registered address corrected to match Companies
              House / the previous site. The AI Studio draft had "Inshira
              Intelligence Ltd" at a Leeds address; both were incorrect. */}
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[12px] text-slate-500">
              © 2026 Inshira Technologies Ltd. All rights reserved. Registered in England &amp; Wales.
            </span>
            <span className="font-mono text-[12px] text-slate-600 block">
              71-75 Shelton Street, London, WC2H 9JQ, United Kingdom.
            </span>
          </div>

          <div className="flex items-center gap-5 text-xs font-mono text-slate-500">
            {socials.map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                rel="noopener"
                target="_blank"
                className="hover:text-teal-400 transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
