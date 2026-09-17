import { expect, test, type Page } from '@playwright/test'

// Exercise the exported loader independently of an external scene/CDN.
async function stubScene(page: Page) {
  await page.route('**/embedded-scene-mount-*.js', route => route.fulfill({
    contentType: 'text/javascript',
    body: `export function mountScene(target, scene, ready) {
      target.dataset.testMounted = 'true';
      queueMicrotask(ready);
      return { setPaused(value) { target.dataset.testPaused = String(value); }, dispose() { delete target.dataset.testMounted; } };
    }`
  }))
}

test('curated projects and embedded navigation are bilingual and indexable', async ({ page }) => {
  for (const [path, nav, contribution] of [['/', 'Embarcados', 'Minha contribuição'], ['/en/', 'Embedded systems', 'My contribution']]) {
    await page.goto(path)
    await expect(page.getByRole('link', { name: nav, exact: true })).toHaveAttribute('href', `${path}#embarcados`)
    await expect(page.locator('.hero-stats')).toHaveCount(0)
    await expect(page.locator('[data-squeeze-carousel]')).toHaveCount(1)
    for (const slug of ['omapkdex', 'omarchy-gcal', 'ia2-bloodmnist', 'pmi-sleep-5']) {
      await expect(page.locator(`[data-project-slug="${slug}"]`)).toContainText(contribution)
    }
    await expect(page.locator('[data-project-slug="pmi-sleep-5"]')).toContainText('Product Model Canvas')
    await expect(page.locator('[data-project-slug="baja-telemetry-api"]')).toContainText(path === '/' ? 'Em desenvolvimento' : 'In development')
    await expect(page.locator('.bench-gallery')).toHaveCount(0)
    expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0)
  }
})

test('scene waits until the section is near, requires activation on mobile, and pauses', async ({ page, isMobile }) => {
  await stubScene(page)
  let imported = false
  page.on('request', request => { if (request.url().includes('embedded-scene-mount-')) imported = true })
  await page.goto('/')
  const host = page.locator('[data-embedded-scene]')
  await expect(host).toHaveAttribute('data-scene-state', 'idle')
  expect(imported).toBe(false)
  await host.scrollIntoViewIfNeeded()
  if (isMobile) {
    await expect(host).toHaveAttribute('data-scene-state', 'idle')
    expect(imported).toBe(false)
    await host.getByRole('button', { name: 'Ativar 3D' }).click()
  }
  await expect(host).toHaveAttribute('data-scene-state', 'ready')
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true })
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect(host).toHaveAttribute('data-scene-state', 'paused')
  await page.evaluate(() => {
    Reflect.deleteProperty(document, 'hidden')
    document.dispatchEvent(new Event('visibilitychange'))
  })
  await expect(host).toHaveAttribute('data-scene-state', 'ready')
  await host.getByRole('button', { name: 'Pausar 3D' }).click()
  await expect(host).toHaveAttribute('data-scene-state', 'paused')
  await expect(host.locator('[data-scene-mount]')).toHaveAttribute('data-test-paused', 'true')
  await host.getByRole('button', { name: 'Retomar 3D' }).click()
  await expect(host).toHaveAttribute('data-scene-state', 'ready')
  await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }))
  await expect(host).toHaveAttribute('data-scene-state', 'paused')
  await host.scrollIntoViewIfNeeded()
  await expect(host).toHaveAttribute('data-scene-state', 'ready')
})

test('reduced motion requires an explicit choice and network failures have a fallback', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.route('https://prod.spline.design/**', route => route.abort())
  await page.goto('/en/')
  const host = page.locator('[data-embedded-scene]')
  await host.scrollIntoViewIfNeeded()
  await expect(host).toHaveAttribute('data-scene-state', 'idle')
  await host.getByRole('button', { name: 'Enable 3D' }).click()
  await expect(host).toHaveAttribute('data-scene-state', 'error', { timeout: 35000 })
  await expect(host.getByRole('status')).toContainText('3D is unavailable')
  await expect(host.getByRole('button', { name: 'Try again' })).toBeEnabled()
  await expect(host.locator('.embedded-circuit')).toHaveCSS('opacity', '1')
  await expect(page.locator('[data-project-slug="baja-telemetry-api"] a')).toHaveAttribute('href', 'https://github.com/UnBajaSAE/baja-telemetry-api')
})

test('missing WebGL preserves the static composition and project content', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, ...args: Parameters<typeof original>) {
      if (String(args[0]).startsWith('webgl')) return null
      return original.apply(this, args)
    } as typeof original
  })
  await page.goto('/')
  const host = page.locator('[data-embedded-scene]')
  await host.scrollIntoViewIfNeeded()
  await host.getByRole('button', { name: 'Ativar 3D' }).click()
  await expect(host).toHaveAttribute('data-scene-state', 'error')
  await expect(page.locator('.telemetry-path')).toContainText('CAN → ESP32')
})

test('small screens keep the navigation and embedded content within the viewport', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 320, height: 720 })
  await page.goto('/')
  const dock = await page.locator('[data-dock-panel]').boundingBox()
  expect(dock!.x).toBeGreaterThanOrEqual(0)
  expect(dock!.x + dock!.width).toBeLessThanOrEqual(320)
  await page.locator('#embarcados').scrollIntoViewIfNeeded()
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0)
})
