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
import { limbo } from '@keg-hub/jsutils/limbo'
import {gfm, gfmHtml} from 'micromark-extension-gfm'
import { ConfigFile } from '@MG/constants/constants'
import { getNavMap } from '@MG/utils/sites/getNavMap'
import { parseJSON } from '@keg-hub/jsutils/parseJSON'
import { buildApiUrl } from '@MG/utils/api/buildApiUrl'
import { siteColors } from '@MG/utils/sites/siteColors'
import { getSiteName } from '@MG/utils/sites/getSiteName'

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

  #setup = (opts?:TMGenOpts) => {
    this.#opts = opts
    this.selector = opts?.selector
    this.#alert = new Alert()
    this.#site = getSiteName()
    this.baseUrl = buildApiUrl()
    this.#events(opts)
    if(opts?.getPath) this.getPath = opts?.getPath
    if(opts?.mdToHtml === false) this.#mdToHtml = false
    if(opts?.renderToDom === false) this.#renderToDom = false
    if(opts?.sitemap) this.sitemap = {...this.sitemap, ...opts?.sitemap}

    ;(opts?.autoStart !== false) && this.start()
  }

  #events = (opts?:TMGenOpts) => {
    opts?.onSite && this.on(this.events.onSite, opts?.onSite)
    opts?.onError && this.on(this.events.onError, opts?.onError)
    opts?.onRoute && this.on(this.events.onRoute, opts?.onRoute)
    opts?.onRender && this.on(this.events.onRender, opts?.onRender)
  }

  start = () => {
    if(this.#stopRouter) return
    this.#router = Route()
    this.#stopRouter = this.#router(this.#route)
    this.#events(this.#opts)
  }

  #error = (err:Error, loc?:string) => {
    loc = loc || location.pathname
    this.dispatch(this.events.onError, err, loc)
    const msg = `Failed to load <b>${loc}</b><br/>${err.message}`
    this.#alert.error({text: msg})
    this.render(`<code class="error">${msg}</code>`)
  }


  #loc = (loc:string) => this.sitemap?.[loc] || loc


  #route:Listener = async (path, data) => {

    if(!this.config) await this.#config()

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


  #path = (path?:string, base?:string) => {
    if(this.getPath) return {full: undefined, path: this.getPath(path, base)}

    const loc = this.#loc(path || location.pathname)
    const clean = loc.startsWith(`/`) ? loc.replace(`/`, ``) : loc

    return {
      path,
      full: `${this.baseUrl}${clean}`
    }
  }


  #config = async (force?:boolean) => {
    if(!force && this.config) return

    const {path, full=path} = this.#path(ConfigFile, this.baseUrl)
    const [err, content] = await limbo(this.#request(full, {headers: {[`Accept`]: `text/json`}}))
    if(err) return this.#error(err, path)
    this.config = parseJSON(content)
    
    this.sitemap = Object.values(this.config.sites)
      .reduce((acc, site) => ({...acc, ...site?.sitemap}), {...this.sitemap})

    this.dispatch(this.events.onSite, this.site())

  }


  #request = async (loc:string, opts?:Record<any, any>) => {
    opts = opts || {headers: {[`Accept`]: `text/markdown`}}

    const res = await fetch(loc, opts)
    if (!res.ok) throw new Error(`${res.statusText} (${res.status})`)
    return res.text()
  }

  #updateSite = (loc?:string) => {
    const site = getSiteName(loc)

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
      return {
        ...siteCfg,
        steps: getNavMap(siteCfg.nav),
        pages: {
          ...defCfg?.pages,
          ...siteCfg?.pages
        },
      }
    }


    if(this.#site){
      // TODO: Show warning that site does not exist, so it can't be loaded
      // Show a custom 404 page?
    }

    // Return the default MGen site config when on the Root Index Page
    return defCfg
  }


  navigate = (location:string) => this.#router.setRoute(location)


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


  render = (content:string, selector?:string, path?:string) => {
    this.dispatch(this.events.onRender, content, selector, path)
    if(!this.#renderToDom) return

    const sel = selector || this.selector
    const el = sel && document.querySelector(sel)
    el && (el.innerHTML = content)
  }


  init = async (loc?:string, force?:boolean) => {
    !this.#stopRouter && this.start()
    await this.#config(force)
  }


  load = async (loc?:string, selector?:string) => {
    const {path, full=path} = this.#path(loc, this.baseUrl)
    const [err, content] = await limbo(this.#request(full))
    if(err) return this.#error(err, path)

    this.onMarkdown(content, selector, path)
    this.#updateSite()
  }


  stop = () => {
    if(!this.#stopRouter) return

    this.#stopRouter()
    this.#router = undefined
    this.#stopRouter = undefined
    this.reset()
  }

}
