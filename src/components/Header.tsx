import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'
import { copy, type Locale } from '@/data/portfolio'

export function Header({ locale, alternateHref }: { locale: Locale; alternateHref: string }) {
  const text = copy[locale]
  return <header className="site-header">
    <div className="header-controls">
      <nav className="header-language" aria-label={locale === 'pt' ? 'Idioma' : 'Language'}>
        <Link href={locale === 'en' ? alternateHref : '/'} hrefLang="pt-BR" aria-current={locale === 'pt' ? 'page' : undefined} aria-label={locale === 'en' ? text.languageLabel : undefined}>PT</Link>
        <Link href={locale === 'pt' ? alternateHref : '/en/'} hrefLang="en" aria-current={locale === 'en' ? 'page' : undefined} aria-label={locale === 'pt' ? text.languageLabel : undefined}>EN</Link>
      </nav>
      <button className="header-theme" type="button" data-theme-toggle aria-label={text.themeLabel}>
        <Sun className="theme-sun" size={18} aria-hidden="true" />
        <Moon className="theme-moon" size={18} aria-hidden="true" />
      </button>
    </div>
  </header>
}
