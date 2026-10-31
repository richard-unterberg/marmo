import { twMerge } from 'tailwind-merge'
import { combineStyles, resolveStyles } from './styles.js'
import { isHtmlTag, tags, type HtmlTag } from './tags.js'
import type {
  Interpolation,
  LogicHandler,
  MaComponent,
  MaFactory,
  Props,
  StyleDefinition,
  StylingProps,
  TemplateBuilder,
  VariantsConfig,
} from './types.js'

type RuntimeProps = Record<string, any>
type ComputeClasses = (props: StylingProps<RuntimeProps>) => string
const classString = (value: unknown) => (typeof value === 'string' ? value : '')

const createComponent = <K extends HtmlTag, P extends object>(
  tag: K,
  compute: ComputeClasses,
  logic: LogicHandler<any>[],
  variantNames: string[] = [],
): MaComponent<K, P> =>
  Object.assign(
    (incoming: RuntimeProps) => {
      const props = { ...incoming }
      for (const handler of logic) {
        const derived = handler({ ...props })
        if (derived && typeof (derived as { then?: unknown }).then === 'function') {
          throw new TypeError('Marmo Astro logic must be synchronous')
        }
        Object.assign(props, derived)
      }
      const renderTag = props.$_as ?? tag
      if (!isHtmlTag(renderTag)) throw new TypeError(`Unsupported Marmo Astro tag: ${String(renderTag)}`)

      const styles: StyleDefinition<RuntimeProps> = {}
      const computed = compute({
        ...props,
        style: (definition: StyleDefinition<RuntimeProps>) => {
          Object.assign(styles, definition)
          return ''
        },
      })
      const attributes: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(props)) {
        if (
          !key.startsWith('$') &&
          !variantNames.includes(key) &&
          !['class', 'style', 'children', 'className'].includes(key)
        ) {
          attributes[key] = value
        }
      }
      attributes.class = twMerge(computed.replace(/\s+/g, ' ').trim(), classString(props.class))
      const style = combineStyles(resolveStyles(styles, props), props.style)
      if (style) attributes.style = style
      return { tag: renderTag, attributes }
    },
    { __marmoAstro: true as const },
  ) as MaComponent<K, P>

const createBuilder = <K extends HtmlTag, L extends object = object>(
  tag: K,
  logic: LogicHandler<any>[] = [],
): TemplateBuilder<K, L> => {
  const builder = (<P extends object = object>(
    strings: TemplateStringsArray,
    ...interpolations: Interpolation<Props<K, L & P>>[]
  ) =>
    createComponent<K, L & P>(
      tag,
      (props) =>
        strings
          .map((text, index) => {
            const value = interpolations[index]
            return text + classString(typeof value === 'function' ? value(props as any) : value)
          })
          .join(''),
      logic,
    )) as TemplateBuilder<K, L>

  builder.logic = (handler) => createBuilder(tag, [...logic, handler])
  builder.variants = <Extra extends object, Variants extends object = Extra>(
    config: VariantsConfig<K, L & Extra, Variants>,
  ) => {
    const variantNames = Object.keys(config.variants)
    return createComponent<K, L & Extra & Partial<Variants>>(
      tag,
      (props) => {
        const evaluate = (entry: Interpolation<any>) => classString(typeof entry === 'function' ? entry(props) : entry)
        const classes = [evaluate(config.base)]
        for (const name of variantNames) {
          const selected = props[name] ?? (config.defaultVariants as RuntimeProps | undefined)?.[name]
          const options = (config.variants as Record<string, Record<string, Interpolation<any>>>)[name]
          if (selected != null && options && Object.hasOwn(options, String(selected))) {
            classes.push(evaluate(options[String(selected)]))
          }
        }
        return classes.join(' ')
      },
      logic,
      variantNames,
    )
  }
  return builder
}

const ma = Object.fromEntries(tags.map((tag) => [tag, createBuilder(tag)])) as MaFactory

export default ma
export { twMerge as maMerge }
export type { MaComponent, ComponentProps, VariantsConfig, StyleDefinition } from './types.js'
