import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/shared/SiteHeader';
import { SiteFooter } from '@/components/shared/SiteFooter';

export const metadata: Metadata = {
  title: {
    default: 'SAK Football - 2026 NFL Mock Draft Site | Predict & Compete',
    template: '%s | SAK Football',
  },
  description: 'SAK Football is a free mock draft site for the 2026 NFL Draft. Submit your first-round predictions, compete on the leaderboard, create groups with friends. Plus draft prospects, big board rankings, and expert mock drafts.',
  keywords: ['SAK Football', 'mock draft', 'NFL mock draft', '2026 NFL Draft', 'mock draft site', 'draft predictions', 'NFL draft prospects', 'big board', 'fantasy football', 'NFL'],
  authors: [{ name: 'SAKFootball Team' }],
  creator: 'SAKFootball',
  publisher: 'SAKFootball',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sakfootball.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sakfootball.com',
    title: 'SAK Football - 2026 NFL Mock Draft Site | Predict & Compete',
    description: 'SAK Football is a free mock draft site. Submit your 2026 NFL Draft predictions and compete on the leaderboard.',
    siteName: 'SAKFootball',
    images: [
      {
        url: '/LOGO.png',
        width: 512,
        height: 512,
        alt: 'SAKFootball',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAK Football - 2026 NFL Mock Draft Site | Predict & Compete',
    description: 'SAK Football is a free mock draft site. Submit your 2026 NFL Draft predictions and compete on the leaderboard.',
    images: ['/LOGO.png'],
  },
  icons: {
    icon: '/LOGO.png',
    apple: '/LOGO.png',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://sakfootball.com/#organization',
        name: 'SAK Football',
        url: 'https://sakfootball.com',
        logo: { '@type': 'ImageObject', url: 'https://sakfootball.com/LOGO.png' },
        description: 'SAK Football is a free mock draft site for the 2026 NFL Draft. Submit predictions and compete on the leaderboard.',
      },
      {
        '@type': 'WebSite',
        '@id': 'https://sakfootball.com/#website',
        url: 'https://sakfootball.com',
        name: 'SAK Football',
        description: '2026 NFL Mock Draft site - Predict the first round, compete on the leaderboard, expert mock drafts and draft prospects.',
        publisher: { '@id': 'https://sakfootball.com/#organization' },
        potentialAction: {
          '@type': 'SearchAction',
          target: { '@type': 'EntryPoint', urlTemplate: 'https://sakfootball.com/search?q={search_term_string}' },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-6988824671874303" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-gray-50 font-sans">
        <div className="flex flex-col min-h-screen">
          <SiteHeader />
          <main className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
