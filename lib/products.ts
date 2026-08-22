export type Vehicle = 'motorbike' | 'tuktuk';
export type UseCase = 'city' | 'highway' | 'offroad' | 'heavyload';
export type Tread = 'rib' | 'block' | 'mixed';

export type Product = {
  slug: string;
  name: string;
  series: string;
  vehicle: Vehicle;
  useCase: UseCase[];
  tread: Tread;
  sizes: string[];
  tagline: string;
  description: string;
  specs: {
    label: string;
    value: string;
  }[];
  features: {
    title: string;
    body: string;
  }[];
  warranty: string;
  loadIndex: string;
  speedRating: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: 'falcon-city-pro',
    name: 'Falcon City Pro',
    series: 'Motorbike / Urban',
    vehicle: 'motorbike',
    useCase: ['city'],
    tread: 'rib',
    sizes: ['2.75-17', '2.75-18', '3.00-17', '3.00-18'],
    tagline: 'City-slick. Rain-ready. Built for Colombo traffic.',
    description:
      'A directional rib-pattern commuter tyre engineered for the stop-start rhythm of Sri Lankan cities. Deep water channels evacuate monsoon rain fast; a hardened silica compound resists chunking on kerbs and speed bumps.',
    specs: [
      { label: 'Compound', value: 'High-silica hybrid' },
      { label: 'Tread depth', value: '5.8 mm' },
      { label: 'Wet grip', value: 'Class A' },
      { label: 'Life expectancy', value: '25,000+ km' },
    ],
    features: [
      { title: 'Monsoon-Ready Grooves', body: 'Four continuous channels clear standing water at speed for confident wet braking.' },
      { title: 'Kerb-Guard Sidewall', body: 'Reinforced bead protects against scuffs from tight urban parking.' },
      { title: 'Whisper-Quiet Ride', body: 'Optimised pitch sequence keeps highway hum low over long commutes.' },
    ],
    warranty: '2-year manufacturer warranty',
    loadIndex: '54P',
    speedRating: 'P (150 km/h)',
    featured: true,
  },
  {
    slug: 'talon-highway-touring',
    name: 'Talon Highway',
    series: 'Motorbike / Touring',
    vehicle: 'motorbike',
    useCase: ['highway', 'city'],
    tread: 'mixed',
    sizes: ['90/90-17', '100/90-17', '110/80-17', '130/70-17'],
    tagline: 'Long-haul confidence from Kandy to Galle.',
    description:
      'A dual-compound touring tyre: harder centre band for cruise wear, softer shoulder for cornering bite. Designed to run cool at highway speeds while still gripping hot asphalt on the coast road.',
    specs: [
      { label: 'Compound', value: 'Dual-zone silica' },
      { label: 'Tread depth', value: '6.2 mm' },
      { label: 'Max speed', value: '180 km/h' },
      { label: 'Life expectancy', value: '32,000+ km' },
    ],
    features: [
      { title: 'Dual-Zone Compound', body: 'Harder centre, softer shoulder — long life without giving up lean-angle grip.' },
      { title: 'Cool-Run Carcass', body: 'Aramid belt manages heat build-up on extended highway runs.' },
      { title: 'Predictable Wear', body: 'Even wear profile keeps handling neutral from new to worn.' },
    ],
    warranty: '2-year manufacturer warranty',
    loadIndex: '58H',
    speedRating: 'H (210 km/h)',
    featured: true,
  },
  {
    slug: 'raptor-adventure',
    name: 'Raptor Adventure',
    series: 'Motorbike / Off-road',
    vehicle: 'motorbike',
    useCase: ['offroad', 'city'],
    tread: 'block',
    sizes: ['90/90-19', '110/80-18', '120/90-17'],
    tagline: 'Where tarmac ends, Raptor begins.',
    description:
      'Aggressive block pattern with self-cleaning voids for red clay, sand, and rain-rutted trails. Tough nylon carcass shrugs off rocks; a reinforced bead resists pinch flats on low pressures.',
    specs: [
      { label: 'Compound', value: 'Tough natural blend' },
      { label: 'Tread depth', value: '9.4 mm' },
      { label: 'Terrain mix', value: '60/40 dirt/road' },
      { label: 'Life expectancy', value: '20,000+ km' },
    ],
    features: [
      { title: 'Self-Clearing Blocks', body: 'Open voids eject mud and clay before they clog the tread.' },
      { title: 'Puncture-Resistant Belt', body: 'Nylon plies protect against thorns and sharp trail debris.' },
      { title: 'Low-Pressure Ready', body: 'Reinforced bead lets you air down for extra grip on soft ground.' },
    ],
    warranty: '1-year manufacturer warranty',
    loadIndex: '57R',
    speedRating: 'Q (160 km/h)',
  },
  {
    slug: 'storm-wet-grip',
    name: 'Storm Wet-Grip',
    series: 'Motorbike / Monsoon',
    vehicle: 'motorbike',
    useCase: ['city', 'highway'],
    tread: 'rib',
    sizes: ['100/80-17', '110/70-17', '130/70-17'],
    tagline: 'The tyre monsoon riders ask for by name.',
    description:
      'Storm’s deep, angled sipes push water out sideways so the contact patch stays dry when the sky isn’t. A softer wet-optimised compound wakes up fast in cold rain.',
    specs: [
      { label: 'Compound', value: 'Wet-grip silica' },
      { label: 'Tread depth', value: '6.5 mm' },
      { label: 'Wet grip', value: 'Class A+' },
      { label: 'Life expectancy', value: '22,000+ km' },
    ],
    features: [
      { title: 'Angled Water Sipes', body: 'Push water sideways out of the contact patch, not just back.' },
      { title: 'Cold-Start Grip', body: 'Optimised compound reaches working temperature within the first minute.' },
      { title: 'Short Wet Braking', body: 'Tested up to 8% shorter wet stops vs standard commuter tyres.' },
    ],
    warranty: '2-year manufacturer warranty',
    loadIndex: '55H',
    speedRating: 'H (210 km/h)',
  },
  {
    slug: 'titan-heavy-load',
    name: 'Titan Heavy-Load',
    series: 'Tuk-Tuk / Commercial',
    vehicle: 'tuktuk',
    useCase: ['heavyload', 'city'],
    tread: 'block',
    sizes: ['4.00-8', '4.50-10'],
    tagline: 'Overload it. It won’t care.',
    description:
      'Six-ply nylon carcass built for gas cylinders, produce loads and daily overload. The blocky tread digs into loose surfaces; a wide flat crown spreads load evenly to slow wear.',
    specs: [
      { label: 'Ply rating', value: '6 PR' },
      { label: 'Max load', value: '500 kg / tyre' },
      { label: 'Tread depth', value: '10.2 mm' },
      { label: 'Life expectancy', value: '45,000+ km' },
    ],
    features: [
      { title: '6-Ply Nylon Carcass', body: 'Handles daily overload without carcass fatigue.' },
      { title: 'Flat Crown Profile', body: 'Even load distribution slows shoulder wear when loaded hard.' },
      { title: 'Big-Block Traction', body: 'Grips loose gravel and market-lane sand without slip.' },
    ],
    warranty: '3-year commercial warranty',
    loadIndex: '78J',
    speedRating: 'J (100 km/h)',
    featured: true,
  },
  {
    slug: 'ranger-city-tuk',
    name: 'Ranger City',
    series: 'Tuk-Tuk / Urban',
    vehicle: 'tuktuk',
    useCase: ['city'],
    tread: 'rib',
    sizes: ['4.00-8', '4.50-10'],
    tagline: 'Made for the daily hustle.',
    description:
      'A rib pattern tuned for city three-wheelers: quiet, low-wear, and forgiving on hot tarmac. Fuel-efficient rolling resistance means more rupees stay in your pocket.',
    specs: [
      { label: 'Ply rating', value: '4 PR' },
      { label: 'Max load', value: '350 kg / tyre' },
      { label: 'Tread depth', value: '8.0 mm' },
      { label: 'Life expectancy', value: '38,000+ km' },
    ],
    features: [
      { title: 'Low Rolling Resistance', body: 'Fuel-savings compound cuts drag on daily short trips.' },
      { title: 'Cool-Running', body: 'Manages Colombo mid-day heat without softening.' },
      { title: 'Quiet Rib Pattern', body: 'Comfortable ride for both driver and passengers.' },
    ],
    warranty: '2-year commercial warranty',
    loadIndex: '71L',
    speedRating: 'L (120 km/h)',
  },
  {
    slug: 'voyager-tuk-highway',
    name: 'Voyager Long-Haul',
    series: 'Tuk-Tuk / Highway',
    vehicle: 'tuktuk',
    useCase: ['highway', 'city'],
    tread: 'mixed',
    sizes: ['4.00-8', '4.50-10'],
    tagline: 'Coast to coast, one set of tyres.',
    description:
      'For tuk-tuks that live on the road between towns. A mixed rib/block pattern delivers long life on tarmac while still handling gravel entry roads and market yards.',
    specs: [
      { label: 'Ply rating', value: '6 PR' },
      { label: 'Max load', value: '420 kg / tyre' },
      { label: 'Tread depth', value: '9.0 mm' },
      { label: 'Life expectancy', value: '42,000+ km' },
    ],
    features: [
      { title: 'Highway-Grade Carcass', body: 'Runs cool for hours on hot tarmac.' },
      { title: 'Mixed Rib/Block', body: 'Best of both — tarmac life, gravel grip.' },
      { title: 'Puncture Barrier', body: 'Reinforced tread bed reduces punctures on rough shoulders.' },
    ],
    warranty: '3-year commercial warranty',
    loadIndex: '76K',
    speedRating: 'K (110 km/h)',
  },
  {
    slug: 'rugged-tuk-mixed',
    name: 'Rugged Mixed-Terrain',
    series: 'Tuk-Tuk / All-Terrain',
    vehicle: 'tuktuk',
    useCase: ['offroad', 'heavyload'],
    tread: 'block',
    sizes: ['4.00-8', '4.50-10'],
    tagline: 'For plantations, back-roads, and beyond.',
    description:
      'Aggressive lugs for tea estates, back-road villages, and unpaved routes. Reinforced sidewall stands up to root strikes and rocky shoulders where standard tyres tear out.',
    specs: [
      { label: 'Ply rating', value: '6 PR' },
      { label: 'Max load', value: '450 kg / tyre' },
      { label: 'Tread depth', value: '11.0 mm' },
      { label: 'Life expectancy', value: '35,000+ km' },
    ],
    features: [
      { title: 'Deep Lug Traction', body: '11 mm of tread bites into loose soil and wet clay.' },
      { title: 'Root-Strike Sidewall', body: 'Extra-thick shoulder shrugs off plantation trail hits.' },
      { title: 'Long Off-road Life', body: 'Tuned for wear under rough, mixed-surface use.' },
    ],
    warranty: '2-year commercial warranty',
    loadIndex: '77J',
    speedRating: 'J (100 km/h)',
  },
];

export const filterOptions = {
  vehicle: [
    { value: 'motorbike' as Vehicle, label: 'Motorbike', hint: 'Two-wheeler' },
    { value: 'tuktuk' as Vehicle, label: 'Tuk-Tuk', hint: 'Three-wheeler' },
  ],
  useCase: [
    { value: 'city' as UseCase, label: 'City', hint: 'Daily commute' },
    { value: 'highway' as UseCase, label: 'Highway', hint: 'Long-distance' },
    { value: 'offroad' as UseCase, label: 'Off-road', hint: 'Trails & backroads' },
    { value: 'heavyload' as UseCase, label: 'Heavy-load', hint: 'Cargo & goods' },
  ],
  tread: [
    { value: 'rib' as Tread, label: 'Rib', hint: 'Smooth, quiet' },
    { value: 'block' as Tread, label: 'Block', hint: 'Aggressive grip' },
    { value: 'mixed' as Tread, label: 'Mixed', hint: 'Balanced' },
  ],
};

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}
