// Real ranking maps, transcribed pin by pin from the owner's own rank-tracker screenshots
// (wp-content/uploads/2026/03 on the current site). One keyword per map, 13 × 13 grid.
// "20" in the tracker means "20 or lower" (not in the top 20). Do not edit by hand unless a new
// scan replaces it.

export type Pin = { r: number; c: number; before: number; after: number };
export type RankMap = {
  city: string;
  coords: string;
  pins: Pin[];
  origin: { r: number; c: number }; // the business's own pin: the scan radiates from here
  river?: [number, number][]; // [col, row] points, drawn as a smooth line under the pins
};

const parse = (rows: string[]) =>
  rows.flatMap((row, r) =>
    row.trim().split(/\s+/).flatMap((v, c) => (v === '.' ? [] : [{ r, c, v: +v }])),
  );

// Budapest client. After-scan values; the before-scan was 20+ at every point except 11 at the business.
const budapestAfter = parse([
  '.  .  .  .  .  .  2  2  .  .  .  .  .',
  '.  .  .  .  .  2  1  1  .  1  1  .  .',
  '.  .  .  .  2  2  1  1  1  1  1  1  .',
  '.  .  3  3  1  1  1  3  1  2  1  1  .',
  '.  .  4  2  3  1  1  2  1  1  1  1  1',
  '.  .  .  3  2  2  1  1  3  3  2  2  .',
  '.  .  .  3  3  7  2  4  5  6  5  5  .',
  '.  1  2  3  3  7 19  7  6  2  7  6  3',
  '.  5  1  1  3  9 17  7  4  2  3  2  2',
  '3  .  3  5  3  5  4 10  5  4  2  7  2',
  '.  .  2  4  2  5  5  6  4  .  .  .  .',
  '.  .  2  2  5  5  5  4  .  .  .  .  .',
  '.  .  .  .  5  4  4  .  .  .  .  .  .',
]);

const budapestOrigin = { r: 4, c: 6 };

export const budapest: RankMap = {
  city: 'Budapest',
  coords: '47.50° N, 19.04° E',
  origin: budapestOrigin,
  pins: budapestAfter.map(({ r, c, v }) => ({
    r, c, after: v,
    before: r === budapestOrigin.r && c === budapestOrigin.c ? 11 : 20,
  })),
  // The Danube, traced from the same screenshot and converted to grid units.
  river: [[7.1, -2.8], [6.6, -1.1], [6.25, 0.9], [6.05, 2.9], [5.85, 4.8], [5.7, 6.6], [5.72, 8.2], [5.8, 9.9], [5.75, 12.3], [5.8, 14.8]],
};

// Berlin client: rank 1 at every point of the grid.
const berlinRows = [5, 9, 11, 11, 13, 13, 13, 13, 13, 11, 11, 9, 5];
export const berlin: RankMap = {
  city: 'Berlin',
  coords: '52.52° N, 13.40° E',
  origin: { r: 6, c: 6 },
  pins: berlinRows.flatMap((n, r) =>
    Array.from({ length: n }, (_, i) => ({ r, c: (13 - n) / 2 + i, before: 0, after: 1 })), // 0 = not checked yet
  ),
};

export function stats(map: RankMap, key: 'before' | 'after') {
  const v = map.pins.map((p) => p[key]);
  const top3 = v.filter((x) => x <= 3).length;
  const avg = v.reduce((a, b) => a + b, 0) / v.length;
  return { total: v.length, top3, avg };
}

/** Rank → pin color. The tracker's own code: red 20+, orange 10s, yellow mid, green top 3. */
export function rankColor(rank: number) {
  if (rank <= 0) return 'var(--pending)';
  if (rank >= 15) return 'var(--r20)';
  if (rank >= 8) return 'var(--r10)';
  if (rank >= 4) return 'var(--r5)';
  if (rank >= 2) return 'var(--r3)';
  return 'var(--r1)';
}
/** Text on the pin: white on red, ink on everything lighter (both pass AA). */
export const rankInk = (rank: number) => (rank >= 15 ? '#fff' : 'var(--ink)');
/** Pin label: an unchecked point (0) shows no number. */
export const rankText = (rank: number) => (rank > 0 ? String(rank) : '');

// The map strip inside the results-page figure: the three businesses Google shows under the map.
// Illustrative (not a scan), so it is never captioned as data.
export const packStrip: RankMap = {
  city: 'Pack',
  coords: '',
  origin: { r: 1, c: 6 },
  pins: [
    { r: 1, c: 6, before: 1, after: 1 },
    { r: 0, c: 9, before: 2, after: 2 },
    { r: 2, c: 3, before: 3, after: 3 },
  ],
  river: [[4.6, -1], [5.2, 1], [5.0, 3.2]],
};
