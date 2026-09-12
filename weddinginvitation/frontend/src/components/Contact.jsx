import { MessageCircle, MapPinned } from 'lucide-react';
import { couple } from '../weddingConfig';

export default function Contact() {
  const whatsappHref = `https://wa.me/${couple.whatsappNumber}`;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(couple.location)}`;

  return (
    <section id="contact" className="relative bg-cream px-6 py-24 sm:px-10">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <h2 className="font-script text-4xl gold-gradient-text sm:text-5xl">Restons en Contact</h2>
        <div className="divider-ornament mt-5">
          <span className="h-1.5 w-1.5 rounded-full bg-gold" />
        </div>
        <p className="mt-5 text-cocoa/85">Pour toute question, écrivez-nous directement.</p>

        <div className="mt-9 flex w-full flex-col gap-4">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2.5 rounded-full bg-[#25D366] px-6 py-4 font-label text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_10px_25px_-10px_rgba(37,211,102,0.6)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
          >
            <MessageCircle size={18} />
            Contact WhatsApp
          </a>

          <a
            href={mapsHref}
            target="_blank"
            rel="noreferrer"
            className="gold-gradient-btn flex w-full items-center justify-center gap-2.5 rounded-full px-6 py-4 font-label text-xs font-semibold uppercase tracking-[0.2em] text-espresso shadow-[0_10px_25px_-10px_rgba(168,118,31,0.6)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
          >
            <MapPinned size={18} />
            Google Maps
          </a>
        </div>
      </div>
    </section>
  );
}
