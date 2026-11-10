import type { ElementType, ReactNode } from 'react'

// Painel chanfrado com borda que acompanha o chanfro (wrapper com padding 1px).
// tone: padrão (surface), ativo (borda roxa) ou papel (fundo branco).
export function Panel({ as: Tag = 'div', tone = 'default', size = 'md', className, children, ...rest }: {
  as?: ElementType; tone?: 'default' | 'active' | 'paper'; size?: 'md' | 'lg'; className?: string; children: ReactNode
} & Record<string, unknown>) {
  return <Tag className={`panel panel--${tone} chamfer-${size}${className ? ` ${className}` : ''}`} {...rest}>
    <div className={`panel__body chamfer-${size}`}>{children}</div>
  </Tag>
}

// Aba superior com rótulo (SETOR, RANK, DADOS) + número grande + linhas mono.
export function DataPanel({ tab, value, lines, className }: { tab: string; value: ReactNode; lines?: ReactNode[]; className?: string }) {
  return <div className={`data-panel${className ? ` ${className}` : ''}`}>
    <span className="data-panel__tab">{tab}</span>
    <div className="data-panel__body chamfer-md">
      <strong className="data-panel__value">{value}</strong>
      {lines?.map((line, index) => <span className="data-panel__line" key={index}>{line}</span>)}
    </div>
  </div>
}

export function Tag({ children, tone = 'tech' }: { children: ReactNode; tone?: 'tech' | 'verified' | 'progress' | 'highlight' | 'live' }) {
  return <span className={`tag tag--${tone} chamfer-sm`}>{children}</span>
}

export function Stripe({ tone = 'brand', loop = false }: { tone?: 'brand' | 'warning' | 'pink' | 'white'; loop?: boolean }) {
  return <span className={`stripe stripe--${tone}`} aria-hidden="true" data-fx-loop={loop || undefined} />
}

export function Barcode({ className }: { className?: string }) {
  return <span className={`barcode${className ? ` ${className}` : ''}`} aria-hidden="true" />
}
