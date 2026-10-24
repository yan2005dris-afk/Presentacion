import React, { useState } from 'react';
import { Play, RotateCcw, Sparkles, TrendingUp } from 'lucide-react';

/**
 * Simulador del Teorema del Límite Central (TLC) en tiempo real.
 * Toma muestras aleatorias de una distribución asimétrica y acumula sus medias.
 */
export function TLCSimulatorSVG() {
  const [sampleCount, setSampleCount] = useState(0);
  // Histograma de 12 bins para las medias calculadas (rango de 10.0 a 14.0 min)
  const [bins, setBins] = useState(new Array(12).fill(0));
  const [isRunning, setIsRunning] = useState(false);

  // Generador de población asimétrica (Exponential con media 12 min)
  const getSkewedValue = () => {
    // Exponencial invertida/sesgada: muchos compran rápido (~10 min), pocos tardan mucho
    return 8 + (-4 * Math.log(1 - Math.random() * 0.95));
  };

  const runSimulation = (batchSize = 50) => {
    setIsRunning(true);
    const newBins = [...bins];
    let added = 0;

    for (let i = 0; i < batchSize; i++) {
      // Tomar muestra de n = 30 clientes
      let sum = 0;
      for (let j = 0; j < 30; j++) {
        sum += getSkewedValue();
      }
      const sampleMean = sum / 30; // media muestral x̄

      // Asignar al bin correspondiente entre 10.5 y 13.5
      const minVal = 10.5;
      const maxVal = 13.5;
      const binIdx = Math.min(11, Math.max(0, Math.floor(((sampleMean - minVal) / (maxVal - minVal)) * 12)));
      newBins[binIdx] += 1;
      added += 1;
    }

    setBins(newBins);
    setSampleCount(prev => prev + added);
    setTimeout(() => setIsRunning(false), 200);
  };

  const resetSimulation = () => {
    setBins(new Array(12).fill(0));
    setSampleCount(0);
  };

  const maxBinVal = Math.max(1, ...bins);

  return (
    <div className="p-4 rounded-2xl bg-slate-950/80 border border-teal-500/30 space-y-3">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-teal-400" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">
            Simulador en Vivo: Medias Muestrales Acumuladas
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
            {sampleCount} muestras de n=30
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => runSimulation(50)}
            disabled={isRunning}
            className="px-3 py-1 rounded-lg text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center gap-1.5 transition-all shadow-md shadow-teal-500/20 disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            +50 Muestras
          </button>
          <button
            onClick={resetSimulation}
            className="p-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
            title="Reiniciar"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SVG Canvas del Histograma de Medias */}
      <div className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
        <svg viewBox="0 0 480 150" className="w-full h-36 overflow-visible select-none">
          {/* Eje X */}
          <line x1="20" y1="125" x2="460" y2="125" stroke="#334155" strokeWidth="1.5" />
          {/* Línea Central Media Teórica μ = 12min */}
          <line x1="240" y1="10" x2="240" y2="125" stroke="#38bdf8" strokeDasharray="3 3" strokeWidth="1.5" />
          <text x="240" y="8" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">
            μ = 12.0 min
          </text>

          {/* Barras de Medias Acumuladas */}
          {bins.map((val, idx) => {
            const barWidth = 28;
            const xPos = 40 + idx * 34;
            // Altura normalizada hasta 95px
            const barHeight = sampleCount > 0 ? (val / maxBinVal) * 95 : 0;
            const yPos = 125 - barHeight;

            return (
              <g key={idx} className="transition-all duration-300">
                <rect
                  x={xPos}
                  y={yPos}
                  width={barWidth}
                  height={barHeight}
                  rx="3"
                  fill="#14b8a6"
                  opacity={sampleCount > 0 ? 0.85 : 0.1}
                />
                {val > 0 && (
                  <text
                    x={xPos + barWidth / 2}
                    y={yPos - 4}
                    fill="#5eead4"
                    fontSize="9"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {val}
                  </text>
                )}
                {/* Labels de Bins en Eje X */}
                <text
                  x={xPos + barWidth / 2}
                  y="138"
                  fill="#64748b"
                  fontSize="8"
                  textAnchor="middle"
                  fontFamily="monospace"
                >
                  {(10.5 + idx * 0.25).toFixed(1)}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="text-center text-[10px] text-slate-400 mt-1">
          {sampleCount === 0
            ? "Hacé clic en '+50 Muestras' para observar cómo la suma de promedios va esculpiendo la campana simétrica."
            : sampleCount < 150
            ? `Se han promediado ${sampleCount} grupos. La forma de campana comienza a emerger alrededor de μ = 12 min.`
            : `¡Demostración visual del TLC! Con ${sampleCount} muestras, la distribución es indiscutiblemente gaussiana.`}
        </div>
      </div>
    </div>
  );
}
