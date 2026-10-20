import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Anatomy, Faq, IndexList, Plans, Route, TextLink } from '@/components/Blocks';
import { Cta } from '@/components/Cta';
import { RankMap } from '@/components/RankMap';
import { berlin, packStrip } from '@/data/maps';
import { services, site } from '@/data/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: PageProps<'/[service]'>): Promise<Metadata> {
  const { service } = await params;
  const s = services.find((x) => x.slug === service);
  return s ? { title: { absolute: s.title }, description: s.description } : {};
}

export default async function Service({ params }: PageProps<'/[service]'>) {
  const { service } = await params;
  const s = services.find((x) => x.slug === service);
  if (!s) notFound();

  return (
    <>
      <section className="grid shero" aria-labelledby="s-h">
        <div className="shero__copy">
          <h1 id="s-h" className="shero__h1 display" data-split="lines" data-intro>{s.h1}</h1>
          <p className="lead">{s.lead}</p>
          <p className="muted shero__sub">{s.sub}</p>
          <div className="hero__actions">
            <Cta label={site.cta} />
            <a href={site.phoneHref} className="link num">Or call {site.phone}</a>
          </div>
        </div>
        <div className="shero__fig">
          {s.figure === 'berlin' ? (
            <figure>
              <RankMap map={berlin} mode="scan" duration={3.5} label={`Ranking map of a client over ${berlin.city}: rank 1 at all ${berlin.pins.length} grid points.`} />
              <figcaption className="figcap">{berlin.city}, {berlin.coords}. {s.figureCaption}</figcaption>
            </figure>
          ) : (
            <Anatomy lit={s.figure === 'ads' ? ['ads'] : ['organic']} caption={s.figureCaption} strip={packStrip} />
          )}
        </div>
      </section>

      <section className="section section--airy" aria-labelledby="intro-h">
        <div className="grid grid--rows">
          <h2 id="intro-h" className="intro2 display h-l" data-split="lines">{s.intro.h2}</h2>
          <div className="intro2__body">
            {s.intro.paras.map((p, i) => <p key={i} className={i === 0 ? 'h-m' : 'muted'} data-reveal="up">{p}</p>)}
            <dl className="facts" aria-label="What changes">
              {s.benefits.map((b) => (
                <div key={b.title}><dt>{b.title}</dt><dd>{b.text}</dd></div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="prob-h">
        <div className="grid grid--rows">
          <div className="problems__head">
            <h2 id="prob-h" className="display h-l" data-split="lines">{s.problems.h2}</h2>
            {s.problems.intro && <p className="muted">{s.problems.intro}</p>}
          </div>
          <ul className="problems__list">
            {s.problems.items.map((p) => (
              <li key={p.title} data-reveal="up">
                <span className="pin pin--red pin--x" aria-hidden="true"><svg viewBox="0 0 10 10"><path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.8" /></svg></span>
                <strong>{p.title}</strong>
                <p>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="inc-h">
        <div className="grid">
          <h2 id="inc-h" className="section-head display h-xl" data-split="lines">{s.included.h2}</h2>
          <IndexList items={s.included.items} />
        </div>
      </section>

      {s.table && (
        <section className="section" aria-labelledby="tbl-h">
          <div className="grid">
            <div className="stable">
              <div className="stable__head">
                <h2 id="tbl-h" className="display h-l" data-split="lines">{s.table.h2}</h2>
                {s.table.intro && <p className="muted">{s.table.intro}</p>}
              </div>
              <div className="stable__body">
                <table className="table">
                  <thead>
                    <tr>{s.table.head.map((h, i) => <th key={i} scope="col" className="label">{h || <span className="sr-only">Compared on</span>}</th>)}</tr>
                  </thead>
                  <tbody>
                    {s.table.rows.map((r) => (
                      <tr key={r[0]}><th scope="row">{r[0]}</th>{r.slice(1).map((c, i) => <td key={i} data-col={s.table!.head[i + 1]}>{c}</td>)}</tr>
                    ))}
                  </tbody>
                </table>
                {s.table.after && <p className="muted">{s.table.after}</p>}
              </div>
            </div>
          </div>
        </section>
      )}

      {s.extra && (
        <section className="section field" aria-labelledby="ext-h">
          <div className="grid grid--rows extra">
            <h2 id="ext-h" className="intro2 display h-l" data-split="lines">{s.extra.h2}</h2>
            <div className="intro2__body">
              {s.extra.paras.map((p, i) => <p key={i} className={i === 0 ? 'h-m' : 'muted'}>{p}</p>)}
              {s.extra.links && (
                <p className="extra__links">
                  {s.extra.links.map((l) => <TextLink key={l.href} href={l.href}>{l.label}</TextLink>)}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="section" aria-labelledby="proc-h">
        <div className="grid">
          <h2 id="proc-h" className="section-head display h-xl" data-split="lines">{s.process.h2}</h2>
          <Route steps={s.process.steps} />
          <div className="who">
            <h2 className="who__h display h-l">Who it’s for</h2>
            <ul className="who__list">{s.who.map((w) => <li key={w}>{w}</li>)}</ul>
          </div>
        </div>
      </section>

      <Plans featured={s.plans?.featured} note={s.plans?.note} />
      <Faq heading={s.faqH} items={s.faq} />
    </>
  );
}
