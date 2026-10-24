import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Split, ShieldAlert, Cpu, Sparkles, TrendingUp, CheckCircle, Terminal, Layers } from 'lucide-react';

export function SlideABTestingAplicaciones() {
  const [activeTab, setActiveTab] = useState('abtesting');

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-5">
      <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold">Ingeniería de Datos y Software</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Aplicaciones Prácticas: A/B Testing, Modelos & Pipelines
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Automatización de decisiones en producto con librerías estadísticas (SciPy, Statsmodels).
          </p>
        </div>

        <div className="flex gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('abtesting')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'abtesting'
                ? 'bg-cyan-500 text-slate-950 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            A/B Testing
          </button>
          <button
            onClick={() => setActiveTab('modelos')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'modelos'
                ? 'bg-cyan-500 text-slate-950 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Variables (ML)
          </button>
          <button
            onClick={() => setActiveTab('pipelines')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'pipelines'
                ? 'bg-cyan-500 text-slate-950 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Pipelines Auto
          </button>
        </div>
      </div>

      {activeTab === 'abtesting' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3.5">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Split className="w-4 h-4" />
              Pruebas A/B en Producto: Caso Carrito de Compras
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Problema:</strong> Determinar si el incremento en el porcentaje de conversión del <strong>Diseño B</strong> respecto al <strong>Diseño A</strong> se debe a una mejora real en usabilidad (<code className="text-emerald-300">p ≤ 0.05</code>) o si fue una simple fluctuación aleatoria del tráfico.
            </p>

            <div className="space-y-2.5 pt-1">
              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex justify-between items-center text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Diseño A (Control)</span>
                  <span className="font-bold text-white">Carrito Multipasos Clásico</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px]">Tasa de Conversión</span>
                  <span className="font-mono text-cyan-400 font-bold">3.2% (n=12,500)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-cyan-500/30 flex justify-between items-center text-xs">
                <div>
                  <span className="text-cyan-400 block text-[10px]">Diseño B (Variante Propuesta)</span>
                  <span className="font-bold text-white">Checkout Simplificado 1-Click</span>
                </div>
                <div className="text-right">
                  <span className="text-cyan-400 block text-[10px]">Tasa de Conversión</span>
                  <span className="font-mono text-emerald-400 font-bold">3.9% (n=12,500)</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-emerald-950/20 border border-emerald-900/40 rounded-xl text-[11px] text-emerald-300 font-mono flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Diferencia Z-test: p-value = 0.0032 ≤ 0.05 → Rechazar H₀ (Despliegue Aprobado)</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold text-white mb-2">Rigor en Experimentación</h4>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span><strong>Asignación Aleatoria:</strong> Cada usuario tiene idéntica probabilidad de pertenecer a A o B (sin sesgo geográfico o horario).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span><strong>Potencia Muestral:</strong> Tamaño de muestra calculado a priori para no incurrir en Error Tipo II (falso negativo).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                  <span><strong>Significancia vs Impacto:</strong> Un cambio con p &lt; 0.05 debe además representar un valor monetario o de retención que justifique el mantenimiento del código.</span>
                </li>
              </ul>
            </div>
            <div className="text-[11px] text-slate-400 p-2.5 rounded-lg bg-slate-950 border border-slate-800">
              Stack de producción: GrowthBook, Statsig, LaunchDarkly, Optimizely.
            </div>
          </div>
        </div>
      )}

      {activeTab === 'modelos' && (
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
            <Cpu className="w-4 h-4" />
            Selección de Variables Predictoras (Feature Selection en Machine Learning)
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            En modelos de regresión lineal o logística, evaluamos si el coeficiente asignado a cada variable independiente es estadísticamente distinto de cero (<code className="text-indigo-300">p-valor &lt; α</code>). Si <code className="text-rose-400">p &gt; α</code>, la variable no aporta información significativa y se descarta para evitar sobreajuste (overfitting) y reducir el ruido.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300 border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 font-mono">
                  <th className="py-2">Variable Predictora</th>
                  <th>Coeficiente (β)</th>
                  <th>Std Error</th>
                  <th>t-stat</th>
                  <th>p-value</th>
                  <th>Decisión Técnica</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                <tr>
                  <td className="py-2.5 font-sans font-semibold text-white">Antigüedad del Cliente (días)</td>
                  <td>+0.420</td>
                  <td>0.080</td>
                  <td>5.25</td>
                  <td className="text-emerald-400 font-bold">&lt; 0.001</td>
                  <td><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px]">Retener en Modelo</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 font-sans font-semibold text-white">Canal de Adquisición (Orgánico/Ads)</td>
                  <td>-0.180</td>
                  <td>0.060</td>
                  <td>-3.00</td>
                  <td className="text-emerald-400 font-bold">0.002</td>
                  <td><span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px]">Retener en Modelo</span></td>
                </tr>
                <tr>
                  <td className="py-2.5 font-sans font-semibold text-slate-400">Color del Botón de Registro</td>
                  <td>+0.030</td>
                  <td>0.090</td>
                  <td>0.33</td>
                  <td className="text-rose-400 font-bold">0.741</td>
                  <td><span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 text-[10px]">Descartar (Ruido)</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'pipelines' && (
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
            <Terminal className="w-4 h-4" />
            Automatización de Pruebas en Pipelines de Analítica y CI/CD
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Integración de librerías estadísticas (<code className="text-teal-300 font-mono">scipy.stats</code>, <code className="text-teal-300 font-mono">statsmodels</code> en Python) para computar automáticamente los estadísticos de prueba (t, Z, χ²) y desencadenar despliegues automatizados de features ganadoras.
          </p>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 overflow-x-auto space-y-1">
            <div className="text-slate-500"># Pipeline automático de decisión A/B Testing con SciPy</div>
            <div><span className="text-purple-400">from</span> scipy <span className="text-purple-400">import</span> stats</div>
            <div className="pt-2">stat, p_val = stats.ttest_ind(conversion_A, conversion_B)</div>
            <div className="pt-2"><span className="text-blue-400">if</span> p_val &lt;= <span className="text-emerald-400">0.05</span>:</div>
            <div className="pl-4 text-emerald-300">deploy_feature_flag(<span className="text-amber-300">"variant_B"</span>, rollout=<span className="text-emerald-400">1.0</span>)</div>
            <div className="pl-4 text-slate-500"># Rechazo formal de H0: efecto significativo validado</div>
            <div><span className="text-blue-400">else</span>:</div>
            <div className="pl-4 text-rose-300">rollback_experiment(<span className="text-amber-300">"variant_B"</span>)</div>
            <div className="pl-4 text-slate-500"># p &gt; 0.05: No hay evidencia suficiente; evitar deuda técnica</div>
          </div>
        </div>
      )}
    </div>
  );
}

export function SlideConclusionesInferencial() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-6">
      <div className="border-b border-slate-800 pb-4 text-center">
        <span className="text-xs uppercase tracking-wider text-blue-400 font-bold">Cierre y Síntesis</span>
        <h2 className="text-3xl font-black text-white tracking-tight">Síntesis: El Flujo Inferencia de Alto Impacto</h2>
        <p className="text-slate-400 text-sm mt-1">Checklist riguroso para la toma de decisiones basada en evidencia estadística.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-2">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center mx-auto text-sm">
            1
          </div>
          <div className="text-sm font-bold text-white">Formulación</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Definir claramente H₀ (status quo) y H₁ (cambio) antes de observar métricas.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center mx-auto text-sm">
            2
          </div>
          <div className="text-sm font-bold text-white">Muestreo y TLC</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Garantizar n suficiente y aleatoriedad para justificar la aproximación normal.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-2">
          <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 font-bold flex items-center justify-center mx-auto text-sm">
            3
          </div>
          <div className="text-sm font-bold text-white">Cálculo de P-Valor</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Contrastar el p-valor frente al umbral de riesgo aceptado (α = 0.05 o 0.01).
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-center space-y-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center mx-auto text-sm">
            4
          </div>
          <div className="text-sm font-bold text-white">Acción de Negocio</div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Combinar significancia estadística con significancia práctica (tamaño del efecto).
          </p>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900/30 via-indigo-900/30 to-purple-900/30 border border-blue-500/30 text-center">
        <h4 className="text-lg font-bold text-white mb-1">¡Gracias por su atención!</h4>
        <p className="text-xs text-slate-300">
          Espacio abierto para preguntas, debates sobre A/B Testing o dudas conceptuales · Grupo 3 y 4
        </p>
      </div>
    </div>
  );
}
