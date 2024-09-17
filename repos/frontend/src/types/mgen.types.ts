import { TSitesConfig } from './sites.types'

export type TRouteData = {
  scrollX: number
  scrollY: number
  popstate: boolean
}

export type TMGenCfg = {
  sites?:TSitesConfig
  sitemap: Record<string, string>
}

export enum EMGenEvts {
  onToc=`onMGToc`,
  onSite=`onMGSite`,
  onError=`onMGError`,
  onRoute=`onMGRoute`,
  onRender=`onMGRender`,
}