import hq from 'alias-hq'
import path from 'node:path'
import { promises as fs } from 'node:fs'
import { setup } from '@mgen/backend/src/setup'

const main = async () => {
  const { sites:from } = await setup()
  const to = path.join(hq.get(`webpack`)[`@mgen/frontend`], `public/sites`)

  await fs.rm(to, { force: true, recursive: true })
  await fs.cp(from, to, { force: true, recursive: true })
}

main()
