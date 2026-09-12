import { Sparkles } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { story } from '../weddingConfig';

export default function OurStory() {
  return (
    <section
      id="histoire"
      className="relative overflow-hidden bg-cream px-5 py-20 sm:px-10 sm:py-24"
    >
      <div className="mx-auto max-w-5xl">

        <SectionHeading
          eyebrow="Ils se sont rencontrés"
          title="Notre Histoire"
        />

        <div className="relative mt-14 sm:mt-16">

          {/* Connecting line — desktop only */}
          <div
            className="
              absolute
              left-1/2
              top-0
              hidden
              h-full
              w-px
              -translate-x-1/2
              bg-gradient-to-b
              from-transparent
              via-gold/40
              to-transparent
              md:block
            "
          />

          <ol className="flex flex-col gap-8 sm:gap-10 md:gap-14">

            {story.map((chapter, i) => {
              const alignEnd = i % 2 === 1;

              return (
                <li
                  key={chapter.title}
                  className={`
                    relative
                    flex
                    md:items-center
                    ${alignEnd
                      ? 'md:flex-row-reverse'
                      : 'md:flex-row'}
                  `}
                >

                  {/* Story card */}
                  <div
                    className={`
                      w-full
                      md:w-1/2
                      ${alignEnd
                        ? 'md:pl-12'
                        : 'md:pr-12'}
                    `}
                  >

                    <article
                      className="
                        overflow-hidden
                        rounded-2xl
                        border
                        border-gold/20
                        bg-gradient-to-br
                        from-cream-deep
                        to-blush
                        shadow-[0_16px_40px_-24px_rgba(60,40,10,0.4)]
                      "
                    >

                      {/* =========================
                          IMAGE
                          ========================= */}

                      {chapter.image && (
                        <div
                          className={`
                            w-full
                            bg-cream-deep
                            md:flex
                            md:h-52
                            ${alignEnd
                              ? 'md:flex-row-reverse'
                              : ''}
                          `}
                        >

                          <img
                            src={chapter.image}
                            alt={chapter.title}
                            loading="lazy"
                            className="
                              block
                              h-auto
                              w-full
                              object-contain

                              md:h-full
                              md:w-40
                              md:shrink-0
                              md:object-cover
                            "
                          />

                        </div>
                      )}

                      {/* =========================
                          TEXT
                          ========================= */}

                      <div className="p-5 sm:p-6 md:p-7">

                        <h3
                          className="
                            font-display
                            text-xl
                            leading-tight
                            text-ink
                            sm:text-2xl
                          "
                        >
                          {chapter.title}
                        </h3>

                        <p
                          className="
                            mt-3
                            text-[14px]
                            leading-7
                            text-cocoa/90
                            sm:text-[15px]
                          "
                        >
                          {chapter.text}
                        </p>

                      </div>

                    </article>

                  </div>

                  {/* Timeline marker — desktop only */}
                  <span
                    className="
                      absolute
                      left-1/2
                      top-1/2
                      hidden
                      h-9
                      w-9
                      -translate-x-1/2
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-gold/40
                      bg-cream
                      shadow-md
                      md:flex
                    "
                  >
                    <Sparkles
                      size={15}
                      className="text-gold-deep"
                    />
                  </span>

                </li>
              );
            })}

          </ol>
        </div>
      </div>
    </section>
  );
}