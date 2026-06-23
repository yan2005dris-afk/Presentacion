interface Props { isActive: boolean }

const APPS = [
  {
    icon: '🖼️',
    title: 'Procesamiento de Imágenes',
    color: '#60a5fa',
    items: ['Filtros convolucionales (blur, sharpen)', 'Transformaciones de color (RGB→YUV)', 'JPEG/PNG encode/decode', 'Redimensionado bilineal masivo'],
  },
  {
    icon: '🎬',
    title: 'Video & Multimedia',
    color: '#f97316',
    items: ['Codecs H.264 / H.265 / AV1', 'Motion estimation (HEVC)', 'Mezcla de audio multicanal', 'Renderizado de subtítulos'],
  },
  {
    icon: '🧠',
    title: 'Machine Learning',
    color: '#a78bfa',
    items: ['Multiplicación de matrices (GEMM)', 'Activaciones ReLU/Sigmoid en batch', 'Convoluciones de redes neuronales', 'Inferencia en CPU (ONNX Runtime)'],
  },
  {
    icon: '🎮',
    title: 'Gráficos & Juegos',
    color: '#34d399',
    items: ['Transformaciones de vértices 3D', 'Iluminación por píxel (Phong)', 'Colisión física en batch', 'Mezcla de texturas (bilinear filtering)'],
  },
  {
    icon: '🔬',
    title: 'HPC & Ciencia',
    color: '#fbbf24',
    items: ['Simulaciones de fluidos (CFD)', 'Álgebra lineal (BLAS/LAPACK)', 'FFT sobre señales largas', 'Criptografía (AES-NI, SHA-NI)'],
  },
  {
    icon: '📡',
    title: 'Telecomunicaciones',
    color: '#fb7185',
    items: ['DSP: filtros FIR/IIR vectorizados', 'Modulación/demodulación QAM', 'Decodificación LDPC/Turbo', 'Procesamiento de radar/sonar'],
  },
]

export default function AplicacionesSlide({ isActive: _ }: Props) {
  return (
    <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
      <div className="r-card">
        <span className="r-stripe">Parte 4 — Aplicaciones Reales</span>
        <h2>SIMD en el Mundo Real</h2>
        <p style={{ color: 'var(--r-dim)', marginBottom: '0.8rem', fontSize: '0.55em' }}>
          Todo lo que requiere procesar grandes volúmenes de datos homogéneos se beneficia de SIMD — sin excepción.
        </p>

        <div className="r-grid-3" style={{ gap: '0.7rem' }}>
          {APPS.map((a) => (
            <div
              key={a.title}
              className="r-item-card"
              style={{ borderColor: a.color + '55', padding: '0.7rem' }}
            >
              <div style={{ fontSize: '1.1em', marginBottom: '0.25rem' }}>{a.icon}</div>
              <div style={{ fontSize: '0.52em', fontWeight: 700, color: a.color, marginBottom: '0.4rem', lineHeight: 1.3 }}>{a.title}</div>
              <ul style={{ margin: 0, paddingLeft: '1em', listStyle: 'disc' }}>
                {a.items.map((item) => (
                  <li key={item} style={{ fontSize: '0.4em', color: 'var(--r-dim)', lineHeight: 1.6 }}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
