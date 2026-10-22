# Reconhecimentos, certificados e créditos

## Fontes editoriais

- Hindsight: os dois e-mails da organização fornecidos pelo proprietário confirmam o **1º lugar da equipe OsBiruBob no IBM TechXchange 2026 Pre-conference Dev Day Hackathon**. A arte oficial está em `images/hindsight-winner.png`; o texto dos e-mails não é publicado. Não há URL verificada da postagem do LinkedIn.
- PMI Sleep 5: manter o resultado como **avaliação técnica independente da IBM**, posterior ao hackathon, conforme o parecer já publicado no estudo de caso.
- Anthropic e extensão UnB: currículo e exportação do perfil LinkedIn fornecidos pelo proprietário. Sem datas, horas ou URLs de credenciais verificadas.
- Extensão UnB 2026 (PyTorch, Código Seguro, Mesa Redonda de Programação Competitiva, XIV Maratona UnB de Programação): certificados DEX/SIGAA emitidos em 15/10/2026, fornecidos pelo proprietário. Datas e cargas horárias são as do documento. Os PDFs não são publicados porque exibem o CPF.
- IBM Dev Day, PMI-DF e iFood CAMP: PDFs originais de participação em `public/certificates/`. As datas são dos eventos, não datas de emissão. O iFood CAMP não informa o ano; não deduzir pelo nome ou data do arquivo. O original do PMI tem uma repetição no nome do participante e é preservado sem alteração.

## Equipes

`src/data/contributors.ts` reúne os nomes públicos e avatares consultados em 28/09/2026. Cada projeto referencia seus integrantes em `portfolio.ts`, em ordem alfabética de nome. O catálogo não é um ranking de commits e não consulta o GitHub em tempo de execução.

- [Hindsight](https://github.com/HeitorM50/OsBiruBob): cinco integrantes identificados no histórico público, consistente com a equipe de cinco documentada no case.
- [PMI Sleep 5](https://github.com/guxvr/PMI-Sleep-5): quatro perfis no histórico público, mais Heitor, cuja contribuição de produto/pitch e trabalho integrado por outras contas estão documentados no portfólio.
- [Crianex](https://github.com/mdsreq-fga-unb/REQ-2026.1-T02-Crianex-): seis integrantes de desenvolvimento do README. Cliente e professor não entram automaticamente como desenvolvedores.
- [CoOps](https://github.com/unb-mds/2025-2-Squad-01): cinco integrantes da seção Equipe do README; autores de commits fora dessa equipe não entram automaticamente.
- Projetos EDA2 G18: HeitorM50 e Bappoz. IA2 BloodMNIST: HeitorM50 e guxvr.
- Projetos individuais já identificados no catálogo: Heitor. Equipes sem nomes documentados permanecem sem lista, sem presumir autoria individual.

Para atualizar um avatar, baixar o perfil público, gerar um WebP de 96 × 96 em `public/media/contributors/` e preservar os atributos de tamanho na apresentação. A ausência deliberada de `avatar` usa iniciais. Nenhum bot ou ferramenta entra nos créditos.

## Currículo

O catálogo tipado de `src/data/certificates.ts` alimenta o site e o trecho LaTeX gerado por `node scripts/cv-certificates.mjs`. O trecho é inserido entre `BEGIN PORTFOLIO CERTIFICATES` e `END PORTFOLIO CERTIFICATES` na fonte canônica indicada em `CLAUDE.md`.

Compilar uma cópia temporária da fonte com a linha `\\phone` removida, usando LuaLaTeX duas vezes. Verificar duas páginas, texto extraível, links e ausência do telefone; renderizar e inspecionar ambas as páginas. Só então copiar para `public/cv.pdf` (a única cópia; o site é publicado a partir de `public/`). Não versionar a fonte privada ou arquivos temporários.
