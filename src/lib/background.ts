// Motor do fundo "contracorrente" (design/BACKGROUND_SPEC.md). Um único loop lê
// scrollY e a velocidade suavizada e escreve só transform/opacity. Dimensões ficam
// em cache (recalculadas no resize). O loop dorme quando a rolagem para e o glitch
// já apagou. Reduced-motion: camadas paradas em q = 0, sem glitch; os triângulos
// continuam mostrando o progresso (é informação).
import { mountMarble } from './marble'

type Group = 'neon' | 'melt' | 'liquid' | 'glitch'
const groups: Group[] = ['neon', 'melt', 'liquid', 'glitch']
const COLUMN_LINE = 14

export function initBackground() {
  const root = document.querySelector<HTMLElement>('[data-bg-root]')
  if (!root) return
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  const mobileQuery = matchMedia('(max-width: 639px)')
  const el = (name: string) => root.querySelector<HTMLElement | SVGElement>(`[data-bg-el="${name}"]`)
  const all = <T extends Element>(selector: string) => Array.from(root.querySelectorAll<T>(selector))
  const parts = {
    grid: el('grid'), letH: el('letH'), letR: el('letR'), stairA: el('stairA'), stairB: el('stairB'), colL: el('colL'), colR: el('colR'),
    beamsA: el('beamsA'), beamsB: el('beamsB'), wire: el('wire'), panelA: el('panelA'), panelB: el('panelB'),
    row0: el('row0'), row1: el('row1'), row2: el('row2'), italics: el('italics'), barcode: el('barcode'), vlabel: el('vlabel'), advisory: el('advisory')
  }
  const groupNodes = Object.fromEntries(groups.map(name => [name, root.querySelector<HTMLElement>(`[data-bg-group="${name}"]`)])) as Record<Group, HTMLElement | null>
  const stars = all<SVGPathElement>('[data-bg-star]')
  const triangles = all<SVGPolygonElement>('[data-bg-triangle]')
  const words = all<HTMLElement>('[data-bg-word]')
  const firsts = all<HTMLElement>('[data-bg-first]')
  const slices = all<HTMLElement>('[data-bg-slice]').map(node => ({ node, dir: Number(node.dataset.dir), k: Number(node.dataset.k) }))
  const drips = all<HTMLElement>('[data-bg-drip]').map(node => ({ node, k: Number(node.dataset.k) }))
  const pixels = all<HTMLElement>('[data-bg-pixel]')
  const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-bg]'))
  // o shader do mármore só compila na primeira vez que o grupo LIQUID liga (tira trabalho do carregamento)
  let marble: ReturnType<typeof mountMarble> | undefined
  const marbleCanvas = root.querySelector<HTMLCanvasElement>('[data-bg-marble]')

  // cache de medidas (nenhuma leitura de layout dentro do loop)
  let vh = innerHeight, max = 1, mobile = mobileQuery.matches, speed = mobile ? 0.6 : 1, sectionTops: number[] = []
  function measure() {
    vh = innerHeight
    max = Math.max(1, document.documentElement.scrollHeight - vh)
    mobile = mobileQuery.matches
    speed = mobile ? 0.6 : 1
    // seção travada pelo GSAP vive dentro de um .pin-spacer: mede o invólucro
    sectionTops = sections.map(section => {
      const anchor = section.parentElement?.classList.contains('pin-spacer') ? section.parentElement : section
      return anchor.getBoundingClientRect().top + scrollY
    })
    current = -1
    schedule()
  }

  let current = -1, active: Group[] = []
  function applySection(index: number) {
    current = index
    const section = sections[index]
    if (!section) return
    let wanted = (section.dataset.bg ?? 'neon').split(',').filter(Boolean) as Group[]
    if (mobile) wanted = wanted.slice(0, 1)
    if (reduce) wanted = wanted.filter(name => name !== 'glitch')
    active = wanted
    for (const name of groups) groupNodes[name]?.toggleAttribute('data-on', wanted.includes(name))
    const word = section.dataset.bgWord ?? ''
    if (root!.dataset.word === word) return
    // a pilha some (250ms) antes de trocar o texto, para não "pular" na frente do usuário
    root!.dataset.word = word
    root!.toggleAttribute('data-swapping', true)
    setTimeout(() => {
      const repeated = `${word} // `.repeat(10)
      words.forEach(node => { node.textContent = repeated })
      firsts.forEach(node => { node.textContent = word.split(' ')[0] })
      root!.toggleAttribute('data-swapping', false)
    }, 250)
  }

  const move = (node: Element | null, x: number, y = 0) => { if (node) (node as HTMLElement).style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0)` }
  const wrap = (value: number, size: number) => ((value % size) + size) % size

  let last = scrollY, velocity = 0, frame = 0, lastTriangle = -1
  function render() {
    frame = 0
    const y = scrollY
    velocity = velocity * 0.85 + (y - last) * 0.15
    last = y
    const q = reduce ? 0 : y * speed
    const progress = Math.min(1, Math.max(0, y / max))

    // seção ativa: a última cujo topo passou da metade da tela
    let index = 0
    for (let i = 0; i < sectionTops.length; i++) if (sectionTops[i] <= y + vh / 2) index = i
    if (index !== current) applySection(index)

    move(parts.grid, 0, -wrap(q * 0.3, 40))
    if (active.includes('neon')) {
      move(parts.letH, -q * 0.12, q * 0.05)
      move(parts.letR, q * 0.12, -q * 0.08)
      move(parts.stairA, wrap(q * 0.18, 600), wrap(q * 0.18, 600))
      move(parts.stairB, -wrap(q * 0.22, 600), -wrap(q * 0.22, 600))
      const columnHeight = 80 * COLUMN_LINE
      move(parts.colL, 0, wrap(q * 0.5, columnHeight) - columnHeight)
      move(parts.colR, 0, -wrap(q * 0.9, columnHeight))
      parts.beamsA?.setAttribute('transform', `translate(${wrap(q * 0.25, 400).toFixed(1)},${(-wrap(q * 0.08, 150)).toFixed(1)})`)
      parts.beamsB?.setAttribute('transform', `translate(${(-wrap(q * 0.25, 400)).toFixed(1)},${(-wrap(q * 0.1, 150)).toFixed(1)})`)
      parts.wire?.setAttribute('transform', `translate(0,${wrap(q * 0.2, 300).toFixed(1)})`)
    }
    if (active.includes('melt')) {
      move(parts.panelA, 0, wrap(q * 0.35, vh + 260) - 130)
      move(parts.panelB, 0, -wrap(q * 0.6, vh + 300) + 150)
      const turn = `rotate(${(q * 0.3).toFixed(1)})`
      stars.forEach(star => star.setAttribute('transform', turn))
    }
    if (active.includes('liquid')) {
      move(parts.row0, -wrap(q * 0.5, 2000))
      move(parts.row1, wrap(q * 0.5, 2000) - 2000)
      move(parts.row2, -wrap(q * 0.8, 2000))
      move(parts.italics, 0, wrap(q * 0.4, 400) - 150)
      move(parts.vlabel, 0, -wrap(q * 0.4, 400) + 100)
      move(parts.advisory, -wrap(q * 0.3, 800) + 200)
      move(parts.barcode, 0, wrap(q * 0.15, 160))
      if (marble === undefined) marble = mountMarble(marbleCanvas, reduce)
      marble?.draw(q * 0.35)
    }
    // triângulos acendem em degraus com o progresso da página (informação: vale com reduced-motion)
    const lit = Math.min(4, Math.floor(progress * 5.0001))
    if (lit !== lastTriangle) {
      lastTriangle = lit
      triangles.forEach((triangle, position) => triangle.setAttribute('data-state', position < lit ? 'past' : position === lit ? 'now' : 'off'))
    }
    // BORBOLETA: nasce e morre com a velocidade suavizada (sem estrobo)
    const amount = reduce || !active.includes('glitch') ? 0 : Math.min(1, Math.abs(velocity) / 18)
    slices.forEach(slice => { slice.node.style.opacity = amount > 0.08 ? String(amount) : '0'; slice.node.style.transform = `translate3d(${(slice.dir * velocity * 6 * slice.k).toFixed(1)}px,0,0)` })
    drips.forEach(drip => { drip.node.style.opacity = amount > 0.08 ? String(amount * 0.8) : '0'; drip.node.style.transform = `scaleY(${Math.min(2.5, amount * 2 * drip.k).toFixed(2)})` })
    pixels.forEach(pixel => { pixel.style.opacity = amount > 0.2 ? String(amount * 0.9) : '0' })

    // continua enquanto houver movimento; dorme quando a rolagem e o glitch param
    if (!document.hidden && (Math.abs(velocity) > 0.05 || Math.abs(scrollY - last) > 0)) frame = requestAnimationFrame(render)
  }
  function schedule() { if (!frame && !document.hidden) frame = requestAnimationFrame(render) }

  addEventListener('scroll', schedule, { passive: true })
  // várias mudanças de altura seguidas (imagens carregando) viram uma medição por quadro
  let pending = 0
  const remeasure = () => { if (!pending) pending = requestAnimationFrame(() => { pending = 0; measure() }) }
  addEventListener('resize', remeasure, { passive: true })
  mobileQuery.addEventListener('change', remeasure)
  document.addEventListener('visibilitychange', schedule)
  new ResizeObserver(remeasure).observe(document.body)
  measure()
  root.dataset.ready = 'true'
}
