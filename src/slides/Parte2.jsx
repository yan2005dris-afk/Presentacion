import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layers, Activity, CheckCircle2, ShieldAlert } from 'lucide-react';

// ==========================================
// === PARTE 2 — Rivera Yandris ===
// ==========================================

/* ───────── Slide 2.1 — ¿Qué es SIMD? + Una Orden, Ocho Soldados ───────── */

export function Slide2_1() {
  return (
    <div className="w-full h-full flex flex-col gap-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
        {/* ─── Left: ¿Qué es SIMD? ─── */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/40 flex flex-col gap-3 min-h-0 overflow-y-auto">
          <h4 className="text-[12px] font-bold text-cyan-400 flex items-center gap-2 shrink-0">
            <Layers size={18} /> ¿Qué es SIMD?
          </h4>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[13px] space-y-1">
            <span className="text-cyan-300 font-bold block">Single Instruction, Multiple Data</span>
            <p className="text-slate-300 leading-relaxed">
              Una sola instrucción se decodifica <span className="text-cyan-400 font-bold">una vez</span> y se aplica sobre <span className="text-cyan-400 font-bold">N datos distintos</span> en <span className="text-cyan-400 font-bold">N ALUs en paralelo</span>.
            </p>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[13px] space-y-1">
            <span className="text-amber-300 font-bold block">⚡ Clave: Eficiencia energética</span>
            <p className="text-slate-300 leading-relaxed">
              El costo de <span className="text-amber-400 font-mono font-bold">Fetch + Decode</span> se divide entre N elementos. <span className="text-amber-400 font-bold">No pagás N veces el control.</span>
            </p>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[13px] space-y-1">
            <span className="text-purple-300 font-bold block">🎖️ Analogía: Comandante + Escuadrón</span>
            <p className="text-slate-300 leading-relaxed">
              El comandante da <span className="text-purple-400 font-bold">UNA</span> orden. El escuadrón (N soldados) la ejecuta al mismo tiempo, cada uno sobre su propio objetivo. <span className="text-purple-400 font-bold">Una sola voz de mando, N acciones simultáneas.</span>
            </p>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-[12px] text-slate-400 space-y-1">
            <span className="text-slate-500 font-mono font-bold">📍 Taxonomía de Flynn:</span>
            <p className="text-slate-400">1 Instruction Stream · Múltiples Data Streams · 1 Unidad de Control · N ALUs</p>
            <p className="text-slate-500 italic">(Retomando lo visto en la Parte 1 — Reyes Alisson)</p>
          </div>
        </div>

        {/* ─── Right: Visual Demo ─── */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/40 flex flex-col gap-3 min-h-0">
          <h4 className="text-[12px] font-bold text-cyan-400 flex items-center gap-2 shrink-0">
            <Activity size={18} /> Una Orden, Ocho Soldados
          </h4>

          {/* Control Unit */}
          <div className="shrink-0 text-center">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-cyan-400/40 inline-block px-5 shadow-lg shadow-cyan-500/10">
              <span className="text-[11px] text-cyan-400 font-mono font-bold uppercase tracking-widest block">Unidad de Control Única</span>
              <h4 className="text-base font-bold text-slate-100 mt-0.5">Comando: SUMAR +10</h4>
            </div>
          </div>

          {/* 8 ALUs */}
          <div className="flex-1 grid grid-cols-4 md:grid-cols-8 gap-1.5 min-h-0 items-center">
            {[5, 12, 3, 8, 15, 7, 2, 9].map((val, i) => (
              <motion.div key={i} whileHover={{ y: -4 }} className="space-y-1">
                <div className="p-1 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-500 text-center">ALU{i}</div>
                <div className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-400 text-amber-300 font-bold font-mono text-[12px] text-center">{val}</div>
                <div className="text-cyan-400 text-[10px] text-center">↓</div>
                <div className="p-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold font-mono text-[12px] text-center shadow-sm">{val + 10}</div>
              </motion.div>
            ))}
          </div>

          {/* Energy Impact */}
          <div className="shrink-0 text-center">
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-[12px] text-slate-300 inline-block px-3">
              💡 <span className="text-cyan-400 font-bold">Resultado:</span> 1 decodificación → 8 resultados. Costo de control ÷ 8.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Slide 2.2 — Registros Vectoriales ───────── */

export function Slide2_2() {
  const [reg, setReg] = useState('xmm');
  const data = [3.14, 2.71, 1.41, 0.57, 4.20, 5.55, 6.28, 7.89, 8.31, 9.81, 10.5, 11.7, 12.3, 13.9, 14.2, 15.6];

  const regConfig = {
    xmm: { label: 'Registro Vectorial XMM (128 Bits)', count: 4, sub: '4 × float32 (SSE)', gridCols: 'grid-cols-4' },
    ymm: { label: 'Registro Vectorial YMM (256 Bits)', count: 8, sub: '8 × float32 (AVX) — el ancho se duplica', gridCols: 'grid-cols-4' },
    zmm: { label: 'Registro Vectorial ZMM (512 Bits)', count: 16, sub: '16 × float32 (AVX-512) — el ancho se duplica otra vez', gridCols: 'grid-cols-8' },
  };
  const cfg = regConfig[reg];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-[13px] text-slate-500 font-mono">Registro Escalar (32 Bits)</span>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-700 text-center font-mono text-slate-300 font-bold text-sm">[ 3.14159 ]</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/50 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[12px] text-cyan-400 font-mono">{cfg.label}</span>
            <div className="flex gap-1">
              {['xmm', 'ymm', 'zmm'].map((r) => (
                <button
                  key={r}
                  onClick={() => setReg(r)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold font-mono uppercase transition-all ${
                    reg === r
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'
                  }`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <motion.div
            key={reg}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className={`grid ${cfg.gridCols} gap-1 p-1.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-center font-mono text-[11px] font-bold text-cyan-300`}>
            {data.slice(0, cfg.count).map((val, i) => (
              <motion.div
                key={`${reg}-${i}`}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: i * 0.015 }}
                className="bg-cyan-500/20 p-1.5 rounded">
                {val}
              </motion.div>
            ))}
          </motion.div>
          <div className="text-[11px] text-slate-400 font-mono text-center pt-1">
            {cfg.sub}
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
  const [view, setView] = useState('diagram'); // 'diagram' | 'array' | 'table'

  return (
    <div className="w-full h-full flex flex-col gap-3 max-w-6xl mx-auto">
      {/* Top Header & Selector */}
      <div className="shrink-0 flex items-center justify-between px-1">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setView('diagram')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${view === 'diagram' ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'}`}>
            🏛️ Arquitectura Vectorial (CRAY-1)
          </button>
          <button
            onClick={() => setView('array')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${view === 'array' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'}`}>
            🧮 Arquitectura Array (Espacio)
          </button>
          <button
            onClick={() => setView('table')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${view === 'table' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'}`}>
            📊 Tabla Comparativa
          </button>
        </div>
        <span className="text-xs font-mono text-slate-500 hidden md:inline">Dualidad Espacio-Tiempo (Sección 2.5)</span>
      </div>

      {/* Main Content View */}
      {view === 'diagram' ? (
        <div className="flex-1 rounded-2xl border border-purple-500/30 bg-slate-900 p-3 flex flex-col md:flex-row gap-4 min-h-0 overflow-hidden">
          {/* Diagram Image Container */}
          <div className="shrink-0 md:w-[420px] bg-slate-950 rounded-xl p-3 border border-slate-800/80 flex items-center justify-center min-h-0 relative group">
            <div className="bg-white rounded-xl p-2.5 shadow-xl max-h-full flex items-center justify-center">
              <img
                src="/vector_arch.png"
                alt="Arquitectura Vectorial Clásica VMIPS / CRAY-1"
                className="max-h-[330px] w-auto object-contain rounded"
              />
            </div>
          </div>

          {/* Explanation sidebar */}
          <div className="flex-1 min-w-0 flex flex-col gap-2 overflow-y-auto pr-1">
            <h4 className="text-xs font-bold font-mono text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
              <Activity size={16} /> Componentes Clave
            </h4>
            
            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-cyan-300 font-mono block">1. Vector Registers</span>
              <p className="text-slate-400 leading-relaxed">Bancos de registros capaces de almacenar vectores completos de datos contiguos.</p>
            </div>

            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-amber-300 font-mono block">2. Scalar Registers</span>
              <p className="text-slate-400 leading-relaxed">Registros tradicionales para operandos individuales y punteros de control.</p>
            </div>

            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-emerald-300 font-mono block">3. Vector Load/Store Unit</span>
              <p className="text-slate-400 leading-relaxed">Unidad dedicada a la transferencia masiva y ordenada entre RAM y los registros vectoriales.</p>
            </div>

            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-purple-300 font-mono block">4. Functional Units Segmentadas</span>
              <p className="text-slate-400 leading-relaxed">ALUs independientes (FP Add, Multiply, Divide, Integer, Logical) operando en pipeline continuo.</p>
            </div>
          </div>
        </div>
      ) : view === 'array' ? (
        <div className="flex-1 rounded-2xl border border-amber-500/30 bg-slate-900 p-4 flex flex-col gap-3 min-h-0 overflow-hidden">
          {/* Control Unit */}
          <div className="flex justify-center">
            <div className="px-6 py-2.5 rounded-xl bg-amber-500/20 border-2 border-amber-400 text-amber-300 font-mono font-bold text-sm shadow-lg shadow-amber-500/10 flex items-center gap-2">
              <span className="text-base">⚙️</span> Unidad de Control Única <span className="text-amber-500/80 text-[11px]">(broadcast de la instrucción)</span>
            </div>
          </div>

          {/* Arrow visualization */}
          <div className="flex justify-center gap-6 md:gap-10 text-amber-500/50 font-mono text-base leading-none select-none">
            {'↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓'.split(' ').map((a, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 + i * 0.04 }}>
                {a}
              </motion.span>
            ))}
          </div>

          {/* PEs Grid */}
          <div className="flex-1 grid grid-cols-4 gap-2.5 min-h-0">
            {[3.14, 2.71, 1.41, 0.57, 4.20, 5.55, 6.28, 7.89].map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                className="rounded-xl bg-slate-950 border-2 border-amber-500/40 flex flex-col items-center justify-center gap-0.5 p-2 shadow-md shadow-amber-500/5">
                <span className="text-[10px] font-mono text-amber-400 font-bold">PE{i}</span>
                <span className="text-base font-mono font-bold text-amber-300">{val}</span>
                <span className="text-[9px] text-slate-500 font-mono">dato{i}</span>
              </motion.div>
            ))}
          </div>

          {/* Info panels */}
          <div className="shrink-0 grid grid-cols-1 md:grid-cols-3 gap-2 text-[12px]">
            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">
              <span className="font-bold text-amber-300 font-mono block mb-1 text-[11px]">Idea clave</span>
              N unidades de procesamiento independientes, todas ejecutan la MISMA instrucción simultáneamente, cada una con su propio dato.
            </div>
            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">
              <span className="font-bold text-amber-300 font-mono block mb-1 text-[11px]">Tradeoff</span>
              Mucho hardware (N ALUs completas) → alto costo en silicio, pero latencia mínima (todos arrancan juntos en el mismo ciclo).
            </div>
            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">
              <span className="font-bold text-amber-300 font-mono block mb-1 text-[11px]">Ejemplos</span>
              ILLIAC IV (64 PEs, años 60) · Connection Machine CM-2 · systolic arrays modernos.
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-3 min-h-0">
          {/* Dual description */}
          <div className="shrink-0 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-1.5">
              <h4 className="text-xs font-bold text-amber-400 flex items-center gap-2"><Layers size={16} /> Array Processor <span className="text-[11px] font-mono text-amber-500">(Espacio)</span></h4>
              <p className="text-xs text-slate-300">Múltiples PEs físicos independientes operando exactamente en el mismo ciclo de reloj.</p>
              <div className="p-2 bg-slate-950 rounded-xl font-mono text-[11px] text-amber-300 border border-slate-800">
                • 4 obreros trabajando al mismo tiempo<br />
                • GPUs · Connection Machine CM-2
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-purple-500/30 space-y-1.5">
              <h4 className="text-xs font-bold text-purple-400 flex items-center gap-2"><Activity size={16} /> Vector Processor <span className="text-[11px] font-mono text-purple-500">(Tiempo)</span></h4>
              <p className="text-xs text-slate-300">Un pipeline segmentado que procesa elementos en pasos consecutivos usando el mismo circuito físico.</p>
              <div className="p-2 bg-slate-950 rounded-xl font-mono text-[11px] text-purple-300 border border-slate-800">
                • Línea de ensamblaje de fábrica<br />
                • CRAY-1 (1976) · procesadores vectoriales
              </div>
            </div>
          </div>

          {/* Comparison table */}
          <div className="flex-1 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900/90 text-xs">
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
          </div>
        </div>
      )}
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
          <h4 className="text-[12px] font-bold text-emerald-400 flex items-center gap-2 shrink-0"><CheckCircle2 size={18} /> Ventajas Principales (Sección 2.7)</h4>
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
          <h4 className="text-[12px] font-bold text-cyan-400 flex items-center gap-2 shrink-0"><Layers size={18} /> Requisitos para el Paralelismo Vectorial</h4>
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

/* ───────── Slide 2.6 — Divergencia Condicional (La Kryptonita) ───────── */

export function Slide2_Divergencia() {
  const [view, setView] = useState('demo');
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: '1. Array de entrada',
      values: [3, -1, 4, -2],
      mask: [true, true, true, true],
      desc: 'Cargamos 4 elementos en un registro XMM (SIMD de 4 lanes). Todos los lanes estan activos.'
    },
    {
      title: '2. Evaluar condicion (a[i] > 0)',
      values: ['?', '?', '?', '?'],
      mask: [true, false, true, false],
      desc: 'La condicion se evalua en paralelo en todas las lanes. Se genera el vector VMASK: 1 = TRUE, 0 = FALSE.'
    },
    {
      title: '3. Ejecutar RAMA TRUE (a*2) en TODAS las lanes',
      values: [6, -2, 8, -4],
      mask: [true, false, true, false],
      desc: 'La ALU ejecuta a*2 en TODAS las lanes, incluso donde no aplica. ⚡ Se desperdicia el calculo de las lanes 1 y 3.'
    },
    {
      title: '4. Ejecutar RAMA FALSE (=0) en TODAS las lanes',
      values: [0, 0, 0, 0],
      mask: [false, true, false, true],
      desc: 'La ALU ejecuta =0 en TODAS las lanes. 💸 Pagamos el costo de las DOS operaciones pero solo usamos la mitad.'
    },
    {
      title: '5. Combinar con VMASK → RESULTADO FINAL',
      values: [6, 0, 8, 0],
      mask: [true, true, true, true],
      desc: 'VMASK selecciona: resultado de TRUE donde mask=1, resultado de FALSE donde mask=0. ¡Resultado correcto, pero pagamos el DOBLE de operaciones!'
    },
  ];

  const current = steps[step];

  const next = () => {
    if (step < steps.length - 1) setStep(s => s + 1);
    else setStep(0);
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 max-w-6xl mx-auto">
      {/* Top Selector */}
      <div className="shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => { setView('demo'); setStep(0); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${view === 'demo' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'}`}>
            🎯 Demostración paso a paso
          </button>
          <button
            onClick={() => setView('impact')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${view === 'impact' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'}`}>
            📊 Impacto numérico
          </button>
        </div>
        <span className="text-xs font-mono text-slate-500 hidden md:inline">La Kryptonita del SIMD</span>
      </div>

      {view === 'demo' ? (
        <div className="flex-1 flex flex-col gap-3 min-h-0">
          {/* Rule card */}
          <div className="shrink-0 p-3 rounded-xl bg-slate-900 border border-rose-500/30 text-center">
            <span className="text-[13px] font-mono text-rose-300">
              Regla: <span className="font-bold">{'b[i] = (a[i] > 0) ? a[i]*2 : 0'}</span>
            </span>
          </div>

          {/* Main demo area */}
          <div className="flex-1 rounded-2xl bg-slate-900 border border-rose-500/30 p-4 flex flex-col gap-3 min-h-0">
            {/* Step header */}
            <div className="shrink-0 flex items-center justify-between">
              <span className="text-xs font-mono text-rose-400 font-bold flex items-center gap-2">
                <ShieldAlert size={16} /> {current.title}
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Paso {step + 1} / {steps.length}</span>
            </div>

            {/* 4-lane visualization */}
            <div className="flex-1 grid grid-cols-4 gap-3 min-h-0 items-center">
              {current.values.map((val, i) => (
                <motion.div
                  key={`${step}-${i}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.08 }}
                  className={`rounded-xl border-2 p-3 flex flex-col items-center justify-center gap-2 ${
                    current.mask[i]
                      ? 'bg-slate-950 border-rose-500/40 shadow-md shadow-rose-500/10'
                      : 'bg-slate-950/50 border-slate-700/40 opacity-40'
                  }`}>
                  <span className="text-[10px] font-mono text-slate-500">Lane {i}</span>
                  <span className={`text-2xl font-bold font-mono ${
                    current.mask[i] ? 'text-rose-300' : 'text-slate-600'
                  }`}>
                    {typeof val === 'number' ? val : '?'}
                  </span>
                  <div className={`w-8 h-6 rounded text-[10px] font-mono font-bold flex items-center justify-center ${
                    current.mask[i]
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-800 text-slate-600 border border-slate-700'
                  }`}>
                    {current.mask[i] ? 'M=1' : 'M=0'}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Description */}
            <div className="shrink-0 p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[13px] text-slate-300 text-center leading-relaxed">
              {current.desc}
            </div>
          </div>

          {/* Navigation */}
          <div className="shrink-0 flex justify-center gap-4">
            <button
              onClick={next}
              className="px-6 py-2 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-300 font-bold text-xs font-mono hover:bg-rose-500/30 transition-all shadow-lg">
              {step < steps.length - 1 ? 'Siguiente paso →' : '🔄 Repetir'}
            </button>
          </div>
        </div>
      ) : (
        /* ─── Impacto numérico view ─── */
        <div className="flex-1 flex flex-col gap-3 min-h-0">
          {/* Table */}
          <div className="flex-1 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900/90">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950 text-slate-500">
                  <th className="p-2 font-bold">Situación</th>
                  <th className="p-2 font-bold text-rose-400">Lanes útiles</th>
                  <th className="p-2 font-bold text-rose-400">Speedup teórico (AVX2, 8 lanes)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                <tr>
                  <td className="p-2 text-slate-300">Sin divergencia (100% misma operación)</td>
                  <td className="p-2 text-emerald-400 font-semibold">8 de 8</td>
                  <td className="p-2 text-emerald-400 font-semibold">8x</td>
                </tr>
                <tr>
                  <td className="p-2 text-slate-300">50% divergencia (mitad de cada rama)</td>
                  <td className="p-2 text-amber-400 font-semibold">4 de 8</td>
                  <td className="p-2 text-amber-400 font-semibold">~4x</td>
                </tr>
                <tr>
                  <td className="p-2 text-slate-300">25% divergencia</td>
                  <td className="p-2 text-amber-400 font-semibold">6 de 8</td>
                  <td className="p-2 text-amber-400 font-semibold">~6x</td>
                </tr>
                <tr>
                  <td className="p-2 text-slate-300">Divergencia + datos no alineados</td>
                  <td className="p-2 text-rose-400 font-semibold">variable</td>
                  <td className="p-2 text-rose-400 font-semibold">&lt;2x o peor que escalar</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Key insight */}
          <div className="shrink-0 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-[13px] text-rose-200 leading-relaxed">
            💡 <span className="font-bold">Regla práctica:</span> cada condicional <span className="font-mono">if/else</span> dentro de un loop que esperas vectorizar te come ~50% del speedup teórico. Si encadenas varios condicionales, SIMD pierde sentido.
          </div>

          {/* Branchless tip */}
          <div className="shrink-0 p-3 rounded-xl bg-slate-900 border border-slate-800 text-[13px] text-slate-300 leading-relaxed">
            <span className="font-bold text-cyan-400">Truco branchless:</span> se puede reescribir como <span className="font-mono text-amber-300">b[i] = max(a[i] * 2, 0)</span> para evitar el <span className="font-mono">if</span> explícito y recuperar velocidad de vectorización.
          </div>

          {/* Oral version */}
          <div className="shrink-0 p-3 rounded-xl bg-slate-900 border border-amber-500/30 text-[13px] text-slate-300 leading-relaxed italic">
            "La kryptonita de SIMD es la divergencia condicional. Cuando algunos elementos necesitan una operación y otros otra, el hardware no puede apagar lanes: ejecuta ambas ramas para todos y enmascara las que no corresponden. Pagaste el doble de operaciones pero usaste la mitad."
          </div>
        </div>
      )}
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
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 2.4: Ventajas del Procesamiento Vectorial</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 2.5: Código Secuencial vs Vectorial</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-rose-400 font-semibold">• Slide 2.6: ⚡ Divergencia Condicional (Kryptonita)</div>
      </div>
    </div>
  );
}
