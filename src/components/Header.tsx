import Link from 'next/link'
import { copy, site, type Locale } from '@/data/portfolio'
import { navSections, pageHref, sectionLabel, sectionNumber, sections } from '@/data/sections'
import { Monogram } from './hud/Logo'
import { Button } from './hud/Button'

export function Header({ locale, alternateHref }: { locale: Locale; alternateHref: string }) {
  const text = copy[locale]
  const pt = locale === 'pt'
  const home = pt ? '/' : '/en/'
  return <header className="site-header">
    <a className="skip-link" href="#conteudo">{pt ? 'Pular para o conteúdo' : 'Skip to content'}</a>
    <div className="site-header__bar">
      <Link className="brand lock" href={home} aria-label={pt ? 'Heitor Ricardo — início' : 'Heitor Ricardo — home'}>
        <Monogram className="brand__mark" />
        <span className="brand__name">HEITOR RICARDO</span>
      </Link>
      <p className="header-counter" aria-hidden="true"><span>SEC</span> <span className="odometer" data-hud-section data-odometer>01</span>/{String(sections.length).padStart(2, '0')}</p>
      <button className="menu-toggle lock" type="button" data-menu-toggle aria-expanded="false" aria-controls="site-menu">
        <span className="menu-toggle__label" data-when="closed">MENU</span>
        <span className="menu-toggle__label" data-when="open">{pt ? 'FECHAR' : 'CLOSE'}</span>
        <span className="menu-toggle__icon" aria-hidden="true" />
        <span className="sr-only">{text.menuLabel}</span>
      </button>
      <div className="site-menu" id="site-menu" data-menu>
        <nav className="site-nav" aria-label={pt ? 'Seções' : 'Sections'}>
          <ol>
            {navSections.map(id => <li key={id}><a className="nav-link lock" href={`${home}#${id}`} data-nav-link={id}><span className="nav-link__number">{sectionNumber(id)}</span>{sectionLabel(id, locale)}</a></li>)}
            <li><Link className="nav-link nav-link--page lock" href={pageHref.unbaja[locale]}><span className="nav-link__number">54</span>UnBaja</Link></li>
          </ol>
        </nav>
        <div className="site-menu__tools">
          <nav className="language" aria-label={pt ? 'Idioma' : 'Language'}>
            <Link className="lock" href={pt ? '/' : alternateHref} hrefLang="pt-BR" aria-current={pt ? 'page' : undefined} aria-label={!pt ? text.languageLabel : undefined}>PT</Link>
            <Link className="lock" href={pt ? alternateHref : '/en/'} hrefLang="en" aria-current={!pt ? 'page' : undefined} aria-label={pt ? text.languageLabel : undefined}>EN</Link>
          </nav>
          <Button href={site.cv} variant="secondary" arrow={false} className="btn--compact">{pt ? 'Currículo' : 'Résumé'}</Button>
        </div>
      </div>
    </div>
  </header>
}
