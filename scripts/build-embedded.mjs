import { build } from 'esbuild'
import { rmSync } from 'node:fs'

// Only this ignored, generated bundle directory is replaced on each build.
rmSync(new URL('../public/vendor/embedded/', import.meta.url), { recursive: true, force: true })

await build({
  entryPoints: { loader: 'src/lib/embedded-scene-loader.ts' },
  outdir: 'public/vendor/embedded',
  bundle: true,
  splitting: true,
  format: 'esm',
  platform: 'browser',
  target: 'es2020',
  jsx: 'automatic',
  minify: true,
  define: { 'process.env.NODE_ENV': '"production"' },
  chunkNames: '[name]-[hash]',
  logLevel: 'warning'
})
