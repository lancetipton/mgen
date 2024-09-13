import type { Listener } from 'route-event'
import type { TAnyCB, TRouteData, TSitesConfig, TMGenCfg, TSiteConfig } from '@MG/types'

import Route from 'route-event'
import {micromark} from 'micromark'
import { EMGenEvts } from '@MG/types'
import { Alert }  from '@MG/services/Alert'
import { Events } from '@MG/services/Events'
import { limbo } from '@keg-hub/jsutils/limbo'
import {gfm, gfmHtml} from 'micromark-extension-gfm'
import { ConfigFile } from '@MG/constants/constants'
import { parseJSON } from '@keg-hub/jsutils/parseJSON'
import { buildApiUrl } from '@MG/utils/api/buildApiUrl'
import { getSiteName } from '@MG/utils/sites/getSiteName'

type TMGenOpts = {
  selector?:string
  autoStart?:boolean
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
  #stopRouter:() => void
  #router:ReturnType<typeof Route>
  #opts:TMGenOpts

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

    window.scrollTo(0, 0)
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
      .reduce((acc, site) => ({...acc, ...site?.sitemap}), {...this.sitemap, ...this.config.sitemap})

    this.dispatch(this.events.onSite, this.site())

  }


  #request = async (loc:string, opts?:Record<any, any>) => {
    opts = opts || {headers: {[`Accept`]: `text/markdown`}}

    const res = await fetch(loc, opts)
    if (!res.ok) throw new Error(`${res.statusText} (${res.status})`)
    return res.text()
  }

  #updateSite = (loc:string) => {
    const site = getSiteName(loc)
    if(!site || !this.#site || !this?.config?.sites || site === this.#site) return

    this.#site = site
    this.dispatch(this.events.onSite, this.site())
  }

  site = ():TSiteConfig => {
    const siteCfg = this.#site && this.config?.sites?.[this.#site]
    if(siteCfg) return siteCfg

    if(this.#site){
      // TODO: Show warning that site does not exist, so it can't be loaded
      // Show a custom 404 page?
    }

    // Return the default MGen site config when on the Root Index Page
    return {
      dir: ``,
      nav: {},
      pages: {},
      name: `MGen`,
      sitemap: this.config.sitemap
    } as TSiteConfig
  }


  navigate = (location:string) => this.#router.setRoute(location)


  onMarkdown = (content:string, selector?:string, path?:string) => {
    const html = micromark(content, {
      extensions: [gfm()],
      allowDangerousHtml: true,
      htmlExtensions: [gfmHtml()]
    })
    this.render(html, selector, path)
  }


  render = (content:string, selector?:string, path?:string) => {
    this.dispatch(this.events.onRender, content, selector, path)

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
    this.#updateSite(path)
  }


  stop = () => {
    if(!this.#stopRouter) return

    this.#stopRouter()
    this.#router = undefined
    this.#stopRouter = undefined
    this.reset()
  }

}
