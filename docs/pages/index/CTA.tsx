import cm from '@classmatejs/react'
import { Link } from '@unterberg/nivel'
import type { HTMLAttributes } from 'react'

const CTAButton = cm.extend(Link).variants({
  base: 'btn btn-primary sm:btn-lg min-w-50',
  variants: {
    type: {
      primary: 'btn-primary',
      secondary: 'btn-outline btn-primary bg-transparent',
    },
  },
  defaultVariants: {
    type: 'primary',
  },
})

const CTAOuter = cm.div`
  not-prose
  flex justify-center gap-x-3 xl:gap-x-3 
  mx-9 mb-10 mt-4 md:my-10
`

const CTAButtons = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <CTAOuter {...props}>
      <CTAButton href="/get-started" aria-label="Get started with marmo by following the quick start guide and recipes">
        Get started
      </CTAButton>
      <CTAButton href="/concepts" aria-label="Learn more about the real world examples" type="secondary">
        See case studies
      </CTAButton>
    </CTAOuter>
  )
}

export default CTAButtons
