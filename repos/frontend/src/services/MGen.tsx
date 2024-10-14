import type { Listener } from 'route-event'
import type {
  TMGenCfg,
  TRouteData,
  TSiteConfig,
  TSitesConfig,
} from '@MG/types'

import Route from 'route-event'
import {micromark} from 'micromark'
import { EMGenEvts } from '@MG/types'
import { Alert }  from '@MG/services/Alert'
import { Events } from '@MG/services/Events'
import { Search } from '@MG/services/Search'
import { limbo } from '@keg-hub/jsutils/limbo'
import {gfm, gfmHtml} from 'micromark-extension-gfm'
import { parseJSON } from '@keg-hub/jsutils/parseJSON'
import { buildSteps } from '@MG/utils/sites/buildSteps'
import { buildApiUrl } from '@MG/utils/api/buildApiUrl'
import { siteColors } from '@MG/utils/sites/siteColors'
import { getSiteName } from '@MG/utils/sites/getSiteName'
import { MConfigDir, MConfigFile } from '@MG/constants/constants'

type TMGenOpts = {
  selector?:string
  mdToHtml?:boolean
  autoStart?:boolean
  renderToDom?:boolean
  sitesConfig?:TSitesConfig
  micromark?:Record<any, any>
  sitemap?:Record<string, string>
  getPath?:(loc?:string) => string
  onSite?:(site?:TSiteConfig) => any
  onError?:(error?:Error, loc?:string) => any
  onRoute?:(path?:string, data?:TRouteData, loc?:string) => any
  onRender?:(content:string, selector?:string, path?:string) => any
}

export class MGen extends Events {

  #site:string
  baseUrl:string
  search:Search
  selector:string
  config:TMGenCfg
  events=EMGenEvts
  getPath?: (loc?:string, base?:string) => string
  sitemap:Record<string, string>={[`/`]: `index.mdx`}

  #alert:Alert
  #init?:boolean
  #opts:TMGenOpts
  #stopRouter:() => void
  #mdToHtml:boolean=true
  #renderToDom:boolean=false
  #router:ReturnType<typeof Route>
  #clearCssVars?:() => void
  #clearDefCssVars?:() => void

  constructor(opts?:TMGenOpts){
    super()
    this.#setup(opts)
  }

  /**
   * Initializes the MGen instance with the provided options.
   * Sets up internal configurations, routing, and event listeners.
   * @private
   * @param {TMGenOpts} [opts] - Configuration options for MGen.
   */
  #setup = (opts?:TMGenOpts) => {
    this.#opts = opts
    this.selector = opts?.selector
    this.#alert = new Alert()
    this.baseUrl = buildApiUrl()
    this.#events(opts)
    if(opts?.getPath) this.getPath = opts?.getPath
    if(opts?.mdToHtml === false) this.#mdToHtml = false
    if(opts?.renderToDom === false) this.#renderToDom = false
    if(opts?.sitemap) this.sitemap = {...this.sitemap, ...opts?.sitemap}

    ;(opts?.autoStart !== false) && this.start()
  }

  /**
   * Sets up event listeners based on the provided options.
   * @private
   * @param {TMGenOpts} [opts] - Configuration options for event listeners.
   */
  #events = (opts?:TMGenOpts) => {
    opts?.onSite && this.on(this.events.onSite, opts?.onSite)
    opts?.onError && this.on(this.events.onError, opts?.onError)
    opts?.onRoute && this.on(this.events.onRoute, opts?.onRoute)
    opts?.onRender && this.on(this.events.onRender, opts?.onRender)
  }

  /**
   * Starts the route listener and triggers event setup if not already started.
   */
  start = () => {
    if(this.#stopRouter) return
    this.#router = Route()
    this.#stopRouter = this.#router(this.#route)
    this.#events(this.#opts)
  }

  /**
   * Handles route errors, dispatches error events, and renders an error message.
   * @private
   * @param {Error} err - The error that occurred during routing.
   * @param {string} [loc] - The location where the error occurred.
   */
  #error = (err:Error, loc?:string) => {
    loc = loc || location.pathname
    this.dispatch(this.events.onError, err, loc)
    const msg = `Failed to load <b>${loc}</b><br/>${err.message}`
    this.#alert.error({text: msg})
    this.render(`<code class="error">${msg}</code>`)
  }


  /**
   * Resolves the correct path based on the sitemap or the provided location.
   * @private
   * @param {string} loc - The location to resolve.
   * @returns {string} - The resolved location path.
   */
  #loc = (loc:string) => this.sitemap?.[loc] || loc


  /**
   * Route listener that handles navigation, loading configurations, and rendering content.
   * Scrolls to the appropriate location if needed.
   * @private
   * @param {string} path - The route path.
   * @param {TRouteData} data - Route data object containing state information.
   */
  #route:Listener = async (path, data) => {

    if(!this.config) await this.#config()


    const site = getSiteName(path, this.config.sitesType)

    if(this.#site !== site && !this.config.sites?.[site])
      await this.#sconfig(path)


    if(data.popstate){
      window.scrollTo(data.scrollX, data.scrollY)
      // If this is the fist init call event, we don't want to reload the document
      // So set the flag and return
      //if(this.#init) return (this.#init = false)
    }
    
    if(path.includes(`#`) || path.includes(`?`))
      path = window.location.pathname


    if(window.location.hash){
      const el = document.querySelector(window.location.hash) as HTMLElement
      el && window.scrollTo({ top: el.offsetTop, behavior: `smooth`});
    }
    else window.scrollTo(0, 0)

    const loc = this.#loc(path)
    this.load(loc)
    this.dispatch(this.events.onRoute, path, data, loc)
  }


  /**
  * Resolves the full path or base path for the given location.
  * @private
  * @param {string} [path] - Optional path to resolve.
  * @param {string} [base] - Optional base URL.
  * @returns {object} - The resolved full and partial path.
  */
  #path = (path?:string, base?:string) => {
    if(this.getPath) return {full: undefined, path: this.getPath(path, base)}

    const loc = this.#loc(path || location.pathname)
    const clean = loc.startsWith(`/`) ? loc.replace(`/`, ``) : loc

    return {
      path,
      full: `${this.baseUrl}${clean}`
    }
  }


  /**
   * Fetches and loads the configuration for a specific site.
   * @private
   * @param {string} [name] - The name of the site to load configuration for.
   * @returns {object} - The loaded site config
   */
  #sconfig = async (name?:string) => {
    const site = getSiteName(name, this.config.sitesType)

    // If no site name in the path then ignore loading the site config
    if(!site) return

    // Load the site config
    const file = `${MConfigDir}/${site}.json`
    const {path, full=path} = this.#path(file, this.baseUrl)
    const [err, content] = await limbo(this.#request(full, {headers: {[`Accept`]: `text/json`}}))
    if(err) return this.#error(err, path)
    const scfg = parseJSON(content)

    if(!scfg) return

    this.sitemap = {...this.sitemap, ...scfg.sitemap}
    this.config.sites[site] = {...this.config.sites?.[site], ...scfg}

    return scfg
  }


  /**
   * Fetches and loads the main MGen configuration if not already loaded.
   * Optionally forces a reload of the configuration.
   * @private
   * @param {boolean} [force] - Forces the configuration to reload if true.
   */
  #config = async (force?:boolean) => {

    if(force || !this.config){
      const {path, full=path} = this.#path(MConfigFile, this.baseUrl)
      const [err, content] = await limbo(this.#request(full, {headers: {[`Accept`]: `text/json`}}))
      if(err) return this.#error(err, path)
      this.config = parseJSON(content)
      this.#site = getSiteName(undefined, this.config.sitesType)
      // Set the default sitemap for any default site config
      this.sitemap = Object.values(this.config.sites)
        .reduce((acc, site) => ({...acc, ...site?.sitemap}), {...this.sitemap})
      
    }

    await this.#sconfig()

    this.dispatch(this.events.onSite, this.site())
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


  /**
   * Updates the current site information based on the provided location.
   * @private
   * @param {string} [loc] - Optional location to update the site with.
   */
  #updateSite = (loc?:string) => {
    const site = getSiteName(loc, this.config.sitesType)

    if(!this?.config?.sites || site === this.#site) return

    this.#site = site
    this.dispatch(this.events.onSite, this.site())
  }


  __default = ():TSiteConfig => {
    this.#clearDefCssVars?.()
    const config = this.config?.sites?.__default
    this.#clearDefCssVars = siteColors(config.theme)

    return {
      dir: `/`,
      nav: {},
      pages: {},
      ...config,
    } as TSiteConfig
  }


  site = ():TSiteConfig => {
    this.#clearCssVars?.()
    const defCfg = this.__default()
    const siteCfg = this.#site && this.config?.sites?.[this.#site]
    if(siteCfg){
      this.#clearCssVars = siteColors(siteCfg.theme)
      const merged:TSiteConfig = {
        ...siteCfg,
        search: undefined,
        steps: buildSteps(siteCfg.nav),
        pages: {
          ...defCfg?.pages,
          ...siteCfg?.pages
        },
      }
      if(siteCfg?.search) merged.search = new Search(this, merged)

      return merged
    }


    if(this.#site){
      // TODO: Show warning that site does not exist, so it can't be loaded
      // Show a custom 404 page?
    }

    // Return the default MGen site config when on the Root Index Page
    return defCfg
  }


  /**
   * Navigates to the specified location by setting the route.
   * @param {string} location - The location to navigate to.
   */
  navigate = (location:string) => this.#router.setRoute(location)


  /**
   * Converts the provided markdown content to HTML and renders it.
   * @param {string} content - The markdown content to convert.
   * @param {string} [selector] - Optional DOM selector to render the content to.
   * @param {string} [path] - Optional path for the content.
   */
  onMarkdown = (content:string, selector?:string, path?:string) => {
    const html = this.#mdToHtml
      ? micromark(content, {
          extensions: [gfm()],
          allowDangerousHtml: true,
          htmlExtensions: [gfmHtml()]
        })
      : content

    this.render(html, selector, path)
  }


  /**
   * Renders the given content to the DOM if enabled.
   * Also dispatches the render event.
   * @param {string} content - The content to render.
   * @param {string} [selector] - Optional DOM selector to render the content to.
   * @param {string} [path] - Optional path for the content.
   */
  render = (content:string, selector?:string, path?:string) => {
    this.dispatch(this.events.onRender, content, selector, path)
    if(!this.#renderToDom) return

    const sel = selector || this.selector
    const el = sel && document.querySelector(sel)
    el && (el.innerHTML = content)
  }


  /**
   * Initializes the router and loads the configuration.
   * Optionally forces a reload of the configuration.
   * @param {string} [loc] - Optional location to initialize with.
   * @param {boolean} [force] - Forces a reload of the configuration if true.
   */
  init = async (loc?:string, force?:boolean) => {
    !this.#stopRouter && this.start()
    await this.#config(force)
  }


  /**
   * Loads content from the given location and renders it.
   * Also updates the site information based on the location.
   * @param {string} [loc] - The location to load content from.
   * @param {string} [selector] - Optional DOM selector to render the content to.
   */
  load = async (loc?:string, selector?:string) => {
    const {path, full=path} = this.#path(loc, this.baseUrl)
    const [err, content] = await limbo(this.#request(full))
    if(err) return this.#error(err, path)

    this.onMarkdown(content, selector, path)
    this.#updateSite()
  }

  /**
   * Stops the router and resets event listeners.
   */
  stop = () => {
    if(!this.#stopRouter) return

    this.#stopRouter()
    this.#router = undefined
    this.#stopRouter = undefined
    this.reset()
  }

}
