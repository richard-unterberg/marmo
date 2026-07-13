/** @jsxImportSource solid-js */
import { fireEvent, render } from '@solidjs/testing-library'
import { createSignal } from 'solid-js'

import ma from '../../src'

describe('ma.transform (solid)', () => {
  it('renders a marmo component as another element with $_as', () => {
    const MyButton = ma.button<{ $toggleCta?: boolean }>`
      absolute
      min-w-300
      ${({ $toggleCta }) => ($toggleCta ? 'bg-red-500' : 'bg-blue-500')}
    `

    const { container } = render(() => <MyButton $_as="span" $toggleCta />)

    expect(container.firstChild).toBeInstanceOf(HTMLSpanElement)
    expect(container.firstChild).toHaveClass('absolute min-w-300 bg-red-500')
    expect(container.firstChild).not.toHaveAttribute('$_as')
    expect(container.firstChild).not.toHaveAttribute('$toggleCta')
  })

  it('reacts to $_as changes and replaces the underlying element', async () => {
    const Alert = ma.div<{ $active?: boolean }>`
      base-class
      ${({ $active }) => $active && 'active-class'}
    `
    const Example = () => {
      const [inline, setInline] = createSignal(false)

      return (
        <>
          <button type="button" onClick={() => setInline((value) => !value)}>
            Toggle
          </button>
          <Alert data-testid="alert" $_as={inline() ? 'span' : 'div'} $active />
        </>
      )
    }

    const { getByRole, getByTestId } = render(() => <Example />)
    const initialElement = getByTestId('alert')

    expect(initialElement).toBeInstanceOf(HTMLDivElement)
    expect(initialElement).toHaveClass('base-class active-class')

    await fireEvent.click(getByRole('button', { name: 'Toggle' }))

    const updatedElement = getByTestId('alert')
    expect(updatedElement).toBeInstanceOf(HTMLSpanElement)
    expect(updatedElement).not.toBe(initialElement)
    expect(updatedElement).toHaveClass('base-class active-class')
    expect(updatedElement).not.toHaveAttribute('$_as')
    expect(updatedElement).not.toHaveAttribute('$active')
  })

  it('transforms a marmo component with the builder API', () => {
    const MyButton = ma.button<{ $toggleCta?: boolean }>`
      absolute
      min-w-300
      ${({ $toggleCta }) => ($toggleCta ? 'bg-red-500' : 'bg-blue-500')}
    `

    const TransformButtonElement = ma.transform(MyButton).span
    const { container } = render(() => <TransformButtonElement $toggleCta />)

    expect(container.firstChild).toBeInstanceOf(HTMLSpanElement)
    expect(container.firstChild).toHaveClass('absolute min-w-300 bg-red-500')
    expect(container.firstChild).not.toHaveAttribute('$toggleCta')
  })

  it('adds classes to the transformed component and merges conflicts', () => {
    const MyButton = ma.button<{ $toggleCta?: boolean }>`
      absolute
      min-w-300
      text-sm
      ${({ $toggleCta }) => ($toggleCta ? 'bg-red-500' : 'bg-blue-500')}
    `

    const TransformButtonAddClasses = ma.transform(MyButton).span`
      text-lg
      tracking-wide
    `
    const { container } = render(() => (
      <TransformButtonAddClasses $toggleCta class="tracking-tight">
        Transform
      </TransformButtonAddClasses>
    ))

    expect(container.firstChild).toBeInstanceOf(HTMLSpanElement)
    expect(container.firstChild).toHaveClass('absolute min-w-300 bg-red-500 text-lg tracking-tight')
    expect(container.firstChild).not.toHaveClass('text-sm')
    expect(container.firstChild).not.toHaveClass('tracking-wide')
  })

  it('transforms an already transformed component', () => {
    const MyButton = ma.button<{ $toggleCta?: boolean }>`
      absolute
      min-w-300
      ${({ $toggleCta }) => ($toggleCta ? 'bg-red-500' : 'bg-blue-500')}
    `

    const TransformButtonElement = ma.transform(MyButton).span
    const TransformButtonAgain = ma.transform(TransformButtonElement).p
    const { container } = render(() => <TransformButtonAgain $toggleCta />)

    expect(container.firstChild).toBeInstanceOf(HTMLParagraphElement)
    expect(container.firstChild).toHaveClass('absolute min-w-300 bg-red-500')
  })

  it('transforms variants and preserves variant prop filtering', () => {
    const VariantDiv = ma.div.variants<{ $isActive?: boolean }, { $size: 'sm' | 'md' }>({
      base: ({ $isActive }) => `absolute min-w-300 ${$isActive ? 'opacity-100' : 'opacity-50'}`,
      variants: {
        $size: {
          sm: 'w-10 h-10',
          md: 'w-20 h-20',
        },
      },
      defaultVariants: {
        $size: 'md',
      },
    })

    const TransformVariantDiv = ma.transform(VariantDiv).main`
      text-neutral
      tracking-wide
    `
    const { container } = render(() => (
      <TransformVariantDiv $isActive $size="sm" aria-label="Main content">
        Content
      </TransformVariantDiv>
    ))

    expect(container.firstChild).toBeInstanceOf(HTMLElement)
    expect(container.firstChild?.nodeName.toLowerCase()).toBe('main')
    expect(container.firstChild).toHaveClass('absolute min-w-300 opacity-100 w-10 h-10 text-neutral tracking-wide')
    expect(container.firstChild).toHaveAttribute('aria-label', 'Main content')
    expect(container.firstChild).not.toHaveAttribute('$size')
    expect(container.firstChild).not.toHaveAttribute('$isActive')
  })

  it('transforms extended marmo components', () => {
    const BaseButton = ma.button<{ $isActive?: boolean }>`
      text-lg
      mt-5
      ${({ $isActive }) => ($isActive ? 'bg-blue-500' : 'bg-slate-500')}
    `

    const Container = ma.extend(BaseButton)`
      py-2
      px-5
      min-h-24
    `

    const TransformContainer = ma.transform(Container).span`
      text-neutral
      tracking-wide
    `
    const { container } = render(() => <TransformContainer $isActive />)

    expect(container.firstChild).toBeInstanceOf(HTMLSpanElement)
    expect(container.firstChild).toHaveClass('text-lg mt-5 bg-blue-500 py-2 px-5 min-h-24 text-neutral tracking-wide')
  })

  it('rejects regular components at runtime', () => {
    const MyComponent = () => <div>hello</div>

    expect(() => ma.transform(MyComponent as any).span).toThrow('ma.transform')
  })
})
