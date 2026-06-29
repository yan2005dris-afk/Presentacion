import { motion } from 'framer-motion';
import { Layers, Activity, CheckCircle2, ShieldAlert } from 'lucide-react';

// ==========================================
// === PARTE 2 — Rivera Yandris ===
// ==========================================

/* ───────── Slide 2.1 — Una Orden, Ocho Soldados ───────── */

export function Slide2_1() {
  return (
    <div className="space-y-6 text-center max-w-4xl mx-auto">
      <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-400/40 inline-block px-8 shadow-lg shadow-cyan-500/10">
        <span className="text-[10px] text-cyan-400 font-mono font-bold uppercase tracking-widest block">Unidad de Control Única</span>
        <h4 className="text-base font-bold text-slate-100 mt-1">Comando: SUMAR +10</h4>
      </div>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-2 py-2">
        {[5, 12, 3, 8, 15, 7, 2, 9].map((val, i) => (
          <motion.div key={i} whileHover={{ y: -4 }} className="space-y-1.5">
            <div className="p-1.5 rounded bg-slate-950 border border-slate-800 text-[9px] font-mono text-slate-400">ALU{i}</div>
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-300 font-bold font-mono text-xs">{val}</div>
            <div className="text-cyan-400 text-[10px]">↓</div>
            <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold font-mono text-xs shadow-md">{val + 10}</div>
          </motion.div>
        ))}
      </div>

      <p className="text-xs text-slate-300 bg-slate-900 p-3 rounded-xl border border-slate-800 max-w-xl mx-auto">
        💡 <span className="text-cyan-400 font-bold">Impacto Energético:</span> Decodificar es trabajo. Al decodificar 1 sola vez para 8 ALUs, el costo de Fetch/Decode se divide entre 8.
      </p>
    </div>
  );
}

/* ───────── Slide 2.2 — Registros Vectoriales ───────── */

export function Slide2_2() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-xs text-slate-500 font-mono">Registro Escalar (32 Bits)</span>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-700 text-center font-mono text-slate-300 font-bold text-sm">[ 3.14159 ]</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/50 space-y-2">
          <span className="text-xs text-cyan-400 font-mono">Registro Vectorial XMM (128 Bits)</span>
          <div className="grid grid-cols-4 gap-1 p-1.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-center font-mono text-xs font-bold text-cyan-300">
            <div className="bg-cyan-500/20 p-1.5 rounded">3.14</div>
            <div className="bg-cyan-500/20 p-1.5 rounded">2.71</div>
            <div className="bg-cyan-500/20 p-1.5 rounded">1.41</div>
            <div className="bg-cyan-500/20 p-1.5 rounded">0.57</div>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 grid grid-cols-3 gap-4 text-xs">
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <div className="p-5 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-3">
        <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2"><Layers size={16} /> Array Processor (Espacio)</h4>
        <p className="text-xs text-slate-300">Múltiples PEs (Processing Elements) físicos independientes operando exactamente en el mismo ciclo de reloj.</p>
        <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-amber-300 border border-slate-800">
          • 4 obreros trabajando al mismo tiempo<br />
          • Usado en GPUs y Connection Machine CM-2
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-slate-900 border border-purple-500/30 space-y-3">
        <h4 className="text-sm font-bold text-purple-400 flex items-center gap-2"><Activity size={16} /> Vector Processor (Tiempo)</h4>
        <p className="text-xs text-slate-300">Un pipeline segmentado que procesa elementos en pasos consecutivos de tiempo en la misma estructura.</p>
        <div className="p-3 bg-slate-950 rounded-xl font-mono text-xs text-purple-300 border border-slate-800">
          • Línea de ensamblaje de fábrica<br />
          • Usado en CRAY-1 clásico
        </div>
      </div>
    </div>
  );
}

/* ───────── Slide 2.4 — Ventajas y Kryptonita ───────── */

export function Slide2_4() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
      <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/40 space-y-3">
        <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2"><CheckCircle2 size={16} /> Ventajas Clave</h4>
        <ul className="text-xs text-slate-300 space-y-1.5">
          <li>✓ Throughput N veces mayor por ciclo</li>
          <li>✓ 1 sola decodificación de instrucción para N datos</li>
          <li>✓ Reducción masiva de instrucciones dinámicas (304 → 7)</li>
          <li>✓ Amortización de latencia en el pipeline vectorial</li>
        </ul>
      </div>

      <div className="p-5 rounded-2xl bg-slate-900 border border-red-500/40 space-y-3">
        <h4 className="text-sm font-bold text-red-400 flex items-center gap-2"><ShieldAlert size={16} /> La Kryptonita: Divergencia Condicional</h4>
        <p className="text-xs text-slate-400">Si el código tiene <span className="font-mono text-red-300">if (A[i] &gt; 0)</span>, el hardware ejecuta AMBOS caminos enmascarando los elementos falsos.</p>
        <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-300">
          ⚠️ Además, accesos no alineados en memoria (stride &gt; 1) causan penalizaciones severas.
        </div>
      </div>
    </div>
  );
}
