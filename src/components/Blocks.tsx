// Sections shared by the home page and the service pages.
import Link from 'next/link';
import { planRows, plans, plansNote, type Faq as FaqT, type Item } from '@/data/site';
import { RankMap } from './RankMap';
import { rankColor, rankInk, type RankMap as MapT } from '@/data/maps';

const isExternal = (href: string) => href.startsWith('http');

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return isExternal(href)
    ? <a className="link" href={href} target="_blank" rel="noopener">{children}<span className="sr-only"> (opens in a new tab)</span></a>
    : <Link className="link" href={href}>{children}</Link>;
}

/** Index list: rows of results, each with a green rank-1 pin. */
export function IndexList({ items }: { items: Item[] }) {
  return (
    <ol className="index">
      {items.map((it, i) => (
        <li key={it.title} className="index__row" data-reveal="up" data-delay={(i % 3) * 0.06}>
          <span className="index__pin"><span className="pin" aria-hidden="true">{i + 1}</span></span>
          <h3 className="index__title">{it.title}</h3>
          <div className="index__text">
            <p>{it.text}</p>
            {it.link && <TextLink href={it.link.href}>{it.link.label}</TextLink>}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Process: stops on a route. A real sequence, so the numbers carry meaning. */
export function Route({ steps }: { steps: Item[] }) {
  return (
    <ol className="route" data-route>
      <span className="route__line" aria-hidden="true" />
      {steps.map((s, i) => (
        <li key={s.title} className="route__stop">
          <span className="pin" aria-hidden="true">{i + 1}</span>
          <h3 className="route__title"><span className="sr-only">Step {i + 1}: </span>{s.title}</h3>
          <p className="route__text">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** featured: the plan this page's service lives in. note: what this page's service costs. */
export function Plans({ id = 'packages', featured = 'Advanced', note = plansNote }: { id?: string; featured?: string; note?: string }) {
  const cell = (v: string | boolean) =>
    typeof v === 'string' ? v
      : v ? <><span className="dot dot--on" aria-hidden="true" /><span className="sr-only">Included</span></>
        : <><span className="dot" aria-hidden="true" /><span className="sr-only">Not included</span></>;
  return (
    <section className="section section--airy" aria-labelledby={`${id}-h`} id={id}>
      <div className="grid">
        <div className="section-head plans__head">
          <h2 id={`${id}-h`} className="display h-xl" data-split="lines">Packages</h2>
          <p className="muted">{note}</p>
        </div>
        <ul className="plans">
          {plans.map((p) => (
            <li key={p.name} className={`plan ${p.name === featured ? 'plan--featured' : ''}`} data-reveal="up">
              <div className="plan__top">
                <h3 className="plan__name display">{p.name}</h3>
                <div className="plan__target">
                  <span className="pin" aria-hidden="true" style={{ background: p.ad ? 'var(--ink)' : rankColor(p.pin), color: p.ad ? 'var(--ground)' : rankInk(p.pin) }}>{p.ad ? 'Ad' : p.pin}</span>
                  <span className="label">{p.target}</span>
                </div>
              </div>
              <p className="plan__price">€{p.price.toLocaleString('en-US')}<small>per month</small></p>
              <p className="plan__promise">{p.promise}</p>
              <Link className="textlink" href={`/contact/?plan=${p.name}`} data-label="Contact">
                Choose {p.name} <span className="arrow" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="matrix" data-reveal="up">
          <table className="table matrix__table">
            <caption className="sr-only">What each package includes</caption>
            <thead>
              <tr>
                <th scope="col" className="label"><span className="sr-only">Feature</span></th>
                {plans.map((p) => <th key={p.name} scope="col" className="label">{p.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {planRows.map((r) => (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  {r.values.map((v, i) => <td key={i} data-col={plans[i].name}>{cell(v)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export function Faq({ heading, items, id = 'questions' }: { heading: string; items: FaqT[]; id?: string }) {
  return (
    <section className="section" aria-labelledby={`${id}-h`} id={id}>
      <div className="grid">
        <div className="faq__head">
          <h2 id={`${id}-h`} className="display h-l" data-split="lines">{heading}</h2>
        </div>
        <div className="faq__list">
          {items.map((f) => (
            <details key={f.q} className="faq__item">
              <summary>
                {f.q}
                <span className="faq__icon" aria-hidden="true">
                  <svg viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.6" /></svg>
                </span>
              </summary>
              <div className="faq__answer">
                <p>{f.a}</p>
                {f.link && <TextLink href={f.link.href}>{f.link.label}</TextLink>}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** A local results page, simplified: ads, the map pack, the regular results. "Your business"
 *  sits in the layer(s) this page's service wins; the others are generic competitors. */
export function Anatomy({ lit, caption, keyword = 'plumber near me', strip }: {
  lit: ('ads' | 'map' | 'organic')[]; caption: string; keyword?: string; strip: MapT;
}) {
  const on = (k: 'ads' | 'map' | 'organic') => lit.includes(k);
  const you = (k: 'ads' | 'map' | 'organic', i: number) => on(k) && i === 0;
  const name = (k: 'ads' | 'map' | 'organic', i: number) => (you(k, i) ? 'Your business' : `Plumber ${'ABC'[i]}`);
  return (
    <figure data-anatomy>
      <div className="anatomy" role="img" aria-label={`A simplified Google results page for “${keyword}”: sponsored ads on top, then the map with three businesses, then the regular website results. Your business sits in ${lit.map((l) => ({ ads: 'the ads', map: 'the map’s top 3', organic: 'the website results' })[l]).join(' and ')}.`}>
        <div className="anatomy__search" aria-hidden="true">
          <svg viewBox="0 0 16 16"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M11 11l4 4" stroke="currentColor" strokeWidth="1.6" /></svg>
          {keyword}
        </div>
        <div className="anatomy__layer" data-lit={String(on('ads'))} aria-hidden="true">
          <span className="anatomy__tag label">Google Ads</span>
          {[0, 1].map((i) => (
            <div key={i} className={`anatomy__row ${you('ads', i) ? 'is-you' : ''}`}>
              <span className="anatomy__ad">Ad</span>
              <span className="anatomy__text"><b>{name('ads', i)}</b> {i ? 'Book a plumber online' : 'Emergency plumber, call now'}</span>
            </div>
          ))}
        </div>
        <div className="anatomy__layer" data-lit={String(on('map'))} aria-hidden="true">
          <span className="anatomy__tag label">Map pack</span>
          <div className="anatomy__map">
            <RankMap map={strip} mode="drop" dims={{ cols: 13, rows: 3 }} label="" />
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className={`anatomy__row ${you('map', i) ? 'is-you' : ''}`}>
              <span className="pin anatomy__mini">{i + 1}</span>
              <span className="anatomy__text"><b>{name('map', i)}</b> {['Open now', 'Closes 18:00', 'Open 24 hours'][i]}</span>
            </div>
          ))}
        </div>
        <div className="anatomy__layer" data-lit={String(on('organic'))} aria-hidden="true">
          <span className="anatomy__tag label">Websites</span>
          {[0, 1, 2].map((i) => (
            <div key={i} className={`anatomy__site ${you('organic', i) ? 'is-you' : ''}`}>
              <span className="anatomy__url">{you('organic', i) ? 'yourbusiness.com' : `plumber-${'abc'[i]}.com`}</span>
              <span className="anatomy__text"><b>{name('organic', i)}</b> {['Plumber in your city', 'Repairs and installs', 'Prices and areas'][i]}</span>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="figcap">{caption}</figcaption>
    </figure>
  );
}
