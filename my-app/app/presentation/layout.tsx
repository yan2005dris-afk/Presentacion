'use client'

import { useEffect } from 'react'

export default function PresentationLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prev = {
      margin: document.body.style.margin,
      padding: document.body.style.padding,
      overflow: document.body.style.overflow,
      background: document.body.style.background,
    }
    Object.assign(document.body.style, { margin: '0', padding: '0', overflow: 'hidden', background: '#0f0f1a' })
    return () => { Object.assign(document.body.style, prev) }
  }, [])

  return <>{children}</>
}
