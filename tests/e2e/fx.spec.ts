import { expect, test, type Page } from '@playwright/test'

const groupsOn = (page: Page) => page.evaluate(() => [...document.querySelectorAll<HTMLElement>('[data-bg-group][data-on]')].map(group => group.dataset.bgGroup).sort().join('+'))

async function goTo(page: Page, id: string) {
  await page.locator(`#${id}`).evaluate(element => {
    const anchor = element.parentElement?.classList.contains('pin-spacer') ? element.parentElement : element
    scrollTo(0, anchor.getBoundingClientRect().top + scrollY + 40)
  })
}

test('the background switches groups and stacked word per section', async ({ page }) => {
  test.skip(test.info().project.name === 'mobile', 'Mobile keeps only the first group')
  await page.goto('/')
  await expect(page.locator('[data-bg-root]')).toHaveAttribute('data-ready', 'true')
  await expect.poll(() => groupsOn(page)).toBe('neon')
  for (const [id, groups, word] of [['destaque', 'liquid+neon', 'P1 // HACKATHON'], ['perfil', 'melt', 'PERFIL'], ['contato', 'glitch+melt', 'CONTATO']]) {
    await goTo(page, id)
    await expect.poll(() => groupsOn(page)).toBe(groups)
    await expect(page.locator('[data-bg-root]')).toHaveAttribute('data-word', word)
  }
  await expect(page.locator('[data-bg-root]')).toHaveAttribute('aria-hidden', 'true')
})

test('mobile keeps only the first group of each section', async ({ page }) => {
  test.skip(test.info().project.name !== 'mobile', 'Mobile-only rule')
  await page.goto('/')
  await goTo(page, 'destaque')
  await expect.poll(() => groupsOn(page)).toBe('liquid')
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBe(0)
})

test('the glitch follows scroll speed and fades on its own', async ({ page }) => {
  test.skip(test.info().project.name === 'mobile', 'Uses the mouse wheel')
  await page.goto('/unbaja/')
  await expect.poll(() => groupsOn(page)).toBe('glitch+neon')
  const peak = () => page.evaluate(() => Math.max(...[...document.querySelectorAll<HTMLElement>('[data-bg-slice]')].map(slice => Number(slice.style.opacity || 0))))
  let highest = 0
  for (let step = 0; step < 6; step++) { await page.mouse.wheel(0, 260); await page.waitForTimeout(30); highest = Math.max(highest, await peak()) }
  expect(highest).toBeGreaterThan(0.3)
  await expect.poll(peak, { timeout: 2000 }).toBe(0)
})

test('entrance effects settle on the real content', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('data-fx-ready', 'true')
  await goTo(page, 'destaque')
  await expect(page.locator('[data-position-counter]')).toHaveText('P1', { timeout: 3000 })
  await expect(page.locator('#destaque .section-label')).toHaveText('SEC_02 // DESTAQUE', { timeout: 3000 })
  await expect(page.getByRole('heading', { name: 'Resultado', exact: true })).toBeVisible()
  const data = page.locator('#destaque .result-board__data')
  await data.evaluate(element => element.scrollIntoView({ block: 'center' }))
  await expect.poll(() => data.locator('> *').first().evaluate(element => getComputedStyle(element).opacity)).toBe('1')
  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('HEITOR RICARDO')
})

test('reduced motion: no effects, still layers, progress still shown', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' })
  const page = await context.newPage()
  await page.goto('http://127.0.0.1:4173/')
  await expect(page.locator('[data-bg-root]')).toHaveAttribute('data-ready', 'true')
  await expect(page.locator('html')).not.toHaveAttribute('data-fx', /.+/)
  await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight))
  await expect.poll(() => page.locator('[data-bg-triangle]').last().getAttribute('data-state')).toBe('now')
  expect(await page.locator('[data-bg-el="grid"]').evaluate(element => getComputedStyle(element).transform)).toMatch(/none|matrix\(1, 0, 0, 1, 0, 0\)/)
  expect(await page.locator('.fx-char').count()).toBe(0)
  await context.close()
})

test('scanned images are revealed once they come into view', async ({ page }) => {
  await page.goto('/unbaja/')
  const frame = page.locator('.image-window__frame[data-scan]')
  await frame.evaluate(element => element.scrollIntoView({ block: 'center' }))
  await expect(frame).toHaveClass(/is-in/)
  await expect.poll(() => frame.locator('picture').evaluate(element => getComputedStyle(element).clipPath)).toMatch(/inset\(0px\)|none/)
  await page.goto('/')
  const media = page.locator('.project-card__media[data-scan]').first()
  await media.evaluate(element => element.scrollIntoView({ block: 'center' }))
  await expect(media).toHaveClass(/is-in/)
})

test('the card back lists real contacts', async ({ page }) => {
  await page.goto('/')
  const back = page.locator('.id-card__face--back')
  await expect(back).toContainText('heitorm50@gmail.com')
  await expect(back).toContainText('/HeitorM50')
  await expect(back).toContainText('/in/heitor-ricardo')
})

test('desktop keeps the 2D hand hidden until the 3D verdict, then shows the fallback', async ({ page }) => {
  test.skip(test.info().project.name === 'mobile', 'Desktop-only')
  await page.goto('/')
  await expect(page.locator('html')).not.toHaveAttribute('data-hand-pending', /.+/, { timeout: 6000 })
  await expect(page.locator('html')).toHaveAttribute('data-hand-status', '2d')
  await expect.poll(() => page.locator('.hand--back').evaluate(element => getComputedStyle(element).opacity)).toBe('1')
})

test('pinned project cards fit their content on common laptop heights', async ({ browser }) => {
  test.skip(test.info().project.name === 'mobile', 'The rail only pins on desktop')
  for (const viewport of [{ width: 1440, height: 900 }, { width: 1366, height: 768 }, { width: 1280, height: 720 }]) {
    const context = await browser.newContext({ viewport })
    const page = await context.newPage()
    await page.goto('http://127.0.0.1:4173/')
    await expect(page.locator('[data-rail]')).toHaveAttribute('data-pinned', 'true')
    const overflow = await page.evaluate(() => [...document.querySelectorAll('.project-card')].map(card => {
      const body = card.querySelector('.project-card__body')!
      const need = ['head', 'main', 'side', 'actions'].reduce((sum, part) => sum + card.querySelector(`.project-card__${part}`)!.scrollHeight, 0)
      return need - body.clientHeight
    }))
    expect(Math.max(...overflow), `${viewport.width}x${viewport.height}`).toBeLessThanOrEqual(0)
    await context.close()
  }
})

test('the card photo starts purple and returns in natural color after the full turn', async ({ page }) => {
  test.skip(test.info().project.name === 'mobile', 'Uses the pinned desktop hero')
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  const rig = page.locator('[data-hero-rig]')
  await expect(page.locator('html')).toHaveAttribute('data-scenes', 'on')
  const photo = page.locator('.id-card__photo')
  expect(await photo.evaluate(element => getComputedStyle(element).filter)).toContain('duotone')
  const height = await page.locator('#inicio').locator('xpath=..').evaluate((element: HTMLElement) => element.offsetHeight)
  await page.evaluate(y => scrollTo(0, y), height * 0.75)
  await expect(rig).toHaveAttribute('data-photo', 'natural')
  expect(await photo.evaluate(element => getComputedStyle(element).filter)).toBe('none')
  await page.evaluate(() => scrollTo(0, 0))
  await expect(rig).toHaveAttribute('data-photo', 'duotone')
})

test('the contact feed video loads only near the screen and credits the artist', async ({ page }) => {
  await page.goto('/')
  const video = page.locator('video[data-feed]')
  expect(await video.evaluate((element: HTMLVideoElement) => element.currentSrc)).toBe('')
  await video.evaluate(element => element.scrollIntoView({ block: 'center' }))
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentSrc)).toMatch(/contato-borboleta\.(webm|mp4)$/)
  await expect(page.locator('.signal-feed figcaption a')).toHaveAttribute('href', /instagram\.com\/reel\//)
  await expect(page.locator('.data-footer__signature blockquote')).toContainText('What stands in the way becomes the way.')
})
