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

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  publishDate: string;
  readingTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
    /* Author credentials and profile URL. Used by BlogPosting JSON-LD to
       establish E-E-A-T (experience, expertise, authoritativeness, trust). */
    credentials?: string;
    url?: string;
  };

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
  quote: {
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
