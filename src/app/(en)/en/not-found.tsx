import Link from 'next/link'

export default function NotFound() {
  return <main className="not-found shell"><p className="kicker">404</p><h1>Page not found.</h1><p>This address may have changed or may not exist.</p><Link className="button button-primary" href="/en/">Back to the portfolio</Link></main>
}
