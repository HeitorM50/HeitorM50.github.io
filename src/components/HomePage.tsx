import Link from 'next/link'
import { Header } from './Header'
import { Picture } from './Picture'
import { caseHref, copy, experiences, projects, site, stackGroups, type Locale, type Project } from '@/data/portfolio'

function Arrow() {
  return <span aria-hidden="true">↗</span>
}

function ProjectActions({ project, locale }: { project: Project; locale: Locale }) {
  const text = copy[locale]
  return (
    <div className="project-actions">
      <Link className="text-link" href={caseHref(project, locale)}>{text.caseCta} <span aria-hidden="true">→</span></Link>
      {project.links.live && <a className="small-link" href={project.links.live} target="_blank" rel="noreferrer">{text.liveCta} <Arrow /></a>}
      {project.links.source && <a className="small-link" href={project.links.source} target="_blank" rel="noreferrer">{text.sourceCta} <Arrow /></a>}
    </div>
  )
}

export function HomePage({ locale }: { locale: Locale }) {
  const text = copy[locale]
  const featured = projects.filter((project) => project.featured)
  const archive = projects.filter((project) => !project.featured)
  const alternateHref = locale === 'pt' ? '/en/' : '/'
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.fullName,
    alternateName: site.name,
    url: locale === 'pt' ? site.url : `${site.url}/en/`,
    email: `mailto:${site.email}`,
    sameAs: [site.github, site.linkedin],
    jobTitle: locale === 'pt' ? 'Estudante de Engenharia de Software' : 'Software Engineering Student',
    address: { '@type': 'PostalAddress', addressLocality: 'Brasília', addressCountry: 'BR' }
  }

  return (
    <>
      <Header locale={locale} alternateHref={alternateHref} />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="ambient ambient-one" />
          <div className="ambient ambient-two" />
          <div className="shell hero-grid">
            <div className="hero-copy">
              <p className="availability"><span />{text.badge}</p>
              <p className="eyebrow">{text.eyebrow}</p>
              <h1 id="hero-title">{text.headline}</h1>
              <p className="hero-intro">{text.intro}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#projetos">{text.primaryCta}<span aria-hidden="true">↓</span></a>
                <a className="button button-secondary" href={site.cv} target="_blank" rel="noreferrer">{text.secondaryCta}<Arrow /></a>
              </div>
              <ul className="proof-list" aria-label="Highlights">
                {text.proof.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>

            <div className="hero-visual" aria-label={locale === 'pt' ? 'Projeto Hindsight em destaque' : 'Featured Hindsight project'}>
              <div className="signal-label"><span>SELECTED / 01</span><span>2026</span></div>
              <Link href={caseHref(featured[0], locale)} className="hero-card">
                <Picture name="hindsight" alt="Interface do projeto Hindsight" width={1400} height={875} eager />
                <div className="hero-card-caption">
                  <div><span>Hindsight</span><small>REACT · TYPESCRIPT · EXPERIMENT</small></div>
                  <span aria-hidden="true">↗</span>
                </div>
              </Link>
              <div className="metric-float"><strong>−25,9%</strong><span>{locale === 'pt' ? 'overhead fixo' : 'fixed overhead'}</span></div>
            </div>
          </div>
        </section>

        <section className="section" id="projetos" aria-labelledby="projects-title">
          <div className="shell">
            <div className="section-heading">
              <div><p className="kicker">{text.selectedKicker}</p><h2 id="projects-title">{text.selectedTitle}</h2></div>
              <p>{text.selectedIntro}</p>
            </div>
            <div className="featured-list">
              {featured.map((project, index) => (
                <article className="featured-project" key={project.slug}>
                  <Link href={caseHref(project, locale)} className="project-media" aria-label={`${text.caseCta}: ${project.title}`}>
                    {project.cover && <Picture name={project.cover} alt={`${project.title} — screenshot`} width={project.coverWidth ?? 1200} height={project.coverHeight ?? 760} />}
                    <span className="project-number">0{index + 1}</span>
                  </Link>
                  <div className="project-copy">
                    <p className="project-meta">{project.year} · {project.stack.join(' · ')}</p>
                    <h3>{project.title}</h3>
                    <p className="project-summary">{project.summary[locale]}</p>
                    <p className="project-role"><span>{text.contribution}</span>{project.role[locale]}</p>
                    {project.metrics && <ul className="metric-list">{project.metrics.map((metric) => <li key={metric[locale]}>{metric[locale]}</li>)}</ul>}
                    <ProjectActions project={project} locale={locale} />
                  </div>
                </article>
              ))}
            </div>

            <div className="archive-heading"><p className="kicker">{text.archiveKicker}</p><h3>{text.archiveTitle}</h3></div>
            <div className="archive-grid">
              {archive.map((project) => {
                const href = project.links.live ?? project.links.source
                const content = <>
                  <div className="archive-top"><span>{project.year}</span><span aria-hidden="true">{href ? '↗' : '—'}</span></div>
                  <h4>{project.title}</h4><p>{project.summary[locale]}</p><small>{project.stack.join(' · ')}</small>
                </>
                return href
                  ? <a className="archive-card" href={href} target="_blank" rel="noreferrer" key={project.slug}>{content}</a>
                  : <article className="archive-card archive-card-static" key={project.slug}>{content}</article>
              })}
            </div>
          </div>
        </section>

        <section className="section section-muted" id="trajetoria" aria-labelledby="experience-title">
          <div className="shell">
            <div className="section-heading compact">
              <div><p className="kicker">{text.experienceKicker}</p><h2 id="experience-title">{text.experienceTitle}</h2></div>
            </div>
            <ol className="timeline">
              {experiences.map((experience, index) => (
                <li key={`${experience.company}-${index}`}>
                  <div className="timeline-index">0{index + 1}</div>
                  <div className="timeline-date">{experience.period[locale]}</div>
                  <div className="timeline-main"><h3>{experience.role[locale]}</h3><p className="company">{experience.company}</p><p>{experience.summary[locale]}</p></div>
                  <div className="timeline-proof"><strong>{experience.highlight[locale]}</strong><span>{experience.stack.join(' · ')}</span></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" id="sobre" aria-labelledby="about-title">
          <div className="shell about-grid">
            <div className="portrait-wrap">
              <Picture name="retrato" alt={locale === 'pt' ? 'Retrato de Heitor Ricardo' : 'Portrait of Heitor Ricardo'} width={1024} height={1024} />
              <span className="portrait-tag">BRASÍLIA · DF</span>
            </div>
            <div className="about-copy"><p className="kicker">{text.aboutKicker}</p><h2 id="about-title">{text.aboutTitle}</h2><p>{text.aboutBody}</p><p>{text.aboutBody2}</p></div>
            <div className="stack-panel"><p className="kicker">{text.stackKicker}</p>{stackGroups.map((group) => <div className="stack-row" key={group.en}><span>{group[locale]}</span><p>{group.items.join(' · ')}</p></div>)}</div>
          </div>
        </section>

        <section className="contact-section" id="contato" aria-labelledby="contact-title">
          <div className="shell contact-grid"><div><p className="kicker">{text.contactKicker}</p><h2 id="contact-title">{text.contactTitle}</h2></div><div><p>{text.contactBody}</p><a className="button button-primary" href={`mailto:${site.email}`}>{text.contactCta}<span aria-hidden="true">→</span></a></div></div>
        </section>
      </main>
      <footer className="site-footer"><div className="shell"><p>© {new Date().getFullYear()} {site.name}</p><p>{text.footer}</p><div><a href={site.github}>GitHub</a><a href={site.linkedin}>LinkedIn</a></div></div></footer>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
    </>
  )
}
