export type TSiteNav = {
  url?:string
  dir?:boolean
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
  fontFamily?:string
  foreground?:string
  background?:string
  width?:string|number
  height?:string|number
  fontSize?:string|number
}

export type TSiteConfig = {
  name:string
  dir:string
  css?:string
  nav:TSiteNav
  logo:TSiteLogo
  pages:TSitePages
  sitemap:Record<string, string>
}

export type TSitesConfig = Record<string, TSiteConfig>

export type TLogoMeta = {
  href?:string
  alt?:string
  src?:string
  svg?:string
  width?:number
  height?:number
}