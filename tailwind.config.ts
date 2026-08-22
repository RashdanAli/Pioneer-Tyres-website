import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050506',
          900: '#0A0A0C',
          800: '#101014',
          700: '#16161B',
          600: '#1E1E24',
          500: '#2A2A32',
          400: '#3A3A44',
        },
        bone: {
          50: '#FAFAF9',
          100: '#F1F1EF',
          200: '#D6D3D1',
          300: '#A8A29E',
          400: '#78716C',
        },
        ember: {
          50: '#FFF1F2',
          100: '#FFE1E3',
          200: '#FFC2C6',
          300: '#FF8A92',
          400: '#F5525E',
          500: '#E11D2E',
          600: '#B8121F',
          700: '#8A0D18',
          800: '#5C0810',
          900: '#3B0409',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 10vw, 7rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(2.25rem, 7vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.025em' }],
        'display-md': ['clamp(1.75rem, 5vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      backgroundImage: {
        'grid-fade': 'radial-gradient(ellipse at center, rgba(225, 29, 46, 0.08), transparent 60%)',
        'ember-glow': 'radial-gradient(circle at 50% 50%, rgba(225, 29, 46, 0.35), transparent 70%)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      animation: {
        'fade-up': 'fadeUp 700ms cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 500ms ease-out both',
        'ember-pulse': 'emberPulse 3.5s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        emberPulse: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.05)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
