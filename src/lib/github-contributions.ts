import snapshot from '@/data/github-contributions.json'

export type ContributionSnapshot = { login: string; start: string; end: string; counts: number[] }

const DAY_MS = 86400000

export const contributions: ContributionSnapshot = snapshot

/** Snapshot compacto (data inicial + contagens diárias) → lista de dias para o gráfico. */
export function expandContributions({ start, counts }: Pick<ContributionSnapshot, 'start' | 'counts'>) {
  const [year, month, day] = start.split('-').map(Number)
  const first = Date.UTC(year, month - 1, day)
  return counts.map((count, index) => ({ date: new Date(first + index * DAY_MS).toISOString().slice(0, 10), count }))
}

export function contributionTotal({ counts }: Pick<ContributionSnapshot, 'counts'>) {
  return counts.reduce((sum, count) => sum + count, 0)
}
