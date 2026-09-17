type SceneHandle = { setPaused: (paused: boolean) => void; dispose: () => void }

const instances = new WeakMap<HTMLElement, () => void>()

export function prepareEmbeddedScene(host: HTMLElement) {
  if (instances.has(host)) return instances.get(host)!
  const target = host.querySelector<HTMLElement>('[data-scene-mount]')!
  const status = host.querySelector<HTMLElement>('[data-scene-status]')!
  const button = host.querySelector<HTMLButtonElement>('[data-scene-toggle]')!
  const pt = host.dataset.locale === 'pt'
  const labels = pt
    ? { idle: 'Ilustração interativa · 3D', loading: 'Carregando a cena 3D…', ready: 'Mova o cursor para explorar', paused: 'Cena pausada', error: 'O 3D está indisponível. Você pode continuar explorando os projetos.' }
    : { idle: 'Interactive illustration · 3D', loading: 'Loading the 3D scene…', ready: 'Move your pointer to explore', paused: 'Scene paused', error: '3D is unavailable. You can keep exploring the projects.' }
  let state: keyof typeof labels = 'idle'
  let handle: SceneHandle | undefined
  let timer: ReturnType<typeof setTimeout> | undefined
  let generation = 0
  let visible = false
  let manualPause = false
  let disposed = false
  const preference = matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')

  function update(next: keyof typeof labels) {
    state = next
    host.dataset.sceneState = next
    status.textContent = labels[next]
    button.disabled = next === 'loading'
    button.textContent = next === 'ready' ? (pt ? 'Pausar 3D' : 'Pause 3D') : next === 'paused' ? (pt ? 'Retomar 3D' : 'Resume 3D') : next === 'error' ? (pt ? 'Tentar novamente' : 'Try again') : (pt ? 'Ativar 3D' : 'Enable 3D')
  }
  function fail() {
    if (disposed) return
    generation++
    clearTimeout(timer)
    // Defer unmount when this callback comes from React's error boundary.
    const previous = handle
    handle = undefined
    queueMicrotask(() => previous?.dispose())
    update('error')
  }
  async function start() {
    if (disposed || state === 'loading' || state === 'ready') return
    update('loading')
    const attempt = ++generation
    timer = setTimeout(fail, 30000)
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2')
      if (!gl) throw new Error('WebGL2 unavailable')
      gl.getExtension('WEBGL_lose_context')?.loseContext()
      const { mountScene } = await import('../components/embedded-scene-mount')
      if (disposed || attempt !== generation) return
      handle = mountScene(target, host.dataset.scene!, () => {
        if (disposed || attempt !== generation) return
        clearTimeout(timer)
        update('ready')
        syncPlayback()
      }, fail)
    } catch { if (attempt === generation) fail() }
  }
  function syncPlayback() {
    if (!handle || (state !== 'ready' && state !== 'paused')) return
    const paused = manualPause || !visible || document.hidden || host.closest<HTMLElement>('.embedded-section')?.dataset.labOpen === 'true'
    handle.setPaused(paused)
    update(paused ? 'paused' : 'ready')
  }
  function toggle() {
    if (state === 'ready' || state === 'paused') {
      manualPause = !manualPause
      syncPlayback()
    } else { manualPause = false; void start() }
  }
  function changedPreference() {
    if (!preference.matches && handle) { manualPause = true; syncPlayback() }
  }
  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting
    if (visible && state === 'idle' && preference.matches) void start()
    syncPlayback()
  }, { rootMargin: '100px 0px' })
  observer.observe(host)
  button.addEventListener('click', toggle)
  document.addEventListener('visibilitychange', syncPlayback)
  const section = host.closest('.embedded-section')
  section?.addEventListener('labvisibilitychange', syncPlayback)
  preference.addEventListener('change', changedPreference)
  update('idle')
  const cleanup = () => {
    disposed = true
    generation++
    clearTimeout(timer)
    observer.disconnect()
    button.removeEventListener('click', toggle)
    document.removeEventListener('visibilitychange', syncPlayback)
    section?.removeEventListener('labvisibilitychange', syncPlayback)
    preference.removeEventListener('change', changedPreference)
    handle?.dispose()
    instances.delete(host)
  }
  instances.set(host, cleanup)
  return cleanup
}
