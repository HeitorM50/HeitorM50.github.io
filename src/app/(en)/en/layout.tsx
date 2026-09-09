import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import '../../globals.css'
import { site } from '@/data/portfolio'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Heitor Ricardo — Software Engineering', template: '%s — Heitor Ricardo' },
  description: 'Heitor Ricardo’s portfolio: backend, data and embedded systems with Python, TypeScript, C++ and Rust.',
  alternates: { canonical: '/en/', languages: { 'pt-BR': '/', en: '/en/' } },
  openGraph: {
    type: 'website', locale: 'en', siteName: site.name,
    title: 'Heitor Ricardo — Software Engineering',
    description: 'Backend, data and embedded systems: projects, technical decisions and results.',
    url: '/en/', images: [{ url: '/media/hindsight.webp', width: 1400, height: 875, alt: 'Hindsight project' }]
  },
  twitter: { card: 'summary_large_image', title: 'Heitor Ricardo — Software Engineering', description: 'Backend, data and embedded systems.', images: ['/media/hindsight.webp'] },
  icons: { icon: '/favicon.svg', apple: '/media/logo.webp' }
}

const themeScript = `(function(){var r=document.documentElement;try{var t=localStorage.getItem('portfolio-theme');if(!t)t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';r.dataset.theme=t}catch(e){r.dataset.theme='dark'}addEventListener('DOMContentLoaded',function(){document.querySelectorAll('[data-theme-toggle]').forEach(function(b){b.addEventListener('click',function(){var n=r.dataset.theme==='dark'?'light':'dark';r.dataset.theme=n;try{localStorage.setItem('portfolio-theme',n)}catch(e){}})})})})()`

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <html lang="en" data-theme="dark" suppressHydrationWarning><head><script data-static-runtime dangerouslySetInnerHTML={{ __html: themeScript }} /></head><body>{children}</body></html>
}
