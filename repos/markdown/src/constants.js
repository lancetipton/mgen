import { loadEnvs } from '../scripts/loadEnvs.js'

const envs = loadEnvs()

export const APIPort = envs[`MG_API_PORT`]
export const MConfigFile = `.mgen/mgen.config.json`

export const SiteCfgFile = `site.config.json`
export const SConfigFile = `.mgen/serve.json`
export const ServeCfgLoc = envs[`MG_SERVE_CFG`]
export const ServeCfgFile = `configs/serve.json`


export const SitesDir = envs[`MG_SITES_DIR`] || `./sites`
