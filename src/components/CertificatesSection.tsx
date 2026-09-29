import { ArrowUpRight } from 'lucide-react'
import { certificateCategories, certificates } from '@/data/certificates'
import type { Locale } from '@/data/portfolio'

import { OrganizationMark } from './OrganizationMark'

export function CertificatesSection({ locale }: { locale: Locale }) {
  const pt = locale === 'pt'
  return <section className="legacy-section" id="certificados" aria-labelledby="certificates-title">
    <div className="content-shell">
      <div className="split-heading"><div>
        <p className="section-index">04 — {pt ? 'FORMAÇÃO COMPLEMENTAR' : 'CONTINUING EDUCATION'}</p>
        <h2 className="section-title" id="certificates-title">{pt ? 'Certificados e atividades' : 'Certificates and activities'}</h2>
      </div></div>
      <div className="certificate-grid">{certificateCategories.map(category => {
        return <section className="certificate-group" key={category.id} aria-labelledby={`certificate-${category.id}`}>
          <h3 id={`certificate-${category.id}`}>{category.label[locale]}</h3>
          <ul>{certificates.filter(item => item.category === category.id).map(item => <li key={item.id}>
            <OrganizationMark id={item.organizationId} /><div className="certificate-copy"><h4>{item.title[locale]}</h4><p>{item.issuer}</p>
            {(item.date || item.hours) && <p className="certificate-details">{[item.date?.[locale], item.hours && `${item.hours} ${pt ? 'horas' : 'hours'}`].filter(Boolean).join(' · ')}</p>}
            </div>{item.document && <a className="certificate-link" href={item.document} target="_blank" rel="noreferrer" aria-label={`${pt ? 'Ver certificado' : 'View certificate'}: ${item.title[locale]} (PDF)`}><span>PDF</span><ArrowUpRight size={16} aria-hidden="true" /></a>}
          </li>)}</ul>
        </section>
      })}</div>
    </div>
  </section>
}
