import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

// ==========================================
// === PARTE 4 — Bermudez Gino ===
// ==========================================

/* ───────── Slide 4.1 — 304 vs 7 Instrucciones ───────── */

export function Slide4_1() {
  return (
    <div className="space-y-4 max-w-5xl mx-auto text-xs font-mono">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900 border border-red-500/30 space-y-2">
          <h4 className="font-bold text-red-400">Escalar (304 Instrucciones Dinámicas):</h4>
          <div className="space-y-1 text-slate-300">
            <div>• 4x MOVI (Inicializar contadores)</div>
            <div>• 100x LD (2 loads x 50 iteraciones)</div>
            <div>• 50x ADD + 50x SHFR + 50x ST</div>
            <div>• 50x DECBNZ (Branches)</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-400/40 space-y-2">
          <h4 className="font-bold text-cyan-400">Vectorial SIMD (7 Instrucciones Dinámicas):</h4>
          <div className="space-y-1 text-slate-300">
            <div>• 2x MOVI (VLEN=50, VSTR=1)</div>
            <div>• 2x VLD (V0, A y V1, B solapados)</div>
            <div>• 1x VADD + 1x VSHFR + 1x VST</div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="p-3 bg-cyan-500/10 border border-cyan-400/30 rounded-xl text-center text-cyan-300 font-bold text-sm"
      >
        Speedup Real = 2004 ciclos / 285 ciclos ≈ <span className="text-2xl">7.0×</span>
      </motion.div>
    </div>
  );
}

/* ───────── Slide 4.2 — Throughput y Ley de Amdahl ───────── */

export function Slide4_2() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-xs">
      <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-3">
        <h4 className="text-sm font-bold text-cyan-400">Throughput (GFLOPS)</h4>
        <p className="text-slate-300">Volumen de datos por segundo. AVX-512 a 3GHz = 48 GFLOPS (hasta 96 GFLOPS con FMA).</p>
      </div>

      <div className="p-5 rounded-2xl bg-slate-900 border border-purple-500/30 space-y-3">
        <h4 className="text-sm font-bold text-purple-400">Ley de Amdahl & Techo Secuencial</h4>
        <p className="text-slate-300">Si el 20% del código es secuencial y no se puede vectorizar, el speedup máximo teórico jamás superará 5X, sin importar cuántas ALUs agregues.</p>
      </div>
    </div>
  );
}

/* ───────── Slide 4.3 — Aplicaciones Reales ───────── */

export function Slide4_3() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto text-xs">
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <h4 className="font-bold text-cyan-400">Python NumPy</h4>
        <p className="text-slate-400 mt-1">Llama internamente a BLAS/LAPACK acelerado por AVX-512.</p>
      </div>
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <h4 className="font-bold text-amber-400">Redes Neuronales</h4>
        <p className="text-slate-400 mt-1">Convoluciones CNN y multiplicaciones de matrices GEMM.</p>
      </div>
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
        <h4 className="font-bold text-purple-400">Cifrado AES-NI</h4>
        <p className="text-slate-400 mt-1">Instrucciones vectoriales dedicadas para seguridad en red.</p>
      </div>
    </div>
  );
}

/* ───────── Slide 4.4 — SoC Híbrido ───────── */

export function Slide4_4() {
  return (
    <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 max-w-4xl mx-auto space-y-4 text-center text-xs">
      <h4 className="text-sm font-bold text-slate-200">SoC Híbrido Moderno</h4>
      <div className="grid grid-cols-2 gap-4 text-left">
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
          <span className="font-bold text-blue-400">CPU (MIMD)</span> Orquesta el Sistema Operativo y código secuencial irregular.
        </div>
        <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
          <span className="font-bold text-cyan-400">GPU (SIMD)</span> Ejecuta cómputo masivamente paralelo (renderizado y AI).
        </div>
      </div>
    </div>
  );
}

/* ───────── Slide 4.5 — Conclusiones ───────── */

export function Slide4_5() {
  return (
    <div className="p-8 rounded-3xl bg-slate-900 border border-cyan-500/30 max-w-3xl mx-auto text-center space-y-4">
      <Sparkles size={36} className="text-cyan-400 mx-auto animate-bounce" />
      <h3 className="text-xl font-bold text-slate-100">SIMD: La Base del Cómputo Moderno</h3>
      <p className="text-xs text-slate-300 italic">
        "Lo que comenzó como una extensión multimedia en 1996 es hoy la estructura sobre la cual se erige toda la Inteligencia Artificial."
      </p>
    </div>
  );
}
