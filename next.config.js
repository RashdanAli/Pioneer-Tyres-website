/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // GitHub Pages serves plain files — no Node server — so the whole site is
  // pre-rendered to static HTML in out/ at build time.
  output: 'export',
  // The default next/image optimiser needs that server, so it has to go too.
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
  // Emit out/tyres/foo/index.html rather than out/tyres/foo.html, which keeps
  // relative asset paths working however Pages resolves the URL.
  trailingSlash: true,
};

module.exports = nextConfig;
