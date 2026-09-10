import { copyFileSync, cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const out = join(process.cwd(), 'out')
const nested404 = join(out, '404', 'index.html')
const pages404 = join(out, '404.html')

if (!existsSync(nested404)) throw new Error('Next.js did not generate the expected 404 page')
copyFileSync(nested404, pages404)
cpSync(join(process.cwd(), 'assets', 'icons'), join(out, 'assets', 'icons'), { recursive: true })
const vendor = join(out, 'vendor')
mkdirSync(vendor, { recursive: true })
for (const file of ['gsap.min.js', 'ScrollTrigger.min.js', 'SplitText.min.js']) {
  copyFileSync(join(process.cwd(), 'node_modules', 'gsap', 'dist', file), join(vendor, file))
}

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

for (const file of htmlFiles(out)) {
  const html = readFileSync(file, 'utf8')
  if (!html.includes('/_next/static/')) continue

  const optimized = removeNextRuntime(html)

  if (html.includes('data-static-runtime') && !optimized.includes('data-static-runtime')) {
    throw new Error(`Static runtime was lost while optimizing ${file}`)
  }

  writeFileSync(file, optimized)
}
