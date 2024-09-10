import os from 'node:os'
import path from 'node:path'
import * as url from 'node:url'
import { existsSync } from 'node:fs'
import { ife } from '@keg-hub/jsutils/ife'
import { execSync } from "node:child_process"
import { ServeCfgFile, ServeCfgLoc, SitesDir } from './constants.js'

const homedir = os.homedir()

let rootLoc = undefined

const resolveLoc = (loc, rootDir=undefined) => {
  const root = rootDir || getRootLoc()
  const resolved = loc.startsWith(`~/`)
    ? path.join(homedir, loc.replace(`~/`, ``))
    : loc.startsWith(`/`)
      ? loc
      : path.join(root, loc)

  return existsSync(resolved) ? resolved : undefined
}

export const getRootLoc = () => {
  if(rootLoc) return rootLoc

  const dirname = url.fileURLToPath(new URL('.', import.meta.url))
  rootLoc = path.join(dirname, '..')

  return rootLoc
}

export const getBinLoc = () => {
  const root = getRootLoc()

  try {
    const bin = execSync(`pnpm bin`, { cwd: root }).toString()
    return bin.trim()
  }
  catch(err){}
  const bin = path.join(root, `node_modules/.bin`)
  return existsSync(bin)
    ? bin
    : ife(() => {throw new Error(`Could not find node_modules bin folder`)})
}

export const getSitesLoc = () => {
  const args = process.argv.slice(2)
  const sitesDir = args.pop() || SitesDir
  return resolveLoc(sitesDir)
}

export const getSrvCfgLoc = () => {
  const root = getRootLoc()
  return ServeCfgLoc
    ? resolveLoc(ServeCfgLoc)
    : path.join(root, ServeCfgFile)
}