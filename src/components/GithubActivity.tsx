'use client'

import { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { site, type Locale } from '@/data/portfolio'
import { contributions, contributionTotal } from '@/lib/github-contributions'

export function GithubActivity({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null)
  const pt = locale === 'pt'
  useEffect(() => {
    let active = true
    let cleanup: (() => void) | undefined
    // Mesmo bundle em desenvolvimento e no export estático.
    const moduleUrl = '/vendor/embedded/portfolio-ui.js'
    import(/* webpackIgnore: true */ moduleUrl).then(module => {
      if (active && ref.current) cleanup = module.prepareContributionSkyline(ref.current)
    }).catch(() => {})
    return () => { active = false; cleanup?.() }
  }, [])
  const total = contributionTotal(contributions).toLocaleString(pt ? 'pt-BR' : 'en-US')
  const format = new Intl.DateTimeFormat(pt ? 'pt-BR' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
  const period = `${format.format(new Date(contributions.start))} — ${format.format(new Date(contributions.end))}`
  return <div ref={ref} className="github-activity" data-contribution-skyline data-locale={locale}
    data-start={contributions.start} data-counts={contributions.counts.join(',')}>
    <header className="github-activity-heading">
      <h3>{pt ? 'Atividade no GitHub' : 'GitHub activity'}</h3>
      <a className="text-action" href={site.github} target="_blank" rel="noreferrer">@{contributions.login} <ArrowUpRight size={15} aria-hidden="true" /></a>
    </header>
    <p className="github-activity-fallback"><strong>{total}</strong> {pt ? 'contribuições no último ano' : 'contributions in the last year'}<span>{period}</span></p>
    <div className="github-activity-mount" data-skyline-mount />
  </div>
}
