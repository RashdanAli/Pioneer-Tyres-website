import Image from 'next/image';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div className="relative w-11 h-9 md:w-12 md:h-10 shrink-0 overflow-hidden rounded-md ring-1 ring-white/[0.06]">
        <Image
          src="/images/chl-logo.jpg"
          alt="CeyhedgesLanka (Pvt) Ltd logo"
          fill
          sizes="48px"
          className="object-contain select-none"
          priority
          draggable={false}
        />
      </div>
      <div className="leading-none">
        <div className="font-display text-[19px] md:text-[20px] tracking-wide font-semibold text-ember-500 drop-shadow-[0_0_12px_rgba(225,29,46,0.5)]">
          CeyhedgesLanka
        </div>
        <div className="mt-1 text-[9px] uppercase tracking-[0.28em] text-bone-300/80">
          (Pvt) Ltd
        </div>
      </div>
    </div>
  );
}
