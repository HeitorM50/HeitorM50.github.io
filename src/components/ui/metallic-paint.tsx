import type { CSSProperties } from 'react'
import { cn } from '@/lib/utils'

export interface MetallicPaintProps {
  imageSrc: string
  fallbackSrc?: string
  className?: string
  ariaLabel?: string
  seed?: number
  scale?: number
  patternSharpness?: number
  noiseScale?: number
  speed?: number
  mouseAnimation?: boolean
  liquid?: number
  brightness?: number
  contrast?: number
  refraction?: number
  blur?: number
  chromaticSpread?: number
  fresnel?: number
  angle?: number
  waveAmplitude?: number
  distortion?: number
  contour?: number
  lightColor?: string
  darkColor?: string
  tintColor?: string
  maxResolution?: number
}

export default function MetallicPaint({
  imageSrc,
  fallbackSrc = '/media/logo-metallic.svg',
  className,
  ariaLabel,
  seed = 42,
  scale = 4,
  patternSharpness = 1,
  noiseScale = 0.5,
  speed = 0.3,
  mouseAnimation = false,
  liquid = 0.75,
  brightness = 2,
  contrast = 0.5,
  refraction = 0.01,
  blur = 0.015,
  chromaticSpread = 2,
  fresnel = 1,
  angle = 0,
  waveAmplitude = 1,
  distortion = 1,
  contour = 0.2,
  lightColor = '#ffffff',
  darkColor = '#000000',
  tintColor = '#feb3ff',
  maxResolution = 512,
}: MetallicPaintProps) {
  const settings = {
    '--metallic-fallback': `url("${fallbackSrc}")`,
  } as CSSProperties

  return (
    <span
      className={cn('metallic-paint', className)}
      data-metallic-paint
      data-metallic-status="loading"
      data-image-src={imageSrc}
      data-seed={seed}
      data-scale={scale}
      data-sharpness={patternSharpness}
      data-noise={noiseScale}
      data-speed={speed}
      data-mouse-animation={mouseAnimation ? 'true' : 'false'}
      data-liquid={liquid}
      data-brightness={brightness}
      data-contrast={contrast}
      data-refraction={refraction}
      data-blur={blur}
      data-chroma={chromaticSpread}
      data-fresnel={fresnel}
      data-angle={angle}
      data-wave={waveAmplitude}
      data-distortion={distortion}
      data-contour={contour}
      data-light-color={lightColor}
      data-dark-color={darkColor}
      data-tint-color={tintColor}
      data-max-resolution={maxResolution}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      style={settings}
    >
      <span className="metallic-paint__fallback" />
      <canvas className="metallic-paint__canvas" aria-hidden="true" />
    </span>
  )
}

export function MetallicLogo({ className }: { className?: string }) {
  return <span className={cn('metallic-logo', className)} aria-hidden="true" />
}
