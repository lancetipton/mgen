export * from '@MGS/types'
import type { TSiteConfig as TSConfig, TSiteNav } from '@MGS/types'

export type TLogoMeta = {
  href?:string
  alt?:string
  src?:string
  svg?:string
  width?:number
  height?:number
}

export type TSiteConfig = TSConfig & {
  steps?:Record<string, TSiteNav>
}

export type TSitesConfig = Record<string, TSiteConfig> 

export type TNavStep = {}