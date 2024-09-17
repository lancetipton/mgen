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

export type TSiteThemeType = {
  dark?:never
  light?:never
  info?:string
  warn?:string
  error?:string
  success?:string
  primary?:string
  secondary?:string
  accent?:string
  hover?:string
  active?:string
  border?:string
  disabled?:string
  background?:string
  font?:string
}

export type TSiteTheme = {
  dark:TSiteThemeType
  light:TSiteThemeType
  info?:never
  warn?:never
  error?:never
  primary?:never
  secondary?:never
}


export type TSiteConfig = {
  name:string
  dir:string
  css?:string
  nav:TSiteNav
  logo:TSiteLogo
  pages:TSitePages
  sitemap:Record<string, string>
  theme?:TSiteTheme|TSiteThemeType
}

export type TSitesConfig = Record<string, TSiteConfig>




export type TMGenCfg = {
  sites:TSitesConfig
}