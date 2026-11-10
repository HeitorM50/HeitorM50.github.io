// Cenas de rolagem (fase 4 do DESIGN_SPEC): seções fixadas, trilho horizontal de
// projetos. Empacotado por scripts/build-scroll.mjs em
// public/vendor/scroll/scroll.js e carregado pelo runtime estático só em desktop
// com ponteiro fino e sem prefers-reduced-motion. No celular nada é sequestrado.
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { Hand } from './hero-hand-3d'

gsap.registerPlugin(ScrollTrigger)

// Mesma consulta usada em src/data/static-runtime.ts (lá precisa ser literal, o runtime é inline).
const scenesQuery = '(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)'

const headerHeight = () => (document.querySelector('.site-header') as HTMLElement | null)?.offsetHeight ?? 0

// Seção que cabe na tela trava pelo topo (abaixo do cabeçalho); seção mais alta
// trava quando o fim dela encosta no fim da tela, para nada ficar escondido.
function pinStart(section: HTMLElement) {
  return () => section.offsetHeight > innerHeight - headerHeight() ? 'bottom bottom' : `top top+=${headerHeight()}`
}

function setMode(horizontal: boolean) {
  const mode = document.querySelector<HTMLElement>('[data-hud-mode]')
  if (!mode) return
  mode.textContent = horizontal ? 'HORIZONTAL' : 'VERTICAL'
  mode.toggleAttribute('data-active', horizontal)
}

// Mesma regra do runtime estático (celular): ângulo → face que os rótulos destacam.
export function setRigAngle(rig: HTMLElement, angle: number) {
  const turn = ((angle % 360) + 360) % 360
  rig.style.setProperty('--rig-angle', `${angle.toFixed(2)}deg`)
  rig.dataset.face = turn < 60 || turn > 300 ? 'front' : turn >= 120 && turn <= 240 ? 'back' : 'data'
  rig.dataset.photo = angle >= 180 ? 'natural' : 'duotone'
  const readout = rig.querySelector('[data-rig-angle]')
  if (readout) readout.textContent = String(Math.round(turn)).padStart(3, '0')
}

// Avisa o boot (runtime estático) de como a mão terminou de carregar.
function announceHand(status: '3d' | '2d') {
  document.documentElement.dataset.handStatus = status
  delete document.documentElement.dataset.handPending
  document.dispatchEvent(new CustomEvent('hr:hand', { detail: status }))
}

function heroScene() {
  const hero = document.querySelector<HTMLElement>('#inicio')
  if (!hero) return
  const rig = hero.querySelector<HTMLElement>('[data-hero-rig]')
  const card = { angle: 0, zoom: 0 }
  // Mão 3D: chunk separado (three.js), só depois das cenas. Se não montar, fica o 2D.
  let hand: Hand | null = null, cancelled = false
  if (rig) import('./hero-hand-3d')
    .then(module => module.mountHand(rig, { force: new URLSearchParams(location.search).has('hand3d') }))
    .then(mounted => { if (cancelled) mounted?.dispose(); else { hand = mounted; hand?.setAngle(card.angle, card.zoom) } announceHand(mounted && !cancelled ? '3d' : '2d') })
    .catch(() => announceHand('2d'))
  const timeline = gsap.timeline({
    // A barra do topo se esconde ao rolar para baixo, então o hero trava no topo da tela.
    scrollTrigger: { trigger: hero, start: 'top top', end: '+=120%', pin: true, scrub: 0.6, invalidateOnRefresh: true }
  })
  timeline
    .to(hero.querySelector('.dial'), { rotate: 120, ease: 'none', duration: 1 }, 0)
    .to(hero.querySelector('.hero__backdrop .giant-number'), { yPercent: -35, ease: 'none', duration: 1 }, 0)
    // o texto recua enquanto a câmera se aproxima do card
    .to(hero.querySelector('.hero__copy'), { y: -32, opacity: 0.18, ease: 'power1.in', duration: 0.7 }, 0)
    .to(hero.querySelector('.rig-labels'), { opacity: 0.35, ease: 'power1.in', duration: 0.7 }, 0)
    .to(card, { zoom: 1, ease: 'power1.inOut', duration: 0.7, onUpdate: () => hand?.setAngle(card.angle, card.zoom) }, 0)
    // O giro é físico: suave nas pontas (DESIGN_SPEC §8, regra-mestra).
    .to(card, { angle: 360, ease: 'power1.inOut', duration: 1, onUpdate: () => { if (rig) setRigAngle(rig, card.angle); hand?.setAngle(card.angle, card.zoom) } }, 0)
  return () => { cancelled = true; hand?.dispose(); hand = null; if (rig) setRigAngle(rig, 0) }
}

function highlightScene() {
  const section = document.querySelector<HTMLElement>('#destaque')
  if (!section) return
  gsap.timeline({
    scrollTrigger: { trigger: section, start: pinStart(section), end: '+=40%', pin: true, scrub: 0.6, invalidateOnRefresh: true }
  })
    .fromTo(section.querySelector('.race-stripes'), { xPercent: -6 }, { xPercent: 6, ease: 'none' }, 0)
    .to(section.querySelector('.giant-number--p1'), { yPercent: -25, ease: 'none' }, 0)
}

function railScene() {
  const section = document.querySelector<HTMLElement>('#projetos')
  const rail = section?.querySelector<HTMLElement>('[data-rail]')
  const track = section?.querySelector<HTMLElement>('[data-rail-track]')
  if (!section || !rail || !track) return
  const items = Array.from(track.querySelectorAll<HTMLElement>('.rail__item'))
  const segments = Array.from(section.querySelectorAll<HTMLElement>('[data-rail-segment]'))
  const index = section.querySelector<HTMLElement>('[data-rail-index]')
  const distance = () => Math.max(0, track.scrollWidth - rail.clientWidth)
  rail.dataset.pinned = 'true'

  function paint(progress: number) {
    const active = Math.min(items.length - 1, Math.round(progress * (items.length - 1)))
    if (index) index.textContent = String(active + 1)
    segments.forEach((segment, position) => segment.toggleAttribute('data-active', position <= active))
  }

  const timeline = gsap.timeline({
    scrollTrigger: {
      // Trava quando o trilho fica centrado na área abaixo do cabeçalho.
      trigger: rail, pin: section, start: () => `center ${(innerHeight + headerHeight()) / 2}`, end: () => `+=${distance()}`, scrub: 0.5, invalidateOnRefresh: true,
      onUpdate: self => paint(self.progress), onToggle: self => setMode(self.isActive)
    }
  })
  timeline
    .to(track, { x: () => -distance(), ease: 'none' }, 0)
    .fromTo(section.querySelector('.marquee-word'), { xPercent: -10 }, { xPercent: 10, ease: 'none' }, 0)

  // Teclado: o foco num card desloca o trilho até ele (DESIGN_SPEC §6, seção 05).
  track.addEventListener('focusin', event => {
    const item = (event.target as HTMLElement).closest<HTMLElement>('.rail__item')
    const trigger = timeline.scrollTrigger
    if (!item || !trigger || !trigger.end) return
    const offset = Math.min(distance(), Math.max(0, item.offsetLeft - items[0].offsetLeft))
    const share = distance() ? offset / distance() : 0
    window.scrollTo({ top: trigger.start + share * (trigger.end - trigger.start), behavior: 'instant' })
  })

  return () => { delete rail.dataset.pinned; setMode(false) }
}

export function initScrollScenes() {
  const root = document.documentElement
  const media = gsap.matchMedia()
  media.add(scenesQuery, () => {
    root.dataset.scenes = 'on'
    const cleanupHero = heroScene()
    highlightScene()
    const cleanupRail = railScene()
    document.dispatchEvent(new CustomEvent('hr:scenes'))
    return () => { cleanupRail?.(); cleanupHero?.(); delete root.dataset.scenes; delete root.dataset.handPending }
  })
  document.fonts?.ready.then(() => ScrollTrigger.refresh())
  addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
  return media
}
