import type { ReactNode } from 'react'
import type { Locale } from '@/data/portfolio'
import { sectionLabel, sectionNumber, type SectionId } from '@/data/sections'

type HeaderProps = { titleId: string; title: ReactNode; lead?: ReactNode; giant?: boolean; children?: ReactNode }

// Cabeçalho de seção: rótulo mono rosa SEC_0N // NOME, título, lead, faixa listrada
// e o número gigante em contorno ao fundo (decorativo).
export function SectionHeader({ id, locale, ...props }: HeaderProps & { id: SectionId; locale: Locale }) {
  const number = sectionNumber(id)
  return <HudHeader {...props} label={`SEC_${number} // ${sectionLabel(id, locale).toUpperCase()}`} number={number} />
}

// Mesma peça para páginas próprias (UnBaja, todos os projetos): título vira h1.
export function HudHeader({ label, number, titleId, title, lead, giant = true, level = 2, children }: HeaderProps & { label: string; number: string; level?: 1 | 2 }) {
  const Heading = level === 1 ? 'h1' : 'h2'
  return <header className="section-header">
    {giant && <span className="giant-number" aria-hidden="true">{number}</span>}
    <p className="section-label" data-decode>{label}</p>
    <Heading className="section-title" id={titleId}>{title}</Heading>
    {lead && <p className="section-lead">{lead}</p>}
    <span className="stripe stripe--brand" aria-hidden="true" />
    {children}
  </header>
}
