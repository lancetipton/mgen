import type { ReactNode } from 'react'
import type { TAnyCB } from '@MG/types'
import { cls } from '@keg-hub/jsutils/cls'
import { stopEvt } from '@MG/utils/dom/stopEvt'

export type TLink = Partial<Omit<HTMLAnchorElement, `children`>> & {
  onClick?:TAnyCB
  disabled?:boolean
  children?:ReactNode
}

export const Link = (props:TLink) => {
  const {
    href,
    onClick,
    children,
    disabled,
    className,
    ...rest
  } = props
  
  return (
    <a
      {...rest as any}
      href={disabled ? `` : href}
      onClick={disabled ? stopEvt : onClick}
      className={cls(
        `link`,
        `mg-link`,
        className,
        disabled && `link-disabled !no-underline !opacity-60 !cursor-not-allowed`,
      )}
    >
      {children}
    </a>
  )
  
}