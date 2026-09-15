'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useTransform, type SpringOptions } from 'framer-motion'
import { cn } from '@/lib/utils'

type SpotlightProps = { className?: string; size?: number; springOptions?: SpringOptions; disabled?: boolean }

export function Spotlight({ className, size = 240, springOptions = { bounce: 0 }, disabled = false }: SpotlightProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const x = useSpring(0, springOptions)
  const y = useSpring(0, springOptions)
  const left = useTransform(x, value => `${value - size / 2}px`)
  const top = useTransform(y, value => `${value - size / 2}px`)

  useEffect(() => {
    const parent = ref.current?.parentElement
    if (!parent || disabled || !matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return
    const move = (event: PointerEvent) => {
      const rect = parent.getBoundingClientRect()
      x.set(event.clientX - rect.left)
      y.set(event.clientY - rect.top)
    }
    const enter = () => setHovered(true)
    const leave = () => setHovered(false)
    parent.addEventListener('pointermove', move)
    parent.addEventListener('pointerenter', enter)
    parent.addEventListener('pointerleave', leave)
    return () => {
      parent.removeEventListener('pointermove', move)
      parent.removeEventListener('pointerenter', enter)
      parent.removeEventListener('pointerleave', leave)
    }
  }, [disabled, x, y])

  return <motion.div ref={ref} aria-hidden="true" className={cn('embedded-spotlight', className)} style={{ width: size, height: size, left, top, opacity: hovered && !disabled ? .22 : 0 }} />
}
