import os from 'node:os'
import hq from 'alias-hq'
import path from 'node:path'
import { existsSync } from 'node:fs'
import { ife } from '@keg-hub/jsutils/ife'
import { execSync } from "node:child_process"
import {
  MGCfgLoc,
  SitesDir,
  ServeDir,
  MGCfgFile,
  ServeCfgLoc,
  ServeCfgFile,
} from './constants'

const homedir = os.homedir()

let rootLoc = undefined
const hqw = hq.get(`webpack`)

const resolveLoc = (loc:string, exists=true) => {
  const root = getRootLoc()

  const resolved = loc.startsWith(`~/`)
    ? path.join(homedir, loc.replace(`~/`, ``))
    : loc.startsWith(`/`)
      ? loc
      : path.join(root, loc)

  return exists
    ? existsSync(resolved) ? resolved : undefined
    : resolved

}

export const getRootLoc = () => {

  if(!rootLoc){
    const caller = process.argv[1]
    rootLoc = caller.includes(hqw[`@mgen/backend`])
      ? hqw[`@mgen/backend`]
      : hqw[`@mgen/root`]
  }

  return rootLoc
}

const findBin = () => {
  const root = getRootLoc()
  const mgs = [ `pnpm`, `npm`, `bun`, `deno`, `yarn` ]

  for(let idx in mgs){
    try {
      const bin = execSync(`${mgs[idx]} bin`, { cwd: root }).toString()
      return bin.trim()
    }
    catch(err){}
  }

}


export const getBinLoc = () => {
  const root = getRootLoc()
  const found = findBin()
  if(found) return found

  const bin = path.join(root, `node_modules/.bin`)
  return existsSync(bin)
    ? bin
    : ife(() => {throw new Error(`Could not find node_modules bin folder`)})
}

export const getSitesLoc = (loc?:string) => {
  const args = process.argv.slice(2)
  let sitesDir = loc || args.pop() || process.env.MG_SITES_DIR
  if(!sitesDir){
    console.warn(`Sites directory not set, using default => ${SitesDir}`)
    sitesDir = SitesDir
  }

  return resolveLoc(sitesDir)
}

export const getServeLoc = () => {
  if(ServeDir) return resolveLoc(ServeDir)
  return getRootLoc()
}

export const getSrvCfgLoc = () => {
  return ServeCfgLoc
    ? resolveLoc(ServeCfgLoc)
    : path.join(hqw[`@mgen/backend`], ServeCfgFile)
}

export const getMgCfgLoc = () => {
  return MGCfgLoc
    ? resolveLoc(MGCfgLoc, false)
    : path.join(hqw[`@mgen/backend`], MGCfgFile)
}
