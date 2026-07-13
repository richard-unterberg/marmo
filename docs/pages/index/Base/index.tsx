import { LayoutComponent } from '@unterberg/nivel'
import CodePresenter from '../../../components/CodePresenter'
import ClsxCode from './clsx.mdx'
import MarmoCode from './marmo.mdx'
import NativeCode from './native.mdx'

const BaseSection = () => {
  return (
    <LayoutComponent $size="xl" className="mt-0">
      <CodePresenter
        leftCode={<NativeCode />}
        leftCodeLabel="Native"
        rightCode={<ClsxCode />}
        rightCodeLabel="clsx"
        highlightCode={<MarmoCode />}
        highlightCodeLabel="Marmo"
        hightlightBoxHeight={360}
        smallBoxHeight={300}
      />
    </LayoutComponent>
  )
}

export default BaseSection
