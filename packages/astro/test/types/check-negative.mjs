import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { stripVTControlCharacters } from 'node:util'

const cli = fileURLToPath(new URL('bin/astro.mjs', import.meta.resolve('astro/package.json')))
const root = fileURLToPath(new URL('../fixtures/invalid/', import.meta.url))
const result = spawnSync(process.execPath, [cli, 'check', '--root', root], { encoding: 'utf8', env: { ...process.env, NO_COLOR: '1' } })
const output = stripVTControlCharacters(result.stdout + result.stderr)
assert.equal(result.status, 1, output)
const source = readFileSync(new URL('../fixtures/invalid/src/pages/index.astro', import.meta.url), 'utf8')
const markers = ['invalid-native', 'invalid-custom', 'missing-custom', 'invalid-variant', 'invalid-boolean', 'invalid-attribute', 'invalid-target']
for (const marker of markers) {
  const line = source.split('\n').findIndex(text => text.includes(`<!-- ${marker} -->`)) + 1
  assert.ok(line > 0)
  assert.match(output, new RegExp(`index\\.astro:${line}:\\d+[^\\n]*error`), `Expected Astro diagnostic for ${marker}:\n${output}`)
}
assert.match(output, /7 errors/, output)
console.log('Astro rejected all 7 invalid native, styling, variant and target prop cases.')
