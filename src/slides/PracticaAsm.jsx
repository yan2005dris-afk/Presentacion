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

export function SlidePracticaAsm() {
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(false);
  const timerRef = useRef(null);

  // Total instruction steps: 1 initial (mov eax) + 6 steps per iteration
  const sisdMaxSteps = 1 + N * 6;
  const simdMaxSteps = 1 + Math.ceil(N / 4) * 6;
  const maxSteps = Math.max(sisdMaxSteps, simdMaxSteps);

  const allDone = step >= maxSteps;

  const reset = useCallback(() => {
    clearInterval(timerRef.current);
    setStep(0);
    setRunning(false);
  }, []);

  useEffect(() => {
    if (!running || allDone) { setRunning(false); return; }
    timerRef.current = setInterval(() => {
      setStep(prev => {
        if (prev + 1 >= maxSteps) {
          clearInterval(timerRef.current);
          return maxSteps;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(timerRef.current);
  }, [running, allDone, maxSteps]);

  const stepOnce = () => {
    if (allDone) { reset(); setTimeout(() => setStep(1), 50); return; }
    setStep(prev => Math.min(prev + 1, maxSteps));
  };

  // --- SISD State ---
  let sisdCodeHighlight = -1;
  let sisdDone = 0;
  let sisdActiveIdx = null;

  if (step === 1) {
    sisdCodeHighlight = 0; // mov eax, 0
  } else if (step > 1) {
    const iter = Math.floor((step - 2) / 6);
    if (iter >= N) {
      sisdDone = N;
      sisdCodeHighlight = -1;
    } else {
      sisdActiveIdx = iter;
      sisdCodeHighlight = 2 + ((step - 2) % 6); // 2=movss, 3=addss, 4=movss, 5=inc, 6=cmp, 7=jl
      // Element is officially stored in RAM C starting at line 5 (after line 4 store executes)
      sisdDone = (step - 2) % 6 >= 3 ? iter + 1 : iter;
    }
  }

  // --- SIMD State ---
  let simdCodeHighlight = -1;
  let simdDone = 0;
  let simdBatch = [];

  if (step === 1) {
    simdCodeHighlight = 0; // mov eax, 0
  } else if (step > 1) {
    const iter = Math.floor((step - 2) / 6);
    const totalSimdIters = Math.ceil(N / 4);
    if (iter >= totalSimdIters) {
      simdDone = N;
      simdCodeHighlight = -1;
    } else {
      for (let k = 0; k < 4 && iter * 4 + k < N; k++) simdBatch.push(iter * 4 + k);
      simdCodeHighlight = 2 + ((step - 2) % 6); // 2=movaps, 3=addps, 4=movaps, 5=add, 6=cmp, 7=jl
      // Batch of 4 is officially stored in RAM C starting at line 5 (after line 4 store executes)
      simdDone = (step - 2) % 6 >= 3 ? Math.min((iter + 1) * 4, N) : iter * 4;
    }
  }

  // Stats
  const sisdStats = step === 0 ? { cycles: 0, insns: 0 }
    : { cycles: Math.min(step, sisdMaxSteps) * 1.2 | 0, insns: Math.min(step, sisdMaxSteps) };
  const simdStats = step === 0 ? { cycles: 0, insns: 0 }
    : { cycles: Math.min(step, simdMaxSteps) * 1.1 | 0, insns: Math.min(step, simdMaxSteps) };
  
  const speedup = step > 0 ? (simdDone / Math.max(1, sisdDone)).toFixed(1) : '—';

  return (
    <div className="w-full h-full flex flex-col gap-2 max-w-6xl mx-auto select-none">
      {/* ── Header ── */}
      <div className="shrink-0 flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <Code2 size={18} className="text-amber-400" />
          <span className="text-sm-responsive font-bold text-slate-200">
            Práctica: Sumar dos arreglos — <code className="text-cyan-400">C[i] = A[i] + B[i]</code>
          </span>
        </div>
        <div className="text-sm-responsive text-slate-500 font-mono">
          Arreglo de <span className="text-slate-300">{N}</span> elementos · Paso <span className="text-cyan-400 font-bold">{step}</span>/{maxSteps}
        </div>
      </div>

      {/* ─── Two panels: SISD code (left) / SIMD code (right) ─── */}
      <div className="flex-1 grid grid-cols-2 gap-3 min-h-0">
        {/* ── PANEL SISD ── */}
        <div className={`rounded-2xl border overflow-hidden flex flex-col transition-colors ${step === 0 ? 'border-slate-800' : sisdDone >= N ? 'border-emerald-500/40' : 'border-red-500/30'}`}>
          <div className="shrink-0 px-3 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <span className="text-sm-responsive font-bold font-mono text-red-400 flex items-center gap-1.5">
              <Cpu size={14} /> SISD — Escalar (1 por vez)
            </span>
            <span className="text-sm-responsive font-mono text-slate-500">
              {sisdDone}/{N} elementos en RAM
            </span>
          </div>

          {/* Code listing */}
          <div className="flex-1 bg-slate-950/80 p-3 font-mono text-sm-responsive leading-relaxed overflow-y-auto pr-1">
            {CODE_SISD.map((c, i) => (
              <div key={i} className={`flex items-center gap-2 py-[1px] rounded px-1 transition-colors ${sisdCodeHighlight === i ? 'bg-red-500/20 border-l-2 border-red-500 dark:border-red-400' : 'border-l-2 border-transparent'} ${c.label ? 'text-slate-500 dark:text-slate-600 mt-1' : ''} ${sisdDone >= N ? 'opacity-50' : ''}`}>
                {!c.label && <span className="text-xs text-slate-500 dark:text-slate-700 w-4 shrink-0 text-right">{i}</span>}
                {c.label && <span className="text-xs text-slate-500 dark:text-slate-700 w-4 shrink-0" />}
                <span className={`${sisdCodeHighlight === i ? 'text-red-700 dark:text-red-200 font-bold' : c.label ? 'text-slate-500 dark:text-slate-600' : 'text-slate-700 dark:text-slate-400'}`}>
                  {c.line}
                </span>
                {c.highlight && sisdCodeHighlight === i && (
                  <span className="ml-auto text-[13px] text-red-700 dark:text-red-300 font-bold shrink-0">◄ 1 dato</span>
                )}
              </div>
            ))}
          </div>

          {/* Stats & Register State */}
          <div className="shrink-0 px-3 py-1.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-sm-responsive font-mono">
            <span className="text-slate-500">Instrucciones: <span className="text-red-300 font-bold">{sisdStats.insns}</span></span>
            <span className="text-red-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-red-500/30">
              XMM0: {sisdCodeHighlight === 2 ? `[ Load A[${sisdActiveIdx}] = ${A[sisdActiveIdx]} ]` : sisdCodeHighlight === 3 ? `[ ALU: ${A[sisdActiveIdx]}+${B[sisdActiveIdx]} ]` : sisdCodeHighlight === 4 ? `[ Store → C[${sisdActiveIdx}] ]` : '[ · ]'}
            </span>
          </div>

          {/* ── SISD Data Viz ── */}
          <div className="shrink-0 px-2 py-1.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-1 gap-0.5 text-center font-mono">
              <div className="flex items-center gap-0.5">
                <span className="text-xs-responsive text-slate-600 w-3 shrink-0">A</span>
                {A.map((v, i) => {
                  const isActive = i === sisdActiveIdx && sisdCodeHighlight === 2;
                  const isDone = i < sisdDone;
                  return (
                    <div key={i} className={`w-6 h-6 rounded flex items-center justify-center text-xs-responsive font-bold transition-all duration-200
                      ${isDone ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                        : isActive ? 'bg-red-500/40 border border-red-400 text-red-100 animate-pulse scale-105'
                          : 'bg-slate-800/60 border border-slate-700/50 text-slate-600'}`}>
                      {v}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-0.5">
                <span className="text-xs-responsive text-slate-600 w-3 shrink-0">B</span>
                {B.map((v, i) => {
                  const isActive = i === sisdActiveIdx && sisdCodeHighlight === 3;
                  const isDone = i < sisdDone;
                  return (
                    <div key={i} className={`w-6 h-6 rounded flex items-center justify-center text-xs-responsive font-bold transition-all duration-200
                      ${isDone ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                        : isActive ? 'bg-amber-500/40 border border-amber-400 text-amber-100 animate-pulse scale-105'
                          : 'bg-slate-800/60 border border-slate-700/50 text-slate-600'}`}>
                      {v}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-0.5">
                <span className="text-xs-responsive text-slate-600 w-3 shrink-0">C</span>
                {A.map((_, i) => {
                  const isWriting = i === sisdActiveIdx && sisdCodeHighlight === 4;
                  const done = i < sisdDone || isWriting;
                  const val = done ? A[i] + B[i] : '·';
                  return (
                    <div key={i} className={`w-6 h-6 rounded flex items-center justify-center text-xs-responsive font-bold transition-all duration-200
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
            <span className="text-sm-responsive font-bold font-mono text-cyan-400 flex items-center gap-1.5">
              <Zap size={14} /> SIMD — SSE (4 por vez)
            </span>
            <span className="text-sm-responsive font-mono text-slate-500">
              {simdDone}/{N} elementos en RAM
            </span>
          </div>

          {/* Code listing */}
          <div className="flex-1 bg-slate-950/80 p-3 font-mono text-sm-responsive leading-relaxed overflow-y-auto pr-1">
            {CODE_SIMD.map((c, i) => (
              <div key={i} className={`flex items-center gap-2 py-[1px] rounded px-1 transition-colors ${simdCodeHighlight === i ? 'bg-cyan-500/20 border-l-2 border-cyan-500 dark:border-cyan-400' : 'border-l-2 border-transparent'} ${c.label ? 'text-slate-500 dark:text-slate-600 mt-1' : ''} ${simdDone >= N ? 'opacity-50' : ''}`}>
                {!c.label && <span className="text-xs text-slate-500 dark:text-slate-700 w-4 shrink-0 text-right">{i}</span>}
                {c.label && <span className="text-xs text-slate-500 dark:text-slate-700 w-4 shrink-0" />}
                <span className={`${simdCodeHighlight === i ? 'text-cyan-700 dark:text-cyan-200 font-bold' : c.label ? 'text-slate-500 dark:text-slate-600' : c.neon ? 'text-cyan-600 dark:text-cyan-400 drop-shadow-[0_0_4px_rgba(6,182,212,0.35)]' : 'text-slate-700 dark:text-slate-400'}`}>
                  {c.line}
                </span>
                {c.highlight && simdCodeHighlight === i && (
                  <span className="ml-auto text-[13px] text-cyan-700 dark:text-cyan-300 font-bold shrink-0">◄ 4 datos</span>
                )}
              </div>
            ))}
          </div>

          {/* Stats & Register State */}
          <div className="shrink-0 px-3 py-1.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-sm-responsive font-mono">
            <span className="text-slate-500">Instrucciones: <span className="text-cyan-300 font-bold">{simdStats.insns}</span></span>
            <span className="text-cyan-400 font-bold bg-slate-950 px-2 py-0.5 rounded border border-cyan-500/30">
              XMM0: {simdCodeHighlight === 2 ? '[ Load 4 Floats A ]' : simdCodeHighlight === 3 ? '[ ALU: 4 Sumas SIMD ]' : simdCodeHighlight === 4 ? '[ Store → 4 RAM C ]' : '[ · ]'}
            </span>
          </div>

          {/* ── SIMD Data Viz ── */}
          <div className="shrink-0 px-2 py-1.5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800">
            <div className="grid grid-cols-1 gap-0.5 text-center font-mono">
              <div className="flex items-center gap-0.5">
                <span className="text-xs-responsive text-slate-600 w-3 shrink-0">A</span>
                {A.map((v, i) => {
                  const inBatch = simdBatch.includes(i) && simdCodeHighlight === 2;
                  const isDone = i < simdDone;
                  return (
                    <div key={i} className={`w-6 h-6 rounded flex items-center justify-center text-xs-responsive font-bold transition-all duration-200
                      ${isDone ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                        : inBatch ? 'bg-cyan-500/40 border border-cyan-400 text-cyan-100 animate-pulse scale-105'
                          : 'bg-slate-800/60 border border-slate-700/50 text-slate-600'}`}>
                      {v}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-0.5">
                <span className="text-xs-responsive text-slate-600 w-3 shrink-0">B</span>
                {B.map((v, i) => {
                  const inBatch = simdBatch.includes(i) && simdCodeHighlight === 3;
                  const isDone = i < simdDone;
                  return (
                    <div key={i} className={`w-6 h-6 rounded flex items-center justify-center text-xs-responsive font-bold transition-all duration-200
                      ${isDone ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                        : inBatch ? 'bg-cyan-500/40 border border-cyan-400 text-cyan-100 animate-pulse scale-105'
                          : 'bg-slate-800/60 border border-slate-700/50 text-slate-600'}`}>
                      {v}
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center gap-0.5">
                <span className="text-xs-responsive text-slate-600 w-3 shrink-0">C</span>
                {A.map((_, i) => {
                  const isWriting = simdBatch.includes(i) && simdCodeHighlight === 4;
                  const done = i < simdDone || isWriting;
                  const val = done ? A[i] + B[i] : '·';
                  return (
                    <div key={i} className={`w-6 h-6 rounded flex items-center justify-center text-xs-responsive font-bold transition-all duration-200
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 text-xs-responsive font-bold hover:bg-slate-800 hover:border-slate-600 disabled:opacity-30 transition-all">
            <StepForward size={13} /> Paso
          </button>
          <button onClick={() => { if (allDone) reset(); setRunning(r => !r); }} disabled={allDone && !running}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 text-xs-responsive font-bold hover:bg-cyan-500/30 disabled:opacity-30 transition-all">
            <Play size={13} /> {running ? 'Pausar' : 'Auto'}
          </button>
          <button onClick={reset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-xs hover:text-slate-900 dark:hover:text-slate-200 transition-all">
            <RotateCcw size={13} /> Reset
          </button>
        </div>

        <AnimatePresence>
          {step > 0 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className={`px-4 py-1.5 rounded-lg border text-sm-responsive font-bold font-mono ${allDone
                ? 'bg-emerald-500/10 border-emerald-400/40 text-emerald-300'
                : 'bg-slate-900 border-slate-700 text-slate-300'}`}>
              {allDone
                ? <>SIMD terminó en un tercio de iteraciones 🎉</>
                : <>Speedup: <span className="text-cyan-700 dark:text-cyan-300">{speedup}</span>× — corriendo...</>}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ADDPS highlight */}
        {step > 0 && !allDone && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-sm-responsive text-cyan-400 font-bold bg-cyan-500/10 px-3 py-1 rounded-lg border border-cyan-500/30">
            ⚡ addps = 4 sumas en 1 ciclo
          </motion.div>
        )}
      </div>
    </div>
  );
}
