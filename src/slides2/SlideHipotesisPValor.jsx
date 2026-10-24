import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, CheckCircle2, XCircle, AlertOctagon, HelpCircle, AlertTriangle } from 'lucide-react';
import { DecisionTreeDiagramSVG } from '../components/DecisionTreeDiagramSVG';

export function SlideHipotesisPValor() {
  const [alpha, setAlpha] = useState(0.05);
  const [pValue, setPValue] = useState(0.024);

  const isRejectH0 = pValue <= alpha;

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-5">
      <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-rose-400 font-bold">Criterio Estadístico</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Nivel de Significancia (α) y P-Valor (p-value)
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Criterio formal para validar resultados, cambios de algoritmo y experimentos en software.
          </p>
        </div>

        {/* Selector de α */}
        <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <span className="text-xs text-slate-300 font-semibold px-1">Umbral α:</span>
          {[0.05, 0.01, 0.001].map((a) => (
            <button
              key={a}
              onClick={() => setAlpha(a)}
              className={`px-2 py-1 rounded text-xs font-bold transition-all ${
                alpha === a
                  ? 'bg-rose-500 text-white font-black shadow-sm'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {a === 0.05 ? '0.05 (Negocio)' : a === 0.01 ? '0.01 (Finanzas)' : '0.001 (Crítico)'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Simulador Interactivo de la Regla de Decisión */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              La Regla de Decisión Universal
            </span>
            <span className="text-xs font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
              P(Rechazar H₀ | H₀ es cierta) ≤ α
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-300">
              <span>P-Valor observado (p-value calculado):</span>
              <span className="font-mono font-bold text-cyan-400 text-sm">{pValue.toFixed(3)}</span>
            </div>
            <input
              type="range"
              min="0.001"
              max="0.12"
              step="0.001"
              value={pValue}
              onChange={(e) => setPValue(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>0.001 (Fuerte evidencia anti-H₀)</span>
              <span>Umbral fijado: α = {alpha}</span>
              <span>0.120 (Compatible con el azar)</span>
            </div>
          </div>

          {/* Resultado de la Prueba */}
          <div
            className={`p-4 rounded-xl border transition-all duration-300 ${
              isRejectH0
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-amber-950/30 border-amber-500/40 text-amber-200'
            }`}
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              {isRejectH0 ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-amber-400 shrink-0" />
              )}
              <div className="text-sm font-bold">
                {isRejectH0
                  ? `Si p-valor (${pValue.toFixed(3)}) ≤ α (${alpha}) → Rechazar H₀`
                  : `Si p-valor (${pValue.toFixed(3)}) > α (${alpha}) → No rechazar H₀`}
              </div>
            </div>
            <p className="text-xs leading-relaxed opacity-90">
              {isRejectH0
                ? `Resultado estadísticamente significativo. Se descarta la hipótesis nula en favor de H₁. La probabilidad de observar estos datos si el cambio fuera inocuo es inferior a ${(alpha * 100).toFixed(1)}%.`
                : `Resultado NO estadísticamente significativo. No existe evidencia empírica suficiente para descartar H₀. La diferencia observada es compatible con el azar o la fluctuación natural del sistema.`}
            </p>
          </div>

          {/* Qué NO es el P-Valor (Errores Comunes) */}
          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 space-y-1 text-xs">
            <div className="text-amber-400 font-bold flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5" />
              Lo que el P-Valor NUNCA significa:
            </div>
            <ul className="text-slate-300 space-y-0.5 text-[11px] list-disc list-inside">
              <li><strong>NO</strong> es la probabilidad de que la hipótesis nula sea verdadera.</li>
              <li><strong>NO</strong> es la probabilidad de que los datos hayan sido causados por el azar.</li>
              <li><strong>NO</strong> mide la magnitud ni el impacto comercial del efecto (con muestras gigantescas, efectos irrelevantes de 0.001% pueden dar p &lt; 0.05).</li>
            </ul>
          </div>
        </div>

        {/* Tipos de Errores: α y β */}
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Matriz de Errores de Decisión
            </div>

            <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-900/40 text-xs">
              <span className="font-bold text-rose-300 block mb-0.5">Error Tipo I (α · Falso Positivo)</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                Rechazar H₀ siendo esta verdadera. Afirmar que el nuevo diseño aumentó las ventas cuando fue solo azar.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-blue-950/30 border border-blue-900/40 text-xs">
              <span className="font-bold text-blue-300 block mb-0.5">Error Tipo II (β · Falso Negativo)</span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                No rechazar H₀ siendo esta falsa. Descartar una optimización que sí funcionaba por falta de tamaño muestral.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400">
            <strong className="text-slate-200">Umbrales por Industria:</strong>
            <div className="mt-1 space-y-0.5">
              <div>• <span className="text-white font-mono">α = 0.05</span>: Web, Marketing, Producto SaaS.</div>
              <div>• <span className="text-white font-mono">α = 0.01</span>: Riesgo de Crédito y Finanzas.</div>
              <div>• <span className="text-white font-mono">α = 0.001</span>: Ensayos Farmacéuticos y Salud.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function SlideComparacionMedias() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-5">
      <div className="border-b border-slate-800 pb-3">
        <span className="text-xs uppercase tracking-wider text-purple-400 font-bold">Pruebas de Significancia</span>
        <h2 className="text-3xl font-black text-white tracking-tight">Comparación de Medias & Pruebas Estadísticas</h2>
        <p className="text-slate-400 text-sm mt-0.5">
          Cómo seleccionar la prueba inferencial correcta según el número de variables y grupos a comparar.
        </p>
      </div>

      {/* Árbol de Decisión Interactivo SVG */}
      <DecisionTreeDiagramSVG />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-3">
              2 Grupos Independientes
            </div>
            <h3 className="text-lg font-bold text-white mb-2">T-Test de Student</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Compara el promedio de una métrica continua entre dos variantes (ej: tiempo de respuesta Grupo A vs Grupo B).
            </p>
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
              t = (x̄₁ - x̄₂) / SE_diff
            </div>
          </div>
          <div className="text-[11px] text-slate-400 mt-4 border-t border-slate-800 pt-2">
            Requisito: Normalidad o n ≥ 30 por TLC.
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-3">
              3 o Más Grupos
            </div>
            <h3 className="text-lg font-bold text-white mb-2">ANOVA (F-Test)</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Análisis de Varianza. Evita la inflación del Error Tipo I que causaría hacer múltiples t-tests simultáneos.
            </p>
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
              F = Var(entre grupos) / Var(intra grupos)
            </div>
          </div>
          <div className="text-[11px] text-slate-400 mt-4 border-t border-slate-800 pt-2">
            Caso: Comparar precios en 4 planes SaaS.
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
              Datos Categóricos
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Chi-Cuadrado (χ²)</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Evalúa si dos variables cualitativas son independientes o si una proporción observada diverge de lo esperado.
            </p>
            <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 font-mono text-xs text-slate-300">
              χ² = Σ (Observado - Esperado)² / Esperado
            </div>
          </div>
          <div className="text-[11px] text-slate-400 mt-4 border-t border-slate-800 pt-2">
            Caso: Tasa de clics o churn sí/no por región.
          </div>
        </div>
      </div>
    </div>
  );
}
