import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, RefreshCw, CheckCircle, Info, Calculator, ShoppingCart } from 'lucide-react';

export function SlideNormalGauss() {
  const [selectedSigma, setSelectedSigma] = useState(1);

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-6">
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-indigo-400 font-bold">Distribución Continua</span>
          <h2 className="text-3xl font-black text-white tracking-tight">Distribución Normal & Campana de Gauss</h2>
          <p className="text-slate-400 text-sm mt-1">El modelo probabilístico fundamental con simetría perfecta alrededor de μ.</p>
        </div>

        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSigma(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedSigma === s
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 ring-2 ring-indigo-400'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              ±{s}σ ({s === 1 ? '68.2%' : s === 2 ? '95.4%' : '99.7%'})
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* SVG Interactivo de la Campana */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center">
          <svg viewBox="0 0 500 220" className="w-full h-auto overflow-visible">
            <defs>
              <linearGradient id="gaussGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Curva completa de Gauss */}
            <path
              d="M 20 200 C 120 200, 180 180, 210 100 C 230 40, 250 20, 250 20 C 250 20, 270 40, 290 100 C 320 180, 380 200, 480 200"
              fill="none"
              stroke="#475569"
              strokeWidth="2.5"
            />

            {/* Área sombreada según Sigma seleccionado */}
            {selectedSigma === 1 && (
              <path
                d="M 200 200 L 200 120 C 220 50, 250 20, 250 20 C 250 20, 280 50, 300 120 L 300 200 Z"
                fill="url(#gaussGrad)"
                stroke="#818cf8"
                strokeWidth="2"
              />
            )}
            {selectedSigma === 2 && (
              <path
                d="M 140 200 L 140 170 C 180 130, 220 50, 250 20 C 280 50, 320 130, 360 170 L 360 200 Z"
                fill="url(#gaussGrad)"
                stroke="#818cf8"
                strokeWidth="2"
              />
            )}
            {selectedSigma === 3 && (
              <path
                d="M 60 200 L 60 195 C 120 180, 200 80, 250 20 C 300 80, 380 180, 440 195 L 440 200 Z"
                fill="url(#gaussGrad)"
                stroke="#818cf8"
                strokeWidth="2"
              />
            )}

            {/* Eje X y Línea Media */}
            <line x1="20" y1="200" x2="480" y2="200" stroke="#334155" strokeWidth="2" />
            <line x1="250" y1="20" x2="250" y2="200" stroke="#38bdf8" strokeDasharray="4 4" strokeWidth="2" />

            {/* Labels */}
            <text x="250" y="215" fill="#38bdf8" fontSize="12" textAnchor="middle" fontWeight="bold">μ (Media)</text>
            <text x="200" y="215" fill="#94a3b8" fontSize="11" textAnchor="middle">-1σ</text>
            <text x="300" y="215" fill="#94a3b8" fontSize="11" textAnchor="middle">+1σ</text>
            <text x="140" y="215" fill="#64748b" fontSize="11" textAnchor="middle">-2σ</text>
            <text x="360" y="215" fill="#64748b" fontSize="11" textAnchor="middle">+2σ</text>
            <text x="60" y="215" fill="#475569" fontSize="11" textAnchor="middle">-3σ</text>
            <text x="440" y="215" fill="#475569" fontSize="11" textAnchor="middle">+3σ</text>
          </svg>

          <div className="mt-4 text-xs text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-indigo-400" />
            Regla Empírica 68.2% (1σ) · 95.4% (2σ) · 99.7% (3σ): Varianza perfectamente modelada.
          </div>
        </div>

        {/* Propiedades */}
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <h4 className="text-sm font-bold text-white mb-1">1. Simetría Inalterable</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              La Media, la Mediana y la Moda coinciden en el valor central exacto (<code className="text-indigo-300">μ</code>). Coeficiente de asimetría = 0.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <h4 className="text-sm font-bold text-white mb-1">2. Puntuación Estándar (Z-Score)</h4>
            <div className="p-2 bg-slate-950 rounded text-center font-mono text-xs text-indigo-300 font-bold border border-slate-800 my-1">
              Z = (X - μ) / σ
            </div>
            <p className="text-[11px] text-slate-400">
              Convierte cualquier medición heterogénea a una distribución normal estándar N(0, 1).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <h4 className="text-sm font-bold text-white mb-1">3. Límites Asintóticos</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              La curva desciende suavemente hacia el eje horizontal pero nunca lo toca (-∞ a +∞).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SlideTLC() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-5">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs uppercase tracking-wider text-teal-400 font-bold">Teorema Fundamental</span>
        <h2 className="text-3xl font-black text-white tracking-tight">Teorema del Límite Central (TLC)</h2>
        <p className="text-slate-400 text-sm mt-0.5">
          Comportamiento normal de las medias muestrales independientemente de la forma poblacional original.
        </p>
      </div>

      {/* 4 Condiciones Básicas Obligatorias */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center mx-auto mb-1 text-[11px]">1</div>
          <div className="font-bold text-white">Selección Aleatoria</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Sin sesgo de conveniencia</div>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center mx-auto mb-1 text-[11px]">2</div>
          <div className="font-bold text-white">Muestras Independientes</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Sin influencia entre sujetos</div>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/90 border border-teal-500/30 text-center">
          <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center mx-auto mb-1 text-[11px]">3</div>
          <div className="font-bold text-teal-300">Tamaño n ≥ 30</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Condición de suficiencia</div>
        </div>
        <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
          <div className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center mx-auto mb-1 text-[11px]">4</div>
          <div className="font-bold text-white">Varianza Finita (σ² &lt; ∞)</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Propiedad de dispersión real</div>
        </div>
      </div>

      {/* Caso Práctico Detallado: E-commerce */}
      <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <ShoppingCart className="w-4 h-4 text-teal-400" />
            Caso Práctico en E-Commerce: Tiempo de Compra en Sitio Web
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20 font-mono">
            Paso a Paso
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Datos Originales */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="text-rose-400 font-bold uppercase tracking-wider text-[10px]">1. Población Original Asimétrica</div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              La mayoría compra rápido, pero pocos tardan horas navegando (sesgo marcado).
            </p>
            <div className="pt-1 font-mono text-[11px] text-slate-300 space-y-0.5">
              <div>• Media (μ): <strong className="text-white">12 min</strong></div>
              <div>• Desvío (σ): <strong className="text-white">4 min</strong></div>
              <div>• Distribución: <strong className="text-rose-400">No Normal</strong></div>
            </div>
          </div>

          {/* Muestreo n=100 */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5">
            <div className="text-amber-400 font-bold uppercase tracking-wider text-[10px]">2. Selección de Muestra (n)</div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Se toma una muestra aleatoria de <strong className="text-white">n = 100 clientes</strong>.
            </p>
            <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-amber-300 font-medium mt-2">
              ✓ Como n = 100 ≥ 30, se cumple la condición del TLC. La media X̄ se distribuirá como una Normal.
            </div>
          </div>

          {/* Nuevos Parámetros */}
          <div className="p-3.5 rounded-xl bg-teal-950/30 border border-teal-500/30 space-y-1.5">
            <div className="text-teal-400 font-bold uppercase tracking-wider text-[10px]">3. Parámetros de la Media (X̄)</div>
            <div className="space-y-2 pt-1 font-mono text-[11px]">
              <div className="p-1.5 rounded bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Media de las Medias:</span>
                <span className="text-teal-300 font-bold">μ_X̄ = μ = 12 minutos</span>
              </div>
              <div className="p-1.5 rounded bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Error Estándar (SE):</span>
                <span className="text-teal-300 font-bold">σ_X̄ = σ / √n = 4 / √100 = 0.4 min</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-300">
          <strong className="text-teal-400">Impacto en la Inferencia:</strong> Aunque el comportamiento individual de cada cliente es errático y no normal, la media de 100 compradores se concentra estrechamente entre <code className="text-white">12 ± 0.4 min</code> con comportamiento gaussiano puro.
        </div>
      </div>
    </div>
  );
}
