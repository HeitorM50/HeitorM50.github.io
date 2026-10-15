import { describe, expect, it } from 'vitest'
import { existsSync } from 'node:fs'
import { certificateCategories, certificates } from './certificates'
import { contributors, type Contributor } from './contributors'
import { organizations } from './organizations'
import { projects } from './portfolio'

describe('published credentials and credits', () => {
  it('uses valid categories, bilingual titles and existing certificate documents', () => {
    expect(new Set(certificates.map(item => item.id)).size).toBe(certificates.length)
    expect(certificates).toHaveLength(12)
    for (const item of certificates) {
      expect(certificateCategories.some(category => category.id === item.category)).toBe(true)
      expect(existsSync(`public/media/organizations/${organizations[item.organizationId].image}`)).toBe(true)
      expect(item.title.pt).toBeTruthy()
      expect(item.title.en).toBeTruthy()
      if (item.document) expect(existsSync(`public${item.document}`)).toBe(true)
    }
    expect(certificates.find(item => item.id === 'ifood-camp')?.date).toBeUndefined()
    expect(certificates.find(item => item.id === 'pmi-df-2026')?.hours).toBe(11)
  })

  it('keeps reviewed team members unique and local avatars available', () => {
    for (const project of projects) {
      const ids = project.contributors ?? []
      expect(new Set(ids).size).toBe(ids.length)
      if (project.collaboration === 'solo') expect(ids).toEqual(['HeitorM50'])
      for (const id of ids) {
        const person: Contributor = contributors[id]
        expect(person).toBeDefined()
        expect(person.github).toMatch(/^[a-z\d](?:[a-z\d-]*[a-z\d])?$/i)
        if (person.avatar) expect(existsSync(`public/media/contributors/${person.avatar}.webp`)).toBe(true)
      }
    }
    expect(projects.find(item => item.slug === 'hindsight')?.contributors).toHaveLength(5)
    // Product contributions count even when the author has no recorded commits.
    expect(projects.find(item => item.slug === 'pmi-sleep-5')?.contributors).toContain('HeitorM50')
    expect(projects.find(item => item.slug === 'coops')?.contributors).toHaveLength(5)
    expect(projects.find(item => item.slug === 'crianex-hub')?.contributors).toHaveLength(6)
  })
})
