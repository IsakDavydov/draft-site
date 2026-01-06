import type { Metadata } from 'next';
import { Inter, Urbanist } from 'next/font/google';
import './globals.css';
import { SiteHeader } from '@/components/shared/SiteHeader';
import { SiteFooter } from '@/components/shared/SiteFooter';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const urbanist = Urbanist({ 
  subsets: ['latin'],
  variable: '--font-urbanist',
});

export const metadata: Metadata = {
  title: {
    default: 'SAKFootball - NFL Analysis, Fantasy, Draft & Picks',
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
    title: 'SAKFootball - NFL Analysis, Fantasy, Draft & Picks',
    description: 'Comprehensive NFL coverage including season analysis, fantasy rankings, draft prospects, and weekly picks.',
    siteName: 'SAKFootball',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SAKFootball - NFL Analysis & Insights',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAKFootball - NFL Analysis, Fantasy, Draft & Picks',
    description: 'Comprehensive NFL coverage including season analysis, fantasy rankings, draft prospects, and weekly picks.',
    images: ['/og-image.jpg'],
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
    <html lang="en" className={`${inter.variable} ${urbanist.variable}`}>
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
