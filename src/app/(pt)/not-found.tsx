import { Button } from '@/components/hud/Button'

export default function NotFound() {
  return <main className="not-found container"><p className="section-label">ERRO // 404</p><h1>Página não encontrada</h1><p>O endereço pode ter mudado ou não existir.</p><Button href="/">Voltar ao portfólio</Button></main>
}
