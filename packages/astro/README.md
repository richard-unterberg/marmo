# marmo

Typed component factory for class names. For Astro.

Check the [docs](https://richard-unterberg.github.io/marmo/) for more information.

The Astro adapter is experimental and renders static HTML. It keeps Marmo's
component-factory syntax without requiring React, Solid, hydration, or a Marmo
browser runtime.

## 🚩 Transform this

```astro
---
const { isLoading = false } = Astro.props
---

<button class={`btn mt-5 ${isLoading ? "opacity-50 pointer-events-none" : ""}`}>
  <slot />
</button>
```

## 🌤️ Into

```astro
---
import ma from "@marmo/astro"

const SomeButton = ma.button<{ $isLoading?: boolean }>`
  btn
  mt-5
  ${({ $isLoading }) => $isLoading && "opacity-50 pointer-events-none"}
`

const { isLoading = false } = Astro.props
---

<SomeButton $isLoading={isLoading}><slot /></SomeButton>
```

Class callbacks run when Astro renders the component. They can depend on props,
but they do not subscribe to browser state.

## Features

- Class name-focused components
- Typed static, functional, boolean, and default variants
- Prop-dependent classes and synchronous logic
- Inline styles and CSS custom properties
- Render components as another HTML element with `$_as`
- TypeScript support for styling props and native HTML attributes
- Default-slot content
- Class merging with `tailwind-merge`
- Tested with real Astro static builds

## Contents

- [Features](#features)
- [Getting started](#getting-started)
- [Basic usage](#basic)
- [Usage with props](#use-with-props)
- [Create Variants](#create-variants)
- [Transform components](#transform)
- [Add CSS Styles](#add-css-styles)
- [Use inside Astro components](#use-inside-astro-components)
- [Add logic headers](#add-logic-headers)
- [Tailwind Merge](#tailwind-merge)
- [Astro support](#astro-support)
- [Development](#development)

## Getting started

Make sure your project uses Node.js 24 or newer and an Astro version compatible
with `^7.4.4`. The adapter is tested against Astro 7.4.4.

```bash
npm i @marmo/astro
# or
yarn add @marmo/astro
```

For static sites that bundle Marmo during the build, you can also install it as
a dev dependency:

```bash
npm i -D @marmo/astro
# or
yarn add -D @marmo/astro
```

Use a regular dependency for packages/libraries or environments that resolve
`node_modules` at runtime after installing only production dependencies.

Register the integration once in your Astro configuration:

```js
// astro.config.mjs
import { defineConfig } from "astro/config"
import marmo from "@marmo/astro/integration"

export default defineConfig({
  output: "static",
  integrations: [marmo()],
})
```

Use Astro's standard strict TypeScript configuration so `.astro` files can
validate the generated component props:

```json
{
  "extends": "astro/tsconfigs/strict"
}
```

Marmo composes class strings; configure your application's CSS tooling
separately. The examples use Tailwind CSS and daisyUI classes, but Marmo does not
install either library.

## Basic

Create a component by calling `ma` with a tag name and a template literal
string. Assign it to a capitalized variable and use it directly in an Astro
template.

```astro
---
import ma from "@marmo/astro"

const Container = ma.div`
  py-2
  px-5
  min-h-24
`
---

<Container>
  <h1>Hello World</h1>
</Container>
```

Children are rendered through the default slot:

```html
<div class="py-2 px-5 min-h-24">
  <h1>Hello World</h1>
</div>
```

### Use with props

Pass typed props to the component and read them in template interpolations.
Native HTML attributes remain available for the selected element.

```astro
---
import ma from "@marmo/astro"

interface ButtonProps {
  $isActive?: boolean
  $isLoading?: boolean
}

const SomeButton = ma.button<ButtonProps>`
  btn
  mt-5
  ${({ $isActive }) => $isActive && "font-bold"}
  ${({ $isLoading }) => $isLoading && "opacity-50 pointer-events-none"}
`
---

<SomeButton $isActive $isLoading type="submit" disabled>Save</SomeButton>
```

### Prefix incoming props with `$`

Prefix styling-only props with `$` to distinguish them from HTML attributes.
Marmo removes `$`-prefixed props and registered variant props before rendering.
Other props are forwarded; use native attributes and intentional `data-*` or
`aria-*` attributes for HTML metadata.

Only strings contribute classes. Boolean, numeric, `null`, and `undefined`
interpolation results are ignored, including results from callbacks.

### Class merging

Use `class` to supply consumer classes. Conflicting Tailwind utilities from the
consumer take precedence:

```astro
---
import ma from "@marmo/astro"

const Panel = ma.div`rounded p-2 text-sm`
---

<Panel class="p-6">Content</Panel>
<!-- class="rounded text-sm p-6" -->
```

`className` is not part of the Astro adapter's API.

## Create Variants

Create variants by passing an object to `.variants()`, as in
[cva](https://cva.style/docs/getting-started/variants). Each variant prop maps
allowed selections to class strings or functions.

```astro
---
import ma from "@marmo/astro"

interface ButtonProps {
  $raised?: boolean
}

interface ButtonVariants {
  $size?: "sm" | "lg"
  $selected?: boolean
}

const Choice = ma.button.variants<ButtonProps, ButtonVariants>({
  base: ({ $raised }) => `btn ${$raised ? "shadow-lg" : ""}`,
  variants: {
    $size: {
      sm: "btn-sm",
      lg: "btn-lg",
    },
    $selected: {
      true: "font-bold",
      false: "font-normal",
    },
  },
  defaultVariants: {
    $size: "sm",
    $selected: false,
  },
})
---

<Choice $size="lg" $selected $raised>Choose</Choice>
<Choice>Use the defaults</Choice>
```

The first type parameter describes extra props; the second describes registered
variant props. A single type parameter also works when the same type describes
both. Use explicit types for strict variant selections; option-to-prop inference
is not currently provided.

Defaults select an entry when a variant prop is absent, `undefined`, or `null` at
runtime. An explicit `false` selects the `false` entry. Defaults do not inject
values into the props received by callbacks.

## Transform

Use `$_as` to render an existing Marmo definition as another supported HTML tag.
Classes, styling props, variants, and logic are retained; native attributes are
checked against the selected tag.

```astro
---
import ma from "@marmo/astro"

const Button = ma.button<{ $active?: boolean }>`
  btn
  ${({ $active }) => $active && "font-bold"}
`
---

<Button type="submit">Save</Button>
<Button $_as="a" href="/next" $active>Next</Button>
```

The separate `ma.transform()` builder is not available in Astro. Callback native
prop types still follow the original definition; `$_as` changes the consumer's
accepted HTML attributes and the rendered tag.

## Add CSS Styles

Use the `style()` helper inside an interpolation to collect inline styles. It
returns an empty string, so no style text is added to the classes.

```astro
---
import ma from "@marmo/astro"

const Meter = ma.div<{ $width: number }>`
  rounded
  ${({ style, $width }) => style({
    width: `${$width}px`,
    opacity: 0.5,
    "--meter-width": (props) => props.$width,
  })}
`
---

<Meter $width={120} style={{ width: "160px" }}>Progress</Meter>
```

- Camel-case names become kebab-case; CSS custom properties keep their names.
- Numbers serialize literally, **without implicit `px`**. Supply units for
  lengths, such as `width: "120px"`.
- `null` and `undefined` style values are omitted.
- Multiple `style()` calls combine in evaluation order; later values replace
  earlier values for the same property.
- Consumer style objects or CSS strings are appended after generated styles.
  Standard CSS cascade rules apply, including `!important`.

Style keys accept CSS property names as strings; they are not a complete CSS
property validator.

## Use inside Astro components

Define a Marmo component in `.astro` frontmatter or export it from a reusable
TypeScript module. Pass changing render inputs as props:

```ts
// components/StyledButton.ts
import ma from "@marmo/astro"

export const StyledButton = ma.button<{ $active?: boolean }>`
  btn
  ${({ $active }) => $active && "font-bold"}
`
```

```astro
---
import { StyledButton } from "../components/StyledButton"

interface Props {
  active?: boolean
}

const { active = false } = Astro.props
---

<StyledButton $active={active}><slot /></StyledButton>
```

No `useMarmo` or `createMarmo` helper is needed or exported. Definitions and
callbacks run during Astro rendering; browser state changes do not recalculate
their output.

## Add logic headers

Use `.logic()` to derive styling props or native attributes before classes,
variants, and inline styles are computed. A handler returns a partial props
object that is shallow-merged with the current props.

```astro
---
import ma from "@marmo/astro"

interface ProgressProps {
  $count: number
  $isComplete?: boolean
}

const Progress = ma.div
  .logic<ProgressProps>(({ $count }) => ({
    $isComplete: $count >= 10,
    "data-count": $count,
  }))
  .variants<ProgressProps, { $isComplete?: boolean }>({
    base: "rounded p-4",
    variants: {
      $isComplete: {
        true: "font-bold",
        false: "font-normal",
      },
    },
  })
---

<Progress $count={12}>Progress</Progress>
```

Handlers run in order. Later results override earlier props, and each component
instance has its own props. Keep handlers synchronous and deterministic; async
handlers fail. Framework hooks, effects, and subscriptions are outside the Astro
contract.

## Tailwind Merge

Marmo uses [tailwind-merge](https://github.com/dcastil/tailwind-merge) to combine
generated and consumer classes. The `maMerge` export is also available when you
need to merge class strings directly:

```ts
import { maMerge } from "@marmo/astro"

const className = maMerge("rounded p-2", "p-6")
// "rounded p-6"
```

## Astro support

The adapter targets static builds. Props, variants, and `.logic()` can compute
different HTML for each instance at build time; the resulting components have
no Marmo client lifecycle.

| Feature | Astro scope |
| --- | --- |
| Templates, variants, logic, styles, and class merging | Supported during rendering. |
| `$_as` | Supported for the adapter's HTML tags. |
| `ma.extend()` / `ma.transform()` | Not available. Use variants and `$_as` for the supported styling choices. |
| Children | Default slot only. Named slots are rejected. Content passed to void elements is discarded. |
| Attributes | Scalar HTML attributes are forwarded. HTML booleans use presence/absence; ARIA/data booleans serialize as strings. Objects, arrays, and callback attributes are rejected. |
| Tags | HTML only. SVG, custom tags, `script`, `style`, `search`, and `template` factories are not available. |
| Astro directives | `class:list`, `set:*`, `client:*`, `server:*`, and transition directives are outside the supported contract. Hydration is rejected. |
| Browser interaction | No framework hooks, event callbacks, DOM refs, or automatic updates from client state. Add separate Astro client scripts or use the React/Solid adapter inside an appropriate island. |
| Production SSR deployment | Not verified by the current static-build tests. |

The Astro package exports `ma`, `maMerge`, the integration, and the
`ComponentProps`, `MaComponent`, `StyleDefinition`, and `VariantsConfig` types.
React/Solid utilities such as `convertMaProps` and `createVariantMap` are not
exported by this adapter.

## Development

From the repository root:

```bash
npm ci
npm run build:astro
npm run typecheck:astro
npm run test:astro
```

The package includes behavior tests, positive and negative TypeScript cases,
real `.astro` diagnostics, and a static-build fixture. Integration tests inspect
the generated HTML and check that Marmo adds no browser scripts or hydration.

For full repository verification in a fresh checkout, build the workspaces first
because the docs import the React workspace's built package:

```bash
npm run build:all
npm run verify
```
