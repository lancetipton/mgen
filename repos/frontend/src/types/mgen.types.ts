import { TSitesConfig } from './sites.types'

export type TMGenCfg = {
  sites?:TSitesConfig
  sitemap: Record<string, string>
}
