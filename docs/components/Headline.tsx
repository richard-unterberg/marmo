import ma from '@marmo/react'
import type { HTMLAttributes } from 'react'

type HeadlineElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p'

const StyledHeadline = ma.h1.variants<object, { $variant: HeadlineElement }>({
  variants: {
    $variant: {
      h1: 'text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight',
      h2: 'text-2xl sm:text-3xl lg:text-4xl font-bold',
      h3: 'text-xl md:text-2xl lg:text-3xl font-bold',
      h4: 'text-lg md:text-xl lg:text-2xl font-bold',
      h5: 'md:text-lg lg:text-xl font-bold',
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
