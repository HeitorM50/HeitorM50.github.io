'use client'

import { SplineScene } from './splite'
import { Spotlight } from './spotlight'

// The surrounding Card and editorial content are static HTML in EmbeddedSection.
// Only this visual subtree needs React in the GitHub Pages export.
export function SplineSceneBasic(props: Parameters<typeof SplineScene>[0]) {
  return <div className="embedded-scene-content">
    <SplineScene {...props} className="embedded-canvas" />
    <Spotlight disabled={props.paused} />
  </div>
}
