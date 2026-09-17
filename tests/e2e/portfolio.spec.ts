import { expect, test } from '@playwright/test'

test('home exposes the recruiter journey', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Engenharia de Software')
  await expect(page.getByRole('tabpanel', { name: 'Hindsight', exact: true }).getByRole('link', { name: 'Estudo de caso', exact: true })).toHaveAttribute('href', '/projetos/hindsight/')
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

test('top navigation uses a responsive liquid glass dock', async ({ page }) => {
  await page.goto('/')
  const dock = page.locator('[data-dock]')
  const panel = dock.locator('[data-dock-panel]')
  const about = dock.locator('[data-dock-item]').first()

  await expect(dock).toHaveAttribute('data-dock-ready', 'true')
  await expect(dock.getByRole('img', { name: 'Heitor Ricardo' })).toBeVisible()
  await expect(dock.getByRole('toolbar')).toBeVisible()
  await expect(dock.getByRole('link', { name: 'Sobre' })).toHaveAttribute('href', '/#sobre')
  await expect(panel).toHaveCSS('backdrop-filter', /blur\(16px\)/)

  const box = await about.boundingBox()
  expect(box).not.toBeNull()
  await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2)
  await expect(panel).toHaveAttribute('data-dock-active', 'true')
  await expect(page.locator('#portfolio-liquid-glass')).toHaveCount(1)

  const canMagnify = await page.evaluate(() => matchMedia('(hover: hover) and (pointer: fine)').matches)
  if (canMagnify) {
    await expect.poll(() => about.evaluate((element) => parseFloat(element.style.width))).toBeGreaterThan(50)
  }
})

test('primary calls to action use responsive liquid glass', async ({ page }) => {
  await page.goto('/')
  const primary = page.getByRole('link', { name: 'Ver projetos' })
  const download = page.getByRole('link', { name: /Baixar CV/i })

  await expect(primary).toHaveAttribute('data-slot', 'liquid-button')
  await expect(primary).toHaveAttribute('data-liquid-ready', 'true')
  await expect(primary).toHaveCSS('backdrop-filter', /blur\(10px\)/)
  await expect(download).toHaveAttribute('data-slot', 'liquid-button')
  await expect(download).toHaveClass(/liquid-glass-button--outline/)
  await expect(page.locator('#portfolio-liquid-glass')).toHaveCount(0)

  const box = await primary.boundingBox()
  expect(box).not.toBeNull()
  await page.mouse.move(box!.x + box!.width * .82, box!.y + box!.height * .28)
  await expect(primary).toHaveAttribute('data-liquid-active', 'true')
  await expect(page.locator('#portfolio-liquid-glass')).toHaveCount(1)
  await expect.poll(() => primary.evaluate((element) => element.style.getPropertyValue('--liquid-x'))).not.toBe('50.00%')
  await expect.poll(() => primary.evaluate((element) => getComputedStyle(element, '::before').backdropFilter)).toContain('portfolio-liquid-glass')
})

test('single portrait replaces the project deck and career timeline works', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('[data-deck]')).toHaveCount(0)
  await expect(page.locator('[data-profile-card]')).toHaveCount(1)
  await expect(page.locator('.hero [data-profile-card]')).toHaveCount(1)

  const timeline = page.locator('[data-timeline]')
  const entries = timeline.locator('[data-timeline-entry]')
  const progress = timeline.locator('[data-timeline-progress]')
  await timeline.scrollIntoViewIfNeeded()
  await expect(timeline).toHaveAttribute('data-timeline-ready', 'true')
  await expect(entries).toHaveCount(4)
  await expect(timeline).toContainText('IBM TechXchange 2026')

  const before = await progress.evaluate((element) => getComputedStyle(element).transform)
  const geometry = await timeline.evaluate((element) => {
    const rect = element.getBoundingClientRect()
    return { top: rect.top + window.scrollY, height: rect.height }
  })
  await page.evaluate(({ top, height }) => window.scrollTo(0, top + height * .45), geometry)
  await expect.poll(() => timeline.locator('[data-timeline-active="true"]').count()).toBeGreaterThan(0)
  await expect.poll(() => progress.evaluate((element) => getComputedStyle(element).transform)).not.toBe(before)
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

test('profile portrait uses fluid holographic depth on pointer devices', async ({ page }) => {
  await page.goto('/')
  const wrapper = page.locator('[data-profile-card]')
  const card = wrapper.locator('.pc-card')

  await wrapper.scrollIntoViewIfNeeded()
  await expect(wrapper).toBeVisible()
  await expect(wrapper).toHaveCSS('touch-action', 'pan-y')
  await expect(wrapper).toHaveAttribute('data-profile-ready', 'true')
  await expect(card.getByRole('img', { name: 'Heitor Ricardo' })).toBeVisible()
  await expect(card).toContainText('Engenharia de Software · UnB')

  const canTilt = await page.evaluate(() => matchMedia('(hover: hover) and (pointer: fine)').matches)
  if (!canTilt) return

  const before = await card.evaluate((element) => getComputedStyle(element).transform)
  const box = await card.boundingBox()
  expect(box).not.toBeNull()
  await page.mouse.move(box!.x + box!.width * .94, box!.y + box!.height * .12)
  await expect(wrapper).toHaveAttribute('data-profile-active', 'true')
  await expect.poll(async () => Number(await wrapper.getAttribute('data-profile-frame'))).toBeGreaterThan(2)
  await expect.poll(async () => Math.abs(parseFloat(await wrapper.evaluate((element) => element.style.getPropertyValue('--pc-rotate-y'))))).toBeGreaterThan(14)
  await expect.poll(async () => Math.abs(parseFloat(await wrapper.evaluate((element) => element.style.getPropertyValue('--pc-rotate-x'))))).toBeGreaterThan(10)
  const tilted = await card.evaluate((element) => getComputedStyle(element).transform)
  expect(tilted).not.toBe(before)
  expect(tilted).toMatch(/^matrix3d/)
  await expect(wrapper.locator('.pc-shine')).toHaveCSS('opacity', '0.62')
})

test('header leaves the viewport and projects lead directly to the Lab', async ({ page }) => {
  await page.goto('/')
  const header = page.locator('.site-header')
  await expect(header).toHaveCSS('position', 'relative')
  await page.evaluate(() => window.scrollTo(0, 700))
  await expect.poll(() => header.evaluate((element) => element.getBoundingClientRect().bottom)).toBeLessThan(0)

  await expect(page.locator('[data-scroll-video-track]')).toHaveCount(0)
  await expect(page.locator('.discipline-bridge')).toHaveCount(0)
  await expect(page.locator('#projetos + #embarcados')).toHaveCount(1)
})

test('education appears only in the Hero alongside the portrait in both languages', async ({ page }) => {
  const biographies = [
    ['/', 'Curso Engenharia de Software na UnB, com conclusão prevista para março de 2029, e Análise e Desenvolvimento de Sistemas no GRAN. Minha formação conecta desenvolvimento de software, pesquisa e trabalho em equipe.'],
    ['/en/', 'I study Software Engineering at UnB, with graduation expected in March 2029, and Systems Analysis and Development at GRAN. My education connects software development, research and teamwork.'],
  ]
  for (const [path, biography] of biographies) {
    await page.goto(path)
    await expect(page.locator('.hero#sobre .hero-copy .hero-bio')).toHaveText(biography)
    await expect(page.getByText(biography, { exact: true })).toHaveCount(1)
    await expect(page.locator('.hero#sobre .hero-portrait')).toHaveCount(1)
    await expect(page.locator('.about-section, #about-title, .discipline-bridge')).toHaveCount(0)
  }
})
