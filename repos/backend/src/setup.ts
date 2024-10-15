import { crawl } from './crawl.js'
import { getSitesLoc } from './paths.js'
import { genSearchIndex } from './search.js'
import { generateSites } from './generate.js'
import { genMConfig, genSConfig } from './config.js'

export const setup = async () => {
  const sites = getSitesLoc()
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
