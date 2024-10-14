import type { TSiteConfig, TLogoMeta } from '@MG/types'
import type { TMemoChildren } from '@MG/components/MemoChildren'

import { useState, useEffect } from 'react'
import MGen from '@MG/services/MGen'
import { ife } from '@keg-hub/jsutils/ife'
import { MGenId } from '@MG/constants/constants'
import { useContext, createContext } from "react"
import { getSiteLogo } from '@MG/utils/sites/getSiteLogo'
import { MemoChildren } from '@MG/components/MemoChildren'
import { useEffectOnce } from '@MG/hooks/components/useEffectOnce'


export type TMGenProvider = TMemoChildren & {
  selector?:string
}


export type TMGenCtx = {
  mg?:MGen
  path?:string
  logo?:TLogoMeta
  site?:TSiteConfig
}

const MMContext = createContext<TMGenCtx | null>(null)
export const useMGen = () => useContext(MMContext)


export const MGenProvider = (props:TMGenProvider) => {

  const { children, ...rest } = props
  const [mg, setMM] = useState<MGen>()
  const [site, setSite] = useState<TSiteConfig>()
  const [logo, setLogo] = useState<TLogoMeta>(getSiteLogo())
  const [path, setPath] = useState<string>(window.location.pathname)

  useEffectOnce(() => {
    if(mg) return

    ife(async () => {
      const mgen = new MGen({
        ...rest,
        mdToHtml: false,
        renderToDom: false,
        onSite: (siteCfg) => {
          if(site?.name === siteCfg?.name) return
          setSite(siteCfg)
          setLogo(getSiteLogo(siteCfg))
        },
        selector: props.selector || `#${MGenId}`,
      })
      // @ts-ignore
      window.MGen = mgen
      await mgen.init()
      setMM(mgen)
    })

  })

  useEffect(() => {
    const offRoute = mg?.on(mg?.events.onRoute, (path:string) => setPath(path))
    return () => {
      offRoute?.()
    }
  }, [mg])


  return (
    <MMContext.Provider value={{mg, site, logo, path}}>
      <MemoChildren children={children} />
    </MMContext.Provider>
  )
}
