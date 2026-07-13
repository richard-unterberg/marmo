/** @jsxImportSource solid-js */
import { render } from '@solidjs/testing-library'

import ma from '../../src'

describe('Style capabilities (solid)', () => {
  it('supports numeric and function-valued style entries', () => {
    const Box = ma.div<{ $size: number }>`
      ${(p) => p.style({ width: (props) => props.$size, opacity: 0.5 })}
    `
    const { container } = render(() => <Box $size={24} />)

    expect(container.firstChild).toHaveStyle('width: 24px')
    expect(container.firstChild).toHaveStyle('opacity: 0.5')
  })

  it('applies styles correctly in base components', () => {
    const BaseButton = ma.button<{ $disabled?: boolean }>`
      ${(p) => (p.$disabled ? 'text-gray' : 'text-blue')}
      ${(p) => p.style({ color: p.$disabled ? 'gray' : 'blue' })}
    `

    const { container } = render(() => <BaseButton $disabled={false}>Base Button</BaseButton>)
    const button = container.firstChild as HTMLElement

    expect(button).toHaveClass('text-blue')
    expect(button).toHaveStyle('color: blue')
  })

  it('merges and overrides styles in extended components', () => {
    const BaseButton = ma.button<{ $disabled?: boolean }>`
      text-blue
      ${(p) => p.style({ color: p.$disabled ? 'gray' : 'blue' })}
    `

    const { container: baseContainer } = render(() => <BaseButton $disabled>Base Button</BaseButton>)
    const baseButton = baseContainer.firstChild as HTMLElement
    expect(baseButton).toHaveClass('text-blue')
    expect(baseButton).toHaveStyle('color: gray')

    const ExtendedButton = ma.extend(BaseButton)<{ $test?: boolean }>`
      ${(p) => p.style({ outlineColor: p.$test ? 'black' : 'red' })}
    `

    const { container: extendedContainer } = render(() => (
      <ExtendedButton $disabled $test={false}>
        Extended Button
      </ExtendedButton>
    ))
    const extendedButton = extendedContainer.firstChild as HTMLElement
    expect(extendedButton).toHaveClass('text-blue')
    expect(extendedButton).toHaveStyle('color: gray')
    expect(extendedButton).toHaveStyle('outline-color: red')
  })

  it('applies styles dynamically in variants components', () => {
    const VariantButton = ma.button.variants<{ $size: 'small' | 'large'; $disabled?: boolean }>({
      base: (p) => `
        test-class
        color-black
        ${p.style({
          border: p.$disabled ? '1px solid gray' : '1px solid blue',
          boxShadow: p.$disabled ? 'none' : '0 0 0 1px black',
        })}
      `,
      variants: {
        $size: {
          small: (p) => p.style({ fontSize: '12px' }),
          large: (p) => p.style({ fontSize: '18px' }),
        },
      },
      defaultVariants: {
        $size: 'small',
      },
    })

    const { container } = render(() => (
      <VariantButton $disabled={false} $size="large">
        Variant Button
      </VariantButton>
    ))
    const button = container.firstChild as HTMLElement

    expect(button).toHaveClass('test-class color-black')
    expect(button).toHaveStyle('border: 1px solid blue')
    expect(button).toHaveStyle('font-size: 18px')
  })

  it('does not leak variant styles between extended component instances', () => {
    const Alert = ma.div.variants<{ $isActive?: boolean }>({
      variants: {
        $isActive: {
          true: (p) => p.style({ border: '1px solid red' }),
          false: 'inactive',
        },
      },
      defaultVariants: {
        $isActive: false,
      },
    })
    const LocalAlert = ma.extend(Alert)`extended`

    const { container } = render(() => (
      <>
        <LocalAlert>Inactive first</LocalAlert>
        <LocalAlert $isActive>Active</LocalAlert>
        <LocalAlert>Inactive after active</LocalAlert>
      </>
    ))

    const [inactiveFirst, active, inactiveAfterActive] = Array.from(container.children) as HTMLElement[]

    expect(inactiveFirst).not.toHaveStyle('border: 1px solid red')
    expect(active).toHaveStyle('border: 1px solid red')
    expect(inactiveAfterActive).not.toHaveStyle('border: 1px solid red')
  })
})
