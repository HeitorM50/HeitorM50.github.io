/* eslint-disable @next/next/no-img-element */
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
  const portugueseHref = locale === 'en' ? alternateHref : '/'
  const englishHref = locale === 'pt' ? alternateHref : '/en/'

  return (
    <header className="site-header">
      <div className="header-shell">
        <Link className="brand" href={home} aria-label="Heitor Ricardo — home">
          <span className="brand-mark" aria-hidden="true"><img src="/media/logo.webp" alt="" /></span>
          <span>Heitor Ricardo</span>
        </Link>

        <details className="nav-disclosure">
          <summary aria-label={text.menuLabel}>
            <span />
            <span />
          </summary>
          <nav aria-label="Primary">
            <a href={`${home}#sobre`}>{text.nav.about}</a>
            <a href={`${home}#projetos`}>{text.nav.work}</a>
            <a href={`${home}#stack`}>Stack</a>
            <a href={`${home}#exp`}>{text.nav.experience}</a>
            <a href={`${home}#contato`}>{text.nav.contact}</a>
          </nav>
        </details>

        <nav className="desktop-nav" aria-label="Primary">
          <a href={`${home}#sobre`}>{text.nav.about}</a>
          <a href={`${home}#projetos`}>{text.nav.work}</a>
          <a href={`${home}#stack`}>Stack</a>
          <a href={`${home}#exp`}>{text.nav.experience}</a>
          <a href={`${home}#contato`}>{text.nav.contact}</a>
        </nav>

        <div className="header-actions">
          <div className="language-switch" aria-label={text.languageLabel}>
            <Link className={locale === 'pt' ? 'active' : ''} href={portugueseHref} hrefLang="pt-BR" aria-label={locale === 'en' ? text.languageLabel : undefined}>PT</Link>
            <Link className={locale === 'en' ? 'active' : ''} href={englishHref} hrefLang="en" aria-label={locale === 'pt' ? text.languageLabel : undefined}>EN</Link>
          </div>
          <ThemeToggle label={text.themeLabel} />
        </div>
      </div>
    </header>
  )
}
