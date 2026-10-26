import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, TrendingUp, Heart, BarChart3,
  ArrowRight, Target, Clock, AlertTriangle,
  Database, CheckCircle, XCircle
} from 'lucide-react';

/* ── Utilidades matemáticas ─────────────────────────────── */
const factorial = (n) => {
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
};
const poissonPMF = (k, lam) =>
  (Math.pow(lam, k) * Math.exp(-lam)) / factorial(k);
const binomialPMF = (k, n, p) =>
  (factorial(n) / (factorial(k) * factorial(n - k))) *
  Math.pow(p, k) *
  Math.pow(1 - p, n - k);


/* ════════════════════════════════════════════════════════════
   SLIDE 1.0 — Concepto General: ¿Qué es una Distribución
   de Probabilidad? + Distribuciones Discretas (Binomial y
   Poisson).
   ════════════════════════════════════════════════════════════ */
export function SlideInferencialFundamentos() {
  const [expanded, setExpanded] = useState(null); // 'binomial' | 'poisson'

  return (
    <div className="max-w-5xl mx-auto px-4 py-3 space-y-4">
      {/* ── Header ── */}
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold">
          Sección 1 · Said — Distribuciones de Probabilidad
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          ¿Qué es una Distribución de Probabilidad?
        </h2>
        <p className="text-slate-400 text-xs mt-1">
          Regla matemática que asigna una probabilidad a cada resultado posible de un evento aleatorio.
        </p>
      </div>

      {/* ── Paradigma: Descriptivo → Predictivo ── */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 items-center">
        {/* Antes */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 rounded-2xl bg-slate-900/80 border border-rose-500/20"
        >
          <div className="flex items-center gap-2 mb-1">
            <Database className="w-4 h-4 text-rose-400" />
            <span className="text-[10px] uppercase tracking-wider text-rose-400 font-bold">
              Enfoque Histórico / Descriptivo
            </span>
          </div>
          <p className="text-sm text-slate-400 italic">
            "¿Cuántas peticiones tuvimos ayer?"
          </p>
          <p className="text-[10px] text-slate-600 mt-1.5 flex items-center gap-1">
            <XCircle className="w-3 h-3" /> Solo mira el retrovisor — no gestiona incertidumbre futura
          </p>
        </motion.div>

        {/* Flecha central */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="hidden md:flex"
        >
          <ArrowRight className="w-7 h-7 text-cyan-400" />
        </motion.div>

        {/* Después */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/40 to-blue-950/40 border border-cyan-500/30"
        >
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold">
              Enfoque Predictivo / Inferencia
            </span>
          </div>
          <p className="text-sm text-white font-medium">
            "¿Cuál es la probabilidad de un pico de tráfico que tumbe el sistema?"
          </p>
          <p className="text-[10px] text-emerald-400 mt-1.5 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" /> Modelos predictivos para mitigar riesgos
          </p>
        </motion.div>
      </div>

      {/* ── Variables Discretas — callout ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2"
      >
        <BarChart3 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="text-amber-400 font-bold">Distribuciones Discretas:</span>{' '}
          Modelan datos que solo toman valores enteros y contables — no existen{' '}
          <code className="text-rose-300 bg-rose-500/10 px-1 rounded">2.5 usuarios</code> ni{' '}
          <code className="text-rose-300 bg-rose-500/10 px-1 rounded">3.4 errores HTTP 500</code>.
          En negocio y software, casi todas las métricas de interacción son discretas.
        </div>
      </motion.div>

      {/* ── Tarjetas: Binomial & Poisson ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* ─ Binomial ─ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => setExpanded(expanded === 'binomial' ? null : 'binomial')}
          className={`cursor-pointer p-4 rounded-2xl border transition-all ${
            expanded === 'binomial'
              ? 'bg-purple-950/40 border-purple-500/40 shadow-lg shadow-purple-500/5'
              : 'bg-slate-900/80 border-slate-800 hover:border-purple-500/30'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-purple-500/15">
              <Target className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Distribución Binomial</h3>
              <p className="text-[10px] text-purple-400">
                Éxito o Fracaso en un número fijo de intentos
              </p>
            </div>
          </div>

          {/* Mini gráfico Binomial n=5, p=0.6 */}
          <svg viewBox="0 0 220 65" className="w-full h-14 mt-2">
            {Array.from({ length: 6 }, (_, k) => {
              const p = binomialPMF(k, 5, 0.6);
              const barH = Math.max(2, p * 180);
              const x = 20 + k * 33;
              return (
                <g key={k}>
                  <rect
                    x={x} y={50 - barH} width={24} height={barH} rx="3"
                    fill={k === 3 ? '#a855f7' : '#6b21a8'} opacity="0.85"
                  />
                  <text x={x + 12} y={60} fill="#94a3b8" fontSize="8" textAnchor="middle">
                    {k}
                  </text>
                </g>
              );
            })}
          </svg>

          <AnimatePresence>
            {expanded === 'binomial' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-2 p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
                  <p>
                    <strong className="text-purple-300">Ejemplo:</strong> De 5 visitantes web,
                    ¿cuántos compran si la tasa de conversión es 60%?
                  </p>
                  <div className="font-mono text-purple-400 text-[10px] bg-purple-500/5 px-2 py-1.5 rounded">
                    P(X = k) = C(n,k) · p<sup>k</sup> · (1 − p)<sup>n−k</sup>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ─ Poisson ─ */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          onClick={() => setExpanded(expanded === 'poisson' ? null : 'poisson')}
          className={`cursor-pointer p-4 rounded-2xl border transition-all ${
            expanded === 'poisson'
              ? 'bg-amber-950/40 border-amber-500/40 shadow-lg shadow-amber-500/5'
              : 'bg-slate-900/80 border-slate-800 hover:border-amber-500/30'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/15">
              <Activity className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Distribución de Poisson</h3>
              <p className="text-[10px] text-amber-400">
                Cantidad de eventos en un intervalo de tiempo o espacio
              </p>
            </div>
          </div>

          {/* Mini gráfico Poisson λ=3 */}
          <svg viewBox="0 0 220 65" className="w-full h-14 mt-2">
            {Array.from({ length: 10 }, (_, k) => {
              const p = poissonPMF(k, 3);
              const barH = Math.max(1, p * 230);
              const x = 8 + k * 21;
              return (
                <g key={k}>
                  <rect
                    x={x} y={50 - barH} width={16} height={barH} rx="2"
                    fill={k === 3 ? '#f59e0b' : '#b45309'} opacity="0.85"
                  />
                  <text x={x + 8} y={60} fill="#94a3b8" fontSize="7" textAnchor="middle">
                    {k}
                  </text>
                </g>
              );
            })}
          </svg>

          <AnimatePresence>
            {expanded === 'poisson' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-2 p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 space-y-1.5">
                  <p>
                    <strong className="text-amber-300">Requisitos:</strong> Eventos
                    independientes a tasa promedio constante λ.
                  </p>
                  <div className="font-mono text-amber-400 text-[10px] bg-amber-500/5 px-2 py-1.5 rounded">
                    P(X = k) = (λ<sup>k</sup> · e<sup>−λ</sup>) / k!
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}


/* ════════════════════════════════════════════════════════════
   SLIDE 1.1 — Poisson & Inteligencia de Negocios en Salud
   Ejemplo interactivo: EPI-Monitor Santa Elena (Dengue)
   Recreación del gráfico matplotlib como SVG interactivo.
   ════════════════════════════════════════════════════════════ */
export function SlidePoissonNegocio() {
  const [lambda, setLambda] = useState(5);
  const [hoveredBar, setHoveredBar] = useState(null);
  const [alertThreshold, setAlertThreshold] = useState(15);

  /* Datos de Poisson para k = 0..20 */
  const kValues = Array.from({ length: 21 }, (_, i) => i);
  const probs = kValues.map((k) => poissonPMF(k, lambda));
  const maxProb = Math.max(...probs);

  /* Dimensiones del gráfico SVG */
  const W = 680, H = 260;
  const ml = 52, mr = 12, mt = 30, mb = 40;
  const cw = W - ml - mr;   // 616
  const ch = H - mt - mb;   // 190

  const barStep = cw / kValues.length;
  const barW = barStep * 0.7;

  /* Escala Y dinámica (porcentaje) */
  const yMaxPct = Math.max(5, Math.ceil((maxProb * 100 + 1) / 5) * 5);
  const probToY = (p) => mt + ch - (p * 100 / yMaxPct) * ch;

  /* Ticks Y */
  const tickStep = yMaxPct <= 10 ? 2 : 5;
  const yTicks = [];
  for (let t = 0; t <= yMaxPct; t += tickStep) yTicks.push(t);
  if (yTicks[yTicks.length - 1] !== yMaxPct) yTicks.push(yMaxPct);

  /* Probabilidad acumulada P(X >= umbral) */
  const probCrisis = kValues
    .filter((k) => k >= alertThreshold)
    .reduce((sum, k) => sum + poissonPMF(k, lambda), 0);

  /* Probabilidad puntual del umbral */
  const probAtThreshold = poissonPMF(alertThreshold, lambda);

  return (
    <div className="max-w-5xl mx-auto px-4 py-3 space-y-4">
      {/* ── Header + Fórmula ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
            Distribución Discreta · Poisson
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Poisson &amp; Gestión de Colas
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Eventos independientes a tasa promedio constante λ
          </p>
        </div>
        <div className="font-mono text-amber-300 bg-amber-500/10 px-3 py-2 rounded-xl border border-amber-500/20 shrink-0 text-xs">
          <span className="text-slate-500 text-[10px] block mb-0.5">Fórmula de Poisson</span>
          P(X = k) = (λ<sup>k</sup> · e<sup>−λ</sup>) / k!
        </div>
      </div>

      {/* ── Controles: λ y umbral ── */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-300 font-semibold">Tasa media λ:</span>
          {[2, 5, 8, 10].map((l) => (
            <button
              key={l}
              onClick={() => setLambda(l)}
              className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                lambda === l
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              λ = {l}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-300 font-semibold">Umbral alerta:</span>
          <button
            onClick={() => setAlertThreshold((t) => Math.max(3, t - 1))}
            className="w-6 h-6 rounded bg-slate-800 text-white font-bold flex items-center justify-center hover:bg-slate-700 text-sm"
          >−</button>
          <span className="font-mono font-bold text-rose-400 text-sm w-6 text-center">
            {alertThreshold}
          </span>
          <button
            onClick={() => setAlertThreshold((t) => Math.min(20, t + 1))}
            className="w-6 h-6 rounded bg-slate-800 text-white font-bold flex items-center justify-center hover:bg-slate-700 text-sm"
          >+</button>
        </div>
      </div>

      {/* ── Gráfico Principal — EPI-Monitor Santa Elena ── */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-4 h-4 text-rose-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            EPI-Monitor Santa Elena: Ingresos Diarios por Dengue (Poisson λ = {lambda})
          </span>
        </div>

        <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            className="w-full"
            style={{ height: 'clamp(180px, 28vh, 280px)' }}
          >
            {/* Líneas de grid horizontales + labels Y */}
            {yTicks.map((t) => (
              <g key={`y-${t}`}>
                <line
                  x1={ml} y1={probToY(t / 100)} x2={W - mr} y2={probToY(t / 100)}
                  stroke="#1e293b" strokeDasharray="3 3"
                />
                <text
                  x={ml - 5} y={probToY(t / 100) + 3}
                  fill="#64748b" fontSize="9" textAnchor="end" fontFamily="monospace"
                >{t}%</text>
              </g>
            ))}

            {/* Línea base */}
            <line
              x1={ml} y1={mt + ch} x2={W - mr} y2={mt + ch}
              stroke="#334155" strokeWidth="1.5"
            />

            {/* ── Barras ── */}
            {kValues.map((k) => {
              const p = probs[k];
              const barH = (p * 100 / yMaxPct) * ch;
              const x = ml + k * barStep + (barStep - barW) / 2;
              const y = mt + ch - barH;
              const isAlert = k >= alertThreshold;
              const isMean = k === lambda;
              const isHov = hoveredBar === k;

              let fill = '#4682B4'; // azul acero (como en el código Python)
              if (isAlert) fill = '#E74C3C'; // rojo (como en el código Python)
              if (isMean && !isAlert) fill = '#f59e0b'; // ámbar para la media

              return (
                <g
                  key={k}
                  onMouseEnter={() => setHoveredBar(k)}
                  onMouseLeave={() => setHoveredBar(null)}
                  className="cursor-pointer"
                >
                  {/* Área de hit invisible más ancha */}
                  <rect
                    x={ml + k * barStep} y={mt} width={barStep} height={ch}
                    fill="transparent"
                  />
                  {/* Barra */}
                  <rect
                    x={x} y={Math.min(y, mt + ch - 1)}
                    width={barW} height={Math.max(1, barH)}
                    rx="3"
                    fill={fill}
                    opacity={isHov ? 1 : 0.82}
                    stroke={isHov ? 'white' : 'none'}
                    strokeWidth={isHov ? 1.5 : 0}
                    className="transition-opacity duration-150"
                  />
                  {/* Label X */}
                  <text
                    x={x + barW / 2} y={mt + ch + 14}
                    fill={isMean ? '#f59e0b' : isAlert ? '#fca5a5' : '#94a3b8'}
                    fontSize="9" textAnchor="middle"
                    fontWeight={isMean ? 'bold' : 'normal'}
                  >{k}</text>

                  {/* Tooltip al hacer hover */}
                  {isHov && (
                    <g>
                      <rect
                        x={Math.max(ml, Math.min(x + barW / 2 - 42, W - mr - 84))}
                        y={Math.max(mt - 8, y - 30)}
                        width={84} height={24} rx="6"
                        fill="#0f172a" stroke={isAlert ? '#ef4444' : '#6366f1'}
                        strokeWidth="1.5"
                      />
                      <text
                        x={Math.max(ml + 42, Math.min(x + barW / 2, W - mr - 42))}
                        y={Math.max(mt + 6, y - 14)}
                        fill="white" fontSize="9" textAnchor="middle"
                        fontFamily="monospace" fontWeight="bold"
                      >P({k}) = {p < 0.0001
                          ? (p * 100).toExponential(2) + '%'
                          : (p * 100).toFixed(2) + '%'
                      }</text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* ── Línea de umbral de alerta ── */}
            {(() => {
              const lineX = ml + (alertThreshold - 0.35) * barStep;
              return (
                <g>
                  <line
                    x1={lineX} y1={mt - 5} x2={lineX} y2={mt + ch}
                    stroke="#ef4444" strokeWidth="2" strokeDasharray="5 3"
                  />
                  <text
                    x={lineX + 4} y={mt + 5}
                    fill="#ef4444" fontSize="9" fontWeight="bold"
                  >Umbral ({alertThreshold})</text>
                </g>
              );
            })()}

            {/* ── Punto rojo + anotación en el umbral de alerta ── */}
            {(() => {
              const k = alertThreshold;
              const p = poissonPMF(k, lambda);
              const barH = (p * 100 / yMaxPct) * ch;
              const cx = ml + k * barStep + barStep / 2;
              const cy = Math.min(mt + ch - barH, mt + ch - 3);

              // Posición del cuadro de anotación
              const boxW = 145;
              const boxH = 34;
              const boxX = Math.min(cx - 15, W - mr - boxW - 5);
              const boxY = mt + 18;

              return (
                <g>
                  {/* Punto rojo marcador */}
                  <circle
                    cx={cx} cy={cy} r="5"
                    fill="#E74C3C" stroke="#0f172a" strokeWidth="2"
                  />
                  {/* Línea de conexión */}
                  <line
                    x1={boxX + boxW / 2} y1={boxY + boxH}
                    x2={cx} y2={cy - 6}
                    stroke="#475569" strokeWidth="1.5"
                  />
                  {/* Cuadro de anotación */}
                  <rect
                    x={boxX} y={boxY} width={boxW} height={boxH} rx="6"
                    fill="#1c1017" stroke="#ef4444" strokeWidth="1"
                  />
                  <text
                    x={boxX + 8} y={boxY + 14}
                    fill="#fca5a5" fontSize="9" fontWeight="bold"
                  >Alerta Crítica: {k} pac.</text>
                  <text
                    x={boxX + 8} y={boxY + 27}
                    fill="#ef4444" fontSize="9" fontFamily="monospace"
                  >Probabilidad: {p < 0.00001
                      ? p.toExponential(3)
                      : p.toFixed(5)
                  }</text>
                </g>
              );
            })()}

            {/* Labels de ejes */}
            <text
              x={(ml + W - mr) / 2} y={H - 3}
              fill="#64748b" fontSize="10" textAnchor="middle"
            >Número de Pacientes Recibidos al Día</text>
            <text
              x={14} y={(mt + mt + ch) / 2}
              fill="#64748b" fontSize="10" textAnchor="middle"
              transform={`rotate(-90, 14, ${(mt + mt + ch) / 2})`}
            >Probabilidad</text>
          </svg>

          {/* Leyenda */}
          <div className="flex flex-wrap items-center gap-4 mt-2.5 pt-2.5 border-t border-slate-800/80 text-[11px]">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ background: '#f59e0b' }} />
              <span className="text-slate-300">Media (λ = {lambda})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ background: '#4682B4' }} />
              <span className="text-slate-300">Flujo Normal</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded" style={{ background: '#E74C3C' }} />
              <span className="text-slate-300">Zona de Alerta (k ≥ {alertThreshold})</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Tarjetas de resumen ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* P(X ≥ umbral) — Probabilidad de crisis */}
        <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-900/40">
          <div className="text-rose-400 font-bold text-xs flex items-center gap-1.5 mb-1">
            <AlertTriangle className="w-4 h-4" />
            P(X ≥ {alertThreshold}) — Crisis
          </div>
          <p className="text-white font-mono text-lg font-bold">
            {probCrisis < 0.0001
              ? (probCrisis * 100).toExponential(2) + '%'
              : (probCrisis * 100).toFixed(4) + '%'}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Probabilidad de colapso de cola
          </p>
        </div>

        {/* Propiedad fundamental */}
        <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-900/40">
          <div className="text-amber-400 font-bold text-xs flex items-center gap-1.5 mb-1">
            <Activity className="w-4 h-4" />
            Propiedad Clave
          </div>
          <p className="text-white font-mono text-sm font-bold mt-1">
            E[X] = Var[X] = λ = {lambda}
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Media y varianza son idénticas
          </p>
        </div>

        {/* Escenario BI en Salud */}
        <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-900/40">
          <div className="text-blue-400 font-bold text-xs flex items-center gap-1.5 mb-1">
            <Heart className="w-4 h-4" />
            Escenario: BI en Salud
          </div>
          <p className="text-slate-200 text-[11px] leading-relaxed">
            Centro de Salud Santa Elena: <strong className="text-white">λ = {lambda}</strong> pacientes
            dengue/día. Si llegan <strong className="text-rose-300">≥ {alertThreshold}</strong>,
            activar protocolo y optimizar médicos, camas y medicamentos.
          </p>
        </div>
      </div>
    </div>
  );
}
