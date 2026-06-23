'use client'

import { useEffect, useRef } from 'react'

interface Props { isActive: boolean }

const INSTRS = [
  { ins: 'ADDPS',       ext: 'SSE',     bits: '128', ops: 4,  desc: 'Add 4×float32 in parallel',          color: '#34d399' },
  { ins: 'MULPS',       ext: 'SSE',     bits: '128', ops: 4,  desc: 'Multiply 4×float32 in parallel',     color: '#34d399' },
  { ins: 'VADDPS',      ext: 'AVX',     bits: '256', ops: 8,  desc: 'Add 8×float32 in parallel (VEX)',    color: '#fbbf24' },
  { ins: 'VFMADD231PS', ext: 'AVX2',    bits: '256', ops: 8,  desc: 'a ← a + (b × c) — fused multiply-add', color: '#fbbf24' },
  { ins: 'VPADDQ',      ext: 'AVX2',    bits: '256', ops: 4,  desc: 'Add 4×int64 in parallel',            color: '#f97316' },
  { ins: 'VADDPS',      ext: 'AVX-512', bits: '512', ops: 16, desc: 'Add 16×float32 in parallel',         color: '#a78bfa' },
]

export default function InstruccionesSlide({ isActive }: Props) {
  const root  = useRef<HTMLElement>(null)
  const scope = useRef<any>(null)
  const animated = useRef(false)

  useEffect(() => {
    let mounted = true

    import('animejs').then(({ animate, createScope, stagger }) => {
      if (!mounted || !root.current) return

      scope.current = createScope({ root }).add((self: any) => {
        animate('.ins-row', { opacity: 0, translateX: -10, duration: 0 })
        animate('.lane-dot', { opacity: 0, scale: 0, duration: 0 })

        self.add('enter', () => {
          animate('.ins-row', {
            opacity: [0, 1],
            translateX: [-10, 0],
            delay: stagger(90),
            duration: 380,
            ease: 'out(2)',
          })
          animate('.lane-dot', {
            opacity: [0, 1],
            scale: [0, 1],
            delay: stagger(30, { start: 200 }),
            duration: 250,
            ease: 'out(3)',
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
        <span className="r-stripe">Parte 3 — Set de Instrucciones</span>
        <h2>Instrucciones SIMD en x86</h2>

        <div style={{ marginBottom: '1rem' }}>
          {INSTRS.map((r, idx) => (
            <div
              key={idx}
              className="ins-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.45rem 0.6rem',
                marginBottom: '0.3rem',
                borderRadius: '0.4rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <code
                className="ins"
                style={{
                  minWidth: '115px',
                  fontSize: '0.48em',
                  color: r.color,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                }}
              >
                {r.ins}
              </code>
              <span className="r-badge badge-info" style={{ fontSize: '0.36em', minWidth: '48px', textAlign: 'center' }}>{r.ext}</span>
              <span style={{ fontSize: '0.4em', color: 'var(--r-dim)', minWidth: '36px' }}>{r.bits}b</span>
              <div style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
                {Array.from({ length: r.ops }).map((_, i) => (
                  <div
                    key={i}
                    className="lane-dot"
                    style={{
                      width: '8px', height: '8px',
                      borderRadius: '2px',
                      background: r.color,
                      opacity: 0.85,
                    }}
                  />
                ))}
              </div>
              <span style={{ fontSize: '0.4em', color: 'var(--r-dim)', flex: 1 }}>{r.desc}</span>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--r-code-bg)', borderRadius: '0.5rem', padding: '0.7rem', marginBottom: '0.7rem' }}>
          <div style={{ fontSize: '0.46em', fontFamily: 'monospace', lineHeight: 1.8 }}>
            <div>
              <span className="kw">; Escalar: 8 sumas con 8 instrucciones ADD</span>
            </div>
            <div>
              <span className="kw">; Vectorial AVX: 8 sumas con 1 instrucción</span>
            </div>
            <div>
              <span className="ins">VMOVUPS</span> <span className="reg">YMM0</span>, [src_a]
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cm">; load 8 floats</span>
            </div>
            <div>
              <span className="ins">VMOVUPS</span> <span className="reg">YMM1</span>, [src_b]
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cm">; load 8 floats</span>
            </div>
            <div>
              <span className="ins">VADDPS</span>&nbsp; <span className="reg">YMM2</span>, <span className="reg">YMM0</span>, <span className="reg">YMM1</span>
              &nbsp;&nbsp;<span className="cm">; 8 adds in 1 cycle</span>
            </div>
            <div>
              <span className="ins">VMOVUPS</span> [dst], <span className="reg">YMM2</span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cm">; store 8 results</span>
            </div>
          </div>
        </div>

        <div className="r-callout r-callout-purple">
          <strong style={{ fontSize: '0.65em' }}>Prefijo VEX (AVX+):</strong>
          <span style={{ fontSize: '0.6em', marginLeft: '0.4em', color: 'var(--r-dim)' }}>
            3 operandos — evita el destructivo <code>dst = dst OP src</code> de SSE. <code>VADDPS YMM2, YMM0, YMM1</code> preserva YMM0 y YMM1.
          </span>
        </div>
      </div>
    </section>
  )
}
