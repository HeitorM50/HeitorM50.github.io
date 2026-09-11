import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import '../../globals.css'
import { site } from '@/data/portfolio'
import { staticRuntime } from '@/data/static-runtime'
import { LiquidGlassFilter } from '@/components/ui/liquid-glass-button'

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
  icons: { icon: '/favicon.svg', apple: '/media/logo-metallic.png' }
}

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <html lang="en" data-theme="dark" suppressHydrationWarning><head><link rel="preload" href="/fonts/space-grotesk-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /><script data-static-runtime dangerouslySetInnerHTML={{ __html: staticRuntime }} /></head><body><LiquidGlassFilter />{children}</body></html>
}
