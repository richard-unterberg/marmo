import type { NamedSSRLoadedRendererValue } from 'astro'
import type { HtmlTag } from './tags.js'
import type { MaComponent } from './types.js'

const booleanAttributes = new Set([
  'allowfullscreen',
  'async',
  'autofocus',
  'autoplay',
  'checked',
  'controls',
  'default',
  'defer',
  'disabled',
  'download',
  'capture',
  'formnovalidate',
  'hidden',
  'inert',
  'ismap',
  'itemscope',
  'loop',
  'multiple',
  'muted',
  'nomodule',
  'novalidate',
  'open',
  'playsinline',
  'readonly',
  'required',
  'reversed',
  'selected',
])
const voidElements = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'source',
  'track',
  'wbr',
])
const escapeAttribute = (value: unknown) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const isMarmoComponent = (value: unknown): value is MaComponent<HtmlTag> =>
  typeof value === 'function' && '__marmoAstro' in value && value.__marmoAstro === true

const serializeAttributes = (attributes: Record<string, unknown>) =>
  Object.entries(attributes)
    .map(([name, value]) => {
      if (!/^[a-zA-Z_:][a-zA-Z0-9_.:-]*$/.test(name)) throw new TypeError(`Invalid HTML attribute: ${name}`)
      if (value == null) return ''
      if (typeof value === 'function' || typeof value === 'object')
        throw new TypeError(`Marmo Astro attribute ${name} must be a scalar`)
      if (booleanAttributes.has(name.toLowerCase()) && typeof value === 'boolean') return value ? ` ${name}` : ''
      return ` ${name}="${escapeAttribute(value)}"`
    })
    .join('')

const renderer: NamedSSRLoadedRendererValue = {
  name: '@marmo/astro',
  check: async (component) => isMarmoComponent(component),
  renderToStaticMarkup: async (component, props, slots, metadata) => {
    if (!isMarmoComponent(component)) throw new TypeError('Expected a Marmo Astro component')
    if (metadata?.hydrate) throw new TypeError('Marmo Astro supports static HTML only; remove client:* directives')
    if (Object.keys(slots).some((name) => name !== 'default'))
      throw new TypeError('Marmo Astro supports only the default slot')
    const { tag, attributes } = component(props)
    const opening = `<${tag}${serializeAttributes(attributes)}>`
    // Astro supplies already-rendered slot HTML. Never escape it a second time.
    return { html: voidElements.has(tag) ? opening : `${opening}${slots.default ?? ''}</${tag}>` }
  },
}

export default renderer
