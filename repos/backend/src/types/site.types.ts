import type { TSiteSearch } from './search.types.js'


export type TSiteThemeColors = {
  primary?:string
  primaryContent?:string

  secondary?:string
  secondaryContent?:string

  accent?:string
  accentContent?:string
  
  neutral?:string
  neutralContent?:string

  info?:string
  infoContent?:string

  warn?:string
  warnContent?:string

  error?:string
  errorContent?:string

  success?:string
  successContent?:string

  base100?:string
  base200?:string
  base300?:string
  baseContent?:string

  //hover?:string
  //active?:string
  //border?:string
  //disabled?:string
  //background?:string
}

export enum ESiteCSSVars {
  primary=`--p`,
  primaryContent=`--pc`,
  secondary=`--s`,
  secondaryContent=`--sc`,
  accent=`--a`,
  accentContent=`--ac`,
  neutral=`--n`,
  neutralContent=`--nc`,
  base100=`--b1`,
  base200=`--b2`,
  base300=`--b3`,
  baseContent=`--bc`,
  info=`--in`,
  infoContent=`--inc`,
  success=`--su`,
  successContent=`--suc`,
  warn=`wa`,
  warnContent=`--wac`,
  error=`--er`,
  errorContent=`--erc`,
}

export type TSiteNav = {
  url?:string
  dir?:string
  text?:string
  target?:string
  children?:TSiteNavItems
}

export type TSiteNavItems = Record<string, TSiteNav>

export type TSitePages = {
  hidden?:string[],
  ignore?: string[],
  latex?: boolean
  allowHtml?: boolean
}

export type TSiteLogo = {
  url?:string
  alt?:string
  svg?:string
}

export type TSiteThemeFont = {
  family?:string
  size?:string|number
}

export type TSiteThemeLogo = TSiteThemeFont & {
  foreground?:string
  background?:string
  width?:string|number
  height?:string|number
  radius?:string|number
}

export type TSiteTheme = {
  font?:TSiteThemeFont
  logo?:TSiteThemeLogo
  dark?:TSiteThemeColors
  light?:TSiteThemeColors
  colors?:TSiteThemeColors
  __hls?: {
    dark:TSiteThemeColors
    light:TSiteThemeColors
  }
}


export type TSiteLink = {
  text?:string
  url?:string
  target?:`_self`|`_blank`|`parent`|`_top`|`_unfencedTop`
}

export type TSiteEdit = TSiteLink & {
  map?:Record<string, string>
}

export type TSiteFooter = {
  text?:string
  logo?:boolean
  links:TSiteLink[]
  year?:boolean|string
}

export type TSiteConfig = {
  name:string
  dir:string
  css?:string
  nav:TSiteNav
  logo:TSiteLogo
  edit?:TSiteEdit
  pages:TSitePages
  theme?:TSiteTheme
  footer?:TSiteFooter
  search?:TSiteSearch|boolean
  sitemap:Record<string, string>
}

export type TSitesConfig = Record<string, TSiteConfig>
