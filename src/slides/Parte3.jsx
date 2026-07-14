import React, { useState } from 'react';
import { motion } from 'framer-motion';

// ==========================================
// === PARTE 3 — Alejandro Andy ===
// ==========================================

/* ───────── Slide 3.1 — Evolución SIMD ───────── */

export function Slide3_1() {
  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      <div className="card-responsive bg-slate-900 border border-cyan-500/30 text-slate-300">
        <span className="font-bold text-cyan-400">Caso Real (Intel Atom 2009):</span> Sin extensiones SIMD, la CPU se saturaba al 100% procesando video HD. Con SSE habilitado, el mismo chip lo manejaba al 40%.
      </div>

      <div className="gap-responsive flex flex-col">
        <div className="card-responsive bg-slate-900 border border-slate-800 flex justify-between items-center"><span className="text-blue-400 font-bold">1996 · MMX (64 Bits)</span> <span className="text-sm-responsive">8x int8 (Reutilizaba registros FPU)</span></div>
        <div className="card-responsive bg-slate-900 border border-slate-800 flex justify-between items-center"><span className="text-cyan-400 font-bold">1999 · SSE (128 Bits)</span> <span className="text-sm-responsive">4x Float32 (Nuevos registros XMM)</span></div>
        <div className="card-responsive bg-slate-900 border border-slate-800 flex justify-between items-center"><span className="text-purple-400 font-bold">2010 · AVX (256 Bits)</span> <span className="text-sm-responsive">8x Float32 / 4x Double64 (Registros YMM)</span></div>
        <div className="card-responsive bg-slate-900 border border-slate-800 flex justify-between items-center"><span className="text-amber-400 font-bold">2017 · AVX-512 (512 Bits)</span> <span className="text-sm-responsive">16x Float32 + Regs de Máscara k0-k7</span></div>
      </div>
    </div>
  );
}

/* ───────── Slide 3.2 — Subword Parallelism ───────── */

export function Slide3_2() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto text-center">
      <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/40">
        <h4 className="text-sm-responsive font-bold text-amber-300">Subword Parallelism</h4>
        <p className="text-sm-responsive text-slate-300 mt-1">Un solo sumador físico de 256 bits se particiona ajustando la lógica de acarreo interna según la instrucción.</p>
      </div>

      <div className="space-y-2 text-sm-responsive font-mono text-left">
        <div className="text-cyan-400 font-bold">• Particionado como 8×32-bit (Floats en VADDPS)</div>
        <div className="grid grid-cols-8 gap-1 text-center font-bold">
          {[...Array(8)].map((_, i) => <div key={i} className="p-2 rounded bg-cyan-500/20 border border-cyan-500 dark:border-cyan-400 text-cyan-700 dark:text-cyan-300">+32</div>)}
        </div>
        <div className="text-amber-400 font-bold pt-2">• Particionado como 16×16-bit (Shorts para audio DSP en PADDW)</div>
        <div className="grid grid-cols-16 gap-0.5 text-center text-[12px] font-bold">
          {[...Array(16)].map((_, i) => <div key={i} className="p-1 rounded bg-amber-500/20 border border-amber-500 dark:border-amber-400 text-amber-700 dark:text-amber-300">+16</div>)}
        </div>
        <div className="text-purple-700 dark:text-purple-400 font-bold pt-2">• Particionado como 32×8-bit (Bytes para píxeles RGB en PADDB)</div>
        <div className="grid grid-cols-[repeat(32,minmax(0,1fr))] gap-0.5 text-center text-[11px] font-bold">
          {[...Array(32)].map((_, i) => <div key={i} className="p-1 rounded bg-purple-500/20 border border-purple-500 dark:border-purple-400 text-purple-700 dark:text-purple-300">+8</div>)}
        </div>
      </div>
    </div>
  );
}

/* ───────── Slide 3.3 — Instrucciones SSE y AVX ───────── */

export function Slide3_3() {
  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      {/* SSE instructions table */}
      <div className="rounded-2xl bg-slate-900 border border-cyan-500/30 overflow-hidden">
        <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 text-sm-responsive font-bold text-cyan-400 font-mono flex items-center gap-2">
          <span className="text-sm-responsive px-1.5 py-0.5 bg-cyan-500/20 rounded">SSE</span> Instrucciones básicas — Registros XMM (128 bits) · 4 × float32
        </div>
        <div className="p-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm-responsive font-mono">
          <div className="flex items-center gap-2"><span className="text-xs text-slate-700 w-4 shrink-0 text-right">①</span><span className="text-cyan-300 font-bold drop-shadow-[0_0_4px_rgba(6,182,212,0.5)]">MOVAPS</span> <span className="text-slate-400">xmm0, [mem]</span> <span className="text-slate-600 ml-auto">; cargar 4 floats alineados</span></div>
          <div className="flex items-center gap-2"><span className="text-xs text-slate-700 w-4 shrink-0 text-right">②</span><span className="text-cyan-300 font-bold drop-shadow-[0_0_4px_rgba(6,182,212,0.5)]">ADDPS</span> <span className="text-slate-400">xmm0, xmm1</span> <span className="text-slate-600 ml-auto">; sumar 4 floats</span></div>
          <div className="flex items-center gap-2"><span className="text-xs text-slate-700 w-4 shrink-0 text-right">③</span><span className="text-cyan-300 font-bold drop-shadow-[0_0_4px_rgba(6,182,212,0.5)]">MULPS</span> <span className="text-slate-400">xmm0, xmm1</span> <span className="text-slate-600 ml-auto">; multiplicar 4 floats</span></div>
          <div className="flex items-center gap-2"><span className="text-xs text-slate-700 w-4 shrink-0 text-right">④</span><span className="text-cyan-300 font-bold drop-shadow-[0_0_4px_rgba(6,182,212,0.5)]">SUBPS</span> <span className="text-slate-400">xmm0, xmm1</span> <span className="text-slate-600 ml-auto">; restar 4 floats</span></div>
          <div className="flex items-center gap-2"><span className="text-xs text-slate-700 w-4 shrink-0 text-right">⑤</span><span className="text-cyan-300 font-bold drop-shadow-[0_0_4px_rgba(6,182,212,0.5)]">DIVPS</span> <span className="text-slate-400">xmm0, xmm1</span> <span className="text-slate-600 ml-auto">; dividir 4 floats</span></div>
        </div>
      </div>

      {/* AVX instructions */}
      <div className="rounded-2xl bg-slate-900 border border-purple-500/30 overflow-hidden">
        <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 text-sm-responsive font-bold text-purple-400 font-mono flex items-center gap-2">
          <span className="text-sm-responsive px-1.5 py-0.5 bg-purple-500/20 rounded">AVX</span> Instrucciones avanzadas — Registros YMM (256 bits) · 8 × float32
        </div>
        <div className="p-3 text-sm-responsive font-mono space-y-2">
          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
            <div className="flex items-center gap-2"><span className="text-xs text-slate-500 dark:text-slate-700 w-4 shrink-0 text-right">①</span><span className="text-fuchsia-700 dark:text-fuchsia-300 font-bold drop-shadow-[0_0_4px_rgba(217,70,239,0.5)]">VMOVAPD</span> <span className="text-slate-600 dark:text-slate-400">ymm, [mem]</span> <span className="text-slate-500 dark:text-slate-600 ml-auto">; mover 4 doubles</span></div>
            <div className="flex items-center gap-2"><span className="text-xs text-slate-500 dark:text-slate-700 w-4 shrink-0 text-right">②</span><span className="text-fuchsia-700 dark:text-fuchsia-300 font-bold drop-shadow-[0_0_4px_rgba(217,70,239,0.5)]">VADDPD</span> <span className="text-slate-600 dark:text-slate-400">ymm, ymm, ymm</span> <span className="text-slate-500 dark:text-slate-600 ml-auto">; sumar 4 doubles</span></div>
            <div className="flex items-center gap-2"><span className="text-xs text-slate-500 dark:text-slate-700 w-4 shrink-0 text-right">③</span><span className="text-fuchsia-700 dark:text-fuchsia-300 font-bold drop-shadow-[0_0_4px_rgba(217,70,239,0.5)]">VBROADCASTSD</span> <span className="text-slate-600 dark:text-slate-400">ymm, [r64]</span> <span className="text-slate-500 dark:text-slate-600 ml-auto">; escalar → vector</span></div>
            <div className="flex items-center gap-2 relative">
              <span className="text-xs text-slate-500 dark:text-slate-700 w-4 shrink-0 text-right">④</span>
              <motion.span
                animate={{ textShadow: ['0 0 4px rgba(52,211,153,0.4)', '0 0 12px rgba(52,211,153,0.8)', '0 0 4px rgba(52,211,153,0.4)'] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-emerald-700 dark:text-emerald-300 font-bold"
              >VFMADDPD</motion.span>
              <span className="text-slate-600 dark:text-slate-400">ymm, ymm, ymm, ymm</span>
              <span className="text-emerald-700/80 dark:text-emerald-400/80 text-[13px] ml-auto font-bold drop-shadow-[0_0_6px_rgba(52,211,153,0.5)]">★ FMA: a*b + c en 1 ciclo</span>
            </div>
          </div>
          <div className="p-2 bg-slate-950 rounded-xl border border-purple-500/20 text-sm-responsive text-slate-400 leading-relaxed">
            <span className="text-fuchsia-300">Ejemplo:</span> <span className="text-slate-500">C[0..3] = A[0..3] × B[0..3] + D[0..3]</span>
          </div>
        </div>
      </div>

      <p className="text-sm-responsive text-slate-400 text-center">FMA (Fused Multiply-Add) es la instrucción clave en Inteligencia Artificial: 2 operaciones por ciclo.</p>
    </div>
  );
}

/* ───────── Slide 3.4 — Fetch-Decode-Execute en SIMD ───────── */

export function Slide3_FDE_SIMD() {
  const stages = [
    { name: 'FETCH', color: 'border-cyan-500 dark:border-cyan-400 text-cyan-700 dark:text-cyan-300', bg: 'bg-cyan-500/10',
      desc: 'La CU busca VADDPD en el instruction cache. Es 1 instrucción que la CPU sabe que opera sobre 256 bits.',
      example: 'Dirección: 0x40060A',
      detail: '1 instrucción cargada' },
    { name: 'DECODE', color: 'border-blue-400 text-blue-300', bg: 'bg-blue-500/10',
      desc: 'Decodifica el opcode: "suma 4 doubles". Identifica operandos: YMM1 (resultados ×2.5), Y → YMM2.',
      example: 'YMM1=[2.5,5.0,7.5,10.0] + Y=[10,20,30,40]',
      detail: '1 decode → 4 ops efectivas' },
    { name: 'EXECUTE', color: 'border-amber-500 dark:border-amber-400 text-amber-700 dark:text-amber-300', bg: 'bg-amber-500/10',
      desc: 'Los 4 sumadores de 64 bits se activan simultáneamente. En vector processor: pipelineado.',
      example: '⊕2.5+10=12.5 | ⊕5.0+20=25.0 | ⊕7.5+30=37.5 | ⊕10.0+40=50.0',
      detail: '4 ALUs activas en paralelo' },
    { name: 'WRITEBACK', color: 'border-purple-500 dark:border-purple-400 text-purple-700 dark:text-purple-300', bg: 'bg-purple-500/10',
      desc: 'Los 256 bits del resultado se escriben de vuelta al banco de registros YMM en 1 operación.',
      example: 'YMM2 ← [12.5, 25.0, 37.5, 50.0]',
      detail: '256 bits en 1 write' },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-4 max-w-6xl mx-auto">
      <div className="shrink-0 flex items-center gap-3 px-2">
        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-400/30 text-sm-responsive font-mono text-amber-300">
          Instrucción: <span className="font-bold">VADDPD ymm2, ymm1, [Y]</span>
        </div>
        <div className="flex items-center gap-1 text-sm-responsive text-slate-600 font-mono">
          <span className="w-2 h-2 rounded-full bg-cyan-400" /> Pipeline SIMD
        </div>
      </div>

      {/* Stages */}
      <div className="flex-1 grid grid-cols-4 gap-3 min-h-0">
        {stages.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`flex flex-col rounded-2xl border-2 ${s.color} ${s.bg} overflow-hidden`}
          >
            <div className={`shrink-0 px-3 py-2 text-center font-bold font-mono text-sm-responsive border-b ${s.color} bg-slate-950/50`}>
              {i + 1}. {s.name}
            </div>
            <div className="flex-1 p-3 flex flex-col justify-between text-center">
              <p className="text-sm-responsive text-slate-300 leading-relaxed">{s.desc}</p>
              {s.example && (
                <div className={`px-2 py-1.5 rounded-lg bg-slate-950/50 border ${s.color.replace('text-', 'border-').replace('300', '400/40')}`}>
                  <p className={`text-xs-responsive font-mono font-bold ${s.color}`}>{s.example}</p>
                </div>
              )}
              <div className={`px-2 py-1 rounded-lg ${s.color.replace('text-', 'bg-').replace('300', '500/20')} border ${s.color.replace('text-', 'border-').replace('300', '400/30')}`}>
                <span className={`text-sm-responsive font-bold font-mono ${s.color}`}>◆ {s.detail}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison footer */}
      <div className="shrink-0 grid grid-cols-2 gap-3 text-sm-responsive font-mono">
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
          <span className="text-red-400 font-bold">SISD:</span> 1 Decode → 1 micro-op → 1 ALU → 1 resultado
        </div>
        <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-cyan-500/20 text-slate-600 dark:text-slate-400">
          <span className="text-cyan-700 dark:text-cyan-400 font-bold">SIMD:</span> 1 Decode → 1 instr → 4 ALUs activas → 4 resultados
        </div>
      </div>
    </div>
  );
}

/* ───────── Slide 3.5 — Encadenamiento Vectorial (Chaining) ───────── */

export function Slide3_Chaining() {
  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/40 text-center space-y-2">
        <span className="text-sm-responsive text-amber-400 font-mono font-bold uppercase tracking-widest">Sección 3.8 · CRAY-1 (Seymour Cray, 1976)</span>
        <h4 className="text-lg-responsive font-bold text-slate-100">Encadenamiento Vectorial (Vector Chaining)</h4>
        <p className="text-sm-responsive text-slate-300 max-w-3xl mx-auto">
          En una operación compuesta como <span className="font-mono text-cyan-300">(A × B) + C</span>, el encadenamiento permite que los resultados parciales de la ALU Multiplicadora pasen directo a la ALU Sumadora mediante un bus de forwarding interno sin esperar a que termine el vector completo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm-responsive font-mono">
        <div className="p-4 rounded-2xl bg-slate-900 border border-red-500/30 space-y-2">
          <h5 className="font-bold text-red-400 flex items-center gap-2">❌ Sin Chaining (Tradicional)</h5>
          <p className="text-slate-300 leading-relaxed">
            1. La ALU Multiplicadora procesa los N elementos del vector completo.<br/>
            2. Se escriben todos los resultados intermediarios en memoria o registros.<br/>
            3. Recién entonces la ALU Sumadora empieza a leer y sumar.<br/>
            <span className="text-red-700 dark:text-red-300 font-bold block mt-2">Latencia Alta: N × Mul + N × Add</span>
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-500/40 space-y-2">
          <h5 className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">✓ Con Chaining (CRAY-1 / FMA)</h5>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            1. En cuanto sale el primer producto parcial <span className="text-cyan-700 dark:text-cyan-300">A[0]×B[0]</span>, pasa directamente a la ALU Sumadora.<br/>
            2. Ambas ALUs operan en cascada simultánea (pipeline cruzado).<br/>
            3. Avance continuo de elementos.<br/>
            <span className="text-emerald-700 dark:text-emerald-300 font-bold block mt-2">Latencia Mínima: Antepasado directo de FMA</span>
          </p>
        </div>
      </div>

      <div className="p-3 bg-amber-500/10 border border-amber-400/30 rounded-xl text-center text-amber-300 font-mono text-sm-responsive">
        💡 <span className="font-bold">Importancia Histórica y Moderna:</span> CRAY-1 demostró que el pipelining cruzado entre ALUs multiplica la velocidad sin aumentar los registros. En procesadores modernos x86/ARM, este principio dio origen a la instrucción nativa <span className="text-emerald-300 font-bold font-mono">FMA (Fused Multiply-Add)</span>.
      </div>
    </div>
  );
}

/* ───────── Slide 3.6 — Excavator vs Zen ───────── */

export function Slide3_4() {
  const [highlighted, setHighlighted] = useState(null);

  return (
    <div className="w-full h-full flex flex-col gap-4 max-w-7xl mx-auto px-3 sm:px-6">
      {/* Title */}
      <div className="text-center shrink-0">
        <h2 className="text-title text-slate-100">Comparación Arquitectónica: AMD Excavator vs Zen</h2>
        <p className="text-sm-responsive text-slate-400 mt-1">Unidad FP para AVX-256</p>
      </div>

      {/* Main comparison grid - 2 columns side by side */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
        {/* EXCAVATOR - Left */}
        <motion.div
          onHoverStart={() => setHighlighted('excavator')}
          onHoverEnd={() => setHighlighted(null)}
          animate={{ scale: highlighted === 'excavator' ? 1.02 : 1 }}
          className="bg-gradient-to-br from-purple-950 to-slate-900 border-2 border-purple-500/40 rounded-lg lg:rounded-2xl p-3 lg:p-4 flex flex-col gap-2 lg:gap-3"
        >
          <div className="text-center pb-2 border-b border-purple-500/30">
            <h3 className="text-base-responsive lg:text-lg-responsive font-bold text-purple-300">AMD Excavator</h3>
            <p className="text-xs-responsive text-purple-400 font-mono mt-0.5">Pre-2017: 2×128-bit coordinadas</p>
          </div>

          {/* Horizontal flow: 5 columns */}
          <div className="flex-1 flex items-center justify-center gap-1 lg:gap-2 overflow-x-auto">
            {/* Col 1: Input */}
            <div className="flex-shrink-0 text-center">
              <div className="px-2 lg:px-3 py-1 lg:py-2 rounded-lg bg-purple-500/20 border border-purple-400/30 inline-block">
                <p className="text-xs-responsive lg:text-sm-responsive font-mono text-purple-300 font-bold">AVX-256</p>
                <p className="text-xs text-purple-400 font-mono mt-0.5">0-255</p>
              </div>
            </div>

            {/* Col 2: Arrow */}
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex-shrink-0 text-lg lg:text-2xl text-purple-400 font-bold"
            >
              →
            </motion.div>

            {/* Col 3: FMAC units stacked compact */}
            <div className="flex-shrink-0 space-y-1 flex flex-col">
              <motion.div
                animate={{ borderColor: highlighted === 'excavator' ? ['rgba(168, 85, 247, 0.6)', 'rgba(168, 85, 247, 1)', 'rgba(168, 85, 247, 0.6)'] : 'rgba(168, 85, 247, 0.4)' }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="p-1.5 lg:p-2 rounded-lg bg-slate-900 border-2 text-center"
              >
                <p className="text-xs lg:text-sm font-bold text-purple-300">FMAC #0</p>
                <p className="text-xs text-slate-400 font-mono">0-127</p>
              </motion.div>
              <motion.div
                animate={{ borderColor: highlighted === 'excavator' ? ['rgba(168, 85, 247, 0.6)', 'rgba(168, 85, 247, 1)', 'rgba(168, 85, 247, 0.6)'] : 'rgba(168, 85, 247, 0.4)' }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="p-1.5 lg:p-2 rounded-lg bg-slate-900 border-2 text-center"
              >
                <p className="text-xs lg:text-sm font-bold text-purple-300">FMAC #1</p>
                <p className="text-xs text-slate-400 font-mono">128-255</p>
              </motion.div>
            </div>

            {/* Col 4: Arrow */}
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
              className="flex-shrink-0 text-lg lg:text-2xl text-purple-400 font-bold"
            >
              →
            </motion.div>

            {/* Col 5: Result */}
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}
              className="flex-shrink-0 text-center"
            >
              <div className="px-2 lg:px-3 py-1 lg:py-2 rounded-lg bg-purple-600/20 border border-purple-400/40 inline-block">
                <p className="text-xs-responsive font-mono text-purple-300 font-bold">Resultado</p>
                <p className="text-xs text-slate-500">⚠ latencia</p>
              </div>
            </motion.div>
          </div>

          <div className="text-center text-xs text-purple-400 font-mono">
            2 unidades + coordinación = overhead
          </div>
        </motion.div>

        {/* ZEN - Right */}
        <motion.div
          onHoverStart={() => setHighlighted('zen')}
          onHoverEnd={() => setHighlighted(null)}
          animate={{ scale: highlighted === 'zen' ? 1.02 : 1 }}
          className="bg-gradient-to-br from-orange-950 to-slate-900 border-2 border-orange-500/40 rounded-lg lg:rounded-2xl p-3 lg:p-4 flex flex-col gap-2 lg:gap-3"
        >
          <div className="text-center pb-2 border-b border-orange-500/30">
            <h3 className="text-base-responsive lg:text-lg-responsive font-bold text-orange-300">AMD Zen</h3>
            <p className="text-xs-responsive text-orange-400 font-mono mt-0.5">2017+: 1×256-bit nativa</p>
          </div>

          {/* Horizontal flow: 5 columns */}
          <div className="flex-1 flex items-center justify-center gap-1 lg:gap-2 overflow-x-auto">
            {/* Col 1: Input */}
            <div className="flex-shrink-0 text-center">
              <div className="px-2 lg:px-3 py-1 lg:py-2 rounded-lg bg-orange-500/20 border border-orange-400/30 inline-block">
                <p className="text-xs-responsive lg:text-sm-responsive font-mono text-orange-300 font-bold">AVX-256</p>
                <p className="text-xs text-orange-400 font-mono mt-0.5">0-255</p>
              </div>
            </div>

            {/* Col 2: Arrow */}
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="flex-shrink-0 text-lg lg:text-2xl text-orange-400 font-bold"
            >
              →
            </motion.div>

            {/* Col 3: Scheduler */}
            <motion.div
              animate={{ borderColor: highlighted === 'zen' ? ['rgba(234, 88, 12, 0.6)', 'rgba(234, 88, 12, 1)', 'rgba(234, 88, 12, 0.6)'] : 'rgba(234, 88, 12, 0.4)' }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex-shrink-0 p-2 lg:p-3 rounded-lg bg-slate-900 border-2 text-center"
            >
              <p className="text-xs lg:text-sm font-bold text-orange-300">Scheduler</p>
              <p className="text-xs text-slate-400">1 unit</p>
            </motion.div>

            {/* Col 4: Arrow */}
            <motion.div
              animate={{ x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
              className="flex-shrink-0 text-lg lg:text-2xl text-orange-400 font-bold"
            >
              →
            </motion.div>

            {/* Col 5: Result */}
            <motion.div
              animate={{
                y: [0, -2, 0],
                boxShadow: ['0 0 0 rgba(234, 88, 12, 0)', '0 0 15px rgba(234, 88, 12, 0.3)', '0 0 0 rgba(234, 88, 12, 0)']
              }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.6 }}
              className="flex-shrink-0 text-center"
            >
              <div className="px-2 lg:px-3 py-1 lg:py-2 rounded-lg bg-orange-600/20 border border-orange-400/40 inline-block">
                <p className="text-xs-responsive font-mono text-orange-300 font-bold">Resultado</p>
                <p className="text-xs text-orange-400">✓ eficiente</p>
              </div>
            </motion.div>
          </div>

          <div className="text-center text-xs text-orange-400 font-mono">
            1 unidad = pipeline óptimo
          </div>
        </motion.div>
      </div>

      {/* Comparison footer */}
      <div className="shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3 text-xs lg:text-sm font-mono">
        <motion.div
          animate={{ borderColor: highlighted === 'excavator' ? 'rgba(168, 85, 247, 1)' : 'rgba(168, 85, 247, 0.3)' }}
          className="p-2 lg:p-3 rounded-lg lg:rounded-xl bg-slate-900 border-2 text-slate-300"
        >
          <span className="text-purple-400 font-bold">Excavator:</span> <span className="text-xs">2 coordinadas + overhead</span>
        </motion.div>
        <motion.div
          animate={{ borderColor: highlighted === 'zen' ? 'rgba(234, 88, 12, 1)' : 'rgba(234, 88, 12, 0.3)' }}
          className="p-2 lg:p-3 rounded-lg lg:rounded-xl bg-slate-900 border-2 text-slate-300"
        >
          <span className="text-orange-400 font-bold">Zen:</span> <span className="text-xs">1 nativa = eficiente</span>
        </motion.div>
      </div>
    </div>
  );
}

/* ───────── Slide 3.Organizacion — Organización de Datos Empaquetados (Sección 3.4) ───────── */

export function Slide3_OrganizacionDatos() {
  const [format, setFormat] = useState('float32');

  const formats = {
    float32: { name: '8× Float (32-bit)', count: 8, color: 'border-cyan-500 dark:border-cyan-400 bg-cyan-500/20 text-cyan-700 dark:text-cyan-300', desc: 'Ideal para gráficos 3D, física y procesamiento de audio/imágenes estandar.' },
    double64: { name: '4× Double (64-bit)', count: 4, color: 'border-emerald-500 dark:border-emerald-400 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300', desc: 'Simulaciones científicas de alta precisión y cálculo financiero.' },
    int16: { name: '16× Short (16-bit)', count: 16, color: 'border-purple-500 dark:border-purple-400 bg-purple-500/20 text-purple-700 dark:text-purple-300', desc: 'Procesamiento de muestras de audio y sensores DSP.' },
    byte8: { name: '32× Byte (8-bit)', count: 32, color: 'border-amber-500 dark:border-amber-400 bg-amber-500/20 text-amber-700 dark:text-amber-300', desc: 'Procesamiento de píxeles RGBA (0-255) y redes neuronales cuantizadas (INT8).' }
  };

  const f = formats[format];

  return (
    <div className="w-full h-full flex flex-col gap-4 max-w-6xl mx-auto">
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="text-sm-responsive font-bold text-slate-200 font-mono">
            Organización de Datos Empaquetados en Registro YMM (256 Bits) · Sección 3.4
          </h4>
          <div className="flex gap-2">
            {Object.keys(formats).map(key => (
              <button
                key={key}
                onClick={() => setFormat(key)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all border ${format === key ? formats[key].color : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Visual representation of 256-bit register */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs-responsive font-mono text-slate-500 px-1">
            <span>Bit 255 (MSB)</span>
            <span>Registro YMM (256 Bits de Silicio)</span>
            <span>Bit 0 (LSB)</span>
          </div>

          <div className="p-2 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto pb-2">
            <div className="grid gap-1.5 min-w-max" style={{ gridTemplateColumns: `repeat(${f.count}, minmax(42px, 1fr))` }}>
              {Array.from({ length: f.count }).map((_, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl border text-center font-mono text-xs-responsive font-bold transition-all whitespace-nowrap ${f.color}`}
                >
                  {f.count <= 8 ? `Elem [${f.count - 1 - i}]` : `[${f.count - 1 - i}]`}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between text-xs-responsive">
          <span className="text-slate-400">Formato activo: <span className="font-bold text-slate-200">{f.name}</span></span>
          <span className="text-slate-300 italic">{f.desc}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-sm-responsive space-y-1">
          <span className="text-cyan-400 font-bold font-mono block">32-bit Float</span>
          <span className="text-slate-400">8 elementos por instrucción en AVX (256-bit).</span>
        </div>
        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[13px] space-y-1">
          <span className="text-emerald-700 dark:text-emerald-400 font-bold font-mono block">64-bit Double</span>
          <span className="text-slate-600 dark:text-slate-400">4 elementos por instrucción en AVX (256-bit).</span>
        </div>
        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[13px] space-y-1">
          <span className="text-purple-700 dark:text-purple-400 font-bold font-mono block">16-bit Short</span>
          <span className="text-slate-600 dark:text-slate-400">16 elementos por instrucción en AVX-2 (256-bit).</span>
        </div>
        <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[13px] space-y-1">
          <span className="text-amber-700 dark:text-amber-400 font-bold font-mono block">8-bit Byte</span>
          <span className="text-slate-600 dark:text-slate-400">32 elementos por instrucción en AVX-2 (256-bit).</span>
        </div>
      </div>
    </div>
  );
}

/* ───────── Slide 3.6b — Data Flow Visualization ───────── */

/* ───────── Slide 3.9 — Video de Exposición Completa ───────── */

export function Slide3_9() {
  return (
    <div className="w-full h-full flex flex-col gap-8 max-w-7xl mx-auto text-center justify-center px-4 sm:px-8">
      {/* Header */}
      <div className="p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-cyan-500/15 to-blue-500/15 border-2 border-cyan-500/50 space-y-3">
        <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-100">Ver la Exposición Completa</h2>
        <p className="text-lg lg:text-xl text-slate-300">Arquitectura y Organización de Computadoras — Todas las Partes</p>
      </div>

      {/* Video Links Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* YouTube */}
        <a
          href="https://youtu.be/Q7UO6XdY3y8"
          target="_blank"
          rel="noopener noreferrer"
          className="group h-full p-8 lg:p-10 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-red-900/25 to-red-950/25 border-3 border-red-500/50 hover:border-red-500 hover:from-red-900/40 hover:to-red-950/40 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/30 flex flex-col items-center justify-center gap-4"
        >
          <div className="text-8xl lg:text-9xl">🎥</div>
          <h3 className="text-3xl lg:text-4xl font-extrabold text-red-300">YouTube</h3>
          <p className="text-base lg:text-lg text-slate-300 max-w-xs">Acceso público sin restricciones · Visualización directa</p>
          <div className="px-6 py-3 bg-red-500/20 border border-red-500/50 rounded-lg group-hover:bg-red-500/30 transition-all">
            <span className="text-sm lg:text-base font-mono font-bold text-red-400 group-hover:text-red-300">youtu.be/Q7UO6XdY3y8</span>
          </div>
        </a>

        {/* OneDrive */}
        <a
          href="https://upse-my.sharepoint.com/:v:/g/personal/andy_alejandrovera4290_upse_edu_ec/IQBpchQH5sjrT6L-7U7fovt2AXvuLnu9xc-3NDlZQLAH_bM?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=XNpJcd"
          target="_blank"
          rel="noopener noreferrer"
          className="group h-full p-8 lg:p-10 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-blue-900/25 to-blue-950/25 border-3 border-blue-500/50 hover:border-blue-500 hover:from-blue-900/40 hover:to-blue-950/40 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 flex flex-col items-center justify-center gap-4"
        >
          <div className="text-8xl lg:text-9xl">📁</div>
          <h3 className="text-3xl lg:text-4xl font-extrabold text-blue-300">OneDrive (UPSE)</h3>
          <p className="text-base lg:text-lg text-slate-300 max-w-xs">Versión institucional · SharePoint UPSE</p>
          <div className="px-6 py-3 bg-blue-500/20 border border-blue-500/50 rounded-lg group-hover:bg-blue-500/30 transition-all">
            <span className="text-sm lg:text-base font-mono font-bold text-blue-400 group-hover:text-blue-300">upse-my.sharepoint.com</span>
          </div>
        </a>
      </div>

      {/* Footer note */}
      <div className="p-5 lg:p-6 rounded-2xl bg-slate-950/80 border-2 border-slate-800 text-center">
        <span className="text-base lg:text-lg text-slate-300 font-semibold">✓ Mismo contenido en ambas plataformas — elige la que prefieras</span>
      </div>
    </div>
  );
}

/* ───────── Carátula de Sección: Parte 3 ───────── */

export function SlideIntroParte3() {
  return (
    <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-orange-500/10 border-2 border-amber-500/40 text-center space-y-6 max-w-3xl mx-auto shadow-2xl">
      <span className="px-4 py-1 bg-amber-500/20 text-amber-300 font-extrabold text-xs-responsive rounded-full border border-amber-400/30 uppercase tracking-widest">
        Expositor: Alejandro Andy · Parte 3
      </span>
      <h2 className="text-title font-extrabold text-slate-100">Extensiones SIMD Modernas (MMX, SSE, AVX)</h2>
      <div className="grid grid-cols-2 gap-3 text-left text-sm-responsive pt-2">
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 3.1: Evolución de Registros (1996-2017)</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 3.2: Subword Parallelism en Hardware</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 3.3: Instrucciones SSE y AVX + FMA</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 3.4: Organización de Datos Empaquetados</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 3.5: Práctica Assembler (SISD vs SSE)</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 3.6: Fetch-Decode-Execute Vectorial</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 3.7: Encadenamiento Vectorial (Chaining)</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 3.8: AMD Zen vs AMD Excavator</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 3.9: Enlaces de Video (YouTube y OneDrive)</div>
      </div>
    </div>
  );
}
