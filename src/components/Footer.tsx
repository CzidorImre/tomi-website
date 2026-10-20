import Link from 'next/link';
import { nav, site } from '@/data/site';

export function Footer() {
  return (
    <footer className="footer">
      <div className="grid">
        <div className="footer__cta">
          <Link href="/contact/" className="footer__biglink" data-label={site.cta}>
            <span className="footer__big display">
              <span className="footer__big-pin" aria-hidden="true"><span>1</span></span>
              <span className="footer__big-text">Get a free ranking check</span>
              <span className="footer__big-arrow" aria-hidden="true">→</span>
            </span>
          </Link>
          <div className="footer__meta">
            <p className="footer__sub">Tell us your business and main keyword. We map where you rank today and show you what we would fix first. Or call <a className="link num" href={site.phoneHref}>{site.phone}</a>.</p>
            <dl className="claims">
              <div><dt>Local businesses served</dt><dd className="num">{site.claims.clients}</dd></div>
              <div><dt>Years doing local SEO</dt><dd className="num">{site.claims.years}</dd></div>
            </dl>
          </div>
        </div>
        <div className="footer__cols">
          <div className="footer__col">
            <p className="label">Services</p>
            {nav.slice(0, 4).map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
          </div>
          <div className="footer__col">
            <p className="label">Talk to us</p>
            <a href={site.phoneHref} className="num">{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </div>
          <div className="footer__col">
            <p className="label">Office</p>
            <address>
              {site.address.street}<br />{site.address.city}<br />{site.address.country}
            </address>
          </div>
          <div className="footer__col">
            <p className="label">Hours</p>
            <p>{site.hours}</p>
          </div>
        </div>
        <div className="footer__small">
          <span>© {new Date().getFullYear()} {site.legalName}</span>
          <span>The Budapest and Berlin maps are real client scans, transcribed pin by pin.</span>
        </div>
      </div>
    </footer>
  );
}
