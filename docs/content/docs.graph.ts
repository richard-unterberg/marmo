import type { DocsGraph } from '@unterberg/nivel'

export const docsGraph = {
  items: [
    {
      kind: 'section',
      id: 'marmo-docs',
      title: 'marmo',
      items: [
        {
          kind: 'group',
          id: 'Docs',
          title: 'Docs Graph',
          collapsible: {
            isDefaultOpen: true,
          },
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
    },
  ],
} satisfies DocsGraph
