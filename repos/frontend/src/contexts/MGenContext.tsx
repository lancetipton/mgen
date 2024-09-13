import type { ReactNode } from 'react'
import type { TMGenCfg, TSiteConfig } from '@MG/types'

import { MGen } from '@MG/services/MGen'
import { ife } from '@keg-hub/jsutils/ife'
import { useEffect, useState, memo } from 'react'
import { MGenId } from '@MG/constants/constants'
import { useContext, createContext } from "react"

export type TMemoChildren = {
  children:ReactNode
}

export type TMGenProvider = TMemoChildren & {
  selector?:string
}


export const MemoChildren = memo((props:TMemoChildren) => <>{props.children}</>)

export type TMGenCtx = {
  mg?:MGen
  site?:TSiteConfig
}

const MMContext = createContext<TMGenCtx | null>(null)
export const useMGen = () => useContext(MMContext)


export const MGenProvider = (props:TMGenProvider) => {

  const { children, ...rest } = props
  const [mg, setMM] = useState<MGen>()
  const [site, setSite] = useState<TSiteConfig>()

  useEffect(() => {
    if(mg) return

    ife(async () => {
      const mgen = new MGen({
        ...rest,
        onSite: (siteCfg) => setSite(siteCfg),
        selector: props.selector || `#${MGenId}`,
      })
      // @ts-ignore
      window.MGen = mgen
      await mgen.init()
      setMM(mgen)
    })

  }, [])


  return (
    <MMContext.Provider value={{mg, site}}>
      <MemoChildren children={children} />
    </MMContext.Provider>
  )
}
