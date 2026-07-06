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

/* ───────── Slide 2.3 — Array vs Vector Processor (Interactivo) ───────── */

const PIPE_STAGES = [
  { id: 'load', short: 'LD', label: 'Load', op: 'LD' },
  { id: 'mul', short: 'MUL', label: 'Multiply ×2', op: 'MUL' },
  { id: 'add', short: 'ADD', label: 'Add +5', op: 'ADD' },
  { id: 'store', short: 'ST', label: 'Store', op: 'ST' },
];

const ST_OPS = ['LD', 'MUL', 'ADD', 'ST'];
const ST_COLORS = {
  LD: '#06b6d4',
  MUL: '#a855f7',
  ADD: '#f59e0b',
  ST: '#10b981',
};

// Función pura: aplica la etapa sIdx a un valor inicial a[i]
const applyStage = (val, sIdx) => {
  switch (sIdx) {
    case 0: return val;          // LD: raw
    case 1: return val * 2;       // MUL: ×2
    case 2: return val * 2 + 5;   // ADD: +5
    case 3: return val * 2 + 5;   // ST: resultado
    default: return val;
  }
};

function ArrayDiag({ cycle: externalCycle }) {
  const [localCycle, setLocalCycle] = useState(0);
  const isInteractive = externalCycle !== undefined;
  const cycle = isInteractive ? externalCycle : localCycle;

  useEffect(() => {
    if (isInteractive) return;
    const interval = setInterval(() => {
      setLocalCycle(c => (c >= 3 ? 0 : c + 1));
    }, 1800);
    return () => clearInterval(interval);
  }, [isInteractive]);

  const DATA = [3, 12, 3, 8];

  const activeOp = cycle < 4 ? ST_OPS[cycle] : null;
  const glowColor = activeOp ? ST_COLORS[activeOp] : '#475569';

  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950/50 border border-slate-800 w-full h-full min-h-[280px]">
      <svg viewBox="0 0 420 260" className="w-full max-w-[420px] h-auto">
        {/* CU */}
        <rect x="110" y="10" width="200" height="35" rx="6" fill="#1e293b" stroke={glowColor} strokeWidth={activeOp ? 2 : 1} className="transition-all duration-300" />
        <text x="210" y="31" fill="#f8fafc" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
          ⚙️ CU: {activeOp ? `Instrucción: ${activeOp}` : 'IDLE / Fin de Vector'}
        </text>

        {/* Bus line from CU to PEs */}
        <path d="M 210,45 L 210,70 M 60,70 L 360,70 M 60,70 L 60,95 M 160,70 L 160,95 M 260,70 L 260,95 M 360,70 L 360,95" 
          stroke={activeOp ? glowColor : '#334155'} strokeWidth="1.5" fill="none" className="transition-all duration-300" />

        {/* PEs */}
        {[0, 1, 2, 3].map(i => {
          const isPEActive = activeOp !== null;
          const peColor = isPEActive ? glowColor : '#334155';
          const rx = 60 + i * 100;
          
          let valLabel = '—';
          if (cycle === 0) valLabel = `a[${i}]`;
          else if (cycle === 1) valLabel = `${DATA[i]}×2`;
          else if (cycle === 2) valLabel = `${DATA[i] * 2}+5`;
          else if (cycle >= 3) valLabel = `${DATA[i] * 2 + 5}`;

          return (
            <g key={i}>
              {/* PE box */}
              <rect x={rx - 38} y="95" width="76" height="50" rx="6" fill="#0f172a" stroke={peColor} strokeWidth={isPEActive ? 2 : 1} className="transition-all duration-300" />
              <text x={rx} y="110" fill="#f1f5f9" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">PE {i}</text>
              <text x={rx} y="121" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">ALU Multiuso</text>
              <text x={rx} y="136" fill={isPEActive ? glowColor : '#64748b'} fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle" className="transition-all duration-300">
                {valLabel}
              </text>

              {/* Data line to Memory */}
              <line x1={rx} y1="145" x2={rx} y2="195" stroke={peColor} strokeWidth="1.5" strokeDasharray={activeOp === 'LD' || activeOp === 'ST' ? '4 4' : 'none'} className="transition-all duration-300" />

              {/* Local Memory box */}
              <rect x={rx - 35} y="195" width="70" height="35" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
              <text x={rx} y="208" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">Mem {i}</text>
              <text x={rx} y="222" fill="#cbd5e1" fontSize="9" fontFamily="monospace" textAnchor="middle">
                {cycle >= 3 ? `${DATA[i] * 2 + 5}` : `${DATA[i]}`}
              </text>
            </g>
          );
        })}

        {/* Animated flow dots */}
        {activeOp === 'LD' && [0, 1, 2, 3].map(i => {
          const rx = 60 + i * 100;
          return (
            <circle key={i} r="3" fill="#06b6d4" cx={rx} cy="170">
              <animate attributeName="cy" from="195" to="145" dur="1s" repeatCount="indefinite" />
            </circle>
          );
        })}
        {activeOp === 'ST' && [0, 1, 2, 3].map(i => {
          const rx = 60 + i * 100;
          return (
            <circle key={i} r="3" fill="#10b981" cx={rx} cy="170">
              <animate attributeName="cy" from="145" to="195" dur="1s" repeatCount="indefinite" />
            </circle>
          );
        })}
      </svg>
    </div>
  );
}

function VectorDiag({ cycle: externalCycle }) {
  const [localCycle, setLocalCycle] = useState(0);
  const isInteractive = externalCycle !== undefined;
  const cycle = isInteractive ? externalCycle : localCycle;

  useEffect(() => {
    if (isInteractive) return;
    const interval = setInterval(() => {
      setLocalCycle(c => (c >= 10 ? 0 : c + 1));
    }, 1800);
    return () => clearInterval(interval);
  }, [isInteractive]);

  const DATA = [3, 12, 3, 8, 15, 7, 2, 9];

  const applyStage = (val, sIdx) => {
    switch (sIdx) {
      case 0: return val;
      case 1: return val * 2;
      case 2: return val * 2 + 5;
      case 3: return val * 2 + 5;
      default: return val;
    }
  };

  const getStageCenter = (s) => {
    switch (s) {
      case 0: return 110;
      case 1: return 220;
      case 2: return 330;
      case 3: return 440;
      default: return 80;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-950/50 border border-slate-800 w-full h-full min-h-[280px]">
      <svg viewBox="0 0 540 200" className="w-full max-w-[540px] h-auto">
        {/* Stage Boxes */}
        {[
          { label: 'LD Stage', desc: 'Load Unit', x: 70, color: '#06b6d4' },
          { label: 'MUL Stage', desc: '×2 Unit', x: 180, color: '#a855f7' },
          { label: 'ADD Stage', desc: '+5 Unit', x: 290, color: '#f59e0b' },
          { label: 'ST Stage', desc: 'Store Unit', x: 400, color: '#10b981' }
        ].map((st, sIdx) => {
          const activeElemIdx = cycle - sIdx;
          const isActive = activeElemIdx >= 0 && activeElemIdx < DATA.length;
          return (
            <g key={sIdx}>
              <rect x={st.x} y="45" width="80" height="60" rx="8" fill="#1e293b" 
                stroke={isActive ? st.color : '#334155'} strokeWidth={isActive ? 2 : 1} className="transition-all duration-300" />
              <text x={st.x + 40} y="63" fill="#f8fafc" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">{st.label}</text>
              <text x={st.x + 40} y="77" fill="#64748b" fontSize="7" fontFamily="monospace" textAnchor="middle">{st.desc}</text>
            </g>
          );
        })}

        {/* Bus connection lines */}
        <path d="M 10,75 L 70,75 M 150,75 L 180,75 M 260,75 L 290,75 M 370,75 L 400,75 M 480,75 L 530,75" 
          stroke="#475569" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />

        {/* Labels for queues */}
        <text x="35" y="135" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">Cola de Entrada</text>
        <text x="500" y="135" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">Cola de Salida</text>

        {/* Vector elements flowing */}
        {DATA.map((val, idx) => {
          const s = cycle - idx;
          
          let cx = 80;
          let cy = 75;
          let dispVal = val;
          let bg = '#475569';
          let border = '#334155';
          let isVisible = true;

          if (s < 0) {
            cx = 45 + s * 22;
            dispVal = val;
            bg = '#0f172a';
            border = '#334155';
            if (cx < 10) isVisible = false;
          } else if (s >= 0 && s < 4) {
            cx = getStageCenter(s);
            dispVal = applyStage(val, s);
            bg = s === 0 ? 'rgba(6,182,212,0.2)' : s === 1 ? 'rgba(168,85,247,0.2)' : s === 2 ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)';
            border = s === 0 ? '#06b6d4' : s === 1 ? '#a855f7' : s === 2 ? '#f59e0b' : '#10b981';
          } else {
            cx = 505 + (s - 4) * 22;
            dispVal = val * 2 + 5;
            bg = 'rgba(16,185,129,0.1)';
            border = '#10b981';
            if (cx > 530) isVisible = false;
          }

          if (!isVisible) return null;

          return (
            <g key={idx} className="transition-all duration-500 ease-in-out">
              <circle cx={cx} cy={cy} r="10" fill={bg} stroke={border} strokeWidth="1.5" />
              <text x={cx} y={cy + 3} fill="#f8fafc" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                {dispVal}
              </text>
              <text x={cx} y={cy - 12} fill="#64748b" fontSize="6" fontFamily="monospace" textAnchor="middle">
                v[{idx}]
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function Slide2_3() {
  const [cycle, setCycle] = useState(3);
  const [filter, setFilter] = useState('both'); // 'array' | 'vector' | 'both'

  const DATA = [3, 12, 3, 8, 15, 7, 2, 9];

  const next = () => {
    setCycle(c => (c >= 10 ? 0 : c + 1));
  };

  return (
    <div className="w-full h-full flex flex-col gap-2 max-w-7xl mx-auto p-2">
      {/* ── Header con selector de ciclo (SOLO si filter === 'both') ── */}
      <div className="shrink-0 flex items-center justify-between px-2">
        <div>
          <h3 className="text-base font-bold text-slate-100">Array <span className="text-slate-500">vs.</span> Vector Processors</h3>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Dualidad Espacio-Tiempo · SIMD</p>
        </div>
        {filter === 'both' && (
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-slate-500 shrink-0">Cycle:</span>
            {/* ── Scroll Virtual ── */}
            <div className="flex-1 max-w-[320px] overflow-x-auto scrollbar-thin scroll-smooth snap-x snap-mandatory"
              style={{ scrollbarWidth: 'thin' }}>
              <div className="flex items-center gap-1 px-1">
                {Array.from({ length: 11 }, (_, i) => (
                  <button key={i}
                    onClick={() => setCycle(i)}
                    className={`shrink-0 snap-center w-8 h-8 rounded-lg text-[11px] font-mono font-bold transition-all ${
                      cycle === i
                        ? 'bg-rose-500 text-white shadow-md shadow-rose-500/40 ring-2 ring-rose-400 scale-110'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-600'
                    }`}>
                    {i}
                  </button>
                ))}
              </div>
            </div>
            <button onClick={next}
              className="shrink-0 px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-mono font-bold hover:bg-slate-700">
              ▶ Next
            </button>
          </div>
        )}
      </div>

      {/* ── Filtro: Array / Vector / Ambos ── */}
      <div className="shrink-0 flex items-center justify-center gap-1.5 px-2">
        {[
          { id: 'array', label: '🧮 Array', desc: 'Solo Array Processor' },
          { id: 'vector', label: '🏭 Vector', desc: 'Solo Vector Processor' },
          { id: 'both', label: '⚡ Ambos', desc: 'Comparativa lado a lado' },
        ].map(opt => (
          <button key={opt.id}
            onClick={() => setFilter(opt.id)}
            className={`px-3 py-1 rounded-lg text-[11px] font-mono font-bold transition-all ${
filter === opt.id
                ? opt.id === 'array'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                  : opt.id === 'vector'
                    ? 'bg-purple-500 text-white shadow-md shadow-purple-500/30'
                    : 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-600'
            }`}>
            {opt.label}
          </button>
        ))}
      </div>

      {/* ── Content Area based on Filter ── */}
      {filter === 'array' && (
        <div className="flex-1 flex flex-col md:flex-row gap-6 p-5 rounded-2xl bg-slate-900 border-2 border-amber-500/40 items-center justify-center min-h-0 overflow-y-auto">
          <div className="flex-1 max-w-xl w-full">
            <ArrayDiag />
          </div>
          <div className="flex-1 flex flex-col gap-4 justify-center max-w-lg">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-amber-500/70 uppercase tracking-wider block">Paralelismo en ESPACIO</span>
              <h4 className="text-xl font-bold text-amber-400">Procesador Matricial (Array Processor)</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Consiste en un conjunto de <strong className="text-amber-300">N Unidades de Procesamiento (PEs) idénticas</strong> que ejecutan la misma instrucción de forma síncrona, cada una sobre su propio conjunto de datos.
            </p>
            <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
              <li>Una única **Unidad de Control (CU)** decodifica la instrucción y la transmite (broadcast) a todos los PEs.</li>
              <li>Cada PE cuenta con una **ALU idéntica y de propósito general** (capaz de realizar sumas, multiplicaciones, etc.) y memoria local.</li>
              <li>Todas las ALUs operan en **lockstep** (al unísono). Si la CU emite un ADD, todos los PEs suman en ese ciclo.</li>
              <li>Ejemplo histórico emblemático: la supercomputadora <strong className="text-amber-300 font-mono">ILLIAC IV</strong> (década de 1960).</li>
            </ul>
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200 leading-snug">
              <strong>Kryptonita:</strong> Si los datos requieren caminos de ejecución distintos (un condicional `if/else`), algunos PEs deben enmascararse (desactivarse), perdiendo paralelismo.
            </div>
          </div>
        </div>
      )}

      {filter === 'vector' && (
        <div className="flex-1 flex flex-col md:flex-row gap-6 p-5 rounded-2xl bg-slate-900 border-2 border-purple-500/40 items-center justify-center min-h-0 overflow-y-auto">
          <div className="flex-1 max-w-xl w-full">
            <VectorDiag />
          </div>
          <div className="flex-1 flex flex-col gap-4 justify-center max-w-lg">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-purple-500/70 uppercase tracking-wider block">Paralelismo en TIEMPO</span>
              <h4 className="text-xl font-bold text-purple-400">Procesador Vectorial</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              En lugar de replicar hardware completo, utiliza **unidades funcionales (ALUs) especializadas y profundamente segmentadas (pipelines)** por donde los elementos del vector fluyen de forma continua.
            </p>
            <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
              <li>Cuenta con pipelines dedicados para operaciones específicas: suma vectorial, multiplicación vectorial, etc.</li>
              <li>El paralelismo se da en el tiempo: mientras un elemento se suma, el siguiente se multiplica en la etapa anterior.</li>
              <li>Ahorra transistores y área de silicio al compartir el mismo circuito físico para todo el vector.</li>
              <li>Permite **Vector Chaining**: encadenar la salida de una unidad especializada directamente como entrada de otra sin pasar por memoria.</li>
            </ul>
            <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200 leading-snug">
              <strong>Throughput:</strong> Al igual que el Array, entrega 1 resultado por ciclo una vez lleno el pipeline, pero con un costo de hardware significativamente menor.
            </div>
          </div>
        </div>
      )}

      {filter === 'both' && (
        <>
          <div className="flex-1 grid grid-cols-2 gap-3 min-h-0">
            {/* ── ARRAY PROCESSOR SIMULATOR ── */}
            <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-slate-900 border-2 border-amber-500/40 overflow-hidden">
              <div className="shrink-0 flex items-center justify-between">
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <Layers size={14} /> Array Processor
                </h4>
                <span className="text-[10px] font-mono text-amber-500/70 uppercase tracking-wider">Lockstep Espacial</span>
              </div>
              <div className="flex-1 min-h-0">
                <ArrayDiag cycle={cycle} />
              </div>
              <div className="shrink-0 p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[10px] text-amber-200 leading-none">
                <strong>Espacio:</strong> Los 4 PEs ejecutan la misma operación al mismo tiempo en paralelo.
              </div>
            </div>

            {/* ── VECTOR PROCESSOR SIMULATOR ── */}
            <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-slate-900 border-2 border-purple-500/40 overflow-hidden">
              <div className="shrink-0 flex items-center justify-between">
                <h4 className="text-sm font-bold text-purple-400 flex items-center gap-2">
                  <Activity size={14} /> Vector Processor
                </h4>
                <span className="text-[10px] font-mono text-purple-500/70 uppercase tracking-wider">Pipeline Temporal</span>
              </div>
              <div className="flex-1 min-h-0">
                <VectorDiag cycle={cycle} />
              </div>
              <div className="shrink-0 p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-[10px] text-purple-200 leading-none">
                <strong>Tiempo:</strong> Los elementos fluyen a través de etapas con operaciones distintas.
              </div>
            </div>
          </div>

          {/* ── 📐 Panel de Cálculos alineado con el ciclo actual ── */}
          <div className="shrink-0 p-2 rounded-xl bg-slate-950/80 border border-slate-700/50">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider">📐 Cálculos en Ejecución @ Ciclo {cycle}</span>
              <span className="text-[9px] font-mono text-slate-600">Fórmula: a[i] = (a[i] × 2) + 5</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {/* Array calculations */}
              <div className="p-1.5 rounded-lg bg-amber-500/5 border border-amber-500/20">
                <div className="text-[9px] font-mono font-bold text-amber-400 mb-1">🧮 Array (lockstep: 4 elementos a la vez)</div>
                {cycle < 4 ? (
                  <div className="text-[10px] font-mono text-amber-200/90 leading-snug">
                    <span className="font-bold">{ST_OPS[cycle]}</span> simultáneo en los 4 PEs:
                    {' '}{DATA.slice(0, 4).map(v => {
                      const r = applyStage(v, cycle);
                      return `${v}${cycle === 0 ? '' : cycle === 1 ? '×2' : cycle === 2 ? '×2+5' : ''}=${r}`;
                    }).join(' · ')}
                  </div>
                ) : (
                  <div className="text-[10px] font-mono text-slate-500">Array ya completó sus 4 ciclos. Resultado final: [{DATA.slice(0, 4).map(v => v * 2 + 5).join(', ')}]</div>
                )}
              </div>
              {/* Vector calculations */}
              <div className="p-1.5 rounded-lg bg-purple-500/5 border border-purple-500/20">
                <div className="text-[9px] font-mono font-bold text-purple-400 mb-1">🏭 Vector (flujo segmentado)</div>
                <div className="text-[10px] font-mono text-purple-200/90 leading-snug">
                  {PIPE_STAGES.map((stage, sIdx) => {
                    const elemIdx = cycle - sIdx;
                    const isActive = elemIdx >= 0 && elemIdx < DATA.length;
                    return (
                      <span key={sIdx} className="mr-2.5">
                        <span className="font-bold" style={{ color: ST_COLORS[stage.op] }}>{stage.short}</span>
                        : {isActive ? `a[${elemIdx}]=${applyStage(DATA[elemIdx], sIdx)}` : '—'}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ───────── Slide 2.5 — Código Secuencial vs Vectorial (con scroll virtual) ───────── */

export function Slide2_5() {
  const [cycle, setCycle] = useState(0);

  // Datos de prueba: A + B → C (4 elementos)
  const A = [3, 12, 3, 8];
  const B = [5, 7, 9, 2];
  const N = A.length;
  const C = A.map((a, i) => a + B[i]); // [8, 19, 12, 10]

  // Estado por ciclo:
  // Ciclo 0-3: SISD hace A[i]+B[i] para i=0..3
  // Ciclo 0: SIMD hace TODO en 1 ciclo (VADD sobre 4 lanes)
  const sisdActive = cycle < N;
  const simdDone = cycle >= 0; // SIMD termina en el primer ciclo
  const totalSisdCycles = N; // 4
  const totalSimdCycles = 1;
  const speedup = totalSisdCycles / totalSimdCycles;

  const next = () => setCycle(c => (c >= N ? 0 : c + 1));

  return (
    <div className="w-full h-full flex flex-col gap-2 max-w-7xl mx-auto p-2">
      {/* ── Header con selector de ciclo ── */}
      <div className="shrink-0 flex items-center justify-between px-2">
        <div>
          <h3 className="text-base font-bold text-slate-100">
            Código <span className="text-red-400">Secuencial</span> vs <span className="text-cyan-400">Vectorial</span>
          </h3>
          <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
            SISD vs SIMD · Loop escalar vs VADDPS sobre XMM (128b)
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-slate-500 shrink-0">Cycle:</span>
          {/* ── Scroll Virtual ── */}
          <div
            className="flex-1 max-w-[320px] overflow-x-auto scroll-smooth snap-x snap-mandatory"
            style={{ scrollbarWidth: 'thin' }}
          >
            <div className="flex items-center gap-1 px-1">
              {Array.from({ length: N + 1 }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCycle(i)}
                  className={`shrink-0 snap-center w-8 h-8 rounded-lg text-[11px] font-mono font-bold transition-all ${
                    cycle === i
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/40 ring-2 ring-rose-400 scale-110'
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200 hover:border-slate-600'
                  }`}
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={next}
            className="shrink-0 px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 text-[10px] font-mono font-bold hover:bg-slate-700"
          >
            ▶ Next
          </button>
        </div>
      </div>

      {/* ── Dos columnas: SISD vs SIMD ── */}
      <div className="flex-1 grid grid-cols-2 gap-3 min-h-0">
        {/* ── SISD (Loop escalar) ── */}
        <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-slate-900 border-2 border-red-500/40 overflow-hidden">
          <div className="shrink-0 flex items-center justify-between">
            <h4 className="text-sm font-bold text-red-400 flex items-center gap-2">
              🐢 SISD · Loop escalar
            </h4>
            <span className="text-[10px] font-mono text-red-500/70 uppercase tracking-wider">
              {totalSisdCycles} instrucciones · {totalSisdCycles} ciclos
            </span>
          </div>

          {/* Código */}
          <div className="shrink-0 p-2 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 leading-snug">
            <div className="text-slate-500">// 1 elemento por iteracion</div>
            <div><span className="text-red-400">for</span> (i = 0; i &lt; {N}; i++)</div>
            <div>&nbsp;&nbsp;<span className="text-red-400">c[i]</span> = a[i] + b[i];</div>
          </div>

          {/* Visualización del loop por iteracion */}
          <div className="shrink-0">
            <div className="text-[10px] font-mono text-slate-500 mb-1">Iteraciones del loop:</div>
            <div className="grid grid-cols-{N} gap-1">
              {A.map((a, i) => {
                const isCurrent = i === cycle && sisdActive;
                const isDone = i < cycle;
                return (
                  <div
                    key={i}
                    className={`p-1.5 rounded-lg border text-center transition-all ${
                      isCurrent
                        ? 'bg-red-500/20 border-red-400 ring-2 ring-red-400 shadow-md shadow-red-500/30 scale-105'
                        : isDone
                          ? 'bg-emerald-500/15 border-emerald-500/40'
                          : 'bg-slate-950 border-slate-800 opacity-50'
                    }`}
                  >
                    <div className="text-[9px] font-mono text-slate-500">c[{i}]</div>
                    <div className={`text-sm font-bold font-mono ${
                      isCurrent ? 'text-red-300' : isDone ? 'text-emerald-300' : 'text-slate-600'
                    }`}>
                      {isDone ? C[i] : isCurrent ? `${a}+${B[i]}=?` : '—'}
                    </div>
                    <div className={`text-[8px] font-mono ${
                      isCurrent ? 'text-red-400' : isDone ? 'text-emerald-500/70' : 'text-slate-700'
                    }`}>
                      {isCurrent ? '⏳ procesando' : isDone ? '✓ listo' : 'pendiente'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Estado actual */}
          <div className="shrink-0 p-2 rounded-lg bg-slate-950/60 border border-red-500/20 text-[11px]">
            {sisdActive ? (
              <span className="text-red-200 font-mono">
                <span className="font-bold">Ciclo {cycle}:</span> ADD A[{cycle}], B[{cycle}] → C[{cycle}] = {A[cycle]} + {B[cycle]} = <span className="font-bold text-emerald-300">{C[cycle]}</span>
              </span>
            ) : (
              <span className="text-emerald-300 font-mono">
                ✓ Loop completo. C = [{C.join(', ')}]. Total: {totalSisdCycles} instrucciones ejecutadas.
              </span>
            )}
          </div>
        </div>

        {/* ── SIMD (VADDPS) ── */}
        <div className="flex flex-col gap-1.5 p-3 rounded-2xl bg-slate-900 border-2 border-cyan-500/40 overflow-hidden">
          <div className="shrink-0 flex items-center justify-between">
            <h4 className="text-sm font-bold text-cyan-400 flex items-center gap-2">
              ⚡ SIMD · VADDPS vectorial
            </h4>
            <span className="text-[10px] font-mono text-cyan-500/70 uppercase tracking-wider">
              1 instrucción · 1 ciclo
            </span>
          </div>

          {/* Código */}
          <div className="shrink-0 p-2 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 leading-snug">
            <div className="text-slate-500">// 4 elementos por instrucción (XMM = 128b)</div>
            <div><span className="text-cyan-300 font-bold">VADDPS</span> xmm0, xmm1, xmm2</div>
            <div className="text-emerald-400/90 text-[10px] mt-0.5">└─ 4 sumas en paralelo: A+B → C</div>
          </div>

          {/* Visualización del vector register */}
          <div className="shrink-0">
            <div className="text-[10px] font-mono text-slate-500 mb-1">Registro XMM (128 bits = 4 lanes):</div>
            <div className="grid grid-cols-4 gap-1">
              {A.map((a, i) => {
                const inFlight = cycle === 0;
                const done = cycle >= 0;
                return (
                  <div
                    key={i}
                    className={`p-1.5 rounded-lg border text-center transition-all ${
                      inFlight
                        ? 'bg-cyan-500/20 border-cyan-400 ring-2 ring-cyan-400 shadow-md shadow-cyan-500/30 scale-105'
                        : done
                          ? 'bg-emerald-500/15 border-emerald-500/40'
                          : 'bg-slate-950 border-slate-800 opacity-50'
                    }`}
                  >
                    <div className="text-[9px] font-mono text-slate-500">lane {i}</div>
                    <div className={`text-[10px] font-mono ${inFlight ? 'text-cyan-300' : done ? 'text-emerald-500/70' : 'text-slate-600'}`}>
                      {a} + {B[i]}
                    </div>
                    <div className={`text-sm font-bold font-mono ${
                      inFlight ? 'text-cyan-200' : done ? 'text-emerald-300' : 'text-slate-600'
                    }`}>
                      {done ? C[i] : '—'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Estado actual */}
          <div className="shrink-0 p-2 rounded-lg bg-slate-950/60 border border-cyan-500/20 text-[11px]">
            {cycle === 0 ? (
              <span className="text-cyan-200 font-mono">
                <span className="font-bold">Ciclo 0:</span> VADDPS ejecuta en paralelo en las 4 lanes → C = [{C.join(', ')}] · <span className="text-emerald-300 font-bold">¡listo en 1 ciclo!</span>
              </span>
            ) : (
              <span className="text-emerald-300 font-mono">
                ✓ SIMD completo en 1 ciclo. Resultado: C = [{C.join(', ')}]. CPU idle mientras SISD sigue trabajando.
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ── 📐 Panel de cálculos alineado con el ciclo ── */}
      <div className="shrink-0 p-2 rounded-xl bg-slate-950/80 border border-slate-700/50">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="text-[10px] font-mono font-bold text-slate-300 uppercase tracking-wider">
            📐 Cálculos @ Cycle {cycle}
          </span>
          <span className="text-[9px] font-mono text-slate-600">a[i] + b[i] → c[i]</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {/* SISD calc */}
          <div className="p-1.5 rounded-lg bg-red-500/5 border border-red-500/20">
            <div className="text-[9px] font-mono font-bold text-red-400 mb-1">🐢 SISD (1 elem/ciclo)</div>
            <div className="text-[10px] font-mono text-red-200/90 leading-snug">
              {sisdActive
                ? <span><span className="font-bold">c[{cycle}]</span> = a[{cycle}] + b[{cycle}] = {A[cycle]} + {B[cycle]} = <span className="text-emerald-300 font-bold">{C[cycle]}</span></span>
                : <span className="text-emerald-300">✓ Finalizado en ciclo {N - 1}</span>}
            </div>
          </div>

          {/* SIMD calc */}
          <div className="p-1.5 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
            <div className="text-[9px] font-mono font-bold text-cyan-400 mb-1">⚡ SIMD (4 elem/ciclo)</div>
            <div className="text-[10px] font-mono text-cyan-200/90 leading-snug">
              <span className="font-bold">[c0..c3]</span> = [a0..a3] + [b0..b3] = [{A.join('+')}] + [{B.join('+')}] = <span className="text-emerald-300 font-bold">[{C.join(',')}]</span>
            </div>
          </div>

          {/* Speedup */}
          <div className="p-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/20">
            <div className="text-[9px] font-mono font-bold text-emerald-400 mb-1">📊 Speedup real</div>
            <div className="text-[10px] font-mono text-emerald-200/90 leading-snug">
              <span className="font-bold">{totalSisdCycles} instr / {totalSimdCycles} instr</span> = <span className="text-emerald-300 font-bold text-base">{speedup}×</span> {cycle >= N - 1 && <span className="text-slate-500"> (techo)</span>}
            </div>
          </div>
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
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 2.1: ¿Qué es SIMD? + Analogía</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 2.2: Registros Vectoriales y Control</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 2.3: Array vs Vector Processor</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 2.4: Ventajas del Procesamiento Vectorial</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-cyan-400 font-semibold">• Slide 2.5: ⚡ SISD vs SIMD (Código)</div>
      </div>
    </div>
  );
}
