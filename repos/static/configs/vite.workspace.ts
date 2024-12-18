import '../scripts/registerPaths'

import path from 'node:path'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import Pages from 'vite-plugin-pages'
import { loadConfig } from './mgen.config'
import react from '@vitejs/plugin-react-swc'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import { svgrComponent } from 'vite-plugin-svgr-component'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const rootDir = path.join(__dirname, `..`)
const { aliases, envs, port, environment } = loadConfig()

/**
 * Load from the local process.env
 * Then from deploy/values.yaml
 * Or default to `/`
 */
export const basePath = process.env.MG_BASE_PATH
  || envs[`process.env.MG_BASE_PATH`]
  || `/`

export const config = {
  root: rootDir,
  base: basePath,
  server: {
    port,
  },
  preview: {
    port,
  },
  optimizeDeps: {
    //include: [
    //  `rehype-autolink-headings`,
    //  `rehype-slug`,
    //  `remark-gfm`,
    //  `@mdx-js/rollup`
    //],
    esbuildOptions: {
      target: `esnext`,
      jsx: `automatic` as const,
      jsxDev: environment !== `production`,
    },
    entries: [`hoist-non-react-statics`],
  },
  resolve: {
    alias: aliases,
    extensions: [`.js`, `.jsx`, `.ts`, `.tsx`, `.md`, `.mdx`],
  },
  plugins: [
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    }),
    react(),
    viteTsconfigPaths({
      root: rootDir,
    }),
    svgrComponent({
      svgrOptions: {
        ref: true,
        icon: true,
        expandProps: true,
        dimensions: false,
      },
    }),
    Pages({
      extensions: [`md`, `mdx`], // Enable markdown and MDX pages
    }),
  ],
  build: {
    outDir: `dist`,
    minify: false,
    emptyOutDir: true,
  },
  define: {
    ...envs,
    [`process.env.MG_BASE_PATH`]: JSON.stringify(basePath)
  },
  clearScreen: false,
  test: {
    watch: false,
    environment: `jsdom`,
    setupFiles: `./scripts/setupTests.ts`,
  },
}
