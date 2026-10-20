// Global motion for this site: runs once on the client, before the first page initializes.
import { gsap } from 'gsap';
import { ease, isTouch, onPage, onScroll, prefersReducedMotion, setTransition } from '@/engine';
import { startScan } from './scan';

// Page transition: a navy scan ring radiates from the click point and carries the destination's
// name, then contracts into the new page.
function scanTransition() {
  let point = { x: innerWidth / 2, y: innerHeight / 2 };
  let label = '';
  addEventListener('pointerdown', (e) => { point = { x: e.clientX, y: e.clientY }; }, true);
  addEventListener('click', (e) => {
    const a = (e.target as Element).closest('a');
    label = a?.dataset.label || (a?.querySelector('.roll > span') ?? a)?.textContent?.trim() || ''; // .roll holds a duplicate label
  }, true);
  setTransition({
    leave: (c) => {
      const panel = c.querySelector<HTMLElement>('.curtain__panel')!;
      const text = c.querySelector<HTMLElement>('.curtain__label')!;
      text.textContent = label;
      return gsap.timeline()
        .set(c, { autoAlpha: 1 })
        .fromTo(panel, { clipPath: `circle(0% at ${point.x}px ${point.y}px)` },
          { clipPath: `circle(150% at ${point.x}px ${point.y}px)`, duration: 0.85, ease: ease.inOut })
        .fromTo(text, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: ease.soft }, 0.45);
    },
    enter: (c) => gsap.timeline()
      .to(c.querySelector('.curtain__label'), { autoAlpha: 0, duration: 0.25 })
      .to(c.querySelector('.curtain__panel'), { clipPath: 'circle(0% at 50% 45%)', duration: 0.85, ease: ease.inOut }, 0.05)
      .set(c, { autoAlpha: 0 }),
  });
}

// Primary buttons: a green disc radiates from where the pointer enters; CSS rolls the label and
// ticks the pin from 3 to 1 while .is-filled is on.
function buttonFill() {
  onPage(() => {
    if (isTouch() || prefersReducedMotion()) return;
    const off: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>('[data-fill]').forEach((btn) => {
      const fill = btn.querySelector<HTMLElement>('.btn__fill');
      if (!fill) return;
      const at = (e: PointerEvent) => { const r = btn.getBoundingClientRect(); return `${e.clientX - r.left}px ${e.clientY - r.top}px`; };
      let closed = true;
      const open = (p: string) => {
        if (closed) gsap.set(fill, { clipPath: `circle(0% at ${p})` });
        closed = false;
        btn.classList.add('is-filled');
        gsap.to(fill, { clipPath: `circle(150% at ${p})`, duration: 0.6, ease: ease.soft, overwrite: true });
      };
      const close = (p: string) => {
        btn.classList.remove('is-filled');
        gsap.to(fill, { clipPath: `circle(0% at ${p})`, duration: 0.45, ease: ease.soft, overwrite: true, onComplete: () => { closed = true; } });
      };
      const enter = (e: PointerEvent) => open(at(e));
      const leave = (e: PointerEvent) => close(at(e));
      btn.addEventListener('pointerenter', enter);
      btn.addEventListener('pointerleave', leave);
      off.push(() => { btn.removeEventListener('pointerenter', enter); btn.removeEventListener('pointerleave', leave); });
    });
    return () => off.forEach((f) => f());
  });
}

// The header steps aside while reading down and comes back on the way up.
function frameAway() {
  let last = 0;
  onScroll(({ y }) => {
    if (Math.abs(y - last) < 6) return;
    document.documentElement.classList.toggle('frame-away', y > 200 && y > last);
    last = y;
  });
}

// The route line draws itself when a process section comes into view.
function routes() {
  onPage(() => {
    if (prefersReducedMotion()) return;
    document.querySelectorAll<HTMLElement>('[data-route]').forEach((route) => {
      const line = route.querySelector('.route__line');
      const stops = route.querySelectorAll('.route__stop .pin');
      const vertical = matchMedia('(max-width: 900px)').matches;
      gsap.timeline({ scrollTrigger: { trigger: route, start: 'top 80%', once: true } })
        .from(line, { [vertical ? 'scaleY' : 'scaleX']: 0, transformOrigin: vertical ? 'top' : 'left', duration: 1.4, ease: ease.inOut })
        .from(stops, { scale: 0, duration: 0.6, ease: ease.spring, stagger: 0.18 }, 0.15);
    });
  });
}

// The results-page figure: this page's layer drops into its place on the page, like a result landing.
function anatomy() {
  onPage(({ intro }) => {
    const layers = document.querySelectorAll<HTMLElement>('[data-anatomy] [data-lit="true"]');
    if (!layers.length) return;
    gsap.set(layers, { visibility: 'visible' });
    if (prefersReducedMotion()) return;
    gsap.set(layers, { y: -28, autoAlpha: 0 });
    intro.add(gsap.to(layers, { y: 0, autoAlpha: 1, duration: 0.9, ease: ease.spring, stagger: 0.12 }), 0.45);
  });
}

export function setupMotion() {
  scanTransition();
  buttonFill();
  frameAway();
  routes();
  startScan();
  anatomy();
}
