import { copyFileSync, cpSync, existsSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const out = join(process.cwd(), 'out')
const nested404 = join(out, '404', 'index.html')
const pages404 = join(out, '404.html')

if (!existsSync(nested404)) throw new Error('Next.js did not generate the expected 404 page')
copyFileSync(nested404, pages404)
cpSync(join(process.cwd(), 'assets', 'icons'), join(out, 'assets', 'icons'), { recursive: true })

function htmlFiles(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry)
    return statSync(path).isDirectory() ? htmlFiles(path) : path.endsWith('.html') ? [path] : []
  })
}

function removeNextRuntime(html) {
  return html
    .replace(/<link\s+rel="preload"\s+as="script"[^>]*\/>/g, '')
    .replace(/<script\s+[^>]*src="\/_next\/static\/[^\"]+"[^>]*><\/script>/g, '')
    .replace(/<script>\(self\.__next_f[\s\S]*?<\/script>/g, '')
    .replace(/<script>self\.__next_f[\s\S]*?<\/script>/g, '')
}

// Sem o runtime do Next, os chunks, o manifesto do build e os payloads RSC (.txt) ficam sem uso.
// Só o CSS de _next/static/css continua referenciado pelo HTML.
for (const entry of readdirSync(join(out, '_next', 'static'))) {
  if (entry !== 'css' && entry !== 'media') rmSync(join(out, '_next', 'static', entry), { recursive: true, force: true })
}
function rscPayloads(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const path = join(directory, entry)
    if (statSync(path).isDirectory()) return rscPayloads(path)
    return entry === 'index.txt' || (entry.startsWith('__next') && entry.endsWith('.txt')) ? [path] : []
  })
}
for (const file of rscPayloads(out)) rmSync(file)

for (const file of htmlFiles(out)) {
  const html = readFileSync(file, 'utf8')
  if (!html.includes('/_next/static/')) continue

  const optimized = removeNextRuntime(html)

  if (html.includes('data-static-runtime') && !optimized.includes('data-static-runtime')) {
    throw new Error(`Static runtime was lost while optimizing ${file}`)
  }

  writeFileSync(file, optimized)
}
