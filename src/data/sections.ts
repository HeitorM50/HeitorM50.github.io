import type { Locale } from './portfolio'

// Ordem e rótulos das seções da home (DESIGN_SPEC §6). A seção UnBaja virou
// página própria (/unbaja/) por decisão do Heitor; a home ficou com 7 seções. Usado pelo cabeçalho,
// pelo HUD e pelos cabeçalhos de seção.
export const sections = [
  { id: 'inicio', label: { pt: 'Início', en: 'Start' }, mode: 'pinned' },
  { id: 'destaque', label: { pt: 'Destaque', en: 'Highlight' }, mode: 'pinned' },
  { id: 'perfil', label: { pt: 'Perfil', en: 'Profile' }, mode: 'vertical' },
  { id: 'projetos', label: { pt: 'Projetos', en: 'Projects' }, mode: 'horizontal' },
  { id: 'stack', label: { pt: 'Stack', en: 'Stack' }, mode: 'vertical' },
  { id: 'certificados', label: { pt: 'Certificações', en: 'Credentials' }, mode: 'vertical' },
  { id: 'contato', label: { pt: 'Contato', en: 'Contact' }, mode: 'pinned' }
] as const

export type SectionId = typeof sections[number]['id']

export function sectionNumber(id: SectionId) {
  return String(sections.findIndex(section => section.id === id) + 1).padStart(2, '0')
}

export function sectionLabel(id: SectionId, locale: Locale) {
  return sections.find(section => section.id === id)!.label[locale]
}

// Seções que aparecem como links no menu principal.
export const navSections: SectionId[] = ['perfil', 'projetos', 'certificados', 'contato']

// Páginas próprias fora da home (UnBaja e lista completa de projetos).
export const pageHref = {
  unbaja: { pt: '/unbaja/', en: '/en/unbaja/' },
  projects: { pt: '/projetos/', en: '/en/projects/' }
} as const
