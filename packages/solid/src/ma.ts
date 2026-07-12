import createBaseComponent from './factory/base'
import createExtendedComponent, { createExtendedVariantsComponent } from './factory/extend'
import createTransformedComponent from './factory/transform'
import createVariantsComponent from './factory/variants'
import type {
  MaBaseComponent,
  MaComponentFactory,
  MaFactoryFunction,
  InputComponent,
  Interpolation,
  LogicHandler,
  MergeProps,
  VariantsConfig,
} from './types'
import { type AllowedTags, domElements } from './util/domElements'

const emptyTemplate = Object.assign([''], { raw: [''] }) as unknown as TemplateStringsArray

const isTemplateStringsArray = (value: unknown): value is TemplateStringsArray => Array.isArray(value) && 'raw' in value

const createExtendBuilder = (baseComponent: MaBaseComponent<any>, logicHandlers: LogicHandler<any>[] = []) => {
  const builder = <T extends object>(strings: TemplateStringsArray, ...interpolations: Interpolation<T>[]) =>
    createExtendedComponent<T>(baseComponent, strings, interpolations, logicHandlers as LogicHandler<T>[])

  const builderWithLogic = builder as typeof builder & {
    logic: (handler: LogicHandler<any>) => ReturnType<typeof createExtendBuilder>
    variants: <ExtraProps extends object, VariantProps extends object = ExtraProps>(
      config: VariantsConfig<VariantProps, ExtraProps>,
    ) => MaBaseComponent<MergeProps<typeof baseComponent, ExtraProps & Partial<VariantProps>>>
  }

  builderWithLogic.logic = (handler: LogicHandler<any>) =>
    createExtendBuilder(baseComponent, [...logicHandlers, handler])

  builderWithLogic.variants = <ExtraProps extends object, VariantProps extends object = ExtraProps>(
    config: VariantsConfig<VariantProps, ExtraProps>,
  ) =>
    createExtendedVariantsComponent<
      ExtraProps,
      VariantProps,
      MergeProps<typeof baseComponent, ExtraProps & Partial<VariantProps>>
    >(
      baseComponent,
      config,
      logicHandlers as LogicHandler<MergeProps<typeof baseComponent, ExtraProps & Partial<VariantProps>>>[],
    )

  return builderWithLogic
}

const copyMarmoMetadata = (target: Record<string, any>, source: MaBaseComponent<any>) => {
  target.displayName = source.displayName
  target.__maMarmo = true
  target.__maComputeClassName = source.__maComputeClassName
  target.__maTag = source.__maTag
  target.__maStyles = source.__maStyles
  target.__maLogic = source.__maLogic
  target.__maPropsToFilter = source.__maPropsToFilter
}

const createTransformTarget = (baseComponent: MaBaseComponent<any>, tag: AllowedTags) => {
  const transformedComponent = createTransformedComponent(baseComponent, tag, emptyTemplate, [])
  const target = ((firstArg?: unknown, ...interpolations: Interpolation<any>[]) => {
    if (isTemplateStringsArray(firstArg)) {
      return createTransformedComponent(baseComponent, tag, firstArg, interpolations)
    }

    return transformedComponent(firstArg as any)
  }) as Record<string, any>

  copyMarmoMetadata(target, transformedComponent)
  return target
}

const createTransformBuilder = (baseComponent: MaBaseComponent<any>) => {
  if (baseComponent.__maMarmo !== true) {
    throw new Error('ma.transform can only transform marmo components')
  }

  const builder = Object.create(null) as Record<AllowedTags, unknown>
  const registerTransformTarget = (tag: AllowedTags) => {
    builder[tag] = createTransformTarget(baseComponent, tag)
  }

  domElements.forEach(registerTransformTarget)
  return builder
}

const createFactoryFunction = <K extends AllowedTags>(
  tag: K,
  logicHandlers: LogicHandler<any>[] = [],
): MaFactoryFunction<K> => {
  const factory = (<T extends object>(strings: TemplateStringsArray, ...interpolations: Interpolation<T>[]) =>
    createBaseComponent<T, K>(tag, strings, interpolations, {
      logic: logicHandlers as LogicHandler<any>[],
    })) as MaFactoryFunction<K>

  factory.logic = <LogicProps extends object = object>(handler: LogicHandler<MergeProps<K, LogicProps>>) =>
    createFactoryFunction(tag, [...logicHandlers, handler])

  factory.variants = <ExtraProps extends object, VariantProps extends object = ExtraProps>(
    config: VariantsConfig<VariantProps, ExtraProps>,
  ) =>
    createVariantsComponent<K, ExtraProps, VariantProps>(tag, config, {
      logic: logicHandlers as LogicHandler<any>[],
    })

  return factory
}

type MaFactoryMap = { [K in AllowedTags]: MaFactoryFunction<K> }
const maTarget = Object.create(null) as MaFactoryMap & Pick<MaComponentFactory, 'extend' | 'transform'>

const registerFactory = <K extends AllowedTags>(tag: K) => {
  ;(maTarget as Record<AllowedTags, unknown>)[tag] = createFactoryFunction(tag)
}

domElements.forEach(registerFactory)

maTarget.extend = <BCProps extends object>(baseComponent: MaBaseComponent<BCProps> | InputComponent) =>
  createExtendBuilder(baseComponent as MaBaseComponent<any>)

maTarget.transform = (baseComponent: MaBaseComponent<any>) => createTransformBuilder(baseComponent) as any

const ma = maTarget

export default ma
