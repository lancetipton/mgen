import { exists } from "@keg-hub/jsutils/exists"

type TImports = Record<string, unknown>

const markdownExts = [`.mdx`, `.md`, `markdown`]
const isMd = (loc:string) => markdownExts.find(ext => loc.endsWith(ext))

class Api {

  #mgen:TImports
  #sites:TImports

  constructor(){
    const sites = import.meta.glob(`../../public/sites/**`, {
      eager: true,
      query: `?raw`,
    })
    
    this.#sites = Object.entries(sites).reduce((acc, [loc, mod]) => {
      acc[loc.replace(`../../public/sites`, ``)] = mod
      return acc
    }, {} as TImports)

    const mgen = import.meta.glob(`../../public/.mgen/*`, {
      eager: true,
      query: `?raw`,
    })

    this.#mgen =  Object.entries(mgen).reduce((acc, [loc, mod]) => {
      acc[loc.replace(`../../public`, ``)] = mod
      return acc
    }, {} as TImports)

  }

  #lookup = async (input:string, init?:RequestInit):Promise<Response> => {
    const url = new URL(input)
    const pathname = url.pathname
    const items = !isMd(pathname) ? this.#mgen : this.#sites
    const found = Object.entries(items).find(([loc, mod]) => loc === pathname)
    // @ts-ignore
    const content = found?.[1]?.default

    return !found || !exists(content)
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