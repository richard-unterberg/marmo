import { LayoutComponent } from '@unterberg/nivel'
import type { CSSProperties } from 'react'
import MarmoLogo from '../../../components/MarmoLogo'
import { withDocsBasePath } from '../../../util/withBasePath'

const ExtendTransformSection = () => {
  return (
    <div className="relative mt-32 mb-16 z-5">
      <div className="absolute -top-24 left-0 right-0 h-[70svh]">
        <div
          aria-hidden="true"
          className="absolute h-full w-full bg-(image:--background-image-light) bg-size-[100%_100%] bg-no-repeat dark:bg-(image:--background-image-dark)"
          style={
            {
              '--background-image-light': `url("${withDocsBasePath('/bg-light-alt1.png', import.meta.env.BASE_URL)}")`,
              '--background-image-dark': `url("${withDocsBasePath('/bg-dark-alt1.png', import.meta.env.BASE_URL)}")`,
            } as CSSProperties
          }
        />
        <div className="absolute top-0 left-0 right-0 h-full bg-linear-to-b from-base-100 via-transparent to-base-100" />
      </div>
      <LayoutComponent $size="xs" className="flex flex-col gap-8">
        <MarmoLogo $size="md" />

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center">Extend and Transform</h1>
        <p className="text-lg text-base-muted">
          With variants, you can easily create reusable components with different styles and behaviors based on props.
          This allows for a more maintainable and scalable codebase.
        </p>
      </LayoutComponent>
      <LayoutComponent className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Extend</h2>
          <p className="text-base-muted">
            Extend allows you to create a new component based on an existing one, while adding or overriding styles.
            This is useful for creating variations of a component without duplicating code.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold tracking-tight">Transform</h2>
          <p className="text-base-muted">
            Transform allows you to modify the props of a component before they are passed down to the underlying
            element. This is useful for creating higher-order components that can modify the behavior of existing
            components.
          </p>
        </div>
      </LayoutComponent>
    </div>
  )
}

export default ExtendTransformSection
