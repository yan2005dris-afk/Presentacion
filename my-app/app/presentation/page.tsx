'use client'

import { useEffect, useRef, useState } from 'react'
import 'reveal.js/reveal.css'
import './theme.css'

import TitleSlide        from '@/components/slides/TitleSlide'
import AgendaSlide       from '@/components/slides/AgendaSlide'
import ParalelismoSlide  from '@/components/slides/ParalelismoSlide'
import FlynnSlide        from '@/components/slides/FlynnSlide'
import PipelineSlide     from '@/components/slides/PipelineSlide'
import SIMDConceptSlide  from '@/components/slides/SIMDConceptSlide'
import EvolucionSlide    from '@/components/slides/EvolucionSlide'
import RegistrosSlide    from '@/components/slides/RegistrosSlide'
import InstruccionesSlide from '@/components/slides/InstruccionesSlide'
import AmdahlSlide       from '@/components/slides/AmdahlSlide'
import AplicacionesSlide from '@/components/slides/AplicacionesSlide'
import ConclusionesSlide from '@/components/slides/ConclusionesSlide'

const SLIDES = [
  TitleSlide,
  AgendaSlide,
  ParalelismoSlide,
  FlynnSlide,
  PipelineSlide,
  SIMDConceptSlide,
  EvolucionSlide,
  RegistrosSlide,
  InstruccionesSlide,
  AmdahlSlide,
  AplicacionesSlide,
  ConclusionesSlide,
]

export default function PresentationPage() {
  const deckRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    let deck: any

    import('reveal.js').then(({ default: Reveal }) => {
      if (!deckRef.current) return

      deck = new Reveal(deckRef.current, {
        hash: true,
        controls: true,
        progress: true,
        slideNumber: 'c/t',
        transition: 'slide',
        transitionSpeed: 'fast',
        backgroundTransition: 'fade',
        center: true,
        width: 1280,
        height: 720,
        margin: 0.04,
      })

      deck.initialize().then(() => {
        setCurrentSlide(deck.getIndices().h)
        deck.on('slidechanged', (e: any) => {
          setCurrentSlide(e.indexh)
        })
      })
    })

    return () => {
      try { deck?.destroy() } catch (_) {}
    }
  }, [])

  return (
    <div className="reveal" ref={deckRef}>
      <div className="slides">
        {SLIDES.map((Slide, i) => (
          <Slide key={i} isActive={currentSlide === i} />
        ))}
      </div>
    </div>
  )
}
