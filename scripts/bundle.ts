import hq from 'alias-hq'
import path from 'node:path'
import { promises as fs } from 'node:fs'
import { createRequire } from 'node:module'

const paths = hq.get(`webpack`)
const mg = paths[`@mgen/mgen`]
const root = paths[`@mgen/root`]
const be = paths[`@mgen/backend`]
const fe = paths[`@mgen/frontend`]
const require = createRequire(import.meta.url)
const rtpack = require(path.join(root, `package.json`))

const mgpack = {
  name: `@ltipton/mgen`,
  type: `module`,
  main: `index.js`,
  author: rtpack.author,
  license: rtpack.license,
  version: rtpack.version,
  description: rtpack.description,
  bugs: {
    url: `https://github.com/lancetipton/mgen/issues`
  },
  homepage: `https://github.com/lancetipton/mgen`,
  publishConfig: {
    access: `public`
  },
  bin: {
    mgen: `mgen.js`
  },
  scripts: {
    mgen: `MG_SITES_DIR=$(echo \"$PWD/frontend/sites\") node ./mgen.js`,
    serve: `MG_REPO_ROOT_DIR=\"$(dirname $(dirname $PWD))\" MG_SERVE_DIR=$(echo \"$PWD/frontend\") MG_SITES_DIR=$(echo \"$PWD/frontend/sites\") node ./server.js`
  },
  keywords: [],
  dependencies: {
    [`fdir`]: `6.3.0`,
    [`rimraf`]: `^6.0.1`,
    [`js-yaml`]: `4.1.0`,
    [`marked`]: `14.1.2`,
    [`flexsearch`]: `0.7.43`,
    [`cross-zip-cli`]: `^1.0.0`,
    [`move-file-cli`]: `^3.0.0`,
  },
  devDependencies: {
    [`simple-git-hooks`]: `^2.11.1`
  },
  [`simple-git-hooks`]: {
    [`pre-commit`]: `pnpm zip`,
    [`preserveUnused`]: true
  }
}

const mjs = `export * from './backend/index.js'
`

const mgsites = `#!/usr/bin/env node
import { setup } from './backend/setup.js'
setup()
`

const mgserver = `#!/usr/bin/env node
import { server } from './backend/server.js'
server()
`

const workspace = `packages:
  - '.'
`

const cleanup = async () => {
  await fs.rm(mg, { recursive: true, force: true })
  await fs.mkdir(mg, { recursive: true })
}

const replace = async (from:string, to:string) => {
  await fs.cp(from, to, { force: true, recursive: true })
}

const frontend = async () => {
  await replace(
    path.join(fe, `dist`),
    path.join(mg, `frontend`)
  )
  await replace(
    path.join(mg, `frontend/index.html`),
    path.join(mg, `frontend/404.html`)
  )
  await replace(
    path.join(mg, `configs/serve.json`),
    path.join(mg, `frontend/sites/.mgen/serve.json`)
  )
}


const backend = async () => {
  await replace(
    path.join(be, `dist`),
    path.join(mg, `backend`)
  )
}


const configs = async () => {
  await replace(
    path.join(be, `configs`),
    path.join(mg, `configs`)
  )
}


const extra = async () => {
  const files = [
    `Dockerfile`,
    `.npmrc`,
    `.gitignore`,
    `.dockerignore`,
  ]

  return await Promise.all(
    files.map(async (file) => {
      await replace(
        path.join(root, file),
        path.join(mg, file),
      )
    })
  )
}


const dependencies = async () => {
  const bepack = require(path.join(be, `package.json`))

  const mgen = path.join(mg, `mgen.js`)
  const mgm = path.join(mg, `index.js`)
  const mgs = path.join(mg, `server.js`)
  const mgp = path.join(mg, `package.json`)
  const mgw = path.join(mg, `pnpm-workspace.yaml`)

  mgpack.dependencies = {
    ...mgpack?.dependencies,
    ...bepack.dependencies,
  }
  await fs.writeFile(mgp, JSON.stringify(mgpack, null, 2))
  await fs.writeFile(mgm, mjs)
  await fs.writeFile(mgen, mgsites)
  await fs.writeFile(mgs, mgserver)
  await fs.writeFile(mgw, workspace)
}

const main = async () => {
  await cleanup()
  await backend()
  await configs()
  await frontend()
  await extra()
  await dependencies()
}

main()