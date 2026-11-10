import { OrganizationMark } from './OrganizationMark'
import type { ReactNode } from 'react'
import { Header } from './Header'
import { Picture } from './Picture'
import { ProjectMeta } from './ProjectMeta'
import { ProjectContributors } from './ProjectContributors'
import { DuotoneFilter } from './hud/Duotone'
import { ContraBackground } from './hud/ContraBackground'
import { Button, TextLink } from './hud/Button'
import { Barcode, Tag } from './hud/Panel'
import { contributors } from '@/data/contributors'
import { caseHref, copy, projects, site, type Locale, type Project } from '@/data/portfolio'

export function CaseStudyPage({ project, locale, children }: { project: Project; locale: Locale; children: ReactNode }) {
  const text = copy[locale]
  const pt = locale === 'pt'
  const home = pt ? '/' : '/en/'
  const alternateHref = caseHref(project, pt ? 'en' : 'pt')
  const featured = projects.filter(item => item.featured)
  const index = featured.findIndex(item => item.slug === project.slug)
  const schema = {
    '@context': 'https://schema.org', '@type': 'CreativeWork', name: project.title,
    description: project.summary[locale],
    creator: project.contributors?.map(id => ({ '@type': 'Person', name: contributors[id].name, url: `https://github.com/${contributors[id].github}` })) ?? { '@type': 'Person', name: site.fullName },
    ...(project.recognition ? { award: project.recognition[locale] } : {}),
    url: `${site.url}${caseHref(project, locale)}`, dateCreated: project.year
  }

  return <div className="page page--case">
    <DuotoneFilter />
    <ContraBackground word={project.title.toUpperCase()} />
    <Header locale={locale} alternateHref={alternateHref} />
    <main id="conteudo" className="case-main" data-bg="melt" data-bg-word={project.title.toUpperCase()}>
      <article>
        <header className="case-hero container">
          <span className="giant-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
          <TextLink href={`${home}#projetos`}>← {text.back}</TextLink>
          <p className="section-label">CASE_{String(index + 1).padStart(2, '0')} {'//'} {project.slug.toUpperCase()}.MD</p>
          <div className="case-title-grid">
            <div>
              <div className="case-organization">{project.organizationId && <OrganizationMark id={project.organizationId} />}<p className="mono">{pt ? 'ESTUDO DE CASO' : 'CASE STUDY'} {'//'} {project.year}</p></div>
              <h1>{project.title}</h1>
              <p className="case-lead">{project.summary[locale]}</p>
            </div>
            <dl className="case-facts chamfer-md">
              <div><dt className="mono">{text.contribution.toUpperCase()}</dt><dd>{project.role[locale]}</dd></div>
              <div><dt className="mono">STACK</dt><dd><ul className="tag-list">{project.stack.map(item => <li key={item}><Tag>{item}</Tag></li>)}</ul></dd></div>
              <Barcode />
            </dl>
          </div>
          <ProjectMeta project={project} locale={locale} />
          <ProjectContributors project={project} locale={locale} />
          {project.metrics && <ul className="case-metrics" data-stagger>{project.metrics.map(metric => <li className="chamfer-md" key={metric[locale]}>{metric[locale]}</li>)}</ul>}
        </header>
        {project.cover && <div className="case-cover container"><div className="image-window"><div className="image-window__tabs" aria-hidden="true"><span /><span /><span className="mono">{project.slug.toUpperCase()}.IMG</span></div><div className="image-window__frame" data-scan><Picture name={project.cover} alt={`${project.title} — ${pt ? 'captura do projeto' : 'screenshot'}`} width={project.coverWidth ?? 1400} height={project.coverHeight ?? 875} eager /></div></div></div>}
        <div className="case-body container">{children}</div>
        {(project.links.live || project.links.source) && <aside className="case-links container"><p className="section-label">{text.projectLinks.toUpperCase()}</p><div>{project.links.live && <Button href={project.links.live} external>{text.liveCta}</Button>}{project.links.source && <TextLink href={project.links.source} external>{text.sourceCta}</TextLink>}</div></aside>}
      </article>
    </main>
    <footer className="data-footer data-footer--case"><div className="container data-footer__row"><p className="mono">© {new Date().getFullYear()} {site.name} · {text.footer}</p><span className="barcode" aria-hidden="true" /><span className="seal mono" aria-hidden="true">V2 // HR.SYS</span></div></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </div>
}
