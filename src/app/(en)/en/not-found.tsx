import { Button } from '@/components/hud/Button'

export default function NotFound() {
  return <main className="not-found container"><p className="section-label">ERROR // 404</p><h1>Page not found</h1><p>This address may have changed or may not exist.</p><Button href="/en/">Back to the portfolio</Button></main>
}
