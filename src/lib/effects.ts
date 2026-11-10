// Efeitos da fase 7 (DESIGN_SPEC §8). Regra-mestra: o digital anda em degraus
// (decodificação, contador, glitch), o físico anda suave (letras, entradas).
// Entradas acontecem uma vez por visita; loops de ambiente pausam fora da tela.
// O CSS só esconde o estado inicial com <html data-fx>, que o runtime estático marca
// cedo (sem reduced-motion) e tira sozinho se este módulo não carregar.

const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#_'

function once(elements: Element[], handler: (element: HTMLElement) => void, rootMargin = '0px 0px -12% 0px') {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue
      observer.unobserve(entry.target)
      handler(entry.target as HTMLElement)
    }
  }, { rootMargin, threshold: 0.15 })
  elements.forEach(element => observer.observe(element))
}

// Rótulo mono SEC_0N: caracteres embaralham e travam (600ms, quadro de 40ms).
function decode(element: HTMLElement) {
  const text = element.textContent ?? ''
  const frames = 15
  let frame = 0
  const timer = setInterval(() => {
    frame++
    const locked = Math.floor((frame / frames) * text.length)
    element.textContent = [...text].map((char, index) => index < locked || char === ' ' || char === '/' ? char : glyphs[Math.floor(Math.random() * glyphs.length)]).join('')
    if (frame >= frames) { clearInterval(timer); element.textContent = text }
  }, 40)
}

// Título: palavras inteiras (para quebrar linha certo) com letras que sobem uma a uma.
function splitLetters(element: HTMLElement) {
  if (element.dataset.split) return
  const text = element.textContent ?? ''
  element.dataset.split = 'true'
  let index = 0
  const words = text.split(/(\s+)/)
  element.textContent = ''
  for (const word of words) {
    if (/^\s+$/.test(word)) { element.append(document.createTextNode(' ')); continue }
    const wrapper = document.createElement('span')
    wrapper.className = 'fx-word'
    wrapper.setAttribute('aria-hidden', 'true')
    for (const char of word) {
      const letter = document.createElement('span')
      letter.className = 'fx-char'
      letter.style.setProperty('--i', String(index++))
      letter.textContent = char
      wrapper.append(letter)
    }
    element.append(wrapper)
  }
}

// Contador em degraus do destaque: P12 → P1.
function countdown(element: HTMLElement) {
  const final = element.textContent ?? 'P1'
  let value = 12
  element.textContent = `P${value}`
  const timer = setInterval(() => {
    value--
    element.textContent = value <= 1 ? final : `P${value}`
    if (value <= 1) clearInterval(timer)
  }, 80)
}

// Loops de ambiente rodam só enquanto estão na tela.
function pauseOffscreen(elements: Element[]) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) (entry.target as HTMLElement).toggleAttribute('data-fx-paused', !entry.isIntersecting)
  })
  elements.forEach(element => { (element as HTMLElement).setAttribute('data-fx-paused', ''); observer.observe(element) })
}

function start() {
  const begun = performance.now()
  const root = document.documentElement
  const $$ = <T extends Element = HTMLElement>(selector: string) => Array.from(document.querySelectorAll<T>(selector))

  const titles = $$('.section-title, .hero__line, .case-hero h1, .not-found h1')
  // Letras em inline-block fazem o leitor de tela soletrar: o heading guarda o texto
  // original como nome acessível antes da divisão, e as letras ficam aria-hidden.
  for (const title of titles) {
    const heading = title.closest<HTMLElement>('h1, h2, h3')
    if (heading && !heading.hasAttribute('aria-label')) heading.setAttribute('aria-label', (heading.textContent ?? '').replace(/\s+/g, ' ').trim())
  }
  titles.forEach(splitLetters)
  once(titles, title => title.classList.add('is-in'), '0px')

  once($$('[data-decode]'), decode)
  once($$('[data-stagger]'), group => group.classList.add('is-in'))
  once($$('[data-scan]'), image => image.classList.add('is-in'))
  once($$('[data-signal]'), path => path.closest('svg')?.classList.add('is-in'))
  once($$('[data-position-counter]'), countdown)
  once($$('[data-glitch-entry]'), element => { element.classList.add('is-glitching'); setTimeout(() => element.classList.remove('is-glitching'), 400) })
  pauseOffscreen($$('[data-fx-loop]'))
  root.dataset.fxReady = 'true'
  performance.measure('hr:effects-start', { start: begun, end: performance.now() })
}

export function initEffects() {
  const root = document.documentElement
  if (!root.dataset.fx) return
  // entradas esperam o boot terminar (senão rodariam por baixo da cortina)
  if (root.dataset.boot) document.addEventListener('hr:boot-done', start, { once: true })
  else start()
}
