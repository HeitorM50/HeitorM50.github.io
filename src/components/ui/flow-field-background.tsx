import { cn } from '@/lib/utils'

interface NeuralBackgroundProps {
  className?: string
  /** Color of the particles. */
  color?: string
  /** Lower values create longer trails. */
  trailOpacity?: number
  /** Requested particle ceiling; the canvas scales it down on smaller screens. */
  particleCount?: number
  /** Base speed multiplier. */
  speed?: number
  /** How strongly page scroll bends and accelerates the flow field. */
  scrollInfluence?: number
}

/**
 * React shell for the flow-field canvas. Animation is progressively enhanced by
 * the portfolio's tiny static runtime so exported pages do not ship Next's full
 * client runtime for a decorative background.
 */
export default function NeuralBackground({
  className,
  color = '#818cf8',
  trailOpacity = 0.12,
  particleCount = 600,
  speed = 0.8,
  scrollInfluence = 1,
}: NeuralBackgroundProps) {
  return (
    <div
      data-flow-field-background
      data-color={color}
      data-particle-count={particleCount}
      data-scroll-influence={scrollInfluence}
      data-speed={speed}
      data-trail-opacity={trailOpacity}
      aria-hidden="true"
      className={cn('relative h-full w-full overflow-hidden bg-[var(--bg)]', className)}
    >
      <canvas className="block h-full w-full opacity-80 motion-reduce:opacity-45" />
    </div>
  )
}
