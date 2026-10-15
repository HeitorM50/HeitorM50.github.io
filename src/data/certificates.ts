import type { OrganizationId } from './organizations'

export const certificateCategories = [
  { id: 'courses', label: { pt: 'Cursos', en: 'Courses' } },
  { id: 'participation', label: { pt: 'Participação em eventos', en: 'Event participation' } },
  { id: 'extension', label: { pt: 'Extensão universitária', en: 'University extension' } }
] as const

export type Certificate = {
  id: string
  category: typeof certificateCategories[number]['id']
  title: Record<'pt' | 'en', string>
  organizationId: OrganizationId
  issuer: string
  date?: Record<'pt' | 'en', string>
  hours?: number
  document?: string
}

// Dates describe the event when the certificate does not state an issue date.
// Missing dates, hours and credential URLs are intentionally left unspecified.
export const certificates: Certificate[] = [
  { id: 'claude-101', category: 'courses', title: { pt: 'Claude 101', en: 'Claude 101' }, organizationId: 'anthropic', issuer: 'Anthropic' },
  { id: 'claude-cowork', category: 'courses', title: { pt: 'Introduction to Claude Cowork', en: 'Introduction to Claude Cowork' }, organizationId: 'anthropic', issuer: 'Anthropic' },
  {
    id: 'ibm-dev-day', category: 'participation',
    title: { pt: 'IBM Dev Day: Bob in Action', en: 'IBM Dev Day: Bob in Action' }, organizationId: 'ibm', issuer: 'IBM',
    date: { pt: '27–30 ago. 2026', en: '27–30 Aug 2026' },
    document: '/certificates/ibm-dev-day-bob-in-action.pdf'
  },
  {
    id: 'pmi-df-2026', category: 'participation',
    title: { pt: 'Hackathon PMI-DF 2026', en: 'Hackathon PMI-DF 2026' }, organizationId: 'pmi-df', issuer: 'Student Club · PMI-DF',
    date: { pt: '11–12 set. 2026', en: '11–12 Sep 2026' }, hours: 11,
    document: '/certificates/hackathon-pmi-df-2026.pdf'
  },
  {
    id: 'ifood-camp', category: 'participation',
    title: { pt: 'iFood CAMP', en: 'iFood CAMP' }, organizationId: 'ifood', issuer: 'iFood',
    document: '/certificates/ifood-camp.pdf'
  },
  { id: 'unbaja-extension', category: 'extension', title: { pt: 'Equipe de Competição (UnBaja)', en: 'Competition Team (UnBaja)' }, organizationId: 'unb', issuer: 'UnB' },
  { id: 'unb-courses-showcase', category: 'extension', title: { pt: 'Mostra de Cursos', en: 'Degree Program Showcase' }, organizationId: 'unb', issuer: 'UnB' },
  { id: 'unb-research-labs', category: 'extension', title: { pt: 'Laboratórios de Pesquisa', en: 'Research Laboratories' }, organizationId: 'unb', issuer: 'UnB' },
  {
    id: 'unb-pytorch-deep-learning', category: 'extension',
    title: { pt: 'Introdução ao Aprendizado Profundo com PyTorch', en: 'Introduction to Deep Learning with PyTorch' }, organizationId: 'unb', issuer: 'UnB · FCTE',
    date: { pt: '20–25 set. 2026', en: '20–25 Sep 2026' }, hours: 8
  },
  {
    id: 'unb-secure-code', category: 'extension',
    title: { pt: 'Código Seguro: da Ideia à Produção', en: 'Secure Code: From Idea to Production' }, organizationId: 'unb', issuer: 'UnB · FCTE',
    date: { pt: '22 set. 2026', en: '22 Sep 2026' }, hours: 4
  },
  {
    id: 'unb-competitive-programming-panel', category: 'extension',
    title: { pt: 'Mesa Redonda de Programação Competitiva', en: 'Competitive Programming Round Table' }, organizationId: 'unb', issuer: 'UnB · Departamento de Ciência da Computação',
    date: { pt: '24 set. 2026', en: '24 Sep 2026' }, hours: 8
  },
  {
    id: 'unb-programming-marathon-xiv', category: 'extension',
    title: { pt: 'XIV Maratona UnB de Programação', en: 'XIV UnB Programming Marathon' }, organizationId: 'unb', issuer: 'UnB · Departamento de Ciência da Computação',
    date: { pt: '25 set. 2026', en: '25 Sep 2026' }, hours: 8
  }
]
