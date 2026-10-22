import { describe, expect, it } from 'vitest'
import { contributions, contributionTotal, expandContributions } from './github-contributions'
import { buildGrid, computeStats, dayMs } from '@/components/ui/contribution-skyline'

describe('github contributions', () => {
  it('expands the compact snapshot into consecutive days', () => {
    expect(expandContributions({ start: '2026-02-27', counts: [1, 0, 3] })).toEqual([
      { date: '2026-02-27', count: 1 }, { date: '2026-02-28', count: 0 }, { date: '2026-03-01', count: 3 }
    ])
  })

  it('keeps the versioned snapshot consistent with its period', () => {
    const days = expandContributions(contributions)
    expect(days[0].date).toBe(contributions.start)
    expect(days.at(-1)?.date).toBe(contributions.end)
    expect(contributions.counts.every(count => Number.isInteger(count) && count >= 0)).toBe(true)
  })

  it('feeds the skyline with the same total shown in the static summary', () => {
    const grid = buildGrid(expandContributions(contributions), dayMs(contributions.end))
    const inGrid = new Set(grid.cells.map(cell => cell.date))
    const expected = expandContributions(contributions).filter(day => inGrid.has(day.date)).reduce((sum, day) => sum + day.count, 0)
    expect(computeStats(grid.cells).total).toBe(expected)
    expect(expected).toBeLessThanOrEqual(contributionTotal(contributions))
  })
})
