import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import ContributionSkyline, { SKYLINE_LABELS, type ContributionDay } from './ui/contribution-skyline'

export function mountSkyline(target: HTMLElement, data: ContributionDay[], locale: 'pt' | 'en') {
  const root = createRoot(target)
  // Desenha antes de esconder o resumo estático, para o bloco não encolher.
  flushSync(() => root.render(<ContributionSkyline data={data} labels={SKYLINE_LABELS[locale]} locale={locale === 'pt' ? 'pt-BR' : 'en-US'} />))
  return () => root.unmount()
}
