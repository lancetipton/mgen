export type { PluggableList } from '../../node_modules/react-markdown/lib/index.js'

export type TMarked = {
  Renderer: any,
  setOptions: (opts:Record<any, any>) => any
}

export type THljs = {
  getLanguage:(lang:string) => string
  highlight:(lang:string, code:string) => Record<'value', any>
}