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
    time: '10h00 – 20h00',
    dress: 'Tenue traditionnelle',
    summaryShort: 'Immersion dans nos traditions, danses culturelles et célébration de nos racines africaines.',
    summaryLong: 'Danses, chants et couleurs africaines dans la joie et la convivialité familiale.',
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
    time: '09h00 – 18h00',
    dress: 'Tenue de gala / Wax',
    summaryShort: 'Union sacrée sous le regard de Dieu, réception somptueuse et soirée inoubliable.',
    summaryLong: 'Cérémonie bénie, puis réception somptueuse et soirée de fête inoubliable.',
    mapsQuery: 'Awae, Yaoundé, Cameroun',
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
    image: '/images/gallery/couple-new-10.jpeg',
  },
  {
    title: 'Les Premiers Pas',
    text: 'Voyages, rires et souvenirs qui ont scellé une promesse silencieuse.',
    image: '/images/gallery/couple-new-11.jpeg',
  },
  {
    title: "La Demande",
    text: "Un genou à terre, un cœur qui bat plus fort, et un oui qui a tout changé.",
    image: '/images/gallery/couple-new-12.jpeg',
  },
  {
    title: 'Le Grand Jour',
    text: "Aujourd'hui, nous écrivons le premier chapitre de notre vie à deux.",
    image: '/images/gallery/couple-new-04.jpg',
  },
];

// Explicit list so specific photos can be added/removed without renumbering everything.
export const galleryImages = [

  '/images/gallery/couple-new-01.jpg',
  '/images/gallery/couple-new-02.jpg',
  '/images/gallery/couple-new-03.jpg',
  '/images/gallery/couple-new-04.jpg',
  '/images/gallery/couple-new-05.jpg',
  '/images/gallery/couple-new-06.jpg',
  '/images/gallery/couple-new-07.jpg',
  '/images/gallery/couple-new-08.jpg',
  '/images/gallery/couple-new-09.jpg',
  '/images/gallery/couple-new-13.jpeg',
];
