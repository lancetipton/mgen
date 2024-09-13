import { cls } from '@keg-hub/jsutils/cls'

import { useMemo } from 'react'
import { useMGen } from '@MG/contexts/MGenContext'
import { SidebarList } from '@MG/components/Sidebar/SidebarList'

export type TSidebar = {}

export const Sidebar = (props:TSidebar) => {
  const { mg, site } = useMGen()

  const nav = useMemo(() => {
    // TODO: build root site nav, if no site exists
    return site?.nav || {}
  }, [
    site,
    mg?.config,
  ])

  return (
    <div
      className={cls(
        `mg-sidebar`,
        `fixed`,
        `left-0`,
        `side-bar-width`,
        `overflow-x-hidden`,
        `overflow-y-auto`,
        `nav-height-offset`,
        `max-content-height`,
      )}
    >

      <aside
        className={cls(
          `mg-sidebar-aside`,
          `border-base-200 border-r rtl:border-r-0 rtl:border-l `,
          `flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto`
        )}
      >

        Sidebar
        <div className="flex flex-col justify-between flex-1">
          <SidebarList items={nav?.children} />
        </div>

      </aside>

    </div>
  )
}
