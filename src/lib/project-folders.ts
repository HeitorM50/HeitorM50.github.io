const instances = new WeakMap<HTMLElement, () => void>()

/** Monta as pastas de vidro quando a seção se aproxima; até lá fica a lista estática. */
export function prepareProjectFolders(host: HTMLElement) {
  if (instances.has(host)) return instances.get(host)!
  const target = host.querySelector<HTMLElement>('[data-folders-mount]')
  if (!target || !host.dataset.folders) return () => {}
  const folders = JSON.parse(host.dataset.folders)
  const locale = host.dataset.locale === 'pt' ? 'pt' : 'en'
  let disposed = false
  let unmount: (() => void) | undefined
  const observer = new IntersectionObserver(entries => {
    if (!entries.some(entry => entry.isIntersecting)) return
    observer.disconnect()
    import('../components/project-folders-mount').then(({ mountFolders }) => {
      if (disposed) return
      unmount = mountFolders(target, folders, locale)
      host.dataset.foldersState = 'ready'
    }).catch(() => { host.dataset.foldersState = 'error' })
  }, { rootMargin: '50% 0px' })
  observer.observe(host)
  const dispose = () => { disposed = true; observer.disconnect(); unmount?.(); instances.delete(host) }
  instances.set(host, dispose)
  return dispose
}
