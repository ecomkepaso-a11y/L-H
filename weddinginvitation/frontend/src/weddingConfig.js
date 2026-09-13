// Central place to edit the wedding's details.
// Update this file to reuse the site for a different couple/event.

export const couple = {
  initials: 'L&H',
  names: 'Larry Chanelle & Hermann',
  firstNames: { her: 'Larry Chanelle', him: 'Hermann' },
  tagline: 'Pour toujours...',
  dateRange: '11 & 12 Décembre 2026',
  location: 'Yaoundé, Cameroun',
  whatsappNumber: '237698626193', // digits only, country code first
  rsvpDeadline: '1er Novembre 2026',
  countdownTarget: '2026-12-11T09:00:00',
};

export const events = [
  {
    id: 'traditionnel',
    icon: 'leaf',
    image: '/images/events/traditional.jpg',
    day: '11',
    month: 'DÉCEMBRE 2026',
    dateLong: 'Vendredi 11 Décembre 2026',
    title: 'Mariage Traditionnel',
    venue: 'Fougerolle',
    city: 'Yaoundé',
    time: '12H00',
    dress: 'Tenue traditionnelle',
    summaryShort: 'Immersion dans nos traditions, danses culturelles et célébration de nos racines africaines.',
    summaryLong: 'Danses, chants et couleurs africaines dans la joie et la convivialité familiale. Billet physique exigé à l’entrée',
    mapsQuery: 'Fougerolle, Yaoundé, Cameroun',
  },
  {
    id: 'religieux',
    icon: 'church',
    day: '12',
    month: 'DÉCEMBRE 2026',
    dateLong: 'Samedi 12 Décembre 2026',
    title: 'Mariage Religieux',
    venue: 'Awae',
    city: 'Yaoundé',
    time: 'A partir de 13H00',
    dress: 'Theme: Dusty Rose Champagne',
    summaryShort: 'Union sacrée sous le regard de Dieu, réception somptueuse et soirée inoubliable.',
    summaryLong: 'Cérémonie bénie, puis réception somptueuse et soirée de fête inoubliable. Billet physique exigé à l’entrée',
    mapsQuery: 'Hotel Prodige, Awae, Yaoundé, Cameroun',
  },
];

// Bold, full-bleed statement sections shown right after the hero.
export const loveQuotes = [
  {
    image: '/images/quotes/quote-1.jpg',
    text: 'Chaque grand amour commence par un secret murmuré.',
    subtext: 'Partagez le vôtre avec nous.',
  },
  {
    image: '/images/quotes/quote-2.jpg',
    text: 'Le bonheur est un voyage que nous construisons main dans la main,',
    subtext: 'le cœur rempli de promesses.',
  },
];

export const story = [
  {
    title: 'La Première Rencontre',
    text: 'Deux regards qui se croisent, une complicité immédiate. Le destin avait tout prévu.',
    image: '/images/gallery/raconte.jpeg',
  },
  {
    title: 'Les Premiers Pas',
    text: 'Voyages, rires et souvenirs qui ont scellé une promesse silencieuse.',
    image: '/images/gallery/premierpas.jpeg',
  },
  {
    title: "La Demande",
    text: "Un genou à terre, un cœur qui bat plus fort, et un oui qui a tout changé.",
    image: '/images/gallery/demande.jpeg',
  },
  {
    title: 'Le Grand Jour',
    text: "Aujourd'hui, nous écrivons le premier chapitre de notre vie à deux.",
    image: '/images/gallery/couple-new-04.jpg',
  },
];

// Explicit list so specific photos can be added/removed without renumbering everything.
export const galleryImages = [

  '/images/gallery/couple-01.jpg',
  '/images/gallery/premierpas.jpeg',
  '/images/gallery/couple-10.jpg',
  '/images/gallery/couple-21.jpg',
  '/images/gallery/1.jpeg',
  '/images/gallery/2.jpg',
  '/images/gallery/3.jpg',
  '/images/gallery/4.jpg',
  '/images/gallery/5.jpg',
  '/images/gallery/6.jpeg',
];
