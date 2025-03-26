import type { TMGenCfg, TSiteConfig, TDirConfig } from './types'

import { fdir } from 'fdir'
import path from 'node:path'
import { existsSync } from 'node:fs'
import { loadCfgFile } from './config'
import { deepMerge } from '@keg-hub/jsutils/deepMerge'
import { locToTitle, cleanUrl, titleText } from './utils'
import {
  MGIdxName,
  MGCfgName,
  MGDirCfgName,
  DefSiteTheme,
  MGCfgFinalLoc,
  ServeFinalLoc,
} from './constants'

type TDirConfigs = Record<string, TDirConfig>

type TParsed = path.ParsedPath & {
  siteDir:string
  siteRoot?:boolean
}


const configFiles = [
  MGCfgFinalLoc,
  ServeFinalLoc,
]
const ignoreFiles = [
  MGCfgName,
  MGDirCfgName,
  `site.webmanifest`,
]


const emptySite = ():Partial<TSiteConfig> => ({
  nav: {},
  logo: {},
  pages: {},
  sitemap: {},
})

const rootSite = ():TSiteConfig => ({
  nav: {},
  dir: ``,
  logo: {},
  pages: {},
  toc: {
    disabled:false,
    exclude: [`heading1`],
  },
  name: `MGen`,
  theme: {...DefSiteTheme},
  sitemap: {
    [`/`]: MGIdxName,
  },
})

const parse = (location:string) => {
  const parsed = path.parse(location)
  if(parsed.dir === `/`) return parsed as TParsed
  
  const split = parsed.dir.split(`/`)

  return {
    ...parsed,
    siteDir: split[1],
    siteRoot: split.length <= 2
  } as TParsed
}

const buildItem = (
  siteCfg:Partial<TSiteConfig>,
  dirCfg:TDirConfig,
  location:string,
  parsed:TParsed
) => {

  if(parsed.name === `index` && parsed.siteRoot){
    siteCfg.nav = {
      config: dirCfg,
      path: location,
      url: cleanUrl(parsed.dir),
      text: titleText(parsed.siteDir),
      ...siteCfg.nav,
    }
    return
  }

  const split = location.split(`/`)
  split.shift()

  let current = siteCfg.nav
  current.children = current.children || {}


  const toExclude = [
    ...(dirCfg?.exclude || []),
    ...ignoreFiles
  ]

  split.forEach((part, idx) => {
    // Nav starts at the site root directory, so skip it
    // Check the idx incase a sub-folder is same name as site dir
    if(!idx && part === parsed.siteDir) return

    // Don't add config files
    if(toExclude.includes(parsed.name)) return

    // If on the last item, add it to the currents children
    if(idx === split.length - 1){
      if(parsed.name === `index`){
        current.url = parsed.dir
        current.path = location
        current.text = locToTitle(parsed.dir)
        return
      }

      current.children = {
        ...current.children,
        [parsed.name]: {
          dir: parsed.dir,
          path: location,
          text: titleText(parsed.name),
          url: `${cleanUrl(parsed.dir)}/${cleanUrl(parsed.name)}`,
        }
      }

      return
    }

    // If the part already exists, then set to to current
    if(current?.children?.[part]) return (current = current?.children?.[part])
    
    // If the part does not exist, then create it
    current.children[part] = {
      dir: part,
      children: {},
      config: dirCfg,
      text: titleText(part),
    }
    current = current.children[part]

  })
}

const getDirConfig = (parent:string, dir:string):TDirConfig => {
  const mjson = path.join(parent, dir, `${MGDirCfgName}.json`)
  const myaml = path.join(parent, dir, `${MGDirCfgName}.yaml`)

  if(existsSync(mjson)) return loadCfgFile(mjson)
  else if(existsSync(myaml)) return loadCfgFile(myaml)
  else return {} as TDirConfig

}

const buildPaths = (dir:string, dirCfgs:TDirConfigs) => (acc:TMGenCfg, file:string) => {

  if(configFiles.find(cfg => file.endsWith(cfg))) return acc

  const clean = file.replace(dir, '')
  const parsed = parse(clean)

  if(parsed.name.startsWith(MGCfgName) && parsed.siteRoot){
    const siteCfg = loadCfgFile(file, clean)
    siteCfg.dir = parsed.siteDir
    acc.sites[parsed.siteDir] = deepMerge(siteCfg, acc.sites?.[parsed.siteDir] || emptySite())

    return acc
  }

  const isSitesRoot = parsed.dir === `/`
  if(isSitesRoot){
    acc.sites.__default.sitemap[`/${parsed.name}`] = clean
    if(parsed.name === `index`) acc.sites.__default.sitemap[parsed.dir] = clean

    return acc
  }

  const siteCfg = acc.sites?.[parsed.siteDir] || emptySite()

  const cleanDir = cleanUrl(parsed.dir)
  siteCfg.sitemap[clean] = clean
  siteCfg.sitemap[`${cleanDir}/${cleanUrl(parsed.name)}`] = clean


  if(parsed.name === `index`){
    siteCfg.sitemap[cleanDir] = clean
    siteCfg.sitemap[`${cleanDir}/`] = clean
  }

  dirCfgs[parsed.dir] = dirCfgs[parsed.dir] || getDirConfig(dir, parsed.dir)

  buildItem(
    siteCfg,
    dirCfgs[parsed.dir],
    clean,
    parsed
  )

  acc.sites[parsed.siteDir] = siteCfg as TSiteConfig

  return acc
}


export const crawl = (dir:string) => {
  return new fdir()
    .withFullPaths()
    .crawl(dir)
    .sync()
    .reduce(buildPaths(dir, {} as TDirConfigs), {
      sitesType: undefined,
      sites: { __default: rootSite() }
    })
}