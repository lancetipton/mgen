import hq from 'alias-hq'
import path from 'node:path'
import { promises as fs } from 'node:fs'

const main = async () => {
  const mgen = hq.get(`webpack`)[`@mgen/mgen`]

  const fe = path.join(hq.get(`webpack`)[`@mgen/frontend`], `dist`)
  const mfe = path.join(mgen, `frontend`)
  await fs.rm(mfe, { force: true, recursive: true })
  await fs.cp(fe, mfe, { force: true, recursive: true })

  const be = path.join(hq.get(`webpack`)[`@mgen/backend`], `dist`)
  const mbe = path.join(mgen, `backend`)
  await fs.rm(mbe, { force: true, recursive: true })
  await fs.cp(be, mbe, { force: true, recursive: true })

  // Update repos/mgen dir to be published to package registry 

}

main()