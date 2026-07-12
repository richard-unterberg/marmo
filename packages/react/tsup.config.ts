import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: {
    compilerOptions: {
      ignoreDeprecations: '6.0',
    },
  },
  clean: true,
  minify: true,
  sourcemap: false,
  splitting: false,
  target: 'es2018',
  external: ['react', 'tailwind-merge'],
  outDir: 'dist',
  tsconfig: './tsconfig.json',
  outExtension({ format }) {
    return { js: format === 'cjs' ? '.cjs.js' : '.js' }
  },
  esbuildOptions(options, context) {
    options.charset = 'utf8'
    if (!options.footer) {
      options.footer = {}
    }
    if (context.format === 'cjs') {
      options.footer.js = `
if (module && module.exports && module.exports.default) {
  const __maExports = module.exports
  const __maDefault = __maExports.default
  if (__maDefault && (typeof __maDefault === "object" || typeof __maDefault === "function")) {
    Object.assign(__maDefault, __maExports)
    module.exports = __maDefault
    module.exports.default = module.exports
  }
}
`.trim()
    }
  },
})
