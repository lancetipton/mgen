import type { TStep } from '@MG/components/Steps/Step'

import { useMemo } from 'react'
import { stopEvt } from '@MG/utils/dom/stopEvt'
import { useMGen } from '@MG/contexts/MGenContext'
import { getNavSteps } from '@MG/utils/sites/getNavSteps'


export type TSteps = {
  path:string
}

export const useSteps = (props:TSteps) => {
  const { path } = props
  const { mg, site } = useMGen()
  return useMemo(() => {
    if(!site?.nav) return {prev: {} as TStep, next: {} as TStep, disabled: true}
    const { prev, next } = getNavSteps(site)

    const onNav = (evt:any, href:string) => {
      stopEvt(evt)
      href && mg.navigate(href, evt.metaKey)
    } 

    return {
      disabled: false,
      prev: {
        ...prev,
        onClick: onNav,
        type: `prev` as const,
        className: 'mg-prev-step',
      } as TStep,
      next: {
        ...next,
        onClick: onNav,
        type: `next` as const,
        className: 'mg-next-step',
      } as TStep
    }
    
  }, [path, mg, site?.nav])
  
}

