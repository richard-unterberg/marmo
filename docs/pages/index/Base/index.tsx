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
        rightCode={<CVACode />}
        rightCodeLabel="CVA"
        highlightCode={<ClassmateCode />}
        highlightCodeLabel="Classmate"
        hightlightBoxHeight={360}
        smallBoxHeight={300}
      />
    </LayoutComponent>
  )
}

export default BaseSection
