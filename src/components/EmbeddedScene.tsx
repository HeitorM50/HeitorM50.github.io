'use client'

import { useEffect, useRef } from 'react'
import { Cpu } from 'lucide-react'
import type { Locale } from '@/data/portfolio'

export function EmbeddedScene({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let active = true
    let cleanup: (() => void) | undefined
    // Use the same standalone bundle in development and the static export.
    const moduleUrl = '/vendor/embedded/loader.js'
    import(/* webpackIgnore: true */ moduleUrl).then(module => {
      if (active && ref.current) cleanup = module.prepareEmbeddedScene(ref.current)
    }).catch(() => {
      const button = ref.current?.querySelector<HTMLButtonElement>('[data-scene-toggle]')
      if (button) button.hidden = true
    })
    return () => { active = false; cleanup?.() }
  }, [])
  return <div ref={ref} className="embedded-visual" data-embedded-scene data-locale={locale} data-scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" data-scene-state="idle">
    <span className="embedded-scene-caption">{locale === 'pt' ? 'CENA ILUSTRATIVA' : 'ILLUSTRATIVE SCENE'}</span>
    <div className="embedded-circuit" aria-hidden="true"><div className="circuit-ring"><Cpu strokeWidth={.8} /></div><span>CAN · ECU · ESP32</span></div>
    <div className="embedded-scene-mount" data-scene-mount aria-hidden="true" />
    <div className="embedded-scene-controls">
      <span data-scene-status role="status">{locale === 'pt' ? 'Ilustração interativa · 3D' : 'Interactive illustration · 3D'}</span>
      <button type="button" className="scene-button" data-scene-toggle>{locale === 'pt' ? 'Ativar 3D' : 'Enable 3D'}</button>
    </div>
    <noscript>{locale === 'pt' ? 'Ative JavaScript para explorar a ilustração 3D.' : 'Enable JavaScript to explore the 3D illustration.'}</noscript>
  </div>
}
