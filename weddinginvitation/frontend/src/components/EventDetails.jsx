import {
  Leaf,
  Church,
  Calendar,
  Clock,
  MapPin,
  Shirt,
  MapPinned,
} from 'lucide-react';

import SectionHeading from './SectionHeading';
import { events } from '../weddingConfig';

const ICONS = {
  leaf: Leaf,
  church: Church,
};

export default function EventDetails() {
  return (
    <section
      id="details"
      className="
        relative
        overflow-hidden
        bg-gradient-to-b
        from-cream-deep
        to-blush
        px-5
        py-20
        sm:px-10
        sm:py-24
      "
    >
      <div className="mx-auto max-w-6xl">

        {/* Section heading */}
        <SectionHeading
          eyebrow="Programme Complet"
          title="Détails des Événements"
        />

        {/* Events */}
        <div className="mt-12 flex flex-col gap-8 sm:mt-16 sm:gap-10">

          {events.map((event) => {
            const Icon = ICONS[event.icon];

            const mapsHref =
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                event.mapsQuery
              )}`;

            return (
              <article
                key={event.id}
                className="
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-gold/20
                  bg-cream
                  shadow-[0_20px_50px_-25px_rgba(60,40,10,0.35)]
                "
              >

                {/* Gold top accent */}
                <span
                  className="
                    absolute
                    inset-x-0
                    top-0
                    z-10
                    h-1
                    gold-gradient-btn
                  "
                />

                {/* =================================================
                    DESKTOP / MOBILE CONTENT
                    ================================================= */}

                <div
                  className="
                    grid
                    grid-cols-1
                    md:grid-cols-[0.95fr_1.05fr]
                  "
                >

                  {/* =================================================
                      IMAGE
                      ================================================= */}

                  {event.image && (
                    <div
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        overflow-hidden
                        bg-cream-deep

                        md:min-h-[420px]
                      "
                    >
                      <img
                        src={event.image}
                        alt={event.title}
                        loading="lazy"
                        className="
                          block
                          h-auto
                          w-full
                          object-contain

                          md:max-h-[520px]
                        "
                      />
                    </div>
                  )}

                  {/* =================================================
                      EVENT INFORMATION
                      ================================================= */}

                  <div
                    className="
                      flex
                      flex-col
                      justify-center
                      p-6

                      sm:p-8

                      md:p-10
                      lg:p-12
                    "
                  >

                    {/* Event icon */}
                    <span
                      className="
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        bg-cream-deep
                      "
                    >
                      <Icon
                        size={22}
                        className="text-gold-deep"
                        strokeWidth={1.75}
                      />
                    </span>

                    {/* Title */}
                    <h3
                      className="
                        mt-5
                        font-display
                        text-2xl
                        leading-tight
                        text-ink

                        sm:text-3xl

                        md:text-[2rem]
                      "
                    >
                      {event.title}
                    </h3>

                    {/* Event details */}
                    <ul
                      className="
                        mt-6
                        flex
                        flex-col
                        gap-4
                        text-cocoa
                      "
                    >

                      {/* Date */}
                      <li className="flex items-start gap-3">
                        <Calendar
                          size={17}
                          className="mt-0.5 shrink-0 text-gold-deep"
                        />

                        <span className="text-sm leading-6 sm:text-[15px]">
                          {event.dateLong}
                        </span>
                      </li>

                      {/* Time */}
                      <li className="flex items-start gap-3">
                        <Clock
                          size={17}
                          className="mt-0.5 shrink-0 text-gold-deep"
                        />

                        <span className="text-sm leading-6 sm:text-[15px]">
                          {event.time}
                        </span>
                      </li>

                      {/* Location */}
                      <li className="flex items-start gap-3">
                        <MapPin
                          size={17}
                          className="mt-0.5 shrink-0 text-gold-deep"
                        />

                        <span className="text-sm leading-6 sm:text-[15px]">
                          {event.venue}, {event.city}
                        </span>
                      </li>

                      {/* Dress code */}
                      <li className="flex items-start gap-3">
                        <Shirt
                          size={17}
                          className="mt-0.5 shrink-0 text-gold-deep"
                        />

                        <span className="text-sm leading-6 sm:text-[15px]">
                          {event.dress}
                        </span>
                      </li>

                    </ul>

                    {/* Description */}
                    <p
                      className="
                        mt-6
                        text-sm
                        leading-7
                        text-cocoa/85

                        sm:text-[15px]
                      "
                    >
                      {event.summaryLong}
                    </p>

                    {/* Google Maps */}
                    <a
                      href={mapsHref}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        gold-gradient-btn
                        mt-7
                        inline-flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-full
                        px-6
                        py-3.5
                        font-label
                        text-[11px]
                        font-medium
                        uppercase
                        tracking-[0.18em]
                        text-espresso
                        shadow-[0_10px_25px_-10px_rgba(168,118,31,0.6)]
                        transition-transform
                        hover:scale-[1.01]
                        active:scale-[0.99]

                        md:w-fit
                      "
                    >
                      <MapPinned size={16} />
                      Ouvrir Google Maps
                    </a>

                  </div>

                </div>

              </article>
            );
          })}

        </div>
      </div>
    </section>
  );
}