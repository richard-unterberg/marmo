import cm from '@classmatejs/react'
import { LayoutComponent } from '@unterberg/nivel'
import CodePresenter from '../../../components/CodePresenter'
import ClassmateCode from './classmate.mdx'
import CVACode from './cva.mdx'
import NativeCode from './native.mdx'

const VariantsSection = () => {
  return (
    <>
      <LayoutComponent $size="xs" className="mt-24">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-center">
          Variants - Advanced Components
        </h1>

        <p className="text-lg text-base-muted">
          With variants, you can easily create reusable components with different styles and behaviors based on props.
          This allows for a more maintainable and scalable codebase.
        </p>
      </LayoutComponent>

      <LayoutComponent $size="full" className="mt-0">
        <CodePresenter
          leftCode={<NativeCode />}
          leftCodeLabel="Native"
          rightCode={<CVACode />}
          rightCodeLabel="CVA"
          highlightCode={<ClassmateCode />}
          highlightCodeLabel="Classmate"
          hightlightBoxHeight={660}
          smallBoxHeight={560}
        />
      </LayoutComponent>

      <LayoutComponent $size="lg" className="flex gap-2 justify-center mt-10">
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
        <LocalAlert $severity="error">
          <code>{`<Alert $severity="error" />`}</code>
        </LocalAlert>
        <LocalAlert $severity="error" $isActive>
          <code>{`<Alert $severity="error" $isActive />`}</code>
        </LocalAlert>
      </LayoutComponent>
    </>
  )
}

export default VariantsSection

interface AlertProps {
  $severity?: 'info' | 'warning' | 'error'
  $isActive?: boolean
}

const Alert = cm.div.variants<AlertProps>({
  base: ({ $isActive }) => `
    ${$isActive ? 'custom-class-active' : 'custom-class-inactive'}
    p-4
    rounded-md
  `,
  variants: {
    $severity: {
      warning: 'bg-warning/20 text-warning',
      info: 'bg-info/20 text-info',
      error: 'bg-error/20 text-error',
    },
    $isActive: {
      true: 'border border-current/50 shadow-xl shadow-current/20',
      false: 'border border-current/20 border-dashed',
    },
  },
  defaultVariants: {
    $severity: 'info',
    $isActive: false,
  },
})

const LocalAlert = cm.extend(Alert)`flex items-center justify-center text-sm text-center flex-1 text-xs`
