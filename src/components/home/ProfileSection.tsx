import Link from 'next/link'
import { copy, experiences, type Locale } from '@/data/portfolio'
import { pageHref } from '@/data/sections'
import { SectionHeader } from '../hud/SectionHeader'
import { Tag } from '../hud/Panel'
import { OrganizationMark } from '../OrganizationMark'

// 03 Perfil // vertical. Três cards numerados com os papéis (sequência legítima):
// UnBaja, MCTI e pesquisa na UnB — exatamente como estão em portfolio.ts.
export function ProfileSection({ locale }: { locale: Locale }) {
  const pt = locale === 'pt'
  const text = copy[locale]
  const roles = experiences.filter(experience => ['BAJA', 'MCTI', 'UnB'].includes(experience.logo))
  return <section className="section profile" id="perfil" aria-labelledby="profile-title" data-section data-bg="melt" data-bg-word={pt ? 'PERFIL' : 'PROFILE'}>
    <div className="container">
      <SectionHeader id="perfil" locale={locale} titleId="profile-title" title={pt ? 'Código e mundo real' : 'Code and the real world'} />
      <div className="profile__intro">
        <p className="lead" data-reveal-lines>{text.aboutBody}</p>
        <p data-reveal-lines>{text.aboutBody2}</p>
      </div>
      <ol className="role-cards" data-stagger>{roles.map((role, index) => <li className="role-card" key={role.logo}>
        <article className="role-card__body chamfer-md">
          <header className="role-card__head">
            <span className="role-card__number">{String(index + 1).padStart(2, '0')}</span>
            <OrganizationMark id={role.organizationId} />
          </header>
          <span className="role-card__rule" aria-hidden="true" />
          <h3>{role.role[locale]}</h3>
          <p className="role-card__company mono">{role.company} {'//'} {role.period[locale]}</p>
          <p>{role.summary[locale]}</p>
          <ul className="chevron-list mono"><li>{role.detail[locale]}</li><li>{role.highlight[locale]}</li></ul>
          <div className="role-card__metric"><span className="mono">{pt ? 'RESULTADO' : 'RESULT'}</span><strong>{role.metricValue[locale]}</strong><p>{role.metric[locale]}</p></div>
          <ul className="tag-list" aria-label="Stack">{role.stack.map(item => <li key={item}><Tag>{item}</Tag></li>)}</ul>
        </article>
      </li>)}</ol>
      <Link className="module-link lock" href={pageHref.unbaja[locale]} data-unbaja-link>
        <span className="module-link__body chamfer-lg">
          <span className="module-link__number" aria-hidden="true">54</span>
          <span className="module-link__copy">
            <span className="mono">UNBAJA {'//'} {pt ? 'EMBARCADOS' : 'EMBEDDED'} {'//'} CAN BUS</span>
            <strong>{pt ? 'Do sensor ao software' : 'From sensor to software'}</strong>
            <span>{pt ? 'Telemetria embarcada, barramento CAN e a API de telemetria — numa página própria.' : 'Embedded telemetry, the CAN bus and the telemetry API — on a page of their own.'}</span>
          </span>
          <span className="module-link__cta mono">{pt ? 'ABRIR' : 'OPEN'} →</span>
        </span>
      </Link>
    </div>
  </section>
}
