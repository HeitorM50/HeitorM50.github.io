export type Locale = 'pt' | 'en'
export type LocalizedText = Record<Locale, string>

export type ProjectLink = {
  live?: string
  source?: string
}

export type Project = {
  slug: string
  title: string
  year: string
  summary: LocalizedText
  role: LocalizedText
  stack: string[]
  cover?: string
  coverWidth?: number
  coverHeight?: number
  links: ProjectLink
  featured: boolean
  metrics?: LocalizedText[]
}

export type Experience = {
  period: LocalizedText
  role: LocalizedText
  company: string
  summary: LocalizedText
  highlight: LocalizedText
  stack: string[]
}

export const site = {
  name: 'Heitor Ricardo',
  fullName: 'Heitor Macedo Ricardo',
  email: 'heitorm50@gmail.com',
  url: 'https://heitorm50.github.io',
  github: 'https://github.com/HeitorM50',
  linkedin: 'https://linkedin.com/in/heitor-ricardo',
  cv: '/cv.pdf'
} as const

export const copy = {
  pt: {
    nav: { work: 'Projetos', experience: 'Trajetória', about: 'Sobre', contact: 'Contato' },
    badge: 'ABERTO A ESTÁGIO · BRASÍLIA OU REMOTO',
    eyebrow: 'ENGENHARIA DE SOFTWARE · UnB',
    headline: 'Construo sistemas que transformam complexidade em resultado.',
    intro: 'Trabalho com Python, TypeScript, C++ e Rust entre backend, dados e sistemas embarcados. Gosto de problemas que pedem medição, automação e decisões técnicas claras.',
    primaryCta: 'Ver projetos',
    secondaryCta: 'Baixar CV',
    proof: ['4 produtos no ar', '4 pessoas lideradas', '11 projetos selecionados'],
    selectedKicker: '01 — TRABALHO SELECIONADO',
    selectedTitle: 'Projetos com problema, papel e impacto.',
    selectedIntro: 'Uma seleção do que entreguei em equipes, pesquisa e projetos próprios. Cada case separa com clareza o contexto, minha contribuição e o resultado.',
    caseCta: 'Ler estudo de caso',
    liveCta: 'Ver produto',
    sourceCta: 'Código',
    archiveKicker: 'OUTROS PROJETOS',
    archiveTitle: 'Explorações técnicas e acadêmicas',
    experienceKicker: '02 — TRAJETÓRIA',
    experienceTitle: 'Responsabilidade crescente, do código à liderança.',
    aboutKicker: '03 — SOBRE',
    aboutTitle: 'Engenharia com curiosidade e prestação de contas.',
    aboutBody: 'Curso Engenharia de Software na UnB, com conclusão prevista para março de 2029, e Análise e Desenvolvimento de Sistemas no GRAN. Hoje lidero o subsistema de eletrônica da equipe Baja SAE e desenvolvo pesquisa em dinâmica veicular.',
    aboutBody2: 'Já atuei em produto, automação, dados, web e sistemas embarcados. Procuro um estágio em que eu possa assumir problemas reais, medir o que entrego e aprender com um time tecnicamente exigente.',
    stackKicker: 'FERRAMENTAS USADAS NOS PROJETOS',
    contactKicker: '04 — CONTATO',
    contactTitle: 'Tem um problema interessante para resolver?',
    contactBody: 'Estou procurando estágio em backend, dados ou sistemas embarcados, em Brasília ou remoto.',
    contactCta: 'Enviar e-mail',
    back: 'Voltar aos projetos',
    contribution: 'Minha contribuição',
    projectLinks: 'Links do projeto',
    languageLabel: 'Ver versão em inglês',
    menuLabel: 'Abrir navegação',
    themeLabel: 'Alternar tema',
    footer: 'Projetado e desenvolvido em Brasília, DF.'
  },
  en: {
    nav: { work: 'Work', experience: 'Timeline', about: 'About', contact: 'Contact' },
    badge: 'OPEN TO INTERNSHIPS · BRASÍLIA OR REMOTE',
    eyebrow: 'SOFTWARE ENGINEERING · UnB',
    headline: 'I build systems that turn complexity into results.',
    intro: 'I work with Python, TypeScript, C++ and Rust across backend, data and embedded systems. I enjoy problems that call for measurement, automation and clear technical decisions.',
    primaryCta: 'See my work',
    secondaryCta: 'Download résumé',
    proof: ['4 shipped products', '4 people led', '11 selected projects'],
    selectedKicker: '01 — SELECTED WORK',
    selectedTitle: 'Projects with a problem, a role and an impact.',
    selectedIntro: 'A selection of work shipped in teams, research and personal projects. Each case clearly separates the context, my contribution and the result.',
    caseCta: 'Read case study',
    liveCta: 'View product',
    sourceCta: 'Source',
    archiveKicker: 'OTHER PROJECTS',
    archiveTitle: 'Technical and academic explorations',
    experienceKicker: '02 — TIMELINE',
    experienceTitle: 'Growing responsibility, from code to leadership.',
    aboutKicker: '03 — ABOUT',
    aboutTitle: 'Engineering with curiosity and accountability.',
    aboutBody: 'I study Software Engineering at UnB, graduating in March 2029, and Systems Analysis and Development at GRAN. I currently lead the electronics subsystem of the Baja SAE team and research vehicle dynamics.',
    aboutBody2: 'I have worked across product, automation, data, web and embedded systems. I am looking for an internship where I can own real problems, measure what I ship and learn from a technically demanding team.',
    stackKicker: 'TOOLS USED IN THESE PROJECTS',
    contactKicker: '04 — CONTACT',
    contactTitle: 'Have an interesting problem to solve?',
    contactBody: 'I am looking for an internship in backend, data or embedded systems, in Brasília or remotely.',
    contactCta: 'Send an email',
    back: 'Back to projects',
    contribution: 'My contribution',
    projectLinks: 'Project links',
    languageLabel: 'Ver versão em português',
    menuLabel: 'Open navigation',
    themeLabel: 'Toggle theme',
    footer: 'Designed and built in Brasília, Brazil.'
  }
} as const

export const projects: Project[] = [
  {
    slug: 'hindsight', title: 'Hindsight', year: '2026', featured: true,
    summary: {
      pt: 'Analisa sessões do IBM Bob, encontra desperdício de contexto e gera uma configuração corrigida para comparação A/B.',
      en: 'Analyses IBM Bob sessions, finds wasted context and generates a corrected configuration for an A/B comparison.'
    },
    role: {
      pt: 'Experimento A/B, interface de comparação, esqueleto React, três detectores e deploy estático com CI.',
      en: 'A/B experiment, comparison UI, React foundation, three detectors and static CI deployment.'
    },
    stack: ['TypeScript', 'React', 'Vite', 'Vitest', 'GitHub Actions'],
    cover: 'hindsight', coverWidth: 1400, coverHeight: 875,
    links: { live: 'https://heitorm50.github.io/OsBiruBob/', source: 'https://github.com/HeitorM50/OsBiruBob' },
    metrics: [
      { pt: '−25,9% de overhead fixo', en: '−25.9% fixed overhead' },
      { pt: '−19,7% de custo de API', en: '−19.7% API cost' },
      { pt: '56 commits meus', en: '56 commits by me' }
    ]
  },
  {
    slug: 'crianex-hub', title: 'Crianex Hub', year: '2026', featured: true,
    summary: {
      pt: 'Plataforma administrativa e vitrine bilíngue entregue para uma software house e colocada em produção.',
      en: 'An admin platform and bilingual showcase delivered to a software company and shipped to production.'
    },
    role: {
      pt: 'Levantamento de requisitos com o cliente e implementação em equipe sob FDD e Kanban.',
      en: 'Client requirements discovery and team implementation using FDD and Kanban.'
    },
    stack: ['SvelteKit', 'PostgreSQL', 'Supabase', 'Render'],
    cover: 'crianex', coverWidth: 1568, coverHeight: 780,
    links: { live: 'https://crianex.onrender.com', source: 'https://github.com/mdsreq-fga-unb/REQ-2026.1-T02-Crianex-' },
    metrics: [{ pt: 'Produto em produção', en: 'Production product' }, { pt: '66 commits meus', en: '66 commits by me' }]
  },
  {
    slug: 'coops', title: 'CoOps', year: '2025', featured: true,
    summary: {
      pt: 'Plataforma de métricas de colaboração no GitHub, com dashboards em D3 e síntese dos dados por IA.',
      en: 'A GitHub collaboration analytics platform with D3 dashboards and AI-assisted data summaries.'
    },
    role: {
      pt: 'Pipeline de dados em camadas, interface React, testes e seis pipelines de CI/CD em equipe Scrum.',
      en: 'Layered data pipeline, React UI, tests and six CI/CD pipelines in a Scrum team.'
    },
    stack: ['Python', 'React', 'TypeScript', 'D3.js', 'GitHub Actions'],
    cover: 'coops', coverWidth: 1568, coverHeight: 780,
    links: { live: 'https://unb-mds.github.io/2025-2-Squad-01/', source: 'https://github.com/unb-mds/2025-2-Squad-01' },
    metrics: [{ pt: 'Pipeline: 4 h → 30 s', en: 'Pipeline: 4 h → 30 s' }, { pt: '47 commits meus', en: '47 commits by me' }]
  },
  {
    slug: 'extracao-rda', title: 'ExtracaoRDA', year: '2025', featured: true,
    summary: {
      pt: 'Aplicação desktop que transforma relatórios PADIS em planilhas validadas e remove a transcrição manual do fluxo.',
      en: 'A desktop app that turns PADIS reports into validated spreadsheets and removes manual transcription from the workflow.'
    },
    role: {
      pt: 'Projeto individual concebido e desenvolvido durante o estágio no MCTI, fora do escopo do time.',
      en: 'A solo project conceived and built during my MCTI internship, outside the team scope.'
    },
    stack: ['Python', 'PyQt', 'PyInstaller', 'pytest'],
    cover: 'extracao-rda', coverWidth: 867, coverHeight: 497,
    links: {},
    metrics: [{ pt: '0 transcrição manual', en: '0 manual transcription' }, { pt: 'Validação cruzada', en: 'Cross-validation' }]
  },
  {
    slug: 'pibic-dinamica-veicular', title: 'PIBIC · Dinâmica Veicular', year: '2026', featured: false,
    summary: { pt: 'Modelo multicorpo em C++ validado contra o Project Chrono, com sandbox em Godot.', en: 'A C++ multibody model validated against Project Chrono, with a Godot sandbox.' },
    role: { pt: 'Pesquisa, implementação e documentação técnica por sprint.', en: 'Research, implementation and technical documentation by sprint.' },
    stack: ['C++', 'Godot', 'Chrono'], cover: 'pibic', coverWidth: 1568, coverHeight: 780,
    links: { live: 'https://interactivedynamics.github.io/heitor-docs/' }
  },
  {
    slug: 'dev-second-brain', title: 'dev-second-brain', year: '2026', featured: false,
    summary: { pt: 'Servidor MCP local que consulta notas e recupera decisões passadas de projeto.', en: 'A local MCP server that queries notes and retrieves past project decisions.' },
    role: { pt: 'Projeto pessoal, com busca e embeddings locais e sem chave de API.', en: 'Personal project with local search and embeddings and no API key.' },
    stack: ['TypeScript', 'RAG', 'MCP'], cover: 'dev-second-brain', coverWidth: 1200, coverHeight: 750,
    links: { source: 'https://github.com/HeitorM50/dev-second-brain' }
  },
  {
    slug: 'rbtree-db', title: 'rbtree-db', year: '2026', featured: false,
    summary: { pt: 'Banco chave-valor em Rust sobre árvore Rubro-Negra, com range queries e REPL.', en: 'A Rust key-value store built on a Red-Black tree, with range queries and a REPL.' },
    role: { pt: 'Projeto em dupla com benchmarks Criterion.', en: 'Pair project with Criterion benchmarks.' },
    stack: ['Rust', 'Criterion'], cover: 'rbtree-bench', coverWidth: 916, coverHeight: 635,
    links: { source: 'https://github.com/eda2-2026/G18_Arvore_EDA2-2026.1' }
  },
  {
    slug: 'rusty-explorer', title: 'Rusty Explorer', year: '2026', featured: false,
    summary: { pt: 'Explorador de arquivos usado para comparar algoritmos de ordenação e busca em cenários reais.', en: 'A file explorer used to compare sorting and search algorithms in real scenarios.' },
    role: { pt: 'Implementação e relatório em dupla.', en: 'Pair implementation and report.' },
    stack: ['Rust', 'Ordenação', 'Busca'], cover: 'rusty-explorer', coverWidth: 1041, coverHeight: 692,
    links: { source: 'https://github.com/eda2-2026/G18_Ordenacao_EDA2-2026.1' }
  },
  {
    slug: 'quadtree-compressor', title: 'Quadtree Compressor', year: '2026', featured: false,
    summary: { pt: 'Compressor de imagens em tons de cinza com Quadtree e formato binário próprio.', en: 'A grayscale image compressor using a Quadtree and a custom binary format.' },
    role: { pt: 'Projeto em dupla com avaliação de compressão e PSNR.', en: 'Pair project evaluating compression and PSNR.' },
    stack: ['Python', 'NumPy', 'Pillow'], cover: 'quadtree', coverWidth: 671, coverHeight: 726,
    links: { source: 'https://github.com/eda2-2026/G18_Busca_EDA2-2026.1' }
  },
  {
    slug: 'crypto-arbitrage-graph', title: 'CryptoArbitrageGraph', year: '2026', featured: false,
    summary: { pt: 'Detecção de arbitragem triangular em cripto com Bellman-Ford e visualização interativa.', en: 'Triangular crypto arbitrage detection with Bellman-Ford and an interactive visualisation.' },
    role: { pt: 'Projeto acadêmico em equipe.', en: 'Academic team project.' },
    stack: ['Python', 'Bellman-Ford'], cover: 'crypto-arbitrage', coverWidth: 1200, coverHeight: 608,
    links: { source: 'https://github.com/eda2-2026/G18_Grafos_EDA2-2026.1' }
  },
  {
    slug: 'alugafacil', title: 'AlugaFacil', year: '2026', featured: false,
    summary: { pt: 'Gerenciador de frota, disponibilidade e ciclo de aluguel para locadora de carros.', en: 'Fleet, availability and rental-cycle management for a car rental company.' },
    role: { pt: 'Frontend Next.js e API Node/Express; repositório privado.', en: 'Next.js frontend and Node/Express API; private repository.' },
    stack: ['Next.js', 'TypeScript', 'Node.js'], links: {}
  }
]

export const experiences: Experience[] = [
  {
    period: { pt: '2024 — ATUAL', en: '2024 — NOW' },
    role: { pt: 'Líder de Eletrônica', en: 'Electronics Lead' },
    company: 'UnBaja — Equipe Baja SAE UnB',
    summary: { pt: 'Sistema de telemetria com quatro nós ECU em barramento CAN e dados exibidos ao piloto em tempo real.', en: 'A telemetry system with four ECU nodes on a CAN bus and real-time data shown to the driver.' },
    highlight: { pt: 'Liderança técnica de quatro integrantes.', en: 'Technical leadership of four team members.' },
    stack: ['ESP32', 'Arduino', 'CAN', 'C++']
  },
  {
    period: { pt: '2026 — ATUAL', en: '2026 — NOW' },
    role: { pt: 'Pesquisador — Iniciação Científica', en: 'Undergraduate Researcher' },
    company: 'Universidade de Brasília',
    summary: { pt: 'Pesquisa em dinâmica veicular com modelo multicorpo em C++ e sandbox no Godot.', en: 'Vehicle dynamics research with a C++ multibody model and a Godot sandbox.' },
    highlight: { pt: 'Sete frentes de trabalho mapeadas.', en: 'Seven workstreams mapped.' },
    stack: ['C++', 'Godot', 'Chrono', 'Docusaurus']
  },
  {
    period: { pt: 'AGO 2026', en: 'AUG 2026' },
    role: { pt: 'Hackathon IBM TechXchange', en: 'IBM TechXchange Hackathon' },
    company: 'IBM TechXchange 2026',
    summary: { pt: 'Construção do Hindsight em uma equipe de cinco pessoas.', en: 'Built Hindsight in a five-person team.' },
    highlight: { pt: '25,9% menos overhead fixo no experimento A/B.', en: '25.9% less fixed overhead in the A/B experiment.' },
    stack: ['TypeScript', 'React', 'Vite', 'Vitest']
  },
  {
    period: { pt: '2025 — 2026', en: '2025 — 2026' },
    role: { pt: 'Estágio — Product Owner Jr.', en: 'Internship — Junior Product Owner' },
    company: 'Ministério da Ciência, Tecnologia e Inovação',
    summary: { pt: 'Refinamento de regras de negócio, reporte de erros e priorização no NOVO SIGPLANI.', en: 'Business-rule refinement, bug reporting and prioritisation for NOVO SIGPLANI.' },
    highlight: { pt: 'Criação independente do ExtracaoRDA.', en: 'Independent creation of ExtracaoRDA.' },
    stack: ['Scrum', 'Python', 'regex', 'Excel']
  }
]

export const stackGroups = [
  { pt: 'Linguagens', en: 'Languages', items: ['Python', 'TypeScript', 'C++', 'Rust', 'Java'] },
  { pt: 'Web & dados', en: 'Web & data', items: ['React', 'SvelteKit', 'Node.js', 'D3.js', 'PostgreSQL', 'Supabase'] },
  { pt: 'Infra & testes', en: 'Infra & testing', items: ['Docker', 'GitHub Actions', 'pytest', 'Vitest', 'Git', 'Linux'] },
  { pt: 'Embarcados', en: 'Embedded', items: ['ESP32', 'Arduino', 'CAN', 'Godot', 'NumPy'] }
] as const

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function caseHref(project: Project, locale: Locale) {
  return locale === 'pt' ? `/projetos/${project.slug}/` : `/en/projects/${project.slug}/`
}
