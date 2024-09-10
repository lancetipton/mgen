import type { Listener } from 'route-event'

import Route from 'route-event'
import {micromark} from 'micromark'
import { Alert }  from '@MG/services/Alert'
import { limbo } from '@keg-hub/jsutils/limbo'
import {gfm, gfmHtml} from 'micromark-extension-gfm'
import { ConfigFile } from '@MG/constants/constants'
import { parseJSON } from '@keg-hub/jsutils/parseJSON'
import { buildApiUrl } from '@MG/utils/api/buildApiUrl'

type TMicromarkOpts = {
  selector?:string
  autoStart?:boolean
  micromark?:Record<any, any>
  pathMap?:Record<string, string>
  getPath?:(loc?:string) => string
  onError?:(error?:Error, loc?:string) => any
  onRender?:(content:string, selector?:string) => any
}

type TMicromarkCfg = {
  sitemap: Record<string, string>
}


export class Micromark {

  #alert:Alert
  baseUrl:string
  selector:string
  config:TMicromarkCfg
  getPath?: (loc?:string, base?:string) => string
  onRender?:(content:string, selector?:string) => any
  pathMap:Record<string, string> = {
    [`/`]: `index.mdx`,
  }

  #init?:boolean
  #stopRouter:() => void
  #router:ReturnType<typeof Route>

  constructor(opts?:TMicromarkOpts){
    this.#setup(opts)
  }


  #setup = (opts?:TMicromarkOpts) => {
    this.selector = opts?.selector
    this.#alert = new Alert()
    this.baseUrl = buildApiUrl()
    if(opts?.getPath) this.getPath = opts?.getPath
    if(opts?.onError) this.onError = opts?.onError
    if(opts?.onRender) this.onRender = opts?.onRender
    if(opts?.pathMap) this.pathMap = {...this.pathMap, ...opts?.pathMap}

    ;(opts?.autoStart !== false) && this.start()
  }


  start = () => {
    if(this.#stopRouter) return
    this.#router = Route()
    this.#stopRouter = this.#router(this.#route)
  }


  #loc = (loc:string) => this.pathMap?.[loc] || this.config?.sitemap?.[loc] || loc


  #route:Listener = async (path, data) => {
    if(!this.config) await this.#config()

    if(data.popstate){
      window.scrollTo(data.scrollX, data.scrollY)
      // If this is the fist init call event, we don't want to reload the document
      // So set the flag and return
      //if(this.#init) return (this.#init = false)
    }

    window.scrollTo(0, 0)
    this.load(this.#loc(path))
  }


  #path = (path?:string, base?:string) => {
    if(this.getPath) return {full: undefined, path: this.getPath(path, base)}

    const loc = this.#loc(path || location.pathname)

    return {
      path,
      full: `${this.baseUrl}${loc.startsWith(`/`) ? loc.replace(`/`, ``) : loc}`
    }
  }


  #config = async (force?:boolean) => {
    if(!force && this.config) return

    const {path, full=path} = this.#path(ConfigFile, this.baseUrl)
    const [err, content] = await limbo(this.#request(full, {headers: {[`Accept`]: `text/json`}}))
    if(err) return this.onError(err, path)
    this.config = parseJSON(content)
  }


  #request = async (loc:string, opts?:Record<any, any>) => {
    opts = opts || {headers: {[`Accept`]: `text/markdown`}}

    const res = await fetch(loc, opts)
    if (!res.ok) throw new Error(`${res.statusText} (${res.status})`)
    return res.text()
  }


  navigate = (location:string) => this.#router.setRoute(location)


  onError = (err:Error, loc?:string) => {
    loc = loc || location.pathname
    const msg = `Failed to load <b>${loc}</b><br/>${err.message}`
    this.#alert.error({html: msg})
    this.render(`<code class="error">${msg}</code>`)
  }


  onMarkdown = (content:string) => {
    const html = micromark(content, {
      extensions: [gfm()],
      allowDangerousHtml: true,
      htmlExtensions: [gfmHtml()]
    })
    this.render(html)
  }


  render = (content:string, selector?:string) => {
    if(this.onRender) return this.onRender(content, selector)

    const sel = selector || this.selector
    const el = sel && document.querySelector(sel)
    el && (el.innerHTML = content)
  }


  init = async (loc?:string, force?:boolean) => {
    !this.#stopRouter && this.start()
    await this.#config(force)
  }


  load = async (loc?:string) => {
    const {path, full=path} = this.#path(loc, this.baseUrl)
    const [err, content] = await limbo(this.#request(full))
    err ? this.onError(err, path) : this.onMarkdown(content)
  }


  stop = () => {
    if(!this.#stopRouter) return

    this.#stopRouter()
    this.#router = undefined
    this.#stopRouter = undefined
  }

}
