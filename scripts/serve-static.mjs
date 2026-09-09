import { createServer } from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'

const root = join(process.cwd(), 'out')
const port = Number(process.env.PORT || 4173)
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2', '.xml': 'application/xml', '.pdf': 'application/pdf' }

createServer((request, response) => {
  const requestPath = decodeURIComponent((request.url || '/').split('?')[0])
  let filePath = normalize(join(root, requestPath))
  if (!filePath.startsWith(root)) {
    response.writeHead(403).end('Forbidden')
    return
  }
  if (existsSync(filePath) && statSync(filePath).isDirectory()) filePath = join(filePath, 'index.html')
  const found = existsSync(filePath)
  if (!found) filePath = join(root, '404.html')
  response.writeHead(found ? 200 : 404, { 'Content-Type': types[extname(filePath)] || 'application/octet-stream' })
  createReadStream(filePath).pipe(response)
}).listen(port, '127.0.0.1', () => console.log(`Static portfolio at http://127.0.0.1:${port}`))
