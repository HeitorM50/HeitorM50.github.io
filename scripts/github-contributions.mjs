import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync } from 'node:fs'

// Atualiza o snapshot do calendário de contribuições do GitHub usado na home.
// Sem token ou sem rede, mantém o snapshot versionado e o build segue.
const login = 'HeitorM50'
const target = new URL('../src/data/github-contributions.json', import.meta.url)

function token() {
  const fromEnv = process.env.CONTRIBUTIONS_TOKEN || process.env.GITHUB_TOKEN || process.env.GH_TOKEN
  if (fromEnv) return fromEnv
  try { return execFileSync('gh', ['auth', 'token'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim() } catch { return '' }
}

const query = `query($login: String!) {
  user(login: $login) { contributionsCollection { contributionCalendar { weeks { contributionDays { date contributionCount } } } } }
}`

async function main() {
  const auth = token()
  if (!auth) return console.warn('[github-contributions] sem token; mantendo o snapshot atual.')
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { authorization: `bearer ${auth}`, 'content-type': 'application/json', 'user-agent': 'heitorm50-portfolio' },
    body: JSON.stringify({ query, variables: { login } }),
    signal: AbortSignal.timeout(15000)
  })
  const body = await response.json()
  const weeks = body?.data?.user?.contributionsCollection?.contributionCalendar?.weeks
  if (!response.ok || !Array.isArray(weeks)) throw new Error(`resposta inesperada (${response.status}): ${JSON.stringify(body?.errors ?? body).slice(0, 200)}`)

  const days = weeks.flatMap(week => week.contributionDays)
  const snapshot = { login, start: days[0].date, end: days.at(-1).date, counts: days.map(day => day.contributionCount) }
  const current = JSON.parse(readFileSync(target, 'utf8'))
  if (JSON.stringify(current) === JSON.stringify(snapshot)) return console.log('[github-contributions] snapshot já atualizado.')
  writeFileSync(target, `${JSON.stringify(snapshot)}\n`)
  console.log(`[github-contributions] ${snapshot.counts.reduce((a, b) => a + b, 0)} contribuições de ${snapshot.start} a ${snapshot.end}.`)
}

main().catch(error => console.warn(`[github-contributions] falhou; mantendo o snapshot atual. ${error.message}`))
