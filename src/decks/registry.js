import { statsDeck } from './stats/deck';
import { simdDeck } from './simd/deck';

export const DECKS = {
  stats: statsDeck,
  simd: simdDeck,
};

export const DEFAULT_DECK_ID = 'stats';

export const getDeckList = () => Object.values(DECKS);

export const getDeck = (deckId) => {
  return DECKS[deckId] || DECKS[DEFAULT_DECK_ID];
};
