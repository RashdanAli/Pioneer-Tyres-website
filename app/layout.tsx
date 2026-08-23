import type { Metadata, Viewport } from 'next';
import { Cormorant, Manrope } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import SocialFabs from '@/components/SocialFabs';
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
  title: 'Pioneer Tyre — Built for Sri Lanka. Trusted by every road.',
  description:
    'High-durability tuk-tuk tyres and universal inner tubes. Available in Sri Lanka since 2000.',
  metadataBase: new URL('https://pioneertyre.lk'),
  openGraph: {
    title: 'Pioneer Tyre',
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
        <SocialFabs />
      </body>
    </html>
  );
}
