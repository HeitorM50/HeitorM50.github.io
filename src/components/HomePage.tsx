/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Header } from './Header'
import { EmbeddedSection } from './EmbeddedSection'
import { ProjectMeta } from './ProjectMeta'
import { SqueezeCarousel } from '@/components/ui/carousel-squeeze'
import NeuralBackground from '@/components/ui/flow-field-background'
import ProfileCard from '@/components/ui/profile-card'
import { LiquidButton } from '@/components/ui/liquid-glass-button'
import { Timeline, type TimelineEntry } from '@/components/ui/timeline'
import { caseHref, experiences, projects, projectGroups, site, stackGroups, type Locale, type Project } from '@/data/portfolio'

const stackIcons: Record<string, string> = {
  Python: 'python', TypeScript: 'typescript', 'C++': 'cplusplus', Rust: 'rust', Java: 'openjdk',
  React: 'react', SvelteKit: 'svelte', 'Node.js': 'nodedotjs', 'D3.js': 'd3dotjs', PostgreSQL: 'postgresql', Supabase: 'supabase',
  Docker: 'docker', 'GitHub Actions': 'githubactions', pytest: 'pytest', Vitest: 'vitest', Git: 'git', Linux: 'linux',
  ESP32: 'espressif', Arduino: 'arduino', Godot: 'godotengine', NumPy: 'numpy'
}

function ProjectButtons({ project, locale }: { project: Project; locale: Locale }) {
  const pt = locale === 'pt'
  return <div className="project-buttons">
    {project.featured && <LiquidButton asChild><Link href={caseHref(project, locale)}>{pt ? 'Estudo de caso' : 'Case study'}</Link></LiquidButton>}
    {project.links.live && <LiquidButton asChild variant={project.featured ? 'outline' : 'default'}><a href={project.links.live} target="_blank" rel="noreferrer">{pt ? 'Ver ao vivo' : 'Live demo'} ↗</a></LiquidButton>}
    {project.links.source && <a className="text-action" href={project.links.source} target="_blank" rel="noreferrer">{pt ? 'Código' : 'Source'} ↗</a>}
  </div>
}

export function HomePage({ locale }: { locale: Locale }) {
  const pt = locale === 'pt'
  const catalogue = projects.filter(project => project.category !== 'embedded')
  const timelineData: TimelineEntry[] = experiences.map(experience => ({
    title: experience.period[locale],
    content: <article className="experience-card">
      <div className="experience-main">
        <header><span>{experience.logo}</span><div><h4>{experience.role[locale]}</h4><p>{experience.company}</p></div></header>
        <p>{experience.summary[locale]}</p>
        <ul><li>{experience.detail[locale]}</li><li>{experience.highlight[locale]}</li></ul>
      </div>
      <aside>
        <div><small>{pt ? 'PRINCIPAL RESULTADO' : 'KEY RESULT'}</small><strong>{experience.metricValue[locale]}</strong><p>{experience.metric[locale]}</p></div>
        <div><small>{pt ? 'STACK NO PERÍODO' : 'STACK AT THE TIME'}</small><div className="tech-list">{experience.stack.map(item => <span key={item}>{item}</span>)}</div></div>
      </aside>
    </article>
  }))
  const personSchema = {
    '@context': 'https://schema.org', '@type': 'Person', name: site.fullName, alternateName: site.name,
    url: pt ? site.url : `${site.url}/en/`, email: `mailto:${site.email}`,
    sameAs: [site.github, site.linkedin], jobTitle: pt ? 'Estudante de Engenharia de Software' : 'Software Engineering Student'
  }

  return <div className="legacy-page refined-home">
    <NeuralBackground className="fixed inset-0 -z-10" />
    <Header locale={locale} alternateHref={pt ? '/en/' : '/'} />
    <main>
      <section className="hero legacy-section" id="sobre" aria-labelledby="hero-title">
        <div className="wide-shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{pt ? 'ABERTO A ESTÁGIO · BRASÍLIA OU REMOTO' : 'OPEN TO INTERNSHIPS · BRASÍLIA OR REMOTE'}</p>
            <p className="hero-name">Heitor Ricardo</p>
            <h1 id="hero-title">{pt ? <>Engenharia de Software.<br />Entre código e <span className="shine-text">mundo real.</span></> : <>Software Engineering.<br />Between code and the <span className="shine-text">real world.</span></>}</h1>
            <p className="hero-intro">{pt ? 'Estudante na UnB. Desenvolvo backend, soluções de dados e sistemas embarcados com Python, TypeScript, C++ e Rust.' : 'Student at UnB. I build backends, data solutions and embedded systems with Python, TypeScript, C++ and Rust.'}</p>
            <p className="hero-bio">{pt ? 'Curso Engenharia de Software na UnB, com conclusão prevista para março de 2029, e Análise e Desenvolvimento de Sistemas no GRAN. Minha formação conecta desenvolvimento de software, pesquisa e trabalho em equipe.' : 'I study Software Engineering at UnB, with graduation expected in March 2029, and Systems Analysis and Development at GRAN. My education connects software development, research and teamwork.'}</p>
            <div className="hero-actions">
              <LiquidButton asChild size="xl"><a href="#projetos">{pt ? 'Ver projetos' : 'See my work'}</a></LiquidButton>
              <LiquidButton asChild variant="outline" size="xl"><a href={site.cv} target="_blank" rel="noreferrer">{pt ? 'Baixar CV' : 'Download CV'}<small>PDF</small></a></LiquidButton>
            </div>
          </div>
          <ProfileCard className="portrait-card hero-portrait" avatarUrl="/media/retrato.webp" avatarAvifUrl="/media/retrato.avif" name={site.name} title={pt ? 'Engenharia de Software · UnB' : 'Software Engineering · UnB'} eager />
        </div>
      </section>

      <section className="legacy-section" id="projetos" aria-labelledby="projects-title">
        <div className="content-shell">
          <span id="outros-projetos" className="anchor-alias" aria-hidden="true" />
          <div className="split-heading"><div><p className="section-index">01 — {pt ? 'PROJETOS' : 'PROJECTS'}</p><h2 className="section-title" id="projects-title">{pt ? 'Do problema à entrega.' : 'From problem to delivery.'}</h2></div><p className="regular-note">{pt ? 'Software, dados e pesquisa. Em cada projeto, meu papel e o que construí.' : 'Software, data and research. My role and contribution in every project.'}</p></div>
          <SqueezeCarousel label={pt ? 'Projetos' : 'Projects'} previousLabel={pt ? 'Projeto anterior' : 'Previous project'} nextLabel={pt ? 'Próximo projeto' : 'Next project'}
            filterLabel={pt ? 'Filtrar projetos' : 'Filter projects'} defaultFilterId="featured"
            filters={[
              { id: 'featured', label: pt ? 'Destaques' : 'Featured', slideIds: catalogue.filter(project => project.featured).map(project => project.slug) },
              { id: 'all', label: pt ? 'Todos os projetos' : 'All projects', slideIds: catalogue.map(project => project.slug), hash: '#outros-projetos' }
            ]}
            slides={catalogue.map(project => ({
              id: project.slug, title: project.title, description: project.summary[locale],
              image: project.cover ? `/media/${project.cover}.webp` : undefined,
              imageWidth: project.coverWidth, imageHeight: project.coverHeight,
              imageAlt: `${project.title} — ${pt ? 'captura do projeto' : 'project screenshot'}`,
              background: 'linear-gradient(135deg, var(--solid), color-mix(in oklab, var(--accent) 24%, var(--solid)))',
              content: <><div className="sq-context">{projectGroups.find(group => group.id === project.category)?.[locale]} <span>/ {project.year}</span></div><ProjectMeta project={project} locale={locale} /><p className="project-contribution"><strong>{pt ? 'Minha contribuição' : 'My contribution'}</strong>{project.role[locale]}</p><div className="tech-list">{project.stack.map(item => <span key={item}>{item}</span>)}</div><ProjectButtons project={project} locale={locale} /></>
            }))} />
          <p className="catalogue-note">{pt ? 'Hardware e telemetria têm um espaço próprio: ' : 'Hardware and telemetry have their own space: '}<a className="text-action" href="#embarcados">{pt ? 'Lab de Embarcados' : 'Embedded Lab'} ↗</a></p>
        </div>
      </section>

      <EmbeddedSection locale={locale} />

      <section className="legacy-section timeline-section" id="exp" aria-labelledby="timeline-title">
        <div className="content-shell"><p className="section-index">03 — {pt ? 'TRAJETÓRIA' : 'TIMELINE'}</p><Timeline data={timelineData} heading={pt ? 'Linha do tempo' : 'Career timeline'} description={pt ? 'Da formação às experiências em que assumi mais responsabilidade.' : 'From education to experiences with growing responsibility.'} /></div>
      </section>

      <section className="legacy-section" id="stack" aria-labelledby="stack-title">
        <div className="content-shell">
          <div className="split-heading"><div><p className="section-index">04 — STACK</p><h2 className="section-title" id="stack-title">{pt ? 'Ferramentas do dia a dia' : 'Everyday tools'}</h2></div><p className="regular-note">{pt ? 'Tecnologias usadas nos projetos e experiências acima.' : 'Technologies used in the projects and experiences above.'}</p></div>
          <div className="stack-grid">{stackGroups.map((group, groupIndex) => <article className="stack-card" key={group.en}><header><span style={{ '--dot-hue': `${285 + groupIndex * 55}` } as CSSProperties} />{group[locale]}<small>{String(group.items.length).padStart(2, '0')}</small></header><div>{group.items.map(item => <span className="stack-chip" key={item}>{stackIcons[item] && <img src={`/assets/icons/ic_${stackIcons[item]}.svg`} alt="" loading="lazy" decoding="async" />} {item}</span>)}</div></article>)}</div>
        </div>
      </section>

      <section className="legacy-section contact-section" id="contato" aria-labelledby="contact-title">
        <div className="contact-shell"><p className="section-index">05 — {pt ? 'CONTATO' : 'CONTACT'}</p><h2 className="shine-text" id="contact-title">{pt ? 'Vamos conversar?' : 'Let’s talk.'}</h2><p>{pt ? 'Para oportunidades de estágio, projetos e boas conversas sobre tecnologia.' : 'For internship opportunities, projects and good conversations about technology.'}</p><LiquidButton asChild size="xl" className="email-liquid-button"><a href={`mailto:${site.email}`}>{site.email}</a></LiquidButton><div><a href={site.github} target="_blank" rel="noreferrer">GITHUB</a><a href={site.linkedin} target="_blank" rel="noreferrer">LINKEDIN</a><a href={site.cv} target="_blank" rel="noreferrer">CV · PDF</a></div></div>
      </section>
    </main>
    <footer className="site-footer"><span>© {new Date().getFullYear()} {site.name}</span><span>REACT · NEXT.JS · NEXTRA · BRASÍLIA</span></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
  </div>
}
