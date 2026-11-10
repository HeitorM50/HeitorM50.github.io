import { collaborationLabels, type Locale, type Project } from '@/data/portfolio'
import { Glyph } from './hud/Glyph'

export function ProjectMeta({ project, locale }: { project: Project; locale: Locale }) {
  return <div className="project-meta">
    {project.recognition && <span className="project-recognition tag tag--highlight chamfer-sm"><Glyph name="estrela" />{project.recognition[locale]}</span>}
    {project.collaboration && <span className="tag tag--meta chamfer-sm">{collaborationLabels[project.collaboration][locale]}</span>}
    {project.status && <span className="tag tag--meta chamfer-sm">{project.status[locale]}</span>}
  </div>
}
