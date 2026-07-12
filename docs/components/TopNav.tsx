import cm from '@classmatejs/react'
import { useDocsContext } from '@unterberg/nivel/client'
import { useMemo } from 'react'
import { usePageContext } from 'vike-react/usePageContext'
import { stripBasePath } from '../util/withBasePath'

type TopNavItem = {
  label: string
  isCta?: boolean
  pageId: string
}

const topBarNav = [
  {
    pageId: '/get-started',
    label: 'Get started',
    isCta: true,
  },
  {
    pageId: '/base-composition',
    label: 'Base',
  },
  {
    pageId: '/variants',
    label: 'Variants',
  },
  {
    pageId: '/extend',
    label: 'Extend',
  },
  {
    pageId: '/transform',
    label: 'Transform',
  },
] satisfies TopNavItem[]

const TopNav = () => {
  const docs = useDocsContext()
  const { urlPathname, urlParsed } = usePageContext()
  const _pagesById = useMemo(() => new Map(docs.pages.map((page) => [page.id, page])), [docs.pages])
  const _currentPathname = stripBasePath(urlPathname, docs.basePath)

  const isStartPage = urlParsed.pathname === '/'

  if (isStartPage) return null

  return (
    <StyledTopNav>
      {topBarNav.map(({ pageId, ...item }) => {
        const isActive = urlParsed.pathname.includes(pageId)

        return <TopNavItem key={pageId} {...item} href={pageId} isActive={isActive} />
      })}
    </StyledTopNav>
  )
}

const TopNavItem = (
  item: Omit<TopNavItem, 'activePathPrefix' | 'fallbackHref' | 'pageId'> & { href: string; isActive: boolean },
) => {
  return (
    <StyleTopNavItem $isActive={item.isActive} $isCta={item.isCta} href={item.href}>
      {item.label}
    </StyleTopNavItem>
  )
}

export default TopNav

const StyledTopNav = cm.nav`
  flex items-center justify-center 
  w-full 
  gap-1.5 xl:gap-3
`

const StyleTopNavItem = cm.a<{ $isActive: boolean; $isCta?: boolean }>`
  btn btn-sm tracking-tight
  text-xs xl:text-sm 
  ${({ $isActive }) => $isActive && 'btn-primary btn-soft'}
  ${({ $isCta, $isActive }) => !$isActive && $isCta && 'btn-primary btn-outline'}
`
