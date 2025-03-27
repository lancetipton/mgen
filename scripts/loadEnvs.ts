import path from 'node:path'
import { homedir } from 'node:os'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { addToProcess } from './addToProcess'
import { loadConfigs } from '@keg-hub/parse-config'

const nodeEnv = process.env.NODE_ENV || `local`
const MG_REPO_ROOT_DIR = process.env.MG_REPO_ROOT_DIR
const MG_REPO_DEPLOY_DIR = process.env.MG_REPO_DEPLOY_DIR
  ? process.env.MG_REPO_DEPLOY_DIR
  : MG_REPO_ROOT_DIR && path.join(MG_REPO_ROOT_DIR, `deploy`)

export type TLoadEnvs = {
  name?: string
  env?: string
  force?: boolean
  noEnv?: boolean
  processAdd?: boolean
  locations?: string[]
}

const resolveLocs = () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const root = path.join(__dirname, `../`)
  const deploy = path.join(root, `deploy`)
  const values = path.join(deploy, `values.yaml`)
  const locations =  existsSync(values) ? [root, deploy] : []

  MG_REPO_ROOT_DIR && locations.push(MG_REPO_ROOT_DIR)
  MG_REPO_DEPLOY_DIR && locations.push(MG_REPO_DEPLOY_DIR)

  return locations
}


export const loadEnvs = (args: TLoadEnvs={}) => {
  const { force, processAdd, locations = [], env = nodeEnv, name = `mgen` } = args

  const locs = [
    ...locations,
    ...resolveLocs(),
    path.join(homedir(), `.config/mgen`),
  ]

  const envs = loadConfigs({
    env,
    name,
    locations: locs,
  })

  /*
   * Load the config files from `<root>/configs` directory, then add to the process.
   */
  processAdd !== false && addToProcess(envs, force)

  return envs
}
