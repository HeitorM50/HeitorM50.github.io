/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { Header } from './Header'
import { Picture } from './Picture'
import NeuralBackground from '@/components/ui/flow-field-background'
import HeroScrollVideoReveal from '@/components/ui/hero-scroll-video-pin-reveal'
import { MetallicLogo } from '@/components/ui/metallic-paint'
import ProfileCard from '@/components/ui/profile-card'
import { caseHref, experiences, projects, site, stackGroups, type Locale, type Project } from '@/data/portfolio'

const homeCopy = {
  pt: {
    badge: 'ABERTO A ESTÁGIO · BACKEND, DADOS E SISTEMAS EMBARCADOS',
    headline: ['Estudante de', 'Engenharia de Software na'],
    intro: 'Trabalho com Python, TypeScript, C++ e Rust, entre backend, dados e sistemas embarcados. Nos últimos dois anos entreguei uma plataforma para cliente real, um sistema de telemetria em CAN para a equipe de Baja SAE e automações internas em um órgão público.',
    stats: [['2+', 'ANOS CODANDO'], ['11', 'PROJETOS'], ['4', 'LIDERADOS']],
    work: 'Ver projetos', cv: 'Baixar CV', deckHint: 'CLIQUE PARA TROCAR',
    about: 'SOBRE MIM',
    about1: 'Curso Engenharia de Software na UnB, com conclusão prevista para março de 2029, e Análise e Desenvolvimento de Sistemas no GRAN. Entrei na equipe de Baja SAE em 2024 e hoje lidero o subsistema de eletrônica, com quatro integrantes.',
    about2: 'Já trabalhei em web, dados e sistemas embarcados: uma plataforma de métricas de colaboração no GitHub, um hub administrativo em produção para um cliente real e o sistema de telemetria do Baja, com quatro nós ECU em barramento CAN. Em agosto de 2026 participei do hackathon do IBM TechXchange, num time de cinco. Procuro estágio em desenvolvimento, em Brasília ou remoto.',
    aboutStats: [['2+', 'ANOS CODANDO'], ['4', 'PRODUTOS NO AR'], ['Brasília', 'BASE · REMOTO OK']],
    featured: 'DESTAQUES', featuredTitle: 'Projetos em destaque', caseStudy: 'Estudo de caso', live: 'Ver ao vivo', source: 'Código',
    all: 'TODOS OS PROJETOS', allTitle: 'Grade de projetos', hover: 'PASSE O MOUSE — A COR SEGUE O CURSOR',
    stackTitle: 'Ferramentas do dia a dia', stackNote: 'Ferramentas que uso nos projetos listados aqui.',
    timeline: 'TRAJETÓRIA', timelineTitle: 'Linha do tempo', keyResult: 'PRINCIPAL RESULTADO', stackPeriod: 'STACK NO PERÍODO',
    contact: 'CONTATO', contactTitle: 'Aberto a estágio', contactBody: 'Procuro estágio em desenvolvimento, com foco em backend, dados ou sistemas embarcados. Em Brasília ou remoto.',
    footer: 'FEITO COM REACT · NEXT.JS · NEXTRA · BRASÍLIA, DF'
  },
  en: {
    badge: 'OPEN TO INTERNSHIPS · BACKEND, DATA AND EMBEDDED SYSTEMS',
    headline: ['Software', 'Engineering student at'],
    intro: 'I work with Python, TypeScript, C++ and Rust, across backend, data and embedded systems. Over the past two years I delivered a platform for a real client, a CAN telemetry system for the Baja SAE team and internal automation at a government agency.',
    stats: [['2+', 'YEARS CODING'], ['11', 'PROJECTS'], ['4', 'TEAM LED']],
    work: 'See my work', cv: 'Download CV', deckHint: 'CLICK TO SWAP',
    about: 'ABOUT ME',
    about1: "I'm studying Software Engineering at UnB, graduating in March 2029, and Systems Analysis and Development at GRAN. I joined the Baja SAE team in 2024 and now lead the electronics subsystem, with four members.",
    about2: "I've worked on web, data and embedded systems: a GitHub collaboration metrics platform, an admin hub in production for a real client and the Baja telemetry system, with four ECU nodes on a CAN bus. In August 2026 I took part in the IBM TechXchange hackathon, in a team of five. I'm looking for a development internship, in Brasília or remote.",
    aboutStats: [['2+', 'YEARS CODING'], ['4', 'SHIPPED PRODUCTS'], ['Brasília', 'BASED · REMOTE OK']],
    featured: 'FEATURED', featuredTitle: 'Featured projects', caseStudy: 'Case study', live: 'Live demo', source: 'Source',
    all: 'ALL PROJECTS', allTitle: 'Project grid', hover: 'HOVER — COLOR FOLLOWS THE CURSOR',
    stackTitle: 'Everyday tools', stackNote: 'Tools I use in the projects listed here.',
    timeline: 'TIMELINE', timelineTitle: 'Career timeline', keyResult: 'KEY RESULT', stackPeriod: 'STACK AT THE TIME',
    contact: 'CONTACT', contactTitle: 'Open to internships', contactBody: "I'm looking for a development internship focused on backend, data or embedded systems. In Brasília or remote.",
    footer: 'BUILT WITH REACT · NEXT.JS · NEXTRA · BRASÍLIA, BR'
  }
} as const

const stackIcons: Record<string, string> = {
  Python: 'python', TypeScript: 'typescript', 'C++': 'cplusplus', Rust: 'rust', Java: 'openjdk',
  React: 'react', SvelteKit: 'svelte', 'Node.js': 'nodedotjs', 'D3.js': 'd3dotjs', PostgreSQL: 'postgresql', Supabase: 'supabase',
  Docker: 'docker', 'GitHub Actions': 'githubactions', pytest: 'pytest', Vitest: 'vitest', Git: 'git', Linux: 'linux',
  ESP32: 'espressif', Arduino: 'arduino', Godot: 'godotengine', NumPy: 'numpy'
}

const deckProjects = ['crianex-hub', 'coops', 'extracao-rda']

function ProjectButtons({ project, locale }: { project: Project; locale: Locale }) {
  const text = homeCopy[locale]
  return <div className="project-buttons">
    <Link className="button button-primary" href={caseHref(project, locale)}>{text.caseStudy}</Link>
    {project.links.live && <a className="button button-primary" href={project.links.live} target="_blank" rel="noreferrer">{text.live}</a>}
    {project.links.source && <a className="button button-outline" href={project.links.source} target="_blank" rel="noreferrer">{text.source}</a>}
  </div>
}

export function HomePage({ locale }: { locale: Locale }) {
  const text = homeCopy[locale]
  const featured = projects.filter((project) => project.featured)
  const archive = projects.filter((project) => !project.featured)
  const deck = deckProjects.map((slug) => projects.find((project) => project.slug === slug)!).filter(Boolean)
  const personSchema = {
    '@context': 'https://schema.org', '@type': 'Person', name: site.fullName, alternateName: site.name,
    url: locale === 'pt' ? site.url : `${site.url}/en/`, email: `mailto:${site.email}`,
    sameAs: [site.github, site.linkedin], jobTitle: locale === 'pt' ? 'Estudante de Engenharia de Software' : 'Software Engineering Student'
  }

  return <div className="legacy-page">
    <NeuralBackground className="fixed inset-0 -z-10" />
    <Header locale={locale} alternateHref={locale === 'pt' ? '/en/' : '/'} />
    <main>
      <section className="hero legacy-section" aria-labelledby="hero-title">
        <div className="wide-shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{text.badge}</p>
            <h1 id="hero-title">{text.headline[0]}<br />{text.headline[1]} <span className="shine-text">UnB</span>.</h1>
            <p className="hero-intro">{text.intro}</p>
            <div className="hero-stats">{text.stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
            <div className="hero-actions">
              <a className="button button-primary shine-button" href="#projetos">{text.work}<span aria-hidden="true" /></a>
              <a className="button button-outline" href={site.cv} target="_blank" rel="noreferrer">{text.cv}<small>PDF</small></a>
            </div>
          </div>
          <div className="deck-wrap">
            <div className="project-deck" data-deck role="button" tabIndex={0} aria-label={text.deckHint}>
              {deck.map((project, index) => <article className="deck-card" data-deck-card data-position={index} key={project.slug}>
                <div className="deck-bar"><MetallicLogo className="deck-logo" /><strong>{project.title}</strong><span>{project.stack.slice(0, 3).join(' · ')}</span></div>
                <div className="deck-art">{project.cover && <Picture name={project.cover} alt={`${project.title} — screenshot`} width={project.coverWidth ?? 1400} height={project.coverHeight ?? 875} eager={index === 0} />}</div>
              </article>)}
            </div>
            <p className="deck-hint">{text.deckHint} <span data-deck-counter>01 / 03</span></p>
          </div>
        </div>
      </section>

      <section className="legacy-section" id="sobre" aria-labelledby="about-title">
        <div className="content-shell about-grid">
          <ProfileCard
            className="portrait-card"
            avatarUrl="/media/retrato.webp"
            avatarAvifUrl="/media/retrato.avif"
            name="Heitor Ricardo"
            title={locale === 'pt' ? 'Engenharia de Software · UnB' : 'Software Engineering · UnB'}
            handle="heitorm50"
            status={locale === 'pt' ? 'Aberto a estágio' : 'Open to internships'}
            showUserInfo={false}
            enableTilt
            behindGlowColor="rgba(190, 155, 255, .52)"
            innerGradient="linear-gradient(145deg, rgba(201,176,255,.2) 0%, rgba(65,211,157,.1) 48%, rgba(3,4,7,.86) 100%)"
          />
          <div className="about-copy">
            <p className="section-index">01 — {text.about}</p><h2 className="sr-only" id="about-title">{text.about}</h2>
            <p>{text.about1}</p><p>{text.about2}</p>
            <div className="about-stats">{text.aboutStats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
          </div>
        </div>
      </section>

      <HeroScrollVideoReveal
        topText={locale === 'pt'
          ? <>Código é só o começo.<br />O que importa é chegar ao uso real.</>
          : <>Code is only the beginning.<br />What matters is reaching real use.</>}
        headingText={locale === 'pt'
          ? <>Construo entre software,<br />dados e hardware.</>
          : <>I build across software,<br />data and hardware.</>}
        tags={locale === 'pt'
          ? [
              { text: 'Backend', background: '#171a23' },
              { text: 'Dados', background: '#5146a8' },
              { text: 'Sistemas embarcados', background: '#d7ccff', color: '#171321' },
              { text: 'Liderança técnica', background: '#244b5a' },
            ]
          : [
              { text: 'Backend', background: '#171a23' },
              { text: 'Data', background: '#5146a8' },
              { text: 'Embedded systems', background: '#d7ccff', color: '#171321' },
              { text: 'Technical leadership', background: '#244b5a' },
            ]}
        subText={locale === 'pt'
          ? 'Cada projeto abaixo mostra decisões técnicas, limites e resultados.'
          : 'Each project below shows technical decisions, constraints and outcomes.'}
        bottomText={locale === 'pt'
          ? <>Do protótipo à entrega.<br />Com contexto, trade-offs e resultado.</>
          : <>From prototype to delivery.<br />With context, trade-offs and outcomes.</>}
      />

      <section className="legacy-section" id="projetos" aria-labelledby="featured-title">
        <div className="content-shell">
          <p className="section-index">02 — {text.featured}</p><h2 className="section-title" id="featured-title">{text.featuredTitle}</h2>
          <div className="featured-list">{featured.map((project, index) => <article className="featured-project" key={project.slug}>
            <Link className="featured-media" href={caseHref(project, locale)}>{project.cover && <Picture name={project.cover} alt={`${project.title} — screenshot`} width={project.coverWidth ?? 1400} height={project.coverHeight ?? 875} />}</Link>
            <div className="featured-copy"><p className="project-count">{String(index + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}</p><h3>{project.title}</h3><p>{project.summary[locale]} {project.role[locale]}</p><div className="tech-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div><ProjectButtons project={project} locale={locale} /></div>
          </article>)}</div>
        </div>
      </section>

      <section className="legacy-section" aria-labelledby="grid-title">
        <div className="content-shell">
          <div className="split-heading"><div><p className="section-index">03 — {text.all}</p><h2 className="section-title" id="grid-title">{text.allTitle}</h2></div><p>{text.hover}</p></div>
          <div className="project-grid" data-project-grid>{archive.map((project) => {
            const href = project.links.live ?? project.links.source
            const body = <><div className="grid-media">{project.cover && <Picture name={project.cover} alt={`${project.title} — screenshot`} width={project.coverWidth ?? 1200} height={project.coverHeight ?? 760} />}</div><div className="grid-copy"><div><strong>{project.title}</strong><span>{project.year}</span></div><p>{project.summary[locale]}</p><small>{project.stack.join(' · ')}</small></div></>
            return href ? <a className="grid-card" href={href} target="_blank" rel="noreferrer" key={project.slug}>{body}</a> : <article className="grid-card grid-card-static" key={project.slug}>{body}</article>
          })}</div>
        </div>
      </section>

      <section className="legacy-section" id="stack" aria-labelledby="stack-title">
        <div className="content-shell">
          <div className="split-heading"><div><p className="section-index">04 — STACK</p><h2 className="section-title" id="stack-title">{text.stackTitle}</h2></div><p className="regular-note">{text.stackNote}</p></div>
          <div className="stack-grid">{stackGroups.map((group, groupIndex) => <article className="stack-card" key={group.en}><header><span style={{ '--dot-hue': `${285 + groupIndex * 55}` } as CSSProperties} />{group[locale]}<small>{String(group.items.length).padStart(2, '0')}</small></header><div>{group.items.map((item) => <span className="stack-chip" key={item}>{stackIcons[item] && <img src={`/assets/icons/ic_${stackIcons[item]}.svg`} alt="" />} {item}</span>)}</div></article>)}</div>
        </div>
      </section>

      <section className="legacy-section" id="exp" aria-labelledby="timeline-title">
        <div className="content-shell" data-experience>
          <p className="section-index">05 — {text.timeline}</p><h2 className="section-title" id="timeline-title">{text.timelineTitle}</h2>
          <div className="experience-rail" role="tablist">{experiences.map((experience, index) => <button type="button" role="tab" aria-selected={index === 0} data-exp-index={index} key={experience.company}><span /><small>{experience.period[locale]}</small><strong>{experience.role[locale]}</strong></button>)}</div>
          <div className="experience-panels">{experiences.map((experience, index) => <article data-exp-panel={index} hidden={index !== 0} key={experience.company}>
            <div className="experience-main"><header><span>{experience.logo}</span><div><h3>{experience.role[locale]}</h3><p>{experience.company}</p></div></header><p>{experience.summary[locale]}</p><ul><li>{experience.detail[locale]}</li><li>{experience.highlight[locale]}</li></ul></div>
            <aside><div><small>{text.keyResult}</small><strong>{experience.metricValue[locale]}</strong><p>{experience.metric[locale]}</p></div><div><small>{text.stackPeriod}</small><div className="tech-list">{experience.stack.map((item) => <span key={item}>{item}</span>)}</div></div></aside>
          </article>)}</div>
        </div>
      </section>

      <section className="legacy-section contact-section" id="contato" aria-labelledby="contact-title">
        <div className="contact-shell"><p className="section-index">06 — {text.contact}</p><h2 className="shine-text" id="contact-title">{text.contactTitle}</h2><p>{text.contactBody}</p><a className="email-button shine-button" href={`mailto:${site.email}`}>{site.email}<span aria-hidden="true" /></a><div><a href={site.github} target="_blank" rel="noreferrer">GITHUB</a><a href={site.linkedin} target="_blank" rel="noreferrer">LINKEDIN</a><a href={site.cv} target="_blank" rel="noreferrer">CV · PDF</a></div></div>
      </section>
    </main>
    <footer className="site-footer"><span>© {new Date().getFullYear()} {site.name}</span><span>{text.footer}</span></footer>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
  </div>
}
