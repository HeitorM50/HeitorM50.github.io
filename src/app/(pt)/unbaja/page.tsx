import type { Metadata } from 'next'
import { UnbajaPage } from '@/components/UnbajaPage'

export const metadata: Metadata = {
  title: 'UnBaja · Embarcados',
  description: 'Telemetria embarcada da UnBaja: quatro nós ECU em barramento CAN, firmware em C/C++ e a API de telemetria em desenvolvimento.',
  alternates: { canonical: '/unbaja/', languages: { 'pt-BR': '/unbaja/', en: '/en/unbaja/' } }
}

export default function Page() {
  return <UnbajaPage locale="pt" />
}
