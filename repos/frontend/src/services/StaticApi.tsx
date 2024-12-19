import { exists } from "@keg-hub/jsutils/exists"
import { isFunc } from "@keg-hub/jsutils/isFunc"

type TImports = Record<string, unknown>
type TImMod = Record<`default`, string>
type TImpResp = [string, (() => Promise<TImMod>)|TImMod]


const markdownExts = [`.mdx`, `.md`, `markdown`]
const isMd = (loc:string) => markdownExts.find(ext => loc.endsWith(ext))

class Api {

  #mgen:TImports
  #sites:TImports

  constructor(){
    const sites = import.meta.glob(`../sites/**`, {
      eager: false,
      query: `?raw`,
    })

    this.#sites = Object.entries(sites).reduce((acc, [loc, mod]) => {
      acc[loc.replace(`../sites`, ``)] = mod
      return acc
    }, {} as TImports)

    const mgen = import.meta.glob(`../sites/.mgen/*`, {
      eager: false,
      query: `?raw`,
    })

    this.#mgen =  Object.entries(mgen).reduce((acc, [loc, mod]) => {
      acc[loc.replace(`../sites`, ``)] = mod
      return acc
    }, {} as TImports)

  }

  #lookup = async (input:string, init?:RequestInit):Promise<Response> => {
    const url = new URL(input)
    const pathname = url.pathname
    const items = !isMd(pathname) ? this.#mgen : this.#sites

    const found = Object.entries(items).find(([loc, mod]) => loc === pathname) as TImpResp
    if(!found) return new Response(`404 - Path "${pathname}" not found.`, { status: 404 })

    const loaded = found?.[1]
    const mod = isFunc(loaded) ? await loaded() : loaded

    const content = mod?.default
    return !exists(content)
      ? new Response(`404 - Path "${pathname}" not found.`, { status: 404 })
      : new Response(content)
  }

  fetch = async (input:string, init?:RequestInit, local?:boolean):Promise<Response> => {
    return !local
      ? await fetch(input, init)
      : await this.#lookup(input, init)
  }

}

export const api = new Api()