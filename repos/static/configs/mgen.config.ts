import path from 'node:path'
import { version } from '../package.json'
import { loadEnvs } from '../scripts/loadEnvs'

const rootDir = path.join(__dirname, '..')
const nodeEnv = process.env.NODE_ENV || `local`
const overrideEnvs = process.env.MG_OVERRIDE_ENVS ?? process.env.FE_OVERRIDE_ENVS
const envOverride = Boolean(overrideEnvs || nodeEnv === `local`)

type TFECfg = {
  port: string | number
  environment: string
  envs: Record<string, string>
  aliases: Record<string, string>
}

export const loadConfig = () => {
  /*
   * Load the configuration files from the root `configs` directory, and then add them to the process.
   */
  loadEnvs({ env: nodeEnv, force: envOverride })

  const envs = Object.entries(process.env).reduce(
    (acc, [key, value]) => {
      if (!key.startsWith(`MG_`) || value === '') return acc
      acc[`process.env.${key}`] = JSON.stringify(value)
      return acc
    },
    {} as Record<string, string>
  )

  const aliases = {
    [`@keg-hub/jsutils`]: path.join(rootDir, `node_modules/@keg-hub/jsutils/build/esm`),
  } as Record<string, string>

  return {
    aliases,
    environment: nodeEnv,
    port: parseInt(process.env.MG_PORT || `3005`, 10),
    envs: {
      [`process.env.NODE_ENV`]: JSON.stringify(process.env.NODE_ENV),
      [`process.env.MG_APP_VERSION`]: JSON.stringify(process.env.MG_APP_VERSION || version),
      ...envs,
      /**
       * **IMPORTANT** - Must come last, otherwise it will override the other envs
       * Only need in non-local environment due to how assets are served locally
       */
      ...(envOverride ? {} : { [`process.env`]: {} }),
    } as Record<string, string | Record<string, string>>,
  } as TFECfg
}
