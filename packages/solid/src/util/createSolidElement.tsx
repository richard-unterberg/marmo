import type { Component, JSX } from 'solid-js'
import { createComponent, mergeProps, splitProps } from 'solid-js'
import { Dynamic } from 'solid-js/web'
import { twMerge } from 'tailwind-merge'

import type { LogicHandler, MaBaseComponent, StyleDefinition } from '../types'
import applyLogicHandlers from './applyLogicHandlers'

const toKebabCase = (key: string) => {
  if (key.startsWith('--')) {
    return key
  }
  return key
    .replace(/([A-Z])/g, (_, char: string) => `-${char.toLowerCase()}`)
    .replace(/^-/, '')
    .toLowerCase()
}

const unitlessProperties = new Set([
  'animation-iteration-count',
  'aspect-ratio',
  'border-image-outset',
  'border-image-slice',
  'border-image-width',
  'column-count',
  'columns',
  'fill-opacity',
  'flex',
  'flex-grow',
  'flex-shrink',
  'font-weight',
  'grid-area',
  'grid-column',
  'grid-column-end',
  'grid-column-span',
  'grid-column-start',
  'grid-row',
  'grid-row-end',
  'grid-row-span',
  'grid-row-start',
  'line-clamp',
  'line-height',
  'opacity',
  'order',
  'orphans',
  'scale',
  'stroke-dasharray',
  'stroke-dashoffset',
  'stroke-miterlimit',
  'stroke-opacity',
  'stroke-width',
  'tab-size',
  'widows',
  'z-index',
  'zoom',
])

const normalizeStyleValue = (key: string, value: string | number) => {
  if (typeof value !== 'number' || value === 0 || key.startsWith('--') || unitlessProperties.has(key)) {
    return value
  }

  return `${value}px`
}

const resolveStyleDefinition = <P extends object>(
  styles: StyleDefinition<P> | undefined,
  props: P,
): Record<string, string | number> => {
  if (!styles) {
    return {}
  }

  const normalized: Record<string, string | number> = {}
  const record = styles as Record<string, any>
  for (const rawKey in record) {
    const rawValue = record[rawKey]
    if (rawValue === undefined || rawValue === null) {
      continue
    }
    const resolvedValue = typeof rawValue === 'function' ? rawValue(props) : rawValue
    if (resolvedValue === undefined || resolvedValue === null) {
      continue
    }
    const key = toKebabCase(rawKey)
    normalized[key] = normalizeStyleValue(key, resolvedValue)
  }

  return normalized
}

const normalizeInlineStyle = (style: Record<string, any> | undefined | null) => {
  if (!style) {
    return {}
  }

  const normalized: Record<string, string | number> = {}
  for (const key in style) {
    const value = style[key]
    if (value === undefined || value === null) {
      continue
    }
    const normalizedKey = toKebabCase(key)
    normalized[normalizedKey] = normalizeStyleValue(normalizedKey, value)
  }
  return normalized
}

interface CreateSolidElementParams<T extends object, E extends keyof JSX.IntrinsicElements | Component<any>> {
  tag: E
  computeClassName: (props: T, collectedStyles?: StyleDefinition<T>) => string
  displayName: string
  styles?: StyleDefinition<T> | ((props: T) => StyleDefinition<T>)
  propsToFilter?: (keyof T)[]
  logicHandlers?: LogicHandler<T>[]
}

const createSolidElement = <T extends object, E extends keyof JSX.IntrinsicElements | Component<any>>({
  tag,
  computeClassName,
  displayName,
  styles = {},
  propsToFilter = [],
  logicHandlers = [],
}: CreateSolidElementParams<T, E>): MaBaseComponent<T> => {
  const element = ((incomingProps: T) => {
    const normalizedPropsBase =
      logicHandlers.length > 0 ? applyLogicHandlers(incomingProps, logicHandlers) : incomingProps
    const normalizedProps = normalizedPropsBase as T & Record<string, any>
    const normalizedRecord = normalizedProps as Record<string, any>
    const reservedKeys = [
      ...propsToFilter.filter((key): key is keyof T & string => typeof key === 'string'),
      'children',
      'class',
      'className',
      'style',
      '__maOmit',
    ] as readonly string[]
    const [local, forwardedSource] = splitProps(normalizedRecord, reservedKeys)

    const filteredProps: Record<string, any> = {}
    const forwarded = forwardedSource as Record<string, any>
    const omitKeysSource = normalizedRecord.__maOmit
    const omitKeys =
      Array.isArray(omitKeysSource) && omitKeysSource.length > 0
        ? new Set(
            omitKeysSource.map((key) => {
              if (typeof key === 'string') {
                return key
              }
              if (typeof key === 'number') {
                return String(key)
              }
              return String(key)
            }),
          )
        : undefined

    for (const key in forwarded) {
      if (omitKeys?.has(key)) {
        continue
      }
      if (!key.startsWith('$')) {
        Object.defineProperty(filteredProps, key, {
          enumerable: true,
          get: () => forwarded[key],
        })
      }
    }

    const generatedProps = {
      get component() {
        return (typeof normalizedProps.$_as === 'string' ? normalizedProps.$_as : tag) as any
      },
      get class() {
        const computedClassName = computeClassName(normalizedProps, {})
        const initialClass = typeof local.class === 'string' ? local.class : ''
        const incomingClasses = [initialClass, typeof local.className === 'string' ? local.className : '']
          .filter(Boolean)
          .join(' ')
          .trim()

        return twMerge(computedClassName, incomingClasses)
      },
      get style() {
        const collectedStyles: StyleDefinition<T> = {}
        computeClassName(normalizedProps, collectedStyles)
        const dynamicStylesSource = typeof styles === 'function' ? styles(normalizedProps) : styles
        const dynamicStyles = resolveStyleDefinition(dynamicStylesSource, normalizedProps)
        const generatedStyles = resolveStyleDefinition(collectedStyles, normalizedProps)
        const localStyleSource = typeof local.style === 'object' && local.style !== null ? local.style : undefined
        const localStyles = normalizeInlineStyle(localStyleSource)
        return { ...dynamicStyles, ...generatedStyles, ...localStyles }
      },
      get children() {
        return local.children
      },
    }

    return createComponent(Dynamic, mergeProps(filteredProps, generatedProps))
  }) as MaBaseComponent<T>

  element.displayName = displayName || 'Ma Component'
  element.__ma = true
  element.__maComputeClassName = (props: T, collectedStyles?: StyleDefinition<T>) =>
    computeClassName(logicHandlers.length > 0 ? applyLogicHandlers(props, logicHandlers) : props, collectedStyles)
  element.__maStyles = styles
  element.__maTag = tag
  element.__maLogic = logicHandlers
  element.__maPropsToFilter = propsToFilter

  return element
}

export default createSolidElement
