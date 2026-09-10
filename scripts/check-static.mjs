import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, extname, join, normalize } from 'node:path'

const root = join(process.cwd(), 'out')
const required = [
  'index.html', 'en/index.html', 'projetos/hindsight/index.html',
  'en/projects/hindsight/index.html', 'unb-prazos/index.html',
  'omarchy-gcal/index.html', 'cv.pdf', '404.html', 'robots.txt', 'sitemap.xml',
  'media/logo-metal-mask.svg', 'media/logo-metal-depth.png', 'media/logo-metallic.svg',
  'media/logo-metallic.png', 'vendor/metallic-paint.js', 'vendor/gsap.min.js',
  'vendor/ScrollTrigger.min.js', 'vendor/SplitText.min.js', 'vendor/profile-card.css'
]
const forbidden = ['media/scroll-reveal.mp4', 'media/logo.webp', 'media/logo.avif']

const htmlFiles = []
function walk(directory) {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name)
    if (statSync(path).isDirectory()) walk(path)
    else if (path.endsWith('.html')) htmlFiles.push(path)
  }
}

const failures = []
for (const path of required) if (!existsSync(join(root, path))) failures.push(`missing required output: ${path}`)
for (const path of forbidden) if (existsSync(join(root, path))) failures.push(`unexpected obsolete output: ${path}`)
walk(root)

for (const htmlPath of htmlFiles) {
  const html = readFileSync(htmlPath, 'utf8')
  if (/\{\{[^}]+\}\}/.test(html)) failures.push(`unresolved template in ${htmlPath}`)
  if (/cdn\.simpleicons\.org|unpkg\.com/.test(html)) failures.push(`unexpected runtime CDN in ${htmlPath}`)
  if (html.includes('/_next/static/css/')) {
    if (html.includes('/_next/static/chunks/')) failures.push(`unexpected Next.js runtime in ${htmlPath}`)
    if (html.includes('self.__next_f')) failures.push(`unexpected React flight payload in ${htmlPath}`)
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1]
    if (/^(?:https?:|mailto:|data:|#)/.test(value)) continue
    const clean = decodeURIComponent(value.split(/[?#]/)[0])
    if (!clean) continue
    let target = clean.startsWith('/') ? join(root, clean) : normalize(join(dirname(htmlPath), clean))
    if (clean.endsWith('/') || !extname(clean)) target = join(target, 'index.html')
    if (!existsSync(target)) failures.push(`broken local reference in ${htmlPath}: ${value}`)
  }
}

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`Validated ${htmlFiles.length} HTML files and ${required.length} required outputs.`)
