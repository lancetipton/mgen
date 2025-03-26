import { cls } from '@keg-hub/jsutils/cls'
import { Step } from '@MG/components/Steps/Step'
import { Divider } from '@MG/components/Divider'
import { useSteps } from '@MG/hooks/components/useSteps'
import { ChevronLeftIcon } from '@MG/components/Icons/ChevronLeftIcon'
import { ChevronRightIcon } from '@MG/components/Icons/ChevronRightIcon'


export type TSteps = {
  path:string
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