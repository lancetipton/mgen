import type {
  TMGenCfg,
  TSearchIdx,
  TSiteConfig,
  TSearchExport,
} from './types'


import path from 'node:path'
import FlexSearch from "flexsearch"
import { parseMD } from './parse.js'
import { locToTitle } from './utils.js'
import { DefSiteSearch } from './shared.js'
import { isObj } from '@keg-hub/jsutils/isObj'
import { toFloat } from '@keg-hub/jsutils/toFloat'
import { loadFile, writeJson } from './config.js'
import { MGCfgFinalLoc } from './constants.js'

const buildIdxExport = async (index:TSearchIdx) => {
  const exported:TSearchExport = {}
  return await index.export((key, data) => new Promise((res, rej) => res(exported[key] = data))).then(() => exported)
}

const invert = (site:TSiteConfig) => {
  return Object.entries(site.sitemap)
    .reduce((acc, [key, value]) => {
      acc[value] = key
      return acc
    }, {} as Record<string, string>)
}


const genSiteIndex = async (dir:string, site:TSiteConfig) => {

  const mapsite = invert(site)
  const index = new FlexSearch.Document<string|Record<any, any>, true|string[]>({
    ...DefSiteSearch,
    ...(isObj(site.search) ? site.search : {})
  }) as TSearchIdx

  Array.from(new Set(Object.values(site.sitemap)))
    .map((file, idx) => {
      const full = path.join(dir, file)
      const content = loadFile(full)
      const url = mapsite[file]
      if(!content || !url) return
      
      const parent = {
        url,
        id: idx,
        path: file,
        text: content,
        title: locToTitle(url),
      }

      index.add(parent)

      const sections = parseMD(content, url)

      sections.forEach((section, sid) => {
        const num = sid >= 9 ? sid + 1 : `0${sid + 1}`
        const id = toFloat(`${parent.id}.${num}`)

        index.add({
          id,
          path: file,
          url: section.hash || parent.url,
          text: section.text || section.title,
          title: section.title || section.text,
        })
      })

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