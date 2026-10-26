import { SECTIONS_STATS, getStatsSlides } from '../../deckStats';

export { SECTIONS_STATS, getStatsSlides };

export const statsDeck = {
  id: 'stats',
  title: 'Estadística Inferencial y Toma de Decisiones',
  shortTitle: 'Estadística Inferencial',
  subject: 'Probabilidad y Estadística',
  sections: SECTIONS_STATS,
  getSlides: getStatsSlides,
  darkOnly: true,
};
