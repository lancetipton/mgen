import type { TSiteConfig as TSConfig, TSiteNav, TSearchDoc } from '@MGS/types'
import type { Search } from '@MG/services/Search'

export type TLogoMeta = {
  href?:string
  alt?:string
  src?:string
  svg?:string
  width?:number
  height?:number
}

export type TSiteConfig = Omit<TSConfig, `search`> & {
  search?:Search
  steps?:Record<string, TSiteNav>
}

export type TSitesConfig = Record<string, TSiteConfig> 

export type TNavStep = {}


export type TSearchSection = {
  id:string
  url:string
  title:string
  items:TSearchDoc[]
}

export type TSearchSections = TSearchSection[]