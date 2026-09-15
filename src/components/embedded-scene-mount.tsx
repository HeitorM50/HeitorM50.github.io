import { createRoot } from 'react-dom/client'
import { SplineSceneBasic } from './ui/spline-scene-basic'

export function mountScene(target: HTMLElement, scene: string, onReady: () => void, onError: () => void) {
  const root = createRoot(target)
  const render = (paused: boolean) => root.render(<SplineSceneBasic scene={scene} paused={paused} onReady={onReady} onError={onError} />)
  render(false)
  return { setPaused: render, dispose: () => root.unmount() }
}
