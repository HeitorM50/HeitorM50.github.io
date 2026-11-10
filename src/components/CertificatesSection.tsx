import { certificateCategories, certificates, type Certificate } from '@/data/certificates'
import type { Locale } from '@/data/portfolio'
import { SectionHeader } from './hud/SectionHeader'
import { Barcode, Tag } from './hud/Panel'
import { OrganizationMark } from './OrganizationMark'

// Extensão universitária: só estes ficam visíveis; o resto abre pelo botão "ver mais".
const featuredExtension = ['unbaja-extension', 'unb-pytorch-deep-learning', 'unb-secure-code']

function Badge({ item, locale }: { item: Certificate; locale: Locale }) {
  const pt = locale === 'pt'
  return <li className="badge chamfer-md">
    <div className="badge__head">
      <OrganizationMark id={item.organizationId} />
      {item.credential ? <Tag tone="verified">{pt ? 'Verificado' : 'Verified'}</Tag> : <Barcode />}
    </div>
    <div className="badge__copy">
      <h4>{item.title[locale]}</h4>
      <p className="mono">{[item.issuer, item.date?.[locale], item.hours && `${item.hours} h`].filter(Boolean).join(' · ')}</p>
    </div>
    {item.credential && <a className="badge__link lock" href={item.credential} target="_blank" rel="noreferrer" aria-label={`${pt ? 'Verificar credencial' : 'Verify credential'}: ${item.title[locale]} (Credly)`}><span className="mono">CREDLY ↗</span></a>}
    {item.document && <a className="badge__link lock" href={item.document} target="_blank" rel="noreferrer" aria-label={`${pt ? 'Ver certificado' : 'View certificate'}: ${item.title[locale]} (PDF)`}><span className="mono">PDF ↗</span></a>}
  </li>
}

// Certificações // vertical. Crachás compactos com código de barras, uma coluna
// por categoria no desktop. O selo é o tipo registrado nos dados.
export function CertificatesSection({ locale }: { locale: Locale }) {
  const pt = locale === 'pt'
  return <section className="section credentials" id="certificados" aria-labelledby="certificates-title" data-section data-bg="melt" data-bg-word={pt ? 'CREDENCIAIS' : 'CREDENTIALS'}>
    <div className="container">
      <SectionHeader id="certificados" locale={locale} titleId="certificates-title" title={pt ? 'Certificados e atividades' : 'Certificates and activities'} />
      <div className="certificate-grid">{certificateCategories.map(category => {
        const items = certificates.filter(item => item.category === category.id)
        const visible = category.id === 'extension' ? items.filter(item => featuredExtension.includes(item.id)) : items
        const more = items.filter(item => !visible.includes(item))
        return <section className="certificate-group" key={category.id} aria-labelledby={`certificate-${category.id}`}>
          <h3 id={`certificate-${category.id}`} className="mono"><span>{category.label[locale].toUpperCase()}</span><span aria-hidden="true">{String(items.length).padStart(2, '0')}</span></h3>
          <ul data-stagger>{visible.map(item => <Badge key={item.id} item={item} locale={locale} />)}</ul>
          {more.length > 0 && <details className="certificate-more">
            <summary className="certificate-more__toggle lock mono">
              <span data-when="closed">{pt ? `Ver mais ${more.length}` : `Show ${more.length} more`} +</span>
              <span data-when="open">{pt ? 'Mostrar menos' : 'Show less'} −</span>
            </summary>
            <ul>{more.map(item => <Badge key={item.id} item={item} locale={locale} />)}</ul>
          </details>}
        </section>
      })}</div>
    </div>
  </section>
}
