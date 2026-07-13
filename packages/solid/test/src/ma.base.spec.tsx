/** @jsxImportSource solid-js */
import { render } from '@solidjs/testing-library'
import type { JSX } from 'solid-js'

import ma from '../../src'

describe('ma base (solid)', () => {
  it('renders a ma.div with assigned classes', () => {
    const RenderDiv = ma.div`bg-red p-4`

    const { container } = render(() => <RenderDiv />)
    expect(container.firstChild).toHaveClass('bg-red p-4')
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
  })

  it('filters $-prefixed props & renders the class attribute on a ma.button', () => {
    const HiddenButton = ma.button<{ $disabled: boolean }>`
      text-blue custom ${(p) => (p.$disabled ? 'opacity-60' : '')}
    `
    const { container } = render(() => <HiddenButton aria-label="testlabel" $disabled />)

    expect(container.firstChild).not.toHaveAttribute('$disabled')
    expect(container.firstChild).toHaveClass('text-blue custom opacity-60')
    expect(container.firstChild).toHaveAttribute('aria-label')
    expect(container.firstChild).toBeInstanceOf(HTMLButtonElement)
  })

  it('allows boolean short-circuit in interpolations', () => {
    const LoadingDiv = ma.div<{ $isLoading?: boolean }>`
      base
      ${(p) => p.$isLoading && 'opacity-90 pointer-events-none'}
    `

    const { container: loadingContainer } = render(() => <LoadingDiv $isLoading />)
    expect(loadingContainer.firstChild).toHaveClass('base opacity-90 pointer-events-none')

    const { container: idleContainer } = render(() => <LoadingDiv $isLoading={false} />)
    expect(idleContainer.firstChild).toHaveClass('base')
  })

  it('can use intrinsic properties of element', () => {
    const HiddenButton = ma.button<JSX.IntrinsicElements['button']>`
      text-blue
      custom
      ${(p) => (p.type === 'button' ? 'opacity-60' : '')}
    `
    const { container } = render(() => <HiddenButton aria-label="testlabel" type="button" />)

    expect(container.firstChild).toHaveClass('text-blue custom opacity-60')
    expect(container.firstChild).toHaveAttribute('aria-label')
    expect(container.firstChild).toBeInstanceOf(HTMLButtonElement)
  })

  it('merges multiple classes using tailwind-merge', () => {
    const MergedDiv = ma.div`mt-2 mt-8 mt-1`

    const { container } = render(() => <MergedDiv />)

    expect(container.firstChild).toHaveClass('mt-1')
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
  })

  it('allows overwriting classes via incoming class attribute', () => {
    const MergedDiv = ma.div`mt-2 mt-8 mt-1`

    const { container } = render(() => <MergedDiv class="mt-10" />)

    expect(container.firstChild).toHaveClass('mt-10')
    expect(container.firstChild).toBeInstanceOf(HTMLDivElement)
  })

  it('normalizes inline style objects passed to the component', () => {
    const StyledDiv = ma.div`bg-red`

    const { container } = render(() => <StyledDiv style={{ backgroundColor: 'blue', fontSize: '14px' }} />)
    expect(container.firstChild).toHaveStyle('background-color: blue')
    expect(container.firstChild).toHaveStyle('font-size: 14px')
  })

  it('forwards ordinary custom props while filtering styling props', () => {
    const StyledDiv = ma.div<{ $tone: string; 'custom-prop': string }>`text-blue`
    const { container } = render(() => <StyledDiv $tone="quiet" custom-prop="forwarded" />)

    expect(container.firstChild).not.toHaveAttribute('$tone')
    expect(container.firstChild).toHaveAttribute('custom-prop', 'forwarded')
  })
})
