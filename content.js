/* ==========================================================================
   CONTEÚDO DO PORTFÓLIO — edite SÓ este arquivo.
   --------------------------------------------------------------------------
   • Texto bilíngue:  { pt: "português", en: "english" }
     Texto simples:   "vale para os dois idiomas"
   • Imagens: coloque os arquivos em images/ e aponte o caminho relativo,
     ex: image: "images/projeto-01.png"
     Deixe "" (vazio) para manter o placeholder listrado do design.
   • Qualquer campo removido/vazio volta para o placeholder original.
   ========================================================================== */

window.PORTFOLIO = {

  /* ---------- identidade ---------- */
  name: "Heitor Miranda",
  logo: "HM",                       // 2-3 letras, aparece no header e nos cards
  email: "heitorm50@gmail.com",

  links: {
    github:   "https://github.com/HeitorM50",
    linkedin: "",                   // ex: "https://linkedin.com/in/seu-perfil"
    cv:       "",                   // ex: "cv.pdf" (coloque o PDF na raiz do repo)
  },

  /* ---------- hero ---------- */
  heroBadge: {
    pt: "DESENVOLVEDOR BACKEND — ABERTO A OPORTUNIDADES",
    en: "BACKEND DEVELOPER — OPEN TO OPPORTUNITIES",
  },
  headline: {
    line1:     { pt: "Construo sistemas", en: "I build systems" },
    line2:     { pt: "que",               en: "that" },
    highlight: { pt: "escalam",           en: "scale" },
    tail: ".",
  },
  intro: {
    pt: "[2–3 frases sobre sua especialidade, stack principal e o tipo de time que procura.]",
    en: "[2–3 sentences on your specialty, main stack and the kind of team you're looking for.]",
  },
  heroStats: [
    { value: "[X]", label: { pt: "ANOS DE EXP.", en: "YEARS EXP." } },
    { value: "[X]", label: { pt: "PROJETOS",     en: "PROJECTS" } },
    { value: "[X]", label: { pt: "EMPRESAS",     en: "COMPANIES" } },
  ],

  /* ---------- cards empilhados do hero (máx. 3) ---------- */
  deck: [
    { title: { pt: "[Projeto 01]", en: "[Project 01]" }, tag: "REACT · TS",      image: "" },
    { title: { pt: "[Projeto 02]", en: "[Project 02]" }, tag: "NODE · POSTGRES", image: "" },
    { title: { pt: "[Projeto 03]", en: "[Project 03]" }, tag: "DOCKER · AWS",    image: "" },
  ],

  /* ---------- sobre ---------- */
  photo: "",                        // ex: "images/retrato.jpg" (proporção 4:5)
  manifesto: {
    pt: "[Uma frase-manifesto sobre como você trabalha.]",
    en: "[A one-line manifesto about how you work.]",
  },
  about1: {
    pt: "[Parágrafo 1 — sua trajetória: como começou, o que estudou, o que te trouxe até aqui.]",
    en: "[Paragraph 1 — your background: how you started, what you studied, what brought you here.]",
  },
  about2: {
    pt: "[Parágrafo 2 — o que busca agora, os problemas que gosta de resolver e algo pessoal.]",
    en: "[Paragraph 2 — what you want next, the problems you like solving, something personal.]",
  },
  aboutStats: [
    { value: "[X]+",      label: { pt: "ANOS CODANDO",   en: "YEARS CODING" } },
    { value: "[X]",       label: { pt: "PRODUTOS NO AR", en: "SHIPPED PRODUCTS" } },
    { value: "[Cidade]",  label: { pt: "BASE · REMOTO OK", en: "BASED · REMOTE OK" } },
  ],

  /* ---------- projetos em destaque (quantos quiser) ---------- */
  featured: [
    {
      title: { pt: "[Projeto em destaque 1]", en: "[Featured project 1]" },
      desc: {
        pt: "[O problema, o que você fez e o resultado em número.]",
        en: "[The problem, what you did and the result in numbers.]",
      },
      image: "",                    // ex: "images/destaque-01.png" (16:10)
      tech: ["[TECH]", "[TECH]", "[TECH]"],
      liveUrl: "",
      sourceUrl: "",
    },
    {
      title: { pt: "[Projeto em destaque 2]", en: "[Featured project 2]" },
      desc: { pt: "[O problema, o que você fez e o resultado.]", en: "[The problem, what you did, the result.]" },
      image: "", tech: ["[TECH]", "[TECH]", "[TECH]"], liveUrl: "", sourceUrl: "",
    },
    {
      title: { pt: "[Projeto em destaque 3]", en: "[Featured project 3]" },
      desc: { pt: "[O problema, o que você fez e o resultado.]", en: "[The problem, what you did, the result.]" },
      image: "", tech: ["[TECH]", "[TECH]", "[TECH]"], liveUrl: "", sourceUrl: "",
    },
  ],

  /* ---------- grade de todos os projetos (quantos quiser) ---------- */
  grid: [
    { title: "[Projeto 01]", year: "[ANO]", stack: ["[STACK]", "[STACK]"], image: "", url: "",
      desc: { pt: "[Uma linha: o que é e qual problema resolve.]", en: "[One line: what it is and the problem it solves.]" } },
    { title: "[Projeto 02]", year: "[ANO]", stack: ["[STACK]", "[STACK]"], image: "", url: "",
      desc: { pt: "[Uma linha sobre o projeto.]", en: "[One line about the project.]" } },
    { title: "[Projeto 03]", year: "[ANO]", stack: ["[STACK]", "[STACK]"], image: "", url: "",
      desc: { pt: "[Uma linha sobre o projeto.]", en: "[One line about the project.]" } },
    { title: "[Projeto 04]", year: "[ANO]", stack: ["[STACK]", "[STACK]"], image: "", url: "",
      desc: { pt: "[Uma linha sobre o projeto.]", en: "[One line about the project.]" } },
    { title: "[Projeto 05]", year: "[ANO]", stack: ["[STACK]", "[STACK]"], image: "", url: "",
      desc: { pt: "[Uma linha sobre o projeto.]", en: "[One line about the project.]" } },
    { title: "[Projeto 06]", year: "[ANO]", stack: ["[STACK]", "[STACK]"], image: "", url: "",
      desc: { pt: "[Uma linha sobre o projeto.]", en: "[One line about the project.]" } },
  ],

  /* ---------- stack ----------
     icon: slug do simpleicons.org. Os que já vêm embutidos (offline):
     react typescript nextdotjs tailwindcss vite framer nodedotjs postgresql
     prisma graphql redis docker cloudflare git vercel vitest figma
     Qualquer outro slug é buscado em cdn.simpleicons.org (precisa de internet). */
  stackNote: {
    pt: "[Ajuste as listas para a sua stack real — mantenha só o que defenderia numa entrevista técnica.]",
    en: "[Tune the lists to your real stack — keep only what you'd defend in an interview.]",
  },
  stack: [
    { label: "FRONTEND", items: [
      { name: "React", icon: "react" }, { name: "TypeScript", icon: "typescript" },
      { name: "Next.js", icon: "nextdotjs" }, { name: "Tailwind CSS", icon: "tailwindcss" },
    ] },
    { label: "BACKEND & DATA", items: [
      { name: "Node.js", icon: "nodedotjs" }, { name: "PostgreSQL", icon: "postgresql" },
      { name: "Prisma", icon: "prisma" }, { name: "Redis", icon: "redis" },
    ] },
    { label: { pt: "INFRA & FERRAMENTAS", en: "INFRA & TOOLING" }, items: [
      { name: "Docker", icon: "docker" }, { name: "Git", icon: "git" },
      { name: "Vercel", icon: "vercel" }, { name: "Figma", icon: "figma" },
    ] },
  ],

  /* ---------- trajetória (clicável na timeline) ---------- */
  experience: [
    {
      period: { pt: "[2024 — ATUAL]", en: "[2024 — NOW]" },
      role:   { pt: "[Cargo atual]",  en: "[Current role]" },
      logo: "LOGO",
      company: "[EMPRESA · CIDADE / REMOTO]",
      desc: { pt: "[Resumo do que você fez ali: escopo, time, tecnologias e impacto.]",
              en: "[Summary of what you did there: scope, team, technologies, impact.]" },
      b1: { pt: "[Entrega principal — com número quando possível.]", en: "[Key delivery — with a number when possible.]" },
      b2: { pt: "[Segunda conquista relevante.]", en: "[Second relevant achievement.]" },
      metricValue: "[+XX%]",
      metric: { pt: "[Explique a métrica em uma linha.]", en: "[Explain the metric in one line.]" },
      stack: ["[TECH]", "[TECH]", "[TECH]", "[TECH]"],
    },
    {
      period: "[2022 — 2024]", role: { pt: "[Cargo anterior]", en: "[Previous role]" },
      logo: "LOGO", company: "[EMPRESA · CIDADE / REMOTO]",
      desc: { pt: "[Resumo do período.]", en: "[Summary of the period.]" },
      b1: { pt: "[Entrega principal.]", en: "[Key delivery.]" },
      b2: { pt: "[Segunda conquista.]", en: "[Second achievement.]" },
      metricValue: "[+XX%]", metric: { pt: "[Explique a métrica.]", en: "[Explain the metric.]" },
      stack: ["[TECH]", "[TECH]", "[TECH]"],
    },
    {
      period: "[2020 — 2022]", role: { pt: "[Primeiro cargo]", en: "[First role]" },
      logo: "LOGO", company: "[EMPRESA · CIDADE / REMOTO]",
      desc: { pt: "[Resumo do período.]", en: "[Summary of the period.]" },
      b1: { pt: "[Entrega principal.]", en: "[Key delivery.]" },
      b2: { pt: "[Segunda conquista.]", en: "[Second achievement.]" },
      metricValue: "[+XX%]", metric: { pt: "[Explique a métrica.]", en: "[Explain the metric.]" },
      stack: ["[TECH]", "[TECH]", "[TECH]"],
    },
  ],

  /* ---------- contato ---------- */
  contactHeadline: { pt: "Aberto a novas vagas", en: "Open to new roles" },
  contactLine: {
    pt: "[Uma frase dizendo o tipo de posição que procura e como te achar mais rápido.]",
    en: "[One line on the role you're after and the fastest way to reach you.]",
  },
  footerBuilt: { pt: "FEITO COM HTML · CSS · JS", en: "BUILT WITH HTML · CSS · JS" },
};
