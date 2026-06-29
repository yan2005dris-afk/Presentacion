import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, ArrowRight, Layers, Activity } from 'lucide-react';

// ==========================================
// === PARTE 1 — Reyes Ricardo ===
// ==========================================

/* ───────── Slide 1.0 — Límite Secuencial ───────── */

export function Slide1_LimiteSec() {
  const instrRows = [
    { op: 'MOVI', n: '4×', desc: 'Inicializar contadores', cycles: '4', color: 'text-slate-400' },
    { op: 'LD', n: '100×', desc: '2 loads/iter × 50', cycles: '1100', color: 'text-red-400' },
    { op: 'ADD', n: '50×', desc: '1 suma/iter × 50', cycles: '200', color: 'text-amber-400' },
    { op: 'SHFR', n: '50×', desc: 'Divide ÷2 (shift right)', cycles: '50', color: 'text-slate-400' },
    { op: 'ST', n: '50×', desc: '1 store/iter × 50', cycles: '550', color: 'text-red-400' },
    { op: 'DECBNZ', n: '50×', desc: '1 branch/iter × 50', cycles: '100', color: 'text-slate-400' },
  ];

  return (
    <div className="w-full h-full flex gap-4 max-w-6xl mx-auto">
      <div className="flex flex-col gap-3 w-56 shrink-0">
        <div className="flex-1 rounded-2xl border border-slate-700 bg-slate-900 p-4 flex flex-col gap-3">
          <p className="text-[13px] font-mono text-slate-500 uppercase tracking-widest">El problema</p>
          <p className="text-[13px] text-slate-300 leading-relaxed">
            Procesamiento masivo de datos: renderizado 3D, machine learning, video 4K. El modelo secuencial se queda corto.
          </p>
          <div className="border-t border-slate-800 pt-3">
            <p className="text-[13px] font-mono text-cyan-500 uppercase tracking-widest mb-2">Analogía</p>
            <div className="space-y-1.5 text-[13px] text-slate-300 leading-relaxed">
              <p>Una cocina con <span className="text-red-400 font-bold">1 chef</span> friendo hamburguesas en un sartén donde solo cabe <span className="text-red-400 font-bold">1</span>.</p>
              <p>El chef es rápido, pero tiene que repetir el mismo gesto una y otra vez. El cuello de botella es <span className="text-red-400 font-bold">estructural</span>.</p>
              <p>La solución no es un chef más rápido: es cambiar la herramienta. Una <span className="text-cyan-400 font-bold">parrilla + espátula gigante</span> permite voltear 4 hamburguesas con un solo movimiento.</p>
            </div>
          </div>
          <div className="mt-auto pt-2 border-t border-slate-800">
            <p className="text-[13px] text-slate-400 italic leading-relaxed">
              El procesador es el chef. El problema no es la velocidad del tenedor — es <span className="text-amber-400 font-bold">el throughput de la herramienta</span>.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-3 min-w-0">
        <div className="shrink-0 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 flex items-center gap-3">
          <p className="text-[13px] font-mono text-slate-500 uppercase tracking-widest shrink-0">Ejemplo real</p>
          <code className="text-sm font-mono text-cyan-300 font-bold">C[i] = (A[i] + B[i]) / 2</code>
          <span className="text-[13px] text-slate-500">para i = 0..49 · 50 elementos</span>
        </div>

        <div className="flex-1 rounded-2xl border border-red-500/20 bg-slate-900 p-3 flex flex-col gap-2">
          <div className="flex items-center justify-between shrink-0 mb-1">
            <p className="text-[13px] font-mono text-red-400 uppercase tracking-widest">SISD — desglose de instrucciones</p>
            <div className="flex items-center gap-3">
              <span className="text-[13px] font-mono text-slate-500">Total instr: <span className="text-red-400 font-bold">304</span></span>
              <span className="text-[13px] font-mono text-slate-500">Total ciclos: <span className="text-red-400 font-bold">~2004</span></span>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-1 justify-center">
            {instrRows.map((r, i) => (
              <div key={i} className="flex items-center gap-2 text-[13px] font-mono">
                <span className="w-14 text-slate-500 font-bold shrink-0">{r.n}</span>
                <span className="w-14 text-cyan-400 font-bold shrink-0">{r.op}</span>
                <span className="flex-1 text-slate-500 truncate">{r.desc}</span>
                <div className="shrink-0 flex items-center gap-1">
                  <div className="h-1.5 bg-slate-800 rounded-full w-20 overflow-hidden">
                    <div
                      className="h-full bg-red-500/60 rounded-full"
                      style={{ width: `${Math.min(100, (parseInt(r.cycles) / 1100) * 100)}%` }}
                    />
                  </div>
                  <span className={`w-10 text-right ${r.color}`}>{r.cycles} c</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="shrink-0 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-red-500/30 bg-slate-900 p-3 flex items-center gap-3">
            <div>
              <p className="text-[13px] font-mono text-red-400 uppercase tracking-widest">SISD secuencial</p>
              <p className="text-lg font-bold font-mono text-red-400">304 <span className="text-[13px] text-slate-500 font-normal">instrucciones</span></p>
              <p className="text-[13px] font-mono text-slate-500">~2004 ciclos</p>
            </div>
          </div>
          <motion.div
            animate={{ boxShadow: ['0 0 12px rgba(6,182,212,0.15)', '0 0 28px rgba(6,182,212,0.35), 0 0 8px rgba(168,85,247,0.2)', '0 0 12px rgba(6,182,212,0.15)'] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            className="rounded-xl border-2 border-cyan-500/60 bg-slate-900 p-3 flex items-center gap-3"
          >
            <div>
              <p className="text-[13px] font-mono text-cyan-400 uppercase tracking-widest">SIMD vectorial</p>
              <p className="text-lg font-bold font-mono text-cyan-400">7 <span className="text-[13px] text-slate-500 font-normal">instrucciones</span></p>
              <p className="text-[13px] font-mono text-slate-500">~285 ciclos · <span className="text-emerald-400 font-bold">7× más rápido</span></p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Slide 1.1 — Taxonomía de Flynn Interactiva ───────── */

export function Slide1_1() {
  const [mode, setMode] = useState('SIMD');
  const [active, setActive] = useState(null);

  const ARCHS = {
    SISD: { full: 'Single Instruction · Single Data', bdr: 'border-slate-500', txt: 'text-slate-300', bg: 'bg-slate-500/10', desc: 'Von Neumann clásico. 1 CU, 1 ALU, 1 dato por ciclo. Todo procesamiento es estrictamente secuencial.', ex: 'Intel 8086 · ARM Cortex-A escalar' },
    SIMD: { full: 'Single Instruction · Multiple Data', bdr: 'border-cyan-500', txt: 'text-cyan-300', bg: 'bg-cyan-500/10', desc: '1 CU hace broadcast de 1 instrucción a N ALUs en paralelo. El foco de esta exposición.', ex: 'SSE/AVX · GPU shaders · ARM NEON' },
    MISD: { full: 'Multiple Instruction · Single Data', bdr: 'border-amber-500', txt: 'text-amber-300', bg: 'bg-amber-500/10', desc: 'N CUs con instrucciones distintas operan sobre el mismo dato. Caso teórico / fault-tolerance.', ex: 'Systolic Arrays · Fault-tolerant' },
    MIMD: { full: 'Multiple Instruction · Multiple Data', bdr: 'border-blue-500', txt: 'text-blue-300', bg: 'bg-blue-500/10', desc: 'N CPUs completamente independientes. El generalista: instrucciones distintas, datos distintos.', ex: 'Intel Core i9 · AMD Ryzen · SMP' },
  };

  const INFO = {
    IS: { title: 'Instruction Stream (IS)', SISD: '1 stream. El PC avanza secuencialmente, 1 instrucción por ciclo.', SIMD: '1 stream compartido. La MISMA instrucción se broadcast a todas las ALUs — esa es la eficiencia de SIMD.', MISD: 'N streams distintos. Cada CU tiene su propio PC e instrucciones independientes.', MIMD: 'N streams completamente independientes. Cada núcleo tiene su propio pipeline y PC.' },
    CU: { title: 'Control Unit (CU)', SISD: '1 CU. Fetch → Decode → Execute secuencial. 1 instrucción por ciclo a 1 ALU.', SIMD: '1 CU compartida. Decodifica 1 vez, hace broadcast a N ALUs. Costo de decode ÷ N.', MISD: 'N CUs independientes. Cada una decodifica su propio stream sobre el mismo dato.', MIMD: 'N CUs sin coordinación central. Cada núcleo opera autónomamente.' },
    ALU: { title: 'ALU — Arithmetic Logic Unit', SISD: '1 ALU. 1 operación por ciclo. El cuello de botella del throughput secuencial.', SIMD: 'N ALUs en paralelo. Misma operación sobre N datos distintos. Throughput N× sin N× overhead de control.', MISD: 'N ALUs con instrucciones distintas sobre el mismo dato para verificación cruzada o transformación en cadena.', MIMD: 'N ALUs independientes. Operaciones heterogéneas simultáneas sin sincronización.' },
    DS: { title: 'Data Stream (DS)', SISD: '1 stream. 1 dato entra, 1 resultado por ciclo. Throughput lineal.', SIMD: 'N streams de datos en paralelo. 1 instrucción produce N resultados simultáneamente.', MISD: '1 stream compartido. N procesadores distintos trabajan sobre el mismo flujo de datos.', MIMD: 'N streams independientes. Cada CPU lee y escribe sus propios datos sin interferencia.' },
  };

  const ROWS = {
    SISD: [{ is: 'IS', cu: 'CU', alu: 'ALU', ds: 'DS' }],
    SIMD: [
      { is: 'IS', cu: 'CU', alu: 'ALU₁', ds: 'DS₁' },
      { is: null, cu: null, alu: 'ALU₂', ds: 'DS₂' },
      { is: null, cu: null, alu: 'ALU₃', ds: 'DS₃' },
      { is: null, cu: null, alu: 'ALU₄', ds: 'DS₄' }
    ],
    MISD: [
      { is: 'IS₁', cu: 'CU₁', alu: 'ALU', ds: 'DS' },
      { is: 'IS₂', cu: 'CU₂', alu: null, ds: null },
      { is: 'IS₃', cu: 'CU₃', alu: null, ds: null },
      { is: 'IS₄', cu: 'CU₄', alu: null, ds: null }
    ],
    MIMD: [
      { is: 'IS₁', cu: 'CU₁', alu: 'ALU₁', ds: 'DS₁' },
      { is: 'IS₂', cu: 'CU₂', alu: 'ALU₂', ds: 'DS₂' },
      { is: 'IS₃', cu: 'CU₃', alu: 'ALU₃', ds: 'DS₃' },
      { is: 'IS₄', cu: 'CU₄', alu: 'ALU₄', ds: 'DS₄' }
    ],
  };

  const ANNOT = {
    SISD: '1 IS × 1 CU × 1 ALU × 1 DS — procesamiento estrictamente secuencial',
    SIMD: '1 IS → 1 CU broadcast → 4 ALUs en paralelo → 4 DS simultáneos',
    MISD: '4 IS distintos → 4 CUs → mismo ALU/DS — verificación redundante',
    MIMD: '4 IS × 4 CUs × 4 ALUs × 4 DS — ejecución heterogénea e independiente',
  };

  const arch = ARCHS[mode];
  const rows = ROWS[mode];
  const toggle = (id) => setActive(a => a === id ? null : id);

  const Cell = ({ label, type, rowIdx }) => {
    if (!label) {
      if (type === 'CU' && mode === 'SIMD')
        return <div className="h-9 flex items-center justify-center"><div className="w-px h-full bg-slate-800" /></div>;
      if ((type === 'ALU' || type === 'DS') && mode === 'MISD')
        return <div className="h-9 flex items-center justify-center"><div className="w-px h-full bg-slate-800" /></div>;
      return <div className="h-9 opacity-0 pointer-events-none rounded-lg border-2 border-transparent" />;
    }
    const on = active === type;
    return (
      <div onClick={() => toggle(type)}
        className={`h-9 rounded-lg border-2 flex items-center justify-center text-[13px] font-mono font-bold cursor-pointer select-none transition-all duration-150 ${on ? `${arch.bdr} ${arch.bg} ${arch.txt}` : 'border-slate-600 bg-slate-800 text-slate-400 hover:border-slate-500 hover:text-slate-300'
          }`}>
        {label}
      </div>
    );
  };

  const Arr = ({ vis }) => (
    <div className={`flex items-center transition-opacity ${vis ? 'opacity-100' : 'opacity-0'}`}>
      <div className="flex-1 h-px bg-slate-700" /><span className="text-slate-600 text-[13px] shrink-0">▶</span>
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col gap-2 max-w-6xl mx-auto select-none">
      <div className="shrink-0 flex gap-2 justify-center pt-1">
        {Object.entries(ARCHS).map(([k, a]) => (
          <button key={k} onClick={() => { setMode(k); setActive(null); }}
            className={`px-5 py-1.5 rounded-xl text-xs font-bold font-mono border-2 transition-all duration-200 ${mode === k ? `${a.bdr} ${a.bg} ${a.txt}` : 'border-slate-700 text-slate-600 hover:border-slate-600 hover:text-slate-400'
              }`}>{k}</button>
        ))}
      </div>

      <div className={`shrink-0 rounded-xl border-2 px-4 py-2.5 min-h-[52px] flex items-start bg-slate-900 transition-all duration-200 ${arch.bdr}/50`}>
        {active
          ? <div>
            <p className={`text-[13px] font-bold mb-0.5 ${arch.txt}`}>{INFO[active]?.title}</p>
            <p className="text-[13px] text-slate-400">{INFO[active]?.[mode]}</p>
          </div>
          : <div className="w-full">
            <div className="flex justify-between items-baseline">
              <p className={`text-[13px] font-bold ${arch.txt}`}>{arch.full}</p>
              <span className="text-[13px] text-slate-600 font-mono">{arch.ex}</span>
            </div>
            <p className="text-[13px] text-slate-400 mt-0.5">{arch.desc}</p>
          </div>
        }
      </div>

      <div className="shrink-0 grid text-xs font-mono text-slate-600 uppercase tracking-widest"
        style={{ gridTemplateColumns: '1fr 28px 1fr 28px 1fr 28px 1fr' }}>
        <span className="text-center">Instr. Stream</span><span />
        <span className="text-center">Control Unit</span><span />
        <span className="text-center">ALU</span><span />
        <span className="text-center">Data Stream</span>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-2 min-h-0">
        <AnimatePresence mode="wait">
          <motion.div key={mode}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-2">
            {rows.map((r, i) => (
              <div key={i} className="grid items-center gap-1"
                style={{ gridTemplateColumns: '1fr 28px 1fr 28px 1fr 28px 1fr' }}>
                <Cell label={r.is} type="IS" rowIdx={i} />
                <Arr vis={!!r.is && !!r.cu} />
                <Cell label={r.cu} type="CU" rowIdx={i} />
                <Arr vis={!!r.cu && !!r.alu || (mode === 'SIMD' && i > 0 && !!r.alu)} />
                <Cell label={r.alu} type="ALU" rowIdx={i} />
                <Arr vis={!!r.alu && !!r.ds} />
                <Cell label={r.ds} type="DS" rowIdx={i} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
        <p className={`text-center text-[13px] font-mono mt-1 opacity-70 ${arch.txt}`}>{ANNOT[mode]}</p>
      </div>
    </div>
  );
}

/* ───────── Slide 1.1b — Animación SISD vs SIMD ───────── */

export function Slide1_1Anim() {
  const TOTAL = 16;
  const SIMD_W = 4;
  const [tick, setTick] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  const sisdDone = Math.min(tick, TOTAL);
  const simdDone = Math.min(tick * SIMD_W, TOTAL);
  const sisdFinished = sisdDone >= TOTAL;
  const simdFinished = simdDone >= TOTAL;
  const simdFinishTick = TOTAL / SIMD_W;

  useEffect(() => {
    if (!running) return;
    timerRef.current = setInterval(() => {
      setTick(prev => {
        if (prev >= TOTAL) { clearInterval(timerRef.current); setRunning(false); return prev; }
        return prev + 1;
      });
    }, 500);
    return () => clearInterval(timerRef.current);
  }, [running]);

  const reset = () => { clearInterval(timerRef.current); setTick(0); setRunning(false); };

  const sisdAtCajero = sisdDone < TOTAL ? sisdDone : null;

  const simdBatchIdxs = !simdFinished
    ? Array.from({ length: Math.min(SIMD_W, TOTAL - simdDone) }, (_, i) => simdDone + i)
    : [];
  const simdQueueStart = simdDone + simdBatchIdxs.length;
  const simdQueue = Array.from({ length: Math.max(0, TOTAL - simdQueueStart) }, (_, i) => simdQueueStart + i);

  const ItemChip = ({ idx, size = 'sm', ring = false, accent = 'bg-slate-700 border border-slate-600' }) => {
    const cls = size === 'lg'
      ? 'w-11 h-11 text-sm rounded-xl'
      : 'w-6 h-6 text-sm rounded-lg';
    return (
      <div className={`${cls} ${accent} flex items-center justify-center font-bold font-mono text-slate-200 shrink-0 ${ring ? 'ring-2 ring-white/40 ring-offset-1 ring-offset-slate-950' : ''}`}>
        {idx + 1}
      </div>
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-3 max-w-6xl mx-auto select-none">
      <div className="flex items-center justify-center gap-3 shrink-0">
        <button onClick={() => setRunning(r => !r)} disabled={sisdFinished && simdFinished}
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-sm font-bold hover:bg-cyan-500/30 disabled:opacity-40 transition-all">
          <Play size={14} /> {running ? 'Corriendo...' : 'Iniciar Simulación'}
        </button>
        <button onClick={reset}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 border border-slate-700 text-slate-400 text-sm hover:text-slate-200 transition-all">
          <RotateCcw size={14} /> Reset
        </button>
        <span className="text-xs font-mono text-slate-500 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          Ciclo: <span className="text-slate-300 font-bold">{tick}</span> / {TOTAL}
        </span>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4 min-h-0">
        {/* SISD panel */}
        <div className={`flex flex-col p-4 rounded-2xl border bg-slate-900 transition-colors duration-300 ${sisdFinished ? 'border-emerald-500/50' : 'border-red-500/30'}`}>
          <div className="flex items-center justify-between mb-3 shrink-0">
            <div>
              <span className="text-sm font-bold text-red-400 font-mono">SISD — 1 Sartén</span>
              <p className="text-[13px] text-slate-500">1 hamburguesa · {TOTAL} ciclos</p>
            </div>
            {sisdFinished
              ? <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="text-xs font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 px-2 py-1 rounded-lg">✓ Ciclo {TOTAL}</motion.span>
              : tick > 0 ? <span className="text-xs font-mono text-red-400">{sisdDone}/{TOTAL}</span> : null}
          </div>

          <div className="flex-1 flex items-center gap-2 min-h-0">
            <div className="flex-1 grid gap-1 content-start" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {Array.from({ length: TOTAL }, (_, i) => {
                const done = i < sisdDone;
                const active = i === sisdAtCajero;
                return (
                  <div key={i} className={`w-full h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-all duration-200 ${done ? 'bg-slate-800/60 border border-slate-700/40 text-slate-600'
                    : active ? 'bg-red-500 text-white animate-[glow-pulse_1.5s_ease-in-out_infinite] shadow-none'
                      : 'bg-slate-700 border border-slate-600 text-slate-300'
                    }`}>
                    {done ? '✓' : i + 1}
                  </div>
                );
              })}
            </div>

            <ArrowRight size={14} className="text-red-500/50 shrink-0" />

            <div className="flex flex-col items-center gap-2 shrink-0">
              <span className="text-[13px] text-slate-600 font-mono">SARTÉN</span>
              <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-colors duration-200 ${sisdAtCajero !== null ? 'border-red-400 bg-slate-800' : sisdFinished ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-slate-700 bg-slate-800'
                }`}>
                <AnimatePresence mode="wait">
                  {sisdAtCajero !== null
                    ? <motion.div key={sisdAtCajero} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <ItemChip idx={sisdAtCajero} size="lg" ring accent="bg-red-500 border-0" />
                    </motion.div>
                    : <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-emerald-400 text-xl">✓</motion.span>
                  }
                </AnimatePresence>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold font-mono text-slate-300">{sisdDone}</span>
                <span className="text-[13px] text-slate-600 font-mono">procesados</span>
              </div>
            </div>
          </div>
        </div>

        {/* SIMD panel */}
        <div className={`flex flex-col p-4 rounded-2xl border bg-slate-900 transition-colors duration-300 ${simdFinished ? 'border-emerald-500/50' : 'border-cyan-500/40'}`}>
          <div className="flex items-center justify-between mb-3 shrink-0">
            <div>
              <span className="text-sm font-bold text-cyan-400 font-mono">SIMD — 1 Parrilla · {SIMD_W} Hamburguesas</span>
              <p className="text-[13px] text-slate-500">{SIMD_W} hamburguesas · {simdFinishTick} ciclos</p>
            </div>
            {simdFinished
              ? <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                className="text-xs font-bold text-emerald-400 bg-emerald-500/20 border border-emerald-500/40 px-2 py-1 rounded-lg">✓ Ciclo {simdFinishTick} · {TOTAL / simdFinishTick}× más rápido</motion.span>
              : tick > 0 ? <span className="text-xs font-mono text-cyan-400">{simdDone}/{TOTAL}</span> : null}
          </div>

          <div className="flex-1 flex items-center gap-2 min-h-0">
            <div className="flex-1 grid gap-1 content-start" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {Array.from({ length: TOTAL }, (_, i) => {
                const done = i < simdDone;
                const active = !simdFinished && i >= simdDone && i < simdDone + SIMD_W;
                return (
                  <div key={i} className={`w-full h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-all duration-200 ${done ? 'bg-slate-800/60 border border-slate-700/40 text-slate-600'
                    : active ? 'bg-cyan-500 text-white animate-[glow-pulse-cyan_1.5s_ease-in-out_infinite] shadow-none'
                      : 'bg-slate-700 border border-slate-600 text-slate-300'
                    }`}>
                    {done ? '✓' : i + 1}
                  </div>
                );
              })}
            </div>

            <ArrowRight size={14} className="text-cyan-500/50 shrink-0" />

            <div className="flex flex-col gap-1.5 shrink-0">
              <span className="text-[13px] text-slate-600 font-mono text-center">PARRILLA</span>
              {Array.from({ length: SIMD_W }, (_, lane) => {
                const itemIdx = simdBatchIdxs[lane] ?? null;
                return (
                  <div key={lane} className="flex items-center gap-1.5">
                    <div className={`w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-colors duration-200 ${itemIdx !== null ? 'border-cyan-400 bg-slate-800' : simdFinished ? 'border-emerald-500/30 bg-emerald-500/10' : 'border-slate-700 bg-slate-800'
                      }`}>
                      <AnimatePresence mode="wait">
                        {itemIdx !== null
                          ? <motion.div key={`${tick}-${lane}`} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <ItemChip idx={itemIdx} ring accent="bg-cyan-500 border-0" />
                          </motion.div>
                          : <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-emerald-400 text-sm">✓</motion.span>
                        }
                      </AnimatePresence>
                    </div>
                    <span className="text-[13px] text-slate-600 font-mono">H{lane + 1}</span>
                  </div>
                );
              })}
              <div className="flex flex-col items-center mt-1">
                <span className="text-lg font-bold font-mono text-slate-300">{simdDone}</span>
                <span className="text-[13px] text-slate-600 font-mono">procesados</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner */}
      <div className={`shrink-0 p-3 rounded-xl border text-center text-[13px] font-mono transition-all duration-300 ${tick === 0
        ? 'border-slate-800 bg-slate-900/50 text-slate-700'
        : simdFinished && !sisdFinished
          ? 'bg-cyan-500/10 border-cyan-400/40 text-cyan-300'
          : sisdFinished && simdFinished
            ? 'bg-emerald-500/10 border-emerald-400/40 text-emerald-300'
            : 'bg-slate-900 border-slate-800 text-slate-400'
        }`}>
        {tick === 0
          ? 'Presioná "Iniciar Simulación" para ver la diferencia en tiempo real'
          : simdFinished && !sisdFinished
            ? `⚡ SIMD terminó (ciclo ${simdFinishTick}) — SISD va en ${Math.round((sisdDone / TOTAL) * 100)}% · ${TOTAL - sisdDone} datos pendientes`
            : sisdFinished && simdFinished
              ? `Speedup = ${TOTAL} ciclos / ${simdFinishTick} ciclos = ${TOTAL / simdFinishTick}× más rápido`
              : `SIMD procesó ${simdDone} · SISD procesó ${sisdDone} · ventaja: +${simdDone - sisdDone} datos`}
      </div>
    </div>
  );
}

/* ───────── Slide 1.2 — Fetch-Decode-Execute ───────── */

export function Slide1_2() {
  const steps = [
    { title: '1. FETCH', desc: 'El Program Counter (PC) apunta a la siguiente instrucción en RAM y la CPU la carga.', color: 'border-cyan-400 text-cyan-300' },
    { title: '2. DECODE', desc: 'La Unidad de Control interpreta el opcode (operación) e identifica operandos.', color: 'border-blue-400 text-blue-300' },
    { title: '3. EXECUTE', desc: 'La ALU realiza el cálculo matemático o lógico sobre el dato.', color: 'border-amber-400 text-amber-300' },
    { title: '4. WRITEBACK', desc: 'El resultado se escribe de vuelta en Registros o Memoria RAM.', color: 'border-purple-400 text-purple-300' }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((s, i) => (
          <motion.div key={i} whileHover={{ y: -3 }} className={`p-4 rounded-2xl bg-slate-900 border-2 ${s.color} space-y-2`}>
            <h4 className="font-bold font-mono text-sm">{s.title}</h4>
            <p className="text-[13px] leading-relaxed text-slate-300">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
        <h4 className="text-[13px] font-bold text-amber-400 uppercase tracking-wider">Componentes Clave SISD (Von Neumann)</h4>
        <div className="grid grid-cols-4 gap-2 text-center text-[13px] font-mono">
          <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-300">1 ALU Única</div>
          <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-300">1 Bus de Memoria</div>
          <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-300">1 Stream Instrucciones</div>
          <div className="p-2 bg-slate-950 rounded-lg border border-slate-800 text-slate-300">1 Stream Datos</div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Slide 1.3 — Flynn Matrix ───────── */

export function Slide1_3() {
  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      <p className="text-[13px] text-slate-400 text-center">Matriz 2×2 basada en Flujos de Instrucciones (I) vs Flujos de Datos (D)</p>
      <div className="grid grid-cols-2 gap-4 text-left">
        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 opacity-60">
          <span className="text-[13px] font-bold px-2 py-0.5 bg-slate-800 text-slate-400 rounded">Single Instr - Single Data</span>
          <h3 className="text-lg font-bold text-slate-300 mt-1">SISD</h3>
          <p className="text-[13px] text-slate-400 mt-1">Von Neumann clásico. Procesadores uninúcleo tradicionales.</p>
        </div>

        <motion.div animate={{ boxShadow: ['0 0 15px rgba(6,182,212,0.1)', '0 0 25px rgba(6,182,212,0.3)', '0 0 15px rgba(6,182,212,0.1)'] }} transition={{ repeat: Infinity, duration: 2 }} className="p-5 rounded-2xl bg-slate-900 border-2 border-cyan-400">
          <span className="text-[13px] font-bold px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-400/30">EL FOCO HOY ★</span>
          <h3 className="text-xl font-bold text-cyan-300 mt-1">SIMD</h3>
          <p className="text-[13px] text-slate-300 mt-1">Single Instruction, Multiple Data. El especialista en cómputo masivo.</p>
        </motion.div>

        <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800 opacity-60">
          <span className="text-[13px] font-bold px-2 py-0.5 bg-slate-800 text-slate-400 rounded">Multiple Instr - Single Data</span>
          <h3 className="text-lg font-bold text-slate-300 mt-1">MISD</h3>
          <p className="text-[13px] text-slate-400 mt-1">Caso teórico / Systolic Arrays (Google TPU).</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-blue-500/40">
          <span className="text-[13px] font-bold px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded">Multiple Instr - Multiple Data</span>
          <h3 className="text-lg font-bold text-blue-300 mt-1">MIMD / SMP</h3>
          <p className="text-[13px] text-slate-300 mt-1">El Generalista. Multiprocesadores multinúcleo asíncronos.</p>
        </div>
      </div>
    </div>
  );
}

/* ───────── Slide 1.4 — SMP vs SIMD Table ───────── */

export function Slide1_4() {
  return (
    <div className="space-y-4 max-w-6xl mx-auto">
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/90 text-[13px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-950 text-slate-400">
              <th className="p-3">Dimensión</th>
              <th className="p-3 text-blue-400 font-bold">⚙️ SMP / MIMD (El Generalista)</th>
              <th className="p-3 text-cyan-400 font-bold">⚡ SIMD (El Especialista)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            <tr>
              <td className="p-3 font-bold text-slate-300">Tarea típica</td>
              <td className="p-3 text-slate-400">Multitarea asíncrona (Sistemas Operativos, DBs)</td>
              <td className="p-3 text-cyan-300 font-semibold">Procesamiento masivo síncrono (Multimedia, IA)</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-slate-300">Instrucciones</td>
              <td className="p-3 text-slate-400">Múltiples instrucciones distintas simultáneas</td>
              <td className="p-3 text-cyan-300 font-semibold">Una sola instrucción emitida para N datos</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-slate-300">Problemas típicos</td>
              <td className="p-3 text-red-400 font-semibold">Bus congestion & Spinlocks en recursos compartidos</td>
              <td className="p-3 text-red-400 font-semibold">Divergencia condicional con enmascaramiento</td>
            </tr>
            <tr>
              <td className="p-3 font-bold text-slate-300">Eficiencia Energética</td>
              <td className="p-3 text-slate-400">Moderada (overhead de control por núcleo)</td>
              <td className="p-3 text-amber-300 font-semibold">Ultra-alta (costo de decode dividido entre N)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ───────── Carátula de Sección: Parte 1 ───────── */

export function SlideIntroParte1() {
  return (
    <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 via-slate-900 to-blue-500/10 border-2 border-cyan-500/40 text-center space-y-6 max-w-3xl mx-auto shadow-2xl">
      <span className="px-4 py-1 bg-cyan-500/20 text-cyan-300 font-extrabold text-xs rounded-full border border-cyan-400/30 uppercase tracking-widest">
        Expositor: Reyes Ricardo · Parte 1
      </span>
      <h2 className="text-3xl font-extrabold text-slate-100">El Problema Secuencial y la Taxonomía de Flynn</h2>
      <div className="grid grid-cols-2 gap-3 text-left text-[13px] pt-2">
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 1.0: El Problema y el Límite Secuencial</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 1.1b: Animación SISD vs SIMD</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 1.1: Ciclo Fetch-Decode-Execute</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 1.2: Taxonomía de Flynn — Diagrama Interactivo</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 1.3: SMP vs SIMD (Generalista vs Especialista)</div>
      </div>
    </div>
  );
}
