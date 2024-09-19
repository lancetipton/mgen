import type { ReactNode } from "react"

import { cls } from '@keg-hub/jsutils/cls'

export type TStep = {
  href?:string
  disabled?:boolean
  className?:string
  btnClass?:string
  type?:`next`|`prev`,
  children?:ReactNode
  onClick?:(evt:any, href:string) => any
}


export const Step = (props:TStep) => {
  
  const {
    type,
    href,
    onClick,
    disabled,
    children,
    btnClass,
    className,
  } = props

  return (
    <div
      className={cls(
        `mg-step`,
        className,
      )}
    >
      <button
        onClick={(evt:any) => onClick?.(evt, href)}
        disabled={disabled}
        className={cls(
          `btn`,
          `btn-link`,
          //`btn-accent`,
          btnClass,
          disabled && `btn-disabled`,
        )}
      >
        {children}
      </button>
    </div>
  )
  
}