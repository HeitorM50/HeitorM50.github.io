import { copyFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const out = join(process.cwd(), 'out')
const nested404 = join(out, '404', 'index.html')
const pages404 = join(out, '404.html')

if (!existsSync(nested404)) throw new Error('Next.js did not generate the expected 404 page')
copyFileSync(nested404, pages404)
