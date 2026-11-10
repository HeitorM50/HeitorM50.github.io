import { benchPhotos, projects, site, type Locale } from '@/data/portfolio'
import { pageHref } from '@/data/sections'
import { Header } from './Header'
import { DuotoneFilter } from './hud/Duotone'
import { ContraBackground } from './hud/ContraBackground'
import { HudHeader } from './hud/SectionHeader'
import { DataPanel, Stripe, Tag } from './hud/Panel'
import { Glyph } from './hud/Glyph'
import { TextLink } from './hud/Button'
import { Picture } from './Picture'
import { ProjectMeta } from './ProjectMeta'
import { ProjectContributors } from './ProjectContributors'

// Página própria da UnBaja (embarcados). Saiu do meio da home por decisão do
// Heitor; a home leva até aqui por botão. Vista explodida do barramento CAN.
// Dados que ainda não existem (nomes dos módulos, IDs CAN, taxa) ficam como placeholder visível.
export function UnbajaPage({ locale }: { locale: Locale }) {
  const pt = locale === 'pt'
  return <div className="page page--sub">
    <DuotoneFilter />
    <ContraBackground word={'UNBAJA // CAN'} />
    <Header locale={locale} alternateHref={pageHref.unbaja[pt ? 'en' : 'pt']} />
    <main id="conteudo"><EmbeddedSection locale={locale} /></main>
    <footer className="data-footer data-footer--case"><div className="container data-footer__row"><p className="mono">© {new Date().getFullYear()} {site.name}</p><span className="barcode" aria-hidden="true" /><span className="seal mono" aria-hidden="true">V2 {'//'} HR.SYS</span></div></footer>
  </div>
}

function EmbeddedSection({ locale }: { locale: Locale }) {
  const pt = locale === 'pt'
  const embedded = projects.filter(project => project.category === 'embedded')
  const photo = benchPhotos[0]
  const nodes = [1, 2, 3, 4]
  return <section className="section embedded" id="embarcados" aria-labelledby="embedded-title" data-bg="neon,glitch" data-bg-word="UNBAJA // CAN">
    <div className="embedded__backdrop" aria-hidden="true"><span className="giant-number">54</span></div>
    <div className="container">
      <TextLink href={pt ? '/#perfil' : '/en/#perfil'}>← {pt ? 'Voltar ao portfólio' : 'Back to the portfolio'}</TextLink>
      <HudHeader level={1} label={pt ? 'UNBAJA // EMBARCADOS' : 'UNBAJA // EMBEDDED'} number="54" giant={false} titleId="embedded-title" title={pt ? 'Do sensor ao software' : 'From sensor to software'}
        lead={pt ? 'No Baja, o código encontra o mundo físico. Sensores, comunicação e decisões técnicas precisam funcionar juntos — na bancada e dentro do carro.' : 'In Baja, code meets the physical world. Sensors, communication and technical decisions need to work together — on the bench and inside the car.'} />

      <div className="embedded__grid">
        <figure className="can-diagram chamfer-md" aria-labelledby="can-caption">
          <figcaption id="can-caption" className="mono">{pt ? 'BARRAMENTO CAN // VISTA EXPLODIDA' : 'CAN BUS // EXPLODED VIEW'}</figcaption>
          <ol className="can-diagram__nodes" data-can-nodes>{nodes.map(node => <li className="telemetry-module chamfer-sm" key={node}>
            <span className="mono">{pt ? 'NÓ' : 'NODE'} 0{node} {'//'} ECU</span>
            <strong className="placeholder">[{pt ? 'NOME DO MÓDULO' : 'MODULE NAME'}]</strong>
            <span className="mono placeholder">ID [{pt ? 'IDs CAN' : 'CAN IDs'}]</span>
          </li>)}</ol>
          <div className="can-bus" aria-hidden="true"><span>CAN_H</span><span>CAN_L</span></div>
          <ol className="can-diagram__path">
            <li className="telemetry-module telemetry-module--gateway chamfer-sm"><span className="mono">GATEWAY</span><strong>ESP32</strong></li>
            <li className="telemetry-module chamfer-sm"><span className="mono">{pt ? 'INTERFACE DE BORDO' : 'ON-BOARD INTERFACE'}</span><strong>TFT</strong></li>
          </ol>
          <p className="can-diagram__rate mono">{pt ? 'TAXA DO BARRAMENTO' : 'BUS RATE'} {'//'} <span className="placeholder">[{pt ? 'TAXA DO BARRAMENTO' : 'BUS RATE'}]</span></p>
        </figure>

        <div className="embedded__side">
          <div className="alert-panel">
            <p className="alert-panel__head"><Glyph name="alerta" /> {pt ? 'ATENÇÃO // ALTA TENSÃO' : 'WARNING // HIGH VOLTAGE'}</p>
            <ul className="mono chevron-list">
              <li>{pt ? 'LÍDER DE ELETRÔNICA // 4 INTEGRANTES' : 'ELECTRONICS LEAD // 4 MEMBERS'}</li>
              <li>{pt ? 'FIRMWARE C/C++ // ESP32 + ARDUINO' : 'C/C++ FIRMWARE // ESP32 + ARDUINO'}</li>
              <li>{pt ? 'BAJA SAE NACIONAL 2026' : 'BAJA SAE NACIONAL 2026'}</li>
            </ul>
            <Stripe tone="warning" loop />
          </div>
          <div className="embedded__data">
            <DataPanel tab={pt ? 'NÓS' : 'NODES'} value="4" lines={['ECU']} />
            <DataPanel tab={pt ? 'REDE' : 'NETWORK'} value="CAN" lines={['CAN_H / CAN_L']} />
            <DataPanel tab={pt ? 'CARRO' : 'CAR'} value="Nº 54" lines={['UNBAJA']} />
          </div>
          <div className="signal-meter chamfer-md">
            <p className="mono"><span>{pt ? 'SINAL ILUSTRATIVO' : 'ILLUSTRATIVE SIGNAL'}</span><span className="status-live">● LIVE</span></p>
            <svg viewBox="0 0 320 80" preserveAspectRatio="none" aria-hidden="true"><path data-signal pathLength={1} d="M0 40 L20 40 L28 14 L40 66 L52 14 L64 66 L72 40 L110 40 L118 20 L130 60 L142 20 L154 60 L162 40 L200 40 L208 14 L220 66 L232 14 L244 66 L252 40 L290 40 L298 26 L310 54 L320 40" /></svg>
            <span className="signal-meter__sync mono">SYNC</span>
          </div>
        </div>
      </div>

      <div className="telemetry-path">
        <div><p className="mono">{pt ? 'NO CARRO · CONSTRUÍDO' : 'ON THE CAR · BUILT'}</p><ol className="chevron-list"><li>{pt ? 'Sensores / ECUs' : 'Sensors / ECUs'}</li><li>CAN → ESP32</li><li>{pt ? 'Display do piloto' : 'Driver display'}</li></ol></div>
        <div><p className="mono">{pt ? 'A PARTIR DO ESP32 · EXPANSÃO EM DESENVOLVIMENTO' : 'FROM THE ESP32 · EXPANSION IN DEVELOPMENT'}</p><ol className="chevron-list"><li>Wi-Fi → API</li><li>{pt ? 'Decodificação & histórico' : 'Decoding & history'}</li><li>{pt ? 'Análise pós-teste' : 'Post-test analysis'}</li></ol></div>
      </div>

      <div className="embedded__projects" data-stagger>
        {embedded.map((project, index) => <article className="module-card chamfer-md" key={project.slug} data-project-slug={project.slug}>
          <p className="mono module-card__index">0{index + 1} {'//'} {index === 0 ? 'HARDWARE + FIRMWARE' : 'BACKEND + DATA'}</p>
          <ProjectMeta project={project} locale={locale} />
          <h2>{index === 0 && !pt ? 'UnBaja · Embedded telemetry' : project.title}</h2>
          <p>{project.summary[locale]}</p>
          <p className="contribution"><strong className="mono">{pt ? 'MINHA CONTRIBUIÇÃO' : 'MY CONTRIBUTION'}</strong>{project.role[locale]}</p>
          {index === 1 && <p className="contribution"><strong className="mono">STATUS</strong>{pt ? 'Já implementado: esqueleto da API e ingestão inicial. Próximas etapas: decodificação, persistência temporal e consultas.' : 'Implemented: API foundation and initial ingestion. Next steps: decoding, time-series persistence and queries.'}</p>}
          <ul className="tag-list" aria-label="Stack">{project.stack.map(item => <li key={item}><Tag>{item}</Tag></li>)}</ul>
          <ProjectContributors project={project} locale={locale} />
          {project.links.source && <TextLink href={project.links.source} external>{pt ? 'Código e documentação' : 'Code and documentation'}</TextLink>}
        </article>)}
        {photo && <figure className="image-window">
          <div className="image-window__tabs" aria-hidden="true"><span /><span /><span className="mono">NUMBER: 0XHR-54</span></div>
          <div className="image-window__frame" data-scan><Picture name={photo.name} width={photo.width} height={photo.height} alt={photo.alt[locale]} className="duotone" /></div>
          <figcaption>{photo.caption[locale]}</figcaption>
        </figure>}
      </div>
    </div>
  </section>
}
