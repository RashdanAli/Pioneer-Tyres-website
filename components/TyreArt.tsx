export function TyreArt({
  size = 240,
  pattern = 'block',
  className = '',
}: {
  size?: number;
  pattern?: 'rib' | 'block' | 'mixed';
  className?: string;
}) {
  const s = size;
  const center = s / 2;
  const outerR = s * 0.46;
  const rimR = s * 0.22;
  const treadR = s * 0.4;
  const r = (n: number) => Math.round(n * 1000) / 1000;

  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      xmlns="http://www.w3.org/2000/svg"
      className={`tyre-svg ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`glow-${pattern}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#E11D2E" stopOpacity="0.3" />
          <stop offset="60%" stopColor="#E11D2E" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`rubber-${pattern}`} cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#2A2A32" />
          <stop offset="70%" stopColor="#0F0F13" />
          <stop offset="100%" stopColor="#050506" />
        </radialGradient>
        <linearGradient id={`rim-${pattern}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8A8A94" />
          <stop offset="50%" stopColor="#2A2A32" />
          <stop offset="100%" stopColor="#0F0F13" />
        </linearGradient>
      </defs>

      {/* Ember glow */}
      <circle cx={center} cy={center} r={outerR * 1.15} fill={`url(#glow-${pattern})`} />

      {/* Outer tyre */}
      <circle cx={center} cy={center} r={outerR} fill={`url(#rubber-${pattern})`} stroke="#1E1E24" strokeWidth="1" />

      {/* Tread pattern */}
      {pattern === 'block' && (
        <g>
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * 2 * Math.PI;
            const x1 = r(center + treadR * Math.cos(angle));
            const y1 = r(center + treadR * Math.sin(angle));
            const x2 = r(center + (rimR + 8) * Math.cos(angle));
            const y2 = r(center + (rimR + 8) * Math.sin(angle));
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="#1A1A20" strokeWidth={r(s * 0.028)} strokeLinecap="round" />
            );
          })}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = ((i + 0.5) / 24) * 2 * Math.PI;
            const cx = r(center + (treadR - s * 0.05) * Math.cos(angle));
            const cy = r(center + (treadR - s * 0.05) * Math.sin(angle));
            return <rect key={`b-${i}`} x={cx - 3} y={cy - 3} width="6" height="6" fill="#0A0A0C" rx="1" transform={`rotate(${r((angle * 180) / Math.PI + 90)} ${cx} ${cy})`} />;
          })}
        </g>
      )}

      {pattern === 'rib' && (
        <g>
          <circle cx={center} cy={center} r={treadR - s * 0.02} fill="none" stroke="#1A1A20" strokeWidth="2" />
          <circle cx={center} cy={center} r={treadR - s * 0.08} fill="none" stroke="#1A1A20" strokeWidth="2" />
          <circle cx={center} cy={center} r={treadR - s * 0.14} fill="none" stroke="#1A1A20" strokeWidth="2" />
          {Array.from({ length: 48 }).map((_, i) => {
            const angle = (i / 48) * 2 * Math.PI;
            const x1 = r(center + (treadR - s * 0.03) * Math.cos(angle));
            const y1 = r(center + (treadR - s * 0.03) * Math.sin(angle));
            const x2 = r(center + (treadR - s * 0.17) * Math.cos(angle));
            const y2 = r(center + (treadR - s * 0.17) * Math.sin(angle));
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1A1A20" strokeWidth="0.8" />;
          })}
        </g>
      )}

      {pattern === 'mixed' && (
        <g>
          <circle cx={center} cy={center} r={treadR - s * 0.04} fill="none" stroke="#1A1A20" strokeWidth="2.5" />
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = (i / 20) * 2 * Math.PI;
            const x1 = r(center + (treadR - s * 0.02) * Math.cos(angle));
            const y1 = r(center + (treadR - s * 0.02) * Math.sin(angle));
            const x2 = r(center + (treadR - s * 0.1) * Math.cos(angle));
            const y2 = r(center + (treadR - s * 0.1) * Math.sin(angle));
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1A1A20" strokeWidth={r(s * 0.02)} strokeLinecap="round" />;
          })}
          {Array.from({ length: 16 }).map((_, i) => {
            const angle = ((i + 0.5) / 16) * 2 * Math.PI;
            const cx = r(center + (treadR - s * 0.16) * Math.cos(angle));
            const cy = r(center + (treadR - s * 0.16) * Math.sin(angle));
            return <rect key={`m-${i}`} x={cx - 2.5} y={cy - 2.5} width="5" height="5" fill="#0A0A0C" rx="1"
                          transform={`rotate(${r((angle * 180) / Math.PI + 90)} ${cx} ${cy})`} />;
          })}
        </g>
      )}

      {/* Rim */}
      <circle cx={center} cy={center} r={rimR + 6} fill="#0A0A0C" />
      <circle cx={center} cy={center} r={rimR} fill={`url(#rim-${pattern})`} stroke="#3A3A44" strokeWidth="0.5" />

      {/* Spokes */}
      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i / 5) * 2 * Math.PI - Math.PI / 2;
        const x2 = r(center + rimR * 0.85 * Math.cos(angle));
        const y2 = r(center + rimR * 0.85 * Math.sin(angle));
        return <line key={i} x1={center} y1={center} x2={x2} y2={y2} stroke="#6A6A74" strokeWidth={r(s * 0.014)} strokeLinecap="round" opacity="0.7" />;
      })}
      <circle cx={center} cy={center} r={s * 0.04} fill="#1E1E24" stroke="#6A6A74" strokeWidth="0.5" />
      <circle cx={center} cy={center} r={s * 0.015} fill="#E11D2E" />

      {/* Highlight sheen */}
      <ellipse cx={center - outerR * 0.35} cy={center - outerR * 0.35} rx={outerR * 0.3} ry={outerR * 0.08} fill="white" opacity="0.06" transform={`rotate(-45 ${center} ${center})`} />
    </svg>
  );
}
