import Link from 'next/link'

export default function NotFound() {
  return <main className="not-found shell"><p className="kicker">404</p><h1>Página não encontrada.</h1><p>O endereço pode ter mudado ou não existir.</p><Link className="button button-primary" href="/">Voltar ao portfólio</Link></main>
}
