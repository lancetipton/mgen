import hq from 'alias-hq'
import path from 'node:path'
import { promises as fs } from 'node:fs'
import { createRequire } from 'node:module'
import { noOp } from '@keg-hub/jsutils/noOp'

const paths = hq.get(`webpack`)
const mg = paths[`@mgen/mgen`]
const be = paths[`@mgen/backend`]
const fe = paths[`@mgen/frontend`]
const require = createRequire(import.meta.url)

const mgpack = {
  name: `mgen`,
  version: `0.1.0`,
  description: `Static markdown generated website`,
  main: `index.js`,
  author: `Lance Tipton`,
  license: `MIT`,
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
  },
  keywords: [],
  dependencies: {}
}

const mgsites = `#!/usr/bin/env node
import { setup } from './backend/setup.js'
setup()
`

const mgserver = `#!/usr/bin/env node
import { server } from './backend/server.js'
server()
`


const replace = async (from:string, to:string) => {
  //await fs.rm(to, { force: true, recursive: true })
  await fs.cp(from, to, { force: true, recursive: true })
}

const frontend = async () => {
  await replace(
    path.join(fe, `dist`),
    path.join(mg, `frontend`)
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


const dependencies = async () => {
  const bepack = require(path.join(be, `package.json`))

  const mgp = path.join(mg, `package.json`)
  const mgen = path.join(mg, `mgen.js`)
  const mgs = path.join(mg, `server.js`)

  mgpack.dependencies = {...mgpack?.dependencies, ...bepack.dependencies}
  await fs.writeFile(mgp, JSON.stringify(mgpack, null, 2))
  await fs.writeFile(mgen, mgsites)
  await fs.writeFile(mgs, mgserver)
}

const main = async () => {
  await backend()
  await frontend()
  await configs()
  await dependencies()
}

main()