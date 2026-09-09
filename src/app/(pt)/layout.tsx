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

const themeScript = `(function(){var r=document.documentElement;try{var t=localStorage.getItem('portfolio-theme');if(!t)t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';r.dataset.theme=t}catch(e){r.dataset.theme='dark'}addEventListener('DOMContentLoaded',function(){document.querySelectorAll('[data-theme-toggle]').forEach(function(b){b.addEventListener('click',function(){var n=r.dataset.theme==='dark'?'light':'dark';r.dataset.theme=n;try{localStorage.setItem('portfolio-theme',n)}catch(e){}})})})})()`

export default function PortugueseLayout({ children }: { children: ReactNode }) {
  return <html lang="pt-BR" data-theme="dark" suppressHydrationWarning><head><script data-static-runtime dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body>{children}</body></html>
}
