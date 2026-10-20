# Get Effective Marketing website

Next.js 16 (App Router, static pages), GSAP + Lenis for motion. Design notes: `DESIGN.md`.

## Run

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

## Edit content

- All copy, prices, FAQ and contact details: `src/data/site.ts`.
- Ranking maps (Budapest before/after, Berlin): `src/data/maps.ts`. Each row is one row of the
  13 × 13 tracker grid; `.` is an empty cell. Replace with a new scan when you have one.

## Contact form

Set `NEXT_PUBLIC_FORM_ENDPOINT` to a Formspree (or any FormData webhook) URL in the hosting
environment. Without it, the form opens an email to info@geteffectivemarketing.com instead.

## Deploy (Vercel)

Import the repo in Vercel, keep the defaults, add `NEXT_PUBLIC_FORM_ENDPOINT`, then point
geteffectivemarketing.com at the project. URLs match the current WordPress site, so existing
rankings carry over. Do not set `SITE_URL` in production (it is only for local QA of the OG image).
