import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldAlert } from 'lucide-react';

// ==========================================
// === PARTE 4 — Bermudez Gino ===
// ==========================================

/* ───────── Slide 4.Divergencia — La Kryptonita del SIMD (Sección 4.5) ───────── */

export function Slide4_Divergencia() {
  const [step, setStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const nextStep = () => setStep(p => (p + 1) % 4);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(nextStep, 2800);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const A_data = [5, -2, 10, -1];

  const steps = [
    {
      label: 'Cargando datos...',
      mask: '····',
      active: [],
      inactive: [0, 1, 2, 3],
      result: [5, -2, 10, -1],
      desc: 'Registro vectorial con datos cargados. La ALU espera la instrucción.',
      error: '',
    },
    {
      label: 'Paso 1: Camino TRUE → A + 1',
      mask: '1···1',
      active: [0, 2],
      inactive: [1, 3],
      result: [6, -2, 11, -1],
      desc: 'Elementos >0 ejecutan A+1. Elementos ≤0 también computan pero su resultado se descarta.',
      error: '',
    },
    {
      label: 'Paso 2: Camino FALSE → A × 2',
      mask: '·1·1·',
      active: [1, 3],
      inactive: [0, 2],
      result: [5, -4, 10, -2],
      desc: 'Elementos ≤0 ejecutan A×2. Gastamos un ciclo completo adicional para solo 2 elementos.',
      error: '¡1 ciclo extra desperdiciado!',
    },
    {
      label: 'Paso 3: Fusionar con VMASK',
      mask: '1111',
      active: [0, 1, 2, 3],
      inactive: [],
      result: [6, -4, 11, -2],
      desc: 'La máscara combina: TRUE→[0,2] y FALSE→[1,3]. Resultado correcto, pero a DOBLE COSTE.',
      error: '2 ciclos para 1 operación lógica',
    },
  ];

  const s = steps[step];

  return (
    <div className="w-full h-full flex flex-col gap-3 max-w-5xl mx-auto">
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-red-500/40 flex flex-col gap-3 min-h-0">
        <div className="flex justify-between items-center shrink-0">
          <h4 className="text-base-responsive font-bold text-red-400 flex items-center gap-2">
            <ShieldAlert size={20} /> La Kryptonita del SIMD: Divergencia Condicional (Sección 4.5)
          </h4>
          <span className="text-xs-responsive px-2.5 py-1 rounded bg-red-500/20 text-red-300 font-mono border border-red-500/30">
            Enmascaramiento (Masking)
          </span>
        </div>

        <p className="text-sm-responsive text-slate-300 shrink-0">
          Código analizado: <span className="font-mono text-cyan-300">if (A[i] &gt; 0) C[i] = A[i] + 1; else C[i] = A[i] * 2;</span> con datos <span className="font-mono text-amber-300">[5, -2, 10, -1]</span>
        </p>

        {/* Animated masking viewer */}
        <div className="flex-1 flex flex-col justify-center gap-2 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">{s.label}</span>
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400">
                VMASK: <span className="text-amber-700 dark:text-amber-400 font-bold">{s.mask}</span>
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {A_data.map((val, idx) => {
                const isActive = s.active.includes(idx);
                const isInactive = s.inactive.includes(idx);
                return (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <span className="text-xs-responsive font-mono text-slate-500">A[{idx}] = {val}</span>
                    <div className={`w-full p-2.5 rounded-xl text-center font-mono text-sm font-bold transition-all duration-300 ${
                      isActive
                        ? 'bg-amber-500/20 border border-amber-500/60 dark:border-amber-400/60 text-amber-800 dark:text-amber-200 shadow-md shadow-amber-500/10'
                        : 'bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-500 dark:text-slate-600'
                    }`}>
                      {s.result[idx]}
                    </div>
                    <span className={`text-xs-responsive font-bold ${isActive ? 'text-amber-400' : isInactive ? 'text-red-400' : 'text-transparent'}`}>
                      {isActive ? 'ACTIVO (✓)' : isInactive ? 'DESCARTADO (✗)' : '-'}
                    </span>
                  </div>
                );
              })}
            </div>

            <p className="text-sm-responsive text-slate-400 leading-relaxed text-center italic">{s.desc}</p>

            {s.error && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="p-2 bg-red-500/10 rounded-xl border border-red-500/30 text-center"
              >
                <span className="text-red-300 font-bold text-sm-responsive">⚠ {s.error}</span>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Controls */}
        <div className="shrink-0 flex items-center justify-between gap-2 pt-1">
          <button onClick={() => setStep(p => (p - 1 + 4) % 4)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all text-xs-responsive font-bold">◀ Anterior</button>

          <div className="flex items-center gap-2">
            {[0, 1, 2, 3].map(i => (
              <button key={i} onClick={() => setStep(i)}
                className={`h-2.5 rounded-full transition-all ${i === step ? 'bg-red-500 dark:bg-red-400 w-6' : 'bg-slate-300 dark:bg-slate-800 hover:bg-slate-400 dark:hover:bg-slate-700 w-2.5'}`} />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button onClick={nextStep}
              className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all text-xs font-bold">Siguiente ▶</button>
            <button onClick={() => setAutoPlay(p => !p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${autoPlay ? 'bg-red-500/20 text-red-700 dark:text-red-300' : 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'}`}>
              {autoPlay ? '⏸ Pausar' : '▶ Automático'}
            </button>
          </div>
        </div>

        <div className="shrink-0 p-2.5 bg-red-500/10 rounded-xl border border-red-500/30 text-xs-responsive text-slate-300 text-center">
          <span className="font-bold text-red-400">Conclusión de la Sección 4.5:</span> La divergencia destruye el throughput paralelo al obligar al hardware a ejecutar secuencialmente todos los caminos condicionales.
        </div>
      </div>
    </div>
  );
}

/* ───────── Slide 4.1 — 304 vs 7 Instrucciones ───────── */

export function Slide4_1() {
  return (
    <div className="space-y-4 max-w-6xl mx-auto text-sm-responsive font-mono">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-red-500/30 space-y-2">
          <h4 className="font-bold text-red-700 dark:text-red-400">Escalar (304 Instrucciones Dinámicas):</h4>
          <div className="space-y-1 text-slate-700 dark:text-slate-300">
            <div>• 4x MOVI (Inicializar contadores)</div>
            <div>• 100x LD (2 loads x 50 iteraciones)</div>
            <div>• 50x ADD + 50x SHFR + 50x ST</div>
            <div>• 50x DECBNZ (Branches)</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-cyan-500/40 space-y-2">
          <h4 className="font-bold text-cyan-700 dark:text-cyan-400">Vectorial SIMD (7 Instrucciones Dinámicas):</h4>
          <div className="space-y-1 text-slate-700 dark:text-slate-300">
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
        className="p-3 bg-cyan-500/10 border border-cyan-500/30 dark:border-cyan-400/30 rounded-xl text-center text-cyan-700 dark:text-cyan-300 font-bold text-[13px]"
      >
        Speedup Real = 2004 ciclos / 285 ciclos ≈ <span className="text-2xl">7.0×</span>
      </motion.div>
    </div>
  );
}

/* ───────── Slide 4.2 — Throughput y Ley de Amdahl ───────── */

export function Slide4_2() {
  return (
    <div className="w-full h-full flex flex-col gap-3 max-w-6xl mx-auto">
      <div className="flex-1 grid grid-cols-2 gap-3 min-h-0">
        {/* Throughput */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/30 flex flex-col gap-2">
          <h4 className="text-sm-responsive font-bold text-cyan-400 shrink-0">Throughput</h4>
          <div className="flex-1 flex flex-col justify-center gap-2">
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono text-sm-responsive">
              <span className="text-slate-400">Throughput = </span>
              <span className="text-cyan-300 font-bold">Datos procesados / Tiempo</span>
            </div>
            <div className="space-y-1.5 text-sm-responsive font-mono">
              <div className="flex items-center justify-between p-1.5 bg-slate-950/80 rounded-lg border border-slate-800">
                <span className="text-slate-400">Escalar (1 float)</span>
                <span className="text-slate-500">3 GFLOPS</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-slate-50 dark:bg-slate-950/80 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-cyan-700 dark:text-cyan-400">SSE (4× float)</span>
                <span className="text-cyan-700 dark:text-cyan-300 font-bold">12 GFLOPS</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-slate-50 dark:bg-slate-950/80 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-purple-700 dark:text-purple-400">AVX (8× float)</span>
                <span className="text-purple-700 dark:text-purple-300 font-bold">24 GFLOPS</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-slate-50 dark:bg-slate-950/80 rounded-lg border border-indigo-500/30">
                <span className="text-indigo-700 dark:text-indigo-400">AVX-512 (16× float sin FMA)</span>
                <span className="text-indigo-700 dark:text-indigo-300 font-bold">48 GFLOPS</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-slate-50 dark:bg-slate-950/80 rounded-lg border border-amber-500/30">
                <span className="text-amber-700 dark:text-amber-400">AVX-512 + FMA (Con FMA)</span>
                <span className="text-amber-700 dark:text-amber-300 font-bold">96 GFLOPS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Amdahl */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-purple-500/30 flex flex-col gap-2">
          <h4 className="text-sm-responsive font-bold text-purple-400 shrink-0">Ley de Amdahl</h4>
          <div className="flex-1 flex flex-col justify-center gap-2">
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 text-center font-mono text-sm-responsive">
              <span className="text-slate-400">Speedup máximo = </span>
              <span className="text-purple-300 font-bold">1 / (S + P/N)</span>
            </div>
            <div className="space-y-1.5 text-sm-responsive font-mono">
              <div className="flex items-center gap-2 p-2 bg-slate-950/80 rounded-lg border border-slate-800">
                <span className="text-slate-500 shrink-0">20% secuencial, 80% paralelo:</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-slate-500">4 ALUs</div>
                  <div className="text-slate-700 dark:text-slate-300 font-bold">2.5×</div>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-slate-500">16 ALUs</div>
                  <div className="text-purple-700 dark:text-purple-300 font-bold">4.0×</div>
                </div>
                <div className="p-1.5 rounded-lg bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-center">
                  <div className="text-slate-500">∞ ALUs</div>
                  <div className="text-amber-700 dark:text-amber-300 font-bold">5.0× ← techo</div>
                </div>
                <div className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-center">
                  <div className="text-red-700 dark:text-red-400 font-bold">50% secuencial</div>
                  <div className="text-red-700 dark:text-red-300 font-bold">2.0× ← máximo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm-responsive text-slate-400 text-center leading-relaxed">
        <span className="text-cyan-400 font-bold">Conclusión:</span> el throughput escala con el ancho de registro, pero la Ley de Amdahl te recuerda que la porción secuencial siempre pone un techo.
      </div>
    </div>
  );
}

/* ───────── Slide 4.3 — Aplicaciones Reales ───────── */

export function Slide4_3() {
  const apps = [
    { icon: '🖼️', title: 'Imágenes Digitales', desc: '6.2M píxeles (1920×1080 × 3 canales). AVX-512 procesa 64 píxeles por instrucción → ~97K instrs vs 6.2M escalares.', color: 'border-emerald-500/30 text-emerald-700 dark:text-emerald-300' },
    { icon: '🎬', title: 'Video y Audio', desc: 'Codecs H.264/HEVC: DCT, motion estimation y filtros de desbloqueo. 100% vectorizado en CPUs modernas.', color: 'border-blue-500/30 text-blue-700 dark:text-blue-300' },
    { icon: '🎮', title: 'Videojuegos 3D', desc: '1M vértices × 60fps = matrices 4×4. Sin SIMD, las transformaciones 3D serían imposibles en tiempo real.', color: 'border-purple-500/30 text-purple-700 dark:text-purple-300' },
    { icon: '🧠', title: 'Inteligencia Artificial', desc: 'CNN: 90% del tiempo = multiplicación de matrices. AVX-512 + FMA es la base de TensorFlow y PyTorch en CPU.', color: 'border-amber-500/30 text-amber-700 dark:text-amber-300' },
    { icon: '📊', title: 'Data Science', desc: 'NumPy `np.dot` llama a BLAS/LAPACK con AVX-512 bajo el capó. Sin que el usuario lo sepa, está usando SIMD.', color: 'border-cyan-500/30 text-cyan-700 dark:text-cyan-300' },
    { icon: '🖥️', title: 'GPUs (SIMT)', desc: 'Una GPU NVIDIA tiene miles de cores SIMD. Cada SM ejecuta la misma instrucción sobre datos distintos (SIMT).', color: 'border-rose-500/30 text-rose-700 dark:text-rose-300' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 max-w-6xl mx-auto">
      {apps.map((a, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className={`p-3 rounded-xl bg-white dark:bg-slate-900 border ${a.color} space-y-1`}
        >
          <h4 className={`text-sm-responsive font-bold flex items-center gap-1.5 ${a.color}`}>
            <span>{a.icon}</span> {a.title}
          </h4>
          <p className="text-sm-responsive text-slate-400 leading-relaxed">{a.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}

/* ───────── Slide 4.4 — SoC Híbrido ───────── */

export function Slide4_4() {
  return (
    <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 max-w-5xl mx-auto space-y-4 text-center text-sm-responsive">
      <h4 className="text-sm-responsive font-bold text-slate-200">SoC Híbrido Moderno</h4>
      <div className="grid grid-cols-2 gap-4 text-left">
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
          <span className="font-bold text-blue-700 dark:text-blue-400">CPU (MIMD)</span> Orquesta el Sistema Operativo y código secuencial irregular.
        </div>
        <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
          <span className="font-bold text-cyan-700 dark:text-cyan-400">GPU (SIMD)</span> Ejecuta cómputo masivamente paralelo (renderizado y AI).
        </div>
      </div>
    </div>
  );
}

/* ───────── Slide 4.5 — Conclusiones ───────── */

export function Slide4_5() {
  const points = [
    { icon: '①', text: 'El Von Neumann secuencial tiene un cuello de botella estructural. La solución no es velocidad de reloj — es paralelismo.', color: 'border-slate-200 dark:border-slate-800' },
    { icon: '②', text: 'Flynn (1966) clasificó las soluciones. SIMD es el especialista del procesamiento masivo y homogéneo.', color: 'border-cyan-500/30' },
    { icon: '③', text: 'Evolución: MMX → SSE → AVX → AVX-512. Cada generación duplica el throughput sin cambiar el modelo de programación.', color: 'border-purple-500/30' },
    { icon: '④', text: 'Presente híbrido: CPU (MIMD) + GPU (SIMD) en el mismo silicio. Sin SIMD no hay video 4K, no hay IA, no hay gráficos en tiempo real.', color: 'border-amber-500/30' },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center max-w-5xl mx-auto">
      <div className="space-y-3 w-full max-w-4xl">
        {points.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border ${p.color}`}
          >
            <span className="text-lg font-bold text-cyan-400 shrink-0">{p.icon}</span>
            <p className="text-sm-responsive text-slate-300 leading-relaxed">{p.text}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-white dark:via-slate-900 to-purple-500/10 border border-cyan-500/30 text-center max-w-3xl"
      >
        <Sparkles size={28} className="text-cyan-400 mx-auto animate-bounce mb-2" />
        <p className="text-sm-responsive text-slate-300 italic font-semibold">
          "El límite secuencial era real. SIMD lo rompió — un registro a la vez, un bit más ancho por generación."
        </p>
      </motion.div>
    </div>
  );
}

/* ───────── Carátula de Sección: Parte 4 ───────── */

export function SlideIntroParte4() {
  return (
    <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-slate-900 to-teal-500/10 border-2 border-emerald-500/40 text-center space-y-6 max-w-3xl mx-auto shadow-2xl">
      <span className="px-4 py-1 bg-emerald-500/20 text-emerald-300 font-extrabold text-xs-responsive rounded-full border border-emerald-400/30 uppercase tracking-widest">
        Expositor: Bermudez Gino · Parte 4
      </span>
      <h2 className="text-title font-extrabold text-slate-100">Rendimiento, Aplicaciones Reales y Conclusiones</h2>
      <div className="grid grid-cols-2 gap-3 text-left text-sm-responsive pt-2">
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 4.1: Desglose Dinámico (304 vs 7 instrs & Speedup)</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 4.2: Throughput y Ley de Amdahl</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 4.3: SIMD en el Mundo Real (6 dominios)</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 4.4: Paradigma Híbrido: SoC Moderno</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 4.5: Diagnóstico Final (SMP vs SIMD)</div>
        <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-300">• Slide 4.6: Conclusiones y Cierre</div>
      </div>
    </div>
  );
}
