'use client'

import { Component, Suspense, lazy, useCallback, useEffect, useRef, type ReactNode } from 'react'
import type { Application } from '@splinetool/runtime'

const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  paused?: boolean
  onReady?: () => void
  onError?: () => void
}

class SceneBoundary extends Component<{ children: ReactNode; onError?: () => void }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onError?.() }
  render() { return this.state.failed ? null : this.props.children }
}

export function SplineScene({ scene, className, paused = false, onReady, onError }: SplineSceneProps) {
  const application = useRef<Application | null>(null)
  const currentPaused = useRef(paused)
  useEffect(() => {
    currentPaused.current = paused
    if (paused) application.current?.stop()
    else application.current?.play()
  }, [paused])
  const handleLoad = useCallback((app: Application) => {
    application.current = app
    if (currentPaused.current) app.stop()
    onReady?.()
  }, [onReady])

  return <SceneBoundary onError={onError}>
    <Suspense fallback={<span className="embedded-loader" aria-hidden="true" />}>
      <Spline scene={scene} className={className} onLoad={handleLoad} renderOnDemand />
    </Suspense>
  </SceneBoundary>
}
