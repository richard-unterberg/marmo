import { LayoutComponent } from '@unterberg/nivel'
import CodePresenter from '../../../components/CodePresenter'
import MarmoCode from './marmo.mdx'
import CVACode from './cva.mdx'
import NativeCode from './native.mdx'

const BaseSection = () => {
  return (
    <LayoutComponent $size="xl" className="mt-0">
      <CodePresenter
        leftCode={<NativeCode />}
        leftCodeLabel="Native"
        leftCodeRepoLink="docs/pages/index/Base/native.mdx"
        rightCode={<CVACode />}
        rightCodeLabel="CVA"
        rightCodeRepoLink="docs/pages/index/Base/cva.mdx"
        highlightCode={<MarmoCode />}
        highlightCodeLabel="Marmo"
        highlightCodeRepoLink="docs/pages/index/Base/marmo.mdx"
        hightlightBoxHeight={360}
        smallBoxHeight={300}
      />
    </LayoutComponent>
  )
}

export default BaseSection
