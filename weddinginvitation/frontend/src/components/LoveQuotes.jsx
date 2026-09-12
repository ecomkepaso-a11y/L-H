import { loveQuotes } from '../weddingConfig';

export default function LoveQuotes() {
  return (
    <section
      aria-label="Messages d'amour"
      className="bg-espresso"
    >
      {loveQuotes.map((quote, i) => {
        // Alternate the image position on desktop
        const imageLeft = i % 2 === 1;

        return (
          <div
            key={i}
            className="
              relative
              min-h-[70vh]
              overflow-hidden
              bg-espresso

              sm:min-h-[80vh]

              md:min-h-[620px]
            "
          >

            {/* =================================================
                MOBILE IMAGE

                Full-screen background is kept on mobile because
                the portrait composition works much better there.
                ================================================= */}

            <div
              className="
                absolute
                inset-0
                bg-cover
                bg-center
                md:hidden
              "
              style={{
                backgroundImage: `
                  linear-gradient(
                    180deg,
                    rgba(15,10,6,0.32) 0%,
                    rgba(15,10,6,0.48) 55%,
                    rgba(15,10,6,0.82) 100%
                  ),
                  url('${quote.image}')
                `,
                backgroundColor: '#1b120c',
              }}
              role="img"
              aria-label="Photo du couple"
            />


            {/* =================================================
                DESKTOP IMAGE PANEL

                The photograph gets its own dedicated area so
                we don't have to crop it to fill the screen.
                ================================================= */}

            <div
              className={`
                absolute
                inset-y-0
                hidden
                w-[44%]
                overflow-hidden
                bg-espresso

                md:block

                ${imageLeft ? 'left-0' : 'right-0'}
              `}
            >

              <img
                src={quote.image}
                alt="Photo du couple"
                loading="lazy"
                className="
                  h-full
                  w-full
                  object-contain
                "
              />

              {/* Soft edge fade */}
              <div
                className={`
                  absolute
                  inset-y-0
                  w-32
                  pointer-events-none

                  ${
                    imageLeft
                      ? 'right-0 bg-gradient-to-l from-espresso to-transparent'
                      : 'left-0 bg-gradient-to-r from-espresso to-transparent'
                  }
                `}
              />

              {/* Bottom fade */}
              <div
                className="
                  absolute
                  inset-x-0
                  bottom-0
                  h-24
                  bg-gradient-to-t
                  from-espresso
                  to-transparent
                  pointer-events-none
                "
              />

            </div>


            {/* =================================================
                DESKTOP BACKGROUND

                Gives the text side a clean dark canvas.
                ================================================= */}

            <div
              className="
                absolute
                inset-0
                hidden
                bg-espresso

                md:block
              "
            />


            {/* =================================================
                DESKTOP IMAGE AGAIN

                Positioned above the background layer.
                ================================================= */}

            <div
              className={`
                absolute
                inset-y-0
                hidden
                w-[44%]
                overflow-hidden
                bg-espresso

                md:block

                ${imageLeft ? 'left-0' : 'right-0'}
              `}
            >

              <img
                src={quote.image}
                alt=""
                aria-hidden="true"
                className="
                  h-full
                  w-full
                  object-contain
                "
              />

              <div
                className={`
                  absolute
                  inset-y-0
                  w-28

                  ${
                    imageLeft
                      ? 'right-0 bg-gradient-to-l from-espresso to-transparent'
                      : 'left-0 bg-gradient-to-r from-espresso to-transparent'
                  }
                `}
              />

            </div>


            {/* =================================================
                QUOTE CONTENT
                ================================================= */}

            <div
              className={`
                relative
                z-10
                flex
                min-h-[70vh]
                items-center
                justify-center
                px-6
                py-20
                text-center

                sm:min-h-[80vh]
                sm:px-10

                md:min-h-[620px]
                md:w-[56%]
                md:px-12
                md:text-left

                lg:px-20

                ${
                  imageLeft
                    ? 'md:ml-auto'
                    : 'md:mr-auto'
                }
              `}
            >

              <div
                className="
                  w-full
                  max-w-xl
                  md:max-w-lg
                "
              >

                {/* Top ornament */}

                <div
                  className="
                    flex
                    items-center
                    justify-center
                    gap-4

                    md:justify-start
                  "
                >
                  <span className="h-px w-14 bg-gold-light/70" />

                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-gold-light
                    "
                  />

                  <span className="h-px w-14 bg-gold-light/70" />
                </div>


                {/* Quote */}

                <p
                  className="
                    mt-8
                    font-display
                    text-3xl
                    italic
                    leading-snug
                    text-cream
                    drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]

                    sm:text-5xl
                    sm:leading-tight

                    md:text-4xl

                    lg:text-5xl
                  "
                >
                  {quote.text}
                </p>


                {/* Subtext */}

                <p
                  className="
                    mt-5
                    font-script
                    text-2xl
                    text-gold-light
                    drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]

                    sm:text-4xl

                    md:text-3xl
                  "
                >
                  {quote.subtext}
                </p>


                {/* Bottom ornament */}

                <div
                  className="
                    mt-8
                    flex
                    items-center
                    justify-center
                    gap-4

                    md:justify-start
                  "
                >
                  <span className="h-px w-14 bg-gold-light/70" />

                  <span
                    className="
                      h-1.5
                      w-1.5
                      rounded-full
                      bg-gold-light
                    "
                  />

                  <span className="h-px w-14 bg-gold-light/70" />
                </div>

              </div>

            </div>

          </div>
        );
      })}
    </section>
  );
}