import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, ShieldAlert, AlertTriangle, CheckCircle, Clock, 
  Server, ArrowRight, Layers, Cpu, Database, Network, Sliders,
  HelpCircle, Sparkles, Scale, Info, Zap, Check, X, RotateCw, Terminal, Play,
  Maximize2, Minimize2
} from 'lucide-react';
import { GaussFormulaSVG, GaussEvaluatedFormulaSVG, ZScoreFormulaSVG } from '../components/MathFormulasSVG';
import { RevealStep } from '../context/SlideStepContext';

// =========================================================================
// SLIDE 2.0: FUNDAMENTOS & VARIABLES CONTINUAS (LIMPIA Y VISUAL)
// =========================================================================
export function SlideNormalFundamentos() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [pyMu, setPyMu] = useState(150);
  const [pySigma, setPySigma] = useState(20);
  const [evalX, setEvalX] = useState(150);

  // Eje X fijo (80ms a 220ms) para que cuando varíes mu o sigma se vea CLARAMENTE
  // cómo la campana se desplaza a los lados (mu) o se aplasta/ensancha (sigma)
  const fixedMinX = 80;
  const fixedMaxX = 220;
  const points = [];
  const step = (fixedMaxX - fixedMinX) / 60;
  for (let x = fixedMinX; x <= fixedMaxX; x += step) {
    const yVal = (1 / (pySigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - pyMu) / pySigma, 2));
    points.push({ x, y: yVal });
  }

  // Escala fija Y para que una campana con sigma chica se eleve (leptocúrtica) y con sigma grande se aplane
  const maxPossibleY = 0.055; 
  const svgPath = points.map((p, i) => {
    const svgX = 30 + ((p.x - fixedMinX) / (fixedMaxX - fixedMinX)) * 340;
    const svgY = 110 - Math.min(100, (p.y / maxPossibleY) * 98);
    return `${i === 0 ? 'M' : 'L'} ${svgX.toFixed(1)} ${svgY.toFixed(1)}`;
  }).join(' ');

  const muSvgX = 30 + ((pyMu - fixedMinX) / (fixedMaxX - fixedMinX)) * 340;

  return (
    <div className="max-w-6xl mx-auto px-4 py-2 space-y-4">
      {/* Header Ejecutivo */}
      <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-purple-400 font-bold">Bloque 2 · Slide 2.0</span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-bold">
              Expositor: Yandris
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Distribución Normal: Modelado Continuo en Sistemas
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-right">
          <span className="text-[10px] text-slate-400 block font-mono">Notación Formal</span>
          <span className="text-sm font-mono text-purple-300 font-black">X ~ N(μ, σ²)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Lado Izquierdo: Paso 1 - Métricas Continuas */}
        <RevealStep stepIndex={0} className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              1. Magnitudes Continuas en Software
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 font-mono">
              Infinitos Decimales
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-white font-bold block text-xs">Latencia de Red</span>
                <span className="text-[11px] text-slate-400">Tiempo de ida y vuelta (RTT)</span>
              </div>
              <span className="font-mono text-purple-400 font-bold text-sm bg-purple-950/40 px-2 py-1 rounded border border-purple-800/30">
                142.38 ms
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-white font-bold block text-xs">Carga de CPU</span>
                <span className="text-[11px] text-slate-400">Uso porcentual del procesador</span>
              </div>
              <span className="font-mono text-blue-400 font-bold text-sm bg-blue-950/40 px-2 py-1 rounded border border-blue-800/30">
                64.12 %
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-white font-bold block text-xs">Consumo de Memoria</span>
                <span className="text-[11px] text-slate-400">Huella de RAM de microservicio</span>
              </div>
              <span className="font-mono text-emerald-400 font-bold text-sm bg-emerald-950/40 px-2 py-1 rounded border border-emerald-800/30">
                1,024.5 MB
              </span>
            </div>
          </div>

          <div className="p-3 bg-purple-950/20 border border-purple-900/40 rounded-xl text-xs text-purple-200 flex items-center gap-2">
            <Zap className="w-4 h-4 text-purple-400 shrink-0" />
            <span><strong>Regla de Minería:</strong> La probabilidad es el <strong>área bajo la curva</strong> (densidad continua calculada con integrales o `scipy.stats`).</span>
          </div>
        </RevealStep>

        {/* Lado Derecho: Tarjeta Volteable & Expandible (Fórmula Matemática vs Código + Plot Python) */}
        <RevealStep stepIndex={1} className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
              2. Función de Probabilidad: Teoría & Python
            </span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{isFlipped ? 'Ecuación' : 'Python & Plot'}</span>
              </button>
              <button
                onClick={() => setIsExpanded(true)}
                title="Expandir a pantalla completa"
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition-all cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-purple-400" />
                <span className="hidden sm:inline">Enfocar</span>
              </button>
            </div>
          </div>

          {/* Tarjeta Flip con persistencia de altura */}
          <div className="relative min-h-[340px]">
            <AnimatePresence initial={false} mode="wait">
              {!isFlipped ? (
                // CARA FRONTAL: Ecuación Vectorial Matemática
                <motion.div
                  key="front"
                  initial={{ rotateY: 90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-5 rounded-2xl bg-slate-900/95 border border-slate-800 space-y-4 shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-purple-300">
                      Función de Densidad de Probabilidad (PDF)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      Formulación Gaussiana
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <GaussFormulaSVG />
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                      <span className="font-mono font-bold text-blue-400 text-sm block mb-1">μ (Mu) · Centro</span>
                      <span className="text-slate-300 text-[11px] leading-tight block">
                        Media o tendencia central esperada en el dataset.
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80">
                      <span className="font-mono font-bold text-amber-400 text-sm block mb-1">σ (Sigma) · Escala</span>
                      <span className="text-slate-300 text-[11px] leading-tight block">
                        Desviación estándar o dispersión de los datos.
                      </span>
                    </div>
                  </div>

                  <div 
                    onClick={() => setIsFlipped(true)}
                    className="p-2.5 rounded-xl bg-purple-950/20 hover:bg-purple-950/40 border border-purple-900/40 flex items-center justify-between text-xs text-purple-300 cursor-pointer transition-colors"
                  >
                    <span className="flex items-center gap-1.5 font-mono text-[11px]">
                      <Terminal className="w-3.5 h-3.5 text-purple-400" />
                      scipy.stats.norm.pdf(x, loc=μ, scale=σ)
                    </span>
                    <span className="text-[11px] underline font-bold flex items-center gap-1">
                      Ejecutar en Python →
                    </span>
                  </div>
                </motion.div>
              ) : (
                // CARA TRASERA: Código Python + Gráfico Reactivo Generado
                <motion.div
                  key="back"
                  initial={{ rotateY: -90, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 rounded-2xl bg-slate-900/95 border border-purple-800/50 space-y-3 shadow-xl"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-mono font-bold text-emerald-300">
                        Código en Python
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                      scipy.stats
                    </span>
                  </div>

                  {/* Snippet de Python */}
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 space-y-0.5">
                    <span className="text-slate-500 block"># Ajuste y cálculo de densidad continua:</span>
                    <div><span className="text-purple-400">from</span> scipy.stats <span className="text-purple-400">import</span> norm</div>
                    <div><span className="text-purple-400">import</span> numpy <span className="text-purple-400">as</span> np</div>
                    <div className="text-slate-400 pt-0.5">
                      x = np.linspace({fixedMinX}, {fixedMaxX}, 100)
                    </div>
                    <div className="text-emerald-300 font-bold">
                      y = norm.pdf(x, loc={pyMu}, scale={pySigma})
                    </div>
                  </div>

                  {/* Gráfico Generado Reactivamente por el Código Python */}
                  <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 px-1">
                      <span className="font-mono text-purple-300 font-bold">Salida gráfica plt.show()</span>
                      <span>μ = {pyMu}ms · σ = {pySigma}ms</span>
                    </div>

                    <svg viewBox="0 0 400 120" className="w-full h-24 overflow-visible">
                      <defs>
                        <linearGradient id="pyGaussGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.7" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                        </linearGradient>
                      </defs>
                      <line x1="30" y1="110" x2="370" y2="110" stroke="#334155" strokeWidth="1.5" />
                      <path
                        d={`${svgPath} L 370 110 L 30 110 Z`}
                        fill="url(#pyGaussGrad)"
                        stroke="#10b981"
                        strokeWidth="2.5"
                      />
                      <line
                        x1={muSvgX.toFixed(1)}
                        y1="10"
                        x2={muSvgX.toFixed(1)}
                        y2="110"
                        stroke="#38bdf8"
                        strokeDasharray="2 2"
                        strokeWidth="1.5"
                      />
                      <text x="30" y="118" fill="#64748b" fontSize="8" textAnchor="middle">80ms</text>
                      <text x={muSvgX.toFixed(1)} y="118" fill="#38bdf8" fontSize="8" textAnchor="middle" fontWeight="bold">μ={pyMu}</text>
                      <text x="370" y="118" fill="#64748b" fontSize="8" textAnchor="middle">220ms</text>
                    </svg>

                    {/* Controles de Parámetros Python en Vivo */}
                    <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-800/80 text-[10px]">
                      <div>
                        <div className="flex justify-between font-mono text-slate-400 mb-0.5">
                          <span>loc (μ):</span>
                          <span className="text-blue-400 font-bold">{pyMu}</span>
                        </div>
                        <input
                          type="range"
                          min="100"
                          max="200"
                          step="5"
                          value={pyMu}
                          onChange={(e) => setPyMu(Number(e.target.value))}
                          className="w-full accent-blue-500 cursor-pointer h-1"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between font-mono text-slate-400 mb-0.5">
                          <span>scale (σ):</span>
                          <span className="text-amber-400 font-bold">{pySigma}</span>
                        </div>
                        <input
                          type="range"
                          min="8"
                          max="40"
                          step="2"
                          value={pySigma}
                          onChange={(e) => setPySigma(Number(e.target.value))}
                          className="w-full accent-amber-500 cursor-pointer h-1"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </RevealStep>
      </div>

      {/* Modal / Modo Expandido Pantalla Completa */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              className="bg-slate-900 border border-purple-500/40 rounded-3xl p-6 sm:p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative space-y-6 ring-1 ring-purple-500/30"
            >
              {/* Header Modal */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      Fórmula de Gauss vs Implementación Python
                    </h3>
                    <p className="text-xs text-slate-400">
                      Modo enfoque ampliado para análisis de minería de datos y docencia
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFlipped(!isFlipped)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-bold transition-all cursor-pointer"
                  >
                    <RotateCw className="w-4 h-4" />
                    <span>{isFlipped ? 'Mostrar Ecuación' : 'Mostrar Python'}</span>
                  </button>

                  <button
                    onClick={() => setIsExpanded(false)}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                    title="Cerrar modal (Esc)"
                  >
                    <Minimize2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Contenido en el Modal: La misma Card Volteable pero ampliada */}
              <div className="relative min-h-[440px]">
                <AnimatePresence initial={false} mode="wait">
                  {!isFlipped ? (
                    // CARA FRONTAL EN MODAL: Ecuación Matemática con Sustitución Numérica en Vivo
                    <motion.div
                      key="modal-front"
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: -90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 space-y-5"
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono text-purple-300 font-bold uppercase tracking-wider">
                          Función de Densidad: Teoría y Sustitución de Valores
                        </span>
                        <span className="px-2.5 py-0.5 rounded bg-slate-900 text-slate-400 font-mono">
                          X ~ N(μ={pyMu}, σ={pySigma})
                        </span>
                      </div>

                      {/* 1. Fórmula General */}
                      <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-center">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">
                          Ecuación Simbólica General:
                        </span>
                        <GaussFormulaSVG />
                      </div>

                      {/* 2. Sustitución de Datos Reales en Vivo */}
                      <div className="p-4 bg-slate-900/90 rounded-2xl border border-purple-500/30 space-y-3">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <Sliders className="w-3.5 h-3.5 text-purple-400" />
                            Sustitución en Vivo: ¿Cuánto vale f(x) en x = {evalX} ms?
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            Cálculo sin librerías
                          </span>
                        </div>

                        {/* Componente que sustituye μ, σ y x en la ecuación y da el resultado */}
                        <GaussEvaluatedFormulaSVG x={evalX} mu={pyMu} sigma={pySigma} />

                        {/* Slider para mover el punto X a evaluar */}
                        <div className="pt-2 border-t border-slate-800 text-xs">
                          <div className="flex justify-between font-mono text-slate-300 mb-1">
                            <span>Punto de consulta x:</span>
                            <span className="text-purple-300 font-bold">{evalX} ms</span>
                          </div>
                          <input
                            type="range"
                            min="100"
                            max="200"
                            step="2"
                            value={evalX}
                            onChange={(e) => setEvalX(Number(e.target.value))}
                            className="w-full accent-purple-500 cursor-pointer h-1.5"
                          />
                        </div>
                      </div>

                      {/* Botón de volteo a Python */}
                      <button
                        onClick={() => setIsFlipped(true)}
                        className="w-full py-3 rounded-xl bg-purple-950/40 hover:bg-purple-950/70 border border-purple-800/50 flex items-center justify-center gap-2 text-purple-200 text-xs font-mono font-bold cursor-pointer transition-colors"
                      >
                        <RotateCw className="w-4 h-4 text-purple-400" />
                        <span>Ver cómo Python nos ahorra todo este cálculo →</span>
                      </button>
                    </motion.div>
                  ) : (
                    // CARA TRASERA EN MODAL: Código en Python & Salida Interactiva
                    <motion.div
                      key="modal-back"
                      initial={{ rotateY: -90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      exit={{ rotateY: 90, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 rounded-2xl bg-slate-950 border border-purple-800/40 space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-mono font-bold text-emerald-300">
                            Código en Python: scipy.stats & matplotlib
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                          Ahorra el cálculo manual
                        </span>
                      </div>

                      {/* Código Python Real */}
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-slate-200 space-y-1">
                        <span className="text-slate-500 block"># Script en Python (scipy 1.14+ / numpy 2.0+):</span>
                        <div><span className="text-purple-400">import</span> numpy <span className="text-purple-400">as</span> np</div>
                        <div><span className="text-purple-400">from</span> scipy.stats <span className="text-purple-400">import</span> norm</div>
                        <div><span className="text-purple-400">import</span> matplotlib.pyplot <span className="text-purple-400">as</span> plt</div>
                        <div className="text-slate-400 pt-1">
                          x = np.linspace({fixedMinX}, {fixedMaxX}, 200)
                        </div>
                        <div className="text-emerald-300 font-bold">
                          y = norm.pdf(x, loc={pyMu}, scale={pySigma})
                        </div>
                        <div className="text-slate-400">plt.plot(x, y, color=<span className="text-amber-300">'#10b981'</span>, lw=2.5)</div>
                        <div className="text-slate-400">plt.axvline({pyMu}, color=<span className="text-blue-300">'#38bdf8'</span>, ls=<span className="text-amber-300">'--'</span>)</div>
                        <div className="text-slate-400">plt.show()</div>
                      </div>

                      {/* Salida Gráfica del Plot */}
                      <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 space-y-3">
                        <div className="flex justify-between items-center text-xs text-slate-400">
                          <span className="font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Canvas del Gráfico Generado (plt.show)
                          </span>
                          <span className="font-mono text-slate-400">Parámetros actuales: μ={pyMu}ms, σ={pySigma}ms</span>
                        </div>

                        <svg viewBox="0 0 400 130" className="w-full h-32 overflow-visible">
                          <defs>
                            <linearGradient id="modalPyGaussGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="#10b981" stopOpacity="0.75" />
                              <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                            </linearGradient>
                          </defs>
                          <line x1="30" y1="110" x2="370" y2="110" stroke="#334155" strokeWidth="2" />
                          <path
                            d={`${svgPath} L 370 110 L 30 110 Z`}
                            fill="url(#modalPyGaussGrad)"
                            stroke="#10b981"
                            strokeWidth="2.5"
                          />
                          <line
                            x1={muSvgX.toFixed(1)}
                            y1="10"
                            x2={muSvgX.toFixed(1)}
                            y2="110"
                            stroke="#38bdf8"
                            strokeDasharray="3 3"
                            strokeWidth="2"
                          />
                          <text x="30" y="122" fill="#64748b" fontSize="9" textAnchor="middle">80ms</text>
                          <text x={muSvgX.toFixed(1)} y="122" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">μ = {pyMu}ms</text>
                          <text x="370" y="122" fill="#64748b" fontSize="9" textAnchor="middle">220ms</text>
                        </svg>

                        {/* Controles de Sliders Python */}
                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800 text-xs">
                          <div>
                            <div className="flex justify-between font-mono text-slate-300 mb-1">
                              <span>Media loc (μ):</span>
                              <span className="text-blue-400 font-bold">{pyMu} ms</span>
                            </div>
                            <input
                              type="range"
                              min="100"
                              max="200"
                              step="5"
                              value={pyMu}
                              onChange={(e) => setPyMu(Number(e.target.value))}
                              className="w-full accent-blue-500 cursor-pointer h-1.5"
                            />
                          </div>
                          <div>
                            <div className="flex justify-between font-mono text-slate-300 mb-1">
                              <span>Desvío scale (σ):</span>
                              <span className="text-amber-400 font-bold">{pySigma} ms</span>
                            </div>
                            <input
                              type="range"
                              min="8"
                              max="40"
                              step="2"
                              value={pySigma}
                              onChange={(e) => setPySigma(Number(e.target.value))}
                              className="w-full accent-amber-500 cursor-pointer h-1.5"
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => setIsFlipped(false)}
                        className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 flex items-center justify-center gap-2 text-slate-300 text-xs font-mono cursor-pointer transition-colors"
                      >
                        <RotateCw className="w-4 h-4 text-purple-400" />
                        <span>Volver a la Ecuación Matemática</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Botón inferior de cerrar */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-colors cursor-pointer"
                >
                  Volver a Diapositiva
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// =========================================================================
// SLIDE 2.1: CÓMO LEER LA CAMPANA: LAS 3 SIGMAS Y VARIACIÓN DE FORMA
// =========================================================================
export function SlideNormalCampanaLectura() {
  const [selectedSigma, setSelectedSigma] = useState(1);
  const [viewTab, setViewTab] = useState('sigmas'); // 'sigmas' | 'skewness'
  const [selectedSkew, setSelectedSkew] = useState('symmetric'); // 'left' | 'symmetric' | 'right'

  return (
    <div className="max-w-6xl mx-auto px-4 py-2 space-y-4">
      {/* Header */}
      <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-purple-400 font-bold">Bloque 2 · Slide 2.1</span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-bold">
              Expositor: Yandris
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Cómo Interpretar la Campana de Gauss
          </h2>
        </div>

        {/* Selector de Modo: Regla Empírica vs Tipos de Deformación / Asimetría */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setViewTab('sigmas')}
              className={`px-3 py-1 rounded-lg font-bold transition-all ${
                viewTab === 'sigmas'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Regla 68-95-99.7
            </button>
            <button
              onClick={() => setViewTab('skewness')}
              className={`px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                viewTab === 'skewness'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Tipos de Campana</span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-purple-400/20 text-purple-200">Asimetría</span>
            </button>
          </div>
        </div>
      </div>

      {viewTab === 'sigmas' ? (
        /* VISTA 1: REGLA DE LAS 3 SIGMAS Y SEMÁFORO DEVOPS */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Curva Gaussiana Vectorial SVG */}
          <div className="lg:col-span-2 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Distribución Gaussiana Canónica (Simétrica)
              </span>
              <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                {[1, 2, 3].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSigma(s)}
                    className={`px-2.5 py-0.5 rounded text-xs font-bold transition-all ${
                      selectedSigma === s
                        ? 'bg-purple-600 text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ±{s}σ
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800">
              <svg viewBox="0 0 520 180" className="w-full h-40 overflow-visible">
                <defs>
                  <linearGradient id="gaussGradRead" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Curva completa de Gauss */}
                <path
                  d="M 20 160 C 130 160, 190 140, 220 70 C 240 25, 260 10, 260 10 C 260 10, 280 25, 300 70 C 330 140, 390 160, 500 160"
                  fill="none"
                  stroke="#475569"
                  strokeWidth="2.5"
                />

                {/* Sombra Dinámica */}
                {selectedSigma === 1 && (
                  <path
                    d="M 210 160 L 210 85 C 230 30, 260 10, 260 10 C 260 10, 290 30, 310 85 L 310 160 Z"
                    fill="url(#gaussGradRead)"
                    stroke="#c084fc"
                    strokeWidth="2"
                  />
                )}
                {selectedSigma === 2 && (
                  <path
                    d="M 150 160 L 150 130 C 190 95, 230 30, 260 10 C 290 30, 330 95, 370 130 L 370 160 Z"
                    fill="url(#gaussGradRead)"
                    stroke="#c084fc"
                    strokeWidth="2"
                  />
                )}
                {selectedSigma === 3 && (
                  <path
                    d="M 70 160 L 70 155 C 130 145, 210 50, 260 10 C 310 50, 390 145, 450 155 L 450 160 Z"
                    fill="url(#gaussGradRead)"
                    stroke="#c084fc"
                    strokeWidth="2"
                  />
                )}

                {/* Eje X y Línea Media */}
                <line x1="20" y1="160" x2="500" y2="160" stroke="#334155" strokeWidth="2" />
                <line x1="260" y1="10" x2="260" y2="160" stroke="#38bdf8" strokeDasharray="3 3" strokeWidth="2" />

                <text x="260" y="174" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">μ (Centro Nominal)</text>
                <text x="210" y="174" fill="#94a3b8" fontSize="10" textAnchor="middle">-1σ</text>
                <text x="310" y="174" fill="#94a3b8" fontSize="10" textAnchor="middle">+1σ</text>
                <text x="150" y="174" fill="#64748b" fontSize="10" textAnchor="middle">-2σ</text>
                <text x="370" y="174" fill="#64748b" fontSize="10" textAnchor="middle">+2σ</text>
                <text x="70" y="174" fill="#475569" fontSize="10" textAnchor="middle">-3σ</text>
                <text x="450" y="174" fill="#475569" fontSize="10" textAnchor="middle">+3σ</text>
              </svg>
            </div>

            {/* Tres Tarjetas de Cobertura */}
            <div className="grid grid-cols-3 gap-2">
              <div className={`p-2.5 rounded-xl border text-center transition-all ${selectedSigma === 1 ? 'bg-purple-950/40 border-purple-500' : 'bg-slate-950 border-slate-800'}`}>
                <span className="text-[10px] text-slate-400 block font-bold">FRANJA ±1σ</span>
                <span className="text-base font-black text-purple-300 font-mono">68.27%</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Operación Normal</span>
              </div>
              <div className={`p-2.5 rounded-xl border text-center transition-all ${selectedSigma === 2 ? 'bg-purple-950/40 border-purple-500' : 'bg-slate-950 border-slate-800'}`}>
                <span className="text-[10px] text-slate-400 block font-bold">FRANJA ±2σ</span>
                <span className="text-base font-black text-purple-300 font-mono">95.45%</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Límite de Alerta</span>
              </div>
              <div className={`p-2.5 rounded-xl border text-center transition-all ${selectedSigma === 3 ? 'bg-purple-950/40 border-purple-500' : 'bg-slate-950 border-slate-800'}`}>
                <span className="text-[10px] text-slate-400 block font-bold">FRANJA ±3σ</span>
                <span className="text-base font-black text-purple-300 font-mono">99.73%</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">Certeza Total</span>
              </div>
            </div>
          </div>

          {/* Lado Derecho: Interpretación Operativa en Producción (Semáforo DevOps) */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block">
              Impacto en Producción & DevOps
            </span>

            <div className={`p-3 rounded-xl border transition-all ${selectedSigma === 1 ? 'bg-emerald-950/30 border-emerald-500/60 ring-1 ring-emerald-500/20' : 'bg-slate-950 border-slate-800 opacity-60'}`}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Zona Verde · ±1σ (68.3%)
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40">SLA OK</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Tráfico y latencias dentro de lo habitual. El sistema opera a régimen nominal sin degradación.
              </p>
            </div>

            <div className={`p-3 rounded-xl border transition-all ${selectedSigma === 2 ? 'bg-amber-950/30 border-amber-500/60 ring-1 ring-amber-500/20' : 'bg-slate-950 border-slate-800 opacity-60'}`}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Zona Amarilla · ±2σ (95.5%)
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/40">Warning</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Solo un 4.5% de peticiones cae acá. Alerta en Datadog/Grafana: posible saturación de pool de base de datos.
              </p>
            </div>

            <div className={`p-3 rounded-xl border transition-all ${selectedSigma === 3 ? 'bg-rose-950/30 border-rose-500/60 ring-1 ring-rose-500/20' : 'bg-slate-950 border-slate-800 opacity-60'}`}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  Zona Roja · Más allá de ±3σ
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/40">Outlier / Incidente</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Ocurre en menos de 3 de cada 1,000 requests (0.27%). Anomalía estadística crítica: Circuit Breaker o DDoS.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* VISTA 2: ASIMETRÍA (SKEWNESS) Y TIPOS DE CAMPANAS DEFORMADAS */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Canvas SVG Interactivo de Asimetría */}
          <div className="lg:col-span-2 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Visualización de Asimetría (Skewness)
              </span>
              <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  onClick={() => setSelectedSkew('left')}
                  className={`px-2.5 py-0.5 rounded text-xs font-bold transition-all ${
                    selectedSkew === 'left' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sesgo Izquierdo (-)
                </button>
                <button
                  onClick={() => setSelectedSkew('symmetric')}
                  className={`px-2.5 py-0.5 rounded text-xs font-bold transition-all ${
                    selectedSkew === 'symmetric' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Simétrica (0)
                </button>
                <button
                  onClick={() => setSelectedSkew('right')}
                  className={`px-2.5 py-0.5 rounded text-xs font-bold transition-all ${
                    selectedSkew === 'right' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sesgo Derecho (+)
                </button>
              </div>
            </div>

            <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800">
              <svg viewBox="0 0 520 180" className="w-full h-44 overflow-visible">
                <defs>
                  <linearGradient id="skewGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={selectedSkew === 'symmetric' ? '#a855f7' : selectedSkew === 'right' ? '#f59e0b' : '#38bdf8'} stopOpacity="0.8" />
                    <stop offset="100%" stopColor={selectedSkew === 'symmetric' ? '#a855f7' : selectedSkew === 'right' ? '#f59e0b' : '#38bdf8'} stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* Eje X */}
                <line x1="20" y1="150" x2="500" y2="150" stroke="#334155" strokeWidth="2" />

                {/* Curva según Asimetría */}
                {selectedSkew === 'symmetric' && (
                  <>
                    <path
                      d="M 20 150 C 130 150, 190 130, 220 60 C 240 20, 260 10, 260 10 C 260 10, 280 20, 300 60 C 330 130, 390 150, 500 150 Z"
                      fill="url(#skewGrad)"
                      stroke="#c084fc"
                      strokeWidth="2.5"
                    />
                    {/* Media = Mediana = Moda */}
                    <line x1="260" y1="10" x2="260" y2="150" stroke="#38bdf8" strokeDasharray="3 3" strokeWidth="2" />
                    <text x="260" y="165" fill="#38bdf8" fontSize="11" textAnchor="middle" fontWeight="bold">Media = Mediana = Moda</text>
                  </>
                )}

                {selectedSkew === 'right' && (
                  <>
                    {/* Concentrada a la izquierda, cola larga a la derecha */}
                    <path
                      d="M 20 150 C 60 150, 100 120, 130 40 C 145 10, 160 10, 170 15 C 210 35, 280 120, 380 145 C 440 148, 480 150, 500 150 Z"
                      fill="url(#skewGrad)"
                      stroke="#f59e0b"
                      strokeWidth="2.5"
                    />
                    {/* Moda (pico) */}
                    <line x1="155" y1="10" x2="155" y2="150" stroke="#ec4899" strokeDasharray="3 3" strokeWidth="1.5" />
                    <text x="155" y="164" fill="#ec4899" fontSize="10" textAnchor="middle" fontWeight="bold">Moda</text>
                    {/* Mediana */}
                    <line x1="195" y1="28" x2="195" y2="150" stroke="#a855f7" strokeDasharray="3 3" strokeWidth="1.5" />
                    <text x="195" y="164" fill="#a855f7" fontSize="10" textAnchor="middle" fontWeight="bold">Mediana</text>
                    {/* Media arrastrada por la cola */}
                    <line x1="250" y1="75" x2="250" y2="150" stroke="#38bdf8" strokeDasharray="3 3" strokeWidth="1.5" />
                    <text x="250" y="164" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">Media (μ)</text>
                    
                    <text x="410" y="130" fill="#f59e0b" fontSize="11" fontWeight="bold">Cola Larga (Outliers) →</text>
                  </>
                )}

                {selectedSkew === 'left' && (
                  <>
                    {/* Cola larga a la izquierda, concentrada a la derecha */}
                    <path
                      d="M 20 150 C 60 150, 140 148, 200 140 C 300 120, 335 40, 360 10 C 375 10, 390 40, 420 120 C 440 145, 480 150, 500 150 Z"
                      fill="url(#skewGrad)"
                      stroke="#38bdf8"
                      strokeWidth="2.5"
                    />
                    <text x="90" y="130" fill="#38bdf8" fontSize="11" fontWeight="bold">← Cola Larga Izquierda</text>
                    {/* Media arrastrada hacia la izquierda */}
                    <line x1="280" y1="85" x2="280" y2="150" stroke="#38bdf8" strokeDasharray="3 3" strokeWidth="1.5" />
                    <text x="280" y="164" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">Media</text>
                    {/* Mediana */}
                    <line x1="330" y1="35" x2="330" y2="150" stroke="#a855f7" strokeDasharray="3 3" strokeWidth="1.5" />
                    <text x="330" y="164" fill="#a855f7" fontSize="10" textAnchor="middle" fontWeight="bold">Mediana</text>
                    {/* Moda en el pico derecho */}
                    <line x1="375" y1="10" x2="375" y2="150" stroke="#ec4899" strokeDasharray="3 3" strokeWidth="1.5" />
                    <text x="375" y="164" fill="#ec4899" fontSize="10" textAnchor="middle" fontWeight="bold">Moda</text>
                  </>
                )}
              </svg>
            </div>

            {/* Snippet de Python para medir Skewness */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                Cómo detectarlo en Python:
              </span>
              <code className="text-emerald-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
                from scipy.stats import skew; print(skew(dataset))
              </code>
            </div>
          </div>

          {/* Lado Derecho: Tarjeta Explicativa del Tipo Seleccionado */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block">
              Diagnóstico del Dataset
            </span>

            {selectedSkew === 'right' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 space-y-1.5">
                  <span className="font-bold text-amber-300 text-sm block">Sesgo Positivo / A la Derecha</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    La cola se alarga hacia los valores altos ($+\infty$). Ocurre cuando la <strong>Media &gt; Mediana &gt; Moda</strong> porque unos pocos valores extremos inflan el promedio.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 uppercase text-[10px] font-bold block">Ejemplo en Software:</span>
                  <span className="text-white font-bold block">Latencia de Peticiones Web</span>
                  <p className="text-slate-400 text-[11px]">
                    El 95% de usuarios recibe respuesta en 40ms (Moda), pero timeouts de 3000ms arrastran la Media hacia la derecha.
                  </p>
                </div>
              </div>
            )}

            {selectedSkew === 'symmetric' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-purple-950/30 border border-purple-500/40 space-y-1.5">
                  <span className="font-bold text-purple-300 text-sm block">Distribución Simétrica (Skew = 0)</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    El centro coincide a la perfección: <strong>Media = Mediana = Moda</strong>. La probabilidad de caer a la izquierda es idéntica a la derecha.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 uppercase text-[10px] font-bold block">Ejemplo en Software:</span>
                  <span className="text-white font-bold block">Frecuencia de CPU o Ruido de Sensor</span>
                  <p className="text-slate-400 text-[11px]">
                    Variaciones térmicas y fluctuaciones simétricas de reloj en servidores en reposo.
                  </p>
                </div>
              </div>
            )}

            {selectedSkew === 'left' && (
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/40 space-y-1.5">
                  <span className="font-bold text-blue-300 text-sm block">Sesgo Negativo / A la Izquierda</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    La cola se alarga hacia los valores bajos ($-\infty$). Acá la <strong>Media &lt; Mediana &lt; Moda</strong> porque fallas tempranas deprimen el promedio.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <span className="text-slate-400 uppercase text-[10px] font-bold block">Ejemplo en Software:</span>
                  <span className="text-white font-bold block">Porcentaje de Disponibilidad (Uptime SLA)</span>
                  <p className="text-slate-400 text-[11px]">
                    Casi todos los microservicios operan al 99.9% (Moda), pero una caída puntual al 70% estira la cola hacia la izquierda.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// =========================================================================
// SLIDE 2.2: CASO PRÁCTICO REAL: POST /users (Z-SCORE & BADGES DE ACCIÓN)
// =========================================================================
export function SlideNormalSoftwareCaso() {
  const [demoMetric, setDemoMetric] = useState(190); // latencia observada en ms

  // Parámetros del Endpoint: POST /api/v1/users (Creación de Cuenta & Hashing)
  const mu = 150; // Media histórica baseline
  const sigma = 20; // Jitter / Desvío estándar
  const zScore = ((demoMetric - mu) / sigma).toFixed(2);
  const isAnomalous = Math.abs(zScore) >= 3.0;
  const isWarning = Math.abs(zScore) >= 2.0 && !isAnomalous;

  return (
    <div className="max-w-6xl mx-auto px-4 py-2 space-y-4">
      {/* Header */}
      <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-purple-400 font-bold">Bloque 2 · Slide 2.2</span>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-bold">
              Expositor: Yandris
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1 flex items-center gap-2">
            Caso Práctico: <code className="text-purple-300 font-mono text-xl sm:text-2xl bg-purple-950/60 px-2 py-0.5 rounded border border-purple-800/40">POST /api/v1/users</code>
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-right">
          <span className="text-[10px] text-slate-400 block font-mono">Baseline Histórico</span>
          <span className="text-xs font-mono text-purple-300 font-bold">μ = 150ms · σ = 20ms</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Columna Izquierda: Arquitectura + Fórmula Z */}
        <div className="space-y-3">
          {/* Micro-operaciones */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2 text-xs">
            <span className="font-bold text-slate-200 block uppercase tracking-wider text-[10px]">
              Micro-Operaciones del Endpoint
            </span>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 text-[11px]">
                <span className="text-slate-300">1. Cifrado Argon2 / Bcrypt</span>
                <span className="font-mono text-blue-400 text-[10px]">CPU</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 text-[11px]">
                <span className="text-slate-300">2. Inserción SQL PostgreSQL</span>
                <span className="font-mono text-emerald-400 text-[10px]">I/O Disco</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-slate-950 border border-slate-800 text-[11px]">
                <span className="text-slate-300">3. Evento Asíncrono Kafka</span>
                <span className="font-mono text-purple-400 text-[10px]">Red</span>
              </div>
            </div>
          </div>

          {/* Fórmula Z-Score SVG */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
              Z-Score en Tiempo Real
            </span>
            <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
              <ZScoreFormulaSVG x={demoMetric} mu={150} sigma={20} z={zScore} />
            </div>
          </div>
        </div>

        {/* Columna Central & Derecha: Simulador y Badges Ejecutivos de Diagnóstico */}
        <div className="lg:col-span-2 space-y-3">
          {/* Simulador Interactivo */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-400" />
                Latencia Observada al Registrar Usuario
              </span>
              <span className="font-mono font-bold text-purple-300 text-sm bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                {demoMetric} ms
              </span>
            </div>

            <input
              type="range"
              min="80"
              max="230"
              step="5"
              value={demoMetric}
              onChange={(e) => setDemoMetric(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>80ms (Rápido)</span>
              <span>μ = 150ms (Centro)</span>
              <span>190ms (SLA Z=+2.0)</span>
              <span>230ms (Crítico Z=+4.0)</span>
            </div>
          </div>

          {/* Tarjeta de Diagnóstico Limpia con 3 Badges de Acción */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Diagnóstico del API Gateway en Producción
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider ${
                isAnomalous
                  ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                  : isWarning
                  ? 'bg-amber-500 text-slate-950 font-black'
                  : 'bg-emerald-500 text-slate-950 font-black'
              }`}>
                {isAnomalous ? 'ANOMALÍA CRÍTICA' : isWarning ? 'ALERTA PREVENTIVA' : 'OPERACIÓN NOMINAL'}
              </span>
            </div>

            {/* 3 Datos Ejecutivos en Columnas */}
            <div className="grid grid-cols-3 gap-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Probabilidad</span>
                <span className="text-sm font-bold text-white font-mono">
                  {isAnomalous ? '< 0.27%' : isWarning ? '~ 4.5%' : '95.4%'}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {isAnomalous ? 'Extremadamente rara' : isWarning ? 'Poco frecuente' : 'Comportamiento habitual'}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Cumplimiento SLA</span>
                <span className={`text-sm font-bold font-mono ${isAnomalous ? 'text-rose-400' : isWarning ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {demoMetric <= 190 ? 'CUMPLE (≤ 190ms)' : 'INCUMPLE (> 190ms)'}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  Contrato SLA del 97.7%
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block uppercase font-bold">Acción Automatizada</span>
                <span className={`text-xs font-bold block ${isAnomalous ? 'text-rose-300' : isWarning ? 'text-amber-300' : 'text-emerald-300'}`}>
                  {isAnomalous ? 'Rate Limit 429' : isWarning ? 'Log WARN APM' : 'Allow 200 OK'}
                </span>
                <span className="text-[10px] text-slate-400 block mt-0.5">
                  {isAnomalous ? 'Mitigación DoS' : isWarning ? 'Auditar DB' : 'Tráfico regular'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

