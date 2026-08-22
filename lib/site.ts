export const site = {
  name: 'Pioneer Tyre',
  short: 'Pioneer Tyre',
  tagline: 'Built for Sri Lanka. Trusted by every road.',
  whatsapp: '+94777330561',
  phone: '+94777330561',
  email: 'jabeerchl@gmail.com',
  address: 'Sri Lanka',
  since: 2000,
};

export const whatsappUrl = (text?: string) => {
  const t = encodeURIComponent(
    text || `Hi Pioneer Tyre, I'd like to inquire about a tyre.`,
  );
  const num = site.whatsapp.replace(/[^0-9]/g, '');
  return `https://wa.me/${num}?text=${t}`;
};

export const nav = [
  { label: 'Products', href: '/tyres' },
  { label: 'Selector', href: '/#selector' },
  { label: 'Why Us', href: '/#why' },
  { label: 'Contact', href: '/#contact' },
];
