/* ==========================================================================
   CONTEÚDO DO PORTFÓLIO — edite SÓ este arquivo.
   --------------------------------------------------------------------------
   • Texto bilíngue:  { pt: "português", en: "english" }
     Texto simples:   "vale para os dois idiomas"
   • Imagens: coloque os arquivos em images/ e aponte o caminho relativo.
     Deixe "" (vazio) para manter o placeholder listrado do design.
   • Qualquer campo removido/vazio volta para o placeholder original.
   ========================================================================== */

window.PORTFOLIO = {

  /* ---------- identidade ---------- */
  name: "Heitor Ricardo",
  logo: "HR",                       // fallback em texto, usado se logoImage estiver vazio
  logoImage: "images/logo.png",     // símbolo do header e dos cards do hero
  email: "heitorm50@gmail.com",

  links: {
    github:   "https://github.com/HeitorM50",
    linkedin: "https://linkedin.com/in/heitor-ricardo",
    cv:       "cv.pdf",
  },

  /* ---------- hero ---------- */
  heroBadge: {
    pt: "ABERTO A ESTÁGIO · BACKEND, DADOS E SISTEMAS EMBARCADOS",
    en: "OPEN TO INTERNSHIPS · BACKEND, DATA AND EMBEDDED SYSTEMS",
  },
  headline: {
    line1:     { pt: "Estudante de",              en: "Software" },
    line2:     { pt: "Engenharia de Software na", en: "Engineering student at" },
    highlight: { pt: "UnB",                       en: "UnB" },
    tail: ".",
  },
  intro: {
    pt: "Trabalho com Python, TypeScript, C++ e Rust, entre backend, dados e sistemas embarcados. Nos últimos dois anos entreguei uma plataforma para cliente real, um sistema de telemetria em CAN para a equipe de Baja SAE e automações internas em um órgão público.",
    en: "I work with Python, TypeScript, C++ and Rust, across backend, data and embedded systems. Over the past two years I delivered a platform for a real client, a CAN telemetry system for the Baja SAE team and internal automation at a government agency.",
  },
  heroStats: [
    { value: "2+", label: { pt: "ANOS CODANDO", en: "YEARS CODING" } },
    { value: "10", label: { pt: "PROJETOS",     en: "PROJECTS" } },
    { value: "4",  label: { pt: "LIDERADOS",    en: "TEAM LED" } },
  ],

  /* ---------- cards empilhados do hero ---------- */
  deck: [
    { title: "Crianex Hub", tag: "SVELTE · SUPABASE",    image: "images/crianex.jpg" },
    { title: "CoOps",       tag: "REACT · D3 · PYTHON",  image: "images/coops.jpg" },
    { title: "ExtracaoRDA", tag: "PYTHON · PYQT",        image: "images/extracao-rda.png" },
  ],

  /* ---------- sobre ---------- */
  photo: "images/retrato.jpg",   // retrato 4:5
  manifesto: "",                 // vazio: o título grande da seção não é exibido
  about1: {
    pt: "Curso Engenharia de Software na UnB, com conclusão prevista para março de 2029, e Análise e Desenvolvimento de Sistemas no GRAN. Entrei na equipe de Baja SAE em 2024 e hoje lidero o subsistema de eletrônica, com quatro integrantes.",
    en: "I'm studying Software Engineering at UnB, graduating in March 2029, and Systems Analysis and Development at GRAN. I joined the Baja SAE team in 2024 and now lead the electronics subsystem, with four members.",
  },
  about2: {
    pt: "Já trabalhei em web, dados e sistemas embarcados: uma plataforma de métricas de colaboração no GitHub, um hub administrativo em produção para um cliente real e o sistema de telemetria do Baja, com quatro nós ECU em barramento CAN. Procuro estágio em desenvolvimento, em Brasília ou remoto.",
    en: "I've worked on web, data and embedded systems: a GitHub collaboration metrics platform, an admin hub in production for a real client and the Baja telemetry system, with four ECU nodes on a CAN bus. I'm looking for a development internship, in Brasília or remote.",
  },
  aboutStats: [
    { value: "2+",       label: { pt: "ANOS CODANDO",     en: "YEARS CODING" } },
    { value: "3",        label: { pt: "PRODUTOS NO AR",   en: "SHIPPED PRODUCTS" } },
    { value: "Brasília", label: { pt: "BASE · REMOTO OK", en: "BASED · REMOTE OK" } },
  ],

  /* ---------- projetos em destaque ---------- */
  featured: [
    {
      title: "Crianex Hub",
      desc: {
        pt: "Plataforma administrativa e vitrine bilíngue para a software house Crianex, em produção. Levantei requisitos junto ao cliente e o time trabalhou sob FDD e Kanban. Projeto em equipe, com 66 commits meus.",
        en: "Admin platform and bilingual showcase for the Crianex software house, in production. I gathered requirements with the client and the team worked under FDD and Kanban. Team project, 66 commits mine.",
      },
      image: "images/crianex.jpg",
      tech: ["Svelte/SvelteKit", "PostgreSQL", "Supabase", "Render"],
      liveUrl: "https://crianex.onrender.com",
      sourceUrl: "https://github.com/mdsreq-fga-unb/REQ-2026.1-T02-Crianex-",
    },
    {
      title: "CoOps",
      desc: {
        pt: "Plataforma que mede colaboração de times de desenvolvimento no GitHub. Tem dashboards em D3.js e uma camada de IA que resume os dados em texto. O pipeline em camadas caiu de cerca de 4 horas para 30 segundos. Testes em pytest e seis pipelines de CI/CD. Projeto em equipe sob Scrum, com 47 commits meus.",
        en: "Platform that measures collaboration in GitHub development teams. It has D3.js dashboards and an AI layer that summarises the data in plain text. The layered pipeline dropped from about 4 hours to 30 seconds. pytest suites and six CI/CD pipelines. Team project under Scrum, 47 commits mine.",
      },
      image: "images/coops.jpg",
      tech: ["Python", "React", "TypeScript", "D3.js", "GitHub Actions"],
      liveUrl: "https://unb-mds.github.io/2025-2-Squad-01/",
      sourceUrl: "https://github.com/unb-mds/2025-2-Squad-01",
    },
    {
      title: "ExtracaoRDA",
      desc: {
        pt: "Aplicação desktop que lê os PDFs dos Relatórios Demonstrativos Anuais do PADIS e gera planilhas Excel, no lugar da transcrição manual feita pelos analistas. Uma camada de validação cruza os valores extraídos com outras fontes e marca as inconsistências. Desenvolvi sozinho durante o estágio no MCTI, fora do escopo do time. Empacotada com PyInstaller, com CI no GitHub Actions e testes em pytest.",
        en: "Desktop application that reads the PDFs of PADIS Annual Reports and generates Excel spreadsheets, replacing the analysts' manual transcription. A validation layer cross-checks the extracted values against other sources and flags inconsistencies. I built it alone during my internship at MCTI, outside the team's scope. Packaged with PyInstaller, with CI on GitHub Actions and pytest tests.",
      },
      image: "images/extracao-rda.png",
      tech: ["Python", "PyQt", "PyInstaller", "pytest"],
      liveUrl: "",
      sourceUrl: "",   // repositório privado — sem botão "Código"
    },
  ],

  /* ---------- grade de projetos ---------- */
  grid: [
    {
      title: "PIBIC · Dinâmica Veicular", year: "2026",
      stack: ["C++", "Godot", "Chrono"],
      image: "images/pibic.jpg", url: "https://interactivedynamics.github.io/heitor-docs/",
      desc: {
        pt: "Iniciação científica em dinâmica veicular. Modelo multicorpo em C++ validado contra o Project Chrono, com um sandbox em Godot. A documentação é pública e atualizada por sprint.",
        en: "Undergraduate research in vehicle dynamics. C++ multibody model validated against Project Chrono, with a Godot sandbox. The documentation is public and updated each sprint.",
      },
    },
    {
      title: "dev-second-brain", year: "2026",
      stack: ["TypeScript", "RAG", "MCP"],
      image: "images/dev-second-brain.png", url: "https://github.com/HeitorM50/dev-second-brain",
      desc: {
        pt: "Servidor MCP, sem interface própria. Você conversa com o assistente e ele consulta suas notas para responder sobre decisões passadas de projeto. Busca e embeddings rodam na máquina, sem chave de API.",
        en: "MCP server, no UI of its own. You talk to the assistant and it queries your notes to answer questions about past project decisions. Search and embeddings run locally, no API key.",
      },
    },
    {
      title: "rbtree-db", year: "2026",
      stack: ["Rust", "Criterion"],
      image: "images/rbtree-bench.png", url: "https://github.com/eda2-2026/G18_Arvore_EDA2-2026.1",
      desc: {
        pt: "Banco chave-valor em Rust sobre árvore Rubro-Negra, com range queries em O(log n + k) e um REPL no estilo Redis. Benchmarks com Criterion contra BTreeMap e HashMap. Em dupla, na disciplina de EDA2.",
        en: "Key-value store in Rust over a Red-Black tree, with O(log n + k) range queries and a Redis-style REPL. Criterion benchmarks against BTreeMap and HashMap. Pair project, EDA2 course.",
      },
    },
    {
      title: "Rusty Explorer", year: "2026",
      stack: ["Rust", "Ordenação", "Busca"],
      image: "images/rusty-explorer.png", url: "https://github.com/eda2-2026/G18_Ordenacao_EDA2-2026.1",
      desc: {
        pt: "Explorador de arquivos em Rust usado para comparar algoritmos de ordenação e busca em cenários reais, com benchmarks e um relatório sobre qual algoritmo usar em cada caso. Em dupla, na disciplina de EDA2.",
        en: "File explorer in Rust used to compare sorting and search algorithms in real scenarios, with benchmarks and a report on which algorithm to use in each case. Pair project, EDA2 course.",
      },
    },
    {
      title: "Quadtree Compressor", year: "2026",
      stack: ["Python", "NumPy", "Pillow"],
      image: "images/quadtree.png", url: "https://github.com/eda2-2026/G18_Busca_EDA2-2026.1",
      desc: {
        pt: "Compressor de imagens em escala de cinza baseado em Quadtree, com busca espacial O(profundidade) e formato binário próprio. Chega a cerca de 98% de compressão mantendo PSNR acima de 30 dB. Em dupla, na disciplina de EDA2.",
        en: "Grayscale image compressor based on a Quadtree, with O(depth) spatial search and a custom binary format. Reaches about 98% compression while keeping PSNR above 30 dB. Pair project, EDA2 course.",
      },
    },
    {
      title: "CryptoArbitrageGraph", year: "2026",
      stack: ["Python", "Bellman-Ford"],
      image: "images/crypto-arbitrage.png", url: "https://github.com/eda2-2026/G18_Grafos_EDA2-2026.1",
      desc: {
        pt: "Detecta arbitragem triangular em cripto modelando as moedas como grafo ponderado e aplicando Bellman-Ford. Consome a API da CoinGecko e mostra o grafo de forma interativa. Em equipe, na disciplina de EDA2.",
        en: "Detects triangular arbitrage in crypto by modelling currencies as a weighted graph and applying Bellman-Ford. It consumes the CoinGecko API and shows the graph interactively. Team project, EDA2 course.",
      },
    },
    {
      title: "AlugaFacil", year: "2026",
      stack: ["Next.js", "TypeScript", "Node.js"],
      image: "", url: "",
      desc: {
        pt: "Gerenciador de frota para locadora de carros: cadastro de veículos, controle de disponibilidade e ciclo de aluguel. API em Node com Express e frontend em Next.js com TypeScript. Repositório privado.",
        en: "Fleet manager for a car rental company: vehicle registry, availability control and the rental cycle. Node and Express API, Next.js frontend in TypeScript. Private repository.",
      },
    },
  ],

  /* ---------- stack ---------- */
  stackNote: {
    pt: "Ferramentas que uso nos projetos listados aqui.",
    en: "Tools I use in the projects listed here.",
  },
  stack: [
    { label: { pt: "LINGUAGENS", en: "LANGUAGES" }, items: [
      { name: "Python", icon: "python" }, { name: "TypeScript", icon: "typescript" },
      { name: "C++", icon: "cplusplus" }, { name: "Rust", icon: "rust" },
      { name: "Java", icon: "openjdk" },
    ] },
    { label: { pt: "WEB & DADOS", en: "WEB & DATA" }, items: [
      { name: "React", icon: "react" }, { name: "Svelte", icon: "svelte" },
      { name: "Node.js", icon: "nodedotjs" }, { name: "Express", icon: "express" },
      { name: "D3.js", icon: "d3dotjs" }, { name: "PostgreSQL", icon: "postgresql" },
      { name: "Supabase", icon: "supabase" },
    ] },
    { label: { pt: "INFRA & TESTES", en: "INFRA & TESTING" }, items: [
      { name: "Docker", icon: "docker" }, { name: "GitHub Actions", icon: "githubactions" },
      { name: "pytest", icon: "pytest" }, { name: "Git", icon: "git" },
      { name: "Linux", icon: "linux" }, { name: "Google Cloud", icon: "googlecloud" },
      { name: "Render", icon: "render" },
    ] },
    { label: { pt: "EMBARCADOS & SIMULAÇÃO", en: "EMBEDDED & SIMULATION" }, items: [
      { name: "ESP32", icon: "espressif" }, { name: "Arduino", icon: "arduino" },
      { name: "Barramento CAN", icon: "" }, { name: "Godot", icon: "godotengine" },
      { name: "NumPy", icon: "numpy" },
    ] },
  ],

  /* ---------- trajetória ---------- */
  experience: [
    {
      period: { pt: "2024 — ATUAL", en: "2024 — NOW" },
      role:   { pt: "Líder de Eletrônica (Sistemas Embarcados)", en: "Electronics Lead (Embedded Systems)" },
      logo: "BAJA",
      company: "UnBaja — Equipe Baja SAE UnB · Brasília, DF",
      desc: {
        pt: "Desenvolvi o sistema de telemetria embarcado do Baja SAE Nacional 2026. São quatro nós ECU, dois Arduinos e um ESP32, comunicando por barramento CAN, com os dados exibidos ao piloto em tempo real num display TFT.",
        en: "I built the embedded telemetry system for Baja SAE Nacional 2026. It has four ECU nodes, two Arduinos and one ESP32, communicating over a CAN bus, with data shown to the driver in real time on a TFT display.",
      },
      b1: { pt: "Cuidei da cadeia inteira: leitura dos sensores, protocolo entre os nós, tratamento dos dados e a interface de bordo.",
            en: "I handled the whole chain: sensor reading, the protocol between nodes, data processing and the on-board interface." },
      b2: { pt: "Lidero quatro integrantes do subsistema de eletrônica, com distribuição de tarefas, planejamento técnico e prestação de contas à universidade.",
            en: "I lead four members of the electronics subsystem, handling task distribution, technical planning and accountability to the university." },
      metricValue: "4 ECUs",
      metric: { pt: "Nós independentes trocando dados em tempo real por barramento CAN.",
                en: "Independent nodes exchanging data in real time over a CAN bus." },
      stack: ["ESP32", "Arduino", "CAN", "C++"],
    },
    {
      period: { pt: "2026 — ATUAL", en: "2026 — NOW" },
      role:   { pt: "Pesquisador — Iniciação Científica", en: "Researcher — Undergraduate Research" },
      logo: "UnB",
      company: "Universidade de Brasília (UnB) · Brasília, DF",
      desc: {
        pt: "Pesquisa em dinâmica veicular. Modelo multicorpo em C++ validado contra o Project Chrono, com um sandbox na engine Godot para estudar powertrain, torque e suspensão. A entrega prevista inclui um artigo científico.",
        en: "Research in vehicle dynamics. C++ multibody model validated against Project Chrono, with a sandbox in the Godot engine to study powertrain, torque and suspension. Deliverables include a scientific paper.",
      },
      b1: { pt: "Modelagem da movimentação do veículo em terreno irregular, em C++ sobre a engine Godot.",
            en: "Modelling vehicle movement over irregular terrain, in C++ on the Godot engine." },
      b2: { pt: "Documentação técnica publicada em Docusaurus e atualizada a cada sprint semanal.",
            en: "Technical documentation published in Docusaurus and updated each weekly sprint." },
      metricValue: "7 frentes",
      metric: { pt: "Frentes de trabalho mapeadas, cinco já publicadas na documentação.",
                en: "Work fronts mapped, five already published in the documentation." },
      stack: ["C++", "Godot", "Chrono", "Docusaurus"],
    },
    {
      period: "2025 — 2026",
      role:   { pt: "Estágio no MCTI — Product Owner Jr.", en: "Internship at MCTI — Junior Product Owner" },
      logo: "MCTI",
      company: "Ministério da Ciência, Tecnologia e Inovação · Brasília, DF",
      desc: {
        pt: "Estágio no MCTI como Product Owner Jr. do NOVO SIGPLANI, plataforma que atende ao programa PADIS. O papel vinha da participação no Scrum semanal do produto: validar regras de negócio junto ao Product Owner e levar os erros do sistema para a pauta.",
        en: "Internship at MCTI as Junior Product Owner for NOVO SIGPLANI, the platform serving the PADIS programme. The role came from taking part in the product's weekly Scrum: validating business rules with the Product Owner and bringing system bugs to the agenda.",
      },
      b1: { pt: "Scrum semanal do NOVO SIGPLANI: refinamento de regras de negócio, reporte de erros e priorização junto ao Product Owner.",
            en: "Weekly Scrum on NOVO SIGPLANI: refining business rules, reporting bugs and prioritising with the Product Owner." },
      b2: { pt: "Por iniciativa própria, desenvolvi sozinho o ExtracaoRDA, automação em Python que lê PDFs de RDA e gera planilhas Excel. Projeto individual, fora do escopo do NOVO SIGPLANI e do time.",
            en: "On my own initiative, I single-handedly built ExtracaoRDA, a Python automation that reads RDA PDFs and generates Excel spreadsheets. A solo project, outside NOVO SIGPLANI's and the team's scope." },
      metricValue: "0 manual",
      metric: { pt: "Resultado do ExtracaoRDA: a transcrição manual dos relatórios saiu do fluxo dos analistas.",
                en: "Result of ExtracaoRDA: manual transcription of the reports left the analysts' workflow." },
      stack: ["Scrum", "Python", "regex", "Excel"],
    },
  ],

  /* ---------- contato ---------- */
  contactHeadline: { pt: "Aberto a estágio", en: "Open to internships" },
  contactLine: {
    pt: "Procuro estágio em desenvolvimento, com foco em backend, dados ou sistemas embarcados. Em Brasília ou remoto.",
    en: "I'm looking for a development internship focused on backend, data or embedded systems. In Brasília or remote.",
  },
  footerBuilt: { pt: "FEITO COM HTML · CSS · JS · BRASÍLIA, DF", en: "BUILT WITH HTML · CSS · JS · BRASÍLIA, BR" },
};
