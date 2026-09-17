const controllers = new WeakMap<HTMLElement, () => void>()

/** Progressive disclosure shared by React development and the static export. */
export function prepareEmbeddedLab(section: HTMLElement) {
  if (controllers.has(section)) return
  const details = section.querySelector<HTMLDetailsElement>('.embedded-lab')
  const trigger = section.querySelector<HTMLButtonElement>('[data-lab-trigger]')
  const summary = details?.querySelector('summary')
  const content = details?.querySelector<HTMLElement>('.embedded-lab-content')
  if (!details || !trigger || !summary || !content) return
  const abort = new AbortController()
  const { signal } = abort
  let animation: Animation | undefined
  let expanded = details.open
  const motion = matchMedia('(prefers-reduced-motion: reduce)')
  function sync() {
    trigger!.setAttribute('aria-expanded', String(expanded))
    const label = trigger!.querySelector('[data-lab-label]')
    if (label) label.textContent = (expanded ? trigger!.dataset.closeLabel : trigger!.dataset.openLabel) || ''
  }
  function setOpen(open: boolean) {
    expanded = open
    animation?.cancel()
    if (!open && details!.contains(document.activeElement)) trigger!.focus({ preventScroll: true })
    sync()
    if (open) details!.open = true
    const finish = () => { if (!expanded) details!.open = false }
    if (motion.matches || typeof content!.animate !== 'function') { finish(); return }
    animation = content!.animate(open
      ? [{ opacity: 0, transform: 'translateY(-8px)' }, { opacity: 1, transform: 'translateY(0)' }]
      : [{ opacity: 1 }, { opacity: 0 }], { duration: 250, easing: 'ease-out' })
    animation.finished.then(finish).catch(() => { /* A new toggle supersedes this animation. */ })
  }
  trigger.addEventListener('click', () => setOpen(!expanded), { signal })
  section.querySelector('[data-lab-close]')?.addEventListener('click', () => setOpen(false), { signal })
  details.addEventListener('toggle', () => {
    if (!animation || animation.playState === 'finished') { expanded = details.open; sync() }
  }, { signal })
  const fromHash = () => { if (location.hash === '#embedded-projects') setOpen(true) }
  window.addEventListener('hashchange', fromHash, { signal })
  trigger.hidden = false
  summary.hidden = true
  section.dataset.labReady = 'true'
  sync()
  fromHash()
  const cleanup = () => {
    animation?.cancel()
    abort.abort()
    trigger.hidden = true
    summary.hidden = false
    delete section.dataset.labReady
    controllers.delete(section)
  }
  controllers.set(section, cleanup)
  return cleanup
}
