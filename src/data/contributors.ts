export type Contributor = {
  name: string
  github: string
  avatar?: string
}

// Reviewed team credits, not a ranking of commit authors. Sources: project
// READMEs, GitHub profiles and the portfolio's documented product contributions.
export const contributors = {
  HeitorM50: { name: 'Heitor Ricardo', github: 'HeitorM50', avatar: 'heitorm50' },
  HugoFreitass: { name: 'Hugo Freitas Silva', github: 'HugoFreitass', avatar: 'hugofreitass' },
  PedroGTG: { name: 'PedroGTG', github: 'PedroGTG', avatar: 'pedrogtg' },
  'Phill-Chill': { name: 'Philipe Amâncio', github: 'Phill-Chill', avatar: 'phill-chill' },
  guxvr: { name: 'Gustavo Xavier Evangelista', github: 'guxvr', avatar: 'guxvr' },
  Bappoz: { name: 'Lucas A. Zanetti', github: 'Bappoz', avatar: 'bappoz' },
  Camile0318: { name: 'Camile', github: 'Camile0318', avatar: 'camile0318' },
  LeoFacB: { name: 'Leonardo Bonetti', github: 'LeoFacB', avatar: 'leofacb' },
  pedruck: { name: 'Pedro Druck Montalvão Reis', github: 'pedruck', avatar: 'pedruck' },
  cadumotta: { name: 'Carlos Eduardo', github: 'cadumotta', avatar: 'cadumotta' },
  pedrogrocha13: { name: 'Pedro Gonçalves Rocha', github: 'pedrogrocha13', avatar: 'pedrogrocha13' },
  Edupizzol: { name: 'Eduardo Jesus Dal Pizzol', github: 'Edupizzol', avatar: 'edupizzol' }
} satisfies Record<string, Contributor>

export type ContributorId = keyof typeof contributors
