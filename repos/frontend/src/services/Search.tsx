import type { MGen } from '@MG/services/MGen'
import type {
  TSearchIdx,
  TSiteConfig,
  TSearchDoc,
  TSiteSearch,
  TSearchExport,
} from '@MG/types'

import FlexSearch from "flexsearch"
import { DefSiteSearch } from '@MGS/shared'
import { Alert }  from '@MG/services/Alert'
import { isObj } from '@keg-hub/jsutils/isObj'
import { limbo } from '@keg-hub/jsutils/limbo'
import { MConfigDir } from '@MG/constants/constants'
import { parseJSON } from '@keg-hub/jsutils/parseJSON'
import { getSiteName } from '@MG/utils/sites/getSiteName'


export class Search {

  #mg:MGen
  #alert:Alert
  #site:TSiteConfig
  #opts?:TSiteSearch
  #index:TSearchIdx
  #inverted:Record<string, string>

  constructor(mg:MGen, site:TSiteConfig, opts?:TSiteSearch){
    this.#mg = mg
    this.#site = site
    this.#opts = opts
    this.#alert = new Alert()
  }

  #invert = () => {
    this.#inverted = Object.entries(this.#site.sitemap)
      .reduce((acc, [key, value]) => {
        acc[value] = key
        return acc
      }, {} as Record<string, string>)
  }


  #path = (name:string) => {
    const site = getSiteName(name, this.#mg.config.sitesType)
    // If no site name in the path then ignore loading the site config
    if(!site) return

    const path = `${MConfigDir}/${site}-index.json`
    return {
      path,
      full: `${this.#mg.baseUrl}${path}`
    }
  }

  /**
   * Handles route errors, dispatches error events, and renders an error message.
   * @private
   * @param {Error} err - The error that occurred during routing.
   * @param {string} [loc] - The location where the error occurred.
   */
  #error = (err:Error, loc?:string) => {
    loc = loc || location.pathname
    this.#mg.dispatch(this.#mg.events.onSearchError, err, loc)
    const msg = `Failed to load <b>${loc}</b><br/>${err.message}`
    this.#alert.error({text: msg})
  }


  #create = (exported:TSearchExport) => {
    this.#index = new FlexSearch.Document({
      ...DefSiteSearch,
      ...(isObj(this.#opts) ? this.#opts : {})
    }) as TSearchIdx

    Object.entries(exported)
      .forEach(([key, value]) => this.#index.import(key, value))
  }


  /**
   * Makes a fetch request to retrieve markdown data or JSON data.
   * Handles request errors.
   * @private
   * @param {string} loc - The location or URL to request.
   * @param {RequestInit} [opts] - Optional fetch options.
   * @returns {Promise<string>} - The response text.
   * @throws {Error} - Throws an error if the fetch request fails.
   */
  #request = async (loc:string, opts?:RequestInit) => {
    opts = opts || {headers: {[`Accept`]: `text/markdown`}}

    const res = await fetch(loc, opts)
    if (!res.ok) throw new Error(`${res.statusText} (${res.status})`)
    return res.text()
  }

  #load = async (name?:string) => {
    const {path, full} = this.#path(name)
    const [err, content] = await limbo(this.#request(full, {headers: {[`Accept`]: `text/json`}}))
    
    if(err) return this.#error(err, path)
    const exported = parseJSON<TSearchExport>(content)

    return exported
  }

  load = async () => {
    if(this.#index) return this.#index
    const exported = await this.#load(this.#site.dir)
    if(!exported) return

    this.#create(exported)

    this.#mg.dispatch(this.#mg.events.onSearchLoaded, this.#index, this.#site)
    return this.#index

  }

  query = async (input:string) => {
    const resp = await this.#index.searchAsync(input, {
      bool: `and`,
      suggest: true,
      // @ts-ignore
      index: DefSiteSearch.document.index,
    })

    if(!this.#inverted) this.#invert()

    const ids = Array.from(new Set(resp.reduce((acc, item) => acc.concat(item.result), [])))
    return ids.map(id => {
      const item = this.#index.get(id)
      const url = this.#inverted[item.path]
      return url && {...item, url, id}
    }).filter(Boolean)

  }

}