export type TSiteNav = {
  url?:string
  dir?:boolean
  text?:string
  target?:string
  children?:TSiteNavItems
}

export type TSiteNavItems = TSiteNav[]

export type TSitePages = {
  hidden?:string[],
  ignore?: string[],
}

export type TSiteConfig = {
  name:string
  dir:string
  pages:TSitePages
  nav:TSiteNavItems
  sitemap:Record<string, string>
}

export type TSitesConfig = Record<string, TSiteConfig>
