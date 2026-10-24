import React, { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';

const CODE_EXAMPLES = {
  python: {
    lang: 'Python (SciPy)',
    ext: '.py',
    lines: [
      { text: '# Pipeline de Decisión Automatizada A/B Testing', type: 'comment' },
      { text: 'from scipy import stats', type: 'import' },
      { text: '', type: 'empty' },
      { text: '# 1. Muestreo de conversión de 12,500 usuarios por grupo', type: 'comment' },
      { text: 'stat, p_value = stats.ttest_ind(control_A, variant_B, equal_var=False)', type: 'code' },
      { text: '', type: 'empty' },
      { text: '# 2. Criterio de Significancia Formal (alfa = 0.05)', type: 'comment' },
      { text: 'if p_value <= 0.05:', type: 'control' },
      { text: '    # Rechazo formal de H0: La variante B aumentó ventas con significancia real', type: 'comment' },
      { text: '    feature_flags.rollout("variant_b_1click", percentage=1.0)', type: 'success' },
      { text: '    alerts.slack(f"Feature desplegada al 100%. p={p_value:.4f}")', type: 'code' },
      { text: 'else:', type: 'control' },
      { text: '    # No hay evidencia suficiente: Descartar variante y evitar deuda técnica', type: 'comment' },
      { text: '    feature_flags.kill_switch("variant_b_1click")', type: 'danger' },
      { text: '    alerts.slack("Variante B descartada. Efecto compatible con el azar.")', type: 'code' }
    ]
  },
  javascript: {
    lang: 'Node.js (jStat)',
    ext: '.js',
    lines: [
      { text: '// Microservicio en Node.js para Evaluación de Experimento', type: 'comment' },
      { text: 'import { jStat } from "jstat";', type: 'import' },
      { text: '', type: 'empty' },
      { text: '// Cálculo de t-statistic y p-value bilateral de dos colas', type: 'comment' },
      { text: 'const pValue = jStat.ttest(meanB, meanA, sdA, nA, 2);', type: 'code' },
      { text: '', type: 'empty' },
      { text: 'if (pValue <= 0.05) {', type: 'control' },
      { text: '  await unleashClient.setEnabled("checkout_1click", true);', type: 'success' },
      { text: '  logger.info({ pValue }, "Rollout aprobado por significancia estadística");', type: 'code' },
      { text: '} else {', type: 'control' },
      { text: '  await unleashClient.setEnabled("checkout_1click", false);', type: 'danger' },
      { text: '}', type: 'control' }
    ]
  },
  r: {
    lang: 'R (Data Science)',
    ext: '.R',
    lines: [
      { text: '# Análisis de Varianza y T-test en R', type: 'comment' },
      { text: 'ab_result <- t.test(variant_b$conversion, control_a$conversion,', type: 'code' },
      { text: '                    alternative = "greater", var.equal = FALSE)', type: 'code' },
      { text: '', type: 'empty' },
      { text: '# Visualizar estadísticos de prueba y p-valor', type: 'comment' },
      { text: 'summary(ab_result)', type: 'code' },
      { text: 'p_val <- ab_result$p.value # 0.0032 <= 0.05 -> Rechazar H0', type: 'success' }
    ]
  }
};

export function InteractiveCodeBlock() {
  const [activeLang, setActiveLang] = useState('python');
  const [copied, setCopied] = useState(false);

  const activeSnippet = CODE_EXAMPLES[activeLang];

  const handleCopy = () => {
    const raw = activeSnippet.lines.map(l => l.text).join('\n');
    navigator.clipboard.writeText(raw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden shadow-2xl">
      {/* Editor Header estilo VS Code / Mac */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>

          <div className="flex gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            {Object.keys(CODE_EXAMPLES).map((key) => (
              <button
                key={key}
                onClick={() => setActiveLang(key)}
                className={`px-2.5 py-0.5 rounded text-xs font-mono transition-all ${
                  activeLang === key
                    ? 'bg-purple-600 text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {CODE_EXAMPLES[key].lang}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/80 border border-slate-700/60 transition-all"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copiado' : 'Copiar'}</span>
        </button>
      </div>

      {/* Editor Lines */}
      <div className="p-4 font-mono text-xs overflow-x-auto space-y-0.5 leading-relaxed bg-slate-950">
        {activeSnippet.lines.map((line, idx) => (
          <div key={idx} className="flex gap-4">
            <span className="w-6 text-slate-600 text-right select-none text-[11px] shrink-0">
              {idx + 1}
            </span>
            <span
              className={
                line.type === 'comment'
                  ? 'text-slate-500 italic'
                  : line.type === 'import'
                  ? 'text-pink-400 font-bold'
                  : line.type === 'control'
                  ? 'text-purple-400 font-bold'
                  : line.type === 'success'
                  ? 'text-emerald-300 font-bold'
                  : line.type === 'danger'
                  ? 'text-rose-400'
                  : 'text-slate-200'
              }
            >
              {line.text || ' '}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
