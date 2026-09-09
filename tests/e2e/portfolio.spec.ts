import { expect, test } from '@playwright/test'

test('home exposes the recruiter journey', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Construo sistemas')
  await expect(page.getByRole('link', { name: /Ler estudo de caso: Hindsight/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Baixar CV/i })).toHaveAttribute('href', '/cv.pdf')
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(overflow).toBe(0)
})

test('English route and language switch are indexable pages', async ({ page }) => {
  await page.goto('/en/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('I build systems')
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
