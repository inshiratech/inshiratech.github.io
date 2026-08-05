import { useEffect } from 'react';
import { PageId } from '../types';

/* ============================================================================
   SEO / GEO METADATA
   ----------------------------------------------------------------------------
   Sets the per-view <title> and description as the hash router changes page.

   IMPORTANT — read before editing:

   1. This must NEVER touch the canonical link, og:url, og:image, or the
      #inshira-base-jsonld block in index.html. Those are the tags Google has
      already indexed for this domain. This file only ADDS a second JSON-LD
      block (#inshira-page-jsonld) and swaps title/description.

   2. Because the app uses a HASH router (#/platform, #/about ...), Google
      treats every view as the same URL: https://www.inshira.co.uk/.
      The per-page titles below improve the in-app experience but do NOT
      create separately-rankable pages. See HANDOVER.md.

   3. Two fabricated values from the AI Studio draft have been removed: an
      invented aggregateRating (4.9 from 24 reviews) and a placeholder
      telephone number. Both were machine-readable only, so neither could be
      spotted by looking at the site. Do not reintroduce either.
   ========================================================================== */

/* ---------------------------------------------------------------------------
   NOTE: an invented aggregateRating (4.9 from 24 reviews) was present in the
   AI Studio draft and has been removed. Do not reintroduce review markup
   unless it is backed by real, user-generated reviews displayed on the page —
   otherwise it breaches Google's structured data policy.
   --------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------
   NOTE: a placeholder phone number (+44-113-555-0190) from the AI Studio draft
   was removed here. `telephone` is optional on ContactPoint — leave it out
   rather than publishing a number that does not reach Inshira. To add a real
   one later, put it back on the contactPoint object below and mirror it on the
   Contact page.
   --------------------------------------------------------------------------- */

interface SeoProps {
  pageId: PageId;
  subTopic?: string;
}

const BASE_TITLE = 'Inshira – Find and Fix Manufacturing Losses, Stage by Stage';
const BASE_DESCRIPTION =
  'Inshira helps SME manufacturers identify where production delays, material waste, and cost overruns are happening stage by stage using their existing operational data. No new sensors required.';

const PAGE_META: Record<PageId, { title: string; description: string }> = {
  home: {
    title: BASE_TITLE,
    description: BASE_DESCRIPTION,
  },
  platform: {
    title: 'Platform | Inshira Operational Intelligence Suite',
    description:
      'Explore Inshira’s core capabilities: continuous causal mapping, real-time downtime diagnostics, material waste tracking, and what-if scenario modelling.',
  },
  solutions: {
    title: 'Solutions for Plant Managers and CI Engineers | Inshira',
    description:
      'Automated root cause analysis, real-time KPI tracking, and weekly optimisation actions for operations directors, continuous improvement leads, and plant engineers.',
  },
  industries: {
    title: 'Manufacturing Sectors We Serve | Inshira',
    description:
      'Tailored operational intelligence for precision engineering, food and beverage processing, paper and plastic packaging, and machinery assembly.',
  },
  'case-studies': {
    title: 'Manufacturing Case Studies and ROI | Inshira',
    description:
      'Worked examples showing how stage-level diagnostics reduce downtime and recover material value in SME manufacturing environments.',
  },
  resources: {
    title: 'Knowledge Hub | Guides, Articles and FAQs | Inshira',
    description:
      'Educational resources on operational intelligence, reducing downtime, and cutting material scrap in SME manufacturing.',
  },
  about: {
    title: 'About Inshira | Our People, Research and Mission',
    description:
      'Inshira Technologies is a UK specialist AI platform for manufacturing diagnostics, built on peer-reviewed engineering research and led by Dr Mohammad Harris.',
  },
  contact: {
    title: 'Request a Diagnostic | Contact Inshira',
    description:
      'Tell us about your process and we will show you what to fix. Book an operational diagnostic session with the Inshira team.',
  },
  privacy: {
    title: 'Privacy Policy | Inshira Technologies',
    description: 'Privacy Policy for Inshira Technologies Ltd.',
  },
  terms: {
    title: 'Terms of Service | Inshira Technologies',
    description: 'Terms of Service for Inshira Technologies Ltd.',
  },
};

export default function SeoGeoMetadata({ pageId, subTopic }: SeoProps) {
  useEffect(() => {
    const meta = PAGE_META[pageId] ?? PAGE_META.home;

    const title = subTopic ? `${subTopic} | Inshira` : meta.title;
    const description = meta.description;

    document.title = title;

    // Update the existing description tag in place. Never create a duplicate —
    // the base tag already exists in index.html.
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description);

    // Keep share titles in sync for in-app navigation, without ever touching
    // og:url, og:image or the canonical link.
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', title);
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute('content', title);

    // ---- Per-view JSON-LD -------------------------------------------------
    // Written under its own id so the static #inshira-base-jsonld block in
    // index.html is left completely intact.
    document.getElementById('inshira-page-jsonld')?.remove();

    const schemas: Record<string, unknown>[] = [
      {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Inshira',
        operatingSystem: 'Web-based SaaS',
        applicationCategory: 'BusinessApplication',
        url: 'https://www.inshira.co.uk/',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'GBP',
          availability: 'https://schema.org/InStock',
        },
        description,
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Inshira Technologies',
        url: 'https://www.inshira.co.uk',
        logo: 'https://www.inshira.co.uk/assets/logo.png',
        sameAs: [
          'https://www.linkedin.com/company/inshira-tech/',
          'https://x.com/inshiraltd',
          'https://github.com/inshiratech',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Sales',
          email: 'info@inshira.co.uk',
          url: 'https://www.inshira.co.uk/#/contact',
          areaServed: 'GB',
          availableLanguage: 'English',
        },
      },
    ];

    const script = document.createElement('script');
    script.id = 'inshira-page-jsonld';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemas);
    document.head.appendChild(script);

    return () => {
      document.getElementById('inshira-page-jsonld')?.remove();
    };
  }, [pageId, subTopic]);

  return null;
}
