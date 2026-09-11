import Link from 'next/link'
import { LiquidButton } from '@/components/ui/liquid-glass-button'

export default function NotFound() {
  return <main className="not-found shell"><p className="kicker">404</p><h1>Page not found.</h1><p>This address may have changed or may not exist.</p><LiquidButton asChild><Link href="/en/">Back to the portfolio</Link></LiquidButton></main>
}
