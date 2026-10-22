import { expect, test } from '@playwright/test'

test('winner and certificates are available in both languages', async ({ page, request }, testInfo) => {
  for (const [home, casePath, rank] of [
    ['/', '/projetos/hindsight/', '1º lugar'],
    ['/en/', '/en/projects/hindsight/', '1st place']
  ]) {
    await page.goto(home)
    await expect(page.locator('.hero-award')).toContainText(rank)
    await expect(page.locator('.hero-award')).toHaveAttribute('href', casePath)
    const certificates = page.locator('#certificados')
    await expect(certificates.locator('.certificate-group')).toHaveCount(3)
    await expect(certificates.locator('li')).toHaveCount(12)
    await expect(certificates.locator('a')).toHaveCount(3)
    if (home === '/') {
      await page.locator('.hero').screenshot({ path: testInfo.outputPath('hero.png') })
      await certificates.scrollIntoViewIfNeeded()
      await expect.poll(() => certificates.locator('img').evaluateAll(images => images.every(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0))).toBe(true)
      await certificates.screenshot({ path: testInfo.outputPath('certificates.png') })
    }
    for (const link of await certificates.locator('a').all()) {
      const response = await request.get((await link.getAttribute('href'))!)
      expect(response.ok()).toBe(true)
      expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-')
    }
    await page.goto(casePath)
    await expect(page.locator('.case-hero .project-recognition')).toContainText(rank)
    await expect(page.locator('.case-body')).toContainText('OsBiruBob')
    await expect(page.locator('.award-evidence img')).toHaveCount(2)
    for (const image of await page.locator('.award-evidence img').all()) await expect(image).toBeVisible()
    await expect(page.locator('.case-hero .project-contributors a')).toHaveCount(5)
  }
})

test('team links work in the static export and fit both themes', async ({ page }, testInfo) => {
  await page.goto('/')
  await page.locator('[data-carousel-toggle]').click()
  const carousel = page.locator('[data-squeeze-carousel]')
  await carousel.getByRole('tab', { name: 'Crianex Hub', exact: true }).click()
  const team = carousel.getByRole('tabpanel').locator('.project-contributors')
  await expect(team.locator('a')).toHaveCount(6)
  await expect(team.getByRole('link', { name: 'Camile — GitHub' })).toHaveAttribute('href', 'https://github.com/Camile0318')
  for (let theme = 0; theme < 2; theme++) {
    for (const link of await team.locator('a').all()) {
      await link.focus()
      await expect(link).toBeFocused()
      await expect(link).toBeInViewport()
      expect(await link.locator('img').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0)
    await team.screenshot({ path: testInfo.outputPath(`team-${theme}.png`) })
    await page.getByRole('button', { name: 'Alternar tema' }).click()
  }
})

test('new navigation and credentials fit a narrow screen', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 })
  await page.goto('/')
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0)
  await expect(page.locator('.header-controls')).toBeInViewport()
  await page.locator('#certificates-title').scrollIntoViewIfNeeded()
  await expect(page.getByRole('heading', { name: 'Certificados e atividades' })).toBeInViewport()
})

test('credentials and project credits do not depend on JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  await page.goto('/')
  await expect(page.locator('#certificados li')).toHaveCount(12)
  await expect(page.locator('[data-project-slug="hindsight"] .project-contributors a')).toHaveCount(5)
  await expect(page.locator('[data-project-slug="crianex-hub"] .project-contributors')).toBeVisible()
  await context.close()
})

test('institutional images remain readable with enlarged text and both themes', async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  for (const theme of ['dark', 'light']) {
    await page.evaluate(value => { document.documentElement.dataset.theme = value }, theme)
    const certificates = page.locator('#certificados')
    await certificates.scrollIntoViewIfNeeded()
    await expect(certificates.locator('.organization-mark img')).toHaveCount(12)
    for (const img of await page.locator('.organization-mark img').all()) {
      await img.scrollIntoViewIfNeeded()
      await expect.poll(() => img.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true)
    }
    await certificates.screenshot({ path: testInfo.outputPath(`certificates-${theme}.png`) })
    await page.locator('.experience-card').nth(1).screenshot({ path: testInfo.outputPath(`mcti-${theme}.png`) })
  }
  await page.setViewportSize({ width: 320, height: 800 })
  await page.addStyleTag({ content: 'html { font-size: 200% !important; }' })
  await expect(page.locator('#certificados li')).toHaveCount(12)
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0)
})
