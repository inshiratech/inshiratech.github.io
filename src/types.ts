export type PageId =
  | 'home'
  | 'platform'
  | 'solutions'
  | 'industries'
  | 'case-studies'
  | 'resources'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms';

export interface Author {
  name: string;
  role: string;
  avatar: string;
  /* Credentials and profile URL. Used by BlogPosting JSON-LD to establish
     E-E-A-T (experience, expertise, authoritativeness, trust). */
  credentials?: string;
  url?: string;
  /* Stable schema.org @id. When set, the author in an article's JSON-LD is
     the SAME node as the Person entity declared site-wide, instead of a fresh
     anonymous person per article. Without it Google sees five unconnected
     people who happen to share a name. */
  id?: string;
  /* External profiles that are verifiably the same person. See src/identity.ts
     for the rule on what may go in here. */
  sameAs?: string[];
  /* The one profile surfaced as a visible byline link, named explicitly rather
     than taken from sameAs[0] — sameAs is ordered by evidential strength (ORCID
     first), which is not the same as which profile a reader wants to click. */
  profileUrl?: string;
  profileLabel?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  publishDate: string;
  readingTime: string;
  author: Author;
  /* Additional named authors for co-written pieces. Rendered in the byline and
     emitted as extra Person entries in the article schema. */
  coAuthors?: Author[];

  /* ---- SEO / GEO fields --------------------------------------------------
     Consumed by SeoGeoMetadata.tsx to emit per-article <title>, description
     and BlogPosting structured data. Keep metaTitle under ~60 characters and
     metaDescription between 140-160 so neither is truncated in results. */
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  /* ISO 8601 dates for datePublished / dateModified in schema. */
  datePublishedISO: string;
  dateModifiedISO: string;
  /* Absolute URL of the article's social share image. */
  image: string;
  /* GEO targeting: where this content is written for. */
  areaServed: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  size: string;
  challenge: string;
  solution: string;
  results: {
    downtimeReduction: string;
    wasteReduction: string;
    annualSavings: string;
    paybackPeriod: string;
  };
  /* Optional. Only populate with a real, attributable customer quote that the
     customer has approved. Never fill this with an illustrative example. */
  quote?: {
    text: string;
    author: string;
    role: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ScenarioImpact {
  id: string;
  label: string;
  description: string;
  minVal: number;
  maxVal: number;
  currentVal: number;
  unit: string;
  calcSavings: (val: number) => number;
  calcDowntime: (val: number) => number;
  calcWaste: (val: number) => number;
  calcCO2: (val: number) => number;
}
