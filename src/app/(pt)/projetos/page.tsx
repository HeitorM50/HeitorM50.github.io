import type { Metadata } from 'next'
import { AllProjectsPage } from '@/components/AllProjectsPage'

export const metadata: Metadata = {
  title: 'Todos os projetos',
  description: 'Todos os projetos de Heitor Ricardo: produtos em equipe, ferramentas próprias, pesquisa e sistemas embarcados.',
  alternates: { canonical: '/projetos/', languages: { 'pt-BR': '/projetos/', en: '/en/projects/' } }
}

export default function Page() {
  return <AllProjectsPage locale="pt" />
}
