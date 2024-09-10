import { crawl } from './crawl.js'
import { serve } from './serve.js'
import { APIPort } from './constants.js'
import { genMConfig, genSConfig } from './config.js'
import { getRootLoc, getBinLoc, getSitesLoc } from './paths.js'

export const start = () => {
  const bin = getBinLoc()

  const sites = getSitesLoc()
  const sitemap = crawl(sites)

  const { config } = genMConfig(sites, {}, sitemap)
  const { location } = genSConfig(sites, config)

  const proc = serve({
    bin,
    port: APIPort,
    config: location,
    root: getRootLoc(),
    args: [
      `--cors`,
      `--no-clipboard`,
      `--no-port-switching`,
    ]
  })

  return proc
}

