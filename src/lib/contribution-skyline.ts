import { expandContributions } from './github-contributions'

const instances = new WeakMap<HTMLElement, () => void>()

/** Monta o gráfico quando a seção se aproxima da tela; até lá fica o resumo estático. */
export function prepareContributionSkyline(host: HTMLElement) {
  if (instances.has(host)) return instances.get(host)!
  const target = host.querySelector<HTMLElement>('[data-skyline-mount]')
  const start = host.dataset.start
  const counts = (host.dataset.counts ?? '').split(',').map(Number)
  if (!target || !start || !counts.length) return () => {}
  const locale = host.dataset.locale === 'pt' ? 'pt' : 'en'
  let disposed = false
  let unmount: (() => void) | undefined
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return
    observer.disconnect()
    import('../components/contribution-skyline-mount').then(({ mountSkyline }) => {
      if (disposed) return
      unmount = mountSkyline(target, expandContributions({ start, counts }), locale)
      host.dataset.skylineState = 'ready'
    }).catch(() => { host.dataset.skylineState = 'error' })
  }, { rootMargin: '50% 0px' })
  observer.observe(host)
  const dispose = () => { disposed = true; observer.disconnect(); unmount?.(); instances.delete(host) }
  instances.set(host, dispose)
  return dispose
}
