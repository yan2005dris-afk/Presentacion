import { motion } from 'framer-motion';

// ==========================================
// === PARTE 3 — Alejandro Andy ===
// ==========================================

/* ───────── Slide 3.1 — Evolución SIMD ───────── */

export function Slide3_1() {
  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-[13px] text-slate-300">
        <span className="font-bold text-cyan-400">Caso Real (Intel Atom 2009):</span> Sin extensiones SIMD, la CPU se saturaba al 100% procesando video HD. Con SSE habilitado, el mismo chip lo manejaba al 40%.
      </div>

      <div className="space-y-2 text-[13px] font-mono">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center"><span className="text-blue-400 font-bold">1996 · MMX (64 Bits)</span> <span>8x int8 (Reutilizaba registros FPU)</span></div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center"><span className="text-cyan-400 font-bold">1999 · SSE (128 Bits)</span> <span>4x Float32 (Nuevos registros XMM)</span></div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center"><span className="text-purple-400 font-bold">2010 · AVX (256 Bits)</span> <span>8x Float32 / 4x Double64 (Registros YMM)</span></div>
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex justify-between items-center"><span className="text-amber-400 font-bold">2017 · AVX-512 (512 Bits)</span> <span>16x Float32 + Regs de Máscara k0-k7</span></div>
      </div>
    </div>
  );
}

/* ───────── Slide 3.2 — Subword Parallelism ───────── */

export function Slide3_2() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto text-center">
      <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/40">
        <h4 className="text-sm font-bold text-amber-300">Subword Parallelism</h4>
        <p className="text-[13px] text-slate-300 mt-1">Un solo sumador físico de 256 bits se particiona ajustando la lógica de acarreo interna según la instrucción.</p>
      </div>

      <div className="space-y-2 text-[13px] font-mono text-left">
        <div className="text-cyan-400 font-bold">• Particionado como 8×32-bit (Floats en VADDPS)</div>
        <div className="grid grid-cols-8 gap-1 text-center font-bold">
          {[...Array(8)].map((_, i) => <div key={i} className="p-2 rounded bg-cyan-500/20 border border-cyan-400 text-cyan-300">+32</div>)}
        </div>
        <div className="text-purple-400 font-bold pt-2">• Particionado como 32×8-bit (Bytes para píxeles RGB en PADDB)</div>
        <div className="grid grid-cols-16 gap-0.5 text-center text-[13px] font-bold">
          {[...Array(16)].map((_, i) => <div key={i} className="p-1 rounded bg-purple-500/20 border border-purple-400 text-purple-300">+8</div>)}
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
        <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 text-[13px] font-bold text-cyan-400 font-mono flex items-center gap-2">
          <span className="text-[13px] px-1.5 py-0.5 bg-cyan-500/20 rounded">SSE</span> Instrucciones básicas — Registros XMM (128 bits) · 4 × float32
        </div>
        <div className="p-3 grid grid-cols-2 gap-x-6 gap-y-1.5 text-[13px] font-mono">
          <div className="flex items-center gap-2"><span className="text-amber-300 font-bold">MOVAPS</span> <span className="text-slate-400">xmm0, [mem]</span> <span className="text-slate-600 ml-auto">; cargar 4 floats alineados</span></div>
          <div className="flex items-center gap-2"><span className="text-amber-300 font-bold">ADDPS</span> <span className="text-slate-400">xmm0, xmm1</span> <span className="text-slate-600 ml-auto">; sumar 4 floats</span></div>
          <div className="flex items-center gap-2"><span className="text-amber-300 font-bold">MULPS</span> <span className="text-slate-400">xmm0, xmm1</span> <span className="text-slate-600 ml-auto">; multiplicar 4 floats</span></div>
          <div className="flex items-center gap-2"><span className="text-amber-300 font-bold">SUBPS</span> <span className="text-slate-400">xmm0, xmm1</span> <span className="text-slate-600 ml-auto">; restar 4 floats</span></div>
          <div className="flex items-center gap-2"><span className="text-amber-300 font-bold">DIVPS</span> <span className="text-slate-400">xmm0, xmm1</span> <span className="text-slate-600 ml-auto">; dividir 4 floats</span></div>
        </div>
      </div>

      {/* AVX instructions */}
      <div className="rounded-2xl bg-slate-900 border border-purple-500/30 overflow-hidden">
        <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 text-[13px] font-bold text-purple-400 font-mono flex items-center gap-2">
          <span className="text-[13px] px-1.5 py-0.5 bg-purple-500/20 rounded">AVX</span> Instrucciones avanzadas — Registros YMM (256 bits) · 8 × float32
        </div>
        <div className="p-3 text-[13px] font-mono space-y-2">
          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
            <div className="flex items-center gap-2"><span className="text-purple-300 font-bold">VMOVAPD</span> <span className="text-slate-400">ymm, [mem]</span> <span className="text-slate-600 ml-auto">; mover 4 doubles</span></div>
            <div className="flex items-center gap-2"><span className="text-purple-300 font-bold">VADDPD</span> <span className="text-slate-400">ymm, ymm, ymm</span> <span className="text-slate-600 ml-auto">; sumar 4 doubles</span></div>
            <div className="flex items-center gap-2"><span className="text-purple-300 font-bold">VBROADCASTSD</span> <span className="text-slate-400">ymm, [r64]</span> <span className="text-slate-600 ml-auto">; escalar → vector</span></div>
            <div className="flex items-center gap-2 relative">
              <span className="text-emerald-300 font-bold">VFMADDPD</span>
              <span className="text-slate-400">ymm, ymm, ymm, ymm</span>
              <span className="text-emerald-400/80 text-[13px] ml-auto font-bold">★ FMA: a*b + c en 1 ciclo</span>
            </div>
          </div>
          <div className="p-2 bg-slate-950 rounded-xl border border-purple-500/20 text-[13px] text-slate-400 leading-relaxed">
            <span className="text-purple-300">Ejemplo:</span> <span className="text-slate-500">C[0..3] = A[0..3] × B[0..3] + D[0..3]</span>
          </div>
        </div>
      </div>

      <p className="text-[13px] text-slate-400 text-center">FMA (Fused Multiply-Add) es la instrucción clave en Inteligencia Artificial: 2 operaciones por ciclo.</p>
    </div>
  );
}

/* ───────── Slide 3.5 — Fetch-Decode-Execute en SIMD ───────── */

export function Slide3_FDE_SIMD() {
  const stages = [
    { name: 'FETCH', color: 'border-cyan-400 text-cyan-300', bg: 'bg-cyan-500/10',
      desc: 'La CU busca VADDPD en el instruction cache. Es 1 instrucción que la CPU sabe que opera sobre 256 bits.',
      detail: '1 instrucción cargada' },
    { name: 'DECODE', color: 'border-blue-400 text-blue-300', bg: 'bg-blue-500/10',
      desc: 'Decodifica el opcode: "suma 4 doubles". Identifica operandos: YMM0, YMM1 → YMM2.',
      detail: '1 decode → 4 ops efectivas' },
    { name: 'EXECUTE', color: 'border-amber-400 text-amber-300', bg: 'bg-amber-500/10',
      desc: 'Los 4 sumadores de 64 bits se activan simultáneamente. En vector processor: pipelineado.',
      detail: '4 ALUs activas en paralelo' },
    { name: 'WRITEBACK', color: 'border-purple-400 text-purple-300', bg: 'bg-purple-500/10',
      desc: 'Los 256 bits del resultado se escriben de vuelta al banco de registros YMM en 1 operación.',
      detail: '256 bits en 1 write' },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-4 max-w-6xl mx-auto">
      <div className="shrink-0 flex items-center gap-3 px-2">
        <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-400/30 text-[13px] font-mono text-amber-300">
          Instrucción: <span className="font-bold">VADDPD ymm2, ymm0, ymm1</span>
        </div>
        <div className="flex items-center gap-1 text-[13px] text-slate-600 font-mono">
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
            <div className={`shrink-0 px-3 py-2 text-center font-bold font-mono text-sm border-b ${s.color} bg-slate-950/50`}>
              {i + 1}. {s.name}
            </div>
            <div className="flex-1 p-3 flex flex-col justify-center text-center gap-2">
              <p className="text-[13px] text-slate-300 leading-relaxed">{s.desc}</p>
              <div className={`mt-auto px-2 py-1 rounded-lg ${s.color.replace('text-', 'bg-').replace('300', '500/20')} border ${s.color.replace('text-', 'border-').replace('300', '400/30')}`}>
                <span className={`text-[13px] font-bold font-mono ${s.color}`}>◆ {s.detail}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Comparison footer */}
      <div className="shrink-0 grid grid-cols-2 gap-3 text-[13px] font-mono">
        <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400">
          <span className="text-red-400 font-bold">SISD:</span> 1 Decode → 1 micro-op → 1 ALU → 1 resultado
        </div>
        <div className="p-2.5 rounded-xl bg-slate-900 border border-cyan-500/20 text-slate-400">
          <span className="text-cyan-400 font-bold">SIMD:</span> 1 Decode → 1 instr → 4 ALUs activas → 4 resultados
        </div>
      </div>
    </div>
  );
}

/* ───────── Slide 3.4 — Excavator vs Zen ───────── */

export function Slide3_4() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
      <div className="p-5 rounded-2xl bg-slate-900 border border-purple-500/30 space-y-3">
        <span className="text-[13px] text-purple-400 font-mono font-bold">AMD Excavator (Pre-2017)</span>
        <h4 className="text-base font-bold text-slate-200">2x 128-bit FMAC Coordinados</h4>
        <p className="text-[13px] text-slate-400">Coordinaba dos unidades de 128 bits para simular AVX-256, generando mayor latencia y complejidad de control.</p>
      </div>

      <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-3">
        <span className="text-[13px] text-cyan-400 font-mono font-bold">AMD Zen (2017+)</span>
        <h4 className="text-base font-bold text-slate-200">Unidad Nativa de 256-bit</h4>
        <p className="text-[13px] text-slate-400">Un único planificador FP distribuye trabajo vía crossbar a una unidad FMAC-256 nativa con menor consumo.</p>
      </div>
    </div>
  );
}

/* ───────── Carátula de Sección: Parte 3 ───────── */

export function SlideIntroParte3() {
  return (
    <div className="p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-orange-500/10 border-2 border-amber-500/40 text-center space-y-6 max-w-3xl mx-auto shadow-2xl">
      <span className="px-4 py-1 bg-amber-500/20 text-amber-300 font-extrabold text-xs rounded-full border border-amber-400/30 uppercase tracking-widest">
        Expositor: Alejandro Andy · Parte 3
      </span>
      <h2 className="text-3xl font-extrabold text-slate-100">Extensiones SIMD Modernas (MMX, SSE, AVX)</h2>
      <div className="grid grid-cols-2 gap-3 text-left text-[13px] pt-2">
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 3.1: Evolución de Registros (1996-2017)</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 3.2: Subword Parallelism en Hardware</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 3.3: Instrucciones SSE y AVX + FMA</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 3.4: Fetch-Decode-Execute Vectorial</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 3.5: AMD Zen vs AMD Excavator</div>
      </div>
    </div>
  );
}
