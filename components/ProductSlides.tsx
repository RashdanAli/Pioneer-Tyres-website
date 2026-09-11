import { SqueezeDeck, type DeckSlide } from '@/components/ui/squeeze-deck';

/* One caption per slide, in deck order. Title reads in white, the rest runs
   on in muted grey underneath the row. */
const captions: [title: string, description: string][] = [
  ['Product awareness: tyres.', 'The Ceyhedges range, starting with what keeps you rolling.'],
  ['Pioneer Tuk Tuk Tyres.', 'Heavy-load carcass and all-terrain grip, made for the daily hustle on Sri Lankan roads.'],
  ['Avis Tubes.', 'Airtight butyl-rubber inner tubes with universal fitment and a 3-year warranty.'],
  ['Avon Tyres for performance cars.', 'UK-engineered tyres for drivers who want grip and precise steering.'],
  ['Avon Tyres for 4x4 and SUV.', 'Tread patterns built for off-road traction without giving up on-road comfort.'],
  ['Avon special features.', 'High-silica compounds, aquaplaning resistance and rim protection, with OE fitment on premium marques.'],
  ['Ornet truck and bus radials.', 'Radial tyres for heavy commercial fleets that cover serious distance.'],
  ['Ornet agriculture tyres.', 'Deep-lug tyres for tractors and two-wheel tractors working the field.'],
  ['Product awareness: spare parts.', 'Genuine Delphi components, alongside HOK suspension parts.'],
  ['Delphi oil filters.', 'Clean oil, protected engines — genuine Delphi filtration.'],
  ['Delphi brake pads.', 'Consistent stopping power from a name workshops trust.'],
  ['Delphi fuel pumps.', 'Steady fuel delivery for dependable starts and smooth running.'],
  ['Delphi shock absorbers.', 'Ride control that keeps tyres planted on rough roads.'],
  ['Delphi glow plugs.', 'Fast, reliable cold starts for diesel engines.'],
  ['Delphi compressors.', 'Air-conditioning compressors built to keep the cabin cool.'],
  ['HOK suspensions.', 'Where every ball joint, link and rod sits on the car — and the signs one is wearing out.'],
  ['The HOK suspension range.', 'Ball joints, rack ends, tie rod ends, stabilizer links, side rods and drag links.'],
];

const slides: DeckSlide[] = captions.map(([title, description], i) => ({
  src: `/images/slides/slide-${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `Slide ${i + 1} of ${captions.length}: ${title}`,
  title,
  description,
}));

/* How long each slide stays open before the deck steps on. */
const INTERVAL_MS = 3900;

export default function ProductSlides() {
  return (
    <section id="presentation" className="relative py-24 md:py-32 plate-base">
      <div className="ambient ambient-center" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px hairline" aria-hidden="true" />

      <div className="container-x relative">
        <div className="max-w-2xl">
          <div className="reveal eyebrow">Product Awareness</div>
          <h2 className="display-caps text-display-lg mt-4 text-balance">
            <span className="block reveal-mask reveal-delay-1">The full story,</span>
            <span className="block reveal-mask reveal-delay-2 text-ember-500">slide by slide.</span>
          </h2>
          <p className="reveal reveal-delay-3 mt-5 text-lg text-bone-300 text-pretty">
            Tyres, tubes and spare parts from the brands we carry. It plays on its own — tap any
            slide to read it full size.
          </p>
        </div>

        <div className="reveal-card reveal-delay-4 mt-12">
          <SqueezeDeck slides={slides} interval={INTERVAL_MS} label="Product awareness presentation" />
        </div>
      </div>
    </section>
  );
}
