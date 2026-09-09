import Link from 'next/link'
import { copy, type Locale } from '@/data/portfolio'
import { ThemeToggle } from './ThemeToggle'

type HeaderProps = {
  locale: Locale
  alternateHref: string
}

export function Header({ locale, alternateHref }: HeaderProps) {
  const text = copy[locale]
  const home = locale === 'pt' ? '/' : '/en/'

  return (
    <header className="site-header">
      <div className="header-shell">
        <Link className="brand" href={home} aria-label="Heitor Ricardo — home">
          <span className="brand-mark" aria-hidden="true">HR</span>
          <span>Heitor Ricardo</span>
        </Link>

        <details className="nav-disclosure">
          <summary aria-label={text.menuLabel}>
            <span />
            <span />
          </summary>
          <nav aria-label="Primary">
            <a href={`${home}#projetos`}>{text.nav.work}</a>
            <a href={`${home}#trajetoria`}>{text.nav.experience}</a>
            <a href={`${home}#sobre`}>{text.nav.about}</a>
            <a href={`${home}#contato`}>{text.nav.contact}</a>
          </nav>
        </details>

        <nav className="desktop-nav" aria-label="Primary">
          <a href={`${home}#projetos`}>{text.nav.work}</a>
          <a href={`${home}#trajetoria`}>{text.nav.experience}</a>
          <a href={`${home}#sobre`}>{text.nav.about}</a>
          <a href={`${home}#contato`}>{text.nav.contact}</a>
        </nav>

        <div className="header-actions">
          <Link className="language-link" href={alternateHref} hrefLang={locale === 'pt' ? 'en' : 'pt-BR'} aria-label={text.languageLabel}>
            {locale === 'pt' ? 'EN' : 'PT'}
          </Link>
          <ThemeToggle label={text.themeLabel} />
        </div>
      </div>
    </header>
  )
}
