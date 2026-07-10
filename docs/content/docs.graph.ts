import type { DocsGraph } from '@unterberg/nivel'

export const docsGraph = {
  items: [
    {
      kind: 'section',
      id: 'docs',
      title: 'Docs',
      items: [
        {
          kind: 'page',
          id: 'gettingStarted',
          title: 'Getting Started',
          slug: 'getting-started',
          source: 'gettingStarted.mdx',
          description: 'Getting started with marmo',
        },
      ],
    },
  ],
} satisfies DocsGraph
