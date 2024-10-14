import type { TMGenCfg, TSiteConfig, TSearchIdx, TSearchExport } from './types'


import path from 'node:path'
import FlexSearch from "flexsearch"
import { DefSiteSearch } from './shared.js'
import { isObj } from '@keg-hub/jsutils/isObj'
import { loadFile, writeJson } from './config.js'
import { MGCfgFinalLoc } from './constants.js'

const buildIdxExport = async (index:TSearchIdx) => {
  const exported:TSearchExport = {}
  return await index.export((key, data) => new Promise((res, rej) => res(exported[key] = data))).then(() => exported)
}


const genSiteIndex = async (dir:string, site:TSiteConfig) => {

  const index = new FlexSearch.Document({
    ...DefSiteSearch,
    ...(isObj(site.search) ? site.search : {})
  }) as TSearchIdx

  Array.from(new Set(Object.values(site.sitemap)))
    .map((file, idx) => {
      const full = path.join(dir, file)
      const content = loadFile(full)
      content && index.add({ id: idx, path: file, text: content})
    })

  return await buildIdxExport(index)

}

const writeSearchIdx = (dir:string, site:string, exported:TSearchExport) => {
  const location = path.join(dir, `${site}-index.json`)
  writeJson(location, exported)
}

export const genSearchIndex = async (dir:string, config:TMGenCfg) => {
  const location = path.join(dir, MGCfgFinalLoc)
  const parsed = path.parse(location)

  return Promise.all(
    Object.entries(config.sites)
      .map(async ([name, scfg]) => {
        if(!scfg?.search) return
        const exported = await genSiteIndex(dir, scfg)
        exported && writeSearchIdx(parsed.dir, name, exported)
      })
  )
}