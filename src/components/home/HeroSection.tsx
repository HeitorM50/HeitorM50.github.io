import { site, type Locale } from '@/data/portfolio'
import { Button } from '../hud/Button'
import { Glyph } from '../hud/Glyph'
import { Barcode } from '../hud/Panel'

// 01 Hero // fixado. Card seguro pela mão robótica; gira 360° com a rolagem
// (GSAP no desktop, runtime estático no celular). Ângulo em --rig-angle, face em data-face.
export function HeroSection({ locale }: { locale: Locale }) {
  const pt = locale === 'pt'
  return <section className="section hero" id="inicio" aria-labelledby="hero-title" data-section data-bg="neon" data-bg-word="HEITOR RICARDO">
    <div className="hero__backdrop" aria-hidden="true">
      <span className="giant-number">01</span>
      <span className="dial-orbit" data-fx-loop><svg className="dial" viewBox="0 0 200 200"><g><circle cx="100" cy="100" r="96" /><circle cx="100" cy="100" r="72" /><path d="M100 4v16M100 180v16M4 100h16M180 100h16" />{Array.from({ length: 36 }, (_, i) => <line key={i} x1="100" y1="8" x2="100" y2={i % 3 ? 14 : 20} transform={`rotate(${i * 10} 100 100)`} />)}</g></svg></span>
    </div>
    <div className="container hero__grid">
      <div className="hero__copy">
        <p className="hero__status mono"><span className="status-dot" aria-hidden="true">●</span> {pt ? 'ABERTO A ESTÁGIO · BRASÍLIA OU REMOTO' : 'OPEN TO INTERNSHIPS · BRASÍLIA OR REMOTE'}</p>
        <h1 className="hero__title" id="hero-title"><span className="hero__line hero__line--brand">HEITOR</span> <span className="hero__line">RICARDO</span></h1>
        <p className="hero__role mono">{pt ? 'ENG. SOFTWARE // EMBARCADOS' : 'SOFTWARE ENG. // EMBEDDED'}</p>
        <p className="hero__intro">{pt ? 'Estudante na UnB. Desenvolvo backend, soluções de dados e sistemas embarcados com Python, TypeScript, C++ e Rust.' : 'Student at UnB. I build backends, data solutions and embedded systems with Python, TypeScript, C++ and Rust.'}</p>
        <div className="hero__actions">
          <Button href="#projetos">{pt ? 'Ver projetos' : 'See projects'}</Button>
          <Button href={site.cv} variant="secondary" arrow={false}>{pt ? 'Currículo' : 'Résumé'} <small>PDF</small></Button>
        </div>
      </div>
      <div className="hero__rig" data-hero-rig data-face="front">
        {/* Mão: arte do Heitor recortada e em duotone (images/mao-robotica.jpg). O polegar é
            uma camada separada, acima do card, para o card parecer seguro pela mão. */}
        <picture className="hand hand--back">
          <source srcSet="/media/mao-robotica.avif" type="image/avif" />
          <img src="/media/mao-robotica.webp" alt="" width={736} height={1318} decoding="async" />
        </picture>
        <div className="id-card" data-id-card>
          <div className="id-card__face id-card__face--front chamfer-md">
            <div className="id-card__top mono"><span>ID</span><strong>HR_47</strong><Barcode /></div>
            <picture>
              <source srcSet="/media/retrato.avif" type="image/avif" />
              <img className="id-card__photo duotone" src="/media/retrato.webp" alt={pt ? 'Retrato de Heitor Ricardo' : 'Portrait of Heitor Ricardo'} width={1024} height={1024} fetchPriority="high" decoding="async" />
            </picture>
            <div className="id-card__bottom"><strong>HEITOR RICARDO</strong><span className="mono">{pt ? 'ENG. SOFTWARE · UnB' : 'SOFTWARE ENG. · UnB'}</span></div>
          </div>
          <div className="id-card__face id-card__face--back chamfer-md" aria-hidden="true">
            <div className="id-card__top mono"><span>{pt ? 'CONTATO' : 'CONTACT'}</span><strong>HR_47</strong></div>
            <p className="mono id-card__status"><span aria-hidden="true">●</span> {pt ? 'ABERTO A ESTÁGIO' : 'OPEN TO INTERNSHIPS'}</p>
            <dl className="id-card__contacts mono">
              <div><dt>E-MAIL</dt><dd>{site.email}</dd></div>
              <div><dt>GITHUB</dt><dd>/HeitorM50</dd></div>
              <div><dt>LINKEDIN</dt><dd>/in/heitor-ricardo</dd></div>
              <div><dt>{pt ? 'BASE' : 'BASED IN'}</dt><dd>{pt ? 'BRASÍLIA — DF · REMOTO' : 'BRASÍLIA — DF · REMOTE'}</dd></div>
            </dl>
            <p className="id-card__org">HEITORM50.GITHUB.IO</p>
            <Glyph name="mira" className="id-card__glyph" />
          </div>
        </div>
        <picture className="hand hand--front">
          <source srcSet="/media/mao-robotica-polegar.avif" type="image/avif" />
          <img src="/media/mao-robotica-polegar.webp" alt="" width={148} height={413} decoding="async" />
        </picture>
        {/* Mão 3D (three.js) entra aqui no desktop; o 2D acima é o fallback. */}
        <div className="hand3d" data-hand3d aria-hidden="true" />
        <ul className="rig-labels mono" aria-hidden="true">
          <li data-rig-label="front">{pt ? 'FRENTE' : 'FRONT'} {'//'} 000°</li>
          <li data-rig-label="data">{pt ? 'DADOS' : 'DATA'} {'//'} HR_47 {'//'} ROT <span data-rig-angle>000</span>°</li>
          <li data-rig-label="back">{pt ? 'VERSO' : 'BACK'} {'//'} 180°</li>
        </ul>
      </div>
    </div>
  </section>
}
