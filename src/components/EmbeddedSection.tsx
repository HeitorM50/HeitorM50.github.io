import { ArrowLeft, ArrowUpRight, ChevronDown, Cpu, Radio, Server } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { benchPhotos, projects, type Locale } from '@/data/portfolio'
import { EmbeddedScene } from './EmbeddedScene'
import { Picture } from './Picture'
import { ProjectMeta } from './ProjectMeta'
import { EmbeddedLabTrigger } from './EmbeddedLabTrigger'
import { LiquidButton } from './ui/liquid-glass-button'

export function EmbeddedSection({ locale }: { locale: Locale }) {
  const pt = locale === 'pt'
  const embedded = projects.filter(project => project.category === 'embedded')
  return <section className="legacy-section embedded-section" id="embarcados" aria-labelledby="embedded-title">
    <div className="content-shell">
      <p className="section-index">02 — {pt ? 'EMBARCADOS' : 'EMBEDDED SYSTEMS'}</p>
      <Card className="embedded-hero">
        <div className="embedded-intro">
          <p className="embedded-kicker"><span /> UNBAJA SAE · UnB</p>
          <h2 id="embedded-title">{pt ? <>Do sensor<br />ao <span>software.</span></> : <>From sensor<br />to <span>software.</span></>}</h2>
          <p>{pt ? 'No Baja, o código encontra o mundo físico. Sensores, comunicação e decisões técnicas precisam funcionar juntos — na bancada e dentro do carro.' : 'In Baja, code meets the physical world. Sensors, communication and technical decisions need to work together — on the bench and inside the car.'}</p>
          <div className="embedded-facts"><span><strong>4</strong> {pt ? 'nós ECU' : 'ECU nodes'}</span><span><strong>CAN</strong> {pt ? 'comunicação' : 'communication'}</span><span><strong>TFT</strong> {pt ? 'interface de bordo' : 'on-board interface'}</span></div>
          <EmbeddedLabTrigger locale={locale} />
        </div>
        <EmbeddedScene locale={locale} />
      </Card>
      <details className="embedded-lab" id="embedded-projects">
        <summary className="lab-fallback liquid-glass-button liquid-glass-button--default" data-liquid-glass><Cpu size={22} aria-hidden="true" /><span>{pt ? 'Explorar Lab' : 'Explore Lab'}</span><ChevronDown className="lab-chevron" size={22} aria-hidden="true" /></summary>
        <div className="embedded-lab-content">
          <header className="embedded-lab-heading">
            <div><p className="section-index">UNBAJA SAE · UnB</p><h3 id="lab-title" tabIndex={-1}>{pt ? 'Lab de Embarcados' : 'Embedded Lab'}</h3></div>
            <LiquidButton type="button" variant="outline" data-lab-close className="lab-close"><ArrowLeft aria-hidden="true" />{pt ? 'Voltar ao portfólio' : 'Back to portfolio'}</LiquidButton>
          </header>
          <div className="lab-workbench">
          <p className="lab-workbench-label">HARDWARE / FIRMWARE / BACKEND</p>
      <div className="telemetry-path" aria-label={pt ? 'Caminho dos dados de telemetria' : 'Telemetry data flow'}>
        <div><span className="path-label">{pt ? 'NO CARRO · CONSTRUÍDO' : 'ON THE CAR · BUILT'}</span><ol><li>{pt ? 'Sensores / ECUs' : 'Sensors / ECUs'}</li><li>CAN → ESP32</li><li>{pt ? 'Display do piloto' : 'Driver display'}</li></ol></div>
        <div className="path-next"><span className="path-label">{pt ? 'A PARTIR DO ESP32 · EXPANSÃO EM DESENVOLVIMENTO' : 'FROM THE ESP32 · EXPANSION IN DEVELOPMENT'}</span><ol><li>Wi-Fi → API</li><li>{pt ? 'Decodificação & histórico' : 'Decoding & history'}</li><li>{pt ? 'Análise pós-teste' : 'Post-test analysis'}</li></ol></div>
      </div>
      <div className="embedded-projects">{embedded.map((project, index) => {
        const Icon = index === 0 ? Radio : Server
        return <article className="embedded-project" key={project.slug} data-project-slug={project.slug}>
          <div className="embedded-project-top"><Icon aria-hidden="true" size={24} /><span>0{index + 1} / {index === 0 ? 'HARDWARE + FIRMWARE' : 'BACKEND + DATA'}</span></div>
          <ProjectMeta project={project} locale={locale} />
          <h3>{index === 0 && !pt ? 'UnBaja · Embedded telemetry' : project.title}</h3>
          <p>{project.summary[locale]}</p>
          <p className="project-contribution"><strong>{pt ? 'Minha contribuição' : 'My contribution'}</strong>{project.role[locale]}</p>
          {index === 1 && <p className="embedded-progress">{pt ? 'Já implementado: esqueleto da API e ingestão inicial. Próximas etapas: decodificação, persistência temporal e consultas.' : 'Implemented: API foundation and initial ingestion. Next steps: decoding, time-series persistence and queries.'}</p>}
          <div className="tech-list">{project.stack.map(item => <span key={item}>{item}</span>)}</div>
          {project.links.source && <a className="embedded-source text-action" href={project.links.source} target="_blank" rel="noreferrer">{pt ? 'Código e documentação' : 'Code and documentation'} <ArrowUpRight size={17} aria-hidden="true" /></a>}
        </article>
      })}</div>
      {benchPhotos.length > 0 && <div className="bench-gallery"><h3>{pt ? 'Na bancada de testes' : 'On the test bench'}</h3><div>{benchPhotos.map(photo => <figure key={photo.name}><Picture name={photo.name} width={photo.width} height={photo.height} alt={photo.alt[locale]} /><figcaption>{photo.caption[locale]}</figcaption></figure>)}</div></div>}
          </div>
        </div>
      </details>
    </div>
  </section>
}
