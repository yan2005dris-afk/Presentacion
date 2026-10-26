import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { useSlideStep } from '../context/SlideStepContext';
import DeckHeader from './DeckHeader';
import DeckFooter from './DeckFooter';
import SpeakerNotesDrawer from './SpeakerNotesDrawer';

export default function DeckContainer({
  deck,
  deckList,
  activeDeckId,
  onSelectDeck,
  currentSlide,
  setCurrentSlide,
}) {
  const [showSpeakerNotes, setShowSpeakerNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZenMode, setIsZenMode] = useState(false);
  const { theme, cycle } = useTheme();
  const { nextStep, prevStep } = useSlideStep();

  // Escuchar cambios de fullscreen del navegador
  useEffect(() => {
    const onFSChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFSChange);
    return () => document.removeEventListener('fullscreenchange', onFSChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Generar slides del deck actual
  const handleSelectSection = useCallback(
    (secId) => {
      if (deck.id === 'stats') {
        const idx = slides.findIndex((s) => s.section === secId);
        if (idx !== -1) setCurrentSlide(idx);
      } else {
        const idx = slides.findIndex((s) => s.id === `${secId}.intro`);
        if (idx !== -1) setCurrentSlide(idx);
      }
    },
    [deck.id, setCurrentSlide]
  );

  const slides = useMemo(() => {
    return deck.getSlides(handleSelectSection);
  }, [deck, handleSelectSection]);

  const sections = deck.sections;

  // Navegación por pasos internos o cambio de diapositiva
  const nextSlide = useCallback(() => {
    const handledByStep = nextStep();
    if (!handledByStep) {
      setCurrentSlide((c) => Math.min(c + 1, slides.length - 1));
    }
  }, [nextStep, setCurrentSlide, slides.length]);

  const prevSlide = useCallback(() => {
    const handledByStep = prevStep();
    if (!handledByStep) {
      setCurrentSlide((c) => Math.max(c - 1, 0));
    }
  }, [prevStep, setCurrentSlide]);

  // Manejo de eventos de teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      const tag = document.activeElement?.tagName;
      const isEditable =
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        document.activeElement?.isContentEditable;

      if (isEditable) return;

      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        nextSlide();
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }

      // Atajo 'H' o 'Z' para alternar Modo Zen
      if ((e.key === 'h' || e.key === 'H' || e.key === 'z' || e.key === 'Z') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setIsZenMode((prev) => !prev);
      }

      // Atajo 'T' para alternar tema
      if ((e.key === 't' || e.key === 'T') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        cycle();
      }

      // Atajo 'S' para alternar guion del orador
      if ((e.key === 's' || e.key === 'S') && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setShowSpeakerNotes((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, cycle]);

  const slide = slides[currentSlide] || slides[0];
  const activeSection = sections.find((s) => s.id === slide.section) || sections[0];

  return (
    <div
      className={`flex flex-col h-screen w-screen ${
        deck.darkOnly ? 'dark' : ''
      } bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans select-none overflow-hidden border-4 border-slate-200 dark:border-slate-900 relative`}
    >
      {/* Fondo con patrón de cuadrícula radial sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 dark:opacity-30 pointer-events-none" />

      {/* Barra superior de navegación */}
      <DeckHeader
        activeSection={activeSection}
        slide={slide}
        deckList={deckList}
        activeDeckId={activeDeckId}
        onSelectDeck={onSelectDeck}
        showSpeakerNotes={showSpeakerNotes}
        setShowSpeakerNotes={setShowSpeakerNotes}
        currentSlide={currentSlide}
        totalSlides={slides.length}
        theme={theme}
        cycleTheme={cycle}
        isZenMode={isZenMode}
        setIsZenMode={setIsZenMode}
        isFullscreen={isFullscreen}
        toggleFullscreen={toggleFullscreen}
      />

      {/* Contenedor principal de la diapositiva */}
      <main className="flex-1 relative px-3 py-2 sm:px-6 sm:py-4 md:px-8 md:py-6 z-10 overflow-y-auto flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${deck.id}-${slide.id}`}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-full max-w-6xl xl:max-w-7xl mx-auto my-auto"
          >
            {slide.component}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Drawer inferior de notas del orador */}
      <SpeakerNotesDrawer show={showSpeakerNotes} speakerText={slide.speaker} />

      {/* Barra inferior de navegación y progreso */}
      <DeckFooter
        slides={slides}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        sections={sections}
        activeSectionId={slide.section}
        isZenMode={isZenMode}
        setIsZenMode={setIsZenMode}
        prevSlide={prevSlide}
        nextSlide={nextSlide}
      />
    </div>
  );
}
