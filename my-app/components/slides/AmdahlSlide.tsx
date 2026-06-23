'use client'

import { useEffect, useRef } from 'react'

interface Props { isActive: boolean }

// Amdahl's Law: S(N) = 1 / ((1-P) + P/N)
// P = parallel fraction, N = processors/lanes
const P = 0.9  // 90% parallelizable
const LANES = [1, 2, 4, 8, 16, 32]
const speedup = (n: number) => 1 / ((1 - P) + P / n)
const MAX_S = speedup(LANES[LANES.length - 1])

const BARS = LANES.map((n) => {
  const s = speedup(n)
  return { n, s: +s.toFixed(2), pct: +(s / MAX_S * 100).toFixed(1) }
})

const COLOR = (n: number) => {
  if (n === 1)  return '#60a5fa'
  if (n <= 4)   return '#34d399'
  if (n <= 8)   return '#fbbf24'
  if (n <= 16)  return '#f97316'
  return '#a78bfa'
}

export default function AmdahlSlide({ isActive }: Props) {
  const root     = useRef<HTMLElement>(null)
  const scope    = useRef<any>(null)
  const animated = useRef(false)

  useEffect(() => {
    let mounted = true

    import('animejs').then(({ animate, createScope, stagger }) => {
      if (!mounted || !root.current) return

      scope.current = createScope({ root }).add((self: any) => {
        animate('.amdahl-bar', { width: '0%', duration: 0 })
        animate('.amdahl-row', { opacity: 0, duration: 0 })

        self.add('enter', () => {
          animate('.amdahl-row', {
            opacity: [0, 1],
            delay: stagger(80),
            duration: 300,
            ease: 'out(2)',
          })
          root.current!.querySelectorAll<HTMLElement>('.amdahl-bar').forEach((el, i) => {
            animate(el, {
              width: (el.dataset.pct ?? '0') + '%',
              delay: 80 + i * 100,
              duration: 1000,
              ease: 'out(4)',
            })
          })
        })
      })
    })

    return () => { mounted = false; scope.current?.revert() }
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
        <span className="r-stripe">Parte 4 — Límites del Paralelismo</span>
        <h2>Ley de Amdahl: Límite del Speedup</h2>

        <div className="r-formula" style={{ marginBottom: '0.8rem', fontSize: '0.62em' }}>
          S(N) = 1 / ( (1 − P) + P/N ) &nbsp;·&nbsp; P = 90% (fracción paralelizable)
        </div>

        <div style={{ marginBottom: '0.8rem' }}>
          {BARS.map((b) => (
            <div
              key={b.n}
              className="amdahl-row"
              style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '0.42rem' }}
            >
              <div style={{ width: '48px', textAlign: 'right', fontSize: '0.48em', fontWeight: 700, color: COLOR(b.n) }}>
                N={b.n}
              </div>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.04)', borderRadius: '4px', height: '22px', overflow: 'hidden', position: 'relative' }}>
                <div
                  className="amdahl-bar"
                  data-pct={b.pct}
                  style={{
                    position: 'absolute', left: 0, top: 0, height: '100%',
                    width: '0%',
                    background: `linear-gradient(90deg, ${COLOR(b.n)}88, ${COLOR(b.n)})`,
                    borderRadius: '4px',
                  }}
                />
              </div>
              <div style={{ width: '54px', fontSize: '0.48em', fontWeight: 800, color: COLOR(b.n) }}>
                {b.s}×
              </div>
            </div>
          ))}
        </div>

        <div className="r-grid-2" style={{ gap: '0.8rem' }}>
          <div className="r-callout r-callout-warn">
            <strong style={{ fontSize: '0.65em' }}>El techo teórico</strong>
            <p style={{ fontSize: '0.55em', margin: '0.3em 0 0', color: 'var(--r-dim)' }}>
              Con P=90%, N=∞ da solo <strong>10×</strong>. El 10% serial domina a escala infinita. Esa es la trampa del paralelismo.
            </p>
          </div>
          <div className="r-callout r-callout-purple">
            <strong style={{ fontSize: '0.65em' }}>SIMD: sweet spot en N=8–16</strong>
            <p style={{ fontSize: '0.55em', margin: '0.3em 0 0', color: 'var(--r-dim)' }}>
              AVX (8 lanes) da ~4.7× y AVX-512 (16 lanes) ~6.4×. Retorno decreciente pasado N=16 — por eso el hardware no fue más allá de 512 bits.
            </p>
          </div>
        </div>

        <div className="r-stat" style={{ marginTop: '0.6rem' }}>
          <div className="r-stat-num">10×</div>
          <div className="r-stat-lbl">límite teórico absoluto con P=90% · independiente del número de lanes</div>
        </div>
      </div>
    </section>
  )
}
