import type { TMGenCfg, TSrvOpt } from './types'

import yaml from 'js-yaml'
import path from 'node:path'
import { tri } from '@keg-hub/jsutils/tri'
import { noOp } from '@keg-hub/jsutils/noOp'
import { getMgCfgLoc, getSrvCfgLoc } from './paths'
import { deepMerge } from '@keg-hub/jsutils/deepMerge'
import { flatUnion } from '@keg-hub/jsutils/flatUnion'
import { readFileSync, writeFile, mkdir, existsSync } from 'node:fs'
import { CfgExts, MGCfgFinalLoc, ServeFinalLoc } from './constants'

export const createDir = (location:string) => mkdir(location, {recursive: true}, noOp)
export const loadFile = (location:string):string => tri(() => readFileSync(location, `utf8`)) || ``
export const loadJson = (location:string) => tri(() => JSON.parse(readFileSync(location, `utf8`))) || {}
export const writeJson = (location:string, data:Record<any, any>) => writeFile(location, JSON.stringify(data, null, 2), noOp)


export const loadCfgFile = (location:string, clean:string=location, error=true) => {

  if(location.endsWith(`.json`)){
    try {
      return JSON.parse(readFileSync(location, `utf8`))
    }
    catch(err){
      if(!error) return undefined

      throw new Error([
        `Error loading config at location: ${clean}`,
        err.message
      ].join('\n'))
    }
  }

  try {
    return yaml.load(readFileSync(location, `utf8`))
  }
  catch(err){
    if(!error) return undefined

    throw new Error([
      `Error loading config at location: ${clean}`,
      err.message
    ].join('\n'))
  }

}

const loadDefMGCfg = () => {
  const location = getMgCfgLoc()
  const parsed = path.parse(location)
  const ext = CfgExts.find(ext => parsed.ext.endsWith(ext))
  if(ext) return loadCfgFile(`${location}.${ext}`, location)

  return CfgExts.reduce((loaded, ext) => {
    if(!loaded){
      const loc = `${location}.${ext}`
      if(existsSync(loc)) return loadCfgFile(loc, location)
    }

    return loaded
  }, undefined)

}

const writeSiteCfgs = (mCfgDir:string, original:TMGenCfg, merged:TMGenCfg) => {
  if(!merged.sites) return

  const osites = Object.keys(original?.sites || {})
  
  Object.entries(merged.sites)
    .forEach(([name, cfg]) => {
      if(osites.includes(name)) return
      const siteCfgLoc = path.join(mCfgDir, `${name}.json`)
      writeJson(siteCfgLoc, cfg)
    })
  
  return {
    ...merged,
    sites: original?.sites
  }
}

const mergeSrvConfigs = (srcCfg:Record<string, any>, cfg:TMGenCfg) => {
   return Object.entries(cfg.sites)
    .reduce((acc, [name, sCfg]) => {

      if(!sCfg?.server) return acc


      const copy = {...acc}

      if(sCfg.server?.unlisted?.length)
        copy.unlisted = flatUnion<string>(copy.unlisted, sCfg.server.unlisted)

      if(sCfg.server?.redirects?.length)
        copy.redirects = flatUnion<TSrvOpt>(
          copy.redirects,
          sCfg.server.redirects,
          (it:TSrvOpt) => it.source
        )

      if(sCfg.server?.rewrites?.length)
        copy.rewrites = flatUnion(
          copy.rewrites,
          sCfg.server.rewrites,
          (it:TSrvOpt) => it.source
        )

      return copy
    }, srcCfg)
}


const cleanSitesConfigs = (cfg:TMGenCfg) => {
  return {
    ...cfg,
   sites: Object.entries(cfg.sites)
    .reduce((acc, [name, sCfg]) => {
      const {server, ...rest} = sCfg
      acc[name] = rest
      return acc
    }, {})
  }
}


export const genMConfig = (dir:string, cfg:TMGenCfg) => {

  const config = loadDefMGCfg()
  const clean = cleanSitesConfigs(cfg)

  const location = path.join(dir, MGCfgFinalLoc)
  const parsed = path.parse(location)

  const mcfg = writeSiteCfgs(parsed.dir, config, deepMerge(config, clean))

  writeJson(location, mcfg)

  return { location }
}



export const genSConfig = (dir:string, cfg:TMGenCfg) => {

  const defCfgLoc = getSrvCfgLoc()
  const defCfg = loadJson(defCfgLoc)

  const location = path.join(dir, ServeFinalLoc)
  const parsed = path.parse(location)
  createDir(parsed.dir)

  const merged = mergeSrvConfigs(defCfg, cfg)
  writeJson(location, merged)

  return location
}
