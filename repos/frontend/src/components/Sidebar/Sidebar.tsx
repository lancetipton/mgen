import { cls } from '@keg-hub/jsutils/cls'

import { useMGen } from '@MG/contexts/MGenContext'
import { SidebarList } from '@MG/components/Sidebar/SidebarList'

export type TSidebar = {}

export const Sidebar = (props:TSidebar) => {
  const { mm } = useMGen()


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

      <aside className="mg-sidebar-aside flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">

        <div className="flex flex-col justify-between flex-1">
          <SidebarList />
        </div>

      </aside>

    </div>
  )
}