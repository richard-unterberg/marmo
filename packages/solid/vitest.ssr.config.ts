import path from 'node:path'
import { fileURLToPath } from 'node:url'

import solidPlugin from 'vite-plugin-solid'
import { defineConfig } from 'vitest/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const solidServerRenderer = path.resolve(__dirname, '..', '..', 'node_modules', 'solid-js', 'web', 'dist', 'server.js')

export default defineConfig({
  plugins: [solidPlugin()],
  test: {
    environment: 'node',
    include: ['test/src/**/*.ssr.spec.ts', 'test/src/**/*.ssr.spec.tsx'],
    globals: true,
  },
  resolve: {
    alias: [
      {
        find: /^solid-js\/web$/,
        replacement: solidServerRenderer,
      },
    ],
  },
})
