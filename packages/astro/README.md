# Native Astro prototype

This private, unpublished `@marmo/astro` workspace proves Marmo's component-factory syntax can render static HTML in Astro without React, Solid, hydration, or a browser runtime. It is tested against **Astro 7.4.4** using Node 24.22.1 (Astro requires Node >=22.23.4).

From the repository root:

```sh
npm ci
npm run build:astro
npm run typecheck:astro
npm run test:astro
```

Register the server-only integration in an Astro project that can resolve this workspace package:

```js
// astro.config.mjs
import { defineConfig } from 'astro/config'
import marmo from '@marmo/astro/integration'

export default defineConfig({ output: 'static', integrations: [marmo()] })
```

Use generated components directly in `.astro` templates:

```astro
---
import ma from '@marmo/astro'

const Button = ma.button<{ $active?: boolean }>`
  btn p-2 ${p => p.$active && 'font-bold'}
`
const Choice = ma.button.variants<
  { $raised?: boolean },
  { size?: 'sm' | 'lg'; selected?: boolean }
>({
  base: p => `btn ${p.$raised ? 'shadow-lg' : ''}`,
  variants: {
    size: { sm: 'p-2', lg: 'p-4' },
    selected: { true: 'font-bold', false: 'font-normal' },
  },
  defaultVariants: { size: 'sm', selected: false },
})
---
<Button $active type="submit" class="p-8"><strong>Save</strong></Button>
<Choice size="lg" selected $raised>Choose</Choice>
<Button $_as="a" href="/next">Next</Button>
```

The first instance renders `<button type="submit" class="btn font-bold p-8"><strong>Save</strong></button>`. Classes are strings only; configure your application's CSS tooling separately. Marmo installs no CSS framework.

Synchronous logic can derive props before classes, variants, and inline styles are evaluated:

```ts
const Meter = ma.div
  .logic<{ $count: number; $active?: boolean }>(p => ({
    $active: p.$count > 1,
    title: `Count: ${p.$count}`,
  }))`
    ${p => p.$active && 'font-bold'}
    ${p => p.style({ width: '12px', opacity: 0.5, '--count': q => q.$count })}
  `
```

`<Meter $count={3} style={{ width: '20px' }} />` appends consumer CSS after generated CSS, so the consumer width wins. Camel-case names become kebab-case; CSS custom properties retain their names. Numbers serialize literally, **without implicit `px`**. Use units explicitly for lengths. Null/undefined values are omitted. Multiple `style()` calls combine in evaluation order; later calls replace earlier properties. Consumer style objects or raw CSS strings append declarations and follow normal CSS cascade rules (including `!important`). Each callback runs once per instance; styles never trigger a second class evaluation.

| Feature | Scope | Evidence / reason |
| --- | --- | --- |
| Intrinsic `ma.button` tagged templates | Supported | `test/fixtures/static` builds imported and frontmatter-local definitions with typed HTML attributes and default slots. HTML tags are enumerated in `src/tags.ts`. |
| Prop callbacks / falsy values | Supported | `test/src/render.test.ts`: only strings contribute classes; booleans, numbers, null and undefined are ignored, including callback results. |
| Attribute forwarding / filtering | Supported for scalar HTML attributes | `$` props and registered variant names stay off HTML. HTML boolean attributes use presence/absence; ARIA/data/enumerated booleans serialize as strings. Null/undefined are omitted. Objects, arrays and callbacks used as attributes fail explicitly. |
| Class merging | Supported | Definitions precede consumer `class` in `tailwind-merge`; static fixture verifies `p-8` replaces `p-2`. `className` is outside the API. |
| Variants | Supported with explicit types | Familiar `.variants<Extra, Variants>({ base, variants, defaultVariants })`; one type argument also works. Defaults, booleans, functional base/entries and filtering are tested. Explicit generics provide strict selections; automatic option-to-prop inference is deferred. Null/undefined selections fall back to defaults. Callbacks see actual props; defaults select entries without injecting props. |
| `.logic()` | Supported, synchronous only | Handlers run in order on per-instance copies; returned props override incoming props. Derived styling props and native attributes are typed. Async handlers fail. No framework hooks or `__maOmit` contract. |
| `style()` | Supported with explicit serialization | See rules above and style tests; style keys are permissive CSS strings, not a complete CSS type validator. |
| `$_as` | Supported for enumerated HTML tags | Native attributes follow the selected tag in TypeScript and actual `.astro` diagnostics; the static fixture renders an anchor from a button definition. Callbacks retain their definition's native prop types. |
| `transform` | Deferred | `$_as` proves intrinsic switching on the same rendering path. A separate definition-composition API needs decisions about retained native callback types; it is unnecessary to prove static rendering. |
| `extend` | Deferred; recommend omitting initially | The prototype has no definition inheritance or component-wrapper contract. Adding arbitrary-framework wrapping would defeat its scope. If added later, restrict it to Astro Marmo definitions and specify class/style/logic order first. |
| Slots | Default slot supported | Astro supplies rendered HTML; the renderer inserts it once. Real build tests check nested markup and escaped text. Named slots fail explicitly. Content supplied to void elements is discarded, as in HTML. |
| SVG, custom tags, raw-text script/style tags | Deferred | Separate namespace, raw-text and escaping rules need coverage. `search` and `template` are also absent from the tested Astro intrinsic type map. |
| `class:list`, `set:*`, `client:*`, `server:*`, transitions | Outside the prototype contract | Astro may process its own directives before renderer invocation; the factory does not promise directive parity. Hydration metadata is rejected, and there is no client entrypoint. |
| Client state, hooks, event callbacks, DOM refs, SSR deployment | Deferred | Static builds only; no browser lifecycle or production SSR adapter is implemented. |

## Rendering and type decisions

The integration uses Astro's documented [`addRenderer` / server renderer contract](https://docs.astro.build/en/reference/renderer-reference/) with marker-based `check()` and `renderToStaticMarkup()`. A thin `.astro` wrapper alone cannot bind a per-definition class computation to a new typed component factory through a documented API. The renderer preserves direct component use without depending on Astro's private compiled-component calling convention. No shared-core extraction or changes to the React/Solid adapters are needed.

This adds one integration registration to the familiar default `ma` import. Assign components to capitalized variables, following [Astro's dynamic tag rules](https://docs.astro.build/en/reference/astro-syntax/#dynamic-tags). The renderer owns element/attribute serialization; Astro owns slot rendering and text escaping. Attribute values are escaped once; rendered slot markup is preserved.

Use Astro's standard `astro/tsconfigs/strict` configuration with bundler module resolution. NodeNext resolution did not load Astro's extensionless ambient JSX declarations in this prototype; `skipLibCheck` hid the resulting loss of native attribute checks. Negative tests guard against this failure. A discriminated `$_as` union retains target-specific checks in Astro's generated TSX. Generic component overloads alone are insufficient evidence of `.astro` checking.

`test/types/factory.ts` checks positive and negative TypeScript cases. `astro check` checks the real positive fixture, then `test/types/check-negative.mjs` requires diagnostics on every marked invalid `.astro` line. Runtime tests cover each supported feature, and a real CLI static build is inspected for escaping, native attributes, slots, per-instance output and the absence of JavaScript/hydration. Package builds, type checks and tests run through root `npm run verify`; `build:all` also builds this workspace.

For full repository verification in a fresh checkout, run `npm run build:all` before `npm run verify`: the existing docs import the React workspace's built package.

## Recommendation

**Proceed with a narrowly scoped experimental `@marmo/astro` package**, using this server-only integration and the tested static subset. The fixture proves the desired syntax and independent build-time props work without React/Solid or client assets. Keep this workspace private until a release decision; neither production readiness nor SSR deployment compatibility is established.

Before publishing, decide the supported Astro/Node version range, improve inferred variant props if desired, and broaden HTML serialization coverage (array attributes, unusual boolean attributes, SVG and raw-text elements). Keep `extend` and static `transform` out of the initial API; require a separate composition contract and tests before adding them. Preserve real `.astro` negative checks and the zero-JavaScript static build as release gates. The reduced API is useful on its own; full adapter parity is unnecessary.
