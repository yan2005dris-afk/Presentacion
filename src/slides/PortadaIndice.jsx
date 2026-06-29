import { motion } from 'framer-motion';
import { Cpu, Zap, Users, ListOrdered, ArrowRight } from 'lucide-react';

// ==========================================
// === PORTADA E ÍNDICE ===
// ==========================================

export function SlidePortada() {
  const members = [
    { name: 'Reyes Ricardo', part: 'Parte 1', topic: 'Problema & Flynn' },
    { name: 'Rivera Yandris', part: 'Parte 2', topic: 'Principio Vectorial' },
    { name: 'Alejandro Andy', part: 'Parte 3', topic: 'Extensiones SIMD' },
    { name: 'Bermudez Gino', part: 'Parte 4', topic: 'Rendimiento & Apps' },
  ];

  return (
    <div className="text-center space-y-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-slate-900 to-purple-500/10 border-2 border-cyan-500/30 backdrop-blur-md shadow-2xl shadow-cyan-500/10"
      >
        <div className="flex justify-center gap-4 mb-4 text-cyan-400">
          <Cpu size={56} className="animate-pulse" />
          <Zap size={56} className="text-purple-400 animate-bounce" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400">
          SIMD y Arquitecturas Paralelas
        </h1>
        <p className="mt-3 text-sm md:text-base text-slate-300 max-w-3xl mx-auto font-medium">
          Exposición Oficial · Arquitectura y Organización de Computadoras
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {members.map((m, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1"
          >
            <Users size={20} className="mx-auto text-cyan-400" />
            <div className="text-xs font-bold text-slate-100">{m.name}</div>
            <div className="text-xs text-cyan-400 font-mono font-bold">{m.part}</div>
            <div className="text-xs text-slate-500">{m.topic}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function SlideIndice({ onSelectSection }) {
  const agenda = [
    { id: 1, title: 'Parte 1: El Problema Secuencial y Taxonomía de Flynn', desc: 'Límite secuencial, ciclo Von Neumann, matriz 2x2 y SMP vs SIMD.', member: 'Expositor: Reyes Ricardo', color: 'border-cyan-500/40 text-cyan-300' },
    { id: 2, title: 'Parte 2: Arquitectura SIMD y Principio Vectorial', desc: 'El Comandante y 8 soldados, registros vectoriales, Array vs Vector Processor.', member: 'Expositor: Rivera Yandris', color: 'border-purple-500/40 text-purple-300' },
    { id: 3, title: 'Parte 3: Extensiones SIMD Modernas (MMX/SSE/AVX)', desc: 'Evolución 1996-2017, Subword Parallelism, FMA y AMD Zen vs Excavator.', member: 'Expositor: Alejandro Andy', color: 'border-amber-500/40 text-amber-300' },
    { id: 4, title: 'Parte 4: Rendimiento, Aplicaciones y Conclusiones', desc: 'Desglose 304 vs 7 instrs, Throughput, Ley de Amdahl, IA y SoCs Híbridos.', member: 'Expositor: Bermudez Gino', color: 'border-emerald-500/40 text-emerald-300' },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="text-center space-y-1">
        <h3 className="text-xl font-bold text-slate-100 flex items-center justify-center gap-2">
          <ListOrdered size={22} className="text-cyan-400" /> Agenda Temática de la Exposición
        </h3>
        <p className="text-xs text-slate-400">Haz clic en cualquier parte para navegar directamente</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agenda.map((a) => (
          <motion.div
            key={a.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => onSelectSection(a.id)}
            className={`p-4 rounded-2xl bg-slate-900 border-2 ${a.color} cursor-pointer space-y-2 transition-all shadow-md`}
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold px-2 py-0.5 bg-slate-950 rounded border border-slate-800 text-slate-200">{a.member}</span>
              <ArrowRight size={16} className="text-slate-400" />
            </div>
            <h4 className="font-bold text-sm text-slate-100">{a.title}</h4>
            <p className="text-xs text-slate-400 leading-relaxed">{a.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
