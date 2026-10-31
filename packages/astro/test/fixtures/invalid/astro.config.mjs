import { defineConfig } from 'astro/config'
import marmo from '@marmo/astro/integration'

export default defineConfig({ output: 'static', integrations: [marmo()] })
