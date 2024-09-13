import yaml from 'js-yaml'
import path from 'node:path'
import { tri } from '@keg-hub/jsutils/tri'
import { noOp } from '@keg-hub/jsutils/noOp'
import { deepMerge } from '@keg-hub/jsutils/deepMerge'
import { getMgCfgLoc, getSrvCfgLoc } from './paths.js'
import { readFileSync, writeFile, mkdir, existsSync } from 'node:fs'
import { CfgExts, MGCfgFinalLoc, ServeFinalLoc } from './constants.js'

export const createDir = (location) => mkdir(location, {recursive: true}, noOp)
export const loadJson = (location) => tri(() => JSON.parse(readFileSync(location, `utf8`))) || {}
export const writeJson = (location, data) => writeFile(location, JSON.stringify(data, null, 2), noOp)


export const loadCfgFile = (location, clean=location, error=true) => {

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


export const genMConfig = (dir, cfg) => {
  const config = loadDefMGCfg()
  const location = path.join(dir, MGCfgFinalLoc)
  const parsed = path.parse(location)
  createDir(parsed.dir)
  writeJson(location, deepMerge(config, cfg))

  return { location }
}


export const genSConfig = (dir) => {

  const defCfgLoc = getSrvCfgLoc()
  const defCfg = loadJson(defCfgLoc)

  const location = path.join(dir, ServeFinalLoc)
  const parsed = path.parse(location)
  createDir(parsed.dir)

  // Add code here to modify the serve config if needed

  writeJson(location, defCfg)

  return { location }
}
