import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

export function SlideIntervalosConfianza() {
  const [confidence, setConfidence] = useState(95);

  const zValue = confidence === 95 ? 1.96 : 2.576;
  const alphaValue = confidence === 95 ? '0.05' : '0.01';

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 space-y-6">
      <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">Estimación por Intervalos</span>
          <h2 className="text-3xl font-black text-white tracking-tight">Margen de Error y Nivel de Confianza</h2>
          <p className="text-slate-400 text-sm mt-1">
            Construcción e interpretación de intervalos de confianza al 95% y 99%.
          </p>
        </div>

        <div className="flex gap-2">
          {[95, 99].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setConfidence(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                confidence === lvl
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 ring-2 ring-emerald-400'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Nivel {lvl}% (Z = {lvl === 95 ? '1.96' : '2.576'})
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300">Fórmula de Construcción:</span>
            <span className="font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
              IC = x̄ ± Z_(α/2) · (σ / √n)
            </span>
          </div>

          {/* Gráfico de Margen de Error */}
          <div className="p-5 bg-slate-950/70 rounded-xl border border-slate-800 text-center">
            <div className="text-xs text-slate-400 mb-1">
              Amplitud del Margen de Error (E = Z_(α/2) · SE) con Confianza del {confidence}%
            </div>
            <div className="relative py-6 flex items-center justify-center">
              <div className="absolute w-full h-1 bg-slate-800" />
              
              <div
                style={{ width: `${confidence === 95 ? '58%' : '82%'}` }}
                className="h-3.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 rounded-full relative z-10 transition-all duration-300 shadow-lg shadow-emerald-500/20"
              >
                <div className="absolute -left-2 -top-1 w-5 h-5 rounded-full bg-emerald-400 border-2 border-slate-950" />
                <div className="absolute -right-2 -top-1 w-5 h-5 rounded-full bg-cyan-400 border-2 border-slate-950" />
              </div>

              <div className="absolute z-20 w-4 h-4 bg-white rounded-full border-2 border-emerald-500 -top-0.5" />
            </div>

            <div className="flex justify-between text-xs text-slate-400 px-8 font-mono">
              <span className="text-emerald-400 font-bold">x̄ - {zValue}·SE</span>
              <span className="text-white font-bold">Media Estimada (x̄)</span>
              <span className="text-cyan-400 font-bold">x̄ + {zValue}·SE</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <div className="font-bold text-slate-200 mb-0.5">IC al 95% (α = 0.05)</div>
              <div className="text-slate-400 text-[11px] leading-relaxed">
                Estándar comercial y de software. Menor margen de error (intervalo más estrecho y preciso).
              </div>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <div className="font-bold text-slate-200 mb-0.5">IC al 99% (α = 0.01)</div>
              <div className="text-slate-400 text-[11px] leading-relaxed">
                Riesgo crítico (fintech, salud). Mayor cobertura probabilística, pero intervalo más amplio.
              </div>
            </div>
          </div>
        </div>

        {/* Interpretación Rigurosa */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-emerald-950/25 border border-emerald-900/40">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1.5 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Interpretación Frecuentista Correcta
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              "Si repitiéramos el muestreo 100 veces en idénticas condiciones, el <strong>{confidence}%</strong> de los intervalos construidos contendrá la verdadera media poblacional μ".
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/25 border border-rose-900/40">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs mb-1.5 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              La Gran Falacia a No Cometer
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>Incorrecto:</strong> <em>"Hay un {confidence}% de probabilidad de que μ caiga dentro de este intervalo calculado"</em>. El parámetro real μ es un valor fijo (no una variable aleatoria); lo que varía aleatoriamente de muestra a muestra es el intervalo mismo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
