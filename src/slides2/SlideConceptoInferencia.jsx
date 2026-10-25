import React from 'react';
import { motion } from 'framer-motion';
import { Ruler, Users, Repeat, ArrowRight } from 'lucide-react';
import { normPdf } from './stats';

// ==========================================
// === QUÉ ES LA ESTADÍSTICA INFERENCIAL ===
// ==========================================
// Slide de apertura del deck (stats-0.2). Antes de inferir hay que saber
// qué se infiere: la población (lo que queremos saber) y la muestra (lo que
// observamos). El hueco entre una y otra es el error de muestreo, y de ahí
// salen el intervalo de confianza, el p-valor y α.
//
// Visual: la población como nube de puntos, la muestra destacada, y la
// distribución de las medias muestrales con su rango de respuestas posibles.
// Todo determinista: sin Math.random(), el render es idéntico en cada carga.

const VW = 900;
const VH = 320;

// Panel 1 · la población
const P1_X0 = 24;
const P1_X1 = 310;
const P1_Y = 250;

// Panel 2 · las medias muestrales
const P2_CX = 690;
const P2_BASE = 250;
const P2_AMP = 122;
const P2_ESC = 62;
const P2_LIM = 3.1; // la campana se recorta en ±3.1σ (≈ 99.9 %)

// Nube de puntos determinista: se reparte en x y se concentra en el centro,
// con un jitter de ángulo áureo (misma semilla en cada render).
const PUNTOS = Array.from({ length: 150 }, (_, i) => {
  const u = (i + 0.5) / 150;
  const jx = Math.sin(i * 2.399963) * 8;
  const jy = Math.cos(i * 1.618034) * 26;
  const x = P1_X0 + 14 + u * (P1_X1 - P1_X0 - 28) + jx;
  const densidad = Math.exp(-Math.pow((u - 0.5) / 0.3, 2));
  const y = P1_Y - (16 + 84 * densidad) - jy * (0.45 + 0.55 * densidad);
  return { x, y, esMuestra: i % 11 === 4 };
});

const MUESTRA_ETIQUETAS = PUNTOS.filter((p) => p.esMuestra);

export function SlideConceptoInferencia() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-4">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs uppercase tracking-wider text-blue-400 font-bold">Antes de empezar</span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          ¿Qué es la estadística inferencial?
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
          Describir una población es imposible con datos finitos. Inferir es responder con un error acotado.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Visual */}
        <div className="lg:col-span-2 p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full h-auto select-none">
            {/* rótulos de panel */}
            <text x={P1_X0} y="24" fill="#64748b" fontSize="12" fontWeight="700" letterSpacing="1.5">
              POBLACIÓN
            </text>
            <text x={P1_X0} y="42" fill="#94a3b8" fontSize="12">
              todos los usuarios · todas las peticiones
            </text>

            <text x={530} y="24" fill="#64748b" fontSize="12" fontWeight="700" letterSpacing="1.5">
              MEDIAS MUESTRALES
            </text>
            <text x={530} y="42" fill="#94a3b8" fontSize="12">
              la misma pregunta, muchas respuestas
            </text>

            {/* Panel 1 · nube de puntos */}
            {PUNTOS.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r={p.esMuestra ? 4.5 : 3}
                fill={p.esMuestra ? '#22d3ee' : '#64748b'}
                fillOpacity={p.esMuestra ? 1 : 0.55}
              />
            ))}

            {/* mu de la población */}
            <line
              x1={(P1_X0 + P1_X1) / 2}
              y1={P1_Y - 126}
              x2={(P1_X0 + P1_X1) / 2}
              y2={P1_Y + 10}
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <text x={(P1_X0 + P1_X1) / 2 + 7} y={P1_Y + 28} fill="#fbbf24" fontSize="14" fontWeight="700">
              μ
            </text>

            {/* leyenda de la muestra */}
            <circle cx={P1_X0 + 6} cy={P1_Y + 44} r="4" fill="#22d3ee" />
            <text x={P1_X0 + 16} y={P1_Y + 48} fill="#67e8f9" fontSize="12">
              los {MUESTRA_ETIQUETAS.length} puntos que sí observamos
            </text>

            {/* eje del panel 1 */}
            <line x1={P1_X0} y1={P1_Y + 10} x2={P1_X1} y2={P1_Y + 10} stroke="#475569" strokeWidth="1.5" />

            {/* flecha de la muestra */}
            <path d="M 330 150 L 470 150" stroke="#22d3ee" strokeWidth="2" strokeDasharray="5 4" />
            <path d="M 470 150 l -9 -5.5 l 0 11 Z" fill="#22d3ee" />
            <text x="400" y="136" fill="#67e8f9" fontSize="13" fontWeight="700" textAnchor="middle">
              muestra (n)
            </text>
            <text x="400" y="176" fill="#94a3b8" fontSize="13" textAnchor="middle">
              x̄ , s
            </text>

            {/* Panel 2 · campana de las medias muestrales */}
            {/* banda del 95% (rango de respuestas posibles) */}
            <path
              d={(() => {
                const izq = P2_CX - 1.96 * P2_ESC;
                const der = P2_CX + 1.96 * P2_ESC;
                const pts = [];
                for (let z = -1.96; z <= 1.96; z += 0.05) {
                  pts.push(
                    `${(P2_CX + z * P2_ESC).toFixed(2)},${(P2_BASE - normPdf(z) * P2_AMP).toFixed(2)}`
                  );
                }
                return `M ${izq},${P2_BASE} L ${pts.join(' L ')} L ${der},${P2_BASE} Z`;
              })()}
              fill="#22d3ee"
              fillOpacity="0.16"
            />
            {/* la campana */}
            <path
              d={(() => {
                const pts = [];
                for (let z = -P2_LIM; z <= P2_LIM; z += 0.04) {
                  pts.push(`${(P2_CX + z * P2_ESC).toFixed(2)},${(P2_BASE - normPdf(z) * P2_AMP).toFixed(2)}`);
                }
                return `M ${pts.join(' L ')}`;
              })()}
              fill="none"
              stroke="#22d3ee"
              strokeWidth="2.5"
            />
            {/* mu */}
            <line
              x1={P2_CX}
              y1={P2_BASE}
              x2={P2_CX}
              y2={P2_BASE - normPdf(0) * P2_AMP}
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <text
              x={P2_CX - 1.96 * P2_ESC - 8}
              y={P2_BASE + 28}
              fill="#fbbf24"
              fontSize="14"
              fontWeight="700"
              textAnchor="end"
            >
              μ
            </text>
            {/* limites del rango */}
            <line
              x1={P2_CX - 1.96 * P2_ESC}
              y1={P2_BASE}
              x2={P2_CX - 1.96 * P2_ESC}
              y2={P2_BASE - 22}
              stroke="#22d3ee"
              strokeWidth="1.5"
            />
            <line
              x1={P2_CX + 1.96 * P2_ESC}
              y1={P2_BASE}
              x2={P2_CX + 1.96 * P2_ESC}
              y2={P2_BASE - 22}
              stroke="#22d3ee"
              strokeWidth="1.5"
            />
            <text x={P2_CX + 10} y={P2_BASE + 28} fill="#67e8f9" fontSize="12" fontWeight="700">
              95 % de las respuestas posibles
            </text>
            <line x1={P2_CX - 200} y1={P2_BASE + 10} x2={P2_CX + 200} y2={P2_BASE + 10} stroke="#475569" strokeWidth="1.5" />
          </svg>

          <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-800 pt-2">
            La nube es la realidad que no vemos entera. Lo que observamos es una muestra: una <em>aproximación</em>. Y
            como la muestra cambia, <strong className="text-slate-200">la respuesta también cambia</strong> — ese margen
            es el error de muestreo, y es justo lo que quantify el intervalo de confianza, el p-valor y α.
          </p>
        </div>

        {/* Los tres conceptos */}
        <div className="space-y-2.5">
          {[
            {
              icon: Users,
              color: 'text-blue-400',
              t: 'La población',
              d: 'Lo que quieres saber: todos los usuarios, todos los servidores. Se resume con μ (media) y σ (dispersión).',
              pie: 'μ , σ',
            },
            {
              icon: Ruler,
              color: 'text-cyan-400',
              t: 'La muestra',
              d: 'Lo que observas de verdad: 4.000 usuarios, 500 peticiones. Se resume con x̄ (media) y s (dispersión).',
              pie: 'x̄ , s',
            },
            {
              icon: Repeat,
              color: 'text-amber-400',
              t: 'El error de muestreo',
              d: 'La misma pregunta, muchas respuestas posibles. Por eso hace falta un criterio, no solo un número.',
              pie: 'x̄ ≠ μ',
            },
          ].map((c, i) => (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <c.icon size={15} className={`${c.color} shrink-0`} />
                  <span className="text-sm font-bold text-slate-100">{c.t}</span>
                </div>
                <span className="font-mono text-xs text-slate-500">{c.pie}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* La macro-estructura del deck */}
      <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <p className="text-xs text-slate-300 leading-relaxed">
          Por eso la exposición va en cuatro pasos: <strong className="text-slate-100">describir</strong> lo que pasa,{' '}
          <strong className="text-slate-100">afirmar</strong> lo que sabemos, <strong className="text-slate-100">decidir</strong>{' '}
          con un criterio y <strong className="text-slate-100">usar</strong> la decisión en software.
        </p>
        <div className="flex items-center gap-1.5 shrink-0 sm:ml-auto">
          {[
            { t: 'Describir', c: 'text-cyan-300 border-cyan-500/40' },
            { t: 'Afirmar', c: 'text-amber-300 border-amber-500/40' },
            { t: 'Decidir', c: 'text-rose-300 border-rose-500/40' },
            { t: 'Usar', c: 'text-blue-300 border-blue-500/40' },
          ].map((b, i) => (
            <React.Fragment key={b.t}>
              {i > 0 && <ArrowRight size={12} className="text-slate-600 shrink-0" />}
              <span className={`px-2 py-0.5 rounded-lg border bg-slate-900 text-[11px] font-bold ${b.c}`}>
                {b.t}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SlideConceptoInferencia;
