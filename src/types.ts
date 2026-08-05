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
  };
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
