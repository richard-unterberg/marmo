import { nivelTailwindVite } from '@unterberg/nivel/tailwind'
import { viteBeastiesOutputPlugin } from '@unterberg/vite-beasties-output'
import { fileURLToPath } from 'node:url'
import vike from 'vike/plugin'

process.env.VIKE_CRAWL ??= JSON.stringify({ git: false })

const base = (() => {
  const normalized = process.env.PAGES_BASE_PATH?.trim().replace(/^\/+|\/+$/g, '') ?? ''
  return normalized ? `/${normalized}/` : '/'
})()

export default {
  base,
  resolve: {
    alias: {
      '@classmatejs/react': fileURLToPath(new URL('./util/nivelMarmoCompatibility.ts', import.meta.url)),
    },
  },
  plugins: [
    nivelTailwindVite(),
    vike(),
    viteBeastiesOutputPlugin({
      outputDirectory: 'dist/client',
      beastiesOptions: {
        allowRules: [
          /data-theme=.*dark/,
          /data-theme=.*light/,
          /^:root:has\(input\.theme-controller/,
          /^:where\(:root\)$/,
          // all starting with .h-
          /^\.h-/,
          // include all with .basis-
          /^\.basis-/,
        ],
      },
    }),
  ],
}
