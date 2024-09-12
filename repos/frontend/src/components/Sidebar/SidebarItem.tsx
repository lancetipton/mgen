import type { ReactNode } from 'react'
import { cls } from '@keg-hub/jsutils/cls'

export type TSidebarItem = {
  icon?:ReactNode
  text?:string
  dotColor?:string
  className?:string
  onClick?:(event:any) => any
}

export const SidebarItem = (props:TSidebarItem) => {

  const {
    text,
    icon,
    onClick,
    dotColor,
    className,
  } = props

  return (
    <button
      onClick={onClick}
      className={cls(
        className,
        `mg-sidebar-list-item`,
        `flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700`
      )}
    >
      <div className="flex items-center gap-x-2 ">
        {dotColor && (<span className={cls(dotColor, `w-2 h-2 rounded-full` )}/>)}
        {text && (<span>{text}</span>) || null}
      </div>

      {icon}
    </button>
  )

}