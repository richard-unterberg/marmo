import type { DocsConfig } from '@unterberg/nivel'
import { docsGraph } from '../content/docs.graph'

const docsConfig = {
  graph: docsGraph,
  siteTitle: 'Polished class composition for React and SolidJS | Marmo',
  siteDescription: 'Shape class names into typed components.',
  siteUrl: 'https://richard-unterberg.github.io/marmo',
  robots: true,
  // Set customFonts to false if you want to fully own font loading in consumer CSS.
  customFonts: false,
  basePath: '/',
  contentDir: 'content',
  theme: {
    dark: 'marmo-dark',
    light: 'marmo-light',
  },
  social: {
    github: 'https://github.com/richard-unterberg/marmo',
    editLinkBranch: 'master',
  },
  topBarNav: {
    components: ['../components/TopNav'],
  },
  brand: {
    text: 'Marmo',
    logoLight: 'marmo-dark.svg',
    logoDark: 'marmo-light.svg',
    href: '/',
  },

  footer: {
    pagination: true,
  },
  head: {
    faviconSvg: 'favicon.svg',
    faviconIco: 'favicon.ico',
    appleTouchIcon: 'apple-touch-icon.png',
  },
} satisfies DocsConfig

export default docsConfig
