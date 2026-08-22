'use client';

import { useEffect, useState } from 'react';
import { whatsappUrl } from '@/lib/site';
import { WhatsAppIcon } from './Nav';

export default function WhatsAppFab() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={[
        'fixed bottom-5 right-5 z-40 group',
        'inline-flex items-center gap-3 pl-4 pr-5 py-3.5 rounded-full',
        'bg-[#25D366] text-white font-medium shadow-2xl shadow-[#25D366]/30',
        'hover:bg-[#20b957] active:scale-[0.97] transition-all duration-300',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
      ].join(' ')}
    >
      <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping" style={{ animationDuration: '2.5s' }} />
      <span className="relative flex items-center gap-2.5">
        <WhatsAppIcon className="w-5 h-5" />
        <span className="text-sm hidden sm:inline">WhatsApp us</span>
      </span>
    </a>
  );
}
