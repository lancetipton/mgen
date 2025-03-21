import { ESitesType } from '../../types'
import { isValidUrl } from '@keg-hub/jsutils/isValidUrl'


const resolveUrl = (loc?:string) => {
  return loc
    ? new URL(loc, !isValidUrl(loc) ? window.location.origin : undefined)
    : new URL(window.location.href)
}


const fromPathname = (url:URL) => {
  return url.pathname.split(`/`)[1]?.trim?.()?.toLowerCase?.()
}


const fromDomain = (url:URL) => {
  const split = url.hostname.split(`.`)
  split.pop()
  return split.pop()
}


const fromSubdomain = (url:URL) => {
  return url.hostname.split(`.`).shift()
}


export const getSiteName = (loc?:string, type?:ESitesType) => {
  const url = resolveUrl(loc)
  return type == ESitesType.domain
    ? fromDomain(url)
    : type == ESitesType.subdomain
      ? fromSubdomain(url)
      : fromPathname(url)
}