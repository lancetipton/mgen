import '../scripts/registerPaths'

import path from 'node:path'
import react from '@vitejs/plugin-react-swc'
import { loadConfig } from './mgen.config'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import { svgrComponent } from 'vite-plugin-svgr-component'

const rootDir = path.join(__dirname, '..')
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
    esbuildOptions: {
      target: `esnext`,
      jsx: `automatic` as const,
      jsxDev: environment !== `production`,
    },
    entries: [`hoist-non-react-statics`],
  },
  resolve: {
    alias: aliases,
  },
  plugins: [
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
    {
      name: `markdown-loader`,
      transform(code:string, id:string) {
        if (id.slice(-3) === `.md`)
          return `export default ${JSON.stringify(code)}`
      }
    },
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
