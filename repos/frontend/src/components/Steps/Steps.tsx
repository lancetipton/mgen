import type { TStep } from '@MG/components/Steps/Step'

import { useMemo } from 'react'
import { cls } from '@keg-hub/jsutils/cls'
import { stopEvt } from '@MG/utils/dom/stopEvt'
import { Step } from '@MG/components/Steps/Step'
import { Divider } from '@MG/components/Divider'
import { useMGen } from '@MG/contexts/MGenContext'
import { getNavSteps } from '@MG/utils/sites/getNavSteps'
import { ChevronLeftIcon } from '@MG/components/Icons/ChevronLeftIcon'
import { ChevronRightIcon } from '@MG/components/Icons/ChevronRightIcon'


export type TSteps = {
  path:string
}

const useSteps = (props:TSteps) => {
  const { path } = props
  const { mg, site } = useMGen()
  return useMemo(() => {
    if(!site?.nav) return {prev: {} as TStep, next: {} as TStep, disabled: true}
    
    const { prev, next } = getNavSteps(site)

    const onNav = (evt:any, href:string) => {
      stopEvt(evt)
      href && mg.navigate(href)
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


export const Steps = (props:TSteps) => {
  
  const { disabled, prev, next } = useSteps(props)

  return !disabled && (
    <div
      className={cls(
        `mg-steps-container`,
        `flex`,
        `flex-col`,
      )}
    >
      <Divider />
      <div
        className={cls(
          `mg-steps`,
          `flex`,
          `justify-between`,
          `items-center`,
        )}
      >
        <Step {...prev} >
          <ChevronLeftIcon className='size-5' />
          <span className='mg-step-text text-base' >
            {prev.children}
          </span>
        </Step>
        <Step {...next} >
          <span className='mg-step-text text-base' >
            {next.children}
          </span>
          <ChevronRightIcon className='size-5' />
        </Step>
      </div>
    </div>
  ) || null
}