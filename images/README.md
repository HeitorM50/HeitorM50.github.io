# Imagens

Esta pasta guarda os arquivos-fonte das imagens do portfólio. Os componentes usam
as versões publicadas em `public/media/`, registradas em `src/data/portfolio.ts`.

Tamanhos que o design espera:

| Onde                        | Proporção | Sugerido    |
|-----------------------------|-----------|-------------|
| Cards do hero (`deck`)      | ~16:10    | 1200 × 760  |
| Projetos em destaque        | 16:10     | 1400 × 880  |
| Grade de projetos (`grid`)  | 16:10     | 1200 × 760  |
| Retrato (`photo`)           | 4:5       | 1000 × 1250 |

Mantenha o assunto principal no centro e gere os dois formatos publicados:

```bash
magick images/projeto.png -strip -quality 78 public/media/projeto.webp
magick images/projeto.png -strip -quality 50 public/media/projeto.avif
```

Informe largura e altura originais nos metadados do projeto e escreva um texto
alternativo localizado no componente que exibe a imagem.
