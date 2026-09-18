import { collaborationLabels, type Locale, type Project } from '@/data/portfolio'
import { Trophy } from 'lucide-react'

export function ProjectMeta({ project, locale }: { project: Project; locale: Locale }) {
  return <div className="project-meta">
    {project.recognition && <span className="project-recognition"><Trophy size={16} aria-hidden="true" />{project.recognition[locale]}</span>}
    {project.collaboration && <span>{collaborationLabels[project.collaboration][locale]}</span>}
    {project.status && <span>{project.status[locale]}</span>}
  </div>
}
