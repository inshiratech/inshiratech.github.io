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

/* ----------------------------------------------------------------------------
   ARTICLE PERMALINKS

   Knowledge Hub articles live at /resources/<slug>. They are the pages most
   likely to be shared, and social crawlers do NOT execute JavaScript: LinkedIn,
   Slack and X read the raw HTML only. Without a prerendered file per article,
   every share would fall back to the generic site title, description and image
   no matter which article was linked.

   Article copy is the single source of truth in src/data.ts, so it is parsed
   here rather than duplicated — a stale copy of a headline is worse than none.
   -------------------------------------------------------------------------- */
const dataSrc = readFileSync(join('src', 'data.ts'), 'utf8');

const field = (block, name) => {
  const m = block.match(new RegExp(`\\n\\s{4}${name}:\\s*'((?:[^'\\\\]|\\\\.)*)'`));
  return m ? m[1].replace(/\\'/g, "'").replace(/\\\\/g, '\\') : null;
};

const postBlocks = dataSrc
  .slice(dataSrc.indexOf('export const BLOG_POSTS'), dataSrc.indexOf('export const CASE_STUDIES'))
  .split(/\n  \{\n/)
  .slice(1);

const ARTICLES = postBlocks
  .map((block) => ({
    slug: field(block, 'slug'),
    title: field(block, 'metaTitle'),
    description: field(block, 'metaDescription'),
    image: field(block, 'image'),
  }))
  .filter((a) => a.slug && a.title && a.description);

if (ARTICLES.length === 0) {
  throw new Error('prerender: parsed 0 articles from src/data.ts — check the BLOG_POSTS shape');
}

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

const emit = ({ path, title, description, image, type }) => {
  const url = `${ORIGIN}/${path}`;
  let html = shell;

  html = swapTag(html, /<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
  html = swapTag(html, /(<meta name="description" content=")[^"]*(")/, `$1${escapeAttr(description)}$2`);
  html = swapTag(html, /(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = swapTag(html, /(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`);
  html = swapTag(html, /(<meta property="og:title" content=")[^"]*(")/, `$1${escapeAttr(title)}$2`);
  html = swapTag(html, /(<meta property="og:description" content=")[^"]*(")/, `$1${escapeAttr(description)}$2`);
  html = swapTag(html, /(<meta name="twitter:title" content=")[^"]*(")/, `$1${escapeAttr(title)}$2`);
  html = swapTag(html, /(<meta name="twitter:description" content=")[^"]*(")/, `$1${escapeAttr(description)}$2`);
  if (type) {
    html = swapTag(html, /(<meta property="og:type" content=")[^"]*(")/, `$1${type}$2`);
  }
  if (image) {
    html = swapTag(html, /(<meta property="og:image" content=")[^"]*(")/, `$1${image}$2`);
    html = swapTag(html, /(<meta name="twitter:image" content=")[^"]*(")/, `$1${image}$2`);
  }

  mkdirSync(join(DIST, path), { recursive: true });
  writeFileSync(join(DIST, path, 'index.html'), html);
};

let count = 0;
for (const route of ROUTES) {
  emit({ path: route.path, title: route.title, description: route.description });
  count++;
}

let articleCount = 0;
for (const article of ARTICLES) {
  emit({
    path: `resources/${article.slug}`,
    title: article.title,
    description: article.description,
    image: article.image,
    type: 'article',
  });
  articleCount++;
}

console.log(`prerender: emitted ${count} static routes and ${articleCount} article permalinks`);
