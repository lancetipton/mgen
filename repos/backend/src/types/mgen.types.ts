import { TSitesConfig } from './site.types'

export enum ESitesType {
  domain=`domain`,
  pathname=`pathname`,
  subdomain=`subdomain`,
}

export type TMGenCfg = {
  sitesType:ESitesType
  sites:TSitesConfig
}
