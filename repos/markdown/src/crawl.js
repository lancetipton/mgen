import { fdir } from 'fdir'
import path from 'node:path'
import { loadSiteCfg } from './config.js'
import { wordCaps } from '@keg-hub/jsutils/wordCaps'
import { deepMerge } from '@keg-hub/jsutils/deepMerge'
import { SiteCfgFile, MConfigFile, SConfigFile } from './constants.js'

const configFiles = [
  MConfigFile,
  SConfigFile,
]

const parse = (location) => {
  const parsed = path.parse(location)
  if(parsed.dir === `/`) return parsed
  
  const split = parsed.dir.split(`/`)

  return {
    ...parsed,
    siteDir: split[1],
    siteRoot: split.length <= 2
  }
}

const buildItem = (siteCfg, location, parsed) => {
  if(parsed.name === `index` && parsed.siteRoot){
    siteCfg.nav = {
      path: location,
      url: parsed.dir,
      text: wordCaps(parsed.siteDir),
      ...siteCfg.nav,
    }
    return
  }

  const split = location.split(`/`)
  split.shift()
  
  let current = siteCfg.nav
  current.children = current.children || {}

  split.forEach((part, idx) => {
    // Nav starts at the site root directory, so skip it
    // Check the idx incase a sub-folder is same name as site dir
    if(!idx && part === parsed.siteDir) return

    // If on the last item, add it to the currents children
    if(idx === split.length - 1){
      if(parsed.name === `index`){
        current.url = parsed.dir
        current.path = location
        current.text = wordCaps(parsed.dir.split(`/`).pop())
        return
      }

      current.children = {
        ...current.children,
        [parsed.name]: {
          path: location,
          text: wordCaps(parsed.name),
          url: `${parsed.dir}/${parsed.name}`,
        }
      }

      return
    }

    // If the part already exists, then set to to current
    if(current?.children?.[part]) return (current = current?.children?.[part])
    
    // If the part does not exist, then create it
    current.children[part] = {
      text: wordCaps(part),
      children: {}
    }
    current = current.children[part]

  })
}


const buildPaths = (dir) => (acc, file) => {

  if(configFiles.find(cfg => file.endsWith(cfg))) return acc

  const clean = file.replace(dir, '')
  const parsed = parse(clean)

  if(file.endsWith(SiteCfgFile) && parsed.siteRoot){
    const siteCfg = loadSiteCfg(file, clean)
    siteCfg.dir = parsed.siteDir
    acc.sites[parsed.siteDir] = deepMerge(siteCfg, acc.sites?.[parsed.siteDir] || { sitemap: {}, nav: {} })

    return acc
  }

  const isRoot = parsed.dir === `/`
  if(isRoot){
    acc.sitemap[`/${parsed.name}`] = clean
    return acc
  }

  const siteCfg = acc.sites?.[parsed.siteDir] || { sitemap: {}, nav: {} }

  siteCfg.sitemap[clean] = clean
  siteCfg.sitemap[`${parsed.dir}/${parsed.name}`] = clean


  if(parsed.name === `index`){
    siteCfg.sitemap[parsed.dir] = clean
    siteCfg.sitemap[`${parsed.dir}/`] = clean
  }

  buildItem(siteCfg, clean, parsed)

  acc.sites[parsed.siteDir] = siteCfg

  return acc
}


export const crawl = (dir) => {
  return new fdir()
    .withFullPaths()
    .crawl(dir)
    .sync()
    .reduce(buildPaths(dir), { sitemap: {}, sites: {} })
}