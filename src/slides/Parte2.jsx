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
          <h4 className="text-xs-responsive font-bold text-cyan-400 flex items-center gap-2 shrink-0">
            <Layers size={18} /> ¿Qué es SIMD?
          </h4>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-sm-responsive space-y-1">
            <span className="text-cyan-300 font-bold block">Single Instruction, Multiple Data</span>
            <p className="text-slate-300 leading-relaxed">
              Una sola instrucción se decodifica <span className="text-cyan-400 font-bold">una vez</span> y se aplica sobre <span className="text-cyan-400 font-bold">N datos distintos</span> en <span className="text-cyan-400 font-bold">N ALUs en paralelo</span>.
            </p>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-sm-responsive space-y-1">
            <span className="text-amber-300 font-bold block">⚡ Clave: Eficiencia energética</span>
            <p className="text-slate-300 leading-relaxed">
              El costo de <span className="text-amber-400 font-mono font-bold">Fetch + Decode</span> se divide entre N elementos. <span className="text-amber-400 font-bold">No pagás N veces el control.</span>
            </p>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-sm-responsive space-y-1">
            <span className="text-purple-300 font-bold block">🎖️ Analogía: Comandante + Escuadrón</span>
            <p className="text-slate-300 leading-relaxed">
              El comandante da <span className="text-purple-400 font-bold">UNA</span> orden. El escuadrón (N soldados) la ejecuta al mismo tiempo, cada uno sobre su propio objetivo. <span className="text-purple-400 font-bold">Una sola voz de mando, N acciones simultáneas.</span>
            </p>
          </div>

          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs-responsive text-slate-400 space-y-1">
            <span className="text-slate-500 font-mono font-bold">📍 Taxonomía de Flynn:</span>
            <p className="text-slate-600 dark:text-slate-400">1 Instruction Stream · Múltiples Data Streams · 1 Unidad de Control · N ALUs</p>
            <p className="text-slate-500 italic">(Retomando lo visto en la Parte 1 — Reyes Alisson)</p>
          </div>
        </div>

        {/* ─── Right: Visual Demo ─── */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/40 flex flex-col gap-3 min-h-0">
          <h4 className="text-xs-responsive font-bold text-cyan-400 flex items-center gap-2 shrink-0">
            <Activity size={18} /> Una Orden, Ocho Soldados
          </h4>

          {/* Control Unit */}
          <div className="shrink-0 text-center">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-cyan-400/40 inline-block px-5 shadow-lg shadow-cyan-500/10">
              <span className="text-xs-responsive text-cyan-400 font-mono font-bold uppercase tracking-widest block">Unidad de Control Única</span>
              <h4 className="text-base-responsive font-bold text-slate-100 mt-0.5">Comando: SUMAR +10</h4>
            </div>
          </div>

          {/* 8 ALUs */}
          <div className="flex-1 grid grid-cols-4 md:grid-cols-8 gap-1.5 min-h-0 items-center">
            {[5, 12, 3, 8, 15, 7, 2, 9].map((val, i) => (
              <motion.div key={i} whileHover={{ y: -4 }} className="space-y-1">
                <div className="p-1 rounded bg-slate-950 border border-slate-800 text-xs-responsive font-mono text-slate-500 text-center">ALU{i}</div>
                <div className="p-1.5 rounded-lg bg-amber-500/20 border border-amber-400 text-amber-300 font-bold font-mono text-sm-responsive text-center">{val}</div>
                <div className="text-cyan-400 text-xs-responsive text-center">↓</div>
                <div className="p-1.5 rounded-lg bg-cyan-500/20 border border-cyan-400 text-cyan-300 font-bold font-mono text-sm-responsive text-center shadow-sm">{val + 10}</div>
              </motion.div>
            ))}
          </div>

          {/* Energy Impact */}
          <div className="shrink-0 text-center">
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-sm-responsive text-slate-300 inline-block px-3">
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
  const [reg, setReg] = useState('ymm'); // Default to YMM (8 lanes) for a balanced view
  const [vlen, setVlen] = useState(8);
  const [stride, setStride] = useState(1);
  const [mask, setMask] = useState(Array(16).fill(true));
  const [viewMode, setViewMode] = useState('practica'); // 'practica' | 'teoria'

  const data = [3.14, 2.71, 1.41, 0.57, 4.20, 5.55, 6.28, 7.89, 8.31, 9.81, 10.5, 11.7, 12.3, 13.9, 14.2, 15.6];

  const regConfig = {
    xmm: { label: 'Registro Vectorial XMM (128 Bits)', count: 4, sub: '4 × float32 (SSE)', gridCols: 'grid-cols-4', max: 4 },
    ymm: { label: 'Registro Vectorial YMM (256 Bits)', count: 8, sub: '8 × float32 (AVX) — el ancho se duplica', gridCols: 'grid-cols-8', max: 8 },
    zmm: { label: 'Registro Vectorial ZMM (512 Bits)', count: 16, sub: '16 × float32 (AVX-512) — el ancho se duplica otra vez', gridCols: 'grid-cols-16', max: 16 },
  };

  const cfg = regConfig[reg];

  const handleRegChange = (newReg) => {
    setReg(newReg);
    const newMax = newReg === 'xmm' ? 4 : newReg === 'ymm' ? 8 : 16;
    setVlen(newMax);
  };

  const toggleMask = (idx) => {
    setMask(prev => {
      const next = [...prev];
      next[idx] = !next[idx];
      return next;
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
          <span className="text-sm-responsive text-slate-500 font-mono">Registro Escalar (32 Bits)</span>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-700 text-center font-mono text-slate-300 font-bold text-sm">[ 3.14159 ]</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/50 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs-responsive text-cyan-400 font-mono">{cfg.label}</span>
            <div className="flex gap-1">
              {['xmm', 'ymm', 'zmm'].map((r) => (
                <button
                  key={r}
                  onClick={() => setReg(r)}
                  className={`px-2.5 py-1 rounded-md text-xs-responsive font-bold font-mono uppercase transition-all ${
                    reg === r
                      ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30 ring-1 ring-cyan-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-300 dark:border-slate-700'
                  }`}>
                  {r}
                </button>
              ))}
            </div>
          </div>
          <div className={reg === 'zmm' ? 'overflow-x-auto' : ''}>
            <motion.div
              key={reg}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className={`grid ${cfg.gridCols} gap-1 p-1.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-center font-mono text-xs-responsive font-bold text-cyan-300 ${reg === 'zmm' ? 'w-max' : ''}`}>
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
          </div>
          <div className="text-xs-responsive text-slate-400 font-mono text-center pt-1">
            {cfg.sub}
          </div>
        </div>
      </div>

      {/* ── SECCIÓN 2: REGISTROS DE CONTROL — PRÁCTICA / TEORÍA ── */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col min-h-0 overflow-hidden max-h-[540px]">
        <div className="shrink-0 flex items-center justify-between mb-3">
          <div className="text-xs-responsive font-mono font-bold text-slate-400 uppercase tracking-widest">Registros de Control SIMD</div>
          <div className="flex gap-2">
            <button onClick={() => setViewMode('practica')} className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${viewMode === 'practica' ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30' : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'}`}>🧪 Práctica</button>
            <button onClick={() => setViewMode('teoria')} className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${viewMode === 'teoria' ? 'bg-purple-500 text-white shadow-md shadow-purple-500/30' : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'}`}>📖 Teoría</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1 min-h-0">
          {viewMode === 'practica' ? (
            <div className="space-y-3">
              {/* Ejemplo paso a paso */}
              <div className="bg-slate-950/60 rounded-xl p-3 border border-cyan-500/30">
                <div className="text-xs font-mono font-bold text-cyan-400 mb-2">Instrucción: VADDPS ymm0, ymm1, ymm2</div>
                <div className="grid grid-cols-3 gap-2 text-[10px] font-mono mb-2">
                  <div className="bg-slate-900/80 rounded p-1.5 border border-slate-700"><span className="text-cyan-400">ymm1</span> = Vector A</div>
                  <div className="bg-slate-900/80 rounded p-1.5 border border-slate-700"><span className="text-cyan-400">ymm2</span> = Vector B</div>
                  <div className="bg-slate-900/80 rounded p-1.5 border border-slate-700"><span className="text-cyan-400">ymm0</span> = A + B</div>
                </div>
                <div className="text-[10px] font-mono text-slate-500 mb-2">Estado actual:</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                  <div className="bg-slate-900/80 rounded p-2 border border-cyan-700/40">
                    <span className="text-cyan-400 font-bold text-xs">VLEN</span>
                    <div className="flex gap-1 mt-1">
                      <button onClick={() => setVlen(Math.max(1, vlen - 1))} className="w-6 h-6 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 font-bold text-xs flex items-center justify-center">−</button>
                      <span className="font-mono text-sm"><span className="text-cyan-300 font-bold">{vlen}</span><span className="text-slate-500">/{cfg.max}</span></span>
                      <button onClick={() => setVlen(Math.min(cfg.max, vlen + 1))} className="w-6 h-6 rounded bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 font-bold text-xs flex items-center justify-center">+</button>
                    </div>
                  </div>
                  <div className="bg-slate-900/80 rounded p-2 border border-amber-700/40">
                    <span className="text-amber-400 font-bold text-xs">VSTR</span>
                    <div className="flex gap-1 mt-1">
                      {[1, 2].map((s) => (<button key={s} onClick={() => setStride(s)} className={`px-2 py-1 rounded text-xs font-bold transition-all ${stride === s ? s === 1 ? 'bg-amber-500 text-slate-950' : 'bg-orange-500 text-slate-950' : 'bg-slate-800 text-slate-500 border border-slate-700'}`}>S{s}</button>))}
                    </div>
                  </div>
                  <div className="bg-slate-900/80 rounded p-2 border border-purple-700/40">
                    <span className="text-purple-400 font-bold text-xs">VMASK</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {mask.slice(0, cfg.max).map((active, i) => {
                        const isIdle = i >= vlen;
                        return (<button key={i} onClick={() => !isIdle && toggleMask(i)} disabled={isIdle} className={`w-6 h-6 rounded text-[10px] font-mono font-bold flex items-center justify-center transition-all ${isIdle ? 'bg-slate-800 text-slate-700 cursor-not-allowed' : active ? 'bg-purple-500/20 border border-purple-500 text-purple-300' : 'bg-slate-800 border border-slate-700 text-slate-600'}`}>{active ? 1 : 0}</button>);
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Ejecución paso a paso */}
              <div className="bg-slate-950/60 rounded-xl p-3 border border-slate-700">
                <div className="text-[10px] font-mono text-slate-500 mb-2 flex items-center justify-between">
                  <span>Ejecución: <span className="text-slate-300 font-bold">VADDPS ymm0, ymm1, ymm2</span></span>
                  <span className="text-cyan-400 font-bold">Resultado</span>
                </div>
                {/* Header lanes */}
                <div className={`${reg === 'zmm' ? 'overflow-x-auto' : ''}`}>
                  <div className={`grid ${cfg.gridCols} gap-1 mb-1`}>
                    {[...Array(cfg.count)].map((_, i) => (
                      <div key={i} className={`text-center text-[9px] font-mono font-bold px-1 py-0.5 rounded ${i >= vlen ? 'text-slate-700' : 'text-slate-400'}`}>Lane {i}</div>
                    ))}
                  </div>
                </div>
                {/* Registros ymm1 (A) */}
                <div className={`${reg === 'zmm' ? 'overflow-x-auto' : ''}`}>
                  <div className={`grid ${cfg.gridCols} gap-1 mb-1`}>
                    {[...Array(cfg.count)].map((_, i) => {
                      const isIdle = i >= vlen;
                      const val = stride === 1 ? data[i] : data[i * 2] ?? '—';
                      return (<div key={i} className={`text-center text-[10px] font-mono px-1 py-1 rounded border ${isIdle ? 'bg-slate-900/40 border-slate-800/40 text-slate-700' : 'bg-cyan-500/10 border-cyan-700/30 text-cyan-300'}`}>{isIdle ? '—' : val}</div>);
                    })}
                  </div>
                </div>
                {/* Registros ymm2 (B) */}
                <div className={`${reg === 'zmm' ? 'overflow-x-auto' : ''}`}>
                  <div className={`grid ${cfg.gridCols} gap-1 mb-1`}>
                    {[...Array(cfg.count)].map((_, i) => {
                      const isIdle = i >= vlen;
                      const val = stride === 1 ? data[i + 1] : data[(i * 2) + 1] ?? '—';
                      return (<div key={i} className={`text-center text-[10px] font-mono px-1 py-1 rounded border ${isIdle ? 'bg-slate-900/40 border-slate-800/40 text-slate-700' : 'bg-amber-500/10 border-amber-700/30 text-amber-300'}`}>{isIdle ? '—' : val}</div>);
                    })}
                  </div>
                </div>
                {/* Resultado ymm0 (A+B) */}
                <div className={`${reg === 'zmm' ? 'overflow-x-auto' : ''}`}>
                  <div className={`grid ${cfg.gridCols} gap-1`}>
                    {[...Array(cfg.count)].map((_, i) => {
                      const isIdle = i >= vlen;
                      const m = mask[i] !== undefined ? mask[i] : false;
                      const valA = stride === 1 ? data[i] : data[i * 2];
                      const valB = stride === 1 ? data[i + 1] : data[(i * 2) + 1];
                      const result = isIdle ? null : (valA !== undefined && valB !== undefined) ? (m ? (Number(valA) + Number(valB)).toFixed(2) : 'DROP') : '—';
                      const isDrop = !isIdle && m === false && valA !== undefined && valB !== undefined;
                      return (<div key={i} className={`text-center text-[10px] font-mono font-bold px-1 py-1.5 rounded border ${isIdle ? 'bg-slate-900/40 border-slate-800/40 text-slate-700' : m ? 'bg-emerald-500/20 border-emerald-600/40 text-emerald-300' : 'bg-red-500/20 border-red-700/40 text-red-400'}`}>{isIdle ? '—' : result}</div>);
                    })}
                  </div>
                </div>
                {/* Labels */}
                <div className={`grid ${cfg.gridCols} gap-1 mt-1 ${reg === 'zmm' ? 'overflow-x-auto' : ''}`}>
                  <div className="text-[9px] font-mono text-slate-600 text-center">ymm1 (A)</div>
                  <div className="text-[9px] font-mono text-slate-600 text-center">ymm2 (B)</div>
                  <div className="text-[9px] font-mono text-slate-600 text-center">ymm0 (A+B)</div>
                </div>
                {/* Legend */}
                <div className="flex flex-wrap gap-3 mt-2 pt-2 border-t border-slate-800 text-[10px] font-mono">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-600/40"></div><span className="text-emerald-300">Compute + Writeback</span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-500/20 border border-red-700/40"></div><span className="text-red-400">Compute + <span className="line-through">Writeback</span></span></div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-slate-800/40 border border-slate-700/40"></div><span className="text-slate-600">IDLE (VLEN)</span></div>
                </div>
              </div>

              {/* Resumen de qué hace cada control */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-slate-950/60 rounded-xl p-2.5 border border-cyan-700/40">
                  <span className="text-cyan-400 font-mono font-bold text-xs block mb-1">VLEN = {vlen}</span>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Lanes <span className="text-cyan-300 font-bold">[{vlen}–{cfg.max}]</span> = IDLE. El hardware ignora estos elementos en la operación.</p>
                </div>
                <div className="bg-slate-950/60 rounded-xl p-2.5 border border-amber-700/40">
                  <span className="text-amber-400 font-mono font-bold text-xs block mb-1">VSTR = {stride}</span>
                  <p className="text-[10px] text-slate-400 leading-relaxed">{stride === 1 ? 'Stride 1 → elementos consecutivos → caché óptima.' : `Stride ${stride} → salto de ${stride} → requiere más accesos de memoria.`}</p>
                </div>
                <div className="bg-slate-950/60 rounded-xl p-2.5 border border-purple-700/40">
                  <span className="text-purple-400 font-mono font-bold text-xs block mb-1">VMASK</span>
                  <p className="text-[10px] text-slate-400 leading-relaxed">Lanes con <span className="text-slate-600 font-bold bg-slate-800 px-0.5 rounded">0</span> → ejecutan pero <span className="text-red-400 font-bold">descartan resultado</span>. Las demás escriben normalmente.</p>
                </div>
              </div>
            </div>
          ) : null}

          {viewMode === 'teoria' ? (
            <div className="space-y-3">
              <div className="bg-slate-950/60 rounded-xl p-4 border border-cyan-500/30">
                <div className="flex items-center gap-3 mb-2"><span className="text-cyan-400 font-mono font-bold text-base">VLEN</span><span className="text-cyan-300/70 font-mono text-sm">(Vector Length)</span></div>
                <p className="text-slate-300 text-xs leading-relaxed mb-2">Define <span className="text-cyan-400 font-bold">cuántos elementos del registro vectorial están activos</span> en la operación actual. El hardware puede tener más lanes de las que se usan.</p>
                <div className="bg-slate-900/80 rounded-lg p-2.5 font-mono text-[11px] text-slate-400 border border-slate-800/80 space-y-1">
                  <div><span className="text-cyan-400">Ejemplo:</span> ZMM con 16 lanes, VLEN=8 → solo las primeras 8 lanes procesan, las lanes [8–15] quedan <span className="text-slate-600 font-bold">IDLE</span></div>
                  <div><span className="text-cyan-400">Why:</span> Permite operar con vectores más cortos sin desperdiciar energía ni lógica en lanes innecesarias</div>
                </div>
              </div>
              <div className="bg-slate-950/60 rounded-xl p-4 border border-amber-500/30">
                <div className="flex items-center gap-3 mb-2"><span className="text-amber-400 font-mono font-bold text-base">VSTR</span><span className="text-amber-300/70 font-mono text-sm">(Vector Stride)</span></div>
                <p className="text-slate-300 text-xs leading-relaxed mb-2">Especifica <span className="text-amber-400 font-bold">la distancia en bytes entre elementos consecutivos</span> en memoria. Controla cómo se accede a los datos.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="bg-slate-900/80 rounded-lg p-2.5 font-mono text-[10px] text-slate-300 border border-slate-800/80">
                    <div className="text-amber-400 font-bold mb-1">Stride 1 vs Stride ≠ 1</div>
                    <div className="mb-1"><span className="text-amber-300">Filas:</span> stride=1 → a[i], a[i+1] → caché óptima</div>
                    <div><span className="text-orange-400">Columnas:</span> stride=N → a[i], a[i+N] → saltos</div>
                  </div>
                  <div className="bg-red-950/40 rounded-lg p-2.5 font-mono text-[10px] text-red-300 border border-red-800/50">
                    <div className="text-red-400 font-bold mb-1">⚠️ Sin datos suficientes</div>
                    <div className="mb-0.5">// 8 elementos: data[0..7]</div>
                    <div>VLEN=8, VSTR=2:</div>
                    <div className="text-red-400">data[8], data[9] → basura</div>
                    <div className="text-slate-500">// segmentation fault</div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-950/60 rounded-xl p-4 border border-purple-500/30">
                <div className="flex items-center gap-3 mb-2"><span className="text-purple-400 font-mono font-bold text-base">VMASK</span><span className="text-purple-300/70 font-mono text-sm">(Vector Mask)</span></div>
                <p className="text-slate-300 text-xs leading-relaxed mb-2">Registro de <span className="text-purple-400 font-bold">predicado por elemento</span>: define qué lanes escriben a memoria y cuáles no.</p>
                <div className="bg-slate-900/80 rounded-lg p-2.5 font-mono text-[11px] text-slate-400 border border-slate-800/80 space-y-1">
                  <div><span className="text-purple-400">mask=1:</span> Lane activa → ejecuta operación + escribe resultado normalmente</div>
                  <div><span className="text-slate-600">mask=0:</span> Lane silenciada → ejecuta en silicio pero <span className="text-slate-500">omite el writeback</span></div>
                  <div><span className="text-purple-400">Kryptonita:</span> If/else por elemento → ambas ramas se ejecutan, se enmascara → speedup se evapora</div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

    </div>
  );
}

/* ───────── Slide 2.3 — Array vs Vector Processor (Interactivo) ───────── */

const ST_OPS = ['LD', 'MUL', 'ADD', 'ST'];
const ST_COLORS = {
  LD: '#06b6d4',
  MUL: '#a855f7',
  ADD: '#f59e0b',
  ST: '#10b981',
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
    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 w-full h-full min-h-[280px]">
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
    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 w-full h-full min-h-[280px]">
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
  const [view, setView] = useState('diagram');
  return (
    <div className="w-full h-full flex flex-col gap-3 max-w-6xl mx-auto">
      {/* Top Header & Selector */}
      <div className="shrink-0 flex items-center justify-between px-1">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setView('diagram')}
            className={`px-3 py-1.5 rounded-xl text-xs-responsive font-bold font-mono transition-all ${view === 'diagram' ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/20' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'}`}>
            🏛️ Arquitectura Vectorial (CRAY-1)
          </button>
          <button
            onClick={() => setView('array')}
            className={`px-3 py-1.5 rounded-xl text-xs-responsive font-bold font-mono transition-all ${view === 'array' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'}`}>
            🧮 Arquitectura Array (Espacio)
          </button>
          <button
            onClick={() => setView('table')}
            className={`px-3 py-1.5 rounded-xl text-xs-responsive font-bold font-mono transition-all ${view === 'table' ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'}`}>
            📊 Tabla Comparativa
          </button>
        </div>
        <span className="text-xs-responsive font-mono text-slate-500 hidden md:inline">Dualidad Espacio-Tiempo (Sección 2.5)</span>
      </div>

      {/* Main Content View */}
      {view === 'diagram' ? (
        <div className="flex-1 rounded-2xl border border-purple-500/30 bg-slate-900 p-3 flex flex-col md:flex-row gap-4 min-h-0 overflow-hidden">
          {/* Diagram Image Container */}
          <div className="shrink-0 md:w-[420px] bg-slate-950 rounded-xl p-3 border border-slate-800/80 flex items-center justify-center min-h-0 relative group">
            <div className="bg-white rounded-xl p-2.5 shadow-xl max-h-full flex items-center justify-center">
              <img
                src="/vector_arch.png"
                alt="Arquitectura Vectorial Clásica VMIPS / CRAY-1"
                className="max-h-[330px] w-auto object-contain rounded"
              />
            </div>
          </div>

          {/* Explanation sidebar */}
          <div className="flex-1 min-w-0 flex flex-col gap-2 overflow-y-auto pr-1">
            <h4 className="text-xs-responsive font-bold font-mono text-purple-400 uppercase tracking-widest flex items-center gap-1.5">
              <Activity size={16} /> Componentes Clave
            </h4>
            
            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs-responsive space-y-1">
              <span className="font-bold text-cyan-300 font-mono block">1. Vector Registers</span>
              <p className="text-slate-400 leading-relaxed">Bancos de registros capaces de almacenar vectores completos de datos contiguos.</p>
            </div>

            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs-responsive space-y-1">
              <span className="font-bold text-amber-300 font-mono block">2. Scalar Registers</span>
              <p className="text-slate-400 leading-relaxed">Registros tradicionales para operandos individuales y punteros de control.</p>
            </div>

            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs-responsive space-y-1">
              <span className="font-bold text-emerald-300 font-mono block">3. Vector Load/Store Unit</span>
              <p className="text-slate-400 leading-relaxed">Unidad dedicada a la transferencia masiva y ordenada entre RAM y los registros vectoriales.</p>
            </div>

            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs-responsive space-y-1">
              <span className="font-bold text-purple-300 font-mono block">4. Functional Units Segmentadas</span>
              <p className="text-slate-400 leading-relaxed">ALUs independientes (FP Add, Multiply, Divide, Integer, Logical) operando en pipeline continuo.</p>
            </div>
          </div>
        </div>
      ) : view === 'array' ? (
        <div className="flex-1 rounded-2xl border border-amber-500/30 bg-slate-900 p-3 flex flex-col md:flex-row gap-4 min-h-0 overflow-hidden">
          {/* Array Architecture Image Container */}
          <div className="shrink-0 md:w-[420px] bg-slate-950 rounded-xl p-3 border border-slate-800/80 flex items-center justify-center min-h-0 relative group">
            <div className="bg-white rounded-xl p-2.5 shadow-xl max-h-full flex items-center justify-center">
              <img
                src="/array_arch.png"
                alt="Arquitectura Array Processor (SIMD)"
                className="max-h-[330px] w-auto object-contain rounded"
              />
            </div>
          </div>

          {/* Explanation sidebar */}
          <div className="flex-1 min-w-0 flex flex-col gap-2 overflow-y-auto pr-1">
            <h4 className="text-xs-responsive font-bold font-mono text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <Layers size={16} /> Componentes Clave
            </h4>

            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs-responsive space-y-1">
              <span className="font-bold text-amber-300 font-mono block">1. N ALUs Idénticas (PEs)</span>
              <p className="text-slate-400 leading-relaxed">N copias exactas del mismo circuito operando en lockstep. Cada PE tiene sus propios registros y memoria local.</p>
            </div>

            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs-responsive space-y-1">
              <span className="font-bold text-amber-300 font-mono block">2. Unidad de Control (CU)</span>
              <p className="text-slate-400 leading-relaxed">Una única CU decodifica y transmite la MISMA instrucción a todos los PEs simultáneamente.</p>
            </div>

            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs-responsive space-y-1">
              <span className="font-bold text-amber-300 font-mono block">3. Lockstep Execution</span>
              <p className="text-slate-400 leading-relaxed">En cada ciclo, TODAS las ALUs ejecutan la misma operación sobre datos distintos. La instrucción cambia por ciclo, pero todas responden juntas.</p>
            </div>

            <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs-responsive space-y-1">
              <span className="font-bold text-amber-300 font-mono block">4. Ejemplo clásico: ILLIAC IV</span>
              <p className="text-slate-400 leading-relaxed">64 PEs idénticos. Cada uno con su ALU, registros y memoria local. Todas las operaciones en lockstep. Década del 60.</p>
            </div>
          </div>
        </div>
      ) : view === 'table' ? (
        <div className="flex-1 flex flex-col gap-3 min-h-0">
          {/* Dual description */}
          <div className="shrink-0 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-amber-500/30 space-y-1.5">
              <h4 className="text-xs-responsive font-bold text-amber-400 flex items-center gap-2"><Layers size={16} /> Array Processor <span className="text-xs-responsive font-mono text-amber-500">(Espacio)</span></h4>
              <p className="text-xs-responsive text-slate-300">Múltiples PEs físicos independientes operando exactamente en el mismo ciclo de reloj.</p>
              <div className="p-2 bg-slate-950 rounded-xl font-mono text-xs-responsive text-amber-300 border border-slate-800">
                • 4 obreros trabajando al mismo tiempo<br />
                • GPUs · Connection Machine CM-2
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-purple-500/30 space-y-1.5">
              <h4 className="text-xs-responsive font-bold text-purple-400 flex items-center gap-2"><Activity size={16} /> Vector Processor <span className="text-xs-responsive font-mono text-purple-500">(Tiempo)</span></h4>
              <p className="text-xs-responsive text-slate-300">Un pipeline segmentado que procesa elementos en pasos consecutivos usando el mismo circuito físico.</p>
              <div className="p-2 bg-slate-950 rounded-xl font-mono text-xs-responsive text-purple-300 border border-slate-800">
                • Línea de ensamblaje de fábrica<br />
                • CRAY-1 (1976) · procesadores vectoriales
              </div>
            </div>
          </div>

          {/* Comparison table */}
          <div className="flex-1 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900/90 text-xs-responsive">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/50">
                  <th className="p-3 font-mono font-bold text-slate-700 dark:text-slate-400 w-1/4">Característica</th>
                  <th className="p-3 font-mono font-bold text-amber-700 dark:text-amber-400 w-3/8">🧮 Array Processor (SIMD Matricial)</th>
                  <th className="p-3 font-mono font-bold text-purple-700 dark:text-purple-400 w-3/8">🏭 Vector Processor (SIMD Vectorial)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/50 dark:divide-slate-800/50">
                {[
                  {
                    feat: "Estrategia de Paralelismo",
                    array: "Paralelismo en ESPACIO. Se replican múltiples unidades de procesamiento (PEs) completas.",
                    vector: "Paralelismo en TIEMPO. Se segmenta (pipeline) una única unidad funcional en etapas."
                  },
                  {
                    feat: "Estructura del Hardware",
                    array: "N ALUs de propósito general e idénticas operando en sintonía (lockstep).",
                    vector: "ALUs especializadas y segmentadas (unidad de suma, multiplicación, carga, etc.)."
                  },
                  {
                    feat: "Uso de Silicio (Costo)",
                    array: "Muy alto. Requiere replicar ALU, registros y buses para cada elemento de procesamiento.",
                    vector: "Muy eficiente. Se comparte el mismo hardware segmentado entre todos los elementos."
                  },
                  {
                    feat: "Unidad de Control (CU)",
                    array: "Una única CU decodifica y transmite la misma instrucción a todos los PEs a la vez.",
                    vector: "La CU secuencia la carga y el paso de los elementos del vector por los pipelines."
                  },
                  {
                    feat: "Vector Chaining",
                    array: "No soportado nativamente (cada PE trabaja en su propia memoria local aislada).",
                    vector: "Soportado y crucial. La salida de un pipeline alimenta directamente al siguiente sin pasar por memoria."
                  },
                  {
                    feat: "Manejo de Ramificaciones",
                    array: "Enmascaramiento de PEs. PEs inactivos quedan ociosos (desperdicio de hardware).",
                    vector: "Registros de máscara (VMASK). El pipeline sigue corriendo pero inhabilita escrituras."
                  },
                  {
                    feat: "Ejemplos Históricos",
                    array: "ILLIAC IV, Goodyear MPP.",
                    vector: "Cray-1, NEC SX-Aurora."
                  }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-100/40 dark:hover:bg-slate-900/40 transition-colors">
                    <td className="p-3 font-semibold text-slate-700 dark:text-slate-300 border-r border-slate-200/40 dark:border-slate-800/40 font-mono text-[11px]">{row.feat}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400 leading-relaxed border-r border-slate-200/40 dark:border-slate-800/40">{row.array}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400 leading-relaxed">{row.vector}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
}


/* ───────── Slide 2.4 — Ventajas del Procesamiento Vectorial ───────── */

export function Slide2_4() {
  const useCases = [
    { label: 'Imágenes Digitales', desc: 'Filtros, convolución y ajuste de brillo píxel a píxel', color: 'text-cyan-700 dark:text-cyan-400' },
    { label: 'Audio y Video', desc: 'Codificación H.264/HEVC y equalización en tiempo real', color: 'text-emerald-700 dark:text-emerald-400' },
    { label: 'IA y Aprendizaje Profundo', desc: 'Multiplicación de matrices (GEMM) y capas CNN', color: 'text-purple-700 dark:text-purple-400' },
    { label: 'Criptografía', desc: 'Instrucciones dedicadas AES-NI y cifrado en bloques', color: 'text-amber-700 dark:text-amber-400' },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-4 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-0">
        {/* ─── Ventajas Clave ─── */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-emerald-500/40 flex flex-col gap-3 min-h-0">
          <h4 className="text-xs-responsive font-bold text-emerald-400 flex items-center gap-2 shrink-0"><CheckCircle2 size={18} /> Ventajas Principales (Sección 2.7)</h4>
          <ul className="text-sm-responsive text-slate-300 space-y-2 flex-1 overflow-y-auto pr-1">
            <li className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              ✓ <span className="text-emerald-300 font-bold">Throughput N× mayor:</span> Procesa múltiples datos en un solo ciclo de reloj según el ancho del registro vectorial.
            </li>
            <li className="bg-slate-50 dark:bg-slate-950/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              ✓ <span className="text-emerald-700 dark:text-emerald-300 font-bold">Eficiencia energética:</span> Una sola decodificación de instrucción emite el comando a N ALUs, reduciendo el consumo de la Control Unit.
            </li>
            <li className="bg-slate-50 dark:bg-slate-950/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              ✓ <span className="text-emerald-700 dark:text-emerald-300 font-bold">Menor presión en memoria de instrucciones:</span> Reduce drásticamente el número de instrucciones dinámicas y saltos de bucle.
            </li>
            <li className="bg-slate-50 dark:bg-slate-950/80 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
              ✓ <span className="text-emerald-700 dark:text-emerald-300 font-bold">Amortización de latencia:</span> El pipeline vectorial absorbe el costo de arranque a lo largo de todo el vector de datos.
            </li>
          </ul>
        </div>

        {/* ─── Requisitos de Regularidad ─── */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/40 flex flex-col gap-3 min-h-0">
          <h4 className="text-xs-responsive font-bold text-cyan-400 flex items-center gap-2 shrink-0"><Layers size={18} /> Requisitos para el Paralelismo Vectorial</h4>
          <div className="space-y-2.5 text-[13px] flex-1 overflow-y-auto pr-1">
            <div className="p-3 bg-slate-50 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-cyan-700 dark:text-cyan-300 font-bold block mb-0.5">1. Homogeneidad de Datos</span>
              Los datos deben ser del mismo tipo y tamaño (ej. vectores de 32-bit float) para ejecutarse en paralelo sin conversiones.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-amber-700 dark:text-amber-300 font-bold block mb-0.5">2. Alineación y Contigüidad en Memoria</span>
              Los datos deben estar contiguos en RAM (stride = 1). Acceso disperso (gather/scatter) penaliza severamente el ancho de banda.
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-purple-700 dark:text-purple-300 font-bold block mb-0.5">3. Ausencia de Dependencias</span>
              Cada elemento debe ser independiente (C[i] no puede depender de C[i-1]) para permitir cómputo simultáneo.
            </div>
          </div>
        </div>
      </div>

      {/* Casos de Uso Reales abajo */}
      <div className="shrink-0 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <h5 className="text-sm-responsive font-bold text-slate-400 mb-2">• Aplicaciones naturalmente vectoriales</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {useCases.map((uc, i) => (
            <div key={i} className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-sm-responsive text-center">
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
    <div className="space-y-4 max-w-6xl mx-auto text-sm-responsive font-mono">
      <div className="p-3 rounded-xl bg-slate-900 border border-purple-500/30 text-center text-purple-300 font-bold text-sm-responsive">
        Sección 2.3 de la Guía · Desglose de Código Secuencial vs Vectorial
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* SISD */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-red-500/30 space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="font-bold text-red-400">Código Secuencial (SISD)</span>
            <span className="text-xs-responsive px-2 py-0.5 rounded bg-red-500/20 text-red-300">4 Iteraciones</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed">
            <div className="text-slate-500">// Bucle tradicional elemento por elemento</div>
            <div><span className="text-red-700 dark:text-red-400">ADD</span> A[0], B[0] → C[0] <span className="text-slate-500 dark:text-slate-600">; Ciclo 1</span></div>
            <div><span className="text-red-700 dark:text-red-400">ADD</span> A[1], B[1] → C[1] <span className="text-slate-500 dark:text-slate-600">; Ciclo 2</span></div>
            <div><span className="text-red-700 dark:text-red-400">ADD</span> A[2], B[2] → C[2] <span className="text-slate-500 dark:text-slate-600">; Ciclo 3</span></div>
            <div><span className="text-red-700 dark:text-red-400">ADD</span> A[3], B[3] → C[3] <span className="text-slate-500 dark:text-slate-600">; Ciclo 4</span></div>
          </div>
          <div className="text-xs-responsive text-slate-400">
            • 4 decodificaciones de instrucción<br/>
            • 4 saltos de bucle y comprobaciones de índice
          </div>
        </div>

        {/* SIMD */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-400/40 space-y-3">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="font-bold text-cyan-400">Código Vectorial (SIMD)</span>
            <span className="text-xs-responsive px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">1 Instrucción</span>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed">
            <div className="text-slate-500">// Instrucción vectorial sobre registro XMM (128 bits)</div>
            <div><span className="text-cyan-300 font-bold">VADD</span> XMM0, XMM1, XMM2</div>
            <div className="text-emerald-400/90 text-xs-responsive pt-1">
              └─ Suma en paralelo: <br/>
                 [A0+B0, A1+B1, A2+B2, A3+B3] en 1 solo ciclo
            </div>
          </div>
          <div className="text-xs-responsive text-slate-400">
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
            className={`px-3 py-1.5 rounded-xl text-xs-responsive font-bold font-mono transition-all ${view === 'demo' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'}`}>
            🎯 Demostración paso a paso
          </button>
          <button
            onClick={() => setView('impact')}
            className={`px-3 py-1.5 rounded-xl text-xs-responsive font-bold font-mono transition-all ${view === 'impact' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'}`}>
            📊 Impacto numérico
          </button>
        </div>
        <span className="text-xs-responsive font-mono text-slate-500 hidden md:inline">La Kryptonita del SIMD</span>
      </div>

      {view === 'demo' ? (
        <div className="flex-1 flex flex-col gap-3 min-h-0">
          {/* Rule card */}
          <div className="shrink-0 p-3 rounded-xl bg-slate-900 border border-rose-500/30 text-center">
            <span className="text-sm-responsive font-mono text-rose-300">
              Regla: <span className="font-bold">{'b[i] = (a[i] > 0) ? a[i]*2 : 0'}</span>
            </span>
          </div>

          {/* Main demo area */}
          <div className="flex-1 rounded-2xl bg-white dark:bg-slate-900 border border-rose-500/30 p-4 flex flex-col gap-3 min-h-0">
            {/* Step header */}
            <div className="shrink-0 flex items-center justify-between">
              <span className="text-xs font-mono text-rose-700 dark:text-rose-400 font-bold flex items-center gap-2">
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
                      ? 'bg-slate-50 dark:bg-slate-950 border-rose-500/40 shadow-md shadow-rose-500/10'
                      : 'bg-slate-100/50 dark:bg-slate-950/50 border-slate-300 dark:border-slate-700/40 opacity-40'
                  }`}>
                  <span className="text-[10px] font-mono text-slate-500">Lane {i}</span>
                  <span className={`text-2xl font-bold font-mono ${
                    current.mask[i] ? 'text-rose-700 dark:text-rose-300' : 'text-slate-500 dark:text-slate-600'
                  }`}>
                    {typeof val === 'number' ? val : '?'}
                  </span>
                  <div className={`w-8 h-6 rounded text-[10px] font-mono font-bold flex items-center justify-center ${
                    current.mask[i]
                      ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/40'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-600 border border-slate-300 dark:border-slate-700'
                  }`}>
                    {current.mask[i] ? 'M=1' : 'M=0'}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Description */}
            <div className="shrink-0 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-[13px] text-slate-700 dark:text-slate-300 text-center leading-relaxed">
              {current.desc}
            </div>
          </div>

          {/* Navigation */}
          <div className="shrink-0 flex justify-center gap-4">
            <button
              onClick={next}
              className="px-6 py-2 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-700 dark:text-rose-300 font-bold text-xs font-mono hover:bg-rose-500/30 transition-all shadow-lg">
              {step < steps.length - 1 ? 'Siguiente paso →' : '🔄 Repetir'}
            </button>
          </div>
        </div>
      ) : (
        /* ─── Impacto numérico view ─── */
        <div className="flex-1 flex flex-col gap-3 min-h-0">
          {/* Table */}
          <div className="flex-1 overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-500">
                  <th className="p-2 font-bold">Situación</th>
                  <th className="p-2 font-bold text-rose-700 dark:text-rose-400">Lanes útiles</th>
                  <th className="p-2 font-bold text-rose-700 dark:text-rose-400">Speedup teórico (AVX2, 8 lanes)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 dark:divide-slate-800/60 text-xs">
                <tr>
                  <td className="p-2 text-slate-700 dark:text-slate-300">Sin divergencia (100% misma operación)</td>
                  <td className="p-2 text-emerald-700 dark:text-emerald-400 font-semibold">8 de 8</td>
                  <td className="p-2 text-emerald-700 dark:text-emerald-400 font-semibold">8x</td>
                </tr>
                <tr>
                  <td className="p-2 text-slate-700 dark:text-slate-300">50% divergencia (mitad de cada rama)</td>
                  <td className="p-2 text-amber-700 dark:text-amber-400 font-semibold">4 de 8</td>
                  <td className="p-2 text-amber-700 dark:text-amber-400 font-semibold">~4x</td>
                </tr>
                <tr>
                  <td className="p-2 text-slate-700 dark:text-slate-300">25% divergencia</td>
                  <td className="p-2 text-amber-700 dark:text-amber-400 font-semibold">6 de 8</td>
                  <td className="p-2 text-amber-700 dark:text-amber-400 font-semibold">~6x</td>
                </tr>
                <tr>
                  <td className="p-2 text-slate-700 dark:text-slate-300">Divergencia + datos no alineados</td>
                  <td className="p-2 text-rose-700 dark:text-rose-400 font-semibold">variable</td>
                  <td className="p-2 text-rose-700 dark:text-rose-400 font-semibold">&lt;2x o peor que escalar</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Key insight */}
          <div className="shrink-0 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-[13px] text-rose-800 dark:text-rose-200 leading-relaxed">
            💡 <span className="font-bold">Regla práctica:</span> cada condicional <span className="font-mono">if/else</span> dentro de un loop que esperas vectorizar te come ~50% del speedup teórico. Si encadenas varios condicionales, SIMD pierde sentido.
          </div>

          {/* Branchless tip */}
          <div className="shrink-0 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed">
            <span className="font-bold text-cyan-700 dark:text-cyan-400">Truco branchless:</span> se puede reescribir como <span className="font-mono text-amber-700 dark:text-amber-300">b[i] = max(a[i] * 2, 0)</span> para evitar el <span className="font-mono">if</span> explícito y recuperar velocidad de vectorización.
          </div>

          {/* Oral version */}
          <div className="shrink-0 p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-500/30 text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed italic">
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
      <span className="px-4 py-1 bg-purple-500/20 text-purple-300 font-extrabold text-xs-responsive rounded-full border border-purple-400/30 uppercase tracking-widest">
        Expositor: Rivera Yandris · Parte 2
      </span>
      <h2 className="text-title font-extrabold text-slate-100">Arquitectura SIMD y el Principio Vectorial</h2>
      <div className="grid grid-cols-2 gap-3 text-left text-sm-responsive pt-2">
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 2.1: Una Orden, Ocho Soldados</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 2.2: Registros Vectoriales y Control</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 2.3: Array Processor vs Vector Processor</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 2.4: Ventajas del Procesamiento Vectorial</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 2.5: Código Secuencial vs Vectorial</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-rose-400 font-semibold">• Slide 2.6: ⚡ Divergencia Condicional (Kryptonita)</div>
      </div>
    </div>
  );
}
