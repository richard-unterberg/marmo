import cm from '../../src'

const Element = cm.button<{ $active?: boolean }>`base-class`
const conditionalTag: 'div' | 'span' = Math.random() > 0.5 ? 'div' : 'span'

;<Element $_as="a" href="/settings" $active />
;<Element $_as="label" htmlFor="email" />
;<Element $_as="span" />
;<Element $_as={conditionalTag} $active />

// @ts-expect-error href is not valid for a span
;<Element $_as="span" href="/settings" />
// @ts-expect-error htmlFor is not valid for a div
;<Element $_as="div" htmlFor="email" />
