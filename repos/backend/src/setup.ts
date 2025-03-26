import { crawl } from './crawl'
import { getSitesLoc } from './paths'
import { genSearchIndex } from './search'
import { generateSites } from './generate'
import { genMConfig, genSConfig } from './config'

export const setup = async (loc?:string) => {
  const sites = getSitesLoc(loc)
  const mgenCfg = generateSites(sites, crawl(sites))

  const location = genSConfig(sites, mgenCfg)

  genMConfig(sites, mgenCfg)
  await genSearchIndex(sites, mgenCfg)

  return {
    sites,
    mgenCfg,
    location,
  }

}
