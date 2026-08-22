export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="16" cy="16" r="14" stroke="url(#lg)" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="5.5" stroke="url(#lg)" strokeWidth="1.5" />
        <path d="M16 2v6M16 24v6M2 16h6M24 16h6M6.34 6.34l4.24 4.24M21.42 21.42l4.24 4.24M6.34 25.66l4.24-4.24M21.42 10.58l4.24-4.24"
              stroke="url(#lg)" strokeWidth="1.2" strokeLinecap="round" />
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="32" y2="32">
            <stop offset="0" stopColor="#E11D2E" />
            <stop offset="1" stopColor="#F5525E" />
          </linearGradient>
        </defs>
      </svg>
      <div className="leading-none">
        <div className="font-display text-[19px] tracking-wide text-white">
          Pioneer<span className="text-ember-500">·</span>Tyre
        </div>
        <div className="text-[9px] uppercase tracking-[0.28em] text-bone-300/70 mt-0.5">
          Available Since 2000
        </div>
      </div>
    </div>
  );
}
