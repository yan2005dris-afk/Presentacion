interface Props { isActive: boolean }

const TIMELINE = [
  { year: '1997', badge: 'badge-info',  label: 'MMX',      bits: '64',  color: '#60a5fa', desc: '8 registros MM0–MM7 (alias de FPU). Enteros empaquetados 8/16/32 bits. Sin punto flotante.' },
  { year: '1999', badge: 'badge-sse',   label: 'SSE',      bits: '128', color: '#34d399', desc: '8→16 registros XMM0–XMM15. Punto flotante de precisión simple. SSE2 (2000) agrega doble precisión.' },
  { year: '2011', badge: 'badge-avx',   label: 'AVX / AVX2', bits: '256', color: '#fbbf24', desc: '16 registros YMM. Formato VEX de 3 operandos. AVX2 (2013): enteros 256 bits + FMA.' },
  { year: '2016', badge: 'badge-simd',  label: 'AVX-512',  bits: '512', color: '#a78bfa', desc: '32 registros ZMM. Operandos de máscara K0–K7 para predicación. FMA 512 bits.' },
]

const SPEEDUPS = [
  { val: '2×',  lbl: 'MMX',     color: '#60a5fa', pct: '12' },
  { val: '4×',  lbl: 'SSE',     color: '#34d399', pct: '25' },
  { val: '8×',  lbl: 'AVX',     color: '#fbbf24', pct: '50' },
  { val: '16×', lbl: 'AVX-512', color: '#a78bfa', pct: '100' },
]

export default function EvolucionSlide({ isActive: _ }: Props) {
  return (
    <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div className="r-card">
        <span className="r-stripe">Parte 3 — Evolución SIMD en x86</span>
        <h2>De MMX a AVX-512: 25 años de Evolución Vectorial</h2>

        <div className="r-tl" style={{ marginBottom: '1rem' }}>
          {TIMELINE.map((t) => (
            <div key={t.label} className="r-tl-item">
              <div className="r-tl-dot" style={{ background: t.color }} />
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ minWidth: '45px', fontSize: '0.5em', fontWeight: 700, color: 'var(--r-dim)', paddingTop: '0.1em' }}>{t.year}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2em' }}>
                    <span className={`r-badge ${t.badge}`}>{t.label}</span>
                    <span style={{ fontSize: '0.52em', fontWeight: 700, color: t.color }}>{t.bits} bits</span>
                  </div>
                  <p style={{ fontSize: '0.5em', color: 'var(--r-dim)', margin: 0 }}>{t.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Speedup comparison bars */}
        <div style={{ marginTop: '0.8rem' }}>
          {SPEEDUPS.map((s) => (
            <div key={s.lbl} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.4rem' }}>
              <div style={{ width: '60px', fontSize: '0.48em', fontWeight: 700, color: 'var(--r-dim)', textAlign: 'right' }}>{s.lbl}</div>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: '4px', height: '20px', overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${s.pct}%`, background: `linear-gradient(90deg, ${s.color}88, ${s.color})`, borderRadius: '4px', transition: 'width 1s ease' }} />
              </div>
              <div style={{ width: '35px', fontSize: '0.5em', fontWeight: 800, color: s.color }}>{s.val}</div>
            </div>
          ))}
          <p style={{ fontSize: '0.42em', color: 'var(--r-dim)', margin: '0.3rem 0 0' }}>Speedup teórico máximo vs escalar (float32)</p>
        </div>
      </div>
    </section>
  )
}
