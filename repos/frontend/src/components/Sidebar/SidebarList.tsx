import type { TSidebarItem } from '@MG/components/Sidebar/SidebarItem'

import { ReactNode } from 'react'
import { ArrowRightIcon } from '@MG/components/Icons'
import { SidebarItem } from '@MG/components/Sidebar/SidebarItem'

export type TSidebarList = {
  header?:ReactNode
  items?:TSidebarItem[]
}

export const SidebarList = (props:TSidebarList) => {

  const {
    header,
    items
  } = props

  return (
    <div className='mg-sidebar-list' >
      {header && (
        <div className="mg-sidebar-list-header flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white">
            {header}
          </h2>
        </div>
      )}

      {items?.length && (
        <nav className="mg-sidebar-list-nav mt-4 -mx-3 space-y-3 ">
          {items?.map((item) => {
            return (
              <SidebarItem
                icon={<ArrowRightIcon />}
                {...item}
              />
            )
          })}
        </nav>
      ) || null}
    </div>
  )
  
}