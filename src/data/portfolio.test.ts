import { describe, expect, it } from 'vitest'
import { caseHref, copy, projects, projectGroups, benchPhotos, experiences } from './portfolio'
import { existsSync } from 'node:fs'

describe('portfolio data', () => {
  it('keeps project slugs unique', () => {
    const slugs = projects.map(({ slug }) => slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it('has complete bilingual data for every project', () => {
    for (const project of projects) {
      expect(project.summary.pt).toBeTruthy()
      expect(project.summary.en).toBeTruthy()
      expect(project.role.pt).toBeTruthy()
      expect(project.role.en).toBeTruthy()
      expect(project.links.live).not.toBe('#')
      expect(project.links.source).not.toBe('#')
    }
  })

  it('gives every featured case a cover and localized route', () => {
    for (const project of projects.filter(({ featured }) => featured)) {
      expect(project.cover).toBeTruthy()
      expect(caseHref(project, 'pt')).toBe(`/projetos/${project.slug}/`)
      expect(caseHref(project, 'en')).toBe(`/en/projects/${project.slug}/`)
    }
  })

  it('keeps both language dictionaries aligned', () => {
    expect(Object.keys(copy.pt)).toEqual(Object.keys(copy.en))
  })

  it('highlights the team’s independent IBM evaluation without claiming the hackathon title', () => {
    const project = projects.find(project => project.slug === 'pmi-sleep-5')!
    expect(project.featured).toBe(true)
    expect(project.collaboration).toBe('team')
    expect(project.recognition?.pt).toContain('Avaliação técnica independente')
    expect(project.recognition?.en).toContain('Independent IBM technical evaluation')
    expect(experiences[0].detail.pt).toContain('pitch e Project Canvas não foram considerados')
    for (const locale of ['pt', 'en'] as const) {
      expect(existsSync(`content/${locale === 'pt' ? 'projetos' : 'en/projects'}/pmi-sleep-5.mdx`)).toBe(true)
    }
    for (const image of ['podium', 'review', 'feedback']) expect(existsSync(`public/media/pmi-ibm-${image}.png`)).toBe(true)
  })

  it('identifies Hindsight as a hackathon without changing authorship', () => {
    const hindsight = projects.find(project => project.slug === 'hindsight')!
    expect(hindsight.collaboration).toBe('team')
    expect(hindsight.status?.pt).toContain('Hackathon · IBM TechXchange')
    expect(hindsight.status?.en).toContain('Hackathon · IBM TechXchange')
  })

  it('assigns every archive project to a visible section and keeps covers available', () => {
    for (const project of projects) {
      expect([...projectGroups.map(group => group.id), 'embedded']).toContain(project.category)
      if (project.status) {
        expect(project.status.pt).toBeTruthy()
        expect(project.status.en).toBeTruthy()
      }
      if (project.cover) {
        for (const extension of ['webp', 'avif']) expect(existsSync(`public/media/${project.cover}.${extension}`)).toBe(true)
      }
    }
    for (const photo of benchPhotos) {
      expect(photo.width).toBeGreaterThan(0)
      expect(photo.height).toBeGreaterThan(0)
      for (const locale of ['pt', 'en'] as const) {
        expect(photo.alt[locale]).toBeTruthy()
        expect(photo.caption[locale]).toBeTruthy()
      }
    }
  })
})
