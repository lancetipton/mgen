import type { TMGenCfg, TSiteConfig } from './types.js'

import path from 'node:path'
import { writeFile } from 'node:fs'
import { noOp } from '@keg-hub/jsutils/noOp'
import { deepMerge } from '@keg-hub/jsutils/deepMerge'
import { exists } from '@keg-hub/jsutils/exists'
import { MGNoAutoIdx, MGIdxName, MGIdxMarkdown } from './constants.js'

const defLogo = {
  radius: 30,
  width: 100,
  height: 100,
  fontSize: 120,
  background: `#4444BB`,
  foreground: `#FFFFFF`,
  fontFamily: `ui-sans-serif, system-ui, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji`,
}

export const generateSvg = (letter, options = {}) => {
  const opts = deepMerge(defLogo, options)
  const doubleW = opts.width * 2
  const doubleH = opts.height * 2

  return `
<svg width="${opts.width}" height="${opts.height}" viewBox="0 0 ${doubleW} ${doubleH}" xmlns="http://www.w3.org/2000/svg">
    <rect xmlns="http://www.w3.org/2000/svg" x="0" width="${doubleW}" height="${doubleH}" rx="${opts.radius}" fill="${opts.background}"/>
    <text x="50%" y="55%" fill="${opts.foreground}" text-anchor="middle" dominant-baseline="middle" style="font-family: ${opts.fontFamily}; font-size: ${opts.fontSize}">
      ${letter}
    </text>
</svg>
`
}


const getLetters = (name:string) => {
  const split = name.trim().split(` `)
  const first = split?.shift?.().split(``)
  const last = split.pop()?.split?.(``) || first
  const middle = split.length ? split.pop()?.split?.(``) : [``]
  return `${first.shift()}${middle.shift()}${last.shift()}`.toUpperCase()
}

const generateLogo = (site:TSiteConfig) => {
  if(!site.name || site?.logo?.url || site?.logo?.svg)
    return {...site, logo: {...site?.logo, alt: site?.logo?.alt || site?.name || `MGen Docs`}}

  const letters = getLetters(site.name)
  const svg = generateSvg(letters, site.logo || {})

  site.logo = {...site.logo, alt: site?.logo?.alt || site?.name, svg}

  return site
}


const writeIdx = (location:string, data:string) => writeFile(location, data, noOp)

const buildSites = (config:TMGenCfg) => {
  const idxMd = [`# MGen Index\n`]
  MGIdxMarkdown && idxMd.push(`${MGIdxMarkdown}\n`)
  
  const sites = Object.entries(config.sites)
  if(!sites?.length) return { idxMd: idxMd.join(`\n`), sites:{}}

  idxMd.push(`## Sites\n`)
  const sconfigs = sites.reduce((acc, [key, site]) => {
    if(!site.dir) return acc

    acc[key] = site.name ? generateLogo({...site}) : site
    idxMd.push(`* [${site.name}](/${site.dir})`)

    return acc
  }, {})

   return {
    mgenCfg: {...config, sites: sconfigs} as TMGenCfg,
    idxMd: idxMd.join(`\n`)
   }
}


export const generateSites = (dir:string, config:TMGenCfg) => {
  if(exists(MGNoAutoIdx)) return

  const location = path.join(dir, MGIdxName)

  const {idxMd, mgenCfg} = buildSites(config)
  writeIdx(location, idxMd)

  return mgenCfg
}


