import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, StepForward, RotateCcw, Cpu, Zap, Code2, ArrowRight } from 'lucide-react';

// ─── DATOS DEL EJEMPLO ───
const A = [5, 8, 3, 12, 7, 2, 9, 14, 4, 11, 6, 13];
const B = [1, 4, 6, 2, 3, 8, 5, 7, 9, 2, 10, 3];
const N = A.length;

// ─── CÓDIGO SISD (Escalar) ───
const CODE_SISD = [
  { line: 'mov     eax, 0            ; i = 0',        active: false },
  { line: '.loop:',                                     active: false, label: true },
  { line: 'movss   xmm0, [A+eax*4]   ; cargar A[i]',  active: false },
  { line: 'addss   xmm0, [B+eax*4]   ; sumar B[i]',   active: false, highlight: true },
  { line: 'movss   [C+eax*4], xmm0   ; guardar C[i]', active: false },
  { line: 'inc     eax               ; i++',           active: false },
  { line: 'cmp     eax, N            ; ¿i == N?',      active: false },
  { line: 'jl      .loop             ; repetir',       active: false },
];

// ─── CÓDIGO SIMD (Vectorial SSE) ───
const CODE_SIMD = [
  { line: 'mov     eax, 0            ; i = 0',        active: false },
  { line: '.loop:',                                     active: false, label: true },
  { line: 'movaps  xmm0, [A+eax*4]   ; 4 A[i..i+3]',  active: false, neon: true },
  { line: 'addps   xmm0, [B+eax*4]   ; + 4 B[i..i+3]', active: false, highlight: true, neon: true },
  { line: 'movaps  [C+eax*4], xmm0   ; guardar 4 res', active: false, neon: true },
  { line: 'add     eax, 4            ; i += 4',        active: false },
  { line: 'cmp     eax, N            ; ¿i == N?',      active: false },
  { line: 'jl      .loop             ; repetir',       active: false },
];

const CYCLES_PER_INSN = {
  movss: 1, addss: 3, movaps: 1, addps: 3,
  mov: 1, inc: 1, cmp: 1, jl: 1, add: 1,
};

function estimate(step, isSisd, processed) {
  if (step === 0) return { cycles: 0, insns: 0 };
  const iter = isSisd ? step : Math.ceil(step / 4);
  if (isSisd) {
    const insns = iter * 5 + 1; // mov eax counts once
    const cycles = insns + iter * 2; // rough: ~7c/iter
    return { cycles, insns };
  } else {
    const insns = iter * 4 + 1;
    const cycles = iter * 4 + 1;
    return { cycles, insns };
  }
}

export function SlidePracticaAsm() {
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState('both'); // 'sisd' | 'simd' | 'both'
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  const sisdDone = Math.min(step, N);
  const simdDone = Math.min(step * 4, N);
  const allDone = sisdDone >= N && simdDone >= N;

  const reset = useCallback(() => {
    clearInterval(timerRef.current);
    setStep(0);
    setRunning(false);
  }, []);

  useEffect(() => {
    if (!running || allDone) { setRunning(false); return; }
    timerRef.current = setInterval(() => {
      setStep(prev => {
        const nextSisd = Math.min(prev + 1, N);
        const nextSimd = Math.min(prev * 4 + 4, N);
        if (nextSisd >= N && nextSimd >= N) {
          clearInterval(timerRef.current);
          return N;
        }
        return Math.min(prev + 1, N);
      });
    }, 600);
    return () => clearInterval(timerRef.current);
  }, [running, allDone]);

  const stepOnce = () => {
    if (allDone) { reset(); setTimeout(() => setStep(1), 50); return; }
    setStep(prev => Math.min(prev + 1, N));
  };

  const sisdActiveIdx = sisdDone < N ? sisdDone : null;
  const simdBatch = [];
  if (simdDone < N) {
    for (let i = 0; i < 4 && simdDone + i < N; i++) simdBatch.push(simdDone + i);
  }

  // Highlight code lines for SISD
  const sisdHighlighted = step === 0 ? -1 : ((sisdDone - 1) % N) >= 0 ? ((sisdDone - 1) % 1 === 0 ? 3 : -1) : -1;
  // Actually, let me highlight lines based on where we are
  const getCodeLine = (step, isSisd) => {
    if (step === 0) return -1; // nothing highlighted
    const iter = isSisd ? Math.min(step, N) : Math.min(step * 4, N);
    if (isSisd) {
      // For SISD: highlight lines in order for each iteration
      // Line 0: mov eax (only first time)
      // Lines 2-7: loop body (iter times)
      const pos = (step - 1) % N;
      if (step === 1) return 0; // mov eax
      // After first step, cycle through the loop body
      return 2 + ((pos + 1) % 6);
      // Line 2=movss load, 3=addss, 4=movss store, 5=inc, 6=cmp, 7=jl
    } else {
      // For SIMD
      if (step === 1) return 0;
      const pos = (step - 1) % N;
      return 2 + ((pos + 1) % 6);
    }
  };

  // Simplified highlighting approach
  const sisdCodeHighlight = step === 0 ? -1 : (step <= 1 ? 0 : ((step - 2) % 6) + 2);
  const simdCodeHighlight = step === 0 ? -1 : (step <= 1 ? 0 : ((step - 2) % 6) + 2);

  // Stats
  const sisdStats = step === 0 ? { cycles: 0, insns: 0 }
    : { cycles: sisdDone * 7 + 1, insns: sisdDone * 5 + 1 };
  const simdStats = step === 0 ? { cycles: 0, insns: 0 }
    : { cycles: Math.ceil(simdDone / 4) * 5, insns: Math.ceil(simdDone / 4) * 4 + 1 };
  const speedup = sisdStats.cycles > 0 && simdStats.cycles > 0
    ? (sisdStats.cycles / simdStats.cycles).toFixed(1)
    : '—';

  return (
    <div className="w-full h-full flex flex-col gap-2 max-w-6xl mx-auto select-none">
      {/* ── Header ── */}
      <div className="shrink-0 flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <Code2 size={18} className="text-amber-400" />
          <span className="text-[13px] font-bold text-slate-200">
            Práctica: Sumar dos arreglos — <code className="text-cyan-400">C[i] = A[i] + B[i]</code>
          </span>
        </div>
        <div className="text-[13px] text-slate-500 font-mono">
          Arreglo de <span className="text-slate-300">{N}</span> elementos
        </div>
      </div>

      {/* ─── Two panels: SISD code (left) / SIMD code (right) ─── */}
      <div className="flex-1 grid grid-cols-2 gap-3 min-h-0">
        {/* ── PANEL SISD ── */}
        <div className={`rounded-2xl border overflow-hidden flex flex-col transition-colors ${step === 0 ? 'border-slate-800' : sisdDone >= N ? 'border-emerald-500/40' : 'border-red-500/30'}`}>
          <div className="shrink-0 px-3 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <span className="text-[13px] font-bold font-mono text-red-400 flex items-center gap-1.5">
              <Cpu size={14} /> SISD — Escalar (1 por vez)
            </span>
            <span className="text-[13px] font-mono text-slate-500">
              {step === 0 ? '0' : sisdDone}/{N}
            </span>
          </div>

          {/* Code listing */}
          <div className="flex-1 bg-slate-950/80 p-3 font-mono text-[13px] leading-relaxed overflow-hidden">
            {CODE_SISD.map((c, i) => (
              <div key={i} className={`flex items-center gap-2 py-[1px] rounded px-1 transition-colors ${sisdCodeHighlight === i && step > 0 && sisdDone < N ? 'bg-red-500/20 border-l-2 border-red-400' : 'border-l-2 border-transparent'} ${c.label ? 'text-slate-600 mt-1' : ''} ${step > 0 && sisdDone >= N ? 'opacity-50' : ''}`}>
                {!c.label && <span className="text-xs text-slate-700 w-4 shrink-0 text-right">{i}</span>}
                {c.label && <span className="text-xs text-slate-700 w-4 shrink-0" />}
                <span className={`${sisdCodeHighlight === i && step > 0 && sisdDone < N ? 'text-red-200' : c.label ? 'text-slate-600' : 'text-slate-400'}`}>
                  {c.line}
                </span>
                {c.highlight && sisdCodeHighlight === i && step > 0 && sisdDone < N && (
                  <span className="ml-auto text-[13px] text-red-300 font-bold shrink-0">◄ 1 dato</span>
                )}
              </div>
            ))}
          </div>

          {/* Stats */}
          {step > 0 && (
            <div className="shrink-0 px-3 py-1.5 bg-slate-900/90 border-t border-slate-800 flex justify-between text-[13px] font-mono">
              <span className="text-slate-500">Instrucciones: <span className="text-red-300 font-bold">{sisdStats.insns}</span></span>
              <span className="text-slate-500">Ciclos: <span className="text-red-300 font-bold">{sisdStats.cycles}</span></span>
            </div>
          )}

          {/* ── SISD Data Viz ── */}
          <div className="shrink-0 px-2 py-1.5 bg-slate-950/60 border-t border-slate-800">
            <div className="grid grid-cols-1 gap-0.5 text-center font-mono">
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] text-slate-600 w-3 shrink-0">A</span>
                {A.map((v, i) => {
                  const isActive = i === sisdActiveIdx && sisdDone < N;
                  const isDone = i < sisdDone;
                  return (
                    <div key={i} className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold transition-all duration-200
                      ${isDone ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                        : isActive ? 'bg-red-500/30 border border-red-400 text-red-200 animate-[glow-pulse_1.5s_ease-in-out_infinite]'
                          : 'bg-slate-800/60 border border-slate-700/50 text-slate-600'}`}>
                      {v}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] text-slate-600 w-3 shrink-0">B</span>
                {B.map((v, i) => {
                  const isActive = i === sisdActiveIdx && sisdDone < N;
                  const isDone = i < sisdDone;
                  return (
                    <div key={i} className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold transition-all duration-200
                      ${isDone ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                        : isActive ? 'bg-red-500/30 border border-red-400 text-red-200 animate-[glow-pulse_1.5s_ease-in-out_infinite]'
                          : 'bg-slate-800/60 border border-slate-700/50 text-slate-600'}`}>
                      {v}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] text-slate-600 w-3 shrink-0">C</span>
                {A.map((_, i) => {
                  const done = i < sisdDone;
                  const val = done ? A[i] + B[i] : '·';
                  return (
                    <div key={i} className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold transition-all duration-200
                      ${done ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-800/60 border border-slate-700/50 text-slate-700'}`}>
                      {val}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* ── PANEL SIMD ── */}
        <div className={`rounded-2xl border overflow-hidden flex flex-col transition-colors ${step === 0 ? 'border-slate-800' : simdDone >= N ? 'border-emerald-500/40' : 'border-cyan-500/40'}`}>
          <div className="shrink-0 px-3 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <span className="text-[13px] font-bold font-mono text-cyan-400 flex items-center gap-1.5">
              <Zap size={14} /> SIMD — SSE (4 por vez)
            </span>
            <span className="text-[13px] font-mono text-slate-500">
              {step === 0 ? '0' : simdDone}/{N}
            </span>
          </div>

          {/* Code listing */}
          <div className="flex-1 bg-slate-950/80 p-3 font-mono text-[13px] leading-relaxed overflow-hidden">
            {CODE_SIMD.map((c, i) => (
              <div key={i} className={`flex items-center gap-2 py-[1px] rounded px-1 transition-colors ${simdCodeHighlight === i && step > 0 && simdDone < N ? 'bg-cyan-500/20 border-l-2 border-cyan-400' : 'border-l-2 border-transparent'} ${c.label ? 'text-slate-600 mt-1' : ''} ${step > 0 && simdDone >= N ? 'opacity-50' : ''}`}>
                {!c.label && <span className="text-xs text-slate-700 w-4 shrink-0 text-right">{i}</span>}
                {c.label && <span className="text-xs text-slate-700 w-4 shrink-0" />}
                <span className={`${simdCodeHighlight === i && step > 0 && simdDone < N ? 'text-cyan-200' : c.label ? 'text-slate-600' : c.neon ? 'text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.35)]' : 'text-slate-400'}`}>
                  {c.line}
                </span>
                {c.highlight && simdCodeHighlight === i && step > 0 && simdDone < N && (
                  <span className="ml-auto text-[13px] text-cyan-300 font-bold shrink-0">◄ 4 datos</span>
                )}
              </div>
            ))}
          </div>

          {/* Stats */}
          {step > 0 && (
            <div className="shrink-0 px-3 py-1.5 bg-slate-900/90 border-t border-slate-800 flex justify-between text-[13px] font-mono">
              <span className="text-slate-500">Instrucciones: <span className="text-cyan-300 font-bold">{simdStats.insns}</span></span>
              <span className="text-slate-500">Ciclos: <span className="text-cyan-300 font-bold">{simdStats.cycles}</span></span>
            </div>
          )}

          {/* ── SIMD Data Viz ── */}
          <div className="shrink-0 px-2 py-1.5 bg-slate-950/60 border-t border-slate-800">
            <div className="grid grid-cols-1 gap-0.5 text-center font-mono">
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] text-slate-600 w-3 shrink-0">A</span>
                {A.map((v, i) => {
                  const inBatch = simdBatch.includes(i);
                  const isDone = i < simdDone;
                  return (
                    <div key={i} className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold transition-all duration-200
                      ${isDone ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                        : inBatch ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-200 animate-[glow-pulse-cyan_1.5s_ease-in-out_infinite]'
                          : 'bg-slate-800/60 border border-slate-700/50 text-slate-600'}`}>
                      {v}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] text-slate-600 w-3 shrink-0">B</span>
                {B.map((v, i) => {
                  const inBatch = simdBatch.includes(i);
                  const isDone = i < simdDone;
                  return (
                    <div key={i} className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold transition-all duration-200
                      ${isDone ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                        : inBatch ? 'bg-cyan-500/30 border border-cyan-400 text-cyan-200 animate-[glow-pulse-cyan_1.5s_ease-in-out_infinite]'
                          : 'bg-slate-800/60 border border-slate-700/50 text-slate-600'}`}>
                      {v}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-0.5">
                <span className="text-[10px] text-slate-600 w-3 shrink-0">C</span>
                {A.map((_, i) => {
                  const done = i < simdDone;
                  const val = done ? A[i] + B[i] : '·';
                  return (
                    <div key={i} className={`w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold transition-all duration-200
                      ${done ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                        : 'bg-slate-800/60 border border-slate-700/50 text-slate-700'}`}>
                      {val}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Controls + Speedup Banner ─── */}
      <div className="shrink-0 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button onClick={stepOnce} disabled={allDone}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold hover:bg-slate-800 hover:border-slate-600 disabled:opacity-30 transition-all">
            <StepForward size={13} /> Paso
          </button>
          <button onClick={() => { if (allDone) reset(); setRunning(r => !r); }} disabled={allDone && !running}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-xs font-bold hover:bg-cyan-500/30 disabled:opacity-30 transition-all">
            <Play size={13} /> {running ? 'Automático' : 'Auto'}
          </button>
          <button onClick={reset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 text-xs hover:text-slate-200 transition-all">
            <RotateCcw size={13} /> Reset
          </button>
        </div>

        <AnimatePresence>
          {step > 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className={`px-4 py-1.5 rounded-lg border text-[13px] font-bold font-mono ${sisdDone >= N && simdDone >= N
                ? 'bg-emerald-500/10 border-emerald-400/40 text-emerald-300'
                : 'bg-slate-900 border-slate-700 text-slate-300'}`}>
              {sisdDone >= N && simdDone >= N
                ? <>Speedup: <span className="text-emerald-300">{speedup}×</span></>
                : <>Speedup: <span className="text-cyan-300">{speedup}</span>× — corriendo...</>}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ADDPS highlight */}
        {step > 0 && simdDone < N && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-[13px] text-cyan-400 font-bold bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/30">
            ⚡ addps = 4 sumas en 1 ciclo
          </motion.div>
        )}
      </div>
    </div>
  );
}
