import type { TSiteNav } from '@MG/types'

type TNavMap = Record<string, TSiteNav>

/**
 * Builds the steps navigation base on the passed in site nav object
 */
export const buildSteps = (nav:TSiteNav) => {
  // TODO: pass in the pages config, and filter the steps base on the page config

  const map:TNavMap = nav.url ? { [nav?.url]: nav } : {}

  return Object.entries(nav.children)
  .reduce((acc, [key, nav]) => {
    if(nav.url) acc[nav.url] = nav

    return nav.children ? {...acc, ...buildSteps(nav)} : acc
  }, map)
}