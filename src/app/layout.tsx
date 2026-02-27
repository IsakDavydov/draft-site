import type { Metadata } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/shared/SiteHeader';
import { SiteFooter } from '@/components/shared/SiteFooter';

export const metadata: Metadata = {
  title: {
    default: 'SAKFootball - Submit Your 2026 Mock Draft & Compete',
    template: '%s | SAKFootball',
  },
  description: 'Comprehensive NFL coverage including season analysis, fantasy rankings, draft prospects, and weekly picks. Your go-to source for football insights.',
  keywords: ['NFL', 'football', 'fantasy', 'draft', 'betting', 'analysis', 'rankings'],
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
    title: 'SAKFootball - Submit Your 2026 Mock Draft & Compete',
    description: 'Comprehensive NFL coverage including season analysis, fantasy rankings, draft prospects, and weekly picks.',
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
    title: 'SAKFootball - Submit Your 2026 Mock Draft & Compete',
    description: 'Comprehensive NFL coverage including season analysis, fantasy rankings, draft prospects, and weekly picks.',
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
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-6988824671874303" />
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
