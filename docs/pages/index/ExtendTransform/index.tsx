import ma from '@marmo/react'
import { LayoutComponent, Link } from '@unterberg/nivel'
import type { CSSProperties } from 'react'
import Headline from '../../../components/Headline'
import MarmoLogo from '../../../components/MarmoLogo'
import { withDocsBasePath } from '../../../util/withBasePath'
import ExtendCode from './extend.mdx'
import TransformCode from './transform.mdx'

const StyledLink = ma.extend(Link)`
  btn btn-primary btn-soft w-fit mx-auto
`

const ExtendTransformSection = () => {
  return (
    <div className="relative mt-32 mb-16 z-5">
      <div className="absolute -top-26 left-0 right-0 h-[70svh]">
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
        <div className="absolute top-0 left-0 h-[calc(55svh+16*var(--spacing))] w-full bg-radial-[at_50%_50%] from-base-100 to-55% dark:from-base-100 z-0" />
      </div>
      <LayoutComponent $size="xs" className="flex flex-col gap-8">
        <MarmoLogo $size="md" />

        <Headline as="h2" className="mx-auto">
          Extension and Transformation
        </Headline>
      </LayoutComponent>
      <LayoutComponent className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 prose-container">
        <div className="flex flex-col">
          <Headline as="h3" className="">
            Extend
          </Headline>
          <p className="text-base-muted">
            Extend allows you to create a new component based on an existing one, while adding or overriding styles.
            This is useful for creating variations of a component without duplicating code.
          </p>
          <ExtendCode />
          <StyledLink href="extend">Read "extend" docs</StyledLink>
        </div>
        <div className="flex flex-col">
          <Headline as="h3">Transform</Headline>
          <p className="text-base-muted">
            Transform allows you to modify the props of a component before they are passed down to the underlying
            element. This is useful for creating higher-order components that can modify the behavior of existing
            components.
          </p>
          <TransformCode />
          <StyledLink href="transform">Read "transform" docs</StyledLink>
        </div>
      </LayoutComponent>
    </div>
  )
}

export default ExtendTransformSection
