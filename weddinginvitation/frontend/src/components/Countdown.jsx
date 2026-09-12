import { useEffect, useState } from 'react';
import { couple } from '../weddingConfig';

function getTimeLeft(target) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  const seconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

const UNITS = [
  { key: 'days', label: 'Jours' },
  { key: 'hours', label: 'Heures' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Secondes' },
];

export default function Countdown() {
  const [time, setTime] = useState(() => getTimeLeft(couple.countdownTarget));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(couple.countdownTarget)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-espresso px-6 py-24 sm:px-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(232,200,116,0.18), transparent 45%), radial-gradient(circle at 80% 70%, rgba(201,152,47,0.16), transparent 40%)',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <p className="font-label text-xs uppercase tracking-[0.3em] text-gold-light/80">Plus que...</p>
        <h2 className="mt-3 font-display text-4xl text-cream sm:text-5xl">Compte à Rebours</h2>
        <p className="mt-3 font-script text-3xl text-gold-light sm:text-4xl">{couple.dateRange.split('&')[0].trim()} Décembre 2026</p>

        <div className="mt-14 grid w-full grid-cols-4 gap-3 sm:gap-6">
          {UNITS.map((unit) => (
            <div
              key={unit.key}
              className="flex flex-col items-center rounded-2xl border border-gold/25 bg-gradient-to-b from-[#3a2a1a] to-[#241609] px-2 py-5 shadow-[0_15px_35px_-15px_rgba(0,0,0,0.6)] sm:py-7"
            >
              <span className="font-display text-3xl gold-gradient-text tabular-nums sm:text-5xl">
                {String(time[unit.key]).padStart(2, '0')}
              </span>
              <span className="mt-2 font-label text-[10px] uppercase tracking-[0.2em] text-cream/70 sm:text-xs">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
