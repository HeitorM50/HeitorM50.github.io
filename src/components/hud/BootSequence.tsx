import type { Locale } from '@/data/portfolio'

// Sequência de inicialização (DESIGN_SPEC §8). Só aparece quando o runtime estático
// marca <html data-boot="on">: primeira visita, sem reduced-motion e só na home.
// Sem JS ela nunca aparece; o conteúdo da página existe por baixo desde o início.
// Sem botão de pular (decisão do Heitor); o teto de 2,5s e a tecla Esc encerram.
export function BootSequence({ locale }: { locale: Locale }) {
  const pt = locale === 'pt'
  const steps = [
    { id: 'fonts', label: pt ? 'CARREGANDO FONTES' : 'LOADING FONTS' },
    { id: 'media', label: pt ? 'CARREGANDO IMAGENS' : 'LOADING IMAGES' },
    { id: 'module', label: pt ? 'CARREGANDO MÓDULO 3D' : 'LOADING 3D MODULE' },
    { id: 'scenes', label: pt ? 'CALIBRANDO PINÇA' : 'CALIBRATING GRIP' }
  ]
  return <div className="boot" data-boot-root role="dialog" aria-modal="true" aria-labelledby="boot-title" tabIndex={-1}
    data-pending={pt ? 'PENDENTE' : 'PENDING'} data-ok="OK" data-fallback="2D">
    <span className="boot__curtain boot__curtain--left" aria-hidden="true" />
    <span className="boot__curtain boot__curtain--right" aria-hidden="true" />
    <div className="boot__panel chamfer-md">
      <p className="boot__title mono" id="boot-title">SYS:// BOOT HR.OS V2</p>
      <ol className="boot__log mono" aria-live="polite">
        {steps.map(step => <li key={step.id} data-boot-step={step.id}>&gt; {step.label} <span className="boot__dots">...</span> <span data-boot-status /></li>)}
        <li className="boot__final" data-boot-step="done">&gt; {pt ? 'SINAL ESTÁVEL // ACESSO LIBERADO' : 'SIGNAL STABLE // ACCESS GRANTED'}</li>
      </ol>
      <div className="boot__meter" aria-hidden="true">
        <span className="boot__bar">{Array.from({ length: 20 }, (_, index) => <i key={index} />)}</span>
        <span className="mono"><span data-boot-percent>000</span>%</span>
      </div>
    </div>
  </div>
}
