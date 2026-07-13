import { MetaHead } from '@unterberg/nivel/client'
import { withDocsBasePath } from '../util/withBasePath'

export const Head = () => {
  return (
    <>
      <MetaHead />
      <link rel="manifest" href={withDocsBasePath('/site.webmanifest', import.meta.env.BASE_URL)} />
    </>
  )
}
