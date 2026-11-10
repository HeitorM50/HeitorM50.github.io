import Link from 'next/link'
import type { ReactNode } from 'react'

type Variant = 'primary' | 'secondary'

// O elemento focável não tem clip-path: assim a mira de foco (::after) não é cortada.
// O chanfro fica na face interna; no secundário, a borda acompanha o chanfro (padding 1px).
export function Button({ href, children, variant = 'primary', external = false, arrow = true, className }: {
  href: string; children: ReactNode; variant?: Variant; external?: boolean; arrow?: boolean; className?: string
}) {
  const classes = `btn btn--${variant} lock${className ? ` ${className}` : ''}`
  const face = <span className="btn__frame chamfer-sm"><span className="btn__face chamfer-sm">{children}{arrow && <span className="btn__arrow" aria-hidden="true">{external ? '↗' : '→'}</span>}</span></span>
  if (external) return <a className={classes} href={href} target="_blank" rel="noreferrer">{face}</a>
  if (href.startsWith('#') || href.endsWith('.pdf')) return <a className={classes} href={href}>{face}</a>
  return <Link className={classes} href={href}>{face}</Link>
}

export function TextLink({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) {
  return external
    ? <a className="text-link lock" href={href} target="_blank" rel="noreferrer">{children}<span aria-hidden="true"> ↗</span></a>
    : <a className="text-link lock" href={href}>{children}</a>
}
