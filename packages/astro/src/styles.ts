import type { InlineStyle, StyleDefinition } from './types.js'

const cssName = (name: string) =>
  name.startsWith('--') ? name : name.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`).replace(/^ms-/, '-ms-')

// Astro-style serialization: numbers are literal CSS values, never implicit px.
export const serializeStyle = (style: InlineStyle): string =>
  Object.entries(style)
    .filter(([, value]) => value !== null && value !== undefined)
    .map(([name, value]) => `${cssName(name)}:${value}`)
    .join(';')

export const resolveStyles = (definition: StyleDefinition<any>, props: object): InlineStyle =>
  Object.fromEntries(
    Object.entries(definition).map(([name, value]) => [name, typeof value === 'function' ? value(props) : value]),
  )

export const combineStyles = (generated: InlineStyle, consumer: unknown): string => {
  const initial = serializeStyle(generated)
  const override =
    typeof consumer === 'string'
      ? consumer
      : consumer && typeof consumer === 'object'
        ? serializeStyle(consumer as InlineStyle)
        : ''
  // Append consumer declarations to preserve CSS cascade semantics, including raw strings.
  return [initial, override].filter(Boolean).join(';')
}
