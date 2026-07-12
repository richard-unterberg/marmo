/** @jsxImportSource solid-js */
import { renderToString } from 'solid-js/web'

import ma from '../../src'

describe('ma.transform SSR (solid)', () => {
  it('server-renders a deterministic $_as element without private props', () => {
    const Alert = ma.div<{ $active?: boolean }>`base-class ${({ $active }) => $active && 'active-class'}`

    const markup = renderToString(() => <Alert $_as="span" $active data-kind="alert" />)

    expect(markup).toContain('<span')
    expect(markup).toContain('data-kind="alert"')
    expect(markup).toMatch(/class="base-class active-class\s*"/)
    expect(markup).not.toContain('$_as')
    expect(markup).not.toContain('$active')
  })
})
