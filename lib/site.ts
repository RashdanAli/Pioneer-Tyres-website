export const site = {
  name: 'Pioneer Tyre',
  short: 'Pioneer Tyre',
  company: 'CeyhedgesLanka (Pvt) Ltd',
  tagline: 'Built for Sri Lanka. Trusted by every road.',
  whatsapp: '+94777330561',
  phone: '+94777330561',
  email: 'jabeerchl@gmail.com',
  address: 'Sri Lanka',
  since: 2000,
  facebook: 'https://www.facebook.com/p/Pioneer-Tyres-100063954997209/',
};

export const whatsappUrl = (text?: string) => {
  const t = encodeURIComponent(
    text || `Hi CeyhedgesLanka, I'd like to inquire about a product.`,
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
