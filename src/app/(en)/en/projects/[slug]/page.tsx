import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { importPage } from 'nextra/pages'
import { CaseStudyPage } from '@/components/CaseStudyPage'
import { getProject, projects, site } from '@/data/portfolio'

export const dynamicParams = false

export function generateStaticParams() {
  return projects.filter((project) => project.featured).map(({ slug }) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  const path = `/en/projects/${slug}/`
  return {
    title: project.title, description: project.summary.en,
    alternates: { canonical: path, languages: { 'pt-BR': `/projetos/${slug}/`, en: path } },
    openGraph: { type: 'article', locale: 'en', title: project.title, description: project.summary.en, url: `${site.url}${path}`, images: project.cover ? [{ url: `/media/${project.cover}.webp`, width: project.coverWidth, height: project.coverHeight, alt: project.title }] : [] },
    twitter: { card: 'summary_large_image', title: project.title, description: project.summary.en, images: project.cover ? [`/media/${project.cover}.webp`] : [] }
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project?.featured) notFound()
  const { default: Content } = await importPage(['en', 'projects', slug])
  return <CaseStudyPage project={project} locale="en"><Content /></CaseStudyPage>
}
