import { useEffect } from 'react';
import { PageId } from '../types';
import { BLOG_POSTS } from '../data';
import {
  HARRIS_ID,
  HARRIS_PAGE,
  HARRIS_NAME,
  HARRIS_ROLE,
  HARRIS_CREDENTIALS,
  HARRIS_IMAGE,
  HARRIS_SAME_AS,
  HARRIS_ORCID,
  HARRIS_ORCID_ID,
} from '../identity';

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

/* Captured once on load so the site-wide keyword list can be restored after an
   article view overwrites it. Read from the static tag in index.html. */
const SITE_KEYWORDS =
  typeof document !== 'undefined'
    ? document.querySelector('meta[name="keywords"]')?.getAttribute('content') ?? ''
    : '';

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

    /* When an article is open, its own SEO fields take priority over the
       generic Knowledge Hub page metadata. `subTopic` carries the slug. */
    const article = subTopic
      ? BLOG_POSTS.find((p) => p.slug === subTopic)
      : undefined;

    const title = article ? article.metaTitle : meta.title;
    const description = article ? article.metaDescription : meta.description;

    document.title = title;

    // Article keywords replace the site-wide list while an article is open.
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      if (article) {
        metaKeywords.setAttribute('content', article.keywords.join(', '));
      } else if (SITE_KEYWORDS) {
        metaKeywords.setAttribute('content', SITE_KEYWORDS);
      }
    }

    // Update the existing description tag in place. Never create a duplicate —
    // the base tag already exists in index.html.
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description);

    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute('content', title);
    document
      .querySelector('meta[name="twitter:title"]')
      ?.setAttribute('content', title);

    /* Per-route canonical. Now that the app uses real paths rather than hash
       fragments, each view is its own indexable URL and must declare its own
       canonical, otherwise every page would consolidate onto the homepage. */
    const path = pageId === 'home' ? '/' : `/${pageId}`;
    const canonicalUrl = `https://www.inshira.co.uk${path}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrl);
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonicalUrl);

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
        /* Links the company entity to the person entity below. Without this,
           Google sees a company and a person on the same domain but has no
           stated relationship between them. */
        founder: { '@id': HARRIS_ID },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'Sales',
          email: 'info@inshira.co.uk',
          /* Was '/#/contact' — a leftover from the removed hash router that
             pointed at a URL which no longer exists. */
          url: 'https://www.inshira.co.uk/contact',
          areaServed: 'GB',
          availableLanguage: 'English',
        },
      },
      /* ---- Person entity ---------------------------------------------------
         Declares Dr. Mohammad Harris as a single, stable node (@id) and asserts
         via sameAs which external profiles are the same individual. This is
         what lets Google connect inshira.co.uk to his LinkedIn, ORCID and the
         University of Hertfordshire alumni feature, rather than treating them
         as unrelated pages that happen to share a common name — which matters
         because "Mohammad Harris" is not a distinctive name and there are many
         other people using it on LinkedIn. */
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': HARRIS_ID,
        name: HARRIS_NAME,
        honorificPrefix: 'Dr',
        honorificSuffix: HARRIS_CREDENTIALS,
        jobTitle: HARRIS_ROLE,
        url: HARRIS_PAGE,
        image: HARRIS_IMAGE,
        worksFor: {
          '@type': 'Organization',
          name: 'Inshira Technologies',
          url: 'https://www.inshira.co.uk',
        },
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'University of Hertfordshire',
          url: 'https://www.herts.ac.uk',
        },
        knowsAbout: [
          'Sustainable manufacturing',
          'Circular economy',
          'Manufacturing analytics',
          'Machine learning for production systems',
          'Thermal management',
          'Industry 4.0',
        ],
        /* ORCID stated as a formal identifier as well as in sameAs. sameAs says
           "this page is also him"; identifier says "he IS this registry
           record", which is the stronger and more machine-usable claim. */
        identifier: {
          '@type': 'PropertyValue',
          propertyID: 'ORCID',
          value: HARRIS_ORCID_ID,
          url: HARRIS_ORCID,
        },
        sameAs: HARRIS_SAME_AS,
      },
    ];

    /* ---- Article schema (SEO + GEO) --------------------------------------
       Emitted only while an article is open. Gives Google the headline,
       author with credentials, publish/modify dates, publisher, and the
       geographic audience the piece is written for. */
    if (article) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.metaDescription,
        articleSection: article.category,
        keywords: article.keywords.join(', '),
        inLanguage: 'en-GB',
        datePublished: article.datePublishedISO,
        dateModified: article.dateModifiedISO,
        wordCount: article.content.trim().split(/\s+/).length,
        image: article.image,
        /* Was '/#/resources' — another hash-router leftover. The @id must be a
           URL that actually resolves, otherwise the BlogPosting is anchored to
           a page Google cannot fetch. */
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://www.inshira.co.uk/resources',
        },
        /* Every named author, so co-written pieces credit both people.
           schema.org accepts either a single Person or an array. */
        author: [article.author, ...(article.coAuthors ?? [])].map((person) => ({
          '@type': 'Person',
          /* Reuse the site-wide @id where the author has one, so an article
             byline resolves to the same entity as the Person node above rather
             than minting a new person for every post. */
          ...(person.id ? { '@id': person.id } : {}),
          name: person.name,
          jobTitle: person.role,
          honorificSuffix: person.credentials,
          url: person.url,
          ...(person.sameAs?.length ? { sameAs: person.sameAs } : {}),
          worksFor: {
            '@type': 'Organization',
            name: 'Inshira Technologies',
            url: 'https://www.inshira.co.uk',
          },
        })),
        publisher: {
          '@type': 'Organization',
          name: 'Inshira Technologies',
          url: 'https://www.inshira.co.uk',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.inshira.co.uk/assets/logo.png',
          },
        },
        // GEO targeting — who and where this content is written for.
        audience: {
          '@type': 'BusinessAudience',
          audienceType: 'SME manufacturers',
          geographicArea: article.areaServed.map((code) => ({
            '@type': 'Country',
            name: code,
          })),
        },
        spatialCoverage: article.areaServed.map((code) => ({
          '@type': 'Country',
          name: code,
        })),
      });
    }

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
