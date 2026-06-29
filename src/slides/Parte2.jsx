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
  const maskingSteps = [
    { label: 'Paso 1: C = A + 1', desc: 'Ejecutar camino "true" para TODOS los elementos', active: [0, 2], inactive: [1, 3], result: [6, -1, 11, 0] },
    { label: 'Paso 2: C = A × 2', desc: 'Ejecutar camino "false" para TODOS los elementos', active: [1, 3], inactive: [0, 2], result: [10, -4, 20, -2] },
    { label: 'Paso 3: Fusionar con VMASK', desc: 'Combinar usando la máscara de predicción', active: [0, 1, 2, 3], inactive: [], result: [6, -4, 11, -2] },
  ];

  const masks = [
    { mask: '1···1', active: [0, 2] },
    { mask: '·1·1·', active: [1, 3] },
    { mask: '1111', active: [0, 1, 2, 3] },
  ];

  const A_data = [5, -2, 10, -1];

  return (
    <div className="w-full h-full flex flex-col gap-3 max-w-6xl mx-auto">
      {/* Two columns */}
      <div className="flex-1 grid grid-cols-2 gap-3 min-h-0">
        {/* Ventajas */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-emerald-500/40 flex flex-col gap-3">
          <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2 shrink-0"><CheckCircle2 size={16} /> Ventajas Clave</h4>
          <ul className="text-[13px] text-slate-300 space-y-1.5 flex-1 flex flex-col justify-center">
            <li className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">✓ <span className="text-emerald-300 font-bold">Throughput N veces mayor</span> por ciclo de reloj</li>
            <li className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">✓ <span className="text-emerald-300 font-bold">1 decodificación</span> para N operaciones → eficiencia energética</li>
            <li className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">✓ <span className="text-emerald-300 font-bold">Menos instrucciones</span> dinámicas (304 → 7) → menos presión ICache</li>
            <li className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">✓ <span className="text-emerald-300 font-bold">Amortización de latencia</span> en el pipeline vectorial</li>
          </ul>
        </div>

        {/* Kryptonita con pasos */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-red-500/40 flex flex-col gap-2">
          <h4 className="text-sm font-bold text-red-400 flex items-center gap-2 shrink-0"><ShieldAlert size={16} /> La Kryptonita: Divergencia</h4>
          <p className="text-[13px] text-slate-400 shrink-0">
            Con datos <span className="font-mono text-red-300">[5, -2, 10, -1]</span> y <span className="font-mono text-cyan-300">if (A[i] &gt; 0)</span>
          </p>

          {/* Masking steps */}
          <div className="flex-1 space-y-1.5 min-h-0">
            {maskingSteps.map((st, si) => (
              <motion.div
                key={si}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: si * 0.1 }}
                className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-[13px]"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-300">{st.label}</span>
                  <span className="text-[13px] font-mono text-slate-600">MASK: {masks[si].mask}</span>
                </div>
                <div className="flex items-center gap-1 mb-1">
                  {A_data.map((_, idx) => {
                    const isActive = st.active.includes(idx);
                    return (
                      <div key={idx} className={`flex-1 p-1 rounded text-center font-mono text-[13px] font-bold transition-all ${isActive ? 'bg-amber-500/20 border border-amber-400/50 text-amber-200' : 'bg-slate-800/60 border border-slate-700/50 text-slate-600'}`}>
                        {st.result[idx]}
                      </div>
                    );
                  })}
                </div>
                <p className="text-[13px] text-slate-500">{st.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="shrink-0 p-2 bg-red-500/5 rounded-xl border border-red-500/20 text-[13px] text-slate-400 leading-relaxed">
            ⚠️ Se ejecutaron <span className="text-red-300 font-bold">2 ciclos de instrucción</span> en vez de 1. Si la condición divide los datos 50/50, el speedup cae a la mitad. Accesos no alineados (stride &gt; 1) también penalizan.
          </div>
        </div>
      </div>

      {/* Footer: aplicaciones SIMD */}
      <div className="shrink-0 grid grid-cols-4 gap-2 text-[13px] text-center">
        <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
          <span className="text-cyan-400 font-bold block">Imágenes</span> Brillo, convolución
        </div>
        <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
          <span className="text-cyan-400 font-bold block">Audio/Video</span> Codificación H.264
        </div>
        <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
          <span className="text-cyan-400 font-bold block">IA/ML</span> CNN, GEMM, FMA
        </div>
        <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
          <span className="text-cyan-400 font-bold block">Cripto</span> AES-NI, SHA-NI
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
      </div>
    </div>
  );
}
