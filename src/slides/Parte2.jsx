import React, { useState, useEffect } from 'react';
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

/* ───────── Slide 2.4 — Ventajas del Procesamiento Vectorial ───────── */

export function Slide2_4() {
  const useCases = [
    { label: 'Imágenes Digitales', desc: 'Filtros, convolución y ajuste de brillo píxel a píxel', color: 'text-cyan-400' },
    { label: 'Audio y Video', desc: 'Codificación H.264/HEVC y equalización en tiempo real', color: 'text-emerald-400' },
    { label: 'IA y Aprendizaje Profundo', desc: 'Multiplicación de matrices (GEMM) y capas CNN', color: 'text-purple-400' },
    { label: 'Criptografía', desc: 'Instrucciones dedicadas AES-NI y cifrado en bloques', color: 'text-amber-400' },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
        {/* ─── Ventajas Clave ─── */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/40 flex flex-col gap-3 min-h-0">
          <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2 shrink-0"><CheckCircle2 size={18} /> Ventajas Principales (Sección 2.7)</h4>
          <ul className="text-[13px] text-slate-300 space-y-2 flex-1 overflow-y-auto pr-1">
            <li className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              ✓ <span className="text-emerald-300 font-bold">Throughput N× mayor:</span> Procesa múltiples datos en un solo ciclo de reloj según el ancho del registro vectorial.
            </li>
            <li className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              ✓ <span className="text-emerald-300 font-bold">Eficiencia energética:</span> Una sola decodificación de instrucción emite el comando a N ALUs, reduciendo el consumo de la Control Unit.
            </li>
            <li className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              ✓ <span className="text-emerald-300 font-bold">Menor presión en memoria de instrucciones:</span> Reduce drásticamente el número de instrucciones dinámicas y saltos de bucle.
            </li>
            <li className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              ✓ <span className="text-emerald-300 font-bold">Amortización de latencia:</span> El pipeline vectorial absorbe el costo de arranque a lo largo de todo el vector de datos.
            </li>
          </ul>
        </div>

        {/* ─── Requisitos de Regularidad ─── */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/40 flex flex-col gap-3 min-h-0">
          <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2 shrink-0"><Layers size={18} /> Requisitos para el Paralelismo Vectorial</h4>
          <div className="space-y-2.5 text-[13px] flex-1 overflow-y-auto pr-1">
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="text-cyan-300 font-bold block mb-0.5">1. Homogeneidad de Datos</span>
              Los datos deben ser del mismo tipo y tamaño (ej. vectores de 32-bit float) para ejecutarse en paralelo sin conversiones.
            </div>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="text-amber-300 font-bold block mb-0.5">2. Alineación y Contigüidad en Memoria</span>
              Los datos deben estar contiguos en RAM (stride = 1). Acceso disperso (gather/scatter) penaliza severamente el ancho de banda.
            </div>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="text-purple-300 font-bold block mb-0.5">3. Ausencia de Dependencias</span>
              Cada elemento debe ser independiente (C[i] no puede depender de C[i-1]) para permitir cómputo simultáneo.
            </div>
          </div>
        </div>
      </div>

      {/* Casos de Uso Reales abajo */}
      <div className="shrink-0 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <h5 className="text-[13px] font-bold text-slate-400 mb-2">• Aplicaciones naturalmente vectoriales</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {useCases.map((uc, i) => (
            <div key={i} className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-[13px] text-center">
              <span className={`font-bold block ${uc.color}`}>{uc.label}</span>
              <span className="text-slate-500 text-xs">{uc.desc}</span>
            </div>
          ))}
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
