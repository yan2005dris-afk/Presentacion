import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Filter, Clock, Activity, AlertCircle, ArrowRight, Server, ShoppingCart, Users } from 'lucide-react';

export function SlideInferencialFundamentos() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-6">
      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs uppercase tracking-wider text-blue-400 font-bold">1. Marco Teórico y Conceptual</span>
        <h2 className="text-3xl font-black text-white tracking-tight">¿Qué es una Distribución de Probabilidad?</h2>
        <p className="text-slate-400 text-sm mt-1">
          La regla matemática o función que asigna una probabilidad a cada resultado posible de un experimento o evento aleatorio.
        </p>
      </div>

      {/* Salto Cualitativo: Minería de datos & Modelos Predictivos */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900 border border-blue-500/30">
        <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-2">
          El Cambio de Paradigma en Minería de Datos y Negocio
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
            <span className="text-rose-400 font-bold block mb-1">Enfoque Histórico / Descriptivo:</span>
            <p className="text-slate-300 italic leading-relaxed">
              "¿Cuántas peticiones tuvimos ayer en el servidor?" o "¿Cuántos clientes compraron la semana pasada?"
            </p>
            <span className="text-[10px] text-slate-500 mt-2 block">Solo mira el retrovisor; no gestiona incertidumbre futura.</span>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-950/50 border border-blue-500/30">
            <span className="text-emerald-400 font-bold block mb-1">Enfoque Predictivo / Inferencia Estadística:</span>
            <p className="text-slate-200 font-medium leading-relaxed">
              "¿Cuál es la probabilidad matemática de que mañana tengamos un pico de tráfico concurrente que tumbe el sistema?"
            </p>
            <span className="text-[10px] text-emerald-400/80 mt-2 block">Crea modelos predictivos para dimensionar capacidad y mitigar riesgos.</span>
          </div>
        </div>
      </div>

      {/* Continuas vs Discretas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono font-bold">
            Variables Discretas
          </span>
          <h3 className="text-lg font-bold text-white mt-2 mb-1">Valores Enteros y Contables</h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Modelan datos que no admiten fracciones intermedias. No se pueden tener <strong>2.5 usuarios</strong> o <strong>3.4 errores HTTP 500</strong> en un log.
          </p>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
            <div className="text-amber-400 font-bold">Distribuciones Clave en Software y Negocio:</div>
            <ul className="text-slate-300 space-y-1 text-[11px]">
              <li>• <strong className="text-white">Binomial:</strong> Éxito o fracaso en un número fijo de intentos (conversión sí/no).</li>
              <li>• <strong className="text-white">Poisson:</strong> Cantidad de eventos en un intervalo continuo de tiempo o espacio.</li>
            </ul>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono font-bold">
            Variables Continuas
          </span>
          <h3 className="text-lg font-bold text-white mt-2 mb-1">Medición en Rango Infinito</h3>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Pueden tomar cualquier valor dentro de un intervalo real continuo: latencia en milisegundos (<code className="text-blue-300">12.45 ms</code>), ingresos monetarios o tiempo de sesión.
          </p>
          <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5">
            <div className="text-indigo-400 font-bold">Distribución Clave por Excelencia:</div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              <strong className="text-white">Distribución Normal (Campana de Gauss):</strong> Pilar de la inferencia, pruebas Z/t y aproximación por Teorema del Límite Central.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SlidePoissonNegocio() {
  const [lambda, setLambda] = useState(4);
  const [maxCapacity, setMaxCapacity] = useState(6);

  // Poisson: P(k; λ) = (λ^k * e^(-λ)) / k!
  const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
  const poissonProb = (k, l) => (Math.pow(l, k) * Math.exp(-l)) / factorial(k);

  const dataPoints = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  // Cálculo de probabilidad de saturación (k > maxCapacity)
  const saturationProb = dataPoints
    .filter(k => k > maxCapacity)
    .reduce((acc, k) => acc + poissonProb(k, lambda), 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-5">
      <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">Distribución Discreta</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Distribución de Poisson & Gestión de Colas
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Teoría de colas, planificación de capacidad de servidores y operaciones comerciales.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-900 p-2 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-300 font-semibold">Tasa Media (λ):</span>
          <div className="flex gap-1">
            {[2, 4, 6].map((l) => (
              <button
                key={l}
                onClick={() => setLambda(l)}
                className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                  lambda === l
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                λ = {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gráfico SVG Puro Vectorial y Dinámico */}
      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" />
            Probabilidad P(X = k) con Tasa Promedio λ = {lambda} peticiones/seg
          </div>
          <div className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
            P(k) = ({lambda}^k · e^-{lambda}) / k!
          </div>
        </div>

        {/* Canvas SVG con Altura Fija y ViewBox Estable */}
        <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
          <svg viewBox="0 0 600 240" className="w-full h-56 overflow-visible">
            {/* Líneas de guía de fondo */}
            <line x1="40" y1="30" x2="580" y2="30" stroke="#1e293b" strokeDasharray="3 3" />
            <line x1="40" y1="105" x2="580" y2="105" stroke="#1e293b" strokeDasharray="3 3" />
            <line x1="40" y1="180" x2="580" y2="180" stroke="#334155" strokeWidth="1.5" />

            {/* Labels de probabilidad en el eje Y */}
            <text x="35" y="34" fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">25%</text>
            <text x="35" y="109" fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">12.5%</text>
            <text x="35" y="184" fill="#64748b" fontSize="10" textAnchor="end" fontFamily="monospace">0%</text>

            {/* Barras de Poisson */}
            {dataPoints.map((k, i) => {
              const p = poissonProb(k, lambda);
              // Altura escalada: 25% prob -> 150px
              const barHeight = Math.min(150, Math.round((p / 0.25) * 150));
              const barWidth = 32;
              const xPos = 55 + i * 44;
              const yPos = 180 - barHeight;
              const isOverCapacity = k > maxCapacity;
              const isMean = k === lambda;

              return (
                <g key={k} className="transition-all duration-300">
                  {/* Barra */}
                  <rect
                    x={xPos}
                    y={yPos}
                    width={barWidth}
                    height={barHeight}
                    rx="4"
                    fill={isOverCapacity ? '#f43f5e' : isMean ? '#f59e0b' : '#6366f1'}
                    opacity={isMean ? '1' : '0.85'}
                  />

                  {/* Porcentaje numérico encima de la barra */}
                  <text
                    x={xPos + barWidth / 2}
                    y={yPos - 6}
                    fill={isOverCapacity ? '#fda4af' : isMean ? '#fde68a' : '#c7d2fe'}
                    fontSize="10"
                    textAnchor="middle"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {(p * 100).toFixed(1)}%
                  </text>

                  {/* Etiqueta del eje X (k) */}
                  <text
                    x={xPos + barWidth / 2}
                    y="200"
                    fill={isMean ? '#f59e0b' : '#94a3b8'}
                    fontSize="11"
                    textAnchor="middle"
                    fontWeight={isMean ? 'bold' : 'normal'}
                  >
                    {k}
                  </text>
                </g>
              );
            })}

            {/* Línea de Capacidad Máxima del Servidor */}
            {(() => {
              const capX = 55 + (maxCapacity + 0.5) * 44;
              return (
                <g>
                  <line x1={capX} y1="20" x2={capX} y2="180" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 4" />
                  <text x={capX + 4} y="25" fill="#f43f5e" fontSize="10" fontWeight="bold">
                    Límite Capacidad ({maxCapacity})
                  </text>
                </g>
              );
            })()}
          </svg>

          {/* Leyenda y Explicación de la Simulación */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-3 pt-3 border-t border-slate-800/80 text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-amber-500" />
                <span className="text-slate-300">Media (λ = {lambda})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-indigo-500" />
                <span className="text-slate-300">Flujo Normal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded bg-rose-500" />
                <span className="text-slate-300">Riesgo de Cola / Sobrecarga</span>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
              <span className="text-slate-400">Capacidad Máxima:</span>
              <button
                onClick={() => setMaxCapacity(c => Math.max(3, c - 1))}
                className="w-5 h-5 rounded bg-slate-800 text-white font-bold flex items-center justify-center hover:bg-slate-700"
              >
                -
              </button>
              <span className="font-mono font-bold text-white px-1">{maxCapacity}</span>
              <button
                onClick={() => setMaxCapacity(c => Math.min(10, c + 1))}
                className="w-5 h-5 rounded bg-slate-800 text-white font-bold flex items-center justify-center hover:bg-slate-700"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Panel de Inferencia Operativa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-900/40 space-y-1">
            <div className="text-rose-400 font-bold flex items-center gap-1.5">
              <Server className="w-4 h-4" />
              Probabilidad de Colapso de Cola (k &gt; {maxCapacity})
            </div>
            <p className="text-slate-200 font-mono text-sm font-bold">
              {(saturationProb * 100).toFixed(2)}% de riesgo
            </p>
            <p className="text-[11px] text-slate-400">
              {saturationProb > 0.1
                ? '¡Alerta de Infraestructura! Más del 10% de las peticiones excederán los hilos del servidor. Se requiere auto-scaling.'
                : 'Margen de estabilidad adecuado para la tasa de llegada actual.'}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="text-amber-400 font-bold flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              Propiedad Fundamental de Poisson
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              La <strong>Media</strong> y la <strong>Varianza</strong> son idénticas: <code className="text-amber-300 font-bold">E[X] = Var[X] = λ = {lambda}</code>. En teoría de colas M/M/1, si la tasa de servicio μ no supera a λ, la cola crece indefinidamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
