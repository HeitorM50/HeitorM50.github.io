import { expect, test } from '@playwright/test'

test('preview serves equivalent compressed and uncompressed HTML', async ({ request }) => {
  const compressed = await request.get('/', { headers: { 'Accept-Encoding': 'gzip' } })
  const plain = await request.get('/', { headers: { 'Accept-Encoding': 'identity' } })
  expect(compressed.headers()['content-encoding']).toBe('gzip')
  expect(compressed.headers().vary).toBe('Accept-Encoding')
  expect(plain.headers()['content-encoding']).toBeUndefined()
  expect(await compressed.text()).toBe(await plain.text())
  const refused = await request.get('/', { headers: { 'Accept-Encoding': 'gzip;q=0' } })
  expect(refused.headers()['content-encoding']).toBeUndefined()
})

test('the exported page keeps its full styling and content without JavaScript', async ({ browser, page }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: page.viewportSize()! })
  const staticPage = await context.newPage()
  try {
    await staticPage.goto('http://127.0.0.1:4173/')
    await expect(staticPage.locator('.hero-grid')).toHaveCSS('display', 'grid')
    await expect(staticPage.locator('.embedded-hero')).toHaveCSS('display', 'grid')
    await expect(staticPage.locator('[data-project-slug="baja-telemetry-api"]')).toContainText('Em desenvolvimento')
    await expect(staticPage.locator('[data-project-slug="pmi-sleep-5"]')).toContainText('Product Model Canvas')
  } finally { await context.close() }
})
