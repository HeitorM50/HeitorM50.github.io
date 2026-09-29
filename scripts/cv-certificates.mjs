import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { transformSync } from 'esbuild'

// Use the site's typed catalogue without requiring TypeScript support in Node.
const source = readFileSync(new URL('../src/data/certificates.ts', import.meta.url), 'utf8')
const { code } = transformSync(source, { loader: 'ts', format: 'esm' })
const { certificates, certificateCategories } = await import(`data:text/javascript;base64,${Buffer.from(code).toString('base64')}`)

export function escapeTex(value) {
  const substitutions = { '\\': '\\textbackslash{}', '&': '\\&', '%': '\\%', '$': '\\$', '#': '\\#', '_': '\\_', '{': '\\{', '}': '\\}', '~': '\\textasciitilde{}', '^': '\\textasciicircum{}', '–': '--' }
  return value.replace(/[\\&%$#_{}~^–]/g, char => substitutions[char])
}

export function renderCertificatesTex() {
  const groups = certificateCategories.map(category => {
    const entries = certificates.filter(item => item.category === category.id).map(item => {
      const title = escapeTex(item.title.pt)
      const linkedTitle = item.document ? `\\href{https://heitorm50.github.io${item.document}}{${title}}` : title
      const metadata = [item.issuer, item.date?.pt, item.hours && `${item.hours} h`].filter(Boolean).map(escapeTex).join(', ')
      return `${linkedTitle} (${metadata})`
    })
    return `\\item \\textbf{${escapeTex(category.label.pt)}}: ${entries.join('; ')}.`
  })
  return `\\section{Certificados e atividades}\n\\begin{itemize}\n${groups.join('\n')}\n\\end{itemize}\n`
}

if (process.argv[1] === fileURLToPath(import.meta.url)) process.stdout.write(renderCertificatesTex())
