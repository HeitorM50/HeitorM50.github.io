import type { MetadataRoute } from 'next'
import { projects, site } from '@/data/portfolio'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const primary = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: 'monthly' as const, priority: 1 },
    { url: `${site.url}/en/`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 }
  ]
  const cases = projects.filter((project) => project.featured).flatMap((project) => [
    { url: `${site.url}/projetos/${project.slug}/`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${site.url}/en/projects/${project.slug}/`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 }
  ])
  return [...primary, ...cases]
}
