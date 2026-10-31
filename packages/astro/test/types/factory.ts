import ma from '../../src/index.js'

const Button = ma.button<{ $active: boolean }>`btn ${p => p.$active && 'font-bold'} ${p => p.disabled && 'opacity-50'}`
Button({ $active: true, type: 'submit', disabled: true, class: 'p-4' })
Button({ $_as: 'a', $active: false, href: '/next' })
// @ts-expect-error custom styling prop is required
Button({ type: 'button' })
// @ts-expect-error invalid native button type
Button({ $active: true, type: 'other' })
// @ts-expect-error anchor-only attribute on a button
Button({ $active: true, href: '/next' })
// @ts-expect-error custom styling prop type
Button({ $active: 'yes' })
// @ts-expect-error target attributes follow $_as
Button({ $_as: 'div', $active: true, href: '/' })
// @ts-expect-error raw-text tags are outside the prototype
Button({ $_as: 'script', $active: true })
// @ts-expect-error event callbacks are outside the static contract
Button({ $active: true, onclick: () => {} })

const Choice = ma.button.variants<{ $raised?: boolean }, { size?: 'sm' | 'lg'; active?: boolean }>({
  base: p => p.$raised && 'shadow-lg',
  variants: { size: { sm: 'p-2', lg: p => p.$raised && 'p-4' }, active: { true: 'font-bold', false: 'font-normal' } },
  defaultVariants: { size: 'sm', active: false },
})
Choice({ size: 'lg', active: true, type: 'submit' })
Choice({})
// @ts-expect-error invalid variant selection
Choice({ size: 'xl' })
// @ts-expect-error boolean variant must be a boolean
Choice({ active: 'true' })
ma.button.variants<{ size?: 'sm' | 'lg' }>({ variants: { size: { sm: 'p-2' } }, defaultVariants: {
  // @ts-expect-error invalid default selection
  size: 'xl',
} })
ma.button.variants<{ size?: 'sm' | 'lg' }>({ variants: { size: {
  // @ts-expect-error invalid option key
  xl: 'p-2',
} } })

const Derived = ma.div.logic<{ $count: number }>(p => ({ title: String(p.$count) }))`
  ${p => p.style({ '--count': q => q.$count, width: '12px' })}
`
Derived({ $count: 3, style: { width: '20px' } })
// @ts-expect-error logic props are retained in the completed component
Derived({})
// @ts-expect-error only supported HTML factories exist
ma.svg``
// @ts-expect-error extend is intentionally deferred
ma.extend(Button)
