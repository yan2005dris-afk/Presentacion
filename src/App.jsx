import React, { useState, useEffect } from 'react';
import { SlideStepProvider } from './context/SlideStepContext';
import DeckContainer from './core/DeckContainer';
import { getDeck, getDeckList, DEFAULT_DECK_ID } from './decks/registry';

export default function App() {
  // Detectar deck por query param (?deck=simd o ?deck=stats), fallback al default
  const [deckId, setDeckId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const paramDeck = params.get('deck');
    return paramDeck === 'simd' || paramDeck === 'stats' ? paramDeck : DEFAULT_DECK_ID;
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  // Sincronizar parámetro en la URL al cambiar de deck
  const handleSelectDeck = (newDeckId) => {
    if (newDeckId !== deckId) {
      setDeckId(newDeckId);
      setCurrentSlide(0);
      const url = new URL(window.location.href);
      url.searchParams.set('deck', newDeckId);
      window.history.pushState({}, '', url.toString());
    }
  };

  // Escuchar cambios de historial (atrás / adelante del navegador)
  useEffect(() => {
    const onPopState = () => {
      const params = new URLSearchParams(window.location.search);
      const paramDeck = params.get('deck');
      if (paramDeck && (paramDeck === 'simd' || paramDeck === 'stats')) {
        setDeckId(paramDeck);
        setCurrentSlide(0);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const activeDeck = getDeck(deckId);
  const deckList = getDeckList();

  return (
    <SlideStepProvider currentSlide={currentSlide}>
      <DeckContainer
        deck={activeDeck}
        deckList={deckList}
        activeDeckId={deckId}
        onSelectDeck={handleSelectDeck}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
    </SlideStepProvider>
  );
}
