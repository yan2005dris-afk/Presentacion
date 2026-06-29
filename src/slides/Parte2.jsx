import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers, Activity, CheckCircle2, ShieldAlert } from 'lucide-react';

// ==========================================
// === PARTE 2 — Rivera Yandris ===
// ==========================================

/* ───────── Slide 2.1 — Una Orden, Ocho Soldados ───────── */

export function Slide2_1() {
  return (
    <div className="space-y-6 text-center max-w-5xl mx-auto">
      <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-400/40 inline-block px-8 shadow-lg shadow-cyan-500/10">
        <span className="text-[13px] text-cyan-400 font-mono font-bold uppercase tracking-widest block">Unidad de Control Única</span>
        <h4 className="text-base font-bold text-slate-100 mt-1">Comando: SUMAR +10</h4>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-2 py-2">
        {[5, 12, 3, 8, 15, 7, 2, 9].map((val, i) => (
          <motion.div key={i} whileHover={{ y: -4 }} className="space-y-1.5">
            <div className="p-1.5 rounded bg-slate-950 border border-slate-800 text-[13px] font-mono text-slate-400">ALU{i}</div>
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-300 font-bold font-mono text-[13px]">{val}</div>
            <div className="text-cyan-400 text-xs">↓</div>
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold font-mono text-[13px] shadow-md">{val + 10}</div>
          </motion.div>
        ))}
      </div>

      <p className="text-[13px] text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800 max-w-xl mx-auto">
        💡 <span className="text-cyan-400 font-bold">Impacto Energético:</span> Decodificar es trabajo. Al decodificar 1 sola vez para 8 ALUs, el costo de Fetch/Decode se divide entre 8.
      </p>
    </div>
  );
}

/* ───────── Slide 2.2 — Registros Vectoriales ───────── */

export function Slide2_2() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-[13px] text-slate-500 font-mono">Registro Escalar (32 Bits)</span>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-700 text-center font-mono text-slate-300 font-bold text-sm">[ 3.14159 ]</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/50 space-y-2">
          <span className="text-[13px] text-cyan-400 font-mono">Registro Vectorial XMM (128 Bits)</span>
          <div className="grid grid-cols-4 gap-1 p-1.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-center font-mono text-[13px] font-bold text-cyan-300">
            <div className="bg-cyan-500/20 p-1.5 rounded">3.14</div>
            <div className="bg-cyan-500/20 p-1.5 rounded">2.71</div>
            <div className="bg-cyan-500/20 p-1.5 rounded">1.41</div>
            <div className="bg-cyan-500/20 p-1.5 rounded">0.57</div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 grid grid-cols-3 gap-4 text-[13px]">
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800"><span className="text-cyan-400 font-mono font-bold block">VLEN (Vector Length)</span> Longitud o cantidad de elementos activos en el registro.</div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800"><span className="text-amber-400 font-mono font-bold block">VSTR (Vector Stride)</span> Distancia en memoria entre elementos consecutivos.</div>
        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800"><span className="text-purple-400 font-mono font-bold block">VMASK (Vector Mask)</span> Máscara de bits para activar/desactivar elementos en condicionales.</div>
      </div>
    </div>
  );
}

/* ───────── Slide 2.3 — Array vs Vector Processor ───────── */

export function Slide2_3() {
  return (
    <div className="w-full h-full flex flex-col gap-3 max-w-6xl mx-auto">
      {/* Dual description */}
      <div className="shrink-0 grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-2">
          <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2"><Layers size={16} /> Array Processor <span className="text-[13px] font-mono text-amber-500">(Espacio)</span></h4>
          <p className="text-[13px] text-slate-300">Múltiples PEs (Processing Elements) físicos independientes operando exactamente en el mismo ciclo de reloj.</p>
          <div className="p-2 bg-slate-950 rounded-xl font-mono text-[13px] text-amber-300 border border-slate-800">
            • 4 obreros trabajando al mismo tiempo<br />
            • GPUs · Connection Machine CM-2
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-purple-500/30 space-y-2">
          <h4 className="text-sm font-bold text-purple-400 flex items-center gap-2"><Activity size={16} /> Vector Processor <span className="text-[13px] font-mono text-purple-500">(Tiempo)</span></h4>
          <p className="text-[13px] text-slate-300">Un pipeline segmentado que procesa elementos en pasos consecutivos usando el mismo circuito físico.</p>
          <div className="p-2 bg-slate-950 rounded-xl font-mono text-xs text-purple-300 border border-slate-800">
            • Línea de ensamblaje de fábrica<br />
            • CRAY-1 (1976) · procesadores vectoriales
          </div>
        </div>
      </div>

      {/* Comparison table */}
      <div className="flex-1 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 text-[13px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950 text-slate-500">
              <th className="p-2 font-bold">Dimensión</th>
              <th className="p-2 font-bold text-amber-400">Array Processor</th>
              <th className="p-2 font-bold text-purple-400">Vector Processor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            <tr><td className="p-2 text-slate-300">Hardware extra</td><td className="p-2 text-slate-400">Muchos PEs físicos</td><td className="p-2 text-slate-400">1 pipeline sofisticado</td></tr>
            <tr><td className="p-2 text-slate-300">Costo en área</td><td className="p-2 text-amber-300 font-semibold">Mayor (más silicio)</td><td className="p-2 text-purple-300 font-semibold">Menor (circuito compartido)</td></tr>
            <tr><td className="p-2 text-slate-300">Mismo ciclo</td><td className="p-2 text-emerald-300 font-semibold">Sí — todas las ALUs activas</td><td className="p-2 text-slate-400">No — elementos pipelineados</td></tr>
            <tr><td className="p-2 text-slate-300">Latencia de arranque</td><td className="p-2 text-emerald-300 font-semibold">Baja (inmediata)</td><td className="p-2 text-red-300 font-semibold">Alta (llenar pipeline)</td></tr>
            <tr><td className="p-2 text-slate-300">Throughput sostenido</td><td className="p-2 text-amber-300 font-semibold">Muy alto</td><td className="p-2 text-purple-300 font-semibold">Muy alto</td></tr>
            <tr><td className="p-2 text-slate-300">Escalabilidad</td><td className="p-2 text-slate-400">Agregar más PEs</td><td className="p-2 text-slate-400">Agregar etapas/lanes</td></tr>
          </tbody>
        </table>
        <div className="p-2 text-center text-[13px] text-cyan-400 font-mono border-t border-slate-800 bg-slate-950/50">
          ⟺ Dualidad espacio-tiempo: ambos son SIMD — la diferencia es cómo el hardware implementa el paralelismo
        </div>
      </div>
    </div>
  );
}

/* ───────── Slide 2.4 — Ventajas y Kryptonita ───────── */

export function Slide2_4() {
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const nextStep = () => setStep(p => (p + 1) % 4);

  // Auto-cycle through 4 steps: 0=datos-inicial, 1=true-path, 2=false-path, 3=merge
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(nextStep, 2800);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const A_data = [5, -2, 10, -1];

  const steps = [
    {
      label: 'Cargando datos...',
      mask: '····',
      active: [],
      inactive: [0, 1, 2, 3],
      result: [5, -2, 10, -1],
      desc: 'Registro vectorial con datos cargados. La ALU espera la instrucción.',
      error: '',
    },
    {
      label: 'Paso 1: Camino TRUE → A + 1',
      mask: '1···1',
      active: [0, 2],
      inactive: [1, 3],
      result: [6, -2, 11, -1],
      desc: 'Elementos >0 ejecutan A+1. Elementos ≤0 también computan pero su resultado se descarta.',
      error: '',
    },
    {
      label: 'Paso 2: Camino FALSE → A × 2',
      mask: '·1·1·',
      active: [1, 3],
      inactive: [0, 2],
      result: [5, -4, 10, -2],
      desc: 'Elementos ≤0 ejecutan A×2. "Gastamos otro ciclo completo para 2 elementos".',
      error: '¡1 ciclo extra desperdiciado!',
    },
    {
      label: 'Paso 3: Fusionar con VMASK',
      mask: '1111',
      active: [0, 1, 2, 3],
      inactive: [],
      result: [6, -4, 11, -2],
      desc: 'La máscara combina: TRUE→[0,2] y FALSE→[1,3]. Resultado correcto, pero a COSTE DOBLE.',
      error: '2 ciclos para 1 operación lógica',
    },
  ];

  const s = steps[step];

  const useCases = [
    { label: 'Imágenes', desc: 'Brillo, convolución, filtros', color: 'text-cyan-400' },
    { label: 'Audio / Video', desc: 'Codificación H.264, AAC', color: 'text-emerald-400' },
    { label: 'IA / ML', desc: 'CNN, GEMM, FMA', color: 'text-purple-400' },
    { label: 'Criptografía', desc: 'AES-NI, SHA-NI', color: 'text-amber-400' },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-3 max-w-6xl mx-auto">
      <div className="flex-1 grid grid-cols-2 gap-3 min-h-0">
        {/* ─── Ventajas + Casos de Uso ─── */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/40 flex flex-col gap-2 min-h-0">
          <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2 shrink-0"><CheckCircle2 size={16} /> Ventajas Clave</h4>
          <ul className="text-[13px] text-slate-300 space-y-1 flex-1 min-h-0">
            <li className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">✓ <span className="text-emerald-300 font-bold">Throughput N× mayor</span> por ciclo de reloj</li>
            <li className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">✓ <span className="text-emerald-300 font-bold">1 decodificación</span> para N op → eficiencia energética</li>
            <li className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">✓ <span className="text-emerald-300 font-bold">Menos instrucciones</span> dinámicas → menos presión ICache</li>
            <li className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">✓ <span className="text-emerald-300 font-bold">Amortización de latencia</span> en pipeline vectorial</li>
          </ul>

          {/* Casos de Uso */}
          <div className="shrink-0">
            <h5 className="text-[13px] font-bold text-slate-400 mb-1.5">• Casos de Uso Reales</h5>
            <div className="grid grid-cols-2 gap-1.5">
              {useCases.map((uc, i) => (
                <div key={i} className="p-1.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[13px] text-center">
                  <span className={`font-bold block ${uc.color}`}>{uc.label}</span>
                  <span className="text-slate-500 text-[13px]">{uc.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Kryptonita Animada ─── */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-red-500/40 flex flex-col gap-2 min-h-0">
          <h4 className="text-sm font-bold text-red-400 flex items-center gap-2 shrink-0"><ShieldAlert size={16} /> La Kryptonita: Divergencia</h4>
          <p className="text-[13px] text-slate-400 shrink-0">
            Datos <span className="font-mono text-red-300">[5, -2, 10, -1]</span> · Condición <span className="font-mono text-cyan-300">if (A[i] &gt; 0)</span>
          </p>

          {/* Animated masking viewer */}
          <div className="flex-1 flex flex-col min-h-0">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col gap-1.5"
            >
              {/* Step label + mask */}
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-bold text-slate-200">{s.label}</span>
                <span className="text-[13px] font-mono text-slate-600">
                  MASK: <span className="text-amber-400">{s.mask}</span>
                </span>
              </div>

              {/* Data cells */}
              <div className="grid grid-cols-4 gap-1">
                {A_data.map((val, idx) => {
                  const isActive = s.active.includes(idx);
                  const isInactive = s.inactive.includes(idx);
                  return (
                    <div key={idx} className="flex flex-col items-center gap-0.5">
                      {/* Original value */}
                      <span className="text-[13px] font-mono text-slate-600">{val}</span>
                      {/* Result */}
                      <div className={`w-full p-1.5 rounded text-center font-mono text-[13px] font-bold transition-all duration-300 ${
                        isActive
                          ? 'bg-amber-500/20 border border-amber-400/50 text-amber-200'
                          : 'bg-slate-800/60 border border-slate-700/50 text-slate-600'
                      }`}>
                        {s.result[idx]}
                      </div>
                      {/* Status */}
                      <span className={`text-[13px] ${isActive ? 'text-amber-400' : isInactive ? 'text-red-400' : ''}`}>
                        {isActive ? '✓' : isInactive ? '✗' : ''}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Description */}
              <p className="text-[13px] text-slate-500 leading-relaxed">{s.desc}</p>

              {/* Error callout */}
              {s.error && (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="p-2 bg-red-500/10 rounded-xl border border-red-500/30 text-center"
                >
                  <span className="text-red-300 font-bold text-[13px]">⚠ {s.error}</span>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Controls: prev / dots / next + auto toggle */}
          <div className="shrink-0 flex items-center justify-between gap-2">
            <button onClick={() => setStep(p => (p - 1 + 4) % 4)}
              className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-all text-[13px] font-bold leading-none"
              title="Paso anterior">◀</button>

            <div className="flex items-center gap-1.5">
              {[0, 1, 2, 3].map(i => (
                <button key={i} onClick={() => setStep(i)}
                  className={`h-2 rounded-full transition-all ${i === step ? 'bg-red-400 w-5' : 'bg-slate-700 hover:bg-slate-600 w-2'}`} />
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              <button onClick={nextStep}
                className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-all text-[13px] font-bold leading-none"
                title="Siguiente paso">▶</button>
              <button onClick={() => setAutoPlay(p => !p)}
                className={`px-2 py-1 rounded-lg text-[13px] font-bold leading-none transition-all ${autoPlay ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30' : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'}`}>
                {autoPlay ? '⏸ Pausar' : '▶ Automático'}
              </button>
            </div>
          </div>

          <div className="shrink-0 p-2 bg-red-500/5 rounded-xl border border-red-500/20 text-[13px] text-slate-400 leading-relaxed">
            ⚠️ Se ejecutaron <span className="text-red-300 font-bold">2 ciclos de instrucción</span> en vez de 1. Si la condición divide los datos 50/50, el speedup cae a la mitad. Accesos no alineados (stride &gt; 1) también penalizan.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Slide 2.5 — Comparación Explícita de Código (Sección 2.3) ───────── */

export function Slide2_Codigo() {
  return (
    <div className="space-y-4 max-w-6xl mx-auto text-[13px] font-mono">
      <div className="p-3 rounded-xl bg-slate-900 border border-purple-500/30 text-center text-purple-300 font-bold">
        Sección 2.3 de la Guía · Desglose de Código Secuencial vs Vectorial
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* SISD */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-red-500/30 space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="font-bold text-red-400">Código Secuencial (SISD)</span>
            <span className="text-xs px-2 py-0.5 rounded bg-red-500/20 text-red-300">4 Iteraciones</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl text-slate-300 space-y-1.5 leading-relaxed">
            <div className="text-slate-500">// Bucle tradicional elemento por elemento</div>
            <div><span className="text-red-400">ADD</span> A[0], B[0] → C[0] <span className="text-slate-600">; Ciclo 1</span></div>
            <div><span className="text-red-400">ADD</span> A[1], B[1] → C[1] <span className="text-slate-600">; Ciclo 2</span></div>
            <div><span className="text-red-400">ADD</span> A[2], B[2] → C[2] <span className="text-slate-600">; Ciclo 3</span></div>
            <div><span className="text-red-400">ADD</span> A[3], B[3] → C[3] <span className="text-slate-600">; Ciclo 4</span></div>
          </div>
          <div className="text-xs text-slate-400">
            • 4 decodificaciones de instrucción<br/>
            • 4 saltos de bucle y comprobaciones de índice
          </div>
        </div>

        {/* SIMD */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-400/40 space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="font-bold text-cyan-400">Código Vectorial (SIMD)</span>
            <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">1 Instrucción</span>
          </div>
          <div className="p-3 bg-slate-950 rounded-xl text-slate-300 space-y-1.5 leading-relaxed">
            <div className="text-slate-500">// Instrucción vectorial sobre registro XMM (128 bits)</div>
            <div><span className="text-cyan-300 font-bold">VADD</span> XMM0, XMM1, XMM2</div>
            <div className="text-emerald-400/90 text-xs pt-1">
              └─ Suma en paralelo: <br/>
                 [A0+B0, A1+B1, A2+B2, A3+B3] en 1 solo ciclo
            </div>
          </div>
          <div className="text-xs text-slate-400">
            • 1 sola decodificación en la Control Unit<br/>
            • Reducción de latencia y consumo eléctrico
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Carátula de Sección: Parte 2 ───────── */

export function SlideIntroParte2() {
  return (
    <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 via-slate-900 to-pink-500/10 border-2 border-purple-500/40 text-center space-y-6 max-w-3xl mx-auto shadow-2xl">
      <span className="px-4 py-1 bg-purple-500/20 text-purple-300 font-extrabold text-xs rounded-full border border-purple-400/30 uppercase tracking-widest">
        Expositor: Rivera Yandris · Parte 2
      </span>
      <h2 className="text-3xl font-extrabold text-slate-100">Arquitectura SIMD y el Principio Vectorial</h2>
      <div className="grid grid-cols-2 gap-3 text-left text-[13px] pt-2">
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 2.1: Una Orden, Ocho Soldados</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 2.2: Registros Vectoriales y Control</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 2.3: Array Processor vs Vector Processor</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 2.4: Ventajas y La Kryptonita (Divergencia)</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 2.5: Código Secuencial vs Vectorial (Sec. 2.3)</div>
      </div>
    </div>
  );
}
