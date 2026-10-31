import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { test } from 'node:test'

const routes = [
  '',
  'get-started/',
  'base-composition/',
  'variants/',
  'extend/',
  'transform/',
  'style/',
  'logic/',
  'use-marmo-create-marmo/',
  'api-reference/',
]

const readPage = route => readFile(new URL(`../dist/client/${route}index.html`, import.meta.url), 'utf8')
const choiceSelects = html => [...html.matchAll(/<select\b[^>]*name="choicesFor-([^"]+)"[^>]*>([\s\S]*?)<\/select>/g)]
const options = select => [...select.matchAll(/<option\b[^>]*value="([^"]+)"/g)].map(match => match[1])

for (const route of routes) {
  test(`${route || '/'} offers Astro in the shared framework selector`, async () => {
    const html = await readPage(route)
    const frameworkSelects = choiceSelects(html).filter(select => select[1] === 'custom:react|solidjs|astro')

    // Mixing TSX and Astro fences can silently split their framework groups.
    // Assert against the built page so an isolated Astro block cannot pass.
    assert.ok(frameworkSelects.length > 0, 'Missing combined React/Solid/Astro selector')
    for (const select of frameworkSelects) {
      assert.deepEqual(options(select[2]), ['react', 'solidjs', 'astro'])
    }
    // Nivel renders only the active example during SSR; Astro is selected
    // from the same group after hydration, rather than emitted as a sibling.
    assert.ok(html.includes('@marmo/react'), 'Missing initial React package example')
    assert.ok(
      choiceSelects(html).some(select => select[1] === 'codeLang' && options(select[2]).includes('TypeScript')),
      'Existing JavaScript/TypeScript choices must remain available',
    )
  })
}
