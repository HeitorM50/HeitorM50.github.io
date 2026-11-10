import { build } from 'esbuild'
import { rmSync } from 'node:fs'

// Bundle das cenas de rolagem (GSAP + ScrollTrigger) e, num chunk separado carregado
// sob demanda, a mão 3D do hero (three.js). Pasta gerada e ignorada pelo git.
rmSync(new URL('../public/vendor/scroll/', import.meta.url), { recursive: true, force: true })

await build({
  entryPoints: { scroll: 'src/lib/scroll-scenes.ts', fx: 'src/lib/fx.ts' },
  outdir: 'public/vendor/scroll',
  bundle: true,
  format: 'esm',
  splitting: true,
  chunkNames: '[name]-[hash]',
  platform: 'browser',
  target: 'es2020',
  minify: true,
  legalComments: 'none',
  logLevel: 'warning'
})
