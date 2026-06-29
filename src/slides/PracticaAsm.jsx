import { motion } from 'framer-motion';
import { Code2, Cpu, Zap } from 'lucide-react';

// ==========================================
// === PRÁCTICA DE ASSEMBLER (Placeholder) ===
// ==========================================

export function SlidePracticaAsm() {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center h-full text-center space-y-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-orange-500/10 border-2 border-amber-500/30"
      >
        <div className="flex justify-center gap-4 mb-4 text-amber-400">
          <Code2 size={48} />
          <Cpu size={48} className="text-cyan-400" />
          <Zap size={48} className="text-orange-400" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-100 mb-2">
          Práctica: Assembler SIMD
        </h2>
        <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
          Comparación de rendimiento escalar vs vectorial sumando dos arreglos grandes.
          Bucle tradicional SISD vs instrucciones SSE/AVX con registros XMM/YMM.
        </p>
        <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-amber-500/20 text-xs text-amber-300 font-mono inline-block">
          ⚡ Próximamente: demo interactiva con MOVAPS, ADDPS y más
        </div>
      </motion.div>
    </div>
  );
}
