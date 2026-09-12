import { Leaf, Church, MapPin, Clock } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { events } from '../weddingConfig';

const ICONS = { leaf: Leaf, church: Church };

export default function Celebrations() {
  return (
    <section id="celebrations" className="relative bg-cream px-6 py-24 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Les Grandes Dates" title="Nos Célébrations" />

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {events.map((event, i) => {
            const Icon = ICONS[event.icon];
            return (
              <article
                key={event.id}
                className="group relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-b from-cream-deep to-blush p-8 shadow-[0_20px_50px_-25px_rgba(60,40,10,0.35)] transition-transform duration-500 hover:-translate-y-1.5"
              >
                <span className="absolute inset-x-0 top-0 h-1 gold-gradient-btn" />

                <div className="flex flex-col items-center text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream shadow-inner">
                    <Icon size={24} className="text-gold-deep" strokeWidth={1.75} />
                  </span>

                  <p className="mt-6 font-display text-6xl gold-gradient-text">{event.day}</p>
                  <p className="mt-1 font-label text-xs uppercase tracking-[0.3em] text-cocoa/70">{event.month}</p>

                  <div className="divider-ornament mt-5 w-full">
                    <span className="h-1 w-1 rounded-full bg-gold" />
                  </div>

                  <h3 className="mt-5 font-display text-2xl text-ink">{event.title}</h3>

                  <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-cream px-4 py-1.5 font-label text-[11px] uppercase tracking-wide text-cocoa">
                    <MapPin size={13} className="text-gold-deep" />
                    {event.venue} · {event.city}
                  </span>

                  <p className="mt-5 text-[15px] leading-relaxed text-cocoa/90">{event.summaryShort}</p>

                  <span className="mt-6 inline-flex items-center gap-1.5 font-label text-xs text-gold-deep">
                    <Clock size={14} />
                    {event.time}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
