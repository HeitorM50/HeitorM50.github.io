import { caseHref, projectGroups, projects, type Locale } from '@/data/portfolio'
import { pageHref } from '@/data/sections'
import { SectionHeader } from '../hud/SectionHeader'
import { Button, TextLink } from '../hud/Button'
import { Tag } from '../hud/Panel'
import { Picture } from '../Picture'
import { ProjectMeta } from '../ProjectMeta'
import { ProjectContributors } from '../ProjectContributors'

// Projetos // horizontal. Trilho com os 5 projetos em destaque + painel "VER TODOS",
// que leva à página /projetos/. Sem JS (e no celular) o trilho é rolagem lateral nativa.
// Card: captura em faixa larga no topo + informações em duas colunas embaixo.
export function ProjectsSection({ locale }: { locale: Locale }) {
  const pt = locale === 'pt'
  const featured = projects.filter(project => project.featured)
  const others = projects.length - featured.length
  const total = featured.length + 1
  return <section className="section projects" id="projetos" aria-labelledby="projects-title" data-section data-bg="liquid,melt" data-bg-word={pt ? 'PROJETOS' : 'PROJECTS'} data-mode="horizontal">
    <div className="projects__backdrop" aria-hidden="true"><span className="marquee-word">{pt ? 'PROJETOS' : 'PROJECTS'}</span></div>
    <div className="container">
      <SectionHeader id="projetos" locale={locale} titleId="projects-title" title={pt ? 'Do problema à entrega' : 'From problem to delivery'}
        lead={pt ? 'Software, dados e pesquisa. Em cada projeto, meu papel e o que construí.' : 'Software, data and research. My role and contribution in every project.'} />
      <div className="rail-status" aria-hidden="true">
        <span className="mono"><span data-rail-index>1</span>/{total}</span>
        <span className="segments">{Array.from({ length: total }, (_, index) => <i key={index} data-rail-segment={index} />)}</span>
      </div>
    </div>
    <div className="rail" data-rail>
      <ol className="rail__track" data-rail-track aria-label={pt ? 'Projetos em destaque' : 'Featured projects'}>
        {featured.map((project, index) => <li className="rail__item" key={project.slug}>
          <article className="project-card" data-project-slug={project.slug}>
            <div className="project-card__body chamfer-md">
              <div className="project-card__media" data-scan>
                {project.cover && <Picture name={project.cover} width={project.coverWidth ?? 1400} height={project.coverHeight ?? 875} alt={`${project.title} — ${pt ? 'captura do projeto' : 'project screenshot'}`} />}
                <span className="project-card__count mono" aria-hidden="true">{String(index + 1).padStart(2, '0')}/{String(featured.length).padStart(2, '0')}</span>
              </div>
              <div className="project-card__head">
                <p className="mono project-card__context">{projectGroups.find(group => group.id === project.category)?.[locale]} {'//'} {project.year}</p>
                <h3>{project.title}</h3>
                <div className="project-card__byline"><ProjectMeta project={project} locale={locale} /><ProjectContributors project={project} locale={locale} compact /></div>
              </div>
              <div className="project-card__main">
                <p className="project-card__problem">{project.summary[locale]}</p>
                <dl className="project-card__facts">
                  <div><dt className="mono">{pt ? 'PAPEL' : 'ROLE'}</dt><dd>{project.role[locale]}</dd></div>
                </dl>
              </div>
              <div className="project-card__side">
                {project.metrics && <dl className="project-card__facts"><div><dt className="mono">{pt ? 'RESULTADO' : 'RESULT'}</dt><dd><ul className="chevron-list">{project.metrics.map(metric => <li key={metric.en}>{metric[locale]}</li>)}</ul></dd></div></dl>}
                <ul className="tag-list" aria-label="Stack">{project.stack.map(item => <li key={item}><Tag>{item}</Tag></li>)}</ul>
              </div>
              <div className="project-card__actions">
                <Button href={caseHref(project, locale)}>{pt ? 'Estudo de caso' : 'Case study'}</Button>
                {project.links.live && <TextLink href={project.links.live} external>{pt ? 'Ao vivo' : 'Live'}</TextLink>}
                {project.links.source && <TextLink href={project.links.source} external>{pt ? 'Código' : 'Source'}</TextLink>}
              </div>
            </div>
          </article>
        </li>)}
        <li className="rail__item rail__item--all">
          <a className="see-all lock" href={pageHref.projects[locale]}>
            <span className="see-all__body chamfer-lg">
              <span className="mono">{String(total).padStart(2, '0')}/{String(total).padStart(2, '0')}</span>
              <strong>{pt ? 'Ver todos' : 'See all'}</strong>
              <span>{pt ? `Todos os ${projects.length} projetos, incluindo mais ${others} pessoais, acadêmicos, de pesquisa e embarcados` : `All ${projects.length} projects, including ${others} more personal, academic, research and embedded ones`} →</span>
            </span>
          </a>
        </li>
      </ol>
    </div>
  </section>
}
