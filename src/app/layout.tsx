import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Motion } from '@/components/Motion';
import { site } from '@/data/site';
import { archivo } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || site.url), // SITE_URL lets previews and local QA resolve og.png
  title: { default: 'Marketing Agency Antwerp | Local SEO & Google Ads Agency', template: '%s' },
  description: site.description,
  alternates: { canonical: './' },
  openGraph: { type: 'website', siteName: site.name, locale: 'en_US' }, // image: app/opengraph-image.tsx
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#edefea' };

// Runs before first paint: hidden-until-revealed styles only apply when JS and motion are on.
const flags = `document.documentElement.classList.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['ProfessionalService', 'Organization'],
  '@id': `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  email: site.email,
  telephone: '+36305476488',
  priceRange: '€750 - €1990 per month',
  openingHours: 'Mo-Su 09:00-17:00',
  description: site.description,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    postalCode: '2000',
    addressLocality: 'Antwerpen',
    addressRegion: site.address.region,
    addressCountry: 'BE',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: flags }} />
      </head>
      <body>
        <a className="skip-link" href="#main" data-no-transition>Skip to content</a>
        <div id="curtain" aria-hidden="true"><div className="curtain__panel"><span className="curtain__label label" /></div></div>
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
        <Motion />
      </body>
    </html>
  );
}
