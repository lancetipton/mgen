import { stopEvt } from '@MG/utils/dom/stopEvt'
import { Step } from '@MG/components/Steps/Step'
import { useMGen } from '@MG/contexts/MGenContext'
import { getNavSteps } from '@MG/utils/sites/getNavSteps'
import { ChevronLeftIcon } from '@MG/components/Icons/ChevronLeftIcon'
import { ChevronRightIcon } from '@MG/components/Icons/ChevronRightIcon'

import { useMemo } from 'react'
import { cls } from '@keg-hub/jsutils/cls'

const useSteps = () => {
  const { mg, site } = useMGen()
  return useMemo(() => {
    if(!site?.nav) return {prev: {}, next: {}, disabled: true}
    
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
      },
      next: {
        ...next,
        onClick: onNav,
        type: `next` as const,
        className: 'mg-next-step',
      }
    }
    
  }, [mg, site?.nav])
  
}


export const Steps = () => {
  
  const { disabled, prev, next } = useSteps()

  return !disabled && (
    <div
      className={cls(
        `mg-steps`,
        `flex`,
        `justify-between`,
        `items-center`,
      )}
    >
      <Step {...prev} >
        <ChevronLeftIcon />
        <div
          className={cls(
            `mg-step-text`,
          )}
        >
          {prev.children}
        </div>
      </Step>
      <Step {...next} >
        <div
          className={cls(
            `mg-step-text`,
          )}
        >
          {next.children}
        </div>
        <ChevronRightIcon />
      </Step>
    </div>
  ) || null
}