# HeitorM50.github.io

Portfólio pessoal — site estático publicado via GitHub Pages em
**https://heitorm50.github.io**

## Como editar

Todo o conteúdo vive em **`content.js`**. Nome, e-mail, links, projetos,
stack, trajetória e caminhos de imagem estão lá, com comentários explicando
cada campo. Não é preciso mexer no `index.html`.

1. Edite `content.js`
2. Coloque as imagens em `images/` (tamanhos no `images/README.md`)
3. `git add -A && git commit -m "atualiza conteúdo" && git push`

O Pages republica sozinho em ~1 minuto.

Campos bilíngues usam `{ pt: "...", en: "..." }` — o site tem alternador
PT/EN no header. Texto sem esse formato vale para os dois idiomas.
Qualquer campo deixado vazio (`""`) volta ao placeholder do design.

## Estrutura

```
index.html          markup + lógica do componente (design do Claude Design)
content.js          ← todo o conteúdo editável
images/             suas imagens
assets/
  dc-runtime.js     runtime que renderiza o template
  vendor/           React 18 (UMD, local — sem CDN)
  fonts/            Space Grotesk + IBM Plex Mono (woff2, local)
  icons/            ícones da stack (SVG, local)
  favicon.svg
```

## Rodar local

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

Abrir o `index.html` direto pelo `file://` não funciona — o runtime precisa
de HTTP para carregar os assets.
