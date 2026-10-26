import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Target, CheckCircle2, AlertTriangle, ShieldCheck, HelpCircle,
  Activity, Server, Database, Code2, ArrowRight, RefreshCw,
  Sliders, Check, X, ShieldAlert, Sparkles, Layers, Clock
} from 'lucide-react';

// =========================================================================
// PSEUDORANDOM GENERATOR CON SEMILLA FIJA (REPRODUCIBLE Y ESTABLE)
// =========================================================================
function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Generador Normal Box-Muller usando generador con semilla
function generarMuestraNormal(n, mu, sigma, rng) {
  const valores = [];
  for (let i = 0; i < n; i++) {
    const u1 = Math.max(1e-9, rng());
    const u2 = rng();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    valores.push(mu + z0 * sigma);
  }
  return valores;
}

// =========================================================================
// SLIDE 4.0: FUNDAMENTOS, ANATOMÍA Y TRADE-OFF (90% vs 95% vs 99%)
// =========================================================================
export function SlideIntervalosConfianza() {
  const [confidence, setConfidence] = useState(95);

  const zConfig = {
    90: { z: 1.645, alpha: '0.10', alphaPct: '10%', barW: '44%', desc: 'Rápido en A/B testing exploratorio. Margen más estrecho, pero 1 de cada 10 intervalos fallará en cubrir μ.' },
    95: { z: 1.960, alpha: '0.05', alphaPct: '5%', barW: '62%', desc: 'Estándar global de software y ciencia. Equilibrio óptimo entre precisión y tolerancia al error.' },
    99: { z: 2.576, alpha: '0.01', alphaPct: '1%', barW: '84%', desc: 'Misiones críticas (fintech, salud, infraestructura). Máxima seguridad, pero el margen de error crece un 31%.' }
  };

  const current = zConfig[confidence];

  return (
    <div className="max-w-5xl mx-auto px-4 py-3 space-y-4">
      {/* Header Ejecutivo */}
      <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">Bloque B · Slide 4.0</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold">
              Expositor: Gino
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Margen de Error & Intervalos de Confianza
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            De la estimación puntual al intervalo probabilístico · Equilibrio entre precisión y certeza.
          </p>
        </div>

        <div className="flex gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
          {[90, 95, 99].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setConfidence(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                confidence === lvl
                  ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30 font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lvl}% (Z={zConfig[lvl].z})
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Lado Izquierdo: Fórmula y Amplitud Dinámica */}
        <div className="lg:col-span-7 p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Anatomía de la Construcción
            </span>
            <span className="font-mono text-xs text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20 font-bold">
              IC = x̄ ± Z_(α/2) · (σ / √n)
            </span>
          </div>

          {/* Desglose de componentes */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Estimación Central</span>
              <span className="font-mono text-white font-bold text-sm">x̄</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Media muestral</span>
            </div>
            <div className="p-2 rounded-xl bg-amber-950/30 border border-amber-900/40">
              <span className="text-[10px] text-amber-300 block">Valor Crítico</span>
              <span className="font-mono text-amber-400 font-bold text-sm">Z = {current.z}</span>
              <span className="text-[10px] text-amber-400/80 block mt-0.5">Para {confidence}%</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Error Estándar</span>
              <span className="font-mono text-teal-400 font-bold text-sm">σ / √n</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">Dispersión de medias</span>
            </div>
          </div>

          {/* Visualizador de Amplitud del Margen de Error */}
          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/90 text-center space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">
                Amplitud del Margen de Error: <strong className="text-amber-400">E = {current.z} · SE</strong>
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                Riesgo fuera: α = {current.alpha} ({current.alphaPct})
              </span>
            </div>

            <div className="relative py-4 flex items-center justify-center">
              <div className="absolute w-full h-1 bg-slate-800 rounded-full" />
              
              {/* Barra animada de cobertura del IC */}
              <motion.div
                layout
                style={{ width: current.barW }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="h-3.5 bg-gradient-to-r from-amber-500 via-orange-400 to-amber-300 rounded-full relative z-10 shadow-lg shadow-amber-500/20"
              >
                <div className="absolute -left-2 -top-1 w-5 h-5 rounded-full bg-amber-400 border-2 border-slate-950 shadow" />
                <div className="absolute -right-2 -top-1 w-5 h-5 rounded-full bg-amber-300 border-2 border-slate-950 shadow" />
              </motion.div>

              {/* Punto central x̄ */}
              <div className="absolute z-20 w-4 h-4 bg-white rounded-full border-2 border-amber-500 -top-0.5 shadow" />
            </div>

            <div className="flex justify-between text-[11px] text-slate-400 px-2 font-mono">
              <span className="text-amber-400 font-bold">x̄ - {current.z}·SE</span>
              <span className="text-white font-bold bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Media Estimada (x̄)
              </span>
              <span className="text-amber-300 font-bold">x̄ + {current.z}·SE</span>
            </div>
          </div>

          {/* Trade-off info */}
          <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-xs text-amber-200/90 leading-relaxed">
            <strong className="text-amber-300 font-bold">El dilema de ingeniería: </strong>
            {current.desc}
          </div>
        </div>

        {/* Lado Derecho: Interpretación Rigurosa vs La Gran Falacia */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          {/* Interpretación Correcta */}
          <div className="p-4 rounded-xl bg-emerald-950/25 border border-emerald-900/40 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Interpretación Frecuentista Correcta
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              "Si repitiéramos el muestreo 100 veces bajo idénticas condiciones, el <strong>{confidence}%</strong> de los intervalos construidos contendrá la verdadera media poblacional μ."
            </p>
          </div>

          {/* La Gran Falacia */}
          <div className="p-4 rounded-xl bg-rose-950/25 border border-rose-900/40 space-y-1.5">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              La Gran Falacia a No Cometer
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-rose-300">Incorrecto:</strong> <em>"Hay un {confidence}% de probabilidad de que μ caiga dentro de este intervalo calculado"</em>.
            </p>
            <p className="text-[11px] text-slate-400 leading-normal">
              El parámetro μ es una constante fija del sistema; lo que varía aleatoriamente entre muestras es el intervalo mismo.
            </p>
          </div>

          {/* Estimación Puntual vs Intervalo */}
          <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
            <div className="flex items-center gap-2 text-slate-300 font-bold text-xs">
              <Target className="w-3.5 h-3.5 text-amber-400" />
              ¿Por qué no basta una estimación puntual?
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Una estimación puntual (<span className="font-mono text-slate-200">x̄ = 142 ms</span>) casi seguro difiere del parámetro real. El intervalo entrega una garantía formal auditable con un margen de tolerancia exacto.
            </p>
          </div>
        </div>
      </div>

      {/* Nota Técnica al pie */}
      <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center gap-2.5">
        <Target size={14} className="text-amber-400 shrink-0" />
        <p className="text-[11px] text-slate-300 leading-tight">
          <span className="font-bold uppercase tracking-wider text-amber-300">Para el especialista · </span>
          Si σ es desconocida y la muestra es pequeña (n &lt; 30), se usa el estimador muestral s y la distribución t de Student. Con n ≥ 30, por el TLC de Alisson, t converge numéricamente a la normal estándar Z.
        </p>
      </div>
    </div>
  );
}

// =========================================================================
// SLIDE 4.1: EL IMPACTO DE N & SIMULACIÓN DE MUESTREO REPETIDO
// =========================================================================
export function SlideIntervalosTamanoMuestra() {
  const [sampleN, setSampleN] = useState(64);
  const [simulationSeed, setSimulationSeed] = useState(42);

  // Parámetros poblacionales fijos para la simulación
  const POBLACION_MU = 100;
  const POBLACION_SIGMA = 24;

  // Cálculos matemáticos según n
  const se = POBLACION_SIGMA / Math.sqrt(sampleN);
  const z = 1.96; // 95%
  const margenError = z * se;

  // Generación de 24 intervalos de confianza en vivo
  const intervalosSimulados = useMemo(() => {
    const rng = mulberry32(simulationSeed);
    const intervals = [];
    for (let i = 0; i < 24; i++) {
      const muestra = generarMuestraNormal(sampleN, POBLACION_MU, POBLACION_SIGMA, rng);
      const media = muestra.reduce((a, b) => a + b, 0) / sampleN;
      const icMin = media - margenError;
      const icMax = media + margenError;
      const contieneMu = icMin <= POBLACION_MU && icMax >= POBLACION_MU;
      intervals.push({ id: i, media, icMin, icMax, contieneMu });
    }
    return intervals;
  }, [sampleN, simulationSeed, margenError]);

  const capturados = intervalosSimulados.filter((it) => it.contieneMu).length;
  const tasaCaptura = ((capturados / intervalosSimulados.length) * 100).toFixed(1);

  return (
    <div className="max-w-5xl mx-auto px-4 py-3 space-y-4">
      {/* Header */}
      <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">Bloque B · Slide 4.1</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold">
              Expositor: Gino
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            El Impacto de n & Simulación de Muestreo Repetido
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            La física del Error Estándar (σ/√n) y comprobación empírica de la cobertura al 95%.
          </p>
        </div>

        <button
          onClick={() => setSimulationSeed((s) => s + 7)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-amber-300 font-bold hover:bg-slate-800 transition-all shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
          Re-muestrear Lote
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Lado Izquierdo: Control de n y la Ley del Cuadrado */}
        <div className="lg:col-span-5 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Control de Tamaño Muestral
            </span>
            <span className="font-mono text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-bold">
              SE = σ / √n
            </span>
          </div>

          {/* Selector de N */}
          <div className="grid grid-cols-4 gap-2">
            {[16, 64, 256, 1024].map((nVal) => (
              <button
                key={nVal}
                onClick={() => setSampleN(nVal)}
                className={`py-2 px-1 rounded-xl text-center transition-all ${
                  sampleN === nVal
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30'
                    : 'bg-slate-950/80 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <div className="text-[10px] block opacity-80">n =</div>
                <div className="text-xs font-mono font-bold">{nVal}</div>
              </button>
            ))}
          </div>

          {/* Métricas calculadas para este n */}
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-slate-300 font-medium block">Error Estándar (SE)</span>
                <span className="text-[10px] text-slate-500 font-mono">24 / √{sampleN}</span>
              </div>
              <span className="font-mono text-teal-400 font-bold text-sm bg-teal-950/40 px-2 py-1 rounded border border-teal-800/30">
                ± {se.toFixed(2)}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-slate-300 font-medium block">Margen de Error (E al 95%)</span>
                <span className="text-[10px] text-slate-500 font-mono">1.96 · {se.toFixed(2)}</span>
              </div>
              <span className="font-mono text-amber-400 font-bold text-sm bg-amber-950/40 px-2 py-1 rounded border border-amber-800/30">
                ± {margenError.toFixed(2)}
              </span>
            </div>
          </div>

          {/* La ley de rendimientos decrecientes */}
          <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              La Ley de Rendimientos Decrecientes
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Como el denominador es <strong className="text-white">√n</strong>, para reducir el margen de error a la mitad se necesita <strong className="text-amber-300">cuadruplicar (4×)</strong> el tamaño de la muestra.
            </p>
            <div className="text-[10px] font-mono text-slate-400 bg-slate-900 p-1.5 rounded">
              n=16 (E=±11.76) → n=64 (E=±5.88) → n=256 (E=±2.94)
            </div>
          </div>
        </div>

        {/* Lado Derecho: Simulación Gráfica de 24 Intervalos */}
        <div className="lg:col-span-7 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-300 uppercase tracking-wider">
                24 Intervalos Independientes
              </span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                μ = 100 fijo
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs">
              <span className="text-slate-400">Captura:</span>
              <span className={`font-bold px-2 py-0.5 rounded ${
                Number(tasaCaptura) >= 90
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}>
                {capturados}/24 ({tasaCaptura}%)
              </span>
            </div>
          </div>

          {/* Gráfico SVG de Intervalos */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 relative">
            {/* Escala eje X: [80 a 120] */}
            <svg viewBox="0 0 460 210" className="w-full h-48 overflow-visible select-none">
              {/* Eje de referencia de μ = 100 */}
              <line
                x1={230}
                y1={5}
                x2={230}
                y2={195}
                stroke="#10b981"
                strokeWidth={2}
                strokeDasharray="4 3"
              />
              <text x={230} y={206} fill="#10b981" fontSize={10} textAnchor="middle" fontWeight="bold" fontFamily="sans-serif">
                μ = 100
              </text>

              {/* Ticks laterales */}
              <text x={40} y={206} fill="#64748b" fontSize={9} textAnchor="middle" fontFamily="monospace">85</text>
              <text x={135} y={206} fill="#64748b" fontSize={9} textAnchor="middle" fontFamily="monospace">92.5</text>
              <text x={325} y={206} fill="#64748b" fontSize={9} textAnchor="middle" fontFamily="monospace">107.5</text>
              <text x={420} y={206} fill="#64748b" fontSize={9} textAnchor="middle" fontFamily="monospace">115</text>

              {/* Dibujar los 24 intervalos */}
              {intervalosSimulados.map((it, idx) => {
                const yPos = 12 + idx * 7.5;
                // Mapeo: 80 -> 10, 120 -> 450
                const mapX = (val) => 10 + ((val - 80) / 40) * 440;
                const x1 = Math.max(5, Math.min(455, mapX(it.icMin)));
                const x2 = Math.max(5, Math.min(455, mapX(it.icMax)));
                const xCenter = Math.max(5, Math.min(455, mapX(it.media)));

                return (
                  <g key={it.id}>
                    {/* Barra de intervalo */}
                    <line
                      x1={x1}
                      y1={yPos}
                      x2={x2}
                      y2={yPos}
                      stroke={it.contieneMu ? '#f59e0b' : '#f43f5e'}
                      strokeWidth={it.contieneMu ? 2 : 2.5}
                      strokeLinecap="round"
                    />
                    {/* Punto central media de la muestra */}
                    <circle
                      cx={xCenter}
                      cy={yPos}
                      r={it.contieneMu ? 2 : 2.5}
                      fill={it.contieneMu ? '#ffffff' : '#f43f5e'}
                    />
                    {/* Indicador de fallo */}
                    {!it.contieneMu && (
                      <text
                        x={x2 + 6}
                        y={yPos + 3}
                        fill="#f43f5e"
                        fontSize={8}
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        ✕ Fuera
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              Intervalo contiene a μ ({capturados})
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              Intervalo pierde a μ ({24 - capturados})
            </span>
          </div>
        </div>
      </div>

      {/* Nota Técnica al pie */}
      <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center gap-2.5">
        <Target size={14} className="text-amber-400 shrink-0" />
        <p className="text-[11px] text-slate-300 leading-tight">
          <span className="font-bold uppercase tracking-wider text-amber-300">Para el especialista · </span>
          El concepto frecuentista de Neyman establece que el 95% es una propiedad del procedimiento a largo plazo. Una vez calculado un intervalo numérico específico, o contiene a μ o no lo contiene (probabilidad 1 o 0); no hay probabilidades posteriores sin enfoque bayesiano.
        </p>
      </div>
    </div>
  );
}

// =========================================================================
// SLIDE 4.2: CASO REAL EN SOFTWARE: SLA DE MICROSERVICIOS & PUENTE A α
// =========================================================================
export function SlideIntervalosCasoSoftware() {
  const [selectedConfidence, setSelectedConfidence] = useState(95);

  // Datos del caso real: Auditoría de latencia en microservicio de pagos
  const n = 100;
  const xBar = 138.5; // ms
  const s = 25.0;     // ms
  const slaTarget = 150.0; // ms máximo permitido por SLA

  const z = selectedConfidence === 95 ? 1.96 : 2.576;
  const se = s / Math.sqrt(n); // 2.50 ms
  const margenError = z * se; // 4.90 ms o 6.44 ms
  const icMin = (xBar - margenError).toFixed(2);
  const icMax = (xBar + margenError).toFixed(2);
  const cumpleSLA = Number(icMax) < slaTarget;

  return (
    <div className="max-w-5xl mx-auto px-4 py-3 space-y-4">
      {/* Header */}
      <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">Bloque B · Slide 4.2</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-bold">
              Expositor: Gino
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
            Caso Real en Software: SLA de Microservicios & Puente a α
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Auditoría de latencia en PostgreSQL · Estimación de punta a punta y entrega al Bloque C.
          </p>
        </div>

        <div className="flex gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 shrink-0">
          {[95, 99].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedConfidence(lvl)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedConfidence === lvl
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Auditar al {lvl}%
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Lado Izquierdo: Paso a Paso Numérico */}
        <div className="lg:col-span-7 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-slate-300 uppercase tracking-wider">
              Caso de Producción: Endpoint /checkout/pay
            </span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono font-bold">
              SLA Máximo: 150 ms
            </span>
          </div>

          {/* Datos Muestrales del APM */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Muestra (APM)</span>
              <span className="font-mono text-white font-bold text-sm">n = 100</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Transacciones</span>
            </div>
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Media Muestral</span>
              <span className="font-mono text-amber-400 font-bold text-sm">x̄ = 138.5 ms</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Promedio medido</span>
            </div>
            <div className="p-2 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block">Desvío Estándar</span>
              <span className="font-mono text-teal-400 font-bold text-sm">s = 25.0 ms</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">Variabilidad</span>
            </div>
          </div>

          {/* Los 4 pasos de resolución */}
          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-amber-400 font-bold mr-2">Paso 1:</span>
                <span className="text-slate-300">Error Estándar (SE = s / √n)</span>
              </div>
              <span className="font-mono text-slate-200 font-bold">25 / √100 = 2.50 ms</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-amber-400 font-bold mr-2">Paso 2:</span>
                <span className="text-slate-300">Margen de Error (E = Z · SE)</span>
              </div>
              <span className="font-mono text-amber-400 font-bold">{z} · 2.50 = ± {margenError.toFixed(2)} ms</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
              <div>
                <span className="text-amber-400 font-bold mr-2">Paso 3:</span>
                <span className="text-slate-300">Intervalo IC_{selectedConfidence}%</span>
              </div>
              <span className="font-mono text-emerald-400 font-bold text-sm">
                [{icMin} ms, {icMax} ms]
              </span>
            </div>
          </div>

          {/* Veredicto de Ingeniería */}
          <div className="p-3 bg-emerald-950/30 rounded-xl border border-emerald-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-emerald-300 block">Veredicto Operativo: SLA Garantizado</span>
                <span className="text-slate-400 text-[11px]">
                  La peor cota razonable ({icMax} ms) se mantiene por debajo de 150 ms.
                </span>
              </div>
            </div>
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">
              PASS
            </span>
          </div>
        </div>

        {/* Lado Derecho: Código SciPy en Producción & El Puente hacia Andy */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
          {/* Código SciPy */}
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                Automatización en Python
              </span>
              <span className="text-[10px] text-slate-500 font-mono">scipy.stats</span>
            </div>
            <pre className="font-mono text-[11px] text-slate-300 bg-slate-900/90 p-2.5 rounded-lg border border-slate-800/80 overflow-x-auto leading-relaxed">
{`from scipy import stats
import numpy as np

n, x_bar, s = 100, 138.5, 25.0
se = s / np.sqrt(n)
ic = stats.norm.interval(
    ${selectedConfidence === 95 ? '0.95' : '0.99'}, loc=x_bar, scale=se
)
# ic -> (${icMin}, ${icMax})
sla_ok = ic[1] < 150.0  # True`}
            </pre>
          </div>

          {/* El Puente Hacia Andy */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-amber-950/40 via-slate-900 to-rose-950/30 border border-amber-800/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-amber-300 tracking-wider flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5 text-rose-400" />
                El Puente al Bloque C (Andy)
              </span>
              <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20 font-bold">
                α = {selectedConfidence === 95 ? '0.05' : '0.01'}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              El intervalo de confianza construyó un <strong className="text-white">escudo del {selectedConfidence}%</strong>. 
            </p>
            <p className="text-[11px] text-amber-200/90 leading-relaxed bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
              ¿Qué pasó con el <strong className="text-rose-400">{100 - selectedConfidence}%</strong> que dejamos fuera en las colas? Ese porcentaje es exactamente el <strong className="text-rose-300">Nivel de Significancia (α)</strong> que Andy usará en el siguiente bloque para decidir cuándo un efecto es real y cuándo rechazar la hipótesis nula.
            </p>
          </div>
        </div>
      </div>

      {/* Nota Técnica al pie */}
      <div className="p-2.5 bg-slate-950/70 rounded-xl border border-slate-800 flex items-center gap-2.5">
        <Target size={14} className="text-amber-400 shrink-0" />
        <p className="text-[11px] text-slate-300 leading-tight">
          <span className="font-bold uppercase tracking-wider text-amber-300">Para el especialista · </span>
          Dualidad fundamental: el conjunto de todos los valores μ₀ que caen dentro del intervalo de confianza al (1 - α) corresponde exactamente a las hipótesis nulas H₀: μ = μ₀ que no pueden ser rechazadas con significancia α.
        </p>
      </div>
    </div>
  );
}
