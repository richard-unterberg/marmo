import type { DocsGraph } from '@unterberg/nivel'

export const docsGraph = {
  items: [
    {
      kind: 'section',
      id: 'marmo-docs',
      items: [
        {
          kind: 'group',
          id: 'jumpstart',
          title: 'Jumpstart',
          icon: 'Rocket',
          items: [
            {
              kind: 'page',
              id: 'gettingStarted',
              title: 'Getting Started',
              slug: 'get-started',
              source: 'gettingStarted.mdx',
              description: 'Getting started with marmo',
            },
            {
              kind: 'page',
              id: 'caseStudy',
              title: 'Case Study',
              slug: 'case-study',
              source: 'caseStudy.mdx',
              description: 'marmo case study',
            },
          ],
        },
        {
          kind: 'group',
          id: 'functions',
          title: 'Functions',
          icon: 'Calculator',
          items: [
            {
              kind: 'page',
              id: 'baseComposition',
              title: 'Base Composition',
              navTitle: 'Base Composition',
              slug: 'base-coposition',
              source: 'base.mdx',
              description: 'Base composition functions for marmo',
            },
            {
              kind: 'page',
              id: 'variants',
              navTitle: 'Variants',
              title: 'Advanced components with variants',
              slug: 'variants',
              source: 'variants.mdx',
              description: 'Advanced components with variants',
            },
            // transform.mdx
            {
              kind: 'page',
              id: 'transform',
              navTitle: 'Transform',
              title: 'Transform',
              slug: 'transform',
              source: 'transform.mdx',
              description: 'Render existing classmate component as another intrinsic element.',
            },
          ],
        },
      ],
    },
  ],
} satisfies DocsGraph
