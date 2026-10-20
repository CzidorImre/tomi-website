import type { Metadata } from 'next';
import { Anatomy, Faq, IndexList, Plans, Route, TextLink } from '@/components/Blocks';
import { Cta } from '@/components/Cta';
import { RankMap } from '@/components/RankMap';
import { budapest, packStrip, stats } from '@/data/maps';
import { home, site } from '@/data/site';

export const metadata: Metadata = {
  title: { absolute: home.title },
  description: home.description,
};

const before = stats(budapest, 'before');
const after = stats(budapest, 'after');
const avg = (v: number) => (v >= 19.5 ? '20+' : v.toFixed(1));

export default function Home() {
  return (
    <>
      {/* 1. The scan: the city turns from red to green on its own clock once the map is on screen */}
      <section className="hero" data-scan aria-labelledby="hero-h">
        <div className="hero__copy">
          <h1 id="hero-h" className="hero__h1 display" data-split="lines" data-intro>{home.h1}</h1>
          <p className="lead">{home.lead}</p>
          <div className="hero__actions">
            <Cta label={site.cta} />
            <a href={site.phoneHref} className="link num">Or call {site.phone}</a>
          </div>
        </div>
        <div className="hero__track">
          <div className="hero__stage">
            <div className="hero__map">
              <RankMap
                map={budapest}
                mode="scan"
                state="before"
                label={`Ranking map of one client over ${budapest.city}, ${before.total} grid points. Before: 20th or lower at ${before.total - 1} points and 11th at their own location. After: top 3 at ${after.top3} points, average rank ${avg(after.avg)}.`}
              />
            </div>
            <div className="readout">
              <div className="readout__cell">
                <span className="label muted">Average rank</span>
                <span className="readout__value" data-readout="avg" aria-hidden="true">{avg(before.avg)}</span>
                <span className="readout__note">from {avg(before.avg)} to {avg(after.avg)}</span>
              </div>
              <div className="readout__cell">
                <span className="label muted">Top 3 at</span>
                <span className="readout__value"><span data-readout="top3" aria-hidden="true">{before.top3}</span><small>of {after.total}</small></span>
                <span className="readout__note">from {before.top3} to {after.top3} points</span>
              </div>
              <div className="readout__aside">
                <div className="toggle" role="group" aria-label="Show the map">
                  <button type="button" data-scan-to="0" aria-pressed="true">Before</button>
                  <button type="button" data-scan-to="1" aria-pressed="false">After</button>
                </div>
                <p className="readout__status" data-readout="status" data-before={home.map.before} data-after={home.map.after} aria-live="polite">{home.map.before}</p>
              </div>
              <p className="mapcap">
                <span className="label">{home.map.label}</span>
                <span>{budapest.city}, {budapest.coords}. {home.map.caption}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Statement + the three ranking factors as type */}
      <section className="section section--airy" aria-labelledby="what-h">
        <div className="grid">
          <h2 id="what-h" className="sr-only">{home.what.h2}</h2>
          <p className="statement" data-split="lines">{home.what.statement}</p>
          <div className="factors" role="group" aria-labelledby="factors-h">
            <h3 id="factors-h" className="factors__h label muted">{home.what.factorsH}</h3>
            {home.what.factors.map((f) => (
              <div key={f.title} className={`factor ${f.title === 'Distance' ? 'factor--fixed' : ''}`}>
                <p className="factor__word display" data-split="lines">{f.title}</p>
                <p className="factor__text">{f.text}</p>
              </div>
            ))}
          </div>
          <div className="factors-foot">
            <p>{home.what.after}</p>
            <TextLink href={home.what.source.href}>{home.what.source.label}</TextLink>
          </div>
        </div>
      </section>

      {/* 3. Index list */}
      <section className="section" aria-labelledby="inc-h">
        <div className="grid">
          <h2 id="inc-h" className="section-head display h-xl" data-split="lines">{home.included.h2}</h2>
          <IndexList items={home.included.items} />
        </div>
      </section>

      {/* 4. Where each service lives on the results page + SEO vs Ads */}
      <section className="section" aria-labelledby="cmp-h">
        <div className="grid grid--rows">
          <div className="compare__fig" data-reveal="up">
            <Anatomy lit={['map', 'organic']} caption={home.compare.figure} strip={packStrip} />
          </div>
          <div className="compare__body">
            <h2 id="cmp-h" className="display h-xl" data-split="lines">{home.compare.h2}</h2>
            <table className="table">
              <thead>
                <tr>{home.compare.head.map((h, i) => <th key={i} scope="col" className="label">{h || <span className="sr-only">Compared on</span>}</th>)}</tr>
              </thead>
              <tbody>
                {home.compare.rows.map((r) => (
                  <tr key={r[0]}><th scope="row">{r[0]}</th><td data-col={home.compare.head[1]}>{r[1]}</td><td data-col={home.compare.head[2]}>{r[2]}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="muted">
              Need calls this week? <TextLink href="/google-ads-management/">Google Ads management</TextLink> fills the gap while your local SEO builds up. And if your website is slowing you down, our <TextLink href="/wordpress-web-design/">WordPress web design</TextLink> fixes that too.
            </p>
          </div>
        </div>
      </section>

      {/* 5. The one dark field */}
      <section className="field" aria-labelledby="rules-h">
        <div className="grid rules">
          <h2 id="rules-h" className="rules__h label">{home.rules.h2}</h2>
          <ul className="rules__lines display">
            {home.rules.lines.map((l) => (
              <li key={l} className="rules__line" data-reveal="up">
                <span className="rules__x" aria-hidden="true"><svg viewBox="0 0 10 10"><path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.8" /></svg></span>
                {l}
              </li>
            ))}
          </ul>
          <p className="rules__text muted">{home.rules.text}</p>
        </div>
      </section>

      {/* 6. Process as a route, who it's for */}
      <section className="section" aria-labelledby="proc-h" id="process">
        <div className="grid">
          <h2 id="proc-h" className="section-head display h-xl" data-split="lines">{home.process.h2}</h2>
          <Route steps={home.process.steps} />
          <div className="who">
            <h2 className="who__h display h-l">{home.who.h2}</h2>
            <ul className="who__list">{home.who.items.map((w) => <li key={w}>{w}</li>)}</ul>
          </div>
        </div>
      </section>

      <Plans />
      <Faq heading="Local SEO questions" items={home.faq} />
    </>
  );
}
