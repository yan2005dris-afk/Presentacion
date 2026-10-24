import React, { useState } from 'react';
import { GitBranch, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

export function DecisionTreeDiagramSVG() {
  const [selectedPath, setSelectedPath] = useState('t-test'); // 't-test' | 'anova' | 'chi2'

  return (
    <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
        <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
          <GitBranch className="w-4 h-4 text-purple-400" />
          Árbol de Decisión: ¿Qué Prueba Inferencial Usar?
        </div>

        <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setSelectedPath('t-test')}
            className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
              selectedPath === 't-test' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            2 Grupos (T-Test)
          </button>
          <button
            onClick={() => setSelectedPath('anova')}
            className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
              selectedPath === 'anova' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            3+ Grupos (ANOVA)
          </button>
          <button
            onClick={() => setSelectedPath('chi2')}
            className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
              selectedPath === 'chi2' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tasas / Categórico (χ²)
          </button>
        </div>
      </div>

      {/* SVG Diagrama de Flujo Interactivo */}
      <div className="bg-slate-950/90 p-4 rounded-xl border border-slate-800">
        <svg viewBox="0 0 540 160" className="w-full h-40 overflow-visible select-none">
          {/* Nodo Raíz: Tipo de Métrica */}
          <rect x="10" y="55" width="130" height="45" rx="8" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
          <text x="75" y="75" fill="#c7d2fe" fontSize="10" textAnchor="middle" fontWeight="bold">¿Tipo de Métrica?</text>
          <text x="75" y="90" fill="#94a3b8" fontSize="9" textAnchor="middle">Datos continuos vs tasas</text>

          {/* Ramas principales */}
          {/* Rama Continua */}
          <path d="M 140 70 L 200 40" fill="none" stroke={selectedPath !== 'chi2' ? '#818cf8' : '#334155'} strokeWidth="2" />
          <text x="175" y="48" fill="#818cf8" fontSize="8" fontWeight="bold">Continuos</text>

          {/* Rama Categórica */}
          <path d="M 140 85 L 200 120" fill="none" stroke={selectedPath === 'chi2' ? '#34d399' : '#334155'} strokeWidth="2" />
          <text x="175" y="112" fill="#34d399" fontSize="8" fontWeight="bold">Tasas (A/B)</text>

          {/* Subnodo: Cantidad de Grupos */}
          <rect x="200" y="18" width="140" height="42" rx="8" fill="#0f172a" stroke={selectedPath !== 'chi2' ? '#818cf8' : '#334155'} strokeWidth="1.5" />
          <text x="270" y="36" fill="#e2e8f0" fontSize="10" textAnchor="middle" fontWeight="bold">¿Cuántos grupos?</text>
          <text x="270" y="50" fill="#64748b" fontSize="8" textAnchor="middle">Variantes a contrastar</text>

          {/* Conexión a T-Test */}
          <path d="M 340 32 L 390 20" fill="none" stroke={selectedPath === 't-test' ? '#c084fc' : '#334155'} strokeWidth="2" />
          <text x="365" y="18" fill="#c084fc" fontSize="8" fontWeight="bold">k = 2</text>

          {/* Conexión a ANOVA */}
          <path d="M 340 45 L 390 55" fill="none" stroke={selectedPath === 'anova' ? '#60a5fa' : '#334155'} strokeWidth="2" />
          <text x="365" y="60" fill="#60a5fa" fontSize="8" fontWeight="bold">k ≥ 3</text>

          {/* Nodo Final 1: T-Test */}
          <rect x="390" y="5" width="140" height="34" rx="6" fill={selectedPath === 't-test' ? '#581c87' : '#020617'} stroke={selectedPath === 't-test' ? '#c084fc' : '#1e293b'} strokeWidth="1.5" />
          <text x="460" y="21" fill={selectedPath === 't-test' ? '#f5d0fe' : '#64748b'} fontSize="10" textAnchor="middle" fontWeight="bold">
            T-Test de Student
          </text>
          <text x="460" y="32" fill={selectedPath === 't-test' ? '#d8b4fe' : '#475569'} fontSize="8" textAnchor="middle">
            Compara 2 medias independientes
          </text>

          {/* Nodo Final 2: ANOVA */}
          <rect x="390" y="44" width="140" height="34" rx="6" fill={selectedPath === 'anova' ? '#1e3a8a' : '#020617'} stroke={selectedPath === 'anova' ? '#60a5fa' : '#1e293b'} strokeWidth="1.5" />
          <text x="460" y="60" fill={selectedPath === 'anova' ? '#bfdbfe' : '#64748b'} fontSize="10" textAnchor="middle" fontWeight="bold">
            ANOVA (F-Test)
          </text>
          <text x="460" y="71" fill={selectedPath === 'anova' ? '#93c5fd' : '#475569'} fontSize="8" textAnchor="middle">
            Evita inflar el Error Tipo I
          </text>

          {/* Nodo Final 3: Chi-Cuadrado */}
          <rect x="200" y="102" width="330" height="38" rx="6" fill={selectedPath === 'chi2' ? '#064e3b' : '#020617'} stroke={selectedPath === 'chi2' ? '#34d399' : '#1e293b'} strokeWidth="1.5" />
          <text x="365" y="119" fill={selectedPath === 'chi2' ? '#a7f3d0' : '#64748b'} fontSize="10" textAnchor="middle" fontWeight="bold">
            Prueba Chi-Cuadrado (χ²)
          </text>
          <text x="365" y="131" fill={selectedPath === 'chi2' ? '#6ee7b7' : '#475569'} fontSize="8" textAnchor="middle">
            Proporciones, clics (Sí/No) o categorías independientes
          </text>
        </svg>

        {/* Panel Explicativo del Camino Seleccionado */}
        <div className="mt-2 pt-2 border-t border-slate-800 text-xs">
          {selectedPath === 't-test' && (
            <p className="text-purple-300">
              <strong>T-Test de Student:</strong> Ideal para comparar el tiempo de respuesta o latencia de dos versiones (Versión A vs Versión B) cuando los datos son continuos y provienen de muestras aleatorias independientes.
            </p>
          )}
          {selectedPath === 'anova' && (
            <p className="text-blue-300">
              <strong>ANOVA (Análisis de Varianza):</strong> Indispensable al evaluar 3 o más variantes (ej: Plan Free, Pro, Enterprise). Si hicieras múltiples t-tests entre cada par, la probabilidad acumulada de falso positivo (Error Tipo I) se dispararía por encima del 15%.
            </p>
          )}
          {selectedPath === 'chi2' && (
            <p className="text-emerald-300">
              <strong>Chi-Cuadrado:</strong> Se utiliza cuando la métrica de éxito es binaria o discreta (ej: el usuario convirtió sí/no, o canceló la suscripción sí/no), contrastando frecuencias observadas vs frecuencias esperadas.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
