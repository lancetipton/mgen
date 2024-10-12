import type { TSiteSearch } from './types'

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

export const MGCfgDir = `.mgen`
export const MGCfgName = `mgen.config`
export const MGCfgLoc = envs[`MG_MG_CFG`]
export const MGCfgFile = `configs/${MGCfgName}`
export const MGCfgFinalLoc = `${MGCfgDir}/${MGCfgName}.json`

export const ServeFinalLoc = `${MGCfgDir}/serve.json`
export const ServeCfgLoc = envs[`MG_SERVE_CFG`]
export const ServeCfgFile = `configs/serve.json`


export const SitesDir = envs[`MG_SITES_DIR`] || `./sites`

const DefThemeColors = {

}
export const DefSiteTheme = {
  font: {
    size: 14,
    family: `ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji`,
  },
  logo: {
    size: 120,
    radius: 30,
    width: 100,
    height: 100,
    background: `#4444BB`,
    foreground: `#FFFFFF`,
  },
  light: {...DefThemeColors},
  dark: {...DefThemeColors},
}


export const DefSiteSearch:TSiteSearch = {
  preset: `match`,
  //tokenize: `forward`,
  cache: 100,
  tokenize: `full`,
  document: {
    id: `id`,
    store: [`content`],
    index: [`location`, `content`],
  },
  context: {
    depth: 2,
    resolution: 9,
    bidirectional: true
  }
  //tokenize: `forward`,
  //document: {
  //  id: `id`,
  //  store: true,
  //  index: `content`
  //}
}