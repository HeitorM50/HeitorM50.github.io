import Link from 'next/link'
import { LiquidButton } from '@/components/ui/liquid-glass-button'

export default function NotFound() {
  return <main className="not-found shell"><p className="kicker">404</p><h1>Página não encontrada.</h1><p>O endereço pode ter mudado ou não existir.</p><LiquidButton asChild><Link href="/">Voltar ao portfólio</Link></LiquidButton></main>
}
