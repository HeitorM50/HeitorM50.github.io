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
afterEach(() => { cleanup(); document.body.innerHTML = ''; vi.unstubAllGlobals(); vi.restoreAllMocks() })

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

describe('embedded Lab portal', () => {
  beforeEach(() => {
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: function (this: HTMLDialogElement) { this.open = true } })
    Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: function (this: HTMLDialogElement) { this.open = false } })
  })
  afterEach(() => {
    Reflect.deleteProperty(HTMLDialogElement.prototype, 'showModal')
    Reflect.deleteProperty(HTMLDialogElement.prototype, 'close')
  })
  it('enhances the native fallback and restores it on cleanup', () => {
    document.body.innerHTML = `<section><button hidden data-lab-trigger data-open-label="Open" data-close-label="Close"><span data-lab-label>Open</span></button><details class="embedded-lab"><summary>Native open</summary><div class="embedded-lab-content"><button data-lab-close>Close inside</button></div></details></section>`
    const section = document.querySelector('section')!
    const trigger = section.querySelector<HTMLButtonElement>('[data-lab-trigger]')!
    const details = section.querySelector('details')!
    const close = section.querySelector<HTMLButtonElement>('[data-lab-close]')!
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    const dispose = prepareEmbeddedLab(section)!
    const dialog = section.querySelector('dialog')!
    expect(trigger.hidden).toBe(false)
    expect(section.querySelector('summary')!.hidden).toBe(true)
    trigger.click()
    expect(dialog.open).toBe(true)
    expect(dialog.contains(close)).toBe(true)
    expect(details.querySelector('.embedded-lab-content')).toBeNull()
    expect(document.body.style.position).toBe('fixed')
    history.replaceState(null, '', '/#embedded-projects')
    close.focus()
    close.click()
    expect(dialog.open).toBe(false)
    expect(document.body.style.position).toBe('')
    expect(trigger).toHaveFocus()
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    dispose()
    expect(trigger.hidden).toBe(true)
    expect(section.querySelector('summary')!.hidden).toBe(false)
    expect(details.contains(close)).toBe(true)
    expect(section.querySelector('dialog')).toBeNull()
    const prepareAgain = prepareEmbeddedLab(section)
    expect(prepareAgain).toBeTypeOf('function')
    prepareAgain?.()
  })
  it('keeps native disclosure when modal dialogs are unavailable', () => {
    document.body.innerHTML = `<section><button hidden data-lab-trigger>Open</button><details class="embedded-lab"><summary>Open</summary><div class="embedded-lab-content">Projects</div></details></section>`
    const descriptor = Object.getOwnPropertyDescriptor(HTMLDialogElement.prototype, 'showModal')!
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { ...descriptor, value: undefined })
    try {
      const section = document.querySelector('section')!
      expect(prepareEmbeddedLab(section)).toBeUndefined()
      expect(section.querySelector('summary')!.hidden).toBe(false)
      expect(section.querySelector('dialog')).toBeNull()
    } finally { Object.defineProperty(HTMLDialogElement.prototype, 'showModal', descriptor) }
  })
})
