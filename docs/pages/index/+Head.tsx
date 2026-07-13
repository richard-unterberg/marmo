import { withDocsBasePath } from '../../util/withBasePath'

export const Head = () => (
  <link
    rel="preload"
    as="image"
    type="image/avif"
    href={withDocsBasePath('/bg/bg-light-strong.avif', import.meta.env.BASE_URL)}
    fetchPriority="high"
  />
)
