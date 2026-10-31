import type { AstroIntegration } from 'astro'

const marmo = (): AstroIntegration => ({
  name: '@marmo/astro',
  hooks: {
    'astro:config:setup': ({ addRenderer }) => {
      addRenderer({ name: '@marmo/astro', serverEntrypoint: '@marmo/astro/server' })
    },
  },
})

export default marmo
