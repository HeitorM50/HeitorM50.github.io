import Link from 'next/link'
import { Boxes, BriefcaseBusiness, Mail, Milestone, SunMoon, UserRound } from 'lucide-react'
import { copy, type Locale } from '@/data/portfolio'
import { Dock, DockIcon, DockItem, DockLabel } from '@/components/ui/dock'
import { MetallicLogo } from '@/components/ui/metallic-paint'

type HeaderProps = {
  locale: Locale
  alternateHref: string
}

export function Header({ locale, alternateHref }: HeaderProps) {
  const text = copy[locale]
  const home = locale === 'pt' ? '/' : '/en/'
  const portugueseHref = locale === 'en' ? alternateHref : '/'
  const englishHref = locale === 'pt' ? alternateHref : '/en/'
  const items = [
    { label: text.nav.about, href: `${home}#sobre`, icon: UserRound },
    { label: text.nav.work, href: `${home}#projetos`, icon: BriefcaseBusiness },
    { label: 'Stack', href: `${home}#stack`, icon: Boxes },
    { label: text.nav.experience, href: `${home}#exp`, icon: Milestone },
    { label: text.nav.contact, href: `${home}#contato`, icon: Mail },
  ]

  return (
    <header className="site-header">
      <nav className="dock-navigation" aria-label="Primary">
        <Dock label={text.menuLabel} itemSize={36} magnification={64} distance={130}>
          <div className="dock-brand" role="img" aria-label="Heitor Ricardo">
            <MetallicLogo />
          </div>

          <span className="dock-separator" aria-hidden="true" />

          {items.map(({ label, href, icon: Icon }) => (
            <DockItem key={href}>
              <DockLabel>{label}</DockLabel>
              <DockIcon>
                <a className="dock-action" href={href} aria-label={label}>
                  <Icon aria-hidden="true" />
                </a>
              </DockIcon>
            </DockItem>
          ))}

          <span className="dock-separator" aria-hidden="true" />

          <div className="dock-language" aria-label={text.languageLabel}>
            <Link className={locale === 'pt' ? 'active' : ''} href={portugueseHref} hrefLang="pt-BR" aria-label={locale === 'en' ? text.languageLabel : undefined}>PT</Link>
            <Link className={locale === 'en' ? 'active' : ''} href={englishHref} hrefLang="en" aria-label={locale === 'pt' ? text.languageLabel : undefined}>EN</Link>
          </div>

          <DockItem>
            <DockLabel>{text.themeLabel}</DockLabel>
            <DockIcon>
              <button className="dock-action dock-theme" type="button" data-theme-toggle aria-label={text.themeLabel}>
                <SunMoon aria-hidden="true" />
              </button>
            </DockIcon>
          </DockItem>
        </Dock>
      </nav>
    </header>
  )
}
