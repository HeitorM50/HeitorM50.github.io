'use client'

import { useEffect, useRef } from 'react'
import { ChevronDown, Cpu } from 'lucide-react'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import { prepareEmbeddedLab } from '@/lib/embedded-lab'
import type { Locale } from '@/data/portfolio'

export function EmbeddedLabTrigger({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLButtonElement>(null)
  const pt = locale === 'pt'
  useEffect(() => {
    const section = ref.current?.closest<HTMLElement>('.embedded-section')
    if (section) return prepareEmbeddedLab(section)
  }, [])
  return <LiquidButton ref={ref} type="button" size="lg" className="lab-trigger" hidden data-lab-trigger
    aria-expanded="false" aria-controls="embedded-projects"
    data-open-label={pt ? 'Explorar Lab' : 'Explore Lab'} data-close-label={pt ? 'Recolher Lab' : 'Close Lab'}>
    <Cpu aria-hidden="true" /><span data-lab-label>{pt ? 'Explorar Lab' : 'Explore Lab'}</span><ChevronDown className="lab-chevron" aria-hidden="true" />
  </LiquidButton>
}
