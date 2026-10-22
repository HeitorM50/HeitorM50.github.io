import { useEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import GlassFolder, { FOLDER_STRINGS, type FolderFile, type FolderStrings } from './ui/glass-folder-cards'
import type { FolderData } from './ProjectFolders'

const PT_STRINGS: FolderStrings = {
  ...FOLDER_STRINGS,
  open: 'Abrir', close: 'Fechar', contents: 'conteúdo', options: 'opções',
  count: n => `${n} ${n === 1 ? 'projeto' : 'projetos'}`
}
const EN_STRINGS: FolderStrings = { ...FOLDER_STRINGS, count: n => `${n} ${n === 1 ? 'project' : 'projects'}` }

/** Projetos sem estudo de caso abrem no carrossel, que tem o detalhe e os links. */
function showInCarousel(slug: string) {
  const carousel = document.querySelector<HTMLElement>('[data-squeeze-carousel]')
  if (!carousel) return
  const drawer = carousel.closest<HTMLElement>('[data-carousel-drawer]')
  if (drawer && !drawer.hasAttribute('data-expanded')) drawer.querySelector<HTMLButtonElement>('[data-carousel-toggle]')?.click()
  carousel.querySelector<HTMLButtonElement>('[data-sq-filter="all"]')?.click()
  requestAnimationFrame(() => {
    carousel.querySelector<HTMLButtonElement>(`[data-sq-id="${CSS.escape(slug)}"]`)?.click()
    carousel.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' })
  })
}

function Folders({ folders, locale }: { folders: FolderData[]; locale: 'pt' | 'en' }) {
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const [tone, setTone] = useState<'light' | 'dark'>(() => document.documentElement.dataset.theme === 'light' ? 'light' : 'dark')
  useEffect(() => {
    const host = ref.current!
    const measure = () => {
      const available = host.clientWidth
      const columns = available >= 1084 ? 3 : available >= 680 ? 2 : 1
      setWidth(Math.floor(Math.min(340, (available - (columns - 1) * 32) / columns)))
    }
    measure()
    const resize = new ResizeObserver(measure)
    resize.observe(host)
    const theme = new MutationObserver(() => setTone(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'))
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    return () => { resize.disconnect(); theme.disconnect() }
  }, [])
  return <div ref={ref} className="project-folders-grid">
    {width > 0 && folders.map((folder, index) => <GlassFolder key={folder.id} label={folder.label} meta={folder.meta} art={folder.art}
      seed={index * 7 + 3} tone={tone} action="none" width={width} maxVisible={7} appearDelay={index * 140}
      strings={locale === 'pt' ? PT_STRINGS : EN_STRINGS}
      files={folder.files.map(({ name, meta, image, href }): FolderFile => ({ name, meta, image, href }))}
      onFileSelect={(file, i) => { if (!file.href) showInCarousel(folder.files[i].slug) }} />)}
  </div>
}

export function mountFolders(target: HTMLElement, folders: FolderData[], locale: 'pt' | 'en') {
  const root = createRoot(target)
  // Desenha antes de esconder a lista estática, para a altura do bloco nunca encolher.
  flushSync(() => root.render(<Folders folders={folders} locale={locale} />))
  return () => root.unmount()
}
