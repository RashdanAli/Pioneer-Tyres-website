export const site = {
  name: 'Pioneer Cooper Tyres',
  short: 'Pioneer Cooper',
  tagline: 'Built for Sri Lanka. Trusted by every road.',
  whatsapp: '+94771234567',
  phone: '+94112345678',
  email: 'hello@pioneercooper.lk',
  address: 'No. 42, Union Place, Colombo 02, Sri Lanka',
  established: 1998,
};

export const whatsappUrl = (text?: string) => {
  const t = encodeURIComponent(
    text || `Hi Pioneer Cooper, I'd like to inquire about a tyre.`,
  );
  const num = site.whatsapp.replace(/[^0-9]/g, '');
  return `https://wa.me/${num}?text=${t}`;
};

export const nav = [
  { label: 'Tyres', href: '/tyres' },
  { label: 'Selector', href: '/#selector' },
  { label: 'Why Pioneer', href: '/#why' },
  { label: 'Contact', href: '/#contact' },
];
