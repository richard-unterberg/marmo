# marmo

Typed component factory for class names. For React, SolidJS, and Astro.

Read the [documentation](https://richard-unterberg.github.io/marmo/) for examples and the full API.

## Features

- Class name-focused components
- **Variants** inspired by CVA
- Extend components in React and Solid (template strings **or** `ma.extend(Component).variants`)
- Render marmo components as another intrinsic element with `$_as`
- Create reusable transformed components in React and Solid
- Dynamic styles
- TypeScript support
- Tested with SSR frameworks for React/Solid and static builds for Astro
- Class merging
- [SolidJS](https://www.solidjs.com/) / [React](https://react.dev/) / [Astro](https://astro.build/) adapters

## Packages and documentation

### React

- [docs](https://richard-unterberg.github.io/marmo/)
- [npmjs](https://www.npmjs.com/package/@marmo/react)

```bash
npm i @marmo/react
# or yarn add or pnpm add ...
```

For bundled apps, you can install Marmo as a dev dependency:

```bash
npm i -D @marmo/react
```

Use a regular dependency for packages/libraries or deployments that resolve
`node_modules` at runtime after installing only production dependencies.

### SolidJS

- [docs](https://richard-unterberg.github.io/marmo/)
- [npmjs](https://www.npmjs.com/package/@marmo/solid)

```bash
npm i @marmo/solid
# or yarn add or pnpm add ...
```

For bundled apps, you can install Marmo as a dev dependency:

```bash
npm i -D @marmo/solid
```

Use a regular dependency for packages/libraries or deployments that resolve
`node_modules` at runtime after installing only production dependencies.

### Astro

- [docs](https://richard-unterberg.github.io/marmo/)
- [package README](packages/astro/README.md)

```bash
npm i @marmo/astro
# or yarn add or pnpm add ...
```

The Astro adapter is experimental and targets static HTML. It requires Node.js
24 or newer and Astro compatible with `^7.4.4`.

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

Then import `ma` from `@marmo/astro` in your `.astro` files. Templates, typed
styling props, variants, `.logic()`, inline styles, class merging, and `$_as` run
during rendering without a Marmo browser runtime.

Astro supports the default slot and uses `class`. The `extend` and `transform`
builders, named slots, client hydration, event callbacks, and DOM refs are not
available. Numeric styles do not receive implicit `px` units. See the
[Astro support notes](packages/astro/README.md#astro-support) for the full scope.

## Tailwind Merge

Marmo uses [tailwind-merge](https://github.com/dcastil/tailwind-merge) to combine
generated and consumer classes. Later conflicting Tailwind utilities override
earlier ones, while unrelated classes remain.

## Inspiration

- [tailwind-styled-component](https://github.com/MathiasGilson/tailwind-styled-component)
- [cva](https://github.com/joe-bell/cva)
- [twin.macro](https://github.com/ben-rogerson/twin.macro)
