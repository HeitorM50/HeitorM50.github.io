import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import '../../tokens.css'
import '../../globals.css'
import { site } from '@/data/portfolio'
import { staticRuntime } from '@/data/static-runtime'

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
  icons: { icon: '/favicon.svg' }
}

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <html lang="en"><head><link rel="preload" href="/fonts/tektur-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /><link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /><meta name="theme-color" content="#0B0A0F" /><script data-static-runtime dangerouslySetInnerHTML={{ __html: staticRuntime }} /></head><body>{children}</body></html>
}
