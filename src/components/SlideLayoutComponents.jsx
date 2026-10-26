import React from 'react';

/**
 * Contenedor estándar y responsive para todas las diapositivas.
 * Mantiene la proporción, evita tener que hacer zoom manual y centra verticalmente el contenido.
 */
export function SlideContainer({ children, className = '' }) {
  return (
    <div className={`w-full max-w-5xl 2xl:max-w-6xl mx-auto px-2 sm:px-4 py-2 space-y-3 sm:space-y-4 ${className}`}>
      {children}
    </div>
  );
}

/**
 * Cabecera uniforme para diapositivas con badge de orador, bloque y título adaptable.
 */
export function SlideHeader({ 
  badge, 
  speaker, 
  title, 
  subtitle, 
  rightElement,
  badgeColor = "text-purple-400 bg-purple-500/10 border-purple-500/30"
}) {
  return (
    <div className="border-b border-slate-800 pb-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      <div>
        <div className="flex items-center gap-2">
          {badge && (
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400">
              {badge}
            </span>
          )}
          {speaker && (
            <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-bold ${badgeColor}`}>
              Expositor: {speaker}
            </span>
          )}
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight mt-0.5">
          {title}
        </h2>
        {subtitle && (
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5 font-normal">
            {subtitle}
          </p>
        )}
      </div>

      {rightElement && (
        <div className="shrink-0 flex items-center">
          {rightElement}
        </div>
      )}
    </div>
  );
}

/**
 * Tarjeta interactiva con padding fluido que no se desborda en pantallas medianas.
 */
export function SlideCard({ children, className = '', highlight = false }) {
  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-slate-900/90 border transition-all ${
      highlight ? 'border-purple-500/50 shadow-lg shadow-purple-500/10' : 'border-slate-800'
    } ${className}`}>
      {children}
    </div>
  );
}
