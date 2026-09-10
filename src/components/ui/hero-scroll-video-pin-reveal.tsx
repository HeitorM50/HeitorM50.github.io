/* eslint-disable @next/next/no-img-element */
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export interface TagItem {
  id?: string
  text: string
  background: string
  color?: string
}

export interface HeroScrollVideoRevealProps {
  topText?: ReactNode
  headingText?: ReactNode
  tags?: TagItem[]
  subText?: string
  videoSrc?: string
  videoPoster?: string
  bottomText?: ReactNode
  className?: string
}

const defaultTags: TagItem[] = [
  { text: 'Backend', background: '#171a23' },
  { text: 'Data', background: '#5146a8' },
  { text: 'Embedded', background: '#d7ccff', color: '#171321' },
  { text: 'Leadership', background: '#244b5a' },
]

/**
 * React shell for the pinned reveal. GSAP runs through the portfolio's small
 * progressive runtime so the static export keeps its zero-hydration baseline.
 */
export function HeroScrollVideoReveal({
  topText = <>Software becomes meaningful when it reaches real people.</>,
  headingText = <>I build across software, data and hardware.</>,
  tags = defaultTags,
  subText,
  videoSrc = '/media/scroll-reveal.mp4',
  videoPoster = '/media/hindsight.webp',
  bottomText = <>From prototype to delivery.</>,
  className,
}: HeroScrollVideoRevealProps) {
  return (
    <section className={cn('scroll-reveal', className)} data-scroll-video-reveal>
      <div className="scroll-reveal__intro">
        <p>{topText}</p>
      </div>

      <div className="scroll-reveal__benefit" data-scroll-benefit>
        <p className="scroll-reveal__heading" data-scroll-heading>{headingText}</p>
        <div className="scroll-reveal__tags">
          {tags.map((tag, index) => (
            <span
              key={tag.id ?? `${tag.text}-${index}`}
              data-scroll-tag
              style={{ backgroundColor: tag.background, color: tag.color ?? '#fff' }}
            >
              {tag.text}
            </span>
          ))}
        </div>
        {subText && <p className="scroll-reveal__subtext">{subText}</p>}
      </div>

      <div className="scroll-reveal__track" data-scroll-video-track>
        <div className="scroll-reveal__pin">
          <div className="scroll-reveal__video" data-scroll-video-box>
            <video muted loop playsInline preload="none" data-poster={videoPoster} aria-hidden="true">
              <source data-src={videoSrc} type="video/mp4" />
            </video>
            <div className="scroll-reveal__shade" />
            <div className="scroll-reveal__mark" data-scroll-video-mark>
              <img src="/media/logo.webp" alt="" />
              <span>HEITOR RICARDO</span>
              <small>SOFTWARE · DATA · EMBEDDED</small>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-reveal__outro">
        <p>{bottomText}</p>
      </div>
    </section>
  )
}

export default HeroScrollVideoReveal
