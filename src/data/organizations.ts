export const organizations = {
  ibm: { name: 'IBM', image: 'ibm.svg', surface: 'light', wide: false },
  unb: { name: 'Universidade de Brasília', image: 'unb.webp', surface: 'light', wide: false },
  mcti: { name: 'Ministério da Ciência, Tecnologia e Inovação', image: 'mcti.webp', surface: 'light', wide: true },
  'pmi-df': { name: 'PMI Distrito Federal', image: 'pmi-df.webp', surface: 'light', wide: true },
  unbaja: { name: 'UnBaja SAE', image: 'unbaja.webp', surface: 'dark', wide: false },
  anthropic: { name: 'Anthropic', image: 'anthropic.svg', surface: 'light', wide: false },
  ifood: { name: 'iFood', image: 'ifood.webp', surface: 'light', wide: false },
} as const

export type OrganizationId = keyof typeof organizations
