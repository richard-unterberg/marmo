/** @jsxImportSource solid-js */
import type { Accessor, JSX, ParentProps } from 'solid-js'
import ma from '../../src'

const Element = ma.button<{ $active?: boolean }>`base-class`
const TransformedSpan = ma.transform(Element).span
const conditionalTag: 'div' | 'span' = Math.random() > 0.5 ? 'div' : 'span'

;<Element $_as="a" href="/settings" $active />
;<Element $_as="label" for="email" />
;<Element $_as="span" />
;<Element $_as={conditionalTag} $active />

// @ts-expect-error href is not valid for a span
;<Element $_as="span" href="/settings" />
// @ts-expect-error for is not valid for a div
;<Element $_as="div" for="email" />
// @ts-expect-error href is not valid for a transformed span
;<TransformedSpan href="/settings" />

type CustomButtonProps = ParentProps<
  {
    isOn: Accessor<boolean>
    onToggle: (event?: MouseEvent) => void
    color?: 'neutral' | 'primary'
  } & JSX.ButtonHTMLAttributes<HTMLButtonElement>
>

const CustomButton = (_props: CustomButtonProps) => null
const ExtendedButton = ma.extend(CustomButton)``
const TransformedButton = ma.transform(ExtendedButton).a

;<TransformedButton
  isOn={() => true}
  onToggle={() => undefined}
  type="button"
  color="neutral"
  href="/settings"
  aria-pressed={false}
>
  Settings
</TransformedButton>

// @ts-expect-error inherited required props stay required after transforming
;<TransformedButton href="/settings" />

const VariantButton = ma.button.variants<object, { tone: 'neutral' | 'primary' }>({
  variants: {
    tone: {
      neutral: 'neutral',
      primary: 'primary',
    },
  },
})
const VariantAnchor = ma.transform(VariantButton).a

;<VariantAnchor tone="neutral" href="/settings" />
// @ts-expect-error inherited variant values stay narrowed after transforming
;<VariantAnchor tone="danger" href="/settings" />
