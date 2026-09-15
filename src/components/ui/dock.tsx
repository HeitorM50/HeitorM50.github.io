'use client'

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
  type SpringOptions,
} from 'framer-motion'
import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type React from 'react'
import { cn } from '@/lib/utils'

const DOCK_HEIGHT = 112
const DEFAULT_MAGNIFICATION = 68
const DEFAULT_DISTANCE = 130
const DEFAULT_PANEL_HEIGHT = 56
const DEFAULT_ITEM_SIZE = 40

type DockProps = {
  children: React.ReactNode
  className?: string
  distance?: number
  panelHeight?: number
  magnification?: number
  itemSize?: number
  spring?: SpringOptions
  label?: string
}

type DockItemProps = {
  className?: string
  children: React.ReactNode
}

type DockLabelProps = {
  className?: string
  children: React.ReactNode
  isHovered?: MotionValue<number>
}

type DockIconProps = {
  className?: string
  children: React.ReactNode
  width?: MotionValue<number>
}

type DockContextType = {
  mouseX: MotionValue<number>
  spring: SpringOptions
  magnification: number
  distance: number
  itemSize: number
}

const DockContext = createContext<DockContextType | undefined>(undefined)

function useDock() {
  const context = useContext(DockContext)
  if (!context) throw new Error('useDock must be used within a Dock provider')
  return context
}

function Dock({
  children,
  className,
  spring = { mass: 0.1, stiffness: 170, damping: 14 },
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  panelHeight = DEFAULT_PANEL_HEIGHT,
  itemSize = DEFAULT_ITEM_SIZE,
  label = 'Portfolio navigation',
}: DockProps) {
  const mouseX = useMotionValue(Infinity)
  const isHovered = useMotionValue(0)
  const maxHeight = useMemo(
    () => Math.max(DOCK_HEIGHT, magnification + magnification / 2 + 4),
    [magnification],
  )
  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight])
  const height = useSpring(heightRow, spring)

  return (
    <motion.div
      className="dock-viewport"
      data-dock
      data-distance={distance}
      data-item-size={itemSize}
      data-magnification={magnification}
      style={{ height, scrollbarWidth: 'none' }}
    >
      <motion.div
        className={cn('dock-panel', className)}
        data-dock-panel
        onMouseMove={({ clientX }) => {
          isHovered.set(1)
          mouseX.set(clientX)
        }}
        onMouseLeave={() => {
          isHovered.set(0)
          mouseX.set(Infinity)
        }}
        style={{ height: panelHeight }}
        role="toolbar"
        aria-label={label}
      >
        <DockContext.Provider value={{ mouseX, spring, distance, magnification, itemSize }}>
          {children}
        </DockContext.Provider>
      </motion.div>
    </motion.div>
  )
}

function DockItem({ children, className }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { distance, magnification, mouseX, spring, itemSize } = useDock()
  const isHovered = useMotionValue(0)
  const mouseDistance = useTransform(mouseX, (value) => {
    const rect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 }
    return value - rect.x - rect.width / 2
  })
  const widthTransform = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [itemSize, magnification, itemSize],
  )
  const width = useSpring(widthTransform, spring)

  return (
    <motion.div
      ref={ref}
      className={cn('dock-item', className)}
      data-dock-item
      style={{ width }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child
        return cloneElement(
          child as React.ReactElement<{ width?: MotionValue<number>; isHovered?: MotionValue<number> }>,
          { width, isHovered },
        )
      })}
    </motion.div>
  )
}

function DockLabel({ children, className, isHovered }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!isHovered) return
    return isHovered.on('change', (latest) => setIsVisible(latest === 1))
  }, [isHovered])

  return (
    <motion.span
      className={cn('dock-label', className)}
      data-dock-label
      aria-hidden="true"
      initial={false}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? -10 : 0 }}
      transition={{ duration: 0.16 }}
      style={{ x: '-50%' }}
    >
      {children}
    </motion.span>
  )
}

function DockIcon({ children, className, width }: DockIconProps) {
  const fallbackWidth = useMotionValue(DEFAULT_ITEM_SIZE)
  const iconWidth = useTransform(width ?? fallbackWidth, (value) => value * 0.72)

  return (
    <motion.span className={cn('dock-icon', className)} style={{ width: iconWidth }}>
      {children}
    </motion.span>
  )
}

export { Dock, DockIcon, DockItem, DockLabel }
