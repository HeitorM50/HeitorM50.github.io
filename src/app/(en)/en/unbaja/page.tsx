import type { Metadata } from 'next'
import { UnbajaPage } from '@/components/UnbajaPage'

export const metadata: Metadata = {
  title: 'UnBaja · Embedded',
  description: 'UnBaja embedded telemetry: four ECU nodes on a CAN bus, C/C++ firmware and the telemetry API in development.',
  alternates: { canonical: '/en/unbaja/', languages: { 'pt-BR': '/unbaja/', en: '/en/unbaja/' } }
}

export default function Page() {
  return <UnbajaPage locale="en" />
}
