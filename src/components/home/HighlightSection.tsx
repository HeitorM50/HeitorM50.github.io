import { caseHref, experiences, projects, type Locale } from '@/data/portfolio'
import { Button } from '../hud/Button'
import { SectionHeader } from '../hud/SectionHeader'
import { DataPanel, Tag } from '../hud/Panel'
import { ProjectContributors } from '../ProjectContributors'

// 02 Destaque // fixado. "Tela de resultado de corrida" com os dois 1º lugares
// registrados nos dados (Hindsight e Sleep 5). Contador P12 → P1 na fase 7.
export function HighlightSection({ locale }: { locale: Locale }) {
  const pt = locale === 'pt'
  const hindsight = projects.find(project => project.slug === 'hindsight')!
  const sleep = projects.find(project => project.slug === 'pmi-sleep-5')!
  const ibm = experiences.find(experience => experience.logo === 'IBM')!
  const pmi = experiences.find(experience => experience.logo === 'PMI')!
  return <section className="section highlight" id="destaque" aria-labelledby="highlight-title" data-section data-bg="liquid,neon" data-bg-word="P1 // HACKATHON">
    <div className="highlight__backdrop" aria-hidden="true"><span className="race-stripes" /><span className="giant-number giant-number--p1">P1</span></div>
    <div className="container">
      <SectionHeader id="destaque" giant={false} locale={locale} titleId="highlight-title" title={pt ? 'Resultado' : 'Result'} lead={ibm.company} />
      <div className="result-board">
        <div className="result-board__position" aria-hidden="true"><span className="mono">POS</span><strong data-position-counter>P1</strong></div>
        <div className="result-board__main" data-project-slug="hindsight">
          <div className="result-board__tags"><Tag tone="highlight">{pt ? 'Destaque' : 'Highlight'}</Tag><Tag tone="live">● {ibm.period[locale]}</Tag></div>
          <p className="result-board__rank">{hindsight.recognition![locale]}</p>
          <h3 className="result-board__project">HINDSIGHT</h3>
          <p className="result-board__team mono">{pt ? 'EQUIPE OSBIRUBOB · 5 INTEGRANTES' : 'OSBIRUBOB TEAM · 5 MEMBERS'}</p>
          <p className="result-board__summary">{ibm.summary[locale]}</p>
          <p className="result-board__detail">{ibm.detail[locale]} {ibm.highlight[locale]}</p>
          <div className="result-board__data" data-stagger>{hindsight.metrics!.map((metric, index) => <DataPanel key={metric.en} tab={`${pt ? 'DADOS' : 'DATA'} 0${index + 1}`} value={metric[locale].split(' ')[0]} lines={[metric[locale].split(' ').slice(1).join(' ')]} />)}</div>
          <ProjectContributors project={hindsight} locale={locale} />
          <div className="result-board__actions">
            <Button href={caseHref(hindsight, locale)} className="hero-award">{pt ? 'Estudo de caso' : 'Case study'}</Button>
            {hindsight.links.live && <Button href={hindsight.links.live} variant="secondary" external>{pt ? 'Ver ao vivo' : 'Live demo'}</Button>}
          </div>
        </div>
      </div>
      <a className="result-row lock" href={caseHref(sleep, locale)} data-project-slug="pmi-sleep-5">
        <span className="result-row__pos">P1</span>
        <span className="result-row__body"><strong>{sleep.recognition![locale]}</strong><span className="mono">{pmi.company}</span><span className="result-row__note">{pmi.detail[locale]}</span></span>
        <span className="result-row__cta mono">{pt ? 'ESTUDO DE CASO' : 'CASE STUDY'} →</span>
      </a>
    </div>
  </section>
}
