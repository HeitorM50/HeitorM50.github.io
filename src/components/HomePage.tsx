import { site, type Locale } from '@/data/portfolio'
import { Header } from './Header'
import { HudLayer } from './hud/HudLayer'
import { DuotoneFilter } from './hud/Duotone'
import { ContraBackground } from './hud/ContraBackground'
import { BootSequence } from './hud/BootSequence'
import { HeroSection } from './home/HeroSection'
import { HighlightSection } from './home/HighlightSection'
import { ProfileSection } from './home/ProfileSection'
import { ProjectsSection } from './home/ProjectsSection'
import { StackSection } from './home/StackSection'
import { CertificatesSection } from './CertificatesSection'
import { ContactSection, DataFooter } from './home/ContactSection'

export function HomePage({ locale }: { locale: Locale }) {
  const pt = locale === 'pt'
  const personSchema = {
    '@context': 'https://schema.org', '@type': 'Person', name: site.fullName, alternateName: site.name,
    url: pt ? site.url : `${site.url}/en/`, email: `mailto:${site.email}`,
    sameAs: [site.github, site.linkedin], jobTitle: pt ? 'Estudante de Engenharia de Software' : 'Software Engineering Student'
  }

  return <div className="page page--home">
    <BootSequence locale={locale} />
    <DuotoneFilter />
    <ContraBackground word="HEITOR RICARDO" />
    <HudLayer />
    <Header locale={locale} alternateHref={pt ? '/en/' : '/'} />
    <main id="conteudo">
      <HeroSection locale={locale} />
      <HighlightSection locale={locale} />
      <ProfileSection locale={locale} />
      <ProjectsSection locale={locale} />
      <StackSection locale={locale} />
      <CertificatesSection locale={locale} />
      <ContactSection locale={locale} />
    </main>
    <DataFooter locale={locale} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
  </div>
}
