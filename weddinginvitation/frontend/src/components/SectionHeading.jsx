export default function SectionHeading({ eyebrow, title, light = false, className = '' }) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {eyebrow && (
        <p
          className={`font-label text-xs uppercase tracking-[0.3em] ${
            light ? 'text-gold-light' : 'text-gold-deep'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`mt-3 font-display text-4xl sm:text-5xl ${
          light ? 'text-cream' : 'gold-gradient-text'
        }`}
      >
        {title}
      </h2>
      <div className="divider-ornament mt-5">
        <span className={`h-1.5 w-1.5 rounded-full ${light ? 'bg-gold-light' : 'bg-gold'}`} />
      </div>
    </div>
  );
}
