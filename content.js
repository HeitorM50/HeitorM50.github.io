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
    pt: "ENG. DE SOFTWARE @ UnB · EMBARCADOS + FULLSTACK — ABERTO A ESTÁGIO",
    en: "SOFTWARE ENGINEERING @ UnB · EMBEDDED + FULLSTACK — OPEN TO INTERNSHIPS",
  },
  headline: {
    line1:     { pt: "Do sensor",  en: "From sensor" },
    line2:     { pt: "à",          en: "to" },
    highlight: { pt: "interface",  en: "interface" },
    tail: ".",
  },
  intro: {
    pt: "Construo software de ponta a ponta — do backend à tela — e transito entre software e hardware com naturalidade. Python, TypeScript, C++ e Rust; telemetria embarcada sobre CAN; pipelines de dados e CI/CD que sustentam a entrega.",
    en: "I build software end to end — from backend to screen — and move between software and hardware comfortably. Python, TypeScript, C++ and Rust; embedded telemetry over CAN; data pipelines and CI/CD that keep delivery standing.",
  },
  heroStats: [
    { value: "2+", label: { pt: "ANOS CONSTRUINDO", en: "YEARS BUILDING" } },
    { value: "9",  label: { pt: "PROJETOS",         en: "PROJECTS" } },
    { value: "4",  label: { pt: "LIDERADOS",        en: "TEAM LED" } },
  ],

  /* ---------- cards empilhados do hero ---------- */
  deck: [
    { title: "Crianex Hub", tag: "SVELTE · SUPABASE", image: "images/crianex.jpg" },
    { title: "CoOps",       tag: "REACT · D3 · PYTHON", image: "images/coops.jpg" },
    { title: "ExtracaoRDA", tag: "PYTHON · PYQT", image: "" },
  ],

  /* ---------- sobre ---------- */
  photo: "",   // retrato 4:5 — ex: "images/retrato.jpg"
  manifesto: {
    pt: "Gosto de problema que atravessa camadas: do sensor no chassi ao gráfico na tela.",
    en: "I like problems that cut across layers: from the sensor on the chassis to the chart on screen.",
  },
  about1: {
    pt: "Estudo Engenharia de Software na UnB (conclusão prevista em mar/2029) e Análise e Desenvolvimento de Sistemas no GRAN. Comecei pelo hardware, na equipe de Baja SAE, e fui puxando o fio até o outro lado: hoje escrevo tanto o firmware que lê um sensor quanto a interface que mostra o dado.",
    en: "I study Software Engineering at UnB (graduating Mar/2029) and Systems Analysis and Development at GRAN. I started on the hardware side, in the Baja SAE team, and followed the thread to the other end: today I write both the firmware that reads a sensor and the interface that shows the data.",
  },
  about2: {
    pt: "Procuro estágio onde eu possa levar um problema do início ao fim e medir o resultado. O que mais me diverte é a parte chata: reduzir um pipeline de horas para segundos, cobrir o código com teste e deixar o deploy automático. Fora do código, lidero 4 pessoas na eletrônica do UnBaja.",
    en: "I'm looking for an internship where I can take a problem end to end and measure the result. What I enjoy most is the boring part: cutting a pipeline from hours to seconds, covering code with tests and automating the deploy. Outside code, I lead 4 people in UnBaja's electronics team.",
  },
  aboutStats: [
    { value: "2+",             label: { pt: "ANOS CODANDO",   en: "YEARS CODING" } },
    { value: "3",              label: { pt: "PRODUTOS NO AR", en: "SHIPPED PRODUCTS" } },
    { value: "Planaltina, DF", label: { pt: "BASE · REMOTO OK", en: "BASED · REMOTE OK" } },
  ],

  /* ---------- projetos em destaque ---------- */
  featured: [
    {
      title: "Crianex Hub",
      desc: {
        pt: "Plataforma administrativa e vitrine bilíngue construída para um cliente real (software house Crianex) e publicada em produção. Levantamento de requisitos direto com o cliente, sob FDD + Kanban. Projeto em equipe — 66 commits meus, 3º maior contribuidor.",
        en: "Admin platform and bilingual showcase built for a real client (Crianex software house) and shipped to production. Requirements gathered directly with the client, under FDD + Kanban. Team project — 66 commits of mine, 3rd largest contributor.",
      },
      image: "images/crianex.jpg",
      tech: ["Svelte/SvelteKit", "PostgreSQL", "Supabase", "Render"],
      liveUrl: "https://crianex.onrender.com",
      sourceUrl: "https://github.com/mdsreq-fga-unb/REQ-2026.1-T02-Crianex-",
    },
    {
      title: "CoOps",
      desc: {
        pt: "Plataforma que mede colaboração em times de desenvolvimento no GitHub, com dashboards em D3.js e uma camada de IA que explica os dados em linguagem natural. O pipeline em camadas (bronze/silver/gold) caiu de ~4h para ~30s. Testes em pytest e seis pipelines de CI/CD. Projeto em equipe sob Scrum — 47 commits meus.",
        en: "Platform that measures collaboration in GitHub development teams, with D3.js dashboards and an AI layer that explains the data in plain language. The layered pipeline (bronze/silver/gold) went from ~4h to ~30s. pytest suites and six CI/CD pipelines. Team project under Scrum — 47 commits of mine.",
      },
      image: "images/coops.jpg",
      tech: ["Python", "React", "TypeScript", "D3.js", "GitHub Actions"],
      liveUrl: "https://unb-mds.github.io/2025-2-Squad-01/",
      sourceUrl: "https://github.com/unb-mds/2025-2-Squad-01",
    },
    {
      title: "ExtracaoRDA",
      desc: {
        pt: "Aplicação desktop feita no MCTI que lê os PDFs dos Relatórios Demonstrativos Anuais do PADIS e os estrutura em planilhas Excel, eliminando a transcrição manual da equipe. Tem uma camada de validação que cruza os valores extraídos com outras fontes e aponta inconsistências para o analista. Empacotada com PyInstaller, com CI no GitHub Actions e suíte de testes em pytest.",
        en: "Desktop application built at MCTI that reads the PDFs of PADIS Annual Reports and structures them into Excel spreadsheets, removing the team's manual transcription. A validation layer cross-checks extracted values against other sources and flags inconsistencies for the analyst. Packaged with PyInstaller, CI on GitHub Actions and a pytest suite.",
      },
      image: "",
      tech: ["Python", "PyQt", "PyInstaller", "pytest"],
      liveUrl: "",
      sourceUrl: "",   // repositório privado — sem botão "Código"
    },
  ],

  /* ---------- grade de projetos ---------- */
  grid: [
    {
      title: "dev-second-brain", year: "2026",
      stack: ["TypeScript", "RAG", "MCP"],
      image: "", url: "https://github.com/HeitorM50/dev-second-brain",
      desc: {
        pt: "Segundo cérebro que guarda o contexto de projetos e responde sobre decisões passadas. Busca e embeddings rodam 100% na máquina, sem chave de API.",
        en: "A second brain that keeps project context and answers questions about past decisions. Search and embeddings run entirely on your machine, no API key.",
      },
    },
    {
      title: "AlugaFacil", year: "2026",
      stack: ["Next.js", "TypeScript", "Node.js"],
      image: "", url: "",
      desc: {
        pt: "Plataforma de aluguel fullstack: API em Node/Express e frontend em Next.js com TypeScript. Repositório privado.",
        en: "Fullstack rental platform: Node/Express API and a Next.js frontend in TypeScript. Private repository.",
      },
    },
    {
      title: "rbtree-db", year: "2026",
      stack: ["Rust", "Criterion"],
      image: "", url: "https://github.com/eda2-2026/G18_Arvore_EDA2-2026.1",
      desc: {
        pt: "Banco chave-valor em Rust sobre árvore Rubro-Negra, com range queries em O(log n + k) e REPL no estilo Redis. Benchmarks contra BTreeMap e HashMap. Em dupla (EDA2).",
        en: "Key-value store in Rust over a Red-Black tree, with O(log n + k) range queries and a Redis-style REPL. Benchmarked against BTreeMap and HashMap. Pair project (EDA2).",
      },
    },
    {
      title: "Quadtree Compressor", year: "2026",
      stack: ["Python", "NumPy", "Pillow"],
      image: "", url: "https://github.com/eda2-2026/G18_Busca_EDA2-2026.1",
      desc: {
        pt: "Compressor de imagens em escala de cinza baseado em Quadtree, com busca espacial O(profundidade) e serialização binária própria: ~98% de compressão mantendo PSNR acima de 30 dB. Em dupla (EDA2).",
        en: "Grayscale image compressor based on a Quadtree, with O(depth) spatial search and a custom binary format: ~98% compression while keeping PSNR above 30 dB. Pair project (EDA2).",
      },
    },
    {
      title: "CryptoArbitrageGraph", year: "2026",
      stack: ["Python", "Bellman-Ford"],
      image: "", url: "https://github.com/eda2-2026/G18_Grafos_EDA2-2026.1",
      desc: {
        pt: "Detecção de arbitragem triangular em cripto modelando moedas como grafo ponderado e aplicando Bellman-Ford, com dados da API CoinGecko e grafo interativo. Em equipe (EDA2).",
        en: "Triangular arbitrage detection in crypto, modelling currencies as a weighted graph and applying Bellman-Ford, with CoinGecko API data and an interactive graph. Team project (EDA2).",
      },
    },
    {
      title: "PIBIC · Dinâmica Veicular", year: "2026",
      stack: ["C++", "Godot", "Chrono"],
      image: "images/pibic.jpg", url: "https://interactivedynamics.github.io/heitor-docs/",
      desc: {
        pt: "Iniciação científica em dinâmica veicular: modelo multicorpo em C++ validado contra o Project Chrono, com sandbox em Godot para ganhar intuição. Documentação viva em Docusaurus.",
        en: "Undergraduate research in vehicle dynamics: a C++ multibody model validated against Project Chrono, with a Godot sandbox to build intuition. Living documentation in Docusaurus.",
      },
    },
  ],

  /* ---------- stack ---------- */
  stackNote: {
    pt: "O que uso de verdade no dia a dia — e o que eu defenderia numa entrevista técnica.",
    en: "What I actually use day to day — and what I'd defend in a technical interview.",
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
        pt: "Idealizei e desenvolvi do zero o sistema de telemetria embarcado do Baja SAE Nacional 2026: arquitetura de 4 nós ECU (2 Arduinos + 1 ESP32) comunicando por barramento CAN, com exibição em tempo real ao piloto num display TFT.",
        en: "I designed and built from scratch the embedded telemetry system for Baja SAE Nacional 2026: a 4-node ECU architecture (2 Arduinos + 1 ESP32) communicating over a CAN bus, with real-time display to the driver on a TFT screen.",
      },
      b1: { pt: "Responsável pela cadeia inteira: leitura de sensores, protocolo entre nós, tratamento dos dados e interface visual de bordo.",
            en: "Owner of the whole chain: sensor reading, inter-node protocol, data processing and the on-board visual interface." },
      b2: { pt: "Lidero 4 integrantes do subsistema de eletrônica — distribuição de tarefas, planejamento técnico e prestação de contas à universidade.",
            en: "I lead 4 members of the electronics subsystem — task distribution, technical planning and accountability to the university." },
      metricValue: "4 ECUs",
      metric: { pt: "Nós independentes conversando em tempo real por barramento CAN.",
                en: "Independent nodes talking in real time over a CAN bus." },
      stack: ["ESP32", "Arduino", "CAN", "C++"],
    },
    {
      period: { pt: "2026 — ATUAL", en: "2026 — NOW" },
      role:   { pt: "Pesquisador — Iniciação Científica", en: "Researcher — Undergraduate Research" },
      logo: "UnB",
      company: "Universidade de Brasília (UnB) · Brasília, DF",
      desc: {
        pt: "Pesquisa em dinâmica veicular: modelo multicorpo em C++ validado contra o Project Chrono, com sandbox na engine Godot para ganhar intuição sobre powertrain, torque e suspensão. Documentação pública e viva, com artigo científico previsto como entrega.",
        en: "Research in vehicle dynamics: a C++ multibody model validated against Project Chrono, with a Godot sandbox to build intuition on powertrain, torque and suspension. Public living documentation, with a scientific paper planned as a deliverable.",
      },
      b1: { pt: "Modelagem da movimentação do veículo em terreno irregular, em C++ sobre a engine Godot.",
            en: "Modelling vehicle movement over irregular terrain, in C++ on the Godot engine." },
      b2: { pt: "Documentação técnica publicada em Docusaurus, atualizada por sprint semanal.",
            en: "Technical documentation published in Docusaurus, updated every weekly sprint." },
      metricValue: "7 frentes",
      metric: { pt: "Frentes de trabalho mapeadas, 5 já publicadas na documentação.",
                en: "Work fronts mapped, 5 already published in the documentation." },
      stack: ["C++", "Godot", "Chrono", "Docusaurus"],
    },
    {
      period: "2025 — 2026",
      role:   { pt: "Product Owner Jr.", en: "Junior Product Owner" },
      logo: "MCTI",
      company: "Ministério da Ciência, Tecnologia e Inovação (MCTI) · Brasília, DF",
      desc: {
        pt: "Desenvolvi em Python uma automação que lê PDFs via regex e estrutura as informações em planilha Excel, eliminando a transcrição manual feita pela equipe de analistas.",
        en: "I built a Python automation that reads PDFs via regex and structures the information into Excel spreadsheets, removing the manual transcription done by the analyst team.",
      },
      b1: { pt: "Adicionei uma camada de validação automática que cruza os valores extraídos com outras fontes para detectar inconsistências, reduzindo o tempo de conferência.",
            en: "I added an automatic validation layer that cross-checks extracted values against other sources to detect inconsistencies, cutting review time." },
      b2: { pt: "Acompanhei as cerimônias de Scrum junto ao Product Owner, validando regras de negócio e mapeando erros do sistema para pauta das reuniões.",
            en: "I took part in Scrum ceremonies alongside the Product Owner, validating business rules and mapping system errors into meeting agendas." },
      metricValue: "0 manual",
      metric: { pt: "A transcrição manual dos relatórios deixou de existir no fluxo da equipe.",
                en: "Manual transcription of the reports no longer exists in the team's workflow." },
      stack: ["Python", "regex", "Excel", "Scrum"],
    },
  ],

  /* ---------- contato ---------- */
  contactHeadline: { pt: "Aberto a estágio", en: "Open to internships" },
  contactLine: {
    pt: "Procuro estágio em desenvolvimento — backend, fullstack ou embarcados. O caminho mais rápido é o e-mail abaixo; respondo em até um dia.",
    en: "I'm looking for a development internship — backend, fullstack or embedded. The fastest route is the email below; I reply within a day.",
  },
  footerBuilt: { pt: "FEITO COM HTML · CSS · JS · PLANALTINA, DF", en: "BUILT WITH HTML · CSS · JS · PLANALTINA, BR" },
};
