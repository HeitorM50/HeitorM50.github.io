'use client'

/* eslint-disable @next/next/no-img-element */
import { useEffect, useId, useRef, type ComponentProps, type CSSProperties, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { prepareSqueezeCarousel } from '@/lib/squeeze-carousel'

export type SqueezeSlide = {
  id?: string | number
  title: string
  description?: string
  image?: string
  imageAlt?: string
  imageWidth?: number
  imageHeight?: number
  background?: string
  overlay?: ReactNode
  content?: ReactNode
  action?: string
  href?: string
  target?: string
  onAction?: () => void
}

type Size = number | string
const size = (value: Size) => typeof value === 'number' ? `${value}px` : value

export type SqueezeCarouselProps = {
  slides: SqueezeSlide[]
  defaultIndex?: number
  onIndexChange?: (index: number) => void
  height?: Size
  slatWidth?: number
  slatGap?: number
  gap?: number
  radius?: Size
  duration?: number
  hoverGrow?: boolean
  autoplay?: boolean
  interval?: number
  controls?: boolean
  accent?: string
  accentForeground?: string
  label?: string
  previousLabel?: string
  nextLabel?: string
  panelClassName?: string
} & Omit<ComponentProps<'div'>, 'onSelect'>

/** Squeeze panels adapted for the portfolio's React-free static export.
 * The same controller enhances the server HTML in production and React in dev.
 * Without JavaScript every project and its links remain readable.
 */
export function SqueezeCarousel({
  slides, defaultIndex = 0, onIndexChange,
  height = 'clamp(190px, 32cqi, 340px)', slatWidth = 8, slatGap = 8, gap = 16,
  radius = 12, duration = 700, hoverGrow = true, autoplay = false, interval = 6000,
  controls = true, accent = 'var(--accent)', accentForeground = 'var(--accent-ink)',
  label = 'Featured', previousLabel = 'Previous project', nextLabel = 'Next project',
  panelClassName, className, style, ...props
}: SqueezeCarouselProps) {
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()
  const initial = slides.length ? ((defaultIndex % slides.length) + slides.length) % slides.length : 0
  useEffect(() => {
    if (!ref.current) return
    return prepareSqueezeCarousel(ref.current, onIndexChange)
  }, [slides, defaultIndex, onIndexChange, duration, hoverGrow, autoplay, interval, slatWidth, slatGap, gap])
  if (!slides.length) return null
  return <div {...props} ref={ref} className={cn('squeeze-carousel', className)}
    role="region" aria-roledescription="carousel" aria-label={label}
    data-squeeze-carousel data-sq-index={initial} data-sq-duration={duration}
    data-sq-hover={hoverGrow} data-sq-autoplay={autoplay} data-sq-interval={interval}
    data-sq-gap={gap} data-sq-slat={slatWidth} data-sq-slat-gap={slatGap}
    style={{ '--sq-height': size(height), '--sq-radius': size(radius), '--sq-duration': `${duration}ms`, '--sq-fill': accent, '--sq-on-fill': accentForeground, ...style } as CSSProperties}>
    <div className="sq-toolbar">
      <p className="sq-counter" data-sq-counter aria-live="polite" aria-atomic="true">{String(initial + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}</p>
      {controls && slides.length > 1 && <div className="sq-arrows">
        <button type="button" data-sq-prev aria-label={previousLabel} aria-controls={`${id}-panels`}><ArrowLeft size={20} aria-hidden="true" /></button>
        <button type="button" data-sq-next aria-label={nextLabel} aria-controls={`${id}-panels`}><ArrowRight size={20} aria-hidden="true" /></button>
      </div>}
    </div>
    <div className="sq-viewport" id={`${id}-panels`}>
      <div className="sq-strip" role="tablist" aria-label={label} aria-orientation="horizontal">
        {slides.map((slide, i) => <button key={slide.id ?? i} type="button" role="tab"
          id={`${id}-tab-${i}`} aria-selected={i === initial} aria-controls={`${id}-panel-${i}`}
          aria-label={slide.title} tabIndex={i === initial ? 0 : -1} data-sq-tab={i}
          className={cn('sq-card', panelClassName)} style={{ background: slide.background }}>
          {slide.image && <img src={slide.image} alt={slide.imageAlt ?? ''} width={slide.imageWidth ?? 1400} height={slide.imageHeight ?? 875} loading="lazy" decoding="async" draggable={false} />}
          <span className="sq-overlay" aria-hidden="true">{slide.overlay ?? slide.title}</span>
        </button>)}
      </div>
    </div>
    <div className="sq-copy">
      {slides.map((slide, i) => <article key={slide.id ?? i} id={`${id}-panel-${i}`} role="tabpanel"
        aria-labelledby={`${id}-tab-${i}`} data-sq-panel={i} data-project-slug={slide.id}>
        <h3>{slide.title}</h3>
        {slide.description && <p className="sq-description">{slide.description}</p>}
        {slide.content}
        {slide.action && (slide.href && !slide.onAction
          ? <a className="sq-action" href={slide.href} target={slide.target} rel={slide.target === '_blank' ? 'noreferrer' : undefined}>{slide.action}<ArrowRight size={16} aria-hidden="true" /></a>
          : <button type="button" className="sq-action" onClick={slide.onAction}>{slide.action}<ArrowRight size={16} aria-hidden="true" /></button>)}
      </article>)}
    </div>
  </div>
}

export default SqueezeCarousel
