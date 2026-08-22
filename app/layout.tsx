import type { Metadata, Viewport } from 'next';
import { Cormorant, Manrope } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import Reveal from '@/components/Reveal';

const display = Cormorant({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pioneer Cooper Tyres — Built for Sri Lanka. Trusted by every road.',
  description:
    'Premium high-durability tyres for motorbikes and tuk-tuks. Engineered in Sri Lanka for Sri Lankan roads. Explore the range and find your fit.',
  metadataBase: new URL('https://pioneercooper.lk'),
  openGraph: {
    title: 'Pioneer Cooper Tyres',
    description: 'Built for Sri Lanka. Trusted by every road.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050506',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        <Reveal />
        <Nav />
        <main className="relative">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
