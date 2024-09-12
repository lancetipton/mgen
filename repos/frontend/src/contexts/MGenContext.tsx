import type { ReactNode } from 'react'

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
  mm: MGen
}

const MMContext = createContext<TMGenCtx | null>(null)
export const useMGen = () => useContext(MMContext)


export const MGenProvider = (props:TMGenProvider) => {

  const { children, ...rest } = props
  const [mm, setMM] = useState<MGen>()

  useEffect(() => {
    if(mm) return

    ife(async () => {
      const mkdn = new MGen({...rest, selector: props.selector || `#${MGenId}`})
      await mkdn.init()
      setMM(mkdn)
    })

  }, [])


  return (
    <MMContext.Provider value={{mm}}>
      <MemoChildren children={children} />
    </MMContext.Provider>
  )
}
