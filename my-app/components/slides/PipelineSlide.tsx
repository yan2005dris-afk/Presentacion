'use client'

import { Fragment, useEffect, useRef } from 'react'

interface Props { isActive: boolean }

const STAGES = ['FETCH', 'DECODE', 'OPERANDS', 'EXECUTE', 'WRITE BACK']

export default function PipelineSlide({ isActive }: Props) {
  const root      = useRef<HTMLElement>(null)
  const scope     = useRef<any>(null)
  const tlRef     = useRef<any>(null)

  useEffect(() => {
    let mounted = true

    import('animejs').then(({ animate, createScope, createTimeline }) => {
      if (!mounted || !root.current) return

      scope.current = createScope({ root }).add((self: any) => {
        // Reset all stages to dim
        animate('.pipe-stage', {
          backgroundColor: 'rgba(124,58,237,0.05)',
          borderColor: 'rgba(45,45,74,1)',
          color: 'rgba(148,163,184,1)',
          duration: 0,
        })

        self.add('startLoop', () => {
          const tl = createTimeline({ loop: true, loopDelay: 600 })

          STAGES.forEach((_, i) => {
            const sel = `.pipe-stage:nth-child(${i + 1})`
            // Activate
            tl.add(sel, {
              backgroundColor: 'rgba(124,58,237,0.32)',
              borderColor: 'rgba(124,58,237,1)',
              color: '#fff',
              duration: 280,
              ease: 'out(2)',
            }, i * 520)
            // Deactivate
            tl.add(sel, {
              backgroundColor: 'rgba(124,58,237,0.05)',
              borderColor: 'rgba(45,45,74,1)',
              color: 'rgba(148,163,184,1)',
              duration: 280,
              ease: 'in(2)',
            }, i * 520 + 460)
          })

          tlRef.current = tl
        })

        self.add('stopLoop', () => {
          tlRef.current?.pause()
        })
      })
    })

    return () => {
      mounted = false
      scope.current?.revert()
    }
  }, [])

  useEffect(() => {
    if (isActive) {
      setTimeout(() => scope.current?.methods?.startLoop(), 200)
    } else {
      scope.current?.methods?.stopLoop()
    }
  }, [isActive])

  return (
    <section
      ref={root}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
    >
      <div className="r-card">
        <span className="r-stripe">Parte 1 — Arquitectura SISD</span>
        <h2>El Pipeline: Solapando Etapas de Instrucción</h2>

        {/* Animated pipeline row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', margin: '1.2rem 0' }}>
          {STAGES.map((s, i) => (
            <Fragment key={s}>
              <div
                className="pipe-stage"
                style={{
                  flex: 1,
                  padding: '0.7rem 0.3rem',
                  borderRadius: '0.5rem',
                  textAlign: 'center',
                  border: '2px solid var(--r-border)',
                  fontSize: '0.48em',
                  fontWeight: 700,
                  letterSpacing: '0.3px',
                  backgroundColor: 'rgba(124,58,237,0.05)',
                  color: 'var(--r-dim)',
                  transition: 'box-shadow 0.3s',
                }}
              >
                {i + 1}. {s}
              </div>
              {i < STAGES.length - 1 && (
                <span style={{ color: 'var(--r-accent2)', fontSize: '0.7em', flexShrink: 0 }}>→</span>
              )}
            </Fragment>
          ))}
        </div>

        <div className="r-grid-2" style={{ marginTop: '0.5rem' }}>
          <div>
            <h3 style={{ marginTop: 0 }}>Sin Pipeline</h3>
            <div style={{ background: 'var(--r-code-bg)', borderRadius: '0.5rem', padding: '0.7rem', fontSize: '0.52em', fontFamily: 'monospace' }}>
              <div style={{ marginBottom: '0.3rem' }}><span style={{ color: '#60a5fa' }}>Instr 1:</span> <span style={{ color: '#34d399' }}>▓▓▓▓▓</span></div>
              <div style={{ marginBottom: '0.3rem' }}><span style={{ color: '#60a5fa' }}>Instr 2:</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#34d399' }}>▓▓▓▓▓</span></div>
              <div><span style={{ color: '#60a5fa' }}>Instr 3:</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{ color: '#34d399' }}>▓▓▓▓▓</span></div>
              <div style={{ marginTop: '0.4rem', color: 'var(--r-dim)' }}>→ 15 ciclos para 3 instrucciones</div>
            </div>
          </div>
          <div>
            <h3 style={{ marginTop: 0 }}>Con Pipeline (solapado)</h3>
            <div style={{ background: 'var(--r-code-bg)', borderRadius: '0.5rem', padding: '0.7rem', fontSize: '0.52em', fontFamily: 'monospace' }}>
              <div style={{ marginBottom: '0.3rem' }}>
                <span style={{ color: '#a78bfa' }}>Instr 1:</span>{' '}
                <span style={{ color: '#fbbf24' }}>F</span><span style={{ color: '#f97316' }}>D</span><span style={{ color: '#ef4444' }}>O</span><span style={{ color: '#a78bfa' }}>E</span><span style={{ color: '#34d399' }}>W</span>
              </div>
              <div style={{ marginBottom: '0.3rem' }}>
                <span style={{ color: '#a78bfa' }}>Instr 2:</span> &nbsp;
                <span style={{ color: '#fbbf24' }}>F</span><span style={{ color: '#f97316' }}>D</span><span style={{ color: '#ef4444' }}>O</span><span style={{ color: '#a78bfa' }}>E</span><span style={{ color: '#34d399' }}>W</span>
              </div>
              <div>
                <span style={{ color: '#a78bfa' }}>Instr 3:</span> &nbsp;&nbsp;
                <span style={{ color: '#fbbf24' }}>F</span><span style={{ color: '#f97316' }}>D</span><span style={{ color: '#ef4444' }}>O</span><span style={{ color: '#a78bfa' }}>E</span><span style={{ color: '#34d399' }}>W</span>
              </div>
              <div style={{ marginTop: '0.4rem', color: 'var(--r-dim)' }}>→ 7 ciclos para 3 instrucciones</div>
            </div>
          </div>
        </div>

        <div className="r-callout r-callout-warn" style={{ marginTop: '0.8rem' }}>
          <strong>Hazards:</strong> dependencias de datos (RAW), saltos condicionales y latencias de memoria rompen el flujo ideal y reducen el CPI efectivo.
        </div>
      </div>
    </section>
  )
}
