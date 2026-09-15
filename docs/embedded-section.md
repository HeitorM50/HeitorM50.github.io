# Embarcados e catálogo

O site já usa TypeScript, Tailwind e a estrutura shadcn. Os componentes ficam
em `src/components/ui`, com o alias `@/components/ui`; os estilos ficam em
`src/app/globals.css`. Não criar uma segunda pasta `components/ui` na raiz.

## Execução e publicação

`npm run dev` e `npm run build` geram o bundle da cena com esbuild. A saída
`public/vendor/embedded/` é gerada e ignorada pelo Git. O postbuild remove o
runtime do Next, por isso a área visual tem sua própria raiz React. O carregador
leve é compartilhado entre desenvolvimento e exportação, enquanto React,
Framer Motion e Spline só são importados ao ativar a cena.

O servidor de prévia comprime HTML, CSS, JavaScript e SVG com gzip quando o
cliente aceita essa codificação, como faz o GitHub Pages. Os limites do Lighthouse
continuam iguais; a auditoria local usa as condições de entrega da publicação.

No desktop a cena inicia perto da seção. Em telas pequenas, dispositivos de
toque ou com movimento reduzido, exige um clique. Fora da seção ou com a aba
oculta, pausa; uma pausa manual persiste até o visitante retomar. Erros de rede,
ausência de WebGL2 e timeout de 30 segundos mantêm a composição estática.

## Fotos da bancada

1. Guardar os originais em `images/`.
2. Converter com ImageMagick para WebP e AVIF em `public/media/` e conferir
   visualmente os dois formatos. Exemplo para `bancada-01.jpg`:

   ```bash
   magick images/bancada-01.jpg -strip -quality 78 public/media/bancada-01.webp
   magick images/bancada-01.jpg -strip -quality 50 public/media/bancada-01.avif
   ```

3. Adicionar itens a `benchPhotos` em `src/data/portfolio.ts`, com o nome-base,
   dimensões reais, `alt` e `caption` em português e inglês.

A galeria só aparece quando o array contém fotos. A cena Spline é ilustrativa.

## Fontes editoriais

- Baja: https://github.com/UnBajaSAE/baja-telemetry-api — distinguir o sistema
  embarcado construído das fases do backend ainda em desenvolvimento.
- PMI: https://github.com/guxvr/PMI-Sleep-5 — demonstração com dados simulados.
  A contribuição de Heitor, confirmada por ele, é a concepção do produto,
  regras de negócio, Product Model Canvas e roteiro do pitch.
- OmaPkDex: https://github.com/HeitorM50/omapkdex — implementação para Omarchy
  inspirada no PokeTokenBar; captura original em `docs/screenshots/companion.png`.
- omarchy-gcal: https://github.com/HeitorM50/omarchy-gcal.
- IA2: https://github.com/HeitorM50/IA2-2026.2 — autoria e divisão do artigo
  documentadas em `artigo-1/NOTAS.md`.

A captura da PMI vem de `docs/images/workspace.png` do repositório público.
Os projetos novos não têm rotas de estudo de caso: seus links apontam para os
repositórios. Projetos privados continuam sem link de código.
