import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shuffle, Unlink, Users, Infinity as InfinityIcon, Sparkles,
  Database, FlaskConical, Gauge, ArrowRight, CheckCircle2, Clock,
  Server, HelpCircle, Activity, BellRing, Target, Ruler
} from 'lucide-react';
import { RevealStep, useRegisterSteps, useSlideStep } from '../context/SlideStepContext';
import { normPdf, normCdf } from './stats';

// ==========================================
// === ALISSON — TEOREMA DEL LÍMITE CENTRAL (TLC) ===
// === Bloque A · Describir · Expositora: Alisson ===
// ==========================================
// Ocho slides, una por cada punto del guion (el ejemplo ocupa cuatro):
//   3.0 Introducción y concepto clave
//   3.1 Condiciones de aplicación (histograma según n)
//   3.2 Propiedades matemáticas
//   3.3 Importancia en la práctica
//   3.4 Ejemplo en software: escenario, pregunta y datos
//   3.5 Paso a paso 1–3: TLC, error estándar y Z
//   3.6 Paso 4: probabilidad con la Tabla Z
//   3.7 Conclusión: resultado y alerta de rendimiento (SLA)
// Población de las gráficas 3.0–3.1: X = 8 + Exponencial(media 4) → μ = 12 min, σ = 4 min,
// asimétrica (la mayoría compra rápido, unos pocos tardan mucho).

const MU = 12;
const SIGMA = 4;

// Generador con semilla: las gráficas salen iguales en cada ensayo.
function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const tiempoCliente = (rnd) => 8 - 4 * Math.log(1 - rnd());

function mediasMuestrales(n, cuantas, seed) {
  const rnd = mulberry32(seed);
  const out = [];
  for (let i = 0; i < cuantas; i++) {
    let s = 0;
    for (let j = 0; j < n; j++) s += tiempoCliente(rnd);
    out.push(s / n);
  }
  return out;
}

function histograma(valores, min, max, bins) {
  const h = new Array(bins).fill(0);
  const ancho = (max - min) / bins;
  valores.forEach((v) => {
    const i = Math.floor((v - min) / ancho);
    if (i >= 0 && i < bins) h[i] += 1;
  });
  return h;
}

// ───────── Piezas de formato ─────────
function Cabecera({ etiqueta, titulo, subtitulo }) {
  return (
    <div className="border-b border-slate-800 pb-2">
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-teal-400 font-bold">{etiqueta}</span>
        <span className="px-2.5 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-[11px] font-bold">
          Expositora: Alisson
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">{titulo}</h2>
      {subtitulo && <p className="text-slate-400 text-xs sm:text-sm mt-0.5">{subtitulo}</p>}
    </div>
  );
}

function Chip({ children, tono = 'teal' }) {
  const tonos = {
    teal: 'bg-teal-500/10 border-teal-500/30 text-teal-300',
    rose: 'bg-rose-500/10 border-rose-500/30 text-rose-300',
    amber: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    slate: 'bg-slate-800/60 border-slate-700 text-slate-300',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full border text-[11px] font-bold ${tonos[tono]}`}>{children}</span>
  );
}

// Etapa controlada por las flechas del presentador (pasos de la slide),
// con botones para saltar a mano.
function useEtapa(maxEtapa) {
  const { step } = useSlideStep();
  const [manual, setManual] = useState(null);
  useRegisterSteps(maxEtapa);

  useEffect(() => {
    setManual(null);
  }, [step]);

  return [manual ?? Math.min(step, maxEtapa), setManual];
}

// ==================================================================
// 3.0 · Introducción y concepto clave: del desorden a la campana
// ==================================================================
const W0 = 800, H0 = 300, BASE0 = 268, TOTAL_PUNTOS = 260;

// Apila valores en columnas (dot plot) sobre el eje [min, max].
function apilar(valores, min, max, bins, altoMax) {
  const cols = histograma(valores, min, max, bins);
  const maxCol = Math.max(...cols);
  const dy = Math.min(10, altoMax / maxCol);
  const anchoCol = (W0 - 60) / bins;
  const ocupados = new Array(bins).fill(0);
  return valores.map((v) => {
    const i = Math.min(bins - 1, Math.max(0, Math.floor(((v - min) / (max - min)) * bins)));
    const y = BASE0 - 5 - ocupados[i] * dy;
    ocupados[i] += 1;
    return { x: 30 + anchoCol * (i + 0.5), y };
  });
}

function curvaCampana(min, max, media, de, altoPico) {
  const pts = [];
  for (let k = 0; k <= 120; k++) {
    const v = min + ((max - min) * k) / 120;
    const x = 30 + ((v - min) / (max - min)) * (W0 - 60);
    const y = BASE0 - (normPdf((v - media) / de) / normPdf(0)) * altoPico;
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return `M ${pts.join(' L ')}`;
}

export function SlideTLCConcepto() {
  const [etapa, setEtapa] = useEtapa(2);

  const datos = useMemo(() => {
    const rnd = mulberry32(7);
    const caos = Array.from({ length: TOTAL_PUNTOS }, () => ({
      x: 30 + rnd() * (W0 - 60),
      y: 30 + rnd() * (BASE0 - 50),
    }));
    const individuales = Array.from({ length: TOTAL_PUNTOS }, () => tiempoCliente(rnd));
    const poblacion = apilar(individuales, 8, 28, 40, 220);
    const medias = mediasMuestrales(30, TOTAL_PUNTOS, 11);
    // Eje de medias centrado en μ para que la campana ocupe el ancho.
    const campana = apilar(medias, 9.6, 14.4, 30, 220);
    const altoReal = BASE0 - Math.min(...campana.map((p) => p.y)) - 5;
    return { caos, poblacion, campana, altoReal };
  }, []);

  const posiciones = etapa === 0 ? datos.caos : etapa === 1 ? datos.poblacion : datos.campana;
  const colores = ['#64748b', '#fb7185', '#2dd4bf'];

  const etapas = [
    { t: 'Datos desordenados', d: 'Observaciones sueltas de una población cualquiera' },
    { t: 'Forma original', d: 'Puede ser asimétrica, uniforme o discreta' },
    { t: 'Medias muestrales', d: 'Se acomodan en una campana de Gauss' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-2.5 space-y-3">
      <Cabecera
        etiqueta="3.0 · Introducción y concepto clave"
        titulo="Teorema del Límite Central (TLC)"
        subtitulo="Uno de los pilares más importantes de la estadística."
      />

      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-teal-500/15 to-emerald-500/10 border border-teal-500/30 flex items-center gap-3">
        <Sparkles size={20} className="text-teal-300 shrink-0" />
        <p className="text-sm sm:text-base text-slate-100 leading-snug">
          Muchas muestras <strong className="text-teal-300">aleatorias e independientes</strong> →
          sus <strong className="text-teal-300">medias</strong> se aproximan a una{' '}
          <strong className="text-emerald-300">distribución normal</strong>,{' '}
          <span className="text-white font-bold underline decoration-teal-400/60">sin importar la forma de la población</span>.
        </p>
      </div>

      <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
        <div className="grid grid-cols-3 gap-2">
          {etapas.map((e, i) => (
            <button
              key={e.t}
              onClick={() => setEtapa(i)}
              className={`p-2 rounded-xl border text-left transition-all ${
                etapa === i
                  ? 'bg-teal-500/15 border-teal-400/60 shadow-md shadow-teal-500/10'
                  : 'bg-slate-900/70 border-slate-800 opacity-60 hover:opacity-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded-full text-[11px] font-black flex items-center justify-center text-slate-950"
                  style={{ background: colores[i] }}
                >
                  {i + 1}
                </span>
                <span className="text-xs font-bold text-white">{e.t}</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">{e.d}</div>
            </button>
          ))}
        </div>

        <svg viewBox={`0 0 ${W0} ${H0}`} className="w-full h-[300px] select-none" role="img"
          aria-label="Puntos desordenados que se reorganizan hasta formar una campana de Gauss">
          <line x1="30" y1={BASE0} x2={W0 - 30} y2={BASE0} stroke="#334155" strokeWidth="1.5" />

          {posiciones.map((p, i) => (
            <motion.circle
              key={i}
              r="4.2"
              initial={false}
              animate={{ cx: p.x, cy: p.y, fill: colores[etapa] }}
              transition={{ duration: 0.9, delay: (i % 40) * 0.012, ease: 'easeInOut' }}
              opacity="0.9"
            />
          ))}

          <motion.path
            d={curvaCampana(9.6, 14.4, MU, SIGMA / Math.sqrt(30), datos.altoReal)}
            fill="none"
            stroke="#34d399"
            strokeWidth="3"
            initial={false}
            animate={{ pathLength: etapa === 2 ? 1 : 0, opacity: etapa === 2 ? 1 : 0 }}
            transition={{ duration: 1.1, delay: etapa === 2 ? 0.9 : 0 }}
          />

          {etapa === 1 && (
            <text x={W0 - 40} y="40" textAnchor="end" fill="#fda4af" fontSize="15" fontWeight="bold">
              Población asimétrica: no es normal
            </text>
          )}
          {etapa === 2 && (
            <>
              <line x1={W0 / 2} y1="22" x2={W0 / 2} y2={BASE0} stroke="#5eead4" strokeDasharray="4 4" strokeWidth="1.5" />
              <text x={W0 / 2} y="16" textAnchor="middle" fill="#5eead4" fontSize="14" fontWeight="bold">
                μ · campana de Gauss
              </text>
            </>
          )}
        </svg>

        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-slate-400">Se cumple con poblaciones:</span>
          <Chip tono="rose">Asimétricas</Chip>
          <Chip tono="amber">Uniformes</Chip>
          <Chip tono="slate">Discretas</Chip>
        </div>
      </div>
    </div>
  );
}

// ==================================================================
// 3.1 · Condiciones de aplicación (con el histograma según n)
// ==================================================================
const CONDICIONES_APLICACION = [
  { icono: Shuffle, nombre: 'Aleatoriedad', desc: 'Selección al azar que evita sesgos o tendencias hacia un lado' },
  { icono: Unlink, nombre: 'Independencia', desc: 'Un dato no influye en otro' },
  { icono: Users, nombre: 'Tamaño de muestra (n ≥ 30)', desc: 'Suficiente para que las medias sigan una distribución normal', depende: true },
  { icono: InfinityIcon, nombre: 'Varianza finita', desc: 'Los datos pueden variar, pero no alejarse sin control' },
];

const OPCIONES_N = [1, 5, 10, 30, 100];
const W1 = 800, H1 = 280, BASE1 = 250, MIN1 = 6, MAX1 = 26, BINS1 = 80;
const xs1 = (v) => 30 + ((v - MIN1) / (MAX1 - MIN1)) * (W1 - 60);

export function SlideTLCTamanoMuestra() {
  const [idx, setIdx] = useEtapa(OPCIONES_N.length - 1);
  const n = OPCIONES_N[idx];

  const barras = useMemo(() => {
    const h = histograma(mediasMuestrales(n, 3000, 23 + n), MIN1, MAX1, BINS1);
    const max = Math.max(...h);
    return h.map((c) => (c / max) * 200);
  }, [n]);

  const anchoBarra = (W1 - 60) / BINS1;
  const suficiente = n >= 30;

  return (
    <div className="max-w-5xl mx-auto px-4 py-2.5 space-y-3">
      <Cabecera
        etiqueta="3.1 · Requisitos"
        titulo="Condiciones de aplicación"
        subtitulo="Para aplicar el TLC en la práctica, los datos deben cumplir cuatro condiciones."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
      <div className="flex flex-col gap-2.5">
        {CONDICIONES_APLICACION.map(({ icono: Icono, nombre, desc, depende }) => {
          const falla = depende && !suficiente;
          return (
            <div key={nombre}
              className={`flex-1 p-3 rounded-2xl border flex items-center gap-3 transition-colors duration-500 ${
                falla ? 'bg-rose-500/10 border-rose-500/40' : 'bg-slate-900/90 border-slate-800'
              }`}>
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                falla ? 'bg-rose-500/15 border-rose-500/40' : 'bg-teal-500/15 border-teal-500/40'
              }`}>
                <Icono size={20} className={falla ? 'text-rose-300' : 'text-teal-300'} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-black text-white leading-tight">{nombre}</div>
                <div className="text-[11px] text-slate-400 leading-snug mt-0.5">{desc}</div>
              </div>
              {depende && !falla && (
                <span className="text-xs font-mono font-bold text-teal-300">✓</span>
              )}
            </div>
          );
        })}
      </div>

      <div className="lg:col-span-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Distribución de las medias según n
          </span>
          <div className="flex gap-1.5">
            {OPCIONES_N.map((op, i) => (
              <button
                key={op}
                onClick={() => setIdx(i)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border transition-all ${
                  i === idx
                    ? op >= 30
                      ? 'bg-teal-500 text-slate-950 border-teal-400'
                      : 'bg-rose-500 text-slate-950 border-rose-400'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                n = {op}
              </button>
            ))}
          </div>
        </div>

        <svg viewBox={`0 0 ${W1} ${H1}`} className="w-full h-[300px] select-none" role="img"
          aria-label={`Histograma de medias muestrales con n = ${n}`}>
          <line x1="30" y1={BASE1} x2={W1 - 30} y2={BASE1} stroke="#334155" strokeWidth="1.5" />
          <line x1={xs1(MU)} y1="30" x2={xs1(MU)} y2={BASE1} stroke="#5eead4" strokeDasharray="4 4" strokeWidth="1.5" />
          <text x={xs1(MU)} y="22" textAnchor="middle" fill="#5eead4" fontSize="14" fontWeight="bold">
            Media poblacional (μ)
          </text>

          {barras.map((alto, i) => (
            <motion.rect
              key={i}
              x={30 + i * anchoBarra + 0.5}
              width={anchoBarra - 1}
              rx="1.5"
              initial={false}
              animate={{ y: BASE1 - alto, height: alto, fill: suficiente ? '#2dd4bf' : '#fb7185' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              opacity="0.85"
            />
          ))}

          {[8, 12, 16, 20, 24].map((v) => (
            <text key={v} x={xs1(v)} y={BASE1 + 18} textAnchor="middle" fill="#64748b" fontSize="12" fontFamily="monospace">
              {v}
            </text>
          ))}
        </svg>

        <div className={`flex items-center justify-center gap-2 text-sm font-bold ${suficiente ? 'text-teal-300' : 'text-rose-300'}`}>
          {suficiente ? <CheckCircle2 size={16} /> : <Clock size={16} />}
          {n === 1
            ? 'n = 1: cada media es un solo dato → se ve la forma original (asimétrica)'
            : suficiente
            ? `n = ${n} ≥ 30: campana normal y estrecha alrededor de μ`
            : `n = ${n}: la campana aún no está garantizada`}
        </div>
      </div>
      </div>
    </div>
  );
}

// ==================================================================
// 3.2 · Propiedades matemáticas de la distribución de las medias
// ==================================================================
// Mini ilustraciones de cada propiedad (SVG 200 x 90).
function puntosCampana(cx, ancho, alto, base = 82) {
  const pts = [];
  for (let k = 0; k <= 60; k++) {
    const z = -3 + (6 * k) / 60;
    pts.push(`${(cx + z * ancho).toFixed(1)},${(base - (normPdf(z) / normPdf(0)) * alto).toFixed(1)}`);
  }
  return pts.join(' L ');
}

function IlustNormalidad() {
  const barras = [52, 40, 30, 22, 15, 10, 7, 4, 3, 2];
  return (
    <>
      {barras.map((a, i) => (
        <rect key={i} x={6 + i * 7.5} y={82 - a} width="6" height={a} rx="1" fill="#fb7185" opacity="0.85" />
      ))}
      <path d="M 88 50 L 108 50" stroke="#5eead4" strokeWidth="2.5" markerEnd="url(#flechaProp)" />
      <path d={`M ${puntosCampana(156, 13, 60)}`} fill="#2dd4bf" fillOpacity="0.2" stroke="#2dd4bf" strokeWidth="2.5" />
      <line x1="112" y1="82" x2="198" y2="82" stroke="#334155" />
      <defs>
        <marker id="flechaProp" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#5eead4" />
        </marker>
      </defs>
    </>
  );
}

function IlustMediaCentrada() {
  return (
    <>
      <line x1="10" y1="82" x2="190" y2="82" stroke="#334155" />
      <path d={`M ${puntosCampana(100, 24, 62)}`} fill="#2dd4bf" fillOpacity="0.2" stroke="#2dd4bf" strokeWidth="2.5" />
      <line x1="100" y1="8" x2="100" y2="82" stroke="#e2e8f0" strokeDasharray="4 3" strokeWidth="1.5" />
      <text x="106" y="16" fill="#e2e8f0" fontSize="11" fontWeight="bold">μ</text>
    </>
  );
}

function IlustErrorEstandar() {
  return (
    <>
      <line x1="10" y1="82" x2="190" y2="82" stroke="#334155" />
      <path d={`M ${puntosCampana(100, 26, 26)}`} fill="none" stroke="#fb7185" strokeWidth="2" strokeOpacity="0.8" />
      <path d={`M ${puntosCampana(100, 9, 70)}`} fill="#2dd4bf" fillOpacity="0.2" stroke="#2dd4bf" strokeWidth="2.5" />
      <text x="16" y="60" fill="#fda4af" fontSize="10" fontWeight="bold">n pequeño</text>
      <text x="128" y="22" fill="#5eead4" fontSize="10" fontWeight="bold">n grande</text>
    </>
  );
}

const PROPIEDADES = [
  {
    icono: Sparkles,
    titulo: 'Normalidad',
    idea: 'Las medias se aproximan a una campana de Gauss, sin importar la forma original',
    Ilust: IlustNormalidad,
  },
  {
    icono: Target,
    titulo: 'Media centrada',
    idea: 'La media de las medias es igual a la media poblacional',
    formula: <>μ<sub>X̄</sub> = μ</>,
    Ilust: IlustMediaCentrada,
  },
  {
    icono: Ruler,
    titulo: 'Error estándar',
    idea: 'La dispersión disminuye a medida que aumenta n',
    formula: <>σ<sub>X̄</sub> = σ / √n</>,
    Ilust: IlustErrorEstandar,
  },
];

export function SlideTLCPropiedades() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-2.5 space-y-4">
      <Cabecera
        etiqueta="3.2 · Propiedades matemáticas"
        titulo="Tres propiedades clave"
        subtitulo="Al cumplirse las condiciones, la distribución de las medias muestrales adquiere:"
      />

      <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-wrap items-center justify-center gap-2 text-sm">
        <Chip tono="slate">Aleatoriedad ✓</Chip>
        <Chip tono="slate">Independencia ✓</Chip>
        <Chip tono="slate">n ≥ 30 ✓</Chip>
        <Chip tono="slate">Varianza finita ✓</Chip>
        <ArrowRight size={18} className="text-teal-300 mx-1" />
        <span className="text-white font-bold">Distribución de X̄</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {PROPIEDADES.map(({ icono: Icono, titulo, idea, formula, Ilust }, i) => (
          <RevealStep key={titulo} stepIndex={i} className="h-full">
            <div className="h-full p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-teal-500/50 transition-colors flex flex-col items-center text-center gap-3">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500/25 to-emerald-500/10 border border-teal-500/40 flex items-center justify-center">
                  <Icono size={26} className="text-teal-300" />
                </div>
                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-teal-400 text-slate-950 text-xs font-black flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <div className="text-xl font-black text-white leading-tight">{titulo}</div>
              <div className="text-sm text-slate-400 leading-snug min-h-[2.5rem]">{idea}</div>
              <div className="min-h-[2.75rem] flex items-center">
                {formula && (
                  <div className="px-4 py-1.5 rounded-xl bg-slate-950/80 border border-teal-500/30 font-mono text-xl text-teal-300 font-black">
                    {formula}
                  </div>
                )}
              </div>
              <svg viewBox="0 0 200 90" className="w-full h-28 mt-auto" aria-hidden="true">
                <Ilust />
              </svg>
            </div>
          </RevealStep>
        ))}
      </div>
    </div>
  );
}

// ==================================================================
// 3.3 · ¿Por qué es tan importante en la práctica?
// ==================================================================
function DiagramaInferencia() {
  const rnd = mulberry32(5);
  const poblacion = Array.from({ length: 90 }, () => [20 + rnd() * 200, 18 + rnd() * 104]);
  const elegidos = new Set([3, 11, 19, 27, 34, 42, 50, 58, 66, 74, 81, 88]);

  return (
    <svg viewBox="0 0 800 140" className="w-full h-[170px] select-none" role="img"
      aria-label="Población, muestra e inferencia">
      <rect x="10" y="8" width="220" height="124" rx="16" fill="#0f172a" stroke="#334155" />
      {poblacion.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={elegidos.has(i) ? 5 : 3.5}
          fill={elegidos.has(i) ? '#2dd4bf' : '#475569'} />
      ))}

      <path d="M 245 70 L 305 70" stroke="#5eead4" strokeWidth="2.5" markerEnd="url(#flecha)" />
      <rect x="320" y="30" width="160" height="80" rx="16" fill="#042f2e" stroke="#14b8a6" />
      {Array.from(elegidos).map((_, k) => (
        <circle key={k} cx={344 + (k % 6) * 22} cy={56 + Math.floor(k / 6) * 26} r="6" fill="#2dd4bf" />
      ))}

      <path d="M 495 70 L 555 70" stroke="#5eead4" strokeWidth="2.5" markerEnd="url(#flecha)" />
      <rect x="570" y="8" width="220" height="124" rx="16" fill="#022c22" stroke="#10b981" />
      <path
        d={(() => {
          const pts = [];
          for (let k = 0; k <= 60; k++) {
            const z = -3 + (6 * k) / 60;
            pts.push(`${(680 + z * 30).toFixed(1)},${(112 - (normPdf(z) / normPdf(0)) * 80).toFixed(1)}`);
          }
          return `M ${pts.join(' L ')}`;
        })()}
        fill="#34d399" fillOpacity="0.2" stroke="#34d399" strokeWidth="2.5"
      />
      <line x1="590" y1="112" x2="770" y2="112" stroke="#065f46" />

      <defs>
        <marker id="flecha" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#5eead4" />
        </marker>
      </defs>
    </svg>
  );
}

const USOS = [
  {
    icono: Database,
    titulo: 'Inferir con una muestra',
    idea: 'Estimar el tiempo de respuesta de toda la API midiendo solo una muestra de peticiones',
    extra: 'Sin procesar millones de registros',
  },
  {
    icono: FlaskConical,
    titulo: 'Pruebas paramétricas',
    idea: 'Comparar versiones en pruebas A/B con prueba t o ANOVA',
    extra: 'Aunque las latencias no sean normales',
  },
  {
    icono: Gauge,
    titulo: 'Rendimiento y riesgo',
    idea: 'Monitorear el rendimiento y el riesgo de caídas del sistema',
    extra: 'Con subconjuntos representativos de métricas',
  },
];

export function SlideTLCImportancia() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-2.5 space-y-3">
      <Cabecera
        etiqueta="3.3 · En la práctica"
        titulo="¿Por qué es tan importante?"
        subtitulo="En desarrollo de software: de una muestra de datos a conclusiones sobre todo el sistema."
      />

      <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
        <div className="grid grid-cols-3 text-center text-xs font-bold uppercase tracking-wider mb-1">
          <span className="text-slate-400">Todas las peticiones</span>
          <span className="text-teal-300">Muestra de peticiones</span>
          <span className="text-emerald-300">Conclusión sobre el sistema</span>
        </div>
        <DiagramaInferencia />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {USOS.map(({ icono: Icono, titulo, idea, extra }, i) => (
          <RevealStep key={titulo} stepIndex={i} className="h-full">
            <div className="h-full p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center shrink-0">
                  <Icono size={20} className="text-teal-300" />
                </div>
                <div className="text-base font-black text-white leading-tight">{titulo}</div>
              </div>
              <p className="text-sm text-slate-300 leading-snug">{idea}</p>
              <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">{extra}</div>
            </div>
          </RevealStep>
        ))}
      </div>
    </div>
  );
}
// ==================================================================
// EJEMPLO PRÁCTICO EN SOFTWARE: LATENCIA DE UN MICROSERVICIO (API REST)
// ==================================================================
// Microservicio de autenticación. Población asimétrica a la derecha:
//   μ = 200 ms · σ = 50 ms · n = 100
//   σ_X̄ = 50/√100 = 5 ms · Z = (210 − 200)/5 = +2.0
//   P(Z ≤ 2.0) = 0.9772 → P(Z > 2.0) = 0.0228 = 2.28 %
const MU_API = 200;
const SIGMA_API = 50;
const N_API = 100;
const SE_API = SIGMA_API / Math.sqrt(N_API);
const X_UMBRAL = 210;
const Z_API = (X_UMBRAL - MU_API) / SE_API;

// Latencias simuladas: 150 ms + Exponencial(media 50) → μ = 200, σ = 50.
const latencia = (rnd) => 150 - 50 * Math.log(1 - rnd());

function MiniPoblacionAPI({ alto = 120, className = '' }) {
  const barras = useMemo(() => {
    const rnd = mulberry32(41);
    const h = histograma(Array.from({ length: 4000 }, () => latencia(rnd)), 150, 450, 40);
    const max = Math.max(...h);
    return h.map((c) => (c / max) * (alto - 4));
  }, [alto]);
  const ancho = 520 / 40;
  return (
    <svg viewBox={`0 0 560 ${alto}`} className={className} aria-hidden="true">
      {barras.map((a, i) => (
        <rect key={i} x={20 + i * ancho + 0.5} y={alto - a} width={ancho - 1} height={a} rx="1.5" fill="#fb7185" opacity="0.8" />
      ))}
    </svg>
  );
}

function PasoTitulo({ numero, titulo, children }) {
  return (
    <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex gap-2.5">
      <span className="w-6 h-6 rounded-full bg-teal-400 text-slate-950 text-xs font-black flex items-center justify-center shrink-0">
        {numero}
      </span>
      <div className="min-w-0 space-y-1">
        <div className="text-xs font-bold text-white uppercase tracking-wider">{titulo}</div>
        {children}
      </div>
    </div>
  );
}

function Formula({ children }) {
  return (
    <div className="px-2.5 py-1.5 rounded-lg bg-slate-950/80 border border-slate-800 font-mono text-sm text-teal-300 font-bold">
      {children}
    </div>
  );
}

// ==================================================================
// 3.4 · Ejemplo práctico: escenario (con los datos) y pregunta
// ==================================================================
const DATOS_API = [
  { etiqueta: 'Media (μ)', valor: '200 ms' },
  { etiqueta: 'Desviación (σ)', valor: '50 ms' },
  { etiqueta: 'Lote (n)', valor: '100' },
];

export function SlideTLCEscenario() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-2.5 space-y-3">
      <Cabecera
        etiqueta="3.4 · Ejemplo práctico en software"
        titulo="Latencia de un microservicio (API REST)"
      />

      <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-500/10 to-slate-900/60 border border-teal-500/30 flex gap-4">
        <div className="w-11 h-11 rounded-2xl bg-teal-500/15 border border-teal-500/40 flex items-center justify-center shrink-0">
          <Server size={22} className="text-teal-300" />
        </div>
        <div className="space-y-1">
          <div className="text-xs font-bold text-teal-300 uppercase tracking-wider">Escenario</div>
          <p className="text-sm sm:text-base text-slate-100 leading-relaxed">
            Un equipo de DevOps monitorea el <strong className="text-white">rendimiento de un microservicio de autenticación</strong>.
            Históricamente, las peticiones de los usuarios tienen una <strong className="text-rose-300">distribución asimétrica a la derecha</strong>{' '}
            (la mayoría responde en pocos milisegundos, pero algunas sufren retardos por la base de datos o almacenamiento en caché),
            con una media poblacional de <strong className="text-white font-mono whitespace-nowrap">μ = 200 ms</strong> y una desviación estándar poblacional
            de <strong className="text-white font-mono whitespace-nowrap">σ = 50 ms</strong>.
          </p>
          <p className="text-sm sm:text-base text-slate-100 leading-relaxed">
            Para verificar el estado del servidor, la herramienta de monitoreo analiza de forma aleatoria e independiente
            un lote de <strong className="text-white font-mono whitespace-nowrap">n = 100</strong> peticiones.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-stretch gap-2">
        {DATOS_API.map((d) => (
          <div key={d.etiqueta} className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-baseline gap-2">
            <span className="text-[11px] text-slate-400">{d.etiqueta}</span>
            <span className="text-base font-black text-white font-mono">{d.valor}</span>
          </div>
        ))}
        <div className="px-3 py-1.5 rounded-xl bg-rose-950/30 border border-rose-900/50 flex items-center gap-2">
          <span className="text-[11px] text-slate-400">Distribución</span>
          <span className="text-sm font-black text-rose-300">Asimétrica</span>
          <MiniPoblacionAPI alto={60} className="w-16 h-5" />
        </div>
      </div>

      <RevealStep stepIndex={1}>
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex gap-4">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/40 flex items-center justify-center shrink-0">
            <HelpCircle size={22} className="text-amber-300" />
          </div>
          <div className="space-y-1">
            <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">Pregunta</div>
            <p className="text-sm sm:text-base text-slate-100 leading-relaxed">
              Si la herramienta de monitoreo toma una muestra aleatoria de <strong className="text-white font-mono whitespace-nowrap">n = 100</strong> peticiones,
              ¿cuál es la probabilidad de que el tiempo medio de respuesta (X̄) de esa muestra{' '}
              <strong className="text-amber-300">supere los 210 ms</strong>?
            </p>
          </div>
        </div>
      </RevealStep>
    </div>
  );
}

// ==================================================================
// 3.5 · Paso a paso (1–3): TLC, error estándar y estandarización Z
// ==================================================================
const W5 = 560, H5 = 300, BASE5 = 240, MIN5 = 180, MAX5 = 222;
const xs5 = (v) => 30 + ((v - MIN5) / (MAX5 - MIN5)) * (W5 - 60);
const ys5 = (v) => BASE5 - (normPdf((v - MU_API) / SE_API) / normPdf(0)) * 190;

function caminoCurva(desde, hasta, cerrar) {
  const pts = [];
  for (let k = 0; k <= 120; k++) {
    const v = desde + ((hasta - desde) * k) / 120;
    pts.push(`${xs5(v).toFixed(1)},${ys5(v).toFixed(1)}`);
  }
  return cerrar
    ? `M ${xs5(desde)},${BASE5} L ${pts.join(' L ')} L ${xs5(hasta)},${BASE5} Z`
    : `M ${pts.join(' L ')}`;
}

export function SlideTLCPasos() {
  const { step } = useSlideStep();

  return (
    <div className="max-w-5xl mx-auto px-4 py-2.5 space-y-3">
      <Cabecera
        etiqueta="3.5 · Ejemplo práctico · Paso a paso"
        titulo="Del TLC al valor Z"
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
        <div className="lg:col-span-2 space-y-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <Chip tono="slate">μ = 200 ms</Chip>
            <Chip tono="slate">σ = 50 ms</Chip>
            <Chip tono="slate">n = 100</Chip>
            <Chip tono="amber">¿P(X̄ &gt; 210 ms)?</Chip>
          </div>

          <RevealStep stepIndex={0}>
            <PasoTitulo numero="1" titulo="Aplicar las propiedades del TLC">
              <p className="text-sm text-slate-300 leading-snug">
                n = 100 ≥ 30 ✓ · independientes ✓ → <span className="text-emerald-300 font-bold">X̄ es normal</span>
              </p>
            </PasoTitulo>
          </RevealStep>

          <RevealStep stepIndex={1}>
            <PasoTitulo numero="2" titulo="Calcular el error estándar">
              <Formula>σ<sub>X̄</sub> = σ/√n = 50/√100 = 50/10 = 5 ms</Formula>
            </PasoTitulo>
          </RevealStep>

          <RevealStep stepIndex={2}>
            <PasoTitulo numero="3" titulo="Estandarización Z del TLC">
              <Formula>Z = (X̄ − μ) / (σ/√n)</Formula>
              <Formula>Z = (210 − 200)/5 = 10/5 = +2.0</Formula>
            </PasoTitulo>
          </RevealStep>
        </div>

        <div className="lg:col-span-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold text-teal-300 uppercase tracking-wider">
              Distribución de X̄ (medias de 100 peticiones)
            </span>
            <div className="flex items-center gap-1.5 text-[10px] text-rose-300 font-bold">
              Población original
              <MiniPoblacionAPI alto={60} className="w-20 h-6" />
            </div>
          </div>

          <svg viewBox={`0 0 ${W5} ${H5}`} className="w-full flex-1 min-h-[300px] select-none" role="img"
            aria-label="Campana normal de la media muestral con media 200 ms y error estándar 5 ms; 210 ms corresponde a Z = 2">
            <line x1="30" y1={BASE5} x2={W5 - 30} y2={BASE5} stroke="#334155" strokeWidth="1.5" />

            <path d={caminoCurva(MIN5, MAX5, true)} fill="#2dd4bf" fillOpacity="0.15" />
            <path d={caminoCurva(MIN5, MAX5, false)} fill="none" stroke="#5eead4" strokeWidth="2.5" />

            {step >= 2 && (
              <motion.path
                d={caminoCurva(X_UMBRAL, MAX5, true)}
                fill="#f59e0b"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ duration: 0.6 }}
              />
            )}

            <line x1={xs5(MU_API)} y1="38" x2={xs5(MU_API)} y2={BASE5} stroke="#e2e8f0" strokeDasharray="4 4" strokeWidth="1.2" />
            <text x={xs5(MU_API)} y="30" textAnchor="middle" fill="#e2e8f0" fontSize="13" fontWeight="bold">μ = 200 ms</text>

            {step >= 1 && (
              <g>
                <line x1={xs5(MU_API)} y1={ys5(MU_API + SE_API)} x2={xs5(MU_API + SE_API)} y2={ys5(MU_API + SE_API)} stroke="#5eead4" strokeWidth="2" />
                <text x={xs5(MU_API + SE_API / 2)} y={ys5(MU_API + SE_API) + 20} textAnchor="middle" fill="#5eead4" fontSize="13" fontWeight="bold">
                  σ<tspan fontSize="9" dy="3">X̄</tspan><tspan dy="-3"> = 5 ms</tspan>
                </text>
              </g>
            )}

            {step >= 2 && (
              <g>
                <line x1={xs5(X_UMBRAL)} y1="60" x2={xs5(X_UMBRAL)} y2={BASE5} stroke="#fbbf24" strokeWidth="2" />
                <text x={xs5(X_UMBRAL)} y="52" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">
                  210 ms
                </text>
              </g>
            )}

            {[185, 190, 195, 200, 205, 210, 215, 220].map((v) => (
              <text key={v} x={xs5(v)} y={BASE5 + 18} textAnchor="middle" fill="#64748b" fontSize="12" fontFamily="monospace">
                {v}
              </text>
            ))}
            <text x={W5 - 30} y={BASE5 + 34} textAnchor="end" fill="#64748b" fontSize="11">X̄ (ms)</text>

            {step >= 2 && (
              <g>
                {[-3, -2, -1, 0, 1, 2, 3].map((z) => (
                  <text key={z} x={xs5(MU_API + z * SE_API)} y={BASE5 + 52} textAnchor="middle"
                    fill={z === 2 ? '#fbbf24' : '#94a3b8'} fontSize="12" fontWeight={z === 2 ? 'bold' : 'normal'} fontFamily="monospace">
                    {z > 0 ? `+${z}` : z}
                  </text>
                ))}
                <text x="30" y={BASE5 + 52} fill="#94a3b8" fontSize="11">Z</text>
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}

// ==================================================================
// 3.6 · Paso 4: calcular la probabilidad con la Tabla Z
// ==================================================================
const FILAS_Z = [1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4];
const COLUMNAS_Z = [0, 0.01, 0.02, 0.03, 0.04, 0.05, 0.06, 0.07, 0.08, 0.09];
const FILA_OBJ = 2.0;
const COL_OBJ = 0;

const W6 = 400, H6 = 200, BASE6 = 165;
const xs6 = (z) => 20 + ((z + 3.5) / 7) * (W6 - 40);
const ys6 = (z) => BASE6 - (normPdf(z) / normPdf(0)) * 130;

function curvaZ(desde, hasta, cerrar) {
  const pts = [];
  for (let k = 0; k <= 100; k++) {
    const z = desde + ((hasta - desde) * k) / 100;
    pts.push(`${xs6(z).toFixed(1)},${ys6(z).toFixed(1)}`);
  }
  return cerrar
    ? `M ${xs6(desde)},${BASE6} L ${pts.join(' L ')} L ${xs6(hasta)},${BASE6} Z`
    : `M ${pts.join(' L ')}`;
}

export function SlideTLCTablaZ() {
  const { step } = useSlideStep();
  useRegisterSteps(3);

  const verFila = step >= 1;
  const verCelda = step >= 2;
  const verResta = step >= 3;

  return (
    <div className="max-w-5xl mx-auto px-4 py-2.5 space-y-3">
      <Cabecera
        etiqueta="3.6 · Ejemplo práctico · Paso 4"
        titulo="Calcular la probabilidad: P(Z > 2.0)"
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
        <div className="lg:col-span-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Tabla Z · área a la izquierda P(Z ≤ z)</span>
            <span className="text-[11px] font-mono text-amber-300">z = 2.0 + 0.00</span>
          </div>
          <table className="w-full text-center font-mono text-[11px] sm:text-xs border-collapse">
            <thead>
              <tr>
                <th className="py-1 px-1 text-slate-400 border-b border-slate-700">z</th>
                {COLUMNAS_Z.map((c) => (
                  <th key={c}
                    className={`py-1 px-1 border-b border-slate-700 transition-colors ${
                      verCelda && c === COL_OBJ ? 'text-amber-300 bg-amber-500/15' : 'text-slate-400'
                    }`}>
                    {c.toFixed(2)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {FILAS_Z.map((f) => {
                const filaActiva = verFila && f === FILA_OBJ;
                return (
                  <tr key={f}>
                    <td className={`py-[3px] px-1 font-bold transition-colors ${filaActiva ? 'text-amber-300 bg-amber-500/15' : 'text-slate-400'}`}>
                      {f.toFixed(1)}
                    </td>
                    {COLUMNAS_Z.map((c) => {
                      const celda = verCelda && f === FILA_OBJ && c === COL_OBJ;
                      const enCruz = (filaActiva) || (verCelda && c === COL_OBJ);
                      return (
                        <td key={c}
                          className={`py-[3px] px-1 transition-all duration-500 ${
                            celda
                              ? 'bg-amber-400 text-slate-950 font-black rounded'
                              : enCruz
                              ? 'bg-amber-500/10 text-slate-100'
                              : 'text-slate-400'
                          }`}>
                          {normCdf(f + c).toFixed(4)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="lg:col-span-2 space-y-2.5">
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
            <svg viewBox={`0 0 ${W6} ${H6}`} className="w-full h-auto select-none" role="img"
              aria-label="Normal estándar: área a la izquierda de Z = 2 es 0.9772 y a la derecha 0.0228">
              <line x1="20" y1={BASE6} x2={W6 - 20} y2={BASE6} stroke="#334155" strokeWidth="1.5" />
              <motion.path d={curvaZ(-3.5, Z_API, true)} fill="#2dd4bf" initial={false}
                animate={{ opacity: verCelda ? 0.35 : 0.08 }} transition={{ duration: 0.5 }} />
              <motion.path d={curvaZ(Z_API, 3.5, true)} fill="#f59e0b" initial={false}
                animate={{ opacity: verResta ? 0.85 : 0.15 }} transition={{ duration: 0.5 }} />
              <path d={curvaZ(-3.5, 3.5, false)} fill="none" stroke="#5eead4" strokeWidth="2" />
              <line x1={xs6(Z_API)} y1="40" x2={xs6(Z_API)} y2={BASE6} stroke="#fbbf24" strokeWidth="2" />
              <text x={xs6(Z_API)} y="32" textAnchor="middle" fill="#fbbf24" fontSize="13" fontWeight="bold">Z = +2.0</text>
              {verCelda && (
                <text x={xs6(-0.3)} y={BASE6 - 30} textAnchor="middle" fill="#99f6e4" fontSize="15" fontWeight="bold">0.9772</text>
              )}
              {verResta && (
                <text x={xs6(2.75)} y={BASE6 - 22} textAnchor="middle" fill="#fcd34d" fontSize="13" fontWeight="bold">0.0228</text>
              )}
              {[-3, -2, -1, 0, 1, 2, 3].map((z) => (
                <text key={z} x={xs6(z)} y={BASE6 + 18} textAnchor="middle" fill="#64748b" fontSize="11" fontFamily="monospace">{z}</text>
              ))}
            </svg>
          </div>

          <RevealStep stepIndex={2}>
            <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/30">
              <div className="text-[11px] font-bold text-teal-300 uppercase tracking-wider">Área a la izquierda</div>
              <div className="font-mono text-lg text-white font-black">P(Z ≤ 2.0) = 0.9772</div>
            </div>
          </RevealStep>

          <RevealStep stepIndex={3}>
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/40">
              <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">Área a la derecha</div>
              <div className="font-mono text-base text-white font-bold">P(Z &gt; 2.0) = 1 − 0.9772</div>
              <div className="font-mono text-2xl text-amber-300 font-black">= 0.0228 = 2.28 %</div>
            </div>
          </RevealStep>
        </div>
      </div>
    </div>
  );
}

// ==================================================================
// 3.7 · Conclusión: resultado y utilidad práctica (SLA / alertas)
// ==================================================================
const W7 = 560, H7 = 220, BASE7 = 190, MIN7 = 185, MAX7 = 218, BLOQUES = 24;
const ys7 = (v) => BASE7 - ((v - MIN7) / (MAX7 - MIN7)) * (BASE7 - 20);
const xs7 = (i) => 40 + (i / (BLOQUES - 1)) * (W7 - 70);

export function SlideTLCConclusion() {
  const medias = useMemo(() => {
    const rnd = mulberry32(53);
    const normal = () => {
      const u = 1 - rnd();
      const v = rnd();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    };
    const serie = Array.from({ length: BLOQUES - 1 }, () => Math.min(208.5, MU_API + SE_API * normal()));
    serie.push(214);
    return serie;
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-2.5 space-y-3">
      <Cabecera
        etiqueta="3.7 · Ejemplo práctico · Conclusión"
        titulo="¿Azar o degradación del servidor?"
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
        <div className="lg:col-span-2 p-4 rounded-2xl bg-gradient-to-br from-amber-500/15 to-slate-900/60 border border-amber-500/40 flex flex-col justify-center text-center gap-1">
          <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">Resultado</div>
          <div className="text-6xl font-black text-amber-300 font-mono">2.28 %</div>
          <p className="text-sm text-slate-200 leading-snug">
            de probabilidad de que el promedio de <strong className="text-white">100 peticiones</strong> supere los{' '}
            <strong className="text-white">210 ms</strong> por simple fluctuación aleatoria.
          </p>
        </div>

        <div className="lg:col-span-3 p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Activity size={14} className="text-teal-300" /> Monitoreo: promedio por bloque de 100 peticiones
            </span>
          </div>
          <svg viewBox={`0 0 ${W7} ${H7}`} className="w-full h-auto select-none" role="img"
            aria-label="Serie de promedios por bloque; el último supera el umbral de 210 ms y dispara una alerta">
            <rect x="40" y="20" width={W7 - 70} height={ys7(X_UMBRAL) - 20} fill="#f43f5e" opacity="0.08" />
            <line x1="40" y1={ys7(X_UMBRAL)} x2={W7 - 30} y2={ys7(X_UMBRAL)} stroke="#fb7185" strokeWidth="1.5" strokeDasharray="5 4" />
            <text x="46" y={ys7(X_UMBRAL) - 6} fill="#fb7185" fontSize="12" fontWeight="bold">umbral 210 ms → alerta</text>
            <line x1="40" y1={ys7(MU_API)} x2={W7 - 30} y2={ys7(MU_API)} stroke="#475569" strokeWidth="1" strokeDasharray="3 4" />
            <text x="34" y={ys7(MU_API) + 4} textAnchor="end" fill="#94a3b8" fontSize="11" fontFamily="monospace">200</text>
            <text x="34" y={ys7(X_UMBRAL) + 4} textAnchor="end" fill="#fb7185" fontSize="11" fontFamily="monospace">210</text>

            <polyline points={medias.map((m, i) => `${xs7(i)},${ys7(m)}`).join(' ')} fill="none" stroke="#2dd4bf" strokeWidth="2" />
            {medias.map((m, i) => {
              const alerta = m > X_UMBRAL;
              return (
                <motion.circle key={i} cx={xs7(i)} cy={ys7(m)} r={alerta ? 7 : 3.5}
                  fill={alerta ? '#f43f5e' : '#2dd4bf'}
                  initial={false}
                  animate={alerta ? { scale: [1, 1.5, 1] } : {}}
                  transition={alerta ? { duration: 1.2, repeat: Infinity } : {}} />
              );
            })}
            <line x1="40" y1={BASE7} x2={W7 - 30} y2={BASE7} stroke="#334155" />
            <text x={W7 - 30} y={BASE7 + 18} textAnchor="end" fill="#64748b" fontSize="11">tiempo →</text>
          </svg>
        </div>
      </div>

      <RevealStep stepIndex={1}>
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/40 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/50 flex items-center justify-center shrink-0">
            <BellRing size={24} className="text-rose-300" />
          </div>
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-rose-300 uppercase tracking-wider">Utilidad práctica en software (SLA / alertas)</div>
            <p className="text-sm sm:text-base text-slate-100 leading-snug">
              Promedio de 100 peticiones &gt; 210 ms → por azar es casi nulo (2.28 %) →{' '}
              <strong className="text-white">realmente hay una degradación o fallo en el servidor</strong> →{' '}
              <span className="text-rose-300 font-bold">alerta automática de rendimiento</span>.
            </p>
          </div>
        </div>
      </RevealStep>
    </div>
  );
}
