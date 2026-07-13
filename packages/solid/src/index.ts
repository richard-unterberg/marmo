import { twMerge } from 'tailwind-merge'
import maInit from './ma'
import convertMaProps from './helper/convertMaProps'
import createVariantMap from './helper/createVariantMap'
import type { MaComponentFactory } from './types'

/**
 * The `ma` instance is the main entry point for creating our marmo-components.
 * It provides:
 * - Component builder to create marmo components by using template literals and interpolations. E.g: `ma.div` or `ma.button`
 * - A variants method to create marmo components  with variants. E.g: `ma.div.variants(...)`
 * - The `ma.extend` method that allows you to create new marmo components based on existing ones.
 *
 * Each styled component created via `ma` filters out `$`-prefixed props from the DOM and computes a final `class`
 * string by combining user-defined classes, dynamic interpolations based on props, and any incoming `className`.
 *
 * @example
 * ```tsx
 * // simple usage:
 * const StyledDiv = ma.div`p-2`
 *
 * // Creating a styled 'div' with conditional classes:
 * const StyledDiv = ma.div<{ $active?: boolean }>`
 *   p-2
 *   ${p => p.$active ? 'bg-blue' : 'bg-green'}
 * `
 *
 * // Using the styled component:
 * <StyledDiv $active>Active Content</StyledDiv>
 *
 * // Extending an existing styled component:
 * const ExtendedDiv = ma.extend(StyledDiv)<{ $highlighted?: boolean }>`
 *   ${p => p.$highlighted ? 'border-2 border-yellow' : ''}
 * `
 *
 * // Validating props against an intrinsic element:
 * const ExtendedButton = ma.extend(ma.button)`
 *   ${p => p.type === 'submit' ? 'font-bold' : ''}
 * `
 *
 * // Creating a styled component with variants:
 * const StyledButton = ma.button.variants({
 *   base: 'p-2',
 *   variants: {
 *    size: {
 *     sm: 'p-1',
 *     lg: 'p-3',
 *   },
 *   defaultVariants: {
 *    size: 'sm',
 *   },
 * })
 * ```
 */
const ma = maInit as MaComponentFactory

export type { MaBaseComponent } from './types'
export type { VariantsConfig } from './types'

export { convertMaProps }
export { createVariantMap }
export { default as createMarmo } from './createMarmo'

export default ma

/** the `twMerge` lib from @marmo/solid */
const maMerge = twMerge
export { maMerge }
