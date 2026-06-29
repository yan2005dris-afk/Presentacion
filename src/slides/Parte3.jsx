// ==========================================
// === PARTE 3 — Alejandro Andy ===
// ==========================================

/* ───────── Slide 3.1 — Evolución SIMD ───────── */

export function Slide3_1() {
  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs text-slate-300">
        <span className="font-bold text-cyan-400">Caso Real (Intel Atom 2009):</span> Sin extensiones SIMD, la CPU se saturaba al 100% procesando video HD. Con SSE habilitado, el mismo chip lo manejaba al 40%.
      </div>

      <div className="space-y-2 text-xs font-mono">
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
    <div className="space-y-6 max-w-4xl mx-auto text-center">
      <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/40">
        <h4 className="text-sm font-bold text-amber-300">Subword Parallelism</h4>
        <p className="text-xs text-slate-300 mt-1">Un solo sumador físico de 256 bits se particiona ajustando la lógica de acarreo interna según la instrucción.</p>
      </div>

      <div className="space-y-2 text-xs font-mono text-left">
        <div className="text-cyan-400 font-bold">• Particionado como 8×32-bit (Floats en VADDPS)</div>
        <div className="grid grid-cols-8 gap-1 text-center font-bold">
          {[...Array(8)].map((_, i) => <div key={i} className="p-2 rounded bg-cyan-500/20 border border-cyan-400 text-cyan-300">+32</div>)}
        </div>
        <div className="text-purple-400 font-bold pt-2">• Particionado como 32×8-bit (Bytes para píxeles RGB en PADDB)</div>
        <div className="grid grid-cols-16 gap-0.5 text-center text-[9px] font-bold">
          {[...Array(16)].map((_, i) => <div key={i} className="p-1 rounded bg-purple-500/20 border border-purple-400 text-purple-300">+8</div>)}
        </div>
      </div>
    </div>
  );
}

/* ───────── Slide 3.3 — Instrucciones AVX ───────── */

export function Slide3_3() {
  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono space-y-2">
        <div className="text-cyan-400 font-bold">; Código Ensamblador AVX Típico:</div>
        <div className="text-slate-300">VMOVAPD ymm0, [X + i*8]    <span className="text-slate-500">; cargar 4 doubles de X</span></div>
        <div className="text-slate-300">VBROADCASTSD ymm1, [scalar] <span className="text-slate-500">; copiar escalar a 4 posiciones</span></div>
        <div className="text-purple-300 font-bold">VFMADDPD ymm2, ymm0, ymm1, ymm3 <span className="text-purple-400">; FMA: (ymm0 * ymm1) + ymm3 en 1 ciclo</span></div>
      </div>
      <p className="text-xs text-slate-400 text-center">FMA (Fused Multiply-Add) es la instrucción clave en Inteligencia Artificial y Deep Learning.</p>
    </div>
  );
}

/* ───────── Slide 3.4 — Excavator vs Zen ───────── */

export function Slide3_4() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <div className="p-5 rounded-2xl bg-slate-900 border border-purple-500/30 space-y-3">
        <span className="text-xs text-purple-400 font-mono font-bold">AMD Excavator (Pre-2017)</span>
        <h4 className="text-base font-bold text-slate-200">2x 128-bit FMAC Coordinados</h4>
        <p className="text-xs text-slate-400">Coordinaba dos unidades de 128 bits para simular AVX-256, generando mayor latencia y complejidad de control.</p>
      </div>

      <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-3">
        <span className="text-xs text-cyan-400 font-mono font-bold">AMD Zen (2017+)</span>
        <h4 className="text-base font-bold text-slate-200">Unidad Nativa de 256-bit</h4>
        <p className="text-xs text-slate-400">Un único planificador FP distribuye trabajo vía crossbar a una unidad FMAC-256 nativa con menor consumo.</p>
      </div>
    </div>
  );
}
