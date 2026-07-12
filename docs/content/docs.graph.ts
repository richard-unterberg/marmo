import type { DocsGraph } from '@unterberg/nivel'

export const docsGraph = {
  items: [
    {
      kind: 'section',
      id: 'marmo-docs',
      items: [
        {
          kind: 'group',
          id: 'get-started',
          title: 'Get Started',
          icon: 'Rocket',
          items: [
            {
              kind: 'page',
              id: 'get-started',
              title: 'Install & Quick Start',
              slug: 'get-started',
              source: 'gettingStarted.mdx',
              description: 'Getting started with marmo',
            },
          ],
        },
        {
          kind: 'group',
          id: 'api',
          title: 'API',
          icon: 'Calculator',
          items: [
            {
              kind: 'page',
              id: 'baseComposition',
              title: 'Base Composition',
              navTitle: 'Base Composition',
              slug: 'base-composition',
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
            {
              kind: 'page',
              id: 'extend',
              navTitle: 'Extend',
              title: 'Extend',
              slug: 'extend',
              source: 'extend.mdx',
              description: 'Build a Marmo component on top of an existing component.',
            },
            // transform.mdx
            {
              kind: 'page',
              id: 'transform',
              navTitle: 'Transform',
              title: 'Transform',
              slug: 'transform',
              source: 'transform.mdx',
              description: 'Render existing marmo component as another intrinsic element.',
            },
          ],
        },
        {
          kind: 'group',
          id: 'utils',
          title: 'Utils',
          icon: 'Wrench',
          items: [
            {
              kind: 'page',
              id: 'style',
              navTitle: 'Compose Inline Styles',
              title: 'Style composition with `.style()`',
              slug: 'style',
              source: 'style.mdx',
              description: 'Add style to your Marmo component.',
            },
            {
              kind: 'page',
              id: 'logic',
              navTitle: 'Logic Headers',
              title: 'Logic composition with `.logic()`',
              slug: 'logic',
              source: 'logic.mdx',
              description: 'Add logic to your Marmo component.',
            },
            {
              kind: 'page',
              id: 'useMarmoCreateMarmo',
              navTitle: 'Usage in Components',
              title: 'Usage in Components',
              slug: 'use-marmo-create-marmo',
              source: 'useMarmoCreateMarmo.mdx',
              description: 'Add logic to your Marmo component.',
            },
          ],
        },
      ],
    },
  ],
} satisfies DocsGraph
