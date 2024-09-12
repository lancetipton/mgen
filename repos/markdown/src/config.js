import path from 'node:path'
import { getSrvCfgLoc } from './paths.js'
import { tri } from '@keg-hub/jsutils/tri'
import { noOp } from '@keg-hub/jsutils/noOp'
import { MConfigFile, SConfigFile } from './constants.js'
import { readFileSync, writeFile, mkdir } from 'node:fs'

export const createDir = (location) => mkdir(location, {recursive: true}, noOp)
export const loadJson = (location) => tri(() => JSON.parse(readFileSync(location, `utf8`))) || {}
export const writeJson = (location, data) => writeFile(location, JSON.stringify(data, null, 2), noOp)

export const loadSiteCfg = (location, clean) => {
  try {
    return JSON.parse(readFileSync(location, `utf8`))
  }
  catch(err){
    throw new Error([
      `Error loading site config at location: ${clean}`,
      err.message
    ].join('\n'))
  }
}

export const genMConfig = (dir, cfg) => {

  const location = path.join(dir, MConfigFile)
  const parsed = path.parse(location)
  createDir(parsed.dir)
  writeJson(location, cfg)

  return { location }
}


export const genSConfig = (dir) => {

  const defCfgLoc = getSrvCfgLoc()
  const defCfg = loadJson(defCfgLoc)

  const location = path.join(dir, SConfigFile)
  const parsed = path.parse(location)
  createDir(parsed.dir)

  // Add code here to modify the serve config if needed

  writeJson(location, defCfg)

  return { location }
}
