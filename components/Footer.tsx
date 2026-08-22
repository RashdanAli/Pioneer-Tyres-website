import Link from 'next/link';
import { Logo } from './Logo';
import { site, whatsappUrl } from '@/lib/site';
import { WhatsAppIcon } from './Nav';

export default function Footer() {
  return (
    <footer id="contact" className="relative mt-24 border-t border-white/[0.06] bg-ink-950">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-ember-500/40 to-transparent" />
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-6 text-bone-300 text-[15px] leading-relaxed max-w-md">
              Pioneer Tyre has been building tuk-tuk tyres and inner tubes for Sri Lanka&apos;s
              hardest roads since {site.since}. A focused range. A serious warranty.
            </p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-8"
            >
              <WhatsAppIcon />
              WhatsApp us on {site.whatsapp}
            </a>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow">Explore</div>
            <ul className="mt-5 space-y-3 text-[15px]">
              <li><Link href="/tyres" className="text-bone-100 hover:text-ember-400 transition-colors">All Products</Link></li>
              <li><Link href="/tyres?category=tyre" className="text-bone-100 hover:text-ember-400 transition-colors">Tuk-Tuk Tyres</Link></li>
              <li><Link href="/tyres?category=tube" className="text-bone-100 hover:text-ember-400 transition-colors">Inner Tubes</Link></li>
              <li><Link href="/#selector" className="text-bone-100 hover:text-ember-400 transition-colors">Product selector</Link></li>
              <li><Link href="/#why" className="text-bone-100 hover:text-ember-400 transition-colors">Why Pioneer Tyre</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow">Contact</div>
            <ul className="mt-5 space-y-3 text-[15px] text-bone-100">
              <li>
                <div className="text-bone-300 text-xs uppercase tracking-wider">WhatsApp / Phone</div>
                <a href={`tel:${site.phone.replace(/\s/g,'')}`} className="hover:text-ember-400">{site.phone}</a>
              </li>
              <li>
                <div className="text-bone-300 text-xs uppercase tracking-wider">Email</div>
                <a href={`mailto:${site.email}`} className="hover:text-ember-400">{site.email}</a>
              </li>
              <li>
                <div className="text-bone-300 text-xs uppercase tracking-wider">Based in</div>
                <div>{site.address}</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-bone-400">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="text-xs text-bone-400">
            Made in Sri Lanka <span className="text-ember-500">●</span> Available since {site.since}.
          </p>
        </div>
      </div>
    </footer>
  );
}
