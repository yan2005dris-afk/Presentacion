'use client'

import { useEffect, useRef } from 'react'

interface Props { isActive: boolean }

const VALS_A = [1.5, 2.3, 0.7, 4.1, 3.8, 0.2, 1.1, 2.9]
const VALS_B = [0.5, 1.7, 3.3, 0.9, 1.2, 4.8, 2.9, 1.1]

export default function SIMDConceptSlide({ isActive }: Props) {
  const root  = useRef<HTMLElement>(null)
  const scope = useRef<any>(null)
  const tlRef = useRef<any>(null)

  useEffect(() => {
    let mounted = true

    import('animejs').then(({ animate, createScope, createTimeline, stagger }) => {
      if (!mounted || !root.current) return

      scope.current = createScope({ root }).add((self: any) => {
        // Init hidden
        animate('.sisd-op', { opacity: 0, translateX: -12, duration: 0 })
        animate('.simd-lane', { opacity: 0, scale: 0.85, duration: 0 })
        animate('.result-box', { opacity: 0, duration: 0 })

        self.add('startSISD', () => {
          // Sequential: one by one with delay
          animate('.sisd-op', {
            opacity: [0, 1],
            translateX: [-12, 0],
            delay: stagger(300),
            duration: 350,
            ease: 'out(2)',
          })
        })

        self.add('startSIMD', () => {
          // All lanes burst at once
          animate('.simd-lane', {
            opacity: [0, 1],
            scale: [0.85, 1],
            delay: stagger(40),       // tiny stagger — feels simultaneous
            duration: 300,
            ease: 'out(3)',
          })
          // then pulse loop
          const tl = createTimeline({ loop: true, loopDelay: 1200 })
          tl.add('.simd-lane', {
            scale: [1, 1.06, 1],
            delay: stagger(60),
            duration: 400,
            ease: 'inOut(2)',
          }, 400)
          tlRef.current = tl
        })

        self.add('showResults', () => {
          animate('.result-box', {
            opacity: [0, 1],
            scale: [0.9, 1],
            delay: stagger(80),
            duration: 350,
            ease: 'out(3)',
          })
        })
      })
    })

    return () => {
      mounted = false
      tlRef.current?.pause()
      scope.current?.revert()
    }
  }, [])

  useEffect(() => {
    if (!isActive) {
      tlRef.current?.pause()
      return
    }
    const m = scope.current?.methods
    if (!m) return
    setTimeout(() => m.startSISD(), 200)
    setTimeout(() => m.startSIMD(), 300)
    setTimeout(() => m.showResults(), 800)
  }, [isActive])

  const laneColor = '#a78bfa'
  const laneStyle = (i: number): React.CSSProperties => ({
    flex: 1,
    padding: '0.5rem 0.2rem',
    borderRadius: '0.4rem',
    textAlign: 'center',
    border: '1px solid rgba(167,139,250,0.3)',
    background: 'rgba(167,139,250,0.07)',
    fontSize: '0.42em',
    fontWeight: 700,
    color: laneColor,
    fontFamily: 'monospace',
  })

  return (
    <section
      ref={root}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
    >
      <div className="r-card">
        <span className="r-stripe">Parte 2 — SIMD</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <span className="r-badge badge-simd">SIMD</span>
          <h2 style={{ margin: 0 }}>Single Instruction, Multiple Data</h2>
        </div>

        <div className="r-grid-2" style={{ gap: '1.5rem' }}>
          {/* SISD column */}
          <div>
            <h3 style={{ marginTop: 0, color: '#60a5fa' }}>SISD — Secuencial</h3>
            <div style={{ background: 'var(--r-code-bg)', borderRadius: '0.5rem', padding: '0.8rem', marginBottom: '0.5rem' }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="sisd-op" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.3rem' }}>
                  <div style={{ padding: '0.35rem 0.5rem', borderRadius: '4px', background: 'rgba(96,165,250,0.12)', border: '1px solid rgba(96,165,250,0.35)', fontSize: '0.45em', fontWeight: 700, color: '#60a5fa', fontFamily: 'monospace', minWidth: '40px', textAlign: 'center' }}>A{i}</div>
                  <span style={{ color: 'var(--r-accent2)', fontSize: '0.5em' }}>+</span>
                  <div style={{ padding: '0.35rem 0.5rem', borderRadius: '4px', background: 'rgba(96,165,250,0.12)', border: '1px solid rgba(96,165,250,0.35)', fontSize: '0.45em', fontWeight: 700, color: '#60a5fa', fontFamily: 'monospace', minWidth: '40px', textAlign: 'center' }}>B{i}</div>
                  <span style={{ color: 'var(--r-accent2)', fontSize: '0.5em' }}>=</span>
                  <div className="result-box" style={{ padding: '0.35rem 0.5rem', borderRadius: '4px', background: 'rgba(52,211,153,0.12)', border: '1px solid rgba(52,211,153,0.35)', fontSize: '0.45em', fontWeight: 700, color: '#34d399', fontFamily: 'monospace', minWidth: '40px', textAlign: 'center' }}>C{i}</div>
                </div>
              ))}
              <div style={{ marginTop: '0.4rem', fontSize: '0.45em', color: 'var(--r-dim)' }}>4 iteraciones → 4 instrucciones ADD</div>
            </div>
          </div>

          {/* SIMD column */}
          <div>
            <h3 style={{ marginTop: 0, color: '#a78bfa' }}>SIMD — Vectorial (AVX 256 bits)</h3>
            <div style={{ background: 'var(--r-code-bg)', borderRadius: '0.5rem', padding: '0.8rem', marginBottom: '0.5rem' }}>
              {/* Row A */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '0.4rem' }}>
                {VALS_A.slice(0, 8).map((v, i) => (
                  <div key={i} className="simd-lane" style={laneStyle(i)}>A{i}<br/>{v}</div>
                ))}
              </div>
              <div style={{ textAlign: 'center', color: 'var(--r-accent2)', fontSize: '0.65em', margin: '0.2rem 0' }}>+</div>
              {/* Row B */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '0.4rem' }}>
                {VALS_B.slice(0, 8).map((v, i) => (
                  <div key={i} className="simd-lane" style={laneStyle(i)}>B{i}<br/>{v}</div>
                ))}
              </div>
              <div style={{ textAlign: 'center', color: 'var(--r-accent2)', fontSize: '0.65em', margin: '0.2rem 0' }}>=</div>
              {/* Row C */}
              <div style={{ display: 'flex', gap: '3px' }}>
                {VALS_A.slice(0, 8).map((v, i) => (
                  <div key={i} className="simd-lane" style={{ ...laneStyle(i), border: '1px solid rgba(52,211,153,0.5)', background: 'rgba(52,211,153,0.08)', color: '#34d399' }}>
                    C{i}<br/>{(v + VALS_B[i]).toFixed(1)}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '0.5rem', fontSize: '0.45em', color: 'var(--r-dim)', textAlign: 'center' }}>
                <strong style={{ color: '#a78bfa' }}>1 instrucción VADDPS</strong> → 8 resultados en paralelo
              </div>
            </div>
          </div>
        </div>

        <div className="r-stat" style={{ marginTop: '0.6rem' }}>
          <div className="r-stat-num">8×</div>
          <div className="r-stat-lbl">throughput teórico con AVX (256 bits / float32) · hasta 16× con AVX-512</div>
        </div>
      </div>
    </section>
  )
}
