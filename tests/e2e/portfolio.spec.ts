import { expect, test } from '@playwright/test'

const sectionOrder = ['inicio', 'destaque', 'perfil', 'projetos', 'stack', 'certificados', 'contato']

test('home keeps its seven sections in order', async ({ page }) => {
  await page.goto('/')
  const ids = await page.locator('main section[data-section]').evaluateAll(sections => sections.map(section => section.id))
  expect(ids).toEqual(sectionOrder)
  for (const id of sectionOrder) {
    const labelled = await page.locator(`#${id}`).getAttribute('aria-labelledby')
    await expect(page.locator(`#${labelled}`)).toHaveCount(1)
  }
})

test('PMI team recognition is featured and its bilingual cases preserve the evaluation context', async ({ page }) => {
  for (const [home, casePath, ranking] of [
    ['/', '/projetos/pmi-sleep-5/', '1º lugar · Avaliação técnica independente IBM'],
    ['/en/', '/en/projects/pmi-sleep-5/', '1st place · Independent IBM technical evaluation'],
  ]) {
    await page.goto(home)
    const row = page.locator('.result-row[data-project-slug="pmi-sleep-5"]')
    await expect(row).toContainText(ranking)
    await expect(row).toHaveAttribute('href', casePath)
    await expect(page.locator('.project-card[data-project-slug="pmi-sleep-5"]')).toContainText(ranking)
    await page.goto(casePath)
    await expect(page.locator('h1')).toHaveText('PMI Sleep 5 · Krilltech')
    await expect(page.locator('.case-body')).toContainText('Project Canvas')
    await expect(page.locator('.review-evidence img')).toHaveCount(3)
    for (const img of await page.locator('.review-evidence img').all()) {
      await expect(img).toHaveAttribute('width', /\d+/)
      await expect(img).toHaveAttribute('alt', /.+/)
    }
  }
})

test('home exposes the recruiter journey', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('HEITOR RICARDO')
  await expect(page.locator('#inicio')).toContainText('ENG. SOFTWARE // EMBARCADOS')
  await expect(page.locator('.project-card[data-project-slug="hindsight"]').getByRole('link', { name: /Estudo de caso/ })).toHaveAttribute('href', '/projetos/hindsight/')
  await expect(page.locator('#inicio').getByRole('link', { name: /Currículo/ })).toHaveAttribute('href', '/cv.pdf')
  await expect(page.locator('.project-card')).toHaveCount(5)
  await expect(page.locator('.archive-card')).toHaveCount(0)
  await expect(page.locator('.see-all')).toHaveAttribute('href', '/projetos/')
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(overflow).toBe(0)
})

async function openMenuOnMobile(page: import('@playwright/test').Page) {
  if (await page.locator('[data-menu-toggle]').isVisible()) await page.locator('[data-menu-toggle]').click()
}

test('English route and language switch are indexable pages', async ({ page }) => {
  await page.goto('/en/')
  await openMenuOnMobile(page)
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(page.locator('#inicio')).toContainText('SOFTWARE ENG. // EMBEDDED')
  await expect(page.getByRole('link', { name: 'Ver versão em português' })).toHaveAttribute('href', '/')
})

test('case study has content, metadata and reciprocal language link', async ({ page }) => {
  await page.goto('/projetos/hindsight/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Hindsight')
  await expect(page.getByRole('heading', { name: 'Resultado' })).toBeVisible()
  await openMenuOnMobile(page)
  await expect(page.getByRole('link', { name: 'Ver versão em inglês' })).toHaveAttribute('href', '/en/projects/hindsight/')
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://heitorm50.github.io/projetos/hindsight/')
})

test('the site has a single dark theme without a toggle', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('[data-theme-toggle]')).toHaveCount(0)
  expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(11, 10, 15)')
})

test('mobile menu opens full screen, traps focus and closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 })
  await page.goto('/')
  const toggle = page.locator('[data-menu-toggle]')
  const menu = page.locator('#site-menu')
  await expect(menu).toBeHidden()
  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await expect(menu).toBeVisible()
  await expect(menu.locator('a').first()).toBeFocused()
  for (let index = 0; index < 12; index++) {
    await page.keyboard.press('Tab')
    expect(await page.evaluate(() => Boolean(document.activeElement?.closest('#site-menu, [data-menu-toggle]')))).toBe(true)
  }
  await page.keyboard.press('Escape')
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await expect(toggle).toBeFocused()
  await toggle.click()
  await menu.getByRole('link', { name: /Projetos/ }).click()
  await expect(menu).toBeHidden()
  await expect(page).toHaveURL(/#projetos$/)
})

test('HUD and navigation follow the section on screen', async ({ page }) => {
  test.skip(test.info().project.name === 'mobile', 'The nav is collapsed on mobile')
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await page.locator('#projetos').evaluate(section => section.scrollIntoView())
  await expect(page.locator('.header-counter [data-hud-section]')).toHaveText('04')
  await expect(page.locator('[data-nav-link="projetos"]')).toHaveAttribute('aria-current', 'location')
})

test('glyph sprite is valid XML and renders', async ({ page, request }) => {
  const response = await request.get('/assets/glyphs.svg')
  expect(response.ok()).toBe(true)
  expect(await response.text()).not.toMatch(/<!--(?:(?!-->)[\s\S])*--(?!>)/)
  await page.goto('/')
  const glyph = page.locator('.project-recognition .glyph').first()
  await glyph.scrollIntoViewIfNeeded()
  await expect.poll(() => glyph.locator('use').evaluate((use: SVGUseElement) => use.getBBox().width)).toBeGreaterThan(0)
})

test('contact form posts to Formspree (mocked) and reports the result', async ({ page }) => {
  const posts: string[] = []
  // nunca envia de verdade: a rota do Formspree é interceptada
  await page.route('https://formspree.io/**', route => { posts.push(route.request().postData() ?? ''); return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }) })
  await page.goto('/')
  const form = page.locator('[data-contact-form]')
  await expect(form).toHaveAttribute('action', 'https://formspree.io/f/xbgorgyw')
  await expect(form).not.toContainText('[ENDPOINT DO FORM]')
  await form.scrollIntoViewIfNeeded()
  await form.locator('button[type="submit"]').click()
  await expect(form.locator('[data-form-status]')).toHaveText('Confira os campos destacados.')
  expect(posts).toHaveLength(0)
  await form.locator('input[name="name"]').fill('Teste')
  await form.locator('input[name="email"]').fill('teste@example.com')
  await form.locator('textarea[name="message"]').fill('Olá')
  await form.locator('button[type="submit"]').click()
  await expect(form.locator('[data-form-status]')).toHaveText('Mensagem enviada. Obrigado!')
  expect(posts).toHaveLength(1)
  expect(posts[0]).toContain('teste@example.com')
  await expect(form.locator('input[name="name"]')).toHaveValue('')
  await expect(page.getByRole('link', { name: 'heitorm50@gmail.com' })).toHaveAttribute('href', 'mailto:heitorm50@gmail.com')
})

test('keyboard focus shows the locking reticle', async ({ page }) => {
  test.skip(test.info().project.name === 'mobile', 'Keyboard focus is a desktop check')
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.locator('.skip-link')).toBeFocused()
  await page.locator('#inicio .btn--primary').focus()
  await expect.poll(() => page.locator('#inicio .btn--primary').evaluate(element => getComputedStyle(element, '::after').opacity)).toBe('1')
})

test('see all leads to a page listing every project in both languages', async ({ page }) => {
  for (const [path, title, home] of [['/projetos/', 'Todos os projetos', '/'], ['/en/projects/', 'All projects', '/en/']]) {
    await page.goto(path)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(title)
    await expect(page.locator('.archive-card')).toHaveCount(17)
    await expect(page.locator('.archive-card[data-project-slug="hindsight"]').getByRole('link', { name: /Estudo de caso|Case study/ })).toHaveAttribute('href', home === '/' ? '/projetos/hindsight/' : '/en/projects/hindsight/')
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0)
  }
})

test('UnBaja has its own page reached by a button on the home', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#embarcados')).toHaveCount(0)
  const link = page.locator('[data-unbaja-link]')
  await expect(link).toHaveAttribute('href', '/unbaja/')
  await link.click()
  await expect(page).toHaveURL(/\/unbaja\/$/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Do sensor ao software')
  await expect(page.locator('[data-project-slug="baja-telemetry-api"]')).toContainText('Em desenvolvimento')
  await page.goto('/en/unbaja/')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('From sensor to software')
})

test('the robotic hand frames the hero card', async ({ page }) => {
  await page.goto('/')
  for (const selector of ['.hand--back img', '.hand--front img', '.id-card__photo']) {
    await expect.poll(() => page.locator(selector).evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true)
  }
  const thumb = await page.locator('.hand--front').boundingBox()
  const card = await page.locator('.id-card').boundingBox()
  expect(thumb!.x + thumb!.width).toBeGreaterThan(card!.x)
})

test('extension certificates show highlights first and expand on demand', async ({ page }) => {
  await page.goto('/')
  const group = page.locator('#certificados .certificate-group').filter({ has: page.locator('#certificate-extension') })
  await expect(group.locator('> ul > li')).toHaveCount(3)
  const more = group.locator('.certificate-more')
  await expect(more.locator('li').first()).toBeHidden()
  await more.locator('summary').click()
  await expect(more.locator('li')).toHaveCount(4)
  await expect(more.locator('li').first()).toBeVisible()
  await expect(page.locator('#certificados .badge .barcode')).toHaveCount(12)
})

test.describe('scroll scenes', () => {
  test('desktop pins the rail and turns vertical scroll into horizontal travel', async ({ page }) => {
    test.skip(test.info().project.name === 'mobile', 'Scenes are desktop-only')
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-scenes', 'on')
    await expect(page.locator('[data-rail]')).toHaveAttribute('data-pinned', 'true')
    const spacer = page.locator('#projetos').locator('xpath=..')
    await expect(spacer).toHaveClass(/pin-spacer/)
    const { top, height } = await spacer.evaluate((element: HTMLElement) => ({ top: element.getBoundingClientRect().top + scrollY, height: element.offsetHeight }))
    await page.evaluate(y => scrollTo(0, y), top + height * 0.5)
    await expect.poll(() => page.locator('[data-rail-track]').evaluate(track => new DOMMatrix(getComputedStyle(track).transform).m41)).toBeLessThan(-500)
    await expect(page.locator('[data-hud-mode]')).toHaveText('HORIZONTAL')
    await expect(page.locator('[data-hud-mode]')).toHaveAttribute('data-active', '')
    expect(Number(await page.locator('[data-rail-index]').textContent())).toBeGreaterThan(1)
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0)
  })

  test('keyboard focus moves the pinned rail to the focused card', async ({ page }) => {
    test.skip(test.info().project.name === 'mobile', 'Scenes are desktop-only')
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-scenes', 'on')
    const last = page.locator('.see-all')
    await last.focus()
    await expect(last).toBeInViewport({ ratio: 0.9 })
  })

  test('mobile and reduced motion keep native scrolling', async ({ browser }) => {
    for (const options of [{ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true }, { viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' as const }]) {
      const context = await browser.newContext(options)
      const page = await context.newPage()
      await page.goto('http://127.0.0.1:4173/')
      await page.waitForTimeout(500)
      await expect(page.locator('html')).not.toHaveAttribute('data-scenes', 'on')
      await expect(page.locator('.pin-spacer')).toHaveCount(0)
      await expect(page.locator('[data-rail]')).toHaveCSS('overflow-x', 'auto')
      await context.close()
    }
  })

  test('section counter rolls like an odometer but keeps its text', async ({ page }) => {
    test.skip(test.info().project.name === 'mobile', 'The counter is checked on desktop')
    await page.goto('/')
    await page.locator('#certificados').evaluate(section => section.scrollIntoView())
    const counter = page.locator('.header-counter [data-hud-section]')
    await expect(counter).toHaveText('06')
    await expect(counter.locator('.odo')).toHaveCount(2)
    await expect(counter.locator('.odo').nth(1)).toHaveCSS('--d', '6')
  })
})

test.describe('hero card rotation', () => {
  test('desktop: the card turns 360° with the pinned hero and the labels follow the face', async ({ page }) => {
    test.skip(test.info().project.name === 'mobile', 'Scenes are desktop-only')
    await page.setViewportSize({ width: 1440, height: 900 })
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('data-scenes', 'on')
    const rig = page.locator('[data-hero-rig]')
    await expect(rig).toHaveAttribute('data-face', 'front')
    const height = await page.locator('#inicio').locator('xpath=..').evaluate((element: HTMLElement) => element.offsetHeight)
    await page.evaluate(y => scrollTo(0, y), height * 0.3)
    await expect(rig).toHaveAttribute('data-face', 'back')
    await expect.poll(async () => Number(await rig.locator('[data-rig-angle]').textContent())).toBeGreaterThan(120)
    await page.evaluate(y => scrollTo(0, y), height * 0.7)
    await expect(rig).toHaveAttribute('data-face', 'front')
    await expect(rig.locator('[data-rig-angle]')).toHaveText('000')
  })

  test('mobile: the card turns with native scroll, without pinning', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true })
    const page = await context.newPage()
    await page.goto('http://127.0.0.1:4173/')
    const rig = page.locator('[data-hero-rig]')
    await expect(rig).toHaveAttribute('data-face', 'front')
    await rig.evaluate(element => scrollTo(0, element.getBoundingClientRect().top + scrollY - innerHeight * 0.2))
    await expect.poll(async () => Number(await rig.locator('[data-rig-angle]').textContent())).toBeGreaterThan(0)
    await expect(page.locator('.pin-spacer')).toHaveCount(0)
    await context.close()
  })

  test('reduced motion keeps the card still and facing front', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' })
    const page = await context.newPage()
    await page.goto('http://127.0.0.1:4173/')
    await page.evaluate(() => scrollTo(0, 600))
    await page.waitForTimeout(400)
    const rig = page.locator('[data-hero-rig]')
    await expect(rig).toHaveAttribute('data-face', 'front')
    expect(await rig.evaluate(element => element.style.getPropertyValue('--rig-angle'))).toBe('')
    await context.close()
  })
})

test('the top bar hides while scrolling down and returns when scrolling up', async ({ page }) => {
  await page.goto('/')
  const header = page.locator('.site-header')
  await expect(header).toBeInViewport()
  for (let step = 0; step < 3; step++) { await page.mouse.wheel(0, 300); await page.waitForTimeout(150) }
  await expect(page.locator('html')).toHaveAttribute('data-header-hidden', '')
  await expect.poll(async () => (await header.boundingBox())!.y).toBeLessThan(-10)
  await page.mouse.wheel(0, -200)
  await expect(page.locator('html')).not.toHaveAttribute('data-header-hidden', '')
  await expect.poll(async () => (await header.boundingBox())!.y).toBeGreaterThanOrEqual(-1)
})
