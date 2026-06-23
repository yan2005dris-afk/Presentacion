interface Props { isActive: boolean }

const POINTS = [
  {
    icon: '🧭',
    color: '#60a5fa',
    title: 'SISD sigue siendo la base',
    body: 'El modelo von Neumann con pipeline es el núcleo de todo procesador moderno. Sin entender SISD no hay forma de razonar sobre dónde SIMD ayuda.',
  },
  {
    icon: '⚡',
    color: '#a78bfa',
    title: 'SIMD explota el paralelismo de datos',
    body: 'Una instrucción, múltiples resultados. AVX-512 da 16 operaciones float32 en un solo ciclo de decodificación. Es el mayor salto de rendimiento dentro de un único núcleo.',
  },
  {
    icon: '📈',
    color: '#fbbf24',
    title: 'Evolución constante: 64 → 512 bits',
    body: 'MMX (1997) → SSE (1999) → AVX (2011) → AVX-512 (2016). Cada generación duplicó el ancho de registro. Retrocompatibilidad preservada en cada paso.',
  },
  {
    icon: '⚖️',
    color: '#f97316',
    title: 'Amdahl limita el speedup real',
    body: 'Con P=90%, el techo es 10× independientemente del paralelismo. El cuello de botella es siempre la fracción serial: control, I/O, sincronización.',
  },
  {
    icon: '🌍',
    color: '#34d399',
    title: 'SIMD está en todos lados',
    body: 'Imágenes, video, ML, juegos, telecomunicaciones. Si tocás datos homogéneos en volumen, SIMD ya está trabajando para vos — sepas o no que existe.',
  },
]

export default function ConclusionesSlide({ isActive: _ }: Props) {
  return (
    <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div className="r-card">
        <span className="r-stripe">Conclusiones</span>
        <h2>Lo que se lleva</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '0.8rem' }}>
          {POINTS.map((p) => (
            <div
              key={p.title}
              style={{
                display: 'flex',
                gap: '0.8rem',
                alignItems: 'flex-start',
                padding: '0.55rem 0.7rem',
                borderRadius: '0.5rem',
                background: 'rgba(255,255,255,0.03)',
                border: `1px solid ${p.color}33`,
              }}
            >
              <span style={{ fontSize: '1em', flexShrink: 0, lineHeight: 1 }}>{p.icon}</span>
              <div>
                <div style={{ fontSize: '0.56em', fontWeight: 700, color: p.color, marginBottom: '0.15em' }}>{p.title}</div>
                <p style={{ fontSize: '0.48em', color: 'var(--r-dim)', margin: 0, lineHeight: 1.5 }}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <div className="r-stat" style={{ flex: 1 }}>
            <div className="r-stat-num">16×</div>
            <div className="r-stat-lbl">speedup teórico AVX-512 (float32)</div>
          </div>
          <div className="r-stat" style={{ flex: 1 }}>
            <div className="r-stat-num">1966</div>
            <div className="r-stat-lbl">año de la Taxonomía de Flynn</div>
          </div>
          <div className="r-stat" style={{ flex: 1 }}>
            <div className="r-stat-num">512b</div>
            <div className="r-stat-lbl">ancho máximo de registro ZMM</div>
          </div>
        </div>
      </div>
    </section>
  )
}
