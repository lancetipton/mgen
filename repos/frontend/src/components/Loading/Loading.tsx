import type { ReactNode } from 'react'

import { cls } from '@keg-hub/jsutils/cls'

export type TLoading = {
  icon?:ReactNode
  text?:ReactNode
  className?:string
  children?:ReactNode
}

export const Loading = (props:TLoading) => {
  const {
    icon,
    text,
    children,
    className,
    ...rest
  } = props

  return (
    <div className={cls(`mg-loading`, className)} >

      <div className={cls(`mg-loading-icon`)} >
        {icon || (<span className='loading loading-ring loading-lg'></span>)}
      </div>

      {text && (
        <div className={cls(`mg-loading-text`)} >
          {text}
        </div>
      )}
      {children && (
        <div className={cls(`mg-loading-content`)} >
          {children}
        </div>
      )}
    </div>
  )
}
