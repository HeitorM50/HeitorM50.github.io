const controllers = new WeakMap<HTMLElement, () => void>()

/** One DOM controller for both React development and static GitHub Pages. */
export function prepareSqueezeCarousel(host: HTMLElement, onIndexChange?: (index: number) => void) {
  if (controllers.has(host)) return
  const allTabs = Array.from(host.querySelectorAll<HTMLButtonElement>('[data-sq-tab]'))
  const filters = Array.from(host.querySelectorAll<HTMLButtonElement>('[data-sq-filter]'))
  let tabs = allTabs
  const panels = Array.from(host.querySelectorAll<HTMLElement>('[data-sq-panel]'))
  const strip = host.querySelector<HTMLElement>('.sq-strip')
  const counter = host.querySelector<HTMLElement>('[data-sq-counter]')
  let count = tabs.length
  if (!count || !strip) return
  const wrap = (i: number) => ((i % count) + count) % count
  let active = wrap(Number(host.dataset.sqIndex) || 0)
  let hover = -1
  let paused = false
  let visible = false
  let timer: ReturnType<typeof setTimeout> | undefined
  let touch: { x: number; y: number } | undefined
  let ignoreClickUntil = 0
  const motion = matchMedia('(prefers-reduced-motion: reduce)')
  const abort = new AbortController()
  const { signal } = abort

  function layout() {
    const width = host.clientWidth
    if (!width) return
    const mobile = width < 600
    const gap = Math.min(Number(host.dataset.sqGap) || 16, width * .035)
    const slat = Number(host.dataset.sqSlat) || 8
    const slatGap = Number(host.dataset.sqSlatGap) || 8
    const shown = Math.min(count, mobile ? 3 : 7)
    const main = Math.min(shown, mobile ? 1 : 4)
    const tail = shown - main
    const room = Math.max(0, width - tail * (slat + slatGap) - (main - 1) * gap)
    const hero = main === 1 ? room : Math.min(room * .72, strip!.clientHeight * 16 / 9)
    const rest = room - hero
    const shares = [0, .61, .30, .15]
    const weights = Array.from({ length: main - 1 }, (_, i) => shares[i + 1] + (hover === i + 1 && !motion.matches ? .18 : 0))
    const total = weights.reduce((sum, n) => sum + n, 0)
    let x = 0
    tabs.forEach((tab, i) => {
      const col = wrap(i - active)
      let w = col === 0 ? hero : col < main ? rest * weights[col - 1] / total : slat
      w = Math.max(1, w)
      // Positions are assigned below in reading order, not the DOM's original order.
      tab.style.width = `${w}px`
      tab.style.setProperty('--sq-picture-width', `${Math.max(hero, strip!.clientHeight * 16 / 9)}px`)
      tab.dataset.sqFront = String(col === 0)
      tab.dataset.sqVisible = String(col < shown)
      tab.style.zIndex = String(count - col)
    })
    for (let col = 0; col < count; col++) {
      const tab = tabs[wrap(active + col)]
      tab.style.transform = `translateX(${x}px)`
      x += Number.parseFloat(tab.style.width) + (col >= main - 1 ? slatGap : gap)
    }
  }

  function schedule() {
    clearTimeout(timer)
    if (host.dataset.sqAutoplay !== 'true' || paused || !visible || document.hidden || motion.matches || count < 2) return
    timer = setTimeout(() => select(active + 1), Math.max(2000, Number(host.dataset.sqInterval) || 6000))
  }

  function select(index: number, focus = false) {
    active = wrap(index)
    hover = -1
    host.dataset.sqIndex = String(active)
    allTabs.forEach((tab, i) => {
      const selected = tab === tabs[active]
      tab.setAttribute('aria-selected', String(selected))
      tab.tabIndex = selected ? 0 : -1
      panels[i].hidden = !selected
      panels[i].inert = !selected
    })
    if (counter) counter.textContent = `${String(active + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}`
    host.querySelectorAll<HTMLButtonElement>('[data-sq-prev], [data-sq-next]').forEach(button => { button.disabled = count < 2 })
    layout()
    if (focus) tabs[active].focus({ preventScroll: true })
    onIndexChange?.(allTabs.indexOf(tabs[active]))
    schedule()
  }

  allTabs.forEach(tab => {
    tab.addEventListener('click', event => {
      if (Date.now() < ignoreClickUntil) { event.preventDefault(); return }
      const index = tabs.indexOf(tab)
      if (index >= 0) select(index, true)
    }, { signal })
    tab.addEventListener('pointerenter', event => {
      if (host.dataset.sqHover !== 'true' || event.pointerType !== 'mouse') return
      hover = wrap(tabs.indexOf(tab) - active)
      layout()
    }, { signal })
  })
  function applyFilter(button: HTMLButtonElement) {
    const members: string[] = JSON.parse(button.dataset.sqMembers || '[]')
    const selected = allTabs.filter(tab => members.includes(tab.dataset.sqId!))
    if (!selected.length) return
    tabs = selected
    count = tabs.length
    allTabs.forEach((tab, i) => {
      const excluded = !tabs.includes(tab)
      tab.hidden = excluded
      panels[i].dataset.sqExcluded = String(excluded)
    })
    filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)))
    host.dataset.sqFilter = button.dataset.sqFilter
    select(0)
  }
  filters.forEach(button => {
    const members: string[] = JSON.parse(button.dataset.sqMembers || '[]')
    button.disabled = !allTabs.some(tab => members.includes(tab.dataset.sqId!))
    button.addEventListener('click', () => applyFilter(button), { signal })
  })
  function fromHash() {
    const button = filters.find(filter => filter.dataset.sqHash === location.hash && location.hash)
    if (button) applyFilter(button)
  }
  window.addEventListener('hashchange', fromHash, { signal })
  host.querySelector('[data-sq-prev]')?.addEventListener('click', () => select(active - 1), { signal })
  host.querySelector('[data-sq-next]')?.addEventListener('click', () => select(active + 1), { signal })
  strip.addEventListener('keydown', event => {
    const moves: Record<string, number> = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: count - 1 }
    if (!(event.key in moves)) return
    event.preventDefault()
    select(moves[event.key], true)
  }, { signal })
  strip.addEventListener('touchstart', event => { touch = { x: event.touches[0].clientX, y: event.touches[0].clientY } }, { signal, passive: true })
  strip.addEventListener('touchend', event => {
    if (!touch) return
    const dx = event.changedTouches[0].clientX - touch.x
    const dy = event.changedTouches[0].clientY - touch.y
    touch = undefined
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      ignoreClickUntil = Date.now() + 500
      select(active + (dx < 0 ? 1 : -1))
    }
  }, { signal, passive: true })
  strip.addEventListener('touchcancel', () => { touch = undefined }, { signal, passive: true })
  host.addEventListener('pointerenter', () => { paused = true; schedule() }, { signal })
  host.addEventListener('pointerleave', () => { paused = host.contains(document.activeElement); hover = -1; layout(); schedule() }, { signal })
  host.addEventListener('focusin', () => { paused = true; schedule() }, { signal })
  host.addEventListener('focusout', event => { paused = host.contains(event.relatedTarget as Node | null); schedule() }, { signal })
  document.addEventListener('visibilitychange', schedule, { signal })
  motion.addEventListener('change', () => { layout(); schedule() }, { signal })
  const observer = new ResizeObserver(layout)
  observer.observe(host)
  const visibility = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; schedule() })
  visibility.observe(host)
  const initialFilter = filters.find(button => button.dataset.sqFilter === host.dataset.sqDefaultFilter && !button.disabled)
  if (initialFilter) applyFilter(initialFilter)
  else select(active)
  fromHash()
  host.dataset.sqReady = 'true'
  layout()
  const cleanup = () => {
    clearTimeout(timer)
    abort.abort()
    observer.disconnect()
    visibility.disconnect()
    delete host.dataset.sqReady
    panels.forEach(panel => { panel.hidden = false; panel.inert = false; delete panel.dataset.sqExcluded })
    allTabs.forEach(tab => { tab.hidden = false })
    controllers.delete(host)
  }
  controllers.set(host, cleanup)
  return cleanup
}
