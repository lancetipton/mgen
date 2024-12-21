import { loadEnvs } from '../../../scripts/loadEnvs'

const envs = loadEnvs()

const {
  MG_MG_CFG,
  MG_IDX_MD,
  MG_SERVE_DIR,
  MG_SERVE_CFG,
  MG_SITES_DIR,
  MG_NO_AUTO_IDX,
} = process.env


export const APIPort = envs[`MG_API_PORT`]

export const CfgExts = [
  `json`,
  `yaml`,
  `yml`,
]

export const MGIdxName = `index.mdx`

export const MGNoAutoIdx = MG_NO_AUTO_IDX || envs[`MG_NO_AUTO_IDX`]
export const MGIdxMarkdown = MG_IDX_MD || envs[`MG_IDX_MD`] || ``

export const MGCfgDir = `.mgen`
export const MGCfgName = `mgen.config`
export const MGCfgLoc = MG_MG_CFG || envs[`MG_MG_CFG`]
export const MGCfgFile = `configs/${MGCfgName}`
export const MGCfgFinalLoc = `${MGCfgDir}/${MGCfgName}.json`

export const ServeFinalLoc = `${MGCfgDir}/serve.json`
export const ServeCfgLoc = MG_SERVE_CFG || envs[`MG_SERVE_CFG`]
export const ServeCfgFile = `configs/serve.json`
export const ServeDir = MG_SERVE_DIR || envs[`MG_SERVE_DIR`]
export const SitesDir = MG_SITES_DIR || envs[`MG_SITES_DIR`] || `./sites`

const DefThemeColors = {}
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
