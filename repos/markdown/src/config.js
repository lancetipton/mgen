import path from 'node:path'
import { getSrvCfgLoc } from './paths.js'
import { tri } from '@keg-hub/jsutils/tri'
import { noOp } from '@keg-hub/jsutils/noOp'
import { deepMerge } from '@keg-hub/jsutils/deepMerge'
import { MConfigFile, SConfigFile } from './constants.js'
import { readFileSync, writeFile, mkdir } from 'node:fs'

export const createDir = (location) => mkdir(location, {recursive: true}, noOp)
export const loadJson = (location) => tri(() => JSON.parse(readFileSync(location, `utf8`))) || {}
export const writeJson = (location, data) => writeFile(location, JSON.stringify(data, null, 2), noOp)

export const genMConfig = (dir, cfg, sitemap) => {

  const location = path.join(dir, MConfigFile)
  const parsed = path.parse(location)
  createDir(parsed.dir)
  const config = {...cfg, sitemap}
  writeJson(location, config)

  return { location, config }
}

//"/demo1/demo1-page.mdx": "/demo1/demo1-page.mdx",
//"/demo1/demo1-page": "/demo1/demo1-page.mdx",
//"/demo1/index.mdx": "/demo1/index.mdx",
//"/demo1/index": "/demo1/index.mdx",
//"/demo1": "/demo1/index.mdx",
//"/demo1/": "/demo1/index.mdx",
//"/demo2/demo2-page.mdx": "/demo2/demo2-page.mdx",
//"/demo2/demo2-page": "/demo2/demo2-page.mdx",
//"/demo2/index.mdx": "/demo2/index.mdx",
//"/demo2/index": "/demo2/index.mdx",
//"/demo2": "/demo2/index.mdx",
//"/demo2/": "/demo2/index.mdx",
//"/index.mdx": "/index.mdx",
//"/index": "/index.mdx",
//"/": "/index.mdx"


const buildReWrites = (mCfg) => {
  return Object.entries(mCfg.sitemap).reduce((acc, [key, value]) => {
      const parsed = path.parse(key)
      if(parsed.ext) return acc

      //acc.rewrites.push({ [`source`]: key, [`destination`]: value })
    return acc
  }, { [`rewrites`]: [] })
}


export const genSConfig = (dir, mCfg) => {

  const defCfgLoc = getSrvCfgLoc()
  const defCfg = loadJson(defCfgLoc)

  const location = path.join(dir, SConfigFile)
  const parsed = path.parse(location)
  createDir(parsed.dir)

  const cfg = buildReWrites(mCfg)

  const config = deepMerge(defCfg, cfg)
  writeJson(location, config)

  return { location, config }
}


  //"rewrites": [
  //  { "source": "app/**", "destination": "/index.html" },
  //  { "source": "projects/*/edit", "destination": "/edit-project.html" }
  //]