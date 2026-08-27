import type { Metadata, Viewport } from 'next';
import { Archivo } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import SocialFabs from '@/components/SocialFabs';
import Reveal from '@/components/Reveal';

/**
 * One superfamily, two roles.
 *
 * Archivo is a variable grotesque with a real width axis (wdth 62–125), so
 * hierarchy comes from *width and weight within one voice* rather than two
 * competing personalities. Display type runs expanded (wdth 125) for the
 * machined, spec-sheet feel; body runs normal width. One font file, one
 * network request, and the pairing can never clash with itself.
 */
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
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
    <html lang="en" className={archivo.variable}>
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
