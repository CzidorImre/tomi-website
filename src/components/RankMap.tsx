// A geo-grid ranking map: one pin per grid point, the number is the rank from that spot.
// Pure markup. src/motion/scan.ts drives every map on the page (intro, scroll scan, idle ring).
import { rankColor, rankInk, rankText, type RankMap as Map } from '@/data/maps';

const S = 60; // grid spacing in SVG units
const R = 25; // pin radius

const pos = (c: number, r: number) => [S / 2 + c * S, S / 2 + r * S] as const;

// Catmull-Rom through the points, as cubic Béziers.
function smooth(pts: (readonly [number, number])[]) {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const [p0, p1, p2, p3] = [pts[i - 1] ?? pts[i], pts[i], pts[i + 1], pts[i + 2] ?? pts[i + 1]];
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`;
  }
  return d;
}

type Props = {
  map: Map;
  mode: 'scan' | 'drop';
  label: string; // accessible summary of what the map shows
  state?: 'before' | 'after'; // initial pin values (scan starts before)
  dims?: { cols: number; rows: number };
  duration?: number; // seconds the scan takes (scan mode)
  className?: string;
};

export function RankMap({ map, mode, label, state = 'after', dims, duration, className = '' }: Props) {
  const cols = dims?.cols ?? 13;
  const rows = dims?.rows ?? 13;
  const W = cols * S;
  const H = rows * S;
  const [ox, oy] = pos(map.origin.c, map.origin.r);
  const maxD = Math.max(...map.pins.map((p) => Math.hypot(...pos(p.c, p.r).map((v, i) => v - (i ? oy : ox)))));
  const id = `m-${map.city.toLowerCase()}-${cols}x${rows}`;

  return (
    <div className={`rankmap rankmap--${mode} ${className}`} data-rankmap={mode} data-duration={duration}>
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id={`${id}-fade`}>
            <stop offset="0.55" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id={`${id}-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
            <rect width={W} height={H} fill={`url(#${id}-fade)`} />
          </mask>
        </defs>
        <g mask={`url(#${id}-mask)`} aria-hidden="true">
          {Array.from({ length: cols }, (_, c) => (
            <line key={`c${c}`} className="rankmap__gridline" x1={S / 2 + c * S} x2={S / 2 + c * S} y1={0} y2={H} />
          ))}
          {Array.from({ length: rows }, (_, r) => (
            <line key={`r${r}`} className="rankmap__gridline" y1={S / 2 + r * S} y2={S / 2 + r * S} x1={0} x2={W} />
          ))}
          {map.river && <path className="rankmap__river" d={smooth(map.river.map(([c, r]) => pos(c, r)))} />}
        </g>
        <circle className="rankmap__ring" data-ring cx={ox} cy={oy} r={0} aria-hidden="true" />
        <g aria-hidden="true">
          {map.pins.map((p, i) => {
            const [x, y] = pos(p.c, p.r);
            const v = state === 'before' ? p.before : p.after;
            return (
              <g
                key={i}
                className="rankmap__pin"
                transform={`translate(${x} ${y})`}
                data-x={x}
                data-y={y}
                data-before={p.before}
                data-after={p.after}
                data-d={(Math.hypot(x - ox, y - oy) / (maxD || 1)).toFixed(3)}
              >
                <circle r={R} style={{ fill: rankColor(v) }} />
                <text style={{ fill: rankInk(v) }} fontSize={19}>{rankText(v)}</text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
