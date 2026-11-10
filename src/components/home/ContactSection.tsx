import { copy, site, type Locale } from '@/data/portfolio'
import { contactFormEndpoint } from '@/data/contact'
import { SectionHeader } from '../hud/SectionHeader'
import { Button, TextLink } from '../hud/Button'
import { Monogram } from '../hud/Logo'

// 08 Contato // fixado. Único lugar com verde/vermelho semânticos (formulário).
export function ContactSection({ locale }: { locale: Locale }) {
  const pt = locale === 'pt'
  const text = copy[locale]
  const configured = Boolean(contactFormEndpoint)
  return <section className="section contact" id="contato" aria-labelledby="contact-title" data-section data-bg="melt,glitch" data-bg-word={pt ? 'CONTATO' : 'CONTACT'}>
    <div className="container contact__grid">
      <div className="contact__intro">
        <span className="contact__logo-wrap" data-glitch-entry><Monogram className="contact__logo" /></span>
        <SectionHeader id="contato" locale={locale} titleId="contact-title" title={pt ? 'Vamos conversar?' : 'Let’s talk'}
          lead={pt ? 'Para oportunidades de estágio, projetos e boas conversas sobre tecnologia.' : 'For internship opportunities, projects and good conversations about technology.'} />
        <ul className="contact__links">
          <li><span className="mono">E-MAIL</span><a className="text-link lock" href={`mailto:${site.email}`}>{site.email}</a></li>
          <li><span className="mono">LINKEDIN</span><TextLink href={site.linkedin} external>linkedin.com/in/heitor-ricardo</TextLink></li>
          <li><span className="mono">GITHUB</span><TextLink href={site.github} external>github.com/HeitorM50</TextLink></li>
          <li><span className="mono">{pt ? 'CURRÍCULO' : 'RÉSUMÉ'}</span><TextLink href={site.cv} external>cv.pdf</TextLink></li>
        </ul>
      </div>
      <div className="contact__side">
      <form className="contact-form chamfer-md" data-contact-form action={configured ? contactFormEndpoint : undefined} method="post" noValidate={configured}>
        <p className="mono contact-form__head">{pt ? 'TRANSMISSÃO // NOVA MENSAGEM' : 'TRANSMISSION // NEW MESSAGE'}</p>
        <label><span className="mono">{pt ? 'NOME' : 'NAME'}</span><input name="name" type="text" autoComplete="name" required maxLength={120} /></label>
        <label><span className="mono">E-MAIL</span><input name="email" type="email" autoComplete="email" required maxLength={200} /></label>
        <label><span className="mono">{pt ? 'MENSAGEM' : 'MESSAGE'}</span><textarea name="message" rows={5} required maxLength={4000} /></label>
        {/* isca anti-spam: humanos não veem; o Formspree descarta envios que a preenchem */}
        <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />
        {!configured && <p className="contact-form__notice placeholder">[ENDPOINT DO FORM] — {pt ? 'formulário ainda não configurado. Use o e-mail ao lado.' : 'form not configured yet. Please use the email address.'}</p>}
        <p className="contact-form__status mono" data-form-status role="status" aria-live="polite" />
        <button className="btn btn--primary lock" type="submit" disabled={!configured}><span className="btn__frame chamfer-sm"><span className="btn__face chamfer-sm">{pt ? 'Enviar' : 'Send'}<span className="btn__arrow" aria-hidden="true">→</span></span></span></button>
      </form>
      <SignalFeed pt={pt} />
      </div>
    </div>
    <span className="sr-only">{text.contactBody}</span>
  </section>
}

// Traço pessoal: monitor de "sinal" com o vídeo da borboleta, em loop e sem som.
// Carrega só perto da tela (runtime estático, data-feed); com movimento reduzido fica no pôster.
function SignalFeed({ pt }: { pt: boolean }) {
  return <figure className="signal-feed">
    <div className="image-window__tabs" aria-hidden="true"><span /><span /><span className="mono">FEED // 0XBF-07</span></div>
    <div className="signal-feed__frame">
      <video className="signal-feed__video" data-feed muted loop playsInline preload="none" width={480} height={420}
        poster="/media/contato-borboleta.webp" aria-label={pt ? 'Animação em loop de uma borboleta luminosa com pontos rastreados' : 'Looping animation of a glowing butterfly with tracked points'}>
        <source data-src="/media/contato-borboleta.webm" type="video/webm" />
        <source data-src="/media/contato-borboleta.mp4" type="video/mp4" />
      </video>
      <span className="signal-feed__scan" aria-hidden="true" />
      <span className="signal-feed__corners" aria-hidden="true"><i /><i /><i /><i /></span>
      <span className="signal-feed__hud signal-feed__hud--top mono" aria-hidden="true"><b className="signal-feed__rec" />REC <span>TRACK // 47 PTS</span></span>
      <span className="signal-feed__hud signal-feed__hud--bottom mono" aria-hidden="true">LEPIDOPTERA.SYS <span>{pt ? 'SINAL' : 'SIGNAL'} ▮▮▮▯</span></span>
    </div>
    <figcaption className="mono">{pt ? 'Arte' : 'Art'}: <a href="https://www.instagram.com/reel/DTwSpGiiC4i/" target="_blank" rel="noreferrer">Spyre Dsign (@samumb97)</a></figcaption>
  </figure>
}

export function DataFooter({ locale }: { locale: Locale }) {
  const pt = locale === 'pt'
  const built = new Date().toISOString().slice(0, 10)
  return <footer className="data-footer">
    <div className="data-footer__ticker" aria-hidden="true" data-fx-loop>{Array.from({ length: 4 }, (_, index) => <span key={index}>LOG {built} {'//'} HR.SYS V2 {'//'} BRASÍLIA — DF {'//'} {pt ? 'SINAL ESTÁVEL' : 'SIGNAL STABLE'} {'//'} </span>)}</div>
    <div className="container data-footer__row">
      <p className="mono">© {new Date().getFullYear()} {site.name} · {copy[locale].footer}</p>
      <figure className="data-footer__signature">
        <blockquote lang="en"><p>“The impediment to action advances action. What stands in the way becomes the way.”</p></blockquote>
        <figcaption className="mono">— Marcus Aurelius{pt ? ', Meditações' : ', Meditations'}</figcaption>
      </figure>
      {/* crédito exigido pela licença CC BY 4.0 do modelo 3D da mão */}
      <p className="data-footer__credit mono">{pt ? 'Mão 3D' : '3D hand'}: <a href="https://sketchfab.com/3d-models/robotic-hand-3e284b06bbb84d858f85f7a246cd65df" target="_blank" rel="noreferrer">“Robotic Hand”</a> {pt ? 'por' : 'by'} <a href="https://sketchfab.com/SeanNicolas" target="_blank" rel="noreferrer">SeanNicolas</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">CC BY 4.0</a>{pt ? ', com pose e materiais alterados' : ', pose and materials modified'}</p>
      <span className="stripe stripe--white" aria-hidden="true" />
      <span className="barcode" aria-hidden="true" />
      <Button href="#contato" arrow={false} className="btn--compact">{pt ? 'Contato' : 'Contact'}</Button>
      <span className="seal mono" aria-hidden="true">V2 // HR.SYS</span>
    </div>
  </footer>
}
