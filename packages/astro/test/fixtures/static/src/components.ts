import ma from '@marmo/astro'

export const Button = ma.button<{ $active?: boolean }>`
  btn p-2 ${p => p.$active && 'font-bold'}
  ${false} ${null} ${undefined} ${0} ${() => true}
`

export const Choice = ma.button.variants<
  { $raised?: boolean },
  { size?: 'sm' | 'lg'; selected?: boolean }
>({
  base: p => `btn p-1 ${p.$raised ? 'shadow-lg' : ''}`,
  variants: {
    size: { sm: 'p-2 text-sm', lg: p => `p-4 ${p.$raised ? 'border' : ''}` },
    selected: { true: 'font-bold', false: 'font-normal' },
  },
  defaultVariants: { size: 'sm', selected: false },
})

export const Derived = ma.div
  .logic<{ $count: number; $active?: boolean }>(p => ({ $active: p.$count > 1, title: `Count: ${p.$count}` }))
  .logic(p => ({ 'aria-label': p.$active ? 'many' : 'one' }))`
    p-2 ${p => p.$active && 'font-bold'}
    ${p => p.style({ backgroundColor: 'var(--surface)', '--count': q => q.$count, width: '12px', opacity: 0.5 })}
  `

export const Input = ma.input`p-2`
