import Link from 'next/link';
import { WhatsAppIcon } from './Nav';
import { whatsappUrl } from '@/lib/site';

export default function CtaBanner() {
  return (
    <section className="relative py-16 md:py-24 plate-raised">
      {/* Implied light source #3 — settles centre, under the final CTA. */}
      <div className="ambient ambient-center" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px hairline" aria-hidden="true" />
      <div className="container-x">
        <div className="reveal relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-br from-ink-800 via-ink-800 to-ink-700 p-10 md:p-16">
          {/* Glow */}
          <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-ember-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 -left-20 w-80 h-80 rounded-full bg-ember-700/20 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
               style={{
                 backgroundImage:
                   'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                 backgroundSize: '40px 40px',
               }}
          />

          <div className="relative grid gap-8 lg:grid-cols-12 items-center">
            <div className="lg:col-span-8">
              <div className="eyebrow">Ready to ride?</div>
              <h2 className="display-caps text-display-lg mt-4 text-balance">
                <span className="block reveal-mask reveal-delay-1">Message us on WhatsApp.</span>
                <span className="block reveal-mask reveal-delay-2 text-ember-500">
                  Get a quote in minutes.
                </span>
              </h2>
              <p className="mt-5 text-lg text-bone-300 max-w-2xl text-pretty">
                Tell us your bike or tuk-tuk model and how you ride — our team will match you to the exact tyre
                and connect you to your nearest dealer.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3 lg:items-end">
              <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="btn-primary w-full lg:w-auto justify-center">
                <WhatsAppIcon />
                WhatsApp us now
              </a>
              <Link href="/tyres" className="btn-ghost w-full lg:w-auto justify-center">
                Browse tyres
              </Link>
              <p className="text-xs text-bone-400 mt-2">Replies within 15 minutes · Mon–Sat</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
