"use client"

import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion"
import React, { useEffect, useRef, useState } from "react"

export interface TimelineEntry {
  title: string
  content: React.ReactNode
}

interface TimelineProps {
  data: TimelineEntry[]
  heading: string
  description?: string
  className?: string
}

export function Timeline({ data, heading, description, className = "" }: TimelineProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    const content = contentRef.current
    if (!content) return

    const measure = () => setHeight(content.getBoundingClientRect().height)
    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(content)
    return () => observer.disconnect()
  }, [data])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  })
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.08], [0, 1])

  return (
    <div
      ref={containerRef}
      className={`portfolio-timeline ${className}`.trim()}
      data-timeline
    >
      <header className="timeline-heading">
        <h2 id="timeline-title">{heading}</h2>
        {description && <p>{description}</p>}
      </header>

      <div ref={contentRef} className="timeline-list">
        {data.map((item, index) => (
          <div className="timeline-entry" data-timeline-entry key={`${item.title}-${index}`}>
            <div className="timeline-marker-column">
              <div className="timeline-marker" aria-hidden="true"><span /></div>
              <h3>{item.title}</h3>
            </div>
            <div className="timeline-entry-content">{item.content}</div>
          </div>
        ))}

        <div
          className="timeline-line"
          style={{ height: `${height}px` }}
          aria-hidden="true"
        >
          <motion.div
            className="timeline-progress"
            data-timeline-progress
            style={{ height: heightTransform, opacity: opacityTransform }}
          />
        </div>
      </div>
    </div>
  )
}

