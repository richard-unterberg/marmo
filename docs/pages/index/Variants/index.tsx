import ma from '@marmo/react'
import { LayoutComponent } from '@unterberg/nivel'
import type { CSSProperties } from 'react'
import CodePresenter from '../../../components/CodePresenter'
import MarmoLogo from '../../../components/MarmoLogo'
import StyledLink from '../../../components/StyledLink'
import { withDocsBasePath } from '../../../util/withBasePath'
import CVACode from './cva.mdx'
import MarmoCode from './marmo.mdx'
import NativeCode from './native.mdx'

const VariantsSection = () => {
  return (
    <div className="relative">
      <div className="absolute -top-60 left-0 right-0 h-[70svh] z-0">
        <div
          aria-hidden="true"
          className="absolute h-full w-full bg-(image:--background-image-light) bg-size-[100%_100%] bg-no-repeat opacity-50 dark:bg-(image:--background-image-dark) dark:opacity-100"
          style={
            {
              '--background-image-light': `url("${withDocsBasePath('/bg/bg-light-alt.avif', import.meta.env.BASE_URL)}")`,
              '--background-image-dark': `url("${withDocsBasePath('/bg/bg-dark-alt.avif', import.meta.env.BASE_URL)}")`,
            } as CSSProperties
          }
        />
        <div className="absolute top-0 left-0 right-0 h-full bg-linear-to-b from-base-100 from-10% via-transparent to-base-100" />
      </div>
      <LayoutComponent $size="xs" className="mt-32 mb-16 flex flex-col gap-8">
        <MarmoLogo $size="md" />
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center">
          Advanced Styling with Variants
        </h1>
        <p className="text-lg text-base-muted">
          With variants, you can easily create reusable components with different styles and behaviors based on props.
          This allows for a more maintainable and scalable codebase.
        </p>
      </LayoutComponent>
      <LayoutComponent $size="md">
        <div className="border border-base-muted-light grid grid-cols-2 lg:grid-cols-6 gap-2 shadow-xl shadow-primary/10 dark:shadow-primary/10 p-7 rounded-xl justify-center bg-base-200/80 dark:bg-base-100/80">
          <span className="col-span-full text-center text-lg mb-3">Examples</span>
          <LocalAlert>
            <code>{`<Alert />`}</code>
          </LocalAlert>
          <LocalAlert $isActive>
            <code>{`<Alert $isActive />`}</code>
          </LocalAlert>
          <LocalAlert $severity="warning">
            <code>{`<Alert $severity="warning" />`}</code>
          </LocalAlert>
          <LocalAlert $severity="warning" $isActive>
            <code>{`<Alert $severity="warning" $isActive />`}</code>
          </LocalAlert>
          <LocalAlert $severity="error" className="hidden lg:block">
            <code>{`<Alert $severity="error" />`}</code>
          </LocalAlert>
          <LocalAlert $severity="error" $isActive className="hidden lg:block">
            <code>{`<Alert $severity="error" $isActive />`}</code>
          </LocalAlert>
        </div>
      </LayoutComponent>

      <LayoutComponent $size="full" className="mt-32  mb-16">
        <CodePresenter
          leftCode={<NativeCode />}
          leftCodeLabel="Native"
          rightCode={<CVACode />}
          rightCodeLabel="CVA"
          highlightCode={<MarmoCode />}
          highlightCodeLabel="Marmo"
          hightlightBoxHeight={660}
          smallBoxHeight={560}
        />
        <div className="relative mx-auto w-fit">
          <StyledLink href="variants">Learn more about variants</StyledLink>
        </div>
      </LayoutComponent>
    </div>
  )
}

export default VariantsSection

interface AlertProps {
  $severity?: 'info' | 'warning' | 'error'
  $isActive?: boolean
}

const Alert = ma.div.variants<AlertProps>({
  base: ({ $isActive }) => `
    ${$isActive ? 'custom-class-active' : 'custom-class-inactive'}
    p-4
    rounded-md
  `,
  variants: {
    $severity: {
      warning: 'bg-warning/30 text-warning',
      info: 'bg-info/30 text-info',
      error: 'bg-error/30 text-error',
    },
    $isActive: {
      true: 'border border-current/50 shadow-xl shadow-current/20',
      false: 'border border-current/30 border-dashed',
    },
  },
  defaultVariants: {
    $severity: 'info',
    $isActive: false,
  },
})

const LocalAlert = ma.extend(Alert)`flex items-center justify-center text-sm text-center flex-1 text-xs`
