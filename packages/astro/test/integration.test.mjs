import assert from 'node:assert/strict'
import { readFile, readdir } from 'node:fs/promises'
import { test } from 'node:test'

const output = new URL('./fixtures/static/dist/', import.meta.url)
const html = await readFile(new URL('index.html', output), 'utf8')
const opening = id => {
  const element = html.match(new RegExp(`<([a-z]+)\\b[^>]*\\bid="${id}"[^>]*>`))
  assert.ok(element, `Missing element ${id}`)
  return element[0]
}

test('real Astro static build preserves attributes, escaping and the default slot', () => {
  const first = opening('first')
  assert.match(first, /^<button /)
  assert.match(first, /type="submit"/)
  assert.match(first, / disabled(?: |>|=)/)
  assert.match(first, /title="A &quot;quote&quot; &amp; &lt;tag&gt;"/)
  assert.match(first, /class="btn font-bold p-8"/)
  assert.match(html, /<strong>Default slot<\/strong>/)
  assert.match(html, /&lt;script&gt;alert\(&quot;x&quot;\)&lt;\/script&gt; &amp; text/)
  assert.match(opening('local'), /class="p-2 font-bold"/)
})

test('multiple instances have independent classes, boolean attributes, logic and styles', () => {
  assert.doesNotMatch(opening('second'), /disabled|font-bold/)
  assert.match(opening('second'), /class="btn p-2"/)
  assert.match(opening('default'), /class="btn p-2 text-sm font-normal"/)
  assert.match(opening('selected'), /class="btn shadow-lg border font-bold p-6"/)
  assert.match(opening('false'), /font-normal/)
  assert.match(opening('derived'), /title="Count: 3"/)
  assert.match(opening('derived'), /aria-label="many"/)
  assert.match(opening('derived'), /class="p-2 font-bold"/)
  assert.match(opening('derived'), /style="background-color:var\(--surface\);--count:3;width:12px;opacity:0.5;width:20px;--count:9"/)
  assert.match(opening('single'), /aria-label="one"/)
  assert.doesNotMatch(opening('single'), /font-bold/)
  assert.match(opening('single'), /--count:1;width:12px;opacity:0.5;width:30px;--count:10/)
})

test('tag switching and void HTML elements use native attributes', () => {
  assert.match(opening('link'), /^<a /)
  assert.match(opening('link'), /href="\/next\?q=1&amp;n=2"/)
  const input = opening('input')
  assert.match(input, /^<input /)
  assert.match(input, / checked(?: |>|=)/)
  assert.doesNotMatch(input, /disabled/)
  assert.match(input, /aria-hidden="false"/)
  assert.match(input, /data-active="false"/)
  assert.doesNotMatch(html, /<\/input>/)
})

test('build emits only HTML with no styling props, variants, hydration or browser JS', async () => {
  assert.doesNotMatch(html, /\$active|\$count|\$_as| size=| selected=|\$raised|className|<script|astro-island|astro-slot|astro-static-slot/)
  const files = await readdir(output, { recursive: true })
  assert.deepEqual(files, ['index.html'])
  const config = await readFile(new URL('./fixtures/static/astro.config.mjs', import.meta.url), 'utf8')
  assert.doesNotMatch(config, /react|solid|clientEntrypoint/)
  const manifest = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))
  assert.deepEqual(Object.keys(manifest.dependencies), ['tailwind-merge'])
  assert.deepEqual(Object.keys(manifest.peerDependencies), ['astro'])
})
