import { mergeProps } from 'solid-js'
import type { JSX } from 'solid-js'
import type { MaBaseComponent, Interpolation, LogicHandler, StyleDefinition } from '../types'
import createSolidElement from '../util/createSolidElement'

const resolveInterpolationValue = (value: unknown) => (typeof value === 'string' ? value : '')

const createTransformedComponent = <T extends object, E extends keyof JSX.IntrinsicElements>(
  baseComponent: MaBaseComponent<any>,
  tag: E,
  strings: TemplateStringsArray,
  interpolations: Interpolation<T>[],
): MaBaseComponent<T> => {
  if (baseComponent.__maMarmo !== true) {
    throw new Error('ma.transform can only transform marmo components')
  }

  const displayName = `Transformed(${baseComponent.displayName || 'Component'})`
  const baseComputeClassName = baseComponent.__maComputeClassName || (() => '')
  const baseLogic = (baseComponent.__maLogic as LogicHandler<any>[]) || []
  const basePropsToFilter = (baseComponent.__maPropsToFilter as (keyof T)[]) || []

  const computeClassName = (props: T, collectedStyles: StyleDefinition<T> = {}) => {
    const styleUtility = (styleDef: StyleDefinition<T>) => {
      Object.assign(collectedStyles, styleDef)
      return ''
    }

    type InterpolationProps = T & { style: typeof styleUtility }
    let interpolationProps: InterpolationProps | undefined
    const getInterpolationProps = () => {
      if (!interpolationProps) {
        interpolationProps = mergeProps(props, { style: styleUtility }) as InterpolationProps
      }
      return interpolationProps
    }

    const baseClassName = baseComputeClassName(getInterpolationProps(), collectedStyles)

    const transformClassName = strings
      .map((str, i) => {
        const interp = interpolations[i]
        if (typeof interp === 'function') {
          return str + resolveInterpolationValue(interp(getInterpolationProps()))
        }
        return str + resolveInterpolationValue(interp)
      })
      .join('')
      .replace(/\s+/g, ' ')
      .trim()

    return [baseClassName, transformClassName].filter(Boolean).join(' ')
  }

  return createSolidElement({
    tag,
    computeClassName,
    displayName,
    propsToFilter: basePropsToFilter,
    logicHandlers: baseLogic as LogicHandler<any>[],
  })
}

export default createTransformedComponent
