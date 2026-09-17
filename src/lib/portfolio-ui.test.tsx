import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { SqueezeCarousel } from '@/components/ui/carousel-squeeze'
import { prepareEmbeddedLab } from './embedded-lab'

beforeEach(() => {
  vi.stubGlobal('matchMedia', () => ({ matches: true, addEventListener() {}, removeEventListener() {} }))
  class Observer { observe() {} disconnect() {} }
  vi.stubGlobal('ResizeObserver', Observer)
  vi.stubGlobal('IntersectionObserver', Observer)
  history.replaceState(null, '', '/')
})
afterEach(() => { cleanup(); document.body.innerHTML = ''; vi.unstubAllGlobals() })

const slides = ['a', 'b', 'c'].map(id => ({ id, title: `Project ${id}`, description: id }))
const filters = [
  { id: 'selected', label: 'Selected', slideIds: ['b', 'c'] },
  { id: 'all', label: 'All', slideIds: ['a', 'b', 'c'], hash: '#archive' },
  { id: 'empty', label: 'Empty', slideIds: [] },
  { id: 'one', label: 'One', slideIds: ['c'] }
]

describe('filtered carousel controller', () => {
  it('maps noncontiguous source indices to the correct panels and callback', () => {
    const changed = vi.fn()
    render(<SqueezeCarousel slides={slides} filters={filters} onIndexChange={changed} />)
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Project b')
    expect(changed).toHaveBeenLastCalledWith(1)
    fireEvent.click(screen.getByRole('button', { name: 'Next project' }))
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Project c')
    expect(changed).toHaveBeenLastCalledWith(2)
    fireEvent.click(screen.getByRole('button', { name: 'All' }))
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Project a')
    expect(changed).toHaveBeenLastCalledWith(0)
  })

  it('disables empty filters and navigation for a single result', () => {
    render(<SqueezeCarousel slides={slides} filters={filters} />)
    expect(screen.getByRole('button', { name: 'Empty' })).toBeDisabled()
    fireEvent.click(screen.getByRole('button', { name: 'One' }))
    expect(screen.getByRole('button', { name: 'Next project' })).toBeDisabled()
    expect(screen.getByRole('button', { name: 'Previous project' })).toBeDisabled()
    fireEvent.keyDown(screen.getByRole('tab', { selected: true }), { key: 'ArrowRight' })
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Project c')
  })

  it('honors the legacy hash at initialization and on subsequent navigation', () => {
    history.replaceState(null, '', '/#archive')
    render(<SqueezeCarousel slides={slides} filters={filters} />)
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true')
    fireEvent.click(screen.getByRole('button', { name: 'Selected' }))
    window.dispatchEvent(new HashChangeEvent('hashchange'))
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Project a')
  })

  it('supports empty slide lists', () => {
    const { container } = render(<SqueezeCarousel slides={[]} filters={filters} />)
    expect(container).toBeEmptyDOMElement()
  })
})

describe('embedded Lab progressive disclosure', () => {
  it('enhances the native fallback and restores it on cleanup', () => {
    document.body.innerHTML = `<section><button hidden data-lab-trigger data-open-label="Open" data-close-label="Close"><span data-lab-label>Open</span></button><details class="embedded-lab"><summary>Native open</summary><div class="embedded-lab-content"><button data-lab-close>Close inside</button></div></details></section>`
    const section = document.querySelector('section')!
    const trigger = section.querySelector<HTMLButtonElement>('[data-lab-trigger]')!
    const details = section.querySelector('details')!
    const close = section.querySelector<HTMLButtonElement>('[data-lab-close]')!
    const dispose = prepareEmbeddedLab(section)!
    expect(trigger.hidden).toBe(false)
    expect(section.querySelector('summary')!.hidden).toBe(true)
    trigger.click()
    expect(details.open).toBe(true)
    expect(trigger).toHaveTextContent('Close')
    close.focus()
    close.click()
    expect(details.open).toBe(false)
    expect(trigger).toHaveFocus()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    dispose()
    expect(trigger.hidden).toBe(true)
    expect(section.querySelector('summary')!.hidden).toBe(false)
    const prepareAgain = prepareEmbeddedLab(section)
    expect(prepareAgain).toBeTypeOf('function')
    prepareAgain?.()
  })
})
