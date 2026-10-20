// Draws .github/readme/scan.svg, the README banner, from the real Budapest scan in src/data/maps.ts:
// a looping green wave radiates from the business's pin, holds, then the city resets to red.
// Run after a new scan lands: `npm run readme:art` (Node 23.6+ reads the .ts file directly).
import { mkdirSync, writeFileSync } from 'node:fs';
import { budapest, rankColor, rankInk, stats } from '../src/data/maps.ts';

const hex = { 'var(--r20)': '#d52f25', 'var(--r10)': '#ef7b22', 'var(--r5)': '#f4c430', 'var(--r3)': '#a6d63c', 'var(--r1)': '#2db24a', 'var(--ink)': '#0c1230', '#fff': '#fff' };
const S = 34, R = 14, X0 = 700, Y0 = 70; // pin grid placement in the 1280 × 560 banner
const CYCLE = 9; // seconds per loop
const WAVE = 3.2; // seconds for the wave to cross the city

const o = budapest.origin;
const maxD = Math.max(...budapest.pins.map((p) => Math.hypot(p.c - o.c, p.r - o.r)));
const before = stats(budapest, 'before');
const after = stats(budapest, 'after');

const pin = (rank, extra = '') =>
  `<circle r="${R}" fill="${hex[rankColor(rank)]}" stroke="#0c1230" stroke-width="1.3"/>` +
  `<text fill="${hex[rankInk(rank)]}"${extra}>${rank}</text>`;

const pins = budapest.pins.map((p) => {
  const x = X0 + p.c * S, y = Y0 + p.r * S;
  const delay = ((Math.hypot(p.c - o.c, p.r - o.r) / maxD) * WAVE).toFixed(2);
  return `<g class="pin" transform="translate(${x} ${y})">${pin(p.before)}<g class="a" style="animation-delay:${delay}s">${pin(p.after)}</g></g>`;
}).join('\n    ');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 560" width="1280" height="560" role="img" aria-label="A ranking map of Budapest: 106 pins turn from rank 20 to the top 3 in a wave that starts at the business.">
  <style>
    text { font-family: Archivo, 'Helvetica Neue', Arial, sans-serif; }
    .pin text { font-size: 11px; font-weight: 700; text-anchor: middle; dominant-baseline: central; }
    .a { opacity: 0; transform-box: fill-box; transform-origin: center; animation: scan ${CYCLE}s cubic-bezier(.16,1,.3,1) infinite; }
    @keyframes scan { 0%, 18% { opacity: 0; transform: scale(.4); } 24% { opacity: 1; transform: scale(1.25); } 28%, 82% { opacity: 1; transform: scale(1); } 88%, 100% { opacity: 0; transform: scale(.4); } }
    .ring { fill: none; stroke: #0c1230; stroke-width: 1.2; transform-box: fill-box; transform-origin: center; animation: ring ${CYCLE}s linear infinite; }
    @keyframes ring { 0%, 18% { opacity: 0; transform: scale(.02); } 19% { opacity: .6; } ${(18 + (WAVE / CYCLE) * 100).toFixed(1)}%, 100% { opacity: 0; transform: scale(1); } }
    @media (prefers-reduced-motion: reduce) { .a { animation: none; opacity: 1; } .ring { display: none; } }
  </style>
  <rect width="1280" height="560" fill="#edefea"/>
  <g stroke="rgb(12 18 48 / .08)">${Array.from({ length: 13 }, (_, i) => `<line x1="${X0 + i * S}" x2="${X0 + i * S}" y1="40" y2="520"/><line y1="${Y0 + i * S}" y2="${Y0 + i * S}" x1="660" x2="1150"/>`).join('')}</g>
  <circle class="ring" cx="${X0 + o.c * S}" cy="${Y0 + o.r * S}" r="${(maxD + 1) * S}" style="animation-delay:0s"/>
  <g>
    ${pins}
  </g>
  <g fill="#0c1230">
    <text x="64" y="92" font-size="20" font-weight="700">Get Effective Marketing</text>
    <text x="64" y="178" font-size="62" font-weight="800" letter-spacing="-2.5">Local SEO that</text>
    <text x="64" y="242" font-size="62" font-weight="800" letter-spacing="-2.5">gets you into</text>
    <text x="64" y="306" font-size="62" font-weight="800" letter-spacing="-2.5">Google’s top 3.</text>
    <text x="64" y="360" font-size="20" fill="#4c5469">A real client scan, ${budapest.city}. ${after.total} grid points, one keyword.</text>
    <text x="64" y="438" font-size="13" font-weight="700" letter-spacing="1.2" fill="#4c5469">AVERAGE RANK</text>
    <text x="64" y="490" font-size="44" font-weight="800" letter-spacing="-1.5">20+ → ${after.avg.toFixed(1)}</text>
    <text x="330" y="438" font-size="13" font-weight="700" letter-spacing="1.2" fill="#4c5469">TOP 3 AT</text>
    <text x="330" y="490" font-size="44" font-weight="800" letter-spacing="-1.5">${before.top3} → ${after.top3}<tspan font-size="20" font-weight="600" fill="#4c5469"> of ${after.total}</tspan></text>
  </g>
</svg>
`;

mkdirSync(new URL('../.github/readme/', import.meta.url), { recursive: true });
writeFileSync(new URL('../.github/readme/scan.svg', import.meta.url), svg);
console.log(`wrote .github/readme/scan.svg (${budapest.pins.length} pins, ${(svg.length / 1024).toFixed(0)} KB)`);
