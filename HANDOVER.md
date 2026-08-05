# Inshira website rebuild — handover

New design from AI Studio, rebuilt on the existing `inshiratech/inshiratech.github.io`
repo with all current SEO and analytics preserved.

Verified locally: `vite build` succeeds, `tsc --noEmit` is clean, and every
preserved SEO tag survives into `dist/index.html`.

---

## 1. Do these two things first, in this order

**Order matters. Getting it backwards takes the live site down.**

The repo currently serves its root folder directly (Pages "Deploy from a
branch"). The new `index.html` is Vite *source* — it points at `/src/main.tsx`,
which does not exist in a browser. If that file lands on `main` while Pages is
still serving the branch, www.inshira.co.uk shows a blank page immediately.

1. **Push to a branch, not `main`.** Call it `redesign`. Nothing goes live.
2. **Switch the Pages source** — Settings → Pages → Build and deployment →
   Source: **GitHub Actions**. Only after that, merge `redesign` into `main`.

Custom domain stays `www.inshira.co.uk`; keep "Enforce HTTPS" ticked.

---

## 2. Files to add or replace

Upload via github.com → Add file → Upload files, onto the `redesign` branch.

| Path | Action |
|---|---|
| `index.html` | **Replace** — now the Vite entry, carrying the full preserved SEO head + StatCounter |
| `package.json` | Replace |
| `vite.config.ts` | Replace |
| `tsconfig.json` | Add |
| `sitemap.xml` | Replace (lastmod only) |
| `src/**` | Add — the whole app |
| `.github/workflows/deploy.yml` | Add — builds and deploys on push |

**Leave completely untouched:** `assets/`, `privacy.html`, `terms.html`,
`robots.txt`, `CNAME`. The workflow copies each of them into the build output,
so all their current URLs keep resolving.

Delete `bun.lock` and `metadata.json` if they came across — both are AI Studio
artefacts and unused.

---

## 3. What was preserved

Automatically re-checked on every deploy by the "Verify SEO survived the build"
step in the workflow — the build **fails** rather than shipping a regression.

- Title, meta description, keywords, canonical `https://www.inshira.co.uk/`
- All `og:*` and `twitter:*` tags, including `og:image` at its existing path
- Geo tags (`geo.region`, `geo.position`, `ICBM`), robots, author, coverage,
  classification, category, target, subject, language, revisit-after
- The full JSON-LD `@graph`: Organization (with the real Shelton Street
  address), both SoftwareApplication entries, and the FAQPage block — rendered
  **statically** in `index.html` so crawlers see it without running JavaScript
- StatCounter project `13184742`, security hash `19e5be03`, plus the `<noscript>`
  pixel. Unchanged, so your historical data stays on one property
- `privacy.html`, `terms.html`, `robots.txt`, `sitemap.xml`, `CNAME`

**Asset path safety.** Vite normally emits bundles into `dist/assets`, which
would have collided with your existing image folder and broken `og-image.jpg`,
`logo.png` and every team photo. `vite.config.ts` sets `assetsDir: 'static'` so
`/assets` stays exclusively yours.

---

## 4. What was restored from the old site

The AI Studio draft dropped these. All are back:

- **Team** — Dr Mohammad Harris, Fatema Tuj Jahura, Van Nguyen, and the advisory
  board (Prof Hongwei Wu, Puja Hazlehurst, Dr Saed Hussain), with their real
  photos from `/assets`
- **Research** — all five peer-reviewed papers with working DOI links, as a new
  section on the About page
- **Supporters** — UH, NatWest, Barclays, MSDUK, Sustainable Ventures, Carbon13
  logos in the footer
- **Social links** — GitHub, X, LinkedIn
- **Contact form** — now actually POSTs to your Formspree endpoint
  (`xzzwerva`). In the draft it only flipped a local state flag, so every
  enquiry would have been silently discarded

---

## 5. Corrected — factual errors, not style choices

| Was | Now |
|---|---|
| "Inshira Intelligence Ltd" | Inshira Technologies Ltd |
| Criterion Buildings, Leeds LS1 5AP | 71-75 Shelton Street, London WC2H 9JQ |
| `solutions@inshira.co.uk` | `info@inshira.co.uk` (the other mailbox does not exist) |
| `linkedin.com/company/inshira` | `linkedin.com/company/inshira-tech` |
| `inshira.co.uk` in schema | `www.inshira.co.uk` — matches your canonical |
| `/logo.png` | `/assets/logo.png` |
| Four invented staff | Your real team |

---

## 6. Still outstanding — please read

### 6a. Fabricated schema values — resolved

Both machine-readable-only items from the AI Studio draft have been removed and
verified absent from the compiled bundle, not merely commented out:

- **`aggregateRating`** — claimed 4.9 from 24 reviews. Removed. Do not
  reintroduce review markup unless real reviews are displayed on the page;
  otherwise it breaches Google's structured data policy.
- **`telephone`** — the placeholder `+44-113-555-0190`. Removed from both the
  schema and the visible Contact page. `telephone` is optional on ContactPoint,
  so the schema now carries `info@inshira.co.uk` and the contact URL instead.
  To add a real number later, put it back on the `contactPoint` object in
  `src/components/SeoGeoMetadata.tsx` and mirror it on the Contact page.

### 6b. Visible claims left in place, as you asked

Worth a pass before merging: the three case studies with named results
(28% downtime reduction, £142,000 savings, 2.8-month payback), "Our pilots have
100% success rate", the "ISO 27001 Aligned" footer badge and the GDPR/99.9% SLA
assertions on the legal page, and the two article authors "Sarah Jenkins" and
"Marcus Thorne" illustrated with Unsplash stock photos.

### 6c. The hash-router SEO ceiling

The app routes with `#/platform`, `#/about` and so on. Search engines ignore
URL fragments, so **all eight views are the single URL `https://www.inshira.co.uk/`**.
You will not rank separately for the Platform, Solutions, Industries or
Resources pages, and the old anchors (`#platform`, `#about`, `#contact`) that
Google currently has indexed no longer resolve to those positions.

Your ranking home page is protected, but this is a step down from the old
single-page site in reachable surface area. Two ways out, whenever you want it:

- Switch to a real path router (`/platform`) plus a `404.html` SPA fallback —
  gives you genuine per-page URLs
- Or pre-render each route to static HTML at build time — best for SEO, since
  crawlers then get complete markup with no JavaScript needed

### 6d. Client-rendered content

The old site served complete HTML. This one paints via a 624 kB JS bundle.
Google can render it, but less reliably and more slowly than static markup.
I put the critical tags and JSON-LD statically in `index.html` to limit the
exposure. Watch Search Console coverage for a few weeks after launch.

---

## 7. Rollback

The old site is one revert away — its `index.html` stays in git history on
`main`. To roll back: revert the merge commit, then set Settings → Pages →
Source back to "Deploy from a branch". `assets/`, the legal pages, `robots.txt`
and `CNAME` are never modified, so nothing else needs restoring.
