import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { galleryImages } from '../weddingConfig';

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null);
  const isOpen = activeIndex !== null;

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e) {
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % galleryImages.length);
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen]);

  return (
    <section id="galerie" className="relative bg-gradient-to-b from-cream-deep to-cream px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Souvenirs en Images" title="Notre Galerie" />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4">
          {galleryImages.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIndex(i)}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl border border-gold/15 bg-cream-deep shadow-[0_10px_25px_-15px_rgba(60,40,10,0.4)]"
              aria-label={`Voir la photo ${i + 1} en grand`}
            >
              <img
                src={src}
                alt={`Larry Chanelle & Hermann — photo ${i + 1}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-espresso/0 opacity-0 transition-all duration-300 group-hover:bg-espresso/25 group-hover:opacity-100">
                <Camera size={20} className="text-cream" />
              </span>
            </button>
          ))}
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-espresso/95 px-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            aria-label="Fermer"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-gold-light hover:text-gold-light"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setActiveIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length); }}
            aria-label="Photo précédente"
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-gold-light hover:text-gold-light sm:left-6"
          >
            <ChevronLeft size={22} />
          </button>

          <img
            src={galleryImages[activeIndex]}
            alt={`Larry Chanelle & Hermann — photo ${activeIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-2xl"
          />

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setActiveIndex((i) => (i + 1) % galleryImages.length); }}
            aria-label="Photo suivante"
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/20 text-cream transition-colors hover:border-gold-light hover:text-gold-light sm:right-6"
          >
            <ChevronRight size={22} />
          </button>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-label text-xs uppercase tracking-[0.2em] text-cream/60">
            {activeIndex + 1} / {galleryImages.length}
          </p>
        </div>
      )}
    </section>
  );
}
