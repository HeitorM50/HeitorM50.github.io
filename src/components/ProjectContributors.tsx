/* eslint-disable @next/next/no-img-element */
import { contributors, type Contributor } from '@/data/contributors'
import type { Locale, Project } from '@/data/portfolio'

export function ProjectContributors({ project, locale }: { project: Project; locale: Locale }) {
  if (!project.contributors?.length) return null
  const label = project.collaboration === 'solo'
    ? (locale === 'pt' ? 'Autoria' : 'Author')
    : (locale === 'pt' ? 'Equipe' : 'Team')
  return <div className="project-contributors">
    <p className="contributors-label">{label}</p>
    <ul aria-label={label}>{project.contributors.map(id => {
      const person: Contributor = contributors[id]
      const initials = person.name.split(/\s+/).slice(0, 2).map(part => part[0]).join('')
      return <li key={id}><a href={`https://github.com/${person.github}`} target="_blank" rel="noreferrer" aria-label={`${person.name} — GitHub`}>
        <span className="contributor-avatar" aria-hidden="true">
          {person.avatar ? <img src={`/media/contributors/${person.avatar}.webp`} alt="" width={32} height={32} loading="lazy" decoding="async" /> : initials}
        </span>
        <span>{person.name}</span>
        <svg className="github-mark" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 .3a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.81 1.3 3.5 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.6-2.8 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.3c0 .32.22.69.83.57A12 12 0 0 0 12 .3Z" /></svg>
      </a></li>
    })}</ul>
  </div>
}
