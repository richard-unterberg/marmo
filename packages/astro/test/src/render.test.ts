import assert from 'node:assert/strict'
import { test } from 'node:test'
import ma from '../../src/index.js'
import renderer from '../../src/server.js'

// Invoke the documented renderer contract without depending on Astro internals.
const render = async (component: any, props: any = {}, slots: Record<string, string> = {}) =>
  (await renderer.renderToStaticMarkup.call({} as any, component, props, slots)).html

test('templates evaluate once per render and ignore all non-string interpolation results', async () => {
  let calls = 0
  const Box = ma.div<{ $bold?: boolean }>`
    p-2 ${'rounded'} ${false} ${true} ${null} ${undefined} ${0} ${42}
    ${p => { calls++; return p.$bold && 'font-bold' }}
    ${() => 5} ${() => null} ${() => undefined} ${() => true}
  `
  assert.equal(await render(Box, { $bold: true, class: 'p-8', title: 'ok' }, { default: '<b>slot</b>' }), '<div title="ok" class="rounded font-bold p-8"><b>slot</b></div>')
  assert.equal(calls, 1)
  assert.equal(await render(Box), '<div class="p-2 rounded"></div>')
  assert.equal(calls, 2)
})

test('variants select defaults, false and functional entries without forwarding registered names', async () => {
  let calls = 0
  const Choice = ma.button.variants<{ $border?: boolean }, { size?: 'sm' | 'lg'; active?: boolean }>({
    base: p => p.$border ? 'btn border p-1' : 'btn p-1',
    variants: {
      size: { sm: 'p-2', lg: p => { calls++; return p.$border && 'p-4' } },
      active: { true: 'font-bold', false: 'font-normal' },
    },
    defaultVariants: { size: 'sm', active: true },
  })
  assert.equal(await render(Choice), '<button class="btn p-2 font-bold"></button>')
  assert.equal(await render(Choice, { size: 'lg', active: false, $border: true, class: 'p-8' }), '<button class="btn border font-normal p-8"></button>')
  assert.equal(calls, 1)
  assert.equal(await render(Choice, { size: 'toString', active: false }), '<button class="btn p-1 font-normal"></button>')
})

test('logic chains run before variants and styles, override incoming props, and isolate instances/builders', async () => {
  let calls = 0
  const builder = ma.div.logic<{ $count: number; $bold?: boolean }>(p => {
    calls++
    return { $bold: p.$count > 1, title: String(p.$count) }
  }).logic(p => ({ 'aria-label': p.$bold ? 'many' : 'one' }))
  const Box = builder`p-2 ${p => p.$bold && 'font-bold'} ${p => p.style({ '--count': q => q.$count })}`
  const props = { $count: 2, title: 'incoming' }
  assert.equal(await render(Box, props), '<div title="2" aria-label="many" class="p-2 font-bold" style="--count:2"></div>')
  assert.equal(props.title, 'incoming')
  assert.equal(await render(Box, { $count: 1 }), '<div title="1" aria-label="one" class="p-2" style="--count:1"></div>')
  assert.equal(calls, 2)
  assert.equal(await render(ma.div``), '<div class=""></div>')
  const Variant = ma.button.logic<{ active?: boolean }>(() => ({ active: false })).variants<{ active?: boolean }>({
    variants: { active: { true: 'font-bold', false: 'font-normal' } },
    defaultVariants: { active: true },
  })
  assert.equal(await render(Variant, { active: true }), '<button class="font-normal"></button>')
})

test('style calls combine in order; values resolve against final props; consumer CSS wins by declaration order', async () => {
  let calls = 0
  const Box = ma.div<{ $width: number }>`
    ${p => { calls++; return p.style({ width: q => `${q.$width}px`, opacity: 0.5, '--n': 2, marginTop: null }) }}
    ${p => p.style({ opacity: 1, lineHeight: 1.2 })}
  `
  assert.equal(await render(Box, { $width: 10, style: { width: '20px', '--n': 3 } }), '<div class="" style="width:10px;opacity:1;--n:2;line-height:1.2;width:20px;--n:3"></div>')
  assert.equal(calls, 1)
  assert.equal(await render(Box, { $width: 5, style: 'width:30px' }), '<div class="" style="width:5px;opacity:1;--n:2;line-height:1.2;width:30px"></div>')
  const Variant = ma.div.variants<{ active?: boolean }>({
    base: p => p.style({ '--n': 1 }),
    variants: { active: { true: p => p.style({ '--n': 2 }) } },
  })
  assert.equal(await render(Variant, { active: true }), '<div class="" style="--n:2"></div>')
})

test('renderer scopes, escaping, HTML boolean/enumerated attributes, void tags and $_as', async () => {
  const Button = ma.button`btn`
  assert.equal(await renderer.check.call({} as any, Button, {}, {}), true)
  assert.equal(await renderer.check.call({} as any, () => null, {}, {}), false)
  assert.equal(await render(Button, { $_as: 'a', href: '/?a=1&b="<x>"', draggable: false }, { default: '<em>ready</em>' }), '<a href="/?a=1&amp;b=&quot;&lt;x&gt;&quot;" draggable="false" class="btn"><em>ready</em></a>')
  assert.equal(await render(ma.input``, { checked: true, disabled: false, value: 0, title: null, 'aria-hidden': false, 'data-ok': true }), '<input checked value="0" aria-hidden="false" data-ok="true" class="">')
  assert.equal(await render(ma.a``, { download: true }), '<a download class=""></a>')
  assert.equal(await render(ma.a``, { download: 'file.txt' }), '<a download="file.txt" class=""></a>')
  assert.equal(await render(ma.a``, { download: false }), '<a class=""></a>')
})

test('inline styles normalize vendor prefixes, preserve custom properties and escape attribute values', async () => {
  const Box = ma.div`${p => p.style({ msTransition: 'all 1s', WebkitLineClamp: 2, '--MixedCase': '"<&', '--absent': () => null })}`
  assert.equal(await render(Box), '<div class="" style="-ms-transition:all 1s;-webkit-line-clamp:2;--MixedCase:&quot;&lt;&amp;"></div>')
})

test('unsupported uses fail explicitly', async () => {
  const Box = ma.div``
  await assert.rejects(render(Box, { $_as: 'script' }), /Unsupported.*tag/)
  await assert.rejects(render(Box, { 'x" onclick': 'bad' }), /Invalid HTML attribute/)
  await assert.rejects(render(Box, { onclick: () => {} }), /must be a scalar/)
  await assert.rejects(render(Box, { title: ['array'] }), /must be a scalar/)
  await assert.rejects(render(Box, {}, { header: '<h1>named</h1>' }), /default slot/)
  await assert.rejects(renderer.renderToStaticMarkup.call({} as any, Box, {}, {}, { hydrate: 'load' } as any), /static HTML only/)
  const Async = ma.div.logic((async () => ({ title: 'later' })) as any)``
  await assert.rejects(render(Async), /synchronous/)
})
