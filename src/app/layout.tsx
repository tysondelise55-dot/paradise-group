import type { Metadata, Viewport } from 'next';
import { Archivo, JetBrains_Mono } from 'next/font/google';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { JsonLd } from '@/components/JsonLd';
import { MobileBar } from '@/components/MobileBar';
import { SiteEffects } from '@/components/SiteEffects';
import { pageMeta } from '@/lib/data';
import { OG_IMAGE, SITE_NAME, SITE_URL, siteJsonLd } from '@/lib/seo';
import './globals.css';

// Archivo with its width axis: condensed for display (the DIN club look of the old site), normal for text
const archivo = Archivo({ subsets: ['latin'], axes: ['wdth'], variable: '--font-archivo', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['500'], variable: '--font-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: pageMeta.home.metaTitle, template: `%s | ${SITE_NAME}` },
  description: pageMeta.home.description,
  applicationName: SITE_NAME,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'en_US',
    url: '/',
    title: pageMeta.home.title,
    description: pageMeta.home.description,
    images: [OG_IMAGE],
  },
  twitter: { card: 'summary_large_image', title: pageMeta.home.title, description: pageMeta.home.description, images: [OG_IMAGE.url] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: '#0d0d1a',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

/* JS gate (build-website motion.md): marks <html> as js before paint; if the app
   never initialises within 4s, falls back to no-js/no-anim so nothing can stay
   hidden. CSS never hides content; GSAP sets initial states. */
const GATE = `(function(){var h=document.documentElement;h.className=h.className.replace('no-js','js');window.__siteFailsafe=setTimeout(function(){if(!h.classList.contains('is-ready')){h.classList.remove('js');h.classList.add('no-js','no-anim')}},4000)})();`;

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`no-js ${archivo.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: GATE }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBar />
        <SiteEffects />
        <JsonLd data={siteJsonLd()} />
      </body>
    </html>
  );
}
