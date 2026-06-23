interface Props { isActive: boolean }

const parts = [
  {
    badge: 'Parte 1', badgeClass: 'badge-sisd', icon: '🔢',
    title: 'Fundamentos y SISD',
    items: ['Introducción al paralelismo', 'Taxonomía de Flynn', 'Arquitectura SISD y pipeline', 'Limitaciones del modelo secuencial'],
  },
  {
    badge: 'Parte 2', badgeClass: 'badge-simd', icon: '⚡',
    title: 'SIMD y Procesamiento Vectorial',
    items: ['Concepto fundamental SIMD', 'Operaciones vectoriales', 'Paralelismo de datos', 'Ventajas y limitaciones'],
  },
  {
    badge: 'Parte 3', badgeClass: 'badge-sse', icon: '🔧',
    title: 'Implementación en Procesadores',
    items: ['MMX → SSE → AVX → AVX-512', 'Registros vectoriales 64–512 bits', 'Instrucciones SIMD fundamentales', 'Fases de ejecución interna'],
  },
  {
    badge: 'Parte 4', badgeClass: 'badge-avx', icon: '🚀',
    title: 'Rendimiento y Aplicaciones',
    items: ['Speedup y Ley de Amdahl', 'Imágenes, video, IA, videojuegos', 'GPUs y relación con SIMD', 'Tendencias futuras'],
  },
]

export default function AgendaSlide({ isActive: _ }: Props) {
  return (
    <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div className="r-card">
        <h2>Contenido de la Presentación</h2>
        <div className="r-grid-2">
          {parts.map((p) => (
            <div key={p.title} className="r-item-card">
              <div style={{ marginBottom: '0.5rem' }}>
                <span className={`r-badge ${p.badgeClass}`}>{p.badge}</span>
                <span style={{ marginLeft: '0.5rem', fontSize: '0.65em', fontWeight: 700 }}>{p.icon} {p.title}</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: '1.1em' }}>
                {p.items.map((item) => (
                  <li key={item} style={{ fontSize: '0.55em', color: 'var(--r-dim)', marginBottom: '0.2em' }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
