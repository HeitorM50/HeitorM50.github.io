// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { escapeTex, renderCertificatesTex } from './cv-certificates.mjs'

describe('CV certificate export', () => {
  it('escapes LaTeX text without losing accents', () => {
    expect(escapeTex('Pesquisa & extensão 50%_#1')).toBe('Pesquisa \\& extensão 50\\%\\_\\#1')
  })
  it('exports all categories with public PDF links and no invented credentials', () => {
    const tex = renderCertificatesTex()
    expect(tex.match(/\\item /g)).toHaveLength(4)
    expect(tex.match(/\\href\{/g)).toHaveLength(5)
    expect(tex).toContain('\\href{https://www.credly.com/badges/53c438bf-46c1-45fe-a60f-ea814d571657}{IBM Certified Bob v2 Developer -- Associate}')
    expect(tex).toContain('Claude 101 (Anthropic)')
    expect(tex).toContain('iFood CAMP} (iFood)')
    expect(tex).toContain('11--12 set. 2026, 11 h')
    expect(tex).not.toMatch(/undefined|null/)
  })
})
