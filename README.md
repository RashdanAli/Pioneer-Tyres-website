# Pioneer Cooper Tyres — Website

Premium marketing site for Pioneer Cooper Tyres (Sri Lanka). Motorbike + tuk-tuk tyres. Dark, moody, mobile-first, WhatsApp-driven.

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Zero client-side libraries beyond React — inline SVGs, CSS animations

## Local dev
```bash
npm install
npm run dev
# open http://localhost:3000
```

## Structure
- `app/` — Routes (home, `/tyres`, `/tyres/[slug]`)
- `components/` — Reusable UI (Hero, TyreSelector, ProductCard, etc.)
- `lib/products.ts` — Product catalog (single source of truth)
- `lib/site.ts` — Brand + contact info

## Editing content
- Products: `lib/products.ts`
- WhatsApp number, address, email: `lib/site.ts`

## Deploy
Any Node host. Vercel recommended.
