'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { products, filterOptions, type Vehicle, type UseCase, type Tread } from '@/lib/products';
import { TyreArt } from './TyreArt';

type Step = 0 | 1 | 2 | 3;

export default function TyreSelector() {
  const [step, setStep] = useState<Step>(0);
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [useCase, setUseCase] = useState<UseCase | null>(null);
  const [tread, setTread] = useState<Tread | null>(null);

  const matches = useMemo(() => {
    return products.filter((p) => {
      if (vehicle && p.vehicle !== vehicle) return false;
      if (useCase && !p.useCase.includes(useCase)) return false;
      if (tread && p.tread !== tread) return false;
      return true;
    });
  }, [vehicle, useCase, tread]);

  const reset = () => {
    setStep(0);
    setVehicle(null);
    setUseCase(null);
    setTread(null);
  };

  const progress = step === 3 ? 100 : (step / 3) * 100;

  return (
    <section id="selector" className="relative py-24 md:py-32">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(225,29,46,0.06),transparent_60%)]" />
      </div>

      <div className="container-x relative">
        <div className="reveal max-w-2xl">
          <div className="eyebrow">Interactive Tyre Selector</div>
          <h2 className="display text-display-lg mt-4 text-balance">
            Three questions.<br />
            <span className="italic text-ember-500">Your perfect tyre.</span>
          </h2>
          <p className="mt-5 text-lg text-bone-300 text-pretty">
            Tell us how and where you ride. We&apos;ll match you with the tyre engineered exactly for it.
          </p>
        </div>

        <div className="reveal reveal-delay-1 mt-12 surface-elevated overflow-hidden">
          {/* Progress bar */}
          <div className="relative h-1 bg-white/[0.04]">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-ember-600 to-ember-400 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="p-6 md:p-10">
            {/* Step indicator */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2 text-xs text-bone-400 uppercase tracking-[0.2em]">
                {step < 3 ? (
                  <>Step <span className="text-ember-400">{step + 1}</span> of 3</>
                ) : (
                  <span className="text-ember-400">Your matches</span>
                )}
              </div>
              {(vehicle || useCase || tread) && (
                <button
                  onClick={reset}
                  className="text-xs text-bone-300 hover:text-white uppercase tracking-wider transition-colors"
                >
                  ↺ Reset
                </button>
              )}
            </div>

            {/* Steps */}
            {step === 0 && (
              <StepPane
                title="What are you riding?"
                subtitle="Pick your vehicle to start."
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  {filterOptions.vehicle.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      label={opt.label}
                      hint={opt.hint}
                      icon={opt.value === 'motorbike' ? <MotorbikeIcon /> : <TukTukIcon />}
                      active={vehicle === opt.value}
                      onClick={() => {
                        setVehicle(opt.value);
                        setTimeout(() => setStep(1), 220);
                      }}
                    />
                  ))}
                </div>
              </StepPane>
            )}

            {step === 1 && (
              <StepPane
                title="Where do you ride most?"
                subtitle="Your typical use — city, highway, off-road, or hauling loads."
                onBack={() => setStep(0)}
              >
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {filterOptions.useCase.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      label={opt.label}
                      hint={opt.hint}
                      icon={<UseCaseIcon type={opt.value} />}
                      active={useCase === opt.value}
                      compact
                      onClick={() => {
                        setUseCase(opt.value);
                        setTimeout(() => setStep(2), 220);
                      }}
                    />
                  ))}
                </div>
              </StepPane>
            )}

            {step === 2 && (
              <StepPane
                title="Which tread pattern?"
                subtitle="Not sure? Rib is quiet & efficient. Block is aggressive & grippy. Mixed is balanced."
                onBack={() => setStep(1)}
              >
                <div className="grid gap-4 sm:grid-cols-3">
                  {filterOptions.tread.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      label={opt.label}
                      hint={opt.hint}
                      icon={<div className="scale-75"><TyreArt size={96} pattern={opt.value} /></div>}
                      active={tread === opt.value}
                      onClick={() => {
                        setTread(opt.value);
                        setTimeout(() => setStep(3), 250);
                      }}
                    />
                  ))}
                </div>
              </StepPane>
            )}

            {step === 3 && (
              <div className="animate-fade-up">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                  <div>
                    <h3 className="font-display text-3xl md:text-4xl text-white leading-tight">
                      {matches.length > 0 ? (
                        <>
                          {matches.length} tyre{matches.length !== 1 && 's'} for you
                        </>
                      ) : (
                        <>No exact matches. Try broadening.</>
                      )}
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {vehicle && <Chip>{filterOptions.vehicle.find((o) => o.value === vehicle)?.label}</Chip>}
                      {useCase && <Chip>{filterOptions.useCase.find((o) => o.value === useCase)?.label}</Chip>}
                      {tread && <Chip>{filterOptions.tread.find((o) => o.value === tread)?.label} tread</Chip>}
                    </div>
                  </div>
                  <button onClick={() => setStep(0)} className="btn-ghost text-sm !py-2.5 !min-h-[42px] shrink-0">
                    Start over
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {matches.slice(0, 6).map((p) => (
                    <Link
                      key={p.slug}
                      href={`/tyres/${p.slug}`}
                      className="group block surface p-5 hover:border-ember-500/30 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="aspect-square relative flex items-center justify-center bg-ink-900 rounded-xl overflow-hidden mb-4">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(225,29,46,0.12),transparent_60%)]" />
                        <TyreArt size={160} pattern={p.tread} />
                      </div>
                      <div className="text-[11px] text-ember-400 uppercase tracking-wider mb-1">{p.series}</div>
                      <div className="font-display text-xl text-white leading-tight">{p.name}</div>
                      <p className="mt-2 text-sm text-bone-300 line-clamp-2">{p.tagline}</p>
                      <div className="mt-4 flex items-center justify-between text-xs text-bone-400">
                        <span>{p.sizes[0]} · {p.loadIndex}</span>
                        <span className="text-ember-400 group-hover:translate-x-1 transition-transform">View →</span>
                      </div>
                    </Link>
                  ))}
                </div>

                {matches.length === 0 && (
                  <div className="mt-6 text-center">
                    <Link href="/tyres" className="btn-ghost">Browse all tyres →</Link>
                  </div>
                )}

                <div className="mt-8 border-t border-white/[0.06] pt-6 flex items-center justify-between">
                  <p className="text-sm text-bone-300">Not sure? We&apos;ll help you pick.</p>
                  <Link href="/tyres" className="text-sm text-ember-400 hover:text-ember-300 font-medium">
                    See the full catalog →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepPane({
  title,
  subtitle,
  children,
  onBack,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  onBack?: () => void;
}) {
  return (
    <div className="animate-fade-up">
      <div className="flex items-start justify-between gap-4 mb-8">
        <div className="max-w-lg">
          <h3 className="font-display text-2xl md:text-3xl text-white leading-tight">{title}</h3>
          <p className="mt-2 text-bone-300 text-sm md:text-base">{subtitle}</p>
        </div>
        {onBack && (
          <button
            onClick={onBack}
            className="text-xs text-bone-300 hover:text-white uppercase tracking-wider shrink-0"
          >
            ← Back
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function OptionCard({
  label,
  hint,
  icon,
  active,
  onClick,
  compact,
}: {
  label: string;
  hint: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'group relative flex flex-col items-center gap-3 rounded-2xl border p-5 text-center transition-all duration-300',
        'min-h-[140px] cursor-pointer',
        active
          ? 'border-ember-500 bg-ember-500/[0.08] shadow-[0_0_0_1px_rgba(225,29,46,0.4),0_20px_60px_-20px_rgba(225,29,46,0.5)]'
          : 'border-white/[0.08] bg-ink-900/60 hover:border-white/20 hover:bg-ink-800',
        compact ? 'py-4' : '',
      ].join(' ')}
    >
      <div className={`transition-transform duration-500 ${active ? 'scale-110' : 'group-hover:scale-105'}`}>
        {icon}
      </div>
      <div>
        <div className="font-display text-xl text-white leading-tight">{label}</div>
        <div className="text-xs text-bone-400 mt-1">{hint}</div>
      </div>
      {active && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-ember-500 flex items-center justify-center animate-fade-in">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6.5l2.5 2.5 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </button>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-ember-500/30 bg-ember-500/[0.08] px-3 py-1 text-xs text-ember-300">
      {children}
    </span>
  );
}

function MotorbikeIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
      <circle cx="10" cy="32" r="7" stroke="#F5525E" strokeWidth="1.5" />
      <circle cx="34" cy="32" r="7" stroke="#F5525E" strokeWidth="1.5" />
      <circle cx="10" cy="32" r="2" fill="#F5525E" />
      <circle cx="34" cy="32" r="2" fill="#F5525E" />
      <path d="M10 32L16 20h10l4 6 4 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 20l-3-8h-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 12h6l-2 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TukTukIcon() {
  return (
    <svg width="52" height="44" viewBox="0 0 52 44" fill="none" aria-hidden="true">
      <circle cx="12" cy="34" r="6" stroke="#F5525E" strokeWidth="1.5" />
      <circle cx="40" cy="34" r="6" stroke="#F5525E" strokeWidth="1.5" />
      <circle cx="12" cy="34" r="2" fill="#F5525E" />
      <circle cx="40" cy="34" r="2" fill="#F5525E" />
      <path d="M6 30V22c0-3 2-5 5-5h8l4-8h12c3 0 5 2 5 5v16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 22h34" stroke="white" strokeWidth="1.5" />
      <rect x="16" y="12" width="10" height="6" rx="1" stroke="white" strokeWidth="1.5" />
    </svg>
  );
}

function UseCaseIcon({ type }: { type: UseCase }) {
  const stroke = '#F5525E';
  if (type === 'city') {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <rect x="6" y="14" width="8" height="20" stroke={stroke} strokeWidth="1.5" />
        <rect x="16" y="8" width="10" height="26" stroke="white" strokeWidth="1.5" />
        <rect x="28" y="18" width="6" height="16" stroke={stroke} strokeWidth="1.5" />
        <line x1="4" y1="34" x2="36" y2="34" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'highway') {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M6 32L16 8h8l10 24" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M20 8v6M20 18v4M20 26v4" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'offroad') {
    return (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M4 30l6-6 4 3 6-8 4 4 6-6 6 5" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="30" cy="10" r="3" stroke="white" strokeWidth="1.5" />
        <path d="M4 34h32" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3" />
      </svg>
    );
  }
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="6" y="14" width="22" height="14" stroke="white" strokeWidth="1.5" />
      <path d="M28 18h6l4 4v6h-10" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="30" r="3" stroke={stroke} strokeWidth="1.5" />
      <circle cx="30" cy="30" r="3" stroke={stroke} strokeWidth="1.5" />
      <path d="M10 10h14" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M13 6h8" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
