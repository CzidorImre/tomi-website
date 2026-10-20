import type { Metadata } from 'next';
import { Cta } from '@/components/Cta';
import { RankMap } from '@/components/RankMap';
import { budapest } from '@/data/maps';

export const metadata: Metadata = {
  title: { absolute: 'Page not found | Get Effective Marketing' },
  description: 'This page does not exist. Head back to the homepage or ask for a free ranking check.',
  robots: { index: false },
};

// The same grid, ranked 20 or lower everywhere: an illustration, not a client scan.
const nowhere = { ...budapest, river: budapest.river, pins: budapest.pins.map((p) => ({ ...p, before: 20, after: 20 })) };

export default function NotFound() {
  return (
    <section className="grid lost" aria-labelledby="nf-h">
      <div className="lost__copy">
        <p className="label muted">Error 404</p>
        <h1 id="nf-h" className="display h-xl" data-split="lines" data-intro>This page ranks nowhere.</h1>
        <p className="lead">Not on the map, not on page 2. The link is probably old, or the page moved.</p>
        <div className="hero__actions">
          <Cta href="/" label="Back to the homepage" />
        </div>
      </div>
      <div className="lost__map">
        <RankMap map={nowhere} mode="drop" label="An illustrative ranking map where every point reads 20 or lower." />
      </div>
    </section>
  );
}
