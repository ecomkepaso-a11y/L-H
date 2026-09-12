import { Heart } from 'lucide-react';
import { couple } from '../weddingConfig';

export default function Message() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blush to-cream-deep px-6 py-24 sm:px-10">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream shadow-inner">
          <Heart size={22} className="text-gold-deep" fill="currentColor" fillOpacity={0.15} />
        </span>

        <p className="mt-6 font-label text-xs uppercase tracking-[0.3em] text-gold-deep">Un Message du Cœur</p>

        <h2 className="mt-3 font-script text-5xl gold-gradient-text sm:text-6xl">Cher(e) Invité(e)</h2>

        <div className="mt-10 w-full rounded-3xl border border-gold/20 bg-cream/70 p-8 shadow-[0_20px_50px_-25px_rgba(60,40,10,0.35)] backdrop-blur-sm sm:p-12">
          <p className="text-lg leading-relaxed text-cocoa sm:text-xl">
            Vous êtes cordialement invités à la célébration de notre mariage et nous serons ravis de partager ce
            nouveau chapitre de notre vie avec ceux qui nous sont les plus chers.
          </p>

          <p className="mt-8 font-script text-2xl text-gold-deep">Avec tout notre amour,</p>
          <p className="font-script text-3xl gold-gradient-text sm:text-4xl">{couple.names}</p>
        </div>
      </div>
    </section>
  );
}
