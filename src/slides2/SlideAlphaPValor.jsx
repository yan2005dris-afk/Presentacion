import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Scale, Target, CheckCircle2, XCircle, AlertTriangle, Mic, Code2,
  ShieldCheck, TrendingUp, Ban, Lightbulb, Gavel, ChevronRight
} from 'lucide-react';
import { normPdf, normCdf, zCritico } from './stats';

// ==========================================
// === ANDY — NIVEL DE SIGNIFICANCIA (α) Y P-VALOR ===
// === Tema 05 · Expositor: Andy ===
// ==========================================
// Guion: docs/expo1/tema05/guion-ordenado-t05.md
// Caso que corre por todas las slides:
//   E-commerce, botón de checkout. A: 400/4000 (10.0%) · B: 464/4000 (11.6%)
//   z = 2.3054 · p bilateral = 0.0211 · p unilateral = 0.0106
// Toda la matemática vive en ./stats.js (funciones puras, sin JSX).

// ───────── Campana de Gauss (SVG) ─────────
// VIEW = 800 x 300 ; eje x: z ∈ [-4, 4] ; eje y: pdf escalado a 240 px
const CW = 800, CH = 300, BASE = 268, AMP = 228, ESCALA_X = 88;

const px = (z) => CW / 2 + z * ESCALA_X;
const py = (pdf) => BASE - (pdf / 0.3989422804) * AMP;

function curvaPath(desde = -4, hasta = 4) {
  const pts = [];
  const paso = (hasta - desde) / 160;
  for (let z = desde; z <= hasta + 1e-9; z += paso) {
    pts.push(`${px(z).toFixed(2)},${py(normPdf(z)).toFixed(2)}`);
  }
  return `M ${pts.join(' L ')}`;
}

// Región bajo la curva desde zCrit hasta 4 (cola derecha)
function colaPath(zCrit) {
  const pts = [];
  const paso = (4 - zCrit) / 60;
  for (let z = zCrit; z <= 4 + 1e-9; z += paso) {
    pts.push(`${px(z).toFixed(2)},${py(normPdf(z)).toFixed(2)}`);
  }
  return `M ${px(zCrit).toFixed(2)},${BASE} L ${pts.join(' L ')} L ${px(4).toFixed(2)},${BASE} Z`;
}

// Región bajo la curva desde -4 hasta -zCrit (cola izquierda, simétrica)
function colaIzqPath(zCrit) {
  const pts = [];
  const paso = (zCrit - -4) / 60;
  for (let z = -4; z <= zCrit + 1e-9; z += paso) {
    pts.push(`${px(z).toFixed(2)},${py(normPdf(z)).toFixed(2)}`);
  }
  return `M ${px(-4).toFixed(2)},${BASE} L ${pts.join(' L ')} L ${px(zCrit).toFixed(2)},${BASE} Z`;
}

// Región bilateral completa (ambas colas), para el p-valor
function colasBilateral(zObs) {
  const izq = [];
  for (let z = -4; z <= -Math.abs(zObs) + 1e-9; z += 0.05) {
    izq.push(`${px(z).toFixed(2)},${py(normPdf(z)).toFixed(2)}`);
  }
  const der = [];
  for (let z = Math.abs(zObs); z <= 4 + 1e-9; z += 0.05) {
    der.push(`${px(z).toFixed(2)},${py(normPdf(z)).toFixed(2)}`);
  }
  return (
    `M ${px(-4).toFixed(2)},${BASE} L ${izq.join(' L ')} L ${px(-Math.abs(zObs)).toFixed(2)},${BASE} Z ` +
    `M ${px(Math.abs(zObs)).toFixed(2)},${BASE} L ${der.join(' L ')} L ${px(4).toFixed(2)},${BASE} Z`
  );
}

// ───────── Piezas de formato ─────────
function NotaTecnica({ children }) {
  return (
    <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 flex items-start gap-2.5">
      <Target size={14} className="text-rose-400 shrink-0 mt-0.5" />
      <p className="text-[11px] text-slate-300 leading-relaxed">
        <span className="font-bold uppercase tracking-wider text-rose-300">Para el especialista · </span>
        {children}
      </p>
    </div>
  );
}

function Etiqueta({ children }) {
  return (
    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{children}</span>
  );
}

// ==================================================================
// 5.0 · Tribunal: toda decisión tiene un riesgo
// ==================================================================
export function SlideTribunalDecision() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-5">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs uppercase tracking-wider text-rose-400 font-bold">Punto de partida</span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Toda decisión tiene un riesgo
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
          Un juez, dos veredictos posibles, y una pregunta: ¿cuánta evidencia hace falta?
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Recorder de tribunal */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <Etiqueta>La analogía · el tribunal</Etiqueta>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
              <div className="text-[11px] font-bold text-slate-200 uppercase tracking-wider">H₀ · Estado por defecto</div>
              <p className="text-xs text-slate-300 leading-snug">El acusado es <strong>inocente</strong>. No hay efecto, no hay cambio.</p>
            </div>
            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-900/40 space-y-1.5">
              <div className="text-[11px] font-bold text-rose-300 uppercase tracking-wider">H₁ · La alternativa</div>
              <p className="text-xs text-slate-300 leading-snug">El acusado es <strong>culpable</strong>. Hay un efecto real.</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
              <Gavel size={15} className="text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-slate-100">Falso positivo:</strong> declaras culpable a un inocente.
                <span className="text-amber-300"> → Error Tipo I</span>
              </p>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
              <Gavel size={15} className="text-blue-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-slate-100">Falso negativo:</strong> absolves a un culpable.
                <span className="text-blue-300"> → Error Tipo II</span>
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-rose-950/25 border border-rose-900/40">
            <p className="text-xs text-slate-200 leading-relaxed">
              <strong className="text-rose-300">α</strong> es el riesgo de condenar a un inocente que el tribunal decide
              tolerar <strong className="text-rose-200">antes de ver las pruebas</strong>. El p-valor se calcula{' '}
              <strong className="text-rose-200">después</strong>. Ese orden temporal es la idea más importante del tema.
            </p>
          </div>
        </div>

        {/* El caso real */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <Etiqueta>El caso real · software y negocio</Etiqueta>

          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
            <p className="text-sm text-slate-200 font-semibold leading-snug">
              El equipo de producto quiere subir el botón "Comprar" a una versión B.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <div className="text-[10px] uppercase tracking-wider text-slate-500">Variante A (control)</div>
                <div className="text-lg font-black text-slate-100 mt-0.5">10.0%</div>
                <div className="text-[10px] font-mono text-slate-500">400 de 4,000</div>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-900/40 text-center">
                <div className="text-[10px] uppercase tracking-wider text-rose-400/70">Variante B (nueva)</div>
                <div className="text-lg font-black text-rose-200 mt-0.5">11.6%</div>
                <div className="text-[10px] font-mono text-rose-400/60">464 de 4,000</div>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-2.5">
            <Lightbulb size={15} className="text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-300 leading-relaxed">
              La pregunta real <strong className="text-slate-100">no</strong> es "¿cuál convierte más?" — eso ya lo sabemos.
              Es: <strong className="text-cyan-300">"¿esta diferencia es un efecto real o es ruido que se invierte mañana?"</strong>
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/50 border border-dashed border-slate-700">
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Cada vez que un sistema decide — un botón, un modelo, una alerta — hay un juez y hay un error
              posible. Hoy vamos a ver el <strong className="text-slate-300">rulebook</strong>: cuál es el riesgo que
              aceptamos y cuánta evidencia vio la máquina.
            </p>
          </div>
        </div>
      </div>

      <NotaTecnica>
        H₀ es el <strong>estado por defecto</strong> (sin efecto, sin diferencia, sin cambio) y H₁ la afirmación que se
        quiere sostener. La <strong>pre-especificación</strong> —fijar α y la dirección de H₁ antes de recoger los
        datos— es lo que separa una prueba de una búsqueda de significatividad.
      </NotaTecnica>
    </div>
  );
}

// ==================================================================
// 5.1 · H₀ y H₁: las dos aposturas
// ==================================================================
export function SlideHipotesisH0H1() {
  const [bilateral, setBilateral] = useState(true);

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-5">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs uppercase tracking-wider text-rose-400 font-bold">Plantear la pregunta</span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          H₀ y H₁: las dos aposturas
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
          La dirección de la alternativa no es un detalle: es parte de la hipótesis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <Etiqueta>H₀ · Hipótesis nula</Etiqueta>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-950 border border-slate-800 text-slate-400">
              estado por defecto
            </span>
          </div>
          <p className="text-lg font-black text-slate-100">
            <span className="text-slate-500 font-bold">H₀:</span> p<sub>B</sub> = p<sub>A</sub>
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            "La conversión de la variante B es igual a la de A." Cualquier variación observada se atribuye al azar.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-3">
          <div className="flex items-center justify-between">
            <Etiqueta>H₁ · Hipótesis alternativa</Etiqueta>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/15 border border-rose-500/30 text-rose-300">
              lo que se quiere demostrar
            </span>
          </div>
          <p className="text-lg font-black text-rose-200">
            <span className="text-rose-400/70 font-bold">H₁:</span>{' '}
            {bilateral ? (
              <>p<sub>B</sub> ≠ p<sub>A</sub></>
            ) : (
              <>p<sub>B</sub> &gt; p<sub>A</sub></>
            )}
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            {bilateral
              ? 'Bilateral: me basta con que sean distintas. Es el estándar cuando no sabemos de antemano en qué dirección.'
              : 'Unilateral: solo me interesa que B sea mejor. Es más estricto, pero detecta mejor efectos en esa dirección.'}
          </p>
        </div>
      </div>

      {/* Selector de alternativa */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <Etiqueta>¿Qué querías demostrar antes de ver los datos?</Etiqueta>
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: true, pre: 'Bilateral · ', post: <>p<sub>B</sub> ≠ p<sub>A</sub></> },
            { id: false, pre: 'Unilateral · ', post: <>p<sub>B</sub> &gt; p<sub>A</sub></> },
          ].map((opt) => (
            <button
              key={String(opt.id)}
              onClick={() => setBilateral(opt.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                bilateral === opt.id
                  ? 'bg-rose-500 text-white border-rose-400 shadow-sm'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {opt.pre}
              {opt.post}
            </button>
          ))}
        </div>
        <p className="text-xs text-slate-400 leading-relaxed">
          Con los datos del caso (z = 2.3054): p bilateral = <strong className="text-cyan-300">0.0211</strong> ·
          p unilateral = <strong className="text-cyan-300">0.0106</strong>. La misma evidencia, dos preguntas.
        </p>
      </div>

      <NotaTecnica>
        Elegir unilateralidad <strong>reduce a la mitad</strong> el p-valor, pero solo es legítimo si la dirección
        estaba fijada <em>antes</em> de observar los datos. Definirla después de ver que "el efecto va hacia allá" es
        p-hacking: estás usando los datos dos veces.
      </NotaTecnica>
    </div>
  );
}

// ==================================================================
// 5.2 · α: el riesgo que fijas antes de ver los datos
// ==================================================================
export function SlideAlphaCampana() {
  const [alpha, setAlpha] = useState(0.05);
  const zc = zCritico(alpha);

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-5">
      <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row justify-between sm:items-end gap-3">
        <div>
          <span className="text-xs uppercase tracking-wider text-rose-400 font-bold">El umbral</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            α es el área de la cola que decides tolerar
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            El presupuesto de errores que te das <strong className="text-slate-300">antes</strong> de mirar los datos.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 shrink-0">
          <span className="text-xs text-slate-300 font-semibold px-1">α:</span>
          {[0.05, 0.01, 0.001].map((a) => (
            <button
              key={a}
              onClick={() => setAlpha(a)}
              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                alpha === a
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Campana */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <Etiqueta>Distribución nula · región de rechazo</Etiqueta>
            <span className="text-xs font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
              z<sub>crítico</sub> = {zc.toFixed(3)} · α = {alpha}
            </span>
          </div>

          <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full h-auto select-none">
            {/* rejilla */}
            {[-3, -2, -1, 0, 1, 2, 3].map((z) => (
              <line key={z} x1={px(z)} y1={BASE} x2={px(z)} y2={BASE - 8} stroke="#334155" strokeWidth="1" />
            ))}
            <line x1="20" y1={BASE} x2={CW - 20} y2={BASE} stroke="#475569" strokeWidth="1.5" />

            {/* cola derecha sombreada = alfa */}
            <path d={colaPath(zc)} fill="#f43f5e" fillOpacity="0.38" stroke="#fb7185" strokeWidth="1" />
            {/* cola izquierda (simétrica, bilateral) */}
            <path d={colaIzqPath(-zc)} fill="#f43f5e" fillOpacity="0.38" stroke="#fb7185" strokeWidth="1" />

            {/* curva */}
            <path d={curvaPath()} fill="none" stroke="#22d3ee" strokeWidth="2.5" />

            {/* línea del z crítico */}
            <line x1={px(zc)} y1={BASE} x2={px(zc)} y2={py(normPdf(zc))} stroke="#fb7185" strokeWidth="1.5" strokeDasharray="5 4" />
            <line x1={px(-zc)} y1={BASE} x2={px(-zc)} y2={py(normPdf(zc))} stroke="#fb7185" strokeWidth="1.5" strokeDasharray="5 4" />

            <text x={px(0)} y={BASE + 22} fill="#64748b" fontSize="13" fontFamily="monospace" textAnchor="middle">
              0
            </text>
            <text x={px(zc)} y={BASE + 22} fill="#fda4af" fontSize="12" fontFamily="monospace" textAnchor="middle">
              α = {alpha}
            </text>
            <text x={px(zc) + 8} y={py(normPdf(zc)) - 10} fill="#fb7185" fontSize="12" fontFamily="monospace">
              z = {zc.toFixed(2)}
            </text>
          </svg>

          <p className="text-xs text-slate-400 leading-relaxed">
            Si H₀ fuera cierta, solo esperaríamos resultados tan extremos como los de la zona sombreada{' '}
            <strong className="text-rose-300">{alpha * 100}%</strong> de las veces. Tú decides si ese riesgo te sirve.
          </p>
        </div>

        {/* Lectura + dominios */}
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <Etiqueta>En palabras</Etiqueta>
            <p className="text-xs text-slate-300 leading-relaxed">
              Con <strong className="text-rose-300">α = {alpha}</strong> aceptas que{' '}
              <strong className="text-slate-100">{alpha * 100} de cada 100</strong> veces que el sistema diga "hay
              cambio real", sean alarmas falsas.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <Etiqueta>Umbrales por industria</Etiqueta>
            <div className="space-y-1.5 text-[11px] text-slate-300">
              <div><span className="font-mono text-white">α = 0.05</span> · Web, marketing, producto SaaS</div>
              <div><span className="font-mono text-white">α = 0.01</span> · Riesgo de crédito y finanzas</div>
              <div><span className="font-mono text-white">α = 0.001</span> · Ensayos clínicos y salud</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <Etiqueta>El puente con el intervalo de confianza</Etiqueta>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              El intervalo que ya vimos y α son la <strong className="text-slate-100">misma campana por los dos lados</strong>:
              confianza 95% ⟺ α = 0.05 (z = 1.96). El 5% que el intervalo deja fuera es exactamente este α.
            </p>
          </div>
        </div>
      </div>

      <NotaTecnica>
        α = P(rechazar H₀ | H₀ verdadera) = <strong>Error Tipo I</strong>. La región de rechazo se sombrea{' '}
        <strong>antes</strong> de observar los datos; el umbral crítico bilateral es z = 1.96 (α = 0.05), 2.576
        (α = 0.01) y 3.29 (α = 0.001).
      </NotaTecnica>
    </div>
  );
}

// ==================================================================
// 5.3 · El p-valor: la pregunta de la sorpresa
// ==================================================================
export function SlidePValorSorpresa() {
  const [zObs, setZObs] = useState(2.3054);
  const pUni = 1 - normCdf(zObs);
  const pBil = 2 * pUni;

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-5">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs uppercase tracking-wider text-rose-400 font-bold">La evidencia</span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          El p-valor: ¿qué tan raro fue eso si nada cambió?
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
          Mueve el estadístico y observa cómo se расшиe la zona de "sorpresa".
        </p>
      </div>

      {/* La pregunta */}
      <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 text-center">
        <p className="text-base sm:text-lg font-black text-rose-100 leading-snug">
          "¿Qué tan raro o sorprendente es el resultado que obtuvimos{' '}
          <span className="text-rose-300">si asumimos que nada cambió</span> (H₀ es cierta)?"
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <Etiqueta>Distribución nula · zona de sorpresa</Etiqueta>
            <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              z = {zObs.toFixed(3)} → p = {pBil.toFixed(4)}
            </span>
          </div>

          <svg viewBox={`0 0 ${CW} ${CH}`} className="w-full h-auto select-none">
            <line x1="20" y1={BASE} x2={CW - 20} y2={BASE} stroke="#475569" strokeWidth="1.5" />
            <path d={colasBilateral(zObs)} fill="#22d3ee" fillOpacity="0.3" stroke="#22d3ee" strokeWidth="1" />
            <path d={curvaPath()} fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
            <line x1={px(zObs)} y1={BASE} x2={px(zObs)} y2={py(normPdf(zObs))} stroke="#22d3ee" strokeWidth="2" />
            <circle cx={px(zObs)} cy={py(normPdf(zObs))} r="5" fill="#22d3ee" />
            <text x={CW - 18} y={34} fill="#67e8f9" fontSize="13" fontFamily="monospace" textAnchor="end">
              z = {zObs.toFixed(2)}
            </text>
            <text x={CW - 18} y={54} fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="end">
              p = {pBil.toFixed(4)}
            </text>
          </svg>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>Estadístico observado (z):</span>
              <span className="font-mono font-bold text-cyan-300 text-sm">{zObs.toFixed(4)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="3.6"
              step="0.0001"
              value={zObs}
              onChange={(e) => setZObs(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0 (nada raro)</span>
              <span>1.96 (α = 0.05)</span>
              <span>3.29 (α = 0.001)</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
            <Etiqueta>El caso, en palabras</Etiqueta>
            <p className="text-xs text-slate-300 leading-relaxed">
              Si la conversión real fuera 10%, ver <strong className="text-slate-100">11.6%</strong> en 4,000 personas
              sería muy raro: <strong className="text-cyan-300">2.1%</strong> de probabilidad. Es decir, en 1 de cada
              47 experimentos veríamos esto <em>aunque nada hubiera cambiado</em>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <Etiqueta>Los dos números</Etiqueta>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between"><span>Bilateral (p<sub>B</sub> ≠ p<sub>A</sub>)</span><span className="font-mono font-bold text-cyan-300">{pBil.toFixed(4)}</span></div>
              <div className="flex justify-between"><span>Unilateral (p<sub>B</sub> &gt; p<sub>A</sub>)</span><span className="font-mono font-bold text-cyan-300">{pUni.toFixed(4)}</span></div>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              El p-valor siempre se calcula. La decisión se toma comparándolo con α.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
            <Etiqueta>La analogía de apoyo</Etiqueta>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              La lotería: ver un número tan raro como el que salió, cuando el sorteo funciona como se supone, tiene
              un p-valor de 0.02. El tribunal se agota como analogía aquí.
            </p>
          </div>
        </div>
      </div>

      <NotaTecnica>
        p = P(X ≥ x<sub>obs</sub> | H₀ cierta): una <strong>probabilidad condicional</strong> sobre la distribución
        nula, no sobre H₀. p ∈ [0, 1]. Con z = 2.3054 el p bilateral es 0.0211 y el unilateral 0.0106.
      </NotaTecnica>
    </div>
  );
}

// ==================================================================
// 5.4 · La regla de decisión
// ==================================================================
export function SlideReglaDecision() {
  const [alpha, setAlpha] = useState(0.05);
  const p = 0.0211;
  const rechaza = p <= alpha;

  const celdas = [
    {
      t: 'H₀ verdadera · No rechazamos',
      d: 'Acierto',
      c: 'border-emerald-500/40 bg-emerald-950/30 text-emerald-200',
    },
    {
      t: 'H₀ verdadera · Rechazamos',
      d: 'Error Tipo I (α) · falso positivo',
      c: 'border-rose-500/40 bg-rose-950/30 text-rose-200',
    },
    {
      t: 'H₀ falsa · No rechazamos',
      d: 'Error Tipo II (β) · falso negativo',
      c: 'border-blue-500/40 bg-blue-950/30 text-blue-200',
    },
    {
      t: 'H₀ falsa · Rechazamos',
      d: 'Acierto',
      c: 'border-emerald-500/40 bg-emerald-950/30 text-emerald-200',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-5">
      <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row justify-between sm:items-end gap-3">
        <div>
          <span className="text-xs uppercase tracking-wider text-rose-400 font-bold">El criterio</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            La regla de decisión: p ≤ α
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Una sola comparación decide todo. Cambia α y cambia la decisión — con los mismos datos.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 shrink-0">
          <span className="text-xs text-slate-300 font-semibold px-1">α:</span>
          {[0.05, 0.01, 0.001].map((a) => (
            <button
              key={a}
              onClick={() => setAlpha(a)}
              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                alpha === a
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* La regla */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <Etiqueta>Regla universal</Etiqueta>
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 font-mono text-xs text-slate-200">
            p ≤ α ⟹ <span className="text-emerald-300">rechazar H₀</span> · resultado significativo
          </div>
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 font-mono text-xs text-slate-200">
            p &gt; α ⟹ <span className="text-amber-300">no rechazar H₀</span> · evidencia insuficiente
          </div>
        </div>

        <div
          className={`p-5 rounded-2xl border space-y-2 ${
            rechaza
              ? 'bg-emerald-950/25 border-emerald-500/40'
              : 'bg-amber-950/25 border-amber-500/40'
          }`}
        >
          <div className="flex items-center gap-2">
            {rechaza ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 text-amber-400 shrink-0" />
            )}
            <div className="text-sm font-bold text-slate-100">
              El caso: p = {p.toFixed(4)} vs α = {alpha}
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {rechaza ? (
              <>
                <strong className="text-emerald-300">Rechazamos H₀.</strong> La conversión de B es
                significativamente mayor: el botón B convierte más y no es casualidad. Con α = 0.01 el{' '}
                <em>mismo</em> resultado no alcanzaría el umbral.
              </>
            ) : (
              <>
                <strong className="text-amber-300">No rechazamos H₀.</strong> Con un umbral tan estricto no tenemos
                evidencia suficiente. Ojo: esto <em>no</em> significa que B y A sean iguales — significa que{' '}
                <strong className="text-slate-100">no tenemos poder para detectarlo</strong>.
              </>
            )}
          </p>
        </div>
      </div>

      {/* Tabla 2x2 */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <Etiqueta>La matriz completa de la decisión</Etiqueta>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {celdas.map((c, i) => (
            <div key={i} className={`p-3 rounded-xl border ${c.c} space-y-0.5`}>
              <div className="text-[11px] font-bold uppercase tracking-wider opacity-80">{c.t}</div>
              <div className="text-sm font-bold">{c.d}</div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          El poder estadístico es <strong className="text-slate-200">1 − β</strong>: con α fijo, más poder exige más
          muestra. Por eso un p-valor alto en un experimento de 4,000 personas puede ser solo falta de poder.
        </p>
      </div>

      <NotaTecnica>
        "No rechazar H₀" <strong>no</strong> es "aceptar H₀": es ausencia de evidencia, no evidencia de igualdad. Con
        n = 4,000 por grupo el poder para detectar 1.6 pp de conversión es limitado; un resultado no significativo
        aquí no descarta el efecto.
      </NotaTecnica>
    </div>
  );
}

// ==================================================================
// 5.5 · Lo que el p-valor NO es
// ==================================================================
export function SlidePValorNoEs() {
  const errores = [
    {
      t: 'NO es la probabilidad de que H₀ sea verdadera',
      r: 'Es P(datos | H₀). La probabilidad está condicionada al revés: una probabilidad de los datos dada la hipótesis, no de la hipótesis dada los datos.',
      icon: Ban,
    },
    {
      t: 'NO es la probabilidad de que fuera azar',
      r: 'Es qué tan raro es el resultado SI fuera azar. Mide compatibilidad con H₀, no la causa de los datos.',
      icon: Ban,
    },
    {
      t: 'NO mide el tamaño ni el impacto del efecto',
      r: 'Con 1 millón de usuarios por grupo, 0.1 pp de diferencia da p = 0.0184 → "significativo". Son 1.000 órdenes extra: 50.000 $ al mes con ticket de 50 $. Significativo ≠ útil.',
      icon: Scale,
    },
    {
      t: 'NO rechazar H₀ no es aceptar H₀',
      r: 'Es "no tengo poder para detectarlo". Con muestra suficiente y α adecuado, un H₀ falso acabaría rechazándose.',
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-5">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs uppercase tracking-wider text-rose-400 font-bold">Las trampas</span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Lo que el p-valor NO es
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
          Cuatro frases que se dicen a diario en software y que cuestan dinero.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {errores.map((e, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.07 }}
            className="p-4 rounded-2xl bg-slate-900/80 border border-rose-900/40 space-y-2"
          >
            <div className="flex items-start gap-2.5">
              <e.icon size={16} className="text-rose-400 shrink-0 mt-0.5" />
              <div className="text-sm font-bold text-rose-200 leading-snug">{e.t}</div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed pl-6">{e.r}</p>
          </motion.div>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
        <Etiqueta>El dato que duele</Etiqueta>
        <p className="text-xs text-slate-300 leading-relaxed">
          Significancia estadística y <strong className="text-slate-100">significancia práctica</strong> son cosas
          distintas. Por eso el p-valor nunca viaja solo: se reporta <strong>con</strong> el tamaño del efecto y{' '}
          <strong>con</strong> el intervalo de confianza.
        </p>
      </div>

      <NotaTecnica>
        Las tres confusiones canónicas (p ≠ P(H₀), p ≠ "probabilidad de azar", p ≠ tamaño del efecto) y la cuarta
        (no rechazar ≠ aceptar). Reportar siempre <strong>p-valor + intervalo de confianza + tamaño del efecto</strong>;
        un p-valor aislado no permite decidir nada.
      </NotaTecnica>
    </div>
  );
}

// ==================================================================
// 5.6 · En software: el criterio automatizado
// ==================================================================
export function SlideCriterioSoftware() {
  const [alpha, setAlpha] = useState(0.05);
  const p = 0.0211;
  const ship = p <= alpha;

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-5">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs uppercase tracking-wider text-rose-400 font-bold">En producción</span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          El criterio estadístico, automatizado
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
          En software no decide una persona: decide una línea de código.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Código */}
        <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
            <span className="text-xs font-mono font-bold text-slate-300 flex items-center gap-2">
              <Code2 size={13} className="text-cyan-400" /> test_conversion.py
            </span>
            <span className="text-[10px] font-mono text-slate-500">Python · SciPy</span>
          </div>
          <pre className="p-4 text-[11px] sm:text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto">
{`from scipy import stats

ALPHA = 0.05          # en config, no hardcodeado

# Variante A: 400/4000    Variante B: 464/4000
stat, p_value = stats.proportions_ztest(
    [400, 464], [4000, 4000]
)

print(f"z = {stat:.3f}, p = {p_value:.4f}")

if p_value <= ALPHA:
    print("ship B — el efecto es real")
else:
    print("no hay evidencia; se mantiene A")`}
          </pre>
          <div className="px-4 py-2.5 bg-slate-900 border-t border-slate-800 font-mono text-[11px] text-slate-400">
            <span className="text-slate-500">$</span> python test_conversion.py
            <div className="text-emerald-300 mt-1">z = 2.305, p = 0.0211</div>
            <div className={ship ? 'text-emerald-300' : 'text-amber-300'}>
              {ship ? 'ship B — el efecto es real' : 'no hay evidencia; se mantiene A'}
            </div>
          </div>
        </div>

        {/* Dónde vive */}
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
            <Etiqueta>Dónde vive este criterio en tu stack</Etiqueta>
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
                <TrendingUp size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 leading-snug">
                  <strong className="text-slate-100">Auto-deploy de A/B:</strong> si p ≤ α, se promotes la variante
                  ganadora sin intervención humana.
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
                <ShieldCheck size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 leading-snug">
                  <strong className="text-slate-100">Feature selection:</strong> una variable entra al modelo si su
                  coeficiente es significativamente distinto de 0.
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 flex items-start gap-2.5">
                <AlertTriangle size={14} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-slate-300 leading-snug">
                  <strong className="text-slate-100">Alertas de anomalías:</strong> la desviación se contrasta contra
                  H₀ y se dispara solo si es significativa.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
            <Etiqueta>Dos detalles de ingeniería que importan</Etiqueta>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              <strong className="text-rose-200">α en configuración, no en la lógica.</strong> Si cada experimento
              hereda un umbral hardcodeado que nadie revisó, nadie sabe qué criterio se está aplicando.
            </p>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              <strong className="text-rose-200">20 tests al 5% ⟶ 64% de probabilidad</strong> de al menos un falso
              positivo. Por eso existen el ajuste de comparaciones múltiples (Bonferroni, FDR) y el pre-registro del
              análisis.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300 font-semibold">Umbral en ejecución:</span>
            {[0.05, 0.01].map((a) => (
              <button
                key={a}
                onClick={() => setAlpha(a)}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                  alpha === a
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                α = {a}
              </button>
            ))}
            <span className={`text-xs font-mono ${ship ? 'text-emerald-300' : 'text-amber-300'}`}>
              {ship ? '→ ship B' : '→ no hay evidencia'}
            </span>
          </div>
        </div>
      </div>

      <NotaTecnica>
        <code>stats.proportions_ztest(counts, nobs)</code> · <code>ttest_ind</code> ·{' '}
        <code>mannwhitneyu</code>. Reportar <strong>p-valor + tamaño del efecto + intervalo de confianza</strong>, y
        calcular el <strong>poder</strong> antes de recoger datos, no después.
      </NotaTecnica>
    </div>
  );
}

// ==================================================================
// 5.7 · Cierre: cheat sheet y 3 reglas
// ==================================================================
export function SlideCierreT05() {
  const filas = [
    {
      c: 'El límite de riesgo que aceptas antes de mirar los datos',
      t: 'P(rechazar H₀ | H₀ verdadera) · Error Tipo I · 0.05 en producto',
      k: 'α',
    },
    {
      c: 'Qué tan raro fue el resultado si nada hubiera cambiado',
      t: 'P(datos tan extremos | H₀ cierta) · 0.0211 en nuestro caso',
      k: 'p-valor',
    },
    {
      c: 'Si la sorpresa es menor que el riesgo, declaramos un cambio real',
      t: 'p ≤ α ⟹ rechazar H₀ · p > α ⟹ evidencia insuficiente',
      k: 'Decisión',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-5">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs uppercase tracking-wider text-rose-400 font-bold">Cierre del tema</span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Lo que te llevas
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
          Tres reglas para tu próximo experimento.
        </p>
      </div>

      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
        <Etiqueta>Cheat sheet</Etiqueta>
        <div className="space-y-2">
          {filas.map((f, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-[130px_1fr_1fr] gap-2 items-center p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="text-sm font-black text-rose-300 font-mono">{f.k}</div>
              <div className="text-xs text-slate-200 leading-snug">{f.c}</div>
              <div className="text-[11px] font-mono text-slate-400 leading-snug">{f.t}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { n: '1', t: 'Fija α antes de mirar los datos', d: 'Cambiar el umbral después de ver el resultado no es análisis, es buscar.' },
          { n: '2', t: 'Reporta el p-valor con el tamaño del efecto', d: 'Un p-valor solo no dice si el cambio vale la pena en el negocio.' },
          { n: '3', t: 'Si no rechazaste, no digas que son iguales', d: 'Di que no tienes poder para detectarlo. Es una diferencia enorme.' },
        ].map((r, i) => (
          <div key={i} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1.5">
            <div className="w-6 h-6 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-xs font-black text-rose-300">
              {r.n}
            </div>
            <div className="text-sm font-bold text-slate-100 leading-snug">{r.t}</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">{r.d}</p>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-4 flex-wrap">
        <p className="text-sm text-slate-300">
          Con esto cerramos el tema de <strong className="text-slate-100">significancia y p-valor</strong>.
        </p>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Mic size={14} className="text-amber-400" />
          <span>¿Alguien tiene dudas?</span>
          <ChevronRight size={14} className="text-slate-600" />
        </div>
      </div>
    </div>
  );
}
