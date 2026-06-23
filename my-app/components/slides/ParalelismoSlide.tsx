interface Props { isActive: boolean }

export default function ParalelismoSlide({ isActive: _ }: Props) {
  return (
    <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div className="r-card">
        <span className="r-stripe">Parte 1 — Fundamentos</span>
        <h2>¿Por qué el Paralelismo?</h2>
        <p style={{ color: 'var(--r-dim)', marginBottom: '1rem' }}>
          Tres fuerzas físicas y económicas que hicieron inevitable el procesamiento paralelo.
        </p>

        <div className="r-grid-3">
          {[
            {
              icon: '🌡️',
              title: 'La Barrera Térmica',
              body: 'P = C × V² × f — Duplicar la frecuencia implica consumo cuadrático. La Ley de Dennard falló ~2004.',
              callout: 'Procesadores >5 GHz son imprácticos por calor',
              calloutType: 'r-callout-warn',
            },
            {
              icon: '💾',
              title: 'Memory Wall',
              body: 'CPUs ejecutan instrucciones en nanosegundos. La RAM tarda 60–100ns. Una brecha que crece generación a generación.',
              callout: 'CPU: 3ns · L3 cache: 30ns · RAM: 80ns',
              calloutType: 'r-callout-info',
            },
            {
              icon: '💰',
              title: 'Costo de Transistores',
              body: 'El costo por transistor dejó de decrecer. Rendimiento solo mediante densidad se volvió prohibitivo.',
              callout: 'Solución: trabajar en paralelo',
              calloutType: 'r-callout-purple',
            },
          ].map((card) => (
            <div key={card.title} className="r-item-card">
              <div style={{ fontSize: '1.4em', marginBottom: '0.3em' }}>{card.icon}</div>
              <h3 style={{ marginTop: 0 }}>{card.title}</h3>
              <p style={{ fontSize: '0.58em', color: 'var(--r-dim)' }}>{card.body}</p>
              <div className={`r-callout ${card.calloutType}`}>
                <strong style={{ fontSize: '0.9em' }}>{card.callout}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="r-callout r-callout-purple" style={{ marginTop: '0.8rem' }}>
          <strong>La conclusión:</strong> en lugar de hacer <em>una cosa más rápido</em>, la industria apostó a hacer <em>múltiples cosas simultáneamente</em>. Nació el paralelismo de datos.
        </div>

        <div className="r-formula">P = C × V² × f</div>
      </div>
    </section>
  )
}
