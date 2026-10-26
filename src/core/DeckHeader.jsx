import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, HelpCircle, Sun, Moon, Monitor, EyeOff } from 'lucide-react';

export default function DeckHeader({
  activeSection,
  slide,
  deckList,
  activeDeckId,
  onSelectDeck,
  showSpeakerNotes,
  setShowSpeakerNotes,
  currentSlide,
  totalSlides,
  theme,
  cycleTheme,
  isZenMode,
  setIsZenMode,
  isFullscreen,
  toggleFullscreen,
}) {
  return (
    <AnimatePresence>
      {!isZenMode && (
        <motion.header
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="flex justify-between items-center px-6 py-2.5 border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md z-20 shrink-0"
        >
          {/* Lado izquierdo: Miembro y Título de Slide */}
          <div className="flex items-center gap-4">
            <div
              className={`px-3 py-1 rounded-lg bg-gradient-to-r ${activeSection?.color || 'from-blue-600 to-indigo-600'} text-black font-extrabold text-xs shadow-lg uppercase tracking-wider`}
            >
              {activeSection?.member || 'Expositor'}
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                {slide.title}
              </h1>
              <p className="text-xs text-cyan-600 dark:text-cyan-400 font-mono">{slide.subtitle}</p>
            </div>
          </div>

          {/* Lado derecho: Selector de temas y controles */}
          <div className="flex items-center gap-3">
            {/* Switcher dinámico de Decks */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-300 dark:border-slate-800">
              {deckList.map((deck) => {
                const isActive = deck.id === activeDeckId;
                return (
                  <button
                    key={deck.id}
                    onClick={() => onSelectDeck(deck.id)}
                    className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                      isActive
                        ? deck.id === 'stats'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'bg-purple-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    {deck.shortTitle}
                  </button>
                );
              })}
            </div>

            {/* Botón de Guion / Notas */}
            <button
              onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                showSpeakerNotes
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-700 dark:text-amber-300'
                  : 'bg-slate-100 dark:bg-slate-900 border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <HelpCircle size={14} /> [HABLAR] Guión
            </button>

            {/* Contador de Slides */}
            <span className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-800">
              {currentSlide + 1} / {totalSlides}
            </span>

            {/* Ciclo de Tema (Dark / Light / Auto) */}
            <button
              onClick={cycleTheme}
              aria-label={`Tema: ${theme === 'system' ? 'Automático' : theme === 'dark' ? 'Oscuro' : 'Claro'} — click o tecla T para cambiar`}
              title={`Tema: ${theme} (T para cambiar)`}
              className={`px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1 transition-all border ${
                theme === 'system'
                  ? 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                  : theme === 'dark'
                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-300 dark:border-slate-700'
                    : 'bg-white text-slate-900 border-slate-300'
              }`}
            >
              {theme === 'light' && <Sun size={14} />}
              {theme === 'dark' && <Moon size={14} />}
              {theme === 'system' && <Monitor size={14} />}
              <span className="uppercase">{theme === 'system' ? 'Auto' : theme === 'dark' ? 'Dark' : 'Light'}</span>
            </button>

            {/* Modo Zen */}
            <button
              onClick={() => setIsZenMode(true)}
              className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all flex items-center gap-1 text-xs font-semibold"
              title="Modo Zen (Ocultar barras para 100% espacio - Tecla H)"
            >
              <EyeOff size={15} />
              <span className="hidden sm:inline">Zen (H)</span>
            </button>

            {/* Pantalla Completa */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-400 dark:hover:border-slate-600 transition-all"
              title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
