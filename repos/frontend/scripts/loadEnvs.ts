import hq from 'alias-hq'
import path from 'node:path'
import { homedir } from 'node:os'
import { addToProcess } from './addToProcess'
import { loadConfigs } from '@keg-hub/parse-config'



const { NODE_ENV, MG_REPO_ROOT_DIR, MG_REPO_DEPLOY_DIR } = process.env

const nodeEnv = NODE_ENV || `local`

export type TLoadEnvs = {
  name?: string
  env?: string
  force?: boolean
  noEnv?: boolean
  processAdd?: boolean
  locations?: string[]
}

export const loadEnvs = (args: TLoadEnvs) => {
  const { force, processAdd, locations = [], env = nodeEnv, name = `mgen` } = args

  const envs = loadConfigs({
    env,
    name,
    locations: [
      ...locations,
      /*
       * Use `webpack` because it returns the full resolved path un-modified
       * Allows searching for envs form the repo root directory
       * **NOT** the `repos/backend` directory
       * This allows loading the `<root>/container/value.yml` file
       */
      MG_REPO_ROOT_DIR || hq.get(`webpack`)[`@mgen/root`],
      MG_REPO_DEPLOY_DIR || hq.get(`webpack`)[`@mgen/deploy`],
      path.join(homedir(), `.config/mgen`),
    ],
  })

  /*
   * Load the config files from `<root>/configs` directory, then add to the process.
   */
  processAdd !== false && addToProcess(envs, force)

  return envs
}
