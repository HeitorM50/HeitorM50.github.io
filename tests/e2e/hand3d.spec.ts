import { expect, test } from '@playwright/test'

// WebGL por software (SwiftShader) para o headless conseguir montar a mão 3D.
test.use({ launchOptions: { args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] } })

test('software GPUs keep the 2D hand unless forced', async ({ page }) => {
  test.skip(test.info().project.name === 'mobile', 'The 3D hand is desktop-only')
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-scenes', 'on')
  await page.waitForTimeout(1500)
  await expect(page.locator('[data-hero-rig]')).not.toHaveAttribute('data-hand', '3d')
  await expect(page.locator('.hand--back img')).toBeVisible()
})

test('the 3D hand mounts, replaces the 2D art and follows the card angle', async ({ page }) => {
  test.skip(test.info().project.name === 'mobile', 'The 3D hand is desktop-only')
  // WebGL por software + GLB disputando CPU com os outros testes: montar pode levar dezenas de segundos
  test.setTimeout(120_000)
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/?hand3d')
  const rig = page.locator('[data-hero-rig]')
  await expect(page.locator('html')).toHaveAttribute('data-hand-status', /.+/, { timeout: 90_000 })
  expect(await page.locator('html').getAttribute('data-hand-status')).toBe('3d')
  await expect(rig).toHaveAttribute('data-hand', '3d')
  await expect(rig.locator('[data-hand3d] canvas')).toHaveCount(1)
  await expect(rig.locator('.id-card')).toHaveCSS('opacity', '0')
  const height = await page.locator('#inicio').locator('xpath=..').evaluate((element: HTMLElement) => element.offsetHeight)
  await page.evaluate(y => scrollTo(0, y), height * 0.3)
  await expect(rig).toHaveAttribute('data-face', 'back')
})
