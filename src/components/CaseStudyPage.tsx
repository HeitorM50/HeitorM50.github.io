import Link from 'next/link'
import type { ReactNode } from 'react'
import { Header } from './Header'
import { Picture } from './Picture'
import { caseHref, copy, site, type Locale, type Project } from '@/data/portfolio'
import { LiquidButton } from '@/components/ui/liquid-glass-button'

export function CaseStudyPage({ project, locale, children }: { project: Project; locale: Locale; children: ReactNode }) {
  const text = copy[locale]
  const home = locale === 'pt' ? '/' : '/en/'
  const alternateHref = caseHref(project, locale === 'pt' ? 'en' : 'pt')
  const schema = {
    '@context': 'https://schema.org', '@type': 'CreativeWork', name: project.title,
    description: project.summary[locale], creator: { '@type': 'Person', name: site.fullName },
    url: `${site.url}${caseHref(project, locale)}`, dateCreated: project.year
  }

  return (
    <>
      <Header locale={locale} alternateHref={alternateHref} />
      <main className="case-main">
        <article>
          <header className="case-hero shell">
            <Link className="back-link" href={`${home}#projetos`}><span aria-hidden="true">←</span>{text.back}</Link>
            <div className="case-title-grid">
              <div><p className="project-meta">CASE STUDY · {project.year}</p><h1>{project.title}</h1><p className="case-lead">{project.summary[locale]}</p></div>
              <div className="case-facts"><div><span>{text.contribution}</span><p>{project.role[locale]}</p></div><div><span>STACK</span><p>{project.stack.join(' · ')}</p></div></div>
            </div>
            {project.metrics && <ul className="case-metrics">{project.metrics.map((metric) => <li key={metric[locale]}>{metric[locale]}</li>)}</ul>}
          </header>
          {project.cover && <div className="case-cover shell"><Picture name={project.cover} alt={`${project.title} — screenshot`} width={project.coverWidth ?? 1400} height={project.coverHeight ?? 875} eager /></div>}
          <div className="case-body shell">{children}</div>
          {(project.links.live || project.links.source) && <aside className="case-links shell"><p className="kicker">{text.projectLinks}</p><div>{project.links.live && <LiquidButton asChild><a href={project.links.live} target="_blank" rel="noreferrer">{text.liveCta}<span aria-hidden="true">↗</span></a></LiquidButton>}{project.links.source && <a className="button button-secondary" href={project.links.source} target="_blank" rel="noreferrer">{text.sourceCta}<span aria-hidden="true">↗</span></a>}</div></aside>}
        </article>
      </main>
      <footer className="site-footer"><div className="shell"><p>© {new Date().getFullYear()} {site.name}</p><p>{text.footer}</p></div></footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  )
}
