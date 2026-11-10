// Ponto de entrada do bundle /vendor/scroll/fx.js: fundo contracorrente (todas as
// telas) e efeitos da fase 7. Carregado pelo runtime estático em todas as páginas,
// quando o navegador fica ocioso. As medidas (performance.measure) ajudam a auditar.
import { initBackground } from './background'
import { initEffects } from './effects'

function timed(name: string, run: () => void) {
  const start = performance.now()
  run()
  performance.measure(name, { start, end: performance.now() })
}

export function initFx() {
  timed('hr:background', initBackground)
  timed('hr:effects', initEffects)
}
