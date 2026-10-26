import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

export default function DeckFooter({
  slides,
  currentSlide,
  setCurrentSlide,
  sections,
  activeSectionId,
  isZenMode,
  setIsZenMode,
  prevSlide,
  nextSlide,
}) {
  return (
    <AnimatePresence>
      {!isZenMode ? (
        <motion.footer
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="px-6 py-2.5 border-t border-slate-200 dark:border-slate-800/80 bg-white/95 dark:bg-slate-950/95 flex flex-col gap-2 z-20 shrink-0"
        >
          {/* Barra de progreso segmentada */}
          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden flex">
            {slides.map((s, idx) => (
              <div
                key={s.id}
                onClick={() => setCurrentSlide(idx)}
                className={`flex-1 h-full cursor-pointer transition-all border-r border-white dark:border-slate-950 ${
                  idx === currentSlide
                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500 shadow-glow'
                    : idx < currentSlide
                      ? 'bg-slate-500 dark:bg-slate-700'
                      : 'bg-slate-200 dark:bg-slate-900'
                }`}
              />
            ))}
          </div>

          {/* Secciones y botones de navegación */}
          <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-400">
            <div className="flex gap-2">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  title={`${sec.title} — ${sec.member}`}
                  onClick={() => {
                    const firstIdx = slides.findIndex((s) => s.section === sec.id);
                    if (firstIdx !== -1) setCurrentSlide(firstIdx);
                  }}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                    activeSectionId === sec.id
                      ? 'bg-slate-200 dark:bg-slate-800 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40'
                      : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  P{sec.id}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                title="Diapositiva anterior (Flecha Izquierda)"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
                title="Diapositiva siguiente (Flecha Derecha / Espacio)"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </motion.footer>
      ) : (
        /* Modo Zen: Barra ultra delgada de 3px pegada al fondo + botón para salir */
        <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center">
          <button
            onClick={() => setIsZenMode(false)}
            className="mb-2 px-3 py-1 rounded-full bg-slate-900/80 hover:bg-slate-900 text-slate-400 hover:text-white border border-slate-700/60 backdrop-blur-md text-[11px] font-mono flex items-center gap-1.5 opacity-40 hover:opacity-100 transition-opacity shadow-lg cursor-pointer"
            title="Salir de Modo Zen (Tecla H o Z)"
          >
            <Eye size={12} />
            <span>Mostrar Barras (H)</span>
          </button>

          <div className="w-full h-1 bg-slate-900/60 overflow-hidden flex">
            {slides.map((s, idx) => (
              <div
                key={s.id}
                className={`flex-1 h-full transition-all ${
                  idx === currentSlide
                    ? 'bg-purple-500 shadow-glow'
                    : idx < currentSlide
                      ? 'bg-slate-700'
                      : 'bg-transparent'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
