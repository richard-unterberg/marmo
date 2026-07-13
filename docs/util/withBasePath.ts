export const normalizePathname = (value: string) => {
  const pathname = value.split('?')[0]?.split('#')[0] ?? value
  const normalized = `/${pathname}`.replace(/\/+/g, '/').replace(/\/+$/g, '')

  return normalized === '' ? '/' : `${normalized}/`
}

export const stripBasePath = (pathname: string, basePath: string) => {
  const normalizedPathname = normalizePathname(pathname)
  const normalizedBasePath = normalizePathname(basePath)

  if (normalizedBasePath === '/') {
    return normalizedPathname
  }

  if (normalizedPathname === normalizedBasePath) {
    return '/'
  }

  return normalizedPathname.startsWith(normalizedBasePath)
    ? `/${normalizedPathname.slice(normalizedBasePath.length)}`
    : normalizedPathname
}

export const withDocsBasePath = (href: string, basePath: string) => {
  if (!href.startsWith('/') || href.startsWith('//')) {
    return href
  }

  const suffixIndex = href.search(/[?#]/)
  const pathname = suffixIndex === -1 ? href : href.slice(0, suffixIndex)
  const suffix = suffixIndex === -1 ? '' : href.slice(suffixIndex)
  const hasTrailingSlash = pathname.endsWith('/')
  const collapsedPathname = `/${pathname}`.replace(/\/+/g, '/').replace(/\/+$/g, '')
  const normalizedHref = collapsedPathname === '' ? '/' : `${collapsedPathname}${hasTrailingSlash ? '/' : ''}`
  const normalizedBasePath = normalizePathname(basePath)

  if (normalizedBasePath === '/') {
    return `${normalizedHref}${suffix}`
  }

  const baseWithoutTrailingSlash = normalizedBasePath.replace(/\/$/g, '')
  if (normalizedHref === baseWithoutTrailingSlash || normalizedHref.startsWith(normalizedBasePath)) {
    return `${normalizedHref}${suffix}`
  }

  return `${baseWithoutTrailingSlash}${normalizedHref}${suffix}`
}
