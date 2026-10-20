# Get Effective Marketing: redesign

## Brief

- **Subject:** Get Effective Marketing (GEM), a small local-marketing agency based in Antwerp
  (Lange Noordstraat 19-21) with a Hungarian phone line. Services: local SEO (the main product),
  Google Business Profile optimization, Google Ads management, WordPress web design.
- **Audience:** owners of local service businesses (trades, clinics, salons, restaurants, law and
  real-estate offices) who are invisible on Google Maps. Not designers. They decide in seconds,
  mostly on a phone, and they need to trust the agency.
- **Job:** get the visitor to ask for the free ranking check (form) or call.
- **Assets:** the logo (diamond, navy), a real before/after ranking map of one client over
  Budapest (106 grid points), all copy, prices and FAQ from the current site.
- **Language:** English (same as the current site). Same URLs, so existing rankings carry over.
- **Constraints:** honest numbers only. No invented testimonials, logos or results.

### Assumptions (also in the final message)

- The before/after map is one client, one main keyword, over Budapest. Time span between the two
  scans is unknown, so the site does not claim "90 days" for that map.
- "41+ clients" and "7+ years" are the owner's own claims from the current site; kept.
- "72% of searches go to the top 3" is the owner's claim from the current site; kept, unsourced.
- The contact form posts to `NEXT_PUBLIC_FORM_ENDPOINT` (Formspree or any form webhook). Without
  it, the form falls back to opening an email to info@geteffectivemarketing.com.

## Concept

| | A. The ranking map (material) | B. Three slots (formal) | C. Antwerp cut (place / logo) |
|---|---|---|---|
| Idea | The site is a geo-grid rank scan of a city: pins show where you rank from each spot, and they turn from red to green as you scroll | Google shows three businesses under the map, so every section has exactly three slots and anything ranked 4+ sinks below a fold line | Antwerp diamond district and the diamond logo: the page is cut into facets that catch light on scroll |
| Anchor | the ranking map is what GEM runs on every first call, and they own a real before/after map | the map pack has three places | logo + city |
| Signature | 106 real pins tick from 20+ down to their measured rank, radiating out from the business's own pin | the visitor's business climbs from slot 20 into slot 1 | facets refract on scroll |
| O / F / Fe / P | 4 / 5 / 4 / 2 | 4 / 4 / 4 / 3 | 3 / 2 / 3 / 3 |

**Pick A.** It is the product, the proof and the visual in one, and it needs the agency's own data
to exist. From B: the packages are set as ranking targets (page 1, top 3, top 3 + ad), and inner
pages show which layer of the results page the service owns (ads, map pack, organic).

```
Idea:        The site is a ranking map of a city: every pin says where a business ranks from that spot, and scrolling turns the city from red to green.
Metaphor:    a geo-grid rank tracker, the tool GEM opens on every first call.
Signature:   the hero scan. 106 pins from a real client map tick down from 20+ to their measured
             rank in a wave that radiates from the business's own pin, while the readout counts
             top-3 points from 0 to 69. It plays on its own clock (6.5 s, after a short
             red hold) once the map is on screen, not on scroll: the owner asked for a slower,
             time-driven reveal. Driver module: src/motion/scan.ts.
Emotion:     "that's a whole city where I don't exist", turning into "I could own this map."
Motion verb: radiate and climb. Things spread from a point like a scan ring; numbers tick down
             toward 1 and elements rise into place like a result climbing the list.
Screenshot:  the half-scanned map: a green ring around the business pin, a red city beyond it,
             the counter mid-climb.
```

The concept survives past the hero: inner pages show the results-page anatomy with their layer
lit; process steps are stops on a route; the plans are rank targets; the page transition is a
scan ring from the click point; the 404 is a map where every pin reads "no rank".

## Art direction

### Palette (from a road map, not from a brand kit)

| Role | Hex | Source |
|---|---|---|
| ground | `#EDEFEA` | map paper: the cool, slightly green land color of a road map |
| ink | `#0C1230` | GEM navy, sampled from the logo |
| muted | `#4C5469` | secondary text (7:1 on ground) |
| line | `rgb(12 18 48 / .14)` | roads and hairlines |
| field | `#0C1230` | the one dark section (Google's rules) and the curtain |
| rank ramp (data only) | `#D52F25` 20+, `#EF7B22` 10, `#F4C430` 5, `#A6D63C` 3, `#2DB24A` 1 | the rank tracker's own color code. Never used as decoration |

The only "accent" is rank 1 green, used where something is actually top: the current page dot,
the CTA hover flood, the top-3 readout.

### Type

Archivo (Google, variable: weight 100 to 900, width 62 to 125), one family with three voices:
- **Display:** 760 weight, width 112, tracking -0.035em at XL, -0.045em at mega, leading 0.92.
- **Text:** 400 weight, width 100, 17 to 18 px, leading 1.5.
- **Map label:** 620 weight, width 72 (condensed), uppercase, +0.08em, 12 to 13 px. Only for real
  map information: pin readouts, table heads, coordinates, footer address. Italic for the river.

### Grid and rhythm

12 columns, gutter = margin = clamp(16px, 2.4vw, 40px). Three hang lines: column 1 (headings),
column 5 (body), column 9 (meta). Section rhythm: hero (one screen), statement (airy),
included (tight), comparison (normal), rules (full-height field), process (normal), plans (airy),
FAQ (tight), footer (full height).

### Shape

Round means a pin or something you press (pins are circles, buttons are pills). Everything else
is square.

### Motion

`expo.out` entrances, `expo.inOut` curtain, `power3.out` hover. Pins change in steps (20, 19,
18 ... their real rank), never morph. Big things slow (1.2 s), small things fast (0.3 s), stagger
by distance from the origin pin, not by DOM order.

- **CTA (primary):** a green disc radiates from the pointer and the label climbs (rolls up).
- **Nav:** the label climbs; current page has a rank-1 dot.
- **Index rows / service links:** the row rises 6 px and its pin ticks to 1.
- **Inline links:** underline at rest that thickens into a band.
- **Utility (footer legal, phone in footer small print):** color only.
- **Idle:** a thin scan ring leaves the business pin every few seconds and pins lift as it passes
  (the hero map, the 404 map and the anatomy pin). Pointer: pins near the cursor lift slightly.
- **Transition:** a navy disc radiates from the click point (the scan), then contracts into the
  new page's center.

### Composition plan (home)

```
1 HERO (one screen)      | H1 (cols 1-5)          |  MAP 13x13 pins (cols 6-12) |
                           | lead, CTA, phone       |  readout: avg rank, top-3   |
                           | before/after toggle    |  caption                    |
2 STATEMENT + POSTER       "When someone nearby searches..." t-l across 1-10
                           RELEVANCE / DISTANCE / PROMINENCE stacked mega, distance muted
3 INDEX LIST (included)    six rows: pin | title | one line
4 COMPARISON               anatomy figure (cols 1-5) | SEO vs Ads table (cols 7-12)
5 FIELD (navy)             "No fake addresses. No stuffed names. No spam links."
6 ROUTE (process)          four stops on a drawn route line, who-it's-for list beside
7 PLANS                    three rank targets: page 1 / top 3 / top 3 + ad, table-like
8 FAQ                      heading sticky cols 1-4 | details list cols 6-12
9 FOOTER FINALE            "Get your free ranking map" mega, phone, address, links
```

Inner service page: anatomy hero (H1 left, results-page figure right with the layer lit) →
problems (index list) → included (asymmetric) → comparison table (if any) → route → FAQ →
footer. Contact: form + route of what happens next. 404: grey map, "no rank".

### Genericness test

- A generic build would put a gradient hero with "Grow your business" and three feature cards.
  Changed: the hero is the client's map, and the only color on the site is rank data.
- Plans as three equal cards → a ranked table where each plan names its target position.
- "Our process" with 01-04 icons → stops on a route line (it really is a sequence).
- Eyebrow labels above every heading → none; condensed labels only on map data.

## Decisions from QA

- **Idle:** every map (hero scan, Berlin, the 404, the map strip in the results-page figure) runs
  the scan ring on the GSAP ticker while on screen, and pauses while the page scrolls so the
  scroll keeps the frame budget. The contact page stays still at rest on purpose: it is a form,
  and its hovers carry the life.
- **LCP:** inner-page leads paint with the first frame (no reveal); only the H1 lines reveal.
- **Plans:** features moved into one comparison table, so each feature is said once. Diamond
  lists no "main service term" on the current site; kept as listed, owner to confirm.
- **Pass two (critic 7.25):** hero CTAs paint at full contrast from the first frame; only H1
  lines reveal (0.95 s). The results-page figure carries short listing text with "Your business"
  in the service's layer, and that layer drops into place on the intro. The Berlin map is read
  in a wave (grey "not checked yet" pins resolve to rank 1); it never shows an invented
  "before". Tables stack per row on phones. The 41+ / 7+ claims moved from the hero to the
  closing CTA, where they back the decision. Contact puts the form second on phones.
- **Still open (needs the owner):** case studies with real numbers, sites built for the
  WordPress page, real Google reviews, whether Diamond includes the main service term, and
  which phone number Belgian visitors should see.
