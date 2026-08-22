import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center">
      <div className="container-x text-center">
        <div className="eyebrow">404 · Off-road</div>
        <h1 className="display text-display-xl mt-4">
          This road doesn&apos;t exist.<br />
          <span className="italic text-ember-500">Yet.</span>
        </h1>
        <p className="mt-6 text-bone-300 max-w-md mx-auto">
          The page you followed has been retired. Head back and find your tyre.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <Link href="/" className="btn-primary">Take me home</Link>
          <Link href="/tyres" className="btn-ghost">Browse tyres</Link>
        </div>
      </div>
    </section>
  );
}
