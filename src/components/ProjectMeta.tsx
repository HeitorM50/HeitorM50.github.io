import { collaborationLabels, type Locale, type Project } from '@/data/portfolio'

export function ProjectMeta({ project, locale }: { project: Project; locale: Locale }) {
  return <div className="project-meta">
    {project.collaboration && <span>{collaborationLabels[project.collaboration][locale]}</span>}
    {project.status && <span>{project.status[locale]}</span>}
  </div>
}
