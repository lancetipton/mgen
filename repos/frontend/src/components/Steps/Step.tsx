import type { ReactNode } from "react"

import { cls } from '@keg-hub/jsutils/cls'
import { useTheme } from '@MG/contexts/ThemeContext'


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

  const { isDark } = useTheme()

  return (
    <div
      className={cls(
        `mg-step`,
        className,
        disabled && `opacity-0 pointer-events-none`,
      )}
    >
      <a
        href={href}
        onClick={(evt:any) => onClick?.(evt, href)}
        className={cls(
          isDark ? `text-gray-300` : `text-gray-600`,
          `hover:text-primary`,
          `!no-underline`,
          `border-none`,
          `btn`,
          `btn-sm`,
          `btn-link`,
          `md:btn-md`,
          `gap-2`,
          `lg:gap-3`,
          btnClass,
        )}
      >
        {children}
      </a>
    </div>
  )
  
}