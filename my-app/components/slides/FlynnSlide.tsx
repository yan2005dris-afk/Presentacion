'use client'

import { useEffect, useRef } from 'react'

interface Props { isActive: boolean }

const cells = [
  {
    id: 'fc-sisd',
    label: 'SISD',
    sub: 'Single Instruction · Single Data',
    desc: 'Modelo von Neumann. Un flujo de instrucciones sobre un flujo de datos. Base de toda la computación secuencial.',
    icon: '🖥️',
    border: 'rgba(96,165,250,0.5)',
    bg: 'rgba(96,165,250,0.1)',
    color: '#60a5fa',
  },
  {
    id: 'fc-simd',
    label: 'SIMD',
    sub: 'Single Instruction · Multiple Data',
    desc: 'Una instrucción opera en paralelo sobre múltiples datos. Núcleo de SSE, AVX y las GPUs modernas.',
    icon: '⚡',
    border: 'rgba(167,139,250,0.5)',
    bg: 'rgba(167,139,250,0.1)',
    color: '#a78bfa',
  },
  {
    id: 'fc-misd',
    label: 'MISD',
    sub: 'Multiple Instruction · Single Data',
    desc: 'Múltiples instrucciones sobre un único flujo de datos. Principalmente teórico. Aplicación en tolerancia a fallas.',
    icon: '🔬',
    border: 'rgba(100,116,139,0.4)',
    bg: 'rgba(100,116,139,0.08)',
    color: '#94a3b8',
  },
  {
    id: 'fc-mimd',
    label: 'MIMD',
    sub: 'Multiple Instruction · Multiple Data',
    desc: 'Múltiples procesadores independientes. Arquitecturas multinúcleo, clusters y sistemas distribuidos.',
    icon: '🔗',
    border: 'rgba(52,211,153,0.5)',
    bg: 'rgba(52,211,153,0.1)',
    color: '#34d399',
  },
]

export default function FlynnSlide({ isActive }: Props) {
  const root = useRef<HTMLElement>(null)
  const scope = useRef<any>(null)
  const animated = useRef(false)

  useEffect(() => {
    let mounted = true

    import('animejs').then(({ animate, createScope, stagger }) => {
      if (!mounted || !root.current) return

      scope.current = createScope({ root }).add((self: any) => {
        // start hidden
        animate('.flynn-cell', {
          opacity: 0,
          scale: 0.8,
          duration: 0,
        })

        self.add('enter', () => {
          animate('.flynn-cell', {
            opacity: [0, 1],
            scale: [0.8, 1],
            delay: stagger(160),
            duration: 550,
            ease: 'out(3)',
          })
        })
      })
    })

    return () => {
      mounted = false
      scope.current?.revert()
    }
  }, [])

  useEffect(() => {
    if (!isActive) { animated.current = false; return }
    if (animated.current) return
    animated.current = true
    // small delay so Reveal transition finishes first
    setTimeout(() => scope.current?.methods?.enter(), 120)
  }, [isActive])

  return (
    <section
      ref={root}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
    >
      <div className="r-card">
        <span className="r-stripe">Parte 1 — Taxonomía de Flynn (1966)</span>
        <h2>Clasificación de Arquitecturas Paralelas</h2>
        <p style={{ color: 'var(--r-dim)', marginBottom: '1rem', fontSize: '0.6em' }}>
          Flynn propuso en 1966 clasificar los sistemas según el flujo de instrucciones y el flujo de datos. Sigue siendo el marco de referencia 60 años después.
        </p>

        <div className="r-grid-2">
          {cells.map((c) => (
            <div
              key={c.id}
              className="flynn-cell"
              style={{
                border: `2px solid ${c.border}`,
                background: c.bg,
                borderRadius: '0.8rem',
                padding: '1.1rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '1.3em', marginBottom: '0.3em' }}>{c.icon}</div>
              <div style={{ fontSize: '0.85em', fontWeight: 800, color: c.color, marginBottom: '0.2em' }}>{c.label}</div>
              <div style={{ fontSize: '0.48em', fontWeight: 600, color: 'var(--r-dim)', marginBottom: '0.5em' }}>{c.sub}</div>
              <p style={{ fontSize: '0.5em', color: 'var(--r-dim)', margin: 0, lineHeight: 1.5 }}>{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="r-callout r-callout-info" style={{ marginTop: '0.8rem' }}>
          <strong>Esta presentación:</strong> SISD como base → SIMD como el gran salto. MIMD cubre los multinúcleo modernos, pero SIMD maximiza el rendimiento <em>dentro de cada núcleo</em>.
        </div>
      </div>
    </section>
  )
}
