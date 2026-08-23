export type Category = 'tyre' | 'tube';
export type UseCase = 'city' | 'highway' | 'offroad' | 'heavyload';
export type Tread = 'rib' | 'block' | 'mixed';

export type Product = {
  slug: string;
  name: string;
  brand: 'Pioneer' | 'Avis';
  series: string;
  category: Category;
  useCase?: UseCase[];
  tread?: Tread;
  sizes: string[];
  tagline: string;
  description: string;
  image: string;
  imageVariant?: 'studio' | 'dark'; // 'dark' for transparent-bg PNGs, 'studio' for white-bg JPEGs
  specs: {
    label: string;
    value: string;
  }[];
  features: {
    title: string;
    body: string;
  }[];
  warranty: string;
  loadIndex?: string;
  speedRating?: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: 'pioneer-tuk-tuk-tyres',
    name: 'Pioneer Tuk Tuk Tyres',
    brand: 'Pioneer',
    series: 'Pioneer / Three-Wheeler',
    category: 'tyre',
    useCase: ['city', 'highway', 'offroad', 'heavyload'],
    tread: 'block',
    sizes: ['4.00-8', '4.50-10'],
    tagline: 'Made for the daily hustle. Built to last.',
    description:
      'A durable, all-purpose tuk-tuk tyre engineered for Sri Lankan roads. Deep block tread grips loose gravel and market lanes; a strong nylon carcass handles cargo loads and daily overload without carcass fatigue.',
    image: '/images/pioneer-tyre.png',
    imageVariant: 'dark',
    specs: [
      { label: 'Ply rating', value: '6 PR' },
      { label: 'Max load', value: '500 kg / tyre' },
      { label: 'Tread depth', value: '10.2 mm' },
      { label: 'Life expectancy', value: '40,000+ km' },
    ],
    features: [
      { title: 'Heavy-Load Carcass', body: 'Multi-ply nylon construction stands up to daily overload without failing.' },
      { title: 'All-Terrain Grip', body: 'Deep block tread bites into tarmac, gravel, sand, and monsoon-wet surfaces alike.' },
      { title: 'Long Service Life', body: 'Wear-optimised compound regularly exceeds 40,000 km on typical tuk-tuk routes.' },
    ],
    warranty: '2-year manufacturer warranty',
    loadIndex: '78J',
    speedRating: 'J (100 km/h)',
    featured: true,
  },
  {
    slug: 'avis-tubes',
    name: 'Avis Tubes',
    brand: 'Avis',
    series: 'Avis / Universal Fitment',
    category: 'tube',
    sizes: ['2.75-17', '3.00-17', '3.00-18', '4.00-8', '4.50-10'],
    tagline: 'Heavy duty. Puncture resistant. 3-year peace of mind.',
    description:
      'High-quality butyl-rubber inner tubes engineered for real Sri Lankan use. Heavy-duty construction, superior puncture resistance, and airtight butyl rubber — the reliable inner layer behind every kilometre.',
    image: '/images/avis-tubes.jpg',
    imageVariant: 'studio',
    specs: [
      { label: 'Material', value: 'Butyl rubber' },
      { label: 'Valve type', value: 'Standard TR-4' },
      { label: 'Wall thickness', value: '2.0 mm' },
      { label: 'Fitment', value: 'Universal' },
    ],
    features: [
      { title: 'Airtight Butyl Rubber', body: 'Holds pressure longer than standard tubes — fewer top-ups, safer rides.' },
      { title: 'Puncture Resistant', body: 'Heavy-duty walls resist small punctures and pinch flats.' },
      { title: 'Universal Fit', body: 'A range of sizes to fit tuk-tuks and other common vehicles.' },
    ],
    warranty: '3-year manufacturer warranty',
    featured: true,
  },
];

export const filterOptions = {
  category: [
    { value: 'tyre' as Category, label: 'Pioneer Tuk Tuk Tyres', hint: 'Three-wheeler' },
    { value: 'tube' as Category, label: 'Avis Tubes', hint: 'For all vehicles' },
  ],
};

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}
