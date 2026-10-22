'use client'

import { useEffect, useRef } from 'react'
import { caseHref, projects, type Locale } from '@/data/portfolio'

export type FolderData = { id: string; label: string; meta: string; art: 'violet' | 'indigo' | 'orchid'; files: { slug: string; name: string; meta: string; image?: string; href?: string }[] }

const art = { team: 'violet', personal: 'indigo', academic: 'orchid' } as const
// Rótulos curtos: o nome precisa caber na frente da pasta.
const labels = { team: { pt: 'Hackathons & equipes', en: 'Hackathons & teams' }, personal: { pt: 'Projetos pessoais', en: 'Personal projects' }, academic: { pt: 'Pesquisa & acadêmicos', en: 'Research & academic' } } as const

export function projectFolders(locale: Locale): FolderData[] {
  const pt = locale === 'pt'
  return (['team', 'personal', 'academic'] as const).map(id => {
    // Destaques ficam na frente da pilha (fim da lista).
    const items = projects.filter(project => project.category === id).sort((a, b) => Number(a.featured) - Number(b.featured))
    return {
      id, art: art[id],
      label: labels[id][locale],
      meta: `${items.length} ${pt ? (items.length === 1 ? 'projeto' : 'projetos') : (items.length === 1 ? 'project' : 'projects')}`,
      files: items.map(project => ({
        slug: project.slug, name: project.title, meta: project.year,
        image: project.cover ? `/media/${project.cover}.webp` : undefined,
        href: project.featured ? caseHref(project, locale) : undefined
      }))
    }
  })
}

export function ProjectFolders({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null)
  const pt = locale === 'pt'
  const folders = projectFolders(locale)
  useEffect(() => {
    let active = true
    let cleanup: (() => void) | undefined
    // Mesmo bundle em desenvolvimento e no export estático.
    const moduleUrl = '/vendor/embedded/portfolio-ui.js'
    import(/* webpackIgnore: true */ moduleUrl).then(module => {
      if (active && ref.current) cleanup = module.prepareProjectFolders(ref.current)
    }).catch(() => {})
    return () => { active = false; cleanup?.() }
  }, [])
  return <div ref={ref} className="project-folders" data-project-folders data-locale={locale} data-folders={JSON.stringify(folders)}>
    <p className="project-folders-hint">{pt ? 'Abra uma pasta para ver os projetos de cada área.' : 'Open a folder to see the projects in each area.'}</p>
    <div className="project-folders-fallback">{folders.map(folder => <section key={folder.id} aria-labelledby={`folder-${folder.id}`}>
      <h3 id={`folder-${folder.id}`}>{folder.label}<span>{folder.meta}</span></h3>
      <ul>{folder.files.slice().reverse().map(file => <li key={file.slug}><a href={file.href ?? `#outros-projetos`}>{file.name}</a> <span>{file.meta}</span></li>)}</ul>
    </section>)}</div>
    <div className="project-folders-mount" data-folders-mount />
  </div>
}
