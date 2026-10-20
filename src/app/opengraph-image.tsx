import { ImageResponse } from 'next/og';
import { budapest, rankColor, rankInk } from '@/data/maps';

export const alt = 'Local SEO that gets you into Google’s top 3: a real client ranking map of Budapest, half scanned from red to green.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const hex: Record<string, string> = { 'var(--r20)': '#d52f25', 'var(--r10)': '#ef7b22', 'var(--r5)': '#f4c430', 'var(--r3)': '#a6d63c', 'var(--r1)': '#2db24a', 'var(--ink)': '#0c1230' };

// The share frame: the scan caught halfway, a green ring around the business, the red city beyond.
export default function OG() {
  const S = 44;
  const o = budapest.origin;
  const maxD = Math.max(...budapest.pins.map((p) => Math.hypot(p.c - o.c, p.r - o.r)));
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#edefea', color: '#0c1230', padding: 56 }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 560 }}>
          <div style={{ fontSize: 26, fontWeight: 700 }}>Get Effective Marketing</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 0.95, letterSpacing: -3 }}>Get into Google’s top 3 on the map.</div>
            <div style={{ fontSize: 26, color: '#4c5469' }}>Local SEO, Business Profile, Google Ads. Antwerp.</div>
          </div>
          <div style={{ fontSize: 22, color: '#4c5469' }}>A real client map, Budapest: top 3 at 69 of 106 points.</div>
        </div>
        <div style={{ position: 'relative', display: 'flex', width: 13 * S, height: 13 * S, marginLeft: 'auto', marginTop: -16 }}>
          {budapest.pins.map((p, i) => {
            const k = Math.min(1, Math.max(0, (0.62 - Math.hypot(p.c - o.c, p.r - o.r) / maxD) / 0.3));
            const rank = Math.round(p.before + (p.after - p.before) * k);
            return (
              <div key={i} style={{
                position: 'absolute', left: p.c * S + 3, top: p.r * S + 3, width: S - 6, height: S - 6, borderRadius: 99,
                background: hex[rankColor(rank)], color: hex[rankInk(rank)] ?? '#fff', border: '2px solid #0c1230',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 700,
              }}>{rank}</div>
            );
          })}
        </div>
      </div>
    ),
    size,
  );
}
