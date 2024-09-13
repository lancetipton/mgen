import type { ReactNode } from 'react'
import type { TSiteNavItems } from '@MG/types'

import { useState } from 'react'
import { cls } from '@keg-hub/jsutils/cls'
import { ArrowRightIcon } from '@MG/components/Icons'

export type TSidebarItem = {
  id?:string
  icon?:ReactNode
  text?:string
  href?:string
  dotColor?:string
  className?:string
  items?:TSiteNavItems
  onClick?:(event:any, id?:string, href?:string) => any
  onToggle?:(event:any, id?:string, href?:string) => any
}

export const SidebarItem = (props:TSidebarItem) => {

  const {
    id,
    text,
    icon,
    href,
    items,
    onClick,
    dotColor,
    className,
    onToggle,
  } = props

  const [open, setOpen] = useState(false)


  const onToggleItem = (evt:any) => {
    if(onToggle) return onToggle(evt, id, href)
    evt.stopPropagation()
    evt.preventDefault()
    setOpen(!open)
  }

  const onClickItem = (evt:any) => {
    if(!href && items) return onToggleItem(evt)

    if(onClick) return onClick(evt, id, href)
    evt.stopPropagation()
    evt.preventDefault()
  }

  return (
    <>
      <button
        onClick={onClickItem}
        className={cls(
          className,
          `mg-sidebar-list-item`,
          `flex items-center justify-between w-full px-3 py-2 text-xs font-medium rounded-lg`
        )}
      >
        <div className="flex items-center gap-x-2 ">
          {dotColor && (<span className={cls(dotColor, `w-2 h-2 rounded-full` )}/>)}
          {text && (<span>{text}</span>) || null}
        </div>

        <div onClick={onToggleItem} > 
          {icon}
        </div>

      </button>
      {open && items && (
        <nav className="mg-sidebar-list-nav mt-4 -mx-3 space-y-3 ">
          {Object.entries(items)?.map(([key, item]) => {
            return (
              <SidebarItem
                key={key}
                id={key}
                href={item?.url}
                text={item?.text}
                onClick={onClick}
                items={item?.children}
                icon={item?.children ? (<ArrowRightIcon />) : null}
              />
            )
          })}
        </nav>
      ) || null}
    </>
  )

}