import ma from '@marmo/react'
import { Link } from '@unterberg/nivel'
import type { HTMLAttributes } from 'react'
import { withDocsBasePath } from '../../util/withBasePath'

const CTAButton = ma.extend(Link).variants({
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

const CTAOuter = ma.div`
  not-prose
  flex justify-center gap-x-3 xl:gap-x-3 
  mx-9 mb-10 mt-4 md:my-10
`

const CTAButtons = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <CTAOuter {...props}>
      <CTAButton
        href={withDocsBasePath('/get-started', import.meta.env.BASE_URL)}
        aria-label="Get started with Marmo by following the quick start guide and recipes"
      >
        Get started
      </CTAButton>
    </CTAOuter>
  )
}

export default CTAButtons
