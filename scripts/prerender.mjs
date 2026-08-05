/* ============================================================================
   STATIC ROUTE EMISSION
   ----------------------------------------------------------------------------
   GitHub Pages has no server-side rewrite. The 404.html bounce makes deep links
   work for humans, but the response status is still 404 — and Googlebot will not
   index a URL that returns 404, so clean paths alone win nothing for SEO.

   This script copies the built index.html to dist/<route>/index.html for every
   route. GitHub Pages then serves /platform/ from /platform/index.html with a
   200, so each route is a genuinely indexable URL that also carries its own
   title, description and canonical in the static HTML — before React runs.

   Keep ROUTES in sync with PAGE_META in src/components/SeoGeoMetadata.tsx.
   ========================================================================== */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const ORIGIN = 'https://www.inshira.co.uk';

const ROUTES = [
  { path: 'platform',     title: 'Platform | Inshira Operational Intelligence Suite',        description: 'Explore Inshira’s core capabilities: continuous causal mapping, real-time downtime diagnostics, material waste tracking, and what-if scenario modelling.' },
  { path: 'solutions',    title: 'Solutions for Plant Managers and CI Engineers | Inshira',  description: 'Automated root cause analysis, real-time KPI tracking, and weekly optimisation actions for operations directors, continuous improvement leads, and plant engineers.' },
  { path: 'industries',   title: 'Manufacturing Sectors We Serve | Inshira',                 description: 'Tailored operational intelligence for precision engineering, food and beverage processing, paper and plastic packaging, and machinery assembly.' },
  { path: 'case-studies', title: 'Manufacturing Diagnostic Playbooks by Sector | Inshira',   description: 'The specific loss patterns Inshira isolates in precision machining, packaging conversion and food and beverage processing, and the data used to trace each one.' },
  { path: 'resources',    title: 'Knowledge Hub | Guides, Articles and FAQs | Inshira',      description: 'Educational resources on operational intelligence, reducing downtime, and cutting material scrap in SME manufacturing.' },
  { path: 'about',        title: 'About Inshira | Our People, Research and Mission',         description: 'Inshira Technologies is a UK specialist AI platform for manufacturing diagnostics, built by industrial engineers with aerospace, automotive and defence delivery experience.' },
  { path: 'contact',      title: 'Request a Diagnostic | Contact Inshira',                   description: 'Tell us about your process and we will show you what to fix. Book an operational diagnostic session with the Inshira team.' },
];

const shell = readFileSync(join(DIST, 'index.html'), 'utf8');

const swapTag = (html, pattern, replacement) => {
  if (!pattern.test(html)) throw new Error(`prerender: pattern not found -> ${pattern}`);
  return html.replace(pattern, replacement);
};

let count = 0;
for (const route of ROUTES) {
  const url = `${ORIGIN}/${route.path}`;
  let html = shell;

  html = swapTag(html, /<title>[\s\S]*?<\/title>/, `<title>${route.title}</title>`);
  html = swapTag(html, /(<meta name="description" content=")[^"]*(")/, `$1${route.description}$2`);
  html = swapTag(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = swapTag(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  html = swapTag(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${route.title}$2`);
  html = swapTag(html, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${route.title}$2`);

  mkdirSync(join(DIST, route.path), { recursive: true });
  writeFileSync(join(DIST, route.path, 'index.html'), html);
  count++;
}

console.log(`prerender: emitted ${count} static routes`);
