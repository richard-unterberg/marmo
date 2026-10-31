import type { HTMLAttributes } from 'astro/types'
import type { HtmlTag } from './tags.js'

export type ClassResult = string | boolean | number | null | undefined
export type InlineStyle = Record<string, string | number | null | undefined>
export type StyleDefinition<P> = Record<
  string,
  string | number | null | undefined | ((props: P) => string | number | null | undefined)
>
export type StylingProps<P> = Omit<P, 'style'> & { style: (definition: StyleDefinition<P>) => '' }
export type Interpolation<P> = ClassResult | ((props: StylingProps<P>) => ClassResult)
export type LogicHandler<P> = (props: Readonly<P>) => Partial<P> | undefined

type NativeProps<K extends HtmlTag> = Omit<
  HTMLAttributes<K>,
  'class' | 'class:list' | 'style' | 'children' | 'ref' | `on${string}`
> & { class?: string; style?: string | InlineStyle }
export type Props<K extends HtmlTag, P extends object> = Omit<NativeProps<K>, keyof P> & P
type AllNativeKeys = { [K in HtmlTag]: keyof NativeProps<K> }[HtmlTag]
// Without explicit exclusions, union excess-property checks admit attributes from
// a different target even when $_as is absent (e.g. href on a default button).
type StrictProps<K extends HtmlTag, P extends object> = Props<K, P> & {
  [Key in Exclude<AllNativeKeys, keyof Props<K, P>>]?: never
}

// A discriminated union keeps target-only attributes tied to the selected HTML tag,
// including in Astro's generated TSX (which does not retain generic call overloads).
export type ComponentProps<K extends HtmlTag, P extends object> =
  | (StrictProps<K, P> & { $_as?: undefined })
  | { [T in HtmlTag]: Props<T, P> & { $_as: T } }[HtmlTag]

export interface RenderedElement {
  tag: HtmlTag
  attributes: Record<string, unknown>
}

export interface MaComponent<K extends HtmlTag, P extends object = object> {
  (props: ComponentProps<K, P>): RenderedElement
  readonly __marmoAstro: true
}

type VariantKey<T> = T extends boolean ? `${T}` : T extends string | number ? T : never
export interface VariantsConfig<K extends HtmlTag, Extra extends object, Variants extends object> {
  base?: Interpolation<Props<K, Extra & Partial<Variants>>>
  variants: {
    [Key in keyof Variants]?: Partial<
      Record<VariantKey<NonNullable<Variants[Key]>>, Interpolation<Props<K, Extra & Partial<Variants>>>>
    >
  }
  defaultVariants?: Partial<Variants>
}

export interface TemplateBuilder<K extends HtmlTag, Logic extends object = object> {
  <P extends object = object>(
    strings: TemplateStringsArray,
    ...interpolations: Interpolation<Props<K, Logic & P>>[]
  ): MaComponent<K, Logic & P>
  logic<P extends object = object>(handler: LogicHandler<Props<K, Logic & P>>): TemplateBuilder<K, Logic & P>
  variants<Extra extends object, Variants extends object = Extra>(
    config: VariantsConfig<K, Logic & Extra, Variants>,
  ): MaComponent<K, Logic & Extra & Partial<Variants>>
}

export type MaFactory = { [K in HtmlTag]: TemplateBuilder<K> }
