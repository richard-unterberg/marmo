import { LayoutComponent } from '@unterberg/nivel'
import CodePresenter from '../../../components/CodePresenter'
import ClassmateCode from './classmate.mdx'
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
        highlightCode={<ClassmateCode />}
        highlightCodeLabel="Classmate"
        highlightCodeRepoLink="docs/pages/index/Base/classmate.mdx"
        hightlightBoxHeight={360}
        smallBoxHeight={300}
      />
    </LayoutComponent>
  )
}

export default BaseSection
