'use client';

import { useEffect, useState } from 'react';
import { site, whatsappUrl } from '@/lib/site';
import { WhatsAppIcon } from './Nav';

export default function SocialFabs() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={[
        'fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3',
        'transition-all duration-300',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none',
      ].join(' ')}
      aria-hidden={!visible}
    >
      <a
        href={site.facebook}
        target="_blank"
        rel="noreferrer"
        aria-label="Follow us on Facebook"
        className="group relative inline-flex items-center justify-center w-13 h-13 rounded-full bg-[#1877F2] text-white shadow-2xl shadow-[#1877F2]/30 hover:bg-[#166FE0] active:scale-[0.97] transition-all duration-300"
        style={{ width: 52, height: 52 }}
      >
        <span
          className="absolute inset-0 rounded-full bg-[#1877F2] opacity-40 animate-ping"
          style={{ animationDuration: '2.5s' }}
        />
        <span className="relative">
          <FacebookIcon className="w-6 h-6" />
        </span>
      </a>

      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group relative inline-flex items-center gap-2.5 pl-4 pr-5 py-3.5 rounded-full bg-[#25D366] text-white font-medium shadow-2xl shadow-[#25D366]/30 hover:bg-[#20b957] active:scale-[0.97] transition-all duration-300"
      >
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping"
          style={{ animationDuration: '2.5s' }}
        />
        <span className="relative flex items-center gap-2.5">
          <WhatsAppIcon className="w-5 h-5" />
          <span className="text-sm hidden sm:inline">WhatsApp us</span>
        </span>
      </a>
    </div>
  );
}

function FacebookIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.51 1.5-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.77l-.44 2.89h-2.33v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}
