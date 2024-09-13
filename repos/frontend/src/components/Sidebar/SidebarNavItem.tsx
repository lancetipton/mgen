import { ReactNode } from "react"
import { cls } from '@keg-hub/jsutils/cls'

export type TSidebarNavItem = {
  href?:string
  className?:string
  text?:ReactNode
  icon?:ReactNode
}

export const SidebarNavItem = (props:TSidebarNavItem) => {
  
  const {
    text,
    icon,
    href=`#`,
    className
  } = props
  
  return (
    <a
      href={href}
      className={cls(
        className,
        `flex items-center px-3 py-2 rounded-lg`,
      )}
    >
      {icon}
      {text && (<span className='mx-2 text-sm font-medium'>{text}</span>) || null}
    </a>
  )
  
}