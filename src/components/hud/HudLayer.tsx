import { sections } from '@/data/sections'

// Camada HUD fixa nas margens (DESIGN_SPEC §5 e §6 "Camadas globais").
// Inteiramente decorativa: o mesmo conteúdo existe no documento.
export function HudLayer() {
  const total = String(sections.length).padStart(2, '0')
  return <div className="hud" aria-hidden="true">
    <div className="hud__rail hud__rail--left">
      <span className="hud__mark" />
      <span className="hud__vertical">HR.SYS // V2 // BRASÍLIA — DF</span>
      <span className="hud__chevrons"><i /><i /><i /></span>
      <span className="hud__mark" />
    </div>
    <div className="hud__rail hud__rail--right">
      <span className="hud__mark" />
      <span className="hud__counter">SEC <b className="hud__odometer" data-hud-section>01</b>/{total}</span>
      <span className="hud__percent"><span data-hud-percent>000</span>%</span>
      <span className="hud__mode" data-hud-mode>VERTICAL</span>
      <span className="hud__matrix" data-fx-loop><i /><i /><i /><i /></span>
      <span className="hud__mark" />
    </div>
    <div className="hud__progress"><span data-hud-progress /></div>
  </div>
}
