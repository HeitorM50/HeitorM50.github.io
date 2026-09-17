const controllers = new WeakMap<HTMLElement, () => void>()
const labHash = '#embedded-projects'

/** Shared by React and the static export; native disclosure is the fallback. */
export function prepareEmbeddedLab(section: HTMLElement) {
  if (controllers.has(section)) return
  const details = section.querySelector<HTMLDetailsElement>('.embedded-lab')
  const trigger = section.querySelector<HTMLButtonElement>('[data-lab-trigger]')
  const summary = details?.querySelector('summary')
  const content = details?.querySelector<HTMLElement>('.embedded-lab-content')
  if (!details || !trigger || !summary || !content) return
  const dialog = document.createElement('dialog')
  if (typeof dialog.showModal !== 'function') return
  dialog.id = 'embedded-lab-dialog'
  dialog.className = 'lab-portal'
  dialog.setAttribute('aria-labelledby', 'lab-title')
  details.after(dialog)
  dialog.append(content)

  const abort = new AbortController()
  const { signal } = abort
  const motion = matchMedia('(prefers-reduced-motion: reduce)')
  const owner = `${Date.now()}-${Math.random()}`
  let state: 'closed' | 'entering' | 'open' | 'leaving' = 'closed'
  let animations: Animation[] = []
  let generation = 0
  let scrollX = 0
  let scrollY = 0
  let restorePage: (() => void) | undefined
  let origin = 'inset(0 round 24px)'

  function setState(next: typeof state) {
    state = next
    dialog.dataset.state = next
    trigger!.setAttribute('aria-expanded', String(next === 'entering' || next === 'open'))
    section.dataset.labOpen = String(next !== 'closed')
    section.dispatchEvent(new Event('labvisibilitychange'))
  }
  function cancelAnimations() {
    generation++
    animations.forEach(animation => animation.cancel())
    animations = []
  }
  function lockPage() {
    scrollX = window.scrollX
    scrollY = window.scrollY
    const body = document.body
    const root = document.documentElement
    const bodyStyle = body.getAttribute('style')
    const rootOverflow = root.style.overflow
    const restoration = history.scrollRestoration
    const gap = Math.max(0, innerWidth - root.clientWidth)
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.left = `-${scrollX}px`
    body.style.width = '100%'
    body.style.paddingRight = `${(parseFloat(getComputedStyle(body).paddingRight) || 0) + gap}px`
    root.style.overflow = 'hidden'
    history.scrollRestoration = 'manual'
    restorePage = () => {
      if (bodyStyle === null) body.removeAttribute('style')
      else body.setAttribute('style', bodyStyle)
      root.style.overflow = rootOverflow
      const behavior = root.style.scrollBehavior
      root.style.scrollBehavior = 'auto'
      window.scrollTo(scrollX, scrollY)
      root.style.scrollBehavior = behavior
      history.scrollRestoration = restoration
      restorePage = undefined
    }
  }
  function animate(open: boolean, fromCard: boolean, done: () => void) {
    const version = generation
    if (motion.matches || typeof dialog.animate !== 'function') { done(); return }
    const shape = fromCard
      ? (open ? [{ clipPath: origin }, { clipPath: 'inset(0 round 0px)' }] : [{ clipPath: getComputedStyle(dialog).clipPath }, { clipPath: origin }])
      : (open ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 1 }, { opacity: 0 }])
    const surface = dialog.animate(shape, { duration: fromCard ? (open ? 650 : 350) : 180, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both' })
    animations.push(surface)
    if (open) animations.push(content!.animate([{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: fromCard ? 350 : 180, delay: fromCard ? 200 : 0, fill: 'both', easing: 'ease-out' }))
    surface.finished.then(() => {
      if (version !== generation) return
      done()
      cancelAnimations()
    }).catch(() => { /* A newer transition or cleanup owns the surface now. */ })
  }
  function open(fromCard = false) {
    if (state === 'open' || state === 'entering') return
    cancelAnimations()
    dialog.style.clipPath = ''
    if (state === 'closed') {
      const rect = section.querySelector('.embedded-hero')?.getBoundingClientRect()
      if (rect && rect.bottom > 0 && rect.top < innerHeight) origin = `inset(${Math.max(0, rect.top)}px ${Math.max(0, innerWidth - rect.right)}px ${Math.max(0, innerHeight - rect.bottom)}px ${Math.max(0, rect.left)}px round 24px)`
      else fromCard = false
      lockPage()
      dialog.showModal()
      dialog.scrollTop = 0
    }
    setState('entering')
    content!.querySelector<HTMLElement>('#lab-title')?.focus({ preventScroll: true })
    animate(true, fromCard, () => setState('open'))
  }
  function close() {
    if (state === 'closed' || state === 'leaving') return
    const clip = getComputedStyle(dialog).clipPath
    cancelAnimations()
    dialog.style.clipPath = clip === 'none' ? 'inset(0 round 0px)' : clip
    setState('leaving')
    animate(false, true, () => {
      dialog.close()
      dialog.style.clipPath = ''
      restorePage?.()
      setState('closed')
      trigger!.focus({ preventScroll: true })
    })
  }
  function requestClose() {
    if (state === 'closed' || state === 'leaving') return
    close()
    if (location.hash !== labHash) return
    if (history.state?.embeddedLabOwner === owner) history.back()
    else history.replaceState(history.state, '', `${location.pathname}${location.search}#embarcados`)
  }
  function fromHistory() {
    if (location.hash === labHash) open()
    else close()
  }
  trigger.addEventListener('click', () => {
    if (state !== 'closed') return
    history.pushState({ ...history.state, embeddedLabOwner: owner }, '', labHash)
    open(true)
  }, { signal })
  content.querySelector('[data-lab-close]')?.addEventListener('click', requestClose, { signal })
  dialog.addEventListener('cancel', event => { event.preventDefault(); requestClose() }, { signal })
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return
    const controls = Array.from(dialog.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex="0"]')).filter(node => node.getClientRects().length)
    const first = controls[0]
    const last = controls.at(-1)
    if (event.shiftKey && (document.activeElement === first || !controls.includes(document.activeElement as HTMLElement))) { event.preventDefault(); last?.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
  }, { signal })
  window.addEventListener('popstate', fromHistory, { signal })
  window.addEventListener('hashchange', fromHistory, { signal })
  trigger.hidden = false
  summary.hidden = true
  section.dataset.labReady = 'true'
  setState('closed')
  fromHistory()
  const cleanup = () => {
    cancelAnimations()
    abort.abort()
    if (dialog.open) dialog.close()
    restorePage?.()
    details.append(content)
    dialog.remove()
    trigger.hidden = true
    summary.hidden = false
    details.open = false
    setState('closed')
    delete section.dataset.labReady
    delete section.dataset.labOpen
    controllers.delete(section)
  }
  controllers.set(section, cleanup)
  return cleanup
}
