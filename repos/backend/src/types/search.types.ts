import type FlexSearch from 'flexsearch'
import type { IndexOptionsForDocumentSearch } from 'flexsearch'


export type TSearchDoc = {
  id:string
  url:string
  text:string
  path:string
  title:string
}

export type TSearchIdx = FlexSearch.Document<string|Record<any, any>, true|string[]> & {
  get:(id:string) => TSearchDoc|undefined
}


export type TSiteSearch = IndexOptionsForDocumentSearch<string|Record<any, any>, true|string[]> & {
  active?:boolean
}

export type TSearchExport = {
  reg?:string
  tag?:string
  store?:string
  [key:string]:any
}
