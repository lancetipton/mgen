import { loadEnvs } from '../scripts/loadEnvs.js'

const envs = loadEnvs()

export const APIPort = envs[`MG_API_PORT`]

export const CfgExts = [
  `json`,
  `yaml`,
  `yml`,
]

export const MGIdxName = `index.mdx`

export const MGNoAutoIdx = envs[`MG_NO_AUTO_IDX`]
export const MGIdxMarkdown = envs[`MG_IDX_MD`] || ``

export const MGCfgName = `mgen.config`
export const MGCfgLoc = envs[`MG_MG_CFG`]
export const MGCfgFile = `configs/${MGCfgName}`
export const MGCfgFinalLoc = `.mgen/${MGCfgName}.json`

export const ServeFinalLoc = `.mgen/serve.json`
export const ServeCfgLoc = envs[`MG_SERVE_CFG`]
export const ServeCfgFile = `configs/serve.json`


export const SitesDir = envs[`MG_SITES_DIR`] || `./sites`

