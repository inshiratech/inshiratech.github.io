/* ============================================================================
   IDENTITY — single source of truth for the people behind Inshira.

   Why this file exists
   --------------------
   Google treats a person as an "entity" only when it can see the same identity
   asserted consistently across several independent, authoritative sources. The
   mechanism for asserting that is schema.org `sameAs`: a list of other pages
   that are the SAME person. Scattering these URLs across components means they
   drift; keeping them here means the site, the JSON-LD and the visible links
   can never disagree.

   Rule for adding a URL below: it must be a profile the person actually
   controls or is genuinely featured on, and it must resolve. A dead `sameAs`
   is worse than no `sameAs` — it tells Google our claims are unreliable.
   ========================================================================== */

export const SITE_ORIGIN = 'https://www.inshira.co.uk';

/* Canonical page for the person on our own site. Note: no `/#/` — the hash
   router was removed, and several of these URLs were still carrying it. */
export const HARRIS_PAGE = `${SITE_ORIGIN}/about`;

/* Stable schema.org @id so every schema block on the site refers to ONE node
   rather than re-declaring a new person each time. */
export const HARRIS_ID = `${HARRIS_PAGE}#mohammad-harris`;

/* Personal LinkedIn. Confirmed live vanity URL is /in/dr-mohammad-harris —
   this is also what the University of Hertfordshire alumni story links to, so
   the two now agree. The older /in/mharris07 URL is NOT listed here: LinkedIn
   releases a vanity URL when you change it and does not redirect, so pointing
   at it would create exactly the dead reference described above. */
export const HARRIS_LINKEDIN = 'https://www.linkedin.com/in/dr-mohammad-harris/';

/* Earned coverage on a high-authority .ac.uk domain (published 6 Aug 2026). */
export const HARRIS_HERTS_ALUMNI =
  'https://www.herts.ac.uk/alumni/alumni-stories/dr-mohammad-harris';

/* ORCID iD — the strongest identifier in this file. Unlike a LinkedIn vanity
   URL it is permanent, cannot be reassigned, and is issued by a neutral
   registry rather than self-asserted, which is precisely why it is listed
   first. Also expressed separately as a schema.org `identifier` (see
   SeoGeoMetadata) because ORCID is a recognised identifier scheme, not merely
   another web page about the same person. */
export const HARRIS_ORCID = 'https://orcid.org/0000-0003-3919-5952';
export const HARRIS_ORCID_ID = '0000-0003-3919-5952';

/* Citation profile. Useful corroboration of the publication record. */
export const HARRIS_SCHOLAR =
  'https://scholar.google.com/citations?user=TudprTUAAAAJ&hl=en';

/* Every independent page that is verifiably the same person. Ordered by
   strength of evidence: neutral registry, then self-controlled profiles, then
   third-party coverage. */
export const HARRIS_SAME_AS: string[] = [
  HARRIS_ORCID,
  HARRIS_LINKEDIN,
  HARRIS_SCHOLAR,
  HARRIS_HERTS_ALUMNI,
];

export const HARRIS_NAME = 'Dr. Mohammad Harris';
export const HARRIS_ROLE = 'Founder & Managing Director';
export const HARRIS_CREDENTIALS = 'PhD, MRes, BEng (Hons), FHEA, MIET';

/* Percent-encoded because the source filename contains spaces, and a raw space
   in a JSON-LD `image` value makes the URL invalid. */
export const HARRIS_IMAGE = `${SITE_ORIGIN}/assets/FLARE%202026%20051.JPG`;
