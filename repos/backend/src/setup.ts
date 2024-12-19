import { crawl } from './crawl'
import { getSitesLoc } from './paths'
import { genSearchIndex } from './search'
import { generateSites } from './generate'
import { genMConfig, genSConfig } from './config'

export const setup = async (loc?:string) => {
  const sites = getSitesLoc(loc)
  const location = genSConfig(sites)

  const mgenCfg = generateSites(sites, crawl(sites))
  genMConfig(sites, mgenCfg)
  await genSearchIndex(sites, mgenCfg)

  return {
    sites,
    mgenCfg,
    location,
  }

}
