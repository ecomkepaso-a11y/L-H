import { Mouse } from 'lucide-react';
import { couple } from '../weddingConfig';

const PETALS = [
  { top: '12%', left: '8%', size: 22, delay: '0s', rotate: '-12deg' },
  { top: '20%', left: '82%', size: 16, delay: '1.2s', rotate: '18deg' },
  { top: '68%', left: '6%', size: 18, delay: '0.6s', rotate: '6deg' },
  { top: '78%', left: '88%', size: 24, delay: '1.8s', rotate: '-20deg' },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="
        relative
        min-h-[100svh]
        overflow-hidden
        bg-espresso
      "
    >

      {/* =====================================================
          MOBILE BACKGROUND
          ===================================================== */}

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
              rgba(15,10,6,0.42) 0%,
              rgba(15,10,6,0.28) 40%,
              rgba(15,10,6,0.82) 100%
            ),
            url('/images/gallery/couple-11.jpg')
          `,
        }}
        role="img"
        aria-label="Photo du couple"
      />


      {/* =====================================================
          DESKTOP PHOTO PANEL
          ===================================================== */}

      <div
        className="
          absolute
          inset-y-0
          right-0
          hidden
          w-[48%]
          overflow-hidden
          md:block
          lg:w-[46%]
        "
      >

        <img
          src="/images/gallery/couple-11.jpg"
          alt="Photo du couple"
          className="
            h-full
            w-full
            object-cover
            object-center
          "
        />

        {/* Fade photo into the dark background */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-espresso
            via-espresso/25
            to-transparent
          "
        />

        {/* Bottom fade */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-40
            bg-gradient-to-t
            from-espresso
            to-transparent
          "
        />

      </div>


      {/* =====================================================
          DECORATIVE PETALS
          ===================================================== */}

      {PETALS.map((p, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="absolute rounded-full opacity-30"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background:
              'radial-gradient(circle at 30% 30%, #f4c9a8, transparent 70%)',
            animation: `float-slow 7s ease-in-out ${p.delay} infinite`,
            transform: `rotate(${p.rotate})`,
          }}
        />
      ))}


      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-[100svh]
          w-full
          flex-col
          items-center
          justify-center
          px-6
          pb-24
          pt-24
          text-center
          text-cream

          md:items-start
          md:justify-center
          md:px-12
          md:pb-20
          md:pt-20
          md:text-left

          lg:px-20
          xl:px-28
        "
      >

        <div
          className="
            w-full
            max-w-xl

            md:max-w-[520px]
            lg:max-w-[560px]
          "
        >

          {/* =================================================
              MONOGRAM
              ================================================= */}

          <div
            className="
              animate-fade-up
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              border
              border-gold-light/60
              font-script
              text-lg
              text-gold-light

              md:h-16
              md:w-16
              md:text-xl
            "
            style={{ animationDelay: '0s' }}
          >
            {couple.initials}
          </div>


          {/* =================================================
              LABEL
              ================================================= */}

          <p
            className="
              animate-fade-up
              mt-7
              font-label
              text-[10px]
              uppercase
              tracking-[0.3em]
              text-cream/75

              sm:text-xs
              sm:tracking-[0.35em]
            "
            style={{ animationDelay: '0.1s' }}
          >
            Célébration de Mariage
          </p>


          {/* =================================================
              TITLE
              ================================================= */}

          <h1
            className="
              animate-fade-up
              mt-3
              font-script
              text-6xl
              leading-[0.95]
              text-cream

              sm:text-8xl

              md:text-[6.5rem]
              lg:text-[7.5rem]
            "
            style={{ animationDelay: '0.25s' }}
          >
            Invitation
          </h1>


          {/* =================================================
              DIVIDER
              ================================================= */}

          <div
            className="
              animate-fade-up
              mt-7
              flex
              max-w-md
              items-center
              gap-4

              md:max-w-sm
            "
            style={{ animationDelay: '0.4s' }}
          >

            <span
              className="
                h-px
                flex-1
                bg-gradient-to-r
                from-transparent
                to-gold-light/60
              "
            />

            <span
              className="
                h-1.5
                w-1.5
                shrink-0
                rounded-full
                bg-gold-light
              "
            />

            <span
              className="
                h-px
                flex-1
                bg-gradient-to-l
                from-transparent
                to-gold-light/60
              "
            />

          </div>


          {/* =================================================
              NAMES
              ================================================= */}

          <h2
            className="
              animate-fade-up
              mt-6
              font-display
              text-2xl
              text-cream

              sm:text-3xl

              md:text-3xl
              lg:text-4xl
            "
            style={{ animationDelay: '0.5s' }}
          >
            {couple.names}
          </h2>


          {/* =================================================
              DATE / LOCATION
              ================================================= */}

          <p
            className="
              animate-fade-up
              mt-3
              font-label
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-gold-light

              sm:text-xs
              sm:tracking-[0.25em]

              md:text-xs
              lg:text-sm
            "
            style={{ animationDelay: '0.6s' }}
          >
            {couple.dateRange}

            <span className="mx-2 text-cream/40">
              ·
            </span>

            {couple.location}
          </p>


          {/* =================================================
              DESKTOP DECORATIVE TEXT
              ================================================= */}

          <div
            className="
              animate-fade-up
              mt-8
              hidden
              items-center
              gap-3
              font-script
              text-xl
              text-gold-light/75

              md:flex
            "
            style={{ animationDelay: '0.7s' }}
          >
            <span>✦</span>
            <span>Avec amour</span>
            <span>✦</span>
          </div>

        </div>

      </div>


      {/* =====================================================
          SCROLL INDICATOR
          ===================================================== */}

      <a
        href="#celebrations"
        className="
          animate-fade-up
          absolute
          bottom-7
          left-1/2
          z-20
          flex
          -translate-x-1/2
          flex-col
          items-center
          gap-2
          text-cream/70
          transition-colors
          hover:text-gold-light

          md:bottom-8
        "
        style={{ animationDelay: '0.8s' }}
        aria-label="Défiler vers la suite"
      >

        <span
          className="
            font-label
            text-[10px]
            uppercase
            tracking-[0.3em]
          "
        >
          Défiler
        </span>

        <Mouse
          size={19}
          className="animate-bounce"
        />

      </a>

    </section>
  );
}