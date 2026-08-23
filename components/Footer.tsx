import Link from 'next/link';
import { Logo } from './Logo';
import { site, whatsappUrl } from '@/lib/site';
import { WhatsAppIcon } from './Nav';

export default function Footer() {
  return (
    <footer id="contact" className="relative mt-24 border-t border-white/[0.06] bg-ink-950">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-ember-500/40 to-transparent" />

      {/* Company banner */}
      <div className="border-b border-white/[0.06] bg-gradient-to-b from-ink-900 to-ink-950">
        <div className="container-x py-8 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-bone-400 mb-2">A Company Of</div>
            <div className="font-display text-3xl md:text-4xl font-semibold text-ember-500 drop-shadow-[0_0_20px_rgba(225,29,46,0.35)] leading-none">
              CeyhedgesLanka <span className="text-ember-400">(Pvt) Ltd</span>
            </div>
            <div className="mt-3 text-sm text-bone-300">
              Home of <span className="text-white font-medium">Pioneer</span> tuk-tuk tyres &amp; <span className="text-white font-medium">Avis</span> tubes.
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              <WhatsAppIcon />
              WhatsApp {site.whatsapp}
            </a>
          </div>
        </div>
      </div>

      <div className="container-x py-14 md:py-16">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-6 text-bone-300 text-[15px] leading-relaxed max-w-md">
              Building tuk-tuk tyres and inner tubes for Sri Lanka&apos;s hardest roads since {site.since}.
              A focused range. A serious warranty.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow">Explore</div>
            <ul className="mt-5 space-y-3 text-[15px]">
              <li><Link href="/tyres" className="text-bone-100 hover:text-ember-400 transition-colors">All Products</Link></li>
              <li><Link href="/tyres?category=tyre" className="text-bone-100 hover:text-ember-400 transition-colors">Pioneer Tuk Tuk Tyres</Link></li>
              <li><Link href="/tyres?category=tube" className="text-bone-100 hover:text-ember-400 transition-colors">Avis Tubes</Link></li>
              <li><Link href="/#selector" className="text-bone-100 hover:text-ember-400 transition-colors">Product selector</Link></li>
              <li><Link href="/#why" className="text-bone-100 hover:text-ember-400 transition-colors">Why choose us</Link></li>
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
                <div className="text-bone-300 text-xs uppercase tracking-wider">Facebook</div>
                <a href={site.facebook} target="_blank" rel="noreferrer" className="hover:text-ember-400">Pioneer Tyres</a>
              </li>
              <li>
                <div className="text-bone-300 text-xs uppercase tracking-wider">Based in</div>
                <div>{site.address}</div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col-reverse gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-bone-400">
            © {new Date().getFullYear()} <span className="text-ember-500 font-semibold">CeyhedgesLanka (Pvt) Ltd</span>. All rights reserved.
          </p>
          <p className="text-xs text-bone-400">
            Made in Sri Lanka <span className="text-ember-500">●</span> Available since {site.since}.
          </p>
        </div>
      </div>
    </footer>
  );
}
