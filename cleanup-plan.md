# Marmo Documentation Release Audit and Completion Plan

## Goal

Bring the documentation in `docs/content` and the documentation website to a
release-ready state for the first public Marmo release.

The implementation and tests in `packages/react` and `packages/solid` are the
source of truth. Do not preserve documentation claims that contradict runtime
behavior or exported TypeScript types.

## Phase 1: Fix correctness blockers

### `docs/content/gettingStarted.mdx`

- Change the Solid peer requirement from `>=1.7` to `>=1.8`.
- Add a minimal executable React quick-start example.
- Add the equivalent Solid quick-start example.
- Show:
  - importing `ma`
  - creating one component
  - declaring one typed `$` prop
  - rendering the component
- Fix the wording `Extend a any component`.

### `docs/content/base.mdx`

- Replace the claim that Marmo filters all invalid HTML attributes.
- Document the actual contract:
  - `$`-prefixed props are filtered.
  - registered variant props are filtered.
  - other props are forwarded.
- Explain that TypeScript validation does not imply runtime HTML-attribute
  validation.
- Add a short class-merging example:
  - generated classes
  - consumer `className` in React
  - consumer `class` in Solid
  - later conflicting Tailwind utilities win.

### `docs/content/variants.mdx`

- Replace both occurrences of `isActive` with `$isActive`.
- Rename `defaultVariant` to `defaultVariants`.
- Correct the description of default variants:
  defaults apply when a variant prop is absent or nullish.
- State that a variant entry may be either:
  - a static class string
  - a function receiving all relevant props and `style`
- Add examples for:
  - multiple variants
  - boolean variants
  - default variants
  - static and functional entries
  - separated extra props and variant props using two generic arguments
- Ensure props with defaults are optional in the consumer-facing type when the
  example renders the component without that prop.
- Synchronize the landing-page Variants code sample with the documentation.

### `docs/content/transform.mdx`

- Import `Alert` from `@unterberg/nivel`.
- Clarify the type contract:
  - `$` props from the source Marmo component are preserved
  - normal props are validated against the transformed intrinsic element
- Show that both forms are valid:
  - `ma.transform(Component).span`
  - `ma.transform(Component).span\`...\``
- Remove the current non-Marmo workaround or rewrite it to explicitly state
  that extending a regular component does not preserve arbitrary rendering,
  hard-coded classes, or component internals when it is later transformed.
- Keep the v1 limitation explicit: `ma.transform` only accepts Marmo components.
- Split generic snippets that use `htmlFor`, `className`, or framework-specific
  APIs into React and Solid examples.

### `docs/content/extend.mdx`

- Use framework-specific wording:
  - React components must forward `className`
  - Solid components must forward `class`
- Explain that extending a regular framework component preserves that
  component's rendering, whereas transforming a Marmo component changes the
  rendered intrinsic element.
- Verify every recipe against the React and Solid type tests.

### `docs/content/logic.mdx`

- Avoid passing arbitrary domain props to `ma.div` in examples unless their DOM
  forwarding is intentional.
- Change the progress example to one of:
  - `ma.progress`
  - `$value` and `$max`
  - a typed wrapper component that consumes the domain props
- Decide and document how props can explicitly be omitted.
- Resolve the current React/Solid difference around `__maOmit` before
  documenting it as shared behavior.
- Keep `__maOmit` undocumented if it remains an internal implementation detail.

## Phase 2: Resolve cross-framework API inconsistencies

- Compare React and Solid behavior for:
  - `$` prop filtering
  - variant prop filtering
  - custom prop forwarding
  - explicit prop omission
  - `className` versus `class`
  - numeric inline-style values
  - function-valued entries in `StyleDefinition`
- Add parity tests for every behavior presented as shared functionality.
- Either implement missing parity or document the behavior as
  framework-specific.
- Do not make shared claims based only on one framework's implementation.

## Phase 3: Complete the public API documentation

- Build an inventory from the actual package exports.
- Decide whether these are stable public API:
  - `MaBaseComponent`
  - `VariantsConfig`
  - `convertMaProps`
  - `createVariantMap`
  - `maMerge`
- For each exported symbol:
  - document it,
  - mark it advanced/internal,
  - or remove it from the public exports before 1.0.
- Review `convertMaProps` because it currently mutates its input object.
- Add an API Reference or Utilities page if the exports remain public.

## Phase 4: Make examples executable

- Create framework-specific documentation type-test files:
  - `docs/examples/react/*.tsx`
  - `docs/examples/solid/*.tsx`
- Represent every major documentation example in these files.
- Add separate TypeScript configurations for React and Solid examples.
- Ensure examples import the built package or package source consistently.
- Add a `docs:check` script that runs:
  1. documentation generation
  2. React example typecheck
  3. Solid example typecheck
  4. docs application typecheck
  5. production docs build
- Add `docs:check` to the root `verify` workflow.
- Prevent future copy/paste errors such as undefined identifiers and outdated
  option names.

## Phase 5: Fix website release behavior

- Apply the configured documentation base path to:
  - top navigation links
  - CTA links
  - brand links
  - logos
  - background images
  - favicon and manifest assets where required
- Remove the `/concepts` CTA or create the corresponding page.
- Test the production build with:
  `PAGES_BASE_PATH=/classmatejs npm run docs:build`
- Verify all generated routes and assets under that subpath.
- Update GitHub and edit links to the final repository URL.
- Configure the final canonical `siteUrl`.
- Change `robots` from `false` when the site should become indexable.
- Check sitemap and robots output after the change.

## Phase 6: Editorial pass

- Normalize terminology:
  - Marmo component
  - intrinsic element
  - framework component
  - styling prop
  - variant prop
  - interpolation
- Use `defaultVariants` consistently.
- Use React `className` and Solid `class` consistently.
- Fix headings such as `Basic usage > module composition`.
- Remove unfinished markers such as `upcoming` from public headings or present
  them as an explicit roadmap note.
- Ensure page descriptions in `docs.graph.ts` match their actual content.
- Fix the `useMarmoCreateMarmo` description, which currently describes logic
  instead of component-local creation.

## Definition of Done

- `npm run verify` succeeds.
- Every React and Solid code example typechecks.
- No internal link points to a missing route.
- No image or asset assumes deployment at the domain root.
- Every public package export is documented or intentionally removed.
- Shared React/Solid claims have parity tests.
- Documentation no longer claims generic invalid-HTML-prop filtering.
- The final site has intentional `siteUrl` and robots settings - It's okay if this is setup manually for now