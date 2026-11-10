import { expect, test, type Page } from '@playwright/test'

// O boot não roda com navigator.webdriver (os outros testes ficam livres dele).
// Aqui simulamos um visitante comum.
async function asVisitor(page: Page) {
  await page.addInitScript(() => Object.defineProperty(Navigator.prototype, 'webdriver', { get: () => false }))
}

test('first visit runs the boot over real content, then never again', async ({ page }) => {
  await asVisitor(page)
  await page.goto('/')
  const boot = page.locator('[data-boot-root]')
  await expect(page.locator('html')).toHaveAttribute('data-boot', /on|closing/)
  await expect(boot).toBeVisible()
  await expect(page.locator('#hero-title')).toHaveText('HEITOR RICARDO')
  await expect(page.locator('[data-boot-skip]')).toHaveCount(0)
  const steps = boot.locator('[data-boot-step]')
  await expect(steps.nth(0)).toHaveAttribute('data-state', 'done')
  await expect(page.locator('html')).not.toHaveAttribute('data-boot', /.+/, { timeout: 3500 })
  await expect(boot).toBeHidden()
  expect(await page.evaluate(() => localStorage.getItem('hr-boot-seen'))).toBe('1')
  await page.reload()
  await page.waitForTimeout(300)
  await expect(page.locator('html')).not.toHaveAttribute('data-boot', /.+/)
})

test('Escape closes the boot right away', async ({ page }) => {
  await asVisitor(page)
  await page.goto('/en/')
  await expect(page.locator('[data-boot-root]')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('html')).not.toHaveAttribute('data-boot', /.+/, { timeout: 1500 })
})

test('reduced motion, case pages and no JavaScript never show the boot', async ({ browser }) => {
  const reduced = await browser.newContext({ reducedMotion: 'reduce' })
  const page = await reduced.newPage()
  await asVisitor(page)
  await page.goto('http://127.0.0.1:4173/')
  await expect(page.locator('html')).not.toHaveAttribute('data-boot', /.+/)
  await expect(page.locator('[data-boot-root]')).toBeHidden()
  await reduced.close()

  const casual = await browser.newContext()
  const casePage = await casual.newPage()
  await asVisitor(casePage)
  await casePage.goto('http://127.0.0.1:4173/projetos/hindsight/')
  await expect(casePage.locator('html')).not.toHaveAttribute('data-boot', /.+/)
  await casual.close()

  const noScript = await browser.newContext({ javaScriptEnabled: false })
  const staticPage = await noScript.newPage()
  await staticPage.goto('http://127.0.0.1:4173/')
  await expect(staticPage.locator('[data-boot-root]')).toBeHidden()
  await expect(staticPage.locator('#hero-title')).toBeVisible()
  await noScript.close()
})
