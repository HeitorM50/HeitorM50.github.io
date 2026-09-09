import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import '../globals.css'
import { site } from '@/data/portfolio'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Heitor Ricardo — Engenharia de Software', template: '%s — Heitor Ricardo' },
  description: 'Portfólio de Heitor Ricardo: backend, dados e sistemas embarcados com Python, TypeScript, C++ e Rust.',
  alternates: { canonical: '/', languages: { 'pt-BR': '/', en: '/en/' } },
  openGraph: {
    type: 'website', locale: 'pt_BR', siteName: site.name,
    title: 'Heitor Ricardo — Engenharia de Software',
    description: 'Backend, dados e sistemas embarcados: projetos, decisões técnicas e resultados.',
    url: '/', images: [{ url: '/media/hindsight.webp', width: 1400, height: 875, alt: 'Projeto Hindsight' }]
  },
  twitter: { card: 'summary_large_image', title: 'Heitor Ricardo — Engenharia de Software', description: 'Backend, dados e sistemas embarcados.', images: ['/media/hindsight.webp'] },
  icons: { icon: '/favicon.svg', apple: '/media/logo.webp' }
}

const themeScript = `(function(){try{var t=localStorage.getItem('portfolio-theme');if(!t)t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme='dark'}})()`

export default function PortugueseLayout({ children }: { children: ReactNode }) {
  return <html lang="pt-BR" data-theme="dark" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body>{children}</body></html>
}
