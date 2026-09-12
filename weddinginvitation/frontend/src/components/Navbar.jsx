import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { couple } from '../weddingConfig';

const LINKS = [
  { href: '#celebrations', label: 'Célébrations' },
  { href: '#histoire', label: 'Notre Histoire' },
  { href: '#galerie', label: 'Galerie' },
  { href: '#details', label: 'Programme' },
  { href: '#rsvp', label: 'RSVP' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-cream/90 backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.06)]' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10">
        <a
          href="#top"
          className={`font-script text-3xl tracking-wide transition-colors ${
            scrolled ? 'text-gold-deep' : 'text-cream'
          }`}
        >
          {couple.initials}
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`font-label text-[13px] uppercase tracking-[0.14em] transition-colors hover:text-gold ${
                  scrolled ? 'text-cocoa' : 'text-cream/90'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`rounded-full p-2 transition-colors md:hidden ${
            scrolled ? 'text-cocoa' : 'text-cream'
          }`}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="flex flex-col gap-1 bg-cream/95 px-6 pb-6 pt-2 backdrop-blur-md">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 font-label text-sm uppercase tracking-[0.14em] text-cocoa transition-colors hover:bg-cream-deep hover:text-gold-deep"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
