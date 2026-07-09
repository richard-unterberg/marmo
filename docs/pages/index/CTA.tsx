import cm, { cmMerge } from '@classmatejs/react'
import { Link } from '@unterberg/nivel'
import type { HTMLAttributes } from 'react'

const MyLink = cm.extend(Link).variants({
  base: 'btn btn-primary sm:btn-lg',
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

const CTAButtons = (props: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cmMerge('flex justify-center gap-x-3 sm:gap-x-5 mx-9 not-prose mb-10 mt-4 md:my-10', props.className)}
      {...props}
    >
      <MyLink href={`getting-started`} aria-label="Get started with telefunc by following the quick start guide">
        Get started
      </MyLink>
      <MyLink href={`/concepts`} aria-label="Learn more about the concepts behind telefunc" type="secondary">
        Learn more
      </MyLink>
    </div>
  )
}

export default CTAButtons
