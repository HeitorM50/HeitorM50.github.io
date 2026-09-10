import { expect, test } from '@playwright/test'

test('home exposes the recruiter journey', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Estudante de')
  await expect(page.getByRole('link', { name: /Hindsight/i }).first()).toBeVisible()
  await expect(page.getByRole('link', { name: /Baixar CV/i })).toHaveAttribute('href', '/cv.pdf')
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(overflow).toBe(0)
})

test('English route and language switch are indexable pages', async ({ page }) => {
  await page.goto('/en/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Software')
  await expect(page.getByRole('link', { name: 'Ver versão em português' })).toHaveAttribute('href', '/')
})

test('case study has content, metadata and reciprocal language link', async ({ page }) => {
  await page.goto('/projetos/hindsight/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Hindsight')
  await expect(page.getByRole('heading', { name: 'Resultado' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Ver versão em inglês' })).toHaveAttribute('href', '/en/projects/hindsight/')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://heitorm50.github.io/projetos/hindsight/')
})

test('theme choice is persisted', async ({ page }) => {
  await page.goto('/')
  const initial = await page.locator('html').getAttribute('data-theme')
  await page.getByRole('button', { name: 'Alternar tema' }).click()
  const updated = await page.locator('html').getAttribute('data-theme')
  expect(updated).not.toBe(initial)
  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-theme', updated || 'light')
})

test('restored deck and timeline interactions work', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('[data-deck-counter]')).toHaveText('01 / 03')
  await page.locator('[data-deck]').click()
  await expect(page.locator('[data-deck-counter]')).toHaveText('02 / 03')

  const ibmTab = page.getByRole('tab', { name: /IBM TechXchange/i })
  await ibmTab.click()
  await expect(ibmTab).toHaveAttribute('aria-selected', 'true')
  await expect(page.locator('[data-exp-panel="2"]')).toBeVisible()
})

test('flow field renders and keeps reacting while the page scrolls', async ({ page }) => {
  await page.goto('/')
  const canvas = page.locator('[data-flow-field-background] canvas')
  await expect(canvas).toBeVisible()
  await expect.poll(() => canvas.evaluate((element) => (element as HTMLCanvasElement).width)).toBeGreaterThan(0)

  const before = await canvas.evaluate((element) => (element as HTMLCanvasElement).toDataURL())
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight * 0.45))
  await page.waitForTimeout(350)
  const after = await canvas.evaluate((element) => (element as HTMLCanvasElement).toDataURL())

  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
  expect(after).not.toBe(before)
})

test('header leaves the viewport and the pinned aurora opens on scroll', async ({ page }) => {
  await page.goto('/')
  const header = page.locator('.site-header')
  const reveal = page.locator('[data-scroll-video-reveal]')
  await expect(header).toHaveCSS('position', 'relative')
  await expect(reveal).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  await page.evaluate(() => window.scrollTo(0, 700))
  await expect.poll(() => header.evaluate((element) => element.getBoundingClientRect().bottom)).toBeLessThan(0)

  const track = page.locator('[data-scroll-video-track]')
  const geometry = await track.evaluate((element) => {
    const rect = element.getBoundingClientRect()
    return { start: rect.top + window.scrollY, distance: rect.height - window.innerHeight }
  })
  await page.evaluate((start) => window.scrollTo(0, start), geometry.start)
  await page.waitForTimeout(200)
  const initialClip = await page.locator('[data-scroll-video-box]').evaluate((element) => getComputedStyle(element).clipPath)
  await page.evaluate(({ start, distance }) => window.scrollTo(0, start + distance * 0.55), geometry)
  await page.waitForTimeout(350)
  const expandedClip = await page.locator('[data-scroll-video-box]').evaluate((element) => getComputedStyle(element).clipPath)

  expect(expandedClip).not.toBe(initialClip)
  await expect(page.locator('[data-aurora-layer]')).toHaveCount(3)
  await expect(page.locator('[data-scroll-video-track] video')).toHaveCount(0)
})
