import path from 'node:path'
import { defineConfig } from 'tsup'
import { fileURLToPath } from 'url'
import packcfg from '../package.json'
import { promises as fs } from 'node:fs'


const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.join(dirname, `..`)
const outdir = path.join(rootDir, `dist`)

const fileIO = [
  `index`,
  `server`,
  `setup`,
]

const cleanup = async () => {
  return Promise.all(fileIO.map(async (name) => {
    const outfile = path.join(rootDir, `dist/${name}.js`)
    await fs.rm(outfile, { recursive: true, force: true })
    await fs.rm(`${outfile}.map`, { recursive: true, force: true })
  }))
}

export default defineConfig(async () => {
  await cleanup()

  return {
    name: `mgen`,
    outDir: outdir,
    format: [`esm`],
    sourcemap: true,
    splitting: false,
    entry: fileIO.map(name => path.join(rootDir, `src/${name}.ts`)),
    esbuildOptions:(options, context) => {
      options && (
        options.external = [
          ...(Object.keys(packcfg.dependencies || {})),
          // @ts-ignore
          ...(Object.keys(packcfg.devDependencies || {})),
        ]
      )
    }
  }
})