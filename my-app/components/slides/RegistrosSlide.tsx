'use client'

import { useEffect, useRef } from 'react'

interface Props { isActive: boolean }

const REGS = [
  { name: 'MM0–MM7',      label: 'MMX',     bits: 64,  pct: 12.5, color: ['#60a5fa', '#3b82f6'], elems: '8 int8 · 4 int16 · 2 int32' },
  { name: 'XMM0–XMM15',  label: 'SSE',     bits: 128, pct: 25,   color: ['#a78bfa', '#7c3aed'], elems: '4 float32 · 2 float64 · 16 int8' },
  { name: 'YMM0–YMM15',  label: 'AVX',     bits: 256, pct: 50,   color: ['#fbbf24', '#f59e0b'], elems: '8 float32 · 4 float64 · 32 int8' },
  { name: 'ZMM0–ZMM31',  label: 'AVX-512', bits: 512, pct: 100,  color: ['#34d399', '#10b981'], elems: '16 float32 · 8 float64 · 64 int8' },
]

export default function RegistrosSlide({ isActive }: Props) {
  const root     = useRef<HTMLElement>(null)
  const scope    = useRef<any>(null)
  const animated = useRef(false)

  useEffect(() => {
    let mounted = true

    import('animejs').then(({ animate, createScope, stagger }) => {
      if (!mounted || !root.current) return

      scope.current = createScope({ root }).add((self: any) => {
        animate('.reg-bar-fill', { width: '0%', duration: 0 })
        animate('.reg-row-wrap', { opacity: 0, translateY: 8, duration: 0 })

        self.add('enter', () => {
          animate('.reg-row-wrap', {
            opacity: [0, 1],
            translateY: [8, 0],
            delay: stagger(120),
            duration: 400,
            ease: 'out(2)',
          })
          root.current!.querySelectorAll<HTMLElement>('.reg-bar-fill').forEach((el, i) => {
            animate(el, {
              width: (el.dataset.pct ?? '0') + '%',
              delay: 100 + i * 180,
              duration: 900,
              ease: 'out(4)',
            })
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
    setTimeout(() => scope.current?.methods?.enter(), 150)
  }, [isActive])

  return (
    <section
      ref={root}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
    >
      <div className="r-card">
        <span className="r-stripe">Parte 3 — Registros Vectoriales</span>
        <h2>Anatomía de los Registros SIMD</h2>
        <p style={{ color: 'var(--r-dim)', marginBottom: '1.2rem', fontSize: '0.6em' }}>
          Cada generación duplicó el ancho. ZMM contiene YMM (bits 0–255) que contiene XMM (bits 0–127). Retrocompatibilidad completa.
        </p>

        <div style={{ marginBottom: '1.2rem' }}>
          {REGS.map((r) => (
            <div key={r.label} className="reg-row-wrap" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.6rem' }}>
              <div style={{ width: '80px', flexShrink: 0 }}>
                <div style={{ fontSize: '0.5em', fontWeight: 700, color: 'var(--r-dim)' }}>{r.name}</div>
                <span className="r-badge badge-info" style={{ fontSize: '0.4em' }}>{r.label}</span>
              </div>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: '4px', height: '28px', overflow: 'hidden', position: 'relative' }}>
                <div
                  className="reg-bar-fill"
                  data-pct={r.pct}
                  style={{
                    position: 'absolute', left: 0, top: 0, height: '100%',
                    width: '0%',
                    background: `linear-gradient(90deg, ${r.color[0]}, ${r.color[1]})`,
                    borderRadius: '4px',
                    display: 'flex', alignItems: 'center', paddingLeft: '0.5rem',
                    fontSize: '0.38em', fontWeight: 700, color: 'rgba(0,0,0,0.7)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {r.bits} bits
                </div>
              </div>
              <div style={{ width: '100px', flexShrink: 0 }}>
                <div style={{ fontSize: '0.38em', color: 'var(--r-dim)', lineHeight: 1.4 }}>{r.elems}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="r-grid-2" style={{ gap: '0.8rem' }}>
          <div className="r-callout r-callout-purple">
            <strong style={{ fontSize: '0.7em' }}>Empaquetado flexible</strong>
            <p style={{ fontSize: '0.6em', margin: '0.3em 0 0', color: 'var(--r-dim)' }}>
              El mismo registro XMM puede interpretarse como 16 bytes, 8 shorts, 4 ints, 4 floats, o 2 doubles según la instrucción.
            </p>
          </div>
          <div className="r-callout r-callout-info">
            <strong style={{ fontSize: '0.7em' }}>AVX-512: 32 registros ZMM + máscaras K0–K7</strong>
            <p style={{ fontSize: '0.6em', margin: '0.3em 0 0', color: 'var(--r-dim)' }}>
              Las máscaras permiten predicación por elemento, eliminando branches condicionales en loops vectoriales.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
