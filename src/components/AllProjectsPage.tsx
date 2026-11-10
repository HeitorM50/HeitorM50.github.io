import { caseHref, projectGroups, projects, site, type Locale } from '@/data/portfolio'
import { pageHref } from '@/data/sections'
import { Header } from './Header'
import { DuotoneFilter } from './hud/Duotone'
import { ContraBackground } from './hud/ContraBackground'
import { HudHeader } from './hud/SectionHeader'
import { Button, TextLink } from './hud/Button'
import { Tag } from './hud/Panel'
import { ProjectMeta } from './ProjectMeta'
import { ProjectContributors } from './ProjectContributors'

const embeddedGroup = { id: 'embedded', pt: 'Embarcados · UnBaja', en: 'Embedded · UnBaja', note: { pt: 'Hardware, firmware e telemetria do carro da equipe.', en: 'Hardware, firmware and telemetry for the team’s car.' } } as const

// Página "ver todos": todos os projetos de portfolio.ts, agrupados por categoria.
export function AllProjectsPage({ locale }: { locale: Locale }) {
  const pt = locale === 'pt'
  const home = pt ? '/' : '/en/'
  return <div className="page page--sub">
    <DuotoneFilter />
    <ContraBackground word={pt ? 'PROJETOS' : 'PROJECTS'} />
    <Header locale={locale} alternateHref={pageHref.projects[pt ? 'en' : 'pt']} />
    <main id="conteudo" className="section archive-page" data-bg="liquid,melt" data-bg-word={pt ? 'PROJETOS' : 'PROJECTS'}>
      <div className="container">
        <TextLink href={`${home}#projetos`}>← {pt ? 'Voltar ao portfólio' : 'Back to the portfolio'}</TextLink>
        <HudHeader level={1} label={pt ? 'ARQUIVO // PROJETOS' : 'ARCHIVE // PROJECTS'} number={String(projects.length)} titleId="all-projects-title" title={pt ? 'Todos os projetos' : 'All projects'}
          lead={pt ? 'Produtos em equipe, ferramentas próprias, pesquisa e embarcados. Os destaques têm estudo de caso.' : 'Team products, personal tools, research and embedded work. Highlights have a case study.'} />
        <div className="archive">{[...projectGroups, embeddedGroup].map(group => {
          const items = projects.filter(project => project.category === group.id)
          if (!items.length) return null
          return <section className="archive__group" key={group.id} aria-labelledby={`archive-${group.id}`}>
            <header><h2 id={`archive-${group.id}`}>{group[locale]}</h2><p>{group.note[locale]}</p></header>
            <ul className="archive__list" data-stagger>{items.map(project => <li key={project.slug}>
              <article className="archive-card chamfer-md" data-project-slug={project.slug}>
                <p className="mono">{project.year}{project.featured ? ` // ${pt ? 'DESTAQUE' : 'FEATURED'}` : ''}</p>
                <h3>{group.id === 'embedded' && project.slug === 'unbaja-telemetria' && !pt ? 'UnBaja · Embedded telemetry' : project.title}</h3>
                <ProjectMeta project={project} locale={locale} />
                <p>{project.summary[locale]}</p>
                <p className="contribution"><strong className="mono">{pt ? 'MINHA CONTRIBUIÇÃO' : 'MY CONTRIBUTION'}</strong>{project.role[locale]}</p>
                <ProjectContributors project={project} locale={locale} compact />
                <ul className="tag-list" aria-label="Stack">{project.stack.map(item => <li key={item}><Tag>{item}</Tag></li>)}</ul>
                <p className="project-links">
                  {project.featured && <Button href={caseHref(project, locale)} className="btn--compact">{pt ? 'Estudo de caso' : 'Case study'}</Button>}
                  {project.category === 'embedded' && <TextLink href={pageHref.unbaja[locale]}>UnBaja →</TextLink>}
                  {project.links.live && <TextLink href={project.links.live} external>{pt ? 'Ao vivo' : 'Live'}</TextLink>}
                  {project.links.source && <TextLink href={project.links.source} external>{pt ? 'Código' : 'Source'}</TextLink>}
                </p>
              </article>
            </li>)}</ul>
          </section>
        })}</div>
      </div>
    </main>
    <footer className="data-footer data-footer--case"><div className="container data-footer__row"><p className="mono">© {new Date().getFullYear()} {site.name}</p><span className="barcode" aria-hidden="true" /><span className="seal mono" aria-hidden="true">V2 {'//'} HR.SYS</span></div></footer>
  </div>
}
