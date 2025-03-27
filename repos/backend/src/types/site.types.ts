import type { TSiteSearch } from './search.types'


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

  // Tailwind prose css vars
  twProseBody=`--tw-prose-body`,
  twProseHeadings=`--tw-prose-headings`,
  twProseLead=`--tw-prose-lead`,
  twProseLinks=`--tw-prose-links`,
  twProseBold=`--tw-prose-bold`,
  twProseCounters=`--tw-prose-counters`,
  twProseBullets=`--tw-prose-bullets`,
  twProseHr=`--tw-prose-hr`,
  twProseQuotes=`--tw-prose-quotes`,
  twProseQuoteBorders=`--tw-prose-quote-borders`,
  twProseCaptions=`--tw-prose-captions`,
  twProseCode=`--tw-prose-code`,
  twProsePreCode=`--tw-prose-pre-code`,
  twProsePreBg=`--tw-prose-pre-bg`,
  twProseThBorders=`--tw-prose-th-borders`,
  twProseTdBorders=`--tw-prose-td-borders`,

  // Tailwind css vars
  //--tw-border-spacing-x: 0;
  //--tw-border-spacing-y: 0;
  //--tw-translate-x: 0;
  //--tw-translate-y: 0;
  //--tw-rotate: 0;
  //--tw-skew-x: 0;
  //--tw-skew-y: 0;
  //--tw-scale-x: 1;
  //--tw-scale-y: 1;
  //--tw-pan-x: ;
  //--tw-pan-y: ;
  //--tw-pinch-zoom: ;
  //--tw-scroll-snap-strictness: proximity;
  //--tw-gradient-from-position: ;
  //--tw-gradient-via-position: ;
  //--tw-gradient-to-position: ;
  //--tw-ordinal: ;
  //--tw-slashed-zero: ;
  //--tw-numeric-figure: ;
  //--tw-numeric-spacing: ;
  //--tw-numeric-fraction: ;
  //--tw-ring-inset: ;
  //--tw-ring-offset-width: 0px;
  //--tw-ring-offset-color: #fff;
  //--tw-ring-color: rgb(59 130 246 / 0.5);
  //--tw-ring-offset-shadow: 0 0 #0000;
  //--tw-ring-shadow: 0 0 #0000;
  //--tw-shadow: 0 0 #0000;
  //--tw-shadow-colored: 0 0 #0000;
  //--tw-blur: ;
  //--tw-brightness: ;
  //--tw-contrast: ;
  //--tw-grayscale: ;
  //--tw-hue-rotate: ;
  //--tw-invert: ;
  //--tw-saturate: ;
  //--tw-sepia: ;
  //--tw-drop-shadow: ;
  //--tw-backdrop-blur: ;
  //--tw-backdrop-brightness: ;
  //--tw-backdrop-contrast: ;
  //--tw-backdrop-grayscale: ;
  //--tw-backdrop-hue-rotate: ;
  //--tw-backdrop-invert: ;
  //--tw-backdrop-opacity: ;
  //--tw-backdrop-saturate: ;
  //--tw-backdrop-sepia: ;
  //--tw-contain-size: ;
  //--tw-contain-layout: ;
  //--tw-contain-paint: ;
  //--tw-contain-style: ;

}

export type TSiteNav = {
  url?:string
  dir?:string
  text?:string
  path?:string
  target?:string
  config?:TDirConfig
  children?:TSiteNavItems
}

export type TSiteNavItems = Record<string, TSiteNav>

// Should eventually merge with TDirConfig
// Or at least validated when DirConfig is also checked for things like ignore
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

export type TSiteTocHeadings = `heading1`
  | `heading2`
  | `heading3`
  | `heading4`
  | `heading5`
  | `heading6`

export type TSiteToc = {
  disabled?:boolean
  include?:TSiteTocHeadings[]
  exclude?:TSiteTocHeadings[]
}


export type TSrvOpt = {
  engine?:string
  source?:string
  destination?:string
}

export type TSiteSrvConfig = {
  unlisted?:string[]
  rewrites?:TSrvOpt[]
  redirects?:TSrvOpt[]
}

export type TSiteConfig = {
  name:string
  dir:string
  css?:string
  nav:TSiteNav
  toc?:TSiteToc
  logo:TSiteLogo
  edit?:TSiteEdit
  server?:TSiteSrvConfig
  // Should eventually merge with TDirConfig
  // Or at least validated when DirConfig is also checked for things like ignore
  pages:TSitePages
  theme?:TSiteTheme
  footer?:TSiteFooter
  search?:TSiteSearch|boolean
  sitemap:Record<string, string>
}

export type TSitesConfig = Record<string, TSiteConfig>


export type TDirConfig = {
  order?:string[]
  exclude?:string[]
}