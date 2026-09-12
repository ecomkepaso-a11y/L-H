import { couple } from '../weddingConfig';

export default function Footer() {
  return (
    <footer className="relative bg-espresso px-6 py-16 text-center sm:px-10">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold-light/50 font-script text-lg text-gold-light">
        {couple.initials}
      </span>
      <p className="mt-6 font-script text-3xl text-gold-light sm:text-4xl">{couple.names}</p>
      <div className="divider-ornament mt-5">
        <span className="h-1 w-1 rounded-full bg-gold-light" />
      </div>
      <p className="mt-5 font-label text-xs uppercase tracking-[0.25em] text-cream/60">
        {couple.dateRange} · {couple.location}
      </p>
      <p className="mt-2 font-script text-xl text-cream/70">{couple.tagline}</p>
    </footer>
  );
}
