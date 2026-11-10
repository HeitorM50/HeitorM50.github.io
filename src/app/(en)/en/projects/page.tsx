import type { Metadata } from 'next'
import { AllProjectsPage } from '@/components/AllProjectsPage'

export const metadata: Metadata = {
  title: 'All projects',
  description: 'All of Heitor Ricardo’s projects: team products, personal tools, research and embedded systems.',
  alternates: { canonical: '/en/projects/', languages: { 'pt-BR': '/projetos/', en: '/en/projects/' } }
}

export default function Page() {
  return <AllProjectsPage locale="en" />
}
