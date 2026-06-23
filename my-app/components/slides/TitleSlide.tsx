interface Props { isActive: boolean }

export default function TitleSlide({ isActive: _ }: Props) {
  return (
    <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div className="r-card" style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', gap: '0.8rem' }}>
          <span className="r-badge badge-sisd" style={{ fontSize: '0.8em', padding: '0.3em 1em' }}>SISD</span>
          <span style={{ color: 'var(--r-dim)', fontSize: '0.7em', alignSelf: 'center' }}>⟷</span>
          <span className="r-badge badge-simd" style={{ fontSize: '0.8em', padding: '0.3em 1em' }}>SIMD</span>
        </div>

        <h1>Arquitecturas de Computadoras Paralelas</h1>

        <p style={{ fontSize: '0.7em', color: 'var(--r-dim)', maxWidth: '700px', margin: '0.5rem auto 1.5rem' }}>
          Procesamiento Secuencial y Vectorial · Fundamentos, Implementación y Aplicaciones
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', margin: '1.5rem 0' }}>
          {[
            { val: '4',    lbl: 'Partes',           color: 'var(--r-accent)' },
            { val: '512',  lbl: 'bits AVX-512',      color: 'var(--r-accent2)' },
            { val: '16×',  lbl: 'Speedup teórico',   color: 'var(--r-accent3)' },
            { val: '1966', lbl: 'Taxonomía de Flynn', color: '#f472b6' },
          ].map(({ val, lbl, color }) => (
            <div key={lbl} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.4em', fontWeight: 800, color }}>{val}</div>
              <div style={{ fontSize: '0.45em', color: 'var(--r-dim)' }}>{lbl}</div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: '0.5em', color: 'var(--r-dim)', borderTop: '1px solid var(--r-border)', paddingTop: '0.8em', marginTop: '0.5em' }}>
          Arquitectura y Organización de Computadoras · <kbd style={{ background: 'var(--r-border)', padding: '0.1em 0.4em', borderRadius: '4px' }}>→</kbd> avanzar · <kbd style={{ background: 'var(--r-border)', padding: '0.1em 0.4em', borderRadius: '4px' }}>F</kbd> pantalla completa
        </p>
      </div>
    </section>
  )
}
