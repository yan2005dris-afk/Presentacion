import React from 'react';
import { ChevronRight, Layers } from 'lucide-react';

// ==========================================
// === PLANTILLA DE HANDOFF (apertura de sección) ===
// ==========================================
// Archivo nuevo y aditivo: no modifica ninguna slide de Said, Yandris,
// Alisson o Gino. Solo les da una puerta de entrada a su bloque.
// Cada expositor puede instanciarla con sus propios textos:
//
//   <SlideIntroSeccion
//     expositor="Said"
//     bloque="A · Describir"
//     titulo="Distribuciones de Probabilidad & Poisson"
//     resumen="…"
//     temas={['…', '…']}
//     tono="cyan"
//     deja="…"
//     puente="…"
//   />

// Paleta por bloque: los mismos tonos que usan los badges y el índice.
const TONOS = {
  cyan: {
    badge: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300',
    punto: 'bg-cyan-400',
    borde: 'border-cyan-500/30',
  },
  purple: {
    badge: 'bg-purple-500/10 border-purple-500/30 text-purple-300',
    punto: 'bg-purple-400',
    borde: 'border-purple-500/30',
  },
  teal: {
    badge: 'bg-teal-500/10 border-teal-500/30 text-teal-300',
    punto: 'bg-teal-400',
    borde: 'border-teal-500/30',
  },
  amber: {
    badge: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    punto: 'bg-amber-400',
    borde: 'border-amber-500/30',
  },
  rose: {
    badge: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
    punto: 'bg-rose-400',
    borde: 'border-rose-500/30',
  },
  blue: {
    badge: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    punto: 'bg-blue-400',
    borde: 'border-blue-500/30',
  },
};

export function SlideIntroSeccion({
  expositor,
  bloque,
  titulo,
  resumen,
  temas = [],
  tono = 'cyan',
  deja = '',
  puente = '',
}) {
  const t = TONOS[tono] || TONOS.cyan;

  return (
    <div className="max-w-4xl mx-auto px-4 py-5 space-y-4">
      {/* Cabecera: bloque + expositor */}
      <div className="flex items-start justify-between gap-5 flex-wrap border-b border-slate-800 pb-4">
        <div className="min-w-0">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-bold uppercase tracking-wider ${t.badge}`}
          >
            <Layers size={12} />
            Bloque {bloque}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-2.5 leading-tight">
            {titulo}
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 leading-relaxed max-w-2xl">{resumen}</p>
        </div>

        <div className="text-right shrink-0">
          <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">Expositor</div>
          <div className="flex items-center justify-end gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${t.punto}`} />
            <span className="text-xl font-black text-white tracking-tight">{expositor}</span>
          </div>
        </div>
      </div>

      {/* Qué va a ver en esta sección */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-2.5">En esta sección</div>
        <ul className="space-y-2">
          {temas.map((s, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-5 h-5 shrink-0 mt-0.5 rounded-md bg-slate-950 border border-slate-800 text-[10px] font-bold text-slate-400 flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-sm text-slate-200 leading-snug">{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* El puente: de dónde viene y a dónde va */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {deja ? (
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-[10px] uppercase tracking-wider text-slate-500">Deja aquí</div>
            <p className="text-xs text-slate-300 leading-relaxed mt-1">{deja}</p>
          </div>
        ) : (
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-[10px] uppercase tracking-wider text-slate-500">Cierra con</div>
            <p className="text-xs text-slate-300 leading-relaxed mt-1">{puente}</p>
          </div>
        )}
        {deja && puente && (
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
            <div className="text-[10px] uppercase tracking-wider text-slate-500">Pasa al bloque siguiente</div>
            <p className="text-xs text-slate-300 leading-relaxed mt-1">{puente}</p>
          </div>
        )}
      </div>

      {/* Remate del handoff */}
      <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
        <ChevronRight size={13} className="text-slate-600" />
        <span>Siguiente: {temas[0] || 'continuamos'}</span>
      </div>
    </div>
  );
}

export default SlideIntroSeccion;
