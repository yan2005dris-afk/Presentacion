import React from 'react';

/**
 * Fórmula pura de la Función de Densidad Normal (PDF) dibujada en SVG vectorial.
 * Cero dependencias de KaTeX o CDN, nítida en cualquier pantalla y proyector.
 */
export function GaussFormulaSVG({ className = '' }) {
  return (
    <svg viewBox="0 0 340 70" className={`w-full max-w-[340px] h-auto mx-auto overflow-visible select-none ${className}`}>
      {/* f(x) = */}
      <text x="5" y="42" fill="#c084fc" fontSize="22" fontFamily="serif" fontStyle="italic" fontWeight="bold">
        f(x)
      </text>
      <text x="48" y="40" fill="#94a3b8" fontSize="20" fontFamily="sans-serif">
        =
      </text>

      {/* Fracción 1 / [sigma * sqrt(2*pi)] */}
      <g>
        {/* Numerador: 1 */}
        <text x="100" y="26" fill="#f8fafc" fontSize="18" fontFamily="serif" textAnchor="middle" fontWeight="bold">
          1
        </text>
        
        {/* Barra de fracción */}
        <line x1="72" y1="34" x2="128" y2="34" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" />

        {/* Denominador: sigma * sqrt(2pi) */}
        <text x="82" y="52" fill="#f8fafc" fontSize="18" fontFamily="serif" fontStyle="italic">
          σ
        </text>
        
        {/* Símbolo Radical de Raíz cuadrada */}
        <path
          d="M 94 48 L 98 48 L 102 56 L 107 38 L 126 38"
          fill="none"
          stroke="#f8fafc"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* 2 * pi dentro de la raíz */}
        <text x="110" y="51" fill="#f8fafc" fontSize="13" fontFamily="serif">
          2π
        </text>
      </g>

      {/* Multiplicador: · e */}
      <text x="138" y="40" fill="#94a3b8" fontSize="18" fontFamily="sans-serif">
        ·
      </text>
      <text x="148" y="42" fill="#f8fafc" fontSize="22" fontFamily="serif" fontStyle="italic" fontWeight="bold">
        e
      </text>

      {/* Exponente: - 1/2 * ((x - mu)/sigma)^2 */}
      <g transform="translate(162, 5)">
        {/* Signo menos */}
        <text x="4" y="24" fill="#c084fc" fontSize="16" fontFamily="sans-serif" fontWeight="bold">
          -
        </text>

        {/* Fracción pequeña 1/2 */}
        <text x="20" y="16" fill="#c084fc" fontSize="12" fontFamily="serif" textAnchor="middle">
          1
        </text>
        <line x1="14" y1="21" x2="26" y2="21" stroke="#c084fc" strokeWidth="1.2" />
        <text x="20" y="32" fill="#c084fc" fontSize="12" fontFamily="serif" textAnchor="middle">
          2
        </text>

        {/* Paréntesis izquierdo grande */}
        <text x="32" y="27" fill="#cbd5e1" fontSize="26" fontFamily="serif">
          (
        </text>

        {/* Fracción (x - mu) / sigma */}
        <text x="62" y="17" fill="#f8fafc" fontSize="13" fontFamily="serif" fontStyle="italic" textAnchor="middle">
          x - μ
        </text>
        <line x1="44" y1="22" x2="80" y2="22" stroke="#94a3b8" strokeWidth="1.2" />
        <text x="62" y="34" fill="#f8fafc" fontSize="13" fontFamily="serif" fontStyle="italic" textAnchor="middle">
          σ
        </text>

        {/* Paréntesis derecho grande */}
        <text x="82" y="27" fill="#cbd5e1" fontSize="26" fontFamily="serif">
          )
        </text>

        {/* Cuadrado superíndice */}
        <text x="92" y="14" fill="#c084fc" fontSize="13" fontFamily="serif" fontWeight="bold">
          2
        </text>
      </g>
    </svg>
  );
}

/**
 * Fórmula de Gauss evaluada con valores reales sustituidos en vivo (x, mu, sigma).
 */
export function GaussEvaluatedFormulaSVG({ x = 150, mu = 150, sigma = 20, className = '' }) {
  // Cálculo paso a paso
  const diff = x - mu;
  const z = sigma !== 0 ? (diff / sigma) : 0;
  const exponent = -0.5 * Math.pow(z, 2);
  const coeff = 1 / (sigma * Math.sqrt(2 * Math.PI));
  const result = coeff * Math.exp(exponent);

  return (
    <div className={`space-y-3 font-mono text-center ${className}`}>
      {/* Sustitución en la ecuación */}
      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
        <span className="text-purple-300 font-bold">f({x})</span>
        <span className="text-slate-400">=</span>
        <span className="inline-flex flex-col items-center">
          <span className="border-b border-slate-600 px-2 text-slate-200">1</span>
          <span className="text-amber-400 font-bold">{sigma} · √(2π)</span>
        </span>
        <span className="text-slate-400">·</span>
        <span className="text-slate-200">
          e <sup className="text-purple-400 font-bold">-½ ({x} - {mu} / {sigma})²</sup>
        </span>
      </div>

      {/* Salida numérica exacta f(x) */}
      <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-purple-950/30 border border-purple-800/40 text-xs">
        <span className="text-slate-400">Densidad calculada f({x}):</span>
        <span className="font-mono text-emerald-400 font-bold text-sm bg-slate-950 px-2 py-0.5 rounded border border-emerald-800/40">
          {result.toFixed(6)}
        </span>
      </div>
    </div>
  );
}

/**
 * Fórmula del Z-Score renderizada en SVG vectorial con datos en vivo.
 */
export function ZScoreFormulaSVG({ x = 190, mu = 150, sigma = 20, z = "2.00", className = '' }) {
  return (
    <svg viewBox="0 0 320 50" className={`w-full max-w-[320px] h-auto mx-auto overflow-visible select-none ${className}`}>
      {/* Z = */}
      <text x="5" y="32" fill="#c084fc" fontSize="20" fontFamily="serif" fontStyle="italic" fontWeight="bold">
        Z
      </text>
      <text x="25" y="30" fill="#94a3b8" fontSize="18" fontFamily="sans-serif">
        =
      </text>

      {/* (X - mu) / sigma */}
      <g transform="translate(42, 0)">
        <text x="28" y="20" fill="#f8fafc" fontSize="15" fontFamily="serif" fontStyle="italic" textAnchor="middle">
          X - μ
        </text>
        <line x1="6" y1="26" x2="50" y2="26" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="28" y="42" fill="#f8fafc" fontSize="15" fontFamily="serif" fontStyle="italic" textAnchor="middle">
          σ
        </text>
      </g>

      <text x="104" y="30" fill="#94a3b8" fontSize="18" fontFamily="sans-serif">
        =
      </text>

      {/* (x_valor - 150) / 20 */}
      <g transform="translate(120, 0)">
        <text x="36" y="20" fill="#c084fc" fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
          {x} - {mu}
        </text>
        <line x1="8" y1="26" x2="64" y2="26" stroke="#94a3b8" strokeWidth="1.5" />
        <text x="36" y="42" fill="#94a3b8" fontSize="14" fontFamily="monospace" textAnchor="middle">
          {sigma}
        </text>
      </g>

      <text x="194" y="30" fill="#94a3b8" fontSize="18" fontFamily="sans-serif">
        =
      </text>

      {/* Resultado Z destacado */}
      <rect x="214" y="10" width="55" height="28" rx="6" fill="#581c87" stroke="#a855f7" strokeWidth="1.5" />
      <text x="241" y="29" fill="#f3e8ff" fontSize="15" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
        {z}
      </text>
    </svg>
  );
}
