import ma from '@marmo/react'
import { withDocsBasePath } from '../util/withBasePath'

type LogoProps = {
  $size?: 'sm' | 'md' | 'lg'
}

const StyledLogo = ma.span.variants<LogoProps>({
  base: ({ style }) => `
    block mx-auto
    bg-contain bg-center bg-no-repeat
    bg-[image:var(--background-image-light)] 
    dark:bg-[image:var(--background-image-dark)]
    ${style({
      '--background-image-light': `url("${withDocsBasePath('/marmo-dark.svg', import.meta.env.BASE_URL)}")`,
      '--background-image-dark': `url("${withDocsBasePath('/marmo-light.svg', import.meta.env.BASE_URL)}")`,
    })}
  `,
  variants: {
    $size: {
      sm: 'size-8',
      md: 'size-10',
      lg: 'size-12',
    },
  },
  defaultVariants: {
    $size: 'md',
  },
})

const MarmoLogo = ({ $size }: LogoProps) => <StyledLogo $size={$size} role="img" aria-label="Marmo logo" />

export default MarmoLogo
