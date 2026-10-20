// The driver. One function, apply(), sets every pin from the same few numbers:
//   p        the scan, before → after: plays on its own slow clock once the map is on screen
//   appear   the intro, pins drop in radiating from the business's own pin
//   ring     the idle scan ring that leaves the origin every few seconds
//   pointer  pins near the cursor lift a little (fine pointers only)
// Readouts (average rank, top-3 count, status line, before/after toggle) read the same pin state,
// so the numbers and the map can never disagree.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage, isTouch, prefersReducedMotion, scrollState } from '@/engine';
import { rankColor, rankInk, rankText } from '@/data/maps';

gsap.registerPlugin(ScrollTrigger);

type Pin = {
  g: SVGGElement; c: SVGCircleElement; t: SVGTextElement;
  x: number; y: number; before: number; after: number; d: number;
  shown: number; s: number;
};

const WAVE = 0.32; // width of the scan wavefront, in progress units
const RING_PERIOD = 4.2; // seconds between scan rings
const RING_TRAVEL = 3.2; // seconds a ring takes to cross the map
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const pop = gsap.parseEase('back.out(2.2)');

function setupMap(root: HTMLElement, intro: gsap.core.Timeline) {
  const reduced = prefersReducedMotion();
  const scan = root.dataset.rankmap === 'scan';
  const bumpAmt = isTouch() ? 0 : 0.24; // phones skip the per-pin lift during the scan: colour and number carry it
  const svg = root.querySelector('svg')!;
  const ring = svg.querySelector<SVGCircleElement>('[data-ring]')!;
  const ox = +ring.getAttribute('cx')!;
  const oy = +ring.getAttribute('cy')!;
  const pins: Pin[] = [...svg.querySelectorAll<SVGGElement>('.rankmap__pin')].map((g) => ({
    g, c: g.querySelector('circle')!, t: g.querySelector('text')!,
    x: +g.dataset.x!, y: +g.dataset.y!, before: +g.dataset.before!, after: +g.dataset.after!, d: +g.dataset.d!,
    shown: NaN, s: -1,
  }));
  const maxD = Math.max(1, ...pins.map((p) => Math.hypot(p.x - ox, p.y - oy)));

  const section = root.closest<HTMLElement>('[data-scan]');
  const out = {
    avg: section?.querySelector<HTMLElement>('[data-readout="avg"]'),
    top3: section?.querySelector<HTMLElement>('[data-readout="top3"]'),
    status: section?.querySelector<HTMLElement>('[data-readout="status"]'),
    toggles: [...(section?.querySelectorAll<HTMLButtonElement>('[data-scan-to]') ?? [])],
  };
  const last = { avg: '', top3: '', after: null as boolean | null };

  const st = { p: reduced ? 1 : 0, appear: reduced ? 1 : 0, ringR: -1, px: 0, py: 0, near: 0, nearTo: 0 };

  function readout() {
    if (!scan) return;
    const avg = pins.reduce((a, p) => a + p.shown, 0) / pins.length;
    const avgText = avg >= 19.5 ? '20+' : avg.toFixed(1);
    const top3 = String(pins.filter((p) => p.shown <= 3).length);
    if (out.avg && avgText !== last.avg) out.avg.textContent = last.avg = avgText;
    if (out.top3 && top3 !== last.top3) out.top3.textContent = last.top3 = top3;
    const after = st.p >= 0.5;
    if (after !== last.after) {
      last.after = after;
      if (out.status) out.status.textContent = (after ? out.status.dataset.after : out.status.dataset.before) || '';
      out.toggles.forEach((b) => b.setAttribute('aria-pressed', String((b.dataset.scanTo === '1') === after)));
    }
  }

  function apply() {
    const front = st.p * (1 + WAVE);
    for (const p of pins) {
      const k = scan ? clamp01((front - p.d) / WAVE) : 1;
      const rank = Math.round(p.before + (p.after - p.before) * k);
      if (rank !== p.shown) {
        p.shown = rank;
        p.t.textContent = rankText(rank);
        p.c.style.fill = rankColor(rank);
        p.t.style.fill = rankInk(rank);
      }
      const a = pop(clamp01((st.appear * 1.7 - p.d) / 0.7));
      const bump = scan && bumpAmt ? bumpAmt * Math.sin(Math.PI * k) : 0;
      const dist = Math.hypot(p.x - ox, p.y - oy) / maxD;
      const ringLift = st.ringR >= 0 ? 0.16 * Math.exp(-(((dist - st.ringR) / 0.07) ** 2)) : 0;
      const near = st.near > 0.01 ? st.near * 0.16 * Math.exp(-((Math.hypot(p.x - st.px, p.y - st.py) / 75) ** 2)) : 0;
      const s = a * (1 + bump + ringLift + near);
      if (Math.abs(s - p.s) > 0.002) {
        p.s = s;
        p.g.setAttribute('transform', `translate(${p.x} ${p.y}) scale(${s.toFixed(3)})`);
      }
    }
    readout();
  }

  apply();
  pins.forEach((p) => (p.g.style.visibility = 'visible'));
  const offs: (() => void)[] = [];

  // The scan plays on its own clock: the red city holds, then the wave crosses it slowly.
  // It starts once the intro has dropped the pins AND the map is on screen (phones scroll to it).
  let scanTween: gsap.core.Tween | null = null;
  const runTo = (to: number, duration: number, delay = 0) => {
    scanTween?.kill();
    scanTween = gsap.to(st, { p: to, duration, delay, ease: 'power1.inOut', onUpdate: apply });
  };
  out.toggles.forEach((b) => {
    const go = () => {
      const to = b.dataset.scanTo === '1' ? 1 : 0;
      if (reduced) { scanTween?.kill(); st.p = to; apply(); }
      else runTo(to, 1.5 + 3 * Math.abs(to - st.p));
    };
    b.addEventListener('click', go);
    offs.push(() => b.removeEventListener('click', go));
  });

  if (reduced) { apply(); return () => offs.forEach((f) => f()); }

  // Intro: pins drop in, radiating from the origin.
  // The home scan keeps the slow pace the owner asked for; secondary scans (data-duration) are brisk.
  const slow = scan && !root.dataset.duration;
  const dropIn = slow ? 2.2 : 1.4;
  intro.add(gsap.to(st, { appear: 1, duration: dropIn, ease: 'none', onUpdate: apply }), 0.2);

  if (scan) {
    const ready = { intro: false, seen: false, done: false };
    const start = () => {
      if (ready.done || !ready.intro || !ready.seen) return;
      ready.done = true;
      runTo(1, +(root.dataset.duration || 6.5), slow ? 0.8 : 0);
    };
    intro.add(() => { ready.intro = true; start(); }, slow ? 2.2 : 0.6);
    ScrollTrigger.create({ trigger: root, start: 'top 75%', once: true, onEnter: () => { ready.seen = true; start(); } });
  }

  // Pointer: pins near the cursor lift.
  if (!isTouch()) {
    const move = (e: PointerEvent) => {
      const m = svg.getScreenCTM();
      if (!m) return;
      const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
      st.px = pt.x; st.py = pt.y; st.nearTo = 1;
    };
    const leave = () => { st.nearTo = 0; };
    svg.addEventListener('pointermove', move);
    svg.addEventListener('pointerleave', leave);
    offs.push(() => { svg.removeEventListener('pointermove', move); svg.removeEventListener('pointerleave', leave); });
  }

  // Idle: a scan ring every few seconds, on the one clock, only while the map is on screen.
  const tick = (time: number) => {
    if (Math.abs(scrollState().velocity) > 0.2) return; // idle means idle: scrolling gets the frame budget
    const phase = (time % RING_PERIOD) / RING_TRAVEL;
    st.ringR = phase <= 1 ? phase * 1.12 : -1;
    ring.setAttribute('r', String(st.ringR >= 0 ? st.ringR * maxD : 0));
    ring.style.opacity = String(st.ringR >= 0 ? 0.55 * (1 - phase) : 0);
    st.near += (st.nearTo - st.near) * (1 - Math.pow(0.88, gsap.ticker.deltaRatio()));
    apply();
  };
  const vis = ScrollTrigger.create({
    trigger: root, start: 'top bottom', end: 'bottom top',
    onToggle: (self) => (self.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
  });
  if (vis.isActive) gsap.ticker.add(tick);
  offs.push(() => gsap.ticker.remove(tick));

  return () => offs.forEach((f) => f());
}

export function startScan() {
  onPage(({ intro }) => {
    const maps = [...document.querySelectorAll<HTMLElement>('[data-rankmap]')];
    if (!maps.length) return;
    const offs = maps.map((m) => setupMap(m, intro));
    return () => offs.forEach((f) => f());
  });
}
