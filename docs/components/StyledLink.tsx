import ma from '@marmo/react'
import { Link } from '@unterberg/nivel'

const _MyLink = ma.extend(Link).variants({
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
