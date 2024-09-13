import type { TSiteNavItems } from '@MG/types'

import { ReactNode } from 'react'
import { useMGen } from '@MG/contexts/MGenContext'
import { ArrowRightIcon } from '@MG/components/Icons'
import { SidebarItem } from '@MG/components/Sidebar/SidebarItem'


export type TSidebarList = {
  header?:ReactNode
  items?:TSiteNavItems
}

export const SidebarList = (props:TSidebarList) => {

  const {
    header,
    items
  } = props

  const { mg, site } = useMGen()
  
  const onClick = (evt:any, id?:string, href?:string) => {
    evt.stopPropagation()
    evt.preventDefault()
    if(!href) return

    mg.navigate(href)
  }

  return (
    <div className='mg-sidebar-list' >
      {header && (
        <div className="mg-sidebar-list-header flex items-center justify-between">
          <h2 className="text-base font-semibold">
            {header}
          </h2>
        </div>
      )}

      {items && (
        <nav className="mg-sidebar-list-nav mt-4 -mx-3 space-y-3 ">
          {Object.entries(items)?.map(([key, item]) => {
            return (
              <SidebarItem
                id={key}
                key={key}
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
    </div>
  )
  
}