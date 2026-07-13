import ma from '@marmo/react'
import type { HTMLAttributes } from 'react'

type HeadlineElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'

const StyledHeadline = ma.h1.variants<object, { $variant: HeadlineElement }>({
  variants: {
    $variant: {
      h1: 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-base-content',
      h2: 'text-2xl font-semibold md:text-3xl xl:text-4xl',
      h3: 'text-xl font-semibold md:text-2xl xl:text-3xl',
      h4: 'text-lg font-semibold xl:text-xl',
      h5: 'text-lg font-semibold',
      h6: 'text-base font-semibold',
      p: 'text-base',
    },
  },
})

interface HeadlineProps extends HTMLAttributes<HTMLElement> {
  as?: HeadlineElement
  variant?: HeadlineElement
}

const Headline = ({ as = 'h1', variant = as, ...props }: HeadlineProps) => (
  <StyledHeadline $_as={as} $variant={variant} {...props} />
)

export default Headline
